'use strict';

// Shared completion/publication evidence check, not a screenshot collector or
// an aesthetic judge. The named UX reviewer still owns the visual judgement.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const { execFileSync } = require('node:child_process');
const storage = require('./browser-evidence');
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const demand = (ok, reason) => { if (!ok) throw Error('Frontend visual gate: ' + reason); };
const git = (root, args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const normalized = value => process.platform === 'win32' ? path.resolve(value).toLowerCase() : path.resolve(value);
function productRepository(root) {
  const urls = git(root, ['remote', '-v']);
  const match = /(?:[:/])seabridge-sustainability\/manageesg-(frontend|backend)(?:\.git)?(?:\s|$)/i.exec(urls);
  return match ? match[1].toLowerCase() : null;
}
function isFrontend(root) { return productRepository(root) === 'frontend'; }
function uiPaths(paths) {
  return [...new Set(paths.filter(p => /^(?:src\/|public\/|(?:tailwind|next)\.config\.|package\.json$)/.test(p)
    && !/(?:\.(?:test|spec)\.|(?:^|\/)(?:__tests__|__mocks__)\/)/.test(p)))].sort();
}
function sourceFiles(root, paths) {
  return Object.fromEntries([...new Set(paths)].sort().map(relative => {
    demand(typeof relative === 'string' && !/[:\\]/.test(relative) && !relative.startsWith('/')
      && relative.split('/').every(p => p && p !== '.' && p !== '..'), 'exact relative source path required');
    let cursor = root;
    for (const part of relative.split('/')) {
      cursor = path.join(cursor, part);
      demand(!fs.existsSync(cursor) || !fs.lstatSync(cursor).isSymbolicLink(), 'linked source refused');
    }
    return [relative, fs.existsSync(cursor) ? hash(fs.readFileSync(cursor)) : null];
  }));
}
function changes(root) {
  let base;
  try { base = git(root, ['merge-base', 'HEAD', 'refs/remotes/origin/development']); }
  catch { throw Error('Frontend visual gate: fetched development baseline required'); }
  const paths = [git(root, ['diff', '--name-only', '--no-renames', base, '--']),
    git(root, ['ls-files', '--others', '--exclude-standard'])].flatMap(s => s.split('\n').filter(Boolean));
  return { base, paths: uiPaths(paths) };
}
function time(value, now) { return typeof value === 'string' && Number.isFinite(Date.parse(value)) && Date.parse(value) <= now; }
function validateRecord(record, context) {
  const { root, head, base, files, now = Date.now() } = context;
  demand(record?.schema === 'ecc.frontend-review.v1', 'review record required');
  demand(typeof record.repository?.root === 'string' && normalized(record.repository.root) === normalized(root)
    && record.repository.head === head && record.repository.base === base
    && same(record.repository.files, files), 'candidate/source inventory is stale or incomplete');
  const { review, ...payload } = record;
  demand(review?.workflow === 'sea-frontend-ux-reviewer' && review.verdict === 'PASS'
    && typeof review.reviewer === 'string' && review.reviewer.trim()
    && time(review.reviewedAt, now) && review.payloadSha256 === hash(JSON.stringify(payload))
    && review.inventoryComplete === true, 'source/image-bound UX reviewer PASS required');
  demand(Array.isArray(record.views) && record.views.length > 0 && record.views.length <= 80, 'affected route/state inventory required');
  const covered = new Set(), images = [];
  for (const view of record.views) {
    demand(typeof view.route === 'string' && /^\/(?!\/)/.test(view.route) && view.route.length <= 300
      && typeof view.state === 'string' && view.state.trim() && typeof view.requiresAuth === 'boolean', 'exact affected route/state/auth classification required');
    const url = new URL(view.route, 'http://localhost:3000');
    demand(url.origin === 'http://localhost:3000' && !url.hash && !url.username && !url.password
      && !/\/(?:login|sign-in|signin)(?:\/|$)/i.test(url.pathname), 'login/wrong-origin render is not affected-view proof');
    demand(!/^\/dashboard(?:\/|$)/.test(url.pathname) || view.requiresAuth === true, 'dashboard views require signed-in proof');
    const key = JSON.stringify([view.route, view.state]);
    demand(!covered.has(key), 'duplicate affected view'); covered.add(key);
    for (const phase of ['before', 'after']) {
      const capture = view[phase];
      demand(capture?.authenticity === 'actual-browser' && capture.renderedRoute === view.route
        && capture.sourceCommit === (phase === 'before' ? base : head)
        && capture.status >= 200 && capture.status < 300 && time(capture.capturedAt, now)
        && Date.parse(capture.capturedAt) <= Date.parse(review.reviewedAt)
        && (!view.requiresAuth || capture.authenticated === true), 'actual affected view, source, auth and capture time required');
      demand(capture.runtime?.apiOrigin === 'http://localhost:8000'
        && typeof capture.runtime.backendIdentity === 'string' && capture.runtime.backendIdentity.trim()
        && capture.runtime.tenantBoundaryVerified === true, 'reviewed actual backend target/identity and tenant boundary required');
      demand(Array.isArray(capture.images) && capture.images.length === 2, 'both required viewport screenshots are mandatory');
      for (const [width, height] of [[1280, 900], [390, 844]]) {
        const matches = capture.images.filter(i => i.width === width && i.height === height);
        demand(matches.length === 1 && /^[a-f0-9]{64}$/.test(matches[0].sha256)
          && typeof matches[0].path === 'string', '1280x900 and 390x844 image bindings required');
        images.push(matches[0]);
      }
    }
    demand(view.ownerVisible?.origin === 'http://localhost:3000'
      && ['local-preview', 'signed-in'].includes(view.ownerVisible.method)
      && (!view.requiresAuth || view.ownerVisible.method === 'signed-in')
      && time(view.ownerVisible.observedAt, now)
      && Date.parse(view.ownerVisible.observedAt) >= Date.parse(view.after.capturedAt), 'owner-visible actual render required, not check-after-landing');
    demand(Date.parse(view.before.capturedAt) <= Date.parse(view.after.capturedAt), 'before evidence must precede after evidence');
  }
  demand(new Set(images.map(i => i.path.toLowerCase())).size === images.length, 'distinct capture files required');
  return images;
}
function validatePng(bytes, width, height) {
  demand(bytes.length >= 45 && bytes.length <= 6 * 1024 * 1024
    && bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])), 'bounded real PNG required');
  const data = []; let offset = 8, channels, ended = false;
  while (offset + 12 <= bytes.length) {
    const length = bytes.readUInt32BE(offset), type = bytes.toString('ascii', offset + 4, offset + 8), end = offset + 8 + length;
    demand(end + 4 <= bytes.length && crc32(bytes.subarray(offset + 4, end)) === bytes.readUInt32BE(end), 'corrupt PNG chunk');
    if (offset === 8) {
      demand(type === 'IHDR' && length === 13 && bytes.readUInt32BE(offset + 8) === width
        && bytes.readUInt32BE(offset + 12) === height && bytes[offset + 16] === 8
        && [2, 6].includes(bytes[offset + 17]) && bytes[offset + 18] === 0
        && bytes[offset + 19] === 0 && bytes[offset + 20] === 0, 'exact viewport, non-interlaced RGB/RGBA PNG required');
      channels = bytes[offset + 17] === 6 ? 4 : 3;
    } else demand(type !== 'IHDR', 'duplicate PNG header');
    if (type === 'IDAT') data.push(bytes.subarray(offset + 8, end));
    offset = end + 4;
    if (type === 'IEND') { demand(length === 0 && offset === bytes.length, 'invalid PNG ending'); ended = true; break; }
  }
  demand(ended && data.length, 'complete PNG image data required');
  const stride = width * channels + 1, expected = stride * height;
  const raw = zlib.inflateSync(Buffer.concat(data), { maxOutputLength: expected });
  demand(raw.length === expected, 'PNG scanline length mismatch');
  for (let row = 0; row < height; row++) demand(raw[row * stride] <= 4, 'invalid PNG filter');
}
// Node 18/20 remain supported; zlib.crc32 only exists in newer runtimes.
function crc32(bytes) {
  if (zlib.crc32) return zlib.crc32(bytes);
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function readReview(file, context) {
  demand(file, 'D: screenshot evidence and UX-review record required before UI completion/release');
  storage.evidencePath(file);
  const stat = fs.lstatSync(file);
  demand(stat.isFile() && !stat.isSymbolicLink() && stat.size <= 512000, 'bounded regular D: review required');
  const bytes = fs.readFileSync(file), record = JSON.parse(bytes);
  const images = validateRecord(record, context);
  for (const image of images) {
    storage.evidencePath(image.path);
    const imageStat = fs.lstatSync(image.path);
    demand(imageStat.isFile() && !imageStat.isSymbolicLink() && imageStat.size <= 6 * 1024 * 1024, 'bounded regular D: screenshot required');
    const imageBytes = fs.readFileSync(image.path);
    demand(hash(imageBytes) === image.sha256, 'screenshot changed after review');
    validatePng(imageBytes, image.width, image.height);
  }
  return { file, sha256: hash(bytes), views: record.views.length, screenshots: images.length,
    limitation: 'Validated evidence bindings and image bytes; UX judgement and capture authenticity remain the named reviewer/capture workflow responsibility, not native harness interception proof.' };
}
function requireReview({ root, paths, base, head, file, required = false }) {
  if (!isFrontend(root)) return null;
  const affected = uiPaths(paths);
  if (!affected.length && !required) return null;
  demand(base && head, 'exact baseline and candidate required');
  return readReview(file, { root, head, base, files: sourceFiles(root, affected) });
}
function requireGoalReview(bundle, file) {
  const states = bundle.resume?.repository_states || (bundle.resume ? [bundle.resume.repository_state] : []);
  let frontendSeen = false, productSeen = false;
  for (const state of states) {
    const kind = productRepository(state.repo_root);
    if (kind) productSeen = true;
    if (kind !== 'frontend') continue;
    frontendSeen = true;
    const delta = changes(state.repo_root);
    requireReview({ root: state.repo_root, paths: delta.paths, base: delta.base,
      head: state.head, file, required: bundle.goal.proof_profile === 'frontend' });
  }
  // The central SeaBridge policy does not apply to unrelated ECC consumers or
  // generic goal fixtures. Real SeaBridge frontend claims cannot omit their repo.
  if (productSeen && bundle.goal.proof_profile === 'frontend' && !frontendSeen) {
    throw Error('Frontend visual gate: current frontend repository and rendered review required');
  }
}
module.exports = { isFrontend, uiPaths, sourceFiles, changes, validateRecord, validatePng, readReview, requireReview, requireGoalReview, hash, crc32 };
