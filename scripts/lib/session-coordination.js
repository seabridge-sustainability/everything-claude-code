'use strict';

// Cooperative, machine-local coordination, NOT a permission grant or sandbox.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { writeFileAtomic } = require('./atomic-write');

function git(cwd, args) {
  const output = execFileSync('git', args, { cwd, encoding: 'utf8', windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'] });
  return args.includes('-z') ? output : output.trim();
}
function canonical(file) {
  const result = fs.realpathSync(file);
  return process.platform === 'win32' ? result.toLowerCase() : result;
}
function repository(cwd = process.cwd()) {
  const root = canonical(git(cwd, ['rev-parse', '--show-toplevel']));
  const common = canonical(path.resolve(root, git(root, ['rev-parse', '--git-common-dir'])));
  return { root, common, directory: path.join(common, 'ecc-coordination') };
}
function scope(value) {
  if (typeof value !== 'string' || !value || /[\\:*?[\]{}]/.test(value)
      || [...value].some(character => character.charCodeAt(0) < 32)
      || value.startsWith('/') || value.split('/').some(p => !p || p === '.' || p === '..' || /[. ]$/.test(p))) {
    throw new Error('scope must be an explicit repository-relative file or directory (no globs/traversal)');
  }
  if (value.split('/').some(p => p.toLowerCase() === '.git')) throw new Error('.git is not a write scope');
  return process.platform === 'win32' ? value.toLowerCase() : value;
}
function safePath(repo, relative) {
  const clean = scope(relative);
  let current = repo.root;
  for (const component of clean.split('/')) {
    current = path.join(current, component);
    try {
      if (fs.lstatSync(current).isSymbolicLink()) throw new Error(`linked path is not an owned scope: ${relative}`);
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  return clean;
}
function overlaps(a, b) { return a === b || a.startsWith(`${b}/`) || b.startsWith(`${a}/`); }
function requireText(value, label) {
  if (typeof value !== 'string' || !value.trim() || value.length > 2000) throw new Error(`${label} required (max 2000 characters)`);
  return value;
}
function id(value) {
  if (typeof value !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(value)) throw new Error('unique --session required (letters, digits, dot, dash, underscore)');
  return value;
}
function expiry(minutes, now) {
  const n = Number(minutes === undefined ? 120 : minutes);
  if (!Number.isInteger(n) || n < 1 || n > 1440) throw new Error('ttl-minutes must be 1..1440');
  return now + n * 60000;
}
function usd(value, label, allowZero = false) {
  if (value === undefined || value === null || (typeof value === 'string' && !value.trim())) throw new Error(`${label} required`);
  const amount = Number(value);
  if (!Number.isFinite(amount) || (allowZero ? amount < 0 : amount <= 0)) {
    throw new Error(`${label} must be a finite ${allowZero ? 'non-negative' : 'positive'} USD amount`);
  }
  return amount;
}
function actionsBudgetReceipt(options, now) {
  const status = options.actionsBudgetStatus || 'known';
  if (!['known', 'unknown'].includes(status)) throw new Error('actions-budget-status must be known or unknown');
  const source = requireText(options.actionsBudgetSource, 'actions-budget-source');
  if (!['github-org-budget-ui', 'owner-screenshot', 'github-org-billing-export'].includes(source)) {
    throw new Error('actions-budget-source must identify a current GitHub billing observation');
  }
  const checkedAt = requireText(options.actionsBudgetCheckedAt, 'actions-budget-checked-at');
  if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z$/.test(checkedAt)) {
    throw new Error('actions-budget-checked-at must be an ISO UTC timestamp');
  }
  const observed = Date.parse(checkedAt);
  if (!Number.isFinite(observed) || observed > now + 2 * 60000 || now - observed > 60 * 60000) {
    throw new Error('Actions budget observation must be within the last hour (and not in the future)');
  }
  const expectedUsd = usd(options.expectedActionsUsd, 'expected-actions-usd');
  const expectedWorkflows = requireText(options.expectedWorkflows, 'expected-workflows')
    .split(',').map(item => item.trim()).filter(Boolean);
  if (!expectedWorkflows.length || expectedWorkflows.some(item => !/^[a-zA-Z0-9_. -]{1,80}$/.test(item))) {
    throw new Error('expected-workflows must name the anticipated Actions jobs');
  }
  const stopUsage = options.actionsStopUsage;
  if (!['yes', 'no', 'unknown'].includes(stopUsage)) throw new Error('actions-stop-usage must be yes, no, or unknown');
  const usedUsd = status === 'known' ? usd(options.actionsBudgetUsed, 'actions-budget-used', true) : null;
  const limitUsd = status === 'known' ? usd(options.actionsBudgetLimit, 'actions-budget-limit') : null;
  const projectedPercent = status === 'known' ? 100 * (usedUsd + expectedUsd) / limitUsd : null;
  const exceptionNeeded = status === 'unknown' || projectedPercent >= 90 || stopUsage !== 'yes';
  const ownerCostApproval = options.ownerCostApproval
    ? requireText(options.ownerCostApproval, 'owner-cost-approval') : null;
  if (exceptionNeeded && !ownerCostApproval) {
    throw new Error('named current-session owner cost approval required for unknown/90%+ Actions budget or disabled hard stop');
  }
  return { status, source, checkedAt: new Date(observed).toISOString(), usedUsd, limitUsd,
    expectedUsd, expectedWorkflows, stopUsage, projectedPercent, ownerCostApproval,
    limitation: 'self-attested receipt; lease does not authorize or verify a push' };
}
function read(repo) {
  const file = path.join(repo.directory, 'registry.json');
  if (!fs.existsSync(file)) return { version: 1, sessions: [], release: null, releases: [] };
  const state = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (state.version !== 1 || !Array.isArray(state.sessions) || !Array.isArray(state.releases)
      || !Object.hasOwn(state, 'release')) throw new Error('invalid coordination registry; do not replace it');
  const ids = new Set();
  for (const s of state.sessions) {
    id(s.id);
    if (ids.has(s.id) || !Number.isFinite(s.expiresAt) || !Number.isFinite(s.updatedAt)
        || !['active', 'closed'].includes(s.state) || typeof s.worktree !== 'string'
        || !Array.isArray(s.scopes) || !s.scopes.length || !/^[a-f0-9]{40,64}$/.test(s.base)) throw new Error('invalid session record');
    ids.add(s.id);
    s.scopes.forEach(scope);
  }
  if (state.release && (!ids.has(state.release.owner) || !Number.isFinite(state.release.expiresAt)
      || !/^[a-f0-9]{40,64}$/.test(state.release.candidate) || typeof state.release.branch !== 'string')) throw new Error('invalid release record');
  return state;
}
function transaction(repo, action) {
  fs.mkdirSync(repo.directory, { recursive: true });
  const lock = path.join(repo.directory, 'registry.lock');
  let fd;
  try { fd = fs.openSync(lock, 'wx', 0o600); }
  catch (error) {
    if (error.code === 'EEXIST') throw new Error('coordination registry busy; retry once, then report stale lock (never steal it)');
    throw error;
  }
  try {
    fs.writeFileSync(fd, JSON.stringify({ pid: process.pid, createdAt: Date.now() }));
    const state = read(repo);
    const result = action(state);
    writeFileAtomic(path.join(repo.directory, 'registry.json'), `${JSON.stringify(state, null, 2)}\n`);
    return result;
  } finally { fs.closeSync(fd); fs.unlinkSync(lock); }
}
function current(state, repo, sessionId, now) {
  const s = state.sessions.find(item => item.id === id(sessionId));
  if (!s || s.state !== 'active' || s.expiresAt <= now) throw new Error('session missing, closed, or expired; register/renew before work');
  if (s.worktree !== repo.root) throw new Error('session belongs to another worktree');
  return s;
}
function conflicts(state, repo, scopes, sessionId, now) {
  for (const other of state.sessions) {
    if (other.id === sessionId || other.state !== 'active'
        || (other.expiresAt <= now && state.release?.owner !== other.id)) continue;
    if (other.worktree === repo.root) throw new Error(`worktree already owned by ${other.id}; use an isolated worktree`);
    if (scopes.some(a => other.scopes.some(b => overlaps(a, b)))) throw new Error(`write scope overlaps session ${other.id}; no automatic takeover`);
  }
}
function checkSession({ cwd, sessionId, now = Date.now() }) {
  const repo = repository(cwd);
  const state = read(repo);
  const session = current(state, repo, sessionId, now);
  conflicts(state, repo, session.scopes, session.id, now);
  return session;
}
function changedPaths(repo, base, upstream) {
  if (upstream) {
    if (!/^refs\/remotes\/origin\//.test(upstream)) throw new Error('upstream must be a fetched refs/remotes/origin/... reference');
    git(repo.root, ['check-ref-format', upstream]);
    git(repo.root, ['merge-base', '--is-ancestor', upstream, 'HEAD']);
    base = upstream; // Do not misclassify merged, already-published work as this session's edits.
  }
  // Both names of renames are checked (no rename detection); include unstaged/untracked files.
  const outputs = [
    ['diff', '--name-only', '--no-renames', '-z', base, '--'],
    ['ls-files', '--others', '--exclude-standard', '-z'],
  ].map(args => git(repo.root, args));
  return [...new Set(outputs.flatMap(output => output.split('\0').filter(Boolean)))];
}
function ownedPaths(repo, session, paths) {
  if (!paths.length) throw new Error('at least one --path required');
  for (const relative of paths) {
    const clean = safePath(repo, relative);
    if (!session.scopes.some(allowed => clean === allowed || clean.startsWith(`${allowed}/`))) throw new Error(`outside owned write scope: ${relative}`);
  }
}
function execute(command, options = {}) {
  const repo = repository(options.cwd);
  const now = options.now === undefined ? Date.now() : options.now;
  if (command === 'status') return { ...read(repo), commonDirectory: repo.common, now,
    limitation: 'same Git clone and cooperating wrappers only; no permission grant or proof of CI/deployment' };
  const sessionId = id(options.sessionId);
  return transaction(repo, state => {
    if (command === 'register') {
      if (state.sessions.some(s => s.id === sessionId)) throw new Error('session ID already exists; renew or use a new ID');
      const scopes = (options.scopes || []).map(item => safePath(repo, item));
      if (!scopes.length) throw new Error('at least one --scope required');
      conflicts(state, repo, scopes, sessionId, now);
      const session = { id: sessionId, state: 'active', worktree: repo.root, scopes,
        objective: requireText(options.objective, 'objective'), doneWhen: requireText(options.doneWhen, 'done-when'),
        base: git(repo.root, ['rev-parse', 'HEAD']), updatedAt: now, expiresAt: expiry(options.ttl, now) };
      state.sessions.push(session);
      return session;
    }
    if (command === 'renew') {
      const session = state.sessions.find(s => s.id === sessionId);
      if (!session || session.state !== 'active' || session.worktree !== repo.root) throw new Error('cannot renew another/closed session');
      conflicts(state, repo, session.scopes, sessionId, now);
      session.expiresAt = expiry(options.ttl, now);
      session.updatedAt = now;
      return session;
    }
    const session = current(state, repo, sessionId, now);
    conflicts(state, repo, session.scopes, sessionId, now);
    if (command === 'check-write') {
      ownedPaths(repo, session, options.paths || []);
      return { allowed: true, session: sessionId, paths: options.paths };
    }
    if (command === 'check-changes') {
      const paths = changedPaths(repo, session.base, options.upstream);
      if (paths.length) ownedPaths(repo, session, paths);
      return { allowed: true, session: sessionId, paths };
    }
    if (command === 'close') {
      if (state.release?.owner === sessionId) throw new Error('record release terminal status before closing session');
      session.state = 'closed'; session.updatedAt = now;
      return session;
    }
    if (command === 'release-acquire') {
      if (state.release) throw new Error(`release owned by ${state.release.owner}; expiry never proves CI/deploy stopped`);
      const branch = requireText(options.branch, 'branch');
      git(repo.root, ['check-ref-format', `refs/heads/${branch}`]);
      const candidate = git(repo.root, ['rev-parse', 'HEAD']);
      if (options.candidate !== candidate) throw new Error('candidate must equal the current full HEAD SHA');
      if (options.upstream && options.upstream !== `refs/remotes/origin/${branch}`) throw new Error('upstream must match the release target branch');
      const paths = changedPaths(repo, session.base, options.upstream);
      if (paths.length) ownedPaths(repo, session, paths);
      if (git(repo.root, ['status', '--porcelain'])) throw new Error('release requires a clean worktree');
      const actionsBudget = actionsBudgetReceipt(options, now);
      state.release = { owner: sessionId, branch, candidate, actionsBudget, expiresAt: expiry(options.ttl, now) };
      return state.release;
    }
    const release = state.release;
    if (!release || release.owner !== sessionId) throw new Error('session does not own the release');
    if (command === 'release-end') {
      if (!['completed', 'failed', 'superseded', 'aborted-before-push'].includes(options.outcome)) throw new Error('terminal --outcome required');
      state.releases.push({ ...release, outcome: options.outcome, evidence: requireText(options.evidence, 'terminal evidence'), endedAt: now });
      state.release = null;
      return state.releases.at(-1);
    }
    if (command === 'release-renew') {
      release.expiresAt = expiry(options.ttl, now);
      return release;
    }
    if (command === 'check-release') {
      if (!release.actionsBudget) throw new Error('release lacks Actions budget receipt; end or re-acquire with a fresh receipt');
      if (release.expiresAt <= now) throw new Error('release lease expired; inspect bound runs before renewal');
      if (options.branch !== release.branch || options.candidate !== release.candidate
          || git(repo.root, ['rev-parse', 'HEAD']) !== release.candidate) throw new Error('release branch/candidate mismatch; never chase the latest shared tip');
      if (git(repo.root, ['status', '--porcelain'])) throw new Error('release worktree changed after acquisition');
      return { allowed: true, ...release, approvalRequired: true };
    }
    throw new Error(`unknown session command: ${command}`);
  });
}
module.exports = { execute, checkSession, repository, overlaps, scope };
