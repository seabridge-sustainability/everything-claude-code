---
description: Run the ECC formatter quality gate for a single file and report remediation steps.
---

# Quality Gate Command

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
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->

Operator entry point for the formatter quality gate that normally runs as the
`post:quality-gate` PostToolUse hook (`scripts/hooks/quality-gate.js`).

## How it actually works

The gate is a single-file formatter check driven by hook input, not CLI flags:

- The script reads the target from the hook's stdin JSON
  (`tool_input.file_path`); it does not take a path argument.
- Behavior toggles are environment variables:
  - `ECC_QUALITY_GATE_FIX=true` - apply formatting fixes instead of check-only
  - `ECC_QUALITY_GATE_STRICT=true` - log formatter failures as gate failures
- Coverage by file type:
  - `.ts/.tsx/.js/.jsx/.json/.md` - Biome `check` or Prettier `--check`,
    whichever the project ships (JS/TS under Biome is skipped here because
    `post-edit-format` already runs `biome check --write`)
  - `.go` - `gofmt`
  - `.py` - `ruff format`
- Lint and type checks are not part of this gate. Use the `verification-loop`
  skill or the language verification skills for lint/type/test pipelines.

## Usage

To run the gate manually against one file, pipe hook-style JSON into the
script (set the env toggles first if you want fix or strict behavior):

```bash
echo '{"tool_input":{"file_path":"src/example.ts"}}' \
  | ECC_QUALITY_GATE_FIX=true node scripts/hooks/quality-gate.js
```

Then report formatter findings and concrete remediation steps.

## Notes

Hook wiring enters through the async PostToolUse dispatcher in
`hooks/hooks.json`. Its internal registry preserves the `post:quality-gate`
ID and the `standard`/`strict` profiles.

## Arguments

$ARGUMENTS:

- `[path]` optional file to check. The script itself takes no CLI
  arguments - when a path is given, substitute it as `tool_input.file_path`
  in the stdin JSON shown above before running the command
