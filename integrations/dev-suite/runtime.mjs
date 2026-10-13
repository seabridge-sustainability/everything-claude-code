import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import routing from '../../scripts/lib/skill-routing.js';
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
export function rankWorkflows(c, request) {
  validateCatalog(c);
  return routing.rankWorkflows(c, request);
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
