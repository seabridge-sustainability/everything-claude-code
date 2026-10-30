#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const hook = path.join(__dirname, '..', '..', 'scripts', 'hooks', 'goal-runtime-gate.js');
const { run } = require('../../scripts/hooks/goal-runtime-gate');

function invoke(runtime, phase, payload, cwd) {
  return spawnSync(process.execPath, [hook, runtime, phase], {
    cwd,
    input: JSON.stringify(payload),
    encoding: 'utf8',
    timeout: 30000,
    windowsHide: true,
  });
}

const workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-goal-hook-'));
const tests = [
  ['bound structured completion checks unfamiliar prose while incomplete turns remain unaccepted', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-structured-final-'));
    const git = argv => {
      const result = spawnSync('git', argv, { cwd: dir, encoding: 'utf8', windowsHide: true });
      assert.strictEqual(result.status, 0, result.stderr);
    };
    try {
      git(['init', '--initial-branch=main']);
      fs.writeFileSync(path.join(dir, 'README.md'), 'fixture\n'); git(['add', 'README.md']);
      git(['-c', 'user.name=ECC Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-m', 'fixture']);
      const now = new Date().toISOString();
      const goal = { schema: 'ecc.active-goal.v1', goal_id: 'structured-final', mode: 'controlled', proof_profile: 'docs',
        objective: 'Verify required live output', current_priority: 'Verify', non_goals: [], owner_corrections: [],
        user_visible_proofs: [{ id: 'required', description: 'Required output', lane_id: 'main', required_stage: 'source_identified',
          required_evidence_kinds: ['runtime'], required_repositories: ['fixture'], allowed_result_classes: ['other'],
          acceptance_predicate: 'The exact required output is verified', subject_scope: null, requires_authentic: false, requires_user_visible: false, required: true }],
        lanes: [{ id: 'main', description: 'verification', status: 'active', blocker: null, next_action: 'Verify' }],
        forecast: { state: 'not_set', confidence: 'none', basis: 'not measured', critical_path: ['main'], likely_hours: null,
          next_checkpoint_at: null, checkpoint_started_at: null, checkpoint_proof_id: null, updated_at: now }, status: 'active', updated_at: now };
      const folder = path.join(dir, '.ecc', 'goal'); fs.mkdirSync(folder, { recursive: true });
      fs.writeFileSync(path.join(folder, 'active-goal.yaml'), JSON.stringify(goal));
      require('../../scripts/lib/session-coordination').execute('register', { cwd: dir, sessionId: 'bound-final',
        scopes: ['.ecc/goal'], objective: 'fixture', doneWhen: 'checked', ttl: 30 });
      const bound = { version: 1, intent: 'incomplete', goal_id: goal.goal_id, session_id: 'bound-final',
        contract_sha256: require('../../scripts/lib/goal-control').goalContractDigest(goal) };
      const bridge = path.resolve(__dirname, '../../scripts/goal-runtime-bridge.js');
      const call = intent => spawnSync(process.execPath, [bridge, 'final-hook', '--runtime', 'codex', '--dir', folder,
        '--session', 'bound-final'], { cwd: dir, input: JSON.stringify({ ecc_completion: intent,
        response: intent.intent === 'complete' ? 'All requested deliverables are implemented and verified.'
          : 'Still verifying the required output.' }), encoding: 'utf8', windowsHide: true });
      const progress = call(bound);
      assert.strictEqual(progress.status, 0, progress.stderr);
      assert.strictEqual(JSON.parse(progress.stdout).acceptance, 'not_accepted');
      const complete = call({ ...bound, intent: 'complete' });
      assert.strictEqual(complete.status, 2, complete.stderr);
      assert.match(complete.stdout, /required.*proof|not complete|not verified|remain unmet/i);
      assert.strictEqual(call({ ...bound, contract_sha256: 'b'.repeat(64) }).status, 1);
      assert.strictEqual(call({ ...bound, session_id: 'other' }).status, 1);
    } finally { fs.rmSync(dir, { recursive: true, force: true }); }
  }],
  ['neutral completed handoff is not a product completion claim', () => {
    const result = invoke('cursor', 'final', { response: 'Handoff complete; whole-building MVP remains incomplete. Two source-only reviews completed, not product acceptance.' }, workspace);
    assert.strictEqual(result.status, 0, result.stderr);
  }],
  ['explicit whole-building completion and mixed negative/positive clauses still require proof', () => {
    for (const response of ['The whole-building MVP is complete and accepted.', 'This old prototype is not complete; the goal is complete.']) {
      const result = invoke('cursor', 'final', { response }, workspace);
      assert.strictEqual(result.status, 2);
      assert.match(result.stderr, /complete claim requires/);
    }
  }],
  ['block adapters reject malformed and missing guard state; audit is explicitly advisory', () => {
    for (const runtime of ['claude','codex','copilot-local','copilot-cli','gemini','opencode']) {
      const blocked = spawnSync(process.execPath, [hook, runtime, 'guard', 'block', 'pre'], { cwd: workspace, input: '{malformed secret-example-never-log', encoding: 'utf8' });
      assert.strictEqual(blocked.status, ['claude','codex','gemini','copilot-cli'].includes(runtime) ? 0 : 2, runtime);
      assert.doesNotMatch(blocked.stdout + blocked.stderr, /secret-example/);
      const missing = spawnSync(process.execPath, [hook, runtime, 'guard', 'block', 'pre'], { cwd: workspace, input: JSON.stringify({ session_id: 'missing', tool_name: 'Write', tool_input: { file_path: 'outside' } }), encoding: 'utf8' });
      assert.strictEqual(missing.status, ['claude','codex','gemini','copilot-cli'].includes(runtime) ? 0 : 2, runtime);
      const output = JSON.parse(missing.stdout);
      if (runtime === 'copilot-cli') assert.strictEqual(output.permissionDecision, 'deny');
      else if (runtime === 'gemini') assert.strictEqual(output.decision, 'deny');
      else assert.strictEqual(output.hookSpecificOutput.permissionDecision, 'deny');
    }
    const audit = spawnSync(process.execPath, [hook, 'codex', 'guard', 'audit', 'pre'], { cwd: workspace, input: '{}', encoding: 'utf8' });
    assert.strictEqual(audit.status, 0);
    assert.match(audit.stderr, /audit would-deny/);
    const invalidMode = spawnSync(process.execPath, [hook, 'codex', 'guard', 'unknown', 'pre'], { cwd: workspace, input: '{}', encoding: 'utf8' });
    assert.strictEqual(invalidMode.status, 2);
  }],
  ['ordinary prompt passes without goal state', () => {
    const result = invoke('claude', 'admit', { prompt: 'Explain this file.' }, workspace);
    assert.strictEqual(result.status, 0, result.stderr);
  }],
  ['controlled prompt is blocked without goal state', () => {
    const result = invoke('claude', 'admit', { prompt: 'Continue this long-running multi-agent goal.' }, workspace);
    assert.strictEqual(result.status, 2);
    assert.match(result.stderr, /controlled work requires an active goal/);
  }],
  ['first controlled prompt can reach the agent with setup instructions', () => {
    const result = invoke('claude', 'prepare', { prompt: 'Continue this long-running multi-agent goal.' }, workspace);
    assert.strictEqual(result.status, 0, result.stderr);
    const output = JSON.parse(result.stdout);
    assert.strictEqual(output.hookSpecificOutput.hookEventName, 'UserPromptSubmit');
    assert.match(output.hookSpecificOutput.additionalContext, /ecc session register/);
    assert.match(output.hookSpecificOutput.additionalContext, /ecc goal init/);
    assert.match(output.hookSpecificOutput.additionalContext, /goal-runtime admit/);
    assert.doesNotMatch(result.stdout, /Continue this long-running/);
  }],
  ['ordinary prompt preparation adds no setup context', () => {
    const result = invoke('claude', 'prepare', { prompt: 'Explain this file.' }, workspace);
    assert.strictEqual(result.status, 0, result.stderr);
    assert.strictEqual(result.stdout, '');
  }],
  ['unsupported completion claim is blocked without goal state', () => {
    const result = invoke('cursor', 'final', { response: 'The goal is fully complete.' }, workspace);
    assert.strictEqual(result.status, 2);
    assert.match(result.stderr, /complete claim requires/);
  }],
  ['Claude, Codex and Gemini deny unsupported completion through successful native JSON responses', () => {
    for (const runtime of ['claude', 'codex', 'gemini']) {
      const result = invoke(runtime, 'final', { response: 'The goal is fully complete.' }, workspace);
      assert.strictEqual(result.status, 0);
      assert.strictEqual(JSON.parse(result.stdout).decision, runtime === 'gemini' ? 'deny' : 'block');
      assert.match(JSON.parse(result.stdout).reason, /not admitted/);
      assert.match(result.stderr, /complete claim requires/);
    }
  }],
  ['lifecycle runner derives the final phase from the stable hook id', () => {
    const previous = process.cwd();
    try {
      process.chdir(workspace);
      const result = run(JSON.stringify({ response: 'The goal is fully complete.' }), {
        hookId: 'stop:goal-runtime-final',
      });
      assert.strictEqual(result.exitCode, 0);
      assert.strictEqual(result.stdout, '');
    } finally {
      process.chdir(previous);
    }
  }],
];

let failed = 0;
for (const [name, fn] of tests) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`  ✗ ${name}\n    ${error.stack || error.message}`);
  }
}
if (failed) process.exitCode = 1;
