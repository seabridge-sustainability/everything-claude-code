#!/usr/bin/env node
'use strict';
// Diagnostic entrypoint only. Mutation requires reviewed parent capabilities
// through workspace-queue-store; no CLI authorization or native launch shortcut.
const { collectFacts } = require('./lib/workspace-live-facts');
function main(args = process.argv.slice(2), { collect = collectFacts, print = console.log } = {}) {
  if (args.length === 1 && args[0] === '--help') {
    print('workspace-queue status: read-only current RAM and ECC owners. No acquire, restart, approval, push or automatic IDE continuation.');
    return 0;
  }
  if (args.length !== 1 || args[0] !== 'status') throw Error('Only workspace-queue status is supported; mutations require a reviewed parent host.');
  print(JSON.stringify({ ...collect(), limitation: 'Read-only facts; service readiness, spending, native adoption and actual process cessation remain separate checks.' }, null, 2));
  return 0;
}
if (require.main === module) {
  try { process.exitCode = main(); }
  catch (error) { console.error('workspace queue: ' + error.message); process.exitCode = 2; }
}
module.exports = { main };
