import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { ROOT, repositories } from '../pstack/runtime.mjs';
export { ROOT };
export const revision = '2961b52fc1fe6a5a87c7a959a79512e5c2f3ffe5'; // pragma: allowlist secret -- public upstream Git commit
const sourceRoot = path.join(ROOT, 'integrations/company-dev-tools/sources/ponytail');
export async function sourceIntegrity() {
  const manifest = JSON.parse(await fs.readFile(path.join(ROOT, 'integrations/ponytail/source-manifest.json'), 'utf8'));
  if (manifest.revision !== revision || manifest.repository !== 'https://github.com/DietrichGebert/ponytail' || !Array.isArray(manifest.files) || manifest.files.length !== 202) throw Error('Unexpected source pin');
  for (const entry of manifest.files) {
    relative(entry.path);
    const data = await fs.readFile(await inside(sourceRoot, entry.path));
    const sha256 = crypto.createHash('sha256').update(data).digest('hex');
    const gitBlob = crypto.createHash('sha1').update('blob ' + data.length + '\0').update(data).digest('hex');
    if (data.length !== entry.bytes || sha256 !== entry.sha256 || gitBlob !== entry.gitBlob) throw Error('Pinned source integrity failed: ' + entry.path);
  }
  return { verdict: 'PASS', files: manifest.files.length, bytes: manifest.totalBytes, revision, upstreamScriptsExecuted: false };
}
function relative(value) {
  if (value === '.') return value;
  if (typeof value !== 'string' || !value || path.isAbsolute(value) || /[\\:\x00-\x1f]/.test(value) || value.split('/').some(p => !p || p === '.' || p === '..' || /[. ]$/.test(p) || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(p))) throw Error('Bounded repository-relative paths required');
  return value;
}
const excluded = file => file.split('/').some(p => /^(?:\.git|node_modules|\.venv|venv|\.ecc|state|sources|upstream|vendor|graphify-out|artifacts|coverage|dist|build|\.next|\.cache)$/i.test(p))
  || /(?:^|\/)(?:\.env(?:\..*)?|secrets?(?:\..*)?|credentials?(?:\..*)?|config\.local\..*|settings\.json|mcp\.json|config\.toml)$/i.test(file);
const sourceType = file => /\.(?:py|js|mjs|cjs|ts|tsx|jsx|go|rs|java|c|cc|cpp|h|hpp|cs|rb|php|sh|ps1|sql|yaml|yml|html|css|scss|vue|svelte)$/i.test(file);
async function inside(root, file) {
  const absolute = path.join(root, file), realRoot = await fs.realpath(root);
  let walk = root;
  for (const part of file.split('/')) {
    walk = path.join(walk, part);
    const stat = await fs.lstat(walk);
    if (stat.isSymbolicLink()) throw Error('Linked paths are not scanned');
  }
  const resolved = await fs.realpath(absolute), rel = path.relative(realRoot, resolved);
  if (rel.startsWith('..') || path.isAbsolute(rel)) throw Error('Selected path escapes repository');
  return absolute;
}
export async function collectDebt(input, roots = repositories) {
  if (!input || !Object.hasOwn(roots, input.repository) || !Array.isArray(input.paths) || input.paths.length < 1 || input.paths.length > 30) throw Error('Select repository and explicit bounded paths');
  const scopes = [...new Set(input.paths.map(relative))];
  const marker = input.marker;
  if (marker !== undefined && (typeof marker !== 'string' || !/^[A-Za-z][A-Za-z0-9_-]{0,39}$/.test(marker))) throw Error('Marker must be a literal identifier');
  const root = await fs.realpath(roots[input.repository]);
  const git = args => execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', windowsHide: true, timeout: 10000, maxBuffer: 4 * 1024 * 1024 });
  const files = [...new Set(git(['ls-files', '--cached', '--others', '--exclude-standard', '-z']).split('\0').filter(Boolean))].sort();
  const selected = files.filter(file => scopes.some(s => s === '.' || file === s || file.startsWith(s + '/')));
  // Verify every named scope exists. A missing selection cannot look like clean debt.
  for (const scope of scopes) { if (scope !== '.') await inside(root, scope); }
  const ignored = new Set(git(['ls-files','--cached','--ignored','--exclude-standard','-z']).split('\0').filter(Boolean));
  const eligible = selected.filter(f => !ignored.has(f) && !excluded(f) && sourceType(f));
  if (eligible.length > 1000) throw Error('Scan exceeds file budget; select smaller paths');
  const markers = marker ? [marker] : ['shortcut', 'ponytail'];
  const pattern = new RegExp('(?:#|//|/\\*|<!--)\\s*(' + markers.join('|') + '):\\s*(.*)', 'i');
  const rows = [], started = Date.now();
  let bytes = 0, scannedFiles = 0;
  for (const file of eligible) {
    if (Date.now() - started > 15000) throw Error('Scan exceeds time budget; no complete ledger');
    const absolute = await inside(root, file), before = await fs.stat(absolute);
    if (!before.isFile()) throw Error('Non-file source encountered');
    if (before.size > 512000 || bytes + before.size > 8 * 1024 * 1024) throw Error('Scan exceeds byte budget; select smaller paths');
    const content = await fs.readFile(absolute);
    const after = await fs.stat(absolute);
    if (after.size !== before.size || after.mtimeMs !== before.mtimeMs) throw Error('Source changed during scan; retry after owner checkpoint');
    bytes += content.length;
    if (content.includes(0)) continue;
    scannedFiles++;
    const lines = content.toString('utf8').split(/\r?\n/);
    for (let index = 0; index < lines.length; index++) {
      const match = lines[index].match(pattern);
      if (!match) continue;
      const text = match[2].replace(/\s*(?:\*\/|-->)\s*$/, '').trim();
      const sensitive = /(?:secret|password|token|api[_-]?key|credential)\s*[:=]|sk-[a-zA-Z0-9_-]{12,}/i.test(text);
      rows.push({ file, line: index + 1, marker: match[1], text: sensitive ? '[redacted sensitive-looking comment]' : text.slice(0,500), truncated: text.length > 500, noTrigger: !/\b(?:when|if|until|after|above|exceeds?|upgrade|revisit|trigger)\b/i.test(text), interpretation: 'untrusted comment candidate; confirm deliberate technical deferral' });
      if (rows.length > 300 || Buffer.byteLength(JSON.stringify(rows)) > 128000) throw Error('Ledger exceeds output budget; select smaller paths');
    }
  }
  return { schema: 'seabridge.ponytail.debt.v1', repository: input.repository, paths: scopes, head: git(['rev-parse','HEAD']).trim(), complete: true, scannedFiles, bytes, excludedFiles: selected.length - eligible.length, rows, markerCount: rows.length, withoutTrigger: rows.filter(r => r.noTrigger).length, writes: 0, providerCalls: 0, limitation: 'Comment candidates only; no inferred savings or model review. Empty selected source coverage is not proof that the repository has no debt.' };
}
