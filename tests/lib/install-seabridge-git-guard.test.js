'use strict';
const fs = require('node:fs'), path = require('node:path'), os = require('node:os'), crypto = require('node:crypto');
const assert = require('node:assert/strict');
const {test} = require('node:test');
const {spawnSync} = require('node:child_process');
const {install} = require('../../scripts/install-seabridge-git-guard');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-guard-install-'));
  const hooksDir = path.join(root, 'hooks'), source = path.join(root, 'source.js');
  fs.mkdirSync(hooksDir);
  const before = '// reviewed previous loader\n';
  const bytes = fs.readFileSync(path.resolve(__dirname, '../../scripts/hooks/seabridge-git-guard.js'));
  fs.writeFileSync(source, bytes); fs.writeFileSync(path.join(hooksDir, 'git-guard.js'), before);
  return {root, source, hooksDir, before, options: {source, hooksDir, expectedSha256: sha(bytes), expectedLoaderSha256: sha(before)}};
}
function run(f, command) {
  const result = spawnSync(process.execPath, [path.join(f.hooksDir, 'git-guard.js')], {encoding:'utf8', windowsHide:true,
    input: JSON.stringify({tool_name:'Bash', cwd:f.root, tool_input:{command}})});
  assert.equal(result.status, 0, result.stderr);
  return result.stdout ? JSON.parse(result.stdout).hookSpecificOutput.permissionDecision : 'allow';
}
test('installed guard survives development edits/removal and retains rollback without widening permissions', () => {
  const f = fixture();
  try {
    const receipt = install(f.options);
    assert.equal(fs.readFileSync(receipt.previousLoader, 'utf8'), f.before);
    assert.equal(receipt.settingsChanged, false); assert.equal(receipt.trustChanged, false);
    fs.writeFileSync(f.source, 'throw Error("development draft");');
    assert.equal(run(f, 'git status --short'), 'allow');
    assert.equal(run(f, 'git push --force'), 'deny');
    fs.unlinkSync(f.source);
    assert.equal(run(f, 'git commit --no-verify -m fixture'), 'deny');
    fs.chmodSync(receipt.snapshot, 0o600);
    fs.writeFileSync(receipt.snapshot, 'tampered');
    assert.equal(run(f, 'git status --short'), 'deny');
  } finally {fs.rmSync(f.root, {recursive:true, force:true});}
});
test('wrong pins and concurrent installation preserve existing loader', () => {
  const f = fixture();
  try {
    assert.throws(() => install({...f.options, expectedSha256:'0'.repeat(64)}), /source changed/);
    assert.throws(() => install({...f.options, expectedLoaderSha256:'0'.repeat(64)}), /loader changed/);
    fs.writeFileSync(path.join(f.hooksDir, '.git-guard-install.lock'), 'other installer');
    assert.throws(() => install(f.options), /EEXIST/);
    assert.equal(fs.readFileSync(path.join(f.hooksDir, 'git-guard.js'), 'utf8'), f.before);
  } finally {fs.rmSync(f.root, {recursive:true, force:true});}
});
test('linked installation destinations are refused without changing their targets', () => {
  const f = fixture();
  try {
    fs.mkdirSync(path.join(f.root, 'outside'));
    fs.symlinkSync(path.join(f.root, 'outside'), path.join(f.hooksDir, 'verified-git-guard'), process.platform==='win32'?'junction':'dir');
    assert.throws(() => install(f.options), /Linked/);
    assert.equal(fs.readFileSync(path.join(f.hooksDir, 'git-guard.js'), 'utf8'), f.before);
    assert.deepEqual(fs.readdirSync(path.join(f.root, 'outside')), []);
  } finally {fs.rmSync(f.root, {recursive:true, force:true});}
});
