import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, config } from './runtime.mjs';

export function visionConfig(current, bridge, model) {
  const provider = structuredClone(current.provider || {});
  provider.ollama ||= {};
  provider.ollama.models ||= {};
  provider.ollama.models[model] = { ...provider.ollama.models[model], attachment: true, modalities: { input: ['text', 'image'], output: ['text'] } };
  if (current.enabled_providers && !current.enabled_providers.includes('ollama')) throw new Error('The current provider whitelist excludes Ollama');
  const mcp = { ...current.mcp };
  for (const [name, server] of Object.entries(bridge.mcp)) {
    if (mcp[name] && JSON.stringify(mcp[name].command) !== JSON.stringify(server.command)) throw new Error(`Existing MCP entry ${name} selects a different command`);
    mcp[name] = { ...mcp[name], ...server, timeout: 600000 };
  }
  const plugin = [...(current.plugin || [])];
  const adapter = pathToFileURL(path.join(ROOT, 'opencode-plugin.mjs')).href;
  if (!plugin.includes(adapter)) plugin.push(adapter);
  const agent = { ...current.agent, 'rea-reference': { description: 'Analyze attached app screenshots and video frames using REA evidence', mode: 'primary', model: `ollama/${model}`, temperature: 0, steps: 3, prompt: 'Use REA local vision observations and image evidence to answer the current reference question. Return concrete visible findings, label inferences and unknowns. Do not implement changes in this analysis session.', permission: { '*': 'deny', 'rea-reference_*': 'allow' } } };
  return { ...current, model: `ollama/${model}`, provider, mcp, plugin, agent };
}
if (process.argv[1]?.endsWith('opencode-config.mjs')) {
  const current = JSON.parse(process.env.OPENCODE_CONFIG_CONTENT || '{}');
  const bridge = JSON.parse(await fs.readFile(path.join(ROOT, 'opencode.local.json'), 'utf8'));
  // The launcher captures this value without logging it; inherited secrets stay
  // in the child environment and are never persisted in the generated fragment.
  process.stdout.write(JSON.stringify(visionConfig(current, bridge, (await config()).vision.model)));
}
