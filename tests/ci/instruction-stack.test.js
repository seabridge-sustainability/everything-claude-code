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

console.log(`instruction-stack: ${passed} passed`);
