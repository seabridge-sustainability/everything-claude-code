import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
const root = path.dirname(fileURLToPath(import.meta.url));
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const sources = ['knowledge-work-plugins', 'financial-services', 'mattpocock-skills', 'addyosmani-agent-skills', 'context-mode', 'open-code-review'];
const pins = Object.fromEntries(sources.map(name => [name, { revision: execFileSync('git', ['-C', path.join(root, 'sources', name), 'rev-parse', 'HEAD'], { encoding: 'utf8', windowsHide: true }).trim() }]));
const marketplace = { name: 'seabridge-company-tools', owner: { name: 'SeaBridgeAI' }, plugins: [] };
const catalog = { schema: 'seabridge.dev-suite.catalog.v1', sources: pins, skills: [], commands: [], connectors: [], plugins: [] };
const pluginRoot = path.join(root, 'plugins');
await fs.mkdir(pluginRoot, { recursive: true });
async function walk(directory) {
  const result = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await walk(file));
    else if (entry.isFile()) result.push(file);
  }
  return result;
}
async function index(directory, source, plugin) {
  for (const file of await walk(directory)) {
    const rel = path.relative(directory, file).replaceAll('\\', '/');
    const kind = path.basename(file) === 'SKILL.md' ? 'skills' : rel.startsWith('commands/') && file.endsWith('.md') ? 'commands' : null;
    if (!kind) continue;
    const text = (await fs.readFile(file, 'utf8')).replace(/\r\n/g, '\n');
    const name = kind === 'skills' ? path.basename(path.dirname(file)) : path.basename(file, '.md');
    const description = /^description:\s*["']?(.*?)["']?\s*$/m.exec(text)?.[1] || text.split('\n').find(line => line.startsWith('# '))?.slice(2) || name;
    // Nested skills must retain the SDK/domain path, not just android/ios/web.
    const key = kind === 'skills'
      ? (rel === 'SKILL.md' ? name : rel.replace(/^skills\//, '').replace(/\/SKILL\.md$/, ''))
      : rel.replace(/^commands\//, '').replace(/\.md$/, '');
    catalog[kind].push({ id: `${source}/${plugin}/${key}`, name, source, plugin, description, file: path.relative(root, file).replaceAll('\\', '/'), sha256: sha(text) });
  }
}
for (const source of ['knowledge-work-plugins', 'financial-services']) {
  const sourceRoot = path.join(root, 'sources', source);
  const original = JSON.parse(await fs.readFile(path.join(sourceRoot, '.claude-plugin/marketplace.json'), 'utf8'));
  for (const entry of original.plugins) {
    if (typeof entry.source !== 'string' || !entry.source.startsWith('./')) continue; // No unrequested partner repository fetches.
    const from = path.resolve(sourceRoot, entry.source);
    if (!from.startsWith(sourceRoot + path.sep)) throw new Error('Plugin path escapes pinned source');
    const targetName = `${source === 'financial-services' ? 'fsi' : 'work'}-${entry.name}`;
    const destination = path.join(pluginRoot, targetName);
    try { await fs.access(destination); } catch {
      await fs.cp(from, destination, { recursive: true, force: false, errorOnExist: true, filter: file => path.basename(file) !== '.mcp.json' && path.basename(file) !== '.git' });
      await fs.copyFile(path.join(sourceRoot, 'LICENSE'), path.join(destination, 'UPSTREAM-LICENSE'));
      const manifestFile = path.join(destination, '.claude-plugin/plugin.json');
      const manifest = JSON.parse(await fs.readFile(manifestFile, 'utf8'));
      manifest.name = targetName;
      delete manifest.mcpServers; // External providers require their own authorized accounts; retain their catalog below.
      await fs.writeFile(manifestFile, JSON.stringify(manifest, null, 2) + '\n');
      await fs.writeFile(path.join(destination, '.mcp.json'), JSON.stringify({ mcpServers: {} }, null, 2) + '\n');
      await fs.writeFile(path.join(destination, 'SEABRIDGE-ADAPTATION.md'), `Adapted from ${source} at ${pins[source].revision}. Original license retained.\nOnly the plugin name and connector activation change. External connectors are cataloged and are not silently authenticated.\nFollow the current project's instructions. Company/accounting outputs are drafts; no automatic messages, ledger writes, trades, commits or deployments.\n`);
    }
    try {
      const mcp = JSON.parse(await fs.readFile(path.join(from, '.mcp.json'), 'utf8'));
      for (const [name, value] of Object.entries(mcp.mcpServers || {})) catalog.connectors.push({ plugin: targetName, name, source, url: value.url || null, status: 'requires-provider-account-and-explicit-connection' });
    } catch (e) {
      if (e instanceof SyntaxError) catalog.connectors.push({ plugin: targetName, source, status: 'invalid-upstream-manifest', diagnostic: 'Upstream connector JSON is malformed; localized plugin remains disconnected' });
      else if (e.code !== 'ENOENT') throw e;
    }
    marketplace.plugins.push({ name: targetName, source: `./plugins/${targetName}`, description: entry.description });
    catalog.plugins.push({ name: targetName, source, revision: pins[source].revision });
    await index(destination, source, targetName);
  }
}
for (const [family, source] of [['matt', 'mattpocock-skills'], ['addy', 'addyosmani-agent-skills']]) {
  const familyRoot = path.join(root, 'skills', family);
  await fs.copyFile(path.join(root, 'sources', source, 'LICENSE'), path.join(familyRoot, 'UPSTREAM-LICENSE'));
  for (const folder of await fs.readdir(familyRoot, { withFileTypes: true })) if (folder.isDirectory()) await index(path.join(familyRoot, folder.name), source, folder.name);
}
// Preserve complete shared reference trees for selected skills' relative links.
for (const source of ['mattpocock-skills', 'addyosmani-agent-skills']) {
  const from = path.join(root, 'sources', source, 'references');
  try { await fs.cp(from, path.join(root, 'skills/references', source), { recursive: true, force: false }); } catch (e) { if (e.code !== 'ENOENT') throw e; }
}
const engineering = path.join(pluginRoot, 'sea-engineering');
await fs.mkdir(path.join(engineering, '.claude-plugin'), { recursive: true });
await fs.mkdir(path.join(engineering, 'skills'), { recursive: true });
for (const entry of catalog.skills.filter(item => ['mattpocock-skills', 'addyosmani-agent-skills'].includes(item.source))) {
  const name = `${entry.source === 'mattpocock-skills' ? 'matt' : 'addy'}-${entry.name}`;
  const target = path.join(engineering, 'skills', name);
  try { await fs.access(target); } catch {
    await fs.mkdir(target, { recursive: true });
    await fs.writeFile(path.join(target, 'SKILL.md'), `---\nname: ${name}\ndescription: ${JSON.stringify(entry.description)}\n---\n\nUse the shared sea-dev-suite skill. Retrieve ${entry.id} with suite_read_skill.\nCurrent project instructions supersede upstream workflow defaults. Use this discipline only for the requested task.\n`);
  }
}
await fs.writeFile(path.join(engineering, '.claude-plugin/plugin.json'), JSON.stringify({ name: 'sea-engineering', version: '1.0.0', description: 'Selected Matt Pocock and Addy Osmani engineering disciplines through the shared catalog' }, null, 2) + '\n');
marketplace.plugins.push({ name: 'sea-engineering', source: './plugins/sea-engineering', description: 'Selected engineering disciplines' });
await fs.mkdir(path.join(root, '.claude-plugin'), { recursive: true });
await fs.writeFile(path.join(root, '.claude-plugin/marketplace.json'), JSON.stringify(marketplace, null, 2) + '\n');
for (const kind of ['skills', 'commands']) {
  const ids = catalog[kind].map(entry => entry.id);
  if (new Set(ids).size !== ids.length) throw new Error('Duplicate workflow IDs; catalog publication refused');
}
await fs.writeFile(path.join(root, 'catalog.json'), JSON.stringify(catalog, null, 2) + '\n');
console.log(JSON.stringify({ plugins: marketplace.plugins.length, skills: catalog.skills.length, commands: catalog.commands.length, optionalConnectors: catalog.connectors.length, revisions: pins }));

// Common Addy reference paths are relative to installed skills/addy/<name>.
await fs.cp(path.join(root, "sources/addyosmani-agent-skills/references"), path.join(root, "skills/references"), { recursive: true, force: false });
