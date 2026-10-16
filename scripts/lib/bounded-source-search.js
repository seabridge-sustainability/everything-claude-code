'use strict';

// Trusted, literal, metadata-only source locator. No shell/regex executor,
// detached child, raw matching lines, provider or filesystem writes.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const LIMITS = Object.freeze({ entries: 2048, files: 256, fileBytes: 262144, totalBytes: 4194304, hits: 100, outputBytes: 16384, milliseconds: 2000, depth: 8 });
const OMIT = new Set(['node_modules', '.git', '.ecc', '.next', '.cache', 'venv', '.venv', 'artifacts', 'data', 'private', 'fixtures', 'dist', 'build', 'graphify-out', '__pycache__']);
const EXTENSIONS = new Set(['.js', '.cjs', '.mjs', '.ts', '.tsx', '.py', '.md', '.json']);
function sourceSearch({ repo, roots, query }, { clock = Date.now } = {}) {
  if (typeof repo !== 'string' || !path.isAbsolute(repo) || !Array.isArray(roots) || !roots.length || roots.length > 16
      || typeof query !== 'string' || !query.length || query.length > 128 || /[\r\n\0]/.test(query)) throw Error('bounded literal source search required');
  const canonical = value => process.platform === 'win32' ? value.toLowerCase() : value;
  const root = fs.realpathSync(repo);
  if (canonical(root) !== canonical(path.resolve(repo))) throw Error('linked search root refused');
  let entries = 0, files = 0, bytes = 0, hitBytes = 0, truncated = false, outputFull = false;
  const started = clock(), hits = [], visited = new Set();
  const bounded = () => {
    if (outputFull || entries >= LIMITS.entries || files >= LIMITS.files || bytes >= LIMITS.totalBytes || hits.length >= LIMITS.hits || clock() - started >= LIMITS.milliseconds) {
      truncated = true; return false;
    }
    return true;
  };
  const valid = relative => {
    if (typeof relative !== 'string' || !relative || path.isAbsolute(relative) || /[:\\\0]/.test(relative)
        || relative.split('/').some(part => !part || part === '.' || part === '..' || /[. ]$/.test(part))) throw Error('exact relative search roots required');
    const parts = relative.split('/');
    if (parts.some(part => OMIT.has(part.toLowerCase()) || part.startsWith('.'))) throw Error('generated or private search root refused');
    let current = root;
    for (const part of parts) { current = path.join(current, part); if (fs.lstatSync(current).isSymbolicLink()) throw Error('linked search path refused'); }
    return current;
  };
  function visit(file, depth) {
    const stat = fs.lstatSync(file);
    if (stat.isSymbolicLink()) return;
    if (stat.isDirectory()) {
      if (depth >= LIMITS.depth) { truncated = true; return; }
      // opendir avoids materializing an unbounded directory listing.
      const dir = fs.opendirSync(file);
      try {
        let item;
        while (bounded() && (item = dir.readSync())) {
          // Charge every enumerated entry, including hidden/excluded names.
          entries++;
          if (!item.name.startsWith('.') && !OMIT.has(item.name.toLowerCase())) visit(path.join(file, item.name), depth + 1);
        }
      } finally { dir.closeSync(); }
      return;
    }
    if (!stat.isFile() || stat.nlink !== 1 || stat.size > LIMITS.fileBytes || !EXTENSIONS.has(path.extname(file).toLowerCase())) return;
    const relative = path.relative(root, file).split(path.sep).join('/');
    if (visited.has(relative)) return;
    visited.add(relative);
    if (bytes + stat.size > LIMITS.totalBytes) { truncated = true; return; }
    const fd = fs.openSync(file, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW || 0));
    let content;
    try {
      const opened = fs.fstatSync(fd);
      if (opened.ino !== stat.ino || opened.dev !== stat.dev || opened.size !== stat.size || opened.nlink !== 1) throw Error('source changed during search');
      const buffer = Buffer.alloc(stat.size + 1); let length = 0, count;
      while (length < buffer.length && (count = fs.readSync(fd, buffer, length, buffer.length - length, null))) length += count;
      const after = fs.fstatSync(fd), current = fs.lstatSync(file);
      if (length !== stat.size || after.mtimeMs !== stat.mtimeMs || after.size !== stat.size || current.ino !== stat.ino || current.dev !== stat.dev || current.isSymbolicLink()) throw Error('source changed during search');
      content = buffer.subarray(0, length);
    } finally { fs.closeSync(fd); }
    files++; bytes += content.length;
    if (content.includes(0)) return;
    let line = 0;
    for (const text of content.toString('utf8').split(/\r?\n/)) {
      line++;
      if (text.includes(query)) {
        const hit = { path: relative, line }, size = Buffer.byteLength(JSON.stringify(hit)) + 1;
        // Reserve a fixed KiB for bounded counters, digest and explanation.
        if (hitBytes + size > LIMITS.outputBytes - 1024) { outputFull = truncated = true; break; }
        hitBytes += size; hits.push(hit);
        if (hits.length === LIMITS.hits) { truncated = true; break; }
      }
    }
  }
  for (const relative of roots) { if (!bounded()) break; entries++; visit(valid(relative), 0); }
  return { version: 1, querySha256: crypto.createHash('sha256').update(query).digest('hex'), hits, files, bytes, entries, truncated,
    limitation: 'Metadata-only bounded source lookup; not a private-input sandbox. Deadline is cooperative between bounded filesystem calls.' };
}
module.exports = { sourceSearch, LIMITS };
