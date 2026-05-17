# SeaBridgeAI Coding Agent Onboarding Guide

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Canonical system: `C:\Users\adelm\SeaBridgeAI\everything-claude-code`

This guide is for Claude Code, Codex, Gemini, OpenCode, Cursor, Copilot CLI, and future local coding agents working across the SeaBridgeAI workspace.

## Source Of Truth

1. User's explicit task instructions.
2. Safety and security constraints.
3. `SEABRIDGE_CODING_AGENT_SYSTEM.md`.
4. `AGENTS_SYSTEM.md`.
5. Repo-specific `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `CODEX.md`, `OPENCODE.md`.
6. Relevant `skills/sea-*/SKILL.md` files and `.agents/skills/sea-*` wrappers.
7. Matching workflows and checklists.
8. Tool-specific docs and upstream references.
9. Prior handoffs, reports, and session notes.

If two instructions conflict, keep the stricter safety rule and document the conflict.

## Repository Map

| Repo | Role | Use It For | Do Not Use It For |
|---|---|---|---|
| `manageesg-backend` | FastAPI backend, enterprise APIs, AI runtime, ESG data services | API routes, schemas, services, auth, tenant data, AI manager/agent runtime | Frontend-only UI fixes or upstream experiments |
| `manageesg-frontend` | Next.js enterprise dashboard | Enterprise UI, dashboard workflows, API-backed experiences | Inventing data contracts not backed by backend |
| `openseabri` | Consumer/community app and agent harness/tool layer | MCP resources/tools, channels, OpenSeaBri bridge/proxy surfaces | Duplicating enterprise backend data systems |
| `everything-claude-code` | Central coding-agent system | Skills, workflows, checklists, compatibility, onboarding, reports | Product feature implementation |
| `autoresearch` | Research/ML/optimization tooling | Feynman, Paper2Agent, graphify, experiment harnesses | Direct production behavior without review |
| `climada-stack` | CLIMADA physical/nature/climate-risk reference stack | Opt-in climate-risk review, adapters, and validation context | Silent production integration without explicit scope |
| `.falkordb-data` | FalkorDB local data volume | Data-volume awareness and explicit approval-gated maintenance only | Source-code work, skill storage, or destructive cleanup |
| `_upstream` | Active pinned upstream mirror workspace | Upstream review, compatibility patches, adapter analysis, tests, and controlled reference extraction | Blind copying into product repos or treating upstream unsafe examples as permission |

Only the repositories listed in this table are active workspace targets. Do not scan for, clone, or expect secondary shared-skills repositories or unlisted tool repos.

## Cross-Repo Workflow

1. Read the local repo root guidance first, then ECC central guidance.
2. Establish a `/goal` frame for non-trivial work: goal, Definition of Done, validation plan, affected systems, dependencies, risks, artifacts, and edge cases.
3. Load the repo integration file under `repo-integrations/`.
4. Use `docs/SKILL_ROUTING_REFERENCE.md` to pick the smallest skill set.
5. Inspect relevant files before editing.
6. Make scoped changes only.
7. Run targeted validation and broaden checks when risk warrants it.
8. Write reports and handoffs under approved folders, not repo root.
9. Summarize changed files, scans/tests run, skipped checks, unresolved risks, and manual approval items.

For efficient system validation, prefer:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-coding-agent-system.ps1
```

Do not use broad recursive searches for unlisted repos unless Alejandro explicitly adds them to the active inventory.

## Testing Expectations

Backend:

- Prefer focused `pytest` for touched routes/services.
- Verify route registration, request/response schema, auth dependency, tenant filtering, source data, missing-data behavior, and error shape.

Frontend:

- Run the narrowest relevant lint/typecheck/test/build path.
- Verify route visibility, loading/error/empty states, API contracts, and responsive layout.
- Use Playwright or screenshots when UI behavior is central.

OpenSeaBri:

- Verify MCP, WebSocket, HTTP, auth token, fail-closed behavior, and bridge/proxy contracts as relevant.
- Keep standalone mode safe when backend is unavailable.

Research/ML:

- Use tool-local tests or smoke checks.
- Preserve provenance and prevent unreviewed research from flowing into production behavior.

## Report And Log Organization

Use:

- `docs/reports/audits/`
- `docs/reports/readiness/`
- `docs/reports/qa/`
- `docs/reports/smoke-tests/`
- `docs/reports/deployments/`
- `docs/reports/benchmarks/`
- `docs/reports/fixes/`
- `docs/reports/handoffs/`
- `docs/reports/conflicts/`
- `docs/reports/reviews/`
- `logs/`
- `test-results/`
- `artifacts/agent-runs/`

Do not place transient logs, QA reports, smoke reports, or handoffs in repository roots.
Use `checklists/root-clutter.md` before creating or moving report/log artifacts.

## Safety Rules

- No commits or pushes without explicit approval.
- No global installs or marketplace/plugin changes without explicit approval.
- No yolo, autonomous, dangerous, or permission-skipping modes.
- No paid/live provider calls, GPU training jobs, long-running experiments, migrations, or production data changes without explicit approval.
- No destructive filesystem, database, vector-store, cloud, or infrastructure actions.
- No secrets in code, docs, logs, screenshots, reports, or commits.
- Claude Mem remains excluded unless separately approved.

## Sustainability Data Rules

- Do not fabricate ESG, emissions, LCA, climate-risk, nature, procurement, target, utility, due-diligence, or financial data.
- Missing data remains missing or is explicitly marked provisional.
- User-facing claims need sources, units, geography, timeframe, scenario, confidence, and provenance where applicable.
- Frontend claims must be backed by verified backend/API/source behavior.
- If evidence is unavailable, say `NEEDS EVIDENCE` or document the uncertainty.

## Escalating Uncertainty

Stop and ask when acceptance criteria are ambiguous, a requested repo/path is missing, a task needs a prohibited approval-gated action, or a data/source claim cannot be verified. Otherwise, proceed locally with the smallest safe scoped change and document residual risk.

If a session runs out of tokens, no local script can guarantee autonomous ChatGPT/Codex resumption. Leave a concise handoff and rerun the targeted validation command when the session resumes.
