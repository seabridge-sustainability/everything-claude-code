#!/usr/bin/env node
'use strict';
const fs=require('node:fs');
async function main(){
  const [operation,file]=process.argv.slice(2);let request={};
  if(file){
    if(file==='-')throw Error('Use a bounded regular request file');
    const stat=fs.lstatSync(file);if(!stat.isFile()||stat.isSymbolicLink()||stat.size>64000)throw Error('Bounded regular request required');
    request=JSON.parse(fs.readFileSync(file,'utf8'));
  }
  const c=require('../integrations/software-factory/ui-contract.cjs'),s=require('./lib/browser-evidence');let result;
  if(operation==='doctor')result={...s.disk(),modelCalls:0,applicationStarts:0};
  else if(operation==='features')result=c.features();
  else if(operation==='admit')result=c.admit(request.contract);
  else if(operation==='capture')result=await(await import('../integrations/software-factory/ui-browser.mjs')).capture(request);
  else if(operation==='validate')result=(await import('../integrations/software-factory/ui-browser.mjs')).validateEvidence(request);
  else throw Error('Usage: browser-evidence doctor | features | admit|capture|validate request.json');
  process.stdout.write(JSON.stringify(result,null,2)+'\n');if(result.verdict==='FAIL')process.exitCode=1;
}
main().catch(error=>{process.stderr.write('Browser verification BLOCKED: '+error.message+'\n');process.exitCode=2;});
