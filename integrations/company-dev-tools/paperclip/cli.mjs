import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
const root = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const inheritedEnv = { ...process.env };
for (const key of Object.keys(inheritedEnv)) if (key.startsWith('PAPERCLIP_') || key === 'DATABASE_URL') delete inheritedEnv[key];
const child = spawn(process.execPath, [path.join(root, 'runtime/node_modules/paperclipai/dist/index.js'), ...args], {
  cwd: root, stdio: 'inherit', windowsHide: true,
  env: { ...inheritedEnv, PAPERCLIP_HOME: path.join(root, 'state'), PAPERCLIP_INSTANCE_ID: 'seabridge', PAPERCLIP_CONFIG: path.join(root, 'state/instances/seabridge/config.json'), PAPERCLIP_TELEMETRY_DISABLED: '1', DO_NOT_TRACK: '1', HEARTBEAT_SCHEDULER_ENABLED: 'false', HOST: '127.0.0.1', PORT: '3183', SERVE_UI: 'true', NODE_OPTIONS: '--max-old-space-size=768' }
});
child.on('error', error => { console.error(error.message); process.exitCode = 1; });
child.on('exit', code => { process.exitCode = code ?? 1; });
