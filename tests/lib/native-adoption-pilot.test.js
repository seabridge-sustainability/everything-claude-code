'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {settings,prepare,prompt,sourcePins,installController,installRunner,installBindings,bind}=require('../../scripts/native-adoption-pilot');
test('native canary is explicit, local-only and cannot overwrite an existing directory',()=>{
  assert.throws(()=>prepare('claude',__dirname,'fixture'),/new empty path/);
  assert.throws(()=>prepare('unknown',__dirname,'fixture'),/unsupported/);
  assert.match(prompt(),/Do not retry denied tools/);
});
test('installation pins controller and guard dependencies and never replaces existing source',()=>{
  assert.throws(()=>installController(require('node:path').resolve(__dirname,'../..')),/existing files are never overwritten/);
  assert.throws(()=>installRunner(require('node:path').resolve(__dirname,'../..')),/existing files are never overwritten/);
  assert.throws(()=>installBindings(require('node:path').resolve(__dirname,'../..')),/existing files are never overwritten/);
  const pins=sourcePins();
  assert.match(pins['scripts/lib/coding-execution.js'],/^[a-f0-9]{64}$/);
  assert.ok(pins['schemas/goal-control.schema.json']);
  assert.ok(pins['.opencode/plugins/ecc-scope-guard.ts']);
});
test('fresh client configs activate guards, not generic external ECC plugins or remote providers',()=>{
  assert.ok(settings('claude').hooks.PreToolUse);
  assert.ok(settings('gemini').hooks.BeforeTool);
  assert.equal(settings('gemini').model.maxSessionTurns,3);
  const open=settings('opencode');
  assert.deepEqual(open.enabled_providers,['ollama']);
  assert.equal(open.plugin.length,1);
  assert.match(open.plugin[0],/ecc-scope-guard.ts$/);
  assert.equal(open.agent.build.steps,3);
  assert.ok(settings('antigravity')['ecc-task-scope'].PreToolUse);
  assert.ok(settings('antigravity')['ecc-task-scope'].PostInvocation);
});

test('Antigravity native contract allows only owned tools and counts resumed invocations separately',t=>{
  const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
  const guard=require('../../scripts/hooks/antigravity-scope-guard');
  const parent=fs.mkdtempSync(path.join(os.tmpdir(),'ecc-agy-contract-')),cwd=path.join(parent,'fixture');
  t.after(()=>fs.rmSync(parent,{recursive:true,force:true}));
  const receipt=prepare('antigravity',cwd);bind(cwd,'actual-native-id');
  const context={cwd,sessionId:receipt.session};
  const payload={conversationId:'actual-native-id',workspacePaths:[cwd],toolCall:{name:'write_to_file',args:{TargetFile:path.join(cwd,'owned/canary.txt')}}};
  assert.equal(guard.run('pre',payload,context).decision,'allow');
  for(const file of ['outside.txt','checks.json','.agents/hooks.json']){
    assert.equal(guard.run('pre',{...payload,toolCall:{name:'write_to_file',args:{TargetFile:path.join(cwd,file)}}},context).decision,'deny');
  }
  assert.equal(guard.run('pre',{...payload,toolCall:{name:'run_command',args:{CommandLine:'echo forged'}}},context).decision,'deny');
  assert.equal(guard.run('pre',{...payload,conversationId:'foreign'},context).decision,'deny');
  assert.equal(guard.run('pre',{...payload,workspacePaths:[os.tmpdir()]},context).decision,'deny');
  for(const initialNumSteps of [0,10,20])assert.deepEqual(guard.run('post',{...payload,initialNumSteps,invocationNum:0},context),{});
  assert.equal(guard.run('post',{...payload,initialNumSteps:30,invocationNum:0},context).terminationBehavior,'terminate');
  assert.equal(guard.run('pre',payload,context).decision,'deny');
  assert.equal(guard.run('post',{...payload,invocationNum:0},context).terminationBehavior,'terminate');
});

test('memory citation binding rejects changed versions, ranges, policy epochs and wrong scopes',()=>{
  const {matches}=require('../../scripts/coding-execution-memory-check');
  const ref={scope:'engineering:seabridge-code',source_id:'source',version:'version',citation:'repo://source#L1',source_revision:'revision',line_start:1,line_end:2,chunk_id:'a'.repeat(64),policy_epoch:1};
  const hit={...ref};delete hit.scope;
  assert.equal(matches(ref,{chunk:hit}),true);
  for(const field of Object.keys(hit))assert.equal(matches({...ref,[field]:typeof ref[field]==='number'?ref[field]+1:ref[field]+'changed'},{chunk:hit}),false);
  assert.equal(matches({...ref,scope:'company:tenant'},{chunk:hit}),false);
  assert.equal(matches(ref,{chunk:null}),false);
});

test('bindings installer cannot mutate an unregistered target even when a shell continues',t=>{
  const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'ecc-binding-owner-'));
  t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
  const old=process.env.ECC_SESSION_ID;delete process.env.ECC_SESSION_ID;
  try{assert.throws(()=>installBindings(dir),/registered installation session/);assert.deepEqual(fs.readdirSync(dir),[]);}
  finally{if(old!==undefined)process.env.ECC_SESSION_ID=old;}
});
