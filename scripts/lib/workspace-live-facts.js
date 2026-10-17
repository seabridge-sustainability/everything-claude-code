'use strict';
// Read-only workspace collector. Facts are not authority or process-liveness proof.
const os = require('node:os');
const path = require('node:path');
const coord = require('./session-coordination');
const ROOT = 'C:/Users/adelm/SeaBridgeAI';
const REPOSITORIES = [
  { id: 'ecc', root: ROOT + '/everything-claude-code' },
  { id: 'backend', root: ROOT + '/manageesg-backend' },
  { id: 'frontend', root: ROOT + '/manageesg-frontend' },
];
const normal = value => path.win32.normalize(value).replace(/\\/g, '/').replace(/\/+$/, '').toLowerCase();
// Bounded launch-time sampling, not a daemon or a claim about future capacity.
// Keep the existing two-GiB reserve. Five kernel readings over >=1 second prevent
// one transient high reading from being treated as sustained launch headroom.
function collectMemoryWindow({ freeRamBytes = () => os.freemem(),
  totalRamBytes = () => os.totalmem(), clock = Date.now,
  wait = ms => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms) } = {}) {
  const recentSamples = [];
  for (let index = 0; index < 5; index++) {
    if (index) wait(250);
    const free = freeRamBytes(), total = totalRamBytes(), at = clock();
    if (!Number.isFinite(at) || !Number.isFinite(free) || !Number.isFinite(total)
        || total <= 0 || free < 0 || free > total
        || (index && at - Date.parse(recentSamples[index - 1].observedAt) < 250)) {
      throw Error('complete monotonic kernel RAM window required');
    }
    recentSamples.push({ observedAt: new Date(at).toISOString(), freeRamGiB: free / 1024 ** 3 });
  }
  return { ...recentSamples[4], reserveRamGiB: 2, recentSamples };
}
function collectFacts({ repositories = REPOSITORIES, status = cwd => coord.execute('status', { cwd }),
  freeRamBytes = () => os.freemem(), totalRamBytes = () => os.totalmem(), clock = Date.now } = {}) {
  const now = clock();
  if (!Number.isFinite(now)) throw new Error('known collector clock required');
  let free = null, total = null;
  try {
    const measuredFree = freeRamBytes(), measuredTotal = totalRamBytes();
    if (Number.isFinite(measuredFree) && Number.isFinite(measuredTotal)
        && measuredFree >= 0 && measuredTotal > 0 && measuredFree <= measuredTotal) {
      free = measuredFree / 1024 ** 3; total = measuredTotal / 1024 ** 3;
    }
  } catch { /* Unknown telemetry cannot admit a heavy check. */ }
  const facts = { observedAt: new Date(now).toISOString(), freshUntil: new Date(now + 30000).toISOString(),
    freeRamGiB: free, totalRamGiB: total, resourceSource: 'OS kernel memory',
    repositories: [], authorizationGranted: false, processLivenessVerified: false };
  const ids = new Set();
  for (const repository of repositories) {
    if (!repository?.id || ids.has(repository.id) || typeof repository.root !== 'string'
        || !normal(repository.root).startsWith(normal(ROOT) + '/')) {
      throw new Error('unique repository under approved C workspace required');
    }
    ids.add(repository.id);
    try {
      const state = status(repository.root);
      if (!Array.isArray(state.sessions) || !Number.isFinite(state.now)
          || Math.abs(state.now - now) > 30000 || !Object.hasOwn(state, 'release')) {
        throw new Error('current complete ECC status required');
      }
      for (const entry of state.sessions) {
        if (!entry || typeof entry.state !== 'string' || typeof entry.id !== 'string'
            || typeof entry.worktree !== 'string' || !Number.isFinite(entry.expiresAt)
            || (entry.metadataOnly !== undefined && typeof entry.metadataOnly !== 'boolean')) {
          throw new Error('invalid ECC owner record');
        }
        if (entry.scopes !== undefined) {
          if (!Array.isArray(entry.scopes) || !entry.scopes.length) throw new Error('invalid ECC owner scopes');
          entry.scopes.forEach(coord.scope);
        }
      }
      if (state.release !== null && (!state.release || typeof state.release.owner !== 'string'
          || !Number.isFinite(state.release.expiresAt))) throw new Error('invalid ECC release record');
      facts.repositories.push({ id: repository.id, root: repository.root, known: true,
        activePrimaryOwners: state.sessions.filter(entry => entry.state === 'active' && !entry.metadataOnly
          && (entry.expiresAt > state.now || state.release?.owner === entry.id)
          && normal(entry.worktree) === normal(repository.root)).map(entry => entry.id),
        activeSourceOwners: state.sessions.filter(entry => entry.state === 'active' && !entry.metadataOnly
          && (entry.expiresAt > state.now || state.release?.owner === entry.id)).map(entry => ({ id: entry.id, checkout: entry.worktree,
          scopes: entry.scopes ? [...entry.scopes] : null, effect: 'source-write' })),
        releaseOwner: state.release?.owner ?? null,
        releaseNeedsReconciliation: state.release !== null && state.release.expiresAt <= state.now,
        releasePublication: state.release === null ? null : { owner: state.release.owner,
          effect: 'publication', needsReconciliation: state.release.expiresAt <= state.now },
        statusSource: 'canonical ECC status', statusObservedAt: new Date(state.now).toISOString() });
    } catch {
      facts.repositories.push({ id: repository.id, root: repository.root, known: false,
        activePrimaryOwners: null, activeSourceOwners: null,
        releaseOwner: null, releaseNeedsReconciliation: null, releasePublication: null,
        statusSource: 'unavailable; no free-slot or authority inference' });
    }
  }
  return facts;
}
if (require.main === module) console.log(JSON.stringify(collectFacts(), null, 2));
module.exports = { collectFacts, collectMemoryWindow };
