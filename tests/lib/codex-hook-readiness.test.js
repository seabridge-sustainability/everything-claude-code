'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { EventEmitter } = require('node:events');
const { PassThrough, Writable } = require('node:stream');
const { configuration } = require('../../scripts/fresh-agent-session');
const { assertTrustedHooks } = require('../../scripts/lib/codex-hook-readiness');
const cwd = path.resolve(__dirname, '../..');
const cfg = configuration('codex');
function response() {
  return { data: [{ cwd, errors: [], warnings: [], hooks: Object.entries(cfg.hooks).map(([event, groups]) => ({
    eventName: event[0].toLowerCase() + event.slice(1), handlerType: 'command', command: groups[0].hooks[0].command,
    matcher: groups[0].matcher, timeoutSec: groups[0].hooks[0].timeout, async: false, enabled: true,
    trustStatus: 'trusted', currentHash: 'native-opaque-definition-hash',
  })) }] };
}
test('native readiness requires both exact enabled trusted synchronous guard definitions', () => {
  assert.equal(assertTrustedHooks(response(), cwd, cfg).ready, true);
  for (const mutate of [
    r => { r.data = []; }, r => { r.data.push(structuredClone(r.data[0])); },
    r => { r.data[0].cwd = path.dirname(cwd); }, r => { r.data[0].warnings.push('fixture warning'); },
    r => { r.data[0].errors.push('fixture error'); }, r => { r.data[0].hooks.pop(); },
    r => { r.data[0].hooks.push(structuredClone(r.data[0].hooks[0])); },
    ...['handlerType', 'command', 'matcher', 'timeoutSec', 'async', 'enabled', 'trustStatus', 'currentHash']
      .map(field => r => { const h = r.data[0].hooks.find(x => x.eventName === 'preToolUse'); h[field] = { handlerType:'prompt', command:'different', matcher:'Bash', timeoutSec:30,
        async:true, enabled:false, trustStatus:'untrusted', currentHash:null }[field]; }),
  ]) {
    const r = response(); mutate(r); assert.throws(() => assertTrustedHooks(r, cwd, cfg), /Native|Exact/);
  }
});
function probeFixture(behavior = {}) {
  const calls = [], messages = [];
  let child;
  const fakeSpawn = (executable, args, options) => {
    calls.push({ executable, args, options });
    child = new EventEmitter(); child.exitCode = null; child.killed = false;
    child.stdout = new PassThrough(); child.stderr = new PassThrough();
    child.kill = () => { child.killed = true; setImmediate(() => child.emit('close', null)); return true; };
    child.stdin = new Writable({
      write(chunk, encoding, done) {
        const m = JSON.parse(chunk.toString()); messages.push(m);
        if (!behavior.silent) setImmediate(() => {
          if (m.id === 1) child.stdout.write(JSON.stringify({ id: 1, result: {} }) + '\n');
          if (m.id === 2) {
            if (behavior.malformed) child.stdout.write('invalid fixture JSON\n');
            else if (behavior.oversized) child.stdout.write('x'.repeat(1024 * 1024 + 1));
            else {
              const reply = { id: 2, result: behavior.response || response() };
              child.stdout.write(JSON.stringify(reply) + '\n');
              if (behavior.duplicate) child.stdout.write(JSON.stringify(reply) + '\n');
            }
          }
        });
        done();
      },
      final(done) { if (!behavior.silent) setImmediate(() => { child.exitCode = behavior.exit ?? 0; child.emit('close', child.exitCode); }); done(); },
    });
    return child;
  };
  // Explicit protocol fixture, not a native client or interception claim.
  const sandbox = { module: { exports: {} }, process: { platform: process.platform }, require: name => name === 'node:child_process' ? { spawn: fakeSpawn } : require(name), setTimeout, clearTimeout };
  vm.runInNewContext(fs.readFileSync(path.resolve(__dirname, '../../scripts/lib/codex-hook-readiness.js'), 'utf8'), sandbox);
  return { inspect: sandbox.module.exports.inspectCodexHooks, calls, messages, child: () => child };
}
test('native metadata probe sends only handshake/discovery, waits for closure and never starts a model turn', async () => {
  const f = probeFixture();
  const r = await f.inspect({ executable: process.execPath, cwd, overrides: ['-c', 'features.hooks=true'], configuration: cfg, environment: { FIXTURE_ONLY:'1' } });
  assert.equal(r.ready, true);
  assert.deepEqual(f.messages.map(x => x.method), ['initialize', 'initialized', 'hooks/list']);
  assert.equal(f.child().exitCode, 0);
  assert.equal(f.calls[0].options.shell, false);
  assert.equal(f.calls[0].options.cwd, cwd);
  assert.ok(f.calls[0].args.includes('stdio://'));
  assert.equal(f.messages.some(x => /thread|turn|trust|auth/.test(x.method)), false);
});
test('native metadata probe refuses untrusted, malformed, duplicate, oversized, failing and timed-out observations', async () => {
  const untrusted = response(); untrusted.data[0].hooks[0].trustStatus = 'untrusted';
  for (const behavior of [{ response: untrusted }, { malformed: true }, { duplicate: true }, { oversized: true }, { exit:2 }, { silent:true }]) {
    const f = probeFixture(behavior);
    await assert.rejects(f.inspect({ executable: process.execPath, cwd, overrides: [], configuration: cfg, timeoutMs:20 }), /Native|Exact/);
    assert.equal(f.messages.some(x => /thread|turn|trust|auth/.test(x.method)), false);
  }
});
