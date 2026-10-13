import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
import {ROOT,STATE,safeState,writeState} from './runtime.mjs';
const origin='http://localhost:3000',api='http://127.0.0.1:8000';
const stateFile=path.resolve(ROOT,'../manageesg-backend/.playwright-agent/state/local-auth.json');
export function authPrerequisite(state,now=Date.now()) {
  const token=state.cookies?.find(row=>row.name==='auth_token'&&typeof row.domain==='string'&&['localhost','127.0.0.1'].includes(row.domain.replace(/^\./,'')))?.value
    ||state.origins?.find(row=>row.origin===origin)?.localStorage?.find(row=>row.name.endsWith('.accessToken'))?.value;
  if(typeof token!=='string'||!token||token.length>16000)return {ready:false,reason:'Existing primary-runtime session has no usable token; manual owner login required.'};
  try {
    const claims=JSON.parse(Buffer.from(token.split('.')[1],'base64url'));
    if(!Number.isFinite(claims.exp)||claims.exp*1000<=now)return {ready:false,reason:'Existing captured session expired; manual owner login required.'};
  }catch {return {ready:false,reason:'Existing session token cannot establish the auth prerequisite.'};}
  return {ready:true,token}; // Never serialize this internal result or persist credentials.
}
export async function readOnlyJourney() {
  const receipt={verdict:'BLOCKED',observedAt:new Date().toISOString(),intendedFrontend:origin,intendedBackend:api,
    authenticatedProductProof:false,providerCalls:0,productWrites:0,existingServicesStopped:0,existingSessionsChanged:0};
  const finish=()=>{const artifact=path.join(STATE,'journey-'+Date.now()+'-'+crypto.randomUUID()+'.json');writeState(artifact,receipt);return {...receipt,artifact};};
  if(!fs.existsSync(stateFile)){receipt.reason='Existing approved local browser state unavailable; no new login, credential acquisition or substitute runtime.';return finish();}
  safeState(stateFile);
  if(fs.statSync(stateFile).size>1000000)throw Error('Oversized auth state denied');
  const state=JSON.parse(fs.readFileSync(stateFile,'utf8')),admission=authPrerequisite(state);
  if(!admission.ready){receipt.reason=admission.reason;return finish();}
  const response=await fetch(api+'/api/v1/auth/validate-user',{headers:{Authorization:'Bearer '+admission.token},signal:AbortSignal.timeout(5000),redirect:'error'});
  receipt.sessionValidationStatus=response.status;
  await response.body?.cancel();
  if(!response.ok){receipt.reason='Existing captured session did not validate at the primary backend; no auth bypass or token refresh.';return finish();}
  // Separate private browser context; never drive another owner's active page or save its state.
  const {chromium}=createRequire(path.resolve(ROOT,'../manageesg-frontend/package.json'))('playwright');
  let browser;
  try{browser=await chromium.launch({channel:'chrome',headless:true});}
  catch{receipt.reason='Existing Chrome browser unavailable; no browser installation or alternate application runtime.';return finish();}
  try {
    const context=await browser.newContext({storageState:state,viewport:{width:1440,height:1000}});
    let deniedRequests=0,pageErrors=0;
    await context.route('**/*',route=>{
      const request=route.request(),url=new URL(request.url());
      if(!['GET','HEAD'].includes(request.method())||![origin,api,'http://localhost:8000'].includes(url.origin)){deniedRequests++;return route.abort();}
      return route.continue();
    });
    const page=await context.newPage();page.on('pageerror',()=>{pageErrors++;});
    const navigation=await page.goto(origin+'/dashboard',{waitUntil:'domcontentloaded',timeout:30000});
    await page.waitForTimeout(1000);
    const pathname=new URL(page.url()).pathname;
    receipt.pageStatus=navigation?.status();receipt.finalPathname=pathname;receipt.pageErrors=pageErrors;receipt.deniedRequests=deniedRequests;
    receipt.signedInPageObserved=pathname.startsWith('/dashboard')&&receipt.pageStatus===200&&pageErrors===0;
    receipt.verdict=receipt.signedInPageObserved?'PASS':'BLOCKED';
    receipt.reason='Read-only session validation and intended dashboard observation only; selected property, tenant-negative, Save/reopen and scientific proofs remain separate.';
    receipt.authenticatedProductProof=false;
    await context.close();return finish();
  }finally {await browser.close();}
}
