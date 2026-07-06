# SeaBridgeAI Skill Routing Reference

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Canonical system: `C:\Users\adelm\SeaBridgeAI\everything-claude-code`

Use this file as the fast routing map for SeaBridgeAI coding agents. It does not replace repo-local `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `CODEX.md`, `OPENCODE.md`, or the canonical skill bodies in `skills/`.

## Priority

The canonical precedence lives in ECC `AGENTS_SYSTEM.md` ("Instruction
Precedence And Load Order"). Consistent with it:

1. Tier-1 hard safety rules in ECC `AGENTS_SYSTEM.md`. Non-suspendable.
2. User's explicit task instructions (may relax anything except Tier-1).
3. Repo-specific agent instructions.
4. Central SeaBridgeAI system files in ECC and cross-agent compatibility guidance.
5. Relevant canonical `skills/sea-*/SKILL.md` files and wrappers.
6. Relevant workflows and checklists.
7. Tool docs and upstream references.
8. Prior handoffs, notes, and reports.

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
| Unsure which skill applies | `sea-skill-map` | Smallest routed skill set stated in the plan |
| Queued issues, tickets, AFK implementation units | `sea-task-queue-execution` | Acceptance criteria and stop conditions per unit |
| Stateful teaching session | `sea-teach-loop` | Lightweight continuity notes |
| Failed task, weak verification, repeated mistake | `sea-error-recovery-loop` | Root cause plus prevention decision |
| Broad or ambiguous feature design | `sea-brainstorming-and-spec-refinement` | Refined spec with explicit assumptions |

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

## Platform Diagnostics Skills (manageesg-backend product domains)

Domain-specific diagnostics for the SeaBridgeAI platform itself, distinct
from the generic coding-workflow skills above. Sourced from
`docs/reports/platform-diagnostics/seabridge_platform_improvement_plan_2026-07-03.md`.

| Domain / Trigger | Skill |
|---|---|
| Platform-wide module status before scoping new work | `sea-platform-diagnostics` |
| Contract drift across backend/frontend/openseabri | `sea-cross-repo-contract-map` |
| Evidence/claim provenance tracing | `sea-evidence-lineage` |
| Any change near reporting/emission-factor/GRESB-adjacent code | `sea-reporting-no-touch` |
| Initiatives & Investments (business case, source conversion, Action Center) | `sea-initiatives-action-center` |
| Sustainability Procurement / Supply Chain | `sea-procurement-and-supply-chain` |
| Marketplace demo/seed/bootstrap endpoints | `sea-marketplace-production-gating` |
| Integration hub / sync-engine changes | `sea-integration-health-review` |

## Repository Routes

| Repository | Role | Default Skills |
|---|---|---|
| `manageesg-backend` | FastAPI app, enterprise APIs, AI runtime, sustainability data services | `sea-senior-dev-workflow`, `sea-backend-api-verification`, `sea-ai-data-integrity`, `sea-sustainability-domain-review` |
| `manageesg-frontend` | Next.js enterprise dashboard and API-backed workflows | `sea-frontend-design`, `sea-backend-api-verification`, `sea-ai-data-integrity` |
| `openseabri` | Consumer/community sustainability product and reusable agent harness/tool layer | `sea-frontend-design`, `sea-ai-data-integrity`, `sea-backend-api-verification`, `sea-cross-repo-handoff` |
| `autoresearch` | Research, Feynman, Paper2Agent, graphify, ML experiments | `sea-ai-data-integrity`, `sea-sustainability-domain-review`, `sea-context-hygiene`, `sea-cross-repo-handoff` |
| `climada-stack` | CLIMADA physical/nature/climate-risk reference stack | `sea-ai-data-integrity`, `sea-sustainability-domain-review`, `sea-cross-repo-handoff` |
| `.falkordb-data` | FalkorDB data volume, not a source repo | `sea-context-hygiene`, `sea-ai-data-integrity` only for explicit data-volume review |
| `_upstream` | Active pinned upstream workspace for mirror review, compatibility patches, adapter analysis, tests, and controlled reference extraction | `sea-senior-dev-workflow`, `sea-context-hygiene`, `sea-cross-repo-handoff`, reviewer skills as needed |

Only these rows are active routing targets. Unlisted repos and secondary shared-skills repositories are outside the active workspace unless Alejandro explicitly updates the inventory.

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

Use this targeted check instead of broad recursive workspace scans. It exits cleanly when the active workspace is consistent.

Broad scans should exclude `external/`, `vendor/`, `plugins/`, `node_modules/`, virtual environments, build outputs, and generated graph/report artifacts.
