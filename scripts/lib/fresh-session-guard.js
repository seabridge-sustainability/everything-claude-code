'use strict';

// Fresh managed launches only. No config migration, provider call or process restart.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '../..');
const routing = require('./skill-routing');
const SUPPORTED = ['codex', 'claude', 'gemini', 'opencode', 'antigravity'];
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const hash = file => sha(fs.readFileSync(file));
const canonical = file => { const p = fs.realpathSync(file); return process.platform === 'win32' ? p.toLowerCase() : p; };
// Older installed runtimes keep a reviewed controller engine separately. Never
// replace their libraries or search arbitrary paths for a convenient fallback.
let engineRoot = root;
const engineBinding = path.join(root, 'manifests/fresh-session-engine.json');
if (fs.existsSync(engineBinding)) {
  const binding = JSON.parse(fs.readFileSync(engineBinding, 'utf8'));
  if (binding.version !== 1 || !path.isAbsolute(binding.root) || !binding.pins
      || !Object.hasOwn(binding.pins, 'scripts/lib/session-coordination.js')
      || !Object.hasOwn(binding.pins, 'scripts/lib/scope-guard-adapters.js')
      || !Object.hasOwn(binding.pins, 'scripts/hooks/antigravity-scope-guard.js')) throw Error('Reviewed controller engine pins required');
  for (const [file, digest] of Object.entries(binding.pins)) {
    if (!/^[a-f0-9]{64}$/.test(digest) || path.isAbsolute(file) || file.split(/[\\/]/).includes('..')
        || hash(path.join(binding.root, file)) !== digest) throw Error('Pinned controller engine changed');
  }
  engineRoot = binding.root;
  const modules = path.join(root, 'node_modules');
  const localRequire = require('node:module').createRequire(path.join(root, 'package.json'));
  for (const dependency of ['ajv', 'js-yaml']) localRequire.resolve(dependency);
  process.env.NODE_PATH = modules + (process.env.NODE_PATH ? path.delimiter + process.env.NODE_PATH : '');
  require('node:module').Module._initPaths();
}
const { execute, checkSession, repository } = require(path.join(engineRoot, 'scripts/lib/session-coordination.js'));
const { normalizePayload, denialOutput } = require(path.join(engineRoot, 'scripts/lib/scope-guard-adapters.js'));
const { normalize: normalizeAntigravity } = require(path.join(engineRoot, 'scripts/hooks/antigravity-scope-guard.js'));
const { writeFileAtomic } = require(path.join(engineRoot, 'scripts/lib/atomic-write.js'));

function normalize(runtime, payload, cwd) {
  if (!SUPPORTED.includes(runtime)) throw Error('native preflight adapter unsupported; no protected launch');
  if (runtime === 'antigravity') return normalizeAntigravity(payload, cwd);
  const p = normalizePayload(runtime, payload);
  if (typeof p.session_id !== 'string' || !p.session_id || p.session_id.length > 200) throw Error('native session identity required');
  if (!p.cwd || canonical(p.cwd) !== canonical(cwd)) throw Error('native workspace mismatch');
  return p;
}
function policyFiles(policyRoot) {
  const base = policyRoot || process.env.ECC_CORE_POLICY_ROOT;
  if (!base || !path.isAbsolute(base)) throw Error('reviewed absolute central policy root required');
  return ['AGENTS.md', 'AGENTS_SYSTEM.md', 'CLAUDE.md'].map(name => {
    const file = path.join(base, name);
    if (fs.lstatSync(file).isSymbolicLink()) throw Error('linked central policy refused');
    if (!fs.readFileSync(file, 'utf8').includes('SEABRIDGE_AGENT_SYSTEM_V1')) throw Error('central policy identity missing');
    return file;
  });
}
function workspaceBoundary(cwd, policyRoot) {
  const system = policyFiles(policyRoot).find(file => path.basename(file) === 'AGENTS_SYSTEM.md');
  const text = fs.readFileSync(system, 'utf8');
  const declaration = /^Code: (.+?) only; one active checkout\/repo\./m.exec(text);
  // Non-SeaBridge policy fixtures or other projects have no declared layout.
  // Never invent a workspace policy for them; the scope guard still applies.
  if (!declaration) {
    if (/^Code:/m.test(text)) throw Error('Malformed central workspace declaration');
    return null;
  }
  if (!path.isAbsolute(declaration[1])) throw Error('Absolute central code workspace required');
  const workspace = canonical(declaration[1]);
  const repo = repository(cwd);
  const relative = path.relative(workspace, repo.root).replace(/\\/g, '/');
  const branches = {
    'manageesg-backend': 'seabridge_development', 'manageesg-frontend': 'development',
    'everything-claude-code': 'main', 'autoresearch': 'master', 'openseabri': 'main',
    '_upstream': 'master', 'seabridge-ai-oss': 'master', 'seabri-tidekeepers': 'main',
    '_upstream/climada-stack': 'master',
  };
  if (!Object.hasOwn(branches, relative)) throw Error('Workspace is not an approved primary checkout; explicit layout approval required');
  const git = args => execFileSync('git', args, { cwd: repo.root, encoding: 'utf8',
    windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  if (canonical(git(['rev-parse', '--absolute-git-dir'])) !== repo.common) throw Error('Secondary worktree refused by central workspace policy');
  const branch = git(['symbolic-ref', '--quiet', '--short', 'HEAD']);
  if (branch !== branches[relative]) throw Error('Branch differs from approved primary branch; no automatic switching or takeover');
  return { workspace, repository: relative, branch };
}
function context({ cwd, runtime, sessionId, payload, policyRoot, configFile }) {
  const native = normalize(runtime, payload, cwd);
  workspaceBoundary(cwd, policyRoot);
  const repo = repository(cwd);
  const session = checkSession({ cwd, sessionId });
  if (!configFile || !path.isAbsolute(configFile)) throw Error('reviewed fresh launch config required');
  const relative = path.relative(repo.root, configFile).replace(/\\/g, '/');
  if (relative.startsWith('../') || path.isAbsolute(relative) || fs.lstatSync(configFile).isSymbolicLink()) throw Error('fresh config must be inside owned worktree');
  const files = policyFiles(policyRoot);
  const binding = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  const nativeConfig = path.resolve(repo.root, binding.nativeConfig || '');
  if (!binding.nativeConfig || path.relative(repo.root, nativeConfig).startsWith('..')
      || fs.lstatSync(nativeConfig).isSymbolicLink() || hash(nativeConfig) !== binding.nativeConfigSha256) throw Error('native config changed or outside worktree');
  const catalogFile = path.join(root,'integrations/company-dev-tools/catalog.json');
  if (!binding.taskRoute || binding.taskRoute.policySha256 !== routing.policy().sha256
      || binding.catalogSha256 !== hash(catalogFile)) throw Error('Task routing or catalog changed; fresh reviewed binding required');
  const expectedRoute=routing.taskRoute(JSON.parse(fs.readFileSync(catalogFile,'utf8')),
    {query:binding.taskRoute.query,profile:binding.taskRoute.profile,impact:binding.taskRoute.impact});
  if(JSON.stringify(expectedRoute)!==JSON.stringify(binding.taskRoute)) throw Error('Task selection was modified');
  const expectedWorkflow=expectedRoute.primary ? {id:expectedRoute.primary.id,file:path.join(root,'integrations/company-dev-tools',expectedRoute.primary.file),sha256:expectedRoute.primary.sha256}:null;
  if(JSON.stringify(binding.workflow)!==JSON.stringify(expectedWorkflow)) throw Error('Selected workflow binding was modified');
  if (binding.workflow) {
    const relative = path.relative(path.join(root,'integrations/company-dev-tools'),binding.workflow.file);
    if (relative.startsWith('..') || path.isAbsolute(relative) || fs.lstatSync(binding.workflow.file).isSymbolicLink()
        || sha(fs.readFileSync(binding.workflow.file,'utf8').replace(/\r\n/g,'\n')) !== binding.workflow.sha256) throw Error('Selected workflow changed or outside ECC');
  }
  const fingerprint = sha(JSON.stringify({ runtime, sessionId, cwd: repo.root,
    nativeId: native.session_id, config: hash(configFile),
    policies: files.map(hash), implementation: [__filename, path.join(root,'scripts/lib/skill-routing.js'),path.join(root,'manifests/task-skill-routing.json'), path.join(root, 'scripts/hooks/fresh-session-guard.js'),
      path.join(root, '.opencode/plugins/ecc-fresh-session-guard.mjs')].map(hash) }));
  const receipt = path.join(repo.directory, 'fresh-preflight', sha(sessionId + ':' + native.session_id) + '.json');
  return { native, repo, session, relative, fingerprint, receipt, binding };
}
function decision(ctx, payload) {
  return execute('guard-event', { cwd: ctx.repo.root, sessionId: ctx.session.id,
    guardMode: 'block', event: 'pre', payload });
}
function preflight(options) {
  let ctx = context(options);
  if (fs.existsSync(ctx.receipt)) {
    const receipt = JSON.parse(fs.readFileSync(ctx.receipt, 'utf8'));
    if (receipt.fingerprint !== ctx.fingerprint || receipt.status !== 'passed') throw Error('preflight stale; new reviewed session required');
    if (!ctx.session.guard || ctx.session.guard.nativeSessionId !== ctx.native.session_id) throw Error('preflight identity mismatch');
    return receipt;
  }
  if (!ctx.session.guard) {
    const config = ctx.binding;
    if (config.runtime !== options.runtime || config.session !== options.sessionId || config.cwd !== ctx.repo.root
        || !Number.isSafeInteger(config.toolLimit) || config.toolLimit < 10
        || !Number.isSafeInteger(config.turnLimit) || config.turnLimit < 1) throw Error('invalid reviewed launch binding');
    // The scope was registered by the host. A model cannot choose or widen it here.
    execute('guard-bind', { cwd: ctx.repo.root, sessionId: ctx.session.id, guardMode: 'block',
      nativeSessionId: ctx.native.session_id, deadline: new Date(ctx.session.expiresAt).toISOString(),
      toolLimit: config.toolLimit, turnLimit: config.turnLimit,
      protectedPaths: [ctx.relative, config.nativeConfig, '.ecc/goal/active-goal.yaml'] });
    ctx = context(options);
  }
  if (ctx.session.guard.nativeSessionId !== ctx.native.session_id || ctx.session.guard.mode !== 'block') throw Error('fresh guard identity/mode mismatch');
  const target = ctx.session.scopes.find(scope => !/^(?:\.ecc|\.git|artifacts)(?:\/|$)/i.test(scope));
  if (!target) throw Error('no implementation scope for allowed-action preflight');
  const base = { session_id: ctx.native.session_id, cwd: ctx.repo.root, tool_name: 'Write' };
  const probes = [
    ['allowed-owned-write', { ...base, tool_input: { file_path: target } }, true],
    ['blocked-outside-write', { ...base, tool_input: { file_path: '../ecc-preflight-outside' } }, false],
    ['blocked-policy-write', { ...base, tool_input: { file_path: '.ecc/goal/active-goal.yaml' } }, false],
    ['blocked-config-write', { ...base, tool_input: { file_path: ctx.relative } }, false],
    ['blocked-opaque-shell', { ...base, tool_name: 'Bash', tool_input: { command: 'echo ECC_PREFLIGHT' } }, false],
    ['blocked-wrong-identity', { ...base, session_id: ctx.native.session_id + '-wrong', tool_input: { file_path: target } }, false],
  ];
  const results = probes.map(([name, payload, allowed]) => {
    const result = decision(ctx, payload);
    if (result.allowed !== allowed || result.wouldDeny === allowed) throw Error('allowed/blocked preflight failed: ' + name);
    return { name, allowed: result.allowed, reason: result.reason };
  });
  const receipt = { version: 1, status: 'passed', runtime: options.runtime, session: options.sessionId,
    fingerprint: ctx.fingerprint, at: new Date().toISOString(), results,
    taskRoute:ctx.binding.taskRoute, workflow:ctx.binding.workflow,
    proof: 'Actual guard decisions and pinned task selection; synthetic probes execute no product writes. Native client interception and model compliance require native evidence.' };
  fs.mkdirSync(path.dirname(ctx.receipt), { recursive: true, mode: 0o700 });
  writeFileAtomic(ctx.receipt, JSON.stringify(receipt) + '\n');
  return receipt;
}
function guard(options, event) {
  const receipt = preflight(options);
  const ctx = context(options);
  if (event === 'startup') return { allowed: true, wouldDeny: false, preflight: receipt.status,
    additionalContext: 'ECC task routing: '+JSON.stringify({risk:ctx.binding.taskRoute.risk,primary:ctx.binding.workflow,always:ctx.binding.taskRoute.always,checks:ctx.binding.taskRoute.checks,evaluatorMode:ctx.binding.taskRoute.evaluatorMode})+'. Read the selected workflow; current project authority and existing goal control all actions.' };
  if (!['pre', 'turn', 'final'].includes(event)) throw Error('unknown fresh guard event');
  return execute('guard-event', { cwd: options.cwd, sessionId: options.sessionId,
    guardMode: 'block', event, payload: ctx.native });
}
module.exports = { SUPPORTED, normalize, policyFiles, workspaceBoundary, context, preflight, guard,
  execute, checkSession, repository, denialOutput, engineRoot };
