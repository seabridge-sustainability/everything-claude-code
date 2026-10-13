'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {policy,skillFile,rankWorkflows,taskRoute}=require('../../scripts/lib/skill-routing');
const root=path.resolve(__dirname,'../..'),c=JSON.parse(fs.readFileSync(path.join(root,'integrations/company-dev-tools/catalog.json')));
test('every canonical route resolves to a retained catalog body and existing SeaBridge entry',()=>{
  for(const r of policy().routes){assert.ok(c.skills.some(e=>e.source===r.source&&e.name===r.name&&(!r.plugin||e.plugin===r.plugin)),r.id);assert.ok(fs.existsSync(path.join(root,skillFile(r.skill))),r.skill);}
});
test('coding profiles remove unrelated business candidates without disabling explicit company selections',()=>{
  const p=policy();for(const q of ['doubt-driven review','requirements discovery','code review','debug regression']){
    const out=rankWorkflows(c,{query:q,profile:'coding'});assert.equal(out.filter(e=>e.routingRole==='primary').length,1,q);assert.ok(out.every(e=>p.codingSources.includes(e.source)));assert.ok(out.every(e=>e.routingPolicySha256===p.sha256));
  }
  const e=c.skills.find(x=>x.plugin==='fsi-pitch-agent'&&x.name==='audit-xls');assert.equal(rankWorkflows(c,{query:e.id,profile:'coding'})[0].id,e.id);
  assert.equal(rankWorkflows(c,{query:'audit spreadsheet formulas'})[0].plugin,'fsi-financial-analysis');
});
test('presentation changes stay light while tiny tenant or scientific changes require stronger evidence',()=>{
  const light=taskRoute(c,{query:'change button spacing',impact:{presentationOnly:true}});assert.equal(light.risk,'low');assert.equal(light.primary,null);
  const tenant=taskRoute(c,{query:'debug tenant isolation',impact:{presentationOnly:true,tenant:true}});assert.equal(tenant.risk,'high');assert.ok(tenant.primary);assert.ok(tenant.supportingSkills.includes('sea-security-reviewer'));
  const science=taskRoute(c,{query:'review code',impact:{scientific:true}});assert.equal(science.risk,'high');assert.ok(science.supportingSkills.includes('sea-sustainability-domain-review'));
  for(const r of [light,tenant,science]){assert.equal(r.providerCalls,0);assert.equal(r.permissionGranted,false);}
});
test('unknown task and invalid impact cannot silently choose an unrelated primary or weaken gates',()=>{
  assert.equal(taskRoute(c,{query:'zz-no-route-zz'}).status,'needs-task-selection');
  assert.throws(()=>taskRoute(c,{query:'review',impact:{risk:'low'}}),/boolean/);
  assert.throws(()=>taskRoute(c,{query:'review',impact:{unrecognized:true}}),/boolean/);
  assert.throws(()=>rankWorkflows(c,{query:'debug',profile:'unsupported'}),/bounded/);
});
test('legacy orchestrators delegate without old file-count, consensus-loop or missing policy defaults',()=>{
  const senior=fs.readFileSync(path.join(root,'skills/sea-senior-dev-workflow/SKILL.md'),'utf8'),grill=fs.readFileSync(path.join(root,'skills/sea-grill-me-codex/SKILL.md'),'utf8');
  assert.match(senior,/canonical routing/);assert.doesNotMatch(senior,/Controlled Auto Mode Policy|Self-Verification Loop|SEABRIDGE_CODING_AGENT_SYSTEM/);
  assert.match(grill,/existing Pstack/);assert.doesNotMatch(grill,/round 5|5 rounds|more than 2|lower.cost execution/);
});
