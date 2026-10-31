'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const { sha256File } = require('../../scripts/lib/goal-store');

// Only Git enumeration is stubbed. The snapshot reads and hashes real file bytes.
function snapshotStore(root, files) {
  function execFileSync(command, args, options) {
    assert.equal(command, 'git');
    assert.equal(args[1], root);
    const operation = args.slice(2).join(' ');
    let result;
    if (operation === 'rev-parse --show-toplevel') result = root;
    else if (operation === 'rev-parse HEAD') result = 'a'.repeat(40);
    else if (operation === 'branch --show-current') result = 'main';
    else if (operation === 'remote get-url origin') result = 'https://example.invalid/ecc.git';
    else if (operation === 'status --porcelain=v1 -z') result = files.map(file => `?? ${file}\0`).join('');
    else if (operation === 'ls-files --others --exclude-standard -z') result = files.join('\0') + '\0';
    else if (args[2] === 'diff') return Buffer.alloc(0);
    else throw new Error(`Unexpected Git operation: ${operation}`);
    return options.encoding ? result : Buffer.from(result);
  }
  const module = { exports: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../../scripts/lib/goal-store.js'), 'utf8'), {
    module, exports: module.exports, Buffer, process,
    require: name => name === 'child_process' ? { execFileSync } : require(name),
  });
  return module.exports;
}

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-empty-source-test-'));
  t.after(() => {
    assert.equal(path.dirname(root), os.tmpdir());
    assert.ok(path.basename(root).startsWith('ecc-empty-source-test-'));
    fs.rmSync(root, { recursive: true });
  });
  return root;
}

test('repository snapshots retain empty untracked ledgers and detect their subsequent changes', t => {
  const root = fixture(t);
  const file = 'activity.jsonl';
  fs.writeFileSync(path.join(root, file), '');
  const store = snapshotStore(root, [file]);
  const first = store.captureRepositoryState(root);
  const expected = [{ path: file, sha256: store.sha256Buffer(Buffer.alloc(0)), size_bytes: 0 }];
  assert.equal(first.untracked_sha256, store.sha256Buffer(store.canonicalJson(expected)));
  fs.writeFileSync(path.join(root, file), '{"observed":true}\n');
  const next = store.captureRepositoryState(root);
  assert.notEqual(next.untracked_sha256, first.untracked_sha256);
  assert.notEqual(next.tree_fingerprint, first.tree_fingerprint);
});

test('ordinary nonempty source snapshots keep the existing byte hash and size contract', t => {
  const root = fixture(t);
  const file = 'source.js';
  const bytes = Buffer.from('module.exports = 0;\n');
  fs.writeFileSync(path.join(root, file), bytes);
  const store = snapshotStore(root, [file]);
  const state = store.captureRepositoryState(root);
  const expected = [{ path: file, sha256: store.sha256Buffer(bytes), size_bytes: bytes.length }];
  assert.equal(state.untracked_sha256, store.sha256Buffer(store.canonicalJson(expected)));
});

test('explicit empty evidence remains refused', t => {
  const root = fixture(t);
  const file = path.join(root, 'evidence.json');
  fs.writeFileSync(file, '');
  assert.throws(() => sha256File(file), /evidence file is empty/);
});
