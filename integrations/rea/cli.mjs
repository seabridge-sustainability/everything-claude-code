#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import readline from 'node:readline';
import { REA, PYTHON, config, run, providerEnvironment, upstreamNode } from './runtime.mjs';
import { inspectImage, visionStatus } from './vision.mjs';
import { referenceAnalyze, saveBlueprint } from './reference.mjs';
import { videoPrepare } from './video.mjs';
import { nativeInvocation, NATIVE_COMMANDS, translateWslRequest } from './wsl-native.mjs';

const [command, ...args] = process.argv.slice(2);
try {
  if (command === 'mcp') { const { startMcp } = await import('./mcp.mjs'); await startMcp(); }
  else if (command === 'upstream' || command === 'native') {
    const useWsl = command === 'native' || ((await config()).native?.runtime === 'wsl' && NATIVE_COMMANDS.has(args[0]));
    const invocation = useWsl ? await nativeInvocation(args) : { executable: await upstreamNode(), args: [REA, ...args] };
    const proxy = useWsl && args.includes('--mcp');
    const child = spawn(invocation.executable, invocation.args, { stdio: proxy ? ['pipe', 'pipe', 'pipe'] : 'inherit', windowsHide: true, shell: false, env: await providerEnvironment() });
    let lines;
    if (proxy) {
      // Translate only target/snapshot coordinates. Preserve upstream evidence
      // verbatim, including the Linux host and actual imported path identity.
      lines = readline.createInterface({ input: process.stdin });
      lines.on('line', line => {
        let request;
        try {
          request = translateWslRequest(JSON.parse(line));
          child.stdin.write(JSON.stringify(request) + '\n');
        } catch (error) {
          // Return an explicit protocol error for unsupported path coordinates,
          // rather than making a valid client request wait until its timeout.
          process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: request?.id ?? null, error: { code: -32602, message: error.message } }) + '\n');
        }
      });
      lines.on('close', () => child.stdin.end());
      child.stdin.on('error', () => { lines.close(); process.stdin.pause(); });
      child.stdout.pipe(process.stdout); child.stderr.pipe(process.stderr);
    }
    const closeProxy = () => { if (proxy) { lines?.close(); process.stdin.destroy(); } };
    child.once('error', error => { process.stderr.write(error.message + '\n'); process.exitCode = 1; closeProxy(); });
    child.once('close', code => { process.exitCode = code !== null && code >= 0 ? code : 1; closeProxy(); });
  } else if (['analyze', 'video', 'blueprint', 'read', 'inspect-image'].includes(command)) {
    if (args.length !== 1) throw new Error(`${command} takes one JSON request file, or '-' for stdin`);
    let request;
    if (args[0] === '-') { let text = ''; for await (const chunk of process.stdin) text += chunk; request = JSON.parse(text); }
    else request = JSON.parse(await fs.readFile(args[0], 'utf8'));
    const handlers = { analyze: referenceAnalyze, video: videoPrepare, blueprint: saveBlueprint, 'inspect-image': inspectImage, read: async value => (await import('./mcp.mjs')).readEvidence(value) };
    process.stdout.write(JSON.stringify(await handlers[command](request), null, 2) + '\n');
  } else if (command === 'doctor') {
    const c = await config();
    const checks = {};
    for (const [name, file] of Object.entries({ rea: REA, compiled: path.join(path.dirname(path.dirname(REA)), 'dist/cli.js'), python: PYTHON, model: path.join(c.whisperModel, 'model.bin'), frontend: c.repositories.frontend, backend: c.repositories.backend, browser: c.browserExecutable })) {
      try { if (!file) throw new Error('Not configured'); await fs.access(file); checks[name] = { available: true, path: file }; }
      catch { checks[name] = { available: false, path: file }; }
    }
    for (const tool of ['ffmpeg', 'ffprobe']) {
      try { await run(tool, ['-version'], { timeout: 10000 }); checks[tool] = { available: true }; }
      catch { checks[tool] = { available: false }; }
    }
    try { checks.vision = { available: true, ...await visionStatus() }; }
    catch (error) { checks.vision = { available: false, reason: error.message }; }
    if (c.native) {
      const env = await providerEnvironment();
      try {
        const args = ['doctor', '--provider', 'ghidra', '--format', 'json'];
        const invocation = c.native.runtime === 'wsl' ? await nativeInvocation(args) : { executable: process.execPath, args: [REA, ...args] };
        const native = JSON.parse(await run(invocation.executable, invocation.args, { env }));
        checks.native = { available: native.healthy, provider: 'ghidra', runtime: c.native.runtime || process.platform, checks: native.scope_checks };
      }
      catch (error) { checks.native = { available: false, reason: error.message }; }
    }
    const unavailable = Object.entries(checks).filter(([, check]) => !check.available).map(([name]) => name);
    process.stdout.write(JSON.stringify({ ready: unavailable.length === 0, unavailable, checks, modelRequirement: 'Use a vision-capable calling model or reference_inspect_image with the configured local vision model. Local Whisper handles transcription. Readiness is not actual inference proof; unavailable lanes do not prevent supported static analysis.' }, null, 2) + '\n');
    if (unavailable.length) process.exitCode = 1;
  } else {
    process.stdout.write('ECC REA: doctor | mcp | upstream|native <REA arguments> | analyze|video|blueprint|read|inspect-image <request.json or ->\n');
    if (command && command !== '--help') process.exitCode = 1;
  }
} catch (error) { process.stderr.write(`ECC REA: ${error.message}\n`); process.exitCode = 1; }
