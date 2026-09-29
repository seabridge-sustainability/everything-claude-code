'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const {
  buildStatus,
  evaluateClaim,
  validateBundle,
} = require('../../scripts/lib/goal-control');
const yaml = require('js-yaml');

const CLI = path.join(__dirname, '..', '..', 'scripts', 'goal-control.js');
const ECC = path.join(__dirname, '..', '..', 'scripts', 'ecc.js');

function goal(overrides = {}) {
  return {
    schema: 'ecc.active-goal.v1',
    goal_id: 'openaccess-product',
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
        required: true,
      },
      {
        id: 'flood-validation',
        description: 'Flood result is independently validated.',
        lane_id: 'science',
        required_stage: 'independently_validated',
        required_evidence_kinds: ['independent_validation'],
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
  return {
    schema: 'ecc.outcome-receipt.v1',
    receipt_id: id,
    goal_id: 'openaccess-product',
    acceptance_id: acceptanceId,
    stage,
    observed_at: observedAt,
    environment: 'development',
    commit: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
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
    repository_state: {
      repo_root: 'C:/worktree',
      head: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      branch: 'development',
      worktree: 'C:/worktree',
      dirty_paths: [],
    },
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
    fs.writeFileSync(outcomesPath, `${JSON.stringify(outcome('r1', 'heat-browser', 'ui_displayed'))}\n`);
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
  const incidentProofs = [
    { id: 'heat-source', description: 'One property heat result.', lane_id: 'product', required_stage: 'authentic_input_processed', required_evidence_kinds: ['runtime'], required: true },
    { id: 'hazard-ui', description: 'Hazard gauges show authentic values.', lane_id: 'product', required_stage: 'ui_displayed', required_evidence_kinds: ['browser'], required: true },
    { id: 'risk-score', description: 'Admitted 0-100 score is served.', lane_id: 'product', required_stage: 'api_served', required_evidence_kinds: ['api'], required: true },
    { id: 'resilience', description: 'Validated resilience result.', lane_id: 'science', required_stage: 'independently_validated', required_evidence_kinds: ['independent_validation'], required: true },
    { id: 'finance', description: 'Finance output is exported.', lane_id: 'product', required_stage: 'export_verified', required_evidence_kinds: ['export'], required: true },
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
  const heatReceipt = outcome('heat-only', 'heat-source', 'authentic_input_processed');
  const incidentResume = resume({
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
