import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT, preparePlan, validateReview, validateSpec, digest, sourceIntegrity, verifyFeature, boundedRun } from '../../integrations/pstack/runtime.mjs';
import { require, catalog, findWorkflow, readEntry } from '../../integrations/dev-suite/runtime.mjs';
import { indexPstack } from '../../integrations/pstack/catalog.mjs';
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');
const jsonc = require('jsonc-parser'), toml = require('@iarna/toml');
const spec = { id: 'pstack-offline-proof', goal: 'Review Pstack guidance without changing app behavior', scopes: [{ repository: 'ecc', paths: ['docs/tools/PSTACK_ECC_GUIDE.md'] }], acceptance: [{ id: 'discovery', scenario: 'Agent discovers the correct primary workflow', proof: 'Exact catalog ID and digest-checked read' }], protectedBehavior: ['Preserve running agents and services'], constraints: ['No product edits or provider calls'] };
function completedReview(packet) {
  const candidates = ['a', 'b'].map(s => ({ id: 'plan-' + s, model: 'fixture-planner-' + s, provider: 'offline-fixture', packetDigest: packet.packetDigest, text: s === 'a' ? 'Reuse ECC catalog and scope controls; run exact discovery and negative tests.' : 'Use ECC catalog, native loaders and receipts; keep application acceptance separate.' }));
  const judgment = { model: 'fixture-judge', provider: 'offline-fixture', candidateDigests: Object.fromEntries(candidates.map(c => [c.id, digest(c)])), chosen: 'plan-a', scores: Object.fromEntries(candidates.map(c => [c.id, Object.fromEntries(packet.rubric.map(k => [k, 2]))])), rationale: 'The fixture selects the smaller design while retaining discovery evidence from B.', blockers: [] };
  return { packet, candidates, judgment, authenticity: 'fixture' };
}

test('complete pinned source verifies every Git blob and SHA256', async () => { assert.equal((await sourceIntegrity()).files, 167); });
test('Pstack routing has one primary and digest-checked adapter reads', async () => {
  for (const [query, name] of [['multi-model planning', 'arena'], ['verification skill', 'create-verification-skill'], ['maintain verification', 'maintain-verification-skill'], ['adversarial review', 'interrogate']]) {
    const found = await findWorkflow({ query });
    assert.equal(found[0].id, 'cursor-pstack/ecc/' + name);
    assert.equal(found.filter(x => x.routingRole === 'primary').length, 1);
    assert.equal((await readEntry({ id: found[0].id })).adapted, true);
  }
});
test('Pstack overlap queries select one primary while generic disciplines keep existing priority', async () => {
  for (const [query, id] of [
    ['architecture multi-model planning', 'cursor-pstack/ecc/arena'],
    ['verification skill for frontend api', 'cursor-pstack/ecc/create-verification-skill'],
    ['maintain verification feature map drift', 'cursor-pstack/ecc/maintain-verification-skill'],
    ['code review adversarial review', 'cursor-pstack/ecc/interrogate']
  ]) {
    const result = await findWorkflow({ query }); assert.equal(result[0].id, id);
    assert.equal(result.filter(x => x.routingRole === 'primary').length, 1);
  }
  for (const [query, name] of [['requested architecture system design','codebase-design'],['debug backend regression','diagnosing-bugs'],['code review','code-review-and-quality']]) {
    const result = await findWorkflow({ query }); assert.equal(result[0].name, name);
    assert.equal(result.filter(x => x.routingRole === 'primary').length, 1);
  }
});
test('native ECC entry references resolve to the canonical skills without another policy source', async () => {
  const entries = ['AGENTS.md','CLAUDE.md','GEMINI.md','CODEX.md','OPENCODE.md','.github/copilot-instructions.md','.cursor/rules/common-agents.md','.agents/rules/seabridge-agent-baseline.md','.opencode/instructions/INSTRUCTIONS.md'];
  for (const entry of entries) {
    const body = await fs.readFile(path.join(ROOT, entry), 'utf8');
    assert.match(body, /PSTACK_ECC_GUIDE\.md/);
    const targets = [...body.matchAll(/\]\(([^)]+)\)/g)].map(x => x[1]).filter(x => /PSTACK_ECC_GUIDE|sea-multi-model-planning|sea-verify-seabridge/.test(x));
    assert.equal(targets.length, 3, entry);
    for (const target of targets) await fs.access(path.resolve(ROOT, path.dirname(entry), target));
    assert.ok(!body.includes('SEABRIDGE_SAFETY_RULE_START'), 'native ECC entry remains a loader: '+entry);
  }
  const guard = await fs.readFile(path.join(ROOT,'.opencode/instructions/SEABRIDGE_BACKEND_GUARDRAILS.md'),'utf8');
  assert.ok(!/explicit written approval from/.test(guard), 'no obsolete email-only approval requirement');
});
test('Pstack catalog indexing is idempotent and preserves all existing workflows', async () => {
  const current = await catalog(), next = await indexPstack(current);
  const byId = c => ({ ...c, skills: [...c.skills].sort((a,b) => a.id.localeCompare(b.id)) });
  assert.deepEqual(byId(next), byId(current));
  assert.deepEqual(await indexPstack(next), next);
  assert.equal(next.skills.filter(s => s.source === 'cursor-pstack').length, 10);
  assert.equal(next.skills.filter(s => !['cursor-pstack','ponytail','ecc-engineering'].includes(s.source)).length, 374);
  assert.equal(next.commands.length, 65);
});
test('offline two-planner/judge protocol is valid but never implementation permission', async () => {
  const packet = await preparePlan(spec), review = completedReview(packet), result = await validateReview(review);
  assert.equal(result.verdict, 'ready-for-owner-review');
  assert.equal(result.implementationAuthorized, false);
  assert.equal(result.providerDiversity, false);
  assert.match(result.runtimeProof, /no LLM judgment proved/);
  assert.equal(packet.permission.providerCallsMade, 0);
});
test('modified packet digest is rejected', async () => {
  const review = completedReview(await preparePlan(spec));
  review.packet.packetDigest = '0'.repeat(64);
  await assert.rejects(validateReview(review), /Stale or modified/);
});
test('a real affected file changing after plan preparation invalidates review', async () => {
  const fixture = 'artifacts/agent-runs/pstack/grounding-fixture-' + Date.now() + '.txt';
  const absolute = path.join(ROOT, fixture); await fs.writeFile(absolute, 'before', { flag: 'wx' });
  try {
    const packet = await preparePlan({ ...spec, scopes: [{ repository: 'ecc', paths: [fixture] }] });
    await fs.writeFile(absolute, 'after');
    await assert.rejects(validateReview(completedReview(packet)), /Stale or modified/);
  } finally { await fs.unlink(absolute); }
});
test('candidate text changed after judging is rejected', async () => {
  const review = completedReview(await preparePlan(spec)); review.candidates[0].text += ' changed';
  await assert.rejects(validateReview(review), /exact completed candidates/);
});
test('missing judge, missing candidate and incomplete rubric cannot pass', async () => {
  const packet = await preparePlan(spec);
  let review = completedReview(packet); delete review.judgment.model; await assert.rejects(validateReview(review), /judge model/);
  review = completedReview(packet); review.candidates.pop(); await assert.rejects(validateReview(review), /independent candidates/);
  review = completedReview(packet); delete review.judgment.scores['plan-a'].verification; await assert.rejects(validateReview(review), /rubric/);
});
test('judge rejection remains a replanning verdict', async () => {
  const review = completedReview(await preparePlan(spec)); review.judgment.chosen = null; review.judgment.blockers = ['Missing required persistence proof'];
  assert.equal((await validateReview(review)).verdict, 'needs-replanning');
});
test('unknown features and path traversal/Windows aliases are denied', async () => {
  await assert.rejects(verifyFeature('../../.env'), /allowlisted/);
  for (const file of ['../AGENTS.md', 'C:/Windows/file', 'a\\b', 'file:stream', 'dir/file.', 'CON', 'dir/../file', 'dir/\u0000file', 'dir/\u001ffile']) assert.throws(() => validateSpec({ ...spec, scopes: [{ repository: 'ecc', paths: [file] }] }), /bounded/);
});
test('a timed-out task-owned child fails without killing unrelated processes', async () => {
  const result = await boundedRun(process.execPath, ['-e', 'setTimeout(()=>{},10000)'], { timeout: 100 });
  assert.match(result.problem, /timed out/);
});
test('Nature recipe reports BLOCKED and cannot claim mocked product proof', async () => {
  const result = await verifyFeature('nature-actions', { persist: false });
  assert.equal(result.verdict, 'BLOCKED'); assert.equal(result.authenticatedProductProof, false); assert.equal(result.appInstancesStarted, 0);
});
test('CLI source verification retains evidence after its owned process exits', async () => {
  const result = await boundedRun(process.execPath, ['integrations/pstack/cli.mjs', 'verify', 'pstack-source']);
  assert.equal(result.exitCode, 0); const receipt = JSON.parse(result.output);
  assert.equal(JSON.parse(await fs.readFile(receipt.artifact, 'utf8')).verdict, 'PASS');
});

test('each saved client configuration starts the real MCP server and invokes plan/review/verification', async () => {
  const registrations = JSON.parse(await fs.readFile(path.join(ROOT, 'integrations/pstack/registrations.json'), 'utf8'));
  const evidence = { schema: 'seabridge.pstack.mcp-proof.v1', checkedAt: new Date().toISOString(), clients: [], providerCalls: 0, nativeAgentModelInvoked: false, limitation: 'Uses actual saved client launch configuration through standard MCP SDK; does not prove native model selection or editor UI discovery.' };
  for (const registration of registrations.clients.filter(c => c.status === 'registered-for-fresh-session')) {
    const raw = await fs.readFile(registration.file, 'utf8');
    const config = registration.name === 'Codex' ? toml.parse(raw) : jsonc.parse(raw);
    const section = registration.name === 'Codex' ? 'mcp_servers' : registration.name === 'OpenCode' ? 'mcp' : registration.name === 'VS Code' ? 'servers' : 'mcpServers';
    const entry = config[section]['seabridge-pstack'];
    const command = Array.isArray(entry.command) ? entry.command[0] : entry.command;
    const args = Array.isArray(entry.command) ? entry.command.slice(1) : entry.args;
    const client = new Client({ name: 'pstack-configuration-proof', version: '1.0.0' });
    const transport = new StdioClientTransport({ command, args, stderr: 'pipe' });
    await client.connect(transport);
    try {
      const tools = (await client.listTools()).tools.map(t => t.name);
      assert.deepEqual(tools.sort(), ['pstack_find_workflow','pstack_read_skill','pstack_prepare_plan','pstack_validate_review','pstack_verify_feature','pstack_factory'].sort());
      const found = await client.callTool({ name: 'pstack_find_workflow', arguments: { query: 'multi-model planning' } });
      assert.ok(!found.isError, found.content[0].text);
      const selected = JSON.parse(found.content[0].text)[0]; assert.equal(selected.id, 'cursor-pstack/ecc/arena');
      const read = await client.callTool({ name: 'pstack_read_skill', arguments: { id: selected.id } });
      assert.ok(!read.isError, read.content[0].text); assert.equal(JSON.parse(read.content[0].text).adapted, true);
      const prepared = await client.callTool({ name: 'pstack_prepare_plan', arguments: { spec } });
      assert.ok(!prepared.isError, prepared.content[0].text);
      const packet = JSON.parse(prepared.content[0].text);
      const reviewed = await client.callTool({ name: 'pstack_validate_review', arguments: completedReview(packet) });
      assert.ok(!reviewed.isError, reviewed.content[0].text);
      assert.equal(JSON.parse(reviewed.content[0].text).implementationAuthorized, false);
      const invalid = completedReview(packet); invalid.candidates[0].text += ' tampered';
      assert.equal((await client.callTool({ name: 'pstack_validate_review', arguments: invalid })).isError, true);
      const verified = await client.callTool({ name: 'pstack_verify_feature', arguments: { feature: 'pstack-source' } });
      assert.ok(!verified.isError, verified.content[0].text);
      const receipt = JSON.parse(verified.content[0].text);
      assert.equal(receipt.verdict, 'PASS'); await fs.access(receipt.artifact);
      evidence.clients.push({ name: registration.name, tools, successfulToolCalls: 5, rejectedTampering: true, verdict: 'PASS' });
    } finally { await client.close(); }
  }
  assert.equal(evidence.clients.length, 6);
  for (const loader of registrations.loaders) {
    const content = await fs.readFile(loader.file, 'utf8');
    assert.ok(content.includes(loader.canonical)); await fs.access(loader.canonical);
  }
  evidence.nativeLoadersVerified = registrations.loaders.length;
  const directory = path.join(ROOT, 'artifacts/agent-runs/pstack'); await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(path.join(directory, 'mcp-proof.json'), JSON.stringify(evidence, null, 2) + '\n');
});
