import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { contextEntry, reviewEntry, status, findWorkflow, readEntry, prepareReview } from './runtime.mjs';
const [command, ...args] = process.argv.slice(2);
try {
  if (command === 'mcp') await (await import('./mcp.mjs')).startMcp();
  else if (command === 'context' || command === 'review') {
    const env = { ...process.env };
    if (command === 'context') {
      // MCP hosts may inherit only selected environment keys. Restore Windows runtime discovery.
      if (process.platform === 'win32') {
        env.APPDATA ||= path.join(os.homedir(), 'AppData', 'Roaming');
        env.LOCALAPPDATA ||= path.join(os.homedir(), 'AppData', 'Local');
      }
      env.CONTEXT_MODE_PROJECT_DIR ||= process.cwd();
      env.CLAUDE_PROJECT_DIR ||= process.cwd();
    }
    const child = spawn(process.execPath, [command === 'context' ? contextEntry : reviewEntry, ...args], { env, stdio: 'inherit', windowsHide: true, shell: false });
    child.once('error', error => { process.stderr.write(error.message + '\n'); process.exitCode = 1; });
    child.once('close', code => { process.exitCode = code ?? 1; });
  } else if (command === 'status') console.log(JSON.stringify(await status(), null, 2));
  else if (['find', 'read', 'review-prepare'].includes(command)) {
    let request;
    if (args[0] === '-') { let body = ''; for await (const chunk of process.stdin) body += chunk; request = JSON.parse(body); }
    else request = JSON.parse(await fs.readFile(args[0], 'utf8'));
    const handlers = { find: findWorkflow, read: readEntry, 'review-prepare': prepareReview };
    console.log(JSON.stringify(await handlers[command](request), null, 2));
  } else console.log('SeaBridge dev suite: mcp | context | review <OCR arguments> | status | find|read|review-prepare request.json');
} catch (error) { process.stderr.write('SeaBridge dev suite: ' + error.message + '\n'); process.exitCode = 1; }
