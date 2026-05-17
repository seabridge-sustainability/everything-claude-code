---
name: persistent-goal-execution
description: Use when designing or reviewing long-running agent work that needs persisted goals, definitions of done, subtasks, blockers, validation evidence, or cross-session continuity.
---

# persistent-goal-execution

## Purpose

Design agent work around a durable goal object instead of relying on chat history alone.

## When To Use

- A task spans multiple sessions, channels, tools, days, or approval gates.
- The user asks for persistent goals, task state, agent continuity, or long-horizon execution.
- OpenSeaBri or SeaBridge agents need homeowner, resilience, insurance, procurement, due diligence, or sustainability action plans.

## Required Pattern

Use the `_upstream` reference:

`C:\Users\adelm\SeaBridgeAI\_upstream\agent-patterns\persistent-goals\README.md`

Minimum goal fields:

- `id`
- `user_request`
- `normalized_goal`
- `definition_of_done`
- `current_status`
- `active_phase`
- `subtasks`
- `blockers`
- `validation_requirements`
- `artifacts`
- `created_at`
- `updated_at`
- `completed_at`

## Execution Rules

1. State assumptions and definition of done before implementation.
2. Create or update goal state as a structured object.
3. Append evidence events for tool calls, approvals, artifacts, and validation.
4. Do not mark completed until validation requirements have fresh evidence.
5. If blocked, record the blocker and safe next action.
6. Preserve privacy boundaries for user, tenant, property, insurance, and disaster data.

## Verification

- Validate status transitions.
- Verify resume uses stored state, not only chat text.
- Verify completion has evidence.
- Verify secrets and provider keys are not stored in goal state.
