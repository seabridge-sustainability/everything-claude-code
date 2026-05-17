---
name: instinct-status
description: Show learned instincts (project + global) with confidence
command: true
---

# Instinct Status Command

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Shows learned instincts for the current project plus global instincts, grouped by domain.

## Implementation

Run the instinct CLI using the plugin root path:

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/skills/continuous-learning-v2/scripts/instinct-cli.py" status
```

Or if `CLAUDE_PLUGIN_ROOT` is not set (manual installation), use:

```bash
python3 ~/.claude/skills/continuous-learning-v2/scripts/instinct-cli.py status
```

## Usage

```
/instinct-status
```

## What to Do

1. Detect current project context (git remote/path hash)
2. Read project instincts from `~/.claude/homunculus/projects/<project-id>/instincts/`
3. Read global instincts from `~/.claude/homunculus/instincts/`
4. Merge with precedence rules (project overrides global when IDs collide)
5. Display grouped by domain with confidence bars and observation stats

## Output Format

```
============================================================
  INSTINCT STATUS - 12 total
============================================================

  Project: my-app (a1b2c3d4e5f6)
  Project instincts: 8
  Global instincts:  4

## PROJECT-SCOPED (my-app)
  ### WORKFLOW (3)
    ÃƒÂ¢Ã¢â‚¬â€œÃ‹â€ ÃƒÂ¢Ã¢â‚¬â€œÃ‹â€ ÃƒÂ¢Ã¢â‚¬â€œÃ‹â€ ÃƒÂ¢Ã¢â‚¬â€œÃ‹â€ ÃƒÂ¢Ã¢â‚¬â€œÃ‹â€ ÃƒÂ¢Ã¢â‚¬â€œÃ‹â€ ÃƒÂ¢Ã¢â‚¬â€œÃ‹â€ ÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬ËœÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬ËœÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬Ëœ  70%  grep-before-edit [project]
              trigger: when modifying code

## GLOBAL (apply to all projects)
  ### SECURITY (2)
    ÃƒÂ¢Ã¢â‚¬â€œÃ‹â€ ÃƒÂ¢Ã¢â‚¬â€œÃ‹â€ ÃƒÂ¢Ã¢â‚¬â€œÃ‹â€ ÃƒÂ¢Ã¢â‚¬â€œÃ‹â€ ÃƒÂ¢Ã¢â‚¬â€œÃ‹â€ ÃƒÂ¢Ã¢â‚¬â€œÃ‹â€ ÃƒÂ¢Ã¢â‚¬â€œÃ‹â€ ÃƒÂ¢Ã¢â‚¬â€œÃ‹â€ ÃƒÂ¢Ã¢â‚¬â€œÃ‹â€ ÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬Ëœ  85%  validate-user-input [global]
              trigger: when handling user input
```

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
