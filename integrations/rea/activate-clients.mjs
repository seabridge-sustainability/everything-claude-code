import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import { ROOT, REA, config } from './runtime.mjs';
import { visionConfig } from './opencode-config.mjs';

const require = createRequire(path.join(path.dirname(path.dirname(REA)), 'package.json'));
const { parse: parseToml } = require('smol-toml');
export async function activateClients(home = os.homedir()) {
  const cli = path.join(ROOT, 'cli.mjs');
  const servers = { rea: { command: process.execPath, args: [cli, 'upstream', '--mcp'] }, 'rea-reference': { command: process.execPath, args: [cli, 'mcp'] } };
  if ((await config()).native?.wsl) servers['rea-native'] = { command: process.execPath, args: [cli, 'native', '--mcp'] };
  const plans = [];
  async function jsonPlan(file, update) {
    let original = null;
    try { original = await fs.readFile(file, 'utf8'); } catch (e) { if (e.code !== 'ENOENT') throw e; }
    const c = original === null ? {} : JSON.parse(original.replace(/^\uFEFF/, ''));
    update(c);
    plans.push({ file, original, output: JSON.stringify(c, null, 2) + '\n' });
  }
  const mergeServers = (c, entries) => {
    c.mcpServers ||= {};
    for (const [name, server] of Object.entries(entries)) {
      const existing = c.mcpServers[name];
      if (existing && (existing.command !== server.command || JSON.stringify(existing.args) !== JSON.stringify(server.args))) throw new Error(`Existing ${name} server selects a different command; preserve it for explicit review`);
      c.mcpServers[name] = { ...existing, ...server };
    }
  };
  await jsonPlan(path.join(home, '.claude.json'), c => {
    mergeServers(c, servers);
    for (const project of Object.values(c.projects || {})) {
      if (!project || typeof project !== 'object') continue;
      // Owner-authorized REA servers only; leave every other choice unchanged.
      for (const key of ['disabledMcpServers', 'rejectedMcpjsonServers']) if (Array.isArray(project[key])) project[key] = project[key].filter(name => !Object.hasOwn(servers, name));
    }
  });
  await jsonPlan(path.join(home, '.gemini/settings.json'), c => mergeServers(c, Object.fromEntries(Object.entries(servers).map(([name, s]) => [name, { ...s, timeout: 600000 }]))));
  // The authorized ECC runtime replaced the old trusted ECC checkout. Trust
  // this exact directory only; no parent folder or unrelated project is widened.
  await jsonPlan(path.join(home, '.gemini/trustedFolders.json'), c => {
    const runtime = path.dirname(path.dirname(ROOT));
    const existing = Object.entries(c).find(([folder]) => path.resolve(folder).toLowerCase() === runtime.toLowerCase());
    if (existing && existing[1] !== 'TRUST_FOLDER') throw new Error('Gemini has an explicit different trust choice for the ECC runtime');
    if (!existing) c[runtime] = 'TRUST_FOLDER';
  });
  const openCodeFile = path.join(home, '.config/opencode/opencode.json');
  const bridge = { mcp: Object.fromEntries(Object.entries(servers).map(([name, value]) => [name, { type: 'local', command: [value.command, ...value.args], enabled: true, timeout: 600000 }])) };
  await jsonPlan(openCodeFile, c => {
    const merged = visionConfig(c, bridge, 'qwen3.5-opencode:32k');
    // Preserve the existing default model choice in the persistent user file.
    if (!c.model) delete merged.model; else merged.model = c.model;
    Object.assign(c, merged);
  });
  const file = path.join(home, '.codex/config.toml');
  let original = ''; try { original = await fs.readFile(file, 'utf8'); } catch (e) { if (e.code !== 'ENOENT') throw e; }
  const parsed = parseToml(original);
  let output = original;
  for (const [name, server] of Object.entries(servers)) {
    const existing = parsed.mcp_servers?.[name];
    if (existing) {
      if (existing.command !== server.command || JSON.stringify(existing.args) !== JSON.stringify(server.args)) throw new Error(`Existing Codex ${name} selects a different command`);
      if (existing.tool_timeout_sec === undefined) output = output.replace(`[mcp_servers.${name}]`, `[mcp_servers.${name}]\ntool_timeout_sec = 600`);
    } else output += `\n[mcp_servers.${name}]\ncommand = ${JSON.stringify(server.command)}\nargs = ${JSON.stringify(server.args)}\nstartup_timeout_sec = 60\ntool_timeout_sec = 600\n`;
  }
  plans.push({ file, original: original || null, output });
  // Validate all targets before writes and reject concurrent config changes.
  for (const p of plans) {
    let latest = null; try { latest = await fs.readFile(p.file, 'utf8'); } catch (e) { if (e.code !== 'ENOENT') throw e; }
    if (latest !== p.original) throw new Error('Client configuration changed concurrently: ' + path.basename(p.file));
  }
  const changes = [];
  for (const p of plans) if (p.output !== p.original) { await fs.mkdir(path.dirname(p.file), { recursive: true }); await fs.writeFile(p.file, p.output); changes.push(p.file); }
  // These generated fragments contain only owned commands, never inherited auth.
  await fs.writeFile(path.join(ROOT, 'mcp.local.json'), JSON.stringify({ mcpServers: servers }, null, 2) + '\n');
  await fs.writeFile(path.join(ROOT, 'opencode.local.json'), JSON.stringify(bridge, null, 2) + '\n');
  await fs.writeFile(path.join(ROOT, 'codex.local.toml'), Object.entries(servers).map(([name, value]) => `[mcp_servers.${name}]\ncommand = ${JSON.stringify(value.command)}\nargs = ${JSON.stringify(value.args)}\nstartup_timeout_sec = 60\ntool_timeout_sec = 600`).join('\n\n') + '\n');
  // Report paths and server identities only; never serialize existing auth/env.
  return { clients: ['claude', 'codex', 'gemini', 'opencode'], servers: Object.keys(servers), changed: changes };
}
if (process.argv[1]?.endsWith('activate-clients.mjs')) console.log(JSON.stringify(await activateClients(), null, 2));
