#!/usr/bin/env node
'use strict';
const path = require('path');
const { loadCapabilities } = require('./lib/goal-runtime');

// Print reviewable opt-in fragments. Never change a client, trust store or process.
function configuration(runtime, mode = 'audit', root = path.resolve(__dirname, '..')) {
  if (!loadCapabilities().runtimes.some(item => item.id === runtime)) throw new Error('unknown instruction adapter');
  if (!['audit', 'block'].includes(mode)) throw new Error('mode must be audit or block');
  const command = event => `node "${path.join(root, 'scripts/hooks/goal-runtime-gate.js').replace(/\\/g, '/')}" ${runtime} guard ${mode} ${event}`;
  if (['claude', 'codex', 'gemini'].includes(runtime)) {
    const pre = runtime === 'gemini' ? 'BeforeTool' : 'PreToolUse';
    const final = runtime === 'gemini' ? 'AfterAgent' : 'Stop';
    return { hooks: {
      [pre]: [{ matcher: runtime === 'gemini' ? '.*' : '*', hooks: [{ type: 'command', command: command('pre'), timeout: runtime === 'gemini' ? 10000 : 10 }] }],
      [final]: [{ hooks: [{ type: 'command', command: command('final'), timeout: runtime === 'gemini' ? 10000 : 10 }] }],
    } };
  }
  if (runtime === 'opencode') return { kind: 'fresh-process-launch-requirements', plugin: '.opencode/plugins/ecc-scope-guard.ts',
    environment: { ECC_SCOPE_GUARD_ROOT: root, ECC_SCOPE_GUARD_MODE: mode, ECC_SESSION_ID: '<registered-session>' },
    limitation: 'Pre-tool interception only. Use explicit goal-runtime admission/final wrappers; idle notification is not a completion gate.' };
  return { kind: 'instruction-and-wrapper-fallback', runtime,
    admission: ['node', path.join(root, 'scripts/goal-runtime-bridge.js'), 'admit', '--runtime', runtime, '--mode', 'controlled', '--session', '<registered-session>'],
    final: ['node', path.join(root, 'scripts/goal-runtime-bridge.js'), 'final', '--runtime', runtime, '--claim', '<claim>', '--session', '<registered-session>'],
    limitation: 'Instruction loading and explicit wrappers do not intercept native tools. Do not claim block protection without a verified native adapter.' };
}
if (require.main === module) {
  try { process.stdout.write(JSON.stringify(configuration(process.argv[2], process.argv[3]), null, 2) + '\n'); }
  catch (error) { process.stderr.write(error.message + '\n'); process.exitCode = 2; }
}
module.exports = { configuration };
