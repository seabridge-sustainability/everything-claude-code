'use strict';
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const path = require('node:path');
const {test} = require('node:test');
const {watchRelease} = require(process.env.RELEASE_WATCH_MODULE || '../../scripts/lib/release-watch');
const SHA = 'a'.repeat(40), URL = 'https://github.com/fixture/backend.git';
const STEP_NAMES = ['Register the tested image and update ECS', 'Wait for deployment to stabilize',
  'Verify ECS is running the tested image digest', 'Smoke test dev API health'];
function fixture(extra = {}) {
  let clock = 100000, calls = 0, mutations = [], phase = 0;
  const options = {cwd: '.', sessionId: 'owner', repository: 'fixture/backend',
    candidate: SHA, branch: 'seabridge_development', expectedWorkflows: 'security-scan',
    maxPolls: 1, maxRequests: 100, pollMs: 1, deadlineSeconds: 60, ...extra};
  const release = {owner: 'owner', candidate: SHA, branch: options.branch, expiresAt: 200000,
    publication: {publishable: true, destinationSha256: crypto.createHash('sha256').update(URL).digest('hex')},
    actionsBudget: {expectedWorkflows: options.expectedWorkflows.split(',')}};
  const state = {release, sessions: [{id: 'owner', state: 'active',
    worktree: path.resolve('/fixture'), expiresAt: 200000}]};
  const run = {id: 1, name: 'security-scan', path: '.github/workflows/security-scan.yml',
    head_sha: SHA, head_branch: options.branch, event: 'push', repository: {full_name: 'fixture/backend'},
    run_attempt: 1, status: 'completed', conclusion: 'success', updated_at: '2026-10-14T00:00:00Z'};
  const jobs = [{id: 11, name: 'secret-scan', status: 'completed', conclusion: 'success', steps: []}];
  const controls = {runs: [run], jobs, beforeRequest: null, beforeStatus: null, responder: null, closeFails: false};
  const dependencies = {
    now: () => clock,
    sleep: async n => {clock += n;},
    git: (_, args) => args[0] === 'rev-parse' ? path.resolve('/fixture') : URL,
    execute(command, data) {
      if (command === 'status') {
        phase++; if (controls.beforeStatus) controls.beforeStatus(phase, state);
        return structuredClone(state);
      }
      mutations.push({command, data: structuredClone(data)});
      if (command === 'release-end') {
        assert.equal(data.expectedReleaseSha256, crypto.createHash('sha256').update(JSON.stringify(state.release)).digest('hex'));
        assert.equal(state.release.owner, data.sessionId);
        assert.equal(state.release.candidate, data.candidate);
        assert.equal(state.release.branch, data.branch);
        state.release = null;
        return {outcome: data.outcome};
      }
      if (controls.closeFails) throw Error('fixture close failed');
      state.sessions[0].state = 'closed'; return state.sessions[0];
    },
    async request(endpoint, timeout) {
      calls++;
      assert(timeout > 0 && timeout <= 15000);
      assert(endpoint.startsWith('/repos/fixture/backend/actions/runs'));
      if (controls.beforeRequest) controls.beforeRequest(calls, endpoint, state);
      if (controls.responder) return controls.responder(endpoint);
      const field = endpoint.includes('/jobs?') ? 'jobs' : 'workflow_runs';
      const rows = field === 'jobs' ? controls.jobs : controls.runs;
      return structuredClone({total_count: rows.length, [field]: rows});
    },
  };
  return {options, dependencies, controls, state, run, jobs, mutations, calls: () => calls,
    watch: () => watchRelease(options, dependencies)};
}
function backend(f, conclusions = ['success','success','success','success']) {
  f.run.name = 'backend-tests'; f.run.path = '.github/workflows/backend-tests.yml';
  f.controls.jobs = [{id: 11, name: 'Deploy the tested development commit / build-and-deploy',
    status: 'completed', conclusion: 'success', steps: STEP_NAMES.map((name,index) =>
      ({name, status: 'completed', conclusion: conclusions[index]}))}];
}
test('security-only success ends exactly own pinned lease and optional close follows end', async () => {
  const f = fixture({closeSession: 'yes'});
  const result = await f.watch();
  assert.equal(result.state, 'ended'); assert.equal(result.outcome, 'completed');
  assert.deepEqual(f.mutations.map(row => row.command), ['release-end','close']);
  assert.equal(f.mutations[0].data.candidate, SHA);
  assert.equal(f.mutations[0].data.branch, 'seabridge_development');
});
test('source-closed owner observation can finish exact CI without reacquiring source authority', async () => {
  const f=fixture({closeSession:'yes'});
  f.state.sessions[0].state='closed';
  f.state.sessions[0].releaseObservation={branch:f.options.branch,candidate:SHA,
    destinationSha256:f.state.release.publication.destinationSha256,startedAt:1};
  const result=await f.watch();
  assert.equal(result.state,'ended'); assert.equal(result.sessionClosed,true);
  assert.deepEqual(f.mutations.map(row=>row.command),['release-end','close']);
});
test('closed owner without its exact observer binding retains the release', async () => {
  for(const changed of ['missing','candidate','destination']) {
    const f=fixture(); f.state.sessions[0].state='closed';
    if(changed!=='missing') f.state.sessions[0].releaseObservation={branch:f.options.branch,
      candidate:changed==='candidate'?'b'.repeat(40):SHA,
      destinationSha256:changed==='destination'?'0'.repeat(64):f.state.release.publication.destinationSha256};
    await assert.rejects(f.watch(),/owner session/);
    assert.equal(f.mutations.length,0);
  }
});
test('no run and missing expected run retain lease', async () => {
  const empty = fixture(); empty.controls.runs = [];
  assert.equal((await empty.watch()).state, 'retained'); assert.equal(empty.mutations.length, 0);
  const missing = fixture({expectedWorkflows: 'security-scan,backend-tests'});
  assert.equal((await missing.watch()).state, 'retained'); assert.equal(missing.mutations.length, 0);
});
test('native metadata transport reuses gh login with GET only and a bounded response', async () => {
  const fs=require('node:fs'),Module=require('node:module');
  const file=require.resolve('../../scripts/lib/release-watch');
  const mod=new Module(file,module),local=Module.createRequire(file), f=fixture(), calls=[];
  mod.filename=file;mod.paths=module.paths;
  mod.require=id=>id==='node:child_process'?{execFileSync(command,args,options){
    assert.equal(command,'gh'); assert.deepEqual(args.slice(0,6),['api','--hostname','github.com','--method','GET',args[5]]);
    assert(args[5].startsWith('/repos/fixture/backend/actions/runs'));
    assert(options.timeout>0 && options.timeout<=15000); assert.equal(options.maxBuffer,8*1024*1024);
    calls.push(args);
    const jobs=args[5].includes('/jobs?');return JSON.stringify({total_count:1,[jobs?'jobs':'workflow_runs']:jobs?f.jobs:[f.run]});
  }}:local(id);
  mod._compile(fs.readFileSync(file,'utf8'),file);
  assert.equal((await mod.exports.watchRelease(f.options,{...f.dependencies,request:undefined})).state,'ended');
  assert.equal(calls.length,3);
});
test('active or unknown run/conclusion and incomplete jobs retain lease', async () => {
  for (const state of ['queued','in_progress','waiting','new-status']) {
    const f=fixture(); f.run.status=state;
    assert.equal((await f.watch()).state,'retained'); assert.equal(f.mutations.length,0);
  }
  const unknown=fixture(); unknown.run.conclusion='new-conclusion';
  assert.equal((await unknown.watch()).state,'retained');
  const jobs=fixture(); jobs.controls.jobs=[];
  assert.equal((await jobs.watch()).state,'retained');
});
test('wrong SHA/repository/branch/event/path and unknown workflow never close', async () => {
  for (const change of [{head_sha:'b'.repeat(40)}, {repository:{full_name:'foreign/backend'}},
    {head_branch:'main'}, {event:'schedule'}, {path:'.github/workflows/deploy.yml'}, {name:'unknown'}]) {
    const f=fixture(); Object.assign(f.run,change);
    assert.equal((await f.watch()).state,'retained'); assert.equal(f.mutations.length,0);
  }
});
test('origin mismatch, lease budget mismatch and initial foreign owner stop before requests', async () => {
  for (const mutate of [
    f => {f.options.repository='foreign/backend';},
    f => {f.state.release.actionsBudget.expectedWorkflows=['backend-tests'];},
    f => {f.state.release.owner='foreign';},
  ]) {
    const f=fixture(); mutate(f);
    await assert.rejects(f.watch()); assert.equal(f.calls(),0); assert.equal(f.mutations.length,0);
  }
});
test('foreign owner or same-owner changed candidate before terminal closure cannot mutate', async () => {
  for (const replacement of [{owner:'foreign'}, {candidate:'b'.repeat(40)}]) {
    const f=fixture();
    f.controls.beforeRequest=(n,_,state) => {if(n===3) Object.assign(state.release,replacement);};
    assert.equal((await f.watch()).state,'retained'); assert.equal(f.mutations.length,0);
  }
});
test('finite poll and request ceilings retain lease without renewal', async () => {
  const pending=fixture({maxPolls:2,pollMs:60000,deadlineSeconds:1}); pending.controls.runs=[];
  assert.equal((await pending.watch()).state,'retained'); assert(pending.calls()<=2);
  const limited=fixture({maxRequests:1});
  assert.equal((await limited.watch()).state,'retained'); assert.equal(limited.calls(),1);
  assert.equal(limited.mutations.length,0);
});
test('API errors and incomplete/changed/duplicate pagination retain lease', async () => {
  for (const response of [
    () => {throw Error('secret fixture error must not escape');},
    () => ({total_count:101,workflow_runs:[]}),
    () => ({total_count:2,workflow_runs:[{id:1},{id:1}]}),
  ]) {
    const f=fixture(); f.controls.responder=response;
    const result=await f.watch(); assert.equal(result.state,'retained');
    assert(!JSON.stringify(result).includes('secret fixture')); assert.equal(f.mutations.length,0);
  }
});
test('all run and job pages are observed before mutation', async () => {
  const f=fixture(); const endpoints=[];
  const runRows=[f.run];
  f.controls.responder=endpoint => {
    endpoints.push(endpoint);
    const second=endpoint.includes('page=2'), isJobs=endpoint.includes('/jobs?');
    const rows=isJobs ? Array.from({length:101},(_,i)=>({...f.jobs[0],id:i+1})) : runRows;
    return {total_count:rows.length,[isJobs?'jobs':'workflow_runs']: second ? rows.slice(100) : rows.slice(0,100)};
  };
  f.options.maxRequests=1000;
  assert.equal((await f.watch()).state,'ended');
  assert(endpoints.some(endpoint=>endpoint.includes('/jobs?per_page=100&page=2')));
  assert.equal(f.mutations.length,1);
});
test('new attempt between observations retains lease', async () => {
  const f=fixture();
  f.controls.beforeRequest=n=>{if(n===3)f.run.run_attempt=2;};
  assert.equal((await f.watch()).state,'retained'); assert.equal(f.mutations.length,0);
});
test('latest attempt and every earlier attempt jobs are inspected', async () => {
  const f=fixture(); f.run.run_attempt=2; const endpoints=[];
  f.controls.responder=endpoint=>{
    endpoints.push(endpoint);
    return endpoint.includes('/jobs?') ? {total_count:1,jobs:f.jobs}
      : {total_count:1,workflow_runs:[f.run]};
  };
  assert.equal((await f.watch()).state,'ended');
  assert(endpoints.some(endpoint=>endpoint.includes('/attempts/1/jobs')));
  assert(endpoints.some(endpoint=>endpoint.includes('/attempts/2/jobs')));
});
test('actual backend deployment success requires mutation stabilization digest and smoke', async () => {
  const good=fixture({expectedWorkflows:'backend-tests'}); backend(good);
  assert.equal((await good.watch()).outcome,'completed');
  for (let index=0;index<4;index++) {
    const f=fixture({expectedWorkflows:'backend-tests'}), outcomes=['success','success','success','success'];
    outcomes[index]='skipped'; backend(f,outcomes);
    const result=await f.watch();
    assert.notEqual(result.outcome,'completed');
    if(index<3 && index!==0) assert.equal(result.state,'retained');
  }
});
test('canceled or failed deployment after mutation without stabilization retains lease', async () => {
  for (const conclusion of ['cancelled','failure','timed_out']) {
    const f=fixture({expectedWorkflows:'backend-tests'});
    backend(f,['success','skipped','skipped','skipped']); f.run.conclusion=conclusion;
    assert.equal((await f.watch()).state,'retained'); assert.equal(f.mutations.length,0);
  }
});
test('failed or canceled security-only work ends failed; it never reruns or cancels', async () => {
  for(const conclusion of ['cancelled','failure','timed_out']) {
    const f=fixture(); f.run.conclusion=conclusion;
    assert.equal((await f.watch()).outcome,'failed');
    assert.deepEqual(f.mutations.map(row=>row.command),['release-end']);
  }
});
test('earlier attempted deployment with later skipped deployment retains lease', async () => {
  const f=fixture({expectedWorkflows:'backend-tests'}); backend(f); f.run.run_attempt=2;
  f.controls.responder=endpoint=>{
    if(!endpoint.includes('/jobs?'))return{total_count:1,workflow_runs:[f.run]};
    const jobs=structuredClone(f.controls.jobs);
    if(endpoint.includes('/attempts/2/'))jobs[0].steps.forEach(step=>{step.conclusion='skipped';});
    return{total_count:1,jobs};
  };
  assert.equal((await f.watch()).state,'retained');assert.equal(f.mutations.length,0);
});
test('failed smoke after proven stabilized exact image can end failed safely', async () => {
  const f=fixture({expectedWorkflows:'backend-tests'}); backend(f,['success','success','success','failure']);
  f.run.conclusion='failure'; assert.equal((await f.watch()).outcome,'failed');
});
test('run pagination is complete even when large terminal evidence prevents closure', async () => {
  const f=fixture(); const endpoints=[];
  f.controls.responder=endpoint=>{
    endpoints.push(endpoint);
    const jobs=endpoint.includes('/jobs?');
    const rows=jobs? f.jobs : Array.from({length:101},(_,index)=>({...f.run,id:index+1}));
    return {total_count:rows.length,[jobs?'jobs':'workflow_runs']: endpoint.includes('page=2')?rows.slice(100):rows.slice(0,100)};
  };
  f.options.maxRequests=1000;
  assert.equal((await f.watch()).state,'retained');
  assert(endpoints.some(endpoint=>!endpoint.includes('/jobs?') && endpoint.includes('page=2')));
  assert.equal(f.mutations.length,0);
});
test('failed optional close reports ended release and preserves remaining session', async () => {
  const f=fixture({closeSession:'yes'}); f.controls.closeFails=true;
  const result=await f.watch();
  assert.equal(result.state,'ended'); assert.equal(result.sessionClosed,false);
  assert.equal(f.state.release,null); assert.equal(f.state.sessions[0].state,'active');
});
test('origin changes while observing retain the original lease', async () => {
  const f=fixture();const original=f.dependencies.git;
  f.dependencies.git=(cwd,args)=>f.calls()>=3 && args[0]==='remote' ? 'https://github.com/foreign/backend.git' : original(cwd,args);
  assert.equal((await f.watch()).state,'retained');assert.equal(f.mutations.length,0);
});
test('skipped backend deployment ends failed only when no attempt mutated ECS', async () => {
  const f=fixture({expectedWorkflows:'backend-tests'});backend(f);
  f.controls.jobs[0].conclusion='skipped';f.controls.jobs[0].steps=[];
  assert.equal((await f.watch()).outcome,'failed');
});
test('transactional release-end rejects replaced branch candidate or full receipt', () => {
  const fs=require('node:fs'),os=require('node:os'),Module=require('node:module');
  const original=process.env.SESSION_COORDINATION_ORIGINAL || require.resolve('../../scripts/lib/session-coordination');
  const source=process.env.SESSION_COORDINATION_SOURCE || original;
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'ecc-release-watch-proof-'));
  try {
    const common=path.join(root,'.git'),dir=path.join(common,'ecc-coordination');
    fs.mkdirSync(dir,{recursive:true});
    const canonical=process.platform==='win32'?root.toLowerCase():root;
    const lease={owner:'owner',branch:'seabridge_development',candidate:SHA,expiresAt:Date.now()+60000};
    const state={version:1,sessions:[{id:'owner',state:'active',worktree:canonical,
      scopes:['README.md'],base:SHA,updatedAt:Date.now(),expiresAt:Date.now()+60000}],release:lease,releases:[]};
    const file=path.join(dir,'registry.json');fs.writeFileSync(file,JSON.stringify(state));
    const mod=new Module(original,module),local=Module.createRequire(original);
    mod.filename=original;mod.paths=module.paths;
    mod.require=id=>id==='child_process'?{execFileSync(command,args){
      assert.equal(command,'git');
      if(args[0]==='rev-parse'&&args[1]==='--show-toplevel')return root;
      if(args[0]==='rev-parse'&&args[1]==='--git-common-dir')return common;
      throw Error('unexpected fixture command');
    }}:local(id);
    mod._compile(fs.readFileSync(source,'utf8'),original);
    const opts={cwd:root,sessionId:'owner',outcome:'failed',evidence:'fixture terminal proof'};
    assert.throws(()=>mod.exports.execute('release-end',{...opts,branch:'main'}),/branch\/candidate changed/);
    assert.throws(()=>mod.exports.execute('release-end',{...opts,candidate:'b'.repeat(40)}),/branch\/candidate changed/);
    assert.throws(()=>mod.exports.execute('release-end',{...opts,expectedReleaseSha256:'0'.repeat(64)}),/branch\/candidate changed/);
    assert.deepEqual(JSON.parse(fs.readFileSync(file,'utf8')).release,lease);
    const hash=crypto.createHash('sha256').update(JSON.stringify(lease)).digest('hex');
    const result=mod.exports.execute('release-end',{...opts,branch:lease.branch,candidate:SHA,expectedReleaseSha256:hash});
    assert.equal(result.outcome,'failed');assert.equal(JSON.parse(fs.readFileSync(file,'utf8')).release,null);
    assert.equal(JSON.parse(fs.readFileSync(file,'utf8')).version,1);
  } finally {fs.rmSync(root,{recursive:true,force:true});}
});
test('CLI routes only explicit release-watch through finite watcher and preserves legacy sync main', async () => {
  const fs=require('node:fs'),Module=require('node:module');
  const original=process.env.SESSION_CLI_ORIGINAL || require.resolve('../../scripts/session-coordinate');
  const source=process.env.SESSION_CLI_SOURCE || original;
  const mod=new Module(original,module);mod.filename=original;mod.paths=module.paths;
  let observed,commands=[];
  mod.require=id=>id==='./lib/release-watch'?{watchRelease:async opts=>{
    observed=opts;return {state:'retained'};
  }}:{execute:(command,opts)=>{commands.push([command,opts]);return {state:'fixture'};}};
  mod._compile(fs.readFileSync(source,'utf8'),original);
  const log=console.log;console.log=()=>{};
  try {
    assert.equal(mod.exports.main(['status']),0);
    assert.equal(commands[0][0],'status');
    assert.equal(await mod.exports.main(['release-watch','--session','owner','--repository','fixture/backend',
      '--branch','seabridge_development','--candidate',SHA,'--expected-workflows','security-scan',
      '--max-polls','2','--poll-ms','5','--max-requests','9','--deadline-seconds','60','--close-session','yes']),2);
    assert.equal(commands.length,1);
    assert.equal(observed.sessionId,'owner');assert.equal(observed.repository,'fixture/backend');
    assert.equal(observed.maxPolls,'2');assert.equal(observed.maxRequests,'9');
    assert.equal(observed.closeSession,'yes');
  } finally {console.log=log;}
});
