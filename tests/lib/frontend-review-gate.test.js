'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const { execFileSync } = require('node:child_process');
const zlib = require('node:zlib');
const gate = require('../../scripts/lib/frontend-review-gate');
const { execute } = require('../../scripts/lib/session-coordination');
function fixture() {
  const head = 'a'.repeat(40), base = 'b'.repeat(40), root = path.resolve('fixture-front');
  const context = { root, head, base, files: { 'src/components/Page.tsx': 'c'.repeat(64) }, now: Date.parse('2026-10-16T12:30:00Z') };
  const capture = (phase, width, height) => ({ path: `D:/SeaBridgeAI-data/browser-evidence/${phase}-${width}.png`, sha256: 'd'.repeat(64), width, height });
  const phase = name => ({ authenticity: 'actual-browser', renderedRoute: '/dashboard/risk', sourceCommit: name === 'before' ? base : head,
    runtime: { apiOrigin: 'http://localhost:8000', backendIdentity: 'synthetic-test-runtime', tenantBoundaryVerified: true },
    status: 200, authenticated: true, capturedAt: '2026-10-16T12:00:00Z', images: [capture(name,1280,900), capture(name,390,844)] });
  const record = { schema: 'ecc.frontend-review.v1', repository: { root, head, base, files: context.files }, views: [{ route: '/dashboard/risk', state: 'default', requiresAuth: true,
    before: phase('before'), after: phase('after'), ownerVisible: { origin: 'http://localhost:3000', method: 'signed-in', observedAt: '2026-10-16T12:15:00Z' } }] };
  sign(record);
  return { record, context };
}
function sign(record) {
  delete record.review;
  record.review = { workflow: 'sea-frontend-ux-reviewer', verdict: 'PASS', reviewer: 'bounded-reviewer', inventoryComplete: true,
    reviewedAt: '2026-10-16T12:20:00Z', payloadSha256: gate.hash(JSON.stringify(record)) };
}
test('visual review requires before/after, both exact viewports and candidate-bound reviewer PASS', () => {
  const { record, context } = fixture();
  assert.equal(gate.validateRecord(record,context).length,4);
  for (const mutate of [r=>delete r.views[0].before,r=>r.views[0].after.images.pop(),r=>r.views[0].after.images[0].width=1440,
    r=>r.views[0].after.authenticated=false,r=>r.views[0].requiresAuth=false,r=>r.views[0].ownerVisible.method='local-preview',r=>r.views[0].after.renderedRoute='/login',
    r=>r.repository.head='e'.repeat(40),r=>r.repository.files={},r=>r.views[0].after.authenticity='fixture',r=>r.views[0].after.runtime.apiOrigin='http://localhost:8013',
    r=>r.views[0].ownerVisible.observedAt='2026-10-16T11:00:00Z',r=>r.views.push(structuredClone(r.views[0]))]) {
    const bad=structuredClone(record);mutate(bad);sign(bad);
    assert.throws(()=>gate.validateRecord(bad,context),/Frontend visual gate/);
  }
  const stale=structuredClone(record);stale.views[0].after.images[0].sha256='f'.repeat(64);
  assert.throws(()=>gate.validateRecord(stale,context),/reviewer PASS/);
  for(const verdict of ['FAIL','pending']) { const bad=structuredClone(record);bad.review.verdict=verdict;assert.throws(()=>gate.validateRecord(bad,context),/reviewer PASS/); }
});
test('UI classification covers copy/assets/config and preserves non-UI or test-only changes', () => {
  assert.deepEqual(gate.uiPaths(['src/lib/copy.ts','src/app/page.tsx','public/logo.svg','tailwind.config.ts','docs/report.md','src/app/page.test.tsx']),
    ['public/logo.svg','src/app/page.tsx','src/lib/copy.ts','tailwind.config.ts']);
});
test('runtime final forwards the review reference without relaxing evidence or native gates', () => {
  const {evidenceArgs}=require('../../scripts/goal-runtime-bridge');
  assert.deepEqual(evidenceArgs(['final','--runtime','codex','--ui-review','D:/review.json']),['--ui-review','D:/review.json']);
  const storage=require('../../scripts/lib/browser-evidence');
  assert.throws(()=>storage.coordinate('C:/scratch/review.json'),/D:/);
  assert.throws(()=>storage.coordinate('D:/SeaBridgeAI-data/browser-evidence/../elsewhere.png'),/traversal/);
});
function png(width,height) {
  const chunk=(type,data)=>{const body=Buffer.concat([Buffer.from(type),data]),size=Buffer.alloc(4),crc=Buffer.alloc(4);size.writeUInt32BE(data.length);crc.writeUInt32BE(gate.crc32(body));return Buffer.concat([size,body,crc]);};
  const hdr=Buffer.alloc(13);hdr.writeUInt32BE(width);hdr.writeUInt32BE(height,4);hdr[8]=8;hdr[9]=6;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',hdr),chunk('IDAT',zlib.deflateSync(Buffer.alloc((width*4+1)*height))),chunk('IEND',Buffer.alloc(0))]);
}
test('PNG proof checks decoded image, CRC and dimensions, not only a fabricated header', () => {
  assert.equal(gate.crc32(Buffer.from('123456789')),0xcbf43926);
  const bytes=png(390,844);
  assert.doesNotThrow(()=>gate.validatePng(bytes,390,844));
  assert.throws(()=>gate.validatePng(bytes,1280,900),/viewport/);
  assert.throws(()=>gate.validatePng(bytes.subarray(0,24),390,844),/real PNG/);
  const bad=Buffer.from(bytes);bad[45]^=1;
  assert.throws(()=>gate.validatePng(bad,390,844),/PNG/);
});
test('frontend release refuses absent render evidence while documentation remains publishable', () => {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'ecc-visual-release-'));
  const git=(...args)=>execFileSync('git',args,{cwd:root,encoding:'utf8',windowsHide:true,stdio:['ignore','pipe','pipe']}).trim();
  try {
    git('init','--initial-branch=development');git('config','user.name','ECC Fixture');git('config','user.email','fixture@example.invalid');
    fs.writeFileSync(path.join(root,'README.md'),'fixture');git('add','README.md');git('-c','core.hooksPath=','commit','-m','fixture');
    const base=git('rev-parse','HEAD');git('remote','add','origin','https://github.com/seabridge-sustainability/manageesg-frontend.git');git('update-ref','refs/remotes/origin/development',base);
    const goal={goal:{proof_profile:'frontend'},resume:{repository_state:{repo_root:root,head:base}}};
    assert.throws(()=>gate.requireGoalReview(goal),/screenshot evidence and UX-review record required/);
    git('remote','set-url','origin','https://github.com/seabridge-sustainability/manageesg-backend.git');
    assert.throws(()=>gate.requireGoalReview(goal),/current frontend repository/);
    git('remote','set-url','origin','https://github.com/example/generic-goal-fixture.git');
    assert.doesNotThrow(()=>gate.requireGoalReview(goal),'SeaBridge rules must not leak into unrelated ECC goals');
    git('remote','set-url','origin','https://github.com/SeaBridge-Sustainability/manageesg-Frontend.git');
    assert.equal(gate.isFrontend(root),true,'URL letter case must not bypass the actual frontend gate');
    git('remote','set-url','origin','https://github.com/seabridge-sustainability/manageesg-frontend.git');
    execute('register',{cwd:root,sessionId:'visual',scopes:['src','README.md'],objective:'UI proof',doneWhen:'Gate checked'});
    const budget={actionsBudgetStatus:'known',actionsBudgetUsed:10,actionsBudgetLimit:500,actionsBudgetSource:'github-org-budget-ui',actionsBudgetCheckedAt:new Date().toISOString(),actionsStopUsage:'yes',expectedActionsUsd:1,expectedWorkflows:'security-scan'};
    const release=()=>execute('release-acquire',{cwd:root,sessionId:'visual',branch:'development',candidate:git('rev-parse','HEAD'),...budget});
    assert.doesNotThrow(release);
    execute('release-end',{cwd:root,sessionId:'visual',outcome:'aborted-before-push',evidence:'Fixture only, no remote access'});
    fs.mkdirSync(path.join(root,'src'));fs.writeFileSync(path.join(root,'src/page.tsx'),'export default 1;');git('add','src');git('-c','core.hooksPath=','commit','-m','UI change');
    assert.throws(release,/screenshot evidence and UX-review record required/);
    assert.equal(execute('status',{cwd:root}).release,null);
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});
test('D-only file verifier accepts an exact synthetic record and rejects changed media/source', {skip:process.platform!=='win32'}, () => {
  const storage=require('../../scripts/lib/browser-evidence');
  const run=storage.createRun({repository:'frontend',task:'visual-gate-synthetic-test'});
  const f=fixture();
  try {
    for(const [phase,capture] of Object.entries({before:f.record.views[0].before,after:f.record.views[0].after})) {
      for(const image of capture.images) {
        image.path=`${run.directory}/media/${phase}-${image.width}.png`;
        const bytes=png(image.width,image.height);image.sha256=gate.hash(bytes);fs.writeFileSync(image.path,bytes,{flag:'wx'});
      }
    }
    sign(f.record);
    const file=`${run.directory}/reports/review.json`;fs.writeFileSync(file,JSON.stringify(f.record),{flag:'wx'});
    assert.equal(gate.readReview(file,f.context).screenshots,4);
    const image=f.record.views[0].after.images[0];fs.appendFileSync(image.path,'changed');
    assert.throws(()=>gate.readReview(file,f.context),/changed after review/);
    assert.throws(()=>gate.readReview(file,{...f.context,head:'f'.repeat(40)}),/stale or incomplete/);
  } finally {
    storage.evidencePath(run.directory);
    fs.rmSync(run.directory,{recursive:true});
  }
});
