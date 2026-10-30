'use strict';

// Parent-side adapter. Orca settlement supplies identity; the existing execution
// engine and pinned host supply engineering acceptance. Neither substitutes for
// the other. Same-user unrestricted filesystem access is not a security boundary.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const store = require('./goal-store');
const coordination = require('./session-coordination');
const hash = value => store.sha256Buffer(store.canonicalJson(value));
function demand(value, message) { if (!value) throw new Error(message); }
function evidenceDigest(refs) {
  demand(Array.isArray(refs) && refs.length > 0, 'absolute acceptance evidence required');
  const normalized = refs.map(ref => {
    demand(typeof ref.kind === 'string' && path.isAbsolute(ref.ref || ''), 'absolute acceptance evidence required');
    return { kind: ref.kind, ref: fs.realpathSync(ref.ref) };
  }).sort((a, b) => a.kind.localeCompare(b.kind) || a.ref.localeCompare(b.ref));
  demand(new Set(normalized.map(hash)).size === normalized.length, 'duplicate acceptance evidence');
  return hash(normalized);
}
function readJson(file) {
  demand(fs.statSync(file).size <= 1024 * 1024, 'acceptance document exceeds bounded size');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}
function pinned(entry) {
  demand(entry && path.isAbsolute(entry.path) && /^[a-f0-9]{64}$/.test(entry.sha256 || ''), 'pinned absolute trust input required');
  demand(fs.realpathSync(entry.path) === path.resolve(entry.path) && !fs.lstatSync(entry.path).isSymbolicLink(), 'linked trust input forbidden');
  demand(store.sha256File(entry.path) === entry.sha256, 'parent trust input changed');
  return entry.path;
}
function loadTrust() {
  const file = process.env.ECC_ORCA_ACCEPTANCE_CONFIG;
  const sha256 = process.env.ECC_ORCA_ACCEPTANCE_CONFIG_SHA256;
  demand(file && sha256, 'parent-pinned Orca acceptance configuration required');
  const config = readJson(pinned({ path: file, sha256 }));
  demand(config.version === 1 && config.run_id && config.parent_orca_session_id && config.runtime_id,
    'invalid parent acceptance identity configuration');
  pinned(config.cli); pinned(config.public_key);
  return config;
}
function outsideWorkers(file, plan) {
  const absolute = path.resolve(file);
  for (const worker of plan.workers) {
    const rel = path.relative(worker.repo, absolute).split(path.sep).join('/');
    if (!rel.startsWith('../') && !path.isAbsolute(rel)) {
      demand(!worker.scopes.some(scope => coordination.overlaps(rel, scope)), 'acceptance authority overlaps worker scope');
    }
  }
}
function createClient(config) {
  return argv => {
    const result = spawnSync(pinned(config.cli), [...argv, '--json'], {
      encoding: 'utf8', windowsHide: true, timeout: 15000, maxBuffer: 2 * 1024 * 1024,
    });
    // Never forward possibly credential-bearing provider stderr.
    demand(!result.error && result.status === 0, 'Orca observation unavailable; retain exact attempt');
    const value = JSON.parse(result.stdout);
    demand(value.ok === true && value._meta?.runtimeId === config.runtime_id, 'Orca runtime changed or observation refused');
    return value.result;
  };
}
function observeDispatch(config, binding, call = createClient(config)) {
  const status = call(['status']);
  demand(status.caller?.live === true && status.caller.orcaSessionId === config.parent_orca_session_id,
    'authenticated native parent session required');
  const result = call(['orchestration', 'worker-show', '--dispatch', binding.dispatch_id]);
  const dispatch = result.dispatch;
  demand(dispatch && dispatch.id === binding.dispatch_id && dispatch.taskId === binding.task_id
    && dispatch.runId === config.run_id && dispatch.processIncarnation === binding.process_incarnation,
  'Run/Task/Dispatch/incarnation binding mismatch');
  demand(result.projection?.host?.id === binding.host_id, 'execution host binding mismatch');
  demand(dispatch.status === 'completed' && result.projection.outcome === 'succeeded',
    'worker did not submit a successful settled result');
  const output = call(['orchestration', 'worker-read', '--dispatch', binding.dispatch_id, '--limit', '100']);
  demand(output.source === 'transcript' && output.sourceIdentity && output.transcript,
    'authoritative worker output unavailable');
  return { run_id: config.run_id, task_id: dispatch.taskId, dispatch_id: dispatch.id,
    process_incarnation: dispatch.processIncarnation, host_id: binding.host_id,
    parent_orca_session_id: status.caller.orcaSessionId,
    transcript_source: output.sourceIdentity, observed_output_sha256: hash(output.transcript),
    output_clipped: !!output.warnings?.length };
}
function issueAcceptance({ stateFile, workerId, receiptFile, config = loadTrust(), host, call }) {
  const engine = require('./coding-execution');
  const state = engine.load(stateFile), plan = state.plan;
  engine.initialize(plan); // Revalidate current goal, ownership and assignments.
  demand(['approval', 'effect', 'completed'].includes(state.phase)
    && state.critique?.accepted === true && state.synthesis?.join_sha256 === state.join_sha256,
  'independent critic and complete parent synthesis required');
  const worker = plan.workers.find(item => item.id === workerId), node = state.nodes[workerId];
  demand(worker && node?.status === 'done' && node.result?.status === 'pass', 'passing exact worker result required');
  const binding = config.bindings?.find(item => item.worker_id === workerId);
  demand(binding, 'worker has no pinned native Dispatch binding');
  for (const file of [stateFile, receiptFile, config.private_key?.path, config.public_key.path, config.cli.path, config.host?.path,
    process.env.ECC_ORCA_ACCEPTANCE_CONFIG].filter(Boolean)) outsideWorkers(file, plan);
  demand(host && typeof host.verifyCritic === 'function'
    && host.verifyCritic({ actor: plan.critic, report: state.critique }, plan) === true,
  'trusted independent critic authentication failed');
  engine.currentEvidence(state, host.authorizeCitation, host.verifyPreservation, true);
  const native = observeDispatch(config, binding, call);
  demand(native.parent_orca_session_id !== worker.agent && plan.parent !== worker.agent
    && plan.critic !== worker.agent, 'worker cannot accept its own result');
  const goal = require('./goal-control').readStructuredFile(plan.goal_file);
  const assignment = require('./goal-control').readJsonLines(plan.assignments_file)
    .find(item => item.assignment_id === worker.assignment_id);
  const contract = require('./goal-control').goalContractDigest(goal);
  demand(assignment && assignment.contract_sha256 === contract, 'current managed assignment contract required');
  const expiry = Date.parse(assignment.lease_expires_at);
  demand(expiry > Date.now(), 'acceptance assignment expired');
  const artifacts = node.result.evidence.map(ref => ({ kind: ref.kind,
    path: path.resolve(worker.repo, ref.path), sha256: ref.sha256 }));
  const integrationEvidence = artifacts.map(ref => ({ kind: ref.kind, ref: ref.path }));
  const payload = { version: 1, verdict: 'accepted', goal_id: goal.goal_id, contract_sha256: contract,
    assignment_id: assignment.assignment_id, assignment_sha256: hash(assignment),
    integrator: plan.parent, worker_id: workerId, worker_agent: worker.agent, critic: plan.critic,
    revision: plan.revision, environment: plan.environment, runtime_id: config.runtime_id, ...native,
    execution_state: path.resolve(stateFile), execution_sha256: store.sha256File(stateFile),
    join_sha256: state.join_sha256, result_sha256: hash(node.result),
    artifacts, evidence_sha256: evidenceDigest(integrationEvidence), usage: node.result.usage,
    accepted_at: new Date().toISOString(), expires_at: new Date(expiry).toISOString() };
  const privateKey = fs.readFileSync(pinned(config.private_key));
  demand(crypto.createPublicKey(privateKey).export({ format: 'pem', type: 'spki' })
    === crypto.createPublicKey(fs.readFileSync(pinned(config.public_key))).export({ format: 'pem', type: 'spki' }),
  'acceptance signing key does not match trusted parent key');
  const receipt = { payload, signature: crypto.sign(null, Buffer.from(store.canonicalJson(payload)), privateKey).toString('base64') };
  const rel = path.relative(plan.repo, path.resolve(receiptFile)).split(path.sep).join('/');
  coordination.execute('check-write', { cwd: plan.repo, sessionId: plan.session, paths: [rel] });
  // Write and re-read before the caller acknowledges delivery. A conflicting
  // receipt cannot overwrite a prior acceptance under the same filename.
  store.withFileLock(receiptFile + '.lock', () => {
    if (fs.existsSync(receiptFile)) {
      const old = readJson(receiptFile);
      // accepted_at is not a new attempt identity; return the original receipt.
      const comparable = item => Object.fromEntries(Object.entries(item).filter(([key]) => key !== 'accepted_at'));
      demand(hash(comparable(old.payload)) === hash(comparable(payload)), 'conflicting acceptance replay');
      verifyReceipt(old, config, { goal, assignment, integrator: plan.parent,
        evidence: integrationEvidence, usage: node.result.usage });
      return;
    }
    store.atomicWrite(receiptFile, JSON.stringify(receipt, null, 2) + '\n');
  });
  return verifyIntegrationAcceptance(receiptFile, { goal, assignment, integrator: plan.parent,
    evidence: integrationEvidence, usage: node.result.usage }, config);
}
function verifyReceipt(receipt, config, expected) {
  const p = receipt?.payload;
  demand(p?.version === 1 && p.verdict === 'accepted' && typeof receipt.signature === 'string', 'invalid acceptance receipt');
  demand(crypto.verify(null, Buffer.from(store.canonicalJson(p)), fs.readFileSync(pinned(config.public_key)),
    Buffer.from(receipt.signature, 'base64')), 'parent acceptance signature invalid');
  const contract = require('./goal-control').goalContractDigest(expected.goal);
  demand(p.goal_id === expected.goal.goal_id && p.contract_sha256 === contract
    && p.assignment_id === expected.assignment.assignment_id && p.assignment_sha256 === hash(expected.assignment),
  'stale goal/assignment acceptance');
  demand(p.integrator === expected.integrator && p.integrator !== expected.assignment.owner_agent
    && p.worker_agent === expected.assignment.owner_agent && p.critic !== p.worker_agent
    && p.parent_orca_session_id === config.parent_orca_session_id && p.run_id === config.run_id,
  'acceptance parent/worker identity mismatch');
  const binding = config.bindings?.find(item => item.worker_id === p.worker_id);
  demand(binding && p.dispatch_id === binding.dispatch_id && p.task_id === binding.task_id
    && p.process_incarnation === binding.process_incarnation && p.host_id === binding.host_id,
  'acceptance native attempt binding changed');
  // An acceptance issued within the lease remains durable after that lease;
  // creating a new integration later is independently refused by its timestamp.
  const acceptedAt = Date.parse(p.accepted_at), expiresAt = Date.parse(p.expires_at);
  demand(Number.isFinite(acceptedAt) && Number.isFinite(expiresAt) && acceptedAt <= Date.now()
    && acceptedAt >= Date.parse(expected.assignment.issued_at) && acceptedAt < expiresAt
    && expiresAt === Date.parse(expected.assignment.lease_expires_at), 'acceptance expired or time invalid');
  demand(p.evidence_sha256 === evidenceDigest(expected.evidence) && hash(p.usage) === hash(expected.usage),
    'acceptance evidence/usage mismatch');
  demand(Array.isArray(p.artifacts) && p.artifacts.length > 0, 'accepted artifacts missing');
  for (const artifact of p.artifacts) pinned(artifact);
  demand(store.sha256File(p.execution_state) === p.execution_sha256, 'accepted execution state changed');
  return receipt;
}
function verifyIntegrationAcceptance(receiptPath, expected, config = loadTrust()) {
  demand(path.isAbsolute(receiptPath) && !fs.lstatSync(receiptPath).isSymbolicLink(), 'absolute nonlinked acceptance receipt required');
  return verifyReceipt(readJson(receiptPath), config, expected);
}
module.exports = { createClient, evidenceDigest, hash, issueAcceptance, loadTrust, observeDispatch, pinned,
  verifyIntegrationAcceptance, verifyReceipt };
