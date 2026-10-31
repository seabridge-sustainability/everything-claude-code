'use strict';

// Runtime-neutral cooperative controller. No model calls, shell executor,
// authorization issuer, sandbox or memory implementation lives in this module.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const os = require('node:os');
const Ajv = require('ajv');
const { canonicalJson, sha256Buffer, sha256File, captureRepositoryState } = require('./goal-store');
const { writeFileAtomic } = require('./atomic-write');
const coordination = require('./session-coordination');
const goals = require('./goal-control');
const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '../../schemas/coding-execution.schema.json'), 'utf8'));
const validators = new Map();
function assert(kind, value) {
  if (!validators.has(kind)) validators.set(kind, new Ajv({ allErrors: true, strict: false }).compile({ ...schema, $ref: `#/$defs/${kind}` }));
  const validate = validators.get(kind);
  if (!validate(value)) throw new Error(`${kind}: ${JSON.stringify(validate.errors)}`);
}
const digest = value => sha256Buffer(canonicalJson(value));
function demand(test, message) { if (!test) throw new Error(message); }
function inside(root, file) {
  const relative = path.relative(fs.realpathSync(root), path.resolve(root, file)).split(path.sep).join('/');
  coordination.scope(relative);
  let current = fs.realpathSync(root);
  for (const part of relative.split('/')) {
    current = path.join(current, part);
    try { demand(!fs.lstatSync(current).isSymbolicLink(), 'linked execution path'); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  return coordination.scope(relative);
}
function owner(plan, now) {
  return coordination.checkSession({ cwd: plan.repo, sessionId: plan.session, now });
}
function workerAuthority(worker, now) {
  const active = coordination.checkSession({ cwd: worker.repo, sessionId: worker.session, now });
  for (const value of worker.scopes) {
    const clean = inside(worker.repo, value);
    demand(active.scopes.some(owned => clean === owned || clean.startsWith(`${owned}/`)), 'worker scope not owned');
  }
}
// Opt-in evidence contract, not a native read sandbox. The immutable plan pins
// this policy. Reviewed fixture pins cannot prove a hostile adapter read nothing
// else; native transcript/input containment remains a separately verified layer.
function verifySyntheticReceipt(policy, output, text) {
  try {
    demand(typeof text==='string' && Buffer.byteLength(text)<=16384,'bounded canonical receipt required');
    const body=text.endsWith('\n')?text.slice(0,-1):text;
    const receipt=JSON.parse(body);
    demand(body===canonicalJson(receipt),'canonical receipt required');
    assert('synthetic_verification',receipt);
    demand(receipt.fixture_sha256===policy.fixture.sha256 && receipt.checks.length===output.checks.length
      && new Set(receipt.checks.map(check=>check.id)).size===receipt.checks.length
      && receipt.checks.every(check=>output.checks.includes(check.id)),'exact reviewed checks required');
  } catch { throw Error('synthetic output policy rejected artifact'); }
}
function verifySyntheticArtifacts(worker, references = null) {
  if (worker.data_policy === undefined) return;
  try {
    const policy = worker.data_policy;
    assert('synthetic_output_policy', policy);
    const fixture = inside(worker.repo, policy.fixture.path);
    demand(fixture.startsWith('tests/fixtures/'), 'reviewed fixture required');
    demand(!worker.scopes.some(scope => coordination.overlaps(fixture, coordination.scope(scope))), 'fixture cannot be worker-owned');
    const read = (relative, maximum) => {
      const file = path.join(worker.repo, relative), before = fs.lstatSync(file);
      demand(before.isFile() && before.nlink === 1 && before.size <= maximum, 'bounded regular artifact required');
      const fd = fs.openSync(file, 'r');
      try {
        const opened = fs.fstatSync(fd);
        demand(opened.ino === before.ino && opened.dev === before.dev && opened.nlink === 1, 'artifact identity changed');
        const bytes = Buffer.alloc(maximum + 1), size = fs.readSync(fd, bytes, 0, bytes.length, 0);
        const after = fs.fstatSync(fd), current = fs.lstatSync(file);
        demand(size <= maximum && after.size === size && current.ino === opened.ino
          && current.dev === opened.dev && current.nlink === 1 && !current.isSymbolicLink()
          && after.mtimeMs === before.mtimeMs && after.size === before.size, 'artifact changed during read');
        return bytes.subarray(0, size);
      } finally { fs.closeSync(fd); }
    };
    demand(sha256Buffer(read(fixture, 65536)) === policy.fixture.sha256, 'fixture changed');
    const outputs = new Map();
    for (const output of policy.outputs) {
      const relative = inside(worker.repo, output.path);
      demand(relative.startsWith('artifacts/agent-runs/') && !/(^|\/)(?:tmp|temp|scratchpads?|logs?|transcripts?)(\/|\.|$)/i.test(relative), 'exact private-free proof destination required');
      demand(!outputs.has(relative) && worker.scopes.some(scope => coordination.overlaps(relative, coordination.scope(scope))), 'unique owned proof destination required');
      outputs.set(relative, output);
    }
    if (references === null) return;
    demand(Array.isArray(references) && references.length > 0, 'proof references required');
    const seen = new Set();
    for (const ref of references) {
      const relative = inside(worker.repo, ref.path), output = outputs.get(relative);
      demand(output && ref.kind === 'local-check', 'undeclared proof reference');
      const bytes = read(relative, 16384), text = bytes.toString('utf8');
      demand(sha256Buffer(bytes) === ref.sha256, 'pinned proof required');
      verifySyntheticReceipt(policy,output,text);
      seen.add(relative);
    }
    demand(seen.size === outputs.size, 'all declared proof outputs required');
  } catch {
    // Never echo rejected JSON, record values or parser diagnostics into logs.
    throw Error('synthetic output policy rejected artifact');
  }
}
function checkPlan(plan, now) {
  assert('plan', plan); owner(plan, now);
  demand(path.isAbsolute(plan.repo) && path.isAbsolute(plan.goal_file), 'absolute repository and goal paths required');
  inside(plan.repo, plan.goal_file);
  demand(sha256File(plan.goal_file) === plan.goal_sha256, 'owner goal changed; replan and reissue assignments');
  demand(path.isAbsolute(plan.assignments_file), 'absolute goal assignment path required');
  inside(plan.repo, plan.assignments_file);
  const goal = goals.readStructuredFile(plan.goal_file);
  const assignments = goals.readJsonLines(plan.assignments_file);
  goals.validateBundle({ goal, assignments });
  demand(['active', 'off_track'].includes(goal.status), 'goal is not executable');
  const correction = goals.latestExecutableCorrection(goal);
  const ids = new Set(), agents = new Set([plan.parent, plan.critic]);
  const repositories = new Map(plan.workers.map(worker => [worker.id, coordination.repository(worker.repo).common]));
  demand(plan.parent !== plan.critic, 'critic must be independent of planner');
  for (const worker of plan.workers) {
    verifySyntheticArtifacts(worker);
    const assignment = assignments.find(item => item.assignment_id === worker.assignment_id);
    demand(assignment && digest(assignment) === worker.assignment_sha256, 'missing or changed goal assignment');
    demand(assignment.owner_agent === worker.agent && assignment.owner_runtime === worker.runtime, 'assignment owner/runtime mismatch');
    demand(assignment.scope_paths.map(coordination.scope).sort().join() === worker.scopes.map(coordination.scope).sort().join(), 'assignment scope mismatch');
    demand(assignment.description === worker.requirement, 'task differs from approved goal assignment');
    demand(assignment.change_contract, 'missing requested-change/preservation contract; reissue assignment for v3');
    demand(assignment.change_contract.requested_delta === assignment.description, 'requested delta differs from goal assignment');
    const invariantIds = new Set();
    for (const invariant of assignment.change_contract.preserved_invariants) {
      demand(!invariantIds.has(invariant.id), 'duplicate preserved invariant'); invariantIds.add(invariant.id);
      const relative = inside(worker.repo, invariant.baseline.path);
      demand(!worker.scopes.some(value => coordination.overlaps(coordination.scope(value), relative)), 'preservation baseline must be outside worker write scope');
      demand(sha256File(path.join(worker.repo, relative)) === invariant.baseline.sha256, 'preservation baseline changed');
      demand(invariant.category !== 'design' || invariant.baseline.kind === 'browser', 'design preservation needs browser baseline, not private tests');
    }
    demand(assignment.execution_state !== 'queued', 'queued metadata is not execution admission');
    const proofs = assignment.acceptance_ids.map(id => goal.user_visible_proofs.find(proof => proof.id === id));
    demand(proofs.every(Boolean), 'assignment references missing proofs');
    demand(proofs.every(proof => {
      const lane=goal.lanes.find(item=>item.id===proof.lane_id);
      return proof.required && (lane?.status==='active' || (lane?.status==='blocked' && lane.blocker && lane.next_action));
    }), 'worker must advance an active required outcome or its recorded blocker, not optional or deferred work');
    demand(worker.acceptance === proofs.map(proof => proof.acceptance_predicate).join('\n'), 'acceptance differs from required goal output');
    demand(Date.parse(assignment.issued_at) <= now && Date.parse(assignment.lease_expires_at) === Date.parse(worker.expires_at), 'assignment lease mismatch or not yet issued');
    demand(!correction || Date.parse(assignment.issued_at) >= Date.parse(correction.recorded_at), 'assignment predates current owner correction; reissue it');
    demand(worker.max_attempts <= assignment.budget.max_retries + 1, 'worker retries exceed goal assignment budget');
    demand(!ids.has(worker.id) && !agents.has(worker.agent), 'duplicate worker or non-independent critic/worker');
    ids.add(worker.id); agents.add(worker.agent);
    demand(path.isAbsolute(worker.repo), 'worker repository must be absolute');
    demand(Number.isFinite(Date.parse(worker.expires_at)), 'invalid worker expiry');
    worker.scopes.forEach(value => inside(worker.repo, value));
    for (const other of plan.workers) {
      if (other.id === worker.id) continue;
      // Registry reservations are repository-wide even in separate worktrees.
      const sameRepo = repositories.get(other.id) === repositories.get(worker.id);
      demand(!sameRepo || !worker.scopes.some(a => other.scopes.some(b => coordination.overlaps(coordination.scope(a), coordination.scope(b)))), 'overlapping worker scopes');
    }
  }
}
function initialize(plan, now = Date.now()) {
  checkPlan(plan, now);
  return { version: 3, plan, plan_sha256: digest(plan), sequence: 0, phase: 'planned',
    dispatches: 0, repairs: 0, spent_usd: 0, history: [], nodes: Object.fromEntries(plan.workers.map(worker => [worker.id,
      { status: 'pending', attempts: 0, token: null, lease_until: null, result: null, usage: {tool_calls:0,retries:0,ci_runs:0,cost_usd:0} }])),
    join_sha256: null, critique: null, synthesis: null, effects: {}, audit: [] };
}
function validateState(state) {
  assert('state', state);
  demand(state?.version === 3 && digest(state.plan) === state.plan_sha256, 'invalid execution state/plan fingerprint');
  assert('plan', state.plan);
  demand(Object.keys(state.nodes).sort().join() === state.plan.workers.map(w => w.id).sort().join(), 'invalid execution node set');
  demand(['planned','workers','critic','repair','synthesis','approval','effect','completed','reconciliation','budget-exhausted'].includes(state.phase), 'invalid execution phase');
  demand(Number.isInteger(state.sequence) && state.sequence >= 0 && Array.isArray(state.audit), 'invalid execution sequence');
  demand(['dispatches','repairs'].every(key => Number.isInteger(state[key]) && state[key] >= 0), 'invalid execution counters');
  demand(Number.isFinite(state.spent_usd) && state.spent_usd >= 0 && Array.isArray(state.history), 'invalid execution budget/history');
  demand(state.effects && typeof state.effects === 'object' && !Array.isArray(state.effects), 'invalid execution effects');
  for (const [id, effect] of Object.entries(state.effects)) {
    assert('effect', effect.proposal);
    demand(effect.proposal.id === id && ['pending','approved','running','completed'].includes(effect.status), 'invalid effect state');
    demand(effect.binding === digest({ effect: effect.proposal, synthesis: state.synthesis, revision: state.plan.revision }), 'stale effect binding');
    if (effect.status !== 'pending') demand(effect.approval?.binding === effect.binding && typeof effect.approval.receipt === 'string' && effect.approval.receipt.length > 0, 'missing effect approval');
    if (effect.status === 'completed') demand(effect.receipt !== null && effect.receipt !== undefined, 'missing completed effect receipt');
  }
  if (state.phase === 'completed') demand(Object.keys(state.effects).length > 0 && Object.values(state.effects).every(e => e.status === 'completed'), 'incomplete effect barrier');
  for (const node of Object.values(state.nodes)) {
    demand(['pending','running','done'].includes(node.status) && Number.isInteger(node.attempts) && node.attempts >= 0, 'invalid execution node');
    if (node.result) assert('result', node.result);
    if (node.status === 'running') demand(node.token !== null && Number.isInteger(node.lease_until), 'running node lacks lease/token');
    if (node.status === 'done') demand(node.result !== null, 'done node lacks result');
  }
  if (['critic','synthesis','approval','effect','completed','reconciliation'].includes(state.phase)) {
    demand(Object.values(state.nodes).every(node => node.status === 'done'), 'join barrier state mismatch');
    demand(state.join_sha256 === digest({ revision: state.plan.revision, results: Object.values(state.nodes).map(node => node.result) }), 'join fingerprint mismatch');
  }
  if (['synthesis','approval','effect','completed','reconciliation'].includes(state.phase)) demand(state.critique?.accepted === true && state.critique.join_sha256 === state.join_sha256, 'accepted critic state required');
  if (['approval','effect','completed','reconciliation'].includes(state.phase)) demand(state.synthesis?.join_sha256 === state.join_sha256, 'typed synthesis state required');
}
function currentEvidence(state, authorizeCitation, verifyPreservation, requireReview = false) {
  for (const worker of state.plan.workers) {
    const result = state.nodes[worker.id].result;
    if (!result) continue;
    verifySyntheticArtifacts(worker, [...result.evidence, ...(result.preservation?.checks || []).map(check => check.evidence)]);
    const captured = captureRepositoryState(worker.repo, { excludePaths: [path.join(worker.repo, '.ecc/goal')] });
    demand(captured.head === result.head && captured.tree_fingerprint === result.tree_fingerprint, 'stale worker repository evidence');
    const contract = assignmentFor(state.plan, worker).change_contract;
    if (result.status === 'pass') {
      demand(result.preservation?.contract_sha256 === digest(contract), 'missing or stale preservation receipt');
      const checks = result.preservation.checks;
      demand(checks.length === contract.preserved_invariants.length && new Set(checks.map(check => check.id)).size === checks.length, 'preservation checks must cover each invariant exactly once');
      for (const invariant of contract.preserved_invariants) {
        const check = checks.find(item => item.id === invariant.id);
        demand(check && check.evidence.kind === invariant.baseline.kind, 'missing invariant or wrong preservation evidence kind');
        demand(inside(worker.repo, check.evidence.path) !== inside(worker.repo, invariant.baseline.path), 'baseline is not post-change preservation evidence');
      }
      if (requireReview) {
        // Hashes establish identity/freshness, not semantic equality. The caller
        // must supply a trusted, independent comparison of outcome + invariants.
        demand(typeof verifyPreservation === 'function' && verifyPreservation({
          worker, assignment: assignmentFor(state.plan, worker), contract, result,
          revision: state.plan.revision, environment: state.plan.environment,
          join_sha256: state.join_sha256,
        }) === true, 'requested outcome and semantic preservation not independently verified');
      }
    }
    for (const ref of [...result.evidence, ...(result.preservation?.checks || []).map(check => check.evidence)]) {
      const relative = inside(worker.repo, ref.path);
      demand(sha256File(path.join(worker.repo, relative)) === ref.sha256, 'stale evidence artifact');
    }
    for (const ref of result.citations) {
      demand(ref.line_end >= ref.line_start, 'invalid citation line range');
      demand(typeof authorizeCitation === 'function' && authorizeCitation(ref) === true, 'current scoped memory authorizer required');
    }
  }
}
function maybeJoin(state) {
  if (!Object.values(state.nodes).every(node => node.status === 'done')) return;
  state.join_sha256 = digest({ revision: state.plan.revision, results: Object.values(state.nodes).map(node => node.result) });
  state.phase = 'critic';
}
function assignmentFor(plan, worker) {
  return goals.readJsonLines(plan.assignments_file).find(item => item.assignment_id === worker.assignment_id);
}
function accountUsage(state, node, worker, usage) {
  assert('usage', usage);
  for (const key of Object.keys(node.usage)) node.usage[key] += usage[key];
  state.spent_usd += usage.cost_usd;
  const budget = assignmentFor(state.plan, worker).budget;
  if (state.spent_usd > state.plan.limits.usd || Object.entries(node.usage).some(([key,value]) => value > budget[`max_${key}`])) state.phase = 'budget-exhausted';
}
// Reconciliation usage is cumulative for the original token, not another bill.
function accountAttemptUsage(state, node, worker, usage) {
  assert('usage', usage);
  const previous = node.reconciliation?.usage;
  const delta = Object.fromEntries(Object.entries(usage).map(([key,value]) => {
    demand(!previous || value >= previous[key], 'attempt usage regressed during reconciliation');
    return [key,value-(previous?.[key] ?? 0)];
  }));
  accountUsage(state,node,worker,delta);
}
function apply(state, event, options = {}) {
  validateState(state);
  const now = options.now ?? Date.now();
  checkPlan(state.plan, now);
  demand(event && typeof event.type === 'string', 'typed execution event required');
  const next = structuredClone(state), plan = next.plan;
  const parent = () => demand(event.actor === plan.parent, 'parent/root actor required');
  const live = worker => { workerAuthority(worker, now); demand(Date.parse(worker.expires_at) > now, 'expired assignment'); };
  const evidence = (requireReview = next.critique?.accepted === true) => currentEvidence(next, options.authorizeCitation, options.verifyPreservation, requireReview);
  switch (event.type) {
    case 'dispatch': {
      parent(); demand(['planned','repair','workers'].includes(next.phase), 'dispatch requires planned/repair/workers phase');
      const unresolved = plan.workers.filter(worker => next.nodes[worker.id].status === 'running');
      let pending = plan.workers.filter(worker => next.nodes[worker.id].status === 'pending');
      demand(pending.length > 0, 'no pending nodes');
      if (event.capacity !== undefined) assert('capacity',event.capacity);
      // No unknown shared spend may buy another launch. Only a trusted parent
      // can establish a separate reservation and authority for this worker.
      if (unresolved.length) pending = pending.filter(worker => typeof options.verifyWorkerAdmission === 'function'
        && options.verifyWorkerAdmission({worker:structuredClone(worker),state:structuredClone(next),
          unresolved:structuredClone(unresolved)},structuredClone(plan)) === true);
      if (event.capacity !== undefined) pending = pending.slice(0,event.capacity.available_child_slots);
      if (!pending.length) break;
      pending.forEach(live);
      if (next.spent_usd > plan.limits.usd || next.dispatches + pending.length > plan.limits.dispatches || pending.some(w => {
        const node=next.nodes[w.id],budget=assignmentFor(plan,w).budget;
        return node.attempts >= w.max_attempts || node.usage.tool_calls >= budget.max_tool_calls
          || node.usage.retries > budget.max_retries || node.usage.ci_runs > budget.max_ci_runs
          || (budget.max_cost_usd > 0 && node.usage.cost_usd >= budget.max_cost_usd);
      })) {
        next.phase = 'budget-exhausted'; break;
      }
      for (const worker of pending) {
        const node = next.nodes[worker.id]; node.status = 'running'; node.attempts++;
        node.token = crypto.randomBytes(32).toString('hex');
        node.lease_until = Math.min(now + plan.limits.lease_ms, Date.parse(worker.expires_at));
      }
      next.dispatches += pending.length; next.phase = 'workers'; break;
    }
    case 'recover-result':
    case 'result': {
      const recovering=event.type==='recover-result';
      if(recovering){
        parent();
        demand(['workers','repair','budget-exhausted'].includes(next.phase),'result recovery requires active worker reconciliation');
      }
      assert('result', event.result);
      const result = event.result, worker = plan.workers.find(w => w.id === result.worker);
      demand(worker, 'unknown worker'); live(worker);
      const node = next.nodes[worker.id];
      demand((recovering||event.actor===worker.agent)&&result.agent===worker.agent&&result.runtime===worker.runtime,'worker identity/runtime mismatch');
      demand(node.status==='running'&&node.token===result.token,'stale or duplicate worker result');
      if(recovering){
        demand(Number.isSafeInteger(node.lease_until)&&now>=node.lease_until,'worker lease has not expired for recovery');
        demand(Number.isSafeInteger(event.receipt?.closed_at)&&event.receipt.closed_at<=node.lease_until,
          'worker completion was not within its original lease');
        demand(Number.isSafeInteger(event.receipt.snapshot_at)&&event.receipt.snapshot_at>=event.receipt.closed_at
          &&event.receipt.snapshot_at<=node.lease_until,'worker snapshot was not within its original lease');
        demand(typeof options.verifyRecoveredResult==='function'&&options.verifyRecoveredResult({
          worker:structuredClone(worker),node:structuredClone(node),result:structuredClone(result),
          receipt:structuredClone(event.receipt),revision:plan.revision,environment:plan.environment,
        },structuredClone(plan))===true,'trusted stopped-worker result verifier required');
      }else demand(now<node.lease_until,'stale or duplicate worker result');
      demand(result.revision === plan.revision && result.environment === plan.environment, 'stale goal revision or environment');
      demand(result.changed_paths.every(file => worker.scopes.some(scope => {
        const clean = inside(worker.repo, file), normalized = coordination.scope(scope); return clean === normalized || clean.startsWith(`${normalized}/`);
      })), 'unauthorized mutation reported');
      const checked = coordination.execute('check-changes', { cwd: worker.repo, sessionId: worker.session, now });
      demand(checked.allowed === true && checked.session === worker.session, 'verified worker change check required');
      const mutations = checked.paths;
      demand(mutations.every(file => result.changed_paths.map(p => inside(worker.repo, p)).includes(coordination.scope(file))), 'unreported worker mutations');
      // Canonical check-changes covers committed/staged/unstaged/untracked paths
      // and validates unchanged foreign baselines. Whole-tree dirty_paths also
      // includes those preserved drafts (and collapsed untracked directories),
      // which are not worker mutations. Whole-tree evidence freshness remains
      // mandatory in currentEvidence; no foreign edit is omitted from its hash.
      demand(result.usage.cost_usd === result.usd, 'inconsistent reported worker cost');
      if(recovering){
        // Validate the reconstructed result against CURRENT source, citations,
        // ownership and independent semantic preservation before charging it.
        // Mark this token consumed even if its usage exhausts the budget.
        node.result=result;node.status='done';evidence(true);
      } else {
        // A peer's budget/cessation stop must not discard an already-returned
        // healthy result. Retaining verified output grants no new dispatch.
        node.result=result;node.status='done';evidence();
      }
      accountAttemptUsage(next,node,worker,result.usage);
      delete node.reconciliation;
      if (next.phase === 'budget-exhausted') break;
      maybeJoin(next);break;
    }
    case 'worker-error': {
      const worker = plan.workers.find(w => w.id === event.worker); demand(worker, 'unknown worker');
      demand(event.actor === worker.agent, 'worker identity mismatch');
      const node = next.nodes[worker.id]; demand(node.status === 'running' && node.token === event.token, 'stale worker error');
      next.history.push({ error: 'worker-launch-or-execution-failed', worker: worker.id, attempt: node.attempts });
      // A reported failure is not proof this exact attempt stopped.
      if (!event.cessation) {
        if (event.usage) accountAttemptUsage(next,node,worker,event.usage);
        node.reconciliation = { reason:'cessation-unverified', usage:event.usage ?? node.reconciliation?.usage ?? null };
        // The original token remains live. Uncertainty is not measured global
        // exhaustion; dispatch separately enforces independent admission.
        break;
      }
      const cessation = event.cessation;
      demand(cessation.worker === worker.id && cessation.token === node.token
        && cessation.status === 'failed' && Number.isSafeInteger(cessation.confirmed_at)
        && cessation.confirmed_at <= now
        && typeof options.verifyStoppedAttempt === 'function'
        && options.verifyStoppedAttempt({ worker: structuredClone(worker), node: structuredClone(node),
          cessation: structuredClone(cessation), revision: plan.revision, environment: plan.environment }, structuredClone(plan)) === true,
      'trusted exact-attempt cessation evidence required');
      // Unknown failed-attempt spending must not buy another attempt.
      if (!event.usage) {
        node.reconciliation = {reason:'spend-unverified',usage:node.reconciliation?.usage ?? null};
        break;
      }
      accountAttemptUsage(next,node,worker,event.usage);
      delete node.reconciliation;
      node.status = 'pending'; node.token = null;
      if (next.phase !== 'budget-exhausted') next.phase = 'repair'; break;
    }
    case 'critic-usage': {
      parent();demand(next.phase==='critic','critic usage requires current join');assert('usage',event.usage);
      const key=digest({plan_sha256:digest(plan),critic:plan.critic,join_sha256:next.join_sha256});
      demand(event.receipt?.attempt_sha256===key&&event.receipt.join_sha256===next.join_sha256,'critic usage binding mismatch');
      assert('usage',event.receipt.budget);
      demand(typeof options.verifyCriticUsage==='function'&&options.verifyCriticUsage(event,plan)===true,'trusted critic usage verifier required');
      const record={usage:structuredClone(event.usage),receipt_sha256:digest(event.receipt)};
      next.critic_usage??={};
      if(Object.hasOwn(next.critic_usage,key)){
        demand(digest(next.critic_usage[key])===digest(record),'critic usage receipt changed');break;
      }
      next.critic_usage[key]=record;next.spent_usd+=event.usage.cost_usd;
      const used={tool_calls:0,retries:0,ci_runs:0,cost_usd:0};
      for(const entry of Object.values(next.critic_usage))for(const counter of Object.keys(used))used[counter]+=entry.usage[counter];
      if(next.spent_usd>plan.limits.usd||Object.keys(used).some(counter=>used[counter]>event.receipt.budget[counter]))next.phase='budget-exhausted';
      break;
    }
    case 'critic': {
      demand(next.phase === 'critic', 'join barrier not satisfied'); assert('critique', event.report); evidence();
      demand(event.actor === plan.critic && event.report.agent === plan.critic, 'independent critic required');
      demand(event.report.join_sha256 === next.join_sha256, 'stale critic result');
      const failures = Object.values(next.nodes).filter(n => n.result.status !== 'pass').map(n => n.result.worker);
      demand(event.report.rejections.every(r => Object.hasOwn(next.nodes, r.worker)), 'unknown rejected worker');
      demand(event.report.accepted ? !event.report.rejections.length && !failures.length : event.report.rejections.length > 0, 'critic decision contradicts outputs');
      demand(failures.every(id => event.report.rejections.some(r => r.worker === id)), 'critic omitted failed output');
      demand(typeof options.verifyCritic === 'function' && options.verifyCritic(event, plan) === true, 'trusted independent critic identity verifier required');
      if(event.receipt!==undefined){
        const key=digest({plan_sha256:digest(plan),critic:plan.critic,join_sha256:next.join_sha256});
        demand(next.critic_usage?.[key]?.receipt_sha256===digest(event.receipt),'critic usage must be consumed before decision');
      }
      if (event.report.accepted) evidence(true);
      next.critique = event.report;
      next.history.push({ join_sha256: next.join_sha256, critique: event.report, results: Object.values(next.nodes).map(n => n.result) });
      if (event.report.accepted) next.phase = 'synthesis';
      else if (next.repairs >= plan.limits.repairs) next.phase = 'budget-exhausted';
      else {
        next.repairs++;
        for (const rejection of event.report.rejections) {
          const node = next.nodes[rejection.worker]; node.status = 'pending'; node.result = null; node.token = null;
        }
        next.join_sha256 = null; next.phase = 'repair';
      }
      break;
    }
    case 'synthesis': {
      parent(); demand(next.phase === 'synthesis', 'accepted critic required'); assert('synthesis', event.output); evidence();
      demand(event.output.join_sha256 === next.join_sha256, 'stale synthesis');
      demand(event.output.outputs.slice().sort().join() === plan.workers.map(w => w.id).sort().join(), 'synthesis must cover every required output');
      next.synthesis = event.output; next.phase = 'approval'; break;
    }
    case 'propose-effect': {
      parent(); demand(next.phase === 'approval', 'typed synthesis required'); assert('effect', event.effect); evidence();
      demand(!Object.hasOwn(next.effects, event.effect.id), 'effect ID is immutable; completed effects cannot replay');
      const operationKey = proposal => digest(Object.fromEntries(Object.entries(proposal).filter(([key]) => !['id','expected_usd'].includes(key))));
      demand(!Object.values(next.effects).some(item => operationKey(item.proposal) === operationKey(event.effect)), 'duplicate exact side effect');
      demand(event.effect.environment === plan.environment, 'effect environment mismatch');
      demand(next.spent_usd + event.effect.expected_usd <= plan.limits.usd, 'effect budget exhausted');
      next.effects[event.effect.id] = { proposal: event.effect, binding: digest({ effect: event.effect, synthesis: next.synthesis, revision: plan.revision }), status: 'pending', approval: null, receipt: null }; break;
    }
    case 'approve-effect': {
      parent(); demand(next.phase === 'approval', 'not at approval pause'); evidence();
      const effect = next.effects[event.id]; demand(effect?.status === 'pending', 'effect not pending');
      demand(event.binding === effect.binding, 'approval does not bind exact side effect');
      demand(typeof options.authorizeApproval === 'function' && options.authorizeApproval({ ...event, proposal: effect.proposal }) === true, 'external owner approval verifier required');
      demand(typeof event.receipt === 'string' && event.receipt.trim().length > 0, 'owner approval receipt required');
      demand(Number.isFinite(Date.parse(event.expires_at)) && Date.parse(event.expires_at) > now, 'approval expired');
      effect.approval = { receipt: event.receipt, expires_at: event.expires_at, binding: event.binding }; effect.status = 'approved'; break;
    }
    case 'begin-effect': {
      parent(); evidence(); const effect = next.effects[event.id];
      demand(next.phase === 'approval' && effect?.status === 'approved', 'effect not approved or already started');
      demand(Date.parse(effect.approval.expires_at) > now && event.binding === effect.binding, 'stale effect approval');
      demand(next.spent_usd + effect.proposal.expected_usd <= plan.limits.usd, 'effect budget exhausted');
      effect.status = 'running'; next.spent_usd += effect.proposal.expected_usd; next.phase = 'effect'; break;
    }
    case 'finish-effect': {
      parent(); const effect = next.effects[event.id];
      demand(next.phase === 'effect' && effect?.status === 'running', 'effect not running');
      demand(typeof options.verifyEffect === 'function' && options.verifyEffect(effect.proposal, event.receipt) === true, 'independent side-effect receipt verifier required');
      effect.status = 'completed'; effect.receipt = event.receipt;
      next.phase = Object.values(next.effects).every(item => item.status === 'completed') ? 'completed' : 'approval'; break;
    }
    case 'recover': {
      parent();
      if (['budget-exhausted','completed'].includes(next.phase)) break;
      if (Object.values(next.effects).some(effect => effect.status === 'running')) { next.phase = 'reconciliation'; break; }
      // Expiry is only a deadline; it cannot prove an attempt stopped.
      demand(!Object.values(next.nodes).some(node => node.status === 'running' && node.lease_until <= now),
        'expired worker token requires trusted exact-attempt recovery');
      break;
    }
    case 'reconcile-effect': {
      parent(); demand(next.phase === 'reconciliation', 'effect not ambiguous'); const effect = next.effects[event.id];
      demand(effect?.status === 'running', 'effect not ambiguous');
      // Completion is the only automated reconciliation. A negative/unknown
      // external result requires a new owner decision, never automatic replay.
      demand(typeof options.verifyEffect === 'function' && options.verifyEffect(effect.proposal, event.receipt) === true, 'verified completed side effect required; do not replay');
      effect.status = 'completed'; effect.receipt = event.receipt;
      next.phase = Object.values(next.effects).every(item => item.status === 'completed') ? 'completed' : 'approval'; break;
    }
    default: throw new Error('unknown execution transition');
  }
  next.sequence++; next.audit.push({ sequence: next.sequence, type: event.type, actor: event.actor, at: new Date(now).toISOString(), phase: next.phase });
  validateState(next); return next;
}
function authorizeStatePath(file, plan) {
  checkPlan(plan, Date.now());
  const relative = inside(plan.repo, file);
  demand(relative.startsWith('.ecc/'), 'execution state must be task-local .ecc data');
  coordination.execute('check-write', { cwd: plan.repo, sessionId: plan.session, paths: [relative, `${relative}.lock`] });
}
function save(file, state) {
  validateState(state); authorizeStatePath(file, state.plan);
  const relative = inside(state.plan.repo, file);
  demand(relative.startsWith('.ecc/'), 'execution state must be task-local .ecc data');
  coordination.execute('check-write', { cwd: state.plan.repo, sessionId: state.plan.session, paths: [relative] });
  writeFileAtomic(file, JSON.stringify({ state, sha256: digest(state) }, null, 2) + '\n');
}
function load(file) {
  const envelope = JSON.parse(fs.readFileSync(file, 'utf8'));
  demand(digest(envelope.state) === envelope.sha256, 'execution checkpoint integrity mismatch');
  validateState(envelope.state); return envelope.state;
}
function executionLock(file, plan, action) {
  const lock = `${file}.lock`;
  const descriptor = fs.openSync(lock, 'wx', 0o600);
  const marker = { pid: process.pid, host: os.hostname(), session: plan.session, plan_sha256: digest(plan), nonce: crypto.randomBytes(16).toString('hex') };
  try { fs.writeFileSync(descriptor, JSON.stringify(marker)); fs.fsyncSync(descriptor); return action(); }
  finally {
    fs.closeSync(descriptor);
    if (JSON.parse(fs.readFileSync(lock,'utf8')).nonce === marker.nonce) fs.unlinkSync(lock);
  }
}
function recoverLock(file, initialPlan = null) {
  const plan = fs.existsSync(file) ? load(file).plan : initialPlan;
  authorizeStatePath(file, plan);
  inside(plan.repo, `${file}.lock`);
  const lock = `${file}.lock`, raw = fs.readFileSync(lock,'utf8'), marker = JSON.parse(raw);
  demand(marker.host === os.hostname() && marker.session === plan.session && marker.plan_sha256 === digest(plan)
    && Number.isInteger(marker.pid) && marker.pid > 0, 'lock recovery requires exact own session/host/plan');
  let dead = false;
  try { process.kill(marker.pid, 0); } catch (error) { dead = error.code === 'ESRCH'; }
  demand(dead, 'lock owner still alive or inaccessible; never steal it');
  demand(fs.readFileSync(lock,'utf8') === raw, 'lock changed during recovery');
  fs.unlinkSync(lock);
  return { recovered: true, session: plan.session, dead_pid: marker.pid, limitation: 'same-user cooperative lock; no permission bypass' };
}
function transaction(file, action) {
  const plan = load(file).plan; authorizeStatePath(file, plan);
  return executionLock(file, plan, () => { const next = action(load(file)); save(file, next); return next; });
}
function create(file, plan) {
  authorizeStatePath(file, plan);
  demand(!fs.existsSync(file), 'execution checkpoint already exists');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  return executionLock(file, plan, () => { demand(!fs.existsSync(file), 'execution checkpoint already exists'); const state = initialize(plan); save(file, state); return state; });
}
async function dispatchParallel(file, launch, options = {}) {
  demand(typeof launch === 'function', 'explicit admitted worker launcher required');
  const before = load(file);
  const state = transaction(file, current => apply(current, { type: 'dispatch', actor: current.plan.parent, ...(options.capacity ? {capacity:options.capacity} : {}) }, options));
  if (state.phase === 'budget-exhausted') return state;
  const running = state.plan.workers.filter(w => state.nodes[w.id].status === 'running' && state.nodes[w.id].token !== before.nodes[w.id].token);
  // Launchers must provide their own native sandbox/tool restrictions. Persist
  // dispatch tokens BEFORE calling them. No shell or provider is inferred here.
  await Promise.all(running.map(async worker => {
    let result;
    try {
      const assignment = assignmentFor(state.plan,worker), usage=state.nodes[worker.id].usage;
      const remaining_budget=Object.fromEntries(Object.entries(usage).map(([key,value])=>[key,Math.max(0,assignment.budget[`max_${key}`]-value)]));
      result = await launch({ ...worker, assignment, remaining_budget, goal_sha256:state.plan.goal_sha256, token: state.nodes[worker.id].token, revision: state.plan.revision, environment: state.plan.environment });
    }
    catch (_error) {
      // Preserve the token until a later supervisor proves exact cessation.
      transaction(file, current => apply(current, { type: 'worker-error', actor: worker.agent, worker: worker.id, token: state.nodes[worker.id].token, usage:_error?.usage }, options)); return;
    }
    transaction(file, current => apply(current, { type: 'result', actor: worker.agent, result }, options));
  }));
  // Direct engine callers retain caller-managed capacity for compatibility.
  // Only the runner requires a trusted slot observation before dispatch.
  return load(file);
}
module.exports = { assert, digest, initialize, apply, create, load, transaction, dispatchParallel, currentEvidence, recoverLock, verifySyntheticArtifacts, verifySyntheticReceipt };
