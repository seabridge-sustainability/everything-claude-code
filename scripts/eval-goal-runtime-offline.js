#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { loadCapabilities } = require('./lib/goal-runtime');

const GOAL = path.join(__dirname, 'goal-control.js');
const BRIDGE = path.join(__dirname, 'goal-runtime-bridge.js');
const SESSION = path.join(__dirname, 'session-coordinate.js');

function runNode(script, args, cwd, expected) {
  const result = spawnSync(process.execPath, [script, ...args], {
    cwd,
    encoding: 'utf8',
    timeout: 30000,
    windowsHide: true,
  });
  if (!expected.includes(result.status)) {
    throw new Error(`${path.basename(script)} ${args.join(' ')} exited ${result.status}: ${result.stderr || result.stdout}`);
  }
  return result;
}

function runGit(args, cwd) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8', windowsHide: true });
  if (result.status !== 0) throw new Error(`git ${args.join(' ')} failed: ${result.stderr}`);
}

function goalDocument(goalId) {
  return {
    schema: 'ecc.active-goal.v1',
    goal_id: goalId,
    mode: 'controlled',
    proof_profile: 'docs',
    objective: 'Prove one offline runtime artifact through the canonical outcome gate.',
    current_priority: 'Verify the runtime artifact.',
    non_goals: ['No live model or provider calls.'],
    user_visible_proofs: [{
      id: 'offline-runtime-proof',
      description: 'The offline runtime artifact is verified.',
      lane_id: 'offline',
      required_stage: 'calculation_implemented',
      required_evidence_kinds: ['runtime'],
      required_repositories: ['fixture'],
      allowed_result_classes: ['other'],
      acceptance_predicate: 'The local artifact exists and its hash matches.',
      requires_authentic: false,
      requires_user_visible: false,
      subject_scope: null,
      required: true,
    }],
    lanes: [{ id: 'offline', description: 'Offline enforcement', status: 'complete', blocker: null, next_action: null }],
    owner_corrections: [],
    forecast: {
      state: 'not_set', confidence: 'none', basis: null, critical_path: ['offline-runtime-proof'],
      likely_hours: null, next_checkpoint_at: null, checkpoint_started_at: null,
      checkpoint_proof_id: null, updated_at: '2026-09-29T12:00:00Z',
    },
    status: 'complete',
    updated_at: '2026-09-29T12:00:00Z',
  };
}

function createFixture(root, complete) {
  fs.mkdirSync(root, { recursive: true });
  runGit(['init', '--initial-branch=offline'], root);
  runGit(['config', 'user.email', 'goal-eval@example.invalid'], root);
  runGit(['config', 'user.name', 'ECC Goal Eval'], root);
  fs.writeFileSync(path.join(root, 'README.md'), '# Offline goal runtime fixture\n');
  runGit(['add', 'README.md'], root);
  runGit(['commit', '-m', 'test: initialize offline goal fixture'], root);
  runNode(SESSION, ['register', '--session', 'offline-eval', '--scope', 'README.md',
    '--objective', 'Offline gate evaluation', '--done-when', 'Synthetic artifact verified'], root, [0]);
  const seed = path.join(root, 'goal.json');
  const goalDir = path.join(root, '.ecc', 'goal');
  fs.writeFileSync(seed, `${JSON.stringify(goalDocument(complete ? 'offline-valid' : 'offline-all-null'), null, 2)}\n`);
  runNode(GOAL, ['init', '--from', seed, '--dir', goalDir], root, [0]);
  if (complete) {
    const evidence = path.join(root, 'runtime-proof.json');
    fs.writeFileSync(evidence, '{"offline":true,"provider_calls":0}\n');
    runNode(GOAL, [
      'record', '--dir', goalDir, '--acceptance', 'offline-runtime-proof',
      '--stage', 'calculation_implemented', '--environment', 'offline',
      '--evidence', `runtime=${evidence}`, '--repo', `fixture=${root}`,
      '--result-class', 'other', '--authenticity', 'synthetic', '--user-visible', 'false',
      '--receipt-id', 'offline-outcome', '--observed-at', '2026-09-29T13:00:00Z',
      '--source-harness', 'offline-eval',
    ], root, [0]);
    runNode(GOAL, [
      'resume', '--dir', goalDir, '--repo', `fixture=${root}`,
      '--next-action', 'Report the offline verified result.', '--last-result', 'Offline artifact hash verified.',
      '--receipt-id', 'offline-resume', '--observed-at', '2026-09-29T14:00:00Z',
      '--source-harness', 'offline-eval',
    ], root, [0]);
  }
  return goalDir;
}

function evaluate() {
  const capabilities = loadCapabilities();
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-runtime-eval-'));
  try {
    const validRoot = path.join(temp, 'valid');
    const invalidRoot = path.join(temp, 'all-null');
    const validGoalDir = createFixture(validRoot, true);
    const invalidGoalDir = createFixture(invalidRoot, false);
    const models = capabilities.model_families.map(item => item.id);
    const results = capabilities.runtimes.map((runtime, index) => {
      const model = `${models[index % models.length]}/offline-eval`;
      const admit = runNode(BRIDGE, [
        'admit', '--runtime', runtime.id, '--model', model, '--mode', 'controlled', '--dir', validGoalDir, '--session', 'offline-eval',
      ], validRoot, [0]);
      const unowned = runNode(BRIDGE, [
        'admit', '--runtime', runtime.id, '--model', model, '--mode', 'lightweight', '--dir', validGoalDir, '--session', 'unregistered-chat',
      ], validRoot, [2]);
      const valid = runNode(BRIDGE, [
        'final', '--runtime', runtime.id, '--model', model, '--claim', 'complete', '--dir', validGoalDir, '--session', 'offline-eval',
      ], validRoot, [0]);
      const allNull = runNode(BRIDGE, [
        'final', '--runtime', runtime.id, '--model', model, '--claim', 'complete', '--dir', invalidGoalDir, '--session', 'offline-eval',
      ], invalidRoot, [2]);
      return {
        runtime: runtime.id,
        model,
        tier: runtime.tier,
        admitted_valid_goal: admit.status === 0,
        rejected_unregistered_session: JSON.parse(unowned.stdout).admitted === false,
        allowed_verified_complete: JSON.parse(valid.stdout).allowed === true,
        rejected_all_null_complete: JSON.parse(allNull.stdout).allowed === false,
      };
    });
    return {
      schema: 'ecc.goal-runtime-offline-eval.v1',
      provider_calls: 0,
      runtime_count: results.length,
      model_families_covered: [...new Set(results.map(result => result.model.split('/')[0]))],
      passed: results.every(result => (
        result.admitted_valid_goal
        && result.rejected_unregistered_session
        && result.allowed_verified_complete
        && result.rejected_all_null_complete
      )),
      results,
    };
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

function main(args = process.argv.slice(2)) {
  const report = evaluate();
  const output = args.includes('--output') ? args[args.indexOf('--output') + 1] : null;
  if (output) {
    const absolute = path.resolve(output);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, `${JSON.stringify(report, null, 2)}\n`);
  }
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  return report.passed ? 0 : 1;
}

if (require.main === module) {
  try {
    process.exitCode = main();
  } catch (error) {
    process.stderr.write(`offline goal runtime eval: ${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = { createFixture, evaluate, goalDocument, main };
