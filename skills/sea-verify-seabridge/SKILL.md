---
name: sea-verify-seabridge
description: Run or maintain evidence-linked SeaBridge feature verification using existing pytest, Vitest, Playwright and actual authenticated API/UI journeys; distinguish runtime proof from fixtures and readiness.
---

# SeaBridge feature verification

Extend `verification-loop` and `sea-backend-api-verification`; use one primary workflow.

1. Select the affected feature from [the feature map](features/README.md). Read current source and existing harnesses before running a recipe. Preserve approved behavior and scientific missing-data states.
2. Doctor the intended instance, authentication and test-data prerequisites. Reuse primary frontend :3000 and backend :8000. Serialize shared-browser driving and shared-state checks. Missing prerequisites are BLOCKED, not permission to launch another app, seed data or use a different port.
3. Use `pstack_verify_feature` or `node integrations/pstack/cli.mjs verify FEATURE` for allowlisted tooling/readiness probes. For affected interface drift or URL safety, use `pstack_factory`/`suite_factory` or `node integrations/software-factory/cli.mjs contract|verify`; [Pstack's existing guide](../../docs/tools/PSTACK_ECC_GUIDE.md) defines prerequisites, snapshot identity and proof limits. Empty test discovery fails. The runner does not perform Nature data writes; readiness PASS is not authenticated product proof.
4. For every UI component/layout change, load the existing [browser workflow](../../agent-tooling/skills/seabridge-browser-autonomy/SKILL.md). Validate a source-bound UI contract before implementation and collect before/after desktop/mobile screenshots, successful playback and traces on **D: only**. Missing D, capture capacity, approved baseline or authenticated prerequisites stay explicit blockers; no C:/E: fallback or unverified UI completion. For a product journey, use the mapped existing harness with explicit test tenant/data authorization. Inspect mocks and prove the actual UI action, real HTTP response and durable side effect. Preserve evidence after cleanup. Run focused checks, then broaden for demonstrated risk or failure.
5. Before claiming completion, inspect redacted receipts, source revision, fixture/mock status and every required acceptance scenario. A green unit test, screenshot or HTTP 401 cannot substitute for required persistence or signed-in proof.
6. Maintain the affected feature entry and a useful regression check with the behavior change. Update version-controlled knowledge under existing knowledge-ops boundaries; do not edit personal memory, ingest tenant data or rewrite all skills on merge.

Use `cursor-pstack/ecc/create-verification-skill` for a recurring missing recipe; `cursor-pstack/ecc/maintain-verification-skill` for confirmed drift. Unexecuted recipes are configured-unverified.
