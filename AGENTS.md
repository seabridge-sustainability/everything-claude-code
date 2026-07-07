# Everything Claude Code (ECC) — Agent Instructions

<!-- SEABRIDGE_GOAL_PROTOCOL_START -->
## /goal Default Operating Mode

All SeaBridgeAI coding-agent tasks default to /goal.

Before implementation, establish a persistent execution goal, Definition of Done, validation plan, affected systems, dependencies, risks, expected artifacts, and likely edge cases. Continue the execution loop until the DoD is validated or a hard blocker is documented.

### /goal and Auto-Loop Are the Same Mode

/goal is the user-facing command; auto-loop is the autonomous persistent execution behavior. The agent must not return early after code generation, must not claim completion until validation passes, and must keep working until the Definition of Done is satisfied or a hard blocker is proven. If the task is multi-phase (touches more than 2 files, adds a dependency, requires a schema/migration change, or spans more than one repo), state the expected phases and validation steps before starting. If a non-trivial task finishes unusually quickly, include evidence explaining why it was genuinely small or already validated.

Claude Code boundary: `/goal` is a UI slash command, not a callable skill. Agents
must never invoke `Skill(goal)`. If the user includes `/goal`, treat it as the
goal protocol wrapper and continue. If slash-command execution is unavailable,
apply the protocol manually or use the exact skill name `goal-default`.

Canonical protocol: C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md

Compact form: C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL_SHORT.md

Do not claim completion from code edits, generated files, or partial tests. Completion requires validated behavior, checked integrations, regression coverage proportional to risk, and documented skipped checks or blockers.

### Completion Evidence Required

Every final report must include files changed, commands run, tests run, validation results, errors encountered, fixes applied, unverified items, remaining risks, and whether the Definition of Done is satisfied. If no tests were run, state why tests were not run, what validation was substituted, and what risk remains. The phrase "complete" is prohibited unless accompanied by validation evidence.

### Anti-Stuck Loop Rule

Timeout/stagnation rule: if a command or approach fails twice, do not repeat it blindly. Inspect logs, change strategy, isolate the problem, reduce scope, use a different validation path, and document the blocker if unresolved. If a process hangs or becomes a hung process, stop it safely, check logs, run a smaller command, verify the environment, and continue with an alternate route.

<!-- SEABRIDGE_GOAL_PROTOCOL_END -->


## SeaBridgeAI Central System With Embedded Superpowers And GSD

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Canonical path: C:\Users\adelm\SeaBridgeAI\everything-claude-code

Superpowers is embedded as an adapted local methodology through the SeaBridgeAI sea-* skills. Claude Code also has user-scope local plugin `superpowers@superpowers-dev` installed from the ECC vendor marketplace. Reference clone: `vendor\superpowers`. Do not add, update, remove, or reinstall Superpowers globally or through a marketplace unless explicitly approved.

GSD / Get Shit Done is embedded as a controlled local reference and adapted workflow layer through `sea-gsd-controlled-execution`. Reference clone: `external\get-shit-done`. Do not run `npx get-shit-done-cc@latest`, install globally, enable yolo/autonomous mode, auto-commit, auto-push, or auto-create PRs unless explicitly approved.

Mandatory gates: local-only development unless approved; no GitHub push unless approved; no commit unless requested; no global install or marketplace install unless approved; no paid/live provider calls unless approved; no fabricated sustainability data; verify endpoint/database/source/auth/tenant behavior before frontend or product claims; verify before completion.

Claude Code, Codex, Gemini, OpenCode, Cursor, GitHub Copilot CLI, and future coding agents must use the same SYSTEM_ID, canonical path, dynamic skill retrieval policy, workflows, and checklists. Product repos should point here rather than duplicating divergent guidance.

## Instruction Precedence And Load Order

The single canonical precedence and load-order statement lives in
`AGENTS_SYSTEM.md` ("Instruction Precedence And Load Order"). Follow it exactly;
this file adds no competing ordering. Summary: Tier-1 safety rules first, then
explicit user/session instructions, then repo-local files, then ECC canonical
files, then skills/workflows/checklists.

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

## SeaBridge Git Integration Discipline

- Integration branches are fixed for ManageESG product work: backend
  `seabridge_development`, frontend `development`. Do not create feature
  branches, PRs, or new repos without explicit user approval.
- `main` (backend) and the equivalent live branch (frontend) are
  live/production. Never push, commit, merge, or otherwise modify them unless
  the user explicitly requests that specific change in that session.
- Always run `git status --short --branch` and `git fetch --prune` before work,
  before integration, and before final reporting.
- If isolation is required, use a short-lived isolated git worktree from the
  latest remote tip, integrate there, rebase onto the latest remote tip,
  fast-forward push, and remove the worktree. Never force-push.
- Concurrent agent sessions may be active in backend and frontend. Never
  clobber uncommitted working-tree changes; inspect and preserve them before
  acting.
- Environment defaults: Windows + PowerShell; backend Python is
  `.\venv\Scripts\python.exe`; loguru formatting uses `{}` placeholders, not
  `%s`; `.env` is gitignored and normally exists only in the main repo, so test
  worktrees may need a local ignored copy; first GitHub push may require
  interactive credential setup, then cached credentials can be reused.

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
`_upstream`, and future repos, load the shared entrypoint:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\SEABRIDGE_CODING_AGENT_SYSTEM.md`

Then use the relevant `repo-integrations/`, `skills/sea-*`, `.agents/skills/sea-*`,
`workflows/`, and `checklists/` files. Keep reusable guidance here in ECC;
product repos should only carry lightweight pointers and repo-specific overrides.
For optional GBrain checks and code-lookup planning, use `skills/gbrain/SKILL.md`
and `scripts/gbrain-workspace.ps1`; it is intentionally check/plan first and does
not initialize a brain or index sources by default.

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->

## Coding-Agent Principles (Always Applied)

Canonical text lives in this repo's `AGENTS_SYSTEM.md` under "Coding-Agent
Principles (Always Applied)". Follow it as mandatory behavioral guardrails —
Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven
Execution, and the five-gate execution discipline (evidence before reasoning,
adversarial reasoning, verification before completion, calibrated reporting).
Only the user may explicitly relax them for a specific task. Full playbook:
`everything-claude-code/.claude/skills/karpathy-guidelines/SKILL.md`.

## Ponytail Minimalism Pointer

Apply the canonical Ponytail-inspired minimalism guardrail in
`AGENTS_SYSTEM.md`: understand first, reuse before writing, prefer deletion,
standard library, native platform features, and already-installed dependencies,
protect safety and data integrity, and verify non-trivial changes.

## LLM Wiki / Knowledge Vault Pointer

Apply the canonical LLM Wiki / Knowledge Vault protocol in `AGENTS_SYSTEM.md`
for durable non-sensitive Markdown knowledge. Route memory questions through
`agent-memory`, ingestion decisions through `knowledge-ops`, note edits through
`sea-knowledge-vault`, and compiled OpenKB/PageIndex work through
`openkb-knowledge-base` only when explicitly requested or already configured.

## Core Principles

1. **Agent-First** — Delegate to specialized agents for domain tasks
2. **Test-Driven** — Write tests before implementation, 80%+ coverage required
3. **Security-First** — Never compromise on security; validate all inputs
4. **Immutability** — Always create new objects, never mutate existing ones
5. **Plan Before Execute** — Plan complex features before writing code

## Documentation Retrieval Order

1. Local repo file if the answer is already in the checked-out workspace.
2. ECC's local Context Hub bundle via `chub` for ECC-specific guides, commands, playbooks, and policies.
3. Public Context Hub entries for non-ECC skills or shared playbooks.
4. Context7 only for third-party libraries, frameworks, SDKs, and APIs.
5. `llms.txt` or web browsing only as fallback paths.

## Specialized Agents And Lifecycle Commands

The full roster of ECC subagents (planner, code-reviewer, tdd-guide,
security-reviewer, language reviewers/build resolvers, loop-operator,
harness-optimizer, chief-of-staff, and the GSD lifecycle agents and commands)
lives in `docs/tools/ECC_AGENT_ROSTER.md`. Load it only when delegating or when
a `/gsd-*` or gstack command is requested.

## Installed Tooling Pointer

Details for rtk, caveman, codeburn, designlang, Open Design, Vibium, Google
Agent Skills, token-availability retry loops, memory routing, graphify, and the
paper2agent suite live in `docs/tools/ECC_TOOLING_REFERENCE.md`. Load that file
only when the specific tool is needed. Hard rules that always apply:

- Global installs and marketplace installs require explicit approval.
- Token-retry loops (`scripts/agent-token-retry.ps1`) are opt-in only.
- Playwright remains canonical for repeatable SeaBridgeAI browser QA; Vibium is
  secondary inspection only.
- Google Cloud auth/IAM/deployment work keeps SeaBridgeAI approval and cost
  controls in force.

## Security Guidelines

**Before ANY commit:**
- No hardcoded secrets (API keys, passwords, tokens)
- All user inputs validated
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitized HTML)
- CSRF protection enabled
- Authentication/authorization verified
- Rate limiting on all endpoints
- Error messages don't leak sensitive data

**Secret management:** NEVER hardcode secrets. Use environment variables or a secret manager. Validate required secrets at startup. Rotate any exposed secrets immediately.

**If security issue found:** STOP → use security-reviewer agent → fix CRITICAL issues → rotate exposed secrets → review codebase for similar issues.

## Coding Style

**Immutability (CRITICAL):** Always create new objects, never mutate. Return new copies with changes applied.

**File organization:** Many small files over few large ones. 200-400 lines typical, 800 max. Organize by feature/domain, not by type. High cohesion, low coupling.

**Error handling:** Handle errors at every level. Provide user-friendly messages in UI code. Log detailed context server-side. Never silently swallow errors.

**Input validation:** Validate all user input at system boundaries. Use schema-based validation. Fail fast with clear messages. Never trust external data.

**Code quality checklist:** functions small (<50 lines), files focused (<800 lines), no deep nesting (>4 levels), proper error handling, no hardcoded values, readable well-named identifiers.

## Testing Requirements

**Minimum coverage: 80%.** Test types: unit (functions, utilities, components), integration (API endpoints, database operations), E2E (critical user flows).

**TDD workflow:** write failing test first (RED) → minimal implementation (GREEN) → refactor (IMPROVE, keep coverage 80%+). Troubleshoot failures: check test isolation → verify mocks → fix implementation (not tests, unless tests are wrong).

## Development Workflow

1. **Plan** — Use planner agent, identify dependencies and risks, break into phases
2. **TDD** — Use tdd-guide agent, write tests first, implement, refactor
3. **Review** — Use code-reviewer agent immediately, address CRITICAL/HIGH issues
4. **Capture knowledge in the right place** — personal notes → auto memory; team/project knowledge → the project's existing docs structure; do not duplicate; if no obvious location, ask before creating a new top-level file
5. **Commit when explicitly approved** — Conventional commits format (`<type>: <description>`; feat, fix, refactor, docs, test, chore, perf, ci), comprehensive PR summaries; push only after the separate push approval gate is satisfied

## Architecture Patterns

**API response format:** Consistent envelope with success indicator, data payload, error message, and pagination metadata.

**Repository pattern:** Encapsulate data access behind standard interface (findAll, findById, create, update, delete). Business logic depends on abstract interface, not storage mechanism.

**Context management:** Avoid last 20% of context window for large refactoring and multi-file features. Lower-sensitivity tasks tolerate higher utilization.

## Project Structure

```
agents/          - specialized subagents
skills/          - workflow skills and domain knowledge
commands/        - slash commands
hooks/           - trigger-based automations
rules/           - always-follow guidelines (common + per-language)
scripts/         - cross-platform utilities and guardrail checks
mcp-configs/     - MCP server configurations
tests/           - test suite
```
