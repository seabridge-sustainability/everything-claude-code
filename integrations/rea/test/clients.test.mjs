import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';
import { ROOT, STATE, REA, config } from '../runtime.mjs';
import { activateClients } from '../activate-clients.mjs';
import ReaReferencePlugin from '../opencode-plugin.mjs';
import { linuxPath, nativeInvocation, translateWslRequest } from '../wsl-native.mjs';

test('all-client registration preserves opt-in choices, unrelated configuration and idempotence', async () => {
  const home = await fs.mkdtemp(path.join(os.tmpdir(), 'ecc-rea-clients-'));
  await fs.mkdir(path.join(home, '.codex'), { recursive: true });
  await fs.mkdir(path.join(home, '.config/opencode'), { recursive: true });
  await fs.writeFile(path.join(home, '.claude.json'), JSON.stringify({ auth: 'fixture-secret', projects: { existing: { disabledMcpServers: ['unrelated', 'rea-reference'] } }, mcpServers: { other: { command: 'other' } } }));
  const toml = 'service_tier = "priority"\n[agents]\nmax_concurrent_threads_per_session = 10\n';
  await fs.writeFile(path.join(home, '.codex/config.toml'), toml);
  await fs.writeFile(path.join(home, '.config/opencode/opencode.json'), JSON.stringify({ enabled_providers: ['ollama', 'nvidia-nim'], plugin: ['existing-plugin'], model: 'nvidia-nim/glm', provider: { ollama: { whitelist: ['qwen3.5-opencode:32k'] } } }));
  const result = await activateClients(home);
  assert.deepEqual(result.clients, ['claude', 'codex', 'gemini', 'opencode']);
  const claude = JSON.parse(await fs.readFile(path.join(home, '.claude.json'), 'utf8'));
  assert.equal(claude.auth, 'fixture-secret');
  assert.deepEqual(claude.mcpServers.other, { command: 'other' });
  assert.deepEqual(claude.projects.existing.disabledMcpServers, ['unrelated', 'rea-reference', 'rea', 'rea-native']);
  const trusted = JSON.parse(await fs.readFile(path.join(home, '.gemini/trustedFolders.json'), 'utf8'));
  assert.deepEqual(trusted, { [path.dirname(path.dirname(ROOT))]: 'TRUST_FOLDER' });
  const openCode = JSON.parse(await fs.readFile(path.join(home, '.config/opencode/opencode.json'), 'utf8'));
  assert.equal(openCode.model, 'nvidia-nim/glm');
  assert.equal(openCode.plugin[0], 'existing-plugin');
  assert.deepEqual(openCode.provider.ollama.whitelist, ['qwen3.5-opencode:32k']);
  assert.ok((await fs.readFile(path.join(home, '.codex/config.toml'), 'utf8')).startsWith(toml));
  const registeredToml = await fs.readFile(path.join(home, '.codex/config.toml'), 'utf8');
  for (const name of ['rea', 'rea-reference', 'rea-native']) assert.ok(registeredToml.includes(`[mcp_servers.${name}]\nenabled = false`));
  assert.deepEqual((await activateClients(home)).changed, []);
});

test('OpenCode evidence parts carry required identities; updated image bytes bypass cache', async () => {
  await fs.mkdir(path.join(STATE, 'fixtures'), { recursive: true });
  const image = path.join(STATE, 'fixtures/plugin-cache-test.png');
  await fs.writeFile(image, 'fixture-one');
  let calls = 0;
  const hooks = await ReaReferencePlugin({ directory: ROOT }, {
    referenceAnalyze: async () => ({ id: 'test-bundle', evidence: [{ type: 'image', file: 'reference.png' }] }),
    inspectImage: async () => { calls++; return { bundleId: 'test-bundle', evidence: { sha256: 'fixture' }, response: 'fixture-observation' }; },
  });
  const parts = [{ type: 'text', text: 'Read this screenshot' }, { type: 'file', mime: 'image/png', url: pathToFileURL(image).href }];
  const input = { agent: 'rea-reference', sessionID: 'session-fixture' };
  const output = () => ({ message: { id: 'message-fixture' }, parts: structuredClone(parts) });
  const observed = output();
  await hooks['chat.message'](input, observed);
  const added = observed.parts.at(-1);
  assert.match(added.id, /^prt_/);
  assert.equal(added.messageID, 'message-fixture');
  assert.equal(added.sessionID, input.sessionID);
  assert.match(added.text, /fixture-observation/);
  await hooks['chat.message'](input, output());
  assert.equal(calls, 1);
  await fs.writeFile(image, 'fixture-two');
  await hooks['chat.message'](input, output());
  assert.equal(calls, 2);
  const ordinary = output();
  await hooks['chat.message']({ ...input, agent: 'build' }, ordinary);
  assert.deepEqual(ordinary.parts, parts);
  await assert.rejects(hooks['chat.message'](input, { message: { id: 'x' }, parts: [{ type: 'file', mime: 'image/png', url: 'https://remote.test/image.png' }] }), /inline or local/);
  const system = { system: ['original-context'] };
  await hooks['experimental.chat.system.transform']({ sessionID: input.sessionID }, system);
  const c = await config();
  for (const name of ['AGENTS.md', 'AGENTS_SYSTEM.md', 'CLAUDE.md']) assert.ok(system.system.includes(await fs.readFile(path.join(c.repositories.backend, name), 'utf8')));
  const outside = await ReaReferencePlugin({ directory: os.tmpdir() });
  await outside['chat.message'](input, { parts: [], message: { id: 'x' } });
  const external = { system: ['external-policy'] };
  await outside['experimental.chat.system.transform']({ sessionID: input.sessionID }, external);
  assert.equal(external.system[0], 'external-policy');
});

test('WSL provider maps local paths using argument arrays and rejects UNC', async () => {
  assert.equal(linuxPath('C:\\Apps with spaces\\a.exe'), '/mnt/c/Apps with spaces/a.exe');
  assert.equal(linuxPath('0x140001010'), '0x140001010');
  assert.throws(() => linuxPath('\\\\server\\share\\a.exe'), /UNC/);
  if (!(await config()).native?.wsl) return;
  const invocation = await nativeInvocation(['decompile', 'C:/Apps with spaces/a.exe', 'rea_answer']);
  assert.equal(invocation.executable, 'wsl.exe');
  assert.equal(invocation.args.includes('sh'), false);
  assert.equal(invocation.args.includes(linuxPath(REA)), true);
  assert.equal(invocation.args.includes('/mnt/c/Apps with spaces/a.exe'), true);
  assert.equal(invocation.args.at(-1), 'rea_answer');
  for (const [key, value] of Object.entries((await config()).native.wsl.environment || {})) assert.ok(invocation.args.includes(`${key}=${value}`));
});

test('WSL free-provider paths translate only declared host coordinates, not queries or device paths', () => {
  const request = (name, args) => ({ method: 'tools/call', params: { name, arguments: args } });
  const wasm = translateWslRequest(request('inspect_wasm_artifact', { path: 'D:/samples/a.wasm', glue_paths: ['C:/samples/a.js'], candidate_paths: ['/tmp/b.wasm'] }));
  assert.equal(wasm.params.arguments.path, '/mnt/d/samples/a.wasm');
  assert.deepEqual(wasm.params.arguments.glue_paths, ['/mnt/c/samples/a.js']);
  assert.deepEqual(wasm.params.arguments.candidate_paths, ['/tmp/b.wasm']);
  const recovery = translateWslRequest(request('recover_javascript_sources', { path: 'D:/a.js', additional_paths: ['D:/b.js'], output_directory: 'D:/new output' }));
  assert.equal(recovery.params.arguments.output_directory, '/mnt/d/new output');
  assert.deepEqual(recovery.params.arguments.additional_paths, ['/mnt/d/b.js']);
  const adb = request('pull_adb_file', { path: 'C:/device-literal' });
  assert.deepEqual(translateWslRequest(structuredClone(adb)), adb);
  const packet = translateWslRequest(request('inspect_packet_capture', { path: 'D:/a.pcap', display_filter: 'C:/literal' }));
  assert.equal(packet.params.arguments.display_filter, 'C:/literal');
  assert.throws(() => translateWslRequest(request('inspect_sqlite_database', { path: '\\\\server\\db.sqlite' })), /UNC/);
});
