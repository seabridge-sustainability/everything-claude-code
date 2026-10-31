#!/usr/bin/env node
/**
 * Validate safety guardrails on agent-facing instruction artifacts.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { expandImports, REQUIRED } = require('../../scripts/check-instruction-stack');

const repoRoot = path.resolve(__dirname, '..', '..');

const guardrails = [
  {
    path: '.codex/AGENTS.md',
    effective: true,
    heading: '## Safety And Authorization Rule',
    requiredPatterns: [
      /only Alejandro in the current session approves gated actions/i,
      /\b(?:commit, push, merge, branch or PR creation|commit\/push\/merge\/branch\/PR)\b/i,
      /\b(?:paid or live-provider API calls|paid\/live-provider APIs)\b/i,
      /Do not re-ask for included steps/i,
    ],
  },
  {
    path: '.kiro/skills/search-first/SKILL.md',
    heading: '## Scope and Approval Rules',
    requiredPatterns: [
      /Default to read-only research/i,
      /Do not install packages/i,
      /approval checkpoint/i,
    ],
  },
  {
    path: 'skills/autonomous-agent-harness/SKILL.md',
    heading: '## Consent and Safety Boundaries',
    requiredPatterns: [
      /explicitly requested and scoped/i,
      /Do not create schedules/i,
      /Prefer dry-run plans/i,
    ],
  },
  {
    path: 'skills/defi-amm-security/SKILL.md',
    heading: '## Execution Safety',
    requiredPatterns: [
      /local audit examples/i,
      /trusted checkout or disposable sandbox/i,
      /private keys, seed phrases/i,
    ],
  },
  {
    path: '.agents/skills/frontend-patterns/SKILL.md',
    heading: '## Privacy and Data Boundaries',
    requiredPatterns: [
      /synthetic or domain-generic data/i,
      /Do not collect, log, persist, or display/i,
      /analytics, tracking pixels/i,
    ],
  },
];

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    return true;
  } catch (error) {
    console.log(`  ✗ ${name}`);
    console.log(`    Error: ${error.message}`);
    return false;
  }
}

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function run() {
  console.log('\n=== Testing agent instruction safety guardrails ===\n');

  let passed = 0;
  let failed = 0;

  for (const guardrail of guardrails) {
    if (test(`${guardrail.path} keeps scoped safety guardrails`, () => {
      const stack = guardrail.effective ? expandImports(path.join(repoRoot, guardrail.path)) : null;
      if (stack) {
        assert.deepStrictEqual(stack.missing, [], 'all declared policy imports must resolve');
        assert.ok(stack.files.length >= 3, 'Codex must load the central entry and its system import');
        assert.strictEqual((stack.text.match(/<!-- SEABRIDGE_SAFETY_RULE_START -->/g) || []).length, 1);
        for (const invariant of REQUIRED) assert.ok(invariant.re.test(stack.text), invariant.id);
      }
      // Markdown line wrapping is not a change to the authorization rule.
      const source = (stack ? stack.text : read(guardrail.path)).replace(/\s+/g, ' ');
      assert.ok(source.includes(guardrail.heading), `${guardrail.path} missing ${guardrail.heading}`);
      for (const pattern of guardrail.requiredPatterns) {
        assert.ok(pattern.test(source), `${guardrail.path} missing ${pattern}`);
      }
    })) passed++; else failed++;
  }

  if (test('line wrapping never waives a required authorization action', () => {
    const pattern = guardrails[0].requiredPatterns[1];
    const wrapped = 'commit, push, merge,\nbranch or PR creation';
    assert.ok(pattern.test(wrapped.replace(/\s+/g, ' ')));
    assert.ok(!pattern.test(wrapped.replace('PR creation', 'unrelated action').replace(/\s+/g, ' ')));
  })) passed++; else failed++;

  if (test('published compact policy retains every scoped approval requirement', () => {
    const snapshot = require('../../docs/tools/agent-system-map.json').policySnapshot;
    const source = snapshot.find(row => row.path.endsWith('/AGENTS_SYSTEM.md')).text.replace(/\s+/g, ' ');
    for (const pattern of guardrails[0].requiredPatterns) assert.ok(pattern.test(source), `${pattern}`);
    // Remove the phrase in whichever accepted wording the published policy uses.
    for (const index of [1, 2]) {
      const pattern = guardrails[0].requiredPatterns[index];
      const removed = source.replace(new RegExp(pattern.source, 'gi'), 'unrelated action');
      assert.notStrictEqual(removed, source);
      assert.ok(!pattern.test(removed), `${pattern} must fail once the requirement is removed`);
    }
  })) passed++; else failed++;

  console.log(`\nPassed: ${passed}`);
  console.log(`Failed: ${failed}`);

  process.exit(failed > 0 ? 1 : 0);
}

run();
