# Harness Test And Improvement Report - 2026-05-11

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

## Tests Run

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-harness.ps1 -Advisory
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-harness.ps1 -Advisory -UpdateBaseline
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-harness.ps1 -FailOnFinding
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-agent-runtime-guardrails.ps1
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-shared-agent-skills.ps1
pre-commit run seabridge-frontend-harness --files src/app/not-found.tsx
pre-commit run seabridge-openseabri-harness --files bridge/agent_bridge.ts
pre-commit run seabridge-backend-harness --files app/api/v1/endpoints/gresb_assessment.py
pre-commit validate-config
```

## Results

| Check | Result |
|---|---|
| Central harness scan | PASS |
| Baseline refresh | PASS |
| Strict baseline-diff full scan | PASS |
| Agent runtime guardrails | PASS |
| Shared agent skills validation | PASS |
| Targeted frontend pre-commit | PASS |
| Targeted OpenSeaBri pre-commit | PASS |
| Targeted backend pre-commit | PASS |
| Backend/frontend/OpenSeaBri pre-commit config validation | PASS |

Repo `pre-commit run --all-files` is intentionally stricter than the historical
baseline and may fail on existing debt. Use `check-harness.ps1 -FailOnFinding`
for baseline-diff full scans and pre-commit hooks for changed-file blocking.

## Before And After

| Rule | Before | After | Change |
|---|---:|---:|---:|
| `frontend.production-console` | 529 | 109 | -420 |
| `backend.route-auth-boundary` | 126 | 16 | -110 |
| `backend.external-call-timeout` | 13 | 12 | -1 |
| `backend.subprocess-timeout` | 9 | 8 | -1 |
| `backend.retry-bounds` | 7 | 7 | 0 |
| `frontend.raw-fetch-boundary` | 12 | 12 | 0 |
| `frontend.accessibility-button-name` | 291 | 436 | +145 |

## Improvements Made

- Added changed-file support to backend and frontend guardrail scripts.
- Updated backend/frontend/OpenSeaBri pre-commit hooks to pass filenames instead
  of scanning entire historical baselines.
- Added `manifests/harness/harness-baseline.json` so strict full scans fail only
  on new findings.
- Added `manifests/harness/backend-public-routes.json` for reviewed public route
  exemptions.
- Added blocking-rule filters so changed-file hooks block only high-confidence
  rules while keeping lower-confidence findings advisory.
- Narrowed frontend default scope to production UI source paths, excluding CLI,
  scripts, design handoff artifacts, tests, and build output.
- Improved JSX button-name detection to inspect multi-line button blocks.
- Split accessibility checks into `frontend.icon-button-missing-label` and
  `frontend.button-accessibility-review`.
- Improved backend route-auth detection to recognize router-level dependencies.
- Skipped tests, virtualenv/cache/build output, and vendored `mindsdb` content in
  backend reliability scans.

## Highest-Value Remaining Improvements

1. Add SARIF or markdown output for PR review comments.
2. Add CI jobs to backend/frontend/OpenSeaBri once each repo has a stable
   changed-file or baseline-diff mode.
3. Triage and shrink the baseline, starting with production console logs and
   external-call timeouts.
4. Promote `frontend.icon-button-missing-label` to changed-file blocking after
   the 7 current findings are fixed or allowlisted.
5. Promote backend route-auth findings after the remaining 7 review candidates
   are classified as authenticated or intentionally public.

## Current Useful Findings

- Production console logs remain concentrated in `manageesg-frontend` UI source,
  especially report layouts and profile/team pages.
- Backend route-auth findings are now focused around GRESB assessment,
  share-viewer/OpenSeaBri routes, and OSS connector routes.
- Backend timeout findings are concentrated in Berry, AWS AgentCore, climate
  geocoding, Utility Bill pipeline, and GIS administrative adapters.

## Recommendation

Use the harness immediately in advisory mode and changed-file pre-commit mode.
Full historical scans can now run with `-FailOnFinding` because they compare
against `manifests/harness/harness-baseline.json` and fail only on new findings.
Changed-file hooks are ready to block `frontend.production-console`,
`backend.external-call-timeout`, and `security.secret-pattern`.
