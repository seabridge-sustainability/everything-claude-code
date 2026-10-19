import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs/promises';
import { createServer } from 'node:http';
import { ROOT, STATE, REA, config, newBundle, providerEnvironment, nativeEnvironment, run } from '../runtime.mjs';
import { spawn } from 'node:child_process';
import os from 'node:os';
import { pathToFileURL } from 'node:url';

test('active runtime and evidence provenance match the approved release without replacing legacy files', async () => {
  const pin = JSON.parse(await fs.readFile(path.join(ROOT, 'active-upstream.json'), 'utf8'));
  assert.equal(REA, path.resolve(ROOT, pin.entryPoint));
  const installed = JSON.parse(await fs.readFile(path.join(path.dirname(path.dirname(REA)), 'package.json'), 'utf8'));
  assert.equal(installed.version, pin.version);
  const bundle = await newBundle('fixture', 'release-identity');
  assert.equal(bundle.manifest.rea.version, pin.version);
  assert.equal(bundle.manifest.rea.revision, pin.revision);
  const legacy = JSON.parse(await fs.readFile(path.join(ROOT, 'upstream.json'), 'utf8'));
  assert.equal(legacy.version, '6.4.0');
  // A fresh release-only install need not contain the optional legacy checkout.
  // If retained from an earlier install, its entry must remain intact.
  try { await fs.access(path.join(ROOT, 'vendor/rea')); }
  catch (error) { if (error.code === 'ENOENT') return; throw error; }
  assert.ok((await fs.stat(path.join(ROOT, 'vendor/rea/scripts/rea.mjs'))).isFile());
});

test('Windows provider environment preserves inherited Path without duplicate case variants', () => {
  const native = { provider: 'ghidra', ghidraInstallDir: path.resolve('fixture-ghidra'), javaHome: path.resolve('fixture-java') };
  const parent = { Path: 'C:\\Windows\\System32;C:\\Program Files\\nodejs', PRESERVED: 'fixture-value' };
  const before = structuredClone(parent);
  const result = nativeEnvironment(parent, native, 'win32');
  assert.deepEqual(parent, before);
  assert.deepEqual(Object.keys(result).filter(key => key.toLowerCase() === 'path'), ['PATH']);
  assert.equal(result.PATH, path.join(native.javaHome, 'bin') + ';' + parent.Path);
  assert.equal(result.PRESERVED, before.PRESERVED);
  const duplicate = nativeEnvironment({ Path: 'secondary', PATH: 'primary' }, native, 'win32');
  assert.equal(duplicate.PATH, path.join(native.javaHome, 'bin') + ';primary');
  assert.equal(duplicate.Path, undefined);
  const unix = nativeEnvironment({ PATH: '/usr/bin', Path: 'unrelated-value' }, native, 'linux');
  assert.equal(unix.PATH, path.join(native.javaHome, 'bin') + ':/usr/bin');
  assert.equal(unix.Path, 'unrelated-value');
});

test('native proxy exits after child spawn failure even while client stdin stays open', { skip: process.platform !== 'win32', timeout: 8000 }, async () => {
  // Keep this small process-lifecycle fixture off the bulk evidence drive:
  // unrelated package installs there must not determine child startup latency.
  const fixtures = os.tmpdir();
  await fs.mkdir(fixtures, { recursive: true });
  const root = await fs.mkdtemp(path.join(fixtures, 'spawn-exit-'));
  let child;
  try {
    for (const file of ['cli.mjs', 'runtime.mjs', 'reference.mjs', 'video.mjs', 'vision.mjs', 'mcp.mjs', 'wsl-native.mjs']) {
      await fs.copyFile(path.join(ROOT, file), path.join(root, file), 1);
    }
    await fs.writeFile(path.join(root, 'workspace.local.json'), JSON.stringify({ repositories: { frontend: root, backend: root }, whisperModel: '.', native: { provider: 'ghidra', ghidraInstallDir: path.join(root, 'absent-ghidra'), javaHome: path.join(root, 'absent-java'), wsl: { distribution: 'fixture', node: '/fixture/node', javaHome: '/fixture/java', ghidraInstallDir: '/fixture/ghidra' } } }));
    const missingExecutable = path.join(root, 'missing-wsl.exe');
    const preload = path.join(root, 'spawn-failure.mjs');
    await fs.writeFile(preload, `import cp from 'node:child_process'; import {syncBuiltinESMExports} from 'node:module'; const realSpawn=cp.spawn; cp.spawn=(file,args,options)=>realSpawn(file==='wsl.exe'?${JSON.stringify(missingExecutable)}:file,args,options); syncBuiltinESMExports();`);
    const env = { ...process.env };
    for (const key of Object.keys(env)) if (key.toLowerCase() === 'path') delete env[key];
    env.PATH = '';
    // A nonexistent absolute fixture path avoids Windows system search paths.
    // This still exercises a real OS spawn failure; no WSL process can start.
    child = spawn(process.execPath, ['--import', pathToFileURL(preload).href, path.join(root, 'cli.mjs'), 'native', '--mcp'], { env, cwd: root, windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });
    child.stdout.resume();
    let error = '';
    child.stderr.on('data', data => { error += data; });
    const code = await new Promise((resolve, reject) => {
      const timer = setTimeout(() => { child.kill(); reject(new Error('Spawn failure left proxy waiting for client stdin')); }, 4000);
      child.once('error', failure => { clearTimeout(timer); reject(failure); });
      child.once('close', exit => { clearTimeout(timer); resolve(exit); });
    });
    assert.equal(code, 1);
    assert.ok(error.includes(missingExecutable), error);
    assert.match(error, /spawn .*missing-wsl\.exe ENOENT/);
  } finally {
    if (child && child.exitCode === null) child.kill();
    assert.equal(path.dirname(root), fixtures);
    assert.equal((await fs.lstat(root)).isSymbolicLink(), false);
    assert.equal(path.dirname(await fs.realpath(root)), await fs.realpath(fixtures));
    await fs.rm(root, { recursive: true, force: false });
  }
});
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
