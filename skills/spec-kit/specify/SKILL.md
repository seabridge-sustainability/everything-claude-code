---
name: speckit-specify
description: Create `.specify/specs/<feature-id>/spec.md` focused on what and why, not implementation.
---

# speckit-specify

## Purpose

Turn a feature idea into a clear, testable specification before planning or
implementation. The spec describes what users need and why it matters. It avoids
implementation details except for constraints already fixed by the repo.

## Inputs

- Feature description from the user.
- Project constitution, if present.
- Repo-local instructions and relevant docs.
- Existing `.specify/specs/*` for numbering and naming context.
- SeaBridge spec preset:
  `skills/spec-kit/presets/seabridge/seabridge-spec-template.md`.

## Output

Write:

```text
.specify/specs/<feature-id>/spec.md
```

Use a stable feature id such as `001-procurement-intake` or
`20260517-procurement-intake`. Do not create or switch git branches unless the
user explicitly asks.

## Required Sections

- Problem statement.
- Business objective.
- Users/personas.
- User stories with independent tests.
- Functional requirements.
- Non-functional requirements.
- Acceptance criteria.
- Edge cases and failure states.
- Out of scope.
- Dependencies.
- Risks.
- Data model assumptions.
- Evidence and reporting needs.
- AI behavior constraints.
- Security and privacy constraints.
- SeaBridge module integration points.

## Workflow

1. State assumptions and done criteria.
2. If the request is materially ambiguous, mark ambiguity as
   `NEEDS CLARIFICATION` instead of guessing.
3. Create `.specify/specs/<feature-id>/`.
4. Fill the spec from the SeaBridge preset.
5. Keep all requirements technology-neutral unless the repository already fixes
   the technology choice.
6. Number requirements with stable ids such as `FR-001`, `NFR-001`, and
   `AC-001`.
7. Add a traceability note for any requirement involving ESG data, AI output,
   risk scoring, procurement, disclosure, or due diligence.
8. Report the spec path and suggested next skill: `speckit-clarify`.

## Verification

- The spec says what and why, not how.
- Each user story has an independent test or validation description.
- Security, privacy, tenant scope, auditability, and AI behavior constraints are
  explicit when relevant.
- No invented sustainability data, source, factor, model, citation, or reporting
  mapping appears in the spec.

<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_START -->
## /goal Completion Contract

This Spec Kit artifact inherits SeaBridgeAI `/goal`: define the persistent goal, Definition of Done, validation plan, integrations, risks, dependencies, artifacts, and blockers. Implementation must persist until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_END -->
