#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { ROOT, REA, run } from './runtime.mjs';

// Project-local registration only. Existing named servers must never be replaced.
export async function register(repo) {
  repo = await fs.realpath(repo);
  const branch = (await run('git', ['-C', repo, 'branch', '--show-current'])).trim();
  if (branch === 'main' && /manageesg-(frontend|backend)$/.test(repo)) throw new Error('Project registration on application main requires explicit scope; use a development checkout');
  const servers = JSON.parse(await fs.readFile(path.join(ROOT, 'mcp.local.json'), 'utf8')).mcpServers;
  const file = path.join(repo, '.mcp.json');
  let current = {}, original = null;
  try { original = await fs.readFile(file, 'utf8'); current = JSON.parse(original); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const merged = { ...current, mcpServers: { ...current.mcpServers } };
  for (const [name, server] of Object.entries(servers)) {
    if (merged.mcpServers[name] && JSON.stringify(merged.mcpServers[name]) !== JSON.stringify(server)) throw new Error(`Existing MCP server ${name} differs; resolve explicitly`);
    merged.mcpServers[name] = server;
  }
  const codexFile = path.join(repo, '.codex/config.toml');
  let toml = '';
  try { toml = await fs.readFile(codexFile, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const require = createRequire(path.join(path.dirname(path.dirname(REA)), 'package.json'));
  const { parse } = require('smol-toml');
  const parsed = parse(toml);
  const additions = [];
  let codexOutput = toml;
  for (const [name, server] of Object.entries(servers)) {
    const existing = parsed.mcp_servers?.[name];
    if (existing) {
      if (existing.command !== server.command || JSON.stringify(existing.args) !== JSON.stringify(server.args)) throw new Error(`Existing Codex MCP server ${name} differs; resolve explicitly`);
      if (existing.tool_timeout_sec === undefined) {
        const header = `[mcp_servers.${name}]`;
        if (!codexOutput.includes(header)) throw new Error(`Review nonstandard Codex table spelling for ${name}`);
        codexOutput = codexOutput.replace(header, `${header}\ntool_timeout_sec = 600`);
      }
    } else additions.push(`[mcp_servers.${name}]\ncommand = ${JSON.stringify(server.command)}\nargs = ${JSON.stringify(server.args)}\nstartup_timeout_sec = 60\ntool_timeout_sec = 600\n`);
  }
  const skillDir = path.join(repo, '.agents/skills/rea-reference');
  const skillFile = path.join(skillDir, 'SKILL.md');
  const relative = path.relative(skillDir, path.join(ROOT, 'SKILL.md')).replaceAll('\\', '/');
  const skill = `---\nname: rea-reference\ndescription: Use REA for reference apps, browser URLs, screenshots, YouTube demos and local video; produce an evidence-linked build blueprint.\n---\n\nRead and follow [the shared REA workflow](${relative}).\nUse its MCP tools or the CLI from any working directory. Follow the project's instruction loader.\n`;
  let existingSkill;
  try { existingSkill = await fs.readFile(skillFile, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (existingSkill && existingSkill !== skill) throw new Error('Existing REA skill differs; preserve it and review explicitly');
  // Detect concurrent modifications before writing. No auth/provider values are logged.
  let latest = null;
  try { latest = await fs.readFile(file, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (latest !== original) throw new Error('MCP configuration changed concurrently');
  const output = JSON.stringify(merged, null, 2) + '\n';
  if (output !== original) await fs.writeFile(file, output);
  if (additions.length) codexOutput += '\n# ECC REA reference workflows (project-local)\n' + additions.join('\n');
  if (codexOutput !== toml) {
    let latestToml = '';
    try { latestToml = await fs.readFile(codexFile, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (latestToml !== toml) throw new Error('Codex configuration changed concurrently');
    await fs.mkdir(path.dirname(codexFile), { recursive: true });
    await fs.writeFile(codexFile, codexOutput);
  }
  if (!existingSkill) { await fs.mkdir(skillDir, { recursive: true }); await fs.writeFile(skillFile, skill, { flag: 'wx' }); }
  return { repository: repo, servers: Object.keys(servers), configurations: [file, codexFile], skill: skillFile, activation: 'Restart/reconnect the coding agent to load new MCP servers; CLI is available now.' };
}
if (process.argv[1]?.endsWith('register.mjs')) {
  if (!process.argv[2]) throw new Error('Pass one project repository path; user-level/global registration is not performed');
  console.log(JSON.stringify(await register(process.argv[2]), null, 2));
}
