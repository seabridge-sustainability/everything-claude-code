import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { revision, ROOT } from './runtime.mjs';
const here = path.dirname(fileURLToPath(import.meta.url)), targetRoot = path.join(ROOT, 'integrations/company-dev-tools/sources/ponytail');
export async function download() {
  const response = await fetch('https://api.github.com/repos/DietrichGebert/ponytail/git/trees/' + revision + '?recursive=1', { signal: AbortSignal.timeout(30000), headers: { 'User-Agent': 'SeaBridge-ECC-source-import' } });
  if (!response.ok) throw Error('Pinned tree fetch failed: ' + response.status);
  const tree = await response.json();
  if (tree.truncated || tree.sha !== revision) throw Error('Complete pinned tree required');
  const files = tree.tree.filter(e => e.type === 'blob');
  if (!files.length || files.some(e => e.mode !== '100644' && e.mode !== '100755' || e.path.split('/').some(p => !p || p === '.' || p === '..') || /[\\:\x00-\x1f]/.test(e.path)) || files.reduce((n,e) => n + e.size,0) > 20 * 1024 * 1024) throw Error('Unexpected or oversized source tree');
  const receipts = []; let cursor = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (cursor < files.length) {
      const entry = files[cursor++];
      const response = await fetch('https://raw.githubusercontent.com/DietrichGebert/ponytail/' + revision + '/' + entry.path, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw Error('Source download failed: ' + entry.path);
      const data = Buffer.from(await response.arrayBuffer()), gitBlob = crypto.createHash('sha1').update('blob ' + data.length + '\0').update(data).digest('hex');
      if (data.length !== entry.size || gitBlob !== entry.sha) throw Error('Git blob mismatch: ' + entry.path);
      const target = path.join(targetRoot, entry.path); await fs.mkdir(path.dirname(target), { recursive: true });
      try { if (!(await fs.readFile(target)).equals(data)) throw Error('Preserve existing different source: ' + entry.path); }
      catch (error) { if (error.code !== 'ENOENT') throw error; await fs.writeFile(target,data,{flag:'wx'}); }
      receipts.push({ path: entry.path, bytes: data.length, gitBlob, sha256: crypto.createHash('sha256').update(data).digest('hex') });
    }
  }));
  receipts.sort((a,b) => a.path.localeCompare(b.path));
  const manifest = { schema:'seabridge.ponytail.source.v1',repository:'https://github.com/DietrichGebert/ponytail',revision,license:'LICENSE',sourceDirectory:'integrations/company-dev-tools/sources/ponytail',files:receipts,totalBytes:receipts.reduce((n,e)=>n+e.bytes,0),upstreamScriptsExecuted:false };
  const manifestFile=path.join(here,'source-manifest.json'), next=JSON.stringify(manifest,null,2)+'\n';
  try { if ((await fs.readFile(manifestFile,'utf8')) !== next) throw Error('Preserve existing different manifest'); } catch (e) { if (e.code !== 'ENOENT') throw e; await fs.writeFile(manifestFile,next,{flag:'wx'}); }
  console.log(JSON.stringify({revision,files:files.length,bytes:manifest.totalBytes,upstreamScriptsExecuted:false}));
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await download();
