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

// Gateway hooks do not inherit a client's ECC environment, and their cwd is
// the gateway's process cwd. A parent pins one exact native session before any
// prompt and passes its immutable binding through the consented hook command.
function runBound(payload, bindingFile, bindingSha256, environment = process.env) {
  const blocked = () => ({ output: { action: 'block', message: 'ECC Hermes guard: parent-pinned gateway binding unavailable' }, exit: 2 });
  const previousNodePath = process.env.NODE_PATH;
  let changedNodePath = false;
  try {
    demand(path.isAbsolute(bindingFile || '') && /^[a-f0-9]{64}$/.test(bindingSha256 || ''), 'pinned absolute binding required');
    demand(!fs.lstatSync(bindingFile).isSymbolicLink() && fs.statSync(bindingFile).isFile() && fs.statSync(bindingFile).size <= 16384
      && canonical(bindingFile) === (process.platform === 'win32' ? path.resolve(bindingFile).toLowerCase() : path.resolve(bindingFile)), 'regular binding required');
    const bytes = fs.readFileSync(bindingFile);
    demand(bytes.length <= 16384 && crypto.createHash('sha256').update(bytes).digest('hex') === bindingSha256, 'binding changed');
    const binding = JSON.parse(bytes.toString('utf8'));
    const fields = ['version','nativeSessionId','profileName','profileHome','cwd','sessionId','goalFile','sourceSha256','nodePath'];
    demand(Object.keys(binding).length === fields.length && fields.every(key => Object.hasOwn(binding,key))
      && binding.version === 1 && fields.slice(1).every(key => typeof binding[key] === 'string' && binding[key].trim()), 'exact binding required');
    demand(binding.nativeSessionId.length <= 200 && binding.sourceSha256 === sourceHash(), 'native/source pin required');
    const native = normalize(payload);
    // This exact-session hook grants no protection or approval to other native
    // sessions. They may have their own separately pinned hook definitions.
    if (native.session_id !== binding.nativeSessionId) return { output: {}, exit: 0 };
    demand(payload.profile === binding.profileName && path.isAbsolute(binding.profileHome)
      && environment.HERMES_HOME && canonical(environment.HERMES_HOME) === canonical(binding.profileHome), 'native profile mismatch');
    demand(path.isAbsolute(binding.nodePath) && path.basename(binding.nodePath) === 'node_modules'
      && fs.statSync(binding.nodePath).isDirectory() && !fs.lstatSync(binding.nodePath).isSymbolicLink()
      && canonical(binding.nodePath) === (process.platform === 'win32' ? path.resolve(binding.nodePath).toLowerCase() : path.resolve(binding.nodePath)), 'reviewed existing dependencies required');
    // Process-local resolution only; never install, junction or edit the gateway
    // environment. The immutable parent pin includes this existing dependency path.
    process.env.NODE_PATH = binding.nodePath;
    changedNodePath = true;
    require('node:module').Module._initPaths();
    const coordination = require('../lib/session-coordination');
    const session = coordination.checkSession({ cwd: binding.cwd, sessionId: binding.sessionId });
    for (const authority of [bindingFile,binding.nodePath,__filename]) {
      const relative = path.relative(binding.cwd, authority).replace(/\\/g, '/');
      demand(relative.startsWith('../') || path.isAbsolute(relative)
        || !session.scopes.some(scope => coordination.overlaps(relative,scope)), 'authority overlaps worker write scope');
    }
    demand(session.guard?.nativeSessionId === binding.nativeSessionId, 'parent native binding mismatch');
    // The workspace comes from the parent/controller, never from Path.cwd() in
    // the shared gateway, nor from model-supplied tool arguments.
    return run({ ...payload, cwd: binding.cwd }, { cwd: binding.cwd, sessionId: binding.sessionId,
      goalFile: binding.goalFile, sourceSha256: binding.sourceSha256 });
  } catch { return blocked(); }
  finally {
    if (changedNodePath) {
      if (previousNodePath === undefined) delete process.env.NODE_PATH;
      else process.env.NODE_PATH = previousNodePath;
      require('node:module').Module._initPaths();
    }
  }
}

function main(args = process.argv.slice(2)) {
  let result;
  try {
    const bound = args.length === 5 && args[0] === 'pre' && args[1] === '--binding-file' && args[3] === '--binding-sha256';
    demand(bound || (args.length === 1 && args[0] === 'pre'), 'pre-tool adapter only');
    const raw = fs.readFileSync(0);
    demand(raw.length <= 1024 * 1024, 'bounded hook input required');
    const payload = JSON.parse(raw.toString('utf8'));
    result = bound ? runBound(payload, args[2], args[4]) : run(payload);
  } catch {
    result = { output: { action: 'block', message: 'ECC Hermes guard: malformed or unsupported hook input' }, exit: 2 };
  }
  process.stdout.write(JSON.stringify(result.output) + '\n');
  return result.exit;
}
if (require.main === module) process.exitCode = main();
module.exports = { normalize, run, runBound, main, sourceHash };
