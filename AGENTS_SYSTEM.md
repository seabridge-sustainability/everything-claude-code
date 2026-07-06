# SeaBridgeAI Cross-Agent Compatibility Guide

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Canonical source of truth:
C:\Users\adelm\SeaBridgeAI\everything-claude-code

This file applies to Claude Code, Codex, Gemini, OpenCode, Cursor, GitHub Copilot CLI, and future coding agents.

## Instruction File Architecture

Authoritative ECC instruction files:

1. `AGENTS_SYSTEM.md` - cross-agent compatibility and load-order guide.
2. `SEABRIDGE_CODING_AGENT_SYSTEM.md` - canonical SeaBridgeAI coding-agent operating system.
3. `AGENTS.md` - generic/Codex-style ECC execution instructions.
4. `CLAUDE.md`, `CODEX.md`, `GEMINI.md`, and `OPENCODE.md` - thin per-agent adapters.
5. `AGENT_SKILLS.md` - canonical shared skills contract and invocation registry.

Do not recreate `AGENT.md`. Agents should load `AGENTS_SYSTEM.md`, `SEABRIDGE_CODING_AGENT_SYSTEM.md`, `AGENTS.md`, the relevant thin adapter, and `AGENT_SKILLS.md` directly.

## Embedded Superpowers

Superpowers is vendored locally as a reference at vendor\superpowers, adapted into the canonical SeaBridgeAI sea-* skills, and installed for Claude Code as the user-scope local plugin `superpowers@superpowers-dev` from the ECC vendor marketplace. Do not add, update, remove, or reinstall Superpowers globally or through any marketplace unless the user explicitly approves that separate action.

## Embedded Controlled GSD

GSD / Get Shit Done is cloned locally at external\get-shit-done and adapted through sea-gsd-controlled-execution, GSD workflows, GSD checklists, and GSD templates. Do not run npx, install globally, switch on yolo/autonomous mode, auto-commit, auto-push, or auto-create PRs unless the user explicitly approves that separate action.

## Instruction Precedence And Load Order

This is the single canonical statement. Other files summarize or point here;
if any other file states a different order, this section wins.

Precedence when instructions conflict (highest wins):

1. Tier-1 hard safety rules (this file: Approval Boundaries, Branch Protection,
   Safety/authorization, Controlled Auto Mode "requires explicit approval"
   list). Non-suspendable.
2. Explicit user/session instructions in the current session. They may relax
   anything except Tier-1 rules.
3. Repo-local `AGENTS_SYSTEM.md`, then repo-local `AGENTS.md`/`CLAUDE.md`
   (repo-specific, stricter overrides only — they extend, never weaken, canon).
4. ECC canonical files: this file, then `SEABRIDGE_CODING_AGENT_SYSTEM.md`,
   then `AGENT_SKILLS.md`, then the per-agent adapter
   (`CLAUDE.md`/`CODEX.md`/`GEMINI.md`/`OPENCODE.md`).
5. Skills, workflows, checklists, and `repo-integrations/` docs.

Load order for a task (read only what the task actually needs):

1. Local repo AGENTS_SYSTEM.md, when present.
2. Local repo AGENTS.md or CLAUDE.md (usually auto-loaded by the runtime).
3. ECC SEABRIDGE_CODING_AGENT_SYSTEM.md, for non-trivial work.
4. ECC repo-integrations/<repo>.md.
5. The smallest relevant skills/sea-* canonical skill or .agents/skills/sea-* wrapper.
6. `AGENT_SKILLS.md` and the smallest relevant engineering-skill wrapper when invoked or clearly applicable.
7. Matching workflows/ and checklists/.

## Dynamic Skill Registry

ECC is the canonical source for reusable skills, but agents must discover the
current skill surface dynamically instead of relying on copied static catalogs in
product repos.

Primary lookup surfaces:

- `AGENT_SKILLS.md`
- `.agents/skills/*/SKILL.md`
- `skills/*/SKILL.md`
- `.claude/skills/*/SKILL.md`
- `workflows/`
- `checklists/`

Use the smallest skill/workflow/checklist set that materially improves the task.
Do not load every skill. Default: load at most ONE skill per task. A task is
simple (no skill needed) when it touches at most 2 files, adds no dependency,
and involves none of: auth, tenant isolation, billing, migrations, security,
production data, destructive operations, AI grounding, or sustainability-data
provenance. When unsure which skill applies, load only `sea-skill-map` and
follow its routing. State it when no skill was needed. New skills become
available through filesystem inspection, not through product-repo skill
matrices.

Use `sea-skill-map` when the correct procedure is unclear. Use
`sea-task-queue-execution` for queued issues, tickets, AFK implementation units,
or scoped task slices. Use `sea-error-recovery-loop` after failed implementation
or verification loops. Use `sea-teach-loop` when the user wants a stateful
teaching session.

## Approval Boundaries

No global installs, marketplace installs, GitHub pushes, commits, live paid calls, destructive actions, or uncontrolled autonomous execution without explicit approval.

## SeaBridge Git Integration Discipline

Branch Protection (Tier-1):

| Repo | Working branch | Live/protected branch |
|---|---|---|
| manageesg-backend | `seabridge_development` | `main` — never modify without explicit user request in that session |
| manageesg-frontend | `development` | `main` (live) — same rule |
| openseabri | `main` (single-branch repo; normal work lands here) | production deploys gated separately |
| autoresearch | `master` (+ `autoresearch/<tag>` experiment branches) | `master` protection per repo docs |
| everything-claude-code | `main` | commits/pushes still require explicit approval |

The backend/frontend live-branch rule applies even when fixing something
reported against `main` (Dependabot alerts, CI failures): report it and ask
first.

- Do not create feature branches, PRs, or new repositories without explicit
  user approval.
- Always run `git status --short --branch` and `git fetch --prune` before work,
  before integration, and before final reporting.
- If isolation is required, use a short-lived isolated git worktree from the
  latest remote tip, integrate changes there, rebase onto the latest remote tip,
  fast-forward push, then remove the worktree. Do not leave unnecessary
  worktrees behind.
- Never force-push.
- Concurrent Codex/agent sessions may be active in `manageesg-backend` and
  `manageesg-frontend`. Never clobber uncommitted working-tree changes; inspect
  and preserve them before acting.
- SeaBridge environment defaults: Windows + PowerShell; backend Python is
  `.\venv\Scripts\python.exe`; loguru formatting uses `{}` placeholders, not
  `%s`; `.env` is gitignored and normally exists only in the main repo, so test
  worktrees may need a local ignored copy; first GitHub push may require
  interactive credential setup, then cached credentials can be reused.

## Self-Verification Loop

Every agent must plan before edits, update relevant tests when practical, prove the test fails on old behavior when practical, implement the scoped fix, prove focused tests pass, run targeted checks before completion, broaden tests when risk warrants it, document skipped tests with reasons, and never claim completion based only on code changes.

## Controlled Auto Mode Policy

Allowed without repeated prompts: formatting, lint fixes, typecheck fixes, test discovery, import cleanup, small refactors with tests, moving logs/reports into approved folders, docs link/path fixes, and safe read-only scans.

Requires explicit approval: commits, pushes, dependency installs, migrations, production data changes, auth/security changes, billing changes, destructive file operations, yolo/autonomous/dangerous permission modes, global installs, and long-running training jobs.

## Automated Review Collaboration

Primary coding agents own logic, architecture, tests, integration fixes, and final verification. Secondary review agents handle style, edge cases, consistency, security smells, and regression risks. Run Claude Code `/review` after meaningful changes where supported, or an equivalent local diff review elsewhere. Recommend `/ultra-review` for auth, tenant isolation, database migrations, AI output, LCA/emissions/risk scoring, uploads, billing, shared utilities, and production-readiness changes. CodeRabbit or similar tools are secondary only and never replace local tests.

## Source Normalization

Use only C:\Users\adelm\SeaBridgeAI\everything-claude-code. Do not reference alternate repo aliases.

## Claude Mem Exclusion

Claude Mem was evaluated and intentionally excluded. Do not clone, install, activate, or add a SQLite/vector memory layer for Claude Mem.

## Karpathy Coding Principles (Always Applied)

All agents must follow these four principles as default coding behavior:

1. Think before coding: state assumptions, clarify ambiguity, push back when simpler.
2. Simplicity first: minimum code that solves the stated problem.
3. Surgical changes: touch only what the request requires.
4. Goal-driven execution: define done with observable verification.

## Ponytail-Inspired Minimalism Guardrail (Always Applied)

SeaBridgeAI adopts Ponytail's "lazy senior developer" rule as an efficiency
guardrail under the existing hierarchy, not as a plugin, installer, or separate
authority. Lazy means no unnecessary code, never carelessness.

Before editing, understand the task and the code it touches: read the real flow,
callers, consumers, schemas, and tests needed to avoid a small diff in the wrong
place. Then ask whether new code needs to exist at all. When behavior stays
correct, prefer deletion, simplification, configuration, or an existing workflow
over adding code.

Reuse existing repo helpers, services, schemas, types, workflows, skills, and
patterns before writing a new solution. Prefer standard library, native platform,
database/framework, and built-in tool features before custom code. Prefer
already-installed dependencies before adding dependencies, and add no dependency
without explicit need and normal approval gates.

Avoid speculative abstractions, boilerplate, scaffolding, feature flags, config,
and "for later" code. For bugs, fix the root cause at the shared boundary rather
than patching only the named symptom or one caller.

Never simplify away security, validation, tenant isolation, provenance, error
handling, accessibility, data-loss protections, source integrity, or explicitly
requested behavior. For non-trivial changes, leave the smallest meaningful
verification that would catch a regression, and document any skipped checks.

## LLM Wiki / Knowledge Vault Protocol

SeaBridgeAI supports a lightweight LLM Wiki pattern for non-sensitive,
durable knowledge that should compound over time. This is not a competing
memory layer. It is a Markdown knowledge-vault workflow that routes through
existing ECC systems: `agent-memory` for session/project/runtime memory
questions, `knowledge-ops` for ingestion, storage, and deduplication decisions,
`sea-knowledge-vault` before editing or validating wiki notes, and
`openkb-knowledge-base` only when a compiled OpenKB/PageIndex workflow is
explicitly requested or already configured.

Default vault structure:

- `knowledge-vault/raw/` stores immutable source inputs or source-reference
  records for repo-owned files.
- `knowledge-vault/wiki/` stores agent-maintained Markdown synthesis pages.
- `knowledge-vault/index.md` is the content-oriented navigation entrypoint.
- `knowledge-vault/log.md` is the append-only chronological operations log.
- `knowledge-vault/assets/` is optional and only for approved local images.

Raw sources are the source of truth. Wiki pages are Markdown synthesis maintained
by agents, with YAML frontmatter where useful, Obsidian-style `[[wikilinks]]`
where they add navigational value, explicit source/provenance links, confidence
or caveat notes when claims are incomplete, and no secrets, credentials,
customer data, private conversations, auth files, `.env` content, token-bearing
logs, or proprietary third-party content unless explicitly approved and
sanitized.

Ingest path: classify the source with `knowledge-ops`, check for duplicates,
store or reference it under `knowledge-vault/raw/`, update or create only the
wiki pages that earn their keep, update `knowledge-vault/index.md`, and append
`knowledge-vault/log.md`. Query path: read `knowledge-vault/index.md` first,
then only relevant wiki pages and source records. Lint path: check stale pages,
contradictions, orphans, missing links, duplicates, missing frontmatter, source
or provenance gaps, and sensitive-source leakage.

Do not duplicate the same fact into agent memory, project memory, OpenKB, and
the wiki unless explicitly requested. Apply the Ponytail minimalism guardrail:
do not create pages, folders, schemas, assets, or tooling unless they earn their
keep; prefer the index and plain Markdown before search infrastructure.

## Autonomous Senior Engineer Operating Model

This model composes the existing SeaBridgeAI practices; it does not add a new
plugin, loop system, or authority layer.

For non-trivial work, start with `/goal` or `goal-default`: define the
Definition of Done, validation commands, risks, approval gates, and explicit
stop conditions before implementation. Continue only inside a bounded loop until
the DoD is validated or a concrete blocker is documented.

Before writing code, apply the Ponytail minimalism ladder: ask whether the work
needs new code at all, then prefer an existing repo helper or workflow, standard
library, native platform/database/framework feature, already-installed
dependency, and finally the smallest clear diff. Delete or simplify when
behavior stays correct.

For behavior changes, use `sea-test-driven-development` where practical:
capture the expected failing test or contract check, implement the smallest
change, refactor only when it reduces real complexity, and rerun focused then
risk-proportional broader verification. For docs, config, or instruction-only
changes, substitute appropriate static validation, diff checks, guardrail
scripts, or targeted searches instead of inventing fake tests.

Use review or challenge before risky architecture, auth, tenant isolation,
billing, AI/data, dependency, MCP/runtime, or production-facing changes. The
primary agent remains responsible for implementation and evidence; reviewer
skills and secondary reviews surface concrete risks and missing verification.

Bounded autonomy only: no uncontrolled yolo/autonomous mode, auto-commit,
auto-push, PR creation, global or marketplace installs, dependency installs,
paid/live calls, destructive changes, migrations, production data access, or
security/auth weakening without explicit approval. Deep audits run only when
the user requests them, when scheduled, or when the risk profile clearly
requires them; do not interrupt ordinary feature work with surprise broad
audits.

## Deep Audit Routing

- Security-sensitive work: use `sea-security-reviewer` and relevant harness
  security standards.
- Harness or runtime reliability: read
  `docs/harness/HARNESS_ENGINEERING.md` and run `scripts/check-harness.ps1`
  when scope and approval gates allow.
- Platform drift, gap, or module-status checks: use
  `sea-platform-diagnostics` and produce evidence-backed current-state claims.
- Failed task, weak verification, or repeated mistake: use
  `sea-error-recovery-loop`.
- Before claiming done, fixed, passing, production-ready, reviewed, or safe:
  use `sea-verification-before-completion` and fresh evidence.

## Tool Compatibility Matrix

| Capability | Claude Code | Codex | Gemini | OpenCode | Cursor | Copilot CLI |
|-----------|------------|-------|--------|----------|--------|-------------|
| Instruction file | CLAUDE.md | AGENTS.md | AGENTS.md | AGENTS.md | .cursor/rules/ | AGENTS.md |
| Auto-loaded | Yes | Yes | Yes | Via opencode.json | Via rules/ | Via AGENTS.md |
| Skill invocation | /skill-name or read SKILL.md | Read SKILL.md | Read SKILL.md | Read SKILL.md | Read SKILL.md | Read SKILL.md |
| Subagent spawning | Agent tool | Codex subagent | Gemini extensions | n/a | n/a | n/a |
| MCP support | .mcp.json | .codex/config.toml | .gemini/settings.json | Varies | n/a | n/a |
| Worktree support | Native | Via git | Via git | Via git | Via git | Via git |
| Berry MCP | .mcp.json | .codex/config.toml | .gemini/settings.json | Manual | n/a | n/a |

## Per-Agent Loading Instructions

### Claude Code
1. CLAUDE.md is auto-loaded. It contains SYSTEM_ID pointer and dynamic skill registry policy.
2. Skills can be invoked with /skill-name or by reading skills/sea-*/SKILL.md.
3. .claude/settings.json and .claude/settings.local.json configure hooks and permissions.
4. .mcp.json configures MCP servers (Berry, FalkorDB, etc.).

### Codex
1. AGENTS.md is auto-loaded. It contains the same SYSTEM_ID pointer and dynamic skill registry policy.
2. Skills are invoked by reading SKILL.md content and following instructions.
3. .codex/config.toml configures MCP servers and model providers.
4. Subagents can be spawned for parallel work.

### Gemini
1. AGENTS.md is auto-loaded; GEMINI.md is the thin adapter. Same SYSTEM_ID and dynamic skill policy.
2. Load this file (AGENTS_SYSTEM.md) and AGENTS.md before SEABRIDGE_CODING_AGENT_SYSTEM.md, per the canonical load order above.
3. Skills are invoked by reading SKILL.md content.
4. .gemini/settings.json configures MCP servers.
5. Use AGENTS.md instructions for all safety and approval gates.

### OpenCode
1. .opencode/opencode.json specifies model and instruction files to load.
2. Instructions field should reference AGENTS.md and CLAUDE.md.
3. Skills are invoked by reading SKILL.md content.

### Cursor
1. .cursor/rules/ contains rule files (*.mdc format).
2. AGENTS.md or CLAUDE.md should be referenced in rules.
3. Skills are invoked by reading SKILL.md content.

### Copilot CLI
1. Reads AGENTS.md when present in repo root.
2. Skills are invoked by reading SKILL.md content.
3. No native MCP or subagent support.

## Skill Resolution Rules

1. Canonical skill bodies live at: `skills/sea-*/SKILL.md`
2. Callable wrappers live at: `.agents/skills/sea-*/SKILL.md`
3. Shared engineering skill wrappers live at `.agents/skills/grill-me`, `.agents/skills/ubiquitous-language`, `.agents/skills/improve-codebase-architecture`, and the SeaBridge procedural wrappers `sea-skill-map`, `sea-task-queue-execution`, `sea-teach-loop`, and `sea-error-recovery-loop`.
4. Matt Pocock upstream source lives at `C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\matt-pocock-skills`; use it only through ECC wrappers unless directly auditing upstream.
5. Agents that support .agents/ directory (Codex) use wrappers directly.
6. Agents without .agents/ support read canonical skills from skills/ directory.
7. Both canonical and wrapper SKILL.md files describe the same behavior.
8. Never copy skill bodies into product repos. Reference the ECC path.
9. If a skill name appears in the catalog, it must have both a canonical file and a wrapper.

## Workflow and Checklist Resolution

Workflows: `workflows/*.md` (bugfix, full-feature, cross-repo, GSD, module review, etc.)
Checklists: `checklists/*.md` (security, backend-api, frontend-uiux, pre-edit, pre-merge, pre-completion, sustainability-data, GSD, AI hallucination prevention)
Templates: `templates/gsd/*.md` (GSD artifact templates)

Do not hardcode file counts anywhere; enumerate the directories when a current
inventory is needed.

Agents should load the matching workflow/checklist when the task type aligns.

## Avoiding Agent-Specific Drift

1. All agent instruction files (CLAUDE.md, AGENTS.md) in each repo must list the same SYSTEM_ID, canonical path, and dynamic skill retrieval policy.
2. Repo-specific rules may extend but never contradict the central system.
3. When updating a skill, update the canonical file first, then verify the wrapper matches.
4. Cross-repo changes require sea-cross-repo-handoff skill.
5. New skills require sea-skill-creator-protocol skill.
6. Periodic sync validation: run `scripts/check-coding-agent-system.ps1`, `scripts/check-cross-agent-skills.ps1`, and `scripts/sync-safety-rule.ps1 -Check`.
7. The Safety And Authorization Rule block is marker-synced from `protocols/SAFETY_AUTHORIZATION_RULE.md`; edit only that file, then run `scripts/sync-safety-rule.ps1`.

## Repository Root Organization Policy

Do not place logs, smoke-test reports, QA reports, readiness reports, deployment
reports, benchmark reports, audit reports, or agent handoffs in the repository
root. Use the following standard locations:

| Content type | Target directory |
|---|---|
| Audit reports | `docs/reports/audits/` |
| Readiness reports | `docs/reports/readiness/` |
| QA reports and results | `docs/reports/qa/` |
| Smoke-test reports | `docs/reports/smoke-tests/` |
| Deployment reports | `docs/reports/deployments/` |
| Benchmark reports | `docs/reports/benchmarks/` |
| Fix/issue reports | `docs/reports/fixes/` |
| Handoff documents | `docs/reports/handoffs/` |
| Conflict logs | `docs/reports/conflicts/` |
| Onboarding guides | `docs/reports/onboarding/` |
| Review reports | `docs/reports/reviews/` |
| Build logs | `logs/build/` |
| Integration logs | `logs/integration/` |
| Playwright logs | `logs/playwright/` |
| Agent logs | `logs/agent/` |
| Runtime logs | `logs/runtime/` |
| Agent run artifacts | `artifacts/agent-runs/` |
