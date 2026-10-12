'use strict';
// One explicit operational loop over the existing controller. Native launchers
// and external authorizers remain pinned host capabilities, not agent claims.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const engine = require('./coding-execution');
const coordination = require('./session-coordination');

const REQUIRED = ['launchWorker','inspectWorker','confirmStopped','review','verifyCritic','verifyPreservation','authorizeCitation',
  'proposeEffects','readApproval','authorizeApproval','executeEffect','inspectEffect','verifyEffect'];
function demand(condition, message) { if (!condition) throw Error(message); }
function pinnedHost(file, expected, context) {
  demand(path.isAbsolute(file) && /^[a-f0-9]{64}$/.test(expected), 'reviewed absolute host path and SHA256 required');
  const real = fs.realpathSync(file);
  demand(real === path.resolve(file) && !fs.lstatSync(file).isSymbolicLink(), 'linked host forbidden');
  const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  demand(hash === expected, 'trusted host source changed; reviewed pin required');
  delete require.cache[require.resolve(file)];
  const module = require(file);
  demand(typeof module.createHost === 'function', 'host factory required');
  const host = module.createHost(context);
  for (const key of REQUIRED) demand(typeof host[key] === 'function', `missing trusted host capability: ${key}`);
  return host;
}
function options(host) {
  const result = {};
  // Verifiers in the transition engine MUST be synchronous; a Promise is not true.
  for (const key of ['verifyCritic','verifyPreservation','authorizeCitation','authorizeApproval','verifyEffect']) result[key] = (...args) => host[key](...args) === true;
  return result;
}
async function run(file, host, { maxIterations = 50, maxMilliseconds = 300000 } = {}) {
  for (const key of REQUIRED) demand(typeof host[key] === 'function', `missing trusted host capability: ${key}`);
  demand(Number.isSafeInteger(maxIterations) && maxIterations > 0 && maxIterations <= 1000, 'bounded iteration limit required');
  demand(Number.isSafeInteger(maxMilliseconds) && maxMilliseconds > 0 && maxMilliseconds <= 3600000, 'bounded runner time required');
  const lock = `${file}.runner-lock`;
  const plan = engine.load(file).plan;
  const recovery = `${file}.recovery-lock`;
  coordination.execute('check-write', { cwd: plan.repo, sessionId: plan.session,
    paths: [lock,recovery].map(p => path.relative(plan.repo,p).split(path.sep).join('/')) });
  const marker = { pid: process.pid, host: os.hostname(), plan_sha256: engine.digest(plan), nonce: crypto.randomBytes(16).toString('hex'), pendingCalls:[] };
  const confirmed = async value => {
    let timer;
    try { return await Promise.race([Promise.resolve().then(() => host.confirmStopped(value)), new Promise(resolve => { timer=setTimeout(()=>resolve(false),1000); })]) === true; }
    finally { clearTimeout(timer); }
  };
  // Serialize reclamation AND acquisition. A stale recovery lock needs operator
  // reconciliation, never another unsynchronized unlink/check/retry loop.
  const reclaimFd = fs.openSync(recovery, 'wx', 0o600);
  fs.writeFileSync(reclaimFd, JSON.stringify(marker)); fs.fsyncSync(reclaimFd);
  let descriptor;
  try {
    if (fs.existsSync(lock)) {
      const previous = JSON.parse(fs.readFileSync(lock,'utf8'));
      demand(previous.host===os.hostname() && previous.plan_sha256===engine.digest(plan), 'foreign supervisor lock');
      let dead=false; try { process.kill(previous.pid,0); } catch(error) { dead=error.code==='ESRCH'; }
      demand(dead, 'supervisor is still alive or inaccessible');
      demand(Array.isArray(previous.pendingCalls), 'supervisor call journal missing; operator reconciliation required');
      for (const pending of previous.pendingCalls) demand(await confirmed({ ...pending, stateFile:file }), 'interrupted host cessation unverified; retain supervisor lock');
      demand(JSON.stringify(JSON.parse(fs.readFileSync(lock,'utf8')))===JSON.stringify(previous), 'supervisor lock changed');
      fs.unlinkSync(lock);
    }
    if (fs.existsSync(`${file}.lock`)) engine.recoverLock(file);
    engine.transaction(file, state => state);
    descriptor=fs.openSync(lock,'wx',0o600);
    fs.writeFileSync(descriptor,JSON.stringify(marker));fs.fsyncSync(descriptor);
  } finally {
    fs.closeSync(reclaimFd);
    if (JSON.parse(fs.readFileSync(recovery,'utf8')).nonce===marker.nonce) fs.unlinkSync(recovery);
  }
  const gates = options(host), started = Date.now();
  let steps = 0;
  const transition = event => engine.transaction(file, state => engine.apply(state, event, gates));
  const call = async (method, ...args) => {
    const remaining = maxMilliseconds - (Date.now() - started);
    demand(remaining > 0, 'runner time exhausted');
    const abort = new AbortController(); let timer;
    const callId=crypto.randomUUID();
    marker.pendingCalls.push({method,callId});
    fs.writeFileSync(lock,JSON.stringify(marker));
    try {
      const value = await Promise.race([
        Promise.resolve().then(() => host[method](...args, { signal: abort.signal, callId })),
        new Promise((_, reject) => { timer = setTimeout(() => { abort.abort(); reject(Object.assign(Error('host deadline exceeded; execution state retained for reconciliation'),{uncertain:{method,callId}})); }, remaining); }),
      ]);
      marker.pendingCalls=marker.pendingCalls.filter(pending=>pending.callId!==callId);
      fs.writeFileSync(lock,JSON.stringify(marker));
      return value;
    } catch (error) {
      if (await confirmed({method,callId,stateFile:file})) marker.pendingCalls=marker.pendingCalls.filter(pending=>pending.callId!==callId);
      fs.writeFileSync(lock,JSON.stringify(marker));
      throw error;
    } finally { clearTimeout(timer); }
  };
  const recoverWorkers = async state => {
    for (const worker of state.plan.workers) {
      const node = state.nodes[worker.id];
      if (node.status !== 'running' || node.lease_until > Date.now()) continue;
      const observed = await call('inspectWorker', structuredClone(worker), structuredClone(node));
      // Expiry does NOT prove the process stopped or that failed spending was zero.
      if (observed?.status !== 'failed' || !observed.usage) return false;
      state = transition({ type: 'worker-error', actor: worker.agent, worker: worker.id, token: node.token, usage: observed.usage });
    }
    return true;
  };
  try {
    let state = engine.load(file);
    if (!await recoverWorkers(state)) return { state, stopped: 'worker-reconciliation-required', transitions: steps };
    state = transition({ type: 'recover', actor: plan.parent });
    while (steps++ < maxIterations && Date.now() - started < maxMilliseconds) {
      const parent = state.plan.parent;
      if (['completed','budget-exhausted'].includes(state.phase)) return { state, stopped: state.phase, transitions: steps };
      if (['planned','repair'].includes(state.phase)) {
        state = await engine.dispatchParallel(file, worker => call('launchWorker', worker), gates);
      } else if (state.phase === 'workers') {
        if (!await recoverWorkers(state)) return { state: engine.load(file), stopped: 'worker-reconciliation-required', transitions: steps };
        state = transition({ type: 'recover', actor: parent });
        if (state.phase === 'workers') return { state, stopped: 'awaiting-live-worker-leases', transitions: steps };
      } else if (state.phase === 'critic') {
        const report = await call('review', structuredClone(state));
        state = transition({ type: 'critic', actor: state.plan.critic, report });
      } else if (state.phase === 'synthesis') {
        state = transition({ type: 'synthesis', actor: parent, output: { version: 1, join_sha256: state.join_sha256,
          claim: 'locally-verified', outputs: state.plan.workers.map(worker => worker.id) } });
      } else if (state.phase === 'approval') {
        if (!Object.keys(state.effects).length) {
          const proposals = await call('proposeEffects', structuredClone(state));
          demand(Array.isArray(proposals) && proposals.length > 0, 'explicit effects required; no invented release');
          for (const effect of proposals) state = transition({ type: 'propose-effect', actor: parent, effect });
        }
        const entry = Object.values(state.effects).find(effect => effect.status !== 'completed');
        if (entry.status === 'pending') {
          const approval = await call('readApproval', structuredClone(entry), structuredClone(state));
          if (!approval) return { state, stopped: 'owner-approval-required', transitions: steps };
          state = transition({ ...approval, type: 'approve-effect', actor: parent, id: entry.proposal.id });
        }
        state = transition({ type: 'begin-effect', actor: parent, id: entry.proposal.id, binding: entry.binding });
        // Persist begin BEFORE the host side effect. Failures leave reconciliation,
        // never an automatic repeated push/deploy/provider call.
        const receipt = await call('executeEffect', structuredClone(entry.proposal), entry.binding);
        state = transition({ type: 'finish-effect', actor: parent, id: entry.proposal.id, receipt });
      } else if (['effect','reconciliation'].includes(state.phase)) {
        if (state.phase === 'effect') state = transition({ type: 'recover', actor: parent });
        const entry = Object.values(state.effects).find(effect => effect.status === 'running');
        demand(entry, 'ambiguous effect not found');
        const receipt = await call('inspectEffect', structuredClone(entry.proposal), entry.binding);
        if (!receipt) return { state, stopped: 'effect-reconciliation-required', transitions: steps };
        state = transition({ type: 'reconcile-effect', actor: parent, id: entry.proposal.id, receipt });
      } else throw Error('unsupported operational phase');
    }
    return { state: engine.load(file), stopped: 'runner-budget', transitions: steps };
  } finally {
    fs.closeSync(descriptor);
    if (!marker.pendingCalls.length && JSON.parse(fs.readFileSync(lock, 'utf8')).nonce === marker.nonce) fs.unlinkSync(lock);
  }
}
module.exports = { run, pinnedHost, options, REQUIRED };
