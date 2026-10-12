import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const state = path.join(root, 'state');
const pid = Number(await fs.readFile(path.join(state, 'launcher.pid'), 'utf8'));
if (!Number.isSafeInteger(pid) || pid < 1) throw new Error('Invalid owned launcher PID');
await fs.writeFile(path.join(state, 'stop-request.json'), JSON.stringify({ pid, requestedAt: new Date().toISOString() }) + '\n');
for (let i = 0; i < 120; i++) {
  try {
    const receipt = JSON.parse(await fs.readFile(path.join(state, 'shutdown.json'), 'utf8'));
    if (receipt.pid === pid && receipt.graceful) { console.log(JSON.stringify(receipt)); process.exit(0); }
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await new Promise(resolve => setTimeout(resolve, 500));
}
throw new Error('Graceful shutdown did not complete within60seconds; preserve state and inspect the owned process.');
