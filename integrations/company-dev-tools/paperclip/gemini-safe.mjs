import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
export function safeGeminiArgs(input) {
  const output = [];
  for (let i = 0; i < input.length; i++) {
    const argument = input[i];
    if (/^(--yolo|-y|--allowed-tools|--allowed-mcp-server-names|--trusted-folders|--dangerously[^=]*)(=|$)/.test(argument)) throw new Error('Permission bypass arguments are forbidden.');
    if (argument === '--approval-mode') {
      const mode = input[++i];
      if (!['default', 'plan', 'yolo'].includes(mode)) throw new Error('Only standard approval or plan mode is supported.');
      output.push('--approval-mode', mode === 'yolo' ? 'default' : mode);
    } else if (argument.startsWith('--approval-mode=')) {
      const mode = argument.slice('--approval-mode='.length);
      if (!['default', 'plan', 'yolo'].includes(mode)) throw new Error('Only standard approval or plan mode is supported.');
      output.push('--approval-mode', mode === 'yolo' ? 'default' : mode);
    } else output.push(argument);
  }
  if (!output.some(item => item === '--approval-mode')) output.push('--approval-mode', 'default');
  return output;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = safeGeminiArgs(process.argv.slice(2));
  if (!args.some((argument, index) => (argument === '--prompt' || argument === '-p') && typeof args[index + 1] === 'string' && args[index + 1].trim())) throw new Error('Supply an explicit owner-approved --prompt before manual dispatch. No inference started.');
  const entry = 'C:/Users/adelm/AppData/Roaming/npm/node_modules/@google/gemini-cli/bundle/gemini.js';
  await fs.access(entry);
  const child = spawn(process.execPath, [entry, ...args], { cwd: process.cwd(), env: process.env, stdio: 'inherit', windowsHide: true, shell: false });
  child.on('error', error => { console.error(error.message); process.exitCode = 1; });
  child.on('exit', code => { process.exitCode = code ?? 1; });
}
