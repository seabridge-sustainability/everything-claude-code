#!/usr/bin/env node
'use strict';
// A consumer of Second Brain's four-tool proxy, NOT another retrieval engine.
// The reviewed proxy reads its token locally; this process never reads it.
const fs=require('node:fs'),path=require('node:path');
const {spawn}=require('node:child_process');
const {pin}=require('./lib/coding-execution-host');
const {digest,assert:assertContract}=require('./lib/coding-execution');
function matches(ref,result){
  try{assertContract('citation',ref);}catch{return false;}
  const hit=result?.chunk??result?.hit??result;
  return ref.scope==='engineering:seabridge-code' && hit &&
    ['source_id','version','citation','source_revision','line_start','line_end','chunk_id','policy_epoch'].every(key=>hit[key]===ref[key]);
}
async function authorize(ref,config){
  try{assertContract('citation',ref);}catch{return false;}
  if(config?.scope!=='engineering:seabridge-code')return false;
  const python=pin(config.python),proxy=pin(config.proxy);
  for(const dependency of config.dependency_pins||[])pin(dependency);
  const url=new URL(config.url);
  if(url.protocol!=='http:'||url.hostname!=='127.0.0.1'||!url.port||url.pathname!=='/mcp'||url.search||url.hash||url.username||url.password)throw Error('explicit loopback proxy required');
  if(!path.isAbsolute(config.token_file))throw Error('absolute local token reference required');
  const child=spawn(python,['-I',proxy,'--url',config.url,'--token-file',config.token_file],{windowsHide:true,stdio:['pipe','pipe','pipe']});
  child.stderr.resume(); // Do not log auth-bearing transport diagnostics.
  return new Promise((resolve,reject)=>{
    let pending='',settled=false;
    const finish=(value,error)=>{if(settled)return;settled=true;clearTimeout(timer);child.stdin.end();child.kill();error?reject(error):resolve(value);};
    const timer=setTimeout(()=>finish(false),25000);
    const send=value=>child.stdin.write(JSON.stringify(value)+'\n');
    child.on('error',()=>finish(false));child.on('exit',()=>finish(false));
    child.stdin.on('error',()=>finish(false));
    child.stdout.on('data',data=>{
      pending+=data.toString('utf8');if(Buffer.byteLength(pending)>1024*1024)return finish(false);
      let index;
      while((index=pending.indexOf('\n'))!==-1){
        const line=pending.slice(0,index);pending=pending.slice(index+1);
        let message;try{message=JSON.parse(line);}catch{return finish(false);}
        if(message.id===1){
          if(message.error)return finish(false);
          send({jsonrpc:'2.0',method:'notifications/initialized'});
          send({jsonrpc:'2.0',id:2,method:'tools/call',params:{name:'memory_fetch',arguments:{request:{chunk_id:ref.chunk_id}}}});
        }else if(message.id===2){
          if(message.error||message.result?.isError)return finish(false);
          finish(matches(ref,message.result?.structuredContent));
        }
      }
    });
    send({jsonrpc:'2.0',id:1,method:'initialize',params:{protocolVersion:'2025-03-26',capabilities:{},clientInfo:{name:'ecc-controller-citation-verifier',version:'1'}}});
  });
}
async function main(){
  const file=process.env.ECC_EXECUTION_MEMORY_CONFIG,sha256=process.env.ECC_EXECUTION_MEMORY_CONFIG_SHA256;
  pin({path:file,sha256});
  const input=fs.readFileSync(0);if(input.length>16384)throw Error('oversized citation');
  const ref=JSON.parse(input.toString('utf8')),authorized=await authorize(ref,JSON.parse(fs.readFileSync(file,'utf8')));
  console.log(JSON.stringify({authorized,citation_sha256:digest(ref),observed_at:new Date().toISOString()}));
}
if(require.main===module)main().catch(()=>{console.log(JSON.stringify({authorized:false}));process.exitCode=2;});
module.exports={authorize,matches,main};
