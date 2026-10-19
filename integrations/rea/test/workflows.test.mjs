import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { ROOT, STATE, REA, run, loadBundle, config } from '../runtime.mjs';
import { referenceAnalyze, saveBlueprint, scopedRequirements } from '../reference.mjs';
import { videoPrepare } from '../video.mjs';
import { readEvidence } from '../mcp.mjs';
import { register } from '../register.mjs';

await fs.mkdir(path.join(STATE, 'fixtures'), { recursive: true });
const fixture = path.join(STATE, 'fixtures');
const app = path.join(fixture, 'app');
await fs.mkdir(app, { recursive: true });
await fs.writeFile(path.join(app, 'package.json'), JSON.stringify({ name: 'reference-fixture', version: '1.0.0', main: 'main.js' }));
await fs.writeFile(path.join(app, 'main.js'), "const search = require('./search.js'); module.exports = {search};\n");
await fs.writeFile(path.join(app, 'search.js'), 'module.exports = query => query.trim();\n');

test('real REA static app analysis links evidence to both repositories', async () => {
  const result = await referenceAnalyze({ source: app });
  assert.equal(result.inputKind, 'javascript');
  assert.ok(result.repositories.frontend.endsWith('manageesg-frontend'));
  assert.ok(result.repositories.backend.endsWith('manageesg-backend'));
  assert.ok(result.evidence.some(item => item.file === 'rea.json'));
  const contents = await readEvidence({ bundleId: result.id, file: 'rea.json' });
  assert.match(contents.content[0].text, /search/);
});

test('real FFmpeg extracts video/audio, image read verifies digest, blueprint requires vision and provenance', async () => {
  const video = path.join(fixture, 'sample.mp4');
  await run('ffmpeg', ['-nostdin', '-y', '-v', 'error', '-f', 'lavfi', '-i', 'testsrc=size=320x240:rate=10', '-f', 'lavfi', '-i', 'sine=frequency=440:sample_rate=16000', '-t', '6', '-pix_fmt', 'yuv420p', video]);
  const requirements = [{ id: 'pattern', description: 'Visible video test pattern' }];
  const result = await videoPrepare({ source: video, intervalSeconds: 2, durationSeconds: 6, transcribe: true, requirements });
  assert.deepEqual(result.requirements, requirements);
  assert.equal(result.evidence.filter(item => item.type === 'image').length, 3);
  assert.ok(result.evidence.some(item => item.type === 'audio'));
  assert.equal(result.transcription, 'complete');
  const imageFile = result.evidence.find(item => item.type === 'image').file;
  const image = await readEvidence({ bundleId: result.id, file: imageFile });
  assert.equal(image.content[1].type, 'image');
  const finding = { description: 'A test pattern is shown', confidence: 'observed', evidence: [imageFile] };
  const request = { bundleId: result.id, workflows: [finding], architecture: [{ ...finding, confidence: 'inferred' }], unknowns: ['Backend architecture is not observable'] };
  await assert.rejects(saveBlueprint(request), /vision/);
  await assert.rejects(saveBlueprint({ ...request, visionConfirmed: true, workflows: [{ ...finding, evidence: ['missing.json'] }] }), /existing evidence/);
  const saved = await saveBlueprint({ ...request, visionConfirmed: true });
  assert.ok(saved.blueprint.repositories.frontend);
  await assert.rejects(readEvidence({ bundleId: result.id, file: '../../workspace.local.json' }), /registered/);
  await fs.appendFile(path.join(result.directory, imageFile), 'tampered');
  await assert.rejects(readEvidence({ bundleId: result.id, file: imageFile }), /digest/);
  await assert.rejects(saveBlueprint({ ...request, visionConfirmed: true }), /digest/);
});

test('reject unsafe URLs, ambiguous paths, and unbounded media', async () => {
  await assert.rejects(referenceAnalyze({ source: 'relative.exe' }), /absolute/);
  await assert.rejects(referenceAnalyze({ source: 'https://user:password@example.invalid' }), /credentials/); // pragma: allowlist secret -- synthetic invalid-URL refusal fixture
  await assert.rejects(videoPrepare({ source: 'https://evil.invalid/watch?v=1' }), /YouTube/);
  await assert.rejects(videoPrepare({ source: 'x', durationSeconds: 999999 }), /budget/);
  await assert.rejects(videoPrepare({ source: 'x', intervalSeconds: 0 }), /interval/);
  await assert.rejects(loadBundle('../escape'), /Invalid bundle/);
});

test('scoped coverage rejects undeclared, duplicate, missing and inference-only completion', async () => {
  const requirements = [{ id: 'search', description: 'Search trims the query' }, { id: 'export', description: 'CommonJS export exposes search' }];
  assert.throws(() => scopedRequirements([requirements[0], requirements[0]]), /unique ID/);
  assert.throws(() => scopedRequirements([{ id: 'x', description: '  ' }]), /nonempty/);
  const result = await referenceAnalyze({ source: app, requirements });
  assert.deepEqual(result.requirements, requirements);
  const observed = { description: 'Search trims the supplied query', confidence: 'observed', evidence: ['rea.json'] };
  const request = { bundleId: result.id, workflows: [observed, { ...observed, description: 'The CommonJS export exposes search' }], architecture: [{ ...observed, confidence: 'inferred' }], unknowns: [] };
  const covered = { requirementId: 'search', status: 'covered', findings: [{ section: 'workflows', index: 0 }] };
  const draft = await saveBlueprint({ ...request, coverage: [covered] });
  assert.equal(draft.blueprint.coverage.complete, false);
  assert.equal(draft.blueprint.coverage.requirements[1].status, 'unknown');
  await assert.rejects(saveBlueprint({ ...request, coverage: [covered], requireComplete: true }), /coverage incomplete/);
  await assert.rejects(saveBlueprint({ ...request, coverage: [covered, covered] }), /unique declared/);
  await assert.rejects(saveBlueprint({ ...request, coverage: [{ ...covered, requirementId: 'undeclared' }] }), /declared/);
  await assert.rejects(saveBlueprint({ ...request, coverage: [{ ...covered, findings: [{ section: 'architecture', index: 0 }] }] }), /not inferences/);
  await assert.rejects(saveBlueprint({ ...request, coverage: [{ ...covered, findings: [{ section: 'workflows', index: 99 }] }] }), /existing observed/);
  await assert.rejects(saveBlueprint({ ...request, coverage: [{ requirementId: 'export', status: 'unknown', reason: ' ' }] }), /explicit reason/);
  await assert.rejects(saveBlueprint({ ...request, coverage: [covered], requireComplete: 'false' }), /boolean/);
  const allCovered = [covered, { ...covered, requirementId: 'export', findings: [{ section: 'workflows', index: 1 }] }];
  const complete = await saveBlueprint({ ...request, coverage: allCovered, requireComplete: true });
  assert.equal(complete.blueprint.coverage.complete, true);
  await assert.rejects(saveBlueprint({ ...request, coverage: allCovered, unknowns: ['Unresolved scope'], requireComplete: true }), /incomplete/);
  await fs.appendFile(path.join(result.directory, 'rea.json'), 'tamper');
  await assert.rejects(saveBlueprint({ ...request, coverage: allCovered, requireComplete: true }), /digest/);
});

test('legacy unscoped bundles remain drafts and cannot claim complete', async () => {
  const result = await referenceAnalyze({ source: app });
  const finding = { description: 'Static fixture', confidence: 'observed', evidence: ['rea.json'] };
  const request = { bundleId: result.id, workflows: [finding], architecture: [finding], unknowns: [] };
  assert.equal((await saveBlueprint(request)).blueprint.coverage.complete, false);
  await assert.rejects(saveBlueprint({ ...request, requireComplete: true }), /declare requirements/);
});

test('CLI final handoff requires complete observed coverage', async () => {
  const input = path.join(fixture, 'cli-coverage-input.json');
  await fs.writeFile(input, JSON.stringify({ source: app, requirements: [{ id: 'search', description: 'Search behavior' }] }));
  const result = JSON.parse(await run(process.execPath, [path.join(ROOT, 'cli.mjs'), 'analyze', input]));
  const finding = { description: 'Search trims a query', confidence: 'observed', evidence: ['rea.json'] };
  const request = { bundleId: result.id, workflows: [finding], architecture: [finding], unknowns: [], requireComplete: true };
  await fs.writeFile(input, JSON.stringify(request));
  await assert.rejects(run(process.execPath, [path.join(ROOT, 'cli.mjs'), 'blueprint', input]), /coverage incomplete/);
  await fs.writeFile(input, JSON.stringify({ ...request, coverage: [{ requirementId: 'search', status: 'covered', findings: [{ section: 'workflows', index: 0 }] }] }));
  const saved = JSON.parse(await run(process.execPath, [path.join(ROOT, 'cli.mjs'), 'blueprint', input]));
  assert.equal(saved.blueprint.coverage.complete, true);
});

test('MCP client discovers tools, rejects malformed requests and reads a real image', async () => {
  const require = createRequire(path.join(path.dirname(path.dirname(REA)), 'package.json'));
  const { Client } = require('@modelcontextprotocol/client');
  const { StdioClientTransport } = require('@modelcontextprotocol/client/stdio');
  const client = new Client({ name: 'ecc-rea-test', version: '1.0.0' });
  const transport = new StdioClientTransport({ command: process.execPath, args: [path.join(ROOT, 'cli.mjs'), 'mcp'], env: Object.fromEntries(Object.entries(process.env).filter(([, value]) => typeof value === 'string')) });
  try {
    await client.connect(transport);
    const tools = await client.listTools();
    assert.equal(tools.tools.length, 5);
    assert.ok(tools.tools.some(tool => tool.name === 'video_prepare'));
    const prompts = await client.listPrompts();
    assert.equal(prompts.prompts[0].name, 'build_from_reference');
    const blueprintTool = tools.tools.find(tool => tool.name === 'reference_blueprint');
    assert.ok(blueprintTool.inputSchema.properties.coverage);
    assert.ok(blueprintTool.inputSchema.properties.requireComplete);
    const scoped = await client.callTool({ name: 'reference_analyze', arguments: { source: app, requirements: [{ id: 'search', description: 'Search behavior' }] } });
    assert.equal(scoped.isError, undefined);
    const scopedCapture = JSON.parse(scoped.content[0].text);
    assert.equal(scopedCapture.requirements[0].id, 'search');
    const finding = { description: 'Static search evidence', confidence: 'observed', evidence: ['rea.json'] };
    const incomplete = await client.callTool({ name: 'reference_blueprint', arguments: { bundleId: scopedCapture.id, workflows: [finding], architecture: [finding], unknowns: [], requireComplete: true } });
    assert.equal(incomplete.isError, true);
    assert.match(incomplete.content[0].text, /coverage incomplete/);
    const bad = await client.callTool({ name: 'video_prepare', arguments: { source: 'x', intervalSeconds: -1 } });
    assert.equal(bad.isError, true);
    const result = await client.callTool({ name: 'reference_analyze', arguments: { source: path.join(fixture, 'sample.mp4'), kind: 'image' } });
    // A declared image with the wrong extension must fail rather than advertise invalid MIME.
    assert.equal(result.isError, true);
    const image = path.join(fixture, 'screenshot.png');
    await run('ffmpeg', ['-nostdin', '-y', '-v', 'error', '-i', path.join(fixture, 'sample.mp4'), '-frames:v', '1', image]);
    const captured = await client.callTool({ name: 'reference_analyze', arguments: { source: image } });
    assert.notEqual(captured.isError, true);
    const bundle = JSON.parse(captured.content[0].text);
    const read = await client.callTool({ name: 'reference_read_evidence', arguments: { bundleId: bundle.id, file: 'reference.png' } });
    assert.equal(read.content[1].type, 'image');
  } finally { await client.close(); }
});

test('real REA browser capture records DOM and exports readable screenshot evidence', async () => {
  assert.ok((await config()).browserExecutable, 'Configure Chrome/Edge to verify URL capture');
  const server = createServer((_request, response) => { response.setHeader('Content-Type', 'text/html'); response.end('<html><body><h1>Reference Search</h1><input aria-label="Search"><button>Search</button><p>Example results</p></body></html>'); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const bundle = await referenceAnalyze({ source: `http://127.0.0.1:${server.address().port}` });
    const evidence = await readEvidence({ bundleId: bundle.id, file: 'rea.json' });
    assert.match(evidence.content[0].text, /Reference Search/);
    const screenshot = bundle.evidence.find(item => item.type === 'image');
    assert.ok(screenshot);
    const image = await readEvidence({ bundleId: bundle.id, file: screenshot.file });
    assert.equal(image.content[1].mimeType, 'image/png');
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('real upstream MCP server exposes REA static and native analysis tools', async () => {
  const require = createRequire(path.join(path.dirname(path.dirname(REA)), 'package.json'));
  const { Client } = require('@modelcontextprotocol/client');
  const { StdioClientTransport } = require('@modelcontextprotocol/client/stdio');
  const client = new Client({ name: 'rea-upstream-test', version: '1.0.0' });
  try {
    await client.connect(new StdioClientTransport({ command: process.execPath, args: [path.join(ROOT, 'cli.mjs'), 'upstream', '--mcp'], env: Object.fromEntries(Object.entries(process.env).filter(([, value]) => typeof value === 'string')) }));
    let cursor;
    const names = [];
    do { const result = await client.listTools(cursor ? { cursor } : {}); names.push(...result.tools.map(tool => tool.name)); cursor = result.nextCursor; } while (cursor);
    assert.ok(names.includes('analyze_javascript_application'));
    assert.ok(names.includes('inspect_web_page'));
    assert.ok(names.length > 20);
  } finally { await client.close(); }
});

test('project registration preserves existing MCP/TOML entries, is idempotent, and rejects collisions', async () => {
  const repo = path.join(fixture, `project-${Date.now()}`);
  await fs.mkdir(path.join(repo, '.codex'), { recursive: true });
  await run('git', ['init', repo]);
  const original = { mcpServers: { existing: { command: 'local-tool', args: ['serve'] } } };
  await fs.writeFile(path.join(repo, '.mcp.json'), JSON.stringify(original));
  const toml = '[features]\nweb_search_request = true\n';
  await fs.writeFile(path.join(repo, '.codex/config.toml'), toml);
  await register(repo);
  const merged = JSON.parse(await fs.readFile(path.join(repo, '.mcp.json'), 'utf8'));
  assert.deepEqual(merged.mcpServers.existing, original.mcpServers.existing);
  const registered = await fs.readFile(path.join(repo, '.codex/config.toml'), 'utf8');
  assert.ok(registered.startsWith(toml));
  await register(repo);
  assert.equal(await fs.readFile(path.join(repo, '.codex/config.toml'), 'utf8'), registered);
  merged.mcpServers.rea = { command: 'different-command' };
  await fs.writeFile(path.join(repo, '.mcp.json'), JSON.stringify(merged));
  await assert.rejects(register(repo), /differs/);
  assert.equal(await fs.readFile(path.join(repo, '.codex/config.toml'), 'utf8'), registered);
});

test('existing CDP target is mapped by REA and remains open after capture', async () => {
  const require = createRequire(path.join(path.dirname(path.dirname(REA)), 'package.json'));
  const { chromium } = require('playwright-core');
  const c = await config();
  const profile = path.join(fixture, `browser-profile-${Date.now()}`);
  const server = createServer((_request, response) => { response.setHeader('Content-Type', 'text/html'); response.end('<html><body><h1>Attached Reference</h1><script>window.referenceVersion = 1</script></body></html>'); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let context;
  try {
    context = await chromium.launchPersistentContext(profile, { executablePath: c.browserExecutable, headless: true, args: ['--remote-debugging-port=0', '--remote-debugging-address=127.0.0.1'] });
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    const port = (await fs.readFile(path.join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0];
    const endpoint = `http://127.0.0.1:${port}`;
    const listing = await referenceAnalyze({ source: 'active-browser', cdpEndpoint: endpoint });
    const { directory } = await loadBundle(listing.id);
    const targets = JSON.parse(await fs.readFile(path.join(directory, 'targets.json'), 'utf8'));
    let targetId;
    function find(value) {
      if (!value || typeof value !== 'object') return;
      if (value.target_id && JSON.stringify(value).includes(page.url())) targetId = value.target_id;
      for (const child of Object.values(value)) if (typeof child === 'object') find(child);
    }
    find(targets);
    assert.ok(targetId, 'CDP listing includes the explicitly selected fixture page');
    const result = await referenceAnalyze({ source: 'active-browser', cdpEndpoint: endpoint, targetId });
    assert.ok(result.evidence.some(item => item.type === 'image'));
    assert.equal(await page.locator('h1').innerText(), 'Attached Reference');
    assert.equal(page.isClosed(), false);
  } finally {
    if (context) await context.close();
    await new Promise(resolve => server.close(resolve));
  }
});
