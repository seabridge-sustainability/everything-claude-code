'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const engine=require('../../scripts/lib/coding-execution'),store=require('../../scripts/lib/goal-store');
const root=fs.mkdtempSync(path.join(os.tmpdir(),'ecc-synthetic-policy-'));
let passed=0;
const test=(name,action)=>{action();passed++;console.log('PASS '+name);};
try{
  fs.mkdirSync(path.join(root,'tests/fixtures'),{recursive:true});
  fs.mkdirSync(path.join(root,'artifacts/agent-runs/proof'),{recursive:true});
  const fixture='tests/fixtures/fixture.json',output='artifacts/agent-runs/proof/result.json';
  fs.writeFileSync(path.join(root,fixture),'{}');
  const worker={repo:root,scopes:['artifacts/agent-runs/proof'],data_policy:{mode:'synthetic-only',
    fixture:{path:fixture,sha256:store.sha256File(path.join(root,fixture))},outputs:[{path:output,checks:['save-reopen']}]}};
  const receipt={schema:'ecc.synthetic-verification.v1',fixture_sha256:worker.data_policy.fixture.sha256,
    checks:[{id:'save-reopen',passed:true,count:1}]};
  function write(value=receipt){fs.writeFileSync(path.join(root,output),store.canonicalJson(value));
    return [{path:output,sha256:store.sha256File(path.join(root,output)),kind:'local-check'}];}
  const refused=action=>assert.throws(action,error=>error.message==='synthetic output policy rejected artifact');
  test('pinned canonical minimized receipt accepted without exposing fixture contents',()=>{
    engine.verifySyntheticArtifacts(worker);engine.verifySyntheticArtifacts(worker,write());
  });
  test('raw property analysis and payload fields refused even within byte budget',()=>{
    for(const key of ['property_analysis','payload','diagnostics']){
      const refs=write({...receipt,[key]:'SYNTHETIC_PRIVATE_CANARY'});refused(()=>engine.verifySyntheticArtifacts(worker,refs));}
  });
  test('changed fixture pin rejected, not silently relabeled synthetic',()=>{
    const w=structuredClone(worker);w.data_policy.fixture.sha256='0'.repeat(64);
    refused(()=>engine.verifySyntheticArtifacts(w,write()));
  });
  test('arbitrary extra check names and duplicate check IDs rejected',()=>{
    for(const checks of [[{id:'invented',passed:true,count:1}],[...receipt.checks,...receipt.checks]]){
      refused(()=>engine.verifySyntheticArtifacts(worker,write({...receipt,checks})));}
  });
  test('undeclared proof paths and nonlocal evidence refused',()=>{
    for(const ref of [{...write()[0],path:fixture},{...write()[0],kind:'api'}]){
      refused(()=>engine.verifySyntheticArtifacts(worker,[ref]));}
  });
  test('scratchpad temp log transcript and outside scope destinations refused',()=>{
    for(const target of ['scratchpad/x.json','artifacts/agent-runs/logs/result.json','artifacts/agent-runs/tmp/result.json',
      'artifacts/agent-runs/transcripts.json','artifacts/agent-runs/foreign/result.json','../escape.json']){
      const w=structuredClone(worker);w.data_policy.outputs[0].path=target;
      refused(()=>engine.verifySyntheticArtifacts(w));}
  });
  test('duplicate JSON keys and noncanonical payload hiding refused',()=>{
    fs.writeFileSync(path.join(root,output),' {"schema":"raw","schema":"ecc.synthetic-verification.v1"}');
    const refs=[{path:output,kind:'local-check',sha256:store.sha256File(path.join(root,output))}];
    refused(()=>engine.verifySyntheticArtifacts(worker,refs));
  });
  test('oversized proof, stale byte hash and writable fixture refused',()=>{
    let refs=write();refs[0].sha256='0'.repeat(64);refused(()=>engine.verifySyntheticArtifacts(worker,refs));
    fs.writeFileSync(path.join(root,output),'x'.repeat(16385));
    refused(()=>engine.verifySyntheticArtifacts(worker,[{path:output,kind:'local-check',sha256:'0'.repeat(64)}]));
    const w=structuredClone(worker);w.scopes.push(fixture);refused(()=>engine.verifySyntheticArtifacts(w));
  });
  test('hard-linked receipt refused without altering either target',()=>{
    write();const link=path.join(root,'alias.json');fs.linkSync(path.join(root,output),link);
    try{refused(()=>engine.verifySyntheticArtifacts(worker,[{path:output,kind:'local-check',sha256:store.sha256File(link)}]));}
    finally{fs.unlinkSync(link);}
  });
  test('policy is plan-bound and legacy omission makes no privacy claim',()=>{
    const changed=structuredClone(worker);changed.data_policy.outputs[0].checks.push('extra');
    assert.notEqual(engine.digest(worker),engine.digest(changed));
    engine.verifySyntheticArtifacts({repo:root});
  });
  console.log(JSON.stringify({passed,failed:0,nativeReadContainment:'UNVERIFIED',realClientData:0,paidCalls:0}));
}finally{fs.rmSync(root,{recursive:true,force:true});} // Exact task-created synthetic fixture only.
