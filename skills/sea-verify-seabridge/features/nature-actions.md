# Nature Actions

Status: configured-unverified. This integration does not claim the existing product is working.

## Sub-features

Actions Save, fresh reopen and attachment upload/download. Preserve Climate UI, calculations, auth, tenant and property boundaries. No Cecil acquisition or recomputation.

## How to get to it (user POV)

Use the existing signed-in frontend on localhost:3000, select the authorized company/property and its current Nature Actions surface. Resolve the exact current route from source; do not invent a route or use a temporary frontend as acceptance.

## Driving it with the existing harness

Inspect `manageesg-frontend/e2e/nature-risk-workflow.spec.ts` for usable selectors and mocks. Unit/mocked checks remain fixture proof. Before writes, bind a reviewed test tenant, property, bounded fields and rollback to the task approval. Save through the intended UI and inspect the actual request/response. Fresh reopen, compare persisted values and source receipt. Upload a task-owned fixture attachment, download it and compare bytes. Keep redacted action/result trace and HTTP evidence with exact source/runtime revisions. Use existing pytest manifests for the affected backend contract.

## Gotchas

No listener, authenticated session, approved data scope, reachable attachment path or real API response means BLOCKED. Do not replace Save with a draft, weaken receipt equality, or convert missing risk values to zero. Capture failures before task-owned cleanup; never stop shared services or clear other sessions.
