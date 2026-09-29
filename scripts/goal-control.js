#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const {
  buildStatus,
  evaluateClaim,
  readJsonLines,
  readStructuredFile,
  validateBundle,
} = require('./lib/goal-control');

const DEFAULT_DIR = path.join('.ecc', 'goal');

function optionValue(args, name, fallback = null) {
  const index = args.indexOf(name);
  if (index < 0) return fallback;
  if (!args[index + 1]) throw new Error(`${name} requires a value`);
  return args[index + 1];
}

function pathsFrom(args) {
  return {
    goal: optionValue(args, '--goal', path.join(DEFAULT_DIR, 'active-goal.yaml')),
    outcomes: optionValue(args, '--outcomes', path.join(DEFAULT_DIR, 'outcomes.jsonl')),
    resume: optionValue(args, '--resume', path.join(DEFAULT_DIR, 'resume-receipt.yaml')),
  };
}

function loadBundle(args) {
  const paths = pathsFrom(args);
  return {
    paths,
    bundle: {
      goal: readStructuredFile(paths.goal),
      outcomes: readJsonLines(paths.outcomes),
      resume: paths.resume && fs.existsSync(path.resolve(paths.resume))
        ? readStructuredFile(paths.resume)
        : null,
    },
  };
}

function help() {
  process.stdout.write(`ECC outcome control\n\nUsage:\n  ecc goal validate [--goal FILE] [--outcomes FILE] [--resume FILE]\n  ecc goal status [--goal FILE] [--outcomes FILE] [--json] [--now ISO]\n  ecc goal claim <complete|blocked|on-track> [--goal FILE] [--outcomes FILE] [--resume FILE] [--json] [--now ISO]\n\nDefaults:\n  goal:     .ecc/goal/active-goal.yaml\n  outcomes: .ecc/goal/outcomes.jsonl\n  resume:   .ecc/goal/resume-receipt.yaml (loaded when present)\n\nThis command is read-only. It validates evidence; it never creates, promotes, or rewrites goal records.\n`);
}

function renderStatus(status) {
  const rows = [
    `Goal: ${status.goal_id}`,
    `Declared status: ${status.declared_status}`,
    `User-visible proofs: ${status.completed_proofs}/${status.required_proofs}`,
    `Forecast: ${status.forecast.state} (${status.forecast.confidence})`,
  ];
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
  const { paths, bundle } = loadBundle(args);
  const nowRaw = optionValue(args, '--now');
  const now = nowRaw ? new Date(nowRaw) : new Date();

  if (command === 'validate') {
    validateBundle(bundle);
    const result = {
      valid: true,
      goal_id: bundle.goal.goal_id,
      outcomes: bundle.outcomes.length,
      resume_receipt: Boolean(bundle.resume),
      paths,
    };
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return 0;
  }

  if (command === 'status') {
    validateBundle(bundle);
    const status = buildStatus(bundle.goal, bundle.outcomes, now);
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

module.exports = { main, optionValue, pathsFrom, renderStatus };
