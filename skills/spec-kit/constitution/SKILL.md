---
name: speckit-constitution
description: Create or update `.specify/memory/constitution.md` with SeaBridgeAI project principles before broad feature planning or reusable agent work.
---

# speckit-constitution

## Purpose

Create or amend the project constitution that governs all future specs, plans,
tasks, implementation, and review for the current repository.

## Inputs

- User-provided principles or feature context.
- Repo-local `AGENTS.md`, `CLAUDE.md`, `AGENTS_SYSTEM.md`, and relevant docs.
- ECC `SEABRIDGE_CODING_AGENT_SYSTEM.md`.
- Existing `.specify/memory/constitution.md`, if present.
- SeaBridge preset template:
  `skills/spec-kit/presets/seabridge/seabridge-constitution-template.md`.

## Output

Write or update:

```text
.specify/memory/constitution.md
```

Create `.specify/memory/` if missing. If no constitution exists, start from the
SeaBridge preset template. Preserve prior project-specific decisions unless the
user explicitly changes them.

## Workflow

1. State assumptions and done criteria before editing.
2. Load local repo guidance before ECC guidance.
3. Identify placeholders, missing principles, and stale governance rules.
4. Define principles for:
   - code quality and simplicity
   - tests and verification
   - UX consistency where applicable
   - security and privacy
   - performance and reliability
   - tenant/company/property isolation
   - source traceability and audit history
   - AI safety and approval gates
   - no silent data mutations
   - no duplicate systems or disconnected modules
   - existing architecture reuse
5. Set governance:
   - semantic versioning for constitution changes
   - amendment process
   - compliance review expectations
   - approval-gated actions
6. Propagate principles into `.specify/templates/` or SeaBridge preset templates
   only when explicitly updating reusable templates.
7. Report changed sections, version bump rationale, and unresolved questions.

## SeaBridgeAI Required Principles

- Reuse existing backend/frontend conventions.
- Preserve FastAPI, Beanie, Mongo, Pydantic v2, and service/router patterns where
  applicable.
- Preserve Next.js app-router, component, API-client, and QA conventions where
  applicable.
- Respect tenant/company/property scoping in all product data flows.
- Preserve source traces, citations, evidence links, and audit histories.
- Integrate with existing AI agents instead of creating isolated agents.
- Require tests or documented verification before completion.
- Do not push to GitHub unless explicitly asked.
- Do not work directly on protected development branches when an active feature
  branch/worktree is required.

## Verification

- No bracketed placeholders remain unless explicitly justified.
- All principles are actionable and testable.
- Approval gates match SeaBridgeAI safety rules.
- The resulting constitution can be cited by `speckit-plan`,
  `speckit-analyze`, and `speckit-implement`.

<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_START -->
## /goal Completion Contract

This Spec Kit artifact inherits SeaBridgeAI `/goal`: define the persistent goal, Definition of Done, validation plan, integrations, risks, dependencies, artifacts, and blockers. Implementation must persist until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_END -->
