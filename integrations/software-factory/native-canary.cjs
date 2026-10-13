'use strict';
// Fresh read-only canaries. Never resumes a client, changes global config or
// installs a provider. CLI invocations and provider requests are separate counts.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto');
const {spawn,execFileSync}=require('node:child_process');
const ROOT=path.resolve(__dirname,'../..');
const DIR=path.join(ROOT,'artifacts/agent-runs/pstack/engineering-skills/ui-workflow-audit-20261013');
const APPROVAL=path.join(DIR,'native-canary-batch.json'),LEDGER=path.join(DIR,'native-canary-ledger.json');
const policyFiles=['AGENTS.md','AGENTS_SYSTEM.md','CLAUDE.md'].map(name=>'C:/Users/adelm/SeaBridgeAI/manageesg-backend/'+name);
// Claude normalizes Windows absolute paths to /c/...; // anchors permission
// patterns at the filesystem root. Exact files only, no broad Read approval.
// https://code.claude.com/docs/en/permissions#read-and-edit
const policyReadRules=policyFiles.map(file=>'Read(//'+file[0].toLowerCase()+file.slice(2)+')');
const prompt='Read these existing central policy files first: '+policyFiles.join(', ')+'. This is a fresh read-only native MCP canary under the existing ECC improvement goal, with no source/data writes or new plan. Use only seabridge-pstack after those reads: find the frontend UI verification workflow, read its exact returned id, call pstack_factory ui-features, then pstack_factory ui-admit with contract {} and ui-image with file C:/ecc-canary-not-a-real-image.png. The last two must fail. Do not run shell, authenticate, install, write, create tasks, start services, delegate or call other providers. Report whether all three central policy reads succeeded, the observed tools and refusals, and state that this does not prove visual review, native write guards, authenticated product behavior or all other clients. Keep your response under 250 words.';
const server={command:process.execPath,args:[path.join(ROOT,'integrations/pstack/cli.mjs'),'mcp']};
function regular(file){const s=fs.lstatSync(file);if(!s.isFile()||s.isSymbolicLink()||s.size>1000000)throw Error('Bounded regular metadata required');}
function read(file){regular(file);return JSON.parse(fs.readFileSync(file,'utf8').replace(/^\uFEFF/,''));}
function write(file,value){if(fs.existsSync(file))regular(file);fs.writeFileSync(file,JSON.stringify(value,null,2)+'\n');}
function prepare(){
  const config=path.join(DIR,'native-canary-mcp.json'),gemini=path.join(DIR,'native-canary-gemini.json');
  if(!fs.existsSync(config))write(config,{mcpServers:{'seabridge-pstack':server}});
  if(!fs.existsSync(gemini))write(gemini,{model:{maxSessionTurns:6},mcpServers:{'seabridge-pstack':server}});
  return {config,gemini};
}
function spec(host){
  const p=prepare(),npm=path.join(process.env.APPDATA,'npm/node_modules');
  if(host==='claude')return {exe:path.join(os.homedir(),'.local/bin/claude.exe'),args:['-p',prompt,'--output-format','json','--max-turns','6','--max-budget-usd','0.625','--tools','Read','--strict-mcp-config','--mcp-config',p.config,'--allowedTools',[...policyReadRules,'mcp__seabridge-pstack__pstack_find_workflow','mcp__seabridge-pstack__pstack_read_skill','mcp__seabridge-pstack__pstack_factory'].join(',')],env:{}};
  if(host==='gemini')return {exe:process.execPath,entry:path.join(npm,'@google/gemini-cli/dist/index.js'),args:[path.join(npm,'@google/gemini-cli/dist/index.js'),'-p',prompt,'--approval-mode','plan','--allowed-mcp-server-names','seabridge-pstack','--output-format','stream-json'],env:{GEMINI_CLI_SYSTEM_SETTINGS_PATH:p.gemini}};
  if(host==='codex'){
    const toml=require('@iarna/toml').parse(fs.readFileSync(path.join(os.homedir(),'.codex/config.toml'),'utf8'));
    const args=[path.join(npm,'@openai/codex/bin/codex.js'),'exec','--json','--no-daemon','--sandbox','read-only'];
    for(const name of Object.keys(toml.mcp_servers||{}))if(name!=='seabridge-pstack')args.push('-c','mcp_servers.'+name+'.enabled=false');
    args.push(prompt);return {exe:process.execPath,entry:args[0],args,env:{}};
  }
  if(host==='opencode'){
    const config=path.join(DIR,'native-canary-opencode.json');
    if(!fs.existsSync(config))write(config,{mcp:{'seabridge-pstack':{type:'local',command:[server.command,...server.args],enabled:true}},permission:{'*':'deny',read:'allow','seabridge-pstack_*':'allow'},agent:{'ecc-ui-canary':{mode:'primary',steps:6,permission:{'*':'deny',read:'allow','seabridge-pstack_*':'allow'}}}});
    return {exe:process.execPath,entry:path.join(npm,'opencode-ai/bin/opencode'),args:[path.join(npm,'opencode-ai/bin/opencode'),'run','--agent','ecc-ui-canary','--format','json','--pure',prompt],env:{OPENCODE_CONFIG:config}};
  }
  if(host==='cursor')throw Error('Cursor editor installed; a separately approved agent CLI installation is required');
  throw Error('Unknown canary host');
}
function redact(value){let text=value;for(const [key,secret]of Object.entries(process.env))if(/KEY|TOKEN|SECRET|PASSWORD/.test(key)&&secret&&secret.length>=8)text=text.split(secret).join('[REDACTED]');return text.replace(/sk-[a-zA-Z0-9_-]{20,}/g,'[REDACTED]');}
async function run(host){
  const approval=read(APPROVAL);
  if(!approval.authorization?.softCapsAcknowledged||approval.authorization.maximumTotalUsd!==5||approval.authorization.maximumNativeCanaryInvocations!==8)throw Error('Exact current-session approved batch required');
  if(os.freemem()<2.5*1024**3)throw Error('Live native canary blocked: preserved RAM/headroom unavailable');
  const ledger=fs.existsSync(LEDGER)?read(LEDGER):{version:1,batch:approval.id,maximumInvocations:8,maximumExposureUsd:5,calls:[],providerRequests:'not independently observable for every client',softCapsAcknowledged:true};
  if(ledger.batch!==approval.id||ledger.calls.length>=8||ledger.calls.some(c=>c.host===host))throw Error('Canary batch exhausted or retry prohibited');
  if(ledger.calls.some(c=>c.state==='running'))throw Error('Serialize native canaries');
  const launch=spec(host);if(!fs.existsSync(launch.exe)||(launch.entry&&!fs.existsSync(launch.entry)))throw Error('Installed native executable absent; no auto-install');
  const call={id:crypto.randomUUID(),host,startedAt:new Date().toISOString(),reservedMaximumUsd:0.625,state:'running',nativeWriteGuardProof:false,visualProof:false};ledger.calls.push(call);write(LEDGER,ledger);
  let stdout='',stderr='',timedOut=false;const maximum=2*1024*1024;
  const child=spawn(launch.exe,launch.args,{cwd:ROOT,env:{...process.env,...launch.env},windowsHide:true,stdio:['ignore','pipe','pipe']});
  const stop=()=>{
    if(child.exitCode!==null||child.signalCode!==null||!child.pid)return;
    if(process.platform==='win32'){try{execFileSync('taskkill.exe',['/PID',String(child.pid),'/T','/F'],{windowsHide:true,timeout:5000,stdio:'ignore'});}catch{child.kill();}}
    else child.kill();
  };
  const timer=setTimeout(()=>{timedOut=true;stop();},90000);
  child.stdout.on('data',d=>{stdout+=d;if(stdout.length>maximum)stop();});child.stderr.on('data',d=>{stderr+=d;if(stderr.length>maximum)stop();});
  const code=await new Promise(resolve=>{child.on('error',e=>{stderr+=e.message;resolve(null);});child.on('close',resolve);});clearTimeout(timer);
  const output=redact(stdout.slice(0,maximum)),errors=redact(stderr.slice(0,maximum));
  const outputFile=path.join(DIR,`native-${host}-${call.id}.log`);fs.writeFileSync(outputFile,output+'\nSTDERR\n'+errors);
  call.finishedAt=new Date().toISOString();call.exitCode=code;call.state=timedOut?'timeout':code===0?'completed-needs-evidence-review':'failed';call.output=outputFile;
  call.providerCostUsd=null;call.providerRequests=null;
  if(host==='claude'){try{const r=JSON.parse(output);call.providerCostUsd=r.total_cost_usd??null;call.reportedAgentTurns=r.num_turns??null;}catch{}}
  call.failureIsNotZeroCost=call.providerCostUsd===null;write(LEDGER,ledger);
  return {host,state:call.state,exitCode:code,output:outputFile,providerCostUsd:call.providerCostUsd,providerRequests:call.providerRequests,nativeWriteGuardProof:false,visualProof:false};
}
async function main(){const [operation,host]=process.argv.slice(2);const result=operation==='prepare'?prepare():operation==='run'?await run(host):(()=>{throw Error('prepare | run claude|codex|gemini|opencode|cursor');})();console.log(JSON.stringify(result,null,2));}
if(require.main===module)main().catch(e=>{console.error('Native canary BLOCKED: '+e.message);process.exitCode=2;});
module.exports={prepare,spec,run};
