---
description: Run the ECC formatter quality gate for a single file and report remediation steps.
---

# Quality Gate Command

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
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
