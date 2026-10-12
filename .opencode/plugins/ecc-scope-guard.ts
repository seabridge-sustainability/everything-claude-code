import { spawnSync } from "node:child_process"
import * as path from "node:path"

// Absent opt-in leaves existing sessions and the other ECC hooks unchanged.
export const ECCScopeGuard = async ({ directory, worktree }: { directory: string; worktree?: string }) => {
  const mode = process.env.ECC_SCOPE_GUARD_MODE
  if (mode === undefined) return {}
  if (mode !== "audit" && mode !== "block") throw new Error("ECC scope guard mode must be audit or block")
  const root = process.env.ECC_SCOPE_GUARD_ROOT
  const session = process.env.ECC_SESSION_ID
  if (!root || !path.isAbsolute(root) || !session) throw new Error("ECC scope guard requires a reviewed absolute runtime root and registered session")
  const cwd = worktree || directory
  return {
    "tool.execute.before": async (
      input: { tool: string; sessionID: string },
      output: { args: Record<string, unknown> }
    ) => {
      // OpenCode is a compiled Bun executable: its process.execPath is not Node.
      const result = spawnSync("node", [path.join(root, "scripts/hooks/goal-runtime-gate.js"), "opencode", "guard", mode, "pre"], {
        cwd, env: { ...process.env, ECC_SESSION_ID: session },
        input: JSON.stringify({ session_id: input.sessionID, cwd, tool_name: input.tool, tool_input: output.args }),
        encoding: "utf8", windowsHide: true, timeout: 10000,
      })
      // A rejected promise is OpenCode's native pre-tool control; return values
      // and log warnings cannot prevent execution. Never echo tool arguments.
      if (result.status !== 0) throw new Error("ECC scope guard denied this tool; inspect the task-owned guard evidence")
    },
  }
}
export default ECCScopeGuard
