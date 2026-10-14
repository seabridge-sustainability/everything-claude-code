import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const REVISION = '75d81f74e83692add18cd7a8a8e078b8a887a579';
export const ID = 'ecc-scroll-craft/ecc/scroll-craft-dashboard-review';
const suite = path.join(ROOT, 'integrations/company-dev-tools');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const normalized = text => text.replace(/\r\n/g, '\n');

// A pure family indexer: no clone, package installation, capture or provider execution.
export async function indexScrollCraft(base) {
  const result = structuredClone(base);
  result.skills = result.skills.filter(entry => entry.source !== 'ecc-scroll-craft');
  const file = 'skills/ecc-scroll-craft/scroll-craft-dashboard-review/SKILL.md';
  const body = normalized(await fs.readFile(path.join(suite, file), 'utf8'));
  const description = body.match(/^description: (.+)$/m)?.[1];
  if (!description) throw Error('Scroll Craft adapter description missing');
  result.sources['ecc-scroll-craft'] = {
    repository: 'https://github.com/nateherkai/scroll-craft', revision: REVISION,
    execution: 'ECC dashboard adapter only; retained upstream is reference only',
    manifest: '../scroll-craft/source-manifest.json'
  };
  result.skills.push({ id: ID, name: 'scroll-craft-dashboard-review', source: 'ecc-scroll-craft',
    plugin: 'ecc', description, file, sha256: sha(body), adapted: true });
  if (new Set(result.skills.map(entry => entry.id)).size !== result.skills.length) throw Error('Duplicate workflow IDs');
  return result;
}

// Explicit provisioning only. Copy text references; do not register upstream executable tools.
export async function retainReference() {
  const source = path.join(suite, 'sources/scroll-craft');
  const git = args => execFileSync('git', ['-C', source, ...args], { windowsHide: true, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  if (git(['rev-parse', 'HEAD']).trim() !== REVISION || git(['status', '--porcelain']).trim()) throw Error('Scroll Craft pin changed or source is dirty');
  const prefix = 'plugins/nateherk-design/skills/scroll-craft/';
  const files = git(['ls-tree', '-r', '--name-only', REVISION]).trim().split('\n');
  const selected = files.filter(file => ['LICENSE', 'README.md'].includes(file) ||
    file === prefix + 'SKILL.md' || (file.startsWith(prefix + 'references/') && file.endsWith('.md')));
  const manifest = [];
  for (const file of selected) {
    const content = normalized(git(['show', `${REVISION}:${file}`]));
    const target = path.join(ROOT, 'integrations/scroll-craft/reference', file);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content, { flag: 'wx' });
    manifest.push({ path: file, retained: path.relative(ROOT, target).replaceAll('\\', '/'), sha256: sha(content) });
  }
  const executionReview = [
    ['shoot.mjs', 'Defaults to lab/shots and localhost:4500; launches browser and ffmpeg without ECC D-only profile/temp guards'],
    ['serve.mjs', 'Starts an additional server; use existing approved localhost:3000 instead'],
    ['kie.mjs', 'External asset provider calls; no provider authorization or execution included'],
    ['doctor.mjs', 'Can invoke kie.mjs probe; not a provider-free health check'],
    ['workspace.mjs', 'Creates upstream project structure; not an ECC or product bootstrap'],
    ['worldflight-assert.mjs', 'Browser assertions for upstream scroll engine; not authenticated dashboard proof']
  ].map(([name, reason]) => ({ path: prefix + 'scripts/' + name,
    sha256: sha(normalized(git(['show', `${REVISION}:${prefix}scripts/${name}`]))), status: 'not-exposed-or-executed', reason }));
  const value = { schema: 'seabridge.scroll-craft.source.v1', repository: 'https://github.com/nateherkai/scroll-craft',
    revision: REVISION, license: 'MIT', sourceDirectory: 'integrations/company-dev-tools/sources/scroll-craft',
    files: manifest, executionReview, adaptedWorkflowId: ID, rawHooksExecuted: false,
    engineInstalled: false, newMcpServers: 0, productInstructionFilesAdded: 0, providerCalls: 0 };
  await fs.writeFile(path.join(ROOT, 'integrations/scroll-craft/source-manifest.json'), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
  return value;
}
