'use strict';

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const yaml = require('js-yaml');

const SCHEMA_PATH = path.join(__dirname, '..', '..', 'schemas', 'goal-control.schema.json');
const PROFILE_PATH = path.join(__dirname, '..', '..', 'manifests', 'goal-proof-profiles.json');

const DEFINITIONS = {
  goal: 'activeGoal',
  outcome: 'outcomeReceipt',
  resume: 'resumeReceipt',
  assignment: 'assignment',
  integration: 'integrationReceipt',
  watchdog: 'watchdogPolicy',
  activity: 'activityEvent',
};

let schema;
let proofProfiles;
const validators = new Map();

function loadSchema() {
  if (!schema) schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
  return schema;
}

function loadProofProfiles() {
  if (!proofProfiles) {
    const manifest = JSON.parse(fs.readFileSync(PROFILE_PATH, 'utf8'));
    proofProfiles = new Map(manifest.profiles.map(profile => [profile.id, profile]));
  }
  return proofProfiles;
}

function validateProofProfile(goal, profiles = loadProofProfiles()) {
  const profile = profiles.get(goal.proof_profile);
  if (!profile) throw new Error(`unknown proof profile: ${goal.proof_profile}`);
  const requiredProofs = goal.user_visible_proofs.filter(proof => proof.required);
  const required = requiredProofs.length ? requiredProofs : goal.user_visible_proofs;
  const evidenceKinds = new Set(required.flatMap(proof => proof.required_evidence_kinds));
  const repositories = new Set(required.flatMap(proof => proof.required_repositories));
  const resultClasses = new Set(required.flatMap(proof => proof.allowed_result_classes));
  const missingKinds = profile.required_evidence_kinds.filter(kind => !evidenceKinds.has(kind));
  if (missingKinds.length) {
    throw new Error(`proof profile ${profile.id} requires evidence kinds: ${missingKinds.join(', ')}`);
  }
  if (repositories.size < profile.minimum_repositories) {
    throw new Error(`proof profile ${profile.id} requires at least ${profile.minimum_repositories} repositories`);
  }
  if (profile.requires_authentic && !required.some(proof => proof.requires_authentic)) {
    throw new Error(`proof profile ${profile.id} requires authentic evidence`);
  }
  if (profile.requires_user_visible && !required.some(proof => proof.requires_user_visible)) {
    throw new Error(`proof profile ${profile.id} requires a user-visible proof`);
  }
  if (profile.requires_subject_scope && required.some(proof => !proof.subject_scope)) {
    throw new Error(`proof profile ${profile.id} requires subject scope on every required proof`);
  }
  const forbidden = profile.forbidden_result_classes.filter(item => resultClasses.has(item));
  if (forbidden.length) {
    throw new Error(`proof profile ${profile.id} forbids result classes: ${forbidden.join(', ')}`);
  }
  return profile;
}

function validatorFor(kind) {
  if (validators.has(kind)) return validators.get(kind);
  const definition = DEFINITIONS[kind];
  if (!definition) throw new Error(`unknown goal-control document kind: ${kind}`);
  const root = loadSchema();
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validator = ajv.compile({
    $schema: root.$schema,
    ...root.$defs[definition],
    $defs: root.$defs,
  });
  validators.set(kind, validator);
  return validator;
}

function formatErrors(errors = []) {
  return errors.map(error => `${error.instancePath || '/'} ${error.message}`).join('; ');
}

function assertDocument(kind, document, label = kind) {
  const validate = validatorFor(kind);
  if (!validate(document)) {
    throw new Error(`invalid ${label}: ${formatErrors(validate.errors)}`);
  }
  return document;
}

function readStructuredFile(filePath) {
  const absolute = path.resolve(filePath);
  const raw = fs.readFileSync(absolute, 'utf8').replace(/^\uFEFF/, '');
  const extension = path.extname(absolute).toLowerCase();
  const value = extension === '.yaml' || extension === '.yml'
    ? yaml.load(raw, { json: true, schema: yaml.JSON_SCHEMA })
    : JSON.parse(raw);
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${filePath} must contain one object`);
  }
  return value;
}

function readJsonLines(filePath) {
  const absolute = path.resolve(filePath);
  if (!fs.existsSync(absolute)) return [];
  return fs.readFileSync(absolute, 'utf8')
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((line, index) => ({ line: line.trim(), index: index + 1 }))
    .filter(entry => entry.line && !entry.line.startsWith('#'))
    .map(entry => {
      try {
        return JSON.parse(entry.line);
      } catch (error) {
        throw new Error(`invalid JSONL at ${filePath}:${entry.index}: ${error.message}`);
      }
    });
}

function ensureUniqueIds(values, label) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) throw new Error(`duplicate ${label} id: ${value}`);
    seen.add(value);
  }
}

function parseIso(value, label) {
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) throw new Error(`${label} must be an ISO-8601 timestamp`);
  return timestamp;
}

function latestExecutableCorrection(goal) {
  return goal.owner_corrections
    .filter(correction => correction.priority && correction.checkpoint_proof_id && correction.next_action)
    .sort((left, right) => Date.parse(left.recorded_at) - Date.parse(right.recorded_at))
    .at(-1) || null;
}

function validateGoalSemantics(goal) {
  ensureUniqueIds(goal.user_visible_proofs.map(proof => proof.id), 'proof');
  ensureUniqueIds(goal.lanes.map(lane => lane.id), 'lane');
  ensureUniqueIds(goal.owner_corrections.map(correction => correction.id), 'owner correction');
  const lanes = new Set(goal.lanes.map(lane => lane.id));
  const proofs = new Set(goal.user_visible_proofs.map(proof => proof.id));
  for (const proof of goal.user_visible_proofs) {
    if (!lanes.has(proof.lane_id)) {
      throw new Error(`proof ${proof.id} references missing lane ${proof.lane_id}`);
    }
  }
  if (goal.forecast.checkpoint_proof_id && !proofs.has(goal.forecast.checkpoint_proof_id)) {
    throw new Error(`forecast references missing proof ${goal.forecast.checkpoint_proof_id}`);
  }
  parseIso(goal.updated_at, 'goal.updated_at');
  parseIso(goal.forecast.updated_at, 'goal.forecast.updated_at');
  if (goal.forecast.next_checkpoint_at) {
    parseIso(goal.forecast.next_checkpoint_at, 'goal.forecast.next_checkpoint_at');
  }
  if (goal.forecast.checkpoint_started_at) {
    parseIso(goal.forecast.checkpoint_started_at, 'goal.forecast.checkpoint_started_at');
  }
  if (goal.forecast.next_checkpoint_at && goal.forecast.checkpoint_started_at
      && Date.parse(goal.forecast.checkpoint_started_at) >= Date.parse(goal.forecast.next_checkpoint_at)) {
    throw new Error('forecast checkpoint_started_at must be before next_checkpoint_at');
  }
  for (const correction of goal.owner_corrections) {
    parseIso(correction.recorded_at, `owner correction ${correction.id}.recorded_at`);
    const executableFields = ['priority', 'checkpoint_proof_id', 'next_action', 'source_harness'];
    const present = executableFields.filter(field => correction[field]);
    if (present.length && present.length !== executableFields.length) {
      throw new Error(`owner correction ${correction.id} must define priority, checkpoint_proof_id, next_action, and source_harness together`);
    }
    if (correction.checkpoint_proof_id && !proofs.has(correction.checkpoint_proof_id)) {
      throw new Error(`owner correction ${correction.id} references missing proof ${correction.checkpoint_proof_id}`);
    }
  }
  const executable = goal.owner_corrections
    .filter(correction => correction.priority)
    .sort((left, right) => Date.parse(left.recorded_at) - Date.parse(right.recorded_at));
  for (let index = 1; index < executable.length; index += 1) {
    if (!executable[index].replaces.includes(executable[index - 1].id)) {
      throw new Error(`owner correction ${executable[index].id} must replace prior executable correction ${executable[index - 1].id}`);
    }
  }
  const latestCorrection = executable.at(-1);
  if (latestCorrection) {
    if (goal.current_priority !== latestCorrection.priority) {
      throw new Error(`current priority does not match latest owner correction ${latestCorrection.id}`);
    }
    if (goal.forecast.checkpoint_proof_id !== latestCorrection.checkpoint_proof_id) {
      throw new Error(`forecast checkpoint does not match latest owner correction ${latestCorrection.id}`);
    }
  }
  validateProofProfile(goal);
  return goal;
}

function validateBundle({
  goal,
  outcomes = [],
  resume = null,
  assignments = [],
  integrations = [],
  watchdog = null,
  activity = [],
}) {
  assertDocument('goal', goal, 'active goal');
  validateGoalSemantics(goal);
  ensureUniqueIds(outcomes.map(receipt => receipt.receipt_id), 'outcome receipt');
  const receiptIds = new Set(outcomes.map(receipt => receipt.receipt_id));
  const receiptById = new Map(outcomes.map(receipt => [receipt.receipt_id, receipt]));
  const proofById = new Map(goal.user_visible_proofs.map(proof => [proof.id, proof]));
  if (watchdog) {
    assertDocument('watchdog', watchdog, 'watchdog policy');
    if (watchdog.goal_id !== goal.goal_id) {
      throw new Error(`watchdog policy belongs to goal ${watchdog.goal_id}, not ${goal.goal_id}`);
    }
    parseIso(watchdog.updated_at, 'watchdog policy updated_at');
  }
  ensureUniqueIds(activity.map(item => item.event_id), 'activity event');
  for (const event of activity) {
    assertDocument('activity', event, `activity event ${event.event_id || '<unknown>'}`);
    if (event.goal_id !== goal.goal_id) {
      throw new Error(`activity event ${event.event_id} belongs to goal ${event.goal_id}, not ${goal.goal_id}`);
    }
    parseIso(event.observed_at, `activity event ${event.event_id}.observed_at`);
  }
  if (activity.length && !watchdog) throw new Error('activity events require a watchdog policy');
  ensureUniqueIds(assignments.map(item => item.assignment_id), 'assignment');
  const assignmentById = new Map(assignments.map(item => [item.assignment_id, item]));
  for (const assignment of assignments) {
    assertDocument('assignment', assignment, `assignment ${assignment.assignment_id || '<unknown>'}`);
    if (assignment.goal_id !== goal.goal_id) {
      throw new Error(`assignment ${assignment.assignment_id} belongs to goal ${assignment.goal_id}, not ${goal.goal_id}`);
    }
    const missingProofs = assignment.acceptance_ids.filter(id => !proofById.has(id));
    if (missingProofs.length) {
      throw new Error(`assignment ${assignment.assignment_id} references missing proofs: ${missingProofs.join(', ')}`);
    }
    const issuedAt = parseIso(assignment.issued_at, `assignment ${assignment.assignment_id}.issued_at`);
    const expiresAt = parseIso(assignment.lease_expires_at, `assignment ${assignment.assignment_id}.lease_expires_at`);
    if (expiresAt <= issuedAt) throw new Error(`assignment ${assignment.assignment_id} lease must expire after it is issued`);
  }
  ensureUniqueIds(integrations.map(item => item.receipt_id), 'integration receipt');
  const integrationsByAssignmentAndTime = new Map();
  const currentCorrection = latestExecutableCorrection(goal);
  for (const receipt of integrations) {
    assertDocument('integration', receipt, `integration receipt ${receipt.receipt_id || '<unknown>'}`);
    if (receipt.goal_id !== goal.goal_id) {
      throw new Error(`integration receipt ${receipt.receipt_id} belongs to goal ${receipt.goal_id}, not ${goal.goal_id}`);
    }
    const assignment = assignmentById.get(receipt.assignment_id);
    if (!assignment) throw new Error(`integration receipt ${receipt.receipt_id} references missing assignment ${receipt.assignment_id}`);
    if (receipt.integrator === assignment.owner_agent) {
      throw new Error(`integration receipt ${receipt.receipt_id} must be recorded by the parent/integrator, not assignment owner ${assignment.owner_agent}`);
    }
    const observedAt = parseIso(receipt.observed_at, `integration receipt ${receipt.receipt_id}.observed_at`);
    if (observedAt < Date.parse(assignment.issued_at) || observedAt > Date.parse(assignment.lease_expires_at)) {
      throw new Error(`integration receipt ${receipt.receipt_id} falls outside assignment ${assignment.assignment_id} lease`);
    }
    if (currentCorrection
        && Date.parse(assignment.issued_at) < Date.parse(currentCorrection.recorded_at)
        && observedAt > Date.parse(currentCorrection.recorded_at)) {
      throw new Error(`integration receipt ${receipt.receipt_id} uses assignment ${assignment.assignment_id} from a superseded owner plan`);
    }
    ensureUniqueIds(receipt.repository_fingerprints.map(item => item.repo_id), `repository fingerprint in ${receipt.receipt_id}`);
    const limits = assignment.budget;
    const usage = receipt.usage;
    for (const [used, limit] of [
      ['tool_calls', 'max_tool_calls'],
      ['retries', 'max_retries'],
      ['ci_runs', 'max_ci_runs'],
      ['cost_usd', 'max_cost_usd'],
    ]) {
      if (usage[used] > limits[limit]) {
        throw new Error(`integration receipt ${receipt.receipt_id} exceeds assignment ${assignment.assignment_id} ${limit}`);
      }
    }
    const key = `${receipt.assignment_id}\u0000${receipt.observed_at}`;
    const prior = integrationsByAssignmentAndTime.get(key);
    if (prior && prior.outcome !== receipt.outcome) {
      throw new Error(`contradictory integration receipts ${prior.receipt_id} and ${receipt.receipt_id}`);
    }
    integrationsByAssignmentAndTime.set(key, receipt);
  }
  for (const receipt of outcomes) {
    assertDocument('outcome', receipt, `outcome receipt ${receipt.receipt_id || '<unknown>'}`);
    if (receipt.goal_id !== goal.goal_id) {
      throw new Error(`outcome receipt ${receipt.receipt_id} belongs to goal ${receipt.goal_id}, not ${goal.goal_id}`);
    }
    if (!proofById.has(receipt.acceptance_id)) {
      throw new Error(`outcome receipt ${receipt.receipt_id} references missing proof ${receipt.acceptance_id}`);
    }
    const proof = proofById.get(receipt.acceptance_id);
    if (receipt.stage !== proof.required_stage) {
      throw new Error(`outcome receipt ${receipt.receipt_id} uses ${receipt.stage}; proof ${proof.id} requires its own ${proof.required_stage} receipt`);
    }
    ensureUniqueIds(receipt.repository_fingerprints.map(item => item.repo_id), `repository fingerprint in ${receipt.receipt_id}`);
    if (receipt.commit !== receipt.repository_fingerprints[0].head) {
      throw new Error(`outcome receipt ${receipt.receipt_id} commit does not match its primary repository fingerprint`);
    }
    const fingerprintIds = new Set(receipt.repository_fingerprints.map(item => item.repo_id));
    const missingRepositories = proof.required_repositories.filter(repoId => !fingerprintIds.has(repoId));
    if (missingRepositories.length) {
      throw new Error(`outcome receipt ${receipt.receipt_id} lacks required repositories: ${missingRepositories.join(', ')}`);
    }
    const evidenceKinds = new Set(receipt.evidence.map(item => item.kind));
    const missingKinds = proof.required_evidence_kinds.filter(kind => !evidenceKinds.has(kind));
    if (missingKinds.length) {
      throw new Error(`outcome receipt ${receipt.receipt_id} lacks required evidence kinds: ${missingKinds.join(', ')}`);
    }
    if (!proof.allowed_result_classes.includes(receipt.result_class)) {
      throw new Error(`outcome receipt ${receipt.receipt_id} uses result class ${receipt.result_class}; proof ${proof.id} allows ${proof.allowed_result_classes.join(', ')}`);
    }
    if (proof.requires_authentic && receipt.authenticity !== 'authentic') {
      throw new Error(`outcome receipt ${receipt.receipt_id} is ${receipt.authenticity}; proof ${proof.id} requires authentic evidence`);
    }
    if (proof.requires_user_visible && receipt.user_visible !== true) {
      throw new Error(`outcome receipt ${receipt.receipt_id} is not user-visible; proof ${proof.id} requires a user-visible result`);
    }
    if (proof.subject_scope && receipt.subject_scope !== proof.subject_scope) {
      throw new Error(`outcome receipt ${receipt.receipt_id} has subject scope ${receipt.subject_scope || '<none>'}; proof ${proof.id} requires ${proof.subject_scope}`);
    }
    if (receipt.result_class === 'engineering_activity' && receipt.outcome === 'pass') {
      throw new Error(`outcome receipt ${receipt.receipt_id} cannot use engineering activity as a passing product outcome`);
    }
    if (receipt.result_class === 'independently_validated_score' && receipt.stage !== 'independently_validated') {
      throw new Error(`outcome receipt ${receipt.receipt_id} labels a score independently validated without the independently_validated stage`);
    }
    if (receipt.result_class === 'provisional_score' && receipt.stage === 'independently_validated') {
      throw new Error(`outcome receipt ${receipt.receipt_id} cannot call a provisional score independently validated`);
    }
    parseIso(receipt.observed_at, `outcome receipt ${receipt.receipt_id}.observed_at`);
    for (const superseded of receipt.supersedes) {
      if (superseded === receipt.receipt_id) {
        throw new Error(`outcome receipt ${receipt.receipt_id} cannot supersede itself`);
      }
      if (!receiptIds.has(superseded)) {
        throw new Error(`outcome receipt ${receipt.receipt_id} supersedes missing receipt ${superseded}`);
      }
      if (receiptById.get(superseded).acceptance_id !== receipt.acceptance_id) {
        throw new Error(`outcome receipt ${receipt.receipt_id} cannot supersede a different acceptance proof`);
      }
      if (Date.parse(receipt.observed_at) < Date.parse(receiptById.get(superseded).observed_at)) {
        throw new Error(`outcome receipt ${receipt.receipt_id} cannot backdate supersession of ${superseded}`);
      }
    }
  }
  const visiting = new Set();
  const visited = new Set();
  function visitSupersession(receiptId) {
    if (visiting.has(receiptId)) throw new Error(`outcome receipt supersession cycle includes ${receiptId}`);
    if (visited.has(receiptId)) return;
    visiting.add(receiptId);
    for (const target of receiptById.get(receiptId).supersedes) visitSupersession(target);
    visiting.delete(receiptId);
    visited.add(receiptId);
  }
  for (const receiptId of receiptIds) visitSupersession(receiptId);
  const activeReceiptIds = new Set(outcomes.flatMap(receipt => receipt.supersedes));
  const currentByProofAndTime = new Map();
  for (const receipt of outcomes.filter(item => item.status === 'accepted' && !activeReceiptIds.has(item.receipt_id))) {
    const key = `${receipt.acceptance_id}\u0000${receipt.observed_at}`;
    const existing = currentByProofAndTime.get(key);
    if (existing && (existing.outcome !== receipt.outcome || existing.commit !== receipt.commit)) {
      throw new Error(`unresolved contradictory receipts ${existing.receipt_id} and ${receipt.receipt_id}`);
    }
    currentByProofAndTime.set(key, receipt);
  }
  if (resume) {
    assertDocument('resume', resume, 'resume receipt');
    if (resume.goal_id !== goal.goal_id) {
      throw new Error(`resume receipt belongs to goal ${resume.goal_id}, not ${goal.goal_id}`);
    }
    parseIso(resume.observed_at, 'resume receipt observed_at');
    if (resume.spending.verified_at) {
      parseIso(resume.spending.verified_at, 'resume receipt spending.verified_at');
    }
    const lanes = new Set(goal.lanes.map(lane => lane.id));
    for (const lane of resume.blocked_lanes) {
      if (!lanes.has(lane)) throw new Error(`resume receipt references missing blocked lane ${lane}`);
    }
    const repositoryStates = resume.repository_states || [resume.repository_state];
    ensureUniqueIds(repositoryStates.map(state => state.repo_id), 'resume repository');
    if (!repositoryStates.some(state => (
      state.repo_id === resume.repository_state.repo_id
      && state.tree_fingerprint === resume.repository_state.tree_fingerprint
    ))) {
      throw new Error('resume primary repository_state is missing from repository_states');
    }
    const correction = latestExecutableCorrection(goal);
    if (correction) {
      if (Date.parse(resume.observed_at) < Date.parse(correction.recorded_at)) {
        throw new Error(`resume receipt predates latest owner correction ${correction.id}`);
      }
      if (resume.next_action !== correction.next_action) {
        throw new Error(`resume next action does not match latest owner correction ${correction.id}`);
      }
    }
  }
  return { goal, outcomes, resume, assignments, integrations, watchdog, activity };
}

function evaluateWatchdog(goal, outcomes = [], policy = null, activity = [], now = new Date()) {
  if (!policy) return { configured: false, healthy: true, breaches: [], metrics: null };
  const latestProofAt = [...latestOutcomeByProof(outcomes).values()]
    .filter(receipt => receipt.outcome === 'pass')
    .map(receipt => Date.parse(receipt.observed_at))
    .sort((left, right) => left - right)
    .at(-1) || Date.parse(goal.updated_at);
  const tacticChangeAt = activity
    .filter(event => event.kind === 'tactic_change' && Date.parse(event.observed_at) <= now.getTime())
    .map(event => Date.parse(event.observed_at))
    .sort((left, right) => left - right)
    .at(-1) || 0;
  const windowStart = Math.max(latestProofAt, tacticChangeAt, Date.parse(policy.updated_at));
  const currentEvents = activity.filter(event => {
    const observedAt = Date.parse(event.observed_at);
    return observedAt > windowStart && observedAt <= now.getTime();
  });
  const sum = kind => currentEvents
    .filter(event => event.kind === kind)
    .reduce((total, event) => total + event.count, 0);
  const activityCount = currentEvents
    .filter(event => ['tool_call', 'retry', 'ci_run'].includes(event.kind))
    .reduce((total, event) => total + event.count, 0);
  const retries = sum('retry');
  const ciRuns = sum('ci_run');
  const costUsd = currentEvents.reduce((total, event) => total + event.cost_usd, 0);
  const hoursWithoutProof = Math.max(0, (now.getTime() - windowStart) / 3600000);
  const breaches = [];
  if (activityCount > policy.max_activity_without_proof) breaches.push('activity_without_proof');
  if (hoursWithoutProof > policy.window_hours) breaches.push('proof_window_elapsed');
  if (retries > policy.max_retries) breaches.push('retry_budget');
  if (ciRuns > policy.max_ci_runs) breaches.push('ci_budget');
  if (costUsd > policy.max_cost_usd) breaches.push('cost_budget');
  return {
    configured: true,
    healthy: breaches.length === 0,
    breaches,
    window_started_at: new Date(windowStart).toISOString(),
    tactic_id: currentEvents.at(-1)?.tactic_id || activity
      .filter(event => event.kind === 'tactic_change')
      .sort((left, right) => Date.parse(left.observed_at) - Date.parse(right.observed_at))
      .at(-1)?.tactic_id || null,
    metrics: {
      activity_without_proof: activityCount,
      hours_without_proof: hoursWithoutProof,
      retries,
      ci_runs: ciRuns,
      cost_usd: costUsd,
    },
  };
}

function buildParallelStatus(assignments = [], integrations = [], now = new Date(), correction = null) {
  const latestByAssignment = new Map();
  for (const receipt of integrations) {
    const existing = latestByAssignment.get(receipt.assignment_id);
    if (!existing || Date.parse(receipt.observed_at) > Date.parse(existing.observed_at)) {
      latestByAssignment.set(receipt.assignment_id, receipt);
    }
  }
  const items = assignments.map(assignment => {
    const integration = latestByAssignment.get(assignment.assignment_id) || null;
    const integrated = integration?.outcome === 'pass';
    const stale = Boolean(
      correction
      && Date.parse(assignment.issued_at) < Date.parse(correction.recorded_at)
      && (!integration || Date.parse(integration.observed_at) > Date.parse(correction.recorded_at)),
    );
    return {
      assignment_id: assignment.assignment_id,
      owner_runtime: assignment.owner_runtime,
      owner_agent: assignment.owner_agent,
      lease_expires_at: assignment.lease_expires_at,
      lease_expired: !integrated && now.getTime() > Date.parse(assignment.lease_expires_at),
      stale_owner_plan: stale,
      integrated,
      integration_receipt_id: integration?.receipt_id || null,
      integration_outcome: integration?.outcome || null,
      repository_fingerprints: integration?.repository_fingerprints || [],
    };
  });
  return {
    assignments: items,
    total: items.length,
    integrated: items.filter(item => item.integrated).length,
    pending: items.filter(item => !item.integrated).length,
    expired: items.filter(item => item.lease_expired).length,
    stale: items.filter(item => item.stale_owner_plan).length,
  };
}

function latestOutcomeByProof(outcomes) {
  const result = new Map();
  const superseded = new Set(outcomes.flatMap(receipt => receipt.supersedes));
  for (const receipt of outcomes.filter(item => item.status === 'accepted' && !superseded.has(item.receipt_id))) {
    const existing = result.get(receipt.acceptance_id);
    if (!existing || Date.parse(receipt.observed_at) > Date.parse(existing.observed_at)) {
      result.set(receipt.acceptance_id, receipt);
    }
  }
  return result;
}

function buildStatus(goal, outcomes = [], now = new Date()) {
  const latest = latestOutcomeByProof(outcomes);
  const proofs = goal.user_visible_proofs.map(proof => {
    const receipt = latest.get(proof.id) || null;
    const achievedStage = receipt ? receipt.stage : null;
    const evidenceKinds = new Set(receipt?.evidence.map(item => item.kind) || []);
    const evidenceMet = proof.required_evidence_kinds.every(kind => evidenceKinds.has(kind));
    const stageMet = Boolean(
      receipt
      && receipt.outcome === 'pass'
      && receipt.stage === proof.required_stage
      && evidenceMet
    );
    const met = !proof.required || stageMet;
    return {
      ...proof,
      achieved_stage: achievedStage,
      stage_met: stageMet,
      met: Boolean(met),
      receipt_id: receipt ? receipt.receipt_id : null,
      observed_at: receipt ? receipt.observed_at : null,
      outcome: receipt ? receipt.outcome : null,
      commit: receipt ? receipt.commit : null,
      environment: receipt ? receipt.environment : null,
      repository_fingerprints: receipt ? receipt.repository_fingerprints : [],
    };
  });
  const required = proofs.filter(proof => proof.required);
  const completed = required.filter(proof => proof.met);
  const checkpoint = goal.forecast.checkpoint_proof_id
    ? proofs.find(proof => proof.id === goal.forecast.checkpoint_proof_id)
    : null;
  const checkpointAt = goal.forecast.next_checkpoint_at
    ? Date.parse(goal.forecast.next_checkpoint_at)
    : null;
  const checkpointOverdue = Boolean(
    checkpointAt !== null && now.getTime() > checkpointAt && checkpoint && !checkpoint.stage_met
  );
  const checkpointStartedAt = goal.forecast.checkpoint_started_at
    ? Date.parse(goal.forecast.checkpoint_started_at)
    : null;
  const checkpointReceiptInWindow = Boolean(
    checkpoint
    && checkpoint.stage_met
    && checkpoint.observed_at
    && checkpointStartedAt !== null
    && checkpointAt !== null
    && Date.parse(checkpoint.observed_at) >= checkpointStartedAt
    && Date.parse(checkpoint.observed_at) <= checkpointAt
  );
  return {
    goal_id: goal.goal_id,
    objective: goal.objective,
    declared_status: goal.status,
    required_proofs: required.length,
    completed_proofs: completed.length,
    complete: required.length > 0 && completed.length === required.length,
    proofs,
    forecast: {
      ...goal.forecast,
      checkpoint_overdue: checkpointOverdue,
      checkpoint_receipt_in_window: checkpointReceiptInWindow,
    },
    owner_correction: latestExecutableCorrection(goal),
  };
}

function evaluateClaim(claim, bundle, options = {}) {
  const now = options.now instanceof Date ? options.now : new Date(options.now || Date.now());
  if (!Number.isFinite(now.getTime())) throw new Error('claim evaluation time must be valid');
  const { goal, outcomes, resume, assignments, integrations, watchdog, activity } = validateBundle(bundle);
  const status = buildStatus(goal, outcomes, now);
  status.parallel = buildParallelStatus(assignments, integrations, now, latestExecutableCorrection(goal));
  status.watchdog = evaluateWatchdog(goal, outcomes, watchdog, activity, now);
  const unmet = status.proofs.filter(proof => proof.required && !proof.met);
  const laneById = new Map(goal.lanes.map(lane => [lane.id, lane]));
  const resumeRepositories = new Map(
    (resume?.repository_states || (resume ? [resume.repository_state] : []))
      .map(state => [state.repo_id, state]),
  );
  function repositoryBindingReasons(proofs) {
    const bindingReasons = [];
    for (const proof of proofs.filter(item => item.stage_met)) {
      for (const fingerprint of proof.repository_fingerprints) {
        const current = resumeRepositories.get(fingerprint.repo_id);
        if (!current) {
          bindingReasons.push(`${proof.id} has no current resume state for repository ${fingerprint.repo_id}`);
          continue;
        }
        if (current.head !== fingerprint.head || current.tree_fingerprint !== fingerprint.tree_fingerprint) {
          bindingReasons.push(`${proof.id} evidence is stale for repository ${fingerprint.repo_id}`);
        }
      }
    }
    return bindingReasons;
  }
  function parallelBindingReasons() {
    const bindingReasons = [];
    for (const assignment of status.parallel.assignments.filter(item => item.integrated)) {
      for (const fingerprint of assignment.repository_fingerprints) {
        const current = resumeRepositories.get(fingerprint.repo_id);
        if (!current) {
          bindingReasons.push(`assignment ${assignment.assignment_id} has no current resume state for repository ${fingerprint.repo_id}`);
        } else if (current.head !== fingerprint.head || current.tree_fingerprint !== fingerprint.tree_fingerprint) {
          bindingReasons.push(`assignment ${assignment.assignment_id} integration is stale for repository ${fingerprint.repo_id}`);
        }
      }
    }
    return bindingReasons;
  }
  const latestObservedAt = status.proofs
    .map(proof => proof.observed_at)
    .filter(Boolean)
    .sort()
    .at(-1);
  let reasons = [];

  if (claim === 'complete') {
    if (!status.complete) reasons.push(`${unmet.length} required user-visible proof(s) remain unmet`);
    if (goal.status !== 'complete') reasons.push(`goal status is ${goal.status}, not complete`);
    if (!resume) reasons.push('a current resume receipt is required for a complete claim');
    if (resume && Date.parse(resume.observed_at) < Date.parse(goal.updated_at)) {
      reasons.push('resume receipt predates the active goal update');
    }
    if (resume && latestObservedAt && Date.parse(resume.observed_at) < Date.parse(latestObservedAt)) {
      reasons.push('resume receipt predates the latest outcome evidence');
    }
    const staleCommits = status.proofs.filter(proof => (
      proof.required
      && proof.stage_met
      && resume
      && proof.commit !== resume.repository_state.head
    ));
    if (staleCommits.length) {
      reasons.push(`required proofs are not bound to current HEAD: ${staleCommits.map(proof => proof.id).join(', ')}`);
    }
    reasons.push(...repositoryBindingReasons(status.proofs.filter(proof => proof.required)));
    if (status.parallel.pending) {
      reasons.push(`${status.parallel.pending} delegated assignment(s) lack a passing parent integration receipt`);
    }
    reasons.push(...parallelBindingReasons());
  } else if (claim === 'blocked') {
    if (status.complete) reasons.push('all required proofs are met; use complete rather than blocked');
    if (!resume) reasons.push('a current resume receipt is required for a blocked claim');
    if (goal.status !== 'blocked') reasons.push(`goal status is ${goal.status}, not blocked`);
    const nonBlocked = unmet.filter(proof => laneById.get(proof.lane_id)?.status !== 'blocked');
    if (nonBlocked.length) {
      reasons.push(`unmet proofs still have non-blocked lanes: ${nonBlocked.map(proof => proof.id).join(', ')}`);
    }
    if (resume?.independent_work_remaining.length) {
      reasons.push(`independent work remains: ${resume.independent_work_remaining.join('; ')}`);
    }
    const resumeBlocked = new Set(resume?.blocked_lanes || []);
    const missingLaneReceipts = unmet.filter(proof => !resumeBlocked.has(proof.lane_id));
    if (resume && missingLaneReceipts.length) {
      reasons.push(`resume receipt does not mark every unmet lane blocked: ${missingLaneReceipts.map(proof => proof.lane_id).join(', ')}`);
    }
  } else if (claim === 'on-track') {
    const forecast = status.forecast;
    const checkpoint = status.proofs.find(proof => proof.id === forecast.checkpoint_proof_id);
    if (goal.status !== 'active') reasons.push(`goal status is ${goal.status}, not active`);
    if (!resume) reasons.push('a current resume receipt is required for an on-track claim');
    if (resume && Date.parse(resume.observed_at) < Date.parse(goal.updated_at)) {
      reasons.push('resume receipt predates the active goal update');
    }
    if (resume && latestObservedAt && Date.parse(resume.observed_at) < Date.parse(latestObservedAt)) {
      reasons.push('resume receipt predates the latest outcome evidence');
    }
    if (!resume?.last_user_visible_result) reasons.push('resume receipt has no last user-visible result');
    if (!forecast.checkpoint_receipt_in_window) reasons.push('promised checkpoint lacks a passing receipt in its current window');
    if (resume && checkpoint?.commit && checkpoint.commit !== resume.repository_state.head) {
      reasons.push('promised checkpoint evidence is not bound to current HEAD');
    }
    if (checkpoint) reasons.push(...repositoryBindingReasons([checkpoint]));
    if (forecast.state !== 'on_track') reasons.push(`forecast state is ${forecast.state}, not on_track`);
    if (!['medium', 'high'].includes(forecast.confidence)) reasons.push('forecast confidence must be medium or high');
    if (!forecast.basis || !forecast.basis.trim()) reasons.push('forecast basis is missing');
    if (!forecast.critical_path.length) reasons.push('forecast critical path is empty');
    if (!Number.isFinite(forecast.likely_hours)) reasons.push('forecast likely_hours is missing');
    if (!forecast.next_checkpoint_at || !forecast.checkpoint_proof_id) reasons.push('forecast checkpoint is incomplete');
    if (forecast.next_checkpoint_at && Date.parse(forecast.next_checkpoint_at) <= now.getTime()) {
      reasons.push('forecast checkpoint must be refreshed to a future time');
    }
    if (forecast.checkpoint_overdue) reasons.push(`forecast checkpoint ${forecast.checkpoint_proof_id} is overdue and unmet`);
    if (status.parallel.expired) reasons.push(`${status.parallel.expired} delegated assignment lease(s) expired without integration`);
    if (status.parallel.stale) reasons.push(`${status.parallel.stale} delegated assignment(s) belong to a superseded owner plan`);
    if (!status.watchdog.healthy) reasons.push(`progress watchdog requires a tactic change: ${status.watchdog.breaches.join(', ')}`);
  } else {
    throw new Error(`unsupported claim: ${claim}`);
  }

  return {
    claim,
    allowed: reasons.length === 0,
    reasons,
    status,
  };
}

module.exports = {
  assertDocument,
  buildStatus,
  buildParallelStatus,
  evaluateClaim,
  evaluateWatchdog,
  formatErrors,
  latestExecutableCorrection,
  loadProofProfiles,
  readJsonLines,
  readStructuredFile,
  validateBundle,
  validateGoalSemantics,
  validateProofProfile,
};
