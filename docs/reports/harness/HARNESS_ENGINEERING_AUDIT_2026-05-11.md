# Harness Engineering Audit - 2026-05-11

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

## Scope

Audited the harness surface across:

- `everything-claude-code`
- `manageesg-backend`
- `manageesg-backend/seabridge-dev`
- `manageesg-frontend`
- `openseabri`
- `_upstream`
- `autoresearch`
- `shared-agent-skills`

## Existing Harness Components Preserved

| Component | Status |
|---|---|
| SeaBridgeAI central system | Preserved as source of truth. |
| `sea-*` skills | Preserved and extended with reviewer personas. |
| Matt Pocock skill wrappers | Preserved as engineering lenses. |
| Superpowers methodology | Preserved through adapted SeaBridge skills. |
| GSD controlled execution | Preserved; no yolo/autonomous mode enabled. |
| Agent Shield + Strix workflow | Preserved; Agent Shield = governance, Strix = active app testing. |
| Repo `AGENTS.md` / `CLAUDE.md` / `AGENTS_SYSTEM.md` | Preserved; repo-specific rules remain authoritative. |
| OpenSeaBri readiness docs and smoke scripts | Preserved. |

## Gaps Found

| Gap | Impact | Harness response |
|---|---|---|
| Standards existed as prose across many docs. | Agents must infer expectations inconsistently. | Added `docs/harness/standards/*`. |
| Reviewer personas were implied, not callable as skills. | Review quality varied by agent. | Added seven `sea-*-reviewer` skills. |
| Guardrails were not centrally runnable. | Repeated manual grep/review work. | Added PowerShell harness scripts. |
| CI/pre-commit integration was uneven. | Regressions can bypass local checks. | Added ECC workflow and repo-local pre-commit configs. |
| Baseline noise is high in backend/frontend. | Immediate blocking enforcement would be noisy. | Scripts are advisory by default; `-FailOnFinding` is opt-in. |

## Baseline Harness Scan

Command:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-harness.ps1 -Advisory
```

Latest report:

`C:\Users\adelm\SeaBridgeAI\everything-claude-code\docs\reports\harness\harness_scan_20260511_192335.json`

Findings:

| Rule | Count |
|---|---:|
| `frontend.production-console` | 529 |
| `frontend.accessibility-button-name` | 291 |
| `backend.route-auth-boundary` | 126 |
| `backend.external-call-timeout` | 13 |
| `frontend.raw-fetch-boundary` | 12 |
| `backend.subprocess-timeout` | 9 |
| `backend.retry-bounds` | 7 |

Interpretation: this is a useful baseline but not ready for full blocking
enforcement. Start with new/changed-file review and targeted remediation.

## High-Priority Follow-Up Queue

1. Triage backend route-auth findings into public exemptions vs real auth gaps.
2. Triage frontend console leakage; enforce no new production console logs first.
3. Fix or document the 13 backend external-call timeout findings.
4. Convert repeated findings into targeted tests once false positives are reduced.
5. Move from advisory to blocking CI by rule after each rule is quiet enough.
