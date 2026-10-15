'use strict';

// Finite, cooperative owner reconciliation. No pushes, reruns, cancellation,
// deployment commands, lease takeover, renewal, scheduler or additional state.
const crypto = require('node:crypto');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { setTimeout: delay } = require('node:timers/promises');
const WORKFLOWS = {
  'security-scan': '.github/workflows/security-scan.yml',
  'backend-tests': '.github/workflows/backend-tests.yml',
};
const DEPLOY = ['Register the tested image and update ECS',
  'Wait for deployment to stabilize', 'Verify ECS is running the tested image digest',
  'Smoke test dev API health'];
const CONCLUSIONS = new Set(['success', 'failure', 'neutral', 'cancelled',
  'timed_out', 'action_required', 'stale', 'skipped', 'startup_failure']);
function demand(condition, reason) { if (!condition) throw new Error(reason); }
function integer(value, fallback, min, max) {
  const result = value === undefined ? fallback : Number(value);
  demand(Number.isInteger(result) && result >= min && result <= max, 'invalid finite watcher limit');
  return result;
}
function readGit(cwd, args) {
  return execFileSync('git', args, {cwd, encoding: 'utf8', windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe']}).trim();
}
function normalRoot(root) {
  const resolved = path.resolve(root);
  return process.platform === 'win32' ? resolved.toLowerCase() : resolved;
}
function originRepository(url) {
  const match = /^(?:git@github\.com:|https:\/\/github\.com\/)([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+?)(?:\.git)?$/.exec(url);
  demand(match && !match[1].includes('..'), 'origin is not one credential-free GitHub repository');
  return match[1];
}
function signature(runs) {
  return JSON.stringify(runs.map(run => [run.id, run.run_attempt, run.status,
    run.conclusion, run.updated_at]).sort((a,b) => a[0]-b[0]));
}
function terminal(item) {
  return item.status === 'completed' && CONCLUSIONS.has(item.conclusion);
}
async function githubGet(endpoint, timeoutMs) {
  // Reuse the publisher's existing gh login; never extract or print credentials.
  return JSON.parse(execFileSync('gh', ['api', '--hostname', 'github.com', '--method', 'GET', endpoint,
    '-H', 'Accept: application/vnd.github+json', '-H', 'X-GitHub-Api-Version: 2022-11-28'], {
    encoding: 'utf8', timeout: timeoutMs, maxBuffer: 8 * 1024 * 1024, windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'] }));
}
async function watchRelease(options, dependencies = {}) {
  const execute = dependencies.execute || require('./session-coordination').execute;
  const git = dependencies.git || readGit, now = dependencies.now || Date.now;
  const sleep = dependencies.sleep || delay, request = dependencies.request || githubGet;
  const maxPolls = integer(options.maxPolls, 20, 1, 120);
  const pollMs = integer(options.pollMs, 15000, 1, 60000);
  const maxRequests = integer(options.maxRequests, 200, 1, 2000);
  const deadline = now() + integer(options.deadlineSeconds, 600, 1, 1800) * 1000;
  const closeSession = options.closeSession === 'yes';
  demand(options.closeSession === undefined || ['yes','no'].includes(options.closeSession), 'close-session must be yes or no');
  demand(/^[a-f0-9]{40}(?:[a-f0-9]{24})?$/.test(options.candidate || ''), 'full candidate required');
  demand(/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(options.repository || ''), 'repository owner/name required');
  demand(typeof options.branch === 'string' && /^[A-Za-z0-9_/-]+$/.test(options.branch), 'literal branch required');
  const names = (options.expectedWorkflows || '').split(',').map(name => name.trim()).sort();
  demand(names.length && new Set(names).size === names.length
    && names.every(name => Object.hasOwn(WORKFLOWS,name)), 'exact supported expected workflows required');
  demand(!names.includes('backend-tests') || options.branch === 'seabridge_development',
    'backend deployment watcher supports only seabridge_development');
  const root = normalRoot(git(options.cwd, ['rev-parse','--show-toplevel']));
  const fetchUrl = git(options.cwd, ['remote','get-url','--all','origin']);
  const pushUrl = git(options.cwd, ['remote','get-url','--push','--all','origin']);
  demand(fetchUrl === pushUrl && !fetchUrl.includes('\n')
    && originRepository(fetchUrl) === options.repository, 'origin repository/destination mismatch');
  const destination = crypto.createHash('sha256').update(pushUrl).digest('hex');
  let fingerprint, calls = 0, initial, endedResult;
  function owner() {
    demand(git(options.cwd, ['remote','get-url','--all','origin']) === fetchUrl
      && git(options.cwd, ['remote','get-url','--push','--all','origin']) === pushUrl,
    'origin destination changed; no mutation');
    const state = execute('status', {cwd: options.cwd});
    const release = state.release, session = state.sessions.find(item => item.id === options.sessionId);
    demand(release?.owner === options.sessionId && release.branch === options.branch
      && release.candidate === options.candidate, 'release owner or candidate changed; no mutation');
    const observation = session?.releaseObservation;
    const ownsSource = session?.state === 'active';
    const ownsObservation = session?.state === 'closed' && observation?.branch === options.branch
      && observation.candidate === options.candidate && observation.destinationSha256 === destination;
    demand((ownsSource || ownsObservation) && session.expiresAt > now()
      && normalRoot(session.worktree) === root, 'owner session expired or belongs to another checkout');
    demand(release.publication?.publishable === true
      && release.publication.destinationSha256 === destination, 'release publication destination mismatch');
    const expected = [...(release.actionsBudget?.expectedWorkflows || [])].sort();
    demand(JSON.stringify(expected) === JSON.stringify(names), 'expected workflows differ from release budget receipt');
    const pinned = JSON.stringify(release);
    if (fingerprint) demand(pinned === fingerprint, 'release record changed; no mutation');
    else { fingerprint = pinned; initial = release; }
    return release;
  }
  owner();
  async function get(endpoint) {
    demand(now() < deadline && calls < maxRequests, 'finite observation budget exhausted; lease retained');
    calls++;
    return request(endpoint, Math.max(1, Math.min(15000, deadline-now())));
  }
  async function pages(endpoint, field) {
    const rows = [], ids = new Set(); let total;
    for (let page = 1; page <= 10; page++) {
      const data = await get(endpoint + (endpoint.includes('?') ? '&' : '?') + 'per_page=100&page=' + page);
      demand(Array.isArray(data[field]) && Number.isSafeInteger(data.total_count)
        && data.total_count >= 0 && data.total_count <= 1000, 'incomplete or unbounded GitHub metadata');
      if (total === undefined) total = data.total_count;
      demand(total === data.total_count, 'GitHub pagination changed; lease retained');
      for (const row of data[field]) {
        demand(Number.isSafeInteger(row.id) && !ids.has(row.id), 'duplicate or invalid GitHub metadata identity');
        ids.add(row.id); rows.push(row);
      }
      demand(rows.length <= total, 'GitHub metadata count mismatch');
      if (rows.length === total) return rows;
      demand(data[field].length === 100, 'incomplete GitHub pagination');
    }
    throw new Error('GitHub pagination ceiling reached; lease retained');
  }
  const api = '/repos/' + options.repository + '/actions/runs';
  async function runs() {
    const rows = await pages(api + '?head_sha=' + options.candidate + '&branch='
      + encodeURIComponent(options.branch) + '&event=push', 'workflow_runs');
    for (const run of rows) {
      demand(run.head_sha === options.candidate && run.head_branch === options.branch
        && run.event === 'push' && run.repository?.full_name === options.repository
        && names.includes(run.name) && WORKFLOWS[run.name] === run.path
        && Number.isSafeInteger(run.run_attempt) && run.run_attempt >= 1 && run.run_attempt <= 10,
      'unexpected run subject/workflow/attempt; lease retained');
    }
    return rows;
  }
  async function verdict(observed) {
    if (!observed.length || names.some(name => !observed.some(run => run.name === name))
        || observed.some(run => !terminal(run))) return null;
    let successful = observed.every(run => run.conclusion === 'success');
    const evidence = [];
    for (const run of observed) {
      let mutation = false, latestProvesStable = false, latestDeployed = false, foundDeploy = false;
      for (let attempt = 1; attempt <= run.run_attempt; attempt++) {
        const jobs = await pages(api + '/' + run.id + '/attempts/' + attempt + '/jobs', 'jobs');
        if (!jobs.length || jobs.some(job => !terminal(job))) return null;
        if (attempt === run.run_attempt && jobs.some(job => !['success','skipped'].includes(job.conclusion))) successful = false;
        if (run.name !== 'backend-tests') continue;
        const deploys = jobs.filter(job => job.name === 'Deploy the tested development commit'
          || job.name.startsWith('Deploy the tested development commit / '));
        if (deploys.length !== 1) return null;
        foundDeploy = true;
        const job = deploys[0];
        if (job.conclusion === 'skipped') { if (attempt === run.run_attempt) successful = false; continue; }
        if (!Array.isArray(job.steps)) return null;
        const steps = DEPLOY.map(name => job.steps.filter(step => step.name === name));
        if (steps.some(matches => matches.length !== 1)) return null;
        const states = steps.map(matches => matches[0]);
        if (states.some(step => !terminal(step))) return null;
        if (states[0].conclusion !== 'skipped') mutation = true;
        if (attempt === run.run_attempt) {
          latestProvesStable = states.slice(0,3).every(step => step.conclusion === 'success');
          latestDeployed = states.every(step => step.conclusion === 'success');
        }
      }
      if (run.name === 'backend-tests') {
        if (!foundDeploy || (mutation && !latestProvesStable)) return null;
        if (!latestDeployed) successful = false;
      }
      evidence.push({id: run.id, attempt: run.run_attempt, workflow: run.name, conclusion: run.conclusion});
    }
    return {outcome: successful ? 'completed' : 'failed', runs: evidence};
  }
  try {
    for (let poll = 0; poll < maxPolls && now() < deadline; poll++) {
      owner();
      const observed = await runs(), result = await verdict(observed);
      if (result) {
        // Recollect all pages to detect new runs/reruns before the owner-only
        // transactional branch/candidate guard. No future rerun is authorized.
        const confirmed = await runs();
        if (signature(observed) === signature(confirmed)) {
          owner();
          demand(now() < deadline, 'finite watcher deadline reached; lease retained');
          const proof = JSON.stringify({source: 'github-actions-metadata', ...result});
          demand(proof.length <= 2000, 'terminal evidence exceeds existing release receipt bound');
          const ended = execute('release-end', {cwd: options.cwd, sessionId: options.sessionId,
            branch: options.branch, candidate: options.candidate, outcome: result.outcome,
            expectedReleaseSha256: crypto.createHash('sha256').update(fingerprint).digest('hex'), evidence: proof});
          endedResult = {state: 'ended', outcome: result.outcome, runs: result.runs, requests: calls,
            sessionClosed: false, release: ended, authorizationGranted: false};
          if (closeSession) execute('close', {cwd: options.cwd, sessionId: options.sessionId});
          return {...endedResult, sessionClosed: closeSession};
        }
      }
      if (poll + 1 < maxPolls && now() < deadline) await sleep(Math.min(pollMs, deadline-now()));
    }
    return {state: 'retained', reason: 'finite deadline/poll ceiling; terminal evidence incomplete',
      requests: calls, candidate: initial.candidate, authorizationGranted: false};
  } catch (_) {
    // Transport/parser errors may contain credentials or response source text.
    if (endedResult) return {...endedResult, reason: 'release ended; session close requires owner reconciliation'};
    return {state: 'retained', reason: 'owner, observation or terminal evidence unavailable; inspect bound runs',
      requests: calls, authorizationGranted: false};
  }
}
module.exports = {watchRelease};
