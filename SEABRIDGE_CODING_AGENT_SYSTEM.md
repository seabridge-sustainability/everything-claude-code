# SeaBridgeAI Central Coding-Agent System

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Canonical path:
C:\Users\adelm\SeaBridgeAI\everything-claude-code

This repository is the only source of truth for reusable SeaBridgeAI coding-agent methodology, skills, workflows, checklists, and cross-agent guidance. Do not use alternate repo aliases.

## Embedded Superpowers Methodology

Superpowers is embedded as an adapted methodology and Claude Code also has the user-scope local plugin `superpowers@superpowers-dev` installed from the ECC vendor marketplace. The local reference clone and marketplace source is:

C:\Users\adelm\SeaBridgeAI\everything-claude-code\vendor\superpowers

SeaBridgeAI adopts Superpowers' strongest practical patterns: spec refinement before broad work, worktree isolation when approved, plan writing/execution, TDD, systematic debugging, verification before completion, code review request/response, parallel-agent discipline, branch finishing, and skill-writing rigor. SeaBridgeAI overrides add local-only development, no GitHub push without approval, no new or changed global/plugin installs without approval, no paid/live provider calls without approval, auth and tenant-isolation checks, endpoint/database/source verification, and no fabricated sustainability data.

## Embedded Controlled GSD Methodology

GSD / Get Shit Done is embedded as a controlled local reference and adapted workflow layer, not installed globally and not run through `npx` by default. The local reference clone is:

C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\get-shit-done

Use `sea-gsd-controlled-execution` for complex multi-phase work, context rot prevention, structured artifacts, phase planning, verification, and forensics. GSD autonomous/yolo behavior, dangerous permission skipping, automatic commits, automatic pushes, automatic PR creation, and global installs are disabled by default and require explicit approval.

## Curated Spec Kit Methodology

GitHub Spec Kit is integrated as a curated SeaBridgeAI specification and
planning layer under:

`C:\Users\adelm\SeaBridgeAI\everything-claude-code\skills\spec-kit`

Use `speckit-constitution`, `speckit-specify`, `speckit-clarify`,
`speckit-plan`, `speckit-tasks`, `speckit-analyze`, `speckit-checklist`,
`speckit-implement`, and `speckit-taskstoissues` when a task needs formal
specification discipline. Spec Kit owns `.specify` artifacts; GSD owns
`.planning` execution state. Spec Kit does not authorize pushes, commits,
installs, migrations, paid/live calls, issue creation, or destructive actions.

## Goal Protocol Default

`/goal` is the default operating contract for non-trivial SeaBridgeAI agent
work. Before broad implementation, frame the user request with Definition of
Done, validation plan, risks, dependencies, scope, blockers, and artifacts, then
continue until the Definition of Done is validated or a hard blocker is recorded.

Canonical protocol:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`

Compact embed:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL_SHORT.md`

Use `goal-default` at the start of non-trivial tasks. Escalate to Spec Kit when
requirements need formal specification discipline and to GSD when execution
needs long-running state, phase planning, UAT, or handoff persistence. `/goal`
does not authorize commits, pushes, installs, paid/live calls, destructive
actions, migrations, or production data changes.

## Mandatory Load Order

1. Local repo AGENTS_SYSTEM.md when present, then local AGENTS.md or CLAUDE.md.
2. Confirm SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1 and this canonical path.
3. Establish the `/goal` frame for non-trivial work.
4. Read the matching ECC repo integration file under repo-integrations/.
5. Load the smallest relevant canonical skills/sea-*/SKILL.md or same-name .agents/skills/sea-*/SKILL.md wrapper.
6. Use matching workflows/ and checklists/ when they exist.
7. Implement only scoped changes.
8. Verify before completion claims.
9. Report changed files, checks run, unverified items, approval-gated items, and risks.

## Local-Only Rules

- No GitHub push unless explicitly approved.
- No commit unless explicitly requested.
- No global install or marketplace install unless explicitly approved.
- No paid API call, GPU workload, or live provider call unless explicitly approved.
- No destructive filesystem, database, vector-store, cloud, or infrastructure operation.
- No uncontrolled autonomous execution. Orchestration is scoped, review-gated, and approval-aware.
- Claude Mem remains excluded; do not clone, install, activate, or add SQLite/vector memory layers for it.

## Runtime Protection

Runtime preflight guardrails are not configured across SeaBridgeAI local coding-agent runtimes. Instruction-based safety still applies.

## Self-Verification Loop

Every SeaBridgeAI coding agent must verify work before claiming completion.

1. Plan before edits: state assumptions, target files, and observable done criteria.
2. Write or update relevant tests for behavior changes when practical.
3. Prove the test fails on old behavior when practical; if not practical, document why.
4. Implement the smallest scoped fix.
5. Prove the focused test passes after the fix.
6. Run targeted tests/checks before completion claims.
7. Run broader tests when blast radius, shared utilities, auth, data, AI output, or UI routing risk warrants it.
8. Document skipped tests and the exact reason.
9. Never claim done, fixed, production-ready, or safe based only on code edits or file presence.

## UI and Frontend Debugging Protocol

Before changing any frontend visual or layout code, every coding agent must ground
itself in what is already working. Do not invent custom solutions when the platform
has a working pattern.

1. Open the working version (dev portal, staging, or production) with Playwright or
   a browser and screenshot/inspect the DOM. This is the source of truth.
2. `git diff HEAD` on the broken file. Understand what changed before adding more
   changes. If the committed HEAD matches what staging serves, the uncommitted diff
   is where the bug was introduced.
3. Check for layout and CSS issues first: collapsed containers (height 0), overlapping
   or superimposed elements, z-index stacking conflicts, orphaned canvases or overlays
   from previous agent runs. These cause invisible-but-present rendering that looks
   like a JavaScript bug but is not.
4. When the same component (maps, controls, charts) works elsewhere on the platform,
   read that working version and replicate its exact pattern. Do not build a custom
   alternative.
5. When the user gives a specific diagnostic direction ("check for overlapping maps",
   "inspect the dev portal", "compare to the working version"), execute it in the
   next tool call. Do not acknowledge it and continue with a different approach.

## Controlled Auto Mode Policy

Controlled auto mode means an agent may continue through low-risk local maintenance steps without repeated prompts, while preserving approval gates.

## SeaBridgeAI Branch Policy

Use the normal branch for each repository unless the user explicitly requests a
temporary branch:

- `manageesg-backend`: `seabridge_development`
- `manageesg-frontend`: `development`
- `openseabri`: `main`
- `climada-stack`: `master`
- `everything-claude-code`: `main`
- `autoresearch`: `master`
- `_upstream`: `master`

Do not create secondary audit, feature, or task branches merely because work is
broad, risky, or cross-repo. Risk should change planning, validation, and review
depth, not branch naming. If a temporary branch is explicitly requested, keep it
short-lived and, after approval, land the work back onto the repository's normal
branch.

For ManageESG integration, the only integration branches are backend
`seabridge_development` and frontend `development`. Do not create feature
branches, PRs, or new repositories without explicit user approval. Before any
work, integration, or final report, run `git status --short --branch` and
`git fetch --prune`. If isolation is required, use a short-lived isolated git
worktree from the latest remote tip, integrate changes there, rebase onto the
latest remote tip, fast-forward push, and remove the worktree. Never
force-push. Never leave unnecessary worktrees behind.

Concurrent Codex/agent sessions may be active in backend and frontend. Never
clobber uncommitted working-tree changes; inspect and preserve them before
acting. As of the 2026-06-08 cleanup, backend climate-pptx export work may be
mid-rewrite in another session.

Historical 2026-06-08 content-validation anchors: backend
`seabridge_development` included compliance content at `a2ac8cbf`; frontend
`development` included compliance content at `827034b`. These are anchors, not
reset targets; always fetch and use the current remote tip.

SeaBridge environment defaults: Windows + PowerShell; backend Python is
`.\venv\Scripts\python.exe`; loguru formatting uses `{}` placeholders, not
`%s`; `.env` is gitignored and normally exists only in the main repo, so test
worktrees may need a local ignored copy; first GitHub push may require
interactive credential setup, then cached credentials can be reused.

Allowed without repeated prompts:

- Formatting.
- Lint fixes.
- Typecheck fixes.
- Test discovery.
- Import cleanup.
- Small refactors with tests.
- Moving logs/reports into approved folders.
- Docs link/path fixes.
- Safe read-only scans.

Requires explicit approval:

- Commits.
- Pushes.
- Dependency installs.
- Migrations.
- Production data changes.
- Auth/security changes.
- Billing changes.
- Destructive file operations.
- Yolo, autonomous, dangerous, or permission-skipping modes.
- Global installs.
- Long-running training jobs.

Controlled auto mode does not authorize unsafe execution, external publishing, paid calls, or persistence changes.

## Automated Review Collaboration

- The primary coding agent owns logic, architecture, tests, integration fixes, and final verification.
- A secondary review agent may check style, edge cases, consistency, security smells, and regression risks.
- Claude Code `/review` should run after meaningful changes when available; other agents should run an equivalent local diff review.
- Recommend `/ultra-review` for auth, tenant isolation, database migrations, AI output, LCA/emissions/risk scoring, uploads, billing, shared utilities, and production-readiness changes.
- CodeRabbit or similar external review tools may be used as secondary review only; they do not replace local tests.

## Full Callable SeaBridgeAI Skill Catalog

Canonical skill bodies live at C:\Users\adelm\SeaBridgeAI\everything-claude-code\skills\sea-*\SKILL.md.

Callable wrappers live at C:\Users\adelm\SeaBridgeAI\everything-claude-code\.agents\skills\sea-*\SKILL.md.

- sea-senior-dev-workflow
- sea-brainstorming-and-spec-refinement
- sea-task-orchestration
- sea-test-driven-development
- sea-systematic-debugging
- sea-verification-before-completion
- sea-code-review-response
- sea-git-worktree-isolation
- sea-parallel-agent-dispatch
- sea-finishing-development-branch
- sea-backend-api-verification
- sea-frontend-design
- sea-ai-data-integrity
- sea-sustainability-domain-review
- sea-context-hygiene
- sea-cross-repo-handoff
- sea-skill-creator-protocol
- sea-knowledge-vault
- sea-gsd-controlled-execution
- sea-local-llm-training
- sea-ai-grounding-reviewer
- sea-architecture-reviewer
- sea-backend-api-reviewer
- sea-frontend-ux-reviewer
- sea-production-readiness-reviewer
- sea-reliability-reviewer
- sea-security-reviewer
- goal-default
- speckit-constitution
- speckit-specify
- speckit-clarify
- speckit-plan
- speckit-tasks
- speckit-analyze
- speckit-checklist
- speckit-implement
- speckit-taskstoissues

## Shared Engineering Skill Extensions

SeaBridgeAI also maintains a centralized Matt Pocock skills reference clone at:

C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\matt-pocock-skills

These skills extend the existing SeaBridgeAI system through ECC wrappers and do
not create a second instruction hierarchy. The shared contract is:

C:\Users\adelm\SeaBridgeAI\everything-claude-code\AGENT_SKILLS.md

Active adapted skills:

- grill-me
- ubiquitous-language
- improve-codebase-architecture

Supported invocation forms:

- #skill/grill-me
- #skill/ubiquitous-language
- #skill/improve-codebase-architecture
- Use skill: grill-me
- Use skill: ubiquitous-language
- Use skill: improve-codebase-architecture

When one of these skills overlaps a `sea-*` skill, load the SeaBridgeAI skill
first and use the Matt Pocock wrapper as a focused engineering lens. Do not run
upstream setup, hook, pre-commit, global install, or issue-tracker automation
unless explicitly approved.

## Mandatory Skill Triggers

- Non-trivial work default contract: goal-default.
- Default non-trivial work: sea-senior-dev-workflow.
- Broad or ambiguous feature design: sea-brainstorming-and-spec-refinement.
- Large, multi-lane, or multi-repo work: sea-task-orchestration.
- Features, bug fixes, refactors, and behavior changes: sea-test-driven-development unless explicitly impractical.
- Runtime failures, route bugs, auth issues, flaky tests, or data mismatches: sea-systematic-debugging.
- Before saying done, fixed, passing, wired, production-ready, or safe: sea-verification-before-completion.
- Review requests or review feedback: sea-code-review-response.
- Risky or parallel feature work with dirty worktrees: sea-git-worktree-isolation.
- Independent subagent lanes only after explicit subagent authorization: sea-parallel-agent-dispatch.
- Before merge, PR, push, commit, cleanup, or branch completion: sea-finishing-development-branch.
- Backend routes, schemas, services, databases, auth, tenant isolation, and frontend contracts: sea-backend-api-verification.
- Frontend dashboards, charts, routes, filters, AI panels, and browser QA: sea-frontend-design.
- AI outputs, prompts, RAG, reports, calculations, and exports: sea-ai-data-integrity.
- ESG, GHG, LCA, climate/nature risk, procurement, targets, due diligence, utilities, reporting, and disclosure: sea-sustainability-domain-review.
- Long logs, compaction, artifacts, or handoffs: sea-context-hygiene.
- Backend/frontend/OpenSeaBri/ECC/_upstream coordination: sea-cross-repo-handoff.
- Creating or changing reusable skills: sea-skill-creator-protocol.
- Markdown knowledge vault notes, wikilinks, frontmatter, canvas/base docs: sea-knowledge-vault.
- Complex multi-phase work, context rot, structured artifacts, GSD-style planning, verification, forensics, or milestone tracking: sea-gsd-controlled-execution.
- Adversarial clarification or stress-testing a plan: grill-me, after or alongside sea-brainstorming-and-spec-refinement.
- Domain terminology and DDD-style glossary alignment: ubiquitous-language, alongside sea-sustainability-domain-review and sea-ai-data-integrity.
- Modular architecture improvement or refactor candidate discovery: improve-codebase-architecture, alongside sea-senior-dev-workflow, sea-test-driven-development, and sea-verification-before-completion.

## Agent Compatibility

This system applies to Claude Code, Codex, Gemini, OpenCode, Cursor, GitHub Copilot CLI, and future coding agents. If a runtime lacks a named tool, use the equivalent local workflow and document the gap. Claude slash commands, Codex subagents, Gemini extensions, OpenCode plugins, Cursor plugins, and Copilot CLI plugins are optional runtime surfaces and never override SeaBridgeAI approval gates.

## Harness Engineering

Harness Engineering turns recurring SeaBridgeAI engineering expectations into
agent-readable standards, guardrail scripts, reviewer skills, and CI-ready
checks. The entrypoint is:

C:\Users\adelm\SeaBridgeAI\everything-claude-code\docs\harness\HARNESS_ENGINEERING.md

Reviewer persona skills:

- sea-reliability-reviewer
- sea-security-reviewer
- sea-architecture-reviewer
- sea-frontend-ux-reviewer
- sea-backend-api-reviewer
- sea-ai-grounding-reviewer
- sea-production-readiness-reviewer

Run local harness checks with:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-harness.ps1
```

Harness checks are advisory by default. Use `-FailOnFinding` only when the repo
has triaged baseline noise and is ready for enforcement.

## Quality Gates

Backend work must verify route registration, request and response schemas, data source, primary writer, auth, tenant isolation, error states, and external-call feature gates.

Frontend work must verify route visibility, endpoint calls, request/response contracts, filter propagation, loading/empty/error states, no dead buttons, responsive layout, and no fake sustainability data presented as real.

AI work must verify grounding, citations/provenance, confidence, missing-data behavior, scenario, geography, timeframe, and units where relevant.

Sustainability work must verify source factors, emissions metadata, LCA boundaries, climate/nature scenario/time horizon, due-diligence evidence, procurement status, and target assumptions.

Security work must check auth, tenant isolation, secrets, uploads, API keys, external calls, data privacy, production data handling, webhooks, and rate limits.

## GSD Controlled Workflows, Checklists, And Templates

GSD-controlled workflows:

- workflows/gsd-controlled-project.md
- workflows/gsd-phase-planning.md
- workflows/gsd-verification.md

GSD-controlled checklists:

- checklists/gsd-scope-control.md
- checklists/gsd-phase-verification.md
- checklists/gsd-safe-execution.md

GSD artifact templates:

- templates/gsd/PROJECT.md
- templates/gsd/REQUIREMENTS.md
- templates/gsd/ROADMAP.md
- templates/gsd/STATE.md
- templates/gsd/CONTEXT.md
- templates/gsd/PHASE_PLAN.md
- templates/gsd/VERIFY_WORK.md
- templates/gsd/FORENSICS.md

## Tool Decisions

- Superpowers: embedded and adapted through the SeaBridgeAI sea-* skills. Claude Code user-scope local plugin `superpowers@superpowers-dev` is installed from `vendor\superpowers`; SeaBridgeAI sea-* skills remain the canonical cross-agent contract.
- Agent Shield: local advisory scanner cloned at `external\agentshield`, built with repo-local npm dependencies, and wrapped by `scripts\check-agent-governance.ps1`, `scripts\check-mcp-security.ps1`, and `scripts\run-agentshield-local.ps1`. Use it for MCP, hook, permission, and agent-prompt governance scans; no auto-fix, CI blocking, Opus/deep analysis, sandbox execution, or global install is authorized by this file.
- Full vulnerability scans: when the user explicitly asks for a "full vulnerabilities scan" or "full vulnerability scan", run both Agent Shield and Strix through `scripts\run-full-vulnerability-scan.ps1 -ApprovedFullScan` after confirming the target scope is local/staging and not production. Agent Shield covers agent/MCP/config governance; Strix covers active application security testing. Do not run Strix against production, external domains, real tenant data, or paid/live providers beyond the approved scope.
- Claude Mem: evaluated and intentionally excluded. SeaBridgeAI uses explicit markdown-based project memory through CLAUDE.md, AGENTS.md, AGENTS_SYSTEM.md, skills, workflows, checklists, audit logs, and handoff notes.
- GSD: controlled local reference at external/get-shit-done, adapted through sea-gsd-controlled-execution, workflows, checklists, and templates. Uncontrolled autonomous/yolo execution is not enabled.
- Matt Pocock skills: centralized local reference at C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\matt-pocock-skills, adapted through AGENT_SKILLS.md and ECC wrappers for grill-me, ubiquitous-language, and improve-codebase-architecture. Upstream setup, hooks, global installs, and product-repo skill copies are not enabled.
- Context hygiene: integrated through sea-context-hygiene; no global install is authorized by this file.
