# SeaBridgeAI Harness Engineering

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Harness Engineering is the SeaBridgeAI layer that turns recurring engineering
expectations into agent-readable constraints, local checks, reviewer skills, and
CI-ready gates. It extends the existing SeaBridgeAI agent system; it does not
replace `AGENTS.md`, `CLAUDE.md`, `AGENTS_SYSTEM.md`, `AGENT_SKILLS.md`, or
repo-specific instructions.

## Inheritance Model

```text
Global Shared Standards
  -> Shared Agent Skills
  -> Harness Engineering Constraints
  -> Repository-Specific Rules
  -> Task-Specific Runtime Instructions
```

## Load Order

1. Session and developer instructions.
2. Repo-local `AGENTS_SYSTEM.md`, `AGENTS.md`, `CLAUDE.md`, and any explicit per-agent adapter.
3. ECC `SEABRIDGE_CODING_AGENT_SYSTEM.md`.
4. ECC `AGENT_SKILLS.md`.
5. This harness guide and the smallest matching standard.
6. Repo-specific docs and task-specific instructions.

## Operating Rules

- Prefer extension over replacement.
- Convert repeated review comments into docs, checks, tests, or reviewer skills.
- Use automation for objective patterns; use reviewer skills for judgment calls.
- Keep checks explainable and low-noise.
- Do not create recursive agent loops or duplicate command systems.
- Do not install hooks, push, migrate, deploy, or call live/paid providers unless
  the user explicitly approves that specific action.

## Core Standards

| Standard | File |
|---|---|
| Backend reliability | `standards/backend-reliability.md` |
| Backend API | `standards/backend-api.md` |
| Frontend UX | `standards/frontend-ux.md` |
| Security | `standards/security.md` |
| AI grounding | `standards/ai-grounding.md` |
| Observability | `standards/observability.md` |
| Deployment readiness | `standards/deployment-readiness.md` |
| Agent runtime safety | `standards/agent-runtime-safety.md` |

## Reviewer Personas

| Persona | Skill |
|---|---|
| Reliability Reviewer | `sea-reliability-reviewer` |
| Security Reviewer | `sea-security-reviewer` |
| Architecture Reviewer | `sea-architecture-reviewer` |
| Frontend UX Reviewer | `sea-frontend-ux-reviewer` |
| Backend API Reviewer | `sea-backend-api-reviewer` |
| Data/AI Grounding Reviewer | `sea-ai-grounding-reviewer` |
| Production Readiness Reviewer | `sea-production-readiness-reviewer` |

## Local Commands

Each run writes reports to `docs/reports/harness/harness_scan_<timestamp>.json`
and `harness_scan_new_findings_<timestamp>.json` (created on first run). The
baseline lives at `manifests/harness/harness-baseline.json`.

Run all harness checks:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-harness.ps1
```

Run one repo:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-harness.ps1 -Repo backend
```

Run only advisory checks:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-harness.ps1 -Advisory
```

Run strict full scans against the current baseline:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-harness.ps1 -FailOnFinding
```

Refresh the full-scan baseline after intentional triage:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-harness.ps1 -Advisory -UpdateBaseline
```

## Baseline And Blocking Policy

| Mode | Behavior |
|---|---|
| Full advisory scan | Reports all current findings and never blocks. |
| Full strict scan | Compares findings to `manifests/harness/harness-baseline.json` and fails only on new fingerprints. |
| Changed-file backend hook | Blocks only `backend.external-call-timeout` and `security.secret-pattern`. |
| Changed-file frontend/OpenSeaBri hook | Blocks only `frontend.production-console`. |
| Accessibility checks | `frontend.icon-button-missing-label` is high-signal; `frontend.button-accessibility-review` is lower-confidence review debt. |
| Backend public routes | Intentional public route exemptions live in `manifests/harness/backend-public-routes.json`; auth-sensitive routes must use `Depends` instead. |

## Maturity Levels

| Level | Meaning |
|---|---|
| 0 | Ad hoc prompting only. |
| 1 | Documented expectations. |
| 2 | Agent-readable standards. |
| 3 | Automated local guardrails. |
| 4 | Reviewer-agent enforcement. |
| 5 | Self-improving harness loop. |

## Refinement Loop

When a repeated issue appears, follow
`workflows/recurring-issue-refinement.md`: classify, root-cause, choose
documentation/check/test/reviewer/CI enforcement, validate, and document the new
guardrail.
