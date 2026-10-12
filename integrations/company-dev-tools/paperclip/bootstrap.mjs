import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const base = 'http://127.0.0.1:3183/api';
const selectedModels = { OpenCode: 'ollama/qwen3.5-opencode:32k' };
try { const settings = JSON.parse(await fs.readFile('C:/Users/adelm/.claude/settings.json', 'utf8')); if (typeof settings.model === 'string') selectedModels.Claude = settings.model; } catch {}
try { const settings = JSON.parse(await fs.readFile('C:/Users/adelm/.gemini/settings.json', 'utf8')); const model = typeof settings.model === 'string' ? settings.model : settings.model?.name; if (model) selectedModels.Gemini = model; } catch {}
try { const config = await fs.readFile('C:/Users/adelm/.codex/config.toml', 'utf8'); const model = config.match(/^model\s*=\s*"([^"\n]+)"/m)?.[1]; if (model) selectedModels.Codex = model; } catch {}
async function api(route, method = 'GET', body) {
  const response = await fetch(base + route, { method, headers: { 'content-type': 'application/json' }, body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`${method} ${route}: HTTP${response.status}`);
  return response.json();
}
const companies = await api('/companies');
let company = companies.find(item => item.name === 'SeaBridgeAI Local Coordination');
if (!company) company = await api('/companies', 'POST', { name: 'SeaBridgeAI Local Coordination', description: 'Local agent management only. No automatic dispatch. Central backend AGENTS.md and AGENTS_SYSTEM.md remain authoritative.', budgetMonthlyCents: 0 });
await api(`/companies/${company.id}`, 'PATCH', { feedbackDataSharingEnabled: false });
const projects = await api(`/companies/${company.id}/projects`);
const projectRecords = [];
for (const name of ['manageesg-backend', 'manageesg-frontend']) {
  let project = projects.find(item => item.name === name);
  if (!project) project = await api(`/companies/${company.id}/projects`, 'POST', {
    name, description: 'Priority development reference. Linking this path does not authorize execution or shared-data changes.', status: 'planned',
    executionWorkspacePolicy: { enabled: false },
    workspace: { name: `${name} existing checkout`, sourceType: 'local_path', cwd: `C:/Users/adelm/SeaBridgeAI/${name}`, isPrimary: true, runtimeConfig: { desiredState: 'manual' } }
  });
  projectRecords.push({ name, id: project.id });
}
const agents = await api(`/companies/${company.id}/agents`);
const agentRecords = [];
const needsRegistration = ['Claude', 'Codex', 'Gemini', 'OpenCode'].some(name => !agents.some(item => item.name === name));
if (needsRegistration) await api(`/companies/${company.id}`, 'PATCH', { requireBoardApprovalForNewAgents: false });
try {
for (const [name, type, command] of [['Claude', 'claude_local', 'claude'], ['Codex', 'codex_local', 'codex'], ['Gemini', 'gemini_local', 'gemini'], ['OpenCode', 'opencode_local', 'opencode']]) {
  let agent = agents.find(item => item.name === name);
  if (!agent) agent = await api(`/companies/${company.id}/agents`, 'POST', {
    name, role: 'engineer', title: `${name} manual development adapter`, adapterType: type,
    adapterConfig: { command, cwd: 'C:/Users/adelm/SeaBridgeAI/manageesg-backend', dangerouslySkipPermissions: false, dangerouslyBypassApprovalsAndSandbox: false, dangerouslyBypassSandbox: false, ...(selectedModels[name] ? { model: selectedModels[name] } : {}) },
    runtimeConfig: { heartbeat: { enabled: false, intervalSec: 0, wakeOnDemand: false, maxConcurrentRuns: 1 } },
    permissions: { canCreateAgents: false, canCreateSkills: false, trustPreset: 'low_trust_review' },
    budgetMonthlyCents: 0,
    metadata: { setupOnly: true, executionVerified: false, instructionsEntry: 'C:/Users/adelm/SeaBridgeAI/manageesg-backend/AGENTS.md', priorityProjects: projectRecords.map(item => item.id) }
  });
  const safeConfig = { ...agent.adapterConfig, dangerouslySkipPermissions: false, dangerouslyBypassApprovalsAndSandbox: false, dangerouslyBypassSandbox: false, ...(selectedModels[name] ? { model: selectedModels[name] } : {}) };
  if (name === 'Gemini') Object.assign(safeConfig, { command: process.execPath, args: [path.join(root, 'gemini-safe.mjs'), '--approval-mode', 'default'], timeoutSec: 300 });
  agent = await api(`/agents/${agent.id}`, 'PATCH', { ...(name === 'Gemini' ? { adapterType: 'process' } : {}), adapterConfig: safeConfig, metadata: { ...agent.metadata, executionVerified: false, executionAvailable: true, modelSource: selectedModels[name] ? 'Existing local agent configuration' : 'No explicit selection found; existing CLI defaults retained', ...(name === 'Gemini' ? { executionBlocker: 'Supply explicit owner-approved prompt before manual dispatch. Generic process wrapper preserves approval-mode default; no automatic assigned-task prompt injection.', permissionWrapper: path.join(root, 'gemini-safe.mjs') } : {}) } });
  if (agent.status !== 'paused') agent = await api(`/agents/${agent.id}/pause`, 'POST', {});
  agentRecords.push({ name, id: agent.id, adapterType: agent.adapterType, status: agent.status });
}
} finally { await api(`/companies/${company.id}`, 'PATCH', { requireBoardApprovalForNewAgents: true }); }
const receipt = { companyId: company.id, projects: projectRecords, agents: agentRecords, automaticDispatch: false, inferenceCalls: 0, checkedAt: new Date().toISOString() };
await fs.writeFile(path.join(root, 'state/bootstrap.json'), JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify(receipt, null, 2));
