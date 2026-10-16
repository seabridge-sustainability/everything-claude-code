'use strict';
const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), os = require('node:os'), crypto = require('node:crypto');
const { verifyFixtures } = require('../../scripts/lib/synthetic-fixture-runner');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-synthetic-runner-'));
after(() => fs.rmSync(root, { recursive: true, force: true }));
let count = 0;
function fixture() {
  const repo = path.join(root, String(count++)), relative = 'tests/fixtures/synthetic.json';
  fs.mkdirSync(path.dirname(path.join(repo, relative)), { recursive: true });
  const bytes = '{"synthetic":"PRIVATE_LOOKING_SENTINEL_NOT_CLIENT_DATA"}\n'; fs.writeFileSync(path.join(repo, relative), bytes);
  return { repo, scopes: ['artifacts/agent-runs/proof'], data_policy: { mode: 'synthetic-only',
    fixture: { path: relative, sha256: crypto.createHash('sha256').update(bytes).digest('hex') },
    outputs: [{ path: 'artifacts/agent-runs/proof/result.json', checks: ['fixture-integrity', 'output-contract'] }] } };
}
test('deterministic verification emits only fixed-schema metadata without a client or output file', () => {
  const worker = fixture(), result = verifyFixtures(worker);
  assert.equal(result.nativeClientStarted, false); assert.equal(result.modelCalls, 0);
  assert.deepEqual(result.receipts[0].receipt.checks, [{ id: 'fixture-integrity', passed: true, count: 1 }, { id: 'output-contract', passed: true, count: 1 }]);
  assert.ok(!JSON.stringify(result).includes('PRIVATE_LOOKING_SENTINEL'));
  assert.equal(fs.existsSync(path.join(worker.repo, worker.data_policy.outputs[0].path)), false);
});
test('deterministic verification refuses changed or worker-owned input fixtures', () => {
  const worker = fixture(); fs.appendFileSync(path.join(worker.repo, worker.data_policy.fixture.path), 'changed');
  assert.throws(() => verifyFixtures(worker), /rejected artifact/);
  const owned = fixture(); owned.scopes.push('tests/fixtures'); assert.throws(() => verifyFixtures(owned), /rejected artifact/);
});
test('deterministic verification cannot attest unexecuted native/scientific checks', () => {
  const worker = fixture(); worker.data_policy.outputs[0].checks = ['native-transcript-contained'];
  assert.throws(() => verifyFixtures(worker), /unexecuted check/);
});
test('deterministic verification refuses scratchpad outputs and extra untyped policy fields', () => {
  const worker = fixture(); worker.data_policy.outputs[0].path = 'artifacts/agent-runs/proof/scratchpad/result.json';
  assert.throws(() => verifyFixtures(worker), /rejected artifact/);
  const extra = fixture(); extra.data_policy.stdin = 'unreviewed'; assert.throws(() => verifyFixtures(extra), /rejected artifact/);
});
