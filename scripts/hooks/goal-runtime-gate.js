#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const MAX_INPUT_BYTES = 1024 * 1024;

function readInput() {
  if (process.stdin.isTTY) return '';
  return fs.readFileSync(0).subarray(0, MAX_INPUT_BYTES).toString('utf8');
}

function payloadModel(raw) {
  try {
    const payload = JSON.parse(raw || '{}');
    return typeof payload.model === 'string'
      ? payload.model
      : typeof payload._cursor?.model === 'string'
        ? payload._cursor.model
        : null;
  } catch {
    return null;
  }
}

function main(args = process.argv.slice(2), raw = readInput()) {
  const runtime = args[0];
  const phase = args[1];
  if (!runtime || !['admit', 'final'].includes(phase)) {
    process.stderr.write('goal runtime hook requires <runtime> <admit|final>\n');
    return 2;
  }

  const bridge = path.resolve(__dirname, '..', 'goal-runtime-bridge.js');
  const bridgeArgs = [bridge, phase === 'final' ? 'final-hook' : 'admit', '--runtime', runtime];
  if (phase === 'admit') bridgeArgs.push('--mode', 'auto');
  const model = payloadModel(raw);
  if (model) bridgeArgs.push('--model', model);

  const result = spawnSync(process.execPath, bridgeArgs, {
    cwd: process.cwd(),
    input: raw,
    encoding: 'utf8',
    timeout: 30000,
    windowsHide: true,
  });
  if (result.status === 0) return 0;

  const diagnostic = [result.stderr, result.stdout]
    .filter(value => typeof value === 'string' && value.trim())
    .join('\n');
  process.stderr.write(`${diagnostic || 'goal runtime gate could not verify this action'}\n`);
  return 2;
}

function run(raw, context = {}) {
  const hookId = String(context.hookId || process.env.ECC_HOOK_ID || '');
  const phase = hookId === 'stop:goal-runtime-final' ? 'final' : 'admit';
  return { exitCode: main(['claude', phase], raw), stdout: '' };
}

if (require.main === module) process.exitCode = main();

module.exports = { MAX_INPUT_BYTES, main, payloadModel, readInput, run };
