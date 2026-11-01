/**
 * Tests for scripts/lib/install/link-rewrite.js — rewriting relative links in
 * namespaced markdown so they resolve after install (issue #2340).
 */

'use strict';

const assert = require('assert');

const {
  buildInstallIndex,
  rewriteRelativeLinks,
} = require('../../scripts/lib/install/link-rewrite');

// A claude-style namespace placement: skills/<id> -> skills/<id> and
// rules/<x> -> rules/ecc/<x>. Mirrors what the real adapter emits.
function claudeNamespaceMappings() {
  return [
    { sourceRel: 'skills/react-patterns/SKILL.md', destRel: 'skills/react-patterns/SKILL.md' },
    { sourceRel: 'skills/react-patterns/other.md', destRel: 'skills/react-patterns/other.md' },
    { sourceRel: 'skills/react-patterns/sub/NOTE.md', destRel: 'skills/react-patterns/sub/NOTE.md' },
    { sourceRel: 'rules/react/hooks.md', destRel: 'rules/ecc/react/hooks.md' },
    { sourceRel: 'rules/react/testing.md', destRel: 'rules/ecc/react/testing.md' },
    { sourceRel: 'rules/react/coding-style.md', destRel: 'rules/ecc/react/coding-style.md' },
  ];
}

// An identity placement (non-namespacing adapter): source == dest.
function identityMappings() {
  return [
    { sourceRel: 'skills/react-patterns/SKILL.md', destRel: 'skills/react-patterns/SKILL.md' },
    { sourceRel: 'rules/react/hooks.md', destRel: 'rules/react/hooks.md' },
  ];
}

function test(name, fn) {
  try {
    fn();
    console.log(`  PASS ${name}`);
    return true;
  } catch (error) {
    console.log(`  FAIL ${name}`);
    console.log(`    Error: ${error.message}`);
    // Preserve the full stack (source line + assertion diff) for diagnosis.
    console.error(error.stack || error);
    return false;
  }
}

function runTests() {
  console.log('Running install link-rewrite tests...\n');
  let passed = 0;
  let failed = 0;

  const index = buildInstallIndex(claudeNamespaceMappings());

  // Parametrize the canonical file-link case over all three affected skills so
  // a regression in any one is caught (not just the first).
  for (const skill of ['react-patterns', 'react-performance', 'react-testing']) {
    if (test(`rewrites ../../rules file link for ${skill}`, () => {
      const idx = buildInstallIndex([
        { sourceRel: `skills/${skill}/SKILL.md`, destRel: `skills/${skill}/SKILL.md` },
        { sourceRel: 'rules/react/hooks.md', destRel: 'rules/ecc/react/hooks.md' },
      ]);
      const before = 'See [rules](../../rules/react/hooks.md) for details.';
      const after = rewriteRelativeLinks(before, { sourceRel: `skills/${skill}/SKILL.md`, index: idx });
      assert.notStrictEqual(after, before, 'rewrite must change the broken link (not vacuous)');
      assert.ok(
        after.includes('](../../rules/ecc/react/hooks.md)'),
        `expected corrected link, got: ${after}`
      );
      assert.ok(!after.includes('](../../rules/react/'), 'un-namespaced rules link must be gone');
    })) passed++; else failed++;
  }

  if (test('rewrites a directory link and preserves the trailing slash', () => {
    const before = '- Rules: [rules/react/](../../rules/react/)';
    const after = rewriteRelativeLinks(before, { sourceRel: 'skills/react-patterns/SKILL.md', index });
    assert.notStrictEqual(after, before);
    assert.ok(after.includes('](../../rules/ecc/react/)'), `got: ${after}`);
  })) passed++; else failed++;

  if (test('leaves an intra-skill sibling link unchanged', () => {
    const before = 'Look at [other](./other.md) nearby.';
    const after = rewriteRelativeLinks(before, { sourceRel: 'skills/react-patterns/SKILL.md', index });
    assert.strictEqual(after, before, 'same-prefix relative path must be preserved');
  })) passed++; else failed++;

  if (test('leaves links to non-installed targets unchanged', () => {
    const before = 'See [pkg](../../package.json) at the root.';
    const after = rewriteRelativeLinks(before, { sourceRel: 'skills/react-patterns/SKILL.md', index });
    assert.strictEqual(after, before, 'never invent a path to a file the plan does not install');
  })) passed++; else failed++;

  if (test('leaves external urls, absolute paths, and anchors unchanged', () => {
    const before = [
      '[ext](https://example.com/rules/react/hooks.md)',
      '[abs](/rules/react/hooks.md)',
      '[mail](mailto:x@example.com)',
      '[anchor](#a-section)',
    ].join('\n');
    const after = rewriteRelativeLinks(before, { sourceRel: 'skills/react-patterns/SKILL.md', index });
    assert.strictEqual(after, before);
  })) passed++; else failed++;

  if (test('preserves a #fragment on a rewritten link', () => {
    const before = '[hooks](../../rules/react/hooks.md#use-effect)';
    const after = rewriteRelativeLinks(before, { sourceRel: 'skills/react-patterns/SKILL.md', index });
    assert.ok(after.includes('](../../rules/ecc/react/hooks.md#use-effect)'), `got: ${after}`);
  })) passed++; else failed++;

  if (test('does not rewrite links inside fenced code blocks', () => {
    const before = [
      '```md',
      '[code](../../rules/react/hooks.md)',
      '```',
      '[prose](../../rules/react/hooks.md)',
    ].join('\n');
    const after = rewriteRelativeLinks(before, { sourceRel: 'skills/react-patterns/SKILL.md', index });
    assert.ok(after.includes('[code](../../rules/react/hooks.md)'), 'code-fence link must be untouched');
    assert.ok(after.includes('[prose](../../rules/ecc/react/hooks.md)'), 'prose link must be rewritten');
  })) passed++; else failed++;

  if (test('computes depth from path math for a nested skill file', () => {
    // skills/react-patterns/sub/NOTE.md -> skills/react-patterns/sub/NOTE.md
    // Source link is ../../../rules/react/hooks.md (3 up from sub/).
    const before = '[r](../../../rules/react/hooks.md)';
    const after = rewriteRelativeLinks(before, { sourceRel: 'skills/react-patterns/sub/NOTE.md', index });
    assert.notStrictEqual(after, before, 'nested depth must be recomputed, not hardcoded');
    assert.ok(after.includes('](../../../rules/ecc/react/hooks.md)'), `got: ${after}`);
  })) passed++; else failed++;

  if (test('is a no-op for a non-namespacing (identity) placement', () => {
    const idx = buildInstallIndex(identityMappings());
    const before = '[r](../../rules/react/hooks.md)';
    const after = rewriteRelativeLinks(before, { sourceRel: 'skills/react-patterns/SKILL.md', index: idx });
    assert.strictEqual(after, before, 'identity placement must not touch any link');
  })) passed++; else failed++;

  if (test('is a no-op when the file itself is not in the plan', () => {
    const before = '[r](../../rules/react/hooks.md)';
    const after = rewriteRelativeLinks(before, { sourceRel: 'skills/not-installed/SKILL.md', index });
    assert.strictEqual(after, before);
  })) passed++; else failed++;

  console.log(`\nResults: Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
