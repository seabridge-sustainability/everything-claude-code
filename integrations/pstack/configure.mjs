import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { require } from '../dev-suite/runtime.mjs';
import { ROOT, digest } from './runtime.mjs';
import { assertSameMcpLaunch, registerClaudeSpecialists, codexSpecialistBlock } from '../dev-suite/mcp-registration.mjs';
const jsonc = require('jsonc-parser');
const toml = require('@iarna/toml');
const key = 'seabridge-pstack';
const bridge = path.join(ROOT, 'integrations/pstack/cli.mjs').replaceAll('\\', '/');
const stdio = { command: process.execPath, args: [bridge, 'mcp'] };
const home = os.homedir();
const clients = [
  { name: 'Claude', file: '.claude.json', section: 'mcpServers' },
  { name: 'Gemini', file: '.gemini/settings.json', section: 'mcpServers' },
  { name: 'OpenCode', file: '.config/opencode/opencode.json', section: 'mcp', value: { type: 'local', command: [stdio.command, ...stdio.args], enabled: false } },
  { name: 'VS Code', file: 'AppData/Roaming/Code/User/mcp.json', section: 'servers', value: { type: 'stdio', ...stdio } },
  { name: 'Cursor', file: '.cursor/mcp.json', section: 'mcpServers' },
  { name: 'Codex', file: '.codex/config.toml', section: 'mcp_servers', toml: true },
  { name: 'Antigravity', file: '.gemini/config/mcp_config.json', section: 'mcpServers', optional: true }
];
function parse(raw, isToml) {
  if (isToml) return toml.parse(raw);
  const errors = [];
  const value = jsonc.parse(raw.replace(/^\uFEFF/, '') || '{}', errors, { allowTrailingComma: true });
  if (errors.length || !value || Array.isArray(value)) throw Error('Invalid existing configuration; no overwrite');
  return value;
}
function withoutServer(value, section) { const copy = structuredClone(value); if (copy[section]) { delete copy[section][key]; if (!Object.keys(copy[section]).length) delete copy[section]; } return copy; }
const receipt = { schema: 'seabridge.pstack.registration.v1', checkedAt: new Date().toISOString(), server: key, clients: [], loaders: [], runningSessionsRestarted: 0, modelOverrides: 0, providerCalls: 0 };
// Preflight every existing client and loader before any config mutation.
const changes = [];
for (const client of clients) {
  const file = path.join(home, client.file);
  let raw;
  try { raw = await fs.readFile(file, 'utf8'); } catch (e) {
    if (e.code !== 'ENOENT') throw e;
    if (client.optional) { receipt.clients.push({ name: client.name, status: 'not-installed-config-absent', file }); continue; }
    raw = client.toml ? '' : '{}\n';
  }
  const before = parse(raw, client.toml), value = client.value || stdio;
  if (before[client.section]?.[key]) assertSameMcpLaunch(before[client.section][key], value, `${client.name} Pstack`);
  let next = raw;
  if (!before[client.section]?.[key]) {
    if (client.toml) next += codexSpecialistBlock(key, stdio);
    else {
      next = jsonc.applyEdits(raw, jsonc.modify(raw, [client.section, key], value, { formattingOptions: { insertSpaces: true, tabSize: 2 } }));
      if (client.name === 'Claude') {
        const planned = structuredClone(before);
        registerClaudeSpecialists(planned, { [key]: value });
        for (const [project, settings] of Object.entries(planned.projects || {})) {
          if (!settings || !Array.isArray(settings.disabledMcpServers)) continue;
          next = jsonc.applyEdits(next, jsonc.modify(next, ['projects', project, 'disabledMcpServers'], settings.disabledMcpServers, { formattingOptions: { insertSpaces: true, tabSize: 2 } }));
        }
      }
    }
  }
  const after = parse(next, client.toml);
  const expected = structuredClone(before);
  if (client.name === 'Claude') registerClaudeSpecialists(expected, { [key]: value });
  if (digest(withoutServer(expected, client.section)) !== digest(withoutServer(after, client.section))) throw Error(`Unrelated ${client.name} configuration changed`);
  if (client.name === 'Gemini' && after.mcp?.excluded?.includes(key)) throw Error('Pstack is explicitly excluded in Gemini; preserve owner choice');
  changes.push({ file, raw, next, client, value });
}
const skillPaths = ['.agents/skills', '.claude/skills', '.codex/skills', '.gemini/skills', '.config/opencode/skills', '.copilot/skills', '.cursor/skills'];
const loaders = [];
for (const folder of skillPaths) for (const name of ['sea-multi-model-planning', 'sea-verify-seabridge']) {
  const canonical = path.join(ROOT, 'skills', name, 'SKILL.md').replaceAll('\\', '/');
  const description = name === 'sea-multi-model-planning' ? 'Compare grounded plans with independent critique and owner approval using ECC-controlled Pstack.' : 'Run and maintain evidence-linked SeaBridge feature verification with existing harnesses and explicit proof boundaries.';
  const content = `---\nname: ${name}\ndescription: ${description}\n---\n\nRead the canonical skill at ${canonical}. Follow the current project's instructions and active goal. For SeaBridgeAI, load backend AGENTS.md and AGENTS_SYSTEM.md; outside SeaBridgeAI the local project policy controls. Pstack source defaults grant no authority. Tools: seabridge-pstack MCP plus the shared seabridge-dev-suite catalog; CLI fallback ${bridge}.\n`;
  const file = path.join(home, folder, name, 'SKILL.md');
  try { if (await fs.readFile(file, 'utf8') !== content) throw Error(`Existing different native skill ${file}`); } catch (e) { if (e.code !== 'ENOENT') throw e; }
  loaders.push({ file, content, canonical, name });
}
for (const { file, raw, next, client } of changes) {
  let current = client.toml ? '' : '{}\n';
  try { current = await fs.readFile(file, 'utf8'); } catch (e) { if (e.code !== 'ENOENT') throw e; }
  if (current !== raw) throw Error(`Concurrent config change in ${client.name}; stopped before overwrite`);
  await fs.mkdir(path.dirname(file), { recursive: true });
  if (next !== raw) await fs.writeFile(file, next);
  receipt.clients.push({ name: client.name, status: 'registered-for-fresh-session', file, unrelatedConfigurationPreserved: true, configurationSha256: digest(parse(next, client.toml)) });
}
for (const { file, content, canonical, name } of loaders) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  try { await fs.writeFile(file, content, { flag: 'wx' }); } catch (e) { if (e.code !== 'EEXIST') throw e; if (await fs.readFile(file, 'utf8') !== content) throw Error('Native loader changed concurrently'); }
  receipt.loaders.push({ file, name, canonical });
}
await fs.writeFile(path.join(ROOT, 'integrations/pstack/registrations.json'), JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify({ clients: receipt.clients.map(({ name, status }) => ({ name, status })), loaders: receipt.loaders.length, existingConfigurationPreserved: true, runningSessionsRestarted: 0 }));
