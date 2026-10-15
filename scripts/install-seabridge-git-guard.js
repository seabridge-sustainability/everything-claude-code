#!/usr/bin/env node
'use strict';
// Explicit installation only. Does not edit settings, permissions or trust.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const {writeFileAtomic} = require('./lib/atomic-write');
const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
function regularPath(file) {
  let current = path.resolve(file);
  for (;;) {
    if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) throw Error('Linked installation path refused');
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
}
function loaderText(sha) {
  return `#!/usr/bin/env node
'use strict';
// Installed immutable snapshot; normal host permissions remain authoritative.
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
const source = path.join(__dirname, 'verified-git-guard', '${sha}.cjs');
function load() {
  if (crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex') !== '${sha}') throw Error('Installed Git guard integrity mismatch; reviewed reinstall required.');
  return require(source);
}
function deny() { return {hookSpecificOutput: {hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: 'Installed Git guard unavailable; reviewed reinstall required.'}}; }
if (require.main === module) {
  let raw = ''; process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => { raw += chunk; });
  process.stdin.on('end', () => { let result; try { result = load().run(raw); } catch (_) { result = deny(); } if (result) process.stdout.write(JSON.stringify(result)); });
} else module.exports = load();
`;
}
function install({source, hooksDir, expectedSha256, expectedLoaderSha256}) {
  if (!/^[a-f0-9]{64}$/.test(expectedSha256 || '') || !/^[a-f0-9]{64}$/.test(expectedLoaderSha256 || '')) throw Error('Reviewed source and existing loader SHA256 required');
  source = path.resolve(source); hooksDir = path.resolve(hooksDir);
  regularPath(source); regularPath(hooksDir);
  if (!fs.statSync(source).isFile() || !fs.statSync(hooksDir).isDirectory()) throw Error('Existing source file and hooks directory required');
  const bytes = fs.readFileSync(source);
  if (digest(bytes) !== expectedSha256) throw Error('Reviewed source changed');
  const loader = path.join(hooksDir, 'git-guard.js'), store = path.join(hooksDir, 'verified-git-guard');
  const lock = path.join(hooksDir, '.git-guard-install.lock');
  regularPath(loader); regularPath(store); regularPath(lock);
  const fd = fs.openSync(lock, 'wx', 0o600);
  try {
    const before = fs.readFileSync(loader);
    if (digest(before) !== expectedLoaderSha256) throw Error('Existing loader changed; preserve and review it');
    fs.mkdirSync(store, {recursive: true});
    const snapshot = path.join(store, expectedSha256 + '.cjs');
    const backup = path.join(store, 'loader-' + expectedLoaderSha256 + '.cjs');
    function retain(file, content) {
      regularPath(file);
      if (fs.existsSync(file)) {
        if (!fs.readFileSync(file).equals(content)) throw Error('Immutable installation file differs');
      } else {
        const out = fs.openSync(file, 'wx', 0o400);
        try { fs.writeFileSync(out, content); fs.fsyncSync(out); } finally { fs.closeSync(out); }
      }
    }
    retain(snapshot, bytes); retain(backup, before);
    const next = loaderText(expectedSha256);
    writeFileAtomic(loader, next, {validateParent() {regularPath(hooksDir); regularPath(store); regularPath(loader);},
      beforeRename() {
        if (digest(fs.readFileSync(loader)) !== expectedLoaderSha256
            || digest(fs.readFileSync(snapshot)) !== expectedSha256) throw Error('Installation changed before atomic cutover');
      }});
    return {installed: true, snapshot, sourceSha256: expectedSha256, loaderSha256: digest(Buffer.from(next)),
      previousLoader: backup, previousLoaderSha256: expectedLoaderSha256,
      settingsChanged: false, trustChanged: false, permissionGranted: false};
  } finally { fs.closeSync(fd); fs.unlinkSync(lock); }
}
if (require.main === module) {
  try {
    const args = process.argv.slice(2), flags = new Set(['--source', '--hooks-dir', '--expected-sha256', '--expected-loader-sha256']);
    const values = {};
    for (let i = 0; i < args.length; i += 2) {
      if (!flags.has(args[i]) || !args[i+1] || args[i+1].startsWith('--') || values[args[i]]) throw Error('Explicit unique installer arguments required');
      values[args[i]] = args[i+1];
    }
    console.log(JSON.stringify(install({source: values['--source'] || path.join(__dirname, 'hooks/seabridge-git-guard.js'),
      hooksDir: values['--hooks-dir'] || path.join(os.homedir(), '.claude/hooks'),
      expectedSha256: values['--expected-sha256'], expectedLoaderSha256: values['--expected-loader-sha256']})));
  } catch (_) { console.error('Git guard installation refused; previous loader retained. Inspect reviewed paths and hashes.'); process.exitCode = 1; }
}
module.exports = {install, loaderText};
