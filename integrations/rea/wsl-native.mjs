import path from 'node:path';
import { config, REA } from './runtime.mjs';

export function linuxPath(value) {
  if (typeof value !== 'string') return value;
  if (/^[A-Za-z]:[\\/]/.test(value)) return `/mnt/${value[0].toLowerCase()}/${value.slice(3).replaceAll('\\', '/')}`;
  if (value.startsWith('\\\\')) throw new Error('WSL native analysis requires a local drive path, not UNC');
  return value;
}
const HOST_PATH_TOOLS = new Set(['open_binary', 'inspect_packet_capture', 'inspect_packet_fields', 'inspect_pcap_capture', 'decode_signal_recording', 'inspect_android_package', 'inspect_android_class', 'inspect_android_method', 'search_android_classes', 'trace_android_references', 'inspect_binary_layout', 'inspect_wasm_artifact', 'inspect_sqlite_database', 'inspect_recorded_crash', 'inspect_firmware_regions', 'extract_firmware', 'recover_javascript_sources', 'decode_android_resources']);
export function translateWslRequest(request) {
  if (request.method !== 'tools/call' || !HOST_PATH_TOOLS.has(request.params?.name)) return request;
  const args = request.params.arguments;
  if (!args) return request;
  for (const field of ['path', 'snapshot_path', 'output_directory']) if (args[field]) args[field] = linuxPath(args[field]);
  for (const field of ['glue_paths', 'candidate_paths', 'additional_paths']) if (Array.isArray(args[field])) args[field] = args[field].map(linuxPath);
  return request;
}
export const NATIVE_COMMANDS = new Set(['analyze', 'inspect', 'decompile', 'function', 'instructions', 'search', 'trace', 'xrefs', 'read-bytes', 'address-to-file-offset', 'annotate-native-function', 'trace-native-values', 'resolve-native-call-targets']);
export async function nativeInvocation(args) {
  const wsl = (await config()).native?.wsl;
  if (!wsl?.distribution) throw new Error('Configure native.wsl before selecting the Linux Ghidra provider');
  for (const key of ['node', 'javaHome', 'ghidraInstallDir']) if (!path.posix.isAbsolute(wsl[key] || '')) throw new Error(`native.wsl.${key} must be an absolute Linux path`);
  const script = linuxPath(REA);
  const overrides = Object.entries(wsl.environment || {}).map(([key, value]) => {
    if (!/^REA_[A-Z0-9_]+$/.test(key) || typeof value !== 'string' || value.includes('\0')) throw new Error('native.wsl.environment accepts only REA_* string variables');
    return `${key}=${value}`;
  });
  const toolBins = [...new Set(['REA_UNBLOB_COMMAND', 'REA_PWNTOOLS_PYTHON'].map(key => wsl.environment?.[key]).filter(value => path.posix.isAbsolute(value || '')).map(value => path.posix.dirname(value)))];
  return { executable: 'wsl.exe', args: ['--distribution', wsl.distribution, '--exec', 'env', `JAVA_HOME=${wsl.javaHome}`, `GHIDRA_INSTALL_DIR=${wsl.ghidraInstallDir}`, 'REA_ANALYSIS_PROVIDER=ghidra', ...overrides, `PATH=${[path.posix.dirname(wsl.node), `${wsl.javaHome}/bin`, ...toolBins, '/usr/local/bin', '/usr/bin', '/bin'].join(':')}`, wsl.node, script, ...args.map(linuxPath)] };
}
