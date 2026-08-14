---
name: gsd:review
description: Request cross-AI peer review of phase plans from external AI CLIs
argument-hint: "--phase N [--gemini] [--claude] [--codex] [--opencode] [--qwen] [--cursor] [--all]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
---

<objective>
Invoke external AI CLIs (Gemini, Claude, Codex, OpenCode, Qwen Code, Cursor) to independently review phase plans.
Produces a structured REVIEWS.md with per-reviewer feedback that can be fed back into
planning via /gsd-plan-phase --reviews.

**Flow:** Detect CLIs â†’ Build review prompt â†’ Invoke each CLI â†’ Collect responses â†’ Write REVIEWS.md
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/review.md
</execution_context>

<context>
Phase number: extracted from $ARGUMENTS (required)

**Flags:**
- `--gemini` â€” Include Gemini CLI review
- `--claude` â€” Include Claude CLI review (uses separate session)
- `--codex` â€” Include Codex CLI review
- `--opencode` â€” Include OpenCode review (uses model from user's OpenCode config)
- `--qwen` â€” Include Qwen Code review (Alibaba Qwen models)
- `--cursor` â€” Include Cursor agent review
- `--all` â€” Include all available CLIs
</context>

<process>
Execute the review workflow from @~/.claude/get-shit-done/workflows/review.md end-to-end.
</process>

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
