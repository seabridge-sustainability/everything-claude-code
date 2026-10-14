'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { createQueueStore } = require('../../scripts/lib/workspace-queue-store');
const { resourceKey } = require('../../scripts/lib/workspace-queue');
const { withFileLock } = require('../../scripts/lib/goal-store');
const { writeFileAtomic: atomicWrite } = require('../../scripts/lib/atomic-write');
const now = Date.parse('2026-10-14T03:40:00Z');
const root = fs.mkdtempSync(path.join(__dirname, 'queue-fixture-'));
let passed = 0, count = 0;
function request(id, overrides = {}) {
  return { id, owner: 'owner-' + id, goalId: 'goal-' + id, kind: 'heavy-check',
    resource: 'legion', state: 'waiting', reason: 'bounded test',
    enqueuedAt: new Date(now - 1000).toISOString(), nextCheckpointAt: new Date(now + 60000).toISOString(),
    independentAction: 'owned lightweight review', dependsOn: [], peakRamGiB: 1, ...overrides };
}
function fixture(overrides = {}) {
  const file = path.join(root, 'state-' + count++ + '.json');
  const options = { file, withFileLock, atomicWrite,
    assertWrite: targets => targets.every(target => path.dirname(target) === root),
    readTelemetry: () => ({ observedAt: new Date(now).toISOString(), freeRamGiB: 5, reserveRamGiB: 2 }),
    checkGate: entry => ({ allowed: true, owner: entry.owner, resource: resourceKey(entry) }),
    confirmStopped: () => true, clock: () => now, ...overrides };
  return { store: createQueueStore(options), file };
}
function test(name, action) { action(); passed++; console.log('PASS ' + name); }
const dependency='d'.repeat(64),binding='b'.repeat(64),checkpoint='c'.repeat(64);
const supervisor=pid=>({pid,host:'fixture-host',nonce:String(pid===101?1:2).repeat(32)});
const invocationRequest=id=>request(id,{invocation:{binding_sha256:binding,
  checkpoint_sha256:checkpoint,dependency_sha256:dependency}});
const invocationAcquire=id=>({id,owner:'owner-'+id,leaseMilliseconds:1000,
  supervisor:supervisor(101),dependencySha256:dependency});
const invocationRecover=id=>({id,owner:'owner-'+id,bindingSha256:binding,
  supervisor:supervisor(202),leaseMilliseconds:1000,dependencySha256:dependency,checkpointSha256:checkpoint});
try {
  test('invocation acquisition records original supervisor and dependency without accepting missing custody',()=>{
    const {store,file}=fixture();store.enqueue([invocationRequest('custody')]);
    const before=fs.readFileSync(file,'utf8');
    for(const malformed of [{supervisor:undefined},{dependencySha256:'stale'}]){
      assert.throws(()=>store.acquire({...invocationAcquire('custody'),...malformed}),/supervisor|evidence/);
      assert.equal(fs.readFileSync(file,'utf8'),before);
    }
    const claim=store.acquire(invocationAcquire('custody'));
    const saved=JSON.parse(fs.readFileSync(file,'utf8')).entries[0];
    assert.equal(saved.token,claim.token);assert.deepEqual(saved.invocation.original_supervisor,supervisor(101));
    assert.deepEqual(saved.invocation.supervisor,supervisor(101));
    assert.equal(saved.invocation.admitted_dependency_sha256,dependency);
  });
  test('expired invocation with unverified cessation preserves custody and competing resource hold',()=>{
    let clock=now;
    const {store,file}=fixture({clock:()=>clock,confirmStopped:()=>false,
      readTelemetry:()=>({observedAt:new Date(clock).toISOString(),freeRamGiB:5,reserveRamGiB:2})});
    store.enqueue([invocationRequest('recover-a'),request('recover-b')]);
    const claim=store.acquire({...invocationAcquire('recover-a'),leaseMilliseconds:1});clock++;
    const before=fs.readFileSync(file,'utf8');
    assert.throws(()=>store.recover(invocationRecover('recover-a')),/cessation\/spend unverified/);
    assert.equal(fs.readFileSync(file,'utf8'),before);
    assert.equal(JSON.parse(before).entries[0].token,claim.token);
    assert.equal(store.acquire({id:'recover-b',owner:'owner-recover-b',leaseMilliseconds:1000}).acquired,false);
  });
  test('verified recovery preserves original token and entitlement while handing custody to current supervisor',()=>{
    let clock=now;
    const {store,file}=fixture({clock:()=>clock,
      readTelemetry:()=>({observedAt:new Date(clock).toISOString(),freeRamGiB:5,reserveRamGiB:2})});
    store.enqueue([invocationRequest('recover-ok')]);
    const claim=store.acquire({...invocationAcquire('recover-ok'),leaseMilliseconds:1});clock++;
    const before=fs.readFileSync(file,'utf8');
    for(const bad of [{owner:'other'},{bindingSha256:'a'.repeat(64)},{checkpointSha256:'invalid'}]){
      assert.throws(()=>store.recover({...invocationRecover('recover-ok'),...bad}),/entitlement|evidence/);
      assert.equal(fs.readFileSync(file,'utf8'),before);
    }
    const recovered=store.recover(invocationRecover('recover-ok'));
    const saved=JSON.parse(fs.readFileSync(file,'utf8')).entries[0];
    assert.equal(recovered.recovered,true);assert.equal(recovered.token,claim.token);
    assert.equal(saved.token,claim.token);assert.deepEqual(saved.invocation.original_supervisor,supervisor(101));
    assert.deepEqual(saved.invocation.supervisor,supervisor(202));
    assert.equal(saved.invocation.resume_checkpoint_sha256,checkpoint);
    assert.ok(Date.parse(saved.leaseUntil)>clock);
  });
  test('same-token recovery rechecks gate cessation RAM and expiry at final publication',()=>{
    for(const loss of ['gate','cessation','ram','expiry']){
      let clock=now,changed=false,allowed=true,stopped=true,freeRamGiB=5;
      const {store,file}=fixture({clock:()=>clock,
        checkGate:entry=>({allowed,owner:entry.owner,resource:resourceKey(entry)}),confirmStopped:()=>stopped,
        readTelemetry:()=>({observedAt:new Date(clock).toISOString(),freeRamGiB,reserveRamGiB:2}),
        atomicWrite:(target,content,options)=>{
          if(JSON.parse(content).entries.some(e=>e.invocation?.resume_checkpoint_sha256)){
            changed=true;if(loss==='gate')allowed=false;if(loss==='cessation')stopped=false;
            if(loss==='ram')freeRamGiB=0.8;if(loss==='expiry')clock+=2000;
          }
          return atomicWrite(target,content,options);
        }});
      store.enqueue([invocationRequest('late-'+loss)]);
      const claim=store.acquire({...invocationAcquire('late-'+loss),leaseMilliseconds:1});clock++;
      const before=fs.readFileSync(file,'utf8');
      assert.throws(()=>store.recover(invocationRecover('late-'+loss)),/authority|cessation|readiness|lease expired/);
      assert.equal(changed,true);assert.equal(fs.readFileSync(file,'utf8'),before);
      assert.equal(JSON.parse(before).entries[0].token,claim.token);
    }
  });
  test('gate loss during atomic staging denies claim publication and preserves old bytes', () => {
    let allowed=true;
    const {store,file}=fixture({checkGate:entry=>({allowed,owner:entry.owner,resource:resourceKey(entry)}),
      atomicWrite:(file,content,options)=>{if(JSON.parse(content).entries.some(entry=>entry.state==='running'))allowed=false;return atomicWrite(file,content,options);}});
    store.enqueue([request('staging-gate')]);const before=fs.readFileSync(file,'utf8');
    assert.throws(()=>store.acquire({id:'staging-gate',owner:'owner-staging-gate',leaseMilliseconds:1000}),/authority changed before publication/);
    assert.equal(fs.readFileSync(file,'utf8'),before);
  });
  test('RAM loss during atomic staging denies claim publication and preserves old bytes', () => {
    let freeRamGiB=5;
    const {store,file}=fixture({readTelemetry:()=>({observedAt:new Date(now).toISOString(),freeRamGiB,reserveRamGiB:2}),
      atomicWrite:(file,content,options)=>{if(JSON.parse(content).entries.some(entry=>entry.state==='running'))freeRamGiB=0.8;return atomicWrite(file,content,options);}});
    store.enqueue([request('staging-ram')]);const before=fs.readFileSync(file,'utf8');
    assert.throws(()=>store.acquire({id:'staging-ram',owner:'owner-staging-ram',leaseMilliseconds:1000}),/readiness changed before publication/);
    assert.equal(fs.readFileSync(file,'utf8'),before);
  });
  test('real observation precedes planner clock without weakening future-timestamp rejection', () => {
    let clock=now;
    const {store}=fixture({clock:()=>clock,readTelemetry:()=>{
      clock+=25;return {observedAt:new Date(clock).toISOString(),freeRamGiB:5,reserveRamGiB:2};
    }});
    store.enqueue([request('real-time')]);
    assert.equal(store.acquire({id:'real-time',owner:'owner-real-time',leaseMilliseconds:1000}).acquired,true);
    const future=fixture({readTelemetry:()=>({observedAt:new Date(now+1000).toISOString(),freeRamGiB:5,reserveRamGiB:2})});
    future.store.enqueue([request('future')]);
    assert.equal(future.store.acquire({id:'future',owner:'owner-future',leaseMilliseconds:1000}).acquired,false);
  });
  test('atomic claim chooses one cross-goal owner and blocks the next', () => {
    const { store } = fixture(); store.enqueue([request('a'), request('b')]);
    assert.equal(store.acquire({ id: 'a', owner: 'owner-a', leaseMilliseconds: 1000 }).acquired, true);
    const result = store.acquire({ id: 'b', owner: 'owner-b', leaseMilliseconds: 1000 });
    assert.equal(result.acquired, false); assert.equal(result.decision.state, 'waiting-owner');
    assert.equal(result.authorizationGranted, false);
  });
  test('existing canonical file lock denies a competing transaction without writes', () => {
    const { store, file } = fixture(); store.enqueue([request('a')]);
    const before = fs.readFileSync(file, 'utf8'); fs.writeFileSync(file + '.queue.lock', 'fixture', { flag: 'wx' });
    assert.throws(() => store.acquire({ id: 'a', owner: 'owner-a', leaseMilliseconds: 1000 }), /locked/);
    assert.equal(fs.readFileSync(file, 'utf8'), before); fs.unlinkSync(file + '.queue.lock');
  });
  test('wrong owner and stale token cannot release a slot', () => {
    const { store } = fixture(); store.enqueue([request('a')]);
    store.acquire({ id: 'a', owner: 'owner-a', leaseMilliseconds: 1000 });
    assert.throws(() => store.release({ id: 'a', owner: 'other', token: 'x', outcome: 'completed' }), /owner-bound/);
    assert.throws(() => store.release({ id: 'a', owner: 'owner-a', token: 'old', outcome: 'completed' }), /owner-bound/);
  });
  test('unverified cessation retains original state bytes', () => {
    const { store, file } = fixture({ confirmStopped: () => false }); store.enqueue([request('a')]);
    const claim = store.acquire({ id: 'a', owner: 'owner-a', leaseMilliseconds: 1000 });
    const before = fs.readFileSync(file, 'utf8');
    assert.throws(() => store.release({ ...claim, outcome: 'completed' }), /cessation unverified/);
    assert.equal(fs.readFileSync(file, 'utf8'), before);
  });
  test('confirmed owner release permits the next queued goal', () => {
    const { store } = fixture(); store.enqueue([request('a'), request('b')]);
    const claim = store.acquire({ id: 'a', owner: 'owner-a', leaseMilliseconds: 1000 });
    store.release({ ...claim, outcome: 'completed' });
    assert.equal(store.acquire({ id: 'b', owner: 'owner-b', leaseMilliseconds: 1000 }).acquired, true);
    assert.throws(() => store.release({ ...claim, outcome: 'completed' }), /owner-bound/);
  });
  test('expired claim does not free the resource automatically', () => {
    let clock = now;
    const { store } = fixture({ clock: () => clock, readTelemetry: () => ({ observedAt: new Date(clock).toISOString(), freeRamGiB: 5, reserveRamGiB: 2 }) });
    store.enqueue([request('a'), request('b')]); store.acquire({ id: 'a', owner: 'owner-a', leaseMilliseconds: 1 });
    clock++;
    assert.equal(store.snapshot().plan.decisions.find(value => value.id === 'a').state, 'reconciliation-required');
    assert.equal(store.acquire({ id: 'b', owner: 'owner-b', leaseMilliseconds: 1000 }).acquired, false);
  });
  test('gate change inside transaction prevents claim without writing', () => {
    let acquireCalls = 0;
    const { store, file } = fixture({ checkGate: entry => ({ allowed: entry.operation !== 'acquire' || ++acquireCalls === 1,
      owner: entry.owner, resource: resourceKey(entry) }) });
    store.enqueue([request('a')]); acquireCalls = 0;
    const before = fs.readFileSync(file, 'utf8');
    assert.throws(() => store.acquire({ id: 'a', owner: 'owner-a', leaseMilliseconds: 1000 }), /authority changed/);
    assert.equal(fs.readFileSync(file, 'utf8'), before);
  });
  test('RAM loss between planning and claim prevents write', () => {
    let reads = 0;
    const { store, file } = fixture({ readTelemetry: () => ({ observedAt: new Date(now).toISOString(), freeRamGiB: ++reads < 3 ? 5 : 0.8, reserveRamGiB: 2 }) });
    store.enqueue([request('a')]); reads = 1;
    const before = fs.readFileSync(file, 'utf8');
    assert.throws(() => store.acquire({ id: 'a', owner: 'owner-a', leaseMilliseconds: 1000 }), /readiness changed/);
    assert.equal(fs.readFileSync(file, 'utf8'), before);
  });
  test('injected running lease and missing write capability fail closed', () => {
    const { store } = fixture();
    assert.throws(() => store.enqueue([request('a', { state: 'running', token: 'forged' })]), /inject/);
    const denied = fixture({ assertWrite: () => false }).store;
    assert.throws(() => denied.enqueue([request('a')]), /ownership unavailable/);
    assert.throws(() => fixture({ checkGate: null }), /capability required/);
  });
  test('lost write authority immediately before atomic publication preserves bytes', () => {
    let allowed = true;
    const { store, file } = fixture({ assertWrite: () => allowed,
      atomicWrite: (target, bytes, options) => {
        if (fs.existsSync(target)) allowed = false;
        return atomicWrite(target, bytes, options);
      } });
    store.enqueue([request('a')]);
    const before = fs.readFileSync(file, 'utf8');
    assert.throws(() => store.acquire({ id: 'a', owner: 'owner-a', leaseMilliseconds: 1000 }), /ownership unavailable/);
    assert.equal(fs.readFileSync(file, 'utf8'), before);
  });
  test('bounded leases and corrupt state cannot be bypassed', () => {
    const { store, file } = fixture(); store.enqueue([request('a')]);
    assert.throws(() => store.acquire({ id: 'a', owner: 'owner-a', leaseMilliseconds: 300001 }), /bounded/);
    fs.writeFileSync(file, '{bad');
    assert.throws(() => store.snapshot());
    assert.equal(fs.readFileSync(file, 'utf8'), '{bad');
  });
  test('release refuses malformed history, duplicate IDs and invalid active tokens without publication', () => {
    const { store, file } = fixture(); store.enqueue([request('a')]);
    const claim = store.acquire({ id: 'a', owner: 'owner-a', leaseMilliseconds: 1000 });
    const original = JSON.parse(fs.readFileSync(file, 'utf8'));
    const variants = [
      { ...original, entries: [...original.entries, {}] },
      { ...original, entries: [...original.entries, { ...original.entries[0] }] },
      { ...original, entries: [{ ...original.entries[0], token: 'malformed' }] },
      { ...original, entries: [{ ...original.entries[0], token: [claim.token] }] },
      { ...original, entries: [{ id: 'a', owner: 'owner-a', state: 'running', token: claim.token }] },
    ];
    for (const state of variants) {
      const bytes = JSON.stringify(state); fs.writeFileSync(file, bytes);
      assert.throws(() => store.release({ ...claim, outcome: 'completed' }));
      assert.equal(fs.readFileSync(file, 'utf8'), bytes);
    }
  });
  test('declared async capabilities are rejected before any transaction', () => {
    for (const key of ['withFileLock','atomicWrite','assertWrite','readTelemetry','checkGate','confirmStopped','clock']) {
      assert.throws(() => fixture({ [key]: async () => true }), /asynchronous queue capability/);
    }
  });
  test('Promise-returning lock or publication never returns an acquired claim', () => {
    assert.throws(() => fixture({ withFileLock: () => Promise.resolve({ acquired: true }) }).store.snapshot(), /synchronous reviewed/);
    let delayed = false;
    const { store, file } = fixture({ atomicWrite: (target, bytes, options) => delayed ? Promise.resolve() : atomicWrite(target, bytes, options) });
    store.enqueue([request('a')]); delayed = true;
    const before = fs.readFileSync(file, 'utf8');
    assert.throws(() => store.acquire({ id: 'a', owner: 'owner-a', leaseMilliseconds: 1000 }), /synchronous reviewed/);
    assert.equal(fs.readFileSync(file, 'utf8'), before);
  });
  console.log(JSON.stringify({ passed, failed: 0, source: 'canonical atomic queue fixtures', productProcessesLaunched: 0, sharedDataWrites: 0, paidCalls: 0 }));
} finally {
  // Only files created by this test, under its resolved task-owned fixture root.
  const parent = fs.realpathSync(__dirname), resolved = fs.realpathSync(root);
  assert.ok(resolved.startsWith(parent + path.sep));
  for (const name of fs.readdirSync(root)) {
    const target = path.join(root, name);
    assert.equal(path.dirname(target), root); assert.ok(fs.lstatSync(target).isFile()); fs.unlinkSync(target);
  }
  fs.rmdirSync(root); // Empty fixture directory only; never recursive.
}
