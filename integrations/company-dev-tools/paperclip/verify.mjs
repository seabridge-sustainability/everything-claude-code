import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const apiBase = 'http://127.0.0.1:3183/api';
async function get(route) {
  const response = await fetch(apiBase + route, { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, route);
  return response.json();
}
const bootstrap = JSON.parse(await fs.readFile(path.join(root, 'state/bootstrap.json'), 'utf8'));
let browserProof = null;
try { browserProof = JSON.parse(await fs.readFile(path.join(root, 'state/ui-receipt.json'), 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const health = await get('/health');
assert.equal(health.status, 'ok');
assert.equal(health.authReady, true);
assert.equal(health.startupRecovery.phase, 'ready');
const adapters = await get('/adapters');
const agents = await get(`/companies/${bootstrap.companyId}/agents`);
const projects = await get(`/companies/${bootstrap.companyId}/projects`);
const company = await get(`/companies/${bootstrap.companyId}`);
const verifiedAgents = [];
for (const configured of bootstrap.agents) {
  const agent = agents.find(item => item.id === configured.id);
  assert.equal(agent.status, 'paused');
  assert.equal(agent.runtimeConfig.heartbeat.enabled, false);
  assert.equal(agent.runtimeConfig.heartbeat.wakeOnDemand, false);
  assert.equal(agent.adapterConfig.dangerouslySkipPermissions, false);
  assert.equal(agent.adapterConfig.dangerouslyBypassApprovalsAndSandbox, false);
  assert.equal(agent.adapterConfig.dangerouslyBypassSandbox, false);
  const adapter = adapters.find(item => item.type === configured.adapterType);
  assert.equal(adapter.loaded, true);
  verifiedAgents.push({ name: agent.name, adapterType: agent.adapterType, status: agent.status, model: agent.adapterConfig.model ?? null, executionVerified: false, executionBlocker: agent.metadata?.executionBlocker ?? null });
}
assert.equal(company.requireBoardApprovalForNewAgents, true);
assert.equal(company.feedbackDataSharingEnabled, false);
const verifiedProjects = [];
for (const configured of bootstrap.projects) {
  const project = projects.find(item => item.id === configured.id);
  const workspaces = await get(`/projects/${project.id}/workspaces`);
  const workspace = workspaces.find(item => item.isPrimary);
  assert.equal(workspace.cwd, `C:/Users/adelm/SeaBridgeAI/${project.name}`);
  verifiedProjects.push({ name: project.name, path: workspace.cwd, projectId: project.id, executionWorkspacePolicyEnabled: project.executionWorkspacePolicy?.enabled });
}
const ui = await fetch('http://127.0.0.1:3183', { signal: AbortSignal.timeout(10000) });
assert.equal(ui.status, 200);
assert.match(await ui.text(), /<title>Paperclip<\/title>/);
const receipt = {
  tool: 'paperclip', checkedAt: new Date().toISOString(), installed: true, runtimeVersion: health.version,
  runtimePackage: 'paperclipai@2026.1005.0', source: JSON.parse(await fs.readFile(path.join(root, 'upstream.json'), 'utf8')),
  endpoint: 'http://127.0.0.1:3183', health: { status: health.status, authReady: health.authReady, startupRecovery: health.startupRecovery.phase, deploymentMode: health.deploymentMode },
  dashboard: { httpStatus: ui.status, browserProof, note: 'Browser proof is separately dated; HTTP verification does not create a fresh browser proof.' },
  agents: verifiedAgents, projects: verifiedProjects,
  dispatchEnabled: false, schedulerEnabled: false, telemetryEnabled: false, inferenceCallsDuringSetup: 0,
  start: { command: 'powershell.exe', args: ['-NoProfile', '-File', path.join(root, 'start.ps1')] },
  stop: { command: process.execPath, args: [path.join(root, 'stop.mjs')] },
  cli: { command: process.execPath, args: [path.join(root, 'cli.mjs')] },
  state: path.join(root, 'state'), databasePort: 54339,
  limitations: ['Agent execution and authentication are not verified; no paid inference probe ran.', 'Gemini uses approval-preserving generic process wrapper; explicit approved prompt is required and automatic assigned-task prompt injection is not implemented.', 'Native Windows upstream background service unsupported; hidden owned launcher is used.', 'npm transitive jsdom package requests newer Node; installed dashboard/API passed with Node24.12.', 'Monthly budget0 means unlimited metadata, not an enforced spending cap.', 'Upstream health git.commit identifies surrounding ECC checkout; upstream.json/npm lock are installation provenance.'],
};
await fs.writeFile(path.join(root, 'readiness.json'), JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify({ verified: true, endpoint: receipt.endpoint, agents: verifiedAgents, projects: verifiedProjects }));
