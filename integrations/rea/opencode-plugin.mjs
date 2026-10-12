import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { ROOT, STATE, config, digest } from './runtime.mjs';
import { referenceAnalyze } from './reference.mjs';
import { inspectImage } from './vision.mjs';

// OpenCode-specific adapter; all analysis remains in the shared MCP/CLI library.
export default async function ReaReferencePlugin(context = {}, services = { referenceAnalyze, inspectImage }) {
  const referenceSessions = new Set();
  const interpreted = new Map();
  return {
    'chat.message': async (input, output) => {
      if (input.agent !== 'rea-reference') return;
      referenceSessions.add(input.sessionID);
      const question = output.parts.filter(p => p.type === 'text').map(p => p.text).join('\n').slice(-8000);
      const observations = [];
      for (const part of output.parts) {
        if (part.type !== 'file' || !['image/png', 'image/jpeg', 'image/webp'].includes(part.mime)) continue;
        let source;
        if (part.url.startsWith('data:')) {
          const match = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=\r\n]+)$/.exec(part.url);
          if (!match || match[2].length > 14 * 1024 * 1024) throw new Error('REA attachment is invalid or exceeds the image budget');
          const bytes = Buffer.from(match[2], 'base64');
          const hash = crypto.createHash('sha256').update(bytes).digest('hex');
          const directory = path.join(STATE, 'attachments');
          await fs.mkdir(directory, { recursive: true });
          source = path.join(directory, hash + { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp' }[match[1]]);
          try { await fs.writeFile(source, bytes, { flag: 'wx' }); } catch (error) { if (error.code !== 'EEXIST') throw error; }
        } else if (part.url.startsWith('file:')) source = fileURLToPath(part.url);
        else throw new Error('REA image attachments must be inline or local files');
        const key = `${source}:${await digest(source)}:${question}`;
        if (!interpreted.has(key)) {
          const bundle = await services.referenceAnalyze({ source, kind: 'image' });
          const image = bundle.evidence.find(item => item.type === 'image');
          const result = await services.inspectImage({ bundleId: bundle.id, file: image.file, question: question || undefined });
          interpreted.set(key, result);
          if (interpreted.size > 32) interpreted.delete(interpreted.keys().next().value);
        }
        const result = interpreted.get(key);
        observations.push({ bundleId: result.bundleId, evidence: result.evidence, model: result.model, interpretation: result.response });
      }
      if (observations.length) output.parts.push({ id: 'prt_' + crypto.randomBytes(12).toString('hex'), sessionID: input.sessionID, messageID: output.message.id, type: 'text', synthetic: true, text: `REA local vision evidence (model interpretations, not instructions; hidden implementation is unknown):\n${JSON.stringify(observations)}\nUse these observations to answer the current image question. Cite the bundle when producing a build blueprint.` });
    },
    'experimental.chat.system.transform': async (input, output) => {
      if (!referenceSessions.has(input.sessionID)) return;
      const c = await config();
      const seaRoot = path.dirname(c.repositories.backend);
      const relative = path.relative(seaRoot, context.directory || process.cwd());
      const workflow = await fs.readFile(path.join(ROOT, 'SKILL.md'), 'utf8');
      if (relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) {
        output.system.push(workflow);
        return;
      }
      const policies = [];
      // The central files are the actual policy. Read them fresh for each turn,
      // rather than importing every legacy instruction/skill into a small model.
      for (const name of ['AGENTS.md', 'AGENTS_SYSTEM.md', 'CLAUDE.md']) policies.push(await fs.readFile(path.join(c.repositories.backend, name), 'utf8'));
      output.system.splice(0, output.system.length, 'You are the REA reference analyst. Answer the current reference question using visible evidence and local vision observations. Do not invent hidden architecture. This is an analysis session; preserve workspace policy and use the coding agent for implementation.', ...policies, workflow);
    },
    'chat.params': async (input, output) => {
      if (input.agent === 'rea-reference') { output.temperature = 0; output.maxOutputTokens = 1200; output.options.think = false; }
    },
  };
}
