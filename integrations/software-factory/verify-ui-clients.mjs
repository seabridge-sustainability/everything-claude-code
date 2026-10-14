import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { require } from '../dev-suite/runtime.mjs';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const {Client}=require('@modelcontextprotocol/sdk/client/index.js');
const {StdioClientTransport}=require('@modelcontextprotocol/sdk/client/stdio.js');
const toml=require('@iarna/toml'),jsonc=require('jsonc-parser');
const configs=[['Claude','.claude.json','mcpServers'],['Gemini','.gemini/settings.json','mcpServers'],['Antigravity','.gemini/config/mcp_config.json','mcpServers'],['OpenCode','.config/opencode/opencode.json','mcp'],['VS Code','AppData/Roaming/Code/User/mcp.json','servers'],['Cursor','.cursor/mcp.json','mcpServers'],['Codex','.codex/config.toml','mcp_servers']];
const results=[];
for(const [host,file,key]of configs){
  const raw=fs.readFileSync(path.join(os.homedir(),file),'utf8'),cfg=file.endsWith('.toml')?toml.parse(raw):jsonc.parse(raw.replace(/^\uFEFF/,''));
  const name=cfg[key]?.['seabridge-dev-suite']?'seabridge-dev-suite':'seabridge-pstack',server=cfg[key]?.[name];
  assert.ok(server&&server.enabled!==false,host+' enabled registration');
  const command=Array.isArray(server.command)?server.command[0]:server.command,args=Array.isArray(server.command)?server.command.slice(1):server.args;
  assert.equal(path.resolve(command),path.resolve(process.execPath));
  assert.equal(path.resolve(args[0]),path.join(ROOT,name==='seabridge-dev-suite'?'integrations/dev-suite/cli.mjs':'integrations/pstack/cli.mjs'));
  assert.deepEqual(args.slice(1),['mcp']);
  const client=new Client({name:'ecc-ui-registration-proof',version:'1.0.0'});
  try{
    await client.connect(new StdioClientTransport({command,args,env:{...process.env,...server.env},stderr:'pipe'}),{timeout:15000});
    const tool=name==='seabridge-dev-suite'?'suite_factory':'pstack_factory';
    const features=await client.callTool({name:tool,arguments:{operation:'ui-features'}},undefined,{timeout:15000});assert.ok(!features.isError,host+' feature manifest');
    assert.ok(JSON.parse(features.content[0].text).features.some(x=>x.id==='authentication'));
    const vague=await client.callTool({name:tool,arguments:{operation:'ui-admit',contract:{}}},undefined,{timeout:15000});assert.equal(vague.isError,true);assert.match(vague.content[0].text,/Incomplete UI specification/);
    const c=await client.callTool({name:tool,arguments:{operation:'ui-image',file:'C:/not-real.png',admission:'C:/not-real.json'}},undefined,{timeout:15000});assert.equal(c.isError,true);assert.match(c.content[0].text,/D-only browser evidence/);
    results.push({host,server:name,registrationSha256:crypto.createHash('sha256').update(raw).digest('hex'),sdkStdioProof:true,uiFeatureDiscovery:true,incompleteSpecDenied:true,cMediaDenied:true,nativeAgentInvocationProved:false,calls:3});
  }finally{await client.close();}
}
const calls=results.reduce((sum,result)=>sum+result.calls,0);
const receipt={checkedAt:new Date().toISOString(),results,calls,providerCalls:0,newServices:0,restartedSessions:0,nativeAgentInvocationProved:false,limitation:'Saved registrations exercised through MCP SDK. Separate native client/model/vision and authenticated product proofs are required.'};
const output=path.join(ROOT,'artifacts/agent-runs/pstack/engineering-skills/ui-workflow-audit-20261013','ui-clients-'+Date.now()+'.json');fs.writeFileSync(output,JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify({clients:results.length,calls,providerCalls:0,output}));
