---
name: speckit-clarify
description: Resolve high-impact ambiguity in the active feature spec before planning, then record the answers in `spec.md`.
---

# speckit-clarify

## Purpose

Find underspecified areas in the current feature spec, ask only high-impact
questions, and write accepted answers back into the spec.

## Inputs

- Active `.specify/specs/<feature-id>/spec.md`.
- Optional user focus area.
- Project constitution.
- Repo-local and ECC guidance.

## Output

Update `spec.md` with:

```markdown
## Clarifications

### Session YYYY-MM-DD
- Q: ... A: ...
```

Also update the affected requirement, user story, edge case, data assumption,
security constraint, AI behavior constraint, or acceptance criterion so the
clarification is not stranded.

## Ambiguity Taxonomy

Check at least:

- affected module
- exact user workflow
- data sources
- permission model
- tenant/property/company scope
- backend/frontend integration
- agent behavior
- required documents/evidence
- success criteria
- test requirements
- migration requirements
- reporting mappings
- failure states

## Workflow

1. Load the active spec. If no active spec can be found, ask the user for the
   feature id or tell them to run `speckit-specify`.
2. Build an internal ambiguity map.
3. Ask at most five questions, one at a time.
4. Prefer questions whose answers change architecture, data model, contracts,
   tests, compliance, AI guardrails, or implementation ordering.
5. If a reasonable inference is safe and low risk, document it as an assumption.
6. After each accepted answer, update `spec.md` immediately.
7. Preserve unrelated sections and formatting.
8. Report questions answered, sections touched, and remaining deferred risks.

## Verification

- No more than five formal clarification questions were asked.
- Each accepted answer appears in the Clarifications section and in the relevant
  spec body.
- No contradictory old language remains.
- Remaining ambiguity is explicitly marked as deferred or low impact.

<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_START -->
## /goal Completion Contract

This Spec Kit artifact inherits SeaBridgeAI `/goal`: define the persistent goal, Definition of Done, validation plan, integrations, risks, dependencies, artifacts, and blockers. Implementation must persist until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_END -->
