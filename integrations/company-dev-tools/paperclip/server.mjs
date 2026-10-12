import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const state = path.join(root, 'state');
const instance = path.join(state, 'instances/seabridge');
for (const key of Object.keys(process.env)) if (key.startsWith('PAPERCLIP_') || key === 'DATABASE_URL') delete process.env[key];
Object.assign(process.env, { PAPERCLIP_HOME: state, PAPERCLIP_INSTANCE_ID: 'seabridge', PAPERCLIP_CONFIG: path.join(instance, 'config.json'), PAPERCLIP_TELEMETRY_DISABLED: '1', DO_NOT_TRACK: '1', HEARTBEAT_SCHEDULER_ENABLED: 'false', HOST: '127.0.0.1', PORT: '3183', SERVE_UI: 'true' });
const dotenv = await import(pathToFileURL(path.join(root, 'runtime/node_modules/dotenv/lib/main.js')).href);
dotenv.config({ path: path.join(instance, '.env'), quiet: true, override: true });
const { startServer } = await import(pathToFileURL(path.join(root, 'runtime/node_modules/@paperclipai/server/dist/index.js')).href);
const runtime = await startServer();
await fs.writeFile(path.join(state, 'launcher.pid'), String(process.pid));
const stopFile = path.join(state, 'stop-request.json');
let stopping = false;
const watcher = setInterval(async () => {
  if (stopping) return;
  try {
    const request = JSON.parse(await fs.readFile(stopFile, 'utf8'));
    if (request.pid !== process.pid) return;
    stopping = true;
    clearInterval(watcher);
    await runtime.shutdown('SIGTERM');
    await fs.writeFile(path.join(state, 'shutdown.json'), JSON.stringify({ pid: process.pid, graceful: true, stoppedAt: new Date().toISOString() }, null, 2) + '\n');
    process.exit(0);
  } catch (error) { if (error.code !== 'ENOENT') console.error('Owned shutdown request failed: ' + error.message); }
}, 500);
