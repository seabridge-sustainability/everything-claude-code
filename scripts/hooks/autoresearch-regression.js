#!/usr/bin/env node
/**
 * Stop Hook: Autoresearch Regression Harness
 *
 * Fires the SeaBridgeAI autoresearch regression harness at the end of every
 * session when the working directory is inside the manageesg-backend project.
 * Runs asynchronously (detached subprocess) so it never blocks session end.
 *
 * Output is logged to: manageesg-backend/autoresearch/handoff/logs/regression_<date>.log
 */

'use strict';

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const BACKEND_ROOT = 'C:/Users/adelm/SeaBridgeAI/manageesg-backend';
const SEABRIDGE_AI_DIR = path.join(BACKEND_ROOT, 'seabridge_ai');
const LOG_DIR = path.join(BACKEND_ROOT, 'autoresearch', 'handoff', 'logs');

function isBackendProject() {
  const cwd = process.cwd().replace(/\\/g, '/');
  const normalized = BACKEND_ROOT.replace(/\\/g, '/');
  return cwd.startsWith(normalized) || cwd === normalized;
}

function getLogPath() {
  const date = new Date().toISOString().slice(0, 10);
  return path.join(LOG_DIR, `regression_${date}.log`);
}

function run(rawInput) {
  // Only fire when the session is in the backend project
  if (!isBackendProject()) {
    return rawInput;
  }

  // Ensure log directory exists
  try {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  } catch {
    // ignore
  }

  const logPath = getLogPath();
  let logFd;
  try {
    logFd = fs.openSync(logPath, 'a');
  } catch {
    return rawInput;
  }

  const timestamp = new Date().toISOString();
  fs.writeSync(logFd, `\n=== Regression check triggered at ${timestamp} ===\n`);

  // Spawn uv run ... detached so it outlives this hook process
  const child = spawn(
    'uv',
    ['run', 'python', '-m', 'sustainability_ai.ai_agents.autoresearch.regression_harness', '--mock'],
    {
      cwd: SEABRIDGE_AI_DIR,
      detached: true,
      stdio: ['ignore', logFd, logFd],
      shell: false,
      windowsHide: true,
    }
  );

  child.unref();

  fs.closeSync(logFd);

  return rawInput;
}

module.exports = { run };
