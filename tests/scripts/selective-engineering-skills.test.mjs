import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, SUITE, names, indexEngineering, hash } from '../../integrations/engineering-skills/catalog.mjs';
import { catalog, findWorkflow, readEntry, rankWorkflows } from '../../integrations/dev-suite/runtime.mjs';

test('only three adapted skills are added and indexing preserves every existing workflow', async () => {
  const c = await catalog(), next = await indexEngineering(c);
  assert.deepEqual(next, c); assert.deepEqual(await indexEngineering(next), next);
  assert.equal(c.skills.filter(e=>e.source==='ecc-engineering').length, 3);
  assert.equal(c.skills.filter(e=>!['ecc-engineering','cursor-pstack','ponytail'].includes(e.source)).length, 374);
  assert.equal(c.skills.filter(e=>e.source==='cursor-pstack').length, 10);
  assert.equal(c.skills.filter(e=>e.source==='ponytail').length, 6);
  assert.equal(c.commands.length, 65);
});
test('new intent routes select one primary and existing generic/Pstack/Ponytail priorities survive', async () => {
  for (const [query, name] of [
    ['grill me about this feature', names[0]], ['requirements discovery for API', names[0]],
    ['define constraints for frontend', names[1]], ['constraints.mmd quality contract', names[1]],
    ['doubt-driven security review', names[2]], ['review consequential claim', names[2]],
    ['arena requirements discovery', 'arena'], ['interrogate doubt-driven review', 'interrogate'],
    ['adversarial review', 'interrogate'], ['multi-model planning','arena'],
    ['code review','code-review-and-quality'], ['debug regression','diagnosing-bugs'],
    ['performance profiling','performance-optimization'], ['domain modeling','domain-modeling'],
    ['ponytail review','ponytail-review']
  ]) {
    const result = await findWorkflow({ query }); assert.equal(result[0]?.name, name, query);
    assert.equal(result.filter(e=>e.routingRole==='primary').length, 1, query);
  }
  const c = await catalog();
  assert.equal(rankWorkflows(c,{query:'zz-no-workflow-zz'}).length,0);
  assert.ok(rankWorkflows(c,{query:'define constraints',kind:'command'}).every(e=>e.kind==='command'));
  const explicit=c.skills.find(e=>e.name==='security-and-hardening');
  assert.equal((await findWorkflow({query:explicit.id}))[0].id,explicit.id);
});
test('canonical bodies, root loaders and documentation links resolve', async () => {
  for (const name of names) {
    const entry = await readEntry({id:`ecc-engineering/ecc/${name}`});
    const body = await fs.readFile(path.join(ROOT,'skills',name,'SKILL.md'),'utf8');
    assert.match(body,new RegExp(entry.id)); assert.match(entry.content,/existing.*goal|existing ECC goal/);
    for (const [directory, text] of [[path.dirname(entry.absoluteFile),entry.content],[path.join(ROOT,'skills',name),body]]) {
      for (const match of text.matchAll(/\]\(([^)]+)\)/g)) await fs.access(path.resolve(directory,match[1]));
    }
  }
});
test('retained reviewed source bytes and licenses match the unchanged upstream pins', async () => {
  const m = JSON.parse(await fs.readFile(path.join(ROOT,'integrations/engineering-skills/adaptation.json'),'utf8'));
  assert.equal(m.productInstructionFilesAdded,0); assert.equal(m.rawHooksExecuted,false); assert.equal(m.newMcpServers,0);
  for (const source of m.sources) {
    const repo=path.join(SUITE,'sources',source.source);
    assert.equal(execFileSync('git',['-C',repo,'rev-parse','HEAD'],{encoding:'utf8',windowsHide:true}).trim(),source.revision);
    const pinned=execFileSync('git',['-C',repo,'show',`${source.revision}:${source.file}`],{encoding:'utf8',windowsHide:true});
    assert.equal(hash(pinned),source.sha256); assert.equal(hash(await fs.readFile(path.join(repo,source.file),'utf8')),source.sha256);
    await fs.access(path.join(repo,'LICENSE'));
  }
});
test('written contracts and self-critique cannot claim enforcement or independent acceptance', async () => {
  const contract=await readEntry({id:`ecc-engineering/ecc/${names[1]}`}), review=await readEntry({id:`ecc-engineering/ecc/${names[2]}`});
  assert.match(contract.content,/Written guidance alone does not enforce/);
  assert.match(contract.content,/Impact governs risk, not file count/);
  assert.match(contract.content,/do not invent/i);
  assert.match(review.content,/degraded self-review/); assert.match(review.content,/independence is unverified/);
  assert.match(review.content,/live-model deferrals remain/);
});
