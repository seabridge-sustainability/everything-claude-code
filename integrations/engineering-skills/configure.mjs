import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { ROOT, SUITE, names } from './catalog.mjs';
const folders = ['.agents/skills', '.claude/skills', '.codex/skills', '.gemini/skills', '.config/opencode/skills', '.copilot/skills', '.cursor/skills'];
const changes = [];
// Preflight all loaders first. No client settings, MCP entries, models or running sessions change.
for (const folder of folders) for (const name of names) {
  const canonical = path.join(SUITE, 'skills/ecc-engineering', name, 'SKILL.md').replaceAll('\\', '/');
  const body = await fs.readFile(canonical, 'utf8');
  const description = body.match(/^description: (.+)$/m)[1];
  const content = `---\nname: ${name}\ndescription: ${description}\n---\n\nRead the canonical skill at ${canonical}, or call suite_read_skill with exact ID ecc-engineering/ecc/${name}. Follow the current project's instructions and existing goal. SeaBridgeAI uses backend AGENTS.md and AGENTS_SYSTEM.md; outside SeaBridgeAI, local project policy controls. This loader grants no execution or provider permission.\n`;
  const file = path.join(os.homedir(), folder, name, 'SKILL.md');
  let before = null;
  try { before = await fs.readFile(file, 'utf8'); } catch (e) { if (e.code !== 'ENOENT') throw e; }
  if (before !== null && before !== content) throw Error('Existing different skill loader; preserve it: ' + file);
  changes.push({ file, content, canonical, before });
}
for (const item of changes) {
  await fs.mkdir(path.dirname(item.file), { recursive: true });
  if (item.before === null) {
    try { await fs.writeFile(item.file, item.content, { flag: 'wx' }); }
    catch (e) { if (e.code !== 'EEXIST' || await fs.readFile(item.file, 'utf8') !== item.content) throw e; }
  } else if (await fs.readFile(item.file, 'utf8') !== item.before) throw Error('Loader changed concurrently');
}
const receipt = { checkedAt: new Date().toISOString(), loaders: changes.map(({ file, canonical }) => ({ file, canonical })), clientSettingsChanged: 0, newMcpServers: 0, restartedSessions: 0, providerCalls: 0 };
const target = path.join(ROOT, 'artifacts/agent-runs/pstack/engineering-skills/registrations.json');
await fs.mkdir(path.dirname(target), { recursive: true });
await fs.writeFile(target, JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify({ loaders: receipt.loaders.length, ...Object.fromEntries(['clientSettingsChanged','newMcpServers','restartedSessions','providerCalls'].map(k=>[k,receipt[k]])) }));
