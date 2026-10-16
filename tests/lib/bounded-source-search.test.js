'use strict';
const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { sourceSearch, LIMITS } = require('../../scripts/lib/bounded-source-search');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-bounded-source-'));
after(() => fs.rmSync(root, { recursive: true, force: true }));
let count = 0;
function fixture() { const repo = path.join(root, String(count++)); fs.mkdirSync(path.join(repo, 'src'), { recursive: true }); return repo; }
test('source lookup returns file/line metadata, not raw matching content or query', () => {
  const repo = fixture(); fs.writeFileSync(path.join(repo, 'src/a.js'), 'safe\nconst marker = "SYNTHETIC_PRIVATE_SENTINEL";\n');
  const result = sourceSearch({ repo, roots: ['src'], query: 'marker' });
  assert.deepEqual(result.hits, [{ path: 'src/a.js', line: 2 }]);
  assert.equal(result.files, 1); assert.equal(result.truncated, false);
  assert.ok(!JSON.stringify(result).includes('SYNTHETIC_PRIVATE_SENTINEL')); assert.ok(!JSON.stringify(result).includes('"marker"'));
});
test('source lookup excludes generated trees, binary and oversized files', () => {
  const repo = fixture(); fs.mkdirSync(path.join(repo, 'src/node_modules'));
  fs.writeFileSync(path.join(repo, 'src/node_modules/a.js'), 'needle');
  fs.writeFileSync(path.join(repo, 'src/binary.js'), Buffer.from([0, 110]));
  fs.writeFileSync(path.join(repo, 'src/large.json'), 'needle'.repeat(LIMITS.fileBytes));
  assert.deepEqual(sourceSearch({ repo, roots: ['src'], query: 'needle' }).hits, []);
});
test('source lookup caps result count and reports truncation', () => {
  const repo = fixture(); fs.writeFileSync(path.join(repo, 'src/a.py'), 'needle\n'.repeat(200));
  const result = sourceSearch({ repo, roots: ['src', 'src/a.py'], query: 'needle' });
  assert.equal(result.hits.length, LIMITS.hits); assert.equal(result.truncated, true); assert.equal(result.files, 1);
});
test('source lookup rejects traversal, hidden roots and broad glob spellings', () => {
  const repo = fixture();
  for (const relative of ['../other', '.', '/tmp', 'src/../src', '.git', 'src\\a.js', 'src/*.js']) {
    assert.throws(() => sourceSearch({ repo, roots: [relative], query: 'needle' }));
  }
});
test('source lookup never follows a hard-linked file', () => {
  const repo = fixture(); fs.writeFileSync(path.join(repo, 'source.js'), 'needle'); fs.linkSync(path.join(repo, 'source.js'), path.join(repo, 'src/link.js'));
  const result = sourceSearch({ repo, roots: ['src'], query: 'needle' }); assert.equal(result.files, 0); assert.deepEqual(result.hits, []);
});
test('source lookup is literal, bounded in bytes and cooperatively time-limited', () => {
  const repo = fixture(); fs.writeFileSync(path.join(repo, 'src/a.ts'), 'aaaa\na+a\n');
  const result = sourceSearch({ repo, roots: ['src'], query: 'a+a' }); assert.deepEqual(result.hits, [{ path: 'src/a.ts', line: 2 }]);
  let calls = 0;
  const stopped = sourceSearch({ repo, roots: ['src'], query: 'a+a' }, { clock: () => calls++ ? 3000 : 0 });
  assert.equal(stopped.files, 0); assert.equal(stopped.truncated, true); assert.ok(result.bytes <= LIMITS.totalBytes);
});

test('excluded directory entries consume the traversal limit', () => {
  const repo = fixture();
  for (let i = 0; i < LIMITS.entries + 2; i++) fs.writeFileSync(path.join(repo, 'src/.excluded-' + i), '');
  const result = sourceSearch({ repo, roots: ['src'], query: 'needle' }, { clock: () => 0 });
  assert.equal(result.entries, LIMITS.entries); assert.equal(result.truncated, true); assert.equal(result.files, 0);
});

test('long exact paths cannot exceed the UTF8 output bound', () => {
  const repo = fixture(), name = 'long-name-'.repeat(18) + '.js';
  fs.writeFileSync(path.join(repo, 'src', name), 'needle\n'.repeat(200));
  const result = sourceSearch({ repo, roots: ['src'], query: 'needle' });
  assert.ok(result.hits.length < LIMITS.hits); assert.ok(result.hits.length > 0);
  assert.ok(Buffer.byteLength(JSON.stringify(result)) <= LIMITS.outputBytes); assert.equal(result.truncated, true);
});
