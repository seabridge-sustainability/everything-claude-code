---
name: gsd:health
description: Diagnose planning directory health and optionally repair issues
argument-hint: "[--repair] [--context]"
allowed-tools:
  - Read
  - Bash
  - Write
  - AskUserQuestion
---
<objective>
Validate `.planning/` directory integrity and report actionable issues. Checks for missing files, invalid configurations, inconsistent state, and orphaned plans.

`--context` runs an orthogonal check: the running session's context utilization. The workflow asks for the model's tokensUsed + contextWindow, calls `gsd-sdk query validate.context`, and renders one of three states:

| Utilization | State    | Action                                                |
|-------------|----------|-------------------------------------------------------|
| < 60%       | healthy  | no action â€” context is comfortable                    |
| 60% â€“ 70%   | warning  | recommend `/gsd-thread` to start fresh                |
| â‰¥ 70%       | critical | reasoning quality may degrade past the fracture point |
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/health.md
</execution_context>

<process>
Execute the health workflow from @~/.claude/get-shit-done/workflows/health.md end-to-end.
Parse `--repair` and `--context` flags from arguments and pass to workflow.
</process>

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
