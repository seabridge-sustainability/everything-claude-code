'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const os = require('node:os');
const fs = require('node:fs');
const storage = require('../../scripts/lib/browser-evidence');
test('media coordinates reject non-D drives, aliases and traversal before IO', () => {
  for (const value of ['C:/tmp/video.webm','E:/video.webm','D:/elsewhere/a.png','D:/SeaBridgeAI-data/agent-evidence/playwright/../a.png','D:/SeaBridgeAI-data/agent-evidence/playwright/a.:x','//server/share/a.png','D:/SeaBridgeAI-data/agent-evidence/playwright-other/a.png']) assert.throws(()=>storage.coordinate(value), /D-only browser evidence/);
  assert.equal(storage.coordinate(storage.policy.root+'/frontend/task/run/image.png'), storage.policy.root+'/frontend/task/run/image.png');
});
const dAvailable = process.platform === 'win32' && fs.existsSync('D:/SeaBridgeAI-data');
test('actual D preflight pins volume identity and media stays inside one run', { skip: !dAvailable && 'Admitted D: unavailable; storage proof unverified' }, () => {
  const run = storage.createRun({ repository:'ecc', task:'unit-storage' }); process.env.ECC_BROWSER_EVIDENCE_RUN_ROOT=run.directory;
  assert.equal(storage.disk().device,storage.policy.volumeDevice);
  assert.ok(storage.mediaPath('test/image.png').startsWith(run.directory+'/media/'));
  assert.throws(()=>storage.mediaPath(storage.policy.root+'/another/task/run/file.png'), /another run/);
  assert.throws(()=>storage.mediaPath('C:/test.png'), /admitted D/);
  assert.throws(()=>storage.mediaPath('../test.png'), /invalid relative/);
  const config=storage.configurePlaywright();
  assert.equal(config.use.video,'on'); assert.equal(config.use.trace,'on');
  assert.ok(config.outputDir.startsWith('D:/'));
  assert.ok(config.reporter[1][1].outputFolder.startsWith('D:/'));
  assert.ok(process.env.TEMP.startsWith('D:/')); delete process.env.ECC_BROWSER_EVIDENCE_RUN_ROOT;
});
test('managed screenshot refusal prevents the capture callback; video/profile/trace paths are guarded', { skip: !dAvailable && 'Admitted D: unavailable' }, async () => {
  let captures=0, launches=0; const seen=[];
  const page={screenshot:async opts=>{captures++;seen.push(opts.path);return Buffer.from('fixture');},locator(){return {screenshot:async opts=>{captures++;seen.push(opts.path);}};},video(){return {saveAs:async file=>seen.push(file)};}};
  const context={newPage:async()=>page,pages:()=>[],on(){},tracing:{stop:async opts=>seen.push(opts.path)}};
  const browser={newContext:async opts=>{seen.push(opts.recordVideo.dir);return context;},newPage:async()=>page};
  const types={chromium:{launch:async()=>{launches++;return browser;},launchPersistentContext:async()=>context}};
  const memory=os.freemem; const previous=process.env.ECC_BROWSER_EVIDENCE_RUN_ROOT;
  try {
    const run=storage.createRun({repository:'ecc',task:'unit-methods'});process.env.ECC_BROWSER_EVIDENCE_RUN_ROOT=run.directory;
    storage.installPlaywrightGuards(types);
    os.freemem=()=>1024; await assert.rejects(types.chromium.launch(),/headroom/);assert.equal(launches,0);
    os.freemem=()=>3*1024**3; const b=await types.chromium.launch(); const c=await b.newContext(); const p=await c.newPage();
    assert.throws(()=>p.screenshot({path:'C:/bad.png'}),/admitted D/); assert.equal(captures,0);
    await p.screenshot({path:'valid.png'}); await p.locator('button').screenshot({path:'element.png'});
    assert.throws(()=>c.tracing.stop({path:'E:/trace.zip'}),/admitted D/);
    await c.tracing.stop({path:'valid.zip'});
    assert.throws(()=>p.video().saveAs('C:/video.webm'),/admitted D/);
    assert.ok(seen.every(file=>file.startsWith(run.directory+'/'))); assert.equal(captures,2);
  } finally {os.freemem=memory;if(previous)process.env.ECC_BROWSER_EVIDENCE_RUN_ROOT=previous;else delete process.env.ECC_BROWSER_EVIDENCE_RUN_ROOT;}
});
