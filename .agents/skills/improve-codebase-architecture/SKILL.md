---
name: improve-codebase-architecture
description: SeaBridgeAI wrapper for Matt Pocock's improve-codebase-architecture skill. Use to identify modularity, coupling, testability, interface, observability, and maintainability improvements without unsafe rewrites.
---

# Improve Codebase Architecture

Use this as a focused supplement to `sea-senior-dev-workflow`,
`sea-test-driven-development`, `sea-verification-before-completion`, and the
relevant backend/frontend/AI/domain SeaBridge skills.

ECC vendored reference:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\matt-pocock-skills\skills\engineering\improve-codebase-architecture\SKILL.md`

## SeaBridgeAI Adaptation

Find architecture improvements that preserve behavior and reduce operational
risk. Prioritize:

- Oversized modules and hidden business logic.
- Tight coupling between orchestration, data access, UI state, and providers.
- Shallow pass-through abstractions.
- Missing interfaces around provider, database, file, browser, or AI runtimes.
- Weak test surfaces and difficult regression checks.
- Poor observability, failure handling, and rollback visibility.
- Cross-repo contract drift between backend, frontend, OpenSeaBri, and agent
  tooling.

## Required Output Before Refactor

Present candidates before editing:

- Files involved.
- Current friction.
- Proposed change.
- Backward-compatibility plan.
- Regression tests or verification plan.
- Risks and rollback.

Ask which candidate to implement unless the user has already chosen a specific
refactor target.

## Refactor Rules

- Keep changes surgical and behavior-preserving unless explicitly approved.
- Add or update regression tests when practical.
- Do not introduce new frameworks or dependency installs without approval.
- Do not perform broad rewrites, auto-format unrelated files, or collapse
  repo-specific conventions.
