#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const {
  assertDocument,
  buildParallelStatus,
  buildStatus,
  evaluateClaim,
  readJsonLines,
  readStructuredFile,
  validateBundle,
  validateGoalSemantics,
} = require('./lib/goal-control');
const {
  appendJsonLine,
  atomicWrite,
  captureRepositoryState,
  makeReceiptId,
  relativeEvidenceRef,
  repositoryFingerprint,
  sha256File,
  verifyCapturedRepositoryState,
  withFileLock,
  writeYaml,
} = require('./lib/goal-store');
const { verifyBundleEvidence } = require('./lib/goal-evidence');

const DEFAULT_DIR = path.join('.ecc', 'goal');

function optionValue(args, name, fallback = null) {
  const index = args.indexOf(name);
  if (index < 0) return fallback;
  if (!args[index + 1]) throw new Error(`${name} requires a value`);
  return args[index + 1];
}

function optionValues(args, name) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] !== name) continue;
    if (!args[index + 1]) throw new Error(`${name} requires a value`);
    values.push(args[index + 1]);
  }
  return values;
}

function optionBoolean(args, name, fallback = false) {
  const value = optionValue(args, name);
  if (value === null) return fallback;
  if (value === 'true') return true;
  if (value === 'false') return false;
  throw new Error(`${name} must be true or false`);
}

function pathsFrom(args) {
  const directory = optionValue(args, '--dir', DEFAULT_DIR);
  return {
    directory,
    goal: optionValue(args, '--goal', path.join(directory, 'active-goal.yaml')),
    outcomes: optionValue(args, '--outcomes', path.join(directory, 'outcomes.jsonl')),
    resume: optionValue(args, '--resume', path.join(directory, 'resume-receipt.yaml')),
    resumeHistory: optionValue(args, '--resume-history', path.join(directory, 'resume-history.jsonl')),
    assignments: optionValue(args, '--assignments', path.join(directory, 'assignments.jsonl')),
    integrations: optionValue(args, '--integrations', path.join(directory, 'integrations.jsonl')),
  };
}

function loadBundle(args) {
  const paths = pathsFrom(args);
  return {
    paths,
    bundle: {
      goal: readStructuredFile(paths.goal),
      outcomes: readJsonLines(paths.outcomes),
      assignments: readJsonLines(paths.assignments),
      integrations: readJsonLines(paths.integrations),
      resume: paths.resume && fs.existsSync(path.resolve(paths.resume))
        ? readStructuredFile(paths.resume)
        : null,
    },
  };
}

function help() {
  process.stdout.write(`ECC outcome control\n\nUsage:\n  ecc goal init --from FILE [--dir DIR]\n  ecc goal checkpoint --proof ID --at ISO --started-at ISO --basis TEXT --hours N [--confidence LEVEL]\n  ecc goal record --acceptance ID --stage STAGE --environment NAME --evidence KIND=FILE [options]\n    options: --result-class CLASS --authenticity CLASS --user-visible true|false --subject-scope SCOPE\n  ecc goal assign --description TEXT --acceptance ID --owner-runtime NAME --owner-agent ID --scope PATH --lease-until ISO [budgets]\n  ecc goal integrate --assignment ID --integrator ID --evidence KIND=FILE --repo ID=DIR --tool-calls N --retries N --ci-runs N --cost-usd N\n  ecc goal resume --next-action TEXT [--repo DIR ...] [--last-result TEXT] [options]\n  ecc goal handoff --next-action TEXT [resume options]\n  ecc goal validate [--goal FILE] [--outcomes FILE] [--resume FILE]\n  ecc goal status [--goal FILE] [--outcomes FILE] [--json] [--now ISO]\n  ecc goal claim <complete|blocked|on-track> [--goal FILE] [--outcomes FILE] [--resume FILE] [--json] [--now ISO]\n\nDefaults:\n  directory:    .ecc/goal\n  goal:         active-goal.yaml\n  outcomes:     outcomes.jsonl\n  assignments:  assignments.jsonl\n  integrations: integrations.jsonl\n  resume:       resume-receipt.yaml (loaded when present)\n\nWrites are local, atomic, and lock-protected. The command never calls a model, provider, CI service, or deployment API.\n`);
}

function parseEvidence(value) {
  const separator = value.indexOf('=');
  if (separator <= 0 || separator === value.length - 1) {
    throw new Error('--evidence must use KIND=FILE');
  }
  const kind = value.slice(0, separator);
  const filePath = value.slice(separator + 1);
  return {
    kind,
    ref: relativeEvidenceRef(filePath),
    sha256: sha256File(filePath),
  };
}

function parseNumber(value, name) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) throw new Error(`${name} must be a non-negative number`);
  return parsed;
}

function parseInteger(value, name) {
  const parsed = parseNumber(value, name);
  if (!Number.isSafeInteger(parsed)) throw new Error(`${name} must be a non-negative integer`);
  return parsed;
}

function parseRepoSpec(value) {
  const separator = value.indexOf('=');
  if (separator > 0) {
    return { repoId: value.slice(0, separator), repoPath: value.slice(separator + 1) };
  }
  return { repoId: null, repoPath: value };
}

function captureRepositories(args, paths) {
  const values = optionValues(args, '--repo');
  return (values.length ? values : [process.cwd()]).map(value => {
    const spec = parseRepoSpec(value);
    return captureRepositoryState(spec.repoPath, {
      repoId: spec.repoId || undefined,
      excludePaths: [paths.directory],
    });
  });
}

function commandInit(args) {
  const paths = pathsFrom(args);
  const source = optionValue(args, '--from');
  if (!source) throw new Error('init requires --from FILE');
  const goal = readStructuredFile(source);
  assertDocument('goal', goal, 'active goal');
  validateGoalSemantics(goal);
  return withFileLock(`${paths.goal}.lock`, () => {
    const existed = fs.existsSync(path.resolve(paths.goal));
    if (existed) {
      const existing = readStructuredFile(paths.goal);
      if (JSON.stringify(existing) !== JSON.stringify(goal)) {
        throw new Error(`active goal already exists with different content: ${paths.goal}`);
      }
    } else {
      writeYaml(paths.goal, goal);
    }
    if (!fs.existsSync(path.resolve(paths.outcomes))) atomicWrite(paths.outcomes, '');
    if (!fs.existsSync(path.resolve(paths.assignments))) atomicWrite(paths.assignments, '');
    if (!fs.existsSync(path.resolve(paths.integrations))) atomicWrite(paths.integrations, '');
    return { initialized: true, idempotent: existed, goal_id: goal.goal_id, paths };
  });
}

function commandAssign(args) {
  const paths = pathsFrom(args);
  const goal = readStructuredFile(paths.goal);
  const description = optionValue(args, '--description');
  const acceptanceIds = optionValues(args, '--acceptance');
  const ownerRuntime = optionValue(args, '--owner-runtime');
  const ownerAgent = optionValue(args, '--owner-agent');
  const scopePaths = optionValues(args, '--scope');
  const leaseExpiresAt = optionValue(args, '--lease-until');
  if (!description || !acceptanceIds.length || !ownerRuntime || !ownerAgent || !scopePaths.length || !leaseExpiresAt) {
    throw new Error('assign requires --description, --acceptance, --owner-runtime, --owner-agent, --scope, and --lease-until');
  }
  const issuedAt = optionValue(args, '--issued-at', new Date().toISOString());
  const assignment = {
    schema: 'ecc.assignment.v1',
    assignment_id: optionValue(args, '--assignment-id', makeReceiptId('assignment', issuedAt)),
    goal_id: goal.goal_id,
    description,
    acceptance_ids: acceptanceIds,
    owner_runtime: ownerRuntime,
    owner_agent: ownerAgent,
    scope_paths: scopePaths,
    issued_at: issuedAt,
    lease_expires_at: leaseExpiresAt,
    budget: {
      max_tool_calls: parseInteger(optionValue(args, '--max-tool-calls', '25'), '--max-tool-calls'),
      max_retries: parseInteger(optionValue(args, '--max-retries', '2'), '--max-retries'),
      max_ci_runs: parseInteger(optionValue(args, '--max-ci-runs', '0'), '--max-ci-runs'),
      max_cost_usd: parseNumber(optionValue(args, '--max-cost-usd', '0'), '--max-cost-usd'),
    },
    source_harness: optionValue(args, '--source-harness', process.env.ECC_SOURCE_HARNESS || 'unknown'),
  };
  assertDocument('assignment', assignment, `assignment ${assignment.assignment_id}`);
  const assignments = readJsonLines(paths.assignments);
  validateBundle({
    goal,
    outcomes: readJsonLines(paths.outcomes),
    resume: null,
    assignments: [...assignments, assignment],
    integrations: readJsonLines(paths.integrations),
  });
  const write = appendJsonLine(paths.assignments, assignment);
  return { assigned: true, ...write, assignment, paths };
}

function commandIntegrate(args) {
  const paths = pathsFrom(args);
  const goal = readStructuredFile(paths.goal);
  const assignmentId = optionValue(args, '--assignment');
  const integrator = optionValue(args, '--integrator');
  const evidenceValues = optionValues(args, '--evidence');
  const requiredUsage = ['--tool-calls', '--retries', '--ci-runs', '--cost-usd'];
  if (!assignmentId || !integrator || !evidenceValues.length || requiredUsage.some(name => optionValue(args, name) === null)) {
    throw new Error('integrate requires --assignment, --integrator, --evidence, --tool-calls, --retries, --ci-runs, and --cost-usd');
  }
  const observedAt = optionValue(args, '--observed-at', new Date().toISOString());
  const states = captureRepositories(args, paths);
  const receipt = {
    schema: 'ecc.integration-receipt.v1',
    receipt_id: optionValue(args, '--receipt-id', makeReceiptId(`integration-${assignmentId}`, observedAt)),
    goal_id: goal.goal_id,
    assignment_id: assignmentId,
    observed_at: observedAt,
    integrator,
    repository_fingerprints: states.map(repositoryFingerprint),
    evidence: evidenceValues.map(parseEvidence),
    usage: {
      tool_calls: parseInteger(optionValue(args, '--tool-calls'), '--tool-calls'),
      retries: parseInteger(optionValue(args, '--retries'), '--retries'),
      ci_runs: parseInteger(optionValue(args, '--ci-runs'), '--ci-runs'),
      cost_usd: parseNumber(optionValue(args, '--cost-usd'), '--cost-usd'),
    },
    outcome: optionValue(args, '--outcome', 'pass'),
    limitations: optionValues(args, '--limitation'),
    source_harness: optionValue(args, '--source-harness', process.env.ECC_SOURCE_HARNESS || 'unknown'),
  };
  assertDocument('integration', receipt, `integration receipt ${receipt.receipt_id}`);
  const integrations = readJsonLines(paths.integrations);
  validateBundle({
    goal,
    outcomes: readJsonLines(paths.outcomes),
    resume: null,
    assignments: readJsonLines(paths.assignments),
    integrations: [...integrations, receipt],
  });
  const write = appendJsonLine(paths.integrations, receipt);
  return { integrated: receipt.outcome === 'pass', ...write, receipt, paths };
}

function commandCheckpoint(args) {
  const paths = pathsFrom(args);
  const proof = optionValue(args, '--proof');
  const at = optionValue(args, '--at');
  const startedAt = optionValue(args, '--started-at');
  const basis = optionValue(args, '--basis');
  const hoursRaw = optionValue(args, '--hours');
  if (!proof || !at || !startedAt || !basis || hoursRaw === null) {
    throw new Error('checkpoint requires --proof, --at, --started-at, --basis, and --hours');
  }
  return withFileLock(`${paths.goal}.lock`, () => {
    const goal = readStructuredFile(paths.goal);
    if (!goal.user_visible_proofs.some(item => item.id === proof)) {
      throw new Error(`checkpoint references missing proof: ${proof}`);
    }
    const updatedAt = optionValue(args, '--observed-at', new Date().toISOString());
    goal.forecast = {
      ...goal.forecast,
      state: optionValue(args, '--state', 'on_track'),
      confidence: optionValue(args, '--confidence', 'medium'),
      basis,
      likely_hours: parseNumber(hoursRaw, '--hours'),
      next_checkpoint_at: at,
      checkpoint_started_at: startedAt,
      checkpoint_proof_id: proof,
      updated_at: updatedAt,
    };
    goal.updated_at = updatedAt;
    assertDocument('goal', goal, 'active goal');
    validateGoalSemantics(goal);
    writeYaml(paths.goal, goal);
    return { checkpointed: true, goal_id: goal.goal_id, proof_id: proof, paths };
  });
}

function commandRecord(args) {
  const paths = pathsFrom(args);
  const goal = readStructuredFile(paths.goal);
  const acceptanceId = optionValue(args, '--acceptance');
  const stage = optionValue(args, '--stage');
  const environment = optionValue(args, '--environment');
  const evidenceValues = optionValues(args, '--evidence');
  if (!acceptanceId || !stage || !environment || !evidenceValues.length) {
    throw new Error('record requires --acceptance, --stage, --environment, and at least one --evidence KIND=FILE');
  }
  const observedAt = optionValue(args, '--observed-at', new Date().toISOString());
  const proof = goal.user_visible_proofs.find(item => item.id === acceptanceId);
  if (!proof) throw new Error(`record references missing proof: ${acceptanceId}`);
  const resultClass = optionValue(
    args,
    '--result-class',
    proof.allowed_result_classes.length === 1 ? proof.allowed_result_classes[0] : null,
  );
  if (!resultClass) throw new Error('record requires --result-class when the proof permits multiple classes');
  const repositoryStates = captureRepositories(args, paths);
  const receipt = {
    schema: 'ecc.outcome-receipt.v1',
    receipt_id: optionValue(args, '--receipt-id', makeReceiptId(acceptanceId, observedAt)),
    goal_id: goal.goal_id,
    acceptance_id: acceptanceId,
    stage,
    result_class: resultClass,
    authenticity: optionValue(args, '--authenticity', 'unknown'),
    user_visible: optionBoolean(args, '--user-visible', false),
    subject_scope: optionValue(args, '--subject-scope'),
    observed_at: observedAt,
    environment,
    commit: optionValue(args, '--commit', repositoryStates[0].head),
    repository_fingerprints: repositoryStates.map(repositoryFingerprint),
    evidence: evidenceValues.map(parseEvidence),
    limitations: optionValues(args, '--limitation'),
    source_harness: optionValue(args, '--source-harness', process.env.ECC_SOURCE_HARNESS || 'unknown'),
    status: optionValue(args, '--status', 'accepted'),
    outcome: optionValue(args, '--outcome', 'pass'),
    supersedes: optionValues(args, '--supersedes'),
  };
  assertDocument('outcome', receipt, `outcome receipt ${receipt.receipt_id}`);
  validateBundle({
    goal,
    outcomes: [...readJsonLines(paths.outcomes), receipt],
    resume: null,
    assignments: readJsonLines(paths.assignments),
    integrations: readJsonLines(paths.integrations),
  });
  const write = appendJsonLine(paths.outcomes, receipt);
  return { recorded: true, ...write, receipt, paths };
}

function commandResume(args, handoff = false) {
  const paths = pathsFrom(args);
  const goal = readStructuredFile(paths.goal);
  const nextAction = optionValue(args, '--next-action');
  if (!nextAction) throw new Error(`${handoff ? 'handoff' : 'resume'} requires --next-action`);
  const observedAt = optionValue(args, '--observed-at', new Date().toISOString());
  const states = captureRepositories(args, paths);
  const receipt = {
    schema: 'ecc.resume-receipt.v1',
    receipt_id: optionValue(args, '--receipt-id', makeReceiptId(handoff ? 'handoff' : 'resume', observedAt)),
    goal_id: goal.goal_id,
    observed_at: observedAt,
    repository_state: states[0],
    repository_states: states,
    inherited_claims: [{
      claim: optionValue(args, '--inherited-claim', 'No predecessor progress claim was supplied.'),
      status: optionValue(args, '--claim-status', 'unverified'),
      evidence: optionValue(args, '--claim-evidence'),
    }],
    last_user_visible_result: optionValue(args, '--last-result'),
    next_action: nextAction,
    blocked_lanes: optionValues(args, '--blocked-lane'),
    independent_work_remaining: optionValues(args, '--independent-work'),
    spending: {
      observed_usd: optionValue(args, '--observed-usd') === null ? null : parseNumber(optionValue(args, '--observed-usd'), '--observed-usd'),
      approved_ceiling_usd: optionValue(args, '--budget-usd') === null ? null : parseNumber(optionValue(args, '--budget-usd'), '--budget-usd'),
      ci_runs: optionValue(args, '--ci-runs') === null ? null : parseNumber(optionValue(args, '--ci-runs'), '--ci-runs'),
      verified_at: optionValue(args, '--spending-verified-at'),
    },
    source_harness: optionValue(args, '--source-harness', process.env.ECC_SOURCE_HARNESS || 'unknown'),
  };
  assertDocument('resume', receipt, 'resume receipt');
  validateBundle({
    goal,
    outcomes: readJsonLines(paths.outcomes),
    resume: receipt,
    assignments: readJsonLines(paths.assignments),
    integrations: readJsonLines(paths.integrations),
  });
  withFileLock(`${paths.resume}.lock`, () => writeYaml(paths.resume, receipt));
  appendJsonLine(paths.resumeHistory, receipt);
  return { [handoff ? 'handoff_created' : 'resumed']: true, receipt, paths };
}

function renderStatus(status) {
  const rows = [
    `Goal: ${status.goal_id}`,
    `Declared status: ${status.declared_status}`,
    `User-visible proofs: ${status.completed_proofs}/${status.required_proofs}`,
    `Forecast: ${status.forecast.state} (${status.forecast.confidence})`,
  ];
  if (status.parallel) rows.push(`Delegated assignments: ${status.parallel.integrated}/${status.parallel.total} integrated`);
  if (status.forecast.checkpoint_overdue) rows.push('Checkpoint: OVERDUE');
  for (const proof of status.proofs) {
    rows.push(`  ${proof.met ? 'PASS' : 'OPEN'} ${proof.id}: ${proof.achieved_stage || 'no receipt'} / ${proof.required_stage}`);
  }
  return `${rows.join('\n')}\n`;
}

function main(args = process.argv.slice(2)) {
  const command = args[0];
  if (!command || ['help', '--help', '-h'].includes(command)) {
    help();
    return 0;
  }
  if (command === 'init') {
    process.stdout.write(`${JSON.stringify(commandInit(args), null, 2)}\n`);
    return 0;
  }
  if (command === 'checkpoint') {
    process.stdout.write(`${JSON.stringify(commandCheckpoint(args), null, 2)}\n`);
    return 0;
  }
  if (command === 'record') {
    process.stdout.write(`${JSON.stringify(commandRecord(args), null, 2)}\n`);
    return 0;
  }
  if (command === 'assign') {
    process.stdout.write(`${JSON.stringify(commandAssign(args), null, 2)}\n`);
    return 0;
  }
  if (command === 'integrate') {
    process.stdout.write(`${JSON.stringify(commandIntegrate(args), null, 2)}\n`);
    return 0;
  }
  if (command === 'resume' || command === 'handoff') {
    process.stdout.write(`${JSON.stringify(commandResume(args, command === 'handoff'), null, 2)}\n`);
    return 0;
  }

  const { paths, bundle } = loadBundle(args);
  const nowRaw = optionValue(args, '--now');
  const now = nowRaw ? new Date(nowRaw) : new Date();
  validateBundle(bundle);
  if (bundle.resume) {
    const recordedStates = bundle.resume.repository_states || [bundle.resume.repository_state];
    for (const recorded of recordedStates) {
      const live = verifyCapturedRepositoryState(recorded, { excludePaths: [paths.directory] });
      if (!live.matches) {
        throw new Error(`resume receipt repository ${recorded.repo_id} is stale: ${live.mismatches.join('; ')}`);
      }
    }
  }
  const verification = verifyBundleEvidence(bundle, { roots: optionValues(args, '--evidence-root') });

  if (command === 'validate') {
    const result = {
      valid: true,
      goal_id: bundle.goal.goal_id,
      outcomes: bundle.outcomes.length,
      assignments: bundle.assignments.length,
      integrations: bundle.integrations.length,
      evidence_artifacts: verification.length,
      resume_receipt: Boolean(bundle.resume),
      paths,
    };
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return 0;
  }

  if (command === 'status') {
    const status = buildStatus(bundle.goal, bundle.outcomes, now);
    status.parallel = buildParallelStatus(bundle.assignments, bundle.integrations, now);
    process.stdout.write(args.includes('--json') ? `${JSON.stringify(status, null, 2)}\n` : renderStatus(status));
    return status.complete ? 0 : 2;
  }

  if (command === 'claim') {
    const claim = args[1];
    if (!claim || claim.startsWith('-')) throw new Error('claim requires complete, blocked, or on-track');
    const result = evaluateClaim(claim, bundle, { now });
    if (args.includes('--json')) {
      process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    } else {
      process.stdout.write(`${result.allowed ? 'ALLOW' : 'DENY'} ${claim}\n`);
      for (const reason of result.reasons) process.stdout.write(`  - ${reason}\n`);
    }
    return result.allowed ? 0 : 2;
  }

  throw new Error(`unknown goal command: ${command}`);
}

if (require.main === module) {
  try {
    process.exitCode = main();
  } catch (error) {
    process.stderr.write(`goal control: ${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = {
  commandCheckpoint,
  commandAssign,
  commandIntegrate,
  commandInit,
  commandRecord,
  commandResume,
  main,
  optionValue,
  optionBoolean,
  optionValues,
  parseRepoSpec,
  parseInteger,
  pathsFrom,
  renderStatus,
};
