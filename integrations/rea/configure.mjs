#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT } from './runtime.mjs';

// Create-only local configuration, independent of an agent vendor or working directory.
export async function configure({ frontend, backend, browserExecutable } = {}) {
  const defaults = JSON.parse(await fs.readFile(path.join(ROOT, 'workspace.example.json'), 'utf8'));
  defaults.repositories = { frontend: path.resolve(frontend || path.join(ROOT, '../../../manageesg-frontend')), backend: path.resolve(backend || path.join(ROOT, '../../../manageesg-backend')) };
  for (const file of Object.values(defaults.repositories)) await fs.access(file);
  if (!browserExecutable && process.platform === 'win32') {
    for (const file of [path.join(process.env.ProgramFiles || 'C:/Program Files', 'Google/Chrome/Application/chrome.exe'), path.join(process.env['ProgramFiles(x86)'] || 'C:/Program Files (x86)', 'Microsoft/Edge/Application/msedge.exe')]) {
      try { await fs.access(file); browserExecutable = file; break; } catch { /* Next candidate. */ }
    }
  }
  defaults.browserExecutable = browserExecutable || null;
  const cli = path.join(ROOT, 'cli.mjs');
  const servers = { rea: { command: process.execPath, args: [cli, 'upstream', '--mcp'] }, 'rea-reference': { command: process.execPath, args: [cli, 'mcp'] } };
  const outputs = {
    'workspace.local.json': JSON.stringify(defaults, null, 2),
    'mcp.local.json': JSON.stringify({ mcpServers: servers }, null, 2),
    'opencode.local.json': JSON.stringify({ mcp: Object.fromEntries(Object.entries(servers).map(([name, value]) => [name, { type: 'local', command: [value.command, ...value.args], enabled: true, timeout: 600000 }])) }, null, 2),
    'codex.local.toml': Object.entries(servers).map(([name, value]) => `[mcp_servers.${name}]\ncommand = ${JSON.stringify(value.command)}\nargs = ${JSON.stringify(value.args)}\nstartup_timeout_sec = 60\ntool_timeout_sec = 600`).join('\n\n'),
  };
  for (const [file, text] of Object.entries(outputs)) {
    try { await fs.writeFile(path.join(ROOT, file), text + '\n', { flag: 'wx' }); }
    catch (error) { if (error.code !== 'EEXIST') throw error; }
  }
  return { directory: ROOT, configurations: Object.keys(outputs), repositories: defaults.repositories };
}
if (process.argv[1] === new URL(import.meta.url).pathname || process.argv[1]?.endsWith('configure.mjs')) {
  const options = process.argv[2] ? JSON.parse(await fs.readFile(process.argv[2], 'utf8')) : {};
  console.log(JSON.stringify(await configure(options), null, 2));
}
