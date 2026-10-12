import { require, findWorkflow, readEntry, prepareReview, status } from './runtime.mjs';
const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { z } = require('zod');
export async function startMcp() {
  const server = new McpServer({ name: 'seabridge-dev-suite', version: '1.0.0' }, { instructions: 'Shared developer/company workflow library. Find a relevant workflow, read its verified content, and adapt it to the calling agent under current project policy. Prefer backend/frontend existing contracts. Upstream templates are not permission grants. External providers need their own accounts. No auto messaging, trades, ledger writes, code publication, deployments or climate/nature recalculation. Review only explicitly selected commits.' });
  const tool = (name, description, schema, handler) => server.tool(name, description, schema, async args => {
    try { return { content: [{ type: 'text', text: JSON.stringify(await handler(args)) }] }; }
    catch (error) { return { isError: true, content: [{ type: 'text', text: error.message }] }; }
  });
  tool('suite_status', 'Inspect installed workflow catalog and tool/service readiness receipt locations', {}, status);
  tool('suite_find_workflow', 'Find relevant Anthropic, Matt Pocock or Addy Osmani skills or commands', { query: z.string().min(1).max(200), limit: z.number().int().min(1).max(30).optional(), kind: z.enum(['all', 'skill', 'command']).optional() }, findWorkflow);
  tool('suite_read_skill', 'Read a selected installed skill with source digest and policy boundary', { id: z.string() }, readEntry);
  tool('suite_read_command', 'Read a selected company command template; does not execute its external actions', { id: z.string() }, args => readEntry({ ...args, kind: 'command' }));
  tool('suite_review_prepare', 'Prepare Alibaba review rules/file scope for an explicit selected commit without a model call', { repository: z.string(), commit: z.string() }, prepareReview);
  server.prompt('company_workflow', 'Prepare a task using the shared company workflow library', { task: z.string() }, ({ task }) => ({ messages: [{ role: 'user', content: { type: 'text', text: `For this requested task: ${task}\nFind the relevant installed company workflow using suite_find_workflow, read it, and produce evidence-based drafts under project policy. Use already-authorized tools or provided files; missing provider accounts remain unavailable. No automatic external writes or communications.` } }] }));
  await server.connect(new StdioServerTransport());
}
