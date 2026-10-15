'use strict';
// ECC queue component. Queue leases never replace native/ECC authorization.
// Callbacks must be supplied by a reviewed pinned parent host, not a worker.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { planQueues, resourceKey, validateEntries } = require('./workspace-queue');
function demand(value, reason) { if (!value) throw new Error(reason); }
function synchronous(callback, ...args) {
  const value = callback(...args);
  if (value && typeof value.then === 'function') {
    // Suppress an unhandled rejection, never await it or grant a claim. Reviewed
    // callbacks must also never schedule detached writes; this is not an OS fence.
    if (typeof value.catch === 'function') value.catch(() => {});
    throw new Error('synchronous reviewed queue capability required');
  }
  return value;
}
// A host-owned index contains queue paths, never a second ownership/lease ledger.
// All participating stores lock their own file, then this common machine index.
// Registered queue state is published BEFORE a claim can be returned. Missing or
// corrupt retained state is unknown capacity, not permission to reuse its slot.
function createMachineQueueGuard({ file, withFileLock, atomicWrite, assertWrite, clock = Date.now }) {
  demand(path.isAbsolute(file), 'absolute machine queue index required');
  for (const callback of [withFileLock, atomicWrite, assertWrite, clock]) {
    demand(typeof callback === 'function' && callback.constructor?.name !== 'AsyncFunction',
      'synchronous reviewed machine capability required');
  }
  const index = path.resolve(file), directory = path.dirname(index), lock = index + '.lock';
  const canonical = value => process.platform === 'win32' ? value.toLowerCase() : value;
  function regular(target) {
    demand(fs.lstatSync(target).isFile() && !fs.lstatSync(target).isSymbolicLink()
      && canonical(fs.realpathSync(target)) === canonical(target), 'linked machine queue state forbidden');
  }
  function verify() {
    demand(canonical(fs.realpathSync(directory)) === canonical(directory), 'linked machine directory forbidden');
    for (const target of [index, lock]) if (fs.existsSync(target)) regular(target);
    demand(synchronous(assertWrite, [index, lock]) === true, 'machine index ownership unavailable');
  }
  function queueState(target) {
    regular(target);
    demand(fs.statSync(target).size <= 1024 * 1024, 'machine queue state too large');
    const state = JSON.parse(fs.readFileSync(target, 'utf8'));
    demand(state.version === 1 && Number.isSafeInteger(state.sequence) && state.sequence >= 0,
      'invalid machine queue state');
    validateEntries(state.entries, synchronous(clock), { persisted: true });
    return state;
  }
  return { run(queueFile, initialize, action) {
    const target = path.resolve(queueFile);
    demand(path.isAbsolute(queueFile) && target !== index && target !== lock,
      'distinct absolute participating queue required');
    verify();
    return synchronous(withFileLock, lock, () => {
      verify();
      let queues = [];
      if (fs.existsSync(index)) {
        demand(fs.statSync(index).size <= 65536, 'machine queue index too large');
        const state = JSON.parse(fs.readFileSync(index, 'utf8'));
        demand(state.version === 1 && Array.isArray(state.queues) && state.queues.length <= 64,
          'invalid machine queue index');
        queues = state.queues;
        demand(queues.every(value => typeof value === 'string' && path.isAbsolute(value)
          && path.resolve(value) === value && value !== index && value !== lock)
          && new Set(queues.map(canonical)).size === queues.length, 'invalid machine queue paths');
      }
      const write = () => synchronous(atomicWrite, index, JSON.stringify({ version: 1, queues }),
        { validateParent: verify, beforeRename: verify });
      const peers = [];
      let totalBytes = 0;
      for (const queue of queues) {
        const state = queueState(queue); // An expired live claim still occupies capacity.
        totalBytes += fs.statSync(queue).size;
        demand(totalBytes <= 8 * 1024 * 1024, 'aggregate machine queue state too large');
        if (canonical(queue) === canonical(target)) continue;
        const prefix = crypto.createHash('sha256').update(canonical(queue)).digest('hex');
        for (const entry of state.entries.filter(value => value.kind === 'heavy-check' && value.state === 'running')) {
          peers.push({ ...entry, id: 'machine-' + prefix + '-' + entry.id, dependsOn: [] });
          demand(peers.length < 1000, 'machine claim history requires reconciliation');
        }
      }
      if (initialize) {
        synchronous(initialize); // Creates only this parent's empty queue when absent.
        queueState(target);
        if (!queues.some(value => canonical(value) === canonical(target))) {
          demand(queues.length < 64, 'machine queue index requires owner checkpoint');
          queues.push(target); write(); // Fail before an unindexed claim can be published.
        }
      }
      const result = synchronous(action, peers);
      // A terminal queue no longer occupies a machine slot. Do not infer this
      // from a lease deadline, PID absence, or deletion of its file.
      if (initialize && !queueState(target).entries.some(value => value.kind === 'heavy-check' && value.state === 'running')) {
        queues = queues.filter(value => canonical(value) !== canonical(target)); write();
      }
      return result;
    });
  } };
}
function createQueueStore({ file, withFileLock, atomicWrite, assertWrite, readTelemetry,
  checkGate, confirmStopped, machine, clock = Date.now }) {
  demand(path.isAbsolute(file), 'absolute queue path required');
  for (const callback of [withFileLock, atomicWrite, assertWrite, readTelemetry, checkGate, confirmStopped, clock]) {
    demand(typeof callback === 'function', 'reviewed queue capability required');
    demand(callback.constructor?.name !== 'AsyncFunction', 'asynchronous queue capability forbidden');
  }
  const resolved = path.resolve(file), directory = path.dirname(resolved), lock = resolved + '.queue.lock';
  demand(machine === undefined || typeof machine.run === 'function', 'reviewed machine queue guard required');
  let peerClaims = [];
  demand(fs.existsSync(directory), 'reviewed queue directory must already exist');
  function verifyPath() {
    const compare = value => process.platform === 'win32' ? value.toLowerCase() : value;
    demand(compare(fs.realpathSync(directory)) === compare(directory), 'linked/aliased queue directory forbidden');
    for (const target of [resolved, lock]) {
      if (fs.existsSync(target)) demand(fs.lstatSync(target).isFile() && !fs.lstatSync(target).isSymbolicLink(), 'linked queue/lock forbidden');
    }
    demand(synchronous(assertWrite, [resolved, lock]) === true, 'queue write ownership unavailable');
  }
  function read() {
    if (!fs.existsSync(resolved)) return { version: 1, sequence: 0, entries: [] };
    demand(fs.statSync(resolved).size <= 1024 * 1024, 'queue state too large');
    const state = JSON.parse(fs.readFileSync(resolved, 'utf8'));
    demand(state.version === 1 && Number.isSafeInteger(state.sequence) && state.sequence >= 0 && Array.isArray(state.entries), 'invalid queue state');
    validateEntries(state.entries, synchronous(clock), { persisted: true });
    return state;
  }
  function trustedGate(entry, operation) {
    const decision = synchronous(checkGate, { ...entry, operation });
    return decision?.allowed === true && decision.owner === entry.owner
      && decision.resource === resourceKey(entry) ? decision : null;
  }
  function plan(state){
    // Real telemetry callbacks may do ownership/source checks first. Capture
    // planner time after the observation, never before its timestamp exists.
    const telemetry=synchronous(readTelemetry),now=synchronous(clock);
    return planQueues([...state.entries, ...peerClaims],{now,telemetry,checkGate:entry=>trustedGate(entry,'acquire')});
  }
  function onMachine(write, action) {
    if (!machine) return action(); // Legacy component mode, not host-wide proof.
    const initialize = write ? () => {
      verifyPath();
      if (!fs.existsSync(resolved)) synchronous(atomicWrite, resolved,
        JSON.stringify({ version: 1, sequence: 0, entries: [] }), { validateParent: verifyPath });
    } : null;
    return synchronous(machine.run.bind(machine), resolved, initialize, peers => {
      peerClaims = peers;
      try { return action(); } finally { peerClaims = []; }
    });
  }
  function transaction(action) {
    verifyPath();
    return synchronous(withFileLock, lock, () => {
      return onMachine(true, () => {
      verifyPath();
      const state = read();
      const priorClaims=new Map(state.entries.filter(entry=>entry.state==='running').map(entry=>[entry.id,structuredClone(entry)]));
      const outcome = action(state);
      if (outcome.changed) {
        validateEntries(state.entries, synchronous(clock), { persisted: true });
        demand(Number.isSafeInteger(state.sequence + 1), 'queue sequence exhausted');
        state.sequence++;
        verifyPath();
        const claims=state.entries.filter(entry=>{
          const previous=priorClaims.get(entry.id);
          return entry.state==='running'&&(!previous||previous.token!==entry.token
            ||previous.leaseUntil!==entry.leaseUntil
            ||JSON.stringify(previous.invocation?.supervisor)!==JSON.stringify(entry.invocation?.supervisor));
        });
        const validateLease=()=>{
          for(const entry of claims)demand(Date.parse(entry.leaseUntil)>synchronous(clock),
            'queue lease expired before publication');
        };
        const publicationDeadline=claims.length?Math.min(...claims.map(entry=>Date.parse(entry.leaseUntil))):undefined;
        synchronous(atomicWrite, resolved, JSON.stringify(state), { validateParent: verifyPath, publicationDeadline, beforeRename(){
          verifyPath();
          // Revalidate new tokens AND same-token custody/lease changes at the
          // final publication boundary. Unchanged retained claims stay held.
          for(const entry of claims){
            const previous=priorClaims.get(entry.id),recovering=previous?.token===entry.token;
            let checked=entry;
            if(recovering){
              demand(previous.invocation&&entry.invocation
                &&previous.invocation.binding_sha256===entry.invocation.binding_sha256
                &&JSON.stringify(previous.invocation.original_supervisor)===JSON.stringify(entry.invocation.original_supervisor),
                'original invocation changed before publication');
              checked={...entry,invocation:{...entry.invocation,
                supervisor:previous.invocation.supervisor,next_supervisor:entry.invocation.supervisor}};
            }
            const operation=recovering?'recover':'acquire';
            demand(trustedGate(checked,operation),'queue authority changed before publication');
            if(recovering)demand(synchronous(confirmStopped,structuredClone(checked))===true,
              'invocation cessation/spend changed before publication');
            const pending={...state,entries:state.entries.map(value=>value.id===entry.id?{...value,state:'waiting'}:value)};
            const telemetry=synchronous(readTelemetry),now=synchronous(clock);
            const decision=planQueues([...pending.entries, ...peerClaims],{now,telemetry,checkGate:value=>
              value.id===entry.id?trustedGate(checked,operation):trustedGate(value,'acquire')})
              .decisions.find(value=>value.id===entry.id);
            demand(decision.state==='ready-for-atomic-recheck','queue readiness changed before publication');
          }
          // All synchronous admission callbacks consume this same lease.
          validateLease();
        }});
      }
      return { ...outcome.result, sequence: state.sequence, authorizationGranted: false };
      });
    });
  }
  function snapshot() {
    verifyPath();
    return synchronous(withFileLock, lock, () => {
      return onMachine(false, () => {
      verifyPath();
      const state = read();
      return { ...state, plan: plan(state) };
      });
    });
  }
  function enqueue(entries) {
    demand(Array.isArray(entries) && entries.length > 0, 'bounded enqueue batch required');
    demand(entries.length <= 100, 'enqueue batch too large');
    return transaction(state => {
      const added = structuredClone(entries);
      for (const entry of added) {
        demand(entry.state === 'waiting' && !entry.token && !entry.leaseUntil, 'enqueue cannot inject an active lease');
        demand(trustedGate(entry, 'enqueue'), 'enqueue authority unavailable');
      }
      state.entries.push(...added);
      demand(state.entries.length <= 1000, 'queue history limit requires owner checkpoint');
      plan(state);
      return { changed: true, result: { enqueued: added.map(entry => entry.id) } };
    });
  }
  function acquire({ id, owner, leaseMilliseconds, supervisor, dependencySha256 }) {
    demand(Number.isInteger(leaseMilliseconds) && leaseMilliseconds > 0 && leaseMilliseconds <= 300000, 'bounded queue lease required');
    return transaction(state => {
      const entry = state.entries.find(value => value.id === id);
      demand(entry && entry.owner === owner, 'exact queue owner required');
      if(entry.invocation){
        demand(/^[a-f0-9]{64}$/.test(dependencySha256),'current dependency evidence required');
        entry.invocation.admitted_dependency_sha256=dependencySha256;
      }
      const observed = plan(state).decisions.find(value => value.id === id);
      if (observed.state !== 'ready-for-atomic-recheck') {
        return { changed: false, result: { acquired: false, decision: observed } };
      }
      // Recheck authoritative gate after planning and immediately before commit.
      demand(trustedGate(entry, 'acquire'), 'queue authority changed before claim');
      const fresh = plan(state).decisions.find(value => value.id === id);
      demand(fresh.state === 'ready-for-atomic-recheck', 'queue readiness changed before claim');
      entry.state = 'running';
      if(entry.invocation){
        demand(supervisor&&Number.isSafeInteger(supervisor.pid)&&supervisor.pid>0
          &&typeof supervisor.host==='string'&&/^[a-f0-9]{32}$/.test(supervisor.nonce),
          'exact invocation supervisor required');
        demand(!entry.invocation.supervisor&&!entry.invocation.original_supervisor,
          'waiting invocation cannot carry supervisor custody');
        entry.invocation.original_supervisor=structuredClone(supervisor);
        entry.invocation.supervisor=structuredClone(supervisor);
      }
      entry.token = crypto.randomBytes(24).toString('hex');
      entry.leaseUntil = new Date(synchronous(clock) + leaseMilliseconds).toISOString();
      return { changed: true, result: { acquired: true, id, owner, token: entry.token,
        leaseUntil: entry.leaseUntil, resource: resourceKey(entry) } };
    });
  }
  function recover({id,owner,bindingSha256,supervisor,leaseMilliseconds,dependencySha256,checkpointSha256}){
    demand(Number.isInteger(leaseMilliseconds)&&leaseMilliseconds>0&&leaseMilliseconds<=300000,
      'bounded queue lease required');
    return transaction(state=>{
      const entry=state.entries.find(value=>value.id===id),invocation=entry?.invocation;
      demand(entry?.owner===owner&&entry.state==='running'&&invocation
        &&invocation.binding_sha256===bindingSha256&&invocation.original_supervisor,
        'original invocation entitlement required');
      demand(supervisor&&Number.isSafeInteger(supervisor.pid)&&supervisor.pid>0
        &&typeof supervisor.host==='string'&&/^[a-f0-9]{32}$/.test(supervisor.nonce),
        'exact recovery supervisor required');
      demand(/^[a-f0-9]{64}$/.test(dependencySha256)&&/^[a-f0-9]{64}$/.test(checkpointSha256),
        'current recovery evidence required');
      invocation.admitted_dependency_sha256=dependencySha256;
      invocation.resume_checkpoint_sha256=checkpointSha256;
      invocation.next_supervisor=structuredClone(supervisor);
      // The reviewed recovery gate proves the original supervisor dead and
      // the current goal/source/ownership/resource still eligible. Expiry is
      // never cessation. Token and original entitlement remain unchanged.
      demand(trustedGate(entry,'recover'),'invocation recovery authority unavailable');
      const ready=()=>{
        const telemetry=synchronous(readTelemetry),projected=structuredClone(state.entries);
        projected.find(value=>value.id===id).state='waiting';
        return planQueues([...projected, ...peerClaims],{now:synchronous(clock),telemetry,checkGate:value=>
          value.id===id?trustedGate(entry,'recover'):trustedGate(value,'acquire')})
          .decisions.find(value=>value.id===id)?.state==='ready-for-atomic-recheck';
      };
      demand(ready(),'invocation recovery resources/dependencies unavailable');
      demand(synchronous(confirmStopped,structuredClone(entry))===true,
        'invocation cessation/spend unverified; preserve original claim');
      demand(ready(),'invocation recovery authority/resources changed');
      invocation.supervisor=structuredClone(supervisor);
      delete invocation.next_supervisor;
      entry.leaseUntil=new Date(synchronous(clock)+leaseMilliseconds).toISOString();
      return {changed:true,result:{acquired:true,recovered:true,id,owner,token:entry.token,
        leaseUntil:entry.leaseUntil,resource:resourceKey(entry)}};
    });
  }
  function release({ id, owner, token, outcome, checkpoint }) {
    demand(['completed', 'cancelled'].includes(outcome), 'explicit terminal queue outcome required');
    return transaction(state => {
      const entry = state.entries.find(value => value.id === id);
      demand(entry && entry.owner === owner && entry.state === 'running'
        && typeof token === 'string' && token === entry.token, 'current owner-bound lease token required');
      demand(trustedGate(entry, 'release'), 'release authority unavailable');
      demand(synchronous(confirmStopped, structuredClone(entry)) === true, 'process/job cessation unverified; preserve slot');
      if(entry.invocation){
        demand(checkpoint&&/^[a-f0-9]{64}$/.test(checkpoint.sha256)
          &&/^[a-f0-9]{64}$/.test(checkpoint.dependency_sha256)
          &&typeof checkpoint.stopped==='string'&&checkpoint.stopped,
          'durable invocation checkpoint required');
        entry.invocation.closed_checkpoint=structuredClone(checkpoint);
      }
      entry.state = outcome;
      entry.finishedAt = new Date(synchronous(clock)).toISOString();
      return { changed: true, result: { released: true, id, outcome } };
    });
  }
  return { enqueue, acquire, recover, release, snapshot };
}
module.exports = { createQueueStore, createMachineQueueGuard };
