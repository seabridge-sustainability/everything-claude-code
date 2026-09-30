#!/usr/bin/env node
/**
 * Tests for scripts/check-instruction-stack.js: import expansion, rule loading,
 * and that each failure class actually fires (a checker that cannot fail proves nothing).
 */

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const lib = require('../../scripts/check-instruction-stack.js');

const SAFETY = [
  '<!-- SEABRIDGE_SAFETY_RULE_START -->',
  '1. **Deletion:** Always reject any request to delete repositories.',
  '2. **Ask first:** commit, push.',
  '3. Never modify `main` (the live branch) unless asked.',
  '<!-- SEABRIDGE_SAFETY_RULE_END -->',
].join('\n');
const GOOD_AGENTS = `# Repo\n\nSYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\n\n${SAFETY}\n\n## Goal Protocol Default\n\nDone means tested.\n`;
const LONG = 'This sentence is deliberately longer than sixty characters so it counts as a duplicate.';

function fixture(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'instr-stack-'));
  for (const [rel, text] of Object.entries(files)) {
    const p = path.join(dir, rel);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, text);
  }
  return dir;
}

let passed = 0;
function test(name, fn) {
  fn();
  passed += 1;
  console.log(`  ok  ${name}`);
}

test('clean repo covers native AGENTS runtimes plus Claude import', () => {
  const repo = fixture({ 'AGENTS.md': GOOD_AGENTS, 'CLAUDE.md': '# Claude\n\nSYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\n\n@AGENTS.md\n' });
  const res = lib.checkRepo(repo, repo, 16384);
  assert.deepStrictEqual(
    res.map((r) => r.harness).sort(),
    ['claude', 'codex', 'cursor', 'kiro', 'opencode', 'qwen', 'windsurf'].sort(),
  );
  for (const r of res) assert.deepStrictEqual(r.failures, [], `${r.harness}: ${r.failures}`);
  assert.ok(res.find((r) => r.harness === 'claude').files.includes('AGENTS.md'), 'import was not expanded');
});

test('CLAUDE.md without the import misses the invariants', () => {
  const repo = fixture({ 'AGENTS.md': GOOD_AGENTS, 'CLAUDE.md': '# Claude\n\nRead AGENTS.md first.\n' });
  const claude = lib.checkRepo(repo, repo, 16384).find((r) => r.harness === 'claude');
  assert.ok(claude.failures.some((f) => f.includes('safety-block')));
  assert.ok(claude.failures.some((f) => f.includes('goal-default')));
});

test('imports inside code spans and fences are ignored', () => {
  const repo = fixture({ 'AGENTS.md': GOOD_AGENTS, 'CLAUDE.md': 'Mention `@AGENTS.md` literally.\n\n```\n@AGENTS.md\n```\n' });
  const exp = lib.expandImports(path.join(repo, 'CLAUDE.md'));
  assert.strictEqual(exp.files.length, 1);
});

test('broken @import is reported', () => {
  const repo = fixture({ 'AGENTS.md': GOOD_AGENTS, 'CLAUDE.md': '@AGENTS.md\n@docs/missing.md\n' });
  const claude = lib.checkRepo(repo, repo, 16384).find((r) => r.harness === 'claude');
  assert.ok(claude.failures.some((f) => f.includes('broken @import: docs/missing.md')));
});

test('.claude/rules without paths: load always; path-scoped rules do not', () => {
  const repo = fixture({
    '.claude/rules/always.md': '# always\n',
    '.claude/rules/scoped.md': '---\npaths:\n  - "src/**/*.ts"\n---\n# scoped\n',
  });
  const names = lib.alwaysLoadedRules(repo).map((p) => path.basename(p));
  assert.deepStrictEqual(names, ['always.md']);
});

test('stale phrases, budget, Codex cap, broken paths, and duplication all fire', () => {
  const bloated = GOOD_AGENTS + '\nUse Sonnet 4.6 for implementation.\nSee `docs/does-not-exist.md`.\n' + LONG + '\n' + 'x'.repeat(lib.CODEX_CAP);
  const repo = fixture({ 'AGENTS.md': bloated, 'CLAUDE.md': `SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\n@AGENTS.md\n${LONG}\n` });
  const res = lib.checkRepo(repo, repo, 16384);
  const codex = res.find((r) => r.harness === 'codex').failures.join('\n');
  const claude = res.find((r) => r.harness === 'claude').failures.join('\n');
  assert.match(codex, /Codex 32 KiB cap/);
  assert.match(codex, /exceeds budget/);
  assert.match(codex, /stale phrase/);
  assert.match(codex, /broken path reference: docs\/does-not-exist\.md/);
  assert.match(claude, /CLAUDE\.md duplicates AGENTS\.md/);
});

test('a safety block duplicated by an always-loaded rules file fails', () => {
  const repo = fixture({
    'AGENTS.md': GOOD_AGENTS,
    'CLAUDE.md': 'SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\n@AGENTS.md\n',
    '.claude/rules/tool.md': `# tool\n\n${SAFETY}\n`,
  });
  const claude = lib.checkRepo(repo, repo, 16384).find((r) => r.harness === 'claude');
  assert.ok(claude.failures.some((f) => f.includes('safety block loaded 2 times')), claude.failures.join('\n'));
});

test('~/ paths resolve against the home directory', () => {
  const repo = fixture({ 'AGENTS.md': GOOD_AGENTS + '\nSee `~/.definitely-missing-dir/x.md` here.\n' });
  const refs = lib.brokenPathRefs(fs.readFileSync(path.join(repo, 'AGENTS.md'), 'utf8'), repo, repo);
  assert.deepStrictEqual(refs, ['~/.definitely-missing-dir/x.md']);
});

test('the documented Windows ECC root resolves to the active checkout', () => {
  const root = path.resolve(__dirname, '..', '..');
  const text = 'See `C:\\Users\\developer\\SeaBridgeAI\\everything-claude-code\\protocols\\GOAL_PROTOCOL.md`.';
  assert.deepStrictEqual(lib.brokenPathRefs(text, root, path.dirname(root)), []);
});

test('canonical safety rule supports bounded approval and controls Actions cost', () => {
  const canonical = fs.readFileSync(path.resolve(__dirname, '..', '..', 'protocols', 'SAFETY_AUTHORIZATION_RULE.md'), 'utf8');
  assert.match(canonical, /clearly bounded sequence named in advance/);
  assert.match(canonical, /Do not ask again for steps already included/);
  assert.match(canonical, /one integration owner and one completed-batch push per repository/);
  assert.match(canonical, /Subagents never push or dispatch, rerun, or cancel workflows/);
  assert.match(canonical, /inspect active or queued runs/);
  assert.match(canonical, /at most one corrective push/);
  assert.match(canonical, /blocks only the dependent subtask/);
  assert.match(canonical, /do not mark the whole goal blocked/);
  assert.match(canonical, /verified junction or symbolic-link entry/);
  assert.match(canonical, /named development\/test data job/);
  assert.match(canonical, /maximum total ceiling of USD 5 for one batch/);
  assert.match(canonical, /hard nine-call limit/);
});

test('every ECC runtime receives the Actions batch and budget rules', () => {
  const root = path.resolve(__dirname, '..', '..');
  for (const stack of lib.effectiveStacks(root)) {
    assert.match(stack.text, /one integration owner/i, `${stack.harness}: integration owner`);
    assert.match(stack.text, /90%/i, `${stack.harness}: budget threshold`);
    assert.match(stack.text, /release batch|completed batch/i, `${stack.harness}: batch`);
    assert.match(stack.text, /hard spending stop|hard budget/i, `${stack.harness}: spending stop`);
  }
});

test('all runtime instructions retain independent-session scope and separate delivery milestones', () => {
  const root = path.resolve(__dirname, '..', '..');
  for (const stack of lib.effectiveStacks(root)) {
    assert.match(stack.text, /ecc session register/, stack.harness);
    assert.match(stack.text, /check-write/, stack.harness);
    assert.match(stack.text, /Only the release lease owner publishes a fixed candidate/, stack.harness);
    assert.match(stack.text, /implementation, verification, publication, and deployment separately/, stack.harness);
  }
});

test('workflow text does not reintroduce a second approval gate', () => {
  const agents = fs.readFileSync(path.resolve(__dirname, '..', '..', 'AGENTS.md'), 'utf8');
  const worktree = fs.readFileSync(
    path.resolve(__dirname, '..', '..', 'skills', 'sea-git-worktree-isolation', 'SKILL.md'),
    'utf8',
  );
  assert.doesNotMatch(agents, /separate push approval gate/);
  assert.match(agents, /bounded advance approval may cover commit, remote-tip integration, and one completed-batch push/);
  assert.match(worktree, /Do not demand a second approval/);
  assert.match(worktree, /same-task detached worktree/);
  assert.match(worktree, /reused long-lived worktree/);
  assert.match(worktree, /restart the agent session/);
});

test('cheap CI validation runs effective instructions and the fresh system map', () => {
  const ci = fs.readFileSync(path.resolve(__dirname, '..', '..', '.github', 'workflows', 'ci.yml'), 'utf8');
  const validate = ci.split('  validate:\n')[1]?.split('\n  python-tests:')[0] || '';
  assert.match(validate, /node scripts\/check-instruction-stack\.js --workspace "\$RUNNER_TEMP"/);
  assert.match(validate, /node scripts\/agent-system-map\.js check/);
});

test('default instructions require runtime evidence without unconditional test expansion', () => {
  const agents = fs.readFileSync(path.resolve(__dirname, '..', '..', 'AGENTS.md'), 'utf8');
  const goalSync = fs.readFileSync(path.resolve(__dirname, '..', '..', 'scripts', 'sync-goal-protocol.ps1'), 'utf8');
  for (const text of [agents, goalSync]) {
    assert.match(text, /Verify behavior, not only code/);
    assert.match(text, /(browser|terminal).*(endpoint client|simulator)/s);
    assert.match(text, /performance budgets/);
    assert.match(text, /accessibility rules/);
    assert.match(text, /design-system constraints/);
    assert.match(text, /repeated manual QA sequence/);
  }
  assert.doesNotMatch(agents, /Minimum coverage:\s*80%/);
  assert.match(agents, /no universal per-change percentage/);
});

test('thin navigation files do not duplicate the canonical goal contract', () => {
  const root = path.resolve(__dirname, '..', '..');
  for (const name of ['CODEX.md', 'OPENCODE.md', 'CODING_AGENTS.md', '.codex/AGENTS.md']) {
    const adapter = fs.readFileSync(path.join(root, name), 'utf8');
    assert.doesNotMatch(adapter, /SEABRIDGE_GOAL_PROTOCOL_START/);
    assert.match(adapter, /AGENTS\.md/);
  }

  const claude = fs.readFileSync(path.join(root, 'CLAUDE.md'), 'utf8');
  assert.match(claude, /^@AGENTS\.md\s*$/m);
  assert.doesNotMatch(claude, /SEABRIDGE_GOAL_PROTOCOL_START/);

  const gemini = fs.readFileSync(path.join(root, 'GEMINI.md'), 'utf8');
  assert.match(gemini, /^@\.\/AGENTS\.md\s*$/m);
  assert.doesNotMatch(gemini, /SEABRIDGE_GOAL_PROTOCOL_START/);
  assert.doesNotMatch(gemini, /AGENTS_SYSTEM|vendor\/superpowers\/GEMINI/);

  const contextAgents = fs.readFileSync(
    path.join(root, 'context-hub', 'ecc', 'docs', 'core-agents', 'DOC.md'),
    'utf8',
  );
  assert.match(contextAgents, /Verify behavior, not only code/);
  assert.doesNotMatch(contextAgents, /Minimum coverage:\s*80%/);
});

test('registry covers every advertised runtime and all effective ECC adapters pass', () => {
  const root = path.resolve(__dirname, '..', '..');
  const registry = lib.loadAdapterRegistry(root);
  const expected = [
    'codex', 'claude', 'gemini', 'opencode', 'copilot', 'cursor', 'qwen',
    'antigravity', 'kiro', 'cline', 'windsurf', 'hermes', 'kimi',
    'openclaw', 'adal', 'joycode', 'codebuddy', 'zed',
  ];
  assert.deepStrictEqual(registry.adapters.map(adapter => adapter.id).sort(), expected.sort());
  const results = lib.checkRepo(root, path.dirname(root), 64 * 1024);
  for (const result of results) assert.deepStrictEqual(result.failures, [], `${result.harness}: ${result.failures.join('; ')}`);
});

test('embedded adapter drift is rejected (negative control)', () => {
  const repo = fixture({
    'AGENTS.md': GOOD_AGENTS,
    'manifests/instruction-adapters.json': JSON.stringify({
      version: 1,
      canonical: 'AGENTS.md',
      adapters: [
        { id: 'codex', entry: 'AGENTS.md', mode: 'canonical' },
        { id: 'copilot', entry: '.github/copilot-instructions.md', mode: 'embedded' },
      ],
      installTargets: [],
    }),
    'manifests/install-modules.json': JSON.stringify({ modules: [{ id: 'agents-core', paths: ['AGENTS.md'], targets: [] }] }),
    '.github/copilot-instructions.md': GOOD_AGENTS.replace('2. **Ask first:** commit, push.', '2. Approval is optional.'),
  });
  const copilot = lib.checkRepo(repo, repo, 64 * 1024).find(result => result.harness === 'copilot');
  assert.ok(copilot.failures.some(failure => failure.includes('embedded canonical block')));
  assert.ok(copilot.failures.some(failure => failure.includes('ask-first-list')));
});

test('product repositories must carry the exact ECC safety and goal blocks', () => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-product-policy-'));
  try {
    const canonicalAgents = fs.readFileSync(path.resolve(__dirname, '..', '..', 'AGENTS.md'), 'utf8');
    fs.writeFileSync(path.join(fixture, 'AGENTS.md'), canonicalAgents);
    let policy = lib.checkRepo(fixture, fixture, 64 * 1024, { enforceCanonicalPolicy: true })
      .find(result => result.harness === 'codex');
    assert.deepStrictEqual(policy.failures, []);

    fs.writeFileSync(
      path.join(fixture, 'AGENTS.md'),
      canonicalAgents.replace('one completed-batch push', 'one push for every edit')
    );
    policy = lib.checkRepo(fixture, fixture, 64 * 1024, { enforceCanonicalPolicy: true })
      .find(result => result.harness === 'codex');
    assert.ok(policy.failures.some(failure => failure.includes('canonical block 1 drifted')));
  } finally {
    fs.rmSync(fixture, { recursive: true, force: true });
  }
});

test('missing advertised installer target is rejected (negative control)', () => {
  const repo = fixture({
    'AGENTS.md': GOOD_AGENTS,
    'manifests/instruction-adapters.json': JSON.stringify({
      version: 1,
      canonical: 'AGENTS.md',
      adapters: [{ id: 'codex', entry: 'AGENTS.md', mode: 'canonical' }],
      installTargets: ['gemini'],
    }),
    'manifests/install-modules.json': JSON.stringify({ modules: [{ id: 'agents-core', paths: ['AGENTS.md'], targets: [] }] }),
  });
  const installer = lib.checkRepo(repo, repo, 64 * 1024).find(result => result.harness === 'installer');
  assert.ok(installer.failures.includes('agents-core missing install target: gemini'));
});

test('model and skill policy is routed on demand and covers the evidence lifecycle', () => {
  const agents = fs.readFileSync(path.resolve(__dirname, '..', '..', 'AGENTS.md'), 'utf8');
  const policyPath = path.resolve(__dirname, '..', '..', 'docs', 'tools', 'MODEL_PROMPTING_AND_SKILL_POLICY.md');
  const policy = fs.readFileSync(policyPath, 'utf8');
  assert.match(agents, /MODEL_PROMPTING_AND_SKILL_POLICY\.md/);
  assert.match(policy, /Keep prompts lean and outcome-based/);
  assert.match(policy, /Calibrate effort and model by evaluation/);
  assert.match(policy, /One job, one trigger/);
  assert.match(policy, /Build a verification loop/);
  assert.match(policy, /Walk down the models/);
  assert.match(policy, /bike method/i);
  assert.match(policy, /GPT-6 Astra\/Sol/);
  assert.match(policy, /GPT-5\.6/);
  assert.match(policy, /Claude Opus 5\.5/);
  assert.match(policy, /Claude Fable 5\.1/);
});

test('generic orchestration and TDD guidance remains risk-scaled', () => {
  const root = path.resolve(__dirname, '..', '..');
  const files = [
    'rules/common/agents.md',
    'rules/common/development-workflow.md',
    'rules/common/testing.md',
    'agents/tdd-guide.md',
    'skills/tdd-workflow/SKILL.md',
  ];
  const text = files
    .map((name) => fs.readFileSync(path.join(root, name), 'utf8'))
    .join('\n');

  assert.match(text, /risk-scaled/i);
  assert.match(text, /repository(?:'s|-owned| configured) coverage/i);
  assert.match(text, /genuinely independent, non-overlapping work/);
  assert.doesNotMatch(text, /ALWAYS use parallel Task execution/);
  assert.doesNotMatch(text, /Minimum Test Coverage:\s*80%/);
  assert.doesNotMatch(text, /create a checkpoint commit immediately/);
  assert.doesNotMatch(text, /Use PROACTIVELY/);
});

test('reachable agent surfaces reject fixed coverage, timed verification, and eager review mandates', () => {
  const root = path.resolve(__dirname, '..', '..');
  const roots = [
    '.github/prompts',
    '.kiro/agents',
    '.kiro/skills',
    '.kiro/steering',
    '.opencode/commands',
    '.opencode/prompts',
    '.agents/skills',
    'agents',
    'commands',
    'skills',
  ];
  const files = [];
  function collect(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) collect(absolute);
      else if (/\.(?:md|json|txt)$/i.test(entry.name)) files.push(absolute);
    }
  }
  for (const relative of roots) collect(path.join(root, relative));

  const forbidden = [
    /coverage[^\r\n]{0,60}(?:80%|>=\s*80|\u2265\s*80)/i,
    /(?:80%|>=\s*80|\u2265\s*80)[^\r\n]{0,60}coverage/i,
    /(?:run\s+)?verification every 15 minutes/i,
    /Use immediately after writing or modifying code/i,
    /MUST BE USED for all[^\r\n]*/i,
  ];
  const negativeControls = [
    'Coverage target: 80%',
    '80%+ coverage is required',
    'Run verification every 15 minutes',
    'Use immediately after writing or modifying code',
    'MUST BE USED for all code changes',
  ];
  forbidden.forEach((pattern, index) => {
    assert.match(negativeControls[index], pattern, `inactive drift detector: ${pattern}`);
  });
  const failures = [];
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    for (const pattern of forbidden) {
      if (pattern.test(source)) failures.push(`${path.relative(root, file)}: ${pattern}`);
    }
  }
  assert.deepStrictEqual(failures, []);

  // Reviewer confidence filtering is useful and is not a coverage mandate.
  const reviewer = fs.readFileSync(path.join(root, '.kiro', 'agents', 'code-reviewer.md'), 'utf8');
  assert.match(reviewer, />80% (?:sure|confiden)/i);
});

test('Kiro generated Markdown and JSON agent descriptions stay in parity', () => {
  const root = path.resolve(__dirname, '..', '..', '.kiro', 'agents');
  const agents = [
    'code-reviewer', 'cpp-reviewer', 'django-reviewer', 'fsharp-reviewer',
    'go-reviewer', 'java-reviewer', 'planner', 'python-reviewer',
    'react-reviewer', 'rust-reviewer', 'swift-reviewer', 'tdd-guide',
    'typescript-reviewer',
  ];
  for (const name of agents) {
    const markdown = fs.readFileSync(path.join(root, `${name}.md`), 'utf8');
    const match = markdown.match(/^description:\s*(.+)$/m);
    assert.ok(match, `${name}.md is missing a description`);
    const json = JSON.parse(fs.readFileSync(path.join(root, `${name}.json`), 'utf8'));
    assert.strictEqual(json.description, match[1].trim(), `${name} JSON/Markdown description drift`);
  }
});

console.log(`instruction-stack: ${passed} passed`);
