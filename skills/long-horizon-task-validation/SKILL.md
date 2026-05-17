---
name: long-horizon-task-validation
description: Use before claiming a long-running or multi-step agent task is complete; verifies analyze-plan-execute-validate-self-correct-continuation evidence and hard blockers.
---

# long-horizon-task-validation

## Purpose

Prevent agents from stopping after code or text generation when the real definition of done requires validation.

## When To Use

- Before claiming a long-horizon task is done.
- When a goal spans multiple subtasks, tools, repos, channels, artifacts, or sessions.
- When using persistent goals, cross-session resume, provider fallback, or multimodal generation.

## Required Pattern

Use the `_upstream` reference:

`C:\Users\adelm\SeaBridgeAI\_upstream\agent-patterns\long-horizon-execution\README.md`

## Validation Checklist

- Analyze step recorded assumptions and constraints.
- Plan step mapped subtasks to validation requirements.
- Execute step recorded evidence.
- Validate step ran fresh checks.
- Self-correction handled failures within scope.
- Continue step checked for remaining subtasks.
- Complete step matches the definition of done.
- Blockers are explicit and include safe next action.

## Verification

- Run the smallest fresh command/check that proves the current claim.
- Inspect relevant diff/state.
- Record skipped checks and why.
- Do not claim production readiness from docs or code changes alone.
