#!/usr/bin/env node
'use strict';
const path = require('node:path');
const adapter = require('./lib/orca-acceptance');
const { optionValue } = require('./goal-control');
function main(args = process.argv.slice(2)) {
  const config = adapter.loadTrust();
  const workerId = optionValue(args, '--worker');
  const binding = config.bindings?.find(item => item.worker_id === workerId);
  if (!binding) throw Error('explicit configured worker required');
  if (args[0] === 'inspect') {
    process.stdout.write(JSON.stringify({ observed: adapter.observeDispatch(config, binding), acceptance: 'not_accepted' }) + '\n');
    return 0;
  }
  if (args[0] !== 'accept') throw Error('expected inspect or accept');
  const stateFile = path.resolve(optionValue(args, '--state'));
  const receiptFile = path.resolve(optionValue(args, '--receipt'));
  const state = require('./lib/coding-execution').load(stateFile);
  const host = require('./lib/coding-execution-runner').pinnedHost(config.host.path, config.host.sha256,
    { plan: state.plan, stateFile });
  adapter.issueAcceptance({ stateFile, workerId, receiptFile, config, host });
  process.stdout.write(JSON.stringify({ accepted: true, receipt: receiptFile }) + '\n');
  return 0;
}
if (require.main === module) {
  try { process.exitCode = main(); }
  catch (error) { process.stderr.write('Orca acceptance refused: ' + error.message + '\n'); process.exitCode = 2; }
}
module.exports = { main };
