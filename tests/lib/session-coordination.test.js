'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test, after } = require('node:test');
const { spawnSync, spawn } = require('node:child_process');
const { execute, checkSession, repository } = require('../../scripts/lib/session-coordination');
const cli = path.resolve(__dirname, '../../scripts/session-coordinate.js');
const workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-session-test-'));
let counter = 0;

function git(cwd, ...args) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8', windowsHide: true });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
}
function fixture(withOther = true) {
  const root = path.join(workspace, `repo-${counter++}`);
  fs.mkdirSync(root);
  git(root, 'init', '--initial-branch=fixture');
  git(root, 'config', 'user.name', 'ECC Test');
  git(root, 'config', 'user.email', 'test@example.invalid');
  fs.writeFileSync(path.join(root, 'README.md'), 'fixture\n');
  git(root, 'add', 'README.md');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'fixture');
  const other = `${root}-worktree`;
  if (withOther) git(root, 'worktree', 'add', '--detach', other, 'HEAD');
  return { root, other, sha: git(root, 'rev-parse', 'HEAD') };
}
function register(cwd, sessionId, scopes, now = Date.now()) {
  return execute('register', { cwd, sessionId, scopes, objective: 'owned task', doneWhen: 'local proof', now });
}
function invoke(cwd, args) { return spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8', windowsHide: true }); }
function budget(now = Date.now()) {
  return { actionsBudgetStatus: 'known', actionsBudgetUsed: 10, actionsBudgetLimit: 100,
    actionsBudgetCheckedAt: new Date(now).toISOString(), actionsBudgetSource: 'github-org-budget-ui',
    actionsStopUsage: 'yes', expectedActionsUsd: 1, expectedWorkflows: 'security-scan' };
}
function budgetArgs(now = Date.now()) {
  return ['--actions-budget-status', 'known', '--actions-budget-used', '10', '--actions-budget-limit', '100',
    '--actions-budget-checked-at', new Date(now).toISOString(), '--actions-budget-source', 'github-org-budget-ui',
    '--actions-stop-usage', 'yes', '--expected-actions-usd', '1', '--expected-workflows', 'security-scan'];
}

after(() => fs.rmSync(workspace, { recursive: true, force: true }));

test('literal Next route directories admit exact scopes without matching neighboring names', () => {
  const { root } = fixture(false);
  const scopes = ['src/app/[token]', 'src/app/[...slug]', 'src/app/[[...slug]]'];
  for (const relative of scopes) fs.mkdirSync(path.join(root, relative), { recursive: true });
  register(root, 'literal-routes', scopes);
  for (const relative of scopes) {
    const file = `${relative}/page.tsx`;
    assert.equal(execute('check-write', { cwd: root, sessionId: 'literal-routes', paths: [file] }).allowed, true);
    fs.writeFileSync(path.join(root, file), 'owned route\n');
  }
  assert.throws(() => execute('check-write', { cwd: root, sessionId: 'literal-routes', paths: ['src/app/t/page.tsx'] }), /outside owned/);
  assert.deepEqual(execute('check-changes', { cwd: root, sessionId: 'literal-routes' }).paths.sort(), scopes.map(relative => `${relative}/page.tsx`).sort());
});

test('literal Next route foreign drafts retain exact Git metadata and immutable preservation', () => {
  const { root } = fixture(false);
  const file = 'src/app/[token]/viewer.tsx', neighbor = 'src/app/t/viewer.tsx';
  for (const relative of [file, neighbor]) {
    fs.mkdirSync(path.dirname(path.join(root, relative)), { recursive: true });
    fs.writeFileSync(path.join(root, relative), `${relative}\n`);
  }
  git(root, 'add', 'src');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'literal route fixture');
  fs.appendFileSync(path.join(root, file), 'retained draft\n');
  const session = register(root, 'literal-preservation', ['README.md']);
  const retained = session.preservedForeign.files.find(item => item.path === file);
  const exactIndex = spawnSync('git', ['--literal-pathspecs', 'ls-files', '--stage', '-z', '--', file], { cwd: root, encoding: 'utf8', windowsHide: true });
  assert.equal(exactIndex.status, 0, exactIndex.stderr);
  assert.equal(retained.index, exactIndex.stdout);
  assert.ok(retained.index.includes(file));
  assert.ok(!retained.index.includes(neighbor));
  fs.appendFileSync(path.join(root, 'README.md'), 'owned change\n');
  const checked = execute('check-changes', { cwd: root, sessionId: 'literal-preservation' });
  assert.equal(checked.allowed, true);
  assert.deepEqual(checked.paths, ['README.md']);
  assert.ok(checked.preservedForeign.includes(file));
  fs.appendFileSync(path.join(root, file), 'unapproved mutation\n');
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'literal-preservation' }), /foreign baseline changed/);
});

test('literal Next route support still rejects wildcard, malformed and traversal scopes', () => {
  const { root } = fixture(false);
  const invalid = ['src/*', 'src/?', 'src/{a,b}', 'src/[a-z]', 'src/[]', 'src/[!id]', 'src/[id]suffix', 'src/[id]/../outside', 'src/[id]/file:stream'];
  invalid.forEach((relative, index) => assert.throws(() => register(root, `invalid-literal-${index}`, [relative]), /scope must/));
});

test('literal Next route drafts coexist with ignored goal metadata registration and writes', () => {
  const { root } = fixture(false);
  fs.writeFileSync(path.join(root, '.gitignore'), '.ecc/\n');
  git(root, 'add', '.gitignore');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'ignored metadata fixture');
  const file = 'src/app/[token]/viewer.tsx';
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), 'retained literal route draft\n');
  register(root, 'literal-source', ['README.md']);
  const indexBefore = git(root, 'diff', '--cached', '--binary');
  assert.equal(register(root, 'literal-meta', ['.ecc/goal/frontend']).metadataOnly, true);
  assert.equal(execute('check-write', { cwd: root, sessionId: 'literal-meta', paths: ['.ecc/goal/frontend/resume-receipt.yaml'] }).allowed, true);
  assert.equal(execute('check-changes', { cwd: root, sessionId: 'literal-source' }).allowed, true);
  assert.equal(git(root, 'diff', '--cached', '--binary'), indexBefore);
});

function guardFixture(mode = 'block', overrides = {}, prepare = null) {
  const f = fixture(false);
  const now = Date.now();
  const goal = { schema: 'ecc.active-goal.v1', goal_id: 'fence', mode: 'controlled', proof_profile: 'security', objective: 'Typed write fence', current_priority: 'Run negative controls', non_goals: [],
    user_visible_proofs: [{ id: 'fence', description: 'Fence behavior', lane_id: 'guard', required_stage: 'authentic_input_processed', required_evidence_kinds: ['test','runtime'], required_repositories: ['fixture'], allowed_result_classes: ['other'], acceptance_predicate: 'Negative controls fail closed', requires_authentic: false, requires_user_visible: false, subject_scope: null, required: true }],
    lanes: [{ id: 'guard', description: 'Guard', status: 'active', blocker: null, next_action: 'Probe' }], owner_corrections: [],
    forecast: { state: 'not_set', confidence: 'none', basis: null, critical_path: [], likely_hours: null, next_checkpoint_at: null, checkpoint_started_at: null, checkpoint_proof_id: null, updated_at: new Date(now).toISOString() }, status: 'active', updated_at: new Date(now).toISOString() };
  fs.mkdirSync(path.join(f.root, '.ecc/goal'), { recursive: true });
  fs.writeFileSync(path.join(f.root, '.ecc/goal/active-goal.yaml'), JSON.stringify(goal));
  if (prepare) prepare(f.root);
  register(f.root, 'fence', ['README.md', 'owned', '.ecc/goal', 'artifacts/agent-runs/scope-guard']);
  execute('guard-bind', { cwd: f.root, sessionId: 'fence', guardMode: mode, deadline: new Date(now + 600000).toISOString(), toolLimit: 40, turnLimit: 20, protectedPaths: ['README.md'], ...overrides });
  function event(tool, input, eventName = 'pre', extra = {}) {
    return execute('guard-event', { cwd: f.root, sessionId: 'fence', guardMode: mode, event: eventName,
      payload: { session_id: 'fence', cwd: f.root, tool_name: tool, tool_input: input, ...extra } });
  }
  return { ...f, goal, event };
}

test('guard a/d/e: direct fence, protected checks and useful cross-module reads', () => {
  const { event } = guardFixture();
  assert.equal(event('Write', { file_path: 'owned/new.js', content: 'safe' }).allowed, true);
  assert.equal(event('Read', { file_path: 'outside/module.js' }).allowed, true);
  assert.equal(event('Write', { file_path: 'outside/module.js' }).allowed, false);
  assert.equal(event('Edit', { file_path: 'package.json' }).allowed, false);
  assert.equal(event('Edit', { file_path: 'README.md' }).allowed, false);
  assert.equal(event('Write', { path: 'owned/unknown.js' }).allowed, false);
  assert.equal(event('MultiEdit', { edits: [{ file_path: 'owned/a.js' }, { file_path: 'outside/b.js' }] }).allowed, false);
});

test('guard b/c: interpreters, stdin, MCP/cloud and configuration mutation are opaque', () => {
  const { event } = guardFixture();
  for (const tool of ['Bash', 'exec_command', 'write_stdin', 'mcp__cloud__write', 'functions.exec', 'unknown_write']) {
    const decision = event(tool, { command: 'python -c "mutate()"', chars: 'secret-example-never-log' });
    assert.equal(decision.allowed, false, tool);
  }
  for (const file of ['.codex/hooks.json', '.ecc/goal/active-goal.yaml', '.claude/settings.json', '.github/hooks/check.json']) {
    assert.equal(event('Write', { file_path: file }).allowed, false, file);
  }
});

test('guard paths: absolute, Windows/Git Bash aliases, traversal, ADS, symlink and every patch destination', () => {
  const { root, event } = guardFixture();
  assert.equal(event('Write', { file_path: path.join(root, 'owned/new.js') }).allowed, true);
  for (const file of ['owned/../outside.js', 'owned/alias. ', 'owned/file:stream', '../outside.js']) {
    assert.equal(event('Write', { file_path: file }).allowed, false, file);
  }
  fs.mkdirSync(path.join(root, 'outside'));
  fs.mkdirSync(path.join(root, 'owned'));
  fs.symlinkSync(path.join(root, 'outside'), path.join(root, 'owned/link'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.equal(event('Write', { file_path: 'owned/link/file.js' }).allowed, false);
  if (process.platform === 'win32') {
    const absolute = path.join(root, 'owned/new.js');
    assert.equal(event('Write', { file_path: absolute.toUpperCase() }).allowed, true);
    assert.equal(event('Write', { file_path: absolute.replace(/^([A-Z]):\\/i, (_, d) => '/' + d.toLowerCase() + '/').replace(/\\/g,'/') }).allowed, true);
    assert.equal(event('Write', { file_path: '\\\\server\\share\\outside.js' }).allowed, false);
    assert.equal(event('Write', { file_path: '\\\\?\\' + absolute }).allowed, false);
  }
  const patch = '*** Begin Patch\n*** Add File: owned/a.js\n+safe\n*** Update File: owned/b.js\n*** Move to: outside/c.js\n@@\n-old\n+new\n*** End Patch';
  assert.equal(event('apply_patch', { input: patch }).allowed, false);
  assert.equal(event('apply_patch', { input: patch.replace('outside/c.js', 'owned/c.js') }).allowed, true);
  assert.equal(event('apply_patch', { input: 'garbage\n' + patch }).allowed, false);
});

test('guard f: committed, staged, unstaged, deleted, renamed and untracked changes since frozen base', () => {
  const { root, event } = guardFixture();
  fs.writeFileSync(path.join(root, 'outside.js'), 'foreign');
  assert.equal(event(null, null, 'final').allowed, false);
  git(root, 'add', 'outside.js');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'foreign fixture');
  git(root, 'update-ref', 'refs/remotes/origin/development', 'HEAD');
  assert.equal(event(null, null, 'final').allowed, false);
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'fence', upstream: 'refs/remotes/origin/development' }), /outside owned/);
});

test('fresh native fence binds unchanged inherited drafts without granting write ownership', () => {
  const { root, event } = guardFixture('block', {}, root => {
    fs.writeFileSync(path.join(root,'retained.txt'),'tracked baseline\n');
    git(root,'add','retained.txt');git(root,'-c','core.hooksPath=','commit','-m','owned synthetic baseline');
    fs.appendFileSync(path.join(root,'retained.txt'),'foreign draft\n');
    fs.writeFileSync(path.join(root,'foreign.txt'),'untracked draft\n');
  });
  const before=fs.readFileSync(path.join(root,'retained.txt'));
  assert.equal(event('Read',{file_path:'retained.txt'}).allowed,true);
  assert.equal(event('Write',{file_path:'owned/new.js',content:'scoped'}).allowed,true);
  assert.equal(event('Edit',{file_path:'retained.txt',content:'unauthorized'}).allowed,false);
  assert.equal(event('Write',{file_path:'foreign.txt',content:'unauthorized'}).allowed,false);
  assert.equal(event('Bash',{command:'echo unsafe > outside.txt'}).allowed,false);
  assert.equal(event('Write',{file_path:'.ecc/config.json'}).allowed,false);
  assert.equal(event('Edit',{file_path:'README.md'}).allowed,false);
  fs.mkdirSync(path.join(root,'owned'));fs.writeFileSync(path.join(root,'owned/new.js'),'scoped');
  assert.equal(event(null,null,'final').allowed,true);
  const checked=execute('check-changes',{cwd:root,sessionId:'fence'});
  assert.equal(checked.allowed,true);assert.ok(checked.paths.includes('owned/new.js'));
  assert.deepEqual(checked.preservedForeign.sort(),['foreign.txt','retained.txt']);
  assert.equal(checked.foreignOwnershipGranted,false);assert.deepEqual(fs.readFileSync(path.join(root,'retained.txt')),before);
  assert.throws(()=>execute('release-acquire',{cwd:root,sessionId:'fence',branch:'fixture',candidate:git(root,'rev-parse','HEAD'),...budget()}),/outside owned|clean worktree/);
});

test('native inherited tracked drafts bind assume-unchanged and skip-worktree flags', () => {
  for(const flag of ['--assume-unchanged','--skip-worktree','--fsmonitor-valid']) {
    const f=guardFixture('block',{},root=>{
      fs.writeFileSync(path.join(root,'retained.txt'),'base\n');git(root,'add','retained.txt');
      git(root,'-c','core.hooksPath=','commit','-m','retained fixture');
      fs.appendFileSync(path.join(root,'retained.txt'),'draft\n');
    });
    if(flag==='--fsmonitor-valid')git(f.root,'config','core.fsmonitor','true');
    git(f.root,'update-index',flag,'retained.txt');
    assert.equal(f.event('Read',{}).allowed,false,flag);
    assert.equal(f.event(null,null,'final').allowed,false,flag);
  }
});

test('native same-byte replacement and baseline injection fail closed', () => {
  const f=guardFixture('block',{},root=>fs.writeFileSync(path.join(root,'foreign.txt'),'draft\n'));
  const file=path.join(f.root,'foreign.txt'),replacement=path.join(f.root,'replacement.tmp');
  fs.copyFileSync(file,replacement);fs.unlinkSync(file);fs.renameSync(replacement,file);
  assert.equal(f.event('Read',{}).allowed,false);
  const empty=guardFixture();
  const registry=path.join(repository(empty.root).directory,'registry.json'),state=JSON.parse(fs.readFileSync(registry,'utf8'));
  state.sessions.find(s=>s.id==='fence').preservedForeign={version:2,files:[{path:'injected.txt',index:'',indexFlags:'',absent:true}]};
  fs.writeFileSync(registry,JSON.stringify(state));assert.equal(empty.event('Read',{}).allowed,false);
});

test('native index visibility refuses hidden clean, dirty and owned tracked files', () => {
  for(const flag of ['--assume-unchanged','--skip-worktree']) {
    for(const dirty of [false,true])assert.throws(()=>guardFixture('block',{},root=>{
      git(root,'update-index',flag,'README.md');
      if(dirty)fs.appendFileSync(path.join(root,'README.md'),'hidden draft\n');
    }),/native index hides tracked paths/);
    for(const owned of [false,true]) {
      const f=guardFixture('block',{},root=>{
        fs.writeFileSync(path.join(root,'retained.txt'),'clean\n');git(root,'add','retained.txt');
        git(root,'-c','core.hooksPath=','commit','-m','visible fixture');
      });
      const file=owned?'README.md':'retained.txt';git(f.root,'update-index',flag,file);
      assert.equal(f.event('Read',{}).allowed,false);
      assert.equal(f.event(null,null,'final').allowed,false);
      assert.throws(()=>execute('check-changes',{cwd:f.root,sessionId:'fence'}),/native index hides tracked paths/);
      git(f.root,'update-index',flag==='--assume-unchanged'?'--no-assume-unchanged':'--no-skip-worktree',file);
      assert.equal(f.event('Read',{}).allowed,true);
    }
  }
});

test('native index visibility reads indexes beyond 1 MiB and still checks late flags', () => {
  const bulk=root=>{
    fs.mkdirSync(path.join(root,'bulk'));
    for(let i=0;i<17000;i++)fs.writeFileSync(path.join(root,'bulk',`${String(i).padStart(5,'0')}-${'x'.repeat(56)}.txt`),'');
    fs.writeFileSync(path.join(root,'zz-late.txt'),'late\n');
    git(root,'add','bulk','zz-late.txt');git(root,'-c','core.hooksPath=','commit','-q','-m','bulk index fixture');
  };
  const f=guardFixture('block',{},bulk);
  const listing=spawnSync('git',['ls-files','-v','-z','--'],{cwd:f.root,encoding:'utf8',windowsHide:true,maxBuffer:8*1024*1024});
  assert.equal(listing.status,0,listing.stderr);
  assert.ok(Buffer.byteLength(listing.stdout)>1024*1024,'fixture index listing must exceed the old 1 MiB default');
  assert.equal(f.event('Read',{}).allowed,true);
  // The flagged entry sorts after every bulk path, so it is read only beyond the first MiB.
  assert.throws(()=>guardFixture('block',{},root=>{bulk(root);git(root,'update-index','--skip-worktree','zz-late.txt');}),
    /native index hides tracked paths/);
});

test('legacy standard foreign ledgers remain readable but require fresh registration for native binding', () => {
  const f=guardFixture('block',{},root=>fs.writeFileSync(path.join(root,'foreign.txt'),'draft\n'));
  const file=path.join(repository(f.root).directory,'registry.json'),state=JSON.parse(fs.readFileSync(file,'utf8'));
  const session=state.sessions.find(s=>s.id==='fence');delete session.guard;
  session.preservedForeign.version=1;session.preservedForeign.files.forEach(entry=>{delete entry.indexFlags;delete entry.indexMonitor;});
  fs.writeFileSync(file,JSON.stringify(state));
  assert.equal(execute('check-changes',{cwd:f.root,sessionId:'fence'}).allowed,true);
  assert.throws(()=>execute('guard-bind',{cwd:f.root,sessionId:'fence',guardMode:'block'}),/fresh flag-bound/);
});

test('native foreign metadata batching handles spaces and Unicode beyond 128 files', t => {
  const names=Array.from({length:130},(_,i)=>`retained ${String(i).padStart(3,'0')} caf\u00e9.txt`);
  const {root,event}=guardFixture('block',{},root=>{
    for(const name of names)fs.writeFileSync(path.join(root,name),'base\n');
    git(root,'add','--',...names);git(root,'-c','core.hooksPath=','commit','-m','retained batch');
    for(const name of names)fs.appendFileSync(path.join(root,name),'draft\n');
  });
  const start=performance.now();assert.equal(event('Read',{}).allowed,true);
  t.diagnostic(`Measured 130-file/1430-byte native verification: ${(performance.now()-start).toFixed(1)} ms; synthetic tiny-file fixture, not a 1-GiB benchmark`);
  fs.appendFileSync(path.join(root,names[129]),'changed');
  assert.equal(event('Read',{}).allowed,false);
});

test('native inherited draft mutation, deletion, staging and committed history all deny completion', () => {
  for(const mutate of [
    root=>fs.appendFileSync(path.join(root,'foreign.txt'),'changed'),
    root=>fs.unlinkSync(path.join(root,'foreign.txt')),
    root=>git(root,'add','foreign.txt'),
    root=>{git(root,'add','foreign.txt');git(root,'-c','core.hooksPath=','commit','-m','unauthorized synthetic publication');},
  ]){
    const {root,event}=guardFixture('block',{},root=>fs.writeFileSync(path.join(root,'foreign.txt'),'draft\n'));
    mutate(root);assert.equal(event(null,null,'final').allowed,false);
    assert.equal(event('Read',{}).allowed,false);
  }
});

test('removing or replacing native foreign ledger bindings fails closed', () => {
  for(const mutate of [
    session=>{session.preservedForeign.files=[];},
    session=>{delete session.preservedForeign;},
    session=>{delete session.guard.foreignBaselineSha256;},
    session=>{delete session.preservedForeign;delete session.guard.foreignBaselineSha256;},
  ]){
    const {root,event}=guardFixture('block',{},root=>fs.writeFileSync(path.join(root,'foreign.txt'),'draft\n'));
    const file=path.join(repository(root).directory,'registry.json'),state=JSON.parse(fs.readFileSync(file,'utf8'));
    mutate(state.sessions.find(session=>session.id==='fence'));fs.writeFileSync(file,JSON.stringify(state));
    assert.equal(event('Read',{}).allowed,false);
  }
});

test('completion detects staged content restored in working tree, deletes and both rename paths', () => {
  const { root } = fixture();
  fs.writeFileSync(path.join(root, 'outside.js'), 'baseline');
  git(root, 'add', 'outside.js');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'outside baseline');
  register(root, 'scoped', ['README.md', 'owned']);
  fs.writeFileSync(path.join(root, 'outside.js'), 'staged change');
  git(root, 'add', 'outside.js');
  fs.writeFileSync(path.join(root, 'outside.js'), 'baseline');
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'scoped' }), /outside owned/);
  fs.unlinkSync(path.join(root, 'outside.js'));
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'scoped' }), /outside owned/);
  fs.mkdirSync(path.join(root, 'owned'));
  fs.writeFileSync(path.join(root, 'owned/moved.js'), 'baseline');
  git(root, 'add', '--', 'outside.js', 'owned/moved.js');
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'scoped' }), /outside owned/);
});

test('audit records would-deny without payloads; block rejects stale/corrupt/missing state and exhausted budgets', () => {
  const audit = guardFixture('audit');
  const decision = audit.event('Write', { file_path: 'outside.js', content: 'secret-example-never-log' });
  assert.equal(decision.allowed, true);
  assert.equal(decision.wouldDeny, true);
  const log = fs.readFileSync(path.join(audit.root, 'artifacts/agent-runs/scope-guard/fence.jsonl'), 'utf8');
  assert.doesNotMatch(log, /secret-example|outside.js|content|file_path/);
  const blocked = guardFixture('block', { toolLimit: 1, turnLimit: 1 });
  assert.equal(blocked.event('Write', { file_path: 'owned/a' }).allowed, true);
  assert.equal(blocked.event('Write', { file_path: 'owned/b' }).allowed, false);
  const turn = guardFixture('block', { turnLimit: 1 });
  assert.equal(turn.event(null, null, 'turn', { turn_id: 'one' }).allowed, true);
  assert.equal(turn.event(null, null, 'turn', { turn_id: 'one' }).allowed, true);
  assert.equal(turn.event(null, null, 'turn', { turn_id: 'two' }).allowed, false);
  const stale = guardFixture();
  stale.goal.current_priority = 'Owner corrected the requirement';
  fs.writeFileSync(path.join(stale.root, '.ecc/goal/active-goal.yaml'), JSON.stringify(stale.goal));
  assert.equal(stale.event('Read', {}).allowed, false);
  const corrupt = guardFixture();
  const registry = path.join(repository(corrupt.root).directory, 'registry.json');
  const state = JSON.parse(fs.readFileSync(registry));
  state.sessions[0].guard.allowedOperations = ['anything'];
  fs.writeFileSync(registry, JSON.stringify(state));
  assert.equal(corrupt.event('Write', { file_path: 'owned/a' }).allowed, false);
  const missing = guardFixture();
  fs.unlinkSync(path.join(missing.root, '.ecc/goal/active-goal.yaml'));
  assert.equal(missing.event('Read', {}).allowed, false);
});

test('trusted hook process allows owned write, denies protected tampering, wrong native identity, deadline and final drift', () => {
  const f = guardFixture();
  const hook = path.resolve(__dirname, '../../scripts/hooks/goal-runtime-gate.js');
  const run = (tool, input, event = 'pre') => spawnSync(process.execPath, [hook, 'codex', 'guard', 'block', event], {
    cwd: f.root, encoding: 'utf8', env: { ...process.env, ECC_SESSION_ID: 'fence' },
    input: JSON.stringify({ session_id: 'fence', cwd: f.root, tool_name: tool, tool_input: input }), windowsHide: true });
  assert.equal(run('Write', { file_path: 'owned/new.js' }).status, 0);
  const denied = run('Write', { file_path: 'outside.js' });
  assert.equal(denied.status, 0);
  assert.equal(JSON.parse(denied.stdout).hookSpecificOutput.permissionDecision, 'deny');
  assert.equal(f.event('Read', {}, 'pre', { session_id: 'other' }).allowed, false);
  const expired = execute('guard-event', { cwd: f.root, sessionId: 'fence', guardMode: 'block', event: 'pre', now: Date.now() + 700000,
    payload: { session_id: 'fence', cwd: f.root, tool_name: 'Read', tool_input: {} } });
  assert.equal(expired.allowed, false);
  fs.writeFileSync(path.join(f.root, 'README.md'), 'weakened protected configuration');
  assert.equal(f.event('Read', {}).allowed, false);
  fs.writeFileSync(path.join(f.root, 'README.md'), 'fixture\n');
  fs.writeFileSync(path.join(f.root, 'foreign.js'), 'outside');
  const final = run(null, null, 'final');
  assert.equal(final.status, 0);
  assert.equal(JSON.parse(final.stdout).decision, 'block');
});

test('owner CLI can hand off one file without closing product scopes or release lease', () => {
  const { root, other, sha } = fixture();
  register(root, 'owner', ['README.md', 'app/product']);
  const release = execute('release-acquire', { cwd: root, sessionId: 'owner', branch: 'fixture', candidate: sha, ...budget() });
  const result = invoke(root, ['handoff-file', '--session', 'owner', '--path', 'README.md', '--evidence', 'Owner hands reviewed instruction diff to system manager']);
  assert.equal(result.status, 0, result.stderr);
  const state = execute('status', { cwd: root });
  assert.deepEqual(state.release, release);
  assert.equal(state.sessions[0].state, 'active');
  assert.deepEqual(state.sessions[0].scopes, ['app/product']);
  assert.match(state.fileHandoffs[0].sha256, /^[a-f0-9]{64}$/);
  register(other, 'recipient', ['README.md']);
  assert.equal(invoke(root, ['check-write', '--session', 'owner', '--path', 'README.md']).status, 2);
});

test('file handoff refuses another owner, broad directory, multiple files or empty remainder', () => {
  const { root, other } = fixture();
  register(root, 'owner', ['app', 'README.md']);
  const options = { cwd: root, sessionId: 'owner', evidence: 'reviewed handoff' };
  assert.throws(() => execute('handoff-file', { ...options, cwd: other, paths: ['README.md'] }), /another worktree/);
  assert.throws(() => execute('handoff-file', { ...options, paths: ['app/file.md'] }), /exact owned file/);
  assert.throws(() => execute('handoff-file', { ...options, paths: ['README.md', 'app'] }), /exactly one/);
  assert.throws(() => execute('handoff-file', { ...options, paths: ['README.md'], evidence: '' }), /evidence required/);
  execute('handoff-file', { ...options, paths: ['README.md'] });
  assert.throws(() => execute('handoff-file', { ...options, paths: ['app'] }), /retain another scope/);
});

test('linked worktrees share registry and overlapping directory/file reservations fail', () => {
  const { root, other } = fixture();
  register(root, 'climate', ['app/climate']);
  assert.equal(repository(root).common, repository(other).common);
  assert.throws(() => register(other, 'meter', ['app/climate/model.py']), /overlaps session climate/);
  register(other, 'meter', ['app/meter']);
  assert.equal(execute('status', { cwd: root }).sessions.length, 2);
});

test('same checkout cannot be shared by two live owners even with disjoint paths', () => {
  const { root } = fixture();
  register(root, 'one', ['app/one']);
  assert.throws(() => register(root, 'two', ['app/two']), /worktree already owned/);
});

test('occupied checkout gives a covered-slot remedy, not a whole-goal handoff', () => {
  const { root, other } = fixture();
  register(root, 'primary-owner', ['app/primary']);
  const result = invoke(root, ['register', '--session', 'report', '--scope', 'app/report',
    '--objective', 'report readability', '--done-when', 'locally verified']);
  assert.equal(result.status, 2);
  const recovery = JSON.parse(result.stderr.trim().split(/\r?\n/).at(-1)).recovery;
  assert.equal(recovery.code, 'CHECKOUT_OCCUPIED');
  assert.equal(recovery.owner, 'primary-owner');
  assert.deepEqual(recovery.conflictingScopes, []);
  assert.match(recovery.nextAction, /covered isolation needs no new approval/);
  assert.equal(recovery.permissionGranted, false);
  register(other, 'report', ['app/report']);
  assert.equal(execute('check-write', { cwd: other, sessionId: 'report', paths: ['app/report/view.js'] }).allowed, true);
});

test('isolated same-file conflict names exact scopes and does not waive ownership', () => {
  const { root, other } = fixture();
  register(root, 'climate', ['app/climate']);
  assert.throws(() => register(other, 'report', ['app/climate/model.py']), error => {
    assert.equal(error.recovery.code, 'WRITE_SCOPE_CONFLICT');
    assert.deepEqual(error.recovery.conflictingScopes,
      [{ requested: 'app/climate/model.py', reserved: 'app/climate' }]);
    assert.equal(error.recovery.ownerCheckout, repository(root).root);
    assert.match(error.recovery.nextAction, /continue independent owned work/);
    assert.equal(error.recovery.permissionGranted, false);
    return true;
  });
  assert.equal(execute('status', { cwd: other }).sessions.length, 1);
});

test('foreign publication holds do not block isolated disjoint local work', () => {
  const { root, other, sha } = fixture();
  register(root, 'publisher', ['README.md']);
  execute('release-acquire', { cwd: root, sessionId: 'publisher', branch: 'fixture', candidate: sha, ...budget() });
  register(other, 'report', ['report.txt']);
  assert.equal(checkSession({ cwd: other, sessionId: 'report' }).id, 'report');
  assert.equal(execute('check-write', { cwd: other, sessionId: 'report', paths: ['report.txt'] }).allowed, true);
  fs.writeFileSync(path.join(other, 'report.txt'), 'local report\n');
  assert.deepEqual(execute('check-changes', { cwd: other, sessionId: 'report' }).paths, ['report.txt']);
  assert.throws(() => execute('release-acquire', { cwd: other, sessionId: 'report', branch: 'fixture',
    candidate: sha, ...budget() }), /release owned by publisher/);
  assert.equal(execute('status', { cwd: root }).release.owner, 'publisher');
});

test('ignored goal metadata shares a source checkout without touching its staged index', () => {
  const { root } = fixture(false);
  fs.writeFileSync(path.join(root, '.gitignore'), '.ecc/\n');
  git(root, 'add', '.gitignore');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'ignore local goal records');
  register(root, 'writer', ['README.md']);
  fs.writeFileSync(path.join(root, 'README.md'), 'source writer draft\n');
  git(root, 'add', 'README.md');
  const staged = git(root, 'diff', '--cached', '--binary');
  const meta = register(root, 'goal-meta', ['.ecc/goal/task-a']);
  assert.equal(meta.metadataOnly, true);
  register(root, 'second-goal', ['.ecc/goal/task-b']);
  assert.equal(execute('check-write', { cwd: root, sessionId: 'goal-meta', paths: ['.ecc/goal/task-a/resume-receipt.yaml'] }).allowed, true);
  assert.throws(() => execute('check-write', { cwd: root, sessionId: 'goal-meta', paths: ['README.md'] }), /outside owned/);
  assert.throws(() => register(root, 'overlap-goal', ['.ecc/goal/task-a/nested']), /overlaps session/);
  for (const command of ['check-changes', 'release-acquire', 'guard-bind', 'assignment-bind']) {
    assert.throws(() => execute(command, { cwd: root, sessionId: 'goal-meta' }), /metadata-only sessions cannot/);
  }
  execute('renew', { cwd: root, sessionId: 'goal-meta', ttl: 30 });
  execute('close', { cwd: root, sessionId: 'goal-meta' });
  assert.equal(git(root, 'diff', '--cached', '--binary'), staged);
  assert.equal(checkSession({ cwd: root, sessionId: 'writer' }).id, 'writer');
});

test('legacy ignored goal owners no longer block source writers, with tracked/non-goal scopes still exclusive', () => {
  const { root } = fixture(false);
  fs.writeFileSync(path.join(root, '.gitignore'), '.ecc/\n');
  git(root, 'add', '.gitignore');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'ignore local goal records');
  const goal = '.ecc/workspace-recovery/old/private/.ecc/goal-997a';
  register(root, 'legacy-goal', [goal]);
  // Simulate a v1 registry created before automatic metadata classification.
  const registry = path.join(repository(root).directory, 'registry.json');
  const state = JSON.parse(fs.readFileSync(registry, 'utf8'));
  delete state.sessions[0].metadataOnly;
  fs.writeFileSync(registry, JSON.stringify(state));
  const before = fs.readFileSync(registry, 'utf8');
  assert.equal(checkSession({ cwd: root, sessionId: 'legacy-goal' }).metadataOnly, true);
  assert.equal(execute('status', { cwd: root }).sessions.find(item => item.id === 'legacy-goal').metadataOnly, true);
  assert.equal(fs.readFileSync(registry, 'utf8'), before, 'effective classification never takes over a foreign record');
  register(root, 'source', ['README.md']);
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'legacy-goal' }), /metadata-only/);
  assert.throws(() => register(root, 'another-source', ['app/unrelated']), /worktree already owned/);
  execute('metadata-only', { cwd: root, sessionId: 'legacy-goal' });
  assert.equal(execute('check-write', { cwd: root, sessionId: 'source', paths: ['README.md'] }).allowed, true);
});

test('legacy nested ignored task goals share a checkout but retain exact overlap and Git fences', () => {
  const { root } = fixture(false);
  fs.writeFileSync(path.join(root, '.gitignore'), '.ecc/\n');
  git(root, 'add', '.gitignore');
  git(root, 'commit', '-m', 'ignore local task goals');
  register(root, 'writer', ['README.md']);
  const goal = '.ecc/zproperty-wholebuilding-20261011/.ecc/goal/task-a';
  assert.equal(register(root, 'nested-meta', [goal]).metadataOnly, true);
  register(root, 'nested-other', ['.ecc/zproperty-wholebuilding-20261011/.ecc/goal/task-b']);
  assert.equal(execute('check-write', { cwd: root, sessionId: 'nested-meta', paths: [goal + '/active-goal.yaml'] }).allowed, true);
  assert.throws(() => register(root, 'overlap', [goal + '/child']), /overlaps session/);
  for (const command of ['check-changes', 'release-acquire', 'guard-bind']) {
    assert.throws(() => execute(command, { cwd: root, sessionId: 'nested-meta' }), /metadata-only sessions cannot/);
  }
  assert.throws(() => register(root, 'not-goal', ['.ecc/zproperty-wholebuilding-20261011/.ecc/config']), /worktree already owned/);
  assert.equal(checkSession({ cwd: root, sessionId: 'writer' }).id, 'writer');
});

test('tracked nested goal lookalikes never become metadata-only', () => {
  const { root } = fixture(false);
  const goal = '.ecc/legacy-task/.ecc/goal';
  fs.mkdirSync(path.join(root, goal), { recursive: true });
  fs.writeFileSync(path.join(root, goal, 'active-goal.yaml'), 'tracked source\n');
  git(root, 'add', '.ecc');
  git(root, 'commit', '-m', 'tracked nested lookalike');
  fs.writeFileSync(path.join(root, '.gitignore'), '.ecc/\n');
  const record = register(root, 'tracked-nested', [goal]);
  assert.equal(record.metadataOnly, undefined);
  assert.throws(() => execute('metadata-only', { cwd: root, sessionId: 'tracked-nested' }), /requires ignored/);
  assert.throws(() => register(root, 'writer', ['README.md']), /worktree already owned/);
});

test('tracked goal-looking files and non-goal ignored files cannot gain metadata privileges', () => {
  const { root, other } = fixture();
  fs.mkdirSync(path.join(root, '.ecc/goal'), { recursive: true });
  fs.writeFileSync(path.join(root, '.ecc/goal/tracked.yaml'), 'tracked fixture\n');
  git(root, 'add', '.ecc/goal/tracked.yaml');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'tracked goal-looking source');
  const record = register(root, 'tracked', ['.ecc/goal/tracked.yaml']);
  assert.equal(record.metadataOnly, undefined);
  assert.throws(() => execute('metadata-only', { cwd: root, sessionId: 'tracked' }), /requires ignored/);
  assert.throws(() => register(root, 'second', ['README.md']), /worktree already owned/);
  execute('close', { cwd: root, sessionId: 'tracked' });
  const plain = register(root, 'plain', ['.ecc/other-state']);
  assert.equal(plain.metadataOnly, undefined);
  assert.throws(() => execute('metadata-only', { cwd: root, sessionId: 'plain' }), /requires ignored/);
  assert.throws(() => register(other, 'same-goal', ['.ecc/other-state']), /overlaps session/);
});

function privateMetadataPair() {
  const f = fixture();
  for (const checkout of [f.root, f.other]) {
    fs.writeFileSync(path.join(checkout, '.gitignore'), '.ecc/\n');
    fs.mkdirSync(path.join(checkout, '.ecc/goal'), { recursive: true });
    fs.writeFileSync(path.join(checkout, '.ecc/goal/active-goal.yaml'), `private ${path.basename(checkout)}\n`);
  }
  return f;
}

test('private metadata in separate worktrees admits identical scopes without changing either goal or index', () => {
  const { root, other } = privateMetadataPair();
  const originals = [root, other].map(checkout => ({
    goal: fs.readFileSync(path.join(checkout, '.ecc/goal/active-goal.yaml')),
    index: fs.readFileSync(path.resolve(checkout, git(checkout, 'rev-parse', '--git-path', 'index')))
  }));
  register(root, 'private-first', ['.ecc/goal']);
  assert.equal(register(other, 'private-second', ['.ecc/goal']).metadataOnly, true);
  for (const [i, checkout] of [root, other].entries()) {
    const id = i === 0 ? 'private-first' : 'private-second';
    assert.equal(execute('check-write', { cwd: checkout, sessionId: id, paths: ['.ecc/goal/active-goal.yaml'] }).allowed, true);
    assert.deepEqual(fs.readFileSync(path.join(checkout, '.ecc/goal/active-goal.yaml')), originals[i].goal);
    assert.deepEqual(fs.readFileSync(path.resolve(checkout, git(checkout, 'rev-parse', '--git-path', 'index'))), originals[i].index);
  }
  assert.throws(() => register(root, 'private-same-checkout', ['.ecc/goal']), /overlaps session/);
});

test('private metadata exemption never admits mixed or source scopes across worktrees', () => {
  const { root, other } = privateMetadataPair();
  register(root, 'private-first', ['.ecc/goal']);
  assert.throws(() => register(other, 'mixed', ['.ecc/goal', 'README.md']), /overlaps session/);
});

test('private metadata exemption revalidates peer ignore status after reservation', () => {
  const { root, other } = privateMetadataPair();
  register(root, 'private-first', ['.ecc/goal']);
  fs.writeFileSync(path.join(root, '.gitignore'), '');
  assert.throws(() => register(other, 'private-second', ['.ecc/goal']), /invalid goal metadata scope/);
});

test('private metadata exemption revalidates peer tracked state after reservation', () => {
  const { root, other } = privateMetadataPair();
  register(root, 'private-first', ['.ecc/goal']);
  git(root, 'add', '-f', '.ecc/goal/active-goal.yaml');
  assert.throws(() => register(other, 'private-second', ['.ecc/goal']), /invalid goal metadata scope/);
});

test('private metadata exemption refuses peer links added after reservation', () => {
  const { root, other } = privateMetadataPair();
  register(root, 'private-first', ['.ecc/goal']);
  fs.renameSync(path.join(root, '.ecc'), path.join(root, '.ecc-retained'));
  fs.symlinkSync(path.join(root, '.ecc-retained'), path.join(root, '.ecc'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => register(other, 'private-second', ['.ecc/goal']), /linked path/);
});

test('private metadata exemption cannot bypass a held peer release after its session expires', () => {
  const { root, other } = privateMetadataPair();
  const peer = register(root, 'private-first', ['.ecc/goal']);
  const registry = path.join(repository(root).directory, 'registry.json');
  const state = JSON.parse(fs.readFileSync(registry, 'utf8'));
  delete state.sessions.find(s => s.id === peer.id).metadataOnly;
  state.release = { owner: peer.id, candidate: peer.base, branch: 'fixture', acquiredAt: Date.now(), expiresAt: peer.expiresAt };
  fs.writeFileSync(registry, JSON.stringify(state));
  assert.throws(() => register(other, 'private-second', ['.ecc/goal'], peer.expiresAt + 1), /overlaps session/);
});

test('links added after reservation cannot redirect an owned edit outside the worktree', () => {
  const { root, other } = fixture();
  register(root, 'one', ['linked']);
  fs.symlinkSync(other, path.join(root, 'linked'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.equal(invoke(root, ['check-write', '--session', 'one', '--path', 'linked/README.md']).status, 2);
  fs.unlinkSync(path.join(root, 'linked'));
});

test('actual CLI rejects another session scope and traversal; owned write passes', () => {
  const { root, other } = fixture();
  register(root, 'climate', ['app/climate']);
  assert.equal(invoke(root, ['check-write', '--session', 'climate', '--path', 'app/climate/score.py']).status, 0);
  for (const file of ['app/meter/optimizer.py', '../other', 'app/climate/../../other', 'app/climate./x', '.git/config']) {
    assert.equal(invoke(root, ['check-write', '--session', 'climate', '--path', file]).status, 2, file);
  }
  assert.equal(invoke(other, ['check-write', '--session', 'climate', '--path', 'app/climate/x.py']).status, 2);
});

test('missing, expired, closed IDs and implicit cwd ownership fail closed', () => {
  const { root } = fixture();
  register(root, 'one', ['README.md'], 100);
  assert.throws(() => checkSession({ cwd: root, sessionId: 'one', now: 8000000 }), /expired/);
  assert.equal(invoke(root, ['check-changes']).status, 2);
  execute('renew', { cwd: root, sessionId: 'one', now: 8000000 });
  execute('close', { cwd: root, sessionId: 'one', now: 8000001 });
  assert.throws(() => checkSession({ cwd: root, sessionId: 'one', now: 8000002 }), /closed/);
});

test('expired write reservation may be reassigned; old owner cannot renew over successor', () => {
  const { root, other } = fixture();
  register(root, 'old', ['app/climate'], 100);
  register(other, 'new', ['app/climate'], 8000000);
  assert.throws(() => execute('renew', { cwd: root, sessionId: 'old', now: 8000001 }), /overlaps/);
});

test('check-changes catches untracked and committed foreign work, not just staged paths', () => {
  const { root } = fixture();
  register(root, 'climate', ['README.md']);
  fs.writeFileSync(path.join(root, 'meter.py'), 'foreign\n');
  assert.equal(invoke(root, ['check-changes', '--session', 'climate']).status, 2);
  git(root, 'add', 'meter.py');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'foreign fixture');
  assert.equal(invoke(root, ['check-changes', '--session', 'climate']).status, 2);
});

test('standard sessions preserve inherited foreign bytes without owning or staging them', () => {
  const { root } = fixture();
  fs.appendFileSync(path.join(root, 'README.md'), 'another owner draft\n');
  fs.writeFileSync(path.join(root, 'foreign.txt'), 'private draft\n');
  const before = fs.readFileSync(path.join(root, 'README.md'));
  const session = register(root, 'writer', ['owned.txt']);
  assert.equal(session.preservedForeign.files.length, 2);
  fs.writeFileSync(path.join(root, 'owned.txt'), 'own change\n');
  git(root, 'add', 'owned.txt');
  const result = execute('check-changes', { cwd: root, sessionId: 'writer' });
  assert.deepEqual(result.paths, ['owned.txt']);
  assert.deepEqual(result.preservedForeign.sort(), ['README.md', 'foreign.txt'].sort());
  assert.equal(result.foreignOwnershipGranted, false);
  assert.deepEqual(fs.readFileSync(path.join(root, 'README.md')), before);
  assert.equal(git(root, 'diff', '--cached', '--name-only'), 'owned.txt');
});

test('foreign staging at registration is never inherited', () => {
  const { root } = fixture();
  fs.appendFileSync(path.join(root, 'README.md'), 'foreign\n');
  git(root, 'add', 'README.md');
  assert.throws(() => register(root, 'writer', ['owned.txt']), /foreign staging/);
});

test('foreign committed history cannot be hidden by restoring the index or reverting', () => {
  for (const revert of [false, true]) {
    const { root, sha } = fixture();
    const file = path.join(root, 'README.md');
    fs.appendFileSync(file, 'foreign draft\n');
    const draft = fs.readFileSync(file);
    register(root, 'writer', ['owned.txt']);
    git(root, 'add', 'README.md');
    git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'foreign fixture');
    if (revert) {
      git(root, '-c', 'core.hooksPath=', 'revert', '--no-edit', 'HEAD');
      fs.writeFileSync(file, draft);
    } else git(root, 'read-tree', sha);
    assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'writer' }), /foreign baseline entered committed history/);
  }
});

test('changed foreign file size rejects before its payload is opened for hashing', () => {
  const { root } = fixture();
  const file = path.join(root, 'foreign.txt');
  fs.writeFileSync(file, 'draft\n');
  register(root, 'writer', ['owned.txt']);
  fs.appendFileSync(file, 'growth\n');
  const open = fs.openSync;
  let foreignOpens = 0;
  fs.openSync = function(target, ...args) {
    if (String(target).toLowerCase() === file.toLowerCase()) foreignOpens += 1;
    return open.call(this, target, ...args);
  };
  try { assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'writer' }), /foreign baseline changed/); }
  finally { fs.openSync = open; }
  assert.equal(foreignOpens, 0);
});

test('foreign growth during hashing cannot exceed the admitted read size', () => {
  const { root } = fixture();
  const file = path.join(root, 'foreign.txt');
  fs.writeFileSync(file, 'draft\n');
  const original = fs.statSync(file), read = fs.readSync;
  let changed = false, bytesRead = 0;
  fs.readSync = function(fd, ...args) {
    if (fs.fstatSync(fd).ino === original.ino) {
      if (!changed) { fs.appendFileSync(file, 'concurrent growth\n'); changed = true; }
      const bytes = read.call(this, fd, ...args); bytesRead += bytes; return bytes;
    }
    return read.call(this, fd, ...args);
  };
  try { assert.throws(() => register(root, 'writer', ['owned.txt']), /foreign baseline changed/); }
  finally { fs.readSync = read; }
  assert.equal(changed, true);
  assert.equal(bytesRead, original.size);
});

test('foreign byte changes, new files, deletion and index changes reject after registration', () => {
  const mutations = [
    root => fs.appendFileSync(path.join(root, 'README.md'), 'changed\n'),
    root => fs.writeFileSync(path.join(root, 'new-foreign.txt'), 'new\n'),
    root => fs.unlinkSync(path.join(root, 'README.md')),
    root => git(root, 'add', 'README.md'),
  ];
  for (const mutate of mutations) {
    const { root } = fixture();
    fs.appendFileSync(path.join(root, 'README.md'), 'inherited foreign\n');
    register(root, 'writer', ['owned.txt']);
    mutate(root);
    assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'writer' }),
      /foreign baseline changed|outside owned/);
  }
});

test('staging an inherited untracked draft is denied even when its bytes do not change', () => {
  const { root } = fixture();
  fs.writeFileSync(path.join(root, 'foreign.txt'), 'draft\n');
  register(root, 'writer', ['owned.txt']);
  git(root, 'add', 'foreign.txt');
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'writer' }), /foreign baseline changed/);
});

test('inherited deletions remain absent and cannot be silently restored', () => {
  const { root } = fixture();
  fs.unlinkSync(path.join(root, 'README.md'));
  register(root, 'writer', ['owned.txt']);
  assert.deepEqual(execute('check-changes', { cwd: root, sessionId: 'writer' }).preservedForeign, ['README.md']);
  fs.writeFileSync(path.join(root, 'README.md'), 'fixture\n');
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'writer' }), /foreign baseline changed/);
});

test('linked inherited paths do not gain a preservation exception', () => {
  const { root, other } = fixture();
  fs.writeFileSync(path.join(root, 'foreign.txt'), 'draft\n');
  register(root, 'writer', ['owned.txt']);
  const linked = path.join(root, 'linked');
  fs.symlinkSync(other, linked, process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => register(other, 'linked-writer', ['owned.txt']), /already owned|overlaps/);
  assert.throws(() => execute('check-write', { cwd: root, sessionId: 'writer', paths: ['linked/README.md'] }), /linked path/);
});

test('experiment loops never exempt inherited foreign drafts', () => {
  const { root } = fixture();
  fs.writeFileSync(path.join(root, 'owned.txt'), 'target\n');
  fs.writeFileSync(path.join(root, 'check.txt'), 'immutable check\n');
  git(root, 'add', 'owned.txt', 'check.txt');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'loop target fixture');
  fs.writeFileSync(path.join(root, 'foreign.txt'), 'other draft\n');
  execute('register', { cwd: root, sessionId: 'loop', scopes: ['owned.txt'], objective: 'atomic experiment',
    doneWhen: 'protected checks', loopTarget: 'owned.txt', checkFiles: ['check.txt'] });
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'loop' }), /outside owned/);
});

test('publication remains strict even when standard checks preserve foreign drafts', () => {
  const { root, sha } = fixture();
  fs.writeFileSync(path.join(root, 'foreign.txt'), 'draft\n');
  register(root, 'writer', ['README.md']);
  assert.equal(execute('check-changes', { cwd: root, sessionId: 'writer' }).allowed, true);
  assert.throws(() => execute('release-acquire', { cwd: root, sessionId: 'writer', branch: 'development', candidate: sha, ...budget() }),
    /outside owned|clean worktree/);
});

test('legacy records remain strict and cannot retroactively inherit foreign changes', () => {
  const { root } = fixture();
  register(root, 'writer', ['README.md']);
  const file = path.join(repository(root).directory, 'registry.json');
  const state = JSON.parse(fs.readFileSync(file, 'utf8'));
  delete state.sessions[0].preservedForeign;
  fs.writeFileSync(file, JSON.stringify(state));
  fs.writeFileSync(path.join(root, 'foreign.txt'), 'draft\n');
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'writer' }), /outside owned/);
});

test('already published upstream changes are not claimed as owned edits after integration', () => {
  const { root } = fixture();
  register(root, 'climate', ['README.md']);
  fs.writeFileSync(path.join(root, 'meter.py'), 'published by another fixture session\n');
  git(root, 'add', 'meter.py');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'published unrelated fixture');
  git(root, 'update-ref', 'refs/remotes/origin/development', 'HEAD');
  const result = invoke(root, ['check-changes', '--session', 'climate', '--upstream', 'refs/remotes/origin/development']);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).paths, []);
});

test('release serializes publication but permits disjoint local work', () => {
  const { root, other, sha } = fixture();
  register(root, 'release', ['README.md']);
  register(other, 'worker', ['app/meter']);
  execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, ...budget() });
  assert.throws(() => execute('release-acquire', { cwd: other, sessionId: 'worker', branch: 'development', candidate: sha, ...budget() }), /release owned by release/);
  assert.equal(invoke(other, ['check-write', '--session', 'worker', '--path', 'app/meter/x.py']).status, 0);
  assert.equal(invoke(root, ['check-release', '--session', 'release', '--branch', 'development', '--candidate', sha]).status, 0);
  assert.equal(invoke(root, ['check-release', '--session', 'release', '--branch', 'main', '--candidate', sha]).status, 2);
});

test('release acquisition records a fresh Actions budget receipt and fails closed at the tripwire', () => {
  const { root, sha } = fixture();
  const now = Date.now();
  register(root, 'release', ['README.md'], now);
  const base = { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, now };
  assert.throws(() => execute('release-acquire', base), /actions-budget-source/);
  assert.throws(() => execute('release-acquire', { ...base, ...budget(now - 3600001) }), /within the last hour/);
  assert.throws(() => execute('release-acquire', { ...base, ...budget(now), expectedActionsUsd: -1 }), /non-negative USD/);
  assert.throws(() => execute('release-acquire', { ...base, ...budget(now), actionsBudgetUsed: ' ' }), /actions-budget-used required/);
  assert.throws(() => execute('release-acquire', { ...base, ...budget(now), actionsBudgetCheckedAt: '2026-10-01' }), /ISO UTC timestamp/);
  assert.throws(() => execute('release-acquire', { ...base, ...budget(now), actionsBudgetUsed: 89 }), /owner cost approval/);
  assert.throws(() => execute('release-acquire', { ...base, ...budget(now), actionsStopUsage: 'no' }), /owner cost approval/);
  assert.throws(() => execute('release-acquire', { ...base, ...budget(now), actionsBudgetStatus: 'unknown' }), /owner cost approval/);
  const result = execute('release-acquire', { ...base, ...budget(now), actionsBudgetUsed: 89,
    ownerCostApproval: 'Alejandro approved this named development security-scan batch' });
  assert.equal(result.actionsBudget.projectedPercent, 90);
  assert.equal(result.actionsBudget.expectedWorkflows[0], 'security-scan');
  assert.equal(result.actionsBudget.source, 'github-org-budget-ui');
});

test('unknown billing can be unavailable with zero expected cost only under named approval', () => {
  const { root, sha } = fixture(false);
  const now = Date.now();
  register(root, 'release', ['README.md'], now);
  const options = { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, now,
    ...budget(now), actionsBudgetStatus: 'unknown', actionsBudgetSource: 'unavailable',
    actionsStopUsage: 'unknown', expectedActionsUsd: 0 };
  assert.throws(() => execute('release-acquire', options), /owner cost approval/);
  const result = execute('release-acquire', { ...options,
    ownerCostApproval: 'Owner approved this named public CI batch' });
  assert.equal(result.actionsBudget.status, 'unknown');
  assert.equal(result.actionsBudget.source, 'unavailable');
  assert.equal(result.actionsBudget.usedUsd, null);
  assert.equal(result.actionsBudget.limitUsd, null);
  assert.equal(result.actionsBudget.projectedPercent, null);
  assert.equal(result.actionsBudget.expectedUsd, 0);
  assert.deepEqual(result.actionsBudget.expectedWorkflows, ['security-scan']);
  assert.equal(execute('check-release', { ...options, now: now + 1 }).allowed, true);
  assert.throws(() => execute('check-release', { ...options, now: now + 3600001 }), /within the last hour/);
});

test('unavailable billing never becomes a known balance or an unchecked estimate', () => {
  const { root, sha } = fixture(false);
  const now = Date.now();
  register(root, 'release', ['README.md'], now);
  const options = { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, now,
    ...budget(now), actionsBudgetStatus: 'unknown', actionsBudgetSource: 'unavailable',
    expectedActionsUsd: 0, ownerCostApproval: 'Owner approved this named CI batch' };
  assert.throws(() => execute('release-acquire', { ...options, actionsBudgetStatus: 'known' }), /billing observation/);
  for (const value of [-1, NaN, Infinity, undefined, null, ' ']) {
    assert.throws(() => execute('release-acquire', { ...options, expectedActionsUsd: value }),
      /expected-actions-usd (?:required|must be a finite non-negative USD)/);
  }
  for (const time of [now - 3600001, now + 120001]) {
    assert.throws(() => execute('release-acquire', { ...options,
      actionsBudgetCheckedAt: new Date(time).toISOString() }), /within the last hour/);
  }
});

test('zero expected cost preserves the 90 percent approval and hard stop', () => {
  const { root, sha } = fixture(false);
  const now = Date.now();
  register(root, 'release', ['README.md'], now);
  const options = { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, now,
    ...budget(now), actionsBudgetUsed: 450, actionsBudgetLimit: 500, expectedActionsUsd: 0 };
  assert.throws(() => execute('release-acquire', options), /owner cost approval/);
  const approved = { ...options, ownerCostApproval: 'Owner approved this named zero incremental cost batch' };
  assert.throws(() => execute('release-acquire', { ...approved, actionsBudgetUsed: 500 }), /hard spending stop/);
  assert.equal(execute('release-acquire', approved).actionsBudget.projectedPercent, 90);
});

test('check-release still requires approval when the stored billing status is unknown', () => {
  const { root, sha } = fixture(false);
  const now = Date.now();
  register(root, 'release', ['README.md'], now);
  const options = { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, now,
    ...budget(now), actionsBudgetStatus: 'unknown', actionsBudgetSource: 'unavailable',
    expectedActionsUsd: 0, ownerCostApproval: 'Owner approved this named CI batch' };
  execute('release-acquire', options);
  const registry = path.join(repository(root).directory, 'registry.json');
  const state = JSON.parse(fs.readFileSync(registry, 'utf8'));
  state.release.actionsBudget.ownerCostApproval = null;
  fs.writeFileSync(registry, JSON.stringify(state));
  assert.throws(() => execute('check-release', options), /owner cost approval/);
});

test('a 90 percent exception cannot override the unchanged hard Actions stop', () => {
  const { root, sha } = fixture();
  const now = Date.now();
  register(root, 'release', ['README.md'], now);
  const base = { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, now,
    ...budget(now), actionsBudgetLimit: 500, ownerCostApproval: 'Owner approves a bounded 90 percent exception only' };
  for (const expectedActionsUsd of [1, 2]) {
    assert.throws(() => execute('release-acquire', { ...base, actionsBudgetUsed: 499, expectedActionsUsd }), /hard spending stop/);
  }
  assert.equal(execute('release-acquire', { ...base, actionsBudgetUsed: 498, expectedActionsUsd: 1 }).actionsBudget.limitUsd, 500);
});

test('check-release revalidates billing freshness even while its lease remains active', () => {
  const { root, sha } = fixture();
  const now = Date.now();
  register(root, 'release', ['README.md'], now);
  const options = { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, now,
    ttl: 120, ...budget(now) };
  execute('release-acquire', options);
  assert.equal(execute('check-release', { ...options, now: now + 3599999 }).allowed, true);
  assert.throws(() => execute('check-release', { ...options, now: now + 3600001 }), /within the last hour/);
});

test('release expiry is not proof a remote job stopped; it prevents takeover', () => {
  const { root, other, sha } = fixture();
  register(root, 'release', ['README.md'], 100);
  register(other, 'worker', ['app/meter'], 100);
  execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, ttl: 1, now: 100, ...budget(100) });
  assert.throws(() => execute('check-release', { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, now: 60200 }), /lease expired/);
  assert.throws(() => execute('release-acquire', { cwd: other, sessionId: 'worker', branch: 'development', candidate: sha, now: 60200, ...budget(60200) }), /release owned/);
  assert.throws(() => execute('close', { cwd: root, sessionId: 'release', now: 60200 }), /terminal status/);
  execute('release-end', { cwd: root, sessionId: 'release', outcome: 'failed', evidence: 'fixture run terminal failure', now: 60200 });
  assert.throws(() => execute('release-acquire', { cwd: other, sessionId: 'worker', branch: 'development', candidate: sha, now: 60201, ...budget(60201) }), /retry-evidence/);
  execute('release-acquire', { cwd: other, sessionId: 'worker', branch: 'development', candidate: sha,
    retryEvidence: 'Runner outage repaired; one justified retry of unchanged source', now: 60201, ...budget(60201) });
});

test('completed candidate cannot be released twice even with retry prose', () => {
  const { root, sha } = fixture();
  register(root, 'release', ['README.md']);
  execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, ...budget() });
  execute('release-end', { cwd: root, sessionId: 'release', outcome: 'completed', evidence: 'fixture completed' });
  assert.throws(() => execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate: sha,
    retryEvidence: 'no new code', ...budget() }), /candidate already released/);
});

test('changed HEAD never silently retargets an acquired candidate', () => {
  const { root, sha } = fixture();
  register(root, 'release', ['README.md']);
  execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, ...budget() });
  git(root, '-c', 'core.hooksPath=', 'commit', '--allow-empty', '-m', 'later unrelated fixture');
  assert.equal(invoke(root, ['check-release', '--session', 'release', '--branch', 'development', '--candidate', sha]).status, 2);
});

test('dirty candidates and mismatched integration baselines cannot acquire publication', () => {
  const { root, sha } = fixture();
  register(root, 'release', ['README.md']);
  fs.appendFileSync(path.join(root, 'README.md'), 'change\n');
  assert.equal(invoke(root, ['release-acquire', '--session', 'release', '--branch', 'development', '--candidate', sha, ...budgetArgs()]).status, 2);
  assert.equal(invoke(root, ['release-acquire', '--session', 'release', '--branch', 'development', '--candidate', sha,
    '--upstream', 'refs/remotes/origin/main', ...budgetArgs()]).status, 2);
});

test('negative control: removing overlap enforcement breaks the denial assertion', () => {
  const { root, other } = fixture();
  const mutant = path.join(workspace, 'mutant');
  fs.mkdirSync(path.join(mutant, 'lib'), { recursive: true });
  fs.copyFileSync(cli, path.join(mutant, 'session-coordinate.js'));
  fs.copyFileSync(path.resolve(__dirname, '../../scripts/lib/atomic-write.js'), path.join(mutant, 'lib/atomic-write.js'));
  const source = fs.readFileSync(path.resolve(__dirname, '../../scripts/lib/session-coordination.js'), 'utf8');
  const weakened = source.replace("return a === b || a.startsWith(`${b}/`) || b.startsWith(`${a}/`);", 'return false;');
  assert.notEqual(weakened, source, 'mutation must apply');
  fs.writeFileSync(path.join(mutant, 'lib/session-coordination.js'), weakened);
  register(root, 'one', ['app/shared']);
  const result = spawnSync(process.execPath, [path.join(mutant, 'session-coordinate.js'), 'register', '--session', 'two',
    '--scope', 'app/shared', '--objective', 'mutant', '--done-when', 'denial expected'], { cwd: other, encoding: 'utf8', windowsHide: true });
  assert.equal(result.status, 0, result.stderr);
  assert.throws(() => assert.equal(result.status, 2), assert.AssertionError);
});

function publicationFixture() {
  const f = fixture(false);
  // Configuration only: no network, provider or production remote is used.
  git(f.root, 'remote', 'add', 'origin', path.join(workspace, 'unused-local-remote.git'));
  git(f.root, 'update-ref', 'refs/remotes/origin/development', f.sha);
  return f;
}
function observerFixture() {
  const f = publicationFixture(), remote = f.root + '-remote.git';
  git(f.root, 'remote', 'set-url', 'origin', remote);
  git(f.root, 'init', '--bare', remote);
  git(f.root, 'push', 'origin', 'HEAD:refs/heads/development');
  register(f.root, 'publisher', ['README.md']);
  const options = {cwd:f.root, sessionId:'publisher', branch:'development', candidate:f.sha};
  const release = execute('release-acquire', {...options, ...budget()});
  return {...f, options, release};
}
test('published owner becomes source-free observer; successor writes while release stays exclusive', () => {
  const f = observerFixture();
  const observer = execute('release-observe', f.options);
  assert.equal(observer.state, 'closed');
  assert.equal(observer.sourceOwnershipClosed, true);
  assert.deepEqual(execute('status', {cwd:f.root}).release, f.release);
  assert.throws(() => checkSession({cwd:f.root,sessionId:'publisher'}), /closed/);
  for (const command of ['check-write','check-changes','guard-bind','renew','release-acquire','check-release','metadata-only','handoff-file']) {
    assert.throws(() => execute(command, {...f.options, paths:['README.md']}), /observer has no/);
  }
  register(f.root, 'successor', ['README.md']);
  assert.equal(execute('check-write', {cwd:f.root, sessionId:'successor', paths:['README.md']}).allowed, true);
  fs.appendFileSync(path.join(f.root,'README.md'), 'successor draft\n');
  const draft = fs.readFileSync(path.join(f.root,'README.md'));
  assert.throws(() => execute('release-acquire', {...f.options,sessionId:'successor',...budget()}), /release owned/);
  assert.throws(() => execute('release-end', {...f.options,candidate:'0'.repeat(40),outcome:'completed',evidence:'wrong'}), /binding changed/);
  assert.throws(() => execute('close', f.options), /observer has no/);
  execute('release-renew', {...f.options, ttl:30});
  execute('release-end', {...f.options,outcome:'completed',evidence:'exact fixture CI terminal'});
  assert.equal(execute('close', f.options).releaseObservation, undefined);
  assert.deepEqual(fs.readFileSync(path.join(f.root,'README.md')), draft);
  assert.equal(execute('status', {cwd:f.root}).release, null);
});
test('observer transition rejects foreign owner, wrong checkout/candidate, drafts and unpublished candidates', () => {
  const f = observerFixture();
  assert.throws(() => execute('release-observe', {...f.options,sessionId:'foreign'}), /missing/);
  const other = f.root + '-observer'; git(f.root, 'worktree', 'add', '--detach', other, 'HEAD');
  assert.throws(() => execute('release-observe', {...f.options,cwd:other}), /another worktree/);
  assert.throws(() => execute('release-observe', {...f.options,candidate:'0'.repeat(40)}), /own published/);
  fs.appendFileSync(path.join(f.root,'README.md'), 'draft\n');
  assert.throws(() => execute('release-observe', f.options), /clean candidate/);
  assert.equal(execute('status',{cwd:f.root}).sessions[0].state,'active');
  const g = observerFixture();
  git(g.root,'push','origin',':refs/heads/development');
  assert.throws(() => execute('release-observe',g.options));
  assert.equal(execute('status',{cwd:g.root}).sessions[0].state,'active');
});
test('observer release destination cannot drift or be reacquired through a legacy closed session', () => {
  const f=observerFixture(); execute('release-observe',f.options);
  const file=path.join(repository(f.root).directory,'registry.json');
  const state=JSON.parse(fs.readFileSync(file,'utf8'));
  assert.equal(state.version,1); assert.equal(state.sessions[0].state,'closed');
  assert.equal(state.sessions[0].scopes.length,1,'retained audit scopes do not reserve files');
  git(f.root,'remote','set-url','origin',path.join(workspace,'other-remote.git'));
  assert.throws(()=>execute('release-end',{...f.options,outcome:'completed',evidence:'terminal'}),/binding changed/);
  assert.deepEqual(execute('status',{cwd:f.root}).release,f.release);
});
function fixtureCommit(root, file, content, message) {
  if (content === null) fs.unlinkSync(path.join(root, file));
  else fs.writeFileSync(path.join(root, file), content);
  git(root, 'add', '--', file);
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', message);
  return git(root, 'rev-parse', 'HEAD');
}

test('publication derives origin target and checks every outgoing commit including reverted paths', () => {
  const { root, sha } = publicationFixture();
  register(root, 'release', ['README.md']);
  fixtureCommit(root, 'foreign.txt', 'temporary\n', 'temporary foreign change');
  const candidate = fixtureCommit(root, 'foreign.txt', null, 'revert foreign change');
  assert.equal(git(root, 'diff', '--name-only', sha, candidate), '');
  assert.throws(() => execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate, ...budget() }), /outside owned write scope: foreign.txt/);
  assert.equal(execute('status', { cwd: root }).release, null);
});

test('publication requires exact inherited commit inclusion and evidence, even for owned paths', () => {
  const { root, sha } = publicationFixture();
  const candidate = fixtureCommit(root, 'README.md', 'inherited owned draft\n', 'inherited unpublished commit');
  register(root, 'release', ['README.md']);
  const opts = { cwd: root, sessionId: 'release', branch: 'development', candidate, ...budget() };
  assert.throws(() => execute('release-acquire', opts), /inherited unpublished/);
  assert.throws(() => execute('release-acquire', { ...opts, includeOwnedCommits: [candidate] }), /publication-evidence/);
  assert.throws(() => execute('release-acquire', { ...opts, includeOwnedCommits: [candidate.slice(0, 12)], publicationEvidence: 'fixture review' }), /full commit SHA/);
  assert.throws(() => execute('release-acquire', { ...opts, includeOwnedCommits: [candidate, candidate], publicationEvidence: 'fixture review' }), /unique/);
  assert.throws(() => execute('release-acquire', { ...opts, includeOwnedCommits: [candidate, sha], publicationEvidence: 'fixture review' }), /inherited outgoing commits only/);
  const result = invoke(root, ['release-acquire', '--session', 'release', '--branch', 'development', '--candidate', candidate,
    '--include-owned-commit', candidate, '--publication-evidence', 'Exact fixture commit reviewed as owned; no external permission granted', ...budgetArgs()]);
  assert.equal(result.status, 0, result.stderr);
  const receipt = JSON.parse(result.stdout).publication;
  assert.equal(receipt.targetRef, 'refs/remotes/origin/development');
  assert.equal(receipt.targetSha, sha);
  assert.deepEqual(receipt.outgoingCommits, [candidate]);
  assert.deepEqual(receipt.includedInheritedCommits, [candidate]);
  assert.deepEqual(receipt.touchedPaths, ['README.md']);
  assert.equal(receipt.publishable, true);
  assert.equal(execute('check-release', opts).approvalRequired, true);
});

test('publication permits owned commits made after registration and pins origin destination and target', () => {
  const { root, sha } = publicationFixture();
  register(root, 'release', ['README.md']);
  const candidate = fixtureCommit(root, 'README.md', 'new owned delta\n', 'new owned change');
  const opts = { cwd: root, sessionId: 'release', branch: 'development', candidate, ...budget() };
  const release = execute('release-acquire', opts);
  assert.equal(release.publication.targetSha, sha);
  assert.deepEqual(release.publication.includedInheritedCommits, []);
  assert.equal(execute('check-release', opts).allowed, true);
  git(root, 'update-ref', 'refs/remotes/origin/development', candidate);
  assert.throws(() => execute('check-release', opts), /target changed/);
  git(root, 'update-ref', 'refs/remotes/origin/development', sha);
  git(root, 'remote', 'set-url', 'origin', path.join(workspace, 'different-local-remote.git'));
  assert.throws(() => execute('check-release', opts), /destination changed/);
});

test('publication pins pushurl separately and rejects multiple destinations', () => {
  const { root, sha } = publicationFixture();
  register(root, 'release', ['README.md']);
  const opts = { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, ...budget() };
  const release = execute('release-acquire', opts);
  assert.match(release.publication.destinationSha256, /^[a-f0-9]{64}$/);
  assert.equal(JSON.stringify(release).includes('unused-local-remote.git'), false, 'URLs/credentials are not recorded');
  git(root, 'config', 'remote.origin.pushurl', path.join(workspace, 'redirected.git'));
  assert.throws(() => execute('check-release', opts), /destination changed/);
  execute('release-end', { cwd: root, sessionId: 'release', outcome: 'aborted-before-push', evidence: 'Fixture destination change; no push occurred' });
  git(root, 'config', '--add', 'remote.origin.pushurl', path.join(workspace, 'second.git'));
  assert.throws(() => execute('release-acquire', opts), /exactly one origin push destination/);
});

test('publication rejects divergent fetched targets without merging or moving HEAD', () => {
  const { root, sha } = publicationFixture();
  register(root, 'release', ['README.md']);
  const candidate = fixtureCommit(root, 'README.md', 'candidate branch\n', 'candidate');
  // Create only a diagnostic fixture object, not a new checkout or branch.
  const tree = git(root, 'rev-parse', `${sha}^{tree}`);
  const sibling = git(root, 'commit-tree', tree, '-p', sha, '-m', 'published sibling');
  git(root, 'update-ref', 'refs/remotes/origin/development', sibling);
  assert.throws(() => execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate, ...budget() }), /not an ancestor/);
  assert.equal(git(root, 'rev-parse', 'HEAD'), candidate);
  assert.equal(git(root, 'status', '--porcelain'), '');
});

test('publication rejects already-different fetch/push destinations and multiple fetch URLs', () => {
  const { root, sha } = publicationFixture();
  register(root, 'release', ['README.md']);
  const opts = { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, ...budget() };
  git(root, 'config', 'remote.origin.pushurl', path.join(workspace, 'different-before-acquire.git'));
  assert.throws(() => execute('release-acquire', opts), /matching origin fetch and push/);
  assert.equal(execute('status', { cwd: root }).release, null);
  git(root, 'config', '--unset', 'remote.origin.pushurl');
  git(root, 'config', '--add', 'remote.origin.url', path.join(workspace, 'second-fetch.git'));
  assert.throws(() => execute('release-acquire', opts), /matching origin|exactly one origin/);
});

test('publication rename review includes both source and destination even when tree contents are unchanged', () => {
  const { root, sha } = publicationFixture();
  register(root, 'release', ['renamed.md']);
  git(root, 'mv', 'README.md', 'renamed.md');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'rename fixture file');
  assert.throws(() => execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate: git(root, 'rev-parse', 'HEAD'), ...budget() }), /outside owned write scope: README.md/);
  assert.equal(git(root, 'show', `${sha}:README.md`), fs.readFileSync(path.join(root, 'renamed.md'), 'utf8').trim());
});

test('publication merge review conservatively retains paths changed against every parent', () => {
  const { root, sha } = publicationFixture();
  register(root, 'release', ['README.md']);
  const own = fixtureCommit(root, 'README.md', 'own parent\n', 'own fixture parent');
  fixtureCommit(root, 'published.txt', 'published fixture path\n', 'candidate tree with other parent changes');
  const mergeTree = git(root, 'rev-parse', 'HEAD^{tree}');
  const merge = git(root, 'commit-tree', mergeTree, '-p', own, '-p', sha, '-m', 'synthetic merge fixture');
  // Fixture-only HEAD replacement to install the synthetic merge object; no shared repo operation.
  git(root, 'update-ref', 'HEAD', merge);
  git(root, 'update-ref', 'refs/remotes/origin/development', sha);
  assert.throws(() => execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate: merge, ...budget() }), /outside owned write scope: published.txt/);
});

test('publication missing target needs explicit exact baseline history evidence; existing targets cannot opt out', () => {
  const { root, sha } = publicationFixture();
  register(root, 'release', ['README.md']);
  const opts = { cwd: root, sessionId: 'release', branch: 'new-fixture-target', candidate: sha, ...budget() };
  assert.throws(() => execute('release-acquire', opts), /new-branch-base/);
  assert.throws(() => execute('release-acquire', { ...opts, newBranchBase: sha }), /baseline history/);
  const r = execute('release-acquire', { ...opts, newBranchBase: sha, publicationEvidence: 'Owner-approved exact synthetic baseline history for this local fixture target' });
  assert.equal(r.publication.mode, 'origin-new');
  assert.equal(r.publication.base, sha);
  assert.equal(r.publication.targetSha, null);
  assert.equal(execute('check-release', opts).allowed, true);
  git(root, 'update-ref', 'refs/remotes/origin/new-fixture-target', sha);
  assert.throws(() => execute('check-release', opts), /target changed/);
  execute('release-end', { cwd: root, sessionId: 'release', outcome: 'aborted-before-push', evidence: 'Fixture target appeared; no push' });
  assert.throws(() => execute('release-acquire', { ...opts, branch: 'development', newBranchBase: sha, publicationEvidence: 'Cannot override existing target' }), /cannot replace/);
});

test('publication no-origin fixture lease stays local-only and cannot silently acquire an origin later', () => {
  const { root, sha } = fixture(false);
  register(root, 'release', ['README.md']);
  const opts = { cwd: root, sessionId: 'release', branch: 'fixture', candidate: sha, ...budget() };
  const release = execute('release-acquire', opts);
  assert.equal(release.publication.publishable, false);
  assert.equal(release.publication.mode, 'local-only');
  assert.equal(execute('check-release', opts).publication.publishable, false);
  git(root, 'remote', 'add', 'origin', path.join(workspace, 'later-origin.git'));
  assert.throws(() => execute('check-release', opts), /destination changed/);
});

test('publication guarded sessions cannot hide inherited foreign commits behind their frozen base', () => {
  const f = guardFixture('block', {}, root => {
    fs.appendFileSync(path.join(root, '.git/info/exclude'), '\n.ecc/\nartifacts/\n');
    const baseline = git(root, 'rev-parse', 'HEAD');
    fixtureCommit(root, 'foreign.txt', 'inherited foreign code\n', 'foreign inherited fixture');
    git(root, 'remote', 'add', 'origin', path.join(workspace, 'guard-origin.git'));
    git(root, 'update-ref', 'refs/remotes/origin/development', baseline);
  });
  assert.throws(() => execute('release-acquire', { cwd: f.root, sessionId: 'fence', branch: 'development', candidate: git(f.root, 'rev-parse', 'HEAD'), ...budget() }), /outside owned write scope: foreign.txt/);
});

test('malformed registry and lock contention never overwrite existing coordination', () => {
  const { root } = fixture();
  register(root, 'one', ['README.md']);
  const dir = repository(root).directory;
  const file = path.join(dir, 'registry.json');
  const original = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(path.join(dir, 'registry.lock'), 'fixture lock');
  assert.equal(invoke(root, ['renew', '--session', 'one']).status, 2);
  assert.equal(fs.readFileSync(file, 'utf8'), original);
  fs.unlinkSync(path.join(dir, 'registry.lock'));
  fs.writeFileSync(file, '{invalid');
  assert.equal(invoke(root, ['renew', '--session', 'one']).status, 2);
  assert.equal(fs.readFileSync(file, 'utf8'), '{invalid');
});

test('simultaneous independent processes cannot both reserve the same path', async () => {
  const { root, other } = fixture();
  const run = (cwd, session) => new Promise(resolve => {
    const child = spawn(process.execPath, [cli, 'register', '--session', session, '--scope', 'app/shared',
      '--objective', 'race', '--done-when', 'one owner'], { cwd, stdio: 'ignore', windowsHide: true });
    child.on('close', resolve);
  });
  const statuses = await Promise.all([run(root, 'one'), run(other, 'two')]);
  assert.deepEqual(statuses.sort(), [0, 2]);
  assert.equal(execute('status', { cwd: root }).sessions.length, 1);
});
