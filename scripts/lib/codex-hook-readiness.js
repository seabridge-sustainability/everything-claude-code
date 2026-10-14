'use strict';

// Native metadata only. This module never starts/resumes a thread, executes a
// model turn, approves hook trust, edits config or reads authentication state.
const { spawn } = require('node:child_process');
const readline = require('node:readline');
const path = require('node:path');
const crypto = require('node:crypto');
const normal = value => path.resolve(value).replace(/\\/g, '/')[process.platform === 'win32' ? 'toLowerCase' : 'toString']();
function assertTrustedHooks(response, cwd, configuration) {
  if (!Array.isArray(response?.data) || response.data.length !== 1) throw Error('Native hook discovery is incomplete or ambiguous');
  const row = response.data[0];
  if (typeof row.cwd !== 'string' || normal(row.cwd) !== normal(cwd)
      || !Array.isArray(row.hooks) || !Array.isArray(row.errors) || row.errors.length
      || !Array.isArray(row.warnings) || row.warnings.length) throw Error('Native hook discovery cwd/configuration unavailable');
  const result = [];
  for (const [eventName, nativeEvent] of [['SessionStart', 'sessionStart'], ['PreToolUse', 'preToolUse']]) {
    const groups = configuration?.hooks?.[eventName];
    if (!Array.isArray(groups) || groups.length !== 1 || groups[0].hooks?.length !== 1) throw Error('Exact expected guard definition required');
    const expected = groups[0].hooks[0];
    const found = row.hooks.filter(h => h.eventName === nativeEvent && h.command === expected.command);
    if (found.length !== 1) throw Error('Exact native guard missing or duplicated');
    const hook = found[0];
    if (hook.handlerType !== 'command' || hook.matcher !== groups[0].matcher || hook.timeoutSec !== expected.timeout
        || hook.async !== false || hook.enabled !== true || hook.trustStatus !== 'trusted'
        || typeof hook.currentHash !== 'string' || !hook.currentHash || hook.currentHash.length > 256) {
      throw Error('Native guard disabled, untrusted or different; review the exact definition in /hooks');
    }
    result.push({ eventName: nativeEvent, nativeDefinitionSha256: crypto.createHash('sha256').update(hook.currentHash).digest('hex') });
  }
  return { ready: true, hooks: result, limitation: 'Native discovery/trust only, not interception or all-agent protection' };
}
function inspectCodexHooks({ executable, cwd, overrides, environment, configuration, timeoutMs = 8000 }) {
  if (!path.isAbsolute(executable) || !path.isAbsolute(cwd) || !Array.isArray(overrides)
      || !Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 8000) throw Error('Bounded exact native hook probe required');
  return new Promise((resolve, reject) => {
    const child = spawn(executable, ['app-server', '--listen', 'stdio://', ...overrides],
      { cwd, env: environment, stdio: ['pipe', 'pipe', 'pipe'], shell: false, windowsHide: true });
    let bytes = 0, phase = 'initialize', observed = null, failure = null, settled = false;
    const stop = message => {
      failure ||= message;
      child.stdin.end();
      if (child.exitCode === null && !child.killed) child.kill(); // Only this owned metadata child.
    };
    const finish = code => {
      if (settled) return;
      settled = true; clearTimeout(timer); clearTimeout(closure);
      if (failure || code !== 0 || !observed) reject(Error(failure || 'Native hook discovery exited without verified metadata'));
      else resolve(observed);
    };
    const timer = setTimeout(() => stop('Native hook discovery timeout; no model launch'), timeoutMs);
    // A stuck pipe/process cannot turn the probe into an unbounded wait.
    const closure = setTimeout(() => { stop('Native hook discovery closure unavailable'); finish(null); }, timeoutMs + 1000);
    const send = value => { if (!failure) child.stdin.write(JSON.stringify(value) + '\n'); };
    child.stdin.on('error', () => stop('Native hook discovery input unavailable'));
    child.stderr.on('data', data => { bytes += data.length; if (bytes > 1024 * 1024) stop('Native hook discovery output exceeded bound'); });
    child.stdout.on('data', data => { bytes += data.length; if (bytes > 1024 * 1024) stop('Native hook discovery output exceeded bound'); });
    const lines = readline.createInterface({ input: child.stdout });
    lines.on('line', line => {
      if (failure) return;
      let message;
      try { message = JSON.parse(line); } catch { return stop('Native hook discovery malformed response'); }
      if (message?.id === 1 && phase === 'initialize' && message.result && !message.error) {
        phase = 'hooks'; send({ method: 'initialized', params: {} });
        send({ id: 2, method: 'hooks/list', params: { cwds: [cwd] } });
      } else if (message?.id === 2 && phase === 'hooks' && message.result && !message.error) {
        try { observed = assertTrustedHooks(message.result, cwd, configuration); }
        catch (error) { return stop(error.message); }
        phase = 'closed'; child.stdin.end();
      } else if (Object.hasOwn(message || {}, 'id')) stop('Native hook discovery error, unsolicited or duplicate response');
      else if (typeof message?.method !== 'string') stop('Native hook discovery invalid notification');
    });
    child.once('error', () => { stop('Native hook discovery could not start'); finish(null); });
    child.once('close', finish);
    send({ id: 1, method: 'initialize', params: { clientInfo: { name: 'seabridge_guard_preflight', title: 'SeaBridge Native Guard Preflight', version: '1.0.0' } } });
  });
}
module.exports = { assertTrustedHooks, inspectCodexHooks };
