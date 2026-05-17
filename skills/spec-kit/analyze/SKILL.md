---
name: speckit-analyze
description: Run a read-only consistency and coverage analysis across Spec Kit artifacts.
---

# speckit-analyze

## Purpose

Identify inconsistencies, gaps, overengineering, and missing coverage across the
constitution, spec, plan, data model, contracts, and tasks before implementation.

## Inputs

- `.specify/memory/constitution.md`
- `spec.md`
- `plan.md`
- `data-model.md`
- `contracts/`
- `tasks.md`

## Output

Print a Markdown analysis report. Do not modify files.

## Required Checks

Flag:

- missing requirements
- tasks without requirements
- requirements without tests
- contracts without implementation tasks
- missing validation tasks
- missing completion-evidence tasks
- missing stuck-task fallback for complex or risky work
- data models without migrations/backfill decisions
- frontend workflows without backend endpoints
- AI behavior without guardrails
- security gaps
- tenant isolation gaps
- audit/source trace gaps
- overengineering
- duplicate systems
- conflicts with existing architecture

## Severity

- `CRITICAL`: constitution violation, missing core artifact, tenant isolation
  ambiguity, security/privacy blocker, or ungrounded AI/sustainability data.
- `HIGH`: requirement/plan/task contradiction, untestable acceptance criterion,
  missing contract owner, missing migration decision.
- `MEDIUM`: terminology drift, incomplete edge cases, weak observability,
  incomplete performance criteria.
- `LOW`: wording or organization improvements.

## Report Format

```markdown
## Specification Analysis Report

| ID | Category | Severity | Location | Summary | Recommendation |
| --- | --- | --- | --- | --- | --- |

## Coverage Summary

## Constitution Alignment

## Unmapped Requirements

## Unmapped Tasks

## Next Actions
```

## Verification

- Analysis is read-only.
- Findings cite artifact names and sections.
- Critical issues recommend remediation before `speckit-implement`.
- If no issues are found, report coverage metrics and residual risks.
- The analysis explicitly states whether validation, completion evidence, and
  anti-stuck coverage are present.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
