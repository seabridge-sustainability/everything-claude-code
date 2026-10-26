'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { planQueues, resourceKey } = require('../../scripts/lib/workspace-queue');
const { createQueueStore, createMachineQueueGuard } = require('../../scripts/lib/workspace-queue-store');
const { withFileLock } = require('../../scripts/lib/goal-store');
const { writeFileAtomic } = require('../../scripts/lib/atomic-write');

// Synthetic identities and reviewed fixture gates only. No browser connection,
// native discovery, model job, private target or production admission is used.
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-browser-target-'));
const browser = Object.freeze({ hostId: 'fixture-host',
  bootId: '11111111-2222-3333-4444-555555555555', pid: 123,
  startTicks: '456', profileDevice: '29', profileInode: '789' });
const targetA = 'A'.repeat(32), targetB = 'B'.repeat(32);
let count = 0, passed = 0;
function test(name, action) { action(); passed++; console.log('PASS ' + name); }
function fixture() {
  const directory = fs.mkdtempSync(path.join(root, 'case-'));
  const state = { now: Date.parse('2026-10-26T04:00:00Z'), free: 16, stopped: true };
  const clock = () => state.now;
  const assertWrite = files => files.every(file => path.dirname(file) === directory);
  const telemetry = () => ({ observedAt: new Date(state.now).toISOString(), freeRamGiB: state.free, reserveRamGiB: 2 });
  const machine = createMachineQueueGuard({ file: path.join(directory, 'machine.json'),
    withFileLock, atomicWrite: writeFileAtomic, assertWrite, clock });
  function entry(id, overrides = {}) {
    return { id, owner: 'owner-' + id, goalId: 'fixture-goal', kind: 'browser-target',
      resource: targetA, browser: { ...browser }, backgroundOnly: true, peakRamGiB: 1,
      state: 'waiting', enqueuedAt: new Date(state.now - 1000).toISOString(),
      nextCheckpointAt: new Date(state.now + 60000).toISOString(), dependsOn: [],
      reason: 'synthetic target ownership proof', independentAction: 'fixture-only review', ...overrides };
  }
  function store(options = {}) {
    return createQueueStore({ file: path.join(directory, 'queue-' + count++ + '.json'),
      withFileLock, atomicWrite: writeFileAtomic, assertWrite, machine, clock,
      readTelemetry: telemetry,
      checkGate: e => ({ allowed: true, owner: e.owner, resource: resourceKey(e) }),
      confirmStopped: () => state.stopped, ...options });
  }
  const acquire = (s, id, leaseMilliseconds = 1000) => s.acquire({ id, owner: 'owner-' + id, leaseMilliseconds });
  return { state, entry, store, acquire, telemetry };
}
try {
  test('distinct tabs hold overlapping claims in independent stores without authority grants', () => {
    const f = fixture(), a = f.store(), b = f.store();
    a.enqueue([f.entry('a')]); b.enqueue([f.entry('b', { resource: targetB })]);
    const ca = f.acquire(a, 'a'), cb = f.acquire(b, 'b');
    assert.equal(ca.acquired, true); assert.equal(cb.acquired, true);
    assert.equal(ca.authorizationGranted, false); assert.equal(cb.authorizationGranted, false);
    assert.equal(a.snapshot().entries[0].state, 'running');
    assert.equal(b.snapshot().entries[0].state, 'running');
    assert.equal(a.recheck(ca).admitted, true); assert.equal(b.recheck(cb).admitted, true);
  });
  test('same tab conflicts across owners and target ID case aliases', () => {
    const f = fixture(), a = f.store(), b = f.store();
    a.enqueue([f.entry('a')]); b.enqueue([f.entry('b', { resource: targetA.toLowerCase() })]);
    assert.equal(f.acquire(a, 'a').acquired, true);
    const refusal = f.acquire(b, 'b');
    assert.equal(refusal.acquired, false); assert.equal(refusal.decision.state, 'waiting-owner');
    assert.equal(refusal.decision.blockingOwner, 'owner-a');
  });
  test('distinct browser processes, boot epochs, process epochs and profiles have distinct slots', () => {
    const f = fixture();
    const variants = [{}, { pid: 124 }, { startTicks: '457' }, { profileInode: '790' },
      { profileDevice: '30' }, { hostId: 'other-fixture-host' },
      { bootId: 'aaaaaaaa-2222-3333-4444-555555555555' }];
    for (const [i, change] of variants.entries()) {
      const s = f.store(), id = 'epoch-' + i;
      s.enqueue([f.entry(id, { browser: { ...browser, ...change } })]);
      assert.equal(f.acquire(s, id).acquired, true);
    }
  });
  test('incomplete identities, aliases, foreground use and invalid RAM are refused', () => {
    const f = fixture();
    for (const change of [{ backgroundOnly: false }, { backgroundOnly: undefined },
      { browser: {} }, { browser: { ...browser, pid: '123' } },
      { browser: { ...browser, startTicks: '0456' } },
      { browser: { ...browser, hostId: 'FIXTURE-HOST' } },
      { browser: { ...browser, owner: 'another-owner' } },
      { resource: 'some-tab' }, { resource: ' ' + targetA }, { peakRamGiB: 0 }]) {
      assert.throws(() => f.store().enqueue([f.entry('bad', change)]));
    }
  });
  test('existing heavy-check shared foreground serialization is unchanged', () => {
    const f = fixture(), a = f.store(), b = f.store();
    a.enqueue([f.entry('a', { kind: 'heavy-check', resource: 'foreground-a' })]);
    b.enqueue([f.entry('b', { kind: 'heavy-check', resource: 'foreground-b' })]);
    const claim = f.acquire(a, 'a');
    assert.equal(claim.resource, 'heavy-check:local-machine');
    assert.equal(f.acquire(b, 'b').decision.state, 'waiting-owner');
  });
  test('target claims share aggregate RAM with existing native-client claims', () => {
    const f = fixture(), a = f.store(), b = f.store(); f.state.free = 3.5;
    a.enqueue([f.entry('a', { kind: 'native-client', resource: 'fixture-native' })]);
    b.enqueue([f.entry('b', { resource: targetB })]);
    const claim = f.acquire(a, 'a'); assert.equal(claim.acquired, true);
    const refusal = f.acquire(b, 'b');
    assert.equal(refusal.decision.state, 'waiting-resource');
    assert.equal(refusal.decision.capacityDiagnostic.outstandingEnvelopeRamGiB, 1);
    a.release({ ...claim, outcome: 'completed' });
    assert.equal(f.acquire(b, 'b').acquired, true);
  });
  test('unknown and stale memory observations cannot admit target work', () => {
    const f = fixture();
    for (const readTelemetry of [() => undefined, () => ({ ...f.telemetry(), observedAt: '2020-01-01T00:00:00Z' })]) {
      const s = f.store({ readTelemetry }); s.enqueue([f.entry('a')]);
      assert.equal(f.acquire(s, 'a').decision.state, 'waiting-resource');
    }
  });
  test('expired target claims retain custody and RAM until verified closure', () => {
    const f = fixture(), a = f.store(), b = f.store();
    a.enqueue([f.entry('a')]); b.enqueue([f.entry('b')]);
    const claim = f.acquire(a, 'a', 1); f.state.now += 2; f.state.stopped = false;
    assert.throws(() => a.recheck(claim), /current owner-bound launch claim/);
    assert.equal(f.acquire(b, 'b').decision.state, 'waiting-owner');
    assert.throws(() => a.release({ ...claim, outcome: 'completed' }), /cessation unverified/);
    f.state.stopped = true; a.release({ ...claim, outcome: 'completed' });
    assert.equal(f.acquire(b, 'b').acquired, true);
  });
  test('wrong owner or token cannot recheck or release target custody', () => {
    const f = fixture(), s = f.store(); s.enqueue([f.entry('a')]); const claim = f.acquire(s, 'a');
    assert.throws(() => s.recheck({ ...claim, owner: 'other' }));
    assert.throws(() => s.release({ ...claim, token: '0'.repeat(48), outcome: 'completed' }));
    assert.equal(s.snapshot().entries[0].state, 'running');
  });
  test('custody withdrawal refuses acquire and live recheck', () => {
    const f = fixture(); let allowed = true;
    const s = f.store({ checkGate: e => ({ allowed, owner: e.owner, resource: resourceKey(e) }) });
    s.enqueue([f.entry('a')]); allowed = false;
    assert.equal(f.acquire(s, 'a').decision.state, 'waiting-gate');
    allowed = true; const claim = f.acquire(s, 'a'); allowed = false;
    assert.throws(() => s.recheck(claim), /resources or authority changed/);
    assert.throws(() => s.release({ ...claim, outcome: 'completed' }), /release authority unavailable/);
  });
  test('custody change at final publication leaves no running claim', () => {
    const f = fixture(); let allowed = true, withdraw = false;
    const s = f.store({ checkGate: e => ({ allowed, owner: e.owner, resource: resourceKey(e) }),
      atomicWrite(file, bytes, options) {
        if (withdraw && JSON.parse(bytes).entries.some(e => e.state === 'running')) allowed = false;
        return writeFileAtomic(file, bytes, options);
      } });
    s.enqueue([f.entry('a')]); withdraw = true;
    assert.throws(() => f.acquire(s, 'a'), /authority changed before publication/);
    assert.equal(s.snapshot().entries[0].state, 'waiting');
  });
  test('planning without a reviewed custody gate grants no admission', () => {
    const f = fixture();
    const result = planQueues([f.entry('a')], { now: f.state.now, telemetry: f.telemetry() });
    assert.equal(result.decisions[0].state, 'waiting-gate');
    assert.equal(result.decisions[0].authorizationGranted, false);
  });
  console.log(JSON.stringify({ passed, failed: 0, browserCalls: 0, providerCalls: 0,
    scope: 'synthetic independent stores sharing actual queue locks and machine ledger' }));
} finally {
  fs.rmSync(root, { recursive: true, force: true }); // Only this test's temporary fixture.
}
