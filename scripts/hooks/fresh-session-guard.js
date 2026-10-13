#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
function run(runtime, event, payload, options = {}) {
  let result;
  try {
    const { guard } = require('../lib/fresh-session-guard');
    result = guard({ cwd: options.cwd || process.env.ECC_OWNED_WORKTREE || process.cwd(),
      sessionId: options.sessionId || process.env.ECC_SESSION_ID,
      policyRoot: options.policyRoot || process.env.ECC_CORE_POLICY_ROOT,
      configFile: options.configFile || process.env.ECC_FRESH_SESSION_CONFIG,
      runtime, payload }, event);
  } catch { result = { allowed: false, wouldDeny: true, reason: 'fresh-session preflight not admitted; check current goal, ownership, config and identity' }; }
  if (result.allowed && !result.wouldDeny) {
    if (runtime === 'antigravity') return { output: event === 'pre' ? { decision: 'allow' } : {}, exit: 0 };
    return { output: event === 'startup' ? { systemMessage: 'ECC fresh-session allowed/blocked preflight passed; opaque shell/cloud tools remain denied.',
      ...(['codex','claude'].includes(runtime)?{hookSpecificOutput:{hookEventName:'SessionStart',additionalContext:result.additionalContext}}:{}) } : null, exit: 0 };
  }
  const reason = 'ECC: ' + result.reason;
  if (runtime === 'antigravity') return { output: { decision: 'deny', reason }, exit: 0 };
  // Keep native denials dependency-free: module-load failure must not become
  // exit 1 (warning/fail-open in several clients).
  if (event === 'startup') return { output: { systemMessage: reason }, exit: 2 };
  if (runtime === 'gemini') return { output: { decision: 'deny', reason }, exit: 0 };
  if (['claude','codex'].includes(runtime)) return { output: event === 'pre'
    ? { hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason } }
    : { decision: 'block', reason }, exit: 0 };
  return { output: null, exit: 2 };
}
function main(args = process.argv.slice(2)) {
  let payload;
  try { const raw = fs.readFileSync(0); if (raw.length > 1024 * 1024) throw Error('oversized'); payload = JSON.parse(raw.toString('utf8')); }
  catch { payload = null; }
  const result = run(args[0], args[1], payload);
  if (result.output) process.stdout.write(JSON.stringify(result.output) + '\n');
  return result.exit;
}
if (require.main === module) process.exitCode = main();
module.exports = { run, main };
