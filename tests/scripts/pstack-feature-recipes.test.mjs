import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { verifyFeature, repositories, features } from '../../integrations/pstack/runtime.mjs';

test('configured product journeys cannot claim authenticated or scientific completion', async () => {
  for (const name of ['nature-actions', 'authenticated-property-journey', 'openaccess-property-result']) {
    const receipt = await verifyFeature(name, { persist: false });
    assert.equal(receipt.verdict, 'BLOCKED');
    assert.equal(receipt.authenticatedProductProof, false);
    assert.equal(receipt.providerCalls, 0);
    assert.equal(receipt.appInstancesStarted, 0);
    assert.equal(receipt.existingServicesStopped, 0);
    assert.ok(receipt.definition.prerequisites.length);
  }
});

test('caller cannot substitute arbitrary commands, paths or feature names', async () => {
  for (const name of ['../../other', 'backend-auth-contract;whoami', { executable: 'powershell' }]) {
    await assert.rejects(verifyFeature(name, { persist: false }), /allowlisted/);
  }
});

test('actual existing frontend return-path harness yields bounded regression evidence', async t => {
  if (!fs.existsSync(path.join(repositories.frontend, 'node_modules/vitest/vitest.mjs'))) {
    t.skip('Existing SeaBridge frontend/Vitest runtime unavailable; authenticated and regression proof remain unverified.');
    return;
  }
  const receipt = await verifyFeature('frontend-auth-return-path', { persist: false });
  assert.equal(receipt.verdict, 'PASS', receipt.reason);
  assert.equal(receipt.result.exitCode, 0);
  assert.deepEqual(receipt.sourceBefore, receipt.sourceAfter);
  assert.ok(receipt.result.outputBytes > 0 && receipt.result.outputBytes <= 256000);
  assert.equal(receipt.authenticatedProductProof, false);
  assert.match(receipt.reason, /does not establish Cognito/);
});

test('declared climate presentation recipe is executable without admitting product/scientific completion', async t => {
  const manifest=JSON.parse(fs.readFileSync(path.join(repositories.ecc,'manifests/feature-ownership.json'),'utf8'));
  assert.ok(manifest.features.find(f=>f.id==='risk-management').recipe_ids.includes('climate-ui-source-contract'));
  const definition=features['climate-ui-source-contract'];
  assert.equal(definition.repository,'frontend'); assert.equal(definition.completionProof,false);
  assert.equal(definition.executable,'node');
  assert.deepEqual(definition.args,['node_modules/vitest/vitest.mjs','run','src/lib/utils/risk-presentation.test.ts',
    'src/components/views/risk-management/climate-risk/OpenAccessMethodsLimitations.test.tsx','--maxWorkers=1']);
  assert.ok(!definition.args.some(arg=>/browser|native-layout|install|login|provider/i.test(arg)));
  if (!fs.existsSync(path.join(repositories.frontend,'node_modules/vitest/vitest.mjs'))) {
    t.skip('Existing frontend/Vitest missing; source-contract execution unverified.');return;
  }
  const receipt=await verifyFeature('climate-ui-source-contract',{persist:false});
  assert.equal(receipt.verdict,'PASS',receipt.reason);
  assert.equal(receipt.result.exitCode,0);assert.equal(receipt.result.testAdmission.admitted,true);
  assert.deepEqual(receipt.sourceBefore,receipt.sourceAfter);
  assert.ok(receipt.sourceBefore.files.every(file=>/^[a-f0-9]{64}$/.test(file.sha256)));
  assert.ok(receipt.result.outputBytes>0&&receipt.result.outputBytes<=256000);
  assert.equal(receipt.authenticatedProductProof,false);assert.equal(receipt.providerCalls,0);
  assert.equal(receipt.appInstancesStarted,0);assert.equal(receipt.existingServicesStopped,0);
  assert.match(receipt.reason,/does not prove signed-in/);
});
