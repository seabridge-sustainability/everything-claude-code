'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {execFileSync}=require('node:child_process');
const {createRequire}=require('node:module');
const ROOT=path.resolve(__dirname,'../..'), FRONT=path.resolve(ROOT,'../manageesg-frontend');
const storage=require('../../scripts/lib/browser-evidence');
const Ajv=createRequire(path.join(ROOT,'package.json'))('ajv');
const validate=new Ajv({allErrors:true}).compile(require('../../schemas/ui-change-contract.schema.json'));
const hash=value=>crypto.createHash('sha256').update(value).digest('hex');
function registry(){return JSON.parse(fs.readFileSync(path.join(ROOT,'manifests/feature-ownership.json'),'utf8'));}
function safeSource(file){
  if(typeof file!=='string'||file.startsWith('/')||/[:\\\x00-\x1f]/.test(file)||file.split('/').some(x=>x==='..'||x==='.'||!x||/[. ]$/.test(x)))throw Error('Exact relative source path required');
  const full=path.resolve(FRONT,file);let cursor=full;
  while(cursor!==FRONT){if(fs.existsSync(cursor)&&fs.lstatSync(cursor).isSymbolicLink())throw Error('Linked source refused');cursor=path.dirname(cursor);}
  return full;
}
function validateContract(contract){
  if(!validate(contract))throw Error('Incomplete UI specification: '+validate.errors.map(x=>x.instancePath+' '+x.message).join('; '));
  const entries=registry().features.filter(x=>contract.feature_ids.includes(x.id));
  if(entries.length!==contract.feature_ids.length)throw Error('Unknown feature ownership');
  if(contract.recipe_ids.some(id=>!entries.some(x=>x.recipe_ids.includes(id))))throw Error('Recipe outside declared feature');
  if(new Set(contract.viewports.map(x=>x.id)).size!==contract.viewports.length||!contract.viewports.some(x=>x.width<768)||!contract.viewports.some(x=>x.width>=1024))throw Error('Distinct mobile and desktop viewports required');
  for(const route of contract.routes){const u=new URL(route,'http://localhost:3000');if(u.origin!=='http://localhost:3000'||u.username||u.password||u.hash||!entries.some(x=>x.routes.some(pattern=>routeMatches(pattern,u.pathname))))throw Error('Route outside declared feature');}
  for(const file of contract.files){safeSource(file);if(!entries.some(x=>x.allowed_paths.some(p=>file===p||file.startsWith(p.replace(/\/$/,'')+'/'))))throw Error('File outside declared feature: '+file);}
  if(contract.baseline.status==='declared-approved'){
    if(!contract.baseline.reference||!contract.baseline.sha256)throw Error('Approved baseline requires exact evidence identity');
    storage.evidencePath(contract.baseline.reference);if(hash(fs.readFileSync(contract.baseline.reference))!==contract.baseline.sha256)throw Error('Baseline hash mismatch');
  }
  return entries;
}
function routeMatches(pattern,pathname){
  const p=pattern.split('/'),v=pathname.split('/');
  return p.length===v.length&&p.every((part,i)=>/^\[[a-zA-Z][a-zA-Z0-9_]*\]$/.test(part)?/^[a-zA-Z0-9_-]{1,100}$/.test(v[i]):part===v[i]);
}
function sourceState(contract){
  const files={};for(const file of contract.files){const full=safeSource(file);files[file]=fs.existsSync(full)?hash(fs.readFileSync(full)):null;}
  const head=execFileSync('git',['rev-parse','HEAD'],{cwd:FRONT,encoding:'utf8',windowsHide:true,stdio:['ignore','pipe','pipe']}).trim();
  return {head,files};
}
function engineState(){return hash(JSON.stringify(['integrations/software-factory/ui-browser.mjs','integrations/software-factory/ui-contract.cjs','scripts/lib/browser-evidence.js','integrations/software-factory/browser-evidence.json','schemas/ui-change-contract.schema.json','manifests/feature-ownership.json'].map(file=>[file,hash(fs.readFileSync(path.join(ROOT,file)))])));}
function admit(contract){
  const owners=validateContract(contract),run=storage.createRun({repository:'frontend',task:contract.id});
  const packet={schema:'ecc.ui-admission.v1',contract,contractSha256:hash(JSON.stringify(contract)),source:sourceState(contract),runRoot:run.directory,
    owners:owners.map(x=>({id:x.id,owner_role:x.owner_role,recipe_ids:x.recipe_ids})),engineSha256:engineState(),createdAt:new Date().toISOString(),implementationAuthorized:false,baselineApprovalVerified:false};
  const file=storage.evidencePath(run.directory+'/admission.json',{createParent:true});fs.writeFileSync(file,JSON.stringify(packet,null,2)+'\n',{flag:'wx'});
  return {verdict:'PASS',stage:'specification-validated',admission:file,contractSha256:packet.contractSha256,runRoot:run.directory,implementationAuthorized:false,visualProof:false};
}
function readAdmission(file){
  storage.evidencePath(file);const stat=fs.lstatSync(file);if(!stat.isFile()||stat.isSymbolicLink()||stat.size>64000)throw Error('Bounded regular admission required');
  const packet=JSON.parse(fs.readFileSync(file,'utf8'));validateContract(packet.contract);
  if(packet.schema!=='ecc.ui-admission.v1'||packet.engineSha256!==engineState()||hash(JSON.stringify(packet.contract))!==packet.contractSha256||path.resolve(file)!==path.resolve(packet.runRoot,'admission.json'))throw Error('Admission was changed, relocated or its verifier is stale');
  storage.evidencePath(packet.runRoot);return packet;
}
function changedUIPaths(paths){return paths.filter(p=>/^(?:src\/(?:app|components)\/.*\.(?:tsx|css)|src\/.*\.css|tailwind\.config\.)/.test(p)&&!/(?:\.test\.|\.spec\.)/.test(p));}
function requireAdmission(file,paths){
  const affected=changedUIPaths(paths);if(!affected.length)return {required:false};
  if(!file)throw Error('UI edits require a source-bound before/after specification and D-only verification admission');
  const p=readAdmission(file);for(const item of affected)if(!p.contract.files.includes(item))throw Error('UI edit outside admitted specification: '+item);
  return {required:true,contractSha256:p.contractSha256};
}
function features(ids){
  if(ids!==undefined&&(!Array.isArray(ids)||!ids.length||ids.length>5||ids.some(id=>typeof id!=='string'||id.length>80)))throw Error('Select one to five exact feature ids');
  const all=registry().features;
  if(ids&&ids.some(id=>!all.some(f=>f.id===id)))throw Error('Unknown feature id');
  const features=ids?all.filter(f=>ids.includes(f.id)):all.map(f=>({id:f.id,purpose:f.purpose,routeCount:f.routes.length,recipe_ids:f.recipe_ids,verification_status:f.verification_status}));
  return {version:1,features,detailRequiresFeatureIds:!ids,limitation:'Source descriptions and recipes, not current product functionality or write ownership'};
}
module.exports={ROOT,FRONT,hash,validateContract,sourceState,admit,readAdmission,requireAdmission,changedUIPaths,features,safeSource,routeMatches,engineState};
