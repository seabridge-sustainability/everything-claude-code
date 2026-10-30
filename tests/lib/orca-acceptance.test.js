'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const adapter = require('../../scripts/lib/orca-acceptance');
const store = require('../../scripts/lib/goal-store');

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-orca-acceptance-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const keys = crypto.generateKeyPairSync('ed25519');
  const keyPath = path.join(root, 'parent.pub');
  fs.writeFileSync(keyPath, keys.publicKey.export({ format: 'pem', type: 'spki' }));
  const stateFile = path.join(root, 'execution.json'); fs.writeFileSync(stateFile, '{"phase":"approval"}');
  const evidenceFile = path.join(root, 'actual.json'); fs.writeFileSync(evidenceFile, '{"output":"real"}');
  const binding = { worker_id: 'worker', task_id: 'task', dispatch_id: 'dispatch', process_incarnation: 'native:one', host_id: 'remote-one' };
  const config = { run_id: 'run', runtime_id: 'native-runtime', parent_orca_session_id: 'native-parent',
    public_key: { path: keyPath, sha256: store.sha256File(keyPath) }, bindings: [binding] };
  const goal = { goal_id: 'goal', objective: 'original', user_visible_proofs: [{ id: 'required', required: true, acceptance_predicate: 'original output' }] };
  const assignment = { assignment_id: 'assignment', owner_agent: 'worker', issued_at: new Date(Date.now() - 10000).toISOString(),
    lease_expires_at: new Date(Date.now() + 60000).toISOString() };
  const expected = { goal, assignment, integrator: 'parent', evidence: [{ ref: evidenceFile, kind: 'runtime' }],
    usage: { tool_calls: 1, retries: 0, ci_runs: 0, cost_usd: 0 } };
  const payload = { version: 1, verdict: 'accepted', goal_id: goal.goal_id,
    contract_sha256: require('../../scripts/lib/goal-control').goalContractDigest(goal),
    assignment_id: assignment.assignment_id, assignment_sha256: adapter.hash(assignment),
    integrator: 'parent', worker_id: 'worker', worker_agent: 'worker', critic: 'critic',
    parent_orca_session_id: 'native-parent', run_id: 'run', ...binding,
    artifacts: [{ path: evidenceFile, sha256: store.sha256File(evidenceFile) }],
    evidence_sha256: adapter.evidenceDigest(expected.evidence), usage: expected.usage,
    accepted_at: new Date().toISOString(), expires_at: assignment.lease_expires_at,
    execution_state: stateFile, execution_sha256: store.sha256File(stateFile) };
  const sign = p => {
    const payload = structuredClone(p);
    return { payload, signature: crypto.sign(null, Buffer.from(store.canonicalJson(payload)), keys.privateKey).toString('base64') };
  };
  return { root, config, binding, expected, payload, sign, stateFile };
}

test('native observation binds parent, Run, Task, Dispatch, incarnation and execution host', () => {
  const config = { run_id: 'run', parent_orca_session_id: 'parent' };
  const binding = { dispatch_id: 'dispatch', task_id: 'task', process_incarnation: 'native:one', host_id: 'local' };
  const status = { caller: { live: true, orcaSessionId: 'parent' } };
  const show = { dispatch: { id: 'dispatch', runId: 'run', taskId: 'task', processIncarnation: 'native:one', status: 'completed' },
    projection: { host: { id: 'local' }, outcome: 'succeeded' } };
  const output = { source: 'transcript', sourceIdentity: 'native-output', transcript: { messages: [] } };
  const call = argv => argv[0] === 'status' ? status : argv.includes('worker-show') ? show : output;
  assert.strictEqual(adapter.observeDispatch(config, binding, call).dispatch_id, 'dispatch');
  for (const field of ['dispatch_id', 'task_id', 'process_incarnation', 'host_id']) {
    assert.throws(() => adapter.observeDispatch(config, { ...binding, [field]: 'wrong' }, call), /binding mismatch/);
  }
  status.caller.orcaSessionId = 'worker';
  assert.throws(() => adapter.observeDispatch(config, binding, call), /authenticated native parent/);
});

test('signed acceptance rejects forged actors, revisions, evidence, usage and changed state', t => {
  const f = fixture(t);
  assert.strictEqual(adapter.verifyReceipt(f.sign(f.payload), f.config, f.expected).payload.verdict, 'accepted');
  const forged = f.sign(f.payload); forged.payload.integrator = 'worker';
  assert.throws(() => adapter.verifyReceipt(forged, f.config, f.expected), /signature invalid/);
  for (const delta of [{ integrator: 'worker' }, { task_id: 'other-task' }, { process_incarnation: 'restarted' },
    { host_id: 'wrong-host' }, { contract_sha256: 'b'.repeat(64) }, { expires_at: new Date(0).toISOString() }]) {
    assert.throws(() => adapter.verifyReceipt(f.sign({ ...f.payload, ...delta }), f.config, f.expected));
  }
  assert.throws(() => adapter.verifyReceipt(f.sign(f.payload), f.config, { ...f.expected, evidence: [] }), /acceptance evidence/);
  assert.throws(() => adapter.verifyReceipt(f.sign(f.payload), f.config, { ...f.expected, usage: { ...f.expected.usage, cost_usd: 1 } }), /evidence\/usage mismatch/);
  fs.writeFileSync(f.stateFile, '{"phase":"changed"}');
  assert.throws(() => adapter.verifyReceipt(f.sign(f.payload), f.config, f.expected), /execution state changed/);
});

test('no acceptance configuration or caller-selected key is treated as parent authority', () => {
  const previous = process.env.ECC_ORCA_ACCEPTANCE_CONFIG;
  try {
    delete process.env.ECC_ORCA_ACCEPTANCE_CONFIG;
    assert.throws(() => adapter.loadTrust(), /parent-pinned/);
  } finally { if (previous !== undefined) process.env.ECC_ORCA_ACCEPTANCE_CONFIG = previous; }
});
