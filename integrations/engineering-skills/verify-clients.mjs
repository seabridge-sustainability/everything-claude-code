import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { require } from '../dev-suite/runtime.mjs';
import { ROOT, SUITE, names } from './catalog.mjs';
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');
const jsonc = require('jsonc-parser'), toml = require('@iarna/toml');
const configs = [
  ['Claude', '.claude.json', 'mcpServers'],
  ['Gemini', '.gemini/settings.json', 'mcpServers'],
  ['OpenCode', '.config/opencode/opencode.json', 'mcp'],
  ['VS Code', 'AppData/Roaming/Code/User/mcp.json', 'servers'],
  ['Cursor', '.cursor/mcp.json', 'mcpServers'],
  ['Codex', '.codex/config.toml', 'mcp_servers']
];
const results = [];
for (const [host, rel, section] of configs) {
  const raw = await fs.readFile(path.join(os.homedir(), rel), 'utf8');
  const errors = [], config = rel.endsWith('.toml') ? toml.parse(raw) : jsonc.parse(raw.replace(/^\uFEFF/, ''), errors, { allowTrailingComma: true });
  assert.equal(errors.length, 0, host + ' config parse');
  const key = config[section]?.['seabridge-dev-suite'] ? 'seabridge-dev-suite' : 'seabridge-pstack';
  const server = config[section]?.[key];
  assert.ok(server && server.enabled !== false, host + ' existing shared catalog bridge enabled');
  const command = Array.isArray(server.command) ? server.command[0] : server.command;
  const args = Array.isArray(server.command) ? server.command.slice(1) : server.args;
  // Do not execute a foreign registration while claiming this ECC bridge's proof.
  assert.equal(path.resolve(args[0]), path.join(ROOT, key === 'seabridge-dev-suite' ? 'integrations/dev-suite/cli.mjs' : 'integrations/pstack/cli.mjs'));
  assert.deepEqual(args.slice(1), ['mcp']);
  assert.equal(path.resolve(command), path.resolve(process.execPath));
  const client = new Client({ name: 'ecc-engineering-config-proof', version: '1.0.0' });
  try {
    await client.connect(new StdioClientTransport({ command, args, env: { ...process.env, ...(server.env || {}) }, stderr: 'pipe' }), { timeout: 20000 });
    assert.equal((await client.listTools({}, { timeout: 15000 })).tools.length, 5);
    const coding = await client.callTool({ name: key === 'seabridge-dev-suite' ? 'suite_find_workflow' : 'pstack_find_workflow',
      arguments: { query: 'debug backend regression', profile: 'coding' } }, undefined, { timeout: 15000 });
    assert.ok(!coding.isError, host + ' coding profile');
    const routes = JSON.parse(coding.content[0].text);
    assert.equal(routes[0].name, 'diagnosing-bugs');
    assert.equal(routes[0].routingVersion, 1);
    assert.equal(routes[0].routingProfile, 'coding');
    assert.match(routes[0].routingPolicySha256, /^[a-f0-9]{64}$/);
    assert.ok(routes.every(entry => !['financial-services', 'knowledge-work-plugins'].includes(entry.source)));
    for (const name of names) {
      const found = await client.callTool({ name: key === 'seabridge-dev-suite' ? 'suite_find_workflow' : 'pstack_find_workflow', arguments: { query: `ecc-engineering/ecc/${name}` } }, undefined, { timeout: 15000 });
      assert.ok(!found.isError, host + ' find');
      const entry = JSON.parse(found.content[0].text)[0];
      assert.equal(entry.id, `ecc-engineering/ecc/${name}`); assert.equal(entry.routingRole, 'primary');
      const read = await client.callTool({ name: key === 'seabridge-dev-suite' ? 'suite_read_skill' : 'pstack_read_skill', arguments: { id: entry.id } }, undefined, { timeout: 15000 });
      assert.ok(!read.isError, host + ' digest-checked read');
      const body = JSON.parse(read.content[0].text);
      assert.equal(body.content, (await fs.readFile(path.join(SUITE, entry.file), 'utf8')).replace(/\r\n/g, '\n'));
    }
    const bad = await client.callTool({ name: key === 'seabridge-dev-suite' ? 'suite_read_skill' : 'pstack_read_skill', arguments: { id: '../../.env' } }, undefined, { timeout: 15000 });
    assert.equal(bad.isError, true);
    results.push({ host, server: key, savedConfigurationSha256: crypto.createHash('sha256').update(raw).digest('hex'), sdkStdioProof: true, routingVersion: routes[0].routingVersion,
      routingPolicySha256: routes[0].routingPolicySha256, nativeAgentInvocationProved: false, calls: 8 });
  } finally { await client.close(); }
}
const receipt = { checkedAt: new Date().toISOString(), results, providerCalls: 0, newServices: 0, restartedSessions: 0, limitation: 'Actual saved registrations exercised by MCP SDK, not native UI/agent adoption. Native Codex tool calls are recorded separately.' };
const target = path.join(ROOT, 'artifacts/agent-runs/pstack/engineering-skills/client-proof.json');
await fs.mkdir(path.dirname(target), { recursive: true });
await fs.writeFile(target, JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify({ clients: results.length, calls: results.reduce((n,x)=>n+x.calls,0), providerCalls: 0, nativeAgentInvocationProved: false }));
