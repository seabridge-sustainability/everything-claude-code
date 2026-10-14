import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT, ID, indexHiggsfield } from '../../integrations/higgsfield/catalog.mjs';
import { catalog, findWorkflow, readEntry, require as suiteRequire } from '../../integrations/dev-suite/runtime.mjs';

test('Higgsfield is an idempotent, provider-free supporting workflow', async () => {
  const current = await catalog();
  assert.deepEqual(await indexHiggsfield(await indexHiggsfield(current)), current);
  const selected = (await findWorkflow({ query: 'Higgsfield brand assets for frontend', profile: 'coding' }))[0];
  assert.equal(selected.id, ID);
  assert.equal(selected.canonicalSkill, 'sea-frontend-ux-reviewer');
  const entry = await readEntry({ id: ID });
  assert.match(entry.content, /higgsfield-ai\/cli/);
  assert.match(entry.content, /distributed GPU training framework/);
  assert.match(entry.content, /D:\/SeaBridgeAI-data\/agent-evidence/);
  assert.match(entry.content, /No generation,\s+upload/);
  assert.ok(current.sources['ecc-higgsfield'].excludedRepository.endsWith('/higgsfield'));
  assert.equal((await fs.readdir(path.join(ROOT, 'integrations/higgsfield'))).includes('catalog.mjs'), true);
});

test('existing MCP transport reads the adapted workflow without calling Higgsfield', async () => {
  const { Client } = suiteRequire('@modelcontextprotocol/sdk/client/index.js');
  const { StdioClientTransport } = suiteRequire('@modelcontextprotocol/sdk/client/stdio.js');
  const client = new Client({ name: 'higgsfield-offline-proof', version: '1.0.0' });
  await client.connect(new StdioClientTransport({ command: process.execPath,
    args: [path.join(ROOT, 'integrations/dev-suite/cli.mjs'), 'mcp'], stderr: 'pipe' }));
  try {
    const result = await client.callTool({ name: 'suite_read_skill', arguments: { id: ID } });
    assert.ok(!result.isError);
    const value = JSON.parse(result.content[0].text);
    assert.equal(value.id, ID);
    assert.match(value.content, /No credential or account state belongs in Git/);
  } finally { await client.close(); }
});
