# Hooks in Kiro

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
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
