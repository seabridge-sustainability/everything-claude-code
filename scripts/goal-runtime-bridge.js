#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const {
  admissionDecision,
  classifyTaskText,
  inferClaim,
  loadCapabilities,
  runtimeById,
  validateCapabilities,
} = require('./lib/goal-runtime');

const GOAL_CLI = path.join(__dirname, 'goal-control.js');

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
  const preferred = ['last_assistant_message', 'assistant_response', 'response', 'prompt', 'message', 'text'];
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
  const goalDir = optionValue(args, '--dir', path.join('.ecc', 'goal'));
  const goalPath = optionValue(args, '--goal', path.join(goalDir, 'active-goal.yaml'));
  const model = optionValue(args, '--model');

  if (command === 'admit') {
    const suppliedText = optionValue(args, '--text', hookText(readStdin()));
    let mode = optionValue(args, '--mode', 'auto');
    if (mode === 'auto') mode = fs.existsSync(path.resolve(goalPath)) ? 'controlled' : classifyTaskText(suppliedText).mode;
    const goalExists = fs.existsSync(path.resolve(goalPath));
    let goalValid = false;
    let validationError = null;
    if (goalExists) {
      const result = runGoal(['validate', '--goal', goalPath, '--dir', goalDir]);
      goalValid = result.status === 0;
      validationError = goalValid ? null : (result.stderr || result.stdout).trim();
    }
    const decision = admissionDecision({ runtimeId, mode, goalExists, goalValid, model }, capabilities);
    if (validationError) decision.validation_error = validationError;
    process.stdout.write(`${JSON.stringify(decision, null, 2)}\n`);
    return decision.admitted ? 0 : 2;
  }

  if (command === 'final' || command === 'final-hook') {
    const text = optionValue(args, '--text', hookText(readStdin()));
    const claim = optionValue(args, '--claim', inferClaim(text));
    if (!claim) {
      process.stdout.write(`${JSON.stringify({ checked: false, runtime: runtimeId, model, reason: 'no status claim detected' })}\n`);
      return 0;
    }
    if (!fs.existsSync(path.resolve(goalPath))) {
      process.stderr.write(`goal runtime: ${claim} claim requires ${goalPath}\n`);
      return 2;
    }
    const result = runGoal(['claim', claim, '--goal', goalPath, '--dir', goalDir, '--json']);
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

module.exports = { hookText, main, optionValue, readStdin, runGoal };
