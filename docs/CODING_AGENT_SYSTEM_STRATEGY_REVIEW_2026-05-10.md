# SeaBridgeAI Coding-Agent System Strategy Review

Requested output path: `docs/CODING_AGENT_SYSTEM_STRATEGY_REVIEW_2026-05-10.md`

Review executed: 2026-05-17 local scan. No commits, pushes, global installs, paid calls, yolo/autonomous/dangerous execution, or destructive operations were performed.

## Executive Status

| Area | Status | Notes |
|---|---|---|
| Central system | PASS | ECC central files exist and assert `SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1`. |
| Repo instruction consistency | PASS | Main active workspace repos point to ECC. `file-code` and `app-streaming` are explicitly deferred/inactive; `SeaBridgeAI_upstream` is a stale alias for `_upstream`. |
| Skill conflict status | WARN | Wrapper-only reviewer skills were fixed by adding canonical files and wrapper pointers. Large vendored/upstream skill duplicates remain reference-only noise. |
| Skill routing | PASS | Created `docs/SKILL_ROUTING_REFERENCE.md`. |
| Cross-agent compatibility | PASS | Six compatibility guides now include load-first, repo-specific, skill, report/log, approval-gate, unsupported-command, and self-verification guidance. |
| Root clutter/report organization | PASS | Added `checklists/root-clutter.md` and `scripts/check-coding-agent-system.ps1`; root report artifacts found by the checker were moved into approved report folders. |

## Repository Inventory

| Repo | Instruction files found | Skills found | Workflows/checklists found | Tool docs found | Issues found | Status |
|---|---:|---:|---:|---:|---|---|
| `manageesg-backend` | 756 | 24 | 17 | 99 | Very dirty worktree; extensive historical reports/prompts; central pointer present in root docs | WARN |
| `manageesg-frontend` | 68 | 29 | 5 | 0 | Dirty worktree; central pointer present | WARN |
| `openseabri` | 60 | 45 | 8 | 3 | Dirty worktree; central pointer present | WARN |
| `everything-claude-code` | 3103 | 963 | 412 | 5669 | Central system; large external/vendor/reference corpus creates duplicate-skill scan noise | PASS/WARN |
| `autoresearch` | 278 | 41 | 59 | 63 | No root `AGENTS.md` found by scan; backup refs exist; central pointer hits found in active tool docs | WARN |
| `file-code` | 0 | 0 | 0 | 0 | Not listed in `SeaBridgeAI.code-workspace`; do not scan, clone, or add unless Alejandro provides a source path | DEFERRED/INACTIVE |
| `app-streaming` | 0 | 0 | 0 | 0 | Not listed in `SeaBridgeAI.code-workspace`; do not scan, clone, or add unless Alejandro provides a source path | DEFERRED/INACTIVE |
| `SeaBridgeAI_upstream` | 0 | 0 | 0 | 0 | Stale alias; valid active path is `C:\Users\adelm\SeaBridgeAI\_upstream` | STALE ALIAS |
| `_upstream` | 3042 | 359 | 158 | 725 | Exists at `C:\Users\adelm\SeaBridgeAI\_upstream`; reference/upstream only | WARN |

## Source-Of-Truth Hierarchy

Intended hierarchy for agent decisions:

1. User's explicit task instructions.
2. Safety and security constraints.
3. `SEABRIDGE_CODING_AGENT_SYSTEM.md`.
4. `AGENTS_SYSTEM.md`.
5. Repo-specific `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `CODEX.md`, `OPENCODE.md`.
6. Relevant canonical `skills/sea-*/SKILL.md` files and wrappers.
7. Relevant workflows and checklists.
8. Tool-specific docs and upstream references.
9. Prior session notes, handoffs, and reports.

Observed nuance: several existing files phrase load order as local repo guidance first, then ECC. The practical resolution is to read local repo files first for discovery, but resolve conflicts by the hierarchy above and the stricter safety rule.

## Repository Role Crosswalk

| Repo | Role | Primary concerns | Required skills | Testing expectations | Integration points |
|---|---|---|---|---|---|
| `manageesg-backend` | FastAPI backend, enterprise APIs, AI runtime, sustainability data services | Auth, tenant isolation, schemas, database/source truth, AI/runtime safety | `sea-senior-dev-workflow`, `sea-backend-api-verification`, `sea-ai-data-integrity`, `sea-sustainability-domain-review` | Focused pytest, route/schema checks, source/missing-data checks, compile/type checks where relevant | Frontend HTTP, OpenSeaBri proxy `/api/v1/openseabri/*`, autoresearch adapter |
| `manageesg-frontend` | Next.js enterprise dashboard | API-backed claims, route visibility, loading/error/empty states, accessibility, responsive UX | `sea-frontend-design`, `sea-backend-api-verification`, `sea-ai-data-integrity` | Lint/typecheck/build/test, Playwright for user flows | Backend API contracts |
| `openseabri` | Consumer/community sustainability product and agent harness/tool layer | MCP/resources/tools, WebSocket/HTTP, channel integrations, upstream adapters, standalone mode | `sea-frontend-design`, `sea-ai-data-integrity`, `sea-backend-api-verification`, `sea-cross-repo-handoff` | Typecheck, Vitest/node tests, MCP/HTTP/WebSocket smokes, Playwright when UI risk warrants | Backend proxy routes, Hermes/MiroFish/OpenClaw adapters |
| `autoresearch` | Research, ML, optimization, Feynman, Paper2Agent, graphify | Provenance, experiments, local LLM boundaries, no unreviewed production feed | `sea-ai-data-integrity`, `sea-sustainability-domain-review`, `sea-context-hygiene`, `sea-cross-repo-handoff` | Tool-local tests/build/smokes; provenance sidecars | Backend autoresearch adapter, local LLM/Unsloth |
| `file-code` | Deferred/inactive knowledge graph/file intelligence tooling | Not active in current workspace | `sea-cross-repo-handoff`, `sea-knowledge-vault` only after path confirmation | Do not scan, clone, or add until path exists | Backend/frontend/OpenSeaBri context support |
| `app-streaming` | Deferred/inactive streaming/multi-tool orchestration | Not active in current workspace | `sea-gsd-controlled-execution`, `sea-cross-repo-handoff` only after path confirmation | Do not scan, clone, or add until path exists | OpenSeaBri and backend/frontend orchestration |
| `_upstream` | Reference/upstream mirrors | Reuse patterns only after validation; do not blindly copy | `sea-senior-dev-workflow`, `sea-context-hygiene`, `sea-cross-repo-handoff` | Upstream-native commands only after inspection | Hermes, MiroFish, OpenClaw, GSD, other references |

## Skill Catalog Review

| Skill | Purpose | When to use | Repos | Primary workflows | Conflicts | Missing guidance | Status |
|---|---|---|---|---|---|---|---|
| `sea-senior-dev-workflow` | Default engineering loop | Non-trivial code/docs/review/QA | All | Plan, implement, verify | None found | None | PASS |
| `sea-frontend-design` | Enterprise frontend UX | UI/dashboard work | frontend, openseabri | UI contract, browser QA | None found | None | PASS |
| `sea-skill-creator-protocol` | Skill/wrapper governance | New or edited skills | ECC | Canonical + wrapper validation | Fixed reviewer canonical gap | None | PASS |
| `sea-backend-api-verification` | API contract truth | Backend or frontend API claims | backend, frontend, openseabri | Route/schema/auth/source checks | None found | None | PASS |
| `sea-ai-data-integrity` | No fabricated AI/data claims | AI, reports, sustainability outputs | backend, frontend, openseabri, autoresearch | Source/provenance checks | None found | None | PASS |
| `sea-sustainability-domain-review` | ESG/domain correctness | ESG, GHG, LCA, climate, due diligence | backend, frontend, openseabri, autoresearch | Domain review | None found | None | PASS |
| `sea-task-orchestration` | Scoped decomposition | Cross-lane or multi-step tasks | All | Plan and handoff | None found | None | PASS |
| `sea-context-hygiene` | Long-session context/artifacts | Large reports/logs/handoffs | All | Summaries, artifact routing | None found | None | PASS |
| `sea-cross-repo-handoff` | Cross-repo coordination | Any cross-repo work | All | Contract handoff | None found | None | PASS |
| `sea-local-llm-training` | Unsloth/local LLM | Fine-tune/inference routing | ECC, autoresearch, backend | Local LLM checks | Approval gates present | None | PASS |
| `sea-gsd-controlled-execution` | Controlled GSD | Multi-phase work | All | `.planning`/phase artifacts | Explicitly disables yolo/autonomy | None | PASS |
| `sea-brainstorming-and-spec-refinement` | Spec refinement | Ambiguous/broad requests | All | Requirements shaping | None found | None | PASS |
| `sea-test-driven-development` | Red/green/refactor | Behavior changes | All | TDD loop | None found | None | PASS |
| `sea-systematic-debugging` | Root-cause debugging | Bugs/failures | All | Reproduce/isolate/fix | None found | None | PASS |
| `sea-verification-before-completion` | Fresh proof before done | Final verification | All | Test/check evidence | None found | None | PASS |
| `sea-code-review-response` | Review triage/fixes | Code review tasks | All | Findings first | None found | None | PASS |
| `sea-git-worktree-isolation` | Local branch/worktree safety | Risky local isolation | All | Dirty-worktree checks | Approval gates present | None | PASS |
| `sea-parallel-agent-dispatch` | Parallel bounded tasks | Authorized parallel work | All | Disjoint scopes | Requires authorization | None | PASS |
| `sea-finishing-development-branch` | Final branch readiness | Before publish/merge/cleanup | All | Final checks | Approval gates present | None | PASS |
| `sea-knowledge-vault` | Markdown/knowledge validation | Vault/frontmatter/canvas/base | ECC, backend tooling | Dry-run validator | None found | None | PASS |
| Reviewer skills | Focused risk review | Security, reliability, UX, API, architecture, AI grounding, readiness | All | Harness standards and targeted findings | Canonical gap fixed | Need periodic catalog sync | PASS/WARN |

## Non-Skill Guidance Recommendations

| Guidance item | Current location | Recommended destination | Why | Priority |
|---|---|---|---|---|
| Root clutter/report routing | Multiple repo `AGENTS_SYSTEM.md` files and reports | Checklist under ECC plus periodic scan | Repeats across repos and needs enforcement | High |
| Frontend claims require backend proof | Frontend/repo instructions | Keep in `sea-frontend-design` and `sea-backend-api-verification` | Prevents UI-only hallucinated feature claims | High |
| Backend route/schema/auth verification | Backend instructions and repo integration | Keep in `sea-backend-api-verification`; add checklist if not current | Common regression source | High |
| OpenSeaBri harness/channel gates | `openseabri` docs | Preserve repo-specific plus `repo-integrations/openseabri.md` | Product-specific runtime details | Medium |
| AutoResearch provenance | `autoresearch` docs | Preserve repo-specific plus `sea-ai-data-integrity` | Research outputs must stay traceable | Medium |
| file-code/app-streaming role docs | Requested paths only | Keep deferred/inactive until paths are confirmed | Current paths are not active workspace repos | Low |
| Local LLM/Unsloth guardrails | Backend AGENTS, ECC skill | Keep in `sea-local-llm-training` | Approval and VRAM safety | High |

## Contradictions Found And Actions

Fixed:

- `sea-*` reviewer skills existed only as `.agents` wrappers. Added canonical files under `skills/` and converted wrappers to canonical pointers.
- Missing skill routing reference. Created `docs/SKILL_ROUTING_REFERENCE.md`.
- Missing central onboarding guide. Created `docs/onboarding/CODING_AGENT_ONBOARDING_GUIDE.md`.
- Stale ECC authorization-password wording. Replaced with the current no-separate-password rule.
- Stale autonomous-loop phrasing in ECC `AGENTS.md`. Reworded to scoped/controlled/explicitly allowed execution.
- Central callable skill catalogs omitted reviewer skills. Added reviewer skills to ECC catalog surfaces.
- Missing-repo handling. Confirmed `SeaBridgeAI.code-workspace` contains backend, frontend, openseabri, climada-stack, ECC, autoresearch, `.falkordb-data`, `_upstream`, and the knowledge vault, but not `file-code` or `app-streaming`.
- Decision recorded. `file-code` and `app-streaming` are not cloned or added now; they remain deferred/inactive until Alejandro provides source paths.
- Efficient validation. Added `scripts/check-coding-agent-system.ps1` and `checklists/root-clutter.md`.
- Root artifact cleanup. Moved ten root report artifacts from `manageesg-backend` and `openseabri` into approved `docs/reports/audits`, `docs/reports/readiness`, and `docs/reports/qa` folders.

Remaining:

- `file-code` and `app-streaming` are deferred/inactive. Agents should not recursively hunt for them, clone them, or add them unless Alejandro provides source paths.
- `SeaBridgeAI_upstream` is a stale alias. Use `_upstream` at `C:\Users\adelm\SeaBridgeAI\_upstream`.
- Existing load-order language can be read as local-first while the requested hierarchy is central-first. Recommended wording: read local first for discovery, resolve conflicts by central hierarchy and stricter safety.
- External/vendor/upstream directories create duplicate skill-name scan noise. Treat these as reference-only unless explicitly working in those packages.
- Several repos have non-canonical root markdown files and extensive prior reports. Cleanup was not performed.

## Skill Routing Reference

Created: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\docs\SKILL_ROUTING_REFERENCE.md`

## Onboarding Guide

Created: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\docs\onboarding\CODING_AGENT_ONBOARDING_GUIDE.md`

Repo-specific onboarding docs were not found in `manageesg-backend`, `manageesg-frontend`, or `openseabri` during the scan, so no repo onboarding files were updated.

## Cross-Agent Compatibility Status

Compatibility guides exist for:

- `docs/agent-compatibility/claude-code.md`
- `docs/agent-compatibility/codex.md`
- `docs/agent-compatibility/gemini.md`
- `docs/agent-compatibility/opencode.md`
- `docs/agent-compatibility/cursor.md`
- `docs/agent-compatibility/copilot-cli.md`

They cover canonical files, repo-local instructions, skill resolution, safety gates, verification, report/log destinations, and unsupported native-command fallback.

## Efficient Validation Command

Created:

`C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-coding-agent-system.ps1`

Run:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-coding-agent-system.ps1
```

This check uses targeted workspace and root-instruction probes instead of broad recursive scans. It intentionally reports optional missing repos as info findings rather than errors.
By default it omits deferred/inactive repos so active-system validation can finish cleanly. Add `-IncludeOptionalRepos` to show those informational findings.

## Validation Scans

| Scan | Result |
|---|---|
| SYSTEM_ID scan | PASS. Active primary repos and ECC contain `SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1`. |
| EverythingCloudCode scan | PASS. 0 hits in inspected active repos/ECC. |
| Claude Mem active integration scan | PASS/WARN. Active guidance excludes Claude Mem; external/upstream references remain reference-only. |
| Duplicate skill name scan | WARN. Many duplicates in ECC external/vendor/docs/reference corpora; SeaBridgeAI canonical/wrapper duplicates are intentional. |
| Missing wrapper scan | PASS after fix for canonical `skills/sea-*`. |
| Missing canonical scan | PASS after fix for SeaBridgeAI reviewer skills. |
| Stale path scan | PASS. `file-code` and `app-streaming` classified as deferred/inactive; `SeaBridgeAI_upstream` classified as stale alias for `_upstream`. |
| Auto-push/auto-commit/global-install/yolo scan | PASS/WARN. Active SeaBridgeAI guidance prohibits these without approval; external/upstream/reference files are noisy. |
| Repo pointer scan | PASS for backend, frontend, openseabri, ECC, autoresearch, and `_upstream`; deferred repos require path confirmation before scanning. |
| Root clutter policy scan | PASS. Policy exists, `checklists/root-clutter.md` was added, and current root artifact candidates were moved. |

## Tests And Scans Run

Scans were run with `rg`, PowerShell `Get-ChildItem`, `Select-String`, and `scripts/check-coding-agent-system.ps1`. No product test suites were run because this was a documentation/system review, not product code work.

Final targeted check:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-coding-agent-system.ps1
```

Current result:

- Default mode: exit code 0 with no findings when active repos are consistent.
- `-IncludeOptionalRepos`: exit code 0 and informational optional-repo findings.
- `-AsJson`: returns `[]` when there are no findings.

Optional findings:

- `file-code` not present at `C:\Users\adelm\SeaBridgeAI\file-code`.
- `app-streaming` not present at `C:\Users\adelm\SeaBridgeAI\app-streaming`.
- `SeaBridgeAI_upstream` not present at `C:\Users\adelm\SeaBridgeAI_upstream`; use `_upstream` instead.

Moved root report artifacts:

- `manageesg-backend/BACKEND_ENDPOINT_AUDIT.md` -> `manageesg-backend/docs/reports/audits/BACKEND_ENDPOINT_AUDIT.md`
- `manageesg-backend/FRONTEND_BACKEND_CONTRACT_AUDIT.md` -> `manageesg-backend/docs/reports/audits/FRONTEND_BACKEND_CONTRACT_AUDIT.md`
- `manageesg-backend/OVERNIGHT_MANAGEESG_FULLSTACK_AUDIT.md` -> `manageesg-backend/docs/reports/audits/OVERNIGHT_MANAGEESG_FULLSTACK_AUDIT.md`
- `manageesg-backend/PRODUCT_MODULE_HEALTH_REPORT.md` -> `manageesg-backend/docs/reports/readiness/PRODUCT_MODULE_HEALTH_REPORT.md`
- `manageesg-backend/TEST_RESULTS.md` -> `manageesg-backend/docs/reports/qa/TEST_RESULTS.md`
- `openseabri/OPENSEABRI_AGENT_AND_SKILLS_AUDIT.md` -> `openseabri/docs/reports/audits/OPENSEABRI_AGENT_AND_SKILLS_AUDIT.md`
- `openseabri/OPENSEABRI_CHANNEL_INTEGRATION_AUDIT.md` -> `openseabri/docs/reports/audits/OPENSEABRI_CHANNEL_INTEGRATION_AUDIT.md`
- `openseabri/OPENSEABRI_HOMEOWNER_WORKFLOW_HEALTH_REPORT.md` -> `openseabri/docs/reports/readiness/OPENSEABRI_HOMEOWNER_WORKFLOW_HEALTH_REPORT.md`
- `openseabri/OVERNIGHT_OPENSEABRI_AUDIT.md` -> `openseabri/docs/reports/audits/OVERNIGHT_OPENSEABRI_AUDIT.md`
- `openseabri/TEST_RESULTS.md` -> `openseabri/docs/reports/qa/TEST_RESULTS.md`

## Unresolved Risks

- Deferred repos need user-supplied source paths before `file-code` or `app-streaming` can become active workspace repos.
- The worktrees were already dirty before edits; final commit grouping needs manual review.
- External/vendor/upstream reference corpora will keep producing false positives unless future scans use the targeted validation script or classify those folders separately.
- Load-order wording should be harmonized in central and repo root files in a future focused pass.

## Next Recommended Work

1. Keep `file-code` and `app-streaming` out of active tasks unless Alejandro provides source paths.
2. Harmonize load-order wording across ECC and repo root guidance.
3. Add or update repo integration docs for any confirmed file-code/app-streaming repos.
4. Keep using `scripts/check-coding-agent-system.ps1` before/after future agent-system edits.
5. Run a periodic cross-agent sync validation after the above cleanup.
