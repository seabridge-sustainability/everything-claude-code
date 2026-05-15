# CLAUDE.md

## SeaBridgeAI Central System With Embedded Superpowers And GSD

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Canonical path: C:\Users\adelm\SeaBridgeAI\everything-claude-code

Superpowers is embedded as an adapted local methodology through the SeaBridgeAI sea-* skills. Claude Code also has user-scope local plugin `superpowers@superpowers-dev` installed from the ECC vendor marketplace. Reference clone: C:\Users\adelm\SeaBridgeAI\everything-claude-code\vendor\superpowers. Do not add, update, remove, or reinstall Superpowers globally or through a marketplace unless explicitly approved.

GSD / Get Shit Done is embedded as a controlled local reference and adapted workflow layer through `sea-gsd-controlled-execution`. Reference clone: C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\get-shit-done. Do not run `npx get-shit-done-cc@latest`, install globally, enable yolo/autonomous mode, auto-commit, auto-push, or auto-create PRs unless explicitly approved.

Full callable SeaBridgeAI skill catalog: sea-senior-dev-workflow, sea-brainstorming-and-spec-refinement, sea-task-orchestration, sea-test-driven-development, sea-systematic-debugging, sea-verification-before-completion, sea-code-review-response, sea-git-worktree-isolation, sea-parallel-agent-dispatch, sea-finishing-development-branch, sea-backend-api-verification, sea-frontend-design, sea-ai-data-integrity, sea-sustainability-domain-review, sea-context-hygiene, sea-cross-repo-handoff, sea-skill-creator-protocol, sea-knowledge-vault, sea-gsd-controlled-execution, sea-local-llm-training.

Mandatory gates: local-only development unless approved; no GitHub push unless approved; no commit unless requested; no global install or marketplace install unless approved; no paid/live provider calls unless approved; no fabricated sustainability data; verify endpoint/database/source/auth/tenant behavior before frontend or product claims; verify before completion.

Claude Code, Codex, Gemini, OpenCode, Cursor, GitHub Copilot CLI, and future coding agents must use the same SYSTEM_ID, canonical path, skill catalog, workflows, and checklists. Product repos should point here rather than duplicating divergent guidance.
Shared engineering skill extensions live in `AGENT_SKILLS.md` and adapt
`C:\Users\adelm\SeaBridgeAI\shared-agent-skills` without creating a parallel
system. Active portable invocations: `#skill/grill-me`,
`#skill/ubiquitous-language`, `#skill/improve-codebase-architecture`, or
`Use skill: <name>`.
## SeaBridgeAI Central Coding-Agent Layer

For SeaBridgeAI work across backend, frontend, OpenSeaBri, `_upstream`, and
future repos, load:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\SEABRIDGE_CODING_AGENT_SYSTEM.md`

Use the matching `repo-integrations/`, `skills/sea-*`, `.agents/skills/sea-*`,
`workflows/`, and `checklists/` files. Do not duplicate long shared guidance
into product repos.

Callable skill names: `sea-senior-dev-workflow`, `sea-frontend-design`,
`sea-skill-creator-protocol`, `sea-backend-api-verification`,
`sea-ai-data-integrity`, `sea-sustainability-domain-review`,
`sea-task-orchestration`, `sea-context-hygiene`, `sea-cross-repo-handoff`,
`sea-gsd-controlled-execution`.

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** `manageesg-backend/AGENTS_SYSTEM.md` is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally to this repo.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Claude Code plugin** - a collection of production-ready agents, skills, hooks, commands, rules, and MCP configurations. The project provides battle-tested workflows for software development using Claude Code.

## Running Tests

```bash
# Run all tests
node tests/run-all.js

# Run individual test files
node tests/lib/utils.test.js
node tests/lib/package-manager.test.js
node tests/hooks/hooks.test.js
node tests/scripts/context-hub.test.js
```

## Architecture

The project is organized into several core components:

- **agents/** - Specialized subagents for delegation (planner, code-reviewer, tdd-guide, etc.)
- **skills/** - Workflow definitions and domain knowledge (coding standards, patterns, testing)
- **commands/** - Slash commands invoked by users (/tdd, /plan, /e2e, etc.)
- **hooks/** - Trigger-based automations (session persistence, pre/post-tool hooks)
- **rules/** - Always-follow guidelines (security, coding style, testing requirements)
- **mcp-configs/** - MCP server configurations for external integrations
- **scripts/** - Cross-platform Node.js utilities for hooks, setup, and Context Hub sync/build tasks
- **context-hub/** - Repo-local Context Hub content derived from the canonical English docs
- **tests/** - Test suite for scripts and utilities

## Documentation Retrieval Order

When working inside ECC, use this order:

1. Read the local repo file directly if the answer is already in the workspace.
2. Use ECC's local Context Hub bundle for ECC-specific guides, commands, policies, and workflows.
3. Use public Context Hub entries for non-ECC skills or shared playbooks.
4. Use Context7 only for third-party libraries, frameworks, SDKs, and APIs.
5. Use `llms.txt` or general browsing only as fallback paths.

## Context Hub Commands

```bash
npm run context-hub:sync
npm run context-hub:validate
npm run context-hub:build
```

- `context-hub:sync` refreshes `context-hub/ecc/...` plus the repo root `llms.txt`.
- `context-hub:validate` runs `npx -y @aisuite/chub build context-hub --validate-only`.
- `context-hub:build` builds `context-hub/dist` for local `chub search` and `chub get` usage.

## Key Commands

- `/tdd` - Test-driven development workflow
- `/plan` - Implementation planning
- `/e2e` - Generate and run E2E tests
- `/code-review` - Quality review
- `/build-fix` - Fix build errors
- `/learn` - Extract patterns from sessions
- `/skill-create` - Generate skills from git history
- `/docs` - Route ECC internal docs to Context Hub and external API docs to Context7

## Development Notes

- Package manager detection: npm, pnpm, yarn, bun (configurable via `CLAUDE_PACKAGE_MANAGER` env var or project config)
- Cross-platform: Windows, macOS, Linux support via Node.js scripts
- Agent format: Markdown with YAML frontmatter (name, description, tools, model)
- Skill format: Markdown with clear sections for when to use, how it works, examples
- Skill placement: Curated in skills/; generated/imported under ~/.claude/skills/. See docs/SKILL-PLACEMENT-POLICY.md
- Hook format: JSON with matcher conditions and command/notification hooks
- Context Hub content is generated from the canonical English docs; update the source docs first, then run `npm run context-hub:sync`
- Optional convenience install for humans and agents: `npm install -g @aisuite/chub`

## Contributing

Follow the formats in CONTRIBUTING.md:
- Agents: Markdown with frontmatter (name, description, tools, model)
- Skills: Clear sections (When to Use, How It Works, Examples)
- Commands: Markdown with description frontmatter
- Hooks: JSON with matcher and hooks array

File naming: lowercase with hyphens (e.g. `python-reviewer.md`, `tdd-workflow.md`)

## gstack

gstack is installed at `~/.claude/skills/gstack/` and provides 35 specialist skills. Use `/browse` for **all web browsing** â€” never use `mcp__claude-in-chrome__*` tools.

| Skill | When to Use |
|-------|-------------|
| `/office-hours` | Start here before any new feature or product idea |
| `/autoplan` | Auto-run CEO + design + eng + DX reviews before implementation |
| `/plan-ceo-review` | Challenge scope, rethink the problem from first principles |
| `/plan-eng-review` | Architecture, data flow, state machines, test matrix |
| `/plan-design-review` | Visual/UX review of plans |
| `/plan-devex-review` | Developer experience review of plans |
| `/review` | Pre-PR review â€” SQL safety, secrets, architecture, logic |
| `/cso` | Security audit: OWASP + STRIDE, secrets archaeology, deps |
| `/qa` | Test a live URL in a headless browser, find + fix bugs |
| `/qa-only` | Report-only QA pass (no auto-fix) |
| `/browse` | All web browsing â€” replaces Chrome MCP tools |
| `/investigate` | Systematic root-cause debugging |
| `/ship` | Full ship workflow: tests â†’ review â†’ version bump â†’ PR |
| `/land-and-deploy` | Merge PR, wait for CI/deploy, verify production |
| `/canary` | Post-deploy monitoring for errors/regressions |
| `/design-review` | Visual QA â€” spacing, hierarchy, AI slop detection |
| `/design-html` | Generate production-quality HTML/CSS |
| `/design-consultation` | Product + landscape research, propose design direction |
| `/design-shotgun` | Generate multiple design variants for comparison |
| `/retro` | Weekly engineering retrospective from git history |
| `/document-release` | Post-ship docs update |
| `/health` | Code quality dashboard (type checker, linter, tests) |
| `/checkpoint` | Save/resume working state across sessions |
| `/careful` | Safety guardrails for destructive commands |
| `/freeze` / `/unfreeze` | Lock edits to a specific directory |
| `/guard` | Full safety mode (careful + freeze combined) |
| `/benchmark` | Performance regression detection |
| `/gstack-upgrade` | Upgrade gstack to latest version |
| `/learn` | Manage project learnings across sessions |

**Note:** `/browse`, `/qa`, `/benchmark`, `/canary`, and `/devex-review` require the browse daemon (Bun). Install Bun (`bun --version`) and run `cd ~/.claude/skills/gstack && ./setup` to enable browser-based skills.

---

## GSD (Get Shit Done) Lifecycle

GSD provides structured multi-phase planning, execution, verification, and session management via `.planning/` state directory and 13 specialized agents. All commands are user-invoked (not proactive).

Setup: `scripts/setup-gsd.ps1` creates the `~/.claude/get-shit-done` junction.

**Core lifecycle:** `/gsd-map-codebase` â†’ `/gsd-discuss-phase` â†’ `/gsd-plan-phase` â†’ `/gsd-execute-phase` â†’ `/gsd-verify-work`

| Command | Purpose |
|---------|---------|
| `/gsd-map-codebase` | Parallel codebase analysis (7 structured docs) |
| `/gsd-discuss-phase` | Adaptive questioning to gather decisions |
| `/gsd-plan-phase` | Executable phase plans with verification loop |
| `/gsd-execute-phase` | Wave-based parallel execution with subagents |
| `/gsd-verify-work` | Conversational UAT validation |
| `/gsd-progress` | Status check + route to next action (`--next`, `--do`) |
| `/gsd-quick` | Ad-hoc tasks with GSD guarantees, skip optional agents |
| `/gsd-ui-phase` | UI design contract (UI-SPEC.md) |
| `/gsd-ui-review` | 6-pillar visual audit |
| `/gsd-review` | Cross-AI peer review of phase plans |
| `/gsd-code-review` | Phase-scoped code review (distinct from `/review`) |
| `/gsd-secure-phase` | Verify threat mitigations |
| `/gsd-health` | `.planning/` directory integrity (distinct from `/health`) |
| `/gsd-forensics` | Post-mortem of failed workflows |
| `/gsd-docs-update` | Generate/update project documentation |
| `/gsd-pause-work` | Context handoff (`.continue-here.md`) |
| `/gsd-resume-work` | Resume with full context restoration |
| `/gsd-stats` | Session statistics |

**Disambiguation:** `/gsd-code-review` reviews phase changes and produces REVIEW.md artifacts. `/review` (gstack) is a pre-PR diff review. `/gsd-health` checks `.planning/` integrity. `/health` (gstack) is a code quality dashboard.

Skill reference: `~/.claude/skills/gsd-lifecycle/SKILL.md`

---

## Vibium Secondary Browser Tooling

Vibium is installed as user/ECC-level browser tooling for "second pair of eyes"
inspection alongside Playwright. Use it for quick semantic browser exploration,
element mapping, screenshots, and MCP-style agent browser control. Playwright
remains canonical for repeatable SeaBridgeAI QA/regression runs.

Installed surfaces:
- Global CLI: `vibium` v26.3.18
- ECC wrapper: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\vibium.ps1`
- ECC skill: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\.agents\skills\vibe-check\SKILL.md`
- Claude skill copy: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\.claude\skills\vibe-check\SKILL.md`

Safe smoke check:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\vibium.ps1 --version
```

Review `vibe-check` before browser control. The skills installer flagged the
upstream skill as high risk in Snyk, so use it deliberately and keep captures,
cookies, storage state, and recordings out of committed source.

---

## Google Agent Skills

Official Google Agent Skills from `google/skills` are installed into ECC for
all supported coding-agent skill directories. Use them before web snippets or
stale examples when work touches Google Cloud, Firebase, Gemini API on Agent
Platform, or Google Cloud Well-Architected Framework guidance.

Installed skills:
- `gemini-api`
- `alloydb-basics`
- `bigquery-basics`
- `cloud-run-basics`
- `cloud-sql-basics`
- `firebase-basics`
- `gke-basics`
- `google-cloud-recipe-onboarding`
- `google-cloud-recipe-auth`
- `google-cloud-recipe-networking-observability`
- `google-cloud-waf-security`
- `google-cloud-waf-reliability`
- `google-cloud-waf-cost-optimization`

Read the matching `SKILL.md` before implementation or deployment work. The
installer reported Snyk high risk for `alloydb-basics` and `cloud-sql-basics`,
medium risk for `firebase-basics`, `gemini-api`, and `gke-basics`, and low risk
for the rest, so review skill content before use.

---

## Skills

Use the following skills when working on related files:

| File(s) | Skill |
|---------|-------|
| `README.md` | `/readme` |
| `.github/workflows/*.yml` | `/ci-workflow` |
| `commands/docs.md`, `agents/docs-lookup.md`, `skills/documentation-lookup/SKILL.md` | `documentation-lookup` |
| Memory/session continuity, project recall, backend memory questions | `agent-memory` |
| Secondary browser inspection alongside Playwright | `vibe-check` |
| Google Cloud, Firebase, Gemini API, or Google Cloud WAF work | matching `google/skills` skill |
| Design artifact generation (prototypes, decks, mobile apps, operations docs) | `open-design` |

When spawning subagents, always pass conventions from the respective skill into the agent's prompt.

## Memory

Purpose:
- Use the `agent-memory` skill to distinguish session continuity, project working memory, and backend runtime memory instead of treating them as one system.

Trigger phrases:
- `memory`
- `remember this`
- `session memory`
- `project memory`
- `retrieve prior context`
- `agent memory`

Required inputs:
- memory intent: `session`, `project`, or `runtime`

Optional inputs:
- `ide` (`claude-code` or `gemini-cli`)
- project path
- tenant or runtime scope

Run and usage commands:
- `/ck:init`
- `/ck:save`
- `/ck:resume`

Outputs:
- retrieved context block with source attribution
- saved session or project memory artifact
- clear routing to the correct memory layer

Storage and source of truth:
- `ck`: ECC-native per-project working context
- `continuous-learning-v2`: reusable learned behaviors and instincts
- `manageesg-backend` `sustainability_ai.memory`: runtime memory for deployed agents

Compatibility and retrieval order:
- Retrieval order:
  1. local repo docs and `AGENTS.md`/`CLAUDE.md`
  2. ECC project memory via `ck` and `continuous-learning-v2`
  3. backend runtime memory only for application agent data flows

Safety notes:
- do not duplicate the same fact into all three memory systems unless explicitly requested

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)


## Token Availability Retry Loops

When Alejandro explicitly asks Claude Code or another coding agent to continue
once tokens are available, use the ECC retry wrapper:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\agent-token-retry.ps1 `
  -Name "seabridge-continue" `
  -IntervalHours 4 `
  -MaxHours 72 `
  -Command 'claude -p "Continue the previous task from the last safe checkpoint. Read CLAUDE.md/AGENTS.md first."'
```

The wrapper retries every 4 hours by default for up to 72 hours, retries only
token/rate/quota/capacity failures unless `-RetryAll` is passed, and writes logs
to `.ecc/loops/`. Do not start it automatically; it is opt-in because it can use
model quota.


## Token Optimization Tools

Two tools are installed globally for token efficiency:

- **caveman** â€” compresses agent output ~65â€“75% (`/caveman` skill, `claude plugin install caveman@caveman`). Reference: `everything-claude-code/references/caveman/`
- **codeburn** â€” token usage dashboard (`npx codeburn` or `npm install -g codeburn`). Reference: `everything-claude-code/references/codeburn/`


---

## designlang â€” Design Language Extraction

designlang crawls any live URL with a headless browser and generates 17+ output files (Tailwind config, CSS vars, shadcn theme, Figma variables, motion tokens, brand voice, component anatomy stubs, and an AI-optimized markdown file).

**Reference:** `C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\design-extract\`

Skill: `/extract-design <url>` (installed at `~/.claude/skills/extract-design/`)
CLI: `npx designlang <url>` (no install required) or `designlang <url>` (global install requires explicit approval)

Key flags:
- `--full` â€” multi-page crawl (auto-discovers nav pages)
- `--out <dir>` â€” output directory (default: `./design-extract-output`)
- `--dark` â€” also extract dark mode
- `--screenshots` â€” capture component screenshots
- `--emit-agent-rules` â€” writes `CLAUDE.md.fragment` rule files
- `--smart` â€” LLM-assisted classifier (uses `ANTHROPIC_API_KEY`)

SeaBridgeAI design token locations:
- manageesg-frontend: `manageesg-frontend/design/`
- openseabri: `openseabri/design/`

MCP server (continuous sync):
```bash
npx designlang mcp --out ./design-extract-output
```

---

## Open Design â€” AI Design Artifact Generator

Open-source alternative to Claude Design (Apache-2.0). Local-first, BYOK design
tool that auto-detects 11 coding-agent CLIs on PATH and drives them through a
skill-based design workflow with 31 skills and 129 design systems.

**Reference:** `C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\open-design\`

Skill: `/open-design` (installed at `~/.claude/skills/open-design/`)

Quickstart:
```bash
cd references/open-design
corepack enable && pnpm install
pnpm tools-dev run web
```

Requires Node ~24, pnpm 10.33.x. First load auto-creates `.od/` runtime folder.

Key capabilities:
- **31 skills** â€” prototypes (landings, dashboards, mobile, email, social), decks (magazine PPT, product walkthrough), operations (PM specs, OKRs, invoices, runbooks)
- **129 design systems** â€” Linear, Stripe, Vercel, Airbnb, Tesla, Notion, Apple, Anthropic, Cursor, Supabase, Figma, and more
- **5 visual directions** â€” Editorial Monocle, Modern Minimal, Warm Soft, Tech Utility, Brutalist Experimental
- **Media generation** â€” gpt-image-2 for images, Seedance 2.0 for video, HyperFrames for HTMLâ†’MP4
- **Claude Design import** â€” drop a Claude Design export ZIP to continue editing locally

Relationship to designlang: designlang extracts tokens from existing sites (reverse-engineering); Open Design generates new artifacts from briefs (forward creation). They complement each other.

