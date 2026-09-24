# CLAUDE.md

<!-- SEABRIDGE_GOAL_PROTOCOL_START -->
## Goal Protocol Default

For non-trivial work, settle what done means and how you will prove it before editing, then keep going until it is proven or you reach a real blocker. `/goal` in a prompt asks for exactly this.

- **Scope from evidence.** Build what the request needs, grounded in the current code, git history, tests, and the current plan. Do not invent product functionality or sustainability, emissions, climate, or financial data; preserve source, provenance, and units. Treat memory, handoffs, and old summaries as leads to verify, not facts.
- **Done means** the requested behavior works, tests that would catch its failure pass, there are no unexplained regressions, and you know the state of the tree. Scale checks to risk: tenant isolation, auth, persistence, AI grounding, and cross-repo contracts warrant broader tests. Do not re-run checks nothing has changed since.
- **When stuck,** change strategy after two failures of the same approach. Keep working on independent parts; stop only at an approval boundary or an external dependency, and name it.
- **Report** what changed, how it was verified, what remains or is risky, and any check you skipped and why. Never call unverified work done.

Full protocol, for long multi-phase work: C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md
<!-- SEABRIDGE_GOAL_PROTOCOL_END -->


## SeaBridgeAI Central System With Embedded Superpowers And GSD

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Canonical path: C:\Users\adelm\SeaBridgeAI\everything-claude-code

Superpowers is embedded as an adapted local methodology through the SeaBridgeAI sea-* skills. Claude Code also has user-scope local plugin `superpowers@superpowers-dev` installed from the ECC vendor marketplace. Reference clone: `vendor\superpowers`. Do not add, update, remove, or reinstall Superpowers globally or through a marketplace unless explicitly approved.

GSD / Get Shit Done is embedded as a controlled local reference and adapted workflow layer through `sea-gsd-controlled-execution`. Reference clone: `external\get-shit-done`. Do not run `npx get-shit-done-cc@latest`, install globally, enable yolo/autonomous mode, auto-commit, auto-push, or auto-create PRs unless explicitly approved.

Mandatory gates: local-only development unless approved; no GitHub push unless approved; no commit unless requested; no global install or marketplace install unless approved; no paid/live provider calls unless approved; no fabricated sustainability data; verify endpoint/database/source/auth/tenant behavior before frontend or product claims; verify before completion.

## Instruction Precedence And Load Order

The single canonical precedence and load-order statement lives in
`AGENTS_SYSTEM.md` ("Instruction Precedence And Load Order"). Follow it exactly;
this file adds no competing ordering.

## Skill Selection Default

Discover skills dynamically from `AGENT_SKILLS.md`, `.agents/skills/`,
`skills/`, `.claude/skills/`, `workflows/`, and `checklists/`. Do not maintain
copied catalogs in product repos.

Load at most ONE skill per task by default. A task is simple (no skill needed)
when it touches at most 2 files, adds no dependency, and involves none of:
auth, tenant isolation, billing, migrations, security, production data,
destructive operations, AI grounding, or sustainability-data provenance. When
unsure which skill applies, load only `sea-skill-map` and follow its routing.
State it when no skill was needed.

Procedural defaults: `sea-task-queue-execution` for queued issues or AFK
implementation units, `sea-teach-loop` for stateful teaching,
`sea-error-recovery-loop` after failed tasks or verification. Portable
invocations: `#skill/grill-me`, `#skill/ubiquitous-language`,
`#skill/improve-codebase-architecture`, or `Use skill: <name>`.

## Goal Protocol Default

For non-trivial SeaBridgeAI work, `/goal` is the default operating contract.
Use `goal-default` to frame the user request with Definition of Done, validation
plan, risks, dependencies, scope, blockers, and artifacts, then continue until
validated or blocked. Do not call a skill named `goal`; use `goal-default` or
read the protocol directly. Canonical protocol:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
(compact form: `protocols\GOAL_PROTOCOL_SHORT.md`).

`/goal` sits above Spec Kit and GSD: Spec Kit owns formal specs; GSD owns
long-running execution state and UAT. `/goal` never authorizes commits, pushes,
installs, live/paid calls, destructive actions, migrations, or production data
changes.

## SeaBridgeAI Central Coding-Agent Layer

For SeaBridgeAI work across backend, frontend, OpenSeaBri, autoresearch,
`_upstream`, and future repos, load:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\SEABRIDGE_CODING_AGENT_SYSTEM.md`

Use the matching `repo-integrations/`, `skills/sea-*`, `.agents/skills/sea-*`,
`workflows/`, and `checklists/` files. Do not duplicate long shared guidance
into product repos.

Apply the canonical Ponytail-inspired minimalism guardrail in
`AGENTS_SYSTEM.md`: understand first, reuse before writing, prefer deletion,
standard library, native platform features, and already-installed dependencies,
protect safety and data integrity, and verify non-trivial changes.

Apply the canonical LLM Wiki / Knowledge Vault protocol in `AGENTS_SYSTEM.md`
for durable non-sensitive Markdown knowledge. Route memory questions through
`agent-memory`, ingestion decisions through `knowledge-ops`, note edits through
`sea-knowledge-vault`, and compiled OpenKB/PageIndex work through
`openkb-knowledge-base` only when explicitly requested or already configured.

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


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

- **agents/** - Specialized subagents for delegation (planner, code-reviewer, tdd-guide, etc.)
- **skills/** - Workflow definitions and domain knowledge (coding standards, patterns, testing)
- **commands/** - Slash commands invoked by users (/tdd, /plan, /e2e, etc.)
- **hooks/** - Trigger-based automations (session persistence, pre/post-tool hooks)
- **rules/** - Always-follow guidelines (security, coding style, testing requirements)
- **mcp-configs/** - MCP server configurations for external integrations
- **scripts/** - Cross-platform utilities for hooks, setup, guardrail checks, and Context Hub tasks
- **context-hub/** - Repo-local Context Hub content derived from the canonical English docs
- **tests/** - Test suite for scripts and utilities

## Documentation Retrieval Order

1. Read the local repo file directly if the answer is already in the workspace.
2. Use ECC's local Context Hub bundle for ECC-specific guides, commands, policies, and workflows.
3. Use public Context Hub entries for non-ECC skills or shared playbooks.
4. Use Context7 only for third-party libraries, frameworks, SDKs, and APIs.
5. Use `llms.txt` or general browsing only as fallback paths.

## Context Hub Commands

```bash
npm run context-hub:sync       # refreshes context-hub/ecc/... plus the repo root llms.txt
npm run context-hub:validate   # npx -y @aisuite/chub build context-hub --validate-only
npm run context-hub:build      # builds context-hub/dist for local chub search / chub get
```

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
- Optional convenience use for humans and agents: prefer `npx -y @aisuite/chub`; global installs require explicit approval.

## Contributing

Follow the formats in CONTRIBUTING.md: agents (Markdown + frontmatter), skills
(When to Use / How It Works / Examples), commands (Markdown + description
frontmatter), hooks (JSON with matcher and hooks array). File naming: lowercase
with hyphens (e.g. `python-reviewer.md`, `tdd-workflow.md`).

## Skills For ECC Files

| File(s) | Skill |
|---------|-------|
| `README.md` | `/readme` |
| `.github/workflows/*.yml` | `/ci-workflow` |
| `agents/docs-lookup.md`, `skills/documentation-lookup/SKILL.md` | `documentation-lookup` |
| Memory/session continuity, project recall, backend memory questions | `agent-memory` |
| Secondary browser inspection alongside Playwright | `vibe-check` |
| Google Cloud, Firebase, Gemini API, or Google Cloud WAF work | matching `google/skills` skill |
| Design artifact generation (prototypes, decks, mobile apps, operations docs) | `open-design` |

When spawning subagents, always pass conventions from the respective skill into the agent's prompt.

## Roster And Tooling Pointers

- Specialized subagents, GSD lifecycle commands, and gstack skills:
  `docs/tools/ECC_AGENT_ROSTER.md`. Load only when delegating or when a
  `/gsd-*` or gstack command is requested.
- rtk, caveman, codeburn, designlang, Open Design, Vibium, Google Agent Skills,
  token-availability retry loops, memory routing, graphify, paper2agent:
  `docs/tools/ECC_TOOLING_REFERENCE.md`. Load only when the specific tool is
  needed.

Hard rules that always apply: global/marketplace installs require explicit
approval; token-retry loops are opt-in only; Playwright remains canonical for
repeatable SeaBridgeAI browser QA; `graphify-out/GRAPH_REPORT.md` is the entry
point for architecture questions in this repo, and run `graphify update .`
after modifying code files.
