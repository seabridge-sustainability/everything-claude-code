---
name: gsd:secure-phase
description: Retroactively verify threat mitigations for a completed phase
argument-hint: "[phase number]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Task
  - AskUserQuestion
---
<objective>
Verify threat mitigations for a completed phase. Three states:
- (A) SECURITY.md exists â€” audit and verify mitigations
- (B) No SECURITY.md, PLAN.md with threat model exists â€” run from artifacts
- (C) Phase not executed â€” exit with guidance

Output: updated SECURITY.md.
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/secure-phase.md
</execution_context>

<context>
Phase: $ARGUMENTS â€” optional, defaults to last completed phase.
</context>

<process>
Execute @~/.claude/get-shit-done/workflows/secure-phase.md.
Preserve all workflow gates.
</process>

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
