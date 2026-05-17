# SeaBridgeAI Spec Kit Preset

The SeaBridgeAI preset lives at:

```text
skills/spec-kit/presets/seabridge/
```

It adapts GitHub Spec Kit templates for the SeaBridgeAI platform.

## Templates

- `seabridge-constitution-template.md`
- `seabridge-spec-template.md`
- `seabridge-plan-template.md`
- `seabridge-tasks-template.md`
- `seabridge-checklist-template.md`

When synced into a target repo, these become:

```text
.specify/templates/constitution-template.md
.specify/templates/spec-template.md
.specify/templates/plan-template.md
.specify/templates/tasks-template.md
.specify/templates/checklist-template.md
```

## Required SeaBridge Principles

- Production readiness.
- Tests required when practical.
- Tenant/company/property isolation.
- Source traces and audit trails.
- No silent AI mutations.
- Backend/frontend consistency.
- Existing architecture reuse.
- No duplicate modules.
- No generic disconnected agents.
- Risk, compliance, and reporting integration when relevant.
- Sustainability-specific acceptance criteria where relevant.

## Required Spec Fields

Feature specs must cover:

- problem statement
- business objective
- users/personas
- user stories
- functional requirements
- non-functional requirements
- acceptance criteria
- edge cases
- out of scope
- dependencies
- risks
- data model assumptions
- evidence/reporting needs
- AI behavior constraints
- security/privacy constraints
- SeaBridge module integration points

## Quality Gates

Before implementation, the artifacts should answer:

- What tenant/company/property scope applies?
- What data source, citation, or evidence trail is required?
- Which existing module owns the behavior?
- Which backend contract supports each frontend workflow?
- What AI guardrail prevents ungrounded or silent mutation behavior?
- Which tests or checks prove the user story works?
- What migration, rollout, or compatibility risk remains?

## Sample Dry-Run Feature

Use this feature only for workflow validation unless product implementation is
explicitly requested:

```text
Add a Sustainability Procurement intake workflow that converts a natural-language
procurement need into a structured ProcurementRequest.
```

Expected outputs are `.specify` artifacts only. Do not implement the product
feature as part of preset validation.
