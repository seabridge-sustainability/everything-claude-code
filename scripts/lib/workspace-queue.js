'use strict';

// ECC queue component. Pure readiness planning, not authorization, launch,
// an ownership registry, a daemon, or an OS sandbox. Integration must serialize
// claim/recheck with existing ECC ownership, resource and release gates.
const KINDS = new Set(['heavy-check', 'backend', 'writer', 'release']);
const path = require('node:path');
const STATES = new Set(['waiting', 'running', 'completed', 'cancelled', 'owner-paused']);
const terminal = entry => ['completed', 'cancelled'].includes(entry.state);
const timestamp = value => typeof value === 'string' ? Date.parse(value) : NaN;
function demand(value, reason) { if (!value) throw new Error(reason); }
function identity(value) {
  demand(typeof value === 'string' && value.trim(), 'resource identity required');
  let normalized = value.trim().replace(/\\/g, '/');
  demand(!normalized.split('/').includes('..'), 'traversal resource identity forbidden');
  // Same Windows repository cannot acquire multiple slots through spelling
  // aliases. Native device/UNC/ADS and ambiguous trailing-dot paths fail closed.
  if (process.platform === 'win32') normalized = normalized.replace(/^\/([a-z])\//i, '$1:/');
  if (/^[a-z]:\//i.test(normalized)) {
    normalized = normalized.toLowerCase();
    demand(!normalized.slice(2).includes(':'), 'ADS resource identity forbidden');
    demand(!normalized.split('/').slice(1).some(part => part !== '.' && /[. ]$/.test(part)), 'ambiguous resource path forbidden');
    normalized = path.win32.normalize(normalized).replace(/\\/g, '/').replace(/\/+$/, '');
  } else if (normalized.startsWith('/')) {
    // Native POSIX repositories are case-sensitive. Do not invent Windows
    // aliases for them, or accept POSIX/UNC spellings on a Windows controller.
    demand(process.platform !== 'win32' && !value.includes('\\')
      && !normalized.startsWith('//') && !normalized.includes(':'), 'native POSIX repository required');
    normalized = path.posix.normalize(normalized).replace(/\/+$/, '') || '/';
  } else {
    demand(!normalized.startsWith('/') && !normalized.includes(':') && !normalized.includes('/'), 'absolute Windows repository or simple resource identity required');
    normalized = normalized.toLowerCase();
  }
  return normalized;
}
function resourceKey(entry) {
  // A release and source writer share a repository's exclusivity slot.
  demand(typeof entry.resource === 'string' && entry.resource.trim(), 'resource identity required');
  // This controller coordinates one local machine. Task-specific labels must
  // never create separate RAM pools on the same laptop.
  if (entry.kind === 'heavy-check') return 'heavy-check:local-machine';
  if (entry.kind === 'backend') {
    demand(/^(127\.0\.0\.1|localhost):8000$/i.test(entry.resource), 'verified primary backend resource required');
    return 'backend:127.0.0.1:8000';
  }
  const family = ['release', 'writer'].includes(entry.kind) ? 'repository' : entry.kind;
  demand(/^(?:[a-z]:[\\/]|\/[a-z]\/)/i.test(entry.resource)
    || (process.platform !== 'win32' && path.posix.isAbsolute(entry.resource)), 'absolute repository identity required');
  return family + ':' + identity(entry.resource);
}
function validateEntries(entries, now, { persisted = false } = {}) {
  demand(Number.isFinite(now) && Array.isArray(entries), 'known clock and queue required');
  demand(entries.length <= 1000, 'queue history limit requires owner checkpoint');
  const ids = new Set();
  for (const entry of entries) {
    demand(entry && typeof entry === 'object' && !Array.isArray(entry), 'queue entry object required');
    for (const field of ['id', 'owner', 'goalId', 'reason', 'independentAction']) {
      demand(typeof entry[field] === 'string' && entry[field].trim(), field + ' required');
    }
    demand(!ids.has(entry.id), 'duplicate queue identity'); ids.add(entry.id);
    demand(KINDS.has(entry.kind) && STATES.has(entry.state), 'unknown queue kind/state');
    resourceKey(entry);
    demand(Number.isFinite(timestamp(entry.enqueuedAt)) && timestamp(entry.enqueuedAt) <= now, 'invalid/future enqueue time');
    demand(Number.isFinite(timestamp(entry.nextCheckpointAt)), 'next checkpoint required');
    demand(Array.isArray(entry.dependsOn) && new Set(entry.dependsOn).size === entry.dependsOn.length, 'unique dependencies required');
    if (entry.state === 'running') demand(Number.isFinite(timestamp(entry.leaseUntil)), 'running lease required');
    if (persisted && entry.state === 'running') demand(typeof entry.token === 'string' && /^[a-f0-9]{48}$/.test(entry.token), 'persisted running owner-bound token required');
    if (persisted && terminal(entry)) demand(Number.isFinite(timestamp(entry.finishedAt)), 'persisted terminal timestamp required');
    if (entry.state === 'owner-paused') demand(entry.explicitOwnerPause === true, 'explicit owner pause required');
    if (entry.kind === 'heavy-check') demand(Number.isFinite(entry.peakRamGiB) && entry.peakRamGiB > 0, 'positive peak RAM required');
  }
  for (const entry of entries) for (const dependency of entry.dependsOn) {
    demand(ids.has(dependency), 'unknown dependency');
  }
}
function cycleMembers(entries) {
  const byId = new Map(entries.map(entry => [entry.id, entry]));
  const visited = new Set(), stack = [], cycles = new Set();
  function visit(id) {
    const entry = byId.get(id);
    if (terminal(entry)) return;
    const at = stack.indexOf(id);
    if (at >= 0) { for (const member of stack.slice(at)) cycles.add(member); return; }
    if (visited.has(id)) return;
    stack.push(id);
    for (const dependency of entry.dependsOn) visit(dependency);
    stack.pop(); visited.add(id);
  }
  for (const entry of entries) visit(entry.id);
  return cycles;
}
function planQueues(entries, { now, telemetry, checkGate } = {}) {
  validateEntries(entries, now);
  const byId = new Map(entries.map(entry => [entry.id, entry]));
  const cycles = cycleMembers(entries);
  const occupied = new Map();
  for (const entry of entries.filter(entry => entry.state === 'running')) {
    const key = resourceKey(entry);
    const owners = occupied.get(key) || [];
    owners.push(entry.owner); occupied.set(key, owners);
  }
  const selected = new Map(), decisions = new Map();
  for (const entry of [...entries].sort((left, right) => timestamp(left.enqueuedAt) - timestamp(right.enqueuedAt) || left.id.localeCompare(right.id))) {
    const base = { id: entry.id, owner: entry.owner, goalId: entry.goalId,
      resource: resourceKey(entry), waitMilliseconds: now - timestamp(entry.enqueuedAt),
      checkpointDue: timestamp(entry.nextCheckpointAt) <= now,
      independentAction: entry.independentAction, authorizationGranted: false };
    const result = (state, reason, owner = null) => decisions.set(entry.id, { ...base, state, reason, blockingOwner: owner });
    if (terminal(entry)) { result(entry.state, 'recorded terminal state'); continue; }
    if (entry.state === 'owner-paused') { result('owner-paused', 'explicit owner pause; never resume automatically'); continue; }
    if (entry.state === 'running') {
      result(timestamp(entry.leaseUntil) <= now ? 'reconciliation-required' : 'running',
        timestamp(entry.leaseUntil) <= now ? 'lease expired; process cessation and actual ownership must be verified' : 'live lease record; process liveness separately unverified');
      continue;
    }
    if (cycles.has(entry.id)) { result('waiting-cycle', 'circular dependency requires legitimate reorder/handoff'); continue; }
    const dependencies = entry.dependsOn.filter(id => byId.get(id).state !== 'completed');
    if (dependencies.length) { result('waiting-dependency', dependencies.join(', ')); continue; }
    const holder = occupied.get(base.resource) || selected.get(base.resource);
    if (holder) { result('waiting-owner', 'resource slot held; no takeover', Array.isArray(holder) ? holder.join(', ') : holder); continue; }
    if (entry.kind === 'heavy-check') {
      const age = now - timestamp(telemetry?.observedAt);
      if (!Number.isFinite(age) || age < 0 || age > 30000
          || !Number.isFinite(telemetry?.freeRamGiB) || telemetry.freeRamGiB < 0
          || !Number.isFinite(telemetry?.reserveRamGiB) || telemetry.reserveRamGiB < 2) {
        result('waiting-resource', 'fresh trusted RAM telemetry and existing minimum headroom required'); continue;
      }
      if (telemetry.freeRamGiB - entry.peakRamGiB < telemetry.reserveRamGiB) {
        result('waiting-resource', 'insufficient RAM headroom'); continue;
      }
    }
    let gate;
    try { gate = typeof checkGate === 'function' ? checkGate(entry) : null; }
    catch { gate = null; }
    if (gate?.allowed !== true || gate?.resource !== base.resource || gate?.owner !== entry.owner) {
      result('waiting-gate', 'existing authority/ownership/service/release gate not verified'); continue;
    }
    selected.set(base.resource, entry.owner);
    result('ready-for-atomic-recheck', 'readiness only; recheck and acquire through canonical gates before execution');
  }
  return { decisions: entries.map(entry => decisions.get(entry.id)), cycles: [...cycles].sort(),
    limitation: 'Pure plan only. All running records retain their slots; no liveness inferred, lease stolen, gate waived, process started, approval issued or side effect executed.' };
}
module.exports = { planQueues, resourceKey, validateEntries };
