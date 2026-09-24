# Hooks in Kiro

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Kiro supports **two types of hooks**:

1. **IDE Hooks** (this directory) - Standalone `.kiro.hook` files that work in the Kiro IDE
2. **CLI Hooks** - Embedded in agent configuration files for CLI usage

## IDE Hooks (Standalone Files)

IDE hooks are `.kiro.hook` files in `.kiro/hooks/` that appear in the Agent Hooks panel in the Kiro IDE.

### Format

```json
{
  "version": "1.0.0",
  "enabled": true,
  "name": "hook-name",
  "description": "What this hook does",
  "when": {
    "type": "fileEdited",
    "patterns": ["*.ts", "*.tsx"]
  },
  "then": {
    "type": "runCommand",
    "command": "npx tsc --noEmit",
    "timeout": 30
  }
}
```

### Required Fields

- `version` - Hook version (e.g., "1.0.0")
- `enabled` - Whether the hook is active (true/false)
- `name` - Hook identifier (kebab-case)
- `description` - Human-readable description
- `when` - Trigger configuration
- `then` - Action to perform

### Available Trigger Types

- `fileEdited` - When a file matching patterns is edited
- `fileCreated` - When a file matching patterns is created
- `fileDeleted` - When a file matching patterns is deleted
- `userTriggered` - Manual trigger from Agent Hooks panel
- `promptSubmit` - When user submits a prompt
- `agentStop` - When agent finishes responding
- `preToolUse` - Before a tool is executed (requires `toolTypes`)
- `postToolUse` - After a tool is executed (requires `toolTypes`)

### Action Types

- `runCommand` - Execute a shell command
  - Optional `timeout` field (in seconds)
- `askAgent` - Send a prompt to the agent

### Environment Variables

When hooks run, these environment variables are available:
- `$KIRO_HOOK_FILE` - Path to the file that triggered the hook (for file events)

## CLI Hooks (Embedded in Agents)

CLI hooks are embedded in agent configuration files (`.kiro/agents/*.json`) for use with `kiro-cli`.

### Format

```json
{
  "name": "my-agent",
  "hooks": {
    "agentSpawn": [
      {
        "command": "git status"
      }
    ],
    "postToolUse": [
      {
        "matcher": "fs_write",
        "command": "npx tsc --noEmit"
      }
    ]
  }
}
```

See `.kiro/agents/tdd-guide-with-hooks.json` for a complete example.

## Documentation

- IDE Hooks: https://kiro.dev/docs/hooks/
- CLI Hooks: https://kiro.dev/docs/cli/hooks/
