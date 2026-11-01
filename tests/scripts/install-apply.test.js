/**
 * Tests for scripts/install-apply.js
 */

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync, spawnSync } = require('child_process');
const crypto = require('crypto');
const yaml = require('js-yaml');
const { applyInstallPlan } = require('../../scripts/lib/install/apply');

const SCRIPT = path.join(__dirname, '..', '..', 'scripts', 'install-apply.js');
const DEFAULT_INSTALL_APPLY_TIMEOUT_MS = process.platform === 'win32' ? 30000 : 10000;

function createTempDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function cleanup(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function stateOperationsIncludeSkills(homeDir) {
  const statePath = path.join(homeDir, '.claude', 'ecc', 'install-state.json');
  if (!fs.existsSync(statePath)) {
    return false;
  }
  const state = readJson(statePath);
  return state.operations.some(operation => (
    String(operation.sourceRelativePath || '').replace(/\\/g, '/').startsWith('skills/')
  ));
}

function readMarkdownFrontmatter(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, `Expected YAML frontmatter in ${filePath}`);
  return yaml.load(match[1]);
}

function run(args = [], options = {}) {
  const homeDir = options.homeDir || process.env.HOME;
  const env = {
    ...process.env,
    HOME: homeDir,
    USERPROFILE: homeDir,
    ...(options.env || {}),
  };

  try {
    const stdout = execFileSync('node', [SCRIPT, ...args], {
      cwd: options.cwd,
      env,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      maxBuffer: 64 * 1024 * 1024,
      timeout: options.timeout || DEFAULT_INSTALL_APPLY_TIMEOUT_MS,
    });

    return { code: 0, stdout, stderr: '' };
  } catch (error) {
    return {
      code: error.status || 1,
      stdout: error.stdout || '',
      stderr: error.stderr || error.message || '',
    };
  }
}

function runWithGuidedDispatcherFailure(failureMode) {
  const root = createTempDir('install-apply-guided-failure-');
  const preloadPath = path.join(root, 'preload.js');
  const failureMessage = 'guided dispatcher failed\u001b[31m';
  const replacement = failureMode === 'load'
    ? `throw new Error(${JSON.stringify(failureMessage)});`
    : `return { main: () => Promise.reject(new Error(${JSON.stringify(failureMessage)})) };`;
  fs.writeFileSync(preloadPath, `
    const Module = require('module');
    const originalLoad = Module._load;
    Module._load = function(request, parent, isMain) {
      if (request === './install-guided' && /install-apply\\.js$/.test(parent?.filename || '')) {
        ${replacement}
      }
      return originalLoad.call(this, request, parent, isMain);
    };
  `);
  try {
    return spawnSync(process.execPath, ['--require', preloadPath, SCRIPT, '--guided'], {
      cwd: path.dirname(SCRIPT),
      encoding: 'utf8',
    });
  } finally {
    cleanup(root);
  }
}

function test(name, fn) {
  try {
    fn();
    console.log(`  \u2713 ${name}`);
    return true;
  } catch (error) {
    console.log(`  \u2717 ${name}`);
    console.log(`    Error: ${error.message}`);
    return false;
  }
}

function runTests() {
  console.log('\n=== Testing install-apply.js ===\n');

  let passed = 0;
  let failed = 0;

  if (test('shows help with --help', () => {
    const result = run(['--help']);
    assert.strictEqual(result.code, 0);
    assert.ok(result.stdout.includes('Usage:'));
    assert.ok(result.stdout.includes('--dry-run'));
    assert.ok(result.stdout.includes('--profile <name>'));
    assert.ok(result.stdout.includes('--modules <id,id,...>'));
  })) passed++; else failed++;

  if (test('Claude dry-run preserves malformed settings without mutating them', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');
    const claudeRoot = path.join(homeDir, '.claude');
    const settingsPath = path.join(claudeRoot, 'settings.json');

    try {
      fs.mkdirSync(claudeRoot, { recursive: true });
      fs.writeFileSync(settingsPath, '{ malformed\n');

      const result = run(
        ['--profile', 'core', '--enable-hooks', '--dry-run', '--json'],
        { cwd: projectDir, homeDir }
      );

      assert.strictEqual(result.code, 0, result.stderr);
      assert.strictEqual(fs.readFileSync(settingsPath, 'utf8'), '{ malformed\n');
      assert.deepStrictEqual(fs.readdirSync(claudeRoot), ['settings.json']);
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('guided dispatcher reports sanitized load and rejection failures', () => {
    for (const failureMode of ['load', 'reject']) {
      const result = runWithGuidedDispatcherFailure(failureMode);
      assert.strictEqual(result.status, 1);
      assert.strictEqual(result.stdout, '');
      assert.strictEqual(result.stderr, 'Error: guided dispatcher failed\n');
    }
  })) passed++; else failed++;

  if (test('rejects mixing legacy languages with manifest profile flags', () => {
    const result = run(['--profile', 'core', 'typescript']);
    assert.strictEqual(result.code, 1);
    assert.ok(result.stderr.includes('cannot be combined'));
  })) passed++; else failed++;

  if (test('installs Claude rules and writes install-state', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const result = run(['typescript', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);

      const claudeRoot = path.join(homeDir, '.claude');
      assert.ok(fs.existsSync(path.join(claudeRoot, 'rules', 'ecc', 'common', 'coding-style.md')));
      assert.ok(fs.existsSync(path.join(claudeRoot, 'rules', 'ecc', 'typescript', 'testing.md')));
      assert.ok(fs.existsSync(path.join(claudeRoot, 'commands', 'plan.md')));
      assert.ok(!fs.existsSync(path.join(claudeRoot, 'skills', 'tdd-workflow', 'SKILL.md')), 'skill catalog was removed');
      assert.ok(!fs.existsSync(path.join(claudeRoot, 'skills', 'coding-standards', 'SKILL.md')), 'skill catalog was removed');
      assert.ok(fs.existsSync(path.join(claudeRoot, 'plugin.json')));
      const homeSettings = readJson(path.join(claudeRoot, 'settings.json'));
      assert.strictEqual(homeSettings.includeCoAuthoredBy, false);
      assert.ok(!homeSettings.hooks, 'no hooks are registered for Claude targets');

      const statePath = path.join(homeDir, '.claude', 'ecc', 'install-state.json');
      const state = readJson(statePath);
      assert.strictEqual(state.target.id, 'claude-home');
      assert.deepStrictEqual(state.request.legacyLanguages, ['typescript']);
      assert.strictEqual(state.request.legacyMode, true);
      assert.deepStrictEqual(state.request.modules, []);
      assert.ok(state.resolution.selectedModules.includes('rules-core'));
      assert.ok(
        state.operations.some(operation => (
          operation.destinationPath === path.join(claudeRoot, 'rules', 'ecc', 'common', 'coding-style.md')
        )),
        'Should record common rule file operation'
      );
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('installs Cursor configs and writes install-state', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const result = run(['--target', 'cursor', 'typescript', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);

      assert.ok(fs.existsSync(path.join(projectDir, '.cursor', 'rules', 'common-coding-style.mdc')));
      assert.ok(fs.existsSync(path.join(projectDir, '.cursor', 'rules', 'typescript-testing.mdc')));
      assert.ok(fs.existsSync(path.join(projectDir, '.cursor', 'rules', 'common-agents.mdc')));
      assert.ok(!fs.existsSync(path.join(projectDir, '.cursor', 'rules', 'common-agents.md')));
      assert.ok(!fs.existsSync(path.join(projectDir, '.cursor', 'rules', 'README.mdc')));
      assert.ok(fs.existsSync(path.join(projectDir, '.cursor', 'agents', 'ecc-architect.md')));
      assert.ok(!fs.existsSync(path.join(projectDir, '.cursor', 'agents', 'architect.md')));
      assert.ok(fs.existsSync(path.join(projectDir, '.cursor', 'commands', 'plan.md')));
      assert.ok(!fs.existsSync(path.join(projectDir, '.cursor', 'skills', 'tdd-workflow', 'SKILL.md')), 'skill catalog was removed');
      assert.ok(!fs.existsSync(path.join(projectDir, '.cursor', 'skills', 'coding-standards', 'SKILL.md')), 'skill catalog was removed');

      const mcpConfig = readJson(path.join(projectDir, '.cursor', 'mcp.json'));
      assert.ok(mcpConfig.mcpServers['chrome-devtools'], 'Should install shared MCP servers into Cursor');

      const statePath = path.join(projectDir, '.cursor', 'ecc-install-state.json');
      const state = readJson(statePath);
      const normalizedProjectDir = fs.realpathSync(projectDir);
      assert.strictEqual(state.target.id, 'cursor-project');
      assert.strictEqual(state.target.root, path.join(normalizedProjectDir, '.cursor'));
      assert.deepStrictEqual(state.request.legacyLanguages, ['typescript']);
      assert.strictEqual(state.request.legacyMode, true);
      assert.ok(
        state.operations.some(operation => (
          operation.destinationPath === path.join(normalizedProjectDir, '.cursor', 'commands', 'plan.md')
        )),
        'Should record manifest command file copy operation'
      );
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('installs Cursor MCP config by merging bundled servers into an existing mcp.json', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const cursorRoot = path.join(projectDir, '.cursor');
      fs.mkdirSync(cursorRoot, { recursive: true });
      fs.writeFileSync(path.join(cursorRoot, 'mcp.json'), JSON.stringify({
        mcpServers: {
          custom: {
            command: 'node',
            args: ['custom-mcp.js'],
          },
        },
      }, null, 2));

      const result = run(['--target', 'cursor', 'typescript', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);

      const mcpConfig = readJson(path.join(projectDir, '.cursor', 'mcp.json'));
      assert.ok(mcpConfig.mcpServers.custom, 'Should preserve existing custom Cursor MCP servers');
      assert.ok(mcpConfig.mcpServers['chrome-devtools'], 'Should merge the bundled chrome-devtools MCP server');
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('installs Antigravity configs and writes install-state', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const result = run(['--target', 'antigravity', 'typescript'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);

      assert.ok(fs.existsSync(path.join(projectDir, '.agents', 'rules', 'common-coding-style.md')));
      assert.ok(fs.existsSync(path.join(projectDir, '.agents', 'rules', 'typescript-testing.md')));
      assert.ok(!fs.existsSync(path.join(projectDir, '.agents', 'rules', 'python-testing.md')));
      assert.ok(fs.existsSync(path.join(projectDir, '.agents', 'workflows', 'plan.md')));
      assert.ok(!fs.existsSync(path.join(projectDir, '.agents', 'skills')), 'skill catalog was removed');
      assert.ok(fs.existsSync(path.join(projectDir, '.agents', 'agents', 'architect.md')));
      const tddGuide = readMarkdownFrontmatter(
        path.join(projectDir, '.agents', 'agents', 'tdd-guide.md')
      );
      assert.deepStrictEqual(
        tddGuide.tools,
        ['view_file', 'write_to_file', 'replace_file_content', 'run_command', 'grep_search']
      );
      assert.strictEqual(tddGuide.model, 'pro');
      const docsLookup = readMarkdownFrontmatter(
        path.join(projectDir, '.agents', 'agents', 'docs-lookup.md')
      );
      assert.deepStrictEqual(docsLookup.tools, ['view_file', 'grep_search']);
      const harnessOptimizer = readMarkdownFrontmatter(
        path.join(projectDir, '.agents', 'agents', 'harness-optimizer.md')
      );
      assert.ok(!Object.hasOwn(harnessOptimizer, 'color'), 'Should omit Claude-only color metadata');

      const statePath = path.join(projectDir, '.agents', 'ecc-install-state.json');
      const state = readJson(statePath);
      assert.strictEqual(state.target.id, 'antigravity-project');
      assert.deepStrictEqual(state.request.legacyLanguages, ['typescript']);
      assert.strictEqual(state.request.legacyMode, true);
      assert.deepStrictEqual(
        state.resolution.selectedModules,
        [
          'rules-core',
          'agents-core',
          'commands-core',
        ]
      );
      assert.ok(
        state.operations.some(operation => (
          operation.destinationPath.endsWith(path.join('.agents', 'workflows', 'plan.md'))
        )),
        'Should record manifest command file copy operation'
      );
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('maps legacy language aliases to Antigravity rule namespaces', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const result = run(
        ['--target', 'antigravity', 'c', 'go', 'kotlin', 'javascript', 'rails', 'harmonyos'],
        { cwd: projectDir, homeDir }
      );
      assert.strictEqual(result.code, 0, result.stderr);

      const rulesDir = path.join(projectDir, '.agents', 'rules');
      for (const fileName of [
        'golang-testing.md',
        'kotlin-testing.md',
        'typescript-testing.md',
        'ruby-testing.md',
        'arkts-testing.md',
        'cpp-testing.md',
      ]) {
        assert.ok(fs.existsSync(path.join(rulesDir, fileName)), `Expected ${fileName}`);
      }
      assert.ok(!fs.existsSync(path.join(rulesDir, 'python-testing.md')));
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('installs JoyCode profile through managed install-state', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const result = run(['--target', 'joycode', '--profile', 'minimal'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);

      assert.ok(fs.existsSync(path.join(projectDir, '.joycode', 'rules', 'common-coding-style.md')));
      assert.ok(!fs.existsSync(path.join(projectDir, '.joycode', 'rules', 'common', 'coding-style.md')));
      assert.ok(fs.existsSync(path.join(projectDir, '.joycode', 'agents', 'architect.md')));
      assert.ok(fs.existsSync(path.join(projectDir, '.joycode', 'commands', 'plan.md')));
      assert.ok(!fs.existsSync(path.join(projectDir, '.joycode', 'skills')), 'skill catalog was removed');
      assert.ok(fs.existsSync(path.join(projectDir, '.joycode', 'mcp-configs', 'mcp-servers.json')));
      assert.ok(!fs.existsSync(path.join(projectDir, '.joycode', 'hooks')));

      const statePath = path.join(projectDir, '.joycode', 'ecc-install-state.json');
      const state = readJson(statePath);
      assert.strictEqual(state.target.id, 'joycode-project');
      assert.deepStrictEqual(state.request.modules, []);
      assert.strictEqual(state.request.profile, 'minimal');
      assert.ok(!state.resolution.selectedModules.includes('workflow-quality'));
      assert.ok(
        !state.operations.some(operation => (
          String(operation.sourceRelativePath || '').replace(/\\/g, '/').startsWith('skills/')
        )),
        'Skill catalog was removed: no top-level skills/ operations may appear in the plan'
      );
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('installs Qwen profile through managed home install-state', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const result = run(['--target', 'qwen', '--profile', 'minimal'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);

      assert.ok(fs.existsSync(path.join(homeDir, '.qwen', 'QWEN.md')));
      assert.ok(fs.existsSync(path.join(homeDir, '.qwen', 'rules', 'common', 'coding-style.md')));
      assert.ok(fs.existsSync(path.join(homeDir, '.qwen', 'agents', 'architect.md')));
      assert.ok(fs.existsSync(path.join(homeDir, '.qwen', 'commands', 'plan.md')));
      // Unlike the removed top-level skills/ catalog, the repo's own .qwen/skills/
      // directory is Qwen-native platform content synced verbatim by the
      // platform-configs module (strategy: sync-root-children) — it is unrelated
      // to the removed catalog and is expected to still be installed.
      assert.ok(
        fs.existsSync(path.join(homeDir, '.qwen', 'skills', 'alloydb-basics', 'SKILL.md')),
        'Qwen-native platform skill content should still sync from .qwen/skills/'
      );
      assert.ok(fs.existsSync(path.join(homeDir, '.qwen', 'mcp-configs', 'mcp-servers.json')));
      assert.ok(!fs.existsSync(path.join(homeDir, '.qwen', 'hooks')));

      const statePath = path.join(homeDir, '.qwen', 'ecc-install-state.json');
      const state = readJson(statePath);
      assert.strictEqual(state.target.id, 'qwen-home');
      assert.deepStrictEqual(state.request.modules, []);
      assert.strictEqual(state.request.profile, 'minimal');
      assert.ok(!state.resolution.selectedModules.includes('workflow-quality'));
      assert.ok(
        !state.operations.some(operation => (
          String(operation.sourceRelativePath || '').replace(/\\/g, '/').startsWith('skills/')
        )),
        'Skill catalog was removed: no top-level skills/ operations may appear in the plan'
      );
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('supports dry-run without mutating the target project', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const result = run(['--target', 'cursor', '--dry-run', 'typescript'], {
        cwd: projectDir,
        homeDir,
      });
      assert.strictEqual(result.code, 0, result.stderr);
      assert.ok(result.stdout.includes('Dry-run install plan'));
      assert.ok(result.stdout.includes('Mode: legacy-compat'));
      assert.ok(result.stdout.includes('Legacy languages: typescript'));
      assert.ok(!fs.existsSync(path.join(projectDir, '.cursor', 'hooks.json')));
      assert.ok(!fs.existsSync(path.join(projectDir, '.cursor', 'ecc-install-state.json')));
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('supports manifest profile dry-runs through the installer', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const result = run(['--profile', 'core', '--dry-run'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);
      assert.ok(result.stdout.includes('Mode: manifest'));
      assert.ok(result.stdout.includes('Profile: core'));
      assert.ok(result.stdout.includes('Included components: (none)'));
      assert.ok(result.stdout.includes(
        'Selected modules: rules-core, agents-core, commands-core, hooks-runtime, '
        + 'platform-configs'
      ));
      assert.ok(!fs.existsSync(path.join(homeDir, '.claude', 'ecc', 'install-state.json')));
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('full profile dry-run excludes the removed skill catalog and hook registration', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const result = run(['--profile', 'full', '--dry-run', '--json'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);
      const parsed = JSON.parse(result.stdout);
      assert.strictEqual(parsed.dryRun, true);
      assert.ok(parsed.plan.selectedModuleIds.includes('agentic-patterns'));
      assert.ok(!parsed.plan.selectedModuleIds.includes('workflow-quality'));
      const settingsOperations = parsed.plan.operations.filter(operation => (
        operation.kind === 'update-claude-settings'
      ));
      assert.strictEqual(settingsOperations.length, 0, 'hooks are no longer registered in settings');
      assert.ok(!parsed.plan.operations.some(operation => (
        operation.kind === 'copy-file'
        && String(operation.sourceRelativePath || '').replace(/\\/g, '/') === 'hooks/hooks.json'
      )));
      assert.ok(
        !parsed.plan.operations.some(operation => (
          String(operation.sourceRelativePath || '').replace(/\\/g, '/').startsWith('skills/')
        )),
        'Removed skill catalog must not appear in the install plan'
      );
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('supports minimal profile dry-runs without hooks through the installer', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const result = run(['--profile', 'minimal', '--dry-run'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);
      assert.ok(result.stdout.includes('Mode: manifest'));
      assert.ok(result.stdout.includes('Profile: minimal'));
      assert.ok(result.stdout.includes(
        'Selected modules: rules-core, agents-core, commands-core, platform-configs'
      ));
      assert.ok(!result.stdout.includes('hooks-runtime'));
      assert.ok(!fs.existsSync(path.join(homeDir, '.claude', 'ecc', 'install-state.json')));
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('installs manifest profiles and writes non-legacy install-state', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const result = run(['--profile', 'core', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);

      const claudeRoot = path.join(homeDir, '.claude');
      assert.ok(fs.existsSync(path.join(claudeRoot, 'rules', 'ecc', 'common', 'coding-style.md')));
      assert.ok(fs.existsSync(path.join(claudeRoot, 'agents', 'architect.md')));
      assert.ok(fs.existsSync(path.join(claudeRoot, 'commands', 'plan.md')));
      assert.ok(!fs.existsSync(path.join(claudeRoot, 'hooks', 'hooks.json')));
      // hooks/hooks.json (the registration manifest) was removed from the repo, so
      // --enable-hooks no longer writes a `hooks` key into settings.json. The hook
      // *implementation* files are still installed and independently invocable.
      assert.ok(!readJson(path.join(claudeRoot, 'settings.json')).hooks);
      assert.ok(fs.existsSync(path.join(claudeRoot, 'scripts', 'hooks', 'session-end.js')));
      assert.ok(fs.existsSync(path.join(claudeRoot, 'scripts', 'lib', 'session-manager.js')));
      assert.ok(fs.existsSync(path.join(claudeRoot, 'plugin.json')));

      const state = readJson(path.join(claudeRoot, 'ecc', 'install-state.json'));
      assert.strictEqual(state.request.profile, 'core');
      assert.strictEqual(state.request.legacyMode, false);
      assert.deepStrictEqual(state.request.legacyLanguages, []);
      assert.ok(state.resolution.selectedModules.includes('platform-configs'));
      assert.ok(
        state.operations.some(operation => (
          operation.destinationPath === path.join(claudeRoot, 'commands', 'plan.md')
        )),
        'Should record manifest-driven command file copy'
      );
      assert.ok(
        !state.operations.some(operation => operation.kind === 'update-claude-settings'),
        'No settings-update operation should be recorded without a hooks.json source'
      );
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('home installs do not copy the repo .agents staging directory into Claude or Codex homes', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const claudeResult = run(['--profile', 'core', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(claudeResult.code, 0, claudeResult.stderr);

      const claudeRoot = path.join(homeDir, '.claude');
      assert.ok(fs.existsSync(path.join(claudeRoot, 'agents', 'architect.md')));
      assert.ok(!fs.existsSync(path.join(claudeRoot, 'skills')), 'skill catalog was removed');
      assert.ok(
        !fs.existsSync(path.join(claudeRoot, '.agents')),
        'Claude home must not receive the repo .agents staging directory'
      );

      const claudeState = readJson(path.join(claudeRoot, 'ecc', 'install-state.json'));
      assert.ok(
        !claudeState.operations.some(operation => (
          String(operation.sourceRelativePath || '').replace(/\\/g, '/').split('/')[0] === '.agents'
        )),
        'Claude install-state must not record .agents copy operations'
      );

      const codexResult = run(['--target', 'codex', '--profile', 'core'], { cwd: projectDir, homeDir });
      assert.strictEqual(codexResult.code, 0, codexResult.stderr);

      const codexRoot = path.join(homeDir, '.codex');
      assert.ok(fs.existsSync(path.join(codexRoot, 'agents', 'architect.md')));
      assert.ok(!fs.existsSync(path.join(codexRoot, 'skills')), 'skill catalog was removed');
      assert.ok(
        !fs.existsSync(path.join(codexRoot, '.agents')),
        'Codex home must not receive the repo .agents staging directory'
      );

      const codexState = readJson(path.join(codexRoot, 'ecc-install-state.json'));
      assert.ok(
        !codexState.operations.some(operation => (
          String(operation.sourceRelativePath || '').replace(/\\/g, '/').split('/')[0] === '.agents'
        )),
        'Codex install-state must not record .agents copy operations'
      );
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('reconciles legacy .agents files and state operations on Claude and Codex home upgrades', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');
    const digest = content => crypto.createHash('sha256').update(content).digest('hex');
    const legacyOperation = (destinationPath, sourceRelativePath, installedContent) => ({
      kind: 'copy-file',
      moduleId: 'agents-core',
      sourceRelativePath,
      destinationPath,
      strategy: 'preserve-relative-path',
      ownership: 'managed',
      scaffoldOnly: false,
      contentSha256: digest(installedContent),
    });
    const writeFile = (filePath, content) => {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, content);
    };
    const writeLegacyState = (statePath, target, operations) => {
      writeFile(statePath, `${JSON.stringify({
        schemaVersion: 'ecc.install.v1',
        installedAt: '2026-09-01T00:00:00.000Z',
        target,
        request: {
          profile: 'core',
          modules: [],
          includeComponents: [],
          excludeComponents: [],
          legacyLanguages: [],
          legacyMode: false,
          hookConsent: target.target === 'claude' ? 'enabled' : null,
        },
        resolution: { selectedModules: ['agents-core'], skippedModules: [] },
        source: { repoVersion: '2.2.1', repoCommit: null, manifestVersion: 1 },
        operations,
      }, null, 2)}\n`);
    };

    try {
      // Claude home seeded as installed before the .agents exclusion.
      const claudeRoot = path.join(homeDir, '.claude');
      const claudeStatePath = path.join(claudeRoot, 'ecc', 'install-state.json');
      const claudeSkillCopy = path.join(claudeRoot, '.agents', 'skills', 'legacy-skill', 'SKILL.md');
      const claudeModifiedCopy = path.join(claudeRoot, '.agents', 'plugins', 'marketplace.json');
      const claudeUserFile = path.join(claudeRoot, '.agents', 'user-note.txt');
      writeFile(claudeSkillCopy, '# legacy skill\n');
      writeFile(claudeModifiedCopy, '{"edited": true}\n');
      writeFile(claudeUserFile, 'user notes\n');
      writeLegacyState(claudeStatePath, {
        id: 'claude-home', target: 'claude', kind: 'home',
        root: claudeRoot, installStatePath: claudeStatePath,
      }, [
        legacyOperation(claudeSkillCopy, '.agents/skills/legacy-skill/SKILL.md', '# legacy skill\n'),
        legacyOperation(claudeModifiedCopy, '.agents/plugins/marketplace.json', '{"original": true}\n'),
      ]);

      const claudeResult = run(['--profile', 'core', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(claudeResult.code, 0, claudeResult.stderr);

      assert.ok(!fs.existsSync(claudeSkillCopy), 'Unchanged managed .agents file should be removed');
      assert.ok(
        claudeResult.stdout.includes(
          `- removed ${path.join(fs.realpathSync(claudeRoot), '.agents', 'skills', 'legacy-skill', 'SKILL.md')}`
        ),
        'Install output should log one line per removed path'
      );
      assert.strictEqual(
        fs.readFileSync(claudeModifiedCopy, 'utf8'),
        '{"edited": true}\n',
        'Modified managed file must be preserved'
      );
      assert.strictEqual(
        fs.readFileSync(claudeUserFile, 'utf8'),
        'user notes\n',
        'Files the state does not own must not be touched'
      );
      assert.ok(
        !fs.existsSync(path.join(claudeRoot, '.agents', 'skills')),
        'Emptied .agents subdirectories should be pruned'
      );

      const claudeState = readJson(claudeStatePath);
      assert.ok(
        !claudeState.operations.some(operation => (
          String(operation.sourceRelativePath || '').replace(/\\/g, '/').split('/')[0] === '.agents'
        )),
        'Claude install-state must drop the excluded .agents operations'
      );
      assert.ok(fs.existsSync(path.join(claudeRoot, 'agents', 'architect.md')));
      assert.ok(!fs.existsSync(path.join(claudeRoot, 'skills')), 'skill catalog was removed');

      // Codex home seeded the same way; both recorded files are unchanged.
      const codexRoot = path.join(homeDir, '.codex');
      const codexStatePath = path.join(codexRoot, 'ecc-install-state.json');
      const codexSkillCopy = path.join(codexRoot, '.agents', 'skills', 'legacy-skill', 'SKILL.md');
      const codexMarketplaceCopy = path.join(codexRoot, '.agents', 'plugins', 'marketplace.json');
      writeFile(codexSkillCopy, '# legacy skill\n');
      writeFile(codexMarketplaceCopy, '{"original": true}\n');
      writeLegacyState(codexStatePath, {
        id: 'codex-home', target: 'codex', kind: 'home',
        root: codexRoot, installStatePath: codexStatePath,
      }, [
        legacyOperation(codexSkillCopy, '.agents/skills/legacy-skill/SKILL.md', '# legacy skill\n'),
        legacyOperation(codexMarketplaceCopy, '.agents/plugins/marketplace.json', '{"original": true}\n'),
      ]);

      const codexResult = run(['--target', 'codex', '--profile', 'core'], { cwd: projectDir, homeDir });
      assert.strictEqual(codexResult.code, 0, codexResult.stderr);

      assert.ok(
        !fs.existsSync(path.join(codexRoot, '.agents')),
        'Fully reconciled .agents directory should be pruned from the Codex home'
      );
      const codexState = readJson(codexStatePath);
      assert.ok(
        !codexState.operations.some(operation => (
          String(operation.sourceRelativePath || '').replace(/\\/g, '/').split('/')[0] === '.agents'
        )),
        'Codex install-state must drop the excluded .agents operations'
      );
      assert.ok(fs.existsSync(path.join(codexRoot, 'agents', 'architect.md')));
      assert.ok(!fs.existsSync(path.join(codexRoot, 'skills')), 'skill catalog was removed');
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('preserves existing top-level Claude rules and skills during managed install', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const claudeRoot = path.join(homeDir, '.claude');
      const userRulePath = path.join(claudeRoot, 'rules', 'common', 'coding-style.md');
      const userSkillPath = path.join(claudeRoot, 'skills', 'tdd-workflow', 'SKILL.md');
      fs.mkdirSync(path.dirname(userRulePath), { recursive: true });
      fs.mkdirSync(path.dirname(userSkillPath), { recursive: true });
      fs.writeFileSync(userRulePath, '# User custom rule\n');
      fs.writeFileSync(userSkillPath, '# User custom skill\n');

      const result = run(['--profile', 'core', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);

      // The managed skill catalog was removed from the repo, so a 'core' install no
      // longer attempts to write anything under .claude/skills/ and therefore never
      // needs to skip the user's pre-existing skill there.
      assert.strictEqual(fs.readFileSync(userRulePath, 'utf8'), '# User custom rule\n');
      assert.strictEqual(fs.readFileSync(userSkillPath, 'utf8'), '# User custom skill\n');
      assert.ok(fs.existsSync(path.join(claudeRoot, 'rules', 'ecc', 'common', 'coding-style.md')));
      const state = readJson(path.join(claudeRoot, 'ecc', 'install-state.json'));
      assert.ok(!state.operations.some(operation => (
        operation.destinationPath.startsWith(path.join(claudeRoot, 'skills', 'tdd-workflow'))
      )));
      assert.ok(
        !state.operations.some(operation => (
          String(operation.sourceRelativePath || '').replace(/\\/g, '/').startsWith('skills/')
        )),
        'Removed skill catalog must not appear in managed install operations'
      );
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('reports applied and skipped user-owned Claude skill operations in JSON', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const userSkillPath = path.join(
        homeDir,
        '.claude',
        'skills',
        'tdd-workflow',
        'SKILL.md'
      );
      fs.mkdirSync(path.dirname(userSkillPath), { recursive: true });
      fs.writeFileSync(userSkillPath, '# User custom skill\n');

      const result = run(['--skills', 'tdd-workflow', '--json'], {
        cwd: projectDir,
        homeDir,
      });
      assert.notStrictEqual(result.code, 0, 'catalog skills were removed: --skills must fail');
      assert.ok(result.stderr.includes('Unknown install component'), result.stderr);
      assert.strictEqual(
        fs.readFileSync(userSkillPath, 'utf8'),
        '# User custom skill\n',
        'user-owned skill must be untouched'
      );
      assert.ok(
        !fs.existsSync(path.join(homeDir, '.claude', 'ecc', 'install-state.json')),
        'failed skill install must not write install-state'
      );
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('dry-run reports the same removed-catalog skill failure as apply', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const userSkillRoot = path.join(
        homeDir,
        '.claude',
        'skills',
        'tdd-workflow'
      );
      const userSkillPath = path.join(userSkillRoot, 'SKILL.md');
      fs.mkdirSync(userSkillRoot, { recursive: true });
      fs.writeFileSync(userSkillPath, '# User custom skill\n');

      const result = run(
        ['--skills', 'tdd-workflow', '--dry-run', '--json'],
        { cwd: projectDir, homeDir }
      );
      assert.notStrictEqual(result.code, 0, 'catalog skills were removed: --skills must fail');
      assert.ok(result.stderr.includes('Unknown install component'), result.stderr);
      assert.strictEqual(fs.readFileSync(userSkillPath, 'utf8'), '# User custom skill\n');
      assert.ok(!fs.existsSync(path.join(homeDir, '.claude', 'ecc', 'install-state.json')));
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('installs antigravity manifest profiles while skipping only unsupported modules', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const result = run(['--target', 'antigravity', '--profile', 'core'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);

      assert.ok(fs.existsSync(path.join(projectDir, '.agents', 'rules', 'common-coding-style.md')));
      assert.ok(
        fs.existsSync(path.join(projectDir, '.agents', 'rules', 'python-testing.md')),
        'Manifest profiles should retain broad rule coverage'
      );
      assert.ok(fs.existsSync(path.join(projectDir, '.agents', 'agents', 'architect.md')));
      assert.ok(fs.existsSync(path.join(projectDir, '.agents', 'workflows', 'plan.md')));
      assert.ok(!fs.existsSync(path.join(projectDir, '.agents', 'skills')), 'skill catalog was removed');

      const state = readJson(path.join(projectDir, '.agents', 'ecc-install-state.json'));
      assert.strictEqual(state.request.profile, 'core');
      assert.strictEqual(state.request.legacyMode, false);
      assert.deepStrictEqual(
        state.resolution.selectedModules,
        [
          'rules-core',
          'agents-core',
          'commands-core',
          'platform-configs'
        ]
      );
      assert.ok(state.resolution.skippedModules.includes('hooks-runtime'));
      assert.ok(!state.resolution.skippedModules.includes('workflow-quality'));
      assert.ok(!state.resolution.skippedModules.includes('platform-configs'));
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('installs explicit modules for cursor using manifest operations', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const result = run(['--target', 'cursor', '--modules', 'platform-configs', '--enable-hooks'], {
        cwd: projectDir,
        homeDir,
      });
      assert.strictEqual(result.code, 0, result.stderr);
      assert.ok(fs.existsSync(path.join(projectDir, '.cursor', 'hooks.json')));
      assert.ok(fs.existsSync(path.join(projectDir, '.cursor', 'rules', 'common-agents.mdc')));
      assert.ok(!fs.existsSync(path.join(projectDir, '.cursor', 'rules', 'common-agents.md')));

      const state = readJson(path.join(projectDir, '.cursor', 'ecc-install-state.json'));
      assert.strictEqual(state.request.profile, null);
      assert.deepStrictEqual(state.request.modules, ['platform-configs']);
      assert.deepStrictEqual(state.request.includeComponents, []);
      assert.deepStrictEqual(state.request.excludeComponents, []);
      assert.strictEqual(state.request.legacyMode, false);
      assert.ok(state.resolution.selectedModules.includes('platform-configs'));
      assert.ok(
        !state.operations.some(operation => operation.destinationPath.endsWith('ecc-install-state.json')),
        'Manifest copy operations should not include generated install-state files'
      );
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('rejects unknown explicit manifest modules before resolution', () => {
    const result = run(['--modules', 'ghost-module']);
    assert.strictEqual(result.code, 1);
    assert.ok(result.stderr.includes('Unknown install module: ghost-module'));
  })) passed++; else failed++;

  if (test('defaults commit attribution off without registering any managed hooks', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const result = run(['--profile', 'core', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);

      const claudeRoot = path.join(homeDir, '.claude');
      assert.strictEqual(
        fs.existsSync(path.join(claudeRoot, 'hooks', 'hooks.json')),
        false,
        'hooks.json should not be copied for Claude targets'
      );
      const settings = readJson(path.join(claudeRoot, 'settings.json'));
      assert.strictEqual(settings.includeCoAuthoredBy, false);
      // The hooks.json registration manifest was removed from the repo, so there is
      // nothing left to drive registration into settings.json's hooks.* arrays.
      assert.ok(!settings.hooks, 'no hooks key should be written without a hooks.json source');
      assert.ok(
        fs.existsSync(path.join(claudeRoot, 'scripts', 'hooks', 'session-start.js')),
        'the hook implementation file should still be installed'
      );

      const state = readJson(path.join(claudeRoot, 'ecc', 'install-state.json'));
      assert.ok(
        !state.operations.some(operation => operation.kind === 'update-claude-settings'),
        'state should not record a settings update operation without a hooks.json source'
      );
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('installs Claude home and project hook scripts at their installed roots and keeps them independently invocable', () => {
    // hooks/hooks.json (the registration manifest) was removed from the repo, so
    // settings.json no longer gets a `hooks.PreToolUse` entry whose `command`
    // resolves to the installed root. The hook *implementation* files are still
    // installed under scripts/hooks/ for both home and project targets, and they
    // remain independently invocable by spawning them directly (same pattern as
    // the ESM-isolation test below, which already proves this for block-no-verify.js).
    for (const target of ['claude', 'claude-project']) {
      const homeDir = createTempDir(`install-apply-${target}-home-`);
      const projectDir = createTempDir(`install-apply-${target}-project-`);

      try {
        const result = run(
          ['--target', target, '--profile', 'core', '--enable-hooks'],
          { cwd: projectDir, homeDir }
        );
        assert.strictEqual(result.code, 0, result.stderr);

        const claudeRoot = target === 'claude'
          ? path.join(homeDir, '.claude')
          : path.join(projectDir, '.claude');
        const settings = readJson(path.join(claudeRoot, 'settings.json'));
        assert.ok(!settings.hooks, 'no hooks key should be written without a hooks.json source');

        const state = readJson(path.join(claudeRoot, 'ecc', 'install-state.json'));
        const installedRoot = state.target.root;
        assert.strictEqual(fs.realpathSync(installedRoot), fs.realpathSync(claudeRoot));

        const dispatcherPath = path.join(claudeRoot, 'scripts', 'hooks', 'pre-bash-dispatcher.js');
        assert.ok(fs.existsSync(dispatcherPath), `${target} should install pre-bash-dispatcher.js`);
        const dispatcherResult = spawnSync(process.execPath, [dispatcherPath], {
          input: JSON.stringify({
            hook_event_name: 'PreToolUse',
            tool_name: 'Bash',
            tool_input: { command: 'echo hello' },
          }),
          encoding: 'utf8',
          cwd: projectDir,
          timeout: DEFAULT_INSTALL_APPLY_TIMEOUT_MS,
        });
        assert.strictEqual(dispatcherResult.status, 0, dispatcherResult.stderr);

        const docWarningPath = path.join(claudeRoot, 'scripts', 'hooks', 'doc-file-warning.js');
        assert.ok(fs.existsSync(docWarningPath), `${target} should install doc-file-warning.js`);
        const smokeResult = spawnSync(process.execPath, [docWarningPath], {
          input: JSON.stringify({
            hook_event_name: 'PreToolUse',
            tool_name: 'Write',
            tool_input: { file_path: 'README.md' },
          }),
          encoding: 'utf8',
          cwd: projectDir,
          timeout: DEFAULT_INSTALL_APPLY_TIMEOUT_MS,
        });
        assert.strictEqual(smokeResult.status, 0, smokeResult.stderr);
      } finally {
        cleanup(homeDir);
        cleanup(projectDir);
      }
    }
  })) passed++; else failed++;

  if (test('isolates project hooks from ESM package scopes without overwriting user Claude package data', () => {
    const homeDir = createTempDir('install-apply-claude-project-esm-home-');
    const projectDir = createTempDir('install-apply-claude-project-esm-');
    const claudeRoot = path.join(projectDir, '.claude');
    const userPackagePath = path.join(claudeRoot, 'package.json');
    const scriptsPackagePath = path.join(claudeRoot, 'scripts', 'package.json');
    const hooksPackagePath = path.join(claudeRoot, 'scripts', 'hooks', 'package.json');
    const libPackagePath = path.join(claudeRoot, 'scripts', 'lib', 'package.json');
    const userPackage = '{"name":"user-claude-config","type":"module"}\n';
    const userScriptsPackage = '{"name":"user-claude-scripts","type":"module"}\n';

    try {
      fs.writeFileSync(path.join(projectDir, 'package.json'), '{"type":"module"}\n');
      fs.mkdirSync(path.dirname(scriptsPackagePath), { recursive: true });
      fs.writeFileSync(userPackagePath, userPackage);
      fs.writeFileSync(scriptsPackagePath, userScriptsPackage);

      const firstInstall = run(
        ['--target', 'claude-project', '--profile', 'core', '--enable-hooks'],
        { cwd: projectDir, homeDir }
      );
      assert.strictEqual(firstInstall.code, 0, firstInstall.stderr);
      assert.strictEqual(fs.readFileSync(userPackagePath, 'utf8'), userPackage);
      assert.strictEqual(fs.readFileSync(scriptsPackagePath, 'utf8'), userScriptsPackage);
      assert.deepStrictEqual(readJson(hooksPackagePath), { type: 'commonjs' });
      assert.deepStrictEqual(readJson(libPackagePath), { type: 'commonjs' });

      const hookResult = spawnSync(
        process.execPath,
        [path.join(claudeRoot, 'scripts', 'hooks', 'block-no-verify.js')],
        {
          input: JSON.stringify({ tool_input: { command: 'git commit --no-verify' } }),
          encoding: 'utf8',
          cwd: projectDir,
        }
      );
      assert.strictEqual(hookResult.status, 2, hookResult.stderr);
      assert.match(hookResult.stderr, /no-verify/i);

      const secondInstall = run(
        ['--target', 'claude-project', '--profile', 'core', '--enable-hooks'],
        { cwd: projectDir, homeDir }
      );
      assert.strictEqual(secondInstall.code, 0, secondInstall.stderr);
      assert.strictEqual(fs.readFileSync(userPackagePath, 'utf8'), userPackage);
      assert.strictEqual(fs.readFileSync(scriptsPackagePath, 'utf8'), userScriptsPackage);

      const state = readJson(path.join(claudeRoot, 'ecc', 'install-state.json'));
      const boundaryPaths = [hooksPackagePath, libPackagePath];
      const packageBoundaryOperations = state.operations.filter(operation => (
        boundaryPaths.includes(operation.destinationPath)
      ));
      assert.deepStrictEqual(
        packageBoundaryOperations.map(operation => operation.destinationPath).sort(),
        [...boundaryPaths].sort()
      );
      assert.ok(packageBoundaryOperations.every(operation => operation.moduleId === 'hooks-runtime'));
      assert.ok(packageBoundaryOperations.every(operation => (
        /^[a-f0-9]{64}$/i.test(operation.contentSha256)
      )));
      assert.ok(!state.operations.some(operation => operation.destinationPath === userPackagePath));
      assert.ok(!state.operations.some(operation => operation.destinationPath === scriptsPackagePath));
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('preserves existing settings.json while disabling Claude co-author attribution', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const claudeRoot = path.join(homeDir, '.claude');
      fs.mkdirSync(claudeRoot, { recursive: true });
      fs.writeFileSync(
        path.join(claudeRoot, 'settings.json'),
        JSON.stringify({
          effortLevel: 'high',
          env: { MY_VAR: '1' },
          hooks: {
            PreToolUse: [{ matcher: 'Write', hooks: [{ type: 'command', command: 'echo custom-pretool' }] }],
            UserPromptSubmit: [{ matcher: '*', hooks: [{ type: 'command', command: 'echo custom-submit' }] }],
          },
        }, null, 2)
      );

      const result = run(['--profile', 'core', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);

      const settings = readJson(path.join(claudeRoot, 'settings.json'));
      assert.strictEqual(settings.effortLevel, 'high', 'existing effortLevel should be preserved');
      assert.strictEqual(settings.includeCoAuthoredBy, false, 'Claude co-author attribution should be disabled by default');
      assert.deepStrictEqual(settings.env, { MY_VAR: '1' }, 'existing env should be preserved');
      assert.deepStrictEqual(
        settings.hooks.UserPromptSubmit[0],
        { matcher: '*', hooks: [{ type: 'command', command: 'echo custom-submit' }] },
        'existing event entries should retain their order and content'
      );
      assert.deepStrictEqual(
        settings.hooks.PreToolUse[0],
        { matcher: 'Write', hooks: [{ type: 'command', command: 'echo custom-pretool' }] },
        'existing event entries should retain their order and content'
      );
      // hooks/hooks.json (the registration manifest) was removed from the repo, so
      // there is no managed-hook registration step left to merge new entries into
      // the user's existing hooks arrays; they should be left exactly as-is.
      assert.strictEqual(settings.hooks.UserPromptSubmit.length, 1);
      assert.strictEqual(settings.hooks.PreToolUse.length, 1);
      assert.ok(
        !settings.hooks.UserPromptSubmit.some(entry => entry.id === 'user-prompt:goal-runtime-admit'),
        'no managed goal admission hook should be registered without a hooks.json source'
      );
      assert.ok(
        !settings.hooks.PreToolUse.some(entry => entry.id === 'pre:bash:dispatcher'),
        'no managed Claude hook should be registered without a hooks.json source'
      );
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('filters copied mcp config files when ECC_DISABLED_MCPS is set', () => {
    const tempDir = createTempDir('install-apply-mcp-');
    const sourcePath = path.join(tempDir, '.mcp.json');
    const destinationPath = path.join(tempDir, 'installed', '.mcp.json');
    const installStatePath = path.join(tempDir, 'installed', 'ecc-install-state.json');
    const previousValue = process.env.ECC_DISABLED_MCPS;

    try {
      fs.mkdirSync(path.dirname(sourcePath), { recursive: true });
      fs.writeFileSync(sourcePath, JSON.stringify({
        mcpServers: {
          github: { command: 'npx' },
          exa: { url: 'https://mcp.exa.ai/mcp' },
          memory: { command: 'npx' },
        },
      }, null, 2));

      process.env.ECC_DISABLED_MCPS = 'github,memory';

      applyInstallPlan({
        targetRoot: path.join(tempDir, 'installed'),
        installStatePath,
        statePreview: {
          schemaVersion: 'ecc.install.v1',
          installedAt: new Date().toISOString(),
          target: {
            id: 'test-install',
            kind: 'project',
            root: path.join(tempDir, 'installed'),
            installStatePath,
          },
          request: {
            profile: null,
            modules: ['test-mcp'],
            includeComponents: [],
            excludeComponents: [],
            legacyLanguages: [],
            legacyMode: false,
          },
          resolution: {
            selectedModules: ['test-mcp'],
            skippedModules: [],
          },
          source: {
            repoVersion: null,
            repoCommit: null,
            manifestVersion: 1,
          },
          operations: [],
        },
        operations: [{
          kind: 'copy-file',
          moduleId: 'test-mcp',
          sourcePath,
          sourceRelativePath: '.mcp.json',
          destinationPath,
          strategy: 'preserve-relative-path',
          ownership: 'managed',
          scaffoldOnly: false,
        }],
      });

      const installed = readJson(destinationPath);
      assert.deepStrictEqual(Object.keys(installed.mcpServers), ['exa']);
    } finally {
      if (previousValue === undefined) {
        delete process.env.ECC_DISABLED_MCPS;
      } else {
        process.env.ECC_DISABLED_MCPS = previousValue;
      }
      cleanup(tempDir);
    }
  })) passed++; else failed++;

  if (test('reinstall is idempotent and keeps commit attribution disabled', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const firstInstall = run(['--profile', 'core', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(firstInstall.code, 0, firstInstall.stderr);

      const secondInstall = run(['--profile', 'core', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(secondInstall.code, 0, secondInstall.stderr);

      const settings = readJson(path.join(homeDir, '.claude', 'settings.json'));
      assert.strictEqual(settings.includeCoAuthoredBy, false);
      // hooks/hooks.json (the registration manifest) was removed from the repo, so
      // reinstalling never registers (or re-registers) any managed hook entries.
      assert.ok(!settings.hooks, 'no hooks key should be written without a hooks.json source');
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('reinstall preserves pre-existing hook entries without adding managed hooks', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const claudeRoot = path.join(homeDir, '.claude');
      fs.mkdirSync(claudeRoot, { recursive: true });
      const settingsPath = path.join(claudeRoot, 'settings.json');
      const legacySettings = {
        hooks: {
          PreToolUse: [{ matcher: 'Write', hooks: [{ type: 'command', command: 'echo legacy-pretool' }] }],
        },
      };
      fs.writeFileSync(settingsPath, JSON.stringify(legacySettings, null, 2));

      const secondInstall = run(['--profile', 'core', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(secondInstall.code, 0, secondInstall.stderr);

      const afterSecondInstall = readJson(settingsPath);
      assert.strictEqual(afterSecondInstall.includeCoAuthoredBy, false);
      assert.deepStrictEqual(afterSecondInstall.hooks.PreToolUse[0], legacySettings.hooks.PreToolUse[0]);
      // hooks/hooks.json (the registration manifest) was removed from the repo, so
      // the pre-existing entry is left exactly as the user wrote it; nothing merges in.
      assert.strictEqual(afterSecondInstall.hooks.PreToolUse.length, 1);
      assert.ok(!afterSecondInstall.hooks.PreToolUse.some(entry => entry.id === 'pre:bash:dispatcher'));
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('reinstall preserves an explicit includeCoAuthoredBy opt-in', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const claudeRoot = path.join(homeDir, '.claude');
      fs.mkdirSync(claudeRoot, { recursive: true });
      const settingsPath = path.join(claudeRoot, 'settings.json');
      const customSettings = {
        includeCoAuthoredBy: true,
        theme: 'dark',
      };
      fs.writeFileSync(settingsPath, JSON.stringify(customSettings, null, 2));

      const install = run(['--profile', 'core', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(install.code, 0, install.stderr);

      const afterInstall = readJson(settingsPath);
      assert.strictEqual(afterInstall.includeCoAuthoredBy, true);
      assert.strictEqual(afterInstall.theme, 'dark');
      // hooks/hooks.json (the registration manifest) was removed from the repo, so
      // no hooks key gets added even on an install that would otherwise register them.
      assert.ok(!afterInstall.hooks, 'no hooks key should be written without a hooks.json source');
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('reinstall preserves an explicit attribution opt-in', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const claudeRoot = path.join(homeDir, '.claude');
      fs.mkdirSync(claudeRoot, { recursive: true });
      const settingsPath = path.join(claudeRoot, 'settings.json');
      // `attribution` supersedes `includeCoAuthoredBy` in Claude Code, so writing
      // the deprecated key here would be dead config that loses to the user's choice.
      const customSettings = {
        attribution: { commit: 'Signed-off-by: Someone <someone@example.com>' },
        theme: 'dark',
      };
      fs.writeFileSync(settingsPath, JSON.stringify(customSettings, null, 2));

      const install = run(['--profile', 'core', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(install.code, 0, install.stderr);

      const afterInstall = readJson(settingsPath);
      assert.deepStrictEqual(afterInstall.attribution, customSettings.attribution);
      assert.strictEqual(afterInstall.theme, 'dark');
      assert.ok(!Object.hasOwn(afterInstall, 'includeCoAuthoredBy'));
      // hooks/hooks.json (the registration manifest) was removed from the repo, so
      // no hooks key gets added even on an install that would otherwise register them.
      assert.ok(!afterInstall.hooks, 'no hooks key should be written without a hooks.json source');
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('malformed Claude settings is left untouched and no longer blocks install', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const claudeRoot = path.join(homeDir, '.claude');
      fs.mkdirSync(claudeRoot, { recursive: true });
      const settingsPath = path.join(claudeRoot, 'settings.json');
      fs.writeFileSync(settingsPath, '{ invalid json\n');

      // Settings-merge validation (including "Failed to parse Claude settings")
      // lived entirely inside the update-claude-settings step, which only runs
      // when hooks/hooks.json exists as a source. That file was removed from the
      // repo, so the step never runs and malformed settings.json no longer aborts
      // the install; the rest of the managed install still completes normally.
      const result = run(['--profile', 'core', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);
      assert.strictEqual(
        fs.readFileSync(settingsPath, 'utf8'),
        '{ invalid json\n',
        'malformed settings.json should be left exactly as-is'
      );
      assert.ok(
        fs.existsSync(path.join(claudeRoot, 'agents', 'architect.md')),
        'the rest of the managed install should still complete'
      );
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('non-object Claude settings is left untouched and no longer blocks install', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const claudeRoot = path.join(homeDir, '.claude');
      fs.mkdirSync(claudeRoot, { recursive: true });
      const settingsPath = path.join(claudeRoot, 'settings.json');
      fs.writeFileSync(settingsPath, '[]\n');

      // See the malformed-settings test above: this validation only ran as part
      // of the now-dead update-claude-settings step.
      const result = run(['--profile', 'core', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);
      assert.strictEqual(
        fs.readFileSync(settingsPath, 'utf8'),
        '[]\n',
        'non-object settings.json should be left exactly as-is'
      );
      assert.ok(
        fs.existsSync(path.join(claudeRoot, 'agents', 'architect.md')),
        'the rest of the managed install should still complete'
      );
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('an existing same-id Claude hook entry is preserved untouched since no managed hooks are registered', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');

    try {
      const claudeRoot = path.join(homeDir, '.claude');
      fs.mkdirSync(claudeRoot, { recursive: true });
      const settingsPath = path.join(claudeRoot, 'settings.json');
      const existing = {
        theme: 'dark',
        hooks: {
          PreToolUse: [{
            id: 'pre:bash:dispatcher',
            matcher: 'Bash',
            hooks: [{ type: 'command', command: 'echo user-owned' }],
          }],
        },
      };
      fs.writeFileSync(settingsPath, `${JSON.stringify(existing, null, 2)}\n`);

      // The "Refusing to overwrite" same-id conflict check only ran as part of the
      // update-claude-settings merge step, which no longer runs (no hooks.json
      // source). There is nothing left to conflict with, so install succeeds and
      // the user's existing hook entry is preserved exactly as written.
      const result = run(['--profile', 'core', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);
      const afterInstall = readJson(settingsPath);
      assert.strictEqual(afterInstall.theme, 'dark');
      assert.deepStrictEqual(afterInstall.hooks, existing.hooks);
      assert.strictEqual(afterInstall.includeCoAuthoredBy, false);
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('installs from ecc-install.json and persists component selections', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');
    const configPath = path.join(projectDir, 'ecc-install.json');

    try {
      fs.writeFileSync(configPath, JSON.stringify({
        version: 1,
        target: 'claude',
        profile: 'developer',
        include: ['capability:security'],
        exclude: ['capability:orchestration'],
      }, null, 2));

      const result = run(['--config', configPath, '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);

      assert.ok(!fs.existsSync(path.join(homeDir, '.claude', 'skills')), 'skill catalog was removed');
      assert.ok(!stateOperationsIncludeSkills(homeDir), 'no skills/ operations in install-state');

      const state = readJson(path.join(homeDir, '.claude', 'ecc', 'install-state.json'));
      assert.strictEqual(state.request.profile, 'developer');
      assert.deepStrictEqual(state.request.includeComponents, ['capability:security']);
      assert.deepStrictEqual(state.request.excludeComponents, ['capability:orchestration']);
      assert.ok(state.resolution.selectedModules.includes('security'));
      assert.ok(!state.resolution.selectedModules.includes('orchestration'));
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('auto-detects ecc-install.json from the project root', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');
    const configPath = path.join(projectDir, 'ecc-install.json');

    try {
      fs.writeFileSync(configPath, JSON.stringify({
        version: 1,
        target: 'claude',
        profile: 'developer',
        include: ['capability:security'],
        exclude: ['capability:orchestration'],
      }, null, 2));

      const result = run(['--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);

      assert.ok(!fs.existsSync(path.join(homeDir, '.claude', 'skills')), 'skill catalog was removed');
      assert.ok(!stateOperationsIncludeSkills(homeDir), 'no skills/ operations in install-state');

      const state = readJson(path.join(homeDir, '.claude', 'ecc', 'install-state.json'));
      assert.strictEqual(state.request.profile, 'developer');
      assert.deepStrictEqual(state.request.includeComponents, ['capability:security']);
      assert.deepStrictEqual(state.request.excludeComponents, ['capability:orchestration']);
      assert.ok(state.resolution.selectedModules.includes('security'));
      assert.ok(!state.resolution.selectedModules.includes('orchestration'));
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('preserves legacy language installs when a project config is present', () => {
    const homeDir = createTempDir('install-apply-home-');
    const projectDir = createTempDir('install-apply-project-');
    const configPath = path.join(projectDir, 'ecc-install.json');

    try {
      fs.writeFileSync(configPath, JSON.stringify({
        version: 1,
        target: 'claude',
        profile: 'developer',
        include: ['capability:security'],
      }, null, 2));

      const result = run(['typescript', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);

      const state = readJson(path.join(homeDir, '.claude', 'ecc', 'install-state.json'));
      assert.strictEqual(state.request.legacyMode, true);
      assert.deepStrictEqual(state.request.legacyLanguages, ['typescript']);
      assert.strictEqual(state.request.profile, null);
      assert.deepStrictEqual(state.request.includeComponents, []);
      // 'framework-language' is not (and never was) a real module id in
      // scripts/lib/install-manifests.js — LEGACY_COMPAT_BASE_MODULE_IDS_BY_TARGET
      // resolves legacy language installs to this fixed module set instead of the
      // manifest-profile 'security' capability requested in ecc-install.json.
      assert.deepStrictEqual(
        state.resolution.selectedModules,
        ['rules-core', 'agents-core', 'commands-core', 'hooks-runtime', 'platform-configs']
      );
      assert.ok(!state.resolution.selectedModules.includes('security'));
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('holds hook materialization without an explicit hook decision', () => {
    const projectDir = createTempDir('install-apply-consent-held-');
    const homeDir = createTempDir('install-apply-consent-held-home-');
    try {
      const result = run(['--profile', 'core'], { cwd: projectDir, homeDir });
      assert.notStrictEqual(result.code, 0);
      assert.ok(result.stderr.includes('automatic hook runtime'));
      assert.ok(result.stderr.includes('--enable-hooks'));
      assert.ok(!fs.existsSync(path.join(homeDir, '.claude', 'hooks', 'hooks.json')));
      assert.ok(!fs.existsSync(path.join(homeDir, '.claude', 'ecc', 'install-state.json')));
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('--no-hooks installs the profile without the hook runtime', () => {
    const projectDir = createTempDir('install-apply-no-hooks-');
    const homeDir = createTempDir('install-apply-no-hooks-home-');
    try {
      const result = run(['--profile', 'core', '--no-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);
      assert.ok(!fs.existsSync(path.join(homeDir, '.claude', 'hooks', 'hooks.json')));
      const state = readJson(path.join(homeDir, '.claude', 'ecc', 'install-state.json'));
      assert.strictEqual(state.request.hookConsent, 'declined');
      assert.ok(!state.resolution.selectedModules.includes('hooks-runtime'));
      assert.ok(state.resolution.selectedModules.includes('rules-core'));
      assert.ok(!state.operations.some(operation => (
        operation.kind === 'update-claude-settings'
      )));
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('--no-hooks removes hooks registered by a previous enabled install', () => {
    const projectDir = createTempDir('install-apply-disable-hooks-');
    const homeDir = createTempDir('install-apply-disable-hooks-home-');
    try {
      const enabled = run(['--profile', 'core', '--enable-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(enabled.code, 0, enabled.stderr);

      const settingsPath = path.join(homeDir, '.claude', 'settings.json');
      const settings = readJson(settingsPath);
      settings.theme = 'dark';
      fs.writeFileSync(settingsPath, `${JSON.stringify(settings, null, 2)}\n`);

      const disabled = run(['--profile', 'core', '--no-hooks'], { cwd: projectDir, homeDir });
      assert.strictEqual(disabled.code, 0, disabled.stderr);
      assert.deepStrictEqual(readJson(settingsPath), {
        includeCoAuthoredBy: false,
        theme: 'dark',
      });

      const state = readJson(path.join(homeDir, '.claude', 'ecc', 'install-state.json'));
      assert.strictEqual(state.request.hookConsent, 'declined');
      assert.ok(!state.operations.some(operation => (
        operation.kind === 'update-claude-settings'
      )));
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  if (test('rejects --enable-hooks combined with --no-hooks', () => {
    const result = run(['--profile', 'core', '--enable-hooks', '--no-hooks']);
    assert.notStrictEqual(result.code, 0);
    assert.ok(result.stderr.includes('mutually exclusive'));
  })) passed++; else failed++;

  if (test('dry-run surfaces the pending hook decision as a warning', () => {
    const projectDir = createTempDir('install-apply-consent-dry-');
    const homeDir = createTempDir('install-apply-consent-dry-home-');
    try {
      const result = run(['--profile', 'core', '--dry-run'], { cwd: projectDir, homeDir });
      assert.strictEqual(result.code, 0, result.stderr);
      assert.ok(result.stdout.includes('explicit hook decision'));
    } finally {
      cleanup(homeDir);
      cleanup(projectDir);
    }
  })) passed++; else failed++;

  console.log(`\nResults: Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
