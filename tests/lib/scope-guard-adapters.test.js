'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { pathToFileURL } = require('node:url');
const { spawnSync } = require('node:child_process');
const { test, after } = require('node:test');
const { execute } = require('../../scripts/lib/session-coordination');
const { normalizePayload } = require('../../scripts/lib/scope-guard-adapters');
const { configuration } = require('../../scripts/scope-guard-adapters');
const root = path.resolve(__dirname, '../..');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-cross-agent-'));
let sequence = 0;
after(() => fs.rmSync(temp, { recursive: true, force: true }));
function fixture(mode = 'block') {
  const cwd = path.join(temp, 'repo-' + sequence++);
  fs.mkdirSync(cwd);
  for (const args of [['init','--initial-branch=fixture'],['config','user.name','ECC Test'],['config','user.email','test@example.invalid']]) {
    const r = spawnSync('git', args, { cwd, encoding: 'utf8' }); assert.equal(r.status, 0, r.stderr);
  }
  fs.writeFileSync(path.join(cwd, 'README.md'), 'protected\n');
  spawnSync('git', ['add','README.md'], { cwd });
  const committed = spawnSync('git', ['-c','core.hooksPath=','commit','-m','fixture'], { cwd, encoding: 'utf8' }); assert.equal(committed.status, 0, committed.stderr);
  const now = new Date().toISOString();
  const goal = { schema: 'ecc.active-goal.v1', goal_id: 'adapter', mode: 'controlled', proof_profile: 'security', objective: 'Cross agent fence', current_priority: 'Verify adapters', non_goals: [],
    user_visible_proofs: [{ id: 'fence', description: 'Fence behavior', lane_id: 'guard', required_stage: 'authentic_input_processed', required_evidence_kinds: ['test','runtime'], required_repositories: ['fixture'], allowed_result_classes: ['other'], acceptance_predicate: 'Native callback refuses outside writes', requires_authentic: false, requires_user_visible: false, subject_scope: null, required: true }],
    lanes: [{ id: 'guard', description: 'Adapter', status: 'active', blocker: null, next_action: 'Probe' }], owner_corrections: [],
    forecast: { state: 'not_set', confidence: 'none', basis: null, critical_path: [], likely_hours: null, next_checkpoint_at: null, checkpoint_started_at: null, checkpoint_proof_id: null, updated_at: now }, status: 'active', updated_at: now };
  fs.mkdirSync(path.join(cwd, '.ecc/goal'), { recursive: true });
  fs.writeFileSync(path.join(cwd, '.ecc/goal/active-goal.yaml'), JSON.stringify(goal));
  execute('register', { cwd, sessionId: 'adapter', scopes: ['owned', '.ecc/goal', 'artifacts/agent-runs/scope-guard'], objective: 'Adapter fence', doneWhen: 'Negative callbacks denied', ttl: 30 });
  execute('guard-bind', { cwd, sessionId: 'adapter', guardMode: mode, nativeSessionId: 'native-adapter', deadline: new Date(Date.now()+600000).toISOString(), toolLimit: 40, turnLimit: 10, protectedPaths: ['README.md'] });
  return cwd;
}
function event(cwd, runtime, tool, args) {
  const payload = normalizePayload(runtime, { cwd, session_id: 'native-adapter', tool_name: tool, tool_input: args });
  return execute('guard-event', { cwd, sessionId: 'adapter', guardMode: 'block', event: 'pre', payload });
}
test('Codex native patch command envelope preserves scope and rejects ambiguity', () => {
  const cwd = fixture();
  const patch = file => `*** Begin Patch\n*** Add File: ${file}\n+canary\n*** End Patch`;
  const inside = patch('owned/canary.txt'), outside = patch('../outside.txt');
  assert.equal(event(cwd, 'codex', 'apply_patch', { command: inside }).allowed, true);
  assert.equal(event(cwd, 'codex', 'apply_patch', { command: outside }).allowed, false);
  assert.equal(event(cwd, 'codex', 'apply_patch', { command: patch('README.md') }).allowed, false);
  assert.equal(event(cwd, 'codex', 'apply_patch', { command: 'echo invalid' }).allowed, false);
  assert.equal(event(cwd, 'codex', 'apply_patch', { input: inside }).allowed, true);
  assert.equal(event(cwd, 'codex', 'Bash', { command: inside }).allowed, false);
  assert.throws(() => normalizePayload('codex', { tool_name: 'apply_patch', tool_input: { command: outside, input: inside } }), /ambiguous/);
  assert.throws(() => normalizePayload('codex', { tool_name: 'apply_patch', tool_input: { command: outside, patch: inside } }), /ambiguous/);
  assert.throws(() => normalizePayload('codex', { tool_name: 'apply_patch', tool_input: { command: null } }), /native patch/);
  assert.throws(() => normalizePayload('codex', { tool_name: 'apply_patch', tool_input: { command: 'x'.repeat(1024 * 1024 + 1) } }), /native patch/);
  assert.equal(fs.existsSync(path.join(cwd, 'owned/canary.txt')), false);
});
test('Gemini replace and read tools obey the same fence; opaque shell remains denied', () => {
  const cwd = fixture();
  assert.equal(event(cwd, 'gemini', 'replace', { file_path: 'owned/a.js' }).allowed, true);
  assert.equal(event(cwd, 'gemini', 'replace', { file_path: '../outside.js' }).allowed, false);
  assert.equal(event(cwd, 'gemini', 'write_file', { file_path: 'README.md' }).allowed, false);
  assert.equal(event(cwd, 'gemini', 'read_many_files', { paths: ['other/module.js'] }).allowed, true);
  assert.equal(event(cwd, 'gemini', 'run_shell_command', { command: 'echo marker' }).allowed, false);
});
test('OpenCode native output.args and session identity are enforced by the actual throwing plugin callback', async () => {
  const pluginPath = path.join(root, '.opencode/plugins/ecc-scope-guard.ts');
  let compiler;
  try { compiler = require('typescript'); } catch (error) { if (error.code !== 'MODULE_NOT_FOUND') throw error; }
  let plugin;
  if (compiler) {
    // CI supports older Node through the repository's existing dev dependency.
    const compiled = compiler.transpileModule(fs.readFileSync(pluginPath, 'utf8'), { compilerOptions: { target: compiler.ScriptTarget.ES2022, module: compiler.ModuleKind.CommonJS } }).outputText;
    const modulePath = path.join(temp, 'scope-plugin.cjs'); fs.writeFileSync(modulePath, compiled);
    plugin = require(modulePath);
  } else {
    // The Windows runtime can execute the exact source with built-in type
    // stripping. Missing tooling on an older Node fails rather than skips.
    plugin = await import(pathToFileURL(pluginPath).href);
  }
  const { ECCScopeGuard } = plugin;
  const saved = Object.fromEntries(['ECC_SCOPE_GUARD_ROOT','ECC_SCOPE_GUARD_MODE','ECC_SESSION_ID'].map(k => [k, process.env[k]]));
  try {
    delete process.env.ECC_SCOPE_GUARD_MODE;
    assert.deepEqual(await ECCScopeGuard({ directory: temp }), {});
    const cwd = fixture();
    Object.assign(process.env, { ECC_SCOPE_GUARD_ROOT: root, ECC_SCOPE_GUARD_MODE: 'block', ECC_SESSION_ID: 'adapter' });
    const hooks = await ECCScopeGuard({ directory: cwd });
    const before = hooks['tool.execute.before'];
    await before({ tool: 'write', sessionID: 'native-adapter', args: { filePath: 'outside.js' } }, { args: { filePath: 'owned/a.js' } });
    await before({ tool: 'read', sessionID: 'native-adapter' }, { args: { filePath: 'other/module.js' } });
    for (const filePath of ['outside.js','README.md','owned/a.js:stream','owned/a.js.','../outside.js']) {
      await assert.rejects(before({ tool: 'write', sessionID: 'native-adapter' }, { args: { filePath } }), /scope guard denied/);
    }
    await assert.rejects(before({ tool: 'bash', sessionID: 'native-adapter' }, { args: { command: 'echo marker' } }), /scope guard denied/);
    await assert.rejects(before({ tool: 'write', sessionID: 'wrong-native-id' }, { args: { filePath: 'owned/a.js' } }), /scope guard denied/);
    assert.equal(fs.existsSync(path.join(cwd, 'outside.js')), false);
    process.env.ECC_SCOPE_GUARD_ROOT = path.join(temp, 'missing-engine');
    const unavailable = await ECCScopeGuard({ directory: cwd });
    await assert.rejects(unavailable['tool.execute.before']({ tool: 'read', sessionID: 'native-adapter' }, { args: {} }), /scope guard denied/);
  } finally { for (const [key, value] of Object.entries(saved)) { if (value === undefined) delete process.env[key]; else process.env[key] = value; } }
});
test('Claude and Gemini JSON controls survive an actual Windows PowerShell command wrapper', { skip: process.platform !== 'win32' }, () => {
  for (const runtime of ['claude','gemini','codex']) {
    const hook = path.join(root, 'scripts/hooks/goal-runtime-gate.js');
    const r = spawnSync('powershell.exe', ['-NoProfile','-Command', `& '${process.execPath.replace(/'/g,"''")}' '${hook.replace(/'/g,"''")}' ${runtime} guard block pre`], { cwd: temp, encoding: 'utf8', input: '{}' });
    assert.equal(r.status, 0, r.stderr);
    const denial = JSON.parse(r.stdout);
    if (runtime === 'gemini') assert.equal(denial.decision, 'deny');
    else assert.equal(denial.hookSpecificOutput.permissionDecision, 'deny');
  }
});
test('Gemini final response field cannot hide an unsupported completion claim', () => {
  const r = spawnSync(process.execPath, [path.join(root, 'scripts/hooks/goal-runtime-gate.js'),'gemini','final'], { cwd: temp, encoding: 'utf8', input: JSON.stringify({ prompt: 'Explain a file', prompt_response: 'The goal is fully complete.' }) });
  assert.equal(r.status, 0); assert.equal(JSON.parse(r.stdout).decision, 'deny');
  assert.match(r.stderr, /complete claim requires/);
});
test('all 18 agents get native fragments or an honest explicit-wrapper fallback without config mutation', () => {
  const ids = require('../../manifests/instruction-adapters.json').adapters.map(x => x.id);
  for (const id of ids) {
    const result = configuration(id);
    assert.ok(result.hooks || result.kind, id);
    if (result.hooks) assert.match(JSON.stringify(result), /guard audit/);
    if (result.kind === 'instruction-and-wrapper-fallback') assert.match(result.limitation, /do not intercept native tools/);
  }
  assert.throws(() => configuration('unsupported'), /unknown/);
  assert.throws(() => configuration('claude','untrusted'), /mode/);
  assert.equal(configuration('gemini').hooks.BeforeTool[0].matcher, '.*');
});
