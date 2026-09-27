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

function markerBlock(text, start, end) {
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
  const match = text.replace(/\r\n/g, '\n').match(pattern);
  assert.ok(match, `missing generated block ${start}`);
  return match[0];
}

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

test('clean repo with @AGENTS.md import passes for both harnesses', () => {
  const repo = fixture({ 'AGENTS.md': GOOD_AGENTS, 'CLAUDE.md': '# Claude\n\nSYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\n\n@AGENTS.md\n' });
  const res = lib.checkRepo(repo, repo, 16384);
  assert.deepStrictEqual(res.map((r) => r.harness).sort(), ['claude', 'codex']);
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

test('canonical safety rule supports bounded approval and controls Actions cost', () => {
  const canonical = fs.readFileSync(path.resolve(__dirname, '..', '..', 'protocols', 'SAFETY_AUTHORIZATION_RULE.md'), 'utf8');
  assert.match(canonical, /clearly bounded sequence named in advance/);
  assert.match(canonical, /Do not ask again for steps already included/);
  assert.match(canonical, /one integration owner and one completed-batch push per repository/);
  assert.match(canonical, /Subagents never push or dispatch, rerun, or cancel workflows/);
  assert.match(canonical, /inspect active or queued runs/);
  assert.match(canonical, /at most one corrective push/);
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

test('generated adapters and Context Hub retain the canonical goal contract', () => {
  const root = path.resolve(__dirname, '..', '..');
  const agents = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8');
  const expected = markerBlock(
    agents,
    '<!-- SEABRIDGE_GOAL_PROTOCOL_START -->',
    '<!-- SEABRIDGE_GOAL_PROTOCOL_END -->',
  );

  for (const name of ['CODEX.md', 'OPENCODE.md']) {
    const adapter = fs.readFileSync(path.join(root, name), 'utf8');
    assert.strictEqual(
      markerBlock(
        adapter,
        '<!-- SEABRIDGE_GOAL_PROTOCOL_START -->',
        '<!-- SEABRIDGE_GOAL_PROTOCOL_END -->',
      ),
      expected,
      `${name} must match the canonical AGENTS.md goal block`,
    );
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

console.log(`instruction-stack: ${passed} passed`);
