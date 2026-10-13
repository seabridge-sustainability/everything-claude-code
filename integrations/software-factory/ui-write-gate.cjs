'use strict';
const path=require('node:path'),fs=require('node:fs');
const {execFileSync}=require('node:child_process');
const contracts=require('./ui-contract.cjs');
const {repository,typedAction,normalizeToolPath}=require('../../scripts/lib/session-coordination');
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function frontend(cwd){
  const normalize=value=>process.platform==='win32'?path.resolve(value).toLowerCase():path.resolve(value);
  if(normalize(cwd)!==normalize(contracts.FRONT))return false;
  return fs.realpathSync(cwd)===fs.realpathSync(contracts.FRONT);
}
function validateBinding(binding){
  if(!binding||typeof binding.admission!=='string'||!Array.isArray(binding.receipts)||!binding.receipts.length||binding.receipts.length>16)throw Error('UI writes require a reviewed source-bound admission and before evidence');
  const packet=contracts.readAdmission(binding.admission);
  if(binding.contractSha256!==packet.contractSha256)throw Error('UI contract binding changed');
  const entry=path.join(__dirname,'ui-browser.mjs');
  const code="import {pathToFileURL} from 'node:url';const m=await import(pathToFileURL(process.argv[1]));console.log(JSON.stringify(m.validateBeforeEvidence(JSON.parse(process.argv[2]))));";
  const result=JSON.parse(execFileSync(process.execPath,['--input-type=module','-e',code,entry,JSON.stringify({admission:binding.admission,receipts:binding.receipts})],{encoding:'utf8',windowsHide:true,timeout:10000,maxBuffer:64000,stdio:['ignore','pipe','pipe']}));
  if(result.verdict!=='PASS')throw Error('Before browser verification failed');
  return packet;
}
function prepareUI(cwd,scopes,request){
  if(!frontend(cwd)||!scopes.some(p=>/^src\/(?:app|components)(?:\/|$)|\.css$|^tailwind\.config\./i.test(p)))return null;
  const packet=request&&contracts.readAdmission(request.admission);
  const binding=request?{admission:request.admission,receipts:request.receipts,contractSha256:packet.contractSha256}:null;
  validateBinding(binding);
  if(!same(packet.source,contracts.sourceState(packet.contract)))throw Error('UI source changed before managed launch');
  return binding;
}
function checkUI(cwd,payload,binding){
  if(!frontend(cwd))return {required:false};
  const action=typedAction(payload);if(action.operation==='read')return {required:false};
  const repo=repository(cwd),files=action.paths.map(p=>normalizeToolPath(repo,p,cwd));
  if(!contracts.changedUIPaths(files).length)return {required:false};
  const packet=validateBinding(binding);
  for(const file of contracts.changedUIPaths(files))if(!packet.contract.files.some(p=>p.toLowerCase()===file.toLowerCase()))throw Error('UI write outside reviewed specification');
  return {required:true,contractSha256:packet.contractSha256};
}
module.exports={prepareUI,checkUI,validateBinding};
