'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const crypto = require('node:crypto');
const api = require('/sandbox/references/auth-return-path.cjs');
const snapshot = JSON.parse(fs.readFileSync('/sandbox/references/snapshot.json', 'utf8'));
let state = snapshot.seed >>> 0;
let currentCase=-1;
const next = () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state; };
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
async function main() {
  const runId=process.argv[2];
  assert.match(runId||'',/^[a-f0-9]{32}$/,'Bounded execution identity required');
  const networkProbe='run-'+runId+'.example.com';
  const compiledSha256=hash(fs.readFileSync('/sandbox/references/auth-return-path.cjs'));
  assert.equal(compiledSha256,snapshot.compiledSha256,'Production snapshot identity required');
  let cases = 0;
  const rejects = ['https://outside.invalid/dashboard', '//outside.invalid/dashboard', '/\\outside.invalid/dashboard', '/dashboard-other', '/login', '/dashboard\n/x', '/dashboard\u007f/x', '/'.repeat(8193)];
  for (const value of rejects) { assert.equal(api.normalizeDashboardReturnPath(value), '/dashboard'); cases++; }
  const corpus = [];
  for (let i = 0; i < snapshot.cases; i++) {
    currentCase=i;
    const property = next().toString(16), suffix = next().toString(16);
    const value = `/dashboard/property/${property}?filter=${suffix}&filter=second#panel`;
    assert.equal(api.normalizeDashboardReturnPath(value), value);
    assert.equal(api.dashboardReturnPathFromLoginSearch(api.dashboardLoginHref(value).split('?')[1]), value);
    assert.equal(api.normalizeDashboardReturnPath(`//${property}.invalid/dashboard`), '/dashboard');
    assert.equal(api.normalizeDashboardReturnPath(`/dashboard${suffix}`), '/dashboard');
    corpus.push(value); cases += 4;
  }
  // Deliberately broken implementations must fail the independent unsafe-URL oracle.
  const unsafeIdentity = value => value;
  assert.throws(() => assert.equal(unsafeIdentity('//outside.invalid/dashboard'), '/dashboard'));
  for (const file of ['/sandbox/private/denied.txt', '/sandbox/references/auth-return-path.cjs']) {
    if (file.includes('/private/')) assert.throws(() => fs.readFileSync(file), /EACCES|EPERM/);
    else assert.throws(() => fs.appendFileSync(file, 'UNAUTHORIZED'), /EACCES|EPERM/);
  }
  const deniedNetwork = await new Promise(resolve => {
    const request = http.get('http://'+networkProbe, () => { request.destroy(); resolve(false); });
    request.setTimeout(5000, () => { request.destroy(); resolve(false); });
    request.on('error', error => resolve(['ECONNRESET','ECONNREFUSED','EACCES','EPERM'].includes(error.code)));
  });
  assert.equal(deniedNetwork, true, 'Network attempt must be denied, not merely time out');
  const receipt = { verdict: 'PASS', runId,networkProbe, seed: snapshot.seed, cases, corpusSha256: hash(corpus.join('\n')), sourceSha256: snapshot.sourceSha256,
    snapshotSha256: hash(fs.readFileSync('/sandbox/references/snapshot.json')), compiledSha256, zeroTestsAccepted: false,
    privateReadDenied: true, referenceWriteDenied: true, networkDenied: true,
    authenticatedProductProof: false, limitation: 'Actual pure production helper in an OS-restricted snapshot; no signed-in application or scientific proof.' };
  fs.writeFileSync('/sandbox/output/verification.json', JSON.stringify(receipt) + '\n');
  process.stdout.write(JSON.stringify(receipt) + '\n');
}
main().catch(error => {
  const receipt={verdict:'FAIL',seed:snapshot.seed,currentCase,sourceSha256:snapshot.sourceSha256,message:error.message};
  fs.writeFileSync('/sandbox/output/failure.json',JSON.stringify(receipt)+'\n');
  process.stderr.write(JSON.stringify(receipt)+'\n');process.exitCode=1;
});
