---
name: seabridge-browser-autonomy
description: Specify and verify scoped SeaBridge UI changes using source-bound before/after contracts and D-only screenshots, video and traces through ECC CLI or existing MCP.
---

# SeaBridge browser verification

This task workflow inherits the three central policy files and grants no write,
data, provider, merge or deployment authorization. Preserve running sessions and
primary frontend :3000/backend :8000; never launch a substitute app for proof.

1. Read the affected feature in `manifests/feature-ownership.json` and
   `docs/tools/SEABRIDGE_MODULE_GUIDE.md`, then verify current source. Owners are
   task-scoped roles, not permanent agents or write reservations. Select exact
   routes/files; preserve adjacent layout/copy/tokens, selected company/property,
   API/auth/tenant boundaries and missing-data distinctions. Resolve only material
   ambiguity through the existing requirements-discovery workflow.
2. Prepare a small JSON request `{ "contract": { ... } }` matching
   `schemas/ui-change-contract.schema.json`: delta, protected behavior, reproduced
   before state, after acceptance, mobile/desktop viewports, UI states, recipes,
   and approved baseline identity or explicitly unavailable baseline. Run
   `node scripts/browser-evidence.js admit request.json` from ECC before edits.
   Admission validates scope and records current HEAD/file hashes on D:; it
   never grants implementation permission or proves baseline approval.
3. Use `node scripts/browser-evidence.js capture request.json`, with admission,
   phase (`before`/`after`), exact route, state and bounded checks. The same calls
   are available through existing `pstack_factory`/`suite_factory` operations
   `ui-features`, `ui-admit`, `ui-capture`, `ui-validate`, `ui-image`. No new MCP
   server is needed. `ui-image` returns standard MCP image content to a vision
   capable caller; reading the JSON receipt is not visual review.
4. Capture before and after for every declared state and viewport. Browser
   evidence, profiles, downloads, temporary files and reports belong under
   `D:/SeaBridgeAI-data/agent-evidence/playwright`, on the admitted volume only.
   Missing/wrong/full D or insufficient RAM fails closed with no C:/E: fallback.
   Existing historical evidence is retained. The shared capture broker serializes
   its own new browser; it never attaches to or stops another browser or app.
5. Validate `{ "admission": "D:/.../admission.json", "receipts": [ ... ] }` via
   `node scripts/browser-evidence.js validate request.json`. Every viewport needs
   its own PNG, successful WebM playback and ZIP trace, bound to current source.
   Inspect screenshots/playback for actual requested behavior and protected
   design; report incomplete scenarios and baseline approval separately.
6. The built-in broker is an anonymous, read-only primary-origin capture. It
   blocks API/data writes and external requests. Signed-in workflows, APIs,
   uploads, Save/fresh-reopen and exports require their existing authorized
   product recipes. A green media validator means **evidence ready for review**;
   it does not mean product acceptance, cross-agent enforcement or safe merge.
7. Maintain only the affected feature recipe and useful regression checks.
   Pstack create/maintain verification workflows support missing or drifting
   recipes. Use one primary workflow; do not stack competing planning/review
   systems or create another project rulebook.

Frontend Playwright configs use the ECC D-only helper and retain successful
recordings. Guards apply to these managed processes and the broker, not arbitrary
capture programs or already-running clients. Client-specific live proof must be
recorded separately from SDK/configuration checks.
