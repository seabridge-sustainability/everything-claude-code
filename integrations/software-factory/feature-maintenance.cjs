'use strict';
// Accepted-source metadata only. Never marks a recipe tested or changes product files.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {execFileSync}=require('node:child_process');
const ROOT=path.resolve(__dirname,'../..'),FRONT=path.resolve(ROOT,'../manageesg-frontend');
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
function coversFeature(f,file){return f.allowed_paths.some(p=>file===p||file.startsWith(p.replace(/\/$/,'')+'/'))||
  (f.source_files||[]).some(p=>{const domain=p.match(/^src\/components\/views\/[^/]+\//)?.[0];return domain&&file.startsWith(domain);});}
function classifyChanges(files,features){
  if(!Array.isArray(files)||files.length>2000||files.some(f=>typeof f!=='string'||f.startsWith('/')||/[\\:\x00-\x1f]/.test(f)||f.split('/').includes('..')))throw Error('Bounded exact source paths required');
  const ui=files.filter(f=>/^src\/(app|components)\/.*\.(tsx|css)$/.test(f)&&!/(\.test\.|\.spec\.)/.test(f));
  // Knowledge routing may infer the declared view namespace; this never expands
  // ui-admit's exact allowed_paths or any write reservation.
  const affected=features.filter(f=>files.some(file=>coversFeature(f,file)));
  const uncovered=ui.filter(file=>!affected.some(f=>coversFeature(f,file)));
  const missingRecipes=affected.filter(f=>!f.recipe_ids?.length).map(f=>f.id);
  return {affected,uncovered,missingRecipes};
}
function maintain({base,head}){
  if(!/^[a-f0-9]{40}$/.test(base||'')||!/^[a-f0-9]{40}$/.test(head||''))throw Error('Exact full base/head SHA required');
  const git=args=>execFileSync('git',args,{cwd:FRONT,encoding:'utf8',windowsHide:true,timeout:15000,maxBuffer:2*1024*1024,stdio:['ignore','pipe','pipe']});
  const remote=git(['ls-remote','origin','refs/heads/development']).trim().split(/\s+/)[0];
  if(head!==remote)throw Error('Maintenance requires the current published development SHA; drafts are not accepted changes');
  git(['merge-base','--is-ancestor',base,head]);
  const files=git(['diff','--name-only','-z',base,head]).split('\0').filter(Boolean);
  const manifestBytes=fs.readFileSync(path.join(ROOT,'manifests/feature-ownership.json'));
  const {affected,uncovered,missingRecipes}=classifyChanges(files,JSON.parse(manifestBytes).features);
  if(uncovered.length||missingRecipes.length)return {verdict:'BLOCKED',base,head,uncovered,missingRecipes,reason:'Affected UI needs feature routing/recipe maintenance',productVerified:false};
  const features=affected.map(f=>({id:f.id,purpose:f.purpose,routes:f.routes,recipe_ids:f.recipe_ids,
    sources:Object.fromEntries([...new Set([...f.source_files,...files.filter(file=>coversFeature(f,file))])].map(file=>{
      try{git(['cat-file','-e',head+':'+file]);}catch{return [file,{sha256:null,status:'absent-at-accepted-revision'}];}
      return [file,{sha256:hash(git(['show',head+':'+file])),status:'present'}];
    })),verification_status:'configured-unverified'}));
  const receipt={schema:'ecc.accepted-feature-knowledge.v1',verdict:'PASS',base,head,manifestSha256:hash(manifestBytes),features,
    observedAt:new Date().toISOString(),productVerified:false,providerCalls:0,productWrites:0,limitation:'Accepted source metadata; recipes still require actual runtime verification'};
  const dir=path.join(ROOT,'artifacts/agent-runs/software-factory/accepted-features');fs.mkdirSync(dir,{recursive:true});
  const artifact=path.join(dir,base+'-'+head+'-'+receipt.manifestSha256+'.json');
  // Repeated same source/manifest is idempotent; never overwrite prior evidence.
  if(!fs.existsSync(artifact))fs.writeFileSync(artifact,JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});
  if(fs.lstatSync(artifact).isSymbolicLink())throw Error('Linked receipt refused');
  const saved=JSON.parse(fs.readFileSync(artifact,'utf8'));if(saved.base!==base||saved.head!==head||saved.manifestSha256!==receipt.manifestSha256)throw Error('Accepted-feature receipt identity mismatch');
  return {...saved,artifact};
}
module.exports={classifyChanges,maintain};
