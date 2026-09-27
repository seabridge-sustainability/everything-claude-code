#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..', '..');
let passed = 0;
function test(name, fn) {
  fn();
  passed += 1;
  console.log('  ok  ' + name);
}
function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8').replace(/\r\n/g, '\n');
}

test('default MCP surface keeps only the requested browser and GitHub integrations', () => {
  const config = JSON.parse(read('.mcp.json'));
  assert.deepStrictEqual(Object.keys(config.mcpServers), ['chrome-devtools', 'github']);
  assert.match(config.mcpServers['chrome-devtools'].args.join(' '), /@1\.10\.1$/);
  assert.match(config.mcpServers.github.args.join(' '), /server-github@2025\.4\.8$/);
  for (const server of Object.values(config.mcpServers)) {
    assert.strictEqual(server.command, 'cmd');
    assert.deepStrictEqual(server.args.slice(0, 2), ['/c', 'npx']);
  }
  if (process.platform === 'win32') {
    const executable = spawnSync('cmd', ['/d', '/s', '/c', 'where npx'], { encoding: 'utf8' });
    assert.strictEqual(executable.status, 0, executable.stderr);
  }
});

test('Cursor loads one compact baseline and generated rules are on demand', () => {
  const result = spawnSync(process.execPath, ['scripts/sync-cursor-rules.js', '--check'], {
    cwd: root,
    encoding: 'utf8',
  });
  assert.strictEqual(result.status, 0, result.stderr);
  const files = fs.readdirSync(path.join(root, '.cursor', 'rules')).filter((name) => /\.(?:md|mdc)$/.test(name));
  const always = files.filter((name) => /alwaysApply:\s*true/.test(read(path.join('.cursor/rules', name))));
  assert.deepStrictEqual(always, ['sea-base.md']);
  const loaded = read('.cursor/rules/sea-base.md');
  assert.match(loaded, /Safety And Authorization Rule/);
  assert.match(loaded, /Goal Protocol Default/);
});

test('Codex wrapper skills resolve relative to the active checkout', () => {
  const result = spawnSync(process.execPath, ['scripts/sync-agent-skill-wrappers.js', '--check'], {
    cwd: root,
    encoding: 'utf8',
  });
  assert.strictEqual(result.status, 0, result.stderr);
  for (const name of ['tdd-workflow', 'verification-loop', 'sea-git-worktree-isolation']) {
    const text = read(path.join('.agents/skills', name, 'SKILL.md'));
    assert.match(text, /\.\.\/\.\.\/\.\.\/skills\//);
    assert.doesNotMatch(text, /C:\\Users\\adelm/);
  }
  assert.doesNotMatch(read('.agents/skills/tdd-workflow/SKILL.md'), /80%|ALL required/);
  assert.doesNotMatch(read('.agents/skills/verification-loop/SKILL.md'), /every 15 minutes/);
});

test('Gemini adapter imports only the canonical startup instructions', () => {
  const gemini = read('GEMINI.md');
  assert.match(gemini, /^@\.\/AGENTS\.md$/m);
  assert.doesNotMatch(gemini, /AGENTS_SYSTEM|AGENT_SKILLS|vendor\/superpowers\/GEMINI/);
});

test('CI has one full suite lane and bounded compatibility coverage', () => {
  const ci = read('.github/workflows/ci.yml');
  assert.strictEqual((ci.match(/node tests\/run-all\.js/g) || []).length, 1);
  assert.strictEqual((ci.match(/suite: (?:full|smoke|windows|macos)/g) || []).length, 8);
  assert.match(ci, /node tests\/scripts\/ecc-universal-bin\.test\.js/);
  assert.match(ci, /suite == 'windows'[\s\S]*mcp-health-check\.test\.js[\s\S]*install-ps1\.test\.js/);
  assert.match(ci, /suite == 'macos'[\s\S]*gan-harness\.test\.js[\s\S]*install-guided\.test\.js/);
  assert.match(ci, /name: Run Windows platform checks[\s\S]*?shell: bash/);
  assert.doesNotMatch(ci, /tags:\s*\['v\*'\]/);
  assert.match(ci, /coverage:[\s\S]*if: github\.event_name == 'pull_request'/);
  const watch = read('.github/workflows/supply-chain-watch.yml');
  assert.match(watch, /cron: '17 5 \* \* \*'/);
  assert.match(watch, /cancel-in-progress: true/);
  assert.doesNotMatch(read('.github/workflows/maintenance.yml'), /npm audit|npm outdated/);
  for (const name of fs.readdirSync(path.join(root, '.github', 'workflows'))) {
    if (!/\.ya?ml$/i.test(name)) continue;
    const source = read(path.join('.github/workflows', name));
    for (const match of source.matchAll(/^\s*uses:\s*['"]?([^\s'"#]+)@([^\s'"#]+)['"]?/gm)) {
      if (match[1].startsWith('./')) continue;
      assert.match(match[2], /^[0-9a-f]{40}$/i, name + ' has mutable action ref: ' + match[0].trim());
    }
  }
  const opencode = read('.github/workflows/opencode.yml');
  assert.ok(opencode.indexOf('  pull_request_review_comment:') < opencode.indexOf('\nconcurrency:'),
    'pull_request_review_comment must be a top-level event under on:');
});

test('local secret hook blocks a staged sentinel without echoing its value', () => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-secret-hook-'));
  const runGit = (args) => spawnSync('git', args, { cwd: fixture, encoding: 'utf8' });
  assert.strictEqual(runGit(['init', '--quiet']).status, 0);
  assert.strictEqual(runGit(['config', 'user.email', 'agent-system-test@example.invalid']).status, 0);
  assert.strictEqual(runGit(['config', 'user.name', 'Agent System Test']).status, 0);
  fs.writeFileSync(path.join(fixture, 'README.md'), 'fixture\n');
  assert.strictEqual(runGit(['add', 'README.md']).status, 0);
  assert.strictEqual(runGit(['commit', '--quiet', '-m', 'fixture']).status, 0);
  const hookDir = path.join(fixture, '.git', 'hooks');
  const hookPath = path.join(hookDir, 'pre-commit');
  fs.copyFileSync(path.join(root, 'scripts', 'codex-git-hooks', 'pre-commit'), hookPath);
  fs.chmodSync(hookPath, 0o755);
  const sentinel = 'sk-ThisSentinelMustNeverAppear12345';
  fs.writeFileSync(path.join(fixture, 'unsafe.txt'), `API_KEY="${sentinel}"\n`);
  assert.strictEqual(runGit(['add', 'unsafe.txt']).status, 0);
  const blocked = runGit(['commit', '-m', 'must fail']);
  const output = `${blocked.stdout || ''}\n${blocked.stderr || ''}`;
  assert.notStrictEqual(blocked.status, 0);
  assert.match(output, /value redacted/);
  assert.doesNotMatch(output, new RegExp(sentinel));
  fs.rmSync(fixture, { recursive: true, force: true });
});

test('instruction scenario evaluator fails closed with advisory opt-out', () => {
  const evaluator = require(path.join(root, 'scripts', 'eval-instruction-scenarios.js'));
  assert.notStrictEqual(evaluator.defaultWorkspace(), path.parse(root).root,
    'detached worktrees must not resolve the instruction workspace to the filesystem root');
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'instruction-eval-'));
  const scenarios = path.join(workspace, 'scenarios.json');
  fs.writeFileSync(scenarios, JSON.stringify({
    scenarios: [{ id: 'required-proof', must: ['needle'], must_not: [] }],
  }));
  for (const repo of ['manageesg-backend', 'manageesg-frontend', 'autoresearch']) {
    const dir = path.join(workspace, repo);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'AGENTS.md'), 'SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\n');
    fs.writeFileSync(path.join(dir, 'CLAUDE.md'), '@AGENTS.md\n');
  }
  const env = {
    ...process.env,
    SEABRIDGE_INSTRUCTION_SCENARIOS: scenarios,
  };
  const strict = spawnSync(process.execPath, ['scripts/eval-instruction-scenarios.js', '--workspace', workspace], { cwd: root, env });
  const advisory = spawnSync(process.execPath, ['scripts/eval-instruction-scenarios.js', '--workspace', workspace, '--advisory'], { cwd: root, env });
  assert.strictEqual(strict.status, 1);
  assert.strictEqual(advisory.status, 0);
  fs.rmSync(workspace, { recursive: true, force: true });
});

console.log('agent-system-efficiency: ' + passed + ' passed');
