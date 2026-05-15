# GSD Verification Workflow

## Objective

Verify each GSD-controlled phase before completion claims, handoff, or approval-gated next steps.

## Inputs

- Phase plan.
- Files changed.
- Commands/tests run.
- User-facing routes or artifacts.
- Known gaps and risks.

## Outputs

- `VERIFY_WORK.md`
- Updated `STATE.md`
- Updated `CONTEXT.md`
- Gap list or completion evidence.

## Phase Structure

1. Re-read phase acceptance criteria.
2. Verify backend/API contracts.
3. Verify frontend/UI behavior.
4. Verify AI/data integrity and sustainability-domain claims.
5. Verify security and tenant isolation.
6. Run focused tests and broader checks when warranted.
7. Record exact evidence and unresolved risks.

## Required Artifacts

Use `templates/gsd/VERIFY_WORK.md`; use `templates/gsd/FORENSICS.md` if verification fails repeatedly or root cause is unclear.

## Required Approvals

Approval is required before commit, push, PR, merge, cleanup, live/cost calls, or autonomous/yolo retries.

## Validation Steps

- Confirm every claim has fresh evidence.
- Confirm no skipped check is hidden.
- Confirm no requirement was weakened.
- Confirm all unverified items are named.

## Stop Conditions

Stop if tests fail, browser checks fail, contract checks fail, source/provenance is missing, secrets are exposed, auth/tenant isolation is unclear, or any approval-gated action is needed.
