---
name: spec-kit
description: SeaBridgeAI curated Spec Kit workflow package. Use for specification-driven development across SeaBridgeAI repos when a feature needs constitution, specification, clarification, planning, tasking, analysis, checklist, or implementation discipline.
---

# SeaBridgeAI Spec Kit

## Purpose

Provide the curated GitHub Spec Kit workflow as a SeaBridgeAI-compatible,
cross-agent skill package without vendoring the full upstream CLI.

Spec Kit is the specification and planning discipline layer:

1. Constitution: durable project principles.
2. Specify: what and why, not implementation.
3. Clarify: remove ambiguity before planning.
4. Plan: technical design and contracts.
5. Tasks: dependency-ordered executable tasks.
6. Analyze: consistency and coverage review.
7. Checklist: quality gates for the English requirements.
8. Implement: execute tasks with SeaBridgeAI DoD and verification.

Use GSD for long-running phase orchestration, persistence, and UAT verification.
Use SeaBridgeAI `sea-*` skills for safety, TDD, API verification, frontend QA,
AI data integrity, sustainability-domain review, and completion verification.

## Canonical Skills

Canonical skill bodies live under this directory:

- `constitution/SKILL.md`
- `specify/SKILL.md`
- `clarify/SKILL.md`
- `plan/SKILL.md`
- `tasks/SKILL.md`
- `analyze/SKILL.md`
- `checklist/SKILL.md`
- `implement/SKILL.md`
- `taskstoissues/SKILL.md`

Callable wrappers live under `.agents/skills/speckit-*`.

## Required Gates

- Do not push, commit, create GitHub issues, install dependencies, run paid
  calls, run migrations, or mutate production data without explicit approval.
- Keep `.specify` artifacts aligned with repo-local `AGENTS.md`, `CLAUDE.md`,
  ECC `SEABRIDGE_CODING_AGENT_SYSTEM.md`, and the relevant `sea-*` skills.
- Require tenant/company/property scoping when product data is involved.
- Require source traces, auditability, and missing-data behavior for ESG,
  sustainability, risk, due diligence, reporting, procurement, and AI outputs.
- Never create disconnected agents, duplicate modules, or silent AI mutations.
- Never declare completion until DoD, tests/checks, and verification evidence
  are satisfied or documented as skipped with rationale.

## Source Attribution

Adapted from GitHub Spec Kit, commit `81e9ecd4d955af21adf97c17646b8d3c9b9b67bb`,
with SeaBridgeAI-specific safety, tenant isolation, auditability, AI governance,
and cross-agent compatibility constraints.

<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_START -->
## /goal Completion Contract

This Spec Kit artifact inherits SeaBridgeAI `/goal`: define the persistent goal, Definition of Done, validation plan, integrations, risks, dependencies, artifacts, and blockers. Implementation must persist until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_END -->
