#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');
const { taskRoute } = require('./lib/skill-routing');
const { checkSession, execute, repository, goalReference, assignmentReference, SUPPORTED, policyFiles, workspaceBoundary } = require('./lib/fresh-session-guard');
const root = path.resolve(__dirname, '..');
function toml(value) {
  if (Array.isArray(value)) return '[' + value.map(toml).join(', ') + ']';
  if (value && typeof value === 'object') return '{' + Object.entries(value).map(([k,v]) => JSON.stringify(k) + ' = ' + toml(v)).join(', ') + '}';
  return JSON.stringify(value);
}
function configuration(runtime) {
  if (!SUPPORTED.includes(runtime)) throw Error('No verified native pre-tool adapter: protected launch refused');
  const hook = path.join(root, 'scripts/hooks/fresh-session-guard.js').replace(/\\/g, '/');
  const command = event => `node "${hook}" ${runtime} ${event}`;
  if (runtime === 'opencode') return { plugin: [pathToFileURL(path.join(root, '.opencode/plugins/ecc-fresh-session-guard.mjs')).href] };
  if (runtime === 'antigravity') {
    // Reuse the exact Antigravity hook structure established by the native pilot.
    return { 'ecc-fresh-preflight': { enabled: true,
      PreToolUse: [{ matcher: '*', hooks: [{ type: 'command', command: command('pre'), timeout: 10 }] }] } };
  }
  const item = event => [{ matcher: event === 'startup' ? 'startup' : runtime === 'gemini' ? '.*' : '*',
    hooks: [{ type: 'command', command: command(event), timeout: runtime === 'gemini' ? 10000 : 10 }] }];
  return { hooks: { SessionStart: item('startup'), [runtime === 'gemini' ? 'BeforeTool' : 'PreToolUse']: item('pre') } };
}
function reviewedArguments(runtime, args) {
  if (!Array.isArray(args) || args.some(x => typeof x !== 'string' || /^--dangerously/.test(x)
      || /^-[cCrwy]/.test(x)
      || /^(?:--config|--settings|--disable|--yolo|--skip-trust|--resume|--continue|--conversation|--remote|--worktree|--session-file|--project|--new-project|--add-dir|--include-directories)(?:=|$)/.test(x)
      || (runtime === 'codex' && (/^-p/.test(x) || /^(?:--profile|--enable|--cd)(?:=|$)/.test(x))))) {
    throw Error('Reviewed fresh arguments required; no config/trust bypass, attached overrides or workspace expansion');
  }
}
function prepare(manifest) {
  const { runtime, session, cwd, policyRoot, executable, args = [], turnLimit = 40 } = manifest;
  configuration(runtime); policyFiles(policyRoot);
  const workspace = workspaceBoundary(cwd, policyRoot);
  const repo = repository(cwd);
  const owner = checkSession({ cwd, sessionId: session });
  if (owner.guard) throw Error('Use a new registered session; existing bindings/running agents are never changed');
  const uiVerification = require('../integrations/software-factory/ui-write-gate.cjs').prepareUI(cwd, owner.scopes, manifest.uiVerification);
  const selectedGoal = goalReference(repo, manifest.goalFile, workspace?.workspace ?? null);
  if (manifest.workerAssignment && !assignmentReference) throw Error('managed worker assignment engine unavailable');
  const workerAssignment = assignmentReference ? assignmentReference(repo,selectedGoal,manifest.workerAssignment,owner,runtime) : null;
  const toolLimit = manifest.toolLimit ?? workerAssignment?.toolCeiling ?? 200;
  if (workerAssignment && toolLimit > workerAssignment.toolCeiling) throw Error('Worker tool cap exceeds exact assignment');
  if (!path.isAbsolute(executable) || !fs.statSync(executable).isFile()) throw Error('Reviewed fresh executable required');
  reviewedArguments(runtime, args);
  if (!Number.isSafeInteger(toolLimit) || toolLimit < 10 || !Number.isSafeInteger(turnLimit) || turnLimit < 1) throw Error('Bounded tool/turn budgets required');
  const directory = '.ecc/fresh-session/' + session;
  const binding = directory + '/binding.json';
  const config = runtime === 'antigravity' ? '.agents/hooks.json' : directory + '/hooks.json';
  execute('check-write', { cwd, sessionId: session, paths: [binding, config] });
  for (const rel of [binding, config]) {
    if (fs.existsSync(path.join(repo.root, rel))) throw Error('Fresh config targets must be absent; never overwrite a current session/config');
    let parent = path.dirname(path.join(repo.root, rel));
    while (parent !== repo.root) {
      if (fs.existsSync(parent) && fs.lstatSync(parent).isSymbolicLink()) throw Error('Linked config directory refused');
      parent = path.dirname(parent);
    }
  }
  const cfg = configuration(runtime);
  const fullConfig = path.join(repo.root, config);
  // Binding pins the actual native config, not merely a generated template.
  const configText = JSON.stringify(cfg, null, 2) + '\n';
  const nativeConfigSha256 = crypto.createHash('sha256').update(configText).digest('hex');
  const goal = selectedGoal.document;
  const catalogFile = path.join(root,'integrations/company-dev-tools/catalog.json');
  const catalog = JSON.parse(fs.readFileSync(catalogFile,'utf8'));
  const route = taskRoute(catalog, manifest.task || { query: goal.objective.slice(0,200), profile:'coding' });
  let workflow = null;
  if (route.primary) {
    const file = path.join(root,'integrations/company-dev-tools',route.primary.file);
    const content = fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n');
    if (crypto.createHash('sha256').update(content).digest('hex') !== route.primary.sha256) throw Error('Selected workflow digest changed');
    workflow = { id:route.primary.id, file, sha256:route.primary.sha256 };
  }
  const bindingText = JSON.stringify({ version: 2, runtime, session, cwd: repo.root, toolLimit, turnLimit,
    ...(workerAssignment ? {workerAssignment} : {}),
    reviewedLaunch: { executable, argumentsSha256: crypto.createHash('sha256').update(JSON.stringify(args)).digest('hex') },
    nativeConfig: config, nativeConfigSha256, goalReference: selectedGoal, taskRoute:route, workflow,
    catalogSha256:crypto.createHash('sha256').update(fs.readFileSync(catalogFile)).digest('hex'), uiVerification }, null, 2) + '\n';
  for (const [rel, text] of [[config, configText], [binding, bindingText]]) {
    fs.mkdirSync(path.dirname(path.join(repo.root, rel)), { recursive: true });
    fs.writeFileSync(path.join(repo.root, rel), text, { flag: 'wx', mode: 0o600 });
  }
  const environment = { ECC_FRESH_SESSION_REQUIRED: '1', ECC_FRESH_GUARD_ROOT: root,
    ECC_CORE_POLICY_ROOT: policyRoot, ECC_FRESH_SESSION_CONFIG: path.join(repo.root, binding),
    ECC_SESSION_ID: session, ECC_OWNED_WORKTREE: repo.root };
  const argv = [...args];
  if (runtime === 'claude') argv.unshift('--settings', fullConfig);
  if (runtime === 'gemini') environment.GEMINI_CLI_SYSTEM_SETTINGS_PATH = fullConfig;
  if (runtime === 'opencode') environment.OPENCODE_CONFIG = fullConfig;
  if (runtime === 'codex') {
    argv.unshift('-c','features.hooks=true');
    for (const [name, value] of Object.entries(cfg.hooks)) argv.unshift('-c', 'hooks.' + name + '=' + toml(value));
  }
  return { version: 2, runtime, cwd: repo.root, session, executable, args: argv, environment,
    manifest: { runtime, session, cwd: repo.root, policyRoot, executable, args, toolLimit, turnLimit, goalFile: selectedGoal.file, goalReference: selectedGoal, ...(workerAssignment ? {workerAssignment} : {}), ...(manifest.task?{task:manifest.task}:{}), ...(uiVerification?{uiVerification}:{}) },
    fresh_only: true, no_provider_or_model_override: true, status: 'prepared-not-native-proof',
    limitation: runtime === 'codex' ? 'Codex requires operator /hooks review/trust of the exact new hook definition; no trust bypass supplied.'
      : 'Use this managed launch; direct IDE starts or unsupported clients are not certified protected.' };
}
function validateLaunch(plan) {
  if (plan.version !== 2 || plan.status !== 'prepared-not-native-proof') throw Error('Fresh version 2 prepared launch plan required');
  const workspace = workspaceBoundary(plan.cwd, plan.manifest?.policyRoot);
  const owner = checkSession({ cwd: plan.cwd, sessionId: plan.session });
  // Refuse caller-supplied rewrites of the prepared native hooks or environment.
  const m = plan.manifest;
  if (!m || m.runtime !== plan.runtime || m.session !== plan.session || m.cwd !== plan.cwd
      || m.executable !== plan.executable || plan.environment.ECC_FRESH_SESSION_REQUIRED !== '1'
      || plan.environment.ECC_FRESH_GUARD_ROOT !== root || plan.environment.ECC_SESSION_ID !== plan.session
      || plan.environment.ECC_CORE_POLICY_ROOT !== m.policyRoot || plan.environment.ECC_OWNED_WORKTREE !== plan.cwd) throw Error('Prepared launch binding mismatch');
  const binding = JSON.parse(fs.readFileSync(plan.environment.ECC_FRESH_SESSION_CONFIG, 'utf8'));
  reviewedArguments(plan.runtime, m.args);
  if (binding.runtime !== plan.runtime || binding.session !== plan.session || binding.cwd !== plan.cwd
      || binding.toolLimit !== m.toolLimit || binding.turnLimit !== m.turnLimit
      || binding.reviewedLaunch?.executable !== plan.executable
      || binding.reviewedLaunch?.argumentsSha256 !== crypto.createHash('sha256').update(JSON.stringify(m.args)).digest('hex')) {
    throw Error('Prepared executable/argument binding changed; prepare a fresh reviewed profile');
  }
  if (binding.version !== 2 || !m.goalFile || !m.goalReference || !binding.goalReference) throw Error('Prepared goal reference required');
  {
    const selected = goalReference(repository(plan.cwd), m.goalFile, workspace?.workspace ?? null);
    if (m.goalFile !== selected.file || JSON.stringify(selected) !== JSON.stringify(m.goalReference)
        || JSON.stringify(selected) !== JSON.stringify(binding.goalReference)) throw Error('Prepared goal reference mismatch');
    if (binding.workerAssignment || m.workerAssignment || owner.guard?.workerAssignment) {
      if (!binding.workerAssignment || !m.workerAssignment || !assignmentReference) throw Error('Prepared worker assignment required');
      const worker = assignmentReference(repository(plan.cwd),selected,binding.workerAssignment,owner,plan.runtime);
      if (JSON.stringify(worker) !== JSON.stringify(binding.workerAssignment)
          || JSON.stringify(worker) !== JSON.stringify(m.workerAssignment) || m.toolLimit > worker.toolCeiling) throw Error('Prepared worker assignment changed or cap widened');
    } else if (assignmentReference) assignmentReference(repository(plan.cwd),selected,null,owner,plan.runtime);
  }
  const expected = configuration(plan.runtime);
  const configBytes = fs.readFileSync(path.join(plan.cwd, binding.nativeConfig));
  if (crypto.createHash('sha256').update(configBytes).digest('hex') !== binding.nativeConfigSha256) throw Error('Native hook config changed');
  const actual = JSON.parse(configBytes.toString('utf8'));
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw Error('Native hook config changed');
  const config = path.join(plan.cwd, binding.nativeConfig);
  let expectedArgs = [...m.args];
  if (plan.runtime === 'claude') expectedArgs.unshift('--settings', config);
  if (plan.runtime === 'codex') {
    expectedArgs.unshift('-c','features.hooks=true');
    for (const [name, value] of Object.entries(expected.hooks)) expectedArgs.unshift('-c', 'hooks.' + name + '=' + toml(value));
  }
  if (JSON.stringify(plan.args) !== JSON.stringify(expectedArgs)
      || (plan.runtime === 'gemini' && plan.environment.GEMINI_CLI_SYSTEM_SETTINGS_PATH !== config)
      || (plan.runtime === 'opencode' && plan.environment.OPENCODE_CONFIG !== config)) throw Error('Prepared launch arguments changed');
  return { m, expected };
}
function spawnAgent(plan, environment = { ...process.env, ...plan.environment }) {
  // Only the new process inherits bindings; no shared environment/config is edited.
  const child = spawn(plan.executable, plan.args, { cwd: plan.cwd,
    env: environment, stdio: 'inherit', windowsHide: true, shell: false });
  child.on('error', () => { process.stderr.write('Fresh agent process could not start\n'); process.exitCode = 2; });
  child.on('exit', code => { process.exitCode = code === null ? 2 : code; });
  return child;
}
function launch(plan) {
  const checked = validateLaunch(plan);
  if (plan.runtime !== 'codex') return spawnAgent(plan);
  const planHash = crypto.createHash('sha256').update(JSON.stringify(plan)).digest('hex');
  const environment = { ...process.env, ...plan.environment };
  const overrides = ['-c', 'features.hooks=true'];
  for (const [name, value] of Object.entries(checked.expected.hooks)) overrides.push('-c', 'hooks.' + name + '=' + toml(value));
  return require('./lib/codex-hook-readiness').inspectCodexHooks({ executable: plan.executable, cwd: plan.cwd,
    overrides, environment, configuration: checked.expected }).then(() => {
    // Ownership/goal/config may change during native metadata observation.
    if (crypto.createHash('sha256').update(JSON.stringify(plan)).digest('hex') !== planHash) throw Error('Prepared launch binding changed during native observation');
    validateLaunch(plan);
    return spawnAgent(plan, environment);
  });
}
function main(argv = process.argv.slice(2)) {
  const [command, file] = argv;
  if (command === '--help' || !command) {
    console.log('Worker opt-in: workerAssignment {id, ownerAgent}; exact assignment must already pin this registered repository/session. Cap cannot exceed assignment minus parent closure reserve; native interception is separate proof.');
    console.log('fresh-agent-session prepare <host-manifest.json> | launch <prepared-plan.json> | capabilities');
    console.log('Manifest: runtime, registered session, owned cwd, central policyRoot, absolute executable, args, toolLimit, turnLimit, optional reviewed absolute goalFile. Own .ecc/fresh-session and (Antigravity) .agents/hooks.json. No automatic permission grant or provider call.');
    return;
  }
  if (command === 'capabilities') {
    const ids = require('../manifests/instruction-adapters.json').adapters.map(x => x.id);
    console.log(JSON.stringify(ids.map(runtime => ({ runtime, automatic_managed_preflight: SUPPORTED.includes(runtime),
      universal_ide_activation: false, unsupported_launch_denied: !SUPPORTED.includes(runtime) })), null, 2)); return;
  }
  if (!file) throw Error('Exact host manifest/plan file required');
  const value = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (command === 'prepare') console.log(JSON.stringify(prepare(value), null, 2));
  else if (command === 'launch') return launch(value);
  else throw Error('Unknown fresh-session command');
}
if (require.main === module) {
  const refused = () => { console.error('Fresh launch refused: check manifest, ownership, goal, native hook trust and supported adapter'); process.exitCode = 2; };
  try { Promise.resolve(main()).catch(refused); } catch { refused(); }
}
module.exports = { toml, configuration, prepare, launch, main };
