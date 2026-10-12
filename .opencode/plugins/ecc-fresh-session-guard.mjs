import { spawnSync } from 'node:child_process';
import path from 'node:path';

export const ECCFreshSessionGuard = async ({ directory, worktree }) => {
  // Only new managed processes opt in; no effect on already running clients.
  if (process.env.ECC_FRESH_SESSION_REQUIRED !== '1') return {};
  const root = process.env.ECC_FRESH_GUARD_ROOT;
  if (!root || !path.isAbsolute(root)) throw Error('ECC fresh guard root required');
  const cwd = worktree || directory;
  const invoke = (event, id, tool, args) => {
    const r = spawnSync('node', [path.join(root, 'scripts/hooks/fresh-session-guard.js'), 'opencode', event], {
      cwd, env: process.env, windowsHide: true, timeout: 10000, encoding: 'utf8',
      input: JSON.stringify({ session_id: id, cwd, tool_name: tool, tool_input: args }),
    });
    if (r.status !== 0 || r.error) throw Error('ECC fresh-session preflight/tool denied; inspect the registered binding');
  };
  return {
    event: async ({ event }) => {
      if (event.type === 'session.created') invoke('startup', event.properties?.info?.id);
    },
    'tool.execute.before': async (input, output) => invoke('pre', input.sessionID, input.tool, output.args),
  };
};
export default ECCFreshSessionGuard;
