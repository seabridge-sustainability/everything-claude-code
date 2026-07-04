---
name: sea-procurement-and-supply-chain
description: Review or extend SeaBridgeAI Sustainability Procurement and Supply Chain without reintroducing the opaque-scoring, unguarded-lifecycle, or silent-nav-visibility anti-patterns already fixed.
---

# sea-procurement-and-supply-chain

## Purpose

Keep the Procurement/Supply Chain module (`app/models/sustainability_procurement.py`,
`app/services/sustainability_procurement.py`, `ProcurementPage.tsx`,
`app/models/supply_chain/__init__.py`) internally consistent -- typed
scoring, an enforced lifecycle, Evidence-Vault-linked attachments, and
tenant-isolated tests -- as it grows.

## When To Call

Before touching `ProcurementComparison` scoring, `ProcurementRequestStatus`
transitions, supplier/quote attachment handling, or the nav visibility of
either module's `menuItems.tsx` entry.

## Required Inputs

The specific area being touched (scoring / lifecycle / evidence linkage /
AI task queue / nav visibility).

## Expected Outputs

A pass/fail check against the invariants below, with `file:line`.

## Mandatory Verification

1. Scoring changes use the typed `ScoringCriteria` (9 named dimensions),
   never a bare `dict` -- the pre-fix opaque `evaluation_criteria: dict`
   was a real, shipped gap against the stated business requirement.
2. Status changes go through the `ALLOWED_STATUS_TRANSITIONS` guard in
   `sustainability_procurement.py`, never a raw field assignment that can
   skip states.
3. Supplier/quote attachments link through the Evidence Vault
   (`EvidenceRef`/`evidence_ids`), not a bare `PydanticObjectId` with no
   vault visibility.
4. Any new sub-resource (comparisons, approvals, orders, demand-bundles,
   agent-tasks, catalog, etc.) gets its own RBAC test *and* a genuine
   cross-tenant-isolation test using two distinct fake tenants -- not one
   shared fake tenant reused across every test in the file, which
   previously masked a real tenant-scoping gap.
5. Any change to `menuItems.tsx`'s `hidden` flag for these two modules is
   called out explicitly to the user as a product decision, not flipped
   silently as a side effect of an unrelated change.

## Failure Conditions

Fail if any invariant above is violated, or if a new endpoint returns a
raw Beanie document instead of `response_model.from_model(...)` -- this
exact bug shipped once already and was only caught by a real
tenant-isolation test using genuine ObjectId values instead of mocked
attributes.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Carbon/Scope 3 classification and supplier evidence-quality scores must
carry their source, never a placeholder presented as a real score.

## Cross-Agent Compatibility Notes

Applies identically to backend and frontend changes to either module.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
