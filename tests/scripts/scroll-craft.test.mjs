import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { ROOT, REVISION, ID, indexScrollCraft } from '../../integrations/scroll-craft/catalog.mjs';
import { catalog, findWorkflow, readEntry, require as suiteRequire } from '../../integrations/dev-suite/runtime.mjs';
const localRequire = createRequire(import.meta.url);
const { coordinate } = localRequire('../../scripts/lib/browser-evidence.js');

test('pinned MIT text references have exact retained digests and inactive execution review', async()=>{
  const m=JSON.parse(await fs.readFile(path.join(ROOT,'integrations/scroll-craft/source-manifest.json'),'utf8'));
  assert.equal(m.revision,REVISION); assert.equal(m.license,'MIT');
  assert.equal(m.providerCalls,0); assert.equal(m.engineInstalled,false);
  assert.ok(m.files.some(f=>f.path==='LICENSE'));
  for(const file of m.files){
    const body=await fs.readFile(path.join(ROOT,file.retained),'utf8');
    assert.equal(crypto.createHash('sha256').update(body).digest('hex'),file.sha256,file.path);
    assert.ok(file.retained.startsWith('integrations/scroll-craft/reference/'));
  }
  assert.ok(m.executionReview.some(f=>f.path.endsWith('/shoot.mjs')&&f.reason.includes('lab/shots')));
  assert.ok(m.executionReview.every(f=>f.status==='not-exposed-or-executed'));
});

test('catalog family survives reindex and exact shared reads expose only adapted workflow',async()=>{
  const c=await catalog(), next=await indexScrollCraft(await indexScrollCraft(c));
  assert.deepEqual(next,c);
  assert.equal(c.skills.filter(f=>f.source==='ecc-scroll-craft').length,1);
  const entry=await readEntry({id:ID});
  assert.equal((await findWorkflow({query:'scroll craft dashboard',profile:'coding'}))[0].id,ID);
  assert.match(entry.content,/supporting guidance under the existing/);
  assert.match(entry.content,/missing D:/); assert.match(entry.content,/Do not run/);
  assert.match(entry.content,/signature moves/); assert.match(entry.content,/property risk or percent/);
  await assert.rejects(readEntry({id:'scroll-craft'}),/unique exact ID/);
});

test('existing evidence guard refuses upstream default output and non-D alternatives',()=>{
  for(const file of ['lab/shots/sheet.png','C:/Users/adelm/lab/sheet.png','E:/lab/sheet.png',
    'D:/SeaBridgeAI-data/agent-evidence/playwright/../sheet.png']) assert.throws(()=>coordinate(file),/D-only browser evidence/);
  assert.equal(coordinate('D:/SeaBridgeAI-data/agent-evidence/playwright/review/sheet.png'),
    'D:/SeaBridgeAI-data/agent-evidence/playwright/review/sheet.png');
});

test('existing stdio MCP provides exact adapter read and corrected frontend selection without model calls',async()=>{
  const {Client}=suiteRequire('@modelcontextprotocol/sdk/client/index.js');
  const {StdioClientTransport}=suiteRequire('@modelcontextprotocol/sdk/client/stdio.js');
  const client=new Client({name:'scroll-craft-offline-proof',version:'1.0.0'});
  await client.connect(new StdioClientTransport({command:process.execPath,
    args:[path.join(ROOT,'integrations/dev-suite/cli.mjs'),'mcp'],stderr:'pipe'}));
  try{
    const result=await client.callTool({name:'suite_read_skill',arguments:{id:ID}});
    assert.ok(!result.isError);const value=JSON.parse(result.content[0].text);
    assert.equal(value.id,ID);assert.match(value.content,/D-only/);
    const routes=await client.callTool({name:'suite_find_workflow',arguments:{query:'frontend UI empty state error handling',profile:'coding',limit:1}});
    assert.equal(JSON.parse(routes.content[0].text)[0].canonicalSkill,'sea-frontend-ux-reviewer');
  }finally{await client.close();}
});
