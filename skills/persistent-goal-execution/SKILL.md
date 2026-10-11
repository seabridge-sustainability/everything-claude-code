---
name: persistent-goal-execution
description: Review or design durable long-running work. Coding tasks reuse ECC goal records; product-agent persistence is a separate application design concern.
---

# Persistent Goal Execution

Read the central `C:/Users/adelm/SeaBridgeAI/manageesg-backend/AGENTS.md`
and its system import. Preserve current approval, privacy and ownership boundaries.

## Coding execution

Reuse `ecc goal` and `schemas/goal-control.schema.json`; do not create another
normalized-goal store alongside `.ecc/goal`. Resume from current owner corrections,
required outputs, assignments and source-bound receipts, not optimistic chat prose.
Retain required-component coverage, demonstrate the next usable increment and
separate implementation, runtime acceptance, scientific validation and release.
Validate transitions, fresh evidence and scoped approval; keep secrets out of state.

## Product-agent persistence

Only when the assignment concerns application-agent design, consult the existing
`C:/Users/adelm/SeaBridgeAI/_upstream/agent-patterns/persistent-goals/README.md`.
Retain its application contract: id, user_request, normalized_goal,
definition_of_done, current_status, active_phase, subtasks, blockers,
validation_requirements, artifacts, created_at, updated_at, completed_at.
Do not migrate product storage or activate MCP/API as part of coding coordination.
Check tenant/user/property/insurance/disaster privacy and evidence-backed completion.
