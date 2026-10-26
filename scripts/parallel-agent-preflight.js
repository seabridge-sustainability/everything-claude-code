#!/usr/bin/env node
'use strict';
// Read-only diagnostic: no ownership, launch, reload or permission side effects.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { resourceKey } = require('./lib/workspace-queue');
const uuid = v => typeof v === 'string' && /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(v);
const pin = v => typeof v === 'string' && /^[a-f0-9]{64}$/.test(v);
const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
function need(ok, message) { if (!ok) { const error = Error(message); error.code = 'PREFLIGHT_EVIDENCE'; throw error; } }
function read(file, cap = 1024 * 1024) {
  need(path.isAbsolute(file), 'absolute input path required');
  const fd = fs.openSync(file, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK);
  try {
    const before = fs.fstatSync(fd, { bigint: true });
    need(before.isFile() && before.size > 0n && before.size <= BigInt(cap), 'bounded regular input required');
    const bytes = Buffer.alloc(Number(before.size));
    let offset = 0;
    while (offset < bytes.length) {
      const n = fs.readSync(fd, bytes, offset, bytes.length - offset);
      need(n > 0, 'input truncated'); offset += n;
    }
    need(fs.readSync(fd, Buffer.alloc(1), 0, 1) === 0, 'input grew');
    const after = fs.fstatSync(fd, { bigint: true });
    need(['dev', 'ino', 'size', 'mtimeNs', 'ctimeNs'].every(k => before[k] === after[k]), 'input changed');
    return bytes;
  } finally { fs.closeSync(fd); }
}
const json = (file, cap) => JSON.parse(read(file, cap).toString('utf8'));
function savedConfig(text, version, minimum) {
  if (version !== '0.163.0') return { status: 'UNVERIFIED_CLIENT_VERSION', legacyLimit: null, v2Limit: null };
  // Deliberately supports only the installed client's reviewed plain-table/integer form.
  // No evaluation, environment expansion, credential inspection or configuration rewriting.
  // Multiline strings can contain table-shaped text. Unsupported forms must
  // never be treated as real capacity settings by this narrow projection.
  if (text.includes('"""') || text.includes("'''")) {
    return { status: 'UNVERIFIED_TOML_FORM', legacyLimit: null, v2Limit: null,
      appliesToLoadedOnceLock: false };
  }
  let table = '', legacy = null, v2 = null, ambiguous = false;
  const tables = new Set();
  for (const line of text.split(/\r?\n/)) {
    const header = line.match(/^\s*\[([^\][[]+)\]\s*(?:#.*)?$/);
    if (header) {
      table = header[1].trim();
      if (tables.has(table) && ['agents', 'features.multi_agent_v2'].includes(table)) ambiguous = true;
      tables.add(table); continue;
    }
    if (table === 'features' && /^\s*multi_agent_v2\s*=/.test(line)) ambiguous = true;
    if (['agents', 'features.multi_agent_v2'].includes(table) && /^\s*max_concurrent_threads_per_session\s*=/.test(line)) {
      const value = line.match(/^\s*max_concurrent_threads_per_session\s*=\s*([1-9](?:[0-9]|_[0-9])*)\s*(?:#.*)?$/);
      const number = value ? Number(value[1].replaceAll('_', '')) : NaN;
      if (!Number.isSafeInteger(number)) ambiguous = true;
      if (table === 'agents') { if (legacy !== null) ambiguous = true; legacy = number; }
      else { if (v2 !== null) ambiguous = true; v2 = number; }
    }
  }
  const status = ambiguous ? 'UNVERIFIED_TOML_FORM' : v2 === null ? 'MISSING_V2_CEILING'
    : v2 < minimum + 1 ? 'V2_CEILING_BELOW_REQUEST' : 'SAVED_V2_CEILING_PRESENT';
  return { status, legacyLimit: Number.isSafeInteger(legacy) ? legacy : null,
    v2Limit: Number.isSafeInteger(v2) ? v2 : null, appliesToLoadedOnceLock: false };
}
function nativeProof(proof, root, now, maxAgeSeconds, minimum) {
  need(proof.root === root && uuid(root), 'native proof must name exact requested root');
  const at = Date.parse(proof.at);
  need(Number.isFinite(at) && at <= now, 'valid nonfuture native observation required');
  need(Array.isArray(proof.agents) && proof.agents.length <= 1000, 'bounded native agent roster required');
  const ids = new Set(), events = [];
  for (const a of proof.agents) {
    need(uuid(a.id) && a.id !== root && !ids.has(a.id), 'distinct native child IDs required');
    ids.add(a.id);
    const task = a.task?.task ?? a.initialTask?.task;
    need(typeof task === 'string' && task.trim(), 'useful task binding required');
    const turns = a.turns ?? [a.turn];
    need(Array.isArray(turns) && turns.length > 0 && turns.length <= 1000, 'actual turn intervals required');
    const ranges = turns.map(t => {
      const start = (t?.startedAt ?? NaN) * 1000, end = (t?.completedAt === null || t?.completedAt === undefined) ? at : t.completedAt * 1000;
      need(Number.isFinite(start) && Number.isFinite(end) && start <= end && start <= at, 'valid actual native turn interval required');
      return [start, Math.min(end, at)];
    }).filter(([s, e]) => e > s).sort((a, b) => a[0] - b[0]);
    // One child with overlapping turns still counts once.
    const merged = [];
    for (const range of ranges) {
      const previous = merged.at(-1);
      if (previous && range[0] <= previous[1]) previous[1] = Math.max(previous[1], range[1]);
      else merged.push([...range]);
    }
    for (const [start, end] of merged) events.push([start, 1], [end, -1]);
  }
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]); // half-open: end before start
  let active = 0, peak = 0;
  for (const [, delta] of events) { active += delta; peak = Math.max(peak, active); }
  const fresh = now - at <= maxAgeSeconds * 1000;
  return { root, observedAt: new Date(at).toISOString(), admittedChildren: ids.size,
    overlappingChildrenLowerBound: peak, reportedPeak: proof.intervalPeakLowerBound ?? null,
    reportedPeakMatches: proof.intervalPeakLowerBound === undefined || proof.intervalPeakLowerBound === peak,
    status: !fresh ? 'HISTORICAL' : peak < minimum ? 'OVERLAP_BELOW_REQUEST' : 'OBSERVED_AT_RECEIPT',
    currentLoadedCeiling: 'UNVERIFIED', futureCapacityGuaranteed: false };
}
function refusalEvidence(proof) {
  need(proof?.exactRefusal === 'collab spawn failed: agent thread limit reached'
    && Array.isArray(proof.observations) && proof.observations.length <= 8, 'recognized native refusal receipt required');
  return proof.observations.map(o => {
    const ids = (o.childStates ?? []).map(c => c.id);
    need(ids.length <= 1000 && ids.every(uuid) && new Set(ids).size === ids.length
      && Number.isFinite(Date.parse(o.at)), 'actual refusal roster and time required');
    return { observedAt: o.at, admittedChildren: ids.length,
      pattern: ids.length === 3 ? 'THREE_CHILDREN_AND_NEXT_REFUSED_FOUR_TOTAL_PATTERN' : 'NATIVE_ADMISSION_REFUSAL',
      rootBinding: 'UNVERIFIED: this historical receipt names chats, not root UUIDs',
      currentLimit: 'UNVERIFIED' };
  });
}
function canonicalOperation(a, bytes) {
  // Lazy import: native/config-only diagnostics need no adapter dependencies.
  // This reads the canonical source verifier; it constructs no queue/controller.
  const { inspectIssuedProducer, OPERATIONS } = require('./lib/passive-browser-target-admission');
  const operation = OPERATIONS[a.operation];
  need(operation && operation.target === a.targetId && operation.actor.test(a.actor),
    'canonical operation target and actor required');
  return inspectIssuedProducer(a.operation, ...bytes);
}
function inspectAssignment(a, { now, readSource = read, inspectOperation = canonicalOperation } = {}) {
  need(a?.schema === 'rea.passive-target-assignment.v1', 'canonical passive assignment required');
  if (a.status === 'UNISSUED') return { status: 'UNISSUED', authorizationGranted: false };
  need(a.status === 'ISSUED', 'issued or explicitly unissued assignment required');
  need(uuid(a.coordinatorThreadId) && uuid(a.navigatorThreadId) && a.coordinatorThreadId !== a.navigatorThreadId,
    'distinct actual coordinator and navigator required');
  need(typeof a.actor === 'string' && /^[a-z0-9][a-z0-9-]{0,127}$/.test(a.actor)
    && typeof a.operation === 'string' && /^[a-z0-9][a-z0-9-]{0,127}$/.test(a.operation)
    && typeof a.goalId === 'string' && a.goalId.trim(), 'actual owner operation and goal bindings required');
  need(typeof a.nonce === 'string' && /^[a-f0-9]{32}$/.test(a.nonce), 'finite attempt nonce required');
  need(Number.isFinite(a.peakRamGiB) && a.peakRamGiB > 0, 'positive reviewed RAM envelope required');
  const key = resourceKey({ kind: 'browser-target', resource: a.targetId, browser: a.browser,
    backgroundOnly: a.backgroundOnly });
  const end = Date.parse(a.expiresAt);
  need(Number.isFinite(end), 'finite assignment expiry required');
  const sourceBytes = [];
  for (const [file, expected] of [[a.producerPath, a.producerSHA256],
    [a.observerPath, a.observerSHA256], [a.scopeReviewPath, a.scopeReviewSHA256]]) {
    need(pin(expected) && path.isAbsolute(file), 'exact operation source pins required');
    const bytes = readSource(file, 256 * 1024);
    need(digest(bytes) === expected, 'operation source hash mismatch');
    sourceBytes.push(bytes);
  }
  const reviewed = inspectOperation(a, sourceBytes), binding = reviewed.binding;
  need(binding.actor === a.actor && binding.nonce === a.nonce
    && binding.absoluteStop === a.expiresAt && binding.source === a.observerPath
    && binding.sourceSHA256 === a.observerSHA256 && reviewed.scopePath === a.scopeReviewPath
    && reviewed.scopeSHA256 === a.scopeReviewSHA256, 'assignment and original operation source bindings differ');
  return { status: end <= now ? 'EXPIRED_RECONCILIATION_REQUIRED' : 'ISSUED_SOURCE_PINS_MATCH',
    owner: a.actor, navigatorThreadId: a.navigatorThreadId, operation: a.operation,
    targetKey: key, queueId: a.actor + ':' + a.nonce, expiresAt: a.expiresAt,
    nativeIdentityCurrent: 'UNVERIFIED', targetCustodyCurrent: 'UNVERIFIED', authorizationGranted: false };
}
function browserAssignments(assignments, queueEntries, options) {
  need(assignments.length <= 8 && queueEntries.length <= 1000, 'bounded browser evidence required');
  const results = assignments.map(a => inspectAssignment(a, options));
  const keys = new Set(), owners = new Set(), navigators = new Set();
  for (const r of results.filter(r => r.targetKey)) {
    need(!keys.has(r.targetKey), 'two controllers assigned to same canonical target');
    need(!owners.has(r.owner) && !navigators.has(r.navigatorThreadId), 'distinct parallel owners and navigators required');
    keys.add(r.targetKey); owners.add(r.owner); navigators.add(r.navigatorThreadId);
    const claims = queueEntries.filter(e => e.kind === 'browser-target' && e.state === 'running'
      && resourceKey(e) === r.targetKey);
    need(claims.length <= 1, 'multiple running claims for same target');
    const claim = claims[0];
    if (claim) {
      need(claim.owner === r.owner && claim.id === r.queueId, 'canonical queue target belongs to another controller');
      const until = Date.parse(claim.leaseUntil);
      need(Number.isFinite(until), 'finite running queue expiry required');
      need(until <= Date.parse(r.expiresAt), 'queue lease exceeds assignment expiry');
      r.queueRecord = until <= options.now ? 'EXPIRED_RECONCILIATION_REQUIRED' : 'MATCHING_RUNNING_RECORD';
    } else r.queueRecord = 'NO_RUNNING_RECORD';
  }
  return results;
}
function parse(args) {
  const result = { proofs: [], assignments: [], queues: [], refusals: [], minChildren: 1, maxAgeSeconds: 300 };
  const list = { '--proof': 'proofs', '--assignment': 'assignments', '--queue': 'queues', '--refusal-proof': 'refusals' };
  const fields = { '--root': 'root', '--saved-config': 'config', '--client-version': 'version',
    '--min-children': 'minChildren', '--max-age-seconds': 'maxAgeSeconds' };
  for (let i = 0; i < args.length; i += 2) {
    need(args[i + 1] && !args[i + 1].startsWith('--'), 'option value required');
    if (list[args[i]]) { const values = result[list[args[i]]]; need(values.length < 8, 'input count limit'); values.push(args[i + 1]); }
    else if (fields[args[i]]) { const key = fields[args[i]]; need(!Object.hasOwn(result, key) || ['minChildren','maxAgeSeconds'].includes(key), 'duplicate option'); result[key] = args[i + 1]; }
    else throw Error('unknown preflight option');
  }
  for (const key of ['minChildren', 'maxAgeSeconds']) {
    result[key] = Number(result[key]); need(Number.isSafeInteger(result[key]) && result[key] > 0 && result[key] < 10000000, 'positive bounded diagnostic request required');
  }
  if (result.proofs.length) need(uuid(result.root), 'exact root required with native proofs');
  return result;
}
function main(args = process.argv.slice(2), { print = console.log, clock = Date.now } = {}) {
  if (args.length === 1 && args[0] === '--help') {
    print('parallel-agent-preflight --client-version 0.163.0 --saved-config ABS_TOML --root UUID --proof ABS_JSON [repeat] --min-children N --max-age-seconds N [--assignment ABS_JSON] [--queue ABS_JSON]. Read only; exit 0 means consistent supplied evidence, never authority or future capacity.'); return 0;
  }
  const o = parse(args), now = clock();
  const configuration = o.config ? savedConfig(read(o.config, 256 * 1024).toString('utf8'), o.version, o.minChildren)
    : { status: 'UNVERIFIED', legacyLimit: null, v2Limit: null };
  const native = o.proofs.map(file => nativeProof(json(file), o.root, now, o.maxAgeSeconds, o.minChildren));
  const priorRefusals = o.refusals.flatMap(file => refusalEvidence(json(file)));
  const entries = o.queues.flatMap(file => { const q = json(file); need(Array.isArray(q.entries), 'canonical queue snapshot required'); return q.entries; });
  const browser = browserAssignments(o.assignments.map(file => json(file, 16384)), entries, { now });
  const consistent = configuration.status === 'SAVED_V2_CEILING_PRESENT'
    && native.some(p => p.status === 'OBSERVED_AT_RECEIPT' && p.reportedPeakMatches)
    && browser.every(a => a.status === 'ISSUED_SOURCE_PINS_MATCH' && a.queueRecord === 'MATCHING_RUNNING_RECORD');
  print(JSON.stringify({ status: consistent ? 'EVIDENCE_CONSISTENT' : 'UNVERIFIED_OR_ACTION_REQUIRED',
    observedAt: new Date(now).toISOString(), configuration,
    effectiveLoadedConfiguration: 'UNVERIFIED: saved config and native receipts do not expose the current OnceLock value',
    native, priorRefusals, browser, hostMemory: { freeBytes: os.freemem(), totalBytes: os.totalmem(), admissionGranted: false },
    otherClients: 'UNVERIFIED: do not extrapolate Codex evidence to Claude, Antigravity, Kimi, OpenCode or Gemini',
    authorizationGranted: false, browserCalls: 0, modelCalls: 0,
    limitation: 'Supplied historical evidence only; canonical controller must recheck identity, custody, privacy, RAM, source and expiry immediately before dispatch. No automatic reload/restart or new authority store.' }, null, 2));
  return consistent ? 0 : 2;
}
if (require.main === module) {
  try { process.exitCode = main(); }
  catch (error) { console.error('parallel agent preflight: ' + (error.code === 'PREFLIGHT_EVIDENCE' ? error.message : 'invalid or unavailable bounded evidence') + '; no actions authorized'); process.exitCode = 2; }
}
module.exports = { read, savedConfig, nativeProof, refusalEvidence, inspectAssignment, browserAssignments, parse, main };
