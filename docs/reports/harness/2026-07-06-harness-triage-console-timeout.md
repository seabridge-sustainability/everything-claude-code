# Harness Triage: Console Logs And External Timeouts

Date: 2026-07-06
Scope: ECC harness checks for `manageesg-frontend` and `manageesg-backend`

## Summary

Continued the first deep-audit pass from the unified agent-system review. The
initial target categories were `frontend.production-console` and
`backend.external-call-timeout`.

Both categories were removed from the fresh advisory harness output by fixing
harness false positives, not by changing product behavior.

## What Changed

- `scripts/check-frontend-guardrails.ps1`: excludes `.qa-snapshots` from the
  production UI scan. The prior 119 console findings all came from archived QA
  snapshots, not live frontend source.
- `scripts/check-backend-guardrails.ps1`: treats HTTP calls as bounded when
  `timeout=` appears within the surrounding multi-line call and skips
  comment/docstring examples. The prior timeout findings included bounded calls
  whose timeout argument appeared on a following line.

## Evidence

Before the scanner refinements, the latest full advisory report showed:

- 119 `frontend.production-console`
- 24 `backend.external-call-timeout`

Focused triage showed:

- `frontend.production-console`: 119 total, 119 under `.qa-snapshots`, 0 live
  frontend source files.
- `backend.external-call-timeout`: after removing line-based false positives,
  the remaining apparent findings were also bounded calls with `timeout=` in
  larger request blocks.

Fresh validation after the harness refinements:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\check-frontend-guardrails.ps1 -RepoPath C:\Users\adelm\SeaBridgeAI\manageesg-frontend
powershell -ExecutionPolicy Bypass -File scripts\check-backend-guardrails.ps1 -RepoPath C:\Users\adelm\SeaBridgeAI\manageesg-backend
powershell -ExecutionPolicy Bypass -File scripts\check-harness.ps1 -Advisory
git diff --check -- scripts\check-backend-guardrails.ps1 scripts\check-frontend-guardrails.ps1
```

Fresh full advisory report:

`docs/reports/harness/harness_scan_20260705_205906.json`

Fresh counts:

| Rule | Count |
|---|---:|
| `frontend.button-accessibility-review` | 474 |
| `frontend.raw-fetch-boundary` | 14 |
| `backend.subprocess-timeout` | 13 |
| `backend.retry-bounds` | 9 |
| `frontend.icon-button-missing-label` | 7 |
| `backend.route-auth-boundary` | 6 |

No `frontend.production-console` or `backend.external-call-timeout` findings
remain in the fresh full advisory output.

## Files Reviewed

- `scripts/check-harness.ps1`
- `scripts/check-frontend-guardrails.ps1`
- `scripts/check-backend-guardrails.ps1`
- `docs/harness/standards/frontend-ux.md`
- `docs/harness/standards/backend-reliability.md`
- latest harness JSON reports under `docs/reports/harness/`
- representative backend call sites flagged by the prior timeout scan

## Remaining Risks

- The backend timeout detector now uses a 16-line call window. That is enough
  for current request blocks but still heuristic, not a Python AST parse.
- The remaining accessibility and raw-fetch findings are real backlog candidates
  but were not triaged in this pass.
- Existing dirty worktrees in ECC, backend, and frontend were preserved.

## Recommended Next Audit

Triage `backend.subprocess-timeout` next because it is the remaining backend
bounded-execution category with the highest count and direct reliability impact.

## Continuation: Backend Subprocess Timeouts

Continued with `backend.subprocess-timeout`.

Before this pass, the fresh full advisory report showed:

- 13 `backend.subprocess-timeout`

Triage split:

- false positives from multi-line `subprocess.run(...)` calls where `timeout=`
  appeared below the first line;
- copied agent-skill surfaces under `.agents`, `.claude`, `.openhands`, and
  `data/skills`, which are not backend service runtime source;
- two true backend runtime gaps:
  `app/services/sustainability_research.py` and
  `seabridge_ai/src/berry/verify.py`.

Changes made:

- `scripts/check-backend-guardrails.ps1`: reuses the multi-line timeout window
  for subprocess calls and excludes copied agent-skill folders from the backend
  product scan.
- `app/services/sustainability_research.py`: passes the existing operation
  timeout into `subprocess.run`, so the PowerShell child process itself is
  bounded instead of only the coroutine wait.
- `seabridge_ai/src/berry/verify.py`: adds a 60-second timeout around
  `cosign verify-blob` and returns a structured failure on timeout.

Fresh validation:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\check-backend-guardrails.ps1 -RepoPath C:\Users\adelm\SeaBridgeAI\manageesg-backend
.\venv\Scripts\python.exe -m py_compile app\services\sustainability_research.py seabridge_ai\src\berry\verify.py
powershell -ExecutionPolicy Bypass -File scripts\check-harness.ps1 -Advisory
git diff --check -- scripts\check-backend-guardrails.ps1
git diff --check -- app\services\sustainability_research.py seabridge_ai\src\berry\verify.py
```

Fresh full advisory report:

`docs/reports/harness/harness_scan_20260705_210837.json`

Fresh counts:

| Rule | Count |
|---|---:|
| `frontend.button-accessibility-review` | 474 |
| `frontend.raw-fetch-boundary` | 14 |
| `backend.retry-bounds` | 9 |
| `frontend.icon-button-missing-label` | 7 |
| `backend.route-auth-boundary` | 6 |

No `backend.subprocess-timeout`, `backend.external-call-timeout`, or
`frontend.production-console` findings remain in the fresh full advisory
output.

Recommended next audit: triage `backend.retry-bounds`.
