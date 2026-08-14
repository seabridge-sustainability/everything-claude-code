---
name: speckit-checklist
description: Generate and validate requirements-quality checklists for a feature.
---

# speckit-checklist

## Purpose

Create checklist items that test whether the English requirements are clear,
complete, and ready for implementation. This is not implementation QA; it is
requirements QA.

## Inputs

- Feature spec and plan artifacts.
- Optional checklist focus, such as security, UX, API, data, AI governance, or
  deployment readiness.
- SeaBridge checklist preset:
  `skills/spec-kit/presets/seabridge/seabridge-checklist-template.md`.

## Output

Write checklist files under:

```text
.specify/specs/<feature-id>/checklists/
```

Use descriptive names such as `requirements.md`, `security.md`, `ai-governance.md`,
or `deployment.md`.

## Checklist Domains

- requirements quality
- test coverage
- UX completeness
- API completeness
- data model completeness
- AI governance
- security and privacy
- tenant isolation
- performance and reliability
- documentation
- regression risk
- deployment readiness
- completion evidence
- skipped-test disclosure
- anti-stuck fallback for complex work

## Workflow

1. Load the relevant spec artifacts.
2. Ask up to three focus questions only if checklist content would materially
   change.
3. Generate numbered checkbox items with objective pass/fail criteria.
4. Keep items about requirement quality, not code behavior.
5. Save the checklist.
6. Report checklist path and unresolved quality risks.

## Verification

- Checklist items are specific and answerable.
- Items cover SeaBridge tenant isolation, auditability, source traces, AI safety,
  and production readiness when relevant.
- No item requires running product code; implementation verification belongs to
  tasks and GSD/SeaBridge verification.
- Checklist includes pass/fail items for completion evidence and unverified-item
  disclosure when implementation work is expected.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
