import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const ID = 'ecc-higgsfield/ecc/higgsfield-frontend-assets';
const suite = path.join(ROOT, 'integrations/company-dev-tools');
const file = 'skills/ecc-higgsfield/higgsfield-frontend-assets/SKILL.md';

// Publish guidance only. Neither indexing nor reading invokes the provider.
export async function indexHiggsfield(base) {
  const result = structuredClone(base);
  result.skills = result.skills.filter(entry => entry.source !== 'ecc-higgsfield');
  const scroll = result.skills.findIndex(entry => entry.source === 'ecc-scroll-craft');
  const insertAt = scroll >= 0 ? scroll : result.skills.length;
  const body = (await fs.readFile(path.join(suite, file), 'utf8')).replace(/\r\n/g, '\n');
  const description = body.match(/^description: (.+)$/m)?.[1];
  if (!description) throw Error('Higgsfield adapter description missing');
  result.sources['ecc-higgsfield'] = {
    repository: 'https://github.com/higgsfield-ai/cli',
    execution: 'Opt-in installed CLI; no provider invocation or native MCP registration',
    excludedRepository: 'https://github.com/higgsfield-ai/higgsfield'
  };
  result.skills.splice(insertAt, 0, { id: ID, name: 'higgsfield-frontend-assets', source: 'ecc-higgsfield',
    plugin: 'ecc', description, file,
    sha256: crypto.createHash('sha256').update(body).digest('hex'), adapted: true });
  if (new Set(result.skills.map(entry => entry.id)).size !== result.skills.length) throw Error('Duplicate workflow IDs');
  return result;
}
