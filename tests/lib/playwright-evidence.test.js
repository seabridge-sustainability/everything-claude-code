'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const c=require('../../integrations/software-factory/ui-contract.cjs');
const storage=require('../../scripts/lib/browser-evidence');
const available=process.platform==='win32'&&fs.existsSync('D:/SeaBridgeAI-data');
const contract=()=>({version:1,id:'contract-negative-proof',feature_ids:['authentication'],routes:['/login'],files:['src/app/(auth)/login/page.tsx'],requested_delta:'Verify existing login only',protected_behavior:['Keep authentication and layout'],before:'Existing public login',after:['Public login remains reachable'],viewports:[{id:'desktop',width:1440,height:900},{id:'mobile',width:390,height:844}],states:['default'],recipe_ids:['login-read-only'],baseline:{status:'unavailable'}});
test('managed frontend gate rejects component writes without before evidence and leaves read-only tools usable',{skip:!fs.existsSync(c.FRONT)&&'Sibling frontend absent; actual managed frontend check unverified'},()=>{
  const gate=require('../../integrations/software-factory/ui-write-gate.cjs');
  assert.deepEqual(gate.checkUI(c.FRONT,{tool_name:'Read',tool_input:{file_path:'src/app/(auth)/login/page.tsx'}},null),{required:false});
  assert.throws(()=>gate.checkUI(c.FRONT,{tool_name:'Write',tool_input:{file_path:'src/app/(auth)/login/page.tsx'}},null),/before evidence/);
  assert.throws(()=>gate.prepareUI(c.FRONT,['src/components'],null),/before evidence/);
  assert.throws(()=>gate.checkUI(c.FRONT,{tool_name:'apply_patch',tool_input:{input:'*** Begin Patch\n*** Update File: src/app/(auth)/login/page.tsx\n@@\n-a\n+b\n*** End Patch'}},null),/before evidence/);
  assert.deepEqual(gate.prepareUI(c.ROOT,['scripts/tool.js'],null),null);
});
test('UI admission refuses vague scope, foreign routes/files and desktop-only specs',()=>{
  assert.throws(()=>c.validateContract({}),/Incomplete UI specification/);
  const unknown=contract();unknown.feature_ids=['not-a-feature'];assert.throws(()=>c.validateContract(unknown),/Unknown feature/);
  const route=contract();route.routes=['https://example.com/login'];assert.throws(()=>c.validateContract(route),/Incomplete|Route outside/);
  const file=contract();file.files=['src/app/dashboard/risk/page.tsx'];assert.throws(()=>c.validateContract(file),/outside declared feature/);
  const desktop=contract();desktop.viewports[1].width=1280;assert.throws(()=>c.validateContract(desktop),/mobile and desktop/);
  for(const file of ['../outside.tsx','C:/outside.tsx','src/app/alias. /page.tsx','src/./app.tsx'])assert.throws(()=>c.safeSource(file),/Exact relative/);
  assert.equal(c.routeMatches('/dashboard/company/[companyId]','/dashboard/company/tenant_123'),true);
  assert.equal(c.routeMatches('/dashboard/company/[companyId]','/dashboard/company/a/extra'),false);
  assert.equal(c.routeMatches('/dashboard/company/[companyId]','/dashboard/company/%2fother'),false);
});
test('D admission binds exact source and rejects changed or relocated contract; UI scope is checked', {skip:!available&&'D: unavailable; actual storage unverified'},()=>{
  const admission=c.admit(contract()),packet=c.readAdmission(admission.admission);
  assert.match(packet.source.head,/^[a-f0-9]{40}$/);assert.match(packet.source.files[packet.contract.files[0]],/^[a-f0-9]{64}$/);
  assert.equal(c.requireAdmission(admission.admission,packet.contract.files).required,true);
  assert.throws(()=>c.requireAdmission(null,packet.contract.files),/UI edits require/);
  assert.throws(()=>c.requireAdmission(admission.admission,['src/components/common/Unrelated.tsx']),/outside admitted/);
  assert.equal(c.requireAdmission(null,['docs/change.txt']).required,false);
  const changed=JSON.parse(fs.readFileSync(admission.admission,'utf8'));changed.contract.requested_delta='Changed task after admission';
  fs.writeFileSync(admission.admission,JSON.stringify(changed));assert.throws(()=>c.readAdmission(admission.admission),/changed.*relocated|verifier is stale/);
  fs.unlinkSync(admission.admission);
});
test('media inspection refuses mislabeled video, malformed PNG and mismatched viewport without browser launch', {skip:!available&&'D: unavailable'},async()=>{
  const {inspectMedia,readImage}=await import('../../integrations/software-factory/ui-browser.mjs');
  const run=storage.createRun({repository:'ecc',task:'media-negatives'}),file=run.directory+'/media/invalid.png';
  fs.writeFileSync(file,Buffer.from('not actual browser media'));
  const view={id:'desktop',width:1440,height:900};
  try{
    assert.throws(()=>inspectMedia(file,'screenshot',view),/PNG viewport/);
    assert.throws(()=>inspectMedia(file,'video',view),/WebM playback/);
    assert.throws(()=>inspectMedia(file,'trace',view),/ZIP trace/);
    assert.throws(()=>readImage({file:'C:/not-an-image.png',admission:'C:/fake.json'}),/admitted D/);
  }finally{fs.unlinkSync(file);}
});
