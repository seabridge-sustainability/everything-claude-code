'use strict';
const assert = require('node:assert/strict');
const { planQueues, resourceKey } = require('../../scripts/lib/workspace-queue');
const now = Date.parse('2026-10-14T03:30:00Z');
const iso = delta => new Date(now + delta).toISOString();
function request(id, overrides = {}) {
  return { id, owner: 'owner-' + id, goalId: 'goal-' + id, kind: 'heavy-check',
    resource: 'legion', state: 'waiting', reason: 'bounded acceptance check',
    enqueuedAt: iso(-1000), nextCheckpointAt: iso(60000),
    independentAction: 'review owned patch without launching processes', dependsOn: [],
    peakRamGiB: 1, ...overrides };
}
const gate = entry => ({ allowed: true, owner: entry.owner, resource: resourceKey(entry) });
function plan(entries, options = {}) {
  return planQueues(entries, { now, telemetry: { observedAt: iso(0), freeRamGiB: 5, reserveRamGiB: 2 }, checkGate: gate, ...options });
}
function state(result, id) { return result.decisions.find(entry => entry.id === id).state; }
let passed = 0;
function test(name, action) { action(); passed++; process.stdout.write('PASS ' + name + '\n'); }

function platformQueue(platform) {
  const module = { exports: {} };
  const source = require('node:fs').readFileSync(require.resolve('../../scripts/lib/workspace-queue'), 'utf8');
  require('node:vm').runInNewContext(source, { require, module, process: { platform } });
  return module.exports;
}

test('native POSIX repository identities retain case and canonical separators', () => {
  const linux = platformQueue('linux');
  const entry = resource => request('posix', { kind: 'writer', resource });
  assert.equal(linux.resourceKey(entry('/tmp/Repo//./')), 'repository:/tmp/Repo');
  assert.notEqual(linux.resourceKey(entry('/tmp/Repo')), linux.resourceKey(entry('/tmp/repo')));
  assert.notEqual(linux.resourceKey(entry('/c/Repo')), linux.resourceKey(entry('/c/repo')));
  assert.notEqual(linux.resourceKey(entry('/c/Repo')), linux.resourceKey(entry('C:/Repo')));
  for (const resource of ['/tmp/../Repo', '//server/repo', '/tmp\\Repo', '/tmp/Repo:stream']) {
    assert.throws(() => linux.resourceKey(entry(resource)));
  }
});

test('Windows keeps drive aliases and refuses a second POSIX spelling', () => {
  const windows = platformQueue('win32');
  const entry = resource => request('windows', { kind: 'writer', resource });
  assert.equal(windows.resourceKey(entry('/c/Repo/')), windows.resourceKey(entry('C:\\Repo')));
  assert.throws(() => windows.resourceKey(entry('/tmp/Repo')));
});

test('POSIX writer and release share one slot without merging distinct case-sensitive repositories', () => {
  const linux = platformQueue('linux');
  const entries = [request('a', { kind: 'writer', resource: '/tmp/Repo', state: 'running', leaseUntil: iso(1000) }),
    request('b', { kind: 'release', resource: '/tmp/Repo/' }),
    request('c', { kind: 'writer', resource: '/tmp/repo' })];
  const result = linux.planQueues(entries, { now, telemetry: { observedAt: iso(0), freeRamGiB: 5, reserveRamGiB: 2 },
    checkGate: entry => ({ allowed: true, owner: entry.owner, resource: linux.resourceKey(entry) }) });
  assert.equal(state(result, 'b'), 'waiting-owner');
  assert.equal(state(result, 'c'), 'ready-for-atomic-recheck');
});
test('ready positive control grants no authorization', () => {
  const result = plan([request('a')]);
  assert.equal(state(result, 'a'), 'ready-for-atomic-recheck');
  assert.equal(result.decisions[0].authorizationGranted, false);
});
test('different goals share one heavy slot in FIFO order', () => {
  const result = plan([request('later'), request('first', { enqueuedAt: iso(-2000) })]);
  assert.equal(state(result, 'first'), 'ready-for-atomic-recheck');
  assert.equal(state(result, 'later'), 'waiting-owner');
});
test('low RAM blocks only dependent launch', () => {
  const result = plan([request('a')], { telemetry: { observedAt: iso(0), freeRamGiB: 0.8, reserveRamGiB: 2 } });
  assert.equal(state(result, 'a'), 'waiting-resource');
  assert.ok(result.decisions[0].independentAction);
});
test('stale, missing and future telemetry deny readiness', () => {
  for (const observedAt of [iso(-31000), iso(1000), null]) {
    assert.equal(state(plan([request('a')], { telemetry: { observedAt, freeRamGiB: 5, reserveRamGiB: 2 } }), 'a'), 'waiting-resource');
  }
});
test('expired running lease retains slot', () => {
  const result = plan([request('a', { state: 'running', leaseUntil: iso(-1) }), request('b')]);
  assert.equal(state(result, 'a'), 'reconciliation-required');
  assert.equal(state(result, 'b'), 'waiting-owner');
});
test('writer and release share canonical Windows repository slot', () => {
  const result = plan([request('a', { kind: 'writer', resource: 'C:\\Repo', state: 'running', leaseUntil: iso(1000) }),
    request('b', { kind: 'release', resource: 'c:/repo' })]);
  assert.equal(state(result, 'b'), 'waiting-owner');
});
test('missing or wrong-owner authority never becomes readiness', () => {
  for (const checkGate of [null, () => ({ allowed: true, owner: 'other', resource: 'heavy-check:legion' }), () => { throw Error('unavailable'); }]) {
    assert.equal(state(plan([request('a')], { checkGate }), 'a'), 'waiting-gate');
  }
});
test('Windows trailing, duplicate, dot and Git Bash aliases share one slot', () => {
  const { resourceKey } = platformQueue('win32');
  for (const resource of ['C:\\Repo\\', 'c:/repo//', 'c:/repo/.', '/c/repo']) {
    assert.equal(resourceKey(request('a', { kind: 'writer', resource })), 'repository:c:/repo');
  }
  for (const resource of ['C:/Repo:stream', 'C:/Repo.', 'C:/Repo /child', '//server/repo', 'c:repo']) {
    assert.throws(() => resourceKey(request('a', { kind: 'writer', resource })));
  }
});
test('dependency cycle does not stop independent lane', () => {
  const result = plan([request('a', { dependsOn: ['b'] }), request('b', { dependsOn: ['a'] }),
    request('independent', { kind: 'backend', resource: '127.0.0.1:8000' })]);
  assert.deepEqual(result.cycles, ['a', 'b']);
  assert.equal(state(result, 'a'), 'waiting-cycle');
  assert.equal(state(result, 'independent'), 'ready-for-atomic-recheck');
});
test('completed dependency allows next action', () => {
  assert.equal(state(plan([request('done', { state: 'completed' }), request('a', { dependsOn: ['done'] })]), 'a'), 'ready-for-atomic-recheck');
});
test('cancelled dependency does not masquerade as completed', () => {
  assert.equal(state(plan([request('cancelled', { state: 'cancelled' }), request('a', { dependsOn: ['cancelled'] })]), 'a'), 'waiting-dependency');
});
test('blocked FIFO head does not block an independent ready item', () => {
  const result = plan([request('dep', { state: 'cancelled' }), request('a', { dependsOn: ['dep'], enqueuedAt: iso(-2000) }), request('b')]);
  assert.equal(state(result, 'b'), 'ready-for-atomic-recheck');
});
test('explicit owner pause stays paused', () => {
  assert.equal(state(plan([request('a', { state: 'owner-paused', explicitOwnerPause: true })]), 'a'), 'owner-paused');
  assert.throws(() => plan([request('a', { state: 'owner-paused' })]), /explicit owner pause/);
});
test('due checkpoint and elapsed waiting are observable', () => {
  const result = plan([request('a', { nextCheckpointAt: iso(-1) })]);
  assert.equal(result.decisions[0].checkpointDue, true);
  assert.equal(result.decisions[0].waitMilliseconds, 1000);
});
test('invalid identities and absent dependencies fail closed', () => {
  assert.throws(() => plan([request('a'), request('a')]), /duplicate/);
  assert.throws(() => plan([request('a', { dependsOn: ['missing'] })]), /unknown dependency/);
  assert.throws(() => plan([request('a', { kind: 'writer', resource: 'c:/repo/../other' })]), /traversal/);
});
test('different local heavy labels cannot split machine-wide RAM pool', () => {
  const result = plan([request('a', { resource: 'legion-browser', peakRamGiB: 1.5 }), request('b', { resource: 'legion-tests', peakRamGiB: 1.5 })]);
  assert.equal(state(result, 'a'), 'ready-for-atomic-recheck');
  assert.equal(state(result, 'b'), 'waiting-owner');
  assert.equal(resourceKey(request('a', { kind: 'backend', resource: 'localhost:8000' })), 'backend:127.0.0.1:8000');
  assert.throws(() => plan([request('a', { kind: 'backend', resource: 'localhost:8015' })]), /primary backend/);
});
function windowTelemetry(values=[5,5,5,5,5]) {
  return {observedAt:iso(0),freeRamGiB:values[4],reserveRamGiB:2,
    recentSamples:values.map((freeRamGiB,index)=>({observedAt:iso(-1000+index*250),freeRamGiB}))};
}
test('recent low-water observation blocks a transient final high value',()=>{
  assert.equal(state(plan([request('a')],{telemetry:windowTelemetry([5,2.5,5,5,5])}),'a'),'waiting-resource');
  assert.equal(state(plan([request('a')],{telemetry:windowTelemetry()}),'a'),'ready-for-atomic-recheck');
});
test('incomplete stale reordered future and mismatched windows never grant admission',()=>{
  const variants=[
    t=>t.recentSamples.pop(),t=>{t.recentSamples[0].observedAt=iso(-31000);},
    t=>{t.recentSamples[1].observedAt=t.recentSamples[0].observedAt;},
    t=>{t.recentSamples[4].observedAt=iso(1000);},t=>{t.freeRamGiB=6;},
    t=>{t.recentSamples[2].freeRamGiB=NaN;},t=>{t.recentSamples=[];}
  ];
  for(const change of variants){const telemetry=windowTelemetry();change(telemetry);
    assert.equal(state(plan([request('a')],{telemetry}),'a'),'waiting-resource');}
});
test('capacity diagnostics distinguish point memory from the recent minimum', () => {
  const result = plan([request('a')], { telemetry: windowTelemetry([5, 2.5, 5, 5, 5]) });
  const decision = result.decisions[0];
  assert.equal(decision.state, 'waiting-resource');
  assert.deepEqual(decision.capacityDiagnostic, {
    operation: 'heavy-check', telemetryStatus: 'fresh', pointFreeRamGiB: 5,
    recentMinimumFreeRamGiB: 2.5, effectiveAvailableRamGiB: 2.5,
    outstandingEnvelopeRamGiB: 0, plannedPeakRamGiB: 0, requestedPeakRamGiB: 1,
    reserveRamGiB: 2, requiredFreeRamGiB: 3, deficitRamGiB: 0.5,
  });
  assert.equal(decision.independentAction, request('a').independentAction);
  assert.equal(decision.authorizationGranted, false);
});
test('capacity diagnostics account for expired running envelopes and selected work without blocking an unrelated writer', () => {
  const entries = [
    request('running', { kind: 'native-client', state: 'running', leaseUntil: iso(-1), enqueuedAt: iso(-3000) }),
    request('planned', { kind: 'native-client', peakRamGiB: 0.5, enqueuedAt: iso(-2000) }),
    request('blocked', { kind: 'native-client' }),
    request('writer', { kind: 'writer', resource: 'C:/Repo' }),
  ];
  const result = plan(entries, { telemetry: windowTelemetry([6, 4, 6, 6, 6]) });
  assert.equal(state(result, 'running'), 'reconciliation-required');
  assert.equal(state(result, 'planned'), 'ready-for-atomic-recheck');
  assert.equal(state(result, 'blocked'), 'waiting-resource');
  assert.equal(state(result, 'writer'), 'ready-for-atomic-recheck');
  const diagnostic = result.decisions.find(entry => entry.id === 'blocked').capacityDiagnostic;
  assert.equal(diagnostic.operation, 'native-client');
  assert.equal(diagnostic.pointFreeRamGiB, 6);
  assert.equal(diagnostic.recentMinimumFreeRamGiB, 4);
  assert.equal(diagnostic.outstandingEnvelopeRamGiB, 1);
  assert.equal(diagnostic.plannedPeakRamGiB, 0.5);
  assert.equal(diagnostic.requiredFreeRamGiB, 4.5);
  assert.equal(diagnostic.deficitRamGiB, 0.5);
});
test('point-only diagnostics preserve a measured zero and the configured reserve', () => {
  const diagnostic = plan([request('a')], { telemetry: {
    observedAt: iso(0), freeRamGiB: 0, reserveRamGiB: 2.5,
  } }).decisions[0].capacityDiagnostic;
  assert.equal(diagnostic.pointFreeRamGiB, 0);
  assert.equal(diagnostic.recentMinimumFreeRamGiB, null);
  assert.equal(diagnostic.effectiveAvailableRamGiB, 0);
  assert.equal(diagnostic.reserveRamGiB, 2.5);
  assert.equal(diagnostic.requiredFreeRamGiB, 3.5);
  assert.equal(diagnostic.deficitRamGiB, 3.5);
});
test('unknown and stale telemetry never fabricate available memory or a zero deficit', () => {
  for (const telemetry of [undefined, {}, { observedAt: iso(-31000), freeRamGiB: 5, reserveRamGiB: 2 },
    { observedAt: iso(1000), freeRamGiB: 5, reserveRamGiB: 2 },
    { observedAt: iso(0), freeRamGiB: NaN, reserveRamGiB: 2 }]) {
    const decision = plan([request('a')], { telemetry }).decisions[0];
    assert.equal(decision.state, 'waiting-resource');
    assert.equal(decision.capacityDiagnostic.telemetryStatus, 'unknown');
    for (const field of ['pointFreeRamGiB', 'recentMinimumFreeRamGiB', 'effectiveAvailableRamGiB', 'deficitRamGiB']) {
      assert.equal(decision.capacityDiagnostic[field], null);
    }
  }
});
test('invalid recent windows and reserves retain unknown capacity diagnostics', () => {
  const invalidWindow = windowTelemetry(); invalidWindow.recentSamples.pop();
  const invalidReserve = { observedAt: iso(0), freeRamGiB: 5, reserveRamGiB: 1 };
  for (const telemetry of [invalidWindow, invalidReserve]) {
    const diagnostic = plan([request('a')], { telemetry }).decisions[0].capacityDiagnostic;
    assert.equal(diagnostic.pointFreeRamGiB, 5);
    assert.equal(diagnostic.telemetryStatus, 'unknown');
    assert.equal(diagnostic.effectiveAvailableRamGiB, null);
    assert.equal(diagnostic.deficitRamGiB, null);
  }
  const diagnostic = plan([request('a')], { telemetry: invalidReserve }).decisions[0].capacityDiagnostic;
  assert.equal(diagnostic.reserveRamGiB, null);
  assert.equal(diagnostic.requiredFreeRamGiB, null);
});
process.stdout.write(JSON.stringify({ passed, failed: 0, source: 'canonical readiness fixtures', processesLaunched: 0, filesWritten: 0, paidCalls: 0 }) + '\n');
