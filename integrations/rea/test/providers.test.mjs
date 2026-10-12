import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs/promises';
import { createServer } from 'node:http';
import { ROOT, STATE, config, providerEnvironment, run } from '../runtime.mjs';
import { referenceAnalyze } from '../reference.mjs';
import { inspectImage, visionStatus } from '../vision.mjs';
import { visionConfig } from '../opencode-config.mjs';

test('native settings reach child REA without altering parent environment', async () => {
  const c = await config();
  if (!c.native) return;
  const parent = process.env.GHIDRA_INSTALL_DIR;
  const env = await providerEnvironment();
  assert.equal(env.GHIDRA_INSTALL_DIR, c.native.ghidraInstallDir);
  assert.equal(env.REA_ANALYSIS_PROVIDER, 'ghidra');
  const output = await run(process.execPath, ['-e', 'process.stdout.write(process.env.GHIDRA_INSTALL_DIR)'], { env });
  assert.equal(output, c.native.ghidraInstallDir);
  assert.equal(process.env.GHIDRA_INSTALL_DIR, parent);
});

test('vision transport uses verified image bytes and rejects remote endpoints and text-only models', async () => {
  let vision = true, observed;
  const server = createServer(async (request, response) => {
    let data = ''; for await (const chunk of request) data += chunk;
    const body = JSON.parse(data);
    response.setHeader('Content-Type', 'application/json');
    if (request.url === '/api/show') response.end(JSON.stringify({ capabilities: vision ? ['vision', 'tools'] : ['tools'] }));
    else { observed = body; response.end(JSON.stringify({ done: true, done_reason: 'stop', message: { content: 'A test pattern is visible' } })); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const selected = { model: 'fixture-vision', endpoint: `http://127.0.0.1:${server.address().port}` };
  try {
    await fs.mkdir(path.join(STATE, 'fixtures'), { recursive: true });
    const filename = path.join(STATE, 'fixtures', 'vision-transport.png');
    await run('ffmpeg', ['-nostdin', '-y', '-v', 'error', '-f', 'lavfi', '-i', 'testsrc=size=80x60', '-frames:v', '1', filename]);
    const bundle = await referenceAnalyze({ source: filename, kind: 'image' });
    const file = bundle.evidence.find(item => item.type === 'image').file;
    const result = await inspectImage({ bundleId: bundle.id, file }, { vision: selected });
    assert.equal(result.model, selected.model);
    assert.equal(observed.messages[1].images[0], (await fs.readFile(filename)).toString('base64'));
    assert.equal(observed.think, false);
    await assert.rejects(visionStatus({ ...selected, endpoint: 'http://example.com' }), /loopback/);
    vision = false;
    await assert.rejects(inspectImage({ bundleId: bundle.id, file }, { vision: selected }), /vision capability/);
    await fs.appendFile(path.join(bundle.directory, file), 'modified');
    await assert.rejects(inspectImage({ bundleId: bundle.id, file }, { vision: selected }), /digest/);
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('OpenCode vision overlay preserves provider whitelist, options and other MCP servers', () => {
  const current = { enabled_providers: ['ollama', 'nvidia-nim'], provider: { ollama: { whitelist: ['qwen3.5-opencode:32k'], options: { baseURL: 'http://localhost:11434/v1' }, models: { 'qwen3.5-opencode:32k': { limit: { context: 32768 } } } }, 'nvidia-nim': { whitelist: ['z-ai/glm-5.3'] } }, mcp: { other: { command: ['other'], enabled: true } } };
  const before = structuredClone(current);
  const result = visionConfig(current, { mcp: { 'rea-reference': { command: ['node', path.join(ROOT, 'cli.mjs'), 'mcp'] } } }, 'qwen3.5-opencode:32k');
  assert.deepEqual(current, before);
  assert.deepEqual(result.enabled_providers, before.enabled_providers);
  assert.deepEqual(result.provider['nvidia-nim'], before.provider['nvidia-nim']);
  assert.deepEqual(result.provider.ollama.whitelist, before.provider.ollama.whitelist);
  assert.equal(result.provider.ollama.models['qwen3.5-opencode:32k'].limit.context, 32768);
  assert.deepEqual(result.provider.ollama.models['qwen3.5-opencode:32k'].modalities.input, ['text', 'image']);
  assert.deepEqual(result.mcp.other, before.mcp.other);
  assert.equal(result.mcp['rea-reference'].timeout, 600000);
});
