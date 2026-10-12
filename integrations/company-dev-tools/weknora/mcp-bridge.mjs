import fs from 'node:fs/promises';
import readline from 'node:readline';
const credentials=JSON.parse(await fs.readFile(new URL('./state/mcp-connection.json',import.meta.url),'utf8'));
const target=new URL(credentials.url); if(target.hostname!=='127.0.0.1'||target.port!=='8182')throw new Error('Only the configured loopback WeKnora endpoint is permitted');
async function dispatch(message){
  const response=await fetch(target,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json, text/event-stream',Authorization:'Bearer '+credentials.token},body:JSON.stringify(message),signal:AbortSignal.timeout(30000)});
  if(!response.ok)throw new Error('WeKnora HTTP status '+response.status);
  const body=await response.text(); if(message.id===undefined)return;
  if(response.headers.get('content-type')?.includes('text/event-stream')){const chunks=body.split('\n').filter(s=>s.startsWith('data:')).map(s=>JSON.parse(s.slice(5).trim()));const reply=chunks.find(s=>s.id===message.id);if(!reply)throw new Error('No matching MCP response');return reply;}
  return JSON.parse(body);
}
for await(const line of readline.createInterface({input:process.stdin,crlfDelay:Infinity})){let request;try{request=JSON.parse(line);const result=await dispatch(request);if(result)process.stdout.write(JSON.stringify(result)+'\n');}catch(error){if(request?.id!==undefined)process.stdout.write(JSON.stringify({jsonrpc:'2.0',id:request.id,error:{code:-32000,message:error.message}})+'\n');else process.stderr.write('WeKnora MCP notification failed\n');}}
