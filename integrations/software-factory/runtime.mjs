import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const { withFileLock, atomicWrite } = require('../../scripts/lib/goal-store');
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SOURCE = path.join(ROOT, 'integrations/software-factory');
const STATE = path.join(ROOT, 'artifacts/agent-runs/software-factory');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const hashFile = file => sha(fs.readFileSync(file));
const fail = message => { throw Error(message); };
export function validateConfiguration(c) {
  if (c.feedback?.enabled !== true || c.feedback.mode !== 'read-only-intake' || c.feedback.pageLimit !== 30
      || c.feedback.maxRecords !== 1000 || c.feedback.storeBodies !== false || c.feedback.automaticMessages !== false
      || c.feedback.automaticModelDispatch !== false || c.verification?.image !== 'ecc-factory-verifier:20261013'
      || c.verification.sandbox !== 'ecc-factory-1013' || c.verification.cpu !== '500m'
      || c.verification.minimumFreeGiB !== 1.5 || c.verification.source !== 'manageesg-frontend/src/lib/utils/auth-return-path.ts') fail('Invalid bounded factory configuration');
  if (c.version !== 1 || !Array.isArray(c.feedback?.sources) || !c.feedback.sources.length || c.feedback.sources.length > 5
      || c.feedback.sources.some(s => !/^seabridge-sustainability\/[a-z0-9-]+$/.test(s))
      || c.verification?.gateway !== 'http://127.0.0.1:17770' || c.verification.memoryMiB !== 256
      || !Number.isInteger(c.verification.cases) || c.verification.cases < 10 || c.verification.cases > 2000
      || !Number.isInteger(c.verification.seed) || c.verification.seed < 0 || c.verification.seed > 4294967295) fail('Invalid bounded factory configuration');
  return c;
}
const config = () => validateConfiguration(JSON.parse(fs.readFileSync(path.join(SOURCE, 'config.json'), 'utf8')));
function bounded(value, max = 200) { if (typeof value !== 'string' || !value.trim() || value.length > max) fail('Bounded text required'); return value; }
export function safeState(file) {
  const root = path.resolve(file), parent = path.dirname(root);
  let cursor = parent;
  while (cursor !== path.dirname(cursor)) { if (fs.existsSync(cursor) && fs.lstatSync(cursor).isSymbolicLink()) fail('Linked state directory denied'); cursor = path.dirname(cursor); }
  if (fs.existsSync(root) && (fs.lstatSync(root).isSymbolicLink() || !fs.statSync(root).isFile() || fs.statSync(root).size > 4000000)) fail('Linked, non-file or oversized state denied');
  return root;
}
export function mergeFeedback(state, source, issues, now = new Date().toISOString()) {
  if (!config().feedback.sources.includes(source) || !Array.isArray(issues) || issues.length > 30) fail('Admitted bounded feedback source required');
  const result = structuredClone(state), max = config().feedback.maxRecords;
  for (const issue of issues) {
    if (!Number.isSafeInteger(issue.number) || issue.number < 1 || !['open','closed'].includes(issue.state)
        || typeof issue.updated_at !== 'string' || !/^\d{4}-\d{2}-\d{2}T[0-9:.]+Z$/.test(issue.updated_at) || !Number.isFinite(Date.parse(issue.updated_at))) fail('Invalid issue metadata');
    const id = sha(source + '#' + issue.number), current = result.items.find(item => item.id === id);
    if (current && Date.parse(issue.updated_at) < Date.parse(current.version)) continue;
    if (current && current.version === issue.updated_at) continue;
    const entry = { id, source, number: issue.number, version: issue.updated_at, state: issue.state,
      reference: `https://github.com/${source}/issues/${issue.number}`, observedAt: now, status: issue.state === 'open' ? 'needs-sanitized-reproduction' : 'closed',
      permissionGranted: false, lease: null };
    if (current) { result.history.push({ id, version: current.version, status: current.status }); result.items[result.items.indexOf(current)] = entry; }
    else { if (result.items.length >= max) fail('Feedback queue capacity reached; operator triage required'); result.items.push(entry); }
    if (result.history.length > max * 3) fail('Feedback history capacity reached; retained evidence not pruned automatically');
  }
  return result;
}
export function updateQueue(file, action) {
  file = safeState(file);
  return withFileLock(file + '.lock', () => {
    const state = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { version: 1, items: [], history: [] };
    if (state.version !== 1 || !Array.isArray(state.items) || !Array.isArray(state.history)) fail('Invalid retained queue');
    const next = action(state); atomicWrite(file, JSON.stringify(next, null, 2) + '\n'); return next;
  });
}
export function writeState(file,value) { atomicWrite(safeState(file),JSON.stringify(value,null,2)+'\n'); }
export function claimFeedback(file, { id, version, owner }, now = Date.now()) {
  bounded(id, 64); bounded(version); bounded(owner, 100);
  if (!/^[a-f0-9]{64}$/.test(id) || !Number.isFinite(Date.parse(version))) fail('Exact issue identity and revision required');
  let selected;
  updateQueue(file, state => {
    selected = state.items.find(item => item.id === id);
    if (!selected || selected.version !== version || selected.state !== 'open') fail('Unknown, closed or stale issue revision');
    if (selected.lease && Date.parse(selected.lease.until) > now) fail('Issue already has a live local claim');
    selected.lease = { owner, until: new Date(now + 15 * 60000).toISOString(), token: crypto.randomUUID() };
    return state;
  });
  return { ...selected, implementationAuthorized: false, limitation: 'Serialized local intake claim, not repository write ownership or remote multi-host exclusivity.' };
}
export function releaseFeedback(file, { id, version, token }, now = Date.now()) {
  bounded(id,64); bounded(version); bounded(token,36);
  updateQueue(file, state => {
    const item=state.items.find(row=>row.id===id);
    if(!item || item.version!==version || item.lease?.token!==token || Date.parse(item.lease.until)<=now) fail('Exact live claim token and revision required');
    item.lease=null;return state;
  });
  return {released:true,implementationAuthorized:false};
}
export function proposeFeedback(file, { id, version, token, reproduction, acceptance }, now=Date.now()) {
  bounded(reproduction,4000);
  if(!Array.isArray(acceptance)||!acceptance.length||acceptance.length>10)fail('One to ten observable acceptance scenarios required');
  acceptance.forEach(value=>bounded(value,1000));
  const item=updateQueue(file,state=>state).items.find(row=>row.id===id);
  if(!item||item.version!==version||item.state!=='open'||item.lease?.token!==token||Date.parse(item.lease.until)<=now)fail('Exact live issue revision and local claim required');
  // Caller supplies a sanitized reproduction; fetched tracker bodies are never ingested.
  const packet={schema:'seabridge.factory.feedback-proposal.v1',issue:{id,version,reference:item.reference},reproduction,acceptance,
    inputTrust:'untrusted caller-supplied sanitized reproduction; not a human approval receipt',
    nextAction:'Reproduce read-only, check the current goal and repository ownership, then implement only within authorized scope.',
    implementationAuthorized:false,automaticDispatch:false};
  return {...packet,packetSha256:sha(JSON.stringify(packet))};
}
async function execute(executable, args, { cwd = ROOT, timeout = 30000, env = process.env } = {}) {
  const { spawn } = await import('node:child_process');
  return new Promise((resolve, reject) => {
    const child = spawn(executable, args, { cwd, env, shell: false, windowsHide: true, stdio: ['ignore','pipe','pipe'] });
    let output = '', bytes = 0, problem;
    const timer = setTimeout(() => { problem = 'Deadline exceeded'; child.kill(); }, timeout);
    for (const stream of [child.stdout, child.stderr]) stream.on('data', data => { bytes += data.length; if (bytes > 256000) { problem = 'Output limit exceeded'; child.kill(); } else output += data; });
    child.on('error', error => { clearTimeout(timer); reject(error); });
    child.on('close', code => { clearTimeout(timer); resolve({ code, output, problem, outputSha256: sha(output) }); });
  });
}
export async function intake() {
  const settings = config();
  if (!settings.feedback.enabled || settings.feedback.storeBodies || settings.feedback.automaticMessages || settings.feedback.automaticModelDispatch) fail('Read-only intake configuration required');
  const receipts = [];
  for (const source of settings.feedback.sources) {
    // Do not inherit user-provided API shims, alternate hosts or model secrets.
    const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => /^(PATH|SYSTEMROOT|WINDIR|USERPROFILE|HOME|APPDATA|LOCALAPPDATA|TEMP|TMP|GH_TOKEN|GITHUB_TOKEN)$/i.test(key)));
    const result = await execute('gh', ['api', `repos/${source}/issues?state=all&per_page=30`, '--jq', '{pageCount:length,issues:[.[]|select(.pull_request==null)|{number,updated_at,state}]}'], { env });
    if (result.code !== 0 || result.problem) return { verdict: 'BLOCKED', reason: 'Admitted GitHub metadata read failed; no source substitution or retries.', source, providerCalls: 0 };
    const page = JSON.parse(result.output), issues = page.issues;
    updateQueue(path.join(STATE,'feedback.json'), state => mergeFeedback(state, source, issues));
    receipts.push({ source, itemsRead: issues.length, potentiallyTruncated: page.pageCount >= 30, metadataSha256: sha(JSON.stringify(issues)) });
  }
  return { verdict: 'PASS', mode: 'actual-read-only-GitHub-intake', sources: receipts, rawBodiesStored: false, messagesSent: 0, providerCalls: 0,
    limitation: 'Bounded first-page intake; empty repositories prove connection, not reproduction of an actual customer bug.' };
}
function queue() { const file = safeState(path.join(STATE,'feedback.json')); return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file,'utf8')) : { version: 1, items: [], history: [] }; }
export async function factoryRequest(request) {
  if (!request || typeof request !== 'object' || Array.isArray(request)) fail('Factory request required');
  const operation = request.operation;
  const allowed = { status: [], intake: [], queue: [], claim: ['id','version','owner'], release:['id','version','token'], propose:['id','version','token','reproduction','acceptance'], prepare: [], verify: [], fuzz: [], contract: [],journey:[], maintain:['base','head'], 'ui-features':['feature_ids'], 'ui-admit':['contract'], 'ui-capture':['admission','phase','route','state','checks'], 'ui-validate':['admission','receipts'], 'ui-image':['file','admission'] };
  if (!Object.hasOwn(allowed, operation) || Object.keys(request).some(key => key !== 'operation' && !allowed[operation].includes(key))) fail('Known operation and bounded typed arguments required');
  if (operation === 'status') return { mode: config().feedback.mode, feedbackEnabled: config().feedback.enabled,
    queueRecords: queue().items.length, verifierInstalled: fs.existsSync(path.join(STATE,'verifier-installation.json')), schedulerEnabled: false, providerCalls: 0 };
  if (operation === 'intake') return intake();
  if (operation === 'queue') return queue();
  if (operation === 'claim') return claimFeedback(path.join(STATE,'feedback.json'), request);
  if (operation === 'release') return releaseFeedback(path.join(STATE,'feedback.json'),request);
  if (operation === 'propose') return proposeFeedback(path.join(STATE,'feedback.json'),request);
  if (operation === 'contract') return (await import('./contracts.mjs')).verifyContracts();
  if (operation === 'maintain') return require('./feature-maintenance.cjs').maintain(request);
  if (operation === 'ui-features') return require('./ui-contract.cjs').features(request.feature_ids);
  if (operation === 'ui-admit') return require('./ui-contract.cjs').admit(request.contract);
  if (operation === 'ui-capture') return (await import('./ui-browser.mjs')).capture(request);
  if (operation === 'ui-validate') return (await import('./ui-browser.mjs')).validateEvidence(request);
  if (operation === 'ui-image') return (await import('./ui-browser.mjs')).readImage(request);
  if (operation === 'journey') return (await import('./journey.mjs')).readOnlyJourney();
  if (operation === 'prepare') return (await import('./verifier.mjs')).prepareVerifier();
  return (await import('./verifier.mjs')).verifySandbox({ fuzz: operation === 'fuzz' });
}
export { STATE, SOURCE, config, sha, hashFile, execute };
