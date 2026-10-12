import { require, ROOT, catalog, rankWorkflows, validateCatalog, readEntry, findWorkflow } from './runtime.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
// Narrow regression mode: no services, provider calls, source ingestion or files.
if (process.argv.includes('--routing-only')) {
  const data = await catalog(); let passed = 0;
  const check = (value, label) => { assert.ok(value, label); passed++; };
  for (const [query, name] of [
    ['diagnose backend failure', 'diagnosing-bugs'],
    ['debug regression', 'diagnosing-bugs'],
    ['api interface design', 'api-and-interface-design'],
    ['frontend component accessibility', 'frontend-ui-engineering'],
    ['code review', 'code-review-and-quality'],
    ['performance profiling', 'performance-optimization'],
    ['security tenant isolation', 'security-and-hardening'],
    ['requested architecture system design', 'codebase-design'],
    ['domain modeling', 'domain-modeling'],
    ['research primary sources', 'research'],
    ['audit spreadsheet formulas', 'audit-xls'],
    ['3-statement financial model', '3-statement-model']
  ]) {
    const result = await findWorkflow({ query });
    check(result[0]?.name === name && result[0].routingRole === 'primary', query);
    check(result.filter(e => e.routingRole === 'primary').length === 1, 'one primary: ' + query);
    if (/spreadsheet|3-statement/.test(query)) check(result[0].plugin === 'fsi-financial-analysis', 'base finance wins');
  }
  const specialist = data.skills.find(e => e.plugin === 'fsi-pitch-agent' && e.name === 'audit-xls');
  check((await findWorkflow({ query: specialist.id }))[0].id === specialist.id, 'explicit specialist wins');
  const zoom = data.skills.filter(e => e.plugin === 'work-zoom-plugin');
  for (const entry of zoom) check((await readEntry({ id: entry.id })).file === entry.file, 'exact nested Zoom read');
  for (const leaf of ['android','ios','web','linux','macos','react-native','windows']) {
    await assert.rejects(readEntry({ id: 'knowledge-work-plugins/work-zoom-plugin/' + leaf })); passed++;
  }
  assert.throws(() => validateCatalog({ skills: [{id:'same'},{id:'same'}], commands: [] }), /Ambiguous/); passed++;
  await assert.rejects(readEntry({ id: '../../.env' })); passed++;
  assert.throws(() => rankWorkflows(data, { query: 'debug', limit: -1 })); passed++;
  check(rankWorkflows(data, { query: 'zz-no-such-workflow-zz' }).length === 0, 'no invented workflow');
  check(rankWorkflows(data, { query: 'debug', kind: 'command' }).every(e => e.kind === 'command'), 'kind preserved');
  console.log(JSON.stringify({ passed, failed: 0, skills: data.skills.length, commands: data.commands.length,
    duplicateIDs: 0, nativeAgentAdoption: false, providerCalls: 0, serviceChanges: 0 }));
  process.exit(0);
}
const {Client}=require('@modelcontextprotocol/sdk/client/index.js');
const {StdioClientTransport}=require('@modelcontextprotocol/sdk/client/stdio.js');
await fs.mkdir('integrations/dev-suite/verification-context',{recursive:true});
const receipt={checkedAt:new Date().toISOString(),tests:[]};
async function connect(args,env){const c=new Client({name:'ecc-install-verifier',version:'1.0.0'});await c.connect(new StdioClientTransport({command:process.execPath,args,env:{...process.env,...env},stderr:'pipe'}));return c;}
const c=await connect([path.resolve('integrations/dev-suite/cli.mjs'),'mcp']);
try {const t=await c.listTools();assert.equal(t.tools.length,5);receipt.suiteTools=t.tools.map(t=>t.name);
const found=await c.callTool({name:'suite_find_workflow',arguments:{query:'api interface design'}});const list=JSON.parse(found.content[0].text);assert.ok(list.length);const item=list.find(x=>x.source==='addyosmani-agent-skills')||list[0];const read=await c.callTool({name:'suite_read_skill',arguments:{id:item.id}});assert.ok(JSON.parse(read.content[0].text).content.includes('---'));receipt.tests.push('catalog search and digest-checked read');
const bad=await c.callTool({name:'suite_read_skill',arguments:{id:'../../.env'}});assert.equal(bad.isError,true);receipt.tests.push('unknown/traversal ID denied');
const repo='C:/Users/adelm/SeaBridgeAI/everything-claude-code';const commit=execFileSync('git',['-C',repo,'rev-parse','HEAD'],{encoding:'utf8'}).trim();const preview=await c.callTool({name:'suite_review_prepare',arguments:{repository:repo,commit}});assert.ok(!preview.isError,preview.content[0].text);const p=JSON.parse(preview.content[0].text);receipt.review={repository:repo,commit,preview:p};receipt.tests.push('Alibaba explicit commit review planning no inference');
}finally{await c.close();}
const context=await connect([path.resolve('integrations/dev-suite/cli.mjs'),'context'],{CONTEXT_MODE_PROJECT_DIR:path.resolve('integrations/dev-suite/verification-context'),CLAUDE_PROJECT_DIR:path.resolve('integrations/dev-suite/verification-context')});
try {const t=await context.listTools();receipt.contextTools=t.tools.map(t=>t.name);
const executed=await context.callTool({name:'ctx_execute',arguments:{language:'javascript',code:'console.log("SEABRIDGE_CONTEXT_FIXTURE_READY")',timeout:10000}});assert.ok(!executed.isError,JSON.stringify(executed));assert.ok(JSON.stringify(executed).includes('SEABRIDGE_CONTEXT_FIXTURE_READY'));receipt.tests.push('context JavaScript runtime execution');
const indexed=await context.callTool({name:'ctx_index',arguments:{content:'# SeaBridge local fixture\nThe permitted status code is amber. Reference source: synthetic fixture.',source:'ecc-install-fixture'}});assert.ok(!indexed.isError,JSON.stringify(indexed));
const searched=await context.callTool({name:'ctx_search',arguments:{queries:['permitted status amber'],limit:3}});assert.ok(!searched.isError,JSON.stringify(searched));assert.ok(JSON.stringify(searched).includes('amber'));receipt.contextRetrieval=searched;receipt.tests.push('context indexed source retrieval');}finally{await context.close();}
await fs.writeFile('integrations/dev-suite/verification.json',JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify({tests:receipt.tests,contextTools:receipt.contextTools}));
