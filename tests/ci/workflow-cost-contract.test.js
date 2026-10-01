'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');
const { classify } = require('../../scripts/ci/detect-ci-scope');

const root = path.resolve(__dirname, '../..');
const workflow = yaml.load(fs.readFileSync(path.join(root, '.github/workflows/ci.yml'), 'utf8'));
const jobs = workflow.jobs;

assert.equal(jobs.scope.outputs.core, '${{ steps.scope.outputs.core }}');
assert.equal(jobs.scope.outputs.reportOnly, '${{ steps.scope.outputs.reportOnly }}');
for (const name of ['test', 'validate', 'python-tests', 'lint']) {
  assert.equal(jobs[name].needs, 'scope', `${name} must wait for path classification`);
  assert.match(jobs[name].if, /needs\.scope\.outputs\.core == 'true'/);
}
assert.equal(jobs.security.if, undefined, 'security scan must still cover report-only pushes');
assert.equal(jobs.security.needs, 'scope');
const securitySteps = jobs.security.steps;
for (const name of ['Install audit dependencies', 'Run npm audit']) {
  assert.match(securitySteps.find(step => step.name === name).if, /needs\.scope\.outputs\.core == 'true'/);
}
const iocScan = securitySteps.find(step => step.name === 'Run supply-chain IOC scan');
assert.equal(iocScan.if, undefined, 'report-only pushes still receive the dependency-free IOC scan');
assert.match(iocScan.run, /node scripts\/ci\/scan-supply-chain-iocs\.js/);
assert.equal(jobs['report-only'].needs, 'scope');
assert.match(jobs['report-only'].if, /needs\.scope\.outputs\.reportOnly == 'true'/);
assert.match(jobs['report-only'].steps.map(step => step.run || '').join('\n'), /git diff --check/);
assert.equal(classify(['docs/reports/2026-10-01.md']).reportOnly, true);
assert.equal(classify(['docs/reports/2026-10-01.md', 'AGENTS.md']).core, true);
assert.equal(classify([], true).core, true, 'unknown comparison must fail safe to full CI');

console.log('ECC CI cost contract: report-only isolation and fail-safe full checks passed');
