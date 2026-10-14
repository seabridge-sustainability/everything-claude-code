#!/usr/bin/env node
'use strict';
const engine = require('./lib/coding-execution');
const runner = require('./lib/coding-execution-runner');
async function main(args = process.argv.slice(2)) {
  if (args.length===1 && args[0]==='--help') { console.log('coding-execution-run STATE_JSON REVIEWED_HOST_JS HOST_SHA256; no default approval/provider/critic authorizers; automatic bounded recovery on invocation'); return; }
  if (args.length !== 3) throw Error('coding-execution-run STATE_JSON REVIEWED_HOST_JS HOST_SHA256');
  const [file, hostFile, hash] = args;
  const context={stateFile:file,plan:engine.load(file).plan};
  const host = runner.pinnedHost(hostFile, hash, context);
  const result = await runner.runWithQueue(file, host, context);
  console.log(JSON.stringify({phase:result.state.phase,stopped:result.stopped,sequence:result.state.sequence,
    iterations:result.transitions,...(result.queue?{queue:result.queue}:{})}));
  return result;
}
if (require.main === module) main().catch(error => { console.error(`coding execution host: ${error.message}`); process.exitCode = 2; });
module.exports = { main };
