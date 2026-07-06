# ECC Agent and Command Roster

Load this file only when delegating to a specialized agent or invoking a
gstack/GSD command. The root `AGENTS.md` / `CLAUDE.md` adapters carry only
pointers here.

## Specialized Subagents (`agents/`)

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| planner | Implementation planning | Complex features, refactoring |
| architect | System design and scalability | Architectural decisions |
| tdd-guide | Test-driven development | New features, bug fixes |
| code-reviewer | Code quality and maintainability | After writing/modifying code |
| security-reviewer | Vulnerability detection | Before commits, sensitive code |
| build-error-resolver | Fix build/type errors | When build fails |
| e2e-runner | End-to-end Playwright testing | Critical user flows |
| refactor-cleaner | Dead code cleanup | Code maintenance |
| doc-updater | Documentation and codemaps | Updating docs |
| docs-lookup | Source-aware documentation routing | ECC workflow docs and library/API questions |
| cpp-reviewer / cpp-build-resolver | C++ review / build errors | C++ projects |
| go-reviewer / go-build-resolver | Go review / build errors | Go projects |
| kotlin-reviewer / kotlin-build-resolver | Kotlin review / Gradle errors | Kotlin/Android/KMP |
| database-reviewer | PostgreSQL/Supabase specialist | Schema design, query optimization |
| python-reviewer | Python code review | Python projects |
| java-reviewer / java-build-resolver | Java/Spring review / build errors | Java projects |
| chief-of-staff | Communication triage and drafts | Multi-channel email, Slack, LINE, Messenger |
| loop-operator | Controlled loop execution | Explicitly approved loops, stall monitoring |
| harness-optimizer | Harness config tuning | Reliability, cost, throughput |
| rust-reviewer / rust-build-resolver | Rust review / build errors | Rust projects |
| pytorch-build-resolver | PyTorch runtime/CUDA/training errors | PyTorch failures |
| typescript-reviewer | TypeScript/JavaScript review | TS/JS projects |

Orchestration defaults (only when runtime and user authorization allow
delegation): complex feature → planner; code just written → code-reviewer; bug
fix/new feature → tdd-guide; architecture → architect; security-sensitive →
security-reviewer; communication triage → chief-of-staff; controlled loops →
loop-operator; harness reliability/cost → harness-optimizer. Parallel execution
only when the runtime supports it and policy allows it.

## GSD (Get Shit Done) Lifecycle

Structured multi-phase planning, execution, verification, and session
management via `.planning/` state directory. All commands are user-invoked, not
proactive. Setup: `scripts/setup-gsd.ps1` creates the `~/.claude/get-shit-done`
junction. Skill reference: `~/.claude/skills/gsd-lifecycle/SKILL.md` (if installed).

Core lifecycle: `/gsd-map-codebase` → `/gsd-discuss-phase` → `/gsd-plan-phase`
→ `/gsd-execute-phase` → `/gsd-verify-work`

| Command | Purpose |
|---------|---------|
| `/gsd-map-codebase` | Parallel codebase analysis (7 structured docs) |
| `/gsd-discuss-phase` | Adaptive questioning to gather decisions |
| `/gsd-plan-phase` | Executable phase plans with verification loop |
| `/gsd-execute-phase` | Wave-based parallel execution with subagents |
| `/gsd-verify-work` | Conversational UAT validation |
| `/gsd-progress` | Status check + route to next action |
| `/gsd-quick` | Ad-hoc tasks with GSD guarantees |
| `/gsd-ui-phase` / `/gsd-ui-review` | UI design contract / 6-pillar visual audit |
| `/gsd-review` | Cross-AI peer review of phase plans |
| `/gsd-code-review` | Phase-scoped code review (produces REVIEW.md) |
| `/gsd-secure-phase` | Verify threat mitigations |
| `/gsd-health` | `.planning/` directory integrity |
| `/gsd-forensics` | Post-mortem of failed workflows |
| `/gsd-docs-update` | Generate/update project documentation |
| `/gsd-pause-work` / `/gsd-resume-work` | Context handoff / restoration |
| `/gsd-stats` | Session statistics |

GSD agents (spawned by the commands above): gsd-codebase-mapper, gsd-planner,
gsd-plan-checker, gsd-executor, gsd-verifier, gsd-phase-researcher,
gsd-code-reviewer, gsd-doc-writer, gsd-doc-verifier, gsd-security-auditor,
gsd-ui-researcher, gsd-ui-checker, gsd-ui-auditor.

Disambiguation: `/gsd-code-review` (phase-scoped, REVIEW.md artifact) ≠
`code-reviewer` agent (immediate post-edit review) ≠ `/review` (gstack pre-PR
diff review). `/gsd-health` (`.planning/` integrity) ≠ `/health` (gstack code
quality dashboard).

## gstack Skills

gstack is installed at `~/.claude/skills/gstack/` (if present) and provides 35
specialist skills. Use `/browse` for all web browsing — never
`mcp__claude-in-chrome__*` tools.

| Skill | When to Use |
|-------|-------------|
| `/office-hours` | Start here before any new feature or product idea |
| `/autoplan` | Auto-run CEO + design + eng + DX reviews before implementation |
| `/plan-ceo-review` / `/plan-eng-review` / `/plan-design-review` / `/plan-devex-review` | Plan reviews by lens |
| `/review` | Pre-PR review — SQL safety, secrets, architecture, logic |
| `/cso` | Security audit: OWASP + STRIDE, secrets archaeology, deps |
| `/qa` / `/qa-only` | Live-URL browser QA (fix / report-only) |
| `/browse` | All web browsing — replaces Chrome MCP tools |
| `/investigate` | Systematic root-cause debugging |
| `/ship` / `/land-and-deploy` / `/canary` | Ship workflow / merge+deploy / post-deploy monitoring |
| `/design-review` / `/design-html` / `/design-consultation` / `/design-shotgun` | Design QA and generation |
| `/retro` / `/document-release` | Retrospective / post-ship docs |
| `/health` | Code quality dashboard |
| `/checkpoint` | Save/resume working state across sessions |
| `/careful` / `/freeze` / `/unfreeze` / `/guard` | Safety guardrails and edit locks |
| `/benchmark` | Performance regression detection |
| `/gstack-upgrade` | Upgrade gstack |
| `/learn` | Manage project learnings across sessions |

`/browse`, `/qa`, `/benchmark`, `/canary`, and `/devex-review` require the
browse daemon (Bun): `bun --version`, then `cd ~/.claude/skills/gstack && ./setup`.
