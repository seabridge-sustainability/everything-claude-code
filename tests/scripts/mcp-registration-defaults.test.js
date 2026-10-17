'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const { pathToFileURL } = require('node:url');
const testUrl = pathToFileURL(__filename);
let assertSameMcpLaunch, registerClaudeSpecialists, codexSpecialistBlock;
test.before(async () => {
  ({ assertSameMcpLaunch, registerClaudeSpecialists, codexSpecialistBlock } =
    await import('../../integrations/dev-suite/mcp-registration.mjs'));
});
const toml = require('@iarna/toml');
const launch = { command: 'C:\\Program Files\\nodejs\\node.exe', args: ['C:\\repo\\specialist.mjs', 'mcp'] };

test('new Codex specialists parse disabled with exact Windows command and arguments', () => {
  const parsed = toml.parse(codexSpecialistBlock('test-specialist', launch));
  assert.deepEqual(parsed.mcp_servers['test-specialist'], { enabled: false, ...launch });
});
test('existing disabled Codex choice and task-specific limits remain unchanged', () => {
  const existing = { ...launch, enabled: false, tool_timeout_sec: 31, env: { TEST_FIXTURE: 'retained' } };
  const before = structuredClone(existing);
  assertSameMcpLaunch(existing, launch);
  assert.deepEqual(existing, before);
});
test('existing explicitly enabled OpenCode specialist remains enabled', () => {
  const existing = { type: 'local', command: [launch.command, ...launch.args], enabled: true };
  assertSameMcpLaunch(existing, { ...existing, enabled: false });
  assert.equal(existing.enabled, true);
});
test('different command, arguments or transport fail closed', () => {
  assert.throws(() => assertSameMcpLaunch({ ...launch, command: 'other' }, launch));
  assert.throws(() => assertSameMcpLaunch({ ...launch, args: ['other'] }, launch));
  assert.throws(() => assertSameMcpLaunch({ type: 'remote', command: [] }, { type: 'local', command: [] }));
});
test('existing Claude disabled and rejected choices are byte-equivalent after rerun', () => {
  const config = { mcpServers: { rea: launch }, projects: { project: {
    disabledMcpServers: ['rea', 'other'], rejectedMcpjsonServers: ['rea'],
    enabledMcpjsonServers: ['core'], permissions: { allow: ['fixture'] }
  } }, hooks: { fixture: true } };
  const before = structuredClone(config);
  assert.deepEqual(registerClaudeSpecialists(config, { rea: launch }), []);
  assert.deepEqual(config, before);
});
test('new Claude specialists opt out in existing projects without deleting prior choices', () => {
  const config = { projects: { first: { disabledMcpServers: ['other'], rejectedMcpjsonServers: ['other'] }, second: {}, absent: null } };
  registerClaudeSpecialists(config, { rea: launch });
  assert.deepEqual(config.projects.first.disabledMcpServers, ['other', 'rea']);
  assert.deepEqual(config.projects.first.rejectedMcpjsonServers, ['other']);
  assert.deepEqual(config.projects.second.disabledMcpServers, ['rea']);
  assert.equal(config.projects.absent, null);
});
test('new Claude registration is idempotent and preserves core tools/hooks', () => {
  const config = { mcpServers: { core: { command: 'fixture-core' } }, projects: { first: {} }, hooks: { SessionStart: 'fixture' } };
  registerClaudeSpecialists(config, { rea: launch });
  const before = structuredClone(config);
  registerClaudeSpecialists(config, { rea: launch });
  assert.deepEqual(config, before);
});
test('malformed existing choices and conflicting definitions are rejected', () => {
  assert.throws(() => registerClaudeSpecialists({ projects: { a: { disabledMcpServers: 'bad' } } }, { rea: launch }));
  assert.throws(() => registerClaudeSpecialists({ mcpServers: { rea: { ...launch, args: ['different'] } } }, { rea: launch }));
});
test('a late conflicting definition leaves the entire Claude plan unchanged', () => {
  const config = { mcpServers: { existing: { ...launch, args: ['other'] } }, projects: { first: {} } };
  const before = structuredClone(config);
  assert.throws(() => registerClaudeSpecialists(config, { added: launch, existing: launch }));
  assert.deepEqual(config, before);
});
test('malformed late project choices cause no partial registration or project mutation', () => {
  for (const disabledMcpServers of ['invalid', ['other', null]]) {
    const config = { projects: { first: {}, last: { disabledMcpServers } }, hooks: { fixture: true } };
    const before = structuredClone(config);
    assert.throws(() => registerClaudeSpecialists(config, { rea: launch }));
    assert.deepEqual(config, before);
  }
});
test('server names cannot inject TOML sections and arguments must be strings', () => {
  assert.throws(() => codexSpecialistBlock('bad]\n[section', launch));
  assert.throws(() => codexSpecialistBlock('valid', { ...launch, args: [null] }));
});
test('REA installer preserves choices; generated task-local overrides stay available', async () => {
  const source = await fs.readFile(new URL('../../integrations/rea/activate-clients.mjs', testUrl), 'utf8');
  assert.ok(source.includes('registerClaudeSpecialists(c, servers)'));
  assert.ok(source.includes('codexSpecialistBlock(name, server)'));
  assert.ok(!source.includes('project[key].filter'));
  assert.ok(source.includes('codex.local.toml'));
});
for (const name of ['pstack', 'ponytail']) test(`${name} installer defaults off without clobbering existing enablement`, async () => {
  const source = await fs.readFile(new URL(`../../integrations/${name}/configure.mjs`, testUrl), 'utf8');
  assert.ok(source.includes('codexSpecialistBlock(key, stdio)'));
  assert.ok(source.includes('registerClaudeSpecialists(planned'));
  assert.ok(source.includes('assertSameMcpLaunch('));
  assert.ok(source.includes('enabled: false'));
});
