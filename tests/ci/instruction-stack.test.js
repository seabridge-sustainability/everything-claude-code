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

// Test policy as agents receive it, not the text of a compatibility loader.
function currentPolicy() {
  const root = path.resolve(__dirname, '..', '..');
  return lib.effectiveStacks(root).find(stack => stack.harness === 'codex').text;
}

const SAFETY = [
  '<!-- SEABRIDGE_SAFETY_RULE_START -->',
  '1. **Deletion:** Always reject any request to delete repositories.',
  '2. **Ask first:** commit, push.',
  "3. Never touch backend `main` or frontend `master`. New worktree/branch: Alejandro must explicitly approve path/name/reason; autonomy isn't approval.",
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

test('wrong frontend live branch or implicit worktree approval fails every effective stack', () => {
  for (const text of [GOOD_AGENTS.replace('frontend `master`', 'frontend `main`'),
    GOOD_AGENTS.replace('New worktree/branch: Alejandro must explicitly approve path/name/reason; autonomy isn\'t approval.', 'General autonomy permits worktrees.')]) {
    const repo = fixture({ 'AGENTS.md': text, 'CLAUDE.md': '@AGENTS.md\n' });
    const result = lib.checkRepo(repo, repo, 16384);
    for (const row of result) assert.ok(row.failures.some(f => /live-branch-rule|explicit-worktree-approval/.test(f)), row.harness);
  }
});

test('bounded standing worktree approval passes and unsafe expansions fail', () => {
  const bounded = "Standing owner approval (2026-10-14): detached release/integration worktrees at `C:/Users/adelm/SeaBridgeAI/.worktrees/<session>-<purpose>-<date>` from the origin normal branch, carrying only session-owned commits; the work must land in that repo's normal branch, then remove the worktree. New branches, other worktree locations (E:, home, repo subfolders) still need Alejandro's explicit path/name/reason; autonomy isn't approval.";
  const predicate = lib.REQUIRED.find(rule => rule.id === 'explicit-worktree-approval').re;
  assert.ok(predicate.test(bounded));
  assert.ok(predicate.test(SAFETY), 'retain explicit-only policy compatibility');
  for (const [from, to] of [
    ['detached release/integration worktrees', 'unlimited worktrees'],
    ['C:/Users/adelm/SeaBridgeAI/.worktrees/', 'E:/worktrees/'],
    ['from the origin normal branch', 'from arbitrary history'],
    ['carrying only session-owned commits', 'carrying foreign commits'],
    ["work must land in that repo's normal branch", 'work stays on a side branch'],
    ['then remove the worktree', 'keep every worktree'],
    ["still need Alejandro's explicit path/name/reason", 'never need approval'],
  ]) {
    assert.ok(bounded.includes(from));
    assert.equal(predicate.test(bounded.replace(from, to)), false, from);
  }
  assert.equal(predicate.test('General autonomy permits all worktrees.'), false);
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
  const canonical = currentPolicy();
  assert.match(canonical, /clearly bounded sequence named in advance/);
  assert.match(canonical, /Do not (?:ask again for steps already included|re-ask for included steps)/);
  assert.match(canonical, /one integration owner\/(?:completed-batch push per repo)|one integration owner and one completed-batch push per repository/);
  assert.match(canonical, /Subagents never push(?: or dispatch, rerun, or cancel workflows|\/dispatch\/rerun\/cancel workflows)/);
  assert.match(canonical, /inspect active(?: or queued runs|\/queued runs)/);
  assert.match(canonical, /at most one corrective push/);
  assert.match(canonical, /blocks only the dependent subtask|block only dependent work/);
  assert.match(canonical, /do not mark the whole goal blocked|never block the whole goal while meaningful work remains/);
  assert.match(canonical, /verified junction or symbolic-link entry/);
  assert.match(canonical, /named development\/test data job/);
  assert.match(canonical, /maximum total ceiling of USD 5 for one batch|USD 5 total, never per call/);
  assert.match(canonical, /hard nine-call limit/);
});

test('every ECC runtime receives the Actions batch and budget rules', () => {
  const root = path.resolve(__dirname, '..', '..');
  for (const stack of lib.effectiveStacks(root)) {
    assert.match(stack.text, /one integration owner/i, `${stack.harness}: integration owner`);
    assert.match(stack.text, /90%/i, `${stack.harness}: budget threshold`);
    assert.match(stack.text, /release batch|completed[ -]batch/i, `${stack.harness}: batch`);
    assert.match(stack.text, /hard spending stop|hard budget/i, `${stack.harness}: spending stop`);
  }
});

test('all runtime instructions retain independent-session scope and separate delivery milestones', () => {
  const root = path.resolve(__dirname, '..', '..');
  for (const stack of lib.effectiveStacks(root)) {
    assert.match(stack.text, /ecc session register/, stack.harness);
    assert.match(stack.text, /check-write/, stack.harness);
    assert.match(stack.text, /Release(?: owner(?: only|:)|: owner).*release-acquire.*check-release.*(?:bind )?fixed full SHA/s, stack.harness);
    assert.match(stack.text, /(?:Separate|Distinguish)\s+implementation\/\s*verification\/publication\/deploy/, stack.harness);
  }
});

test('workflow text does not reintroduce a second approval gate', () => {
  const agents = currentPolicy();
  const worktree = fs.readFileSync(
    path.resolve(__dirname, '..', '..', 'skills', 'sea-git-worktree-isolation', 'SKILL.md'),
    'utf8',
  );
  assert.doesNotMatch(agents, /separate push approval gate/);
  assert.match(agents, /clearly bounded sequence named in advance/);
  assert.match(agents, /Do not (?:ask again for steps already included|re-ask for included steps)/);
  assert.match(worktree, /explicit.*approval/is);
  assert.match(worktree, /primary/i);
  assert.doesNotMatch(worktree, /always create a worktree/i);
});

test('cheap CI validation runs effective instructions and the fresh system map', () => {
  const ci = fs.readFileSync(path.resolve(__dirname, '..', '..', '.github', 'workflows', 'ci.yml'), 'utf8');
  const validate = ci.split('  validate:\n')[1]?.split('\n  python-tests:')[0] || '';
  assert.match(validate, /node scripts\/check-instruction-stack\.js --workspace "\$RUNNER_TEMP"/);
  assert.match(validate, /node scripts\/agent-system-map\.js check/);
});

test('default instructions require runtime evidence without unconditional test expansion', () => {
  const agents = currentPolicy();
  const goalSync = fs.readFileSync(path.resolve(__dirname, '..', '..', 'scripts', 'sync-goal-protocol.ps1'), 'utf8');
  assert.doesNotMatch(goalSync, /parts\.Add|New-GoalBlock/);
  for (const {text, harness} of lib.effectiveStacks(path.resolve(__dirname, '..', '..'))) {
    assert.match(text, /Tests\/CI are not\s+product proof/, harness);
    assert.match(text, /signed-in UI\/durable/, harness);
    assert.match(text, /Bind subject\/source\/revision\/code\/environment/, harness);
    assert.match(text, /Repeated QA\s+becomes a (?:narrow|focused)\s+skill\/script/, harness);
    assert.match(text, /No (?:universal|fixed)\s+coverage\/TDD\/review ritual/, harness);
  }
  assert.doesNotMatch(agents, /Minimum coverage:\s*80%/);
  assert.match(agents, /No fixed coverage|No universal\s+coverage\/TDD\/review ritual/);
});

test('thin navigation files do not duplicate the canonical goal contract', () => {
  const root = path.resolve(__dirname, '..', '..');
  for (const name of ['CODEX.md', 'OPENCODE.md', 'CODING_AGENTS.md', '.codex/AGENTS.md']) {
    const adapter = fs.readFileSync(path.join(root, name), 'utf8');
    assert.doesNotMatch(adapter, /SEABRIDGE_GOAL_PROTOCOL_START/);
    assert.match(adapter, /AGENTS\.md/);
  }

  const claude = fs.readFileSync(path.join(root, 'CLAUDE.md'), 'utf8');
  assert.match(claude, /^@\.\.\/manageesg-backend\/CLAUDE\.md\s*$/m);
  assert.match(lib.expandImports(path.join(root, 'CLAUDE.md')).text, /## Goal Protocol Default/);
  assert.doesNotMatch(claude, /SEABRIDGE_GOAL_PROTOCOL_START/);

  const gemini = fs.readFileSync(path.join(root, 'GEMINI.md'), 'utf8');
  assert.match(gemini, /^@\.\/AGENTS\.md\s*$/m);
  assert.doesNotMatch(gemini, /SEABRIDGE_GOAL_PROTOCOL_START/);
  assert.doesNotMatch(gemini, /AGENTS_SYSTEM|vendor\/superpowers\/GEMINI/);

  const loaded = lib.expandImports(path.join(root, 'AGENTS.md'));
  assert.ok(loaded.files.some(file => file.endsWith(path.join('manageesg-backend', 'AGENTS_SYSTEM.md'))));
  assert.strictEqual(loaded.missing.length, 0);

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

test('Windows forward-slash ECC references resolve and missing files still fail', () => {
  const repo = fixture({ 'AGENTS.md': GOOD_AGENTS });
  assert.deepStrictEqual(lib.brokenPathRefs(
    '`C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime/AGENTS.md`', repo, repo), []);
  assert.deepStrictEqual(lib.brokenPathRefs(
    '`C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime/missing.md`', repo, repo),
    ['C:/Users/adelm/SeaBridgeAI/everything-claude-code-runtime/missing.md']);
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
    // Contract parity concerns the two policy blocks; repository paths are
    // validated separately against the real adapter stacks above.
    const canonicalAgents = 'SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\n' +
      lib.canonicalBlocks(path.resolve(__dirname, '..', '..')).join('\n');
    fs.writeFileSync(path.join(fixture, 'AGENTS.md'), canonicalAgents);
    let policy = lib.checkRepo(fixture, fixture, 64 * 1024, { enforceCanonicalPolicy: true })
      .find(result => result.harness === 'codex');
    assert.deepStrictEqual(policy.failures, []);

    const mutation = canonicalAgents.replace('completed-batch push', 'push for every edit');
    assert.notStrictEqual(mutation, canonicalAgents, 'negative control must actually mutate the contract');
    fs.writeFileSync(path.join(fixture, 'AGENTS.md'), mutation);
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
  const agents = currentPolicy();
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

test('central references resolve and missing shared policy fails all native loaders', () => {
  const repo = fixture({
    'AGENTS.md': '<!-- SEABRIDGE_CORE_ENTRY: core/AGENTS.md -->\n',
    'core/AGENTS.md': '@AGENTS_SYSTEM.md\n',
    'core/AGENTS_SYSTEM.md': GOOD_AGENTS,
  });
  for (const row of lib.checkRepo(repo, repo, 32768)) assert.deepStrictEqual(row.failures, []);
  fs.renameSync(path.join(repo, 'core', 'AGENTS_SYSTEM.md'), path.join(repo, 'core', 'missing.md'));
  for (const row of lib.checkRepo(repo, repo, 32768)) {
    assert.ok(row.failures.some(f => /broken @import|missing invariant/.test(f)), row.harness);
  }
});

test('compatibility adapters carry no copies of central safety or goal policy', () => {
  const root = path.resolve(__dirname, '..', '..');
  for (const entry of ['AGENTS.md', 'AGENTS_SYSTEM.md', 'AGENT_SKILLS.md',
    'SEABRIDGE_CODING_AGENT_SYSTEM.md', 'protocols/GOAL_PROTOCOL.md',
    'protocols/GOAL_PROTOCOL_SHORT.md', 'protocols/SAFETY_AUTHORIZATION_RULE.md',
    'protocols/CONCURRENT_SESSION_PROTOCOL.md', '.github/copilot-instructions.md',
    '.agents/rules/seabridge-agent-baseline.md', '.clinerules']) {
    const text = fs.readFileSync(path.join(root, entry), 'utf8');
    assert.match(text, /SEABRIDGE_CORE_ENTRY/);
    assert.doesNotMatch(text, /SEABRIDGE_(?:SAFETY_RULE|GOAL_PROTOCOL)_START/);
    assert.deepStrictEqual(lib.expandImports(path.join(root, entry)).missing, []);
  }
  assert.strictEqual(fs.existsSync(path.join(root, 'protocols/MVP_EXECUTION_FOCUS.md')), false);
});

console.log(`instruction-stack: ${passed} passed`);
