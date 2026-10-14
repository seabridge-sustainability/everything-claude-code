import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url), contracts=require('./ui-contract.cjs'), storage=require('../../scripts/lib/browser-evidence.js');
const hash=storage.hashFile;
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export function developmentHmrSocket(target){
  return target.protocol==='ws:'&&target.hostname==='localhost'&&target.port==='3000'&&['/_next/webpack-hmr','/_next/hmr'].includes(target.pathname)&&!target.username&&!target.password;
}
export function localPublicImage(target){
  if(target.pathname!=='/_next/image')return true;
  const asset=target.searchParams.get('url');
  if(!asset||!/^\/(?:brand|images|assets)\/[a-zA-Z0-9_/-]+\.(?:png|webp|jpg|jpeg|svg)$/.test(asset))return false;
  const root=path.resolve(contracts.FRONT,'public'),file=path.resolve(root,'.'+asset);
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.lstatSync(file).isFile())return false;
  let cursor=file;while(cursor!==root){if(fs.lstatSync(cursor).isSymbolicLink())return false;cursor=path.dirname(cursor);}
  return true;
}
export function inspectMedia(file,kind,viewport){
  storage.evidencePath(file);const stat=fs.lstatSync(file);
  if(!stat.isFile()||stat.isSymbolicLink()||stat.size<8||stat.size>storage.policy.maximumRunBytes)throw Error('Bounded media required');
  const fd=fs.openSync(file,'r'),header=Buffer.alloc(24);try{fs.readSync(fd,header,0,24,0);}finally{fs.closeSync(fd);}
  if(kind==='screenshot'){
    if(!header.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))||header.toString('ascii',12,16)!=='IHDR'||!viewport||header.readUInt32BE(16)!==viewport.width||header.readUInt32BE(20)!==viewport.height)throw Error('PNG viewport proof required');
  }else if(kind==='video'){
    if(header.readUInt32BE(0)!==0x1a45dfa3)throw Error('WebM playback proof required');
  }else if(kind==='trace'){
    if(header.readUInt32LE(0)!==0x04034b50)throw Error('Playwright ZIP trace required');
  }else throw Error('Unknown evidence kind');
  return {kind,viewport:viewport.id,path:file,bytes:stat.size,sha256:hash(file)};
}
export async function capture({admission,phase,route,state='default',checks=[]}) {
  if(!['before','after'].includes(phase)||!Array.isArray(checks)||checks.length>20)throw Error('Bounded before/after capture required');
  const packet=contracts.readAdmission(admission), url=new URL(route,'http://localhost:3000');
  if(url.origin!=='http://localhost:3000'||!packet.contract.routes.includes(url.pathname+url.search)||!packet.contract.states.includes(state))throw Error('Capture outside admitted route/state');
  for(const check of checks)if(!check||typeof check.id!=='string'||check.id.length>100||!['visible','text','click','fill'].includes(check.action)||typeof check.selector!=='string'||check.selector.length>200||Object.keys(check).some(k=>!['id','action','selector','value'].includes(k))||(check.value!==undefined&&(typeof check.value!=='string'||check.value.length>500)))throw Error('Known bounded interaction required');
  storage.checkLaunchCapacity();
  const lock=storage.evidencePath(storage.policy.root+'/capture.lock',{createParent:true});
  const token=crypto.randomUUID();let lockFd;try{lockFd=fs.openSync(lock,'wx');fs.writeSync(lockFd,JSON.stringify({token,pid:process.pid,startedAt:new Date().toISOString()}));}catch{throw Error('Browser capture already owned; serialize without stopping its owner');}
  const previous={};for(const key of ['ECC_BROWSER_EVIDENCE_RUN_ROOT','TEMP','TMP','TMPDIR','NODE_OPTIONS','PLAYWRIGHT_HTML_OUTPUT_DIR','PLAYWRIGHT_JSON_OUTPUT_FILE'])previous[key]=process.env[key];
  let browser,deadlineTimer;const files=[],views=[],blockedRequests=[];
  const source=contracts.sourceState(packet.contract), start=Date.now(),captureId=crypto.randomUUID(),routeTag=crypto.createHash('sha256').update(url.pathname+url.search).digest('hex').slice(0,10);
  try {
    if(phase==='before'&&!same(source,packet.source))throw Error('Source changed since specification; recreate admission');
    process.env.ECC_BROWSER_EVIDENCE_RUN_ROOT=packet.runRoot;storage.configurePlaywright();
    const nativeRequire=createRequire(path.join(contracts.FRONT,'package.json')),playwright=nativeRequire('playwright');storage.installPlaywrightGuards(playwright,{nativeRequire});
    browser=await playwright.chromium.launch({channel:'chrome',headless:true,timeout:15000,args:['--disable-background-networking','--disable-extensions']});
    deadlineTimer=setTimeout(()=>{browser?.close().catch(()=>{});},Math.max(1,storage.policy.maximumCaptureMilliseconds-(Date.now()-start)));
    for(const viewport of packet.contract.viewports){
      if(Date.now()-start>storage.policy.maximumCaptureMilliseconds)throw Error('Capture deadline exceeded');
      const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},deviceScaleFactor:1,serviceWorkers:'block',recordVideo:{size:{width:viewport.width,height:viewport.height}}});
      context.setDefaultTimeout(5000);context.setDefaultNavigationTimeout(15000);
      // Leave Next's allowed HMR socket native. Proxying it through Playwright
      // can interrupt Turbopack hydration; application sockets remain blocked.
      await context.routeWebSocket(target=>!developmentHmrSocket(target),socket=>socket.close());
      const errors=[];let page;
      try {
        await context.route('**/*',r=>{
          const request=r.request();let target;try{target=new URL(request.url());}catch{return r.abort();}
          const allowed=['GET','HEAD'].includes(request.method())&&target.origin==='http://localhost:3000'&&!target.username&&!target.password&&!target.pathname.startsWith('/api/')&&localPublicImage(target);
          if(!allowed){if(blockedRequests.length<100)blockedRequests.push({method:request.method(),origin:target.origin,path:target.pathname});return r.abort();}return r.continue();
        });
        await context.tracing.start({screenshots:true,snapshots:true,sources:false});page=await context.newPage();
        page.on('pageerror',e=>errors.push(e.name));
        const response=await page.goto(url.href,{waitUntil:'domcontentloaded',timeout:15000});
        if(!response||response.status()>=400)throw Error('Intended page did not load');
        for(const check of checks){const locator=page.locator(check.selector);if(check.action==='visible'){await locator.waitFor({state:'visible',timeout:15000});if(!await locator.isVisible())throw Error('Visibility assertion failed: '+check.id);}else if(check.action==='text'){if(!check.value||(await locator.innerText()).trim()!==check.value)throw Error('Text assertion failed: '+check.id);}else if(check.action==='click')await locator.click({timeout:5000});else await locator.fill(check.value||'',{timeout:5000});}
        await page.waitForFunction(()=>Array.from(document.images).every(img=>{const box=img.getBoundingClientRect();return box.bottom<=0||box.top>=innerHeight||box.right<=0||box.left>=innerWidth||img.complete;}),{},{timeout:3000});
        const brokenImages=await page.locator('img').evaluateAll(images=>images.filter(img=>{const b=img.getBoundingClientRect();return b.width>0&&b.height>0&&b.bottom>0&&b.top<innerHeight&&b.right>0&&b.left<innerWidth&&img.naturalWidth===0;}).length);
        if(brokenImages)throw Error('Visible image failed to load');
        const observed=new URL(page.url());if(observed.origin!==url.origin||observed.pathname+observed.search!==url.pathname+url.search)throw Error('Browser left the declared capture route; use the mapped journey for navigation');
        const png=storage.mediaPath(`${phase}-${routeTag}-${state}-${viewport.id}-${captureId}.png`);await page.screenshot({path:png,fullPage:false});files.push(inspectMedia(png,'screenshot',viewport));
        const trace=storage.mediaPath(`${phase}-${routeTag}-${state}-${viewport.id}-${captureId}.zip`,'traces');await context.tracing.stop({path:trace});files.push(inspectMedia(trace,'trace',viewport));
        views.push({id:viewport.id,width:viewport.width,height:viewport.height,status:response.status(),pageErrors:errors,checks:checks.map(x=>x.id)});
      } catch(error){
        if(page&&!page.isClosed()){
          const png=storage.mediaPath(`failed-${phase}-${state}-${viewport.id}-${Date.now()}.png`);await page.screenshot({path:png,fullPage:false}).then(()=>files.push(inspectMedia(png,'screenshot',viewport))).catch(()=>{});
          const trace=storage.mediaPath(`failed-${phase}-${state}-${viewport.id}-${Date.now()}.zip`,'traces');await context.tracing.stop({path:trace}).then(()=>files.push(inspectMedia(trace,'trace',viewport))).catch(()=>{});
        }
        throw error;
      } finally {const video=page?.video();await context.close();if(video){const file=await video.path();files.push(inspectMedia(file,'video',viewport));}}
    }
    if(!same(source,contracts.sourceState(packet.contract)))throw Error('Source changed during browser verification');
    if(Date.now()-start>storage.policy.maximumCaptureMilliseconds)throw Error('Capture deadline exceeded');
    if(files.reduce((n,x)=>n+x.bytes,0)>storage.policy.maximumRunBytes)throw Error('Evidence exceeded bounded size');
    const receipt={schema:'ecc.ui-capture.v1',contractSha256:packet.contractSha256,engineSha256:packet.engineSha256,admission,phase,route:url.pathname+url.search,state,source,files,viewports:views,blockedRequests,createdAt:new Date().toISOString(),authenticity:'actual-browser',authenticated:false,productPersistenceProof:false,modelCalls:0,visualReviewRequired:true};
    const file=storage.evidencePath(packet.runRoot+`/${phase}-${routeTag}-${state}-${captureId}-receipt.json`);fs.writeFileSync(file,JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});
    return {verdict:views.some(v=>v.pageErrors.length)?'FAIL':'PASS',stage:'actual-browser-evidence',receipt:file,files,authenticated:false,productPersistenceProof:false,visualReviewRequired:true};
  } catch(error){
    const file=storage.evidencePath(packet.runRoot+`/failed-${phase}-${state}-${Date.now()}.json`);
    fs.writeFileSync(file,JSON.stringify({schema:'ecc.ui-capture-failure.v1',verdict:'FAIL',source,contractSha256:packet.contractSha256,phase,state,files,reason:error.message.slice(0,2000),productPersistenceProof:false},null,2)+'\n',{flag:'wx'});
    throw error;
  } finally {
    clearTimeout(deadlineTimer);
    try{if(browser)await browser.close();}finally{
      try{fs.closeSync(lockFd);if(fs.existsSync(lock)&&JSON.parse(fs.readFileSync(lock,'utf8')).token===token)fs.unlinkSync(lock);}finally{
        for(const [key,value]of Object.entries(previous)){if(value===undefined)delete process.env[key];else process.env[key]=value;}
      }
    }
  }
}
export function validateEvidence(request){return validatePhases(request,['before','after']);}
export function validateBeforeEvidence(request){return validatePhases(request,['before']);}
function validatePhases({admission,receipts},phases){
  const packet=contracts.readAdmission(admission);if(!Array.isArray(receipts)||receipts.length<phases.length||receipts.length>16)throw Error('Required phase receipts missing');
  const coverage=new Set();let afterSource;
  for(const file of receipts){storage.evidencePath(file);if(fs.statSync(file).size>64000)throw Error('Bounded receipt required');const r=JSON.parse(fs.readFileSync(file,'utf8'));
    if(r.schema!=='ecc.ui-capture.v1'||r.authenticity!=='actual-browser'||r.engineSha256!==packet.engineSha256||r.contractSha256!==packet.contractSha256||r.admission!==admission||!packet.contract.states.includes(r.state)||!packet.contract.routes.includes(r.route)||!phases.includes(r.phase))throw Error('Unbound or fixture-only browser evidence');
    if(r.phase==='before'&&!same(r.source,packet.source))throw Error('Before evidence does not reproduce admitted source');
    if(r.phase==='after'){if(!same(r.source,contracts.sourceState(packet.contract)))throw Error('After evidence is stale');afterSource=r.source;}
    if(!Array.isArray(r.files)||r.files.length<packet.contract.viewports.length*3||r.files.length>30)throw Error('Screenshots, successful video and traces required');
    if(new Set(r.files.map(f=>f.path.toLowerCase())).size!==r.files.length||r.files.reduce((n,f)=>n+f.bytes,0)>storage.policy.maximumRunBytes)throw Error('Duplicate or excessive media');
    for(const f of r.files){
      storage.evidencePath(f.path);const viewport=packet.contract.viewports.find(v=>v.id===f.viewport);
      if(!viewport||!f.path.replace(/\\/g,'/').startsWith(packet.runRoot+'/')||fs.statSync(f.path).size!==f.bytes||hash(f.path)!==f.sha256)throw Error('Media was changed, missing or outside this run');
      inspectMedia(f.path,f.kind,viewport);
    }
    for(const v of packet.contract.viewports)for(const kind of ['screenshot','trace','video'])if(r.files.filter(f=>f.viewport===v.id&&f.kind===kind).length!==1)throw Error('Each viewport needs its own screenshot, trace and video');
    for(const v of packet.contract.viewports){const view=r.viewports.find(x=>x.id===v.id&&x.width===v.width&&x.height===v.height);if(!view||view.pageErrors.length||view.status>=400)throw Error('Viewport or runtime evidence failed');coverage.add(r.phase+':'+r.route+':'+r.state+':'+v.id);}
  }
  for(const phase of phases)for(const route of packet.contract.routes)for(const state of packet.contract.states)for(const v of packet.contract.viewports)if(!coverage.has(phase+':'+route+':'+state+':'+v.id))throw Error('Missing phase/route/state/viewport evidence');
  if(phases.includes('after')&&!afterSource)throw Error('After proof required');
  return {verdict:'PASS',stage:phases.length===1?'before-evidence-complete-for-review':'evidence-complete-for-review',contractSha256:packet.contractSha256,visualReviewRequired:true,baselineApprovalVerified:false,productPersistenceProof:false,implementationAuthorized:false};
}
export function readImage({file,admission}){storage.evidencePath(file);const packet=contracts.readAdmission(admission);if(!file.replace(/\\/g,'/').startsWith(packet.runRoot+'/'))throw Error('Image outside admitted run');const stat=fs.statSync(file);if(!stat.isFile()||stat.size>6*1024*1024||!file.endsWith('.png'))throw Error('Bounded D-only PNG required');const bytes=fs.readFileSync(file);if(!bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))throw Error('PNG signature required');return {mimeType:'image/png',data:bytes.toString('base64')};}
