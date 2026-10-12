import path from 'node:path';
import { config, ROOT } from './runtime.mjs';

export function linuxPath(value) {
  if (typeof value !== 'string') return value;
  if (/^[A-Za-z]:[\\/]/.test(value)) return `/mnt/${value[0].toLowerCase()}/${value.slice(3).replaceAll('\\', '/')}`;
  if (value.startsWith('\\\\')) throw new Error('WSL native analysis requires a local drive path, not UNC');
  return value;
}
export const NATIVE_COMMANDS = new Set(['analyze', 'inspect', 'decompile', 'function', 'instructions', 'search', 'trace', 'xrefs', 'read-bytes', 'address-to-file-offset', 'annotate-native-function', 'trace-native-values', 'resolve-native-call-targets']);
export async function nativeInvocation(args) {
  const wsl = (await config()).native?.wsl;
  if (!wsl?.distribution) throw new Error('Configure native.wsl before selecting the Linux Ghidra provider');
  for (const key of ['node', 'javaHome', 'ghidraInstallDir']) if (!path.posix.isAbsolute(wsl[key] || '')) throw new Error(`native.wsl.${key} must be an absolute Linux path`);
  const script = linuxPath(path.join(ROOT, 'vendor/rea/scripts/rea.mjs'));
  return { executable: 'wsl.exe', args: ['--distribution', wsl.distribution, '--exec', 'env', `JAVA_HOME=${wsl.javaHome}`, `GHIDRA_INSTALL_DIR=${wsl.ghidraInstallDir}`, 'REA_ANALYSIS_PROVIDER=ghidra', `PATH=${path.posix.dirname(wsl.node)}:${wsl.javaHome}/bin:/usr/local/bin:/usr/bin:/bin`, wsl.node, script, ...args.map(linuxPath)] };
}
