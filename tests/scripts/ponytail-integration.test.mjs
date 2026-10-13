import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, collectDebt, sourceIntegrity } from '../../integrations/ponytail/runtime.mjs';
import { require, catalog, findWorkflow, readEntry } from '../../integrations/dev-suite/runtime.mjs';
import { indexPonytail } from '../../integrations/ponytail/catalog.mjs';
import { indexPstack } from '../../integrations/pstack/catalog.mjs';
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');
const jsonc=require('jsonc-parser'),toml=require('@iarna/toml');
async function fixture() {
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'ecc-ponytail-'));
  execFileSync('git',['init','--quiet',root],{windowsHide:true});
  await fs.writeFile(path.join(root,'.gitignore'),'ignored.py\n');
  await fs.writeFile(path.join(root,'sample.py'),'# shortcut: cache bounded at 100 items, upgrade when users exceed 100\n# ponytail: deferred old workaround\n# shortcut: api_key=sk-example-sensitive-token-value\n');
  await fs.writeFile(path.join(root,'ignored.py'),'# shortcut: ignored content\n');
  await fs.writeFile(path.join(root,'.env.py'),'# shortcut: secret content\n');
  execFileSync('git',['-C',root,'add','.gitignore','sample.py'],{windowsHide:true});
  execFileSync('git',['-C',root,'-c','user.name=Fixture','-c','user.email=fixture@example.invalid','commit','--quiet','-m','Fixture'],{windowsHide:true});
  return root;
}
async function cleanup(root){const absolute=path.resolve(root),temp=await fs.realpath(os.tmpdir()),resolved=await fs.realpath(root);if(path.dirname(resolved)!==temp||!path.basename(absolute).startsWith('ecc-ponytail-'))throw Error('Fixture cleanup outside expected temporary scope');await fs.rm(absolute,{recursive:true,force:true});}
test('complete pinned source verifies every Git blob and SHA256',async()=>assert.equal((await sourceIntegrity()).files,202));
test('Ponytail requests choose one primary; generic workflows and Pstack keep existing routes',async()=>{
  for(const [query,name] of [['ponytail full','ponytail'],['ponytail review backend','ponytail-review'],['ponytail audit','ponytail-audit'],['ponytail debt','ponytail-debt'],['ponytail gain','ponytail-gain'],['ponytail help','ponytail-help']]){
    const found=await findWorkflow({query});assert.equal(found[0].id,'ponytail/ecc/'+name);assert.equal(found.filter(e=>e.routingRole==='primary').length,1);assert.equal((await readEntry({id:found[0].id})).adapted,true);
  }
  for(const [query,name] of [['code review','code-review-and-quality'],['debug backend regression','diagnosing-bugs'],['multi-model planning','arena'],['verification skill','create-verification-skill']])assert.equal((await findWorkflow({query}))[0].name,name);
});
test('Ponytail indexing preserves every preexisting entry and is idempotent',async()=>{
  const current=await catalog();assert.deepEqual(await indexPonytail(current),current);assert.deepEqual(await indexPonytail(await indexPstack(current)),current);assert.equal(current.skills.filter(e=>e.source==='ponytail').length,6);assert.equal(current.skills.filter(e=>!['ponytail','cursor-pstack','ecc-engineering'].includes(e.source)).length,374);assert.equal(current.commands.length,65);
});
test('debt collection excludes ignored and sensitive files, retains trigger gaps and performs no writes',async()=>{
  const root=await fixture();try{
    const before=await fs.readFile(path.join(root,'sample.py'));
    const result=await collectDebt({repository:'ecc',paths:['.']},{ecc:root});
    assert.equal(result.complete,true);assert.equal(result.rows.length,3);assert.equal(result.scannedFiles,1);assert.equal(result.rows[0].noTrigger,false);assert.equal(result.rows[1].noTrigger,true);assert.match(result.rows[2].text,/redacted/);assert.ok(!JSON.stringify(result).includes('sk-example'));assert.equal(result.writes,0);assert.deepEqual(await fs.readFile(path.join(root,'sample.py')),before);
  }finally{await cleanup(root);}
});
test('literal custom marker cannot inject regex and missing selection cannot look clean',async()=>{
  const root=await fixture();try{
    for(const marker of ['.*','a|b','[a]'])await assert.rejects(collectDebt({repository:'ecc',paths:['sample.py'],marker},{ecc:root}),/literal/);
    await assert.rejects(collectDebt({repository:'ecc',paths:['missing.py']},{ecc:root}),/ENOENT/);
    for(const file of ['../sample.py','C:/sample.py','file:ads','CON','a/../sample.py','dir/file.'])await assert.rejects(collectDebt({repository:'ecc',paths:[file]},{ecc:root}),/bounded|Bounded/);
  }finally{await cleanup(root);}
});
test('oversized source is an error, not a partial clean ledger',async()=>{
  const root=await fixture();try{await fs.writeFile(path.join(root,'large.py'),'x'.repeat(512001));await assert.rejects(collectDebt({repository:'ecc',paths:['large.py']},{ecc:root}),/byte budget/);}finally{await cleanup(root);}
});
test('linked paths cannot expose files outside the selected repository',async()=>{
  const root=await fixture(),outside=await fixture();try{
    await fs.symlink(outside,path.join(root,'link'),process.platform==='win32'?'junction':'dir');
    await assert.rejects(collectDebt({repository:'ecc',paths:['link/sample.py']},{ecc:root}),/Linked|escapes/);
    await fs.unlink(path.join(root,'link'));
  }finally{await cleanup(root);await cleanup(outside);}
});
test('native ECC Ponytail references resolve without copying central policy',async()=>{
  for(const file of ['AGENTS.md','CLAUDE.md','GEMINI.md','CODEX.md','OPENCODE.md','.github/copilot-instructions.md','.cursor/rules/common-agents.md','.agents/rules/seabridge-agent-baseline.md','.opencode/instructions/INSTRUCTIONS.md']){
    const text=await fs.readFile(path.join(ROOT,file),'utf8');
    const links=[...text.matchAll(/\]\(([^)]+)\)/g)].map(x=>x[1]).filter(x=>/sea-ponytail|PONYTAIL_ECC_GUIDE/.test(x));
    assert.equal(links.length,2,file);for(const link of links)await fs.access(path.resolve(ROOT,path.dirname(file),link));assert.ok(!text.includes('SEABRIDGE_SAFETY_RULE_START'));
  }
});
test('six actual client configurations start MCP and invoke find/read/debt with negative rejection',async()=>{
  const registrations=JSON.parse(await fs.readFile(path.join(ROOT,'integrations/ponytail/registrations.json'),'utf8'));
  const evidence={schema:'seabridge.ponytail.mcp-proof.v1',checkedAt:new Date().toISOString(),clients:[],providerCalls:0,nativeAgentModelInvoked:false};
  for(const c of registrations.clients.filter(x=>x.status==='registered-for-fresh-session')){
    const raw=await fs.readFile(c.file,'utf8'),config=c.name==='Codex'?toml.parse(raw):jsonc.parse(raw),section=c.name==='Codex'?'mcp_servers':c.name==='OpenCode'?'mcp':c.name==='VS Code'?'servers':'mcpServers',entry=config[section]['seabridge-ponytail'];
    const command=Array.isArray(entry.command)?entry.command[0]:entry.command,args=Array.isArray(entry.command)?entry.command.slice(1):entry.args;
    const client=new Client({name:'ponytail-config-proof',version:'1.0.0'}),transport=new StdioClientTransport({command,args,stderr:'pipe'});
    await client.connect(transport);try{
      assert.deepEqual((await client.listTools()).tools.map(t=>t.name).sort(),['ponytail_collect_debt','ponytail_find_workflow','ponytail_read_skill']);
      const found=await client.callTool({name:'ponytail_find_workflow',arguments:{query:'ponytail review'}});assert.ok(!found.isError);assert.equal(JSON.parse(found.content[0].text)[0].id,'ponytail/ecc/ponytail-review');
      const read=await client.callTool({name:'ponytail_read_skill',arguments:{id:'ponytail/ecc/ponytail-review'}});assert.ok(!read.isError);assert.equal(JSON.parse(read.content[0].text).adapted,true);
      const debt=await client.callTool({name:'ponytail_collect_debt',arguments:{repository:'ecc',paths:['integrations/ponytail/runtime.mjs']}});assert.ok(!debt.isError,debt.content[0].text);assert.equal(JSON.parse(debt.content[0].text).writes,0);
      const bad=await client.callTool({name:'ponytail_collect_debt',arguments:{repository:'ecc',paths:['../manageesg-backend/.env']}});assert.equal(bad.isError,true);
      evidence.clients.push({name:c.name,successfulToolCalls:3,rejectedTraversal:true,verdict:'PASS'});
    }finally{await client.close();}
  }
  assert.equal(evidence.clients.length,6);
  for(const loader of registrations.loaders){assert.ok((await fs.readFile(loader.file,'utf8')).includes(loader.canonical));await fs.access(loader.canonical);}
  evidence.nativeLoadersVerified=registrations.loaders.length;evidence.limitation='SDK transport from saved configs; not active editor or native-model adoption.';
  await fs.mkdir(path.join(ROOT,'artifacts/agent-runs/ponytail'),{recursive:true});
  await fs.writeFile(path.join(ROOT,'artifacts/agent-runs/ponytail/mcp-proof.json'),JSON.stringify(evidence,null,2)+'\n');
});
