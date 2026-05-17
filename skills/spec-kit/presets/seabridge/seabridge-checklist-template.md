# [CHECKLIST TYPE] Checklist: [FEATURE NAME]

**Purpose**: Validate requirement quality before implementation.
**Created**: [DATE]
**Feature**: `spec.md`

## Requirements Quality

- [ ] CHK001 Every functional requirement is testable and unambiguous.
- [ ] CHK002 Every user story has an independent validation path.
- [ ] CHK003 Out-of-scope items are explicit.

## SeaBridge Platform Gates

- [ ] CHK010 Tenant/company/property scope is defined where product data is used.
- [ ] CHK011 Source trace, audit history, and missing-data behavior are defined where evidence or ESG data is used.
- [ ] CHK012 AI behavior has grounding, approval, confidence, and no-silent-mutation constraints where AI is used.
- [ ] CHK013 Backend/frontend contracts are explicit where both surfaces are affected.
- [ ] CHK014 Existing architecture reuse is stated; no duplicate module is proposed.

## Production Readiness

- [ ] CHK020 Security/privacy requirements are explicit.
- [ ] CHK021 Performance/reliability requirements are measurable where relevant.
- [ ] CHK022 Tests and verification commands are identified.
- [ ] CHK023 Rollout, migration, and backward compatibility risks are documented.

## Notes

Check items off only when the requirement artifact satisfies the item.

<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_START -->
## /goal Completion Contract

This Spec Kit artifact inherits SeaBridgeAI `/goal`: define the persistent goal, Definition of Done, validation plan, integrations, risks, dependencies, artifacts, and blockers. Implementation must persist until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_END -->
