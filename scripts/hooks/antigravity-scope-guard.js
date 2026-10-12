#!/usr/bin/env node
'use strict';
// Antigravity is not Gemini CLI: use its documented camelCase/native decisions.
// Native allow is emitted only AFTER the registered scope/identity/budget gate.
// An empty PreToolUse response is a denial in the tested Windows client.
const fs = require('node:fs');
const path = require('node:path');
const coordination = require('../lib/session-coordination');
function normalize(payload, cwd) {
  if (!payload || !Array.isArray(payload.workspacePaths) || payload.workspacePaths.length !== 1
      || path.resolve(payload.workspacePaths[0]).toLowerCase() !== path.resolve(cwd).toLowerCase()
      || typeof payload.conversationId !== 'string' || !payload.conversationId) throw Error('native identity/workspace missing');
  const name = payload.toolCall?.name, args = payload.toolCall?.args;
  const reads = ['view_file','list_dir','find_by_name','grep_search'];
  const writes = ['write_to_file','replace_file_content','multi_replace_file_content'];
  if(payload.invocationNum!==undefined && (!Number.isSafeInteger(payload.invocationNum)||!Number.isSafeInteger(payload.initialNumSteps))) throw Error('invalid native invocation identity');
  return { session_id: payload.conversationId, cwd, turn_id: `${payload.initialNumSteps}:${payload.invocationNum}`,
    tool_name: reads.includes(name) ? 'Read' : writes.includes(name) ? 'Write' : name,
    tool_input: writes.includes(name) ? { file_path: args?.TargetFile } : args };
}
function run(event, payload, {cwd=process.env.ECC_OWNED_WORKTREE||process.cwd(), sessionId=process.env.ECC_SESSION_ID}={}) {
  try {
    if (!['pre','turn','post','final'].includes(event) || !sessionId) throw Error('explicit registered session required');
    const normalized = normalize(payload,cwd);
    if (event==='post') {
      // Native PostInvocation supports termination; PreInvocation does NOT.
      const result=coordination.execute('guard-event',{cwd,sessionId,guardMode:'block',event:'turn',payload:normalized});
      return result.wouldDeny ? {terminationBehavior:'terminate'} : {};
    }
    const result=coordination.execute('guard-event',{cwd,sessionId,guardMode:'block',event,payload:normalized});
    if (result.wouldDeny) return event==='pre' ? {decision:'deny',reason:`ECC scope guard: ${result.reason}`}
      : event==='final' ? {decision:'continue',reason:`ECC completion rejected: ${result.reason}`} : {};
    return event==='pre' ? {decision:'allow',reason:'ECC registered task scope, identity and budget verified'} : {};
  } catch {
    return event==='pre' ? {decision:'deny',reason:'ECC scope guard binding/input unavailable'}
      : event==='post' ? {terminationBehavior:'terminate'}
      : event==='final' ? {decision:'continue',reason:'ECC completion evidence unavailable'} : {};
  }
}
function main() {
  try {
    const raw=fs.readFileSync(0); if(raw.length>1024*1024) throw Error('oversized');
    process.stdout.write(JSON.stringify(run(process.argv[2],JSON.parse(raw.toString('utf8'))))+'\n');
  } catch { process.stdout.write(JSON.stringify({decision:'deny',reason:'Malformed ECC hook input'})+'\n'); }
}
if(require.main===module)main();
module.exports={normalize,run,main};
