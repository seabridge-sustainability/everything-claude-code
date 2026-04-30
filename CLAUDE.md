# CLAUDE.md

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

gstack is installed at `~/.claude/skills/gstack/` and provides 35 specialist skills. Use `/browse` for **all web browsing** — never use `mcp__claude-in-chrome__*` tools.

| Skill | When to Use |
|-------|-------------|
| `/office-hours` | Start here before any new feature or product idea |
| `/autoplan` | Auto-run CEO + design + eng + DX reviews before implementation |
| `/plan-ceo-review` | Challenge scope, rethink the problem from first principles |
| `/plan-eng-review` | Architecture, data flow, state machines, test matrix |
| `/plan-design-review` | Visual/UX review of plans |
| `/plan-devex-review` | Developer experience review of plans |
| `/review` | Pre-PR review — SQL safety, secrets, architecture, logic |
| `/cso` | Security audit: OWASP + STRIDE, secrets archaeology, deps |
| `/qa` | Test a live URL in a headless browser, find + fix bugs |
| `/qa-only` | Report-only QA pass (no auto-fix) |
| `/browse` | All web browsing — replaces Chrome MCP tools |
| `/investigate` | Systematic root-cause debugging |
| `/ship` | Full ship workflow: tests → review → version bump → PR |
| `/land-and-deploy` | Merge PR, wait for CI/deploy, verify production |
| `/canary` | Post-deploy monitoring for errors/regressions |
| `/design-review` | Visual QA — spacing, hierarchy, AI slop detection |
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

- **caveman** — compresses agent output ~65–75% (`/caveman` skill, `claude plugin install caveman@caveman`). Reference: `everything-claude-code/references/caveman/`
- **codeburn** — token usage dashboard (`npx codeburn` or `npm install -g codeburn`). Reference: `everything-claude-code/references/codeburn/`


---

## designlang — Design Language Extraction

designlang crawls any live URL with a headless browser and generates 17+ output files (Tailwind config, CSS vars, shadcn theme, Figma variables, motion tokens, brand voice, component anatomy stubs, and an AI-optimized markdown file).

**Reference:** `C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\design-extract\`

Skill: `/extract-design <url>` (installed at `~/.claude/skills/extract-design/`)
CLI: `npx designlang <url>` (no install required) or `designlang <url>` (global install)

Key flags:
- `--full` — multi-page crawl (auto-discovers nav pages)
- `--out <dir>` — output directory (default: `./design-extract-output`)
- `--dark` — also extract dark mode
- `--screenshots` — capture component screenshots
- `--emit-agent-rules` — writes `CLAUDE.md.fragment` rule files
- `--smart` — LLM-assisted classifier (uses `ANTHROPIC_API_KEY`)

SeaBridgeAI design token locations:
- manageesg-frontend: `manageesg-frontend/design/`
- openseabri: `openseabri/design/`

MCP server (continuous sync):
```bash
npx designlang mcp --out ./design-extract-output
```
