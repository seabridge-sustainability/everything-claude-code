#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const { guard } = require('../lib/fresh-session-guard');
const { denialOutput } = require('../lib/scope-guard-adapters');
function run(runtime, event, payload, options = {}) {
  let result;
  try {
    result = guard({ cwd: options.cwd || process.env.ECC_OWNED_WORKTREE || process.cwd(),
      sessionId: options.sessionId || process.env.ECC_SESSION_ID,
      policyRoot: options.policyRoot || process.env.ECC_CORE_POLICY_ROOT,
      configFile: options.configFile || process.env.ECC_FRESH_SESSION_CONFIG,
      runtime, payload }, event);
  } catch { result = { allowed: false, wouldDeny: true, reason: 'fresh-session preflight not admitted; check current goal, ownership, config and identity' }; }
  if (result.allowed && !result.wouldDeny) {
    if (runtime === 'antigravity') return { output: event === 'pre' ? { decision: 'allow' } : {}, exit: 0 };
    return { output: event === 'startup' ? { systemMessage: 'ECC fresh-session allowed/blocked preflight passed; opaque shell/cloud tools remain denied.' } : null, exit: 0 };
  }
  const reason = 'ECC: ' + result.reason;
  if (runtime === 'antigravity') return { output: { decision: 'deny', reason }, exit: 0 };
  return { output: event === 'startup' ? { systemMessage: reason } : denialOutput(runtime, event, reason), exit: event === 'startup' || runtime === 'opencode' ? 2 : 0 };
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
