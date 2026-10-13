import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { ROOT, SOURCE, STATE, config, hashFile, execute, safeState, writeState } from './runtime.mjs';
const sourceFile = () => path.resolve(ROOT,'..',config().verification.source);
const installationFile = path.join(STATE,'verifier-installation.json');
const engineFiles = ['worker.cjs','policy.yaml','Dockerfile','verifier.mjs','config.json','runtime.mjs','cli.mjs','mcp.mjs','contracts.mjs','contract-map.json','schema-reader.py','journey.mjs'];
const engines = () => engineFiles.map(file => ({file,sha256:hashFile(path.join(SOURCE,file))}));
const minimalEnv = () => Object.fromEntries(Object.entries(process.env).filter(([key]) => /^(PATH|SYSTEMROOT|WINDIR|USERPROFILE|HOME|APPDATA|LOCALAPPDATA|TEMP|TMP)$/i.test(key)));
async function command(executable,args,timeout=30000,cwd=ROOT) {
  const result=await execute(executable,args,{timeout,cwd,env:minimalEnv()});
  if(result.code!==0||result.problem)throw Error(`Verifier command failed (${result.code}): ${result.problem||result.output.slice(-1200)}`);
  return result.output.trim();
}
function shell(args,timeout=45000) {
  const launch='export XDG_CONFIG_HOME="$HOME/.local/share/ecc-dev-suite/openshell/config"; export XDG_STATE_HOME="$HOME/.local/share/ecc-dev-suite/openshell/state"; export OPENSHELL_TELEMETRY_ENABLED=false; exec "$HOME/.local/share/ecc-dev-suite/openshell/bin/openshell" "$@"';
  return command('wsl.exe',['-d','Ubuntu','--exec','sh','-c',launch,'sh','--gateway-endpoint',config().verification.gateway,'--color','never',...args],timeout);
}
function wslPath(file) { if(!/^C:\\/.test(file))throw Error('Reviewed C: workspace path required');return '/mnt/c/'+file.slice(3).replaceAll('\\','/'); }
async function locked(action) {
  safeState(installationFile);
  fs.mkdirSync(STATE,{recursive:true});const lock=path.join(STATE,'verifier.lock');let fd;
  try {fd=fs.openSync(lock,'wx');} catch {throw Error('Verifier busy; serialize sandbox operations');}
  try {return await action();}
  catch(error) {
    const artifact=path.join(STATE,'failed-verification-'+Date.now()+'-'+crypto.randomUUID()+'.json');
    writeState(artifact,{verdict:'FAIL',observedAt:new Date().toISOString(),seed:config().verification.seed,cases:config().verification.cases,
      engines:engines(),reason:error.message.slice(0,2400),providerCalls:0,authenticatedProductProof:false});
    throw Error(error.message+'; retained failure: '+artifact);
  }finally{fs.closeSync(fd);fs.unlinkSync(lock);}
}
export async function prepareVerifier() {
  return locked(async()=>{
    if(os.freemem()/1024**3<config().verification.minimumFreeGiB)throw Error('Insufficient available memory; preserve running agents/services');
    await shell(['status']);
    const src=safeState(sourceFile());
    const compiler=createRequire(path.resolve(ROOT,'../manageesg-frontend/package.json'))('typescript');
    const content=fs.readFileSync(src,'utf8');
    const compiled=compiler.transpileModule(content,{compilerOptions:{module:compiler.ModuleKind.CommonJS,target:compiler.ScriptTarget.ES2020}}).outputText;
    const snapshot={sourceFile:config().verification.source,sourceSha256:hashFile(src),compiledSha256:crypto.createHash('sha256').update(compiled).digest('hex'),seed:config().verification.seed,cases:config().verification.cases};
    const context=path.join(STATE,'snapshot-'+crypto.randomUUID());fs.mkdirSync(context,{recursive:true});
    fs.writeFileSync(path.join(context,'auth-return-path.cjs'),compiled);
    fs.writeFileSync(path.join(context,'snapshot.json'),JSON.stringify(snapshot)+'\n');
    for(const file of ['worker.cjs','Dockerfile'])fs.copyFileSync(path.join(SOURCE,file),path.join(context,file));
    const base=await command('docker',['image','inspect','ecc-openshell-fixture:0.1.3','--format','{{.Id}}']);
    if(!/^sha256:[a-f0-9]{64}$/.test(base))throw Error('Existing pinned base image required');
    await command('docker',['build','--pull=false','--build-arg','BASE='+base,'-t',config().verification.image,context],180000);
    const imageID=await command('docker',['image','inspect',config().verification.image,'--format','{{.Id}}']);
    const prior=fs.existsSync(installationFile)?JSON.parse(fs.readFileSync(installationFile,'utf8')):null;
    if(prior)writeState(path.join(STATE,'installation-history-'+Date.now()+'-'+crypto.randomUUID()+'.json'),prior);
    const installation={createdAt:new Date().toISOString(),imageID,base,snapshot,snapshotSha256:hashFile(path.join(context,'snapshot.json')),engines:engines(),context,
      sandbox:prior?.imageID===imageID?prior.sandbox:null,sandboxName:'ecc-f-'+imageID.slice(7,19)};
    writeState(installationFile,installation);
    return {verdict:'PASS',imageID,sourceSha256:snapshot.sourceSha256,providers:[],hostSourceMounts:[],limitation:'Snapshot prepared; actual restricted execution must pass separately.'};
  });
}
export function installationCurrent(installation,currentEngines,currentSource) {
  return Boolean(installation && /^sha256:[a-f0-9]{64}$/.test(installation.imageID)
    && /^[a-f0-9]{64}$/.test(installation.snapshotSha256||'')
    && JSON.stringify(installation.engines)===JSON.stringify(currentEngines)
    && installation.snapshot?.sourceSha256===currentSource);
}
export function policyDeniedNetwork(logs,probe) {
  if(!/^run-[a-f0-9]{32}\.example\.com$/.test(probe||''))return false;
  return logs.split(/\r?\n/).some(line=>/NET:(?:OPEN|REFUSE).*DENIED/.test(line)&&line.includes(probe));
}
export async function verifySandbox() {
  return locked(async()=>{
    if(!fs.existsSync(installationFile))return {verdict:'BLOCKED',reason:'Explicit verifier preparation required; no silent installation or application launch.'};
    const installation=JSON.parse(fs.readFileSync(installationFile,'utf8'));
    if(!installationCurrent(installation,engines(),hashFile(safeState(sourceFile()))))return {verdict:'BLOCKED',reason:'Production source or verifier changed; prepare and re-certify a new snapshot.'};
    const actualImage=await command('docker',['image','inspect',config().verification.image,'--format','{{.Id}}']);
    if(actualImage!==installation.imageID)throw Error('Verifier image identity changed');
    if(os.freemem()/1024**3<config().verification.minimumFreeGiB)return {verdict:'BLOCKED',reason:'Insufficient available memory; no service/agent stopped.'};
    await shell(['status']);
    const name=installation.sandbox||installation.sandboxName;
    if(!/^ecc-f-[a-f0-9]{12}$/.test(name||''))throw Error('Reviewed source-bound sandbox identity required');
    if(!installation.sandbox){
      await shell(['sandbox','create','--name',name,'--from',installation.imageID,'--policy',wslPath(path.join(SOURCE,'policy.yaml')),'--no-auto-providers','--approval-mode','manual','--cpu',config().verification.cpu,'--memory',config().verification.memoryMiB+'Mi','--no-tty','--detach','--','sleep','infinity'],120000);
      const names=(await command('docker',['ps','--format','{{.Names}}'])).split(/\r?\n/).filter(n=>n.includes('--'+name+'-')&&n.endsWith('-supervisor'));
      if(names.length!==1)throw Error('Cannot identify only the task-owned supervisor');
      await command('docker',['update','--memory','256m','--memory-swap','256m','--cpus','0.5',names[0]]);
      installation.sandbox=name;writeState(installationFile,installation);
    }
    const runId=crypto.randomUUID().replaceAll('-','');
    const output=await shell(['sandbox','exec',name,'--no-tty','--no-login-shell','--timeout','20','--','/usr/bin/node','/sandbox/references/worker.cjs',runId],45000);
    const lines=output.split(/\r?\n/),body=JSON.parse(lines.find(line=>line.startsWith('{"verdict"'))||'null');
    if(!body||body.verdict!=='PASS'||body.cases!==config().verification.cases*4+8||!body.privateReadDenied||!body.referenceWriteDenied||!body.networkDenied)throw Error('Required actual tests or containment proofs missing');
    if(body.snapshotSha256!==installation.snapshotSha256||body.compiledSha256!==installation.snapshot.compiledSha256)throw Error('Executed snapshot identity changed');
    if(body.runId!==runId||body.networkProbe!=='run-'+runId+'.example.com')throw Error('Execution identity mismatch');
    if(body.sourceSha256!==hashFile(sourceFile()))throw Error('Production source changed during execution');
    let logs='';
    // Gateway observation propagation is asynchronous; only bounded log reads,
    // never a test rerun or weaker assertion, may wait for this execution's event.
    for(let attempt=0;attempt<3;attempt++) {
      logs=await shell(['logs',name,'--since','5m','--source','sandbox','-n','100']);
      if(policyDeniedNetwork(logs,body.networkProbe))break;
      if(attempt<2)await new Promise(resolve=>setTimeout(resolve,500));
    }
    if(!policyDeniedNetwork(logs,body.networkProbe))throw Error('Actual current-execution network policy denial event required; transport errors alone do not prove containment');
    const receipt={...body,checkedAt:new Date().toISOString(),imageID:installation.imageID,policySha256:hashFile(path.join(SOURCE,'policy.yaml')),engines:installation.engines,policyNetworkDenialProved:true,policyLogSha256:crypto.createHash('sha256').update(logs).digest('hex'),providerCalls:0,hostSourceMounts:[],existingServicesStopped:0};
    const file=path.join(STATE,'verification-'+Date.now()+'-'+crypto.randomUUID()+'.json');writeState(file,receipt);
    return {...receipt,artifact:file};
  });
}
