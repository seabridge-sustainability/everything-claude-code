/**
 * Tests for scripts/context-hub.js and scripts/lib/context-hub.js
 */

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const repoRoot = path.join(__dirname, '..', '..');
const scriptPath = path.join(repoRoot, 'scripts', 'context-hub.js');
const {
  ENTRY_DEFINITIONS,
  buildChubArgs,
  stripLeadingFrontmatter,
  syncContextHub,
} = require('../../scripts/lib/context-hub');

function test(name, fn) {
  try {
    fn();
    console.log(`  \u2713 ${name}`);
    return true;
  } catch (error) {
    console.log(`  \u2717 ${name}`);
    console.log(`    Error: ${error.message}`);
    return false;
  }
}

function createTempDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function cleanup(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
}

function runCli(args = []) {
  const originalArgv = process.argv.slice();
  const originalCwd = process.cwd();
  const originalLog = console.log;
  const originalError = console.error;
  const originalExit = process.exit;
  const stdout = [];
  const stderr = [];

  try {
    process.argv = [process.execPath, scriptPath, ...args];
    process.chdir(repoRoot);
    console.log = (...values) => stdout.push(values.join(' '));
    console.error = (...values) => stderr.push(values.join(' '));
    process.exit = code => {
      throw new Error(`process.exit:${code}`);
    };

    delete require.cache[require.resolve('../../scripts/context-hub.js')];
    require('../../scripts/context-hub.js');

    return { code: 0, stdout: stdout.join('\n'), stderr: stderr.join('\n') };
  } catch (error) {
    const message = String(error && error.message ? error.message : error);
    const exitMatch = message.match(/^process\.exit:(\d+)$/);

    return {
      code: exitMatch ? Number(exitMatch[1]) : 1,
      stdout: stdout.join('\n'),
      stderr: stderr.concat(exitMatch ? [] : [message]).join('\n'),
    };
  } finally {
    process.argv = originalArgv;
    process.chdir(originalCwd);
    console.log = originalLog;
    console.error = originalError;
    process.exit = originalExit;
    delete require.cache[require.resolve('../../scripts/context-hub.js')];
  }
}

function runTests() {
  console.log('\n=== Testing context-hub.js ===\n');

  let passed = 0;
  let failed = 0;

  if (test('strips leading frontmatter before embedding source content', () => {
    const stripped = stripLeadingFrontmatter('---\nname: demo\n---\n# Heading\nBody');
    assert.strictEqual(stripped, '# Heading\nBody');
  })) passed++; else failed++;

  if (test('buildChubArgs composes validate-only arguments with default output policy', () => {
    const args = buildChubArgs({
      repoRoot,
      contentRoot: path.join(repoRoot, 'context-hub'),
      validateOnly: true,
    });

    assert.deepStrictEqual(args.slice(0, 4), ['-y', '@aisuite/chub', 'build', path.join(repoRoot, 'context-hub')]);
    assert.ok(args.includes('--validate-only'));
    assert.ok(!args.includes('-o'));
  })) passed++; else failed++;

  if (test('syncContextHub writes all mapped entries and llms.txt to custom paths', () => {
    const tempRoot = createTempDir('ecc-context-hub-');
    const contentRoot = path.join(tempRoot, 'context-hub');
    const llmsPath = path.join(tempRoot, 'llms.txt');

    try {
      const result = syncContextHub({
        repoRoot,
        contentRoot,
        llmsPath,
      });

      assert.strictEqual(result.entries.length, ENTRY_DEFINITIONS.length, 'Should sync one output per entry definition');
      assert.ok(fs.existsSync(llmsPath), 'llms.txt should be written');
      const llms = fs.readFileSync(llmsPath, 'utf8');
      assert.ok(llms.includes('## Retrieval Order'), 'llms.txt should describe retrieval order');
      assert.ok(llms.includes('ecc/core-overview'), 'llms.txt should link to generated ECC entries');

      const overviewDoc = path.join(contentRoot, 'ecc', 'docs', 'core-overview', 'DOC.md');
      const skillDoc = path.join(contentRoot, 'ecc', 'skills', 'documentation-lookup', 'SKILL.md');
      assert.ok(fs.existsSync(overviewDoc), 'Overview doc should be generated');
      assert.ok(fs.existsSync(skillDoc), 'Documentation lookup skill should be generated');

      const overviewContent = fs.readFileSync(overviewDoc, 'utf8');
      assert.ok(overviewContent.includes('name: core-overview'), 'Generated doc should include frontmatter');
      assert.ok(overviewContent.includes('Canonical source: `README.md`'), 'Generated doc should point back to the source file');
    } finally {
      cleanup(tempRoot);
    }
  })) passed++; else failed++;

  if (test('sync CLI works with custom output paths', () => {
    const tempRoot = createTempDir('ecc-context-hub-cli-');
    const contentRoot = path.join(tempRoot, 'bundle');
    const llmsPath = path.join(tempRoot, 'generated-llms.txt');

    try {
      const result = runCli(['sync', '--content-root', contentRoot, '--llms-path', llmsPath]);
      assert.strictEqual(result.code, 0, result.stderr);
      assert.ok(result.stdout.includes('Synced'), 'CLI should report sync output');
      assert.ok(fs.existsSync(llmsPath), 'CLI should create llms.txt at the requested path');
      assert.ok(fs.existsSync(path.join(contentRoot, 'ecc', 'docs', 'core-agents', 'DOC.md')), 'CLI should generate docs into the requested content root');
    } finally {
      cleanup(tempRoot);
    }
  })) passed++; else failed++;

  console.log(`\nResults: Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
