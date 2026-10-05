#!/usr/bin/env node
/** Every advertised ECC adapter must receive (and be scored against) the same task contract. */

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..', '..');
const script = path.join(root, 'scripts', 'eval-instruction-scenarios.js');
const adapters = JSON.parse(fs.readFileSync(path.join(root, 'manifests', 'instruction-adapters.json'), 'utf8')).adapters;
const scenarios = JSON.parse(fs.readFileSync(path.join(root, 'evals', 'agent-instructions', 'scenarios.json'), 'utf8')).scenarios;

function evaluate(env = {}) {
  const result = spawnSync(process.execPath, [script, '--repo', 'everything-claude-code', '--json'], {
    cwd: root,
    env: { ...process.env, ...env },
    encoding: 'utf8',
  });
  assert.ifError(result.error);
  return { status: result.status, output: JSON.parse(result.stdout) };
}

const baseline = evaluate();
assert.strictEqual(baseline.status, 0);
assert.deepStrictEqual(baseline.output.missingTargets, []);
assert.strictEqual(baseline.output.rows.length, adapters.length * scenarios.filter((s) => !s.repos || s.repos.includes('everything-claude-code')).length);
assert.deepStrictEqual(new Set(baseline.output.rows.map((r) => r.harness)), new Set(adapters.map((a) => a.id)));
assert.ok(baseline.output.rows.every((r) => r.pass));
console.log(`  ok  ${adapters.length} ECC adapters pass their applicable scenarios`);

const workerCap = scenarios.find((s) => s.id === 'S16-no-instruction-worker-cap');
assert.ok(workerCap, 'worker-cap regression scenario must exist');
assert.ok(workerCap.must_not.some((pattern) => new RegExp(pattern, 'i').test('Maximum 3 concurrent subagents')));
assert.ok(workerCap.must_not.some((pattern) => new RegExp(pattern, 'i').test('Use at most 4 workers')));
assert.ok(workerCap.must_not.every((pattern) => !new RegExp(pattern, 'i').test('The host currently offers 3 slots')));
console.log('  ok  worker-cap rule catches fixed instruction ceilings without rejecting host capacity');

const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'instruction-scenarios-'));
try {
  const fixture = path.join(temporary, 'missing-rule.json');
  fs.writeFileSync(fixture, JSON.stringify({ scenarios: [{ id: 'negative-control', must: ['__missing_rule_probe__'] }] }));
  const negative = evaluate({ SEABRIDGE_INSTRUCTION_SCENARIOS: fixture });
  assert.strictEqual(negative.status, 1);
  assert.deepStrictEqual(negative.output.missingTargets, []);
  assert.strictEqual(negative.output.rows.length, adapters.length);
  assert.ok(negative.output.rows.every((r) => !r.pass));
  console.log(`  ok  missing guidance fails for all ${adapters.length} adapters`);
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}
