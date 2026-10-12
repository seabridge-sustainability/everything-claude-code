import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const state = path.join(root, 'state');
const instance = path.join(state, 'instances', 'seabridge');
await fs.mkdir(instance, { recursive: true });
await fs.mkdir(path.join(instance, 'secrets'), { recursive: true });
const config = {
  $meta: { version: 1, updatedAt: new Date().toISOString(), source: 'configure' },
  database: { mode: 'embedded-postgres', embeddedPostgresDataDir: path.join(instance, 'db'), embeddedPostgresPort: 54339, backup: { enabled: true, intervalMinutes: 60, retentionDays: 30, dir: path.join(instance, 'backups') } },
  logging: { mode: 'file', logDir: path.join(instance, 'logs') },
  server: { deploymentMode: 'local_trusted', exposure: 'private', bind: 'loopback', host: '127.0.0.1', port: 3183, allowedHostnames: [], serveUi: true },
  auth: { baseUrlMode: 'auto', disableSignUp: true },
  telemetry: { enabled: false }, updates: { checkEnabled: false },
  storage: { provider: 'local_disk', localDisk: { baseDir: path.join(instance, 'storage') }, s3: { bucket: 'paperclip', region: 'us-east-1', prefix: '', forcePathStyle: false } },
  secrets: { provider: 'local_encrypted', strictMode: true, localEncrypted: { keyFilePath: path.join(instance, 'secrets', 'master.key') } }
};
for (const [file, content] of [
  [path.join(instance, 'config.json'), JSON.stringify(config, null, 2) + '\n'],
  [path.join(instance, '.env'), ['PAPERCLIP_AGENT_JWT_SECRET', 'PAPERCLIP_TOOL_ACTION_SIGNING_SECRET', 'BETTER_AUTH_SECRET'].map(name => `${name}=${crypto.randomBytes(32).toString('hex')}`).join('\n') + '\n'],
  [path.join(instance, 'secrets', 'master.key'), crypto.randomBytes(32).toString('hex') + '\n']
]) {
  try { await fs.writeFile(file, content, { flag: 'wx', mode: 0o600 }); }
  catch (error) { if (error.code !== 'EEXIST') throw error; }
}
console.log(JSON.stringify({ config: path.join(instance, 'config.json'), state, port: 3183, scheduler: 'disabled' }));
