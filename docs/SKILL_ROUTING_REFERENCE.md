# SeaBridgeAI Skill Routing Reference

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Canonical system: `C:\Users\adelm\SeaBridgeAI\everything-claude-code`

Use this file as the fast routing map for SeaBridgeAI coding agents. It does not replace repo-local `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `CODEX.md`, `OPENCODE.md`, or the canonical skill bodies in `skills/`.

## Priority

1. User's explicit task instructions.
2. Safety and security constraints.
3. Central SeaBridgeAI system files in ECC.
4. Cross-agent compatibility guidance.
5. Repo-specific agent instructions.
6. Relevant canonical `skills/sea-*/SKILL.md` files and wrappers.
7. Relevant workflows and checklists.
8. Tool docs and upstream references.
9. Prior handoffs, notes, and reports.

When local repo guidance appears to conflict with central policy, preserve the stricter safety rule and document the conflict in the task report.

## Default Route

Use `sea-senior-dev-workflow` for any non-trivial SeaBridgeAI coding, docs, QA, review, or cross-repo task. Add the smallest domain skill below.

| Task | Use These Skills | Verification Bias |
|---|---|---|
| Backend endpoint or API contract | `sea-backend-api-verification`, `sea-senior-dev-workflow` | Route registration, schema, auth, tenant filters, focused pytest or curl proof |
| Backend service/data-source change | `sea-backend-api-verification`, `sea-ai-data-integrity` when sustainability data is involved | Source trace, units, timeframe, error and missing-data behavior |
| Frontend dashboard or UI workflow | `sea-frontend-design`, `sea-backend-api-verification` | Route visibility, responsive states, endpoint-backed data, screenshot or Playwright check |
| AI assistant, RAG, report, LCA, emissions, climate-risk, or due-diligence output | `sea-ai-data-integrity`, `sea-sustainability-domain-review` | Provenance, citations, confidence, units, geography, scenario, timeframe |
| Cross-repo feature | `sea-task-orchestration`, `sea-cross-repo-handoff`, `sea-gsd-controlled-execution` | Per-repo contract checks and handoff artifact |
| Multi-phase long-running local task | `sea-gsd-controlled-execution`, `sea-context-hygiene` | Phase plan, preserved state, explicit skipped checks |
| Bug or failing test | `sea-systematic-debugging`, then the domain skill | Reproduce, isolate root cause, focused regression proof |
| New reusable skill, wrapper, workflow, or checklist | `sea-skill-creator-protocol` | Canonical file, wrapper, unique name, cross-agent notes, no unsafe permissions |
| Test-first behavior change | `sea-test-driven-development`, domain skill | Red/green evidence when practical |
| Completion claim | `sea-verification-before-completion` | Fresh command or observable evidence |
| Code review response | `sea-code-review-response` | Findings triage, applied fixes, remaining risks |
| Local worktree isolation | `sea-git-worktree-isolation` | Dirty-worktree check and explicit scope |
| Parallel subtasks | `sea-parallel-agent-dispatch` only when authorized | Independent scope, disjoint write sets, integration review |
| Branch finish / publish readiness | `sea-finishing-development-branch` | Final diff review, tests, manual approval before commit or push |
| Knowledge vault / markdown notes / frontmatter / canvas / base | `sea-knowledge-vault` | Dry-run validation unless apply is explicitly approved |
| Local LLM, Unsloth, LoRA, inference routing | `sea-local-llm-training` | HF/model access, VRAM budget, local endpoint health, no long job without approval |

## Reviewer Skills

Use reviewer skills for second-pass risk checks or focused reviews.

| Review Need | Skill |
|---|---|
| AI grounding, claims, provenance, prompt-injection risk | `sea-ai-grounding-reviewer` |
| Architecture, coupling, module boundaries, duplicated logic | `sea-architecture-reviewer` |
| Backend API contracts and route/security review | `sea-backend-api-reviewer` |
| Frontend UX implementation review | `sea-frontend-ux-reviewer` |
| Production readiness, env, deploy, smoke, rollback | `sea-production-readiness-reviewer` |
| Reliability, timeouts, retries, observability | `sea-reliability-reviewer` |
| Security, secrets, auth, tenant isolation, unsafe tools | `sea-security-reviewer` |

## Repository Routes

| Repository | Role | Default Skills |
|---|---|---|
| `manageesg-backend` | FastAPI app, enterprise APIs, AI runtime, sustainability data services | `sea-senior-dev-workflow`, `sea-backend-api-verification`, `sea-ai-data-integrity`, `sea-sustainability-domain-review` |
| `manageesg-frontend` | Next.js enterprise dashboard and API-backed workflows | `sea-frontend-design`, `sea-backend-api-verification`, `sea-ai-data-integrity` |
| `openseabri` | Consumer/community sustainability product and reusable agent harness/tool layer | `sea-frontend-design`, `sea-ai-data-integrity`, `sea-backend-api-verification`, `sea-cross-repo-handoff` |
| `autoresearch` | Research, Feynman, Paper2Agent, graphify, ML experiments | `sea-ai-data-integrity`, `sea-sustainability-domain-review`, `sea-context-hygiene`, `sea-cross-repo-handoff` |
| `_upstream` | Pinned/reference upstream mirrors | `sea-senior-dev-workflow`, `sea-context-hygiene`, `sea-cross-repo-handoff` |
| `file-code` | Deferred/inactive knowledge graph/file intelligence repo; not present in the active workspace as of 2026-05-17 | Do not scan, clone, or add unless Alejandro provides a source path |
| `app-streaming` | Deferred/inactive streaming/multi-tool orchestration repo; not present in the active workspace as of 2026-05-17 | Do not scan, clone, or add unless Alejandro provides a source path |

## Safety Defaults

- Do not commit or push without explicit approval.
- Do not install packages globally or change marketplace/plugin installs without explicit approval.
- Do not enable yolo, autonomous, dangerous, or permission-skipping execution.
- Do not run paid API calls, live provider calls, long-running training jobs, migrations, or production data changes without explicit approval.
- Do not fabricate sustainability data. Missing data remains missing or explicitly provisional.
- Do not make frontend claims without backend/API/source verification.
- Do not copy long skill bodies into product repos. Reference ECC.

## Efficient System Checks

For a fast consistency check, run from ECC:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\check-coding-agent-system.ps1
```

Use this targeted check instead of broad recursive workspace scans. It exits cleanly when the active workspace is consistent. To show deferred/inactive repos such as `file-code` and `app-streaming`, add `-IncludeOptionalRepos`.

Broad scans should exclude `external/`, `vendor/`, `plugins/`, `node_modules/`, virtual environments, build outputs, and generated graph/report artifacts.
