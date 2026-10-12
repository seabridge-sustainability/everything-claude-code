'use strict';

// Fresh managed launches only. No config migration, provider call or process restart.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execute, checkSession, repository } = require('./session-coordination');
const { normalizePayload } = require('./scope-guard-adapters');
const { normalize: normalizeAntigravity } = require('../hooks/antigravity-scope-guard');
const { writeFileAtomic } = require('./atomic-write');
const root = path.resolve(__dirname, '../..');
const SUPPORTED = ['codex', 'claude', 'gemini', 'opencode', 'antigravity'];
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const hash = file => sha(fs.readFileSync(file));
const canonical = file => { const p = fs.realpathSync(file); return process.platform === 'win32' ? p.toLowerCase() : p; };

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
function context({ cwd, runtime, sessionId, payload, policyRoot, configFile }) {
  const native = normalize(runtime, payload, cwd);
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
  const fingerprint = sha(JSON.stringify({ runtime, sessionId, cwd: repo.root,
    nativeId: native.session_id, config: hash(configFile),
    policies: files.map(hash), implementation: [__filename, path.join(root, 'scripts/hooks/fresh-session-guard.js'),
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
    proof: 'Actual guard decisions; synthetic probes execute no product writes. Native client interception requires native evidence.' };
  fs.mkdirSync(path.dirname(ctx.receipt), { recursive: true, mode: 0o700 });
  writeFileAtomic(ctx.receipt, JSON.stringify(receipt) + '\n');
  return receipt;
}
function guard(options, event) {
  const receipt = preflight(options);
  const ctx = context(options);
  if (event === 'startup') return { allowed: true, wouldDeny: false, preflight: receipt.status };
  if (!['pre', 'turn', 'final'].includes(event)) throw Error('unknown fresh guard event');
  return execute('guard-event', { cwd: options.cwd, sessionId: options.sessionId,
    guardMode: 'block', event, payload: ctx.native });
}
module.exports = { SUPPORTED, normalize, policyFiles, context, preflight, guard };
