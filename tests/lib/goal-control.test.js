'use strict';

const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const {
  buildStatus,
  evaluateClaim,
  validateBundle,
} = require('../../scripts/lib/goal-control');
const { captureRepositoryState } = require('../../scripts/lib/goal-store');
const yaml = require('js-yaml');

const CLI = path.join(__dirname, '..', '..', 'scripts', 'goal-control.js');
const ECC = path.join(__dirname, '..', '..', 'scripts', 'ecc.js');
const DUMMY_HEAD = 'a'.repeat(40);
const DUMMY_TREE = 'c'.repeat(64);

function repositoryState(overrides = {}) {
  return {
    repo_id: 'backend',
    repo_root: 'C:/worktree',
    head: DUMMY_HEAD,
    branch: 'development',
    worktree: 'C:/worktree',
    dirty_paths: [],
    origin: 'https://example.invalid/backend.git',
    staged_diff_sha256: '1'.repeat(64),
    unstaged_diff_sha256: '2'.repeat(64),
    untracked_sha256: '3'.repeat(64),
    lockfiles_sha256: '4'.repeat(64),
    tree_fingerprint: DUMMY_TREE,
    lockfiles: [],
    ...overrides,
  };
}

function goal(overrides = {}) {
  return {
    schema: 'ecc.active-goal.v1',
    goal_id: 'openaccess-product',
    mode: 'controlled',
    objective: 'Show authentic property results end to end.',
    current_priority: 'Complete the first US vertical slice.',
    non_goals: ['Do not call provisional output independently validated.'],
    user_visible_proofs: [
      {
        id: 'heat-browser',
        description: 'Heat result is visible for an authentic property.',
        lane_id: 'product',
        required_stage: 'ui_displayed',
        required_evidence_kinds: ['browser'],
        required_repositories: [],
        allowed_result_classes: ['user_visible_result'],
        acceptance_predicate: 'A non-null result is visible through the authentic property UI.',
        requires_authentic: true,
        requires_user_visible: true,
        subject_scope: 'real_property',
        required: true,
      },
      {
        id: 'flood-validation',
        description: 'Flood result is independently validated.',
        lane_id: 'science',
        required_stage: 'independently_validated',
        required_evidence_kinds: ['independent_validation'],
        required_repositories: [],
        allowed_result_classes: ['independently_validated_score'],
        acceptance_predicate: 'An independent method validates the property result.',
        requires_authentic: true,
        requires_user_visible: false,
        subject_scope: 'real_property',
        required: true,
      },
    ],
    lanes: [
      { id: 'product', description: 'API and UI', status: 'active', blocker: null, next_action: 'Bind the result.' },
      { id: 'science', description: 'Scientific validation', status: 'blocked', blocker: 'Provider quota', next_action: null },
    ],
    owner_corrections: [
      {
        id: 'owner-1',
        recorded_at: '2026-09-28T12:00:00Z',
        instruction: 'Build the functional US result before expanding research.',
        replaces: ['old-sequence'],
      },
    ],
    forecast: {
      state: 'on_track',
      confidence: 'medium',
      basis: 'One vertical slice per four hours.',
      critical_path: ['heat-browser', 'flood-validation'],
      likely_hours: 8,
      next_checkpoint_at: '2026-09-29T18:00:00Z',
      checkpoint_started_at: '2026-09-29T12:00:00Z',
      checkpoint_proof_id: 'heat-browser',
      updated_at: '2026-09-29T12:00:00Z',
    },
    status: 'active',
    updated_at: '2026-09-29T12:00:00Z',
    ...overrides,
  };
}

function outcome(id, acceptanceId, stage, observedAt = '2026-09-29T13:00:00Z') {
  const evidenceKind = {
    ui_displayed: 'browser',
    independently_validated: 'independent_validation',
    export_verified: 'export',
    api_served: 'api',
  }[stage] || 'runtime';
  const resultClass = {
    ui_displayed: 'user_visible_result',
    independently_validated: 'independently_validated_score',
    export_verified: 'user_visible_result',
    api_served: 'user_visible_result',
    authentic_input_processed: 'source_native_indicator',
  }[stage] || 'other';
  return {
    schema: 'ecc.outcome-receipt.v1',
    receipt_id: id,
    goal_id: 'openaccess-product',
    acceptance_id: acceptanceId,
    stage,
    result_class: resultClass,
    authenticity: 'authentic',
    user_visible: ['ui_displayed', 'export_verified'].includes(stage),
    subject_scope: 'real_property',
    observed_at: observedAt,
    environment: 'development',
    commit: DUMMY_HEAD,
    repository_fingerprints: [{
      repo_id: 'backend',
      repo_root: 'C:/worktree',
      head: DUMMY_HEAD,
      tree_fingerprint: DUMMY_TREE,
    }],
    evidence: [{ kind: evidenceKind, ref: `artifact://${id}`, sha256: 'b'.repeat(64) }],
    limitations: [],
    source_harness: 'codex',
    status: 'accepted',
    outcome: 'pass',
    supersedes: [],
  };
}

function resume(overrides = {}) {
  return {
    schema: 'ecc.resume-receipt.v1',
    receipt_id: 'resume-1',
    goal_id: 'openaccess-product',
    observed_at: '2026-09-29T13:30:00Z',
    repository_state: repositoryState(),
    repository_states: [repositoryState()],
    inherited_claims: [
      { claim: 'Heat API works.', status: 'verified_current', evidence: 'test://heat' },
    ],
    last_user_visible_result: 'Heat result rendered.',
    next_action: 'Continue the flood lane.',
    blocked_lanes: ['science'],
    independent_work_remaining: [],
    spending: {
      observed_usd: null,
      approved_ceiling_usd: null,
      ci_runs: null,
      verified_at: null,
    },
    source_harness: 'claude',
    ...overrides,
  };
}

function run(script, args, cwd) {
  return spawnSync('node', [script, ...args], { cwd, encoding: 'utf8' });
}

function runGit(args, cwd) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  assert.strictEqual(result.status, 0, result.stderr);
  return result.stdout.trim();
}

function materializeEvidence(receipt, dir) {
  receipt.evidence = receipt.evidence.map((item, index) => {
    const fileName = `${receipt.receipt_id}-${index}-${item.kind}.json`;
    const content = JSON.stringify({ receipt_id: receipt.receipt_id, kind: item.kind, observed: true });
    fs.writeFileSync(path.join(dir, fileName), content);
    return {
      ...item,
      ref: fileName,
      sha256: crypto.createHash('sha256').update(content).digest('hex'),
    };
  });
  return receipt;
}

const tests = [];
function test(name, fn) { tests.push([name, fn]); }

test('tracks outcome stages separately from engineering activity', () => {
  const bundle = validateBundle({
    goal: goal(),
    outcomes: [outcome('r2', 'heat-browser', 'ui_displayed')],
  });
  const status = buildStatus(bundle.goal, bundle.outcomes, new Date('2026-09-29T14:00:00Z'));
  assert.strictEqual(status.completed_proofs, 1);
  assert.strictEqual(status.required_proofs, 2);
  assert.strictEqual(status.complete, false);
  assert.strictEqual(status.proofs[0].achieved_stage, 'ui_displayed');
});

test('denies complete when required user-visible proof is missing', () => {
  const result = evaluateClaim('complete', {
    goal: goal({ status: 'complete' }),
    outcomes: [outcome('r1', 'heat-browser', 'ui_displayed')],
  });
  assert.strictEqual(result.allowed, false);
  assert.match(result.reasons.join(' '), /required user-visible proof/);
});

test('allows complete only when every required proof has sufficient evidence', () => {
  const result = evaluateClaim('complete', {
    goal: goal({ status: 'complete' }),
    outcomes: [
      outcome('r1', 'heat-browser', 'ui_displayed'),
      outcome('r2', 'flood-validation', 'independently_validated'),
    ],
    resume: resume({ observed_at: '2026-09-29T14:00:00Z' }),
  });
  assert.strictEqual(result.allowed, true);
});

test('denies blocked when one provider lane is blocked but independent product work remains', () => {
  const result = evaluateClaim('blocked', {
    goal: goal({ status: 'blocked' }),
    outcomes: [],
    resume: resume({ independent_work_remaining: ['Implement the product API/UI slice.'] }),
  });
  assert.strictEqual(result.allowed, false);
  assert.match(result.reasons.join(' '), /non-blocked lanes/);
  assert.match(result.reasons.join(' '), /independent work remains/);
});

test('allows blocked only when every unmet lane is blocked and no independent work remains', () => {
  const blockedGoal = goal({
    status: 'blocked',
    lanes: [
      { id: 'product', description: 'API and UI', status: 'blocked', blocker: 'Missing approved data', next_action: null },
      { id: 'science', description: 'Scientific validation', status: 'blocked', blocker: 'Provider quota', next_action: null },
    ],
  });
  const result = evaluateClaim('blocked', {
    goal: blockedGoal,
    outcomes: [],
    resume: resume({ blocked_lanes: ['product', 'science'] }),
  });
  assert.strictEqual(result.allowed, true);
});

test('denies on-track after an unmet vertical-slice checkpoint expires', () => {
  const result = evaluateClaim('on-track', {
    goal: goal(),
    outcomes: [],
  }, { now: '2026-09-29T19:00:00Z' });
  assert.strictEqual(result.allowed, false);
  assert.match(result.reasons.join(' '), /overdue/);
});

test('allows an evidence-based on-track claim with a current resume receipt and live checkpoint', () => {
  const result = evaluateClaim('on-track', {
    goal: goal(),
    outcomes: [outcome('r1', 'heat-browser', 'ui_displayed')],
    resume: resume({ observed_at: '2026-09-29T14:00:00Z' }),
  }, { now: '2026-09-29T17:00:00Z' });
  assert.strictEqual(result.allowed, true);
});

test('denies on-track when tests pass but the product result is still null', () => {
  const result = evaluateClaim('on-track', {
    goal: goal(),
    outcomes: [],
    resume: resume({
      last_user_visible_result: null,
      inherited_claims: [
        { claim: 'CI and unit tests pass.', status: 'verified_current', evidence: 'test://ci-green' },
      ],
    }),
  }, { now: '2026-09-29T17:00:00Z' });
  assert.strictEqual(result.allowed, false);
  assert.match(result.reasons.join(' '), /no last user-visible result/);
  assert.match(result.reasons.join(' '), /checkpoint lacks a passing receipt/);
});

test('rejects outcome receipts for unknown acceptance criteria', () => {
  assert.throws(() => validateBundle({
    goal: goal(),
    outcomes: [outcome('r1', 'unknown-proof', 'ui_displayed')],
  }), /references missing proof/);
});

test('does not let independent validation substitute for UI evidence', () => {
  assert.throws(() => validateBundle({
    goal: goal(),
    outcomes: [outcome('r1', 'heat-browser', 'independently_validated')],
  }), /requires its own ui_displayed receipt/);
});

test('rejects generic or unhashed evidence for a claim-specific proof', () => {
  const generic = outcome('r1', 'heat-browser', 'ui_displayed');
  generic.evidence = [{ kind: 'runtime', ref: 'test://green', sha256: 'b'.repeat(64) }];
  assert.throws(() => validateBundle({ goal: goal(), outcomes: [generic] }), /lacks required evidence kinds: browser/);

  const unhashed = outcome('r2', 'heat-browser', 'ui_displayed');
  delete unhashed.evidence[0].sha256;
  assert.throws(() => validateBundle({ goal: goal(), outcomes: [unhashed] }), /invalid outcome receipt/);
});

test('keeps authentic, fixture, provisional, and independently validated results distinct', () => {
  const fixture = outcome('fixture', 'heat-browser', 'ui_displayed');
  fixture.authenticity = 'fixture';
  assert.throws(
    () => validateBundle({ goal: goal(), outcomes: [fixture] }),
    /requires authentic evidence/,
  );

  const provisional = outcome('provisional', 'flood-validation', 'independently_validated');
  provisional.result_class = 'provisional_score';
  assert.throws(
    () => validateBundle({ goal: goal(), outcomes: [provisional] }),
    /allows independently_validated_score|cannot call a provisional score independently validated/,
  );

  const activity = outcome('activity', 'heat-browser', 'ui_displayed');
  activity.result_class = 'engineering_activity';
  assert.throws(
    () => validateBundle({ goal: goal(), outcomes: [activity] }),
    /engineering_activity|engineering activity/,
  );

  const hidden = outcome('hidden', 'heat-browser', 'ui_displayed');
  hidden.user_visible = false;
  assert.throws(
    () => validateBundle({ goal: goal(), outcomes: [hidden] }),
    /requires a user-visible result/,
  );
});

test('a create-only retraction removes a superseded successful outcome', () => {
  const accepted = outcome('r1', 'heat-browser', 'ui_displayed');
  const retracted = {
    ...outcome('r2', 'heat-browser', 'ui_displayed', '2026-09-29T14:00:00Z'),
    status: 'retracted',
    supersedes: ['r1'],
    limitations: ['Browser evidence was bound to the wrong property.'],
  };
  const status = buildStatus(goal(), [accepted, retracted], new Date('2026-09-29T15:00:00Z'));
  assert.strictEqual(status.proofs[0].met, false);
  assert.strictEqual(status.proofs[0].achieved_stage, null);
});

test('a later failing observation invalidates stale success without preferring the old high point', () => {
  const passing = outcome('r1', 'heat-browser', 'ui_displayed', '2026-09-29T13:00:00Z');
  const failing = {
    ...outcome('r2', 'heat-browser', 'ui_displayed', '2026-09-29T14:00:00Z'),
    outcome: 'fail',
    limitations: ['The authentic result regressed to null.'],
  };
  const status = buildStatus(goal(), [passing, failing], new Date('2026-09-29T15:00:00Z'));
  assert.strictEqual(status.proofs[0].stage_met, false);
  assert.strictEqual(status.proofs[0].outcome, 'fail');
  assert.strictEqual(status.proofs[0].receipt_id, 'r2');
});

test('rejects unresolved contradictory current evidence at the same observation time', () => {
  const passing = outcome('r1', 'heat-browser', 'ui_displayed');
  const failing = { ...outcome('r2', 'heat-browser', 'ui_displayed'), outcome: 'fail' };
  assert.throws(() => validateBundle({ goal: goal(), outcomes: [passing, failing] }), /unresolved contradictory receipts/);
});

test('rejects backdated or cyclic supersession chains', () => {
  const earlier = outcome('r1', 'heat-browser', 'ui_displayed', '2026-09-29T12:00:00Z');
  const later = { ...outcome('r2', 'heat-browser', 'ui_displayed', '2026-09-29T13:00:00Z'), supersedes: ['r1'] };
  const backdated = { ...earlier, supersedes: ['r2'] };
  assert.throws(() => validateBundle({ goal: goal(), outcomes: [backdated, later] }), /backdate supersession|supersession cycle/);
});

test('denies on-track when checkpoint evidence predates the promised window', () => {
  const result = evaluateClaim('on-track', {
    goal: goal(),
    outcomes: [outcome('r1', 'heat-browser', 'ui_displayed', '2026-09-29T11:59:00Z')],
    resume: resume({ observed_at: '2026-09-29T14:00:00Z' }),
  }, { now: '2026-09-29T17:00:00Z' });
  assert.strictEqual(result.allowed, false);
  assert.match(result.reasons.join(' '), /current window/);
});

test('denies on-track when checkpoint evidence belongs to a different commit', () => {
  const stale = outcome('r1', 'heat-browser', 'ui_displayed');
  stale.commit = 'cccccccccccccccccccccccccccccccccccccccc';
  stale.repository_fingerprints[0].head = stale.commit;
  const result = evaluateClaim('on-track', {
    goal: goal(),
    outcomes: [stale],
    resume: resume({ observed_at: '2026-09-29T14:00:00Z' }),
  }, { now: '2026-09-29T17:00:00Z' });
  assert.strictEqual(result.allowed, false);
  assert.match(result.reasons.join(' '), /not bound to current HEAD/);
});

test('an optional proof still must be demonstrated when used as a forecast checkpoint', () => {
  const optionalGoal = goal({
    user_visible_proofs: [
      {
        id: 'heat-browser',
        description: 'Heat result is visible for an authentic property.',
        lane_id: 'product',
        required_stage: 'ui_displayed',
        required_evidence_kinds: ['browser'],
        required_repositories: [],
        allowed_result_classes: ['user_visible_result'],
        acceptance_predicate: 'The authentic heat result is visible.',
        requires_authentic: true,
        requires_user_visible: true,
        subject_scope: 'real_property',
        required: false,
      },
    ],
    forecast: {
      ...goal().forecast,
      critical_path: ['heat-browser'],
      checkpoint_proof_id: 'heat-browser',
    },
  });
  const result = evaluateClaim('on-track', { goal: optionalGoal, outcomes: [] }, {
    now: '2026-09-29T19:00:00Z',
  });
  assert.strictEqual(result.allowed, false);
  assert.match(result.reasons.join(' '), /overdue/);
});

test('CLI and ecc router return exit 2 for unsupported progress claims', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-goal-control-'));
  try {
    const goalPath = path.join(dir, 'goal.json');
    const outcomesPath = path.join(dir, 'outcomes.jsonl');
    fs.writeFileSync(goalPath, JSON.stringify(goal(), null, 2));
    const receipt = materializeEvidence(outcome('r1', 'heat-browser', 'ui_displayed'), dir);
    fs.writeFileSync(outcomesPath, `${JSON.stringify(receipt)}\n`);
    const args = ['claim', 'complete', '--goal', goalPath, '--outcomes', outcomesPath, '--json'];
    const direct = run(CLI, args, dir);
    assert.strictEqual(direct.status, 2, direct.stderr);
    assert.strictEqual(JSON.parse(direct.stdout).allowed, false);
    const routed = run(ECC, ['goal', ...args], dir);
    assert.strictEqual(routed.status, 2, routed.stderr);
    assert.strictEqual(JSON.parse(routed.stdout).allowed, false);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('CLI accepts the documented YAML active-goal format', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-goal-yaml-'));
  try {
    const goalPath = path.join(dir, 'active-goal.yaml');
    const outcomesPath = path.join(dir, 'outcomes.jsonl');
    fs.writeFileSync(goalPath, yaml.dump(goal(), { noRefs: true, lineWidth: 120 }));
    fs.writeFileSync(outcomesPath, '');
    const result = run(CLI, ['validate', '--goal', goalPath, '--outcomes', outcomesPath], dir);
    assert.strictEqual(result.status, 0, result.stderr);
    assert.strictEqual(JSON.parse(result.stdout).valid, true);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('real CLI rejects the five-day SeaBridge counterexample for complete, on-track, and whole-goal blocked', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-goal-red-team-'));
  const repoDir = path.join(dir, 'repo');
  fs.mkdirSync(repoDir);
  runGit(['init', '--initial-branch=development'], repoDir);
  runGit(['config', 'user.email', 'goal-control@example.invalid'], repoDir);
  runGit(['config', 'user.name', 'ECC Goal Test'], repoDir);
  fs.writeFileSync(path.join(repoDir, 'README.md'), '# Counterexample repository\n');
  runGit(['add', 'README.md'], repoDir);
  runGit(['commit', '-m', 'test: initialize counterexample repository'], repoDir);
  const counterexampleState = captureRepositoryState(repoDir, { repoId: 'backend' });
  const incidentProofs = [
    { id: 'heat-source', description: 'One property heat result.', lane_id: 'product', required_stage: 'authentic_input_processed', required_evidence_kinds: ['runtime'], required_repositories: [], allowed_result_classes: ['source_native_indicator'], acceptance_predicate: 'A source-native indicator is processed for a real property.', requires_authentic: true, requires_user_visible: false, subject_scope: 'real_property', required: true },
    { id: 'hazard-ui', description: 'Hazard gauges show authentic values.', lane_id: 'product', required_stage: 'ui_displayed', required_evidence_kinds: ['browser'], required_repositories: [], allowed_result_classes: ['user_visible_result'], acceptance_predicate: 'Authentic hazard values are visible.', requires_authentic: true, requires_user_visible: true, subject_scope: 'real_property', required: true },
    { id: 'risk-score', description: 'Admitted 0-100 score is served.', lane_id: 'product', required_stage: 'api_served', required_evidence_kinds: ['api'], required_repositories: [], allowed_result_classes: ['provisional_score'], acceptance_predicate: 'The provisional admitted score is served and labelled.', requires_authentic: true, requires_user_visible: false, subject_scope: 'real_property', required: true },
    { id: 'resilience', description: 'Validated resilience result.', lane_id: 'science', required_stage: 'independently_validated', required_evidence_kinds: ['independent_validation'], required_repositories: [], allowed_result_classes: ['independently_validated_score'], acceptance_predicate: 'An independent method validates the resilience result.', requires_authentic: true, requires_user_visible: false, subject_scope: 'real_property', required: true },
    { id: 'finance', description: 'Finance output is exported.', lane_id: 'product', required_stage: 'export_verified', required_evidence_kinds: ['export'], required_repositories: [], allowed_result_classes: ['user_visible_result'], acceptance_predicate: 'The authentic finance result exports.', requires_authentic: true, requires_user_visible: true, subject_scope: 'real_property', required: true },
  ];
  const incidentGoal = status => goal({
    status,
    user_visible_proofs: incidentProofs,
    forecast: {
      ...goal().forecast,
      critical_path: ['hazard-ui', 'risk-score', 'resilience', 'finance'],
      checkpoint_proof_id: 'hazard-ui',
    },
  });
  const heatReceipt = materializeEvidence(
    outcome('heat-only', 'heat-source', 'authentic_input_processed'),
    dir,
  );
  const incidentResume = resume({
    repository_state: counterexampleState,
    repository_states: [counterexampleState],
    last_user_visible_result: 'One property-linked heat observation; all product gauges remain null.',
    blocked_lanes: ['science'],
    independent_work_remaining: ['Implement the admitted score, hazard UI, and finance export.'],
    inherited_claims: [
      { claim: 'Hundreds of tests and CI checks pass.', status: 'verified_current', evidence: 'test://ci-green' },
      { claim: 'Functional MVP is complete.', status: 'contradicted', evidence: 'runtime://all-null-ui' },
    ],
  });

  try {
    const goalPath = path.join(dir, 'active-goal.yaml');
    const outcomesPath = path.join(dir, 'outcomes.jsonl');
    const resumePath = path.join(dir, 'resume-receipt.yaml');
    fs.writeFileSync(outcomesPath, `${JSON.stringify(heatReceipt)}\n`);
    fs.writeFileSync(resumePath, yaml.dump(incidentResume, { noRefs: true, lineWidth: 120 }));

    for (const [claim, declaredStatus] of [['complete', 'complete'], ['on-track', 'active'], ['blocked', 'blocked']]) {
      fs.writeFileSync(goalPath, yaml.dump(incidentGoal(declaredStatus), { noRefs: true, lineWidth: 120 }));
      const result = run(CLI, [
        'claim', claim,
        '--goal', goalPath,
        '--outcomes', outcomesPath,
        '--resume', resumePath,
        '--now', '2026-09-29T17:00:00Z',
        '--json',
      ], dir);
      assert.strictEqual(result.status, 2, `${claim}: ${result.stderr}`);
      assert.strictEqual(JSON.parse(result.stdout).allowed, false, claim);
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('real CLI creates, checkpoints, records, resumes, hands off, and claims a goal', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-goal-lifecycle-'));
  try {
    runGit(['init', '--initial-branch=development'], dir);
    runGit(['config', 'user.email', 'goal-control@example.invalid'], dir);
    runGit(['config', 'user.name', 'ECC Goal Test'], dir);
    fs.writeFileSync(path.join(dir, 'README.md'), '# Goal lifecycle\n');
    runGit(['add', 'README.md'], dir);
    runGit(['commit', '-m', 'test: initialize goal fixture'], dir);

    const lifecycleGoal = goal({
      goal_id: 'cli-lifecycle',
      status: 'complete',
      user_visible_proofs: [{
        id: 'cli-result',
        description: 'The real CLI records and validates an authentic result.',
        lane_id: 'delivery',
        required_stage: 'ui_displayed',
        required_evidence_kinds: ['browser'],
        required_repositories: [],
        allowed_result_classes: ['user_visible_result'],
        acceptance_predicate: 'The CLI result is visible.',
        requires_authentic: true,
        requires_user_visible: true,
        subject_scope: 'local_cli',
        required: true,
      }],
      lanes: [{
        id: 'delivery',
        description: 'CLI delivery',
        status: 'complete',
        blocker: null,
        next_action: null,
      }],
      forecast: {
        ...goal().forecast,
        critical_path: ['cli-result'],
        checkpoint_proof_id: 'cli-result',
      },
    });
    const seed = path.join(dir, 'goal-seed.yaml');
    fs.writeFileSync(seed, yaml.dump(lifecycleGoal, { noRefs: true, lineWidth: 120 }));
    const initialized = run(CLI, ['init', '--from', seed], dir);
    assert.strictEqual(initialized.status, 0, initialized.stderr);
    assert.strictEqual(JSON.parse(initialized.stdout).idempotent, false);
    const repeated = run(CLI, ['init', '--from', seed], dir);
    assert.strictEqual(repeated.status, 0, repeated.stderr);
    assert.strictEqual(JSON.parse(repeated.stdout).idempotent, true);

    const checkpointed = run(CLI, [
      'checkpoint', '--proof', 'cli-result', '--at', '2026-09-29T18:00:00Z',
      '--started-at', '2026-09-29T12:00:00Z', '--basis', 'Direct CLI lifecycle.',
      '--hours', '1', '--confidence', 'high', '--observed-at', '2026-09-29T12:00:00Z',
    ], dir);
    assert.strictEqual(checkpointed.status, 0, checkpointed.stderr);

    const evidence = path.join(dir, 'browser-result.json');
    fs.writeFileSync(evidence, JSON.stringify({ rendered: true, value: 42 }));
    const recorded = run(CLI, [
      'record', '--acceptance', 'cli-result', '--stage', 'ui_displayed',
      '--environment', 'local-cli', '--evidence', `browser=${evidence}`,
      '--authenticity', 'authentic', '--user-visible', 'true', '--subject-scope', 'local_cli',
      '--receipt-id', 'cli-result-001', '--observed-at', '2026-09-29T13:00:00Z',
      '--source-harness', 'test',
    ], dir);
    assert.strictEqual(recorded.status, 0, recorded.stderr);
    const receipt = JSON.parse(recorded.stdout).receipt;
    assert.match(receipt.evidence[0].sha256, /^[a-f0-9]{64}$/);

    const resumed = run(CLI, [
      'resume', '--repo', dir, '--next-action', 'Verify the completion claim.',
      '--last-result', 'The real CLI rendered value 42.', '--receipt-id', 'resume-cli-001',
      '--observed-at', '2026-09-29T14:00:00Z', '--source-harness', 'test',
    ], dir);
    assert.strictEqual(resumed.status, 0, resumed.stderr);
    const resumeReceipt = JSON.parse(resumed.stdout).receipt;
    assert.strictEqual(resumeReceipt.repository_states.length, 1);
    assert.ok(resumeReceipt.repository_state.dirty_paths.includes('browser-result.json'));

    const claim = run(CLI, ['claim', 'complete', '--json', '--now', '2026-09-29T15:00:00Z'], dir);
    assert.strictEqual(claim.status, 0, claim.stderr);
    assert.strictEqual(JSON.parse(claim.stdout).allowed, true);

    const handedOff = run(CLI, [
      'handoff', '--repo', dir, '--next-action', 'Start the next verified phase.',
      '--last-result', 'The real CLI rendered value 42.', '--receipt-id', 'handoff-cli-001',
      '--observed-at', '2026-09-29T15:00:00Z', '--source-harness', 'test',
    ], dir);
    assert.strictEqual(handedOff.status, 0, handedOff.stderr);
    assert.strictEqual(JSON.parse(handedOff.stdout).handoff_created, true);
    assert.strictEqual(fs.readFileSync(path.join(dir, '.ecc', 'goal', 'resume-history.jsonl'), 'utf8').trim().split(/\r?\n/).length, 2);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('init refuses to overwrite a different active goal', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-goal-init-conflict-'));
  try {
    const first = path.join(dir, 'first.yaml');
    const second = path.join(dir, 'second.yaml');
    fs.writeFileSync(first, yaml.dump(goal(), { noRefs: true }));
    fs.writeFileSync(second, yaml.dump(goal({ objective: 'A conflicting objective.' }), { noRefs: true }));
    assert.strictEqual(run(CLI, ['init', '--from', first], dir).status, 0);
    const conflict = run(CLI, ['init', '--from', second], dir);
    assert.strictEqual(conflict.status, 1);
    assert.match(conflict.stderr, /already exists with different content/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('CLI rejects changed, missing, and URI-only evidence artifacts', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-goal-evidence-mutation-'));
  try {
    const goalPath = path.join(dir, 'goal.json');
    const outcomesPath = path.join(dir, 'outcomes.jsonl');
    fs.writeFileSync(goalPath, JSON.stringify(goal(), null, 2));

    const changed = materializeEvidence(outcome('changed', 'heat-browser', 'ui_displayed'), dir);
    fs.writeFileSync(outcomesPath, `${JSON.stringify(changed)}\n`);
    fs.writeFileSync(path.join(dir, changed.evidence[0].ref), '{"mutated":true}');
    let result = run(CLI, ['validate', '--goal', goalPath, '--outcomes', outcomesPath], dir);
    assert.strictEqual(result.status, 1);
    assert.match(result.stderr, /hash mismatch/);

    const missing = materializeEvidence(outcome('missing', 'heat-browser', 'ui_displayed'), dir);
    fs.unlinkSync(path.join(dir, missing.evidence[0].ref));
    fs.writeFileSync(outcomesPath, `${JSON.stringify(missing)}\n`);
    result = run(CLI, ['validate', '--goal', goalPath, '--outcomes', outcomesPath], dir);
    assert.strictEqual(result.status, 1);
    assert.match(result.stderr, /not found/);

    const uri = outcome('uri', 'heat-browser', 'ui_displayed');
    fs.writeFileSync(outcomesPath, `${JSON.stringify(uri)}\n`);
    result = run(CLI, ['validate', '--goal', goalPath, '--outcomes', outcomesPath], dir);
    assert.strictEqual(result.status, 1);
    assert.match(result.stderr, /unverifiable URI/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('claim rejects proof bound to a stale dirty-tree fingerprint', () => {
  const staleTree = outcome('stale-tree', 'heat-browser', 'ui_displayed');
  staleTree.repository_fingerprints[0].tree_fingerprint = 'd'.repeat(64);
  const result = evaluateClaim('on-track', {
    goal: goal(),
    outcomes: [staleTree],
    resume: resume({ observed_at: '2026-09-29T14:00:00Z' }),
  }, { now: '2026-09-29T17:00:00Z' });
  assert.strictEqual(result.allowed, false);
  assert.match(result.reasons.join(' '), /stale for repository backend/);
});

test('proof requiring multiple repositories rejects a one-repository receipt', () => {
  const crossRepoGoal = goal({
    user_visible_proofs: [{
      ...goal().user_visible_proofs[0],
      required_repositories: ['backend', 'frontend'],
    }],
    forecast: {
      ...goal().forecast,
      critical_path: ['heat-browser'],
      checkpoint_proof_id: 'heat-browser',
    },
  });
  assert.throws(
    () => validateBundle({
      goal: crossRepoGoal,
      outcomes: [outcome('backend-only', 'heat-browser', 'ui_displayed')],
    }),
    /lacks required repositories: frontend/,
  );
});

test('real CLI invalidates a fresh claim after an uncommitted source change', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-goal-dirty-tree-'));
  try {
    runGit(['init', '--initial-branch=development'], dir);
    runGit(['config', 'user.email', 'goal-control@example.invalid'], dir);
    runGit(['config', 'user.name', 'ECC Goal Test'], dir);
    fs.writeFileSync(path.join(dir, 'README.md'), '# Before\n');
    runGit(['add', 'README.md'], dir);
    runGit(['commit', '-m', 'test: initialize dirty-tree repository'], dir);

    const dirtyGoal = goal({
      goal_id: 'dirty-tree',
      status: 'complete',
      user_visible_proofs: [{
        ...goal().user_visible_proofs[0],
        id: 'dirty-proof',
        lane_id: 'delivery',
        required_repositories: [],
      }],
      lanes: [{ id: 'delivery', description: 'Delivery', status: 'complete', blocker: null, next_action: null }],
      forecast: {
        ...goal().forecast,
        critical_path: ['dirty-proof'],
        checkpoint_proof_id: 'dirty-proof',
      },
    });
    const seed = path.join(dir, 'goal.yaml');
    const evidence = path.join(dir, 'browser.json');
    fs.writeFileSync(seed, yaml.dump(dirtyGoal, { noRefs: true }));
    fs.writeFileSync(evidence, '{"visible":true}');
    assert.strictEqual(run(CLI, ['init', '--from', seed], dir).status, 0);
    assert.strictEqual(run(CLI, [
      'record', '--acceptance', 'dirty-proof', '--stage', 'ui_displayed',
      '--environment', 'local', '--evidence', `browser=${evidence}`,
      '--repo', `backend=${dir}`,
      '--authenticity', 'authentic', '--user-visible', 'true',
      '--subject-scope', 'real_property', '--receipt-id', 'dirty-proof-001',
    ], dir).status, 0);
    assert.strictEqual(run(CLI, [
      'resume', '--repo', `backend=${dir}`, '--next-action', 'Verify.',
      '--last-result', 'Visible authentic result.', '--receipt-id', 'dirty-resume-001',
    ], dir).status, 0);
    let claim = run(CLI, ['claim', 'complete', '--json'], dir);
    assert.strictEqual(claim.status, 0, claim.stderr);

    fs.writeFileSync(path.join(dir, 'README.md'), '# After uncommitted change\n');
    claim = run(CLI, ['claim', 'complete', '--json'], dir);
    assert.strictEqual(claim.status, 1);
    assert.match(claim.stderr, /resume receipt repository backend is stale.*tree fingerprint/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

(async () => {
  let passed = 0;
  let failed = 0;
  console.log('\n=== Testing ECC goal outcome control ===\n');
  for (const [name, fn] of tests) {
    try {
      await fn();
      console.log(`  \u2713 ${name}`);
      passed += 1;
    } catch (error) {
      console.log(`  \u2717 ${name}`);
      console.error(`    ${error.stack || error.message}`);
      failed += 1;
    }
  }
  console.log(`\nPassed: ${passed}`);
  console.log(`Failed: ${failed}`);
  process.exitCode = failed ? 1 : 0;
})();
