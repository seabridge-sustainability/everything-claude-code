'use strict';

// This pins media produced by the shared Playwright/MCP workflows. It is not
// an OS fence for an unrelated capture program or an already-running browser.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const os = require('node:os');
const policy = require('../../integrations/software-factory/browser-evidence.json');
const ROOT = path.resolve(__dirname, '../..');
const TOKEN = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$/;
const fail = reason => { throw new Error('D-only browser evidence: ' + reason); };
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const PUBLIC_TOOL_HASHES={
  encoder:'d1e2a156261ecc675081943197a85f08f2868784a0af499171ede89353edad31', // pragma: allowlist secret -- public installed FFmpeg SHA-256, not a credential
  probe:'70872c3ffbc43d0b2c570f9837f54d6e9a832f4ca25463e9735b6a3ec0621478', // pragma: allowlist secret -- public installed FFprobe SHA-256, not a credential
};
function hashFile(file){const fd=fs.openSync(file,'r'),buffer=Buffer.alloc(65536),hash=crypto.createHash('sha256');try{let count;while((count=fs.readSync(fd,buffer,0,buffer.length,null)))hash.update(buffer.subarray(0,count));}finally{fs.closeSync(fd);}return hash.digest('hex');}
function pinnedTool(name){const tool=policy[name];if(!tool||!PUBLIC_TOOL_HASHES[name]||!path.isAbsolute(tool.path)||!fs.existsSync(tool.path)||!fs.lstatSync(tool.path).isFile()||fs.lstatSync(tool.path).isSymbolicLink()||hashFile(tool.path)!==PUBLIC_TOOL_HASHES[name])fail('reviewed '+name+' changed or unavailable');return tool.path;}
function installNativeEncoder(nativeRequire){
  // Scoped compatibility adapter for the installed Playwright build. No package
  // files, user settings or running clients are changed; upgrades fail closed.
  if(nativeRequire('playwright-core/package.json').version!==policy.playwrightVersion)fail('Playwright encoder adapter requires reviewed installed version');
  const executable=nativeRequire('playwright-core/lib/coreBundle').registry?.registry?.findExecutable('ffmpeg');
  if(!executable)fail('reviewed Playwright encoder registry unavailable');
  if(fs.existsSync(executable.executablePath()))return;
  const encoder=pinnedTool('encoder');
  executable.executablePath=()=>encoder;executable.executablePathOrDie=()=>pinnedTool('encoder');
}
function coordinate(value) {
  // eslint-disable-next-line no-control-regex -- Reject C0 control bytes before resolving evidence paths.
  if (typeof value !== 'string' || !value || /[\x00-\x1f]/.test(value)) fail('a bounded path is required');
  const s = value.replace(/\\/g, '/');
  if (s.length > 600 || s.startsWith('//') || s.split('/').some(p => p === '.' || p === '..' || (p && /[. ]$/.test(p)) || /^(?:con|prn|aux|nul|com[0-9]|lpt[0-9])(?:\.|$)/i.test(p)) || /:/.test(s.slice(2))) fail('ambiguous path or traversal');
  const root = policy.root.toLowerCase();
  if (!/^D:\//i.test(s) || !(s.toLowerCase() === root || s.toLowerCase().startsWith(root + '/'))) fail('media must remain in the admitted D: root');
  return s;
}
function noLinks(file) {
  let cursor = path.resolve(file);
  while (true) {
    if (fs.existsSync(cursor) && fs.lstatSync(cursor).isSymbolicLink()) fail('linked storage path');
    const parent = path.dirname(cursor); if (parent === cursor) break; cursor = parent;
  }
}
function disk() {
  if (process.platform !== 'win32') fail('the admitted D: volume is not available on this host');
  if (!fs.existsSync('D:/SeaBridgeAI-data')) fail('D: is unavailable; no fallback');
  noLinks('D:/SeaBridgeAI-data');
  if (fs.statSync('D:/').dev !== policy.volumeDevice) fail('D: volume identity changed; owner must review the new volume');
  const info = fs.statfsSync('D:/SeaBridgeAI-data');
  const freeBytes = Number(info.bavail) * Number(info.bsize);
  if (!Number.isFinite(freeBytes) || freeBytes < policy.minimumFreeBytes) fail('insufficient D: capacity; no fallback');
  return { root: policy.root, device: policy.volumeDevice, freeBytes };
}
function evidencePath(file, { createParent = false } = {}) {
  const s = coordinate(file); disk(); noLinks(s);
  if (createParent) { fs.mkdirSync(path.dirname(s), { recursive: true }); noLinks(s); }
  const parent = fs.existsSync(s) ? s : path.dirname(s);
  if (fs.existsSync(parent)) {
    const real = fs.realpathSync(parent).replace(/\\/g, '/').toLowerCase();
    if (!(real === policy.root.toLowerCase() || real.startsWith(policy.root.toLowerCase() + '/'))) fail('resolved storage path escaped D: evidence');
  }
  return s;
}
function createRun({ repository = 'frontend', task = 'verification', run } = {}) {
  for (const v of [repository, task]) if (!TOKEN.test(v)) fail('invalid repository/task identity');
  run ||= new Date().toISOString().replace(/[^0-9]/g, '') + '-' + crypto.randomBytes(5).toString('hex');
  if (!TOKEN.test(run)) fail('invalid run identity');
  const directory = `${policy.root}/${repository}/${task}/${run}`;
  disk(); noLinks(directory); fs.mkdirSync(directory, { recursive: true }); noLinks(directory);
  for (const name of ['media','videos','traces','reports','tmp','profiles','downloads']) { noLinks(`${directory}/${name}`);fs.mkdirSync(`${directory}/${name}`, { recursive: true });noLinks(`${directory}/${name}`); }
  const probe = `${directory}/.storage-probe`;
  fs.writeFileSync(probe, 'owned evidence preflight', { flag: 'wx' }); fs.unlinkSync(probe);
  return { schema: 'ecc.browser-evidence.run.v1', directory, repository, task, run, volumeDevice: policy.volumeDevice, policySha256: digest(JSON.stringify(policy)) };
}
function currentRun(options = {}) {
  const directory = process.env.ECC_BROWSER_EVIDENCE_RUN_ROOT;
  if (!directory) {
    const run = createRun(options); process.env.ECC_BROWSER_EVIDENCE_RUN_ROOT = run.directory; return run;
  }
  evidencePath(directory);
  const relative = directory.replace(/\\/g,'/').slice(policy.root.length + 1).split('/');
  if (relative.length !== 3 || relative.some(p => !TOKEN.test(p))) fail('run root requires repository/task/run identity');
  return { directory, repository: relative[0], task: relative[1], run: relative[2] };
}
function mediaPath(requested, category = 'media') {
  const run = currentRun();
  if (!['media','videos','traces','reports','profiles','downloads','tmp'].includes(category)) fail('unknown media category');
  let destination;
  if (requested && /^[a-zA-Z]:[\\/]|^[\\/]/.test(requested)) destination = requested;
  else {
    const relative = requested || `${Date.now()}-${crypto.randomBytes(5).toString('hex')}.png`;
    // eslint-disable-next-line no-control-regex -- Reject C0 control bytes in relative capture paths.
    if (typeof relative !== 'string' || relative.split(/[\\/]/).some(p => p === '..') || /[:\x00-\x1f]/.test(relative)) fail('invalid relative capture path');
    destination = `${run.directory}/${category}/${relative.replace(/\\/g,'/')}`;
  }
  const normalized = evidencePath(destination);
  if (!normalized.toLowerCase().startsWith(run.directory.replace(/\\/g,'/').toLowerCase() + '/')) fail('capture cannot write another run');
  return evidencePath(normalized,{createParent:true});
}
function configurePlaywright({ repository = 'frontend', task = 'playwright' } = {}) {
  const run = currentRun({ repository, task });
  // Playwright cleans outputDir at invocation start. Keep it separate from
  // retained screenshots and from every previous invocation of this admission.
  const invocation = `${Date.now()}-${crypto.randomBytes(5).toString('hex')}`;
  const outputDir = mediaPath(`playwright/${invocation}`);
  const reportDir = mediaPath(`playwright/${invocation}`, 'reports');
  for (const key of ['TEMP','TMP','TMPDIR']) process.env[key] = `${run.directory}/tmp`;
  process.env.PLAYWRIGHT_HTML_OUTPUT_DIR = `${reportDir}/html`;
  process.env.PLAYWRIGHT_JSON_OUTPUT_FILE = `${reportDir}/results.json`;
  const preload = path.join(ROOT, 'scripts/lib/playwright-evidence-preload.js').replace(/\\/g,'/');
  const argument = `--require="${preload}"`;
  if (!(process.env.NODE_OPTIONS || '').includes(preload)) process.env.NODE_OPTIONS = `${process.env.NODE_OPTIONS || ''} ${argument}`.trim();
  return { outputDir, reporter: [['list'], ['html', { outputFolder: `${reportDir}/html`, open: 'never' }]],
    use: { trace: 'on', video: 'on', screenshot: 'on' }, run };
}
const WRAPPED = Symbol.for('ecc.d-only-playwright.wrapper');
const LOCATORS=['locator','$','$$','waitForSelector','getByRole','getByText','getByLabel','getByPlaceholder','getByAltText','getByTitle','getByTestId','frameLocator','frame','mainFrame','frames','first','last','nth','filter','contentFrame','elementHandle'];
function wrap(object, name, handler) {
  if (!object || typeof object[name] !== 'function' || object[name][WRAPPED]) return;
  const original = object[name]; const fn = handler(original); fn[WRAPPED] = true; object[name] = fn;
}
function guardPage(page) {
  wrap(page,'screenshot',original => function(opts = {}) { return original.call(this,{ ...opts, path: mediaPath(opts.path) }); });
  guardLocatable(page);
  wrap(page,'video',original => function(...args) { const video = original.apply(this,args); if (video) wrap(video,'saveAs',save => function(file) { return save.call(this,mediaPath(file,'videos')); }); return video; });
  return page;
}
function guardLocatable(value){
  if(!value)return value;if(Array.isArray(value))return value.map(guardLocatable);
  const prototype=Object.getPrototypeOf(value),target=prototype&&prototype!==Object.prototype?prototype:value;
  wrap(target,'screenshot',original=>function(opts={}){return original.call(this,{...opts,path:mediaPath(opts.path)});});
  for(const name of LOCATORS)wrap(target,name,original=>function(...args){const result=original.apply(this,args);return result?.then?result.then(guardLocatable):guardLocatable(result);});
  return value;
}
function guardContext(context) {
  wrap(context,'newPage',original => async function(...args) { return guardPage(await original.apply(this,args)); });
  for (const page of context.pages?.() || []) guardPage(page);
  context.on?.('page',guardPage);
  wrap(context.tracing,'stop',original => function(opts = {}) { return original.call(this,{ ...opts, path: mediaPath(opts.path || `${Date.now()}-trace.zip`,'traces') }); });
  return context;
}
function guardBrowser(browser) {
  wrap(browser,'newContext',original => async function(opts = {}) {
    const dir = opts.recordVideo?.dir ? mediaPath(opts.recordVideo.dir,'videos') : `${currentRun().directory}/videos`;
    evidencePath(dir); return guardContext(await original.call(this,{ ...opts, recordVideo: { ...opts.recordVideo, dir } }));
  });
  wrap(browser,'newPage',_original => async function(opts = {}) { const context = await this.newContext(opts); return context.newPage(); });
  return browser;
}
function installPlaywrightGuards(playwright,{nativeRequire}={}) {
  configurePlaywright();
  if(nativeRequire)installNativeEncoder(nativeRequire);
  for (const type of ['chromium','firefox','webkit']) {
    for (const name of ['connect','connectOverCDP']) wrap(playwright[type],name,() => function() { fail('remote or existing browsers are outside the managed capture boundary'); });
    wrap(playwright[type],'launch',original => async function(opts = {}) {
      checkLaunchCapacity(); const run = currentRun();
      for (const argument of opts.args || []) if (/^--(?:user-data-dir|disk-cache-dir)=/.test(argument)) evidencePath(argument.slice(argument.indexOf('=') + 1));
      return guardBrowser(await original.call(this,{ ...opts, downloadsPath: mediaPath(opts.downloadsPath || 'browser','downloads'),
        env: { ...process.env, ...opts.env, TEMP: `${run.directory}/tmp`, TMP: `${run.directory}/tmp`, TMPDIR: `${run.directory}/tmp` } }));
    });
    wrap(playwright[type],'launchPersistentContext',original => async function(profile,opts = {}) {
      checkLaunchCapacity(); const run=currentRun();
      for (const argument of opts.args || []) if (/^--(?:user-data-dir|disk-cache-dir)=/.test(argument)) evidencePath(argument.slice(argument.indexOf('=') + 1));
      return guardContext(await original.call(this,mediaPath(profile,'profiles'),{ ...opts,
        downloadsPath:mediaPath(opts.downloadsPath || 'persistent','downloads'),
        env:{...process.env,...opts.env,TEMP:`${run.directory}/tmp`,TMP:`${run.directory}/tmp`,TMPDIR:`${run.directory}/tmp`},
        recordVideo:{ ...opts.recordVideo, dir:mediaPath(opts.recordVideo?.dir || 'persistent','videos') } }));
    });
  }
  return playwright;
}
function checkLaunchCapacity() {
  disk(); if (os.freemem() < 2.5 * 1024 ** 3) fail('browser launch needs 2 GiB preserved RAM plus 512 MiB bounded capture headroom');
}
module.exports = { policy, coordinate, disk, evidencePath, createRun, currentRun, mediaPath, configurePlaywright, installPlaywrightGuards, checkLaunchCapacity, digest, hashFile, pinnedTool };
