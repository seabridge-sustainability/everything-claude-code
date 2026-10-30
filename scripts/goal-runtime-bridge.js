#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const {
  admissionDecision,
  classifyTaskText,
  inferClaim,
  completionIntent,
  requireSupervisedIntent,
  loadCapabilities,
  runtimeById,
  validateCapabilities,
} = require('./lib/goal-runtime');

const GOAL_CLI = path.join(__dirname, 'goal-control.js');
const { checkSession, execute } = require('./lib/session-coordination');

function optionValue(args, name, fallback = null) {
  const index = args.indexOf(name);
  if (index < 0) return fallback;
  if (!args[index + 1]) throw new Error(`${name} requires a value`);
  return args[index + 1];
}

function readStdin() {
  if (process.stdin.isTTY) return '';
  return fs.readFileSync(0, 'utf8');
}

function hookText(payload) {
  if (!payload) return '';
  let value;
  try {
    value = JSON.parse(payload);
  } catch {
    return payload;
  }
  const preferred = ['last_assistant_message', 'assistant_response', 'response', 'prompt_response', 'prompt', 'message', 'text'];
  const found = [];
  function visit(item, key = '') {
    if (typeof item === 'string' && preferred.includes(key)) found.push(item);
    else if (Array.isArray(item)) item.forEach(child => visit(child, key));
    else if (item && typeof item === 'object') Object.entries(item).forEach(([childKey, child]) => visit(child, childKey));
  }
  visit(value);
  return found.join('\n');
}

function runGoal(args, cwd = process.cwd()) {
  return spawnSync(process.execPath, [GOAL_CLI, ...args], { cwd, encoding: 'utf8' });
}

function evidenceArgs(args) {
  const result = [];
  for (let index = 0; index < args.length; index += 1) {
    if (!['--evidence-root', '--evidence-map', '--ui-review'].includes(args[index])) continue;
    if (!args[index + 1] || args[index + 1].startsWith('--')) throw new Error(`${args[index]} requires a value`);
    result.push(args[index], args[index + 1]);
    index += 1;
  }
  return result;
}

function main(args = process.argv.slice(2)) {
  const command = args[0] || 'capabilities';
  const capabilities = loadCapabilities();
  const errors = validateCapabilities(capabilities);
  if (errors.length) throw new Error(`invalid runtime capability registry: ${errors.join('; ')}`);
  if (command === 'capabilities') {
    process.stdout.write(`${JSON.stringify(capabilities, null, 2)}\n`);
    return 0;
  }

  const runtimeId = optionValue(args, '--runtime');
  if (!runtimeId) throw new Error(`${command} requires --runtime`);
  runtimeById(runtimeId, capabilities);
  // Reuse the goal CLI's resolver so a named goal cannot silently borrow the
  // default folder's outcomes, assignments or resume receipt.
  const { directory: goalDir, goal: goalPath } = require('./goal-control').pathsFrom(args);
  const model = optionValue(args, '--model');
  const sessionId = optionValue(args, '--session', process.env.ECC_SESSION_ID);
  const artifactArgs = evidenceArgs(args);

  if (command === 'admit') {
    const suppliedText = optionValue(args, '--text', hookText(readStdin()));
    let mode = optionValue(args, '--mode', 'auto');
    if (!['auto', 'controlled', 'standard', 'lightweight'].includes(mode)) throw new Error('invalid task mode');
    if (mode === 'auto') mode = fs.existsSync(path.resolve(goalPath)) ? 'controlled' : classifyTaskText(suppliedText).mode;
    const goalExists = fs.existsSync(path.resolve(goalPath));
    if (goalExists) mode = 'controlled'; // An active controlled goal cannot be downgraded by a wrapper flag.
    let goalValid = false;
    let validationError = null;
    if (goalExists) {
      const result = runGoal(['validate', '--goal', goalPath, '--dir', goalDir, ...artifactArgs]);
      goalValid = result.status === 0;
      validationError = goalValid ? null : (result.stderr || result.stdout).trim();
    }
    const decision = admissionDecision({ runtimeId, mode, goalExists, goalValid, model }, capabilities);
    if (decision.admitted && mode === 'controlled') {
      try {
        decision.session = checkSession({ sessionId }).id;
      } catch (error) {
        decision.admitted = false;
        decision.reason = `session coordination: ${error.message}`;
        decision.next_action = 'Register task write scopes in an approved owned checkout with ecc session register, then pass --session or ECC_SESSION_ID. Central rule 3 covers bounded detached integration slots; only uncovered paths or new branches require new approval. Preserve other owners and continue independent work.';
      }
    }
    if (validationError) decision.validation_error = validationError;
    process.stdout.write(`${JSON.stringify(decision, null, 2)}\n`);
    return decision.admitted ? 0 : 2;
  }

  if (command === 'final' || command === 'final-hook') {
    const raw = readStdin();
    const text = optionValue(args, '--text', hookText(raw));
    let payload = {};
    try { payload = JSON.parse(raw || '{}'); } catch { /* Legacy text is advisory only. */ }
    const intent = completionIntent(payload);
    if (fs.existsSync(path.resolve(goalPath))) {
      const goals = require('./lib/goal-control');
      const goal = goals.readStructuredFile(path.resolve(goalPath));
      const assignments = goals.readJsonLines(path.resolve(goalDir, 'assignments.jsonl'));
      requireSupervisedIntent(goals.admissionForGoal(goal, assignments), intent);
    }
    if (intent) {
      const goal = require('./lib/goal-control').readStructuredFile(path.resolve(goalPath));
      const { goalContractDigest } = require('./lib/goal-control');
      if (typeof goalContractDigest !== 'function' || intent.goal_id !== goal.goal_id
          || intent.session_id !== sessionId || intent.contract_sha256 !== goalContractDigest(goal)) {
        throw new Error('structured completion goal/session/contract binding mismatch');
      }
      const session = checkSession({ sessionId });
      if (session.guard?.goalReference?.file
          && path.resolve(session.guard.goalReference.file) !== path.resolve(goalPath)) {
        throw new Error('structured completion selected a different bound goal');
      }
    }
    const inferred = inferClaim(text);
    // Structured completion is always checked, including unfamiliar wording.
    // Ending a progress turn never promotes acceptance or a completed badge.
    const claim = intent?.intent === 'complete' ? 'complete'
      : optionValue(args, '--claim', inferred);
    if (!claim) {
      process.stdout.write(`${JSON.stringify({ checked: !!intent, runtime: runtimeId, model,
        acceptance: 'not_accepted', turn_intent: intent?.intent || 'unclassified',
        reason: intent ? 'non-completion turn; goal acceptance unchanged' : 'no structured completion; no acceptance granted' })}\n`);
      return 0;
    }
    if (!fs.existsSync(path.resolve(goalPath))) {
      process.stderr.write(`goal runtime: ${claim} claim requires ${goalPath}\n`);
      return 2;
    }
    try {
      const session = checkSession({ sessionId });
      if (session.guard) execute('check-changes', { sessionId });
    }
    catch (error) {
      process.stderr.write(`session coordination: ${error.message}\n`);
      return 2;
    }
    const result = runGoal(['claim', claim, '--goal', goalPath, '--dir', goalDir, '--json', ...artifactArgs]);
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    return result.status === null ? 1 : result.status;
  }

  throw new Error(`unknown runtime bridge command: ${command}`);
}

if (require.main === module) {
  try {
    process.exitCode = main();
  } catch (error) {
    process.stderr.write(`goal runtime: ${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = { evidenceArgs, hookText, main, optionValue, readStdin, runGoal };
