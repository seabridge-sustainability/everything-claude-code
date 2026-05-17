---
name: sea-task-orchestration
description: SeaBridgeAI task orchestration adapted from Superpowers for scoped decomposition, plan execution, parallel-agent routing, and cross-lane handoff without uncontrolled autonomy.
---

# sea-task-orchestration

## Purpose

Break large work into bounded backend, frontend, AI, data, QA, security, docs, and sustainability-domain lanes.

## When To Call

Use for large requests, multi-repo changes, unclear scope, plan execution, or independent work lanes.

## Required Inputs

Goal; repos involved; constraints; lane dependencies; approvals; verification gates.

## Expected Outputs

Lane map; owned file scopes; execution order; dropped-requirement check; handoff plan.

## Mandatory Verification

Confirm lanes are independent before parallel work; verify no lane can push, commit, install globally, or run live costs without approval; verify every lane has tests or checks.

## GSD Controlled Execution

Call `sea-gsd-controlled-execution` for complex multi-phase work, cross-repo phase plans, context rot, milestone tracking, or any task where requirements could be dropped across a long session. Decompose work into phases, maintain structured artifacts, verify every phase, and preserve concise state summaries.

Do not use GSD autonomous/yolo execution, automatic commits, automatic pushes, automatic PRs, or dangerous permission skipping without explicit approval.

## Failure Conditions

Stop if requirements conflict, tasks share unsafe write scope, approval is missing, or an autonomous loop would run without review.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Every data lane must preserve provenance, units, scenario, timeframe, confidence, and missing-data behavior.

## Cross-Agent Compatibility Notes

Claude Code can use subagents. Codex can use spawn_agent only when the user explicitly asks for subagents. Gemini, OpenCode, Cursor, and Copilot CLI should run equivalent isolated task prompts.

## Superpowers Adaptation

Partially adapts Superpowers executing-plans, subagent-driven-development, and dispatching-parallel-agents with SeaBridgeAI approval boundaries.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
