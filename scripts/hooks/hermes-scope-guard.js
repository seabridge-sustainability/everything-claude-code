#!/usr/bin/env node
'use strict';

// Native Hermes shell-hook adapter only. The existing parent-owned controller
// owns scope, identity, goal revision and counters. This adapter grants no trust,
// launches no agent, and does not intercept provider requests or final responses.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const sourceHash = () => crypto.createHash('sha256').update(fs.readFileSync(__filename)).digest('hex');
const canonical = file => {
  const real = fs.realpathSync(file);
  return process.platform === 'win32' ? real.toLowerCase() : real;
};
const demand = (value, reason) => { if (!value) throw Error(reason); };

function normalize(payload) {
  demand(payload && !Array.isArray(payload) && payload.hook_event_name === 'pre_tool_call', 'native pre-tool event required');
  demand(typeof payload.session_id === 'string' && payload.session_id.trim() && payload.session_id.length <= 200,
    'native session identity required');
  demand(typeof payload.cwd === 'string' && path.isAbsolute(payload.cwd), 'native workspace required');
  const input = payload.tool_input;
  const base = { session_id: payload.session_id, cwd: payload.cwd };
  // Unreviewed/malformed operations still reach the controller as opaque tools:
  // in-cap policy-denied attempts consume the same cumulative tool budget.
  const opaque = () => ({ ...base, tool_name: 'HermesUnreviewedTool', tool_input: {} });
  if (!input || typeof input !== 'object' || Array.isArray(input)) return opaque();
  // Map only single-path native file operations. Hermes's unified/multi-file
  // patch modes and all execution/transport tools need their own reviewed fence.
  if (typeof input.path !== 'string' || !input.path.trim()) return opaque();
  for (const alias of ['file_path', 'filePath', 'target', 'target_file']) {
    if (Object.hasOwn(input, alias) && input[alias] !== input.path) return opaque();
  }
  if (Object.hasOwn(input, 'paths')) return opaque();
  let tool;
  if (payload.tool_name === 'read_file') tool = 'Read';
  else if (payload.tool_name === 'write_file') {
    if (typeof input.content !== 'string') return opaque();
    tool = 'Write';
  } else if (payload.tool_name === 'patch') {
    if (!((input.mode === undefined || input.mode === 'replace')
      && typeof input.old_string === 'string' && typeof input.new_string === 'string'
      && !Object.hasOwn(input, 'patch'))) return opaque();
    tool = 'Edit';
  } else return opaque();
  return { ...base, tool_name: tool,
    tool_input: { ...input, file_path: input.path } };
}

function run(payload, options = {}) {
  const blocked = reason => ({ output: { action: 'block', message: 'ECC Hermes guard: ' + reason }, exit: 2 });
  try {
    const cwd = options.cwd || process.env.ECC_OWNED_WORKTREE;
    const sessionId = options.sessionId || process.env.ECC_SESSION_ID;
    const goalFile = options.goalFile || process.env.ECC_HERMES_GOAL_FILE;
    const expected = options.sourceSha256 || process.env.ECC_HERMES_GUARD_SHA256;
    demand(cwd && path.isAbsolute(cwd) && sessionId && goalFile && path.isAbsolute(goalFile), 'explicit parent bindings required');
    demand(/^[a-f0-9]{64}$/.test(expected || '') && sourceHash() === expected, 'reviewed adapter pin required');
    const native = normalize(payload);
    demand(canonical(native.cwd) === canonical(cwd), 'native workspace mismatch');
    // Lazy loading preserves an exit-2 block even if the engine/dependencies fail.
    const coordination = require('../lib/session-coordination');
    const session = coordination.checkSession({ cwd, sessionId });
    demand(session.guard?.mode === 'block' && session.guard.goalReference?.file
      && canonical(session.guard.goalReference.file) === canonical(goalFile), 'exact parent goal guard required');
    const result = coordination.execute('guard-event', { cwd, sessionId, guardMode: 'block', event: 'pre', payload: native });
    if (result.allowed !== true || result.wouldDeny !== false) return blocked(result.reason || 'controller refused tool');
    // Hermes treats an empty successful directive as no veto. It has no
    // auto-allow directive; do not synthesize action:approve or change arguments.
    return { output: {}, exit: 0 };
  } catch {
    // Never echo tool arguments, file content, credential paths or parser errors.
    return blocked('identity, goal, source pin, typed tool or controller unavailable');
  }
}

function main(args = process.argv.slice(2)) {
  let result;
  try {
    demand(args.length === 1 && args[0] === 'pre', 'pre-tool adapter only');
    const raw = fs.readFileSync(0);
    demand(raw.length <= 1024 * 1024, 'bounded hook input required');
    result = run(JSON.parse(raw.toString('utf8')));
  } catch {
    result = { output: { action: 'block', message: 'ECC Hermes guard: malformed or unsupported hook input' }, exit: 2 };
  }
  process.stdout.write(JSON.stringify(result.output) + '\n');
  return result.exit;
}
if (require.main === module) process.exitCode = main();
module.exports = { normalize, run, main, sourceHash };
