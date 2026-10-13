import { require, findWorkflow, readEntry } from '../dev-suite/runtime.mjs';
import { preparePlan, validateReview, verifyFeature, features } from './runtime.mjs';
import { registerFactoryTool } from '../software-factory/mcp.mjs';
const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { z } = require('zod');
export async function startMcp() {
  const server = new McpServer({ name: 'seabridge-pstack', version: '1.0.0' }, { instructions: 'ECC-controlled Pstack. Find and read exact adapted workflows through pstack_find_workflow/pstack_read_skill or the existing shared suite. Prepare plan packets, validate exact candidate/judge reviews, and run bounded verification. Tools do not call LLM providers or authorize implementation. Current project policy and one active ECC goal control scope; GSD and upstream skills support that goal. No service restarts, worktrees, publication, cloud dispatch or shared data mutations.' });
  const tool = (name, description, schema, handler) => server.tool(name, description, schema, async args => {
    try { return { content: [{ type: 'text', text: JSON.stringify(await handler(args)) }] }; }
    catch (e) { return { isError: true, content: [{ type: 'text', text: e.message }] }; }
  });
  tool('pstack_prepare_plan', 'Prepare a grounded two-planner/judge packet without model calls or file edits', { spec: z.object({ id: z.string(), goal: z.string(), scopes: z.array(z.object({ repository: z.enum(['ecc','backend','frontend']), paths: z.array(z.string()) })), acceptance: z.array(z.object({ id: z.string(), scenario: z.string(), proof: z.string() })), protectedBehavior: z.array(z.string()).optional(), constraints: z.array(z.string()).optional() }) }, ({ spec }) => preparePlan(spec));
  tool('pstack_validate_review', 'Validate completed candidate and judge artifacts against current scope/revision; never authorizes implementation', { packet: z.record(z.any()), candidates: z.array(z.record(z.any())), judgment: z.record(z.any()), authenticity: z.enum(['authentic','fixture','unknown']).optional() }, validateReview);
  tool('pstack_verify_feature', 'Execute an allowlisted local check and retain a bounded receipt; readiness and missing auth never prove product completion', { feature: z.enum(Object.keys(features)) }, ({ feature }) => verifyFeature(feature));
  tool('pstack_find_workflow', 'Select the same canonical ECC task workflow as the shared suite; optional coding/company profile, no actions executed', { query: z.string().min(1).max(200), limit: z.number().int().min(1).max(30).optional(), profile: z.enum(['auto','coding','company','all']).optional() }, findWorkflow);
  tool('pstack_read_skill', 'Read an exact catalog skill ID with source digest and project-policy boundary', { id: z.string() }, readEntry);
  registerFactoryTool(server,z,'pstack_factory');
  await server.connect(new StdioServerTransport());
}
