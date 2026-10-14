import { require, findWorkflow, readEntry } from '../dev-suite/runtime.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT, preparePlan, validateReview, verifyFeature, features } from './runtime.mjs';
import { registerFactoryTool } from '../software-factory/mcp.mjs';
import { factoryRequest } from '../software-factory/runtime.mjs';
const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { z } = require('zod');
export async function startMcp({ canary = false } = {}) {
  const server = new McpServer({ name: 'seabridge-pstack', version: '1.0.0' }, { instructions: 'ECC-controlled Pstack. Find and read exact adapted workflows through pstack_find_workflow/pstack_read_skill or the existing shared suite. Prepare plan packets, validate exact candidate/judge reviews, and run bounded verification. Tools do not call LLM providers or authorize implementation. Current project policy and one active ECC goal control scope; GSD and upstream skills support that goal. No service restarts, worktrees, publication, cloud dispatch or shared data mutations.' });
  // Fixed, optional resources let clients without a local Read tool load the
  // existing authority. No arbitrary path parameter or additional rulebook.
  const policyRoot = path.resolve(ROOT, '../manageesg-backend');
  for (const name of ['AGENTS.md', 'AGENTS_SYSTEM.md', 'CLAUDE.md']) {
    server.registerResource(name, 'seabridge-policy:///' + name, {
      mimeType: 'text/markdown', description: 'Current SeaBridgeAI central instruction file; applies only within SeaBridgeAI.'
    }, async uri => {
      const file = path.join(policyRoot, name), stat = await fs.lstat(file);
      const actualRoot = await fs.realpath(policyRoot);
      if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 65536
        || path.resolve(await fs.realpath(file)) !== path.join(actualRoot, name)) throw Error('Bounded regular central instruction file required');
      const handle = await fs.open(file, 'r');
      try {
        const current = await handle.stat();
        if (current.ino !== stat.ino || current.size !== stat.size) throw Error('Central instruction file changed before read');
        const buffer = Buffer.alloc(65537), { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
        const after = await handle.stat();
        if (bytesRead > 65536 || bytesRead !== current.size || after.size !== current.size || after.mtimeMs !== current.mtimeMs) throw Error('Central instruction file changed during read');
        return { contents: [{ uri: uri.href, mimeType: 'text/markdown', text: buffer.subarray(0, bytesRead).toString('utf8') }] };
      } finally { await handle.close(); }
    });
  }
  let canaryCalls = 0;
  const annotations = canary ? { readOnlyHint: true, destructiveHint: false, openWorldHint: false } : {};
  const tool = (name, description, schema, handler) => server.registerTool(name, { description, inputSchema: schema, annotations }, async args => {
    try {
      if (canary && ++canaryCalls > 5) throw Error('Read-only canary tool-call limit reached');
      return { content: [{ type: 'text', text: JSON.stringify(await handler(args)) }] };
    }
    catch (e) { return { isError: true, content: [{ type: 'text', text: e.message }] }; }
  });
  if (!canary) {
    tool('pstack_prepare_plan', 'Prepare a grounded two-planner/judge packet without model calls or file edits', { spec: z.object({ id: z.string(), goal: z.string(), scopes: z.array(z.object({ repository: z.enum(['ecc','backend','frontend']), paths: z.array(z.string()) })), acceptance: z.array(z.object({ id: z.string(), scenario: z.string(), proof: z.string() })), protectedBehavior: z.array(z.string()).optional(), constraints: z.array(z.string()).optional() }) }, ({ spec }) => preparePlan(spec));
    tool('pstack_validate_review', 'Validate completed candidate and judge artifacts against current scope/revision; never authorizes implementation', { packet: z.record(z.any()), candidates: z.array(z.record(z.any())), judgment: z.record(z.any()), authenticity: z.enum(['authentic','fixture','unknown']).optional() }, validateReview);
    tool('pstack_verify_feature', 'Execute an allowlisted local check and retain a bounded receipt; readiness and missing auth never prove product completion', { feature: z.enum(Object.keys(features)) }, ({ feature }) => verifyFeature(feature));
  }
  tool('pstack_find_workflow', 'Select the same canonical ECC task workflow as the shared suite; optional coding/company profile, no actions executed', { query: z.string().min(1).max(200), limit: z.number().int().min(1).max(30).optional(), profile: z.enum(['auto','coding','company','all']).optional() }, findWorkflow);
  tool('pstack_read_skill', 'Read an exact catalog skill ID with source digest and project-policy boundary', { id: z.string() }, readEntry);
  if (canary) tool('pstack_factory', 'Read-only canary: feature discovery and two deliberately invalid admission/image inputs only; five total calls maximum', {
    operation: z.enum(['ui-features', 'ui-admit', 'ui-image']),
    contract: z.object({}).strict().optional(),
    file: z.literal('C:/ecc-canary-not-a-real-image.png').optional()
  }, factoryRequest);
  else registerFactoryTool(server,z,'pstack_factory');
  await server.connect(new StdioServerTransport());
}
