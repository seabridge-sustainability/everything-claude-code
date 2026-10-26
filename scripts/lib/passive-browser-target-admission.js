'use strict';

// ROOT-held dispatch adapter for the two retained passive operations. The queue
// is the ownership registry; this module issues no authority and launches nothing.
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { resourceKey } = require('./workspace-queue');
const { createQueueStore, createMachineQueueGuard } = require('./workspace-queue-store');
const { withFileLock } = require('./goal-store');
const { writeFileAtomic } = require('./atomic-write');
const { repository } = require('./session-coordination');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
function need(ok, reason) { if (!ok) throw Error(reason); }
const OPERATIONS = Object.freeze({
  'greenly-lca': Object.freeze({
    target: 'D4DFC16D0BBBD72010B4F93F74F3CCB3', actor: /^rea-greenly-lca-[a-z0-9-]{1,80}$/,
    producer: '3cbf037bccca5f32f6e8ce2861a7a95d7a93684956a0c63a795ad7fcec351498',
    observer: '6c775ce672fc24ed049925042e48c686ab6c50e719eb7a0d3ea522150ad3723b',
    scope: 'GREENLY_ONLY_FIXED_LCA_OVERVIEW_ELIGIBILITY',
  }),
  'persefoni-purpose': Object.freeze({
    target: 'DE72303F6AF6B76A701094512FA4C4FD', actor: /^rea-persefoni-scope3-[a-z0-9-]{1,80}$/,
    producer: 'f9ba26ce78e5d02e2cf1ffb3adedb6d0d361d1d6f07dec919cd391f7e53d1afb',
    observer: 'aedb09f329a9bcb0ba6117ef521e32003c7a6a0d91fe050c92226d43aeddb596',
    scope: 'PERSEFONI_ONLY_PUBLIC_PURPOSE_STRUCTURE',
  }),
});
const HEADER = "BINDING=MappingProxyType(dict(status='UNISSUED',absoluteStop=None,source=None,sourceSHA256=None,sourceBytes=None,sourceReady=None,sourceReadySHA256=None,sourceActor=None,outputParent=None,actor=None,nonce=None,attempt=None,normalAdmissionReceipt=None,normalAdmissionSHA256=None,nativeUnit=None,nativeDescription=None))";
const EXEC = "const EXEC=Object.freeze({status:'UNISSUED',absoluteStop:null,output:null,session:null,nonce:null,attempt:null,nativeUnit:null,nativeDescription:null});";
const uuid = v => typeof v === 'string' && /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(v);
const pin = v => typeof v === 'string' && /^[a-f0-9]{64}$/.test(v);
function read(file, expected, cap = 65536) {
  need(path.isAbsolute(file) && pin(expected), 'absolute pinned source required');
  const fd = fs.openSync(file, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK);
  try {
    const before = fs.fstatSync(fd, { bigint: true });
    need(before.isFile() && before.size > 0n && before.size <= BigInt(cap), 'bounded regular source required');
    const bytes = Buffer.alloc(Number(before.size)); let offset = 0;
    while (offset < bytes.length) { const n = fs.readSync(fd, bytes, offset, bytes.length - offset); need(n > 0, 'source truncated'); offset += n; }
    need(fs.readSync(fd, Buffer.alloc(1), 0, 1) === 0, 'source grew');
    const after = fs.fstatSync(fd, { bigint: true });
    need(['dev', 'ino', 'size', 'mtimeNs', 'ctimeNs'].every(k => before[k] === after[k]) && sha(bytes) === expected, 'source pin changed');
    return bytes;
  } finally { fs.closeSync(fd); }
}
function oneLine(text, expression) {
  const matches = [...text.matchAll(expression)]; need(matches.length === 1, 'exact issuance declaration required'); return matches[0];
}
// Only historical formatter substitutions may differ. All executable guards,
// scope, target, native containment and output validators remain byte-identical.
function inspectIssuedProducer(operation, producerBytes, observerBytes, reviewBytes) {
  const op = OPERATIONS[operation]; need(op, 'unsupported passive operation');
  let text = producerBytes.toString('utf8');
  const declaration = oneLine(text, /^BINDING=MappingProxyType\(json.loads\(("[^\n]+")\)\)$/gm);
  const b = JSON.parse(JSON.parse(declaration[1]));
  const scope = oneLine(text, /^SCOPE_ACCEPTANCE=("[^\n]+")$/gm);
  const scopePin = oneLine(text, /^SCOPE_ACCEPTANCE_SHA=("[a-f0-9]{64}")$/gm);
  text = text.replace(declaration[0], HEADER).replace(scope[0], 'SCOPE_ACCEPTANCE=None').replace(scopePin[0], 'SCOPE_ACCEPTANCE_SHA=None');
  need(sha(Buffer.from(text)) === op.producer, 'producer executable delta forbidden');
  const observer = observerBytes.toString('utf8');
  const eLine = oneLine(observer, /^const EXEC=Object.freeze\((\{[^\n]+\})\);$/gm);
  need(sha(Buffer.from(observer.replace(eLine[0], EXEC))) === op.observer, 'observer executable delta forbidden');
  const e = JSON.parse(eLine[1]), review = JSON.parse(reviewBytes);
  need(sha(reviewBytes) === JSON.parse(scopePin[1]) && review.scope === op.scope
    && review.producer?.sha256 === op.producer && review.observer?.sha256 === op.observer, 'retained original scope review required');
  need(b.status === 'ISSUED' && e.status === 'ISSUED' && op.actor.test(b.actor) && b.attempt === 1, 'issued passive binding required');
  need(b.sourceSHA256 === sha(observerBytes) && b.sourceBytes === observerBytes.length, 'observer binding mismatch');
  for (const k of ['absoluteStop', 'nonce', 'attempt', 'nativeUnit', 'nativeDescription']) need(b[k] === e[k], 'observer issuance mismatch');
  need(e.session === b.actor && e.output === path.join(b.outputParent, 'run1'), 'observer owner/output mismatch');
  need(/^[a-f0-9]{32}$/.test(b.nonce), 'exact nonce required');
  return { binding: b, scopePath: JSON.parse(scope[1]), scopeSHA256: JSON.parse(scopePin[1]) };
}
function sync(fn, ...args) { const value = fn(...args); need(!value?.then, 'synchronous custody gate required'); return value; }

function createPassiveTargetAdmission({ repositoryPath, assignmentBytes, assignmentSHA256,
  assertWrite, readTelemetry, verifyAdmission, verifyCustody, verifyNativeIdentity,
  confirmStopped, dispatch, clock = Date.now }) {
  need(Buffer.isBuffer(assignmentBytes) && assignmentBytes.length <= 16384
    && sha(assignmentBytes) === assignmentSHA256, 'ROOT-held assignment pin required');
  assignmentBytes = Buffer.from(assignmentBytes);
  const a = JSON.parse(assignmentBytes), op = OPERATIONS[a.operation];
  need(a.schema === 'rea.passive-target-assignment.v1' && a.status === 'ISSUED' && op, 'issued target assignment required');
  need(uuid(a.coordinatorThreadId) && uuid(a.navigatorThreadId) && op.actor.test(a.actor)
    && a.targetId === op.target && a.backgroundOnly === true, 'exact navigator/operation/target required');
  need(pin(a.producerSHA256) && pin(a.observerSHA256) && pin(a.scopeReviewSHA256)
    && typeof a.goalId === 'string' && a.goalId.length > 0, 'source and original goal binding required');
  need(Number.isFinite(a.peakRamGiB) && a.peakRamGiB > 0, 'reviewed RAM envelope required');
  for (const fn of [assertWrite, readTelemetry, verifyAdmission, verifyCustody, verifyNativeIdentity, confirmStopped, dispatch, clock]) need(typeof fn === 'function', 'ROOT-held capability required');
  const issued = () => {
    const value = inspectIssuedProducer(a.operation, read(a.producerPath, a.producerSHA256),
      read(a.observerPath, a.observerSHA256), read(a.scopeReviewPath, a.scopeReviewSHA256, 16384));
    const b = value.binding;
    need(b.actor === a.actor && b.nonce === a.nonce && b.absoluteStop === a.expiresAt
      && b.source === a.observerPath && value.scopePath === a.scopeReviewPath
      && value.scopeSHA256 === a.scopeReviewSHA256, 'assignment/producer mismatch');
    return b;
  };
  const b = issued(), end = Date.parse(a.expiresAt);
  need(Number.isFinite(end) && end - sync(clock) > 22000 && end <= Date.parse('2026-10-28T01:59:29Z'), 'fresh original finite lease required');
  const directory = path.dirname(b.outputParent), file = path.join(directory, 'target-queue.json');
  const machineFile = path.join(repository(repositoryPath).directory, 'machine-queues.json');
  const machine = createMachineQueueGuard({ file: machineFile, withFileLock, atomicWrite: writeFileAtomic, assertWrite, clock });
  const entry = { id: a.actor + ':' + a.nonce, owner: a.actor, goalId: a.goalId,
    kind: 'browser-target', resource: a.targetId, browser: a.browser, backgroundOnly: true,
    peakRamGiB: a.peakRamGiB, state: 'waiting', enqueuedAt: new Date(sync(clock)).toISOString(),
    nextCheckpointAt: a.expiresAt, dependsOn: [], reason: 'Assigned existing-target passive operation',
    independentAction: 'Continue source review while target or native gates are unavailable' };
  const key = resourceKey(entry); let claim = null, witness = null, attempted = false;
  const assignment = () => JSON.parse(assignmentBytes); // Never expose internal mutable binding.
  const gate = e => {
    need(e.id === entry.id && e.owner === entry.owner && e.kind === entry.kind
      && resourceKey(e) === key && e.peakRamGiB === a.peakRamGiB, 'fixed target claim required');
    if (e.operation !== 'release') { need(sync(clock) + 22000 < end, 'producer deadline reserve'); issued(); }
    need(sync(verifyAdmission, assignment(), e.operation) === true, 'current normal admission refused');
    need(sync(verifyCustody, assignment(), e.operation) === true, 'actual target custody refused');
    need(sync(verifyNativeIdentity, assignment(), e.operation) === true, 'native browser identity refused');
    return { allowed: true, owner: entry.owner, resource: key };
  };
  const store = createQueueStore({ file, withFileLock, atomicWrite: writeFileAtomic, assertWrite,
    machine, readTelemetry, clock, checkGate: gate,
    confirmStopped: () => witness !== null && sync(confirmStopped, assignment(), witness) === true });
  function reconcile(externalWitness, outcome = 'completed') {
    need(claim?.acquired, 'existing claim required'); witness = externalWitness;
    return store.release({ ...claim, outcome });
  }
  async function run() {
    need(!attempted, 'one finite attempt only'); attempted = true;
    store.enqueue([entry]);
    claim = store.acquire({ id: entry.id, owner: entry.owner, leaseMilliseconds: Math.min(300000, end - sync(clock)) });
    if (!claim.acquired) return { state: 'WAITING', decision: claim.decision, browserDispatched: false };
    // No auto-release on exception: a dispatcher may have started a producer.
    // ROOT must reconcile its independent process-closure witness before release.
    store.recheck(claim); issued();
    const result = await dispatch(Object.freeze({ executable: '/usr/bin/python3',
      argv: Object.freeze([a.producerPath]), producerSHA256: a.producerSHA256,
      actor: a.actor, navigatorThreadId: a.navigatorThreadId, targetId: a.targetId,
      absoluteStop: a.expiresAt, nonce: a.nonce }));
    const release = reconcile(result.externalWitness);
    return { state: 'PRODUCER_CLOSED_TARGET_RELEASED', release,
      operationResult: result.operationResult, liveBrowserParallelismProven: false };
  }
  return Object.freeze({ run, reconcile, snapshot: () => store.snapshot(),
    describe: () => ({ queueFile: file, machineFile, targetKey: key, navigatorThreadId: a.navigatorThreadId,
      actor: a.actor, operation: a.operation, authorizationGranted: false }) });
}
module.exports = { createPassiveTargetAdmission, inspectIssuedProducer, OPERATIONS };
