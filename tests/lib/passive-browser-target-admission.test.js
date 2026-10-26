'use strict';
// Historical inert-source integration test. Reads code/fixture metadata only;
// dispatch is a controlled promise, never a Python/native/browser invocation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const { createPassiveTargetAdmission, inspectIssuedProducer } = require('../../scripts/lib/passive-browser-target-admission');
const sha = b => createHash('sha256').update(b).digest('hex');
const repo = path.resolve(__dirname, '../..'), root = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-passive-adapter-'));
const goal = path.join(repo, 'tests/fixtures/passive-browser');
const sources = {
  'greenly-lca': {
    producer: 'greenly-lca/producer.txt',
    observer: 'greenly-lca/observer.txt',
    review: 'greenly-lca/review.json',
    target: 'D4DFC16D0BBBD72010B4F93F74F3CCB3', prefix: 'rea-greenly-lca-',
  },
  'persefoni-purpose': {
    producer: 'persefoni-purpose/producer.txt',
    observer: 'persefoni-purpose/observer.txt',
    review: 'persefoni-purpose/review.json',
    target: 'DE72303F6AF6B76A701094512FA4C4FD', prefix: 'rea-persefoni-scope3-',
  },
};
let passed = 0, id = 0;
async function test(name, run) { await run(); passed++; console.log('PASS ' + name); }
function fixture() {
  const dir = fs.mkdtempSync(path.join(root, 'case-')); execFileSync('git', ['init', '--quiet', dir]);
  fs.mkdirSync(path.join(dir, '.git/ecc-coordination'));
  const state = { now: Date.parse('2026-10-26T05:00:00Z'), free: 16, custody: true, native: true,
    admission: true, stopped: false, dispatched: 0 };
  function packet(operation, changes = {}) {
    const s = sources[operation], n = ++id, job = path.join(dir, 'job-' + n); fs.mkdirSync(job);
    const producerPath = path.join(job, 'producer.issued.py'), observerPath = path.join(job, 'observer.issued.cjs');
    const scopeReviewPath = path.join(job, 'review.json'), review = fs.readFileSync(path.join(goal, s.review)); fs.writeFileSync(scopeReviewPath, review);
    const actor = s.prefix + 'fixture-' + n, nonce = n.toString(16).padStart(32, '0');
    const expiresAt = new Date(state.now + 60000).toISOString();
    const e = { status: 'ISSUED', absoluteStop: expiresAt, output: path.join(job, 'attempt1/run1'),
      session: actor, nonce, attempt: 1, nativeUnit: s.prefix + nonce + '.service', nativeDescription: 'fixture:' + nonce };
    const observer = fs.readFileSync(path.join(goal, s.observer), 'utf8').replace(/^const EXEC=.*$/m,
      'const EXEC=Object.freeze(' + JSON.stringify(e) + ');');
    fs.writeFileSync(observerPath, observer);
    const b = { status: 'ISSUED', absoluteStop: expiresAt, source: observerPath, sourceSHA256: sha(observer), sourceBytes: Buffer.byteLength(observer),
      sourceReady: path.join(job, 'SOURCE_READY.json'), sourceReadySHA256: 'a'.repeat(64), sourceActor: 'fixture-source-closed', outputParent: path.join(job, 'attempt1'), actor, nonce,
      attempt: 1, normalAdmissionReceipt: path.join(job, 'admission.json'), normalAdmissionSHA256: 'b'.repeat(64), nativeUnit: e.nativeUnit, nativeDescription: e.nativeDescription };
    const producer = fs.readFileSync(path.join(goal, s.producer), 'utf8')
      .replace(/^BINDING=.*$/m, 'BINDING=MappingProxyType(json.loads(' + JSON.stringify(JSON.stringify(b)) + '))')
      .replace(/^SCOPE_ACCEPTANCE=.*$/m, 'SCOPE_ACCEPTANCE=' + JSON.stringify(scopeReviewPath))
      .replace(/^SCOPE_ACCEPTANCE_SHA=.*$/m, 'SCOPE_ACCEPTANCE_SHA=' + JSON.stringify(sha(review)));
    fs.writeFileSync(producerPath, producer);
    const a = { schema: 'rea.passive-target-assignment.v1', status: 'ISSUED', operation,
      coordinatorThreadId: '11111111-2222-3333-4444-555555555555', navigatorThreadId: 'aaaaaaaa-bbbb-cccc-dddd-' + n.toString(16).padStart(12, '0'),
      actor, nonce, expiresAt, targetId: s.target, backgroundOnly: true, goalId: 'fixture-original-goal', peakRamGiB: 1,
      browser: { hostId: 'fixture-host', bootId: '11111111-2222-3333-4444-555555555555', pid: 123, startTicks: '456', profileDevice: '29', profileInode: '789' },
      producerPath, producerSHA256: sha(producer), observerPath, observerSHA256: sha(observer), scopeReviewPath, scopeReviewSHA256: sha(review), ...changes };
    return { a, producer: Buffer.from(producer), observer: Buffer.from(observer), review };
  }
  function adapter(p, overrides = {}) {
    const assignmentBytes = Buffer.from(JSON.stringify(p.a));
    return createPassiveTargetAdmission({ repositoryPath: dir, assignmentBytes, assignmentSHA256: sha(assignmentBytes),
      assertWrite: paths => paths.every(p => p.startsWith(dir + path.sep)), clock: () => state.now,
      readTelemetry: () => ({ observedAt: new Date(state.now).toISOString(), freeRamGiB: state.free, reserveRamGiB: 2 }),
      verifyAdmission: () => state.admission, verifyCustody: () => state.custody, verifyNativeIdentity: () => state.native,
      confirmStopped: () => state.stopped,
      dispatch: async spec => { state.dispatched++; return { externalWitness: { fixture: true }, operationResult: 'FIXTURE_ONLY' }; }, ...overrides });
  }
  return { state, packet, adapter };
}
(async () => {
  try {
    await test('both actual retained producers and observers invert exactly to reviewed baselines', () => {
      const f = fixture(); for (const op of Object.keys(sources)) { const p = f.packet(op); assert.equal(inspectIssuedProducer(op, p.producer, p.observer, p.review).binding.actor, p.a.actor); }
    });
    await test('any executable producer guard delta is rejected even with a new assignment hash', () => {
      const f = fixture(), p = f.packet('persefoni-purpose'); p.producer = Buffer.from(p.producer.toString().replace("'RAM_GUARD'", "'CHANGED_GUARD'"));
      fs.writeFileSync(p.a.producerPath, p.producer); p.a.producerSHA256 = sha(p.producer);
      assert.throws(() => f.adapter(p), /producer executable delta forbidden/);
    });
    await test('observer scope/privacy changes and mismatched original review are rejected', () => {
      const f = fixture(), p = f.packet('greenly-lca');
      assert.throws(() => inspectIssuedProducer('greenly-lca', p.producer, Buffer.concat([p.observer, Buffer.from('\n// changed')]), p.review), /observer executable delta forbidden/);
      assert.throws(() => inspectIssuedProducer('greenly-lca', p.producer, p.observer, Buffer.from('{}')), /retained original scope review required/);
    });
    await test('two actual operations dispatch concurrently on separate existing-target claims', async () => {
      const f = fixture(), pending = [], specs = [];
      const dispatch = spec => { specs.push(spec); return new Promise(resolve => pending.push(resolve)); };
      const a = f.adapter(f.packet('greenly-lca'), { dispatch }), b = f.adapter(f.packet('persefoni-purpose'), { dispatch });
      const ar = a.run(), br = b.run(); assert.equal(pending.length, 2);
      assert.equal(a.snapshot().entries[0].state, 'running'); assert.equal(b.snapshot().entries[0].state, 'running');
      assert.equal(a.describe().machineFile, b.describe().machineFile); assert.notEqual(specs[0].targetId, specs[1].targetId);
      assert.equal(specs[0].executable, '/usr/bin/python3'); assert.equal(specs[0].argv.length, 1);
      f.state.stopped = true; pending.forEach(resolve => resolve({ externalWitness: { fixture: true }, operationResult: 'FIXTURE_ONLY' }));
      assert.equal((await ar).state, 'PRODUCER_CLOSED_TARGET_RELEASED'); assert.equal((await br).state, 'PRODUCER_CLOSED_TARGET_RELEASED');
    });
    await test('another navigator cannot dispatch the same target while held', async () => {
      const f = fixture(); let end;
      const a = f.adapter(f.packet('persefoni-purpose'), { dispatch: () => new Promise(resolve => { end = resolve; }) });
      const first = a.run(), b = f.adapter(f.packet('persefoni-purpose'));
      const denied = await b.run(); assert.equal(denied.state, 'WAITING'); assert.equal(denied.decision.state, 'waiting-owner'); assert.equal(f.state.dispatched, 0);
      f.state.stopped = true; end({ externalWitness: { fixture: true } }); await first;
    });
    await test('dispatch rejection retains claim until independent closure reconciliation', async () => {
      const f = fixture(), a = f.adapter(f.packet('greenly-lca'), { dispatch: async () => { throw Error('fixture launch uncertainty'); } });
      await assert.rejects(a.run(), /launch uncertainty/); assert.equal(a.snapshot().entries[0].state, 'running');
      assert.throws(() => a.reconcile({ fixture: true }), /cessation unverified/);
      f.state.stopped = true; assert.equal(a.reconcile({ fixture: true }, 'cancelled').released, true);
    });
    await test('expiry keeps claim until closure; expired authority cannot dispatch', async () => {
      const f = fixture(), p = f.packet('greenly-lca'), a = f.adapter(p); f.state.now += 40000;
      await assert.rejects(a.run(), /producer deadline reserve/); assert.equal(f.state.dispatched, 0);
    });
    await test('unknown RAM and absent normal/native/custody admission fail before dispatch', async () => {
      for (const condition of ['free', 'admission', 'native', 'custody']) {
        const f = fixture(), a = f.adapter(f.packet('greenly-lca')); f.state[condition] = condition === 'free' ? NaN : false;
        if (condition === 'free') assert.equal((await a.run()).decision.state, 'waiting-resource');
        else await assert.rejects(a.run(), /admission refused|custody refused|identity refused/);
        assert.equal(f.state.dispatched, 0);
      }
    });
    await test('source changed after preparation and before dispatch is rejected', async () => {
      const f = fixture(), p = f.packet('greenly-lca'), a = f.adapter(p); fs.appendFileSync(p.a.producerPath, '\n');
      await assert.rejects(a.run(), /source pin changed/); assert.equal(f.state.dispatched, 0);
    });
    await test('cross-target, foreground, unissued and wrong navigator records fail closed', () => {
      for (const changes of [{ targetId: sources['persefoni-purpose'].target }, { backgroundOnly: false }, { status: 'UNISSUED' }, { navigatorThreadId: 'worker-label' }]) {
        const f = fixture(); assert.throws(() => f.adapter(f.packet('greenly-lca', changes)));
      }
    });
    await test('dispatch is one attempt and no current Windows chat identity is required', async () => {
      const f = fixture(); f.state.stopped = true;
      const a = f.adapter(f.packet('persefoni-purpose', { coordinatorThreadId: '01a175cd-5461-7960-8090-2d5b636d60cc' }));
      await a.run(); await assert.rejects(a.run(), /one finite attempt/); assert.equal(f.state.dispatched, 1);
    });
    console.log(JSON.stringify({ passed, failed: 0, browserCalls: 0, providerCalls: 0, nativeProducerLaunches: 0,
      scope: 'Actual retained source inverse and real shared queue; synthetic dispatch/admission/closure only' }));
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
})().catch(error => { console.error(error); process.exitCode = 1; });
