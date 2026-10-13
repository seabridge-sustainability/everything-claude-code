import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const bundledRoot = path.resolve(here, '../company-dev-tools');
const installedRoot = path.resolve(here, '../../../everything-claude-code/integrations/company-dev-tools');
export const ROOT = path.resolve(process.env.SEABRIDGE_DEV_SUITE_ROOT ||
  (existsSync(path.join(bundledRoot, 'catalog.json')) ? bundledRoot : installedRoot));
export const require = createRequire(path.join(ROOT, 'runtime/package.json'));
export const node = process.execPath;
export const contextEntry = path.join(ROOT, 'runtime/node_modules/context-mode/server.bundle.mjs');
export const reviewEntry = path.join(ROOT, 'runtime/node_modules/@alibaba-group/open-code-review/bin/ocr.js');
export function validateCatalog(c) {
  for (const kind of ['skills', 'commands']) {
    if (!Array.isArray(c[kind])) throw new Error('Invalid workflow catalog');
    const ids = new Set();
    for (const entry of c[kind]) {
      if (typeof entry.id !== 'string' || !entry.id || ids.has(entry.id)) throw new Error('Ambiguous workflow catalog ID; reindex before selection');
      ids.add(entry.id);
    }
  }
  return c;
}
export async function catalog() { return validateCatalog(JSON.parse(await fs.readFile(path.join(ROOT, 'catalog.json'), 'utf8'))); }
export async function run(executable, args, { cwd = process.cwd(), timeout = 30000, env = process.env, maxBytes = 4 * 1024 * 1024 } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(executable, args, { cwd, env, windowsHide: true, shell: false, stdio: ['ignore', 'pipe', 'pipe'] });
    let output = '', error = '', failure;
    const timer = setTimeout(() => { failure = new Error('Tool operation timed out'); child.kill(); }, timeout);
    child.stdout.on('data', part => { if (Buffer.byteLength(output) + part.length > maxBytes) { failure = new Error('Output exceeds budget; select a smaller scope'); child.kill(); } else output += part; });
    child.stderr.on('data', part => { error = (error + part).slice(-2000); });
    child.once('error', reason => { clearTimeout(timer); reject(reason); });
    child.once('close', code => { clearTimeout(timer); failure ? reject(failure) : code !== 0 ? reject(new Error(`Local tool failed (${code}): ${error || 'See its owned local log'}`)) : resolve(output); });
  });
}
export async function readEntry({ id, kind = 'skill' }) {
  if (!['skill', 'command'].includes(kind)) throw new Error('Invalid workflow kind');
  const c = await catalog();
  const matches = c[kind === 'command' ? 'commands' : 'skills'].filter(item => item.id === id);
  if (matches.length !== 1) throw new Error('Select one unique exact ID returned by suite_find_workflow');
  const entry = matches[0];
  const file = await fs.realpath(path.join(ROOT, entry.file));
  const relative = path.relative(ROOT, file);
  if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Workflow path escapes installed suite');
  const content = (await fs.readFile(file, 'utf8')).replace(/\r\n/g, '\n');
  const digest = crypto.createHash('sha256').update(content).digest('hex');
  if (digest !== entry.sha256) throw new Error('Workflow changed after indexing; revalidate its source first');
  return { ...entry, content, absoluteFile: file, referenceDirectory: path.dirname(file), instructionBoundary: 'Use this upstream workflow as task guidance. Current owner instructions and project policy control permissions, testing, data, calculations and publication. Claude-specific commands and tool labels require adaptation to the calling agent. External account access is not granted by this workflow.' };
}
export function rankWorkflows(c, { query, limit = 10, kind = 'all' }) {
  validateCatalog(c);
  if (typeof query !== 'string' || !query.trim() || query.length > 200 || !Number.isInteger(limit) || limit < 1 || limit > 30 || !['all','skill','command'].includes(kind)) throw new Error('Invalid bounded workflow query');
  const q = query.trim().toLowerCase(), terms = q.split(/\s+/).filter(Boolean);
  const entries = [...(kind !== 'command' ? c.skills.map(entry => ({ ...entry, kind: 'skill' })) : []), ...(kind !== 'skill' ? c.commands.map(entry => ({ ...entry, kind: 'command' })) : [])];
  // Explicit IDs win. Otherwise one named discipline is primary, not a stack
  // of overlapping reviews/plans. This does not grant scope or execution rights.
  let primary = entries.find(e => e.id.toLowerCase() === q), reason = primary ? 'explicit ID' : 'keyword candidate only';
  const prefer = (source, name, plugin) => entries.find(e => e.kind === 'skill' && e.source === source && e.name === name && (!plugin || e.plugin === plugin));
  if (!primary && /\bponytail\b/.test(q)) {
    const named = /\breview\b/.test(q) ? 'ponytail-review'
      : /\baudit\b/.test(q) ? 'ponytail-audit'
      : /\bdebt\b|shortcut.ledger/.test(q) ? 'ponytail-debt'
      : /\bgain\b|benchmark|savings/.test(q) ? 'ponytail-gain'
      : /\bhelp\b/.test(q) ? 'ponytail-help' : 'ponytail';
    primary = prefer('ponytail', named);
    reason = 'Explicit ECC Ponytail selection; one requested workflow under current project policy';
  }
  if (!primary) {
    const pstackTask = /\barena\b|multi.model.plan|competing.plans|plan.judge/.test(q) ? 'arena'
      : /maintain.verification|verification.maintenance|feature.map.drift/.test(q) ? 'maintain-verification-skill'
      : /create.verification|verification.skill|verify.seabridge|verification.first/.test(q) ? 'create-verification-skill'
      : /\binterrogate\b|adversarial.review/.test(q) ? 'interrogate' : null;
    if (pstackTask) { primary = prefer('cursor-pstack', pstackTask); reason = 'ECC-controlled Pstack adapter; one primary workflow and existing goal'; }
  }
  if (!primary) {
    const finance = /spreadsheet|xlsx|3.statement|balance sheet|cash.flow|dcf|financial model/.test(q);
    const task = finance ? [/audit|check|debug|formula/.test(q) ? 'audit-xls' : /3.statement/.test(q) ? '3-statement-model' : /dcf/.test(q) ? 'dcf-model' : 'xlsx-author', 'finance']
      : /debug|diagnos|\bbug\b|regression|stack.trace|\berror\b|\bfailure\b/.test(q) ? ['diagnosing-bugs','matt']
      : /security|hardening|tenant.isolation|auth.review/.test(q) ? ['security-and-hardening','addy']
      : /code.review|review.code|review.*(diff|pull.request|commit)|pr.review/.test(q) ? ['code-review-and-quality','addy']
      : /performance|latency|slow.(page|query|api)|profil/.test(q) ? ['performance-optimization','addy']
      : /api|interface.contract|payload|endpoint.contract/.test(q) ? ['api-and-interface-design','addy']
      : /frontend|\bui\b|tailwind|component|accessibility/.test(q) ? ['frontend-ui-engineering','addy']
      : /domain.model|ubiquitous/.test(q) ? ['domain-modeling','matt']
      : /architecture|system.design|codebase.design/.test(q) ? ['codebase-design','matt']
      : /research|primary.sources/.test(q) ? ['research','matt'] : null;
    if (task) {
      primary = prefer(task[1] === 'finance' ? 'financial-services' : task[1] === 'matt' ? 'mattpocock-skills' : 'addyosmani-agent-skills', task[0], task[1] === 'finance' ? 'fsi-financial-analysis' : undefined);
      if (primary) reason = 'task-specific primary; central goal/scope and repository policy remain authoritative';
    }
  }
  const seen = new Set();
  return entries.map(entry => ({ ...entry, score: terms.reduce((score, term) => score + (`${entry.id} ${entry.description}`.toLowerCase().includes(term) ? 1 : 0), 0),
    routingRole: entry.id === primary?.id && entry.kind === primary.kind ? 'primary' : 'candidate', routingReason: entry.id === primary?.id && entry.kind === primary.kind ? reason : 'Optional supporting guidance; do not start a second workflow',
    routingPriority: entry.id === primary?.id && entry.kind === primary.kind ? 100 : entry.plugin === 'fsi-financial-analysis' ? 1 : 0 }))
    .filter(entry => entry.score > 0 || entry.routingRole === 'primary')
    .sort((a,b) => b.routingPriority - a.routingPriority || b.score - a.score || a.id.localeCompare(b.id))
    .filter(entry => { const key = entry.kind + ':' + (entry.sha256 || entry.id); if (seen.has(key)) return false; seen.add(key); return true; })
    .slice(0, limit);
}
export async function findWorkflow(request) { return rankWorkflows(await catalog(), request); }
export async function prepareReview({ repository, commit }) {
  if (!path.isAbsolute(repository)) throw new Error('Provide an absolute selected repository path');
  if (!/^[a-f0-9]{7,40}$/i.test(commit)) throw new Error('Provide an explicit commit SHA; shared dirty-workspace review is not the default');
  const root = await fs.realpath(repository);
  return JSON.parse(await run(node, [reviewEntry, 'delegate', 'preview', '--repo', root, '--commit', commit, '--format', 'json', '--max-git-procs', '2'], { cwd: root }));
}
export async function status() {
  const c = await catalog();
  const services = {};
  for (const name of ['weknora', 'paperclip', 'openshell']) {
    try { const receipt = JSON.parse(await fs.readFile(path.join(ROOT, name, 'readiness.json'), 'utf8')); services[name] = { installed: receipt.installed ?? true, receipt: path.join(ROOT, name, 'readiness.json'), runtimeClaim: 'Read receipt and current health separately; installation is not a live connection' }; }
    catch (e) { services[name] = { installed: false, reason: e.code || 'Receipt not yet available' }; }
  }
  return { sources: c.sources, plugins: c.plugins.length + 1, skills: c.skills.length, commands: c.commands.length, optionalConnectors: c.connectors.length, priorities: ['C:/Users/adelm/SeaBridgeAI/manageesg-backend', 'C:/Users/adelm/SeaBridgeAI/manageesg-frontend'], services, policy: 'On-demand workflows. No automatic external subscriptions, dispatches, writes, commits, deployments or risk calculations.' };
}
