import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

export const revision = '7845807642f9ef234a0ec5b4067fa3f11fd92a85'; // pragma: allowlist secret -- public upstream Git commit
const here = path.dirname(fileURLToPath(import.meta.url));
const suite = path.resolve(here, '../company-dev-tools');
const source = path.join(suite, 'sources/cursor-plugins');
const digest = value => crypto.createHash('sha256').update(value).digest('hex');

export async function download() {
  const tree = JSON.parse(execFileSync('gh', ['api', `repos/cursor/plugins/git/trees/${revision}?recursive=1`], { encoding: 'utf8', windowsHide: true, maxBuffer: 20e6 }));
  if (tree.truncated || tree.sha !== revision) throw Error('Complete pinned tree required');
  const files = tree.tree.filter(entry => entry.type === 'blob' && entry.path.startsWith('pstack/'));
  if (!files.length || files.some(entry => entry.mode === '120000' || entry.path.includes('..'))) throw Error('Unexpected source tree');
  const receipts = [];
  let cursor = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (cursor < files.length) {
      const entry = files[cursor++];
      const response = await fetch(`https://raw.githubusercontent.com/cursor/plugins/${revision}/${entry.path}`, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw Error(`Download failed for ${entry.path}: ${response.status}`);
      const data = Buffer.from(await response.arrayBuffer());
      const gitDigest = crypto.createHash('sha1').update(`blob ${data.length}\0`).update(data).digest('hex');
      if (data.length !== entry.size || gitDigest !== entry.sha) throw Error(`Source integrity failed: ${entry.path}`);
      const target = path.join(source, entry.path);
      await fs.mkdir(path.dirname(target), { recursive: true });
      try {
        const existing = await fs.readFile(target);
        if (!existing.equals(data)) throw Error(`Preserve existing different source: ${entry.path}`);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        await fs.writeFile(target, data, { flag: 'wx' });
      }
      receipts.push({ path: entry.path, bytes: data.length, gitBlob: entry.sha, sha256: digest(data) });
    }
  }));
  receipts.sort((a, b) => a.path.localeCompare(b.path));
  const manifest = { schema: 'seabridge.pstack.source.v1', repository: 'https://github.com/cursor/plugins', revision, sourceDirectory: 'integrations/company-dev-tools/sources/cursor-plugins', files: receipts, totalBytes: receipts.reduce((n, x) => n + x.bytes, 0), upstreamExecution: 'disabled; source is reference material', license: 'pstack/LICENSE' };
  await fs.writeFile(path.join(here, 'source-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(JSON.stringify({ revision, files: receipts.length, bytes: manifest.totalBytes, sourceIntegrity: 'verified Git blob identities', worktreesCreated: 0 }));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await download();
