import fs from 'node:fs/promises';
import path from 'node:path';
import { newBundle, finish, addEvidence, rea, writeJson, config, httpUrl, loadBundle, digest } from './runtime.mjs';

export async function referenceAnalyze({ source, kind = 'auto', targetId, cdpEndpoint }, options = {}) {
  if (typeof source !== 'string' || !source.trim()) throw new Error('source is required: path, URL, or active-browser');
  const c = await config();
  const bundle = await newBundle('reference', source);
  let result;
  if (source === 'active-browser') {
    const endpoint = cdpEndpoint || c.cdpEndpoint;
    const endpointUrl = httpUrl(endpoint);
    if (!['127.0.0.1', 'localhost', '[::1]'].includes(endpointUrl.hostname)) throw new Error('CDP endpoint must be loopback');
    const targets = await rea(['list-browser-targets', endpoint], options);
    if (!targetId) {
      await writeJson(path.join(bundle.directory, 'targets.json'), targets);
      await addEvidence(bundle, path.join(bundle.directory, 'targets.json'));
      bundle.manifest.limitations.push('CDP cannot reliably identify the OS foreground tab. Select a target ID from targets.json, or pass the active URL from your agent browser tool.');
      return finish(bundle);
    }
    result = { page: await rea(['inspect-web-page', endpoint, targetId, '--include-script-sources'], options), architecture: await rea(['analyze-web-bundle', endpoint, targetId], options), screenshot: await rea(['capture-web-screenshot', endpoint, targetId], options) };
  } else if (/^https?:\/\//i.test(source)) {
    httpUrl(source);
    if (!c.browserExecutable) throw new Error('Set browserExecutable in workspace.local.json, or use active-browser with an existing CDP session');
    const scenario = { browser: { mode: 'launch', executable_path: c.browserExecutable }, start_url: { url: source }, actions: [{ step_id: 'settle', action: 'wait_for_timeout', duration_ms: 1500 }], capture: { at_end: ['url', 'dom', 'accessibility', 'screenshot'] } };
    const scenarioFile = path.join(bundle.directory, 'scenario.json');
    await writeJson(scenarioFile, scenario);
    result = await rea(['capture-browser-scenario', scenarioFile], options);
    bundle.manifest.limitations.push('Website evidence exposes browser-visible behavior only. For script/module architecture, attach a CDP target and analyze-web-bundle.');
  } else {
    if (!path.isAbsolute(source)) throw new Error('Desktop references require an absolute path');
    const stat = await fs.stat(source);
    const ext = path.extname(source).toLowerCase();
    const resolvedKind = kind === 'auto' ? (['.png', '.jpg', '.jpeg', '.webp'].includes(ext) ? 'image' : stat.isDirectory() || ['.asar', '.js', '.mjs', '.cjs'].includes(ext) ? 'javascript' : 'artifact') : kind;
    if (!['image', 'javascript', 'artifact', 'native', 'managed', 'android'].includes(resolvedKind)) throw new Error('Unsupported reference kind');
    bundle.manifest.inputKind = resolvedKind;
    if (resolvedKind === 'image') {
      if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) throw new Error('Image references require PNG, JPEG or WebP files');
      if (stat.size > 10 * 1024 * 1024) throw new Error('Image must be at most 10 MiB');
      const imageBytes = await fs.readFile(source);
      const valid = ext === '.png' ? imageBytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) : ext === '.webp' ? imageBytes.toString('ascii', 0, 4) === 'RIFF' && imageBytes.toString('ascii', 8, 12) === 'WEBP' : imageBytes[0] === 255 && imageBytes[1] === 216;
      if (!valid) throw new Error('Image content does not match its declared format');
      const copy = path.join(bundle.directory, `reference${ext}`);
      await fs.copyFile(source, copy, fs.constants.COPYFILE_EXCL);
      await addEvidence(bundle, copy, { type: 'image' });
      bundle.manifest.limitations.push('Screenshot observations require the calling agent\'s vision model; a screenshot cannot decompile code or reveal hidden architecture.');
      // REA inventories the image artifact while the agent performs semantic vision.
      try { result = await rea(['inspect-artifact', source], options); }
      catch (error) { result = { unavailable: error.message }; bundle.manifest.limitations.push('REA does not decode screenshot semantics; image evidence is available for host vision analysis.'); }
    } else {
      const commands = { javascript: 'analyze-javascript-application', artifact: 'inspect-artifact', native: 'analyze', managed: 'inspect-managed-members', android: 'inspect-android-package' };
      result = await rea([commands[resolvedKind], source], options);
      if (resolvedKind === 'artifact') bundle.manifest.limitations.push('Artifact inventory only. Select native/managed/android explicitly for deeper analysis; native decompilation requires a configured Ghidra, IDA or Hopper provider.');
    }
    if (stat.isFile()) bundle.manifest.sourceSha256 = await addSourceDigest(source);
  }
  await extractScreenshots(bundle, result);
  const file = path.join(bundle.directory, 'rea.json');
  await writeJson(file, result);
  await addEvidence(bundle, file, { type: 'rea' });
  return finish(bundle);
}
async function extractScreenshots(bundle, result) {
  const visited = new Set();
  let count = 0;
  async function visit(value) {
    if (!value || typeof value !== 'object') return;
    if (value.media_type === 'image/png' && typeof value.data_base64 === 'string' && !visited.has(value.sha256)) {
      const file = path.join(bundle.directory, `browser-${++count}.png`);
      await fs.writeFile(file, Buffer.from(value.data_base64, 'base64'), { flag: 'wx' });
      const { digest } = await import('./runtime.mjs');
      if (await digest(file) !== value.sha256) throw new Error('REA screenshot digest mismatch');
      visited.add(value.sha256);
      await addEvidence(bundle, file, { type: 'image' });
    }
    for (const child of Object.values(value)) if (typeof child === 'object') await visit(child);
  }
  await visit(result);
}
async function addSourceDigest(file) { const { digest } = await import('./runtime.mjs'); return digest(file); }

export async function saveBlueprint({ bundleId, visionConfirmed = false, workflows, architecture, unknowns }) {
  const bundle = await loadBundle(bundleId);
  if (bundle.manifest.evidence.some(item => item.type === 'image') && visionConfirmed !== true) throw new Error('Inspect images with a vision model before saving a blueprint; visionConfirmed is a caller attestation');
  for (const [name, values] of Object.entries({ workflows, architecture })) {
    if (!Array.isArray(values) || !values.length) throw new Error(`${name} must contain at least one evidence-linked finding`);
    for (const value of values) {
      if (!value || typeof value.description !== 'string' || !value.description.trim() || !['observed', 'inferred'].includes(value.confidence)) throw new Error('Each finding needs description and confidence: observed/inferred');
      if (!Array.isArray(value.evidence) || !value.evidence.length || value.evidence.some(ref => !bundle.manifest.evidence.some(item => item.file === ref))) throw new Error('Each finding must link to an existing evidence filename');
      for (const ref of value.evidence) {
        const item = bundle.manifest.evidence.find(evidence => evidence.file === ref);
        if (ref !== path.basename(ref) || await digest(path.join(bundle.directory, ref)) !== item.sha256) throw new Error('Referenced evidence digest changed');
      }
    }
  }
  if (!Array.isArray(unknowns) || unknowns.some(item => typeof item !== 'string')) throw new Error('unknowns must be a string array');
  const blueprint = { schema: 'ecc.rea.blueprint.v1', bundleId, repositories: bundle.manifest.repositories, visionConfirmed, workflows, architecture, unknowns, implementation: { frontend: 'Map observed UI flows to existing components, hooks and HTTP consumers; preserve approved design tokens.', backend: 'Map supported behavior to existing endpoints, schemas and services; validate contracts and tenant boundaries.', acceptance: 'Compare implementation to cited reference states; test Save/reopen and attachments where applicable.' } };
  const filename = `blueprint-${Date.now()}.json`;
  await writeJson(path.join(bundle.directory, filename), blueprint);
  return { file: path.join(bundle.directory, filename), blueprint };
}
