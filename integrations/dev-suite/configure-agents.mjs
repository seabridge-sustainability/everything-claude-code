import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { require, ROOT } from './runtime.mjs';
import { assertSameMcpLaunch } from './mcp-registration.mjs';
const home = os.homedir(), bridge = path.resolve('integrations/dev-suite/cli.mjs').replaceAll('\\', '/'), node = process.execPath;
const stamp = new Date().toISOString().replaceAll(':', '-');
const backup = path.join(home, '.codex/state/dev-suite-config-backups', stamp);
await fs.mkdir(backup, { recursive: true });
const sid = execFileSync('whoami', ['/user', '/fo', 'csv', '/nh'], { encoding: 'utf8' }).match(/S-1-5-[0-9-]+/)[0];
execFileSync('icacls', [backup, '/inheritance:r', '/grant:r', '*' + sid + ':(OI)(CI)F'], { stdio: 'ignore' });
const additions = {
  'seabridge-dev-suite': { command: node, args: [bridge, 'mcp'] },
  'context-mode': { command: node, args: [bridge, 'context'] },
  'weknora': { command: node, args: [ROOT + '/weknora/mcp-bridge.mjs'] }
};
const receipt = { checkedAt: new Date().toISOString(), scope: 'user across all projects', clients: [], preservedExisting: true, backupDirectory: backup };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
async function save(file, old, next) {
  await fs.writeFile(path.join(backup, path.basename(file) + '-' + crypto.createHash('sha256').update(file).digest('hex').slice(0, 8)), old, { flag: 'wx' });
  if (await fs.readFile(file, 'utf8') !== old) throw Error('Config changed concurrently: ' + file);
  await fs.writeFile(file, next);
}
for (const [label, rel, key] of [['Claude', '.claude.json', 'mcpServers'], ['Gemini', '.gemini/settings.json', 'mcpServers'], ['OpenCode', '.config/opencode/opencode.json', 'mcp']]) {
  const file = path.join(home, rel), old = await fs.readFile(file, 'utf8'), before = JSON.parse(old), after = structuredClone(before);
  after[key] ||= {};
  for (const [name, c] of Object.entries(additions)) {
    const next = label === 'OpenCode' ? { type: 'local', command: [c.command, ...c.args], enabled: name !== 'weknora' } : { ...c };
    if (after[key][name]) assertSameMcpLaunch(after[key][name], next, name);
    else after[key][name] = next;
  }
  for (const [k, v] of Object.entries(before)) if (k !== key && !same(v, after[k])) throw Error('Changed unrelated setting ' + k);
  for (const [k, v] of Object.entries(before[key] || {})) if (!additions[k] && !same(v, after[key][k])) throw Error('Changed prior server ' + k);
  if (label === 'Gemini') { after.mcp ||= {}; after.mcp.excluded = [...new Set([...(after.mcp.excluded || []), 'weknora'])]; }
  await save(file, old, JSON.stringify(after, null, 2) + '\n');
  receipt.clients.push({ name: label, file, servers: Object.keys(additions), preservedPriorServers: Object.keys(before[key] || {}), weknora: label === 'Claude' ? 'start before connecting' : 'registered disabled until started' });
}
const toml = require('@iarna/toml');
const file = path.join(home, '.codex/config.toml'), old = await fs.readFile(file, 'utf8'), before = toml.parse(old);
let next = old;
for (const [name, c] of Object.entries(additions)) {
  const config = { ...c, ...(name === 'weknora' ? { enabled: false } : {}) };
  if (before.mcp_servers?.[name]) { assertSameMcpLaunch(before.mcp_servers[name], config, name); continue; }
  next += '\n[mcp_servers.' + name + ']\ncommand = ' + JSON.stringify(c.command) + '\nargs = ' + JSON.stringify(c.args) + '\n' + (name === 'weknora' ? 'enabled = false\n' : '');
}
const parsed = toml.parse(next);
for (const [k, v] of Object.entries(before)) if (k !== 'mcp_servers' && !same(v, parsed[k])) throw Error('Codex setting changed ' + k);
for (const [k, v] of Object.entries(before.mcp_servers || {})) if (!additions[k] && !same(v, parsed.mcp_servers[k])) throw Error('Codex server changed ' + k);
await save(file, old, next);
receipt.clients.push({ name: 'Codex', file, servers: Object.keys(additions), weknora: 'registered disabled until started' });
const jsonc = require('jsonc-parser'), vs = path.join(home, 'AppData/Roaming/Code/User/mcp.json');
const raw = await fs.readFile(vs, 'utf8'), errors = [], vsBefore = jsonc.parse((raw.replace(/^\uFEFF/, '').trim() ? raw.replace(/^\uFEFF/, '') : '{}'), errors, { allowTrailingComma: true });
if (errors.length) throw Error('VS Code JSONC invalid');
let edited = raw.replace(/^\uFEFF/, '');
for (const [name, c] of Object.entries(additions)) {
  const v = { type: 'stdio', ...c };
  if (vsBefore.servers?.[name] && !same(vsBefore.servers[name], v)) throw Error('VS Code server exists differently');
  edited = jsonc.applyEdits(edited, jsonc.modify(edited, ['servers', name], v, { formattingOptions: { insertSpaces: true, tabSize: 2 } }));
}
const vsAfter = jsonc.parse(edited);
for (const [k, v] of Object.entries(vsBefore.servers || {})) if (!additions[k] && !same(v, vsAfter.servers[k])) throw Error('VS Code prior server changed');
await save(vs, raw, edited);
receipt.clients.push({ name: 'VS Code MCP host', file: vs, servers: Object.keys(additions), weknora: 'start before connecting' });
const skill = await fs.readFile(new URL('./SKILL.md', import.meta.url), 'utf8');
for (const rel of ['.agents/skills/sea-dev-suite', '.claude/skills/sea-dev-suite', '.codex/skills/sea-dev-suite', '.gemini/skills/sea-dev-suite']) {
  const d = path.join(home, rel); await fs.mkdir(d, { recursive: true }); const p = path.join(d, 'SKILL.md');
  try { const old = await fs.readFile(p, 'utf8'); if (old !== skill) throw Error('Existing different skill ' + p); }
  catch (e) { if (e.code !== 'ENOENT') throw e; await fs.writeFile(p, skill, { flag: 'wx' }); }
}
await fs.mkdir('.agents/skills/sea-dev-suite', { recursive: true });
await fs.writeFile('.agents/skills/sea-dev-suite/SKILL.md', skill);
await fs.writeFile('integrations/dev-suite/registrations.json', JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify({ clients: receipt.clients.map(x => x.name), preservedExisting: receipt.preservedExisting }));

