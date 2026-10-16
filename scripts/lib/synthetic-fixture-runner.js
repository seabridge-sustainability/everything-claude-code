'use strict';

// Closed deterministic operation, not an arbitrary worker/script/plugin host.
// It never starts an agent or accepts stdin, environment, code, MCP or prompts.
const { verifySyntheticArtifacts, verifySyntheticReceipt } = require('./coding-execution');
const { canonicalJson } = require('./goal-store');
const CHECKS = new Set(['fixture-integrity', 'output-contract']);
function verifyFixtures(worker) {
  if (!worker.data_policy) throw Error('reviewed synthetic fixture policy required');
  verifySyntheticArtifacts(worker);
  const { data_policy: policy } = worker;
  if (policy.outputs.some(output => output.checks.some(id => !CHECKS.has(id)))) throw Error('deterministic runner cannot attest an unexecuted check');
  const receipts = policy.outputs.map(output => {
    const value = { schema: 'ecc.synthetic-verification.v1', fixture_sha256: policy.fixture.sha256,
      checks: output.checks.map(id => ({ id, passed: true, count: 1 })) };
    const text = canonicalJson(value);
    verifySyntheticReceipt(policy, output, text);
    return { path: output.path, receipt: value };
  });
  // Check again at the export boundary. Return only fixed schema metadata;
  // fixture bytes never enter prompts, transcripts, stdout or scratchpads.
  verifySyntheticArtifacts(worker);
  return { version: 1, receipts, nativeClientStarted: false, modelCalls: 0,
    limitation: 'Fixture integrity and output contract only. No native model-tool or OS/transcript containment claim.' };
}
module.exports = { verifyFixtures };
