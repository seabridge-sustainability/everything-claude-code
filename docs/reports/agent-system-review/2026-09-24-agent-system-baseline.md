# Agent Instruction System — Baseline (2026-09-24)

Snapshot taken **before** the 2026-09-24 modernization. Companion:
`2026-09-24-agent-system-modernization.md` (decisions, changes, after-metrics).

Token counts use `tiktoken` `o200k_base`: exact for OpenAI models, an estimate for
Claude (Claude's tokenizer usually counts somewhat higher). Measurement script and
stack definitions: `scripts/measure-instruction-stack.py` (added in the modernization).

## 1. Harnesses actually in use

| Harness | Version / model | Evidence |
|---|---|---|
| Claude Code | 2.1.280; `claude-opus-5-5` (earlier sessions `claude-opus-5`); `effortLevel: high` in `~/.claude/settings.json` | `claude --version`, 21 backend session logs |
| Codex | `gpt-5.6-sol`, `model_reasoning_effort = "high"`, `features.codex_hooks = false` (deprecated alias) | `~/.codex/config.toml`; local `models_cache.json` lists no GPT-6 entries yet |
| Gemini / OpenCode / Cursor / OpenHands | config present (`.gemini/`, `opencode.jsonc`, `.cursor/rules/`, `.openhands/`) | no recent session evidence found |

## 2. Real loading semantics (verified against official docs)

**Claude Code** (code.claude.com/docs/en/memory, skills, sub-agents):
`~/.claude/CLAUDE.md` (absent on this machine) → ancestor/project `CLAUDE.md`
→ `.claude/rules/*.md` without `paths:` (every session) → auto-memory `MEMORY.md`
(first 200 lines / 25 KB) → skill name+description listing → task prompt.
`AGENTS.md` is read **only when no CLAUDE.md exists**; otherwise it must be
imported with `@AGENTS.md`. Subdirectory CLAUDE.md loads lazily. Subagents load
CLAUDE.md (built-in Explore/Plan do not) but not the parent conversation or memory.

**Codex** (developers.openai.com/codex/guides/agents-md; `codex-rs/core/src/agents_md.rs`):
`~/.codex/AGENTS.override.md` or `AGENTS.md` (first non-empty; here 0 bytes) →
from git root down to cwd, one of `AGENTS.override.md` / `AGENTS.md` / fallback
names per directory, concatenated root-first. Combined cap `project_doc_max_bytes`
= 32 KiB, **truncated mid-file silently**. Never reads `CLAUDE.md` or
`AGENTS_SYSTEM.md`. Skills: `.agents/skills` from cwd up to repo root, metadata
only until used (≈2% of context budget).

Neither harness auto-loads any `AGENTS_SYSTEM.md`, ECC file, or protocol file.
Those reach the model only when prose tells the agent to read them.

## 3. Instruction inventory and static cost (before)

"Mandated" = files the auto-loaded text tells the agent to read before work.

| Stack | Auto-loaded | Mandated by prose | Combined |
|---|---:|---:|---:|
| Claude Code — backend (root = any nested dir; no nested files) | 8,720 t (CLAUDE.md 2,187 + MEMORY.md 6,533) | 25,621 t | 34,341 t |
| Codex — backend | 4,353 t (AGENTS.md) | 21,268 t | 25,621 t |
| Claude Code — frontend | 4,728 t (CLAUDE.md 3,869 + rules/berry.md 794 + memory 65) | 16,932 t | 21,660 t |
| Codex — frontend | 4,558 t (AGENTS.md) | 15,846 t | 20,404 t |
| Claude Code — autoresearch | 4,744 t | — | 4,744 t |
| Codex — autoresearch | 5,123 t | — | 5,123 t |
| Claude Code — ECC | 3,141 t | — | 3,141 t |
| Codex — ECC | 3,730 t | — | 3,730 t |
| Claude Code / Codex — _upstream | 2,125 t / 3,387 t | — | — |

Mandated files: backend `AGENTS_SYSTEM.md` 5,459 t, ECC `AGENTS_SYSTEM.md` 5,897 t,
`SEABRIDGE_CODING_AGENT_SYSTEM.md` 4,908 t, `AGENT_SKILLS.md` 1,840 t,
`protocols/GOAL_PROTOCOL.md` 2,744 t, ECC `CLAUDE.md` 3,069 t, ECC `.codex/AGENTS.md` 1,983 t.

**Behavioural baseline** (21 backend Claude Code session logs, no API calls):

| Metric | Median | Mean | Max |
|---|---:|---:|---:|
| First-turn prompt tokens (system + tools + skills + instructions) | 77,387 | 77,910 | 172,990 |
| Assistant turns | 1,529 | 1,740 | 5,010 |
| Tool calls | 800 | 921 | 3,107 |
| Subagent spawns | 0 | 4.3 | 39 |
| `git status` invocations | 46 | 59.9 | 189 |
| `git fetch` invocations | 25 | 28.3 | 118 |
| pytest invocations | 134 | 146.5 | 471 |
| Sessions that actually read AGENTS_SYSTEM.md/AGENTS.md via tools | **1 of 21** | | |

Implication: repo-controlled text is ~11% of the real startup prompt. The rest is
harness, tool, MCP and org-synced plugin skill listings (sales, finance, HR,
legal, bio-research, small-business … — account-level, not repo-managed).
And the "load AGENTS_SYSTEM.md first, then AGENTS.md" instruction is ignored
95% of the time, so **Claude Code has effectively been running on CLAUDE.md +
MEMORY.md only**; rules that live only in AGENTS.md/AGENTS_SYSTEM.md never reached it.

## 4. Instruction graph (condensed)

| Instruction | Loaded by | Also in (overlap) | Conflicts with | Enforced mechanically by |
|---|---|---|---|---|
| `/goal` default + auto-loop + completion evidence + anti-stuck | goal marker block in every AGENTS.md/CLAUDE.md (7 repos) | AGENTS_SYSTEM §goal, GOAL_PROTOCOL(_SHORT), backend CLAUDE.md prose, frontend "Goal Protocol Default" prose (**3–4 copies per repo**) | "caveman output", "at most one skill" (goal-default is a skill) | `check-goal-protocol.ps1` (literal "Goal Protocol Default"), `sync-goal-protocol.ps1` re-inserts block |
| Safety & authorization (7 rules) | safety marker block | ECC AGENTS/CLAUDE/AGENTS_SYSTEM, frontend 3 files, berry rules, skills, commands, autoresearch program.md/README | internally: "never under any circumstances" vs "without explicit written approval" + approval procedure; "restricted/read-only by default" vs controlled-auto and `/goal` autonomy | `sync-safety-rule.ps1 -Check` (drift only) |
| `main` is live — never touch | backend CLAUDE.md, backend AGENTS.md, frontend CLAUDE/AGENTS.md | ECC AGENTS_SYSTEM branch table | — | **nothing** (no hook, no server-side note found) |
| `git status` + `git fetch --prune` before work, before integration, before report | backend AGENTS_SYSTEM + AGENTS, frontend AGENTS + AGENTS_SYSTEM, ECC | 5 copies | — | none; drives 46 status / 25 fetch per session |
| Worktree flow "rebase onto latest remote tip, fast-forward push" | 6 files | | memory/feedback "merge, don't rebase" on shared trees; memory "push via worktree + cherry-pick" | none |
| Coding-Agent Principles (8) + five-gate discipline | backend AGENTS_SYSTEM, frontend AGENTS.md, ECC AGENTS_SYSTEM | frontend CLAUDE/AGENTS_SYSTEM summaries, `.cursor/rules/karpathy-guidelines.mdc`, karpathy skill | — | none |
| Skill selection "at most ONE skill" + 2 mandatory skills | backend AGENTS.md + CLAUDE.md, frontend AGENTS/CLAUDE, ECC | | SEABRIDGE_CODING_AGENT_SYSTEM "Default non-trivial work: sea-senior-dev-workflow"; goal-default applies to all non-trivial | none; **sea-* skills are not natively discoverable from product repos** (no `.claude/skills`/`.agents/skills` wrappers there) |
| Subagent policy | AGENTS_SYSTEM "only when user authorized" | same file "delegate simple inspection to cheaper agents"; frontend "planner agent mandatory trigger" | each other | none |
| Model routing | frontend CLAUDE.md + AGENTS_SYSTEM: "`/model opusplan`, Sonnet 4.6 for implementation", OpenCode Nemotron default | | actual harness config (Opus 5.5, gpt-5.6-sol) | harness config already controls this |
| Final report checklist | goal block, AGENTS_SYSTEM §Completion, backend AGENTS §Final Report, Principle 8 | 4 overlapping lists (7–10 items each) + "report model/effort/provider" | "caveman-style compact output by default" | none |
| GLM-5.2 / Z.ai / Unsloth routing | backend AGENTS_SYSTEM, AGENTS, CLAUDE.md | 3 copies | — | ECC helper scripts |
| Loop library / Matt Pocock / critique lenses | backend AGENTS_SYSTEM, AGENTS, CLAUDE.md | 3 copies | — | none |
| Historical anchors (2026-06-08 commits, climate-pptx mid-rewrite) | backend AGENTS_SYSTEM + AGENTS, frontend AGENTS_SYSTEM | | stale | — |

## 5. Contradictions

| A | B | Scope | Resolution adopted |
|---|---|---|---|
| Safety rule: "Never authorize deletion … under any circumstances" | Same block: "Never delete … without explicit written approval" + second-confirmation procedure; backend CLAUDE.md "no approval path exists beyond explicit user confirmation" | all repos | Agents never perform those deletions; they prepare the exact command with scope/impact/rollback and the user runs it (strictest reading, keeps the procedure's intent) |
| Safety rule 2: "Restricted mode by default … read-only" | `/goal` auto-loop; controlled-auto allowances; user's standing authorization for local edits | all repos | The requested task authorizes local reads, edits, tests and diagnostics; an explicit ask-first list covers everything outward-facing or destructive |
| Paid-call approval "from adelmar@seabridge.ai" | Session account `adelmar@seabridgesustainability.com` | all repos | Approval is "Alejandro, in the current session" — identity by session, not by an address that can be wrong |
| Worktree flow "rebase onto latest remote tip" | Hard-won feedback: shared trees → merge, never rebase; land via worktree + cherry-pick | backend/frontend | Replace with: land commits from a worktree on the remote tip (cherry-pick or merge), never rewrite shared history |
| "Spawn subagents only when the user authorized" | "Delegate simple inspection to cheaper agents"; "planner agent mandatory" | all | Delegate when work is independent or would flood context; otherwise work directly; no mandatory agents |
| "At most ONE skill" | Two mandatory skills; "Default non-trivial work: sea-senior-dev-workflow"; goal-default for all | all | Skills are optional, on-demand workflows keyed to task type; no default skill |
| "Caveman-style compact output by default" | 7–10 item mandatory final-report lists; "the phrase 'complete' is prohibited" | frontend | One short report shape: changed / verified / remaining / skipped |
| Frontend: "Codex and Gemini do not support hooks" | Codex hooks are GA (`features.hooks`) | frontend | Deleted |
| Model routing in prose (Sonnet 4.6, opusplan, Nemotron) | Harness configs | frontend | Deleted from prose; config is the single source |
| `program.md` (autoresearch): "NEVER STOP", "do NOT ask", unscoped commit/reset | Safety block stamped at the top of the same file; AGENTS/CLAUDE scope resets to `autoresearch/<tag>` | autoresearch | Scoped override line in program.md |

## 6. Stale scaffolding / stale facts

- "Keep going / do not return early / must not claim completion" restated 4–6 times per repo (goal block, AGENTS_SYSTEM, AGENTS, CLAUDE.md, GOAL_PROTOCOL).
- Mandatory pre-work reading of 6–8 files (up to 25k tokens) for every non-trivial task — OpenAI's GPT-6 guidance explicitly calls this excessive; logs show it is ignored anyway.
- Ritual `git status`/`git fetch` three times per task; "report model, effort tier and provider" in every final report.
- "Trigger handoff around 250k tokens" — arbitrary for 1M-context models; harness auto-compacts.
- Frontend AGENTS_SYSTEM.md (7,300 t) describes a system that does not exist: `~/.claude/CLAUDE.md` with "62 skills", `~/.claude/rules/common/*.md`, "12 agents with mandatory triggers", 7 auto-running hooks (none installed; all `.claude/settings.json` are `{}`), `~/.codex/AGENTS.md` skill list (file is empty).
- Frontend CLAUDE.md: `/model opusplan`, "Sonnet 4.6", "use /compact automatically" (agents cannot run it), "retrieve Agentic-Stack memory before substantial work", "seven repos".
- Historical anchors (2026-06-08 commits, "climate-pptx may be mid-rewrite") in 3 files.
- Stale model ids: `skills/seabridge-esg/SKILL.md:55` `claude-sonnet-4-6`; autoresearch `scripts/skill_optimizer.py:178,347,543` and `co-scientist-orchestrator.ps1:35,115` `claude-sonnet-4-6`; ECC `.opencode/opencode.json` `claude-opus-4-5`/`claude-sonnet-4-5`.
- ECC AGENTS_SYSTEM: Superpowers "installed as user-scope plugin" (not installed); dangling "existing runtime-routing rules" reference.
- `MEMORY.md` (backend): 97 entries, 23.5 KB, entries up to ~1,000 chars; 14+ entries carry facts that exist only in the index line (not in the topic file). Loads in full every session.

## 7. Integrations and upstream state (local refs; nothing pulled)

| Repo | Remote(s) | Local HEAD | Divergence | Dirty | Notes |
|---|---|---|---|---|---|
| everything-claude-code | origin (seabridge fork), affaan-upstream | 842930fb3 (2026-08-14) | origin 0/0; upstream ref (fetched 2026-08-13) 47 ahead / 0 behind | 3 | last upstream merge 10d217f8f 2026-08-13 (1,404 commits); 385 skills, 41 SeaBridge; 23 upstream hooks, none installed |
| autoresearch | origin (managesg), upstream karpathy | 0b9f2bc (2026-07-18) | origin 0/0 | 1 (graphify submodule pointer) | 22 KB AGENTS.md + 17 KB CLAUDE.md, near-duplicates; `program.md` conflict |
| _upstream | seabridge upstream-mirrors | f42b7b6 (2026-07-06) | 0/0 | 0 | 15 nested mirrors, several far behind their fetched refs (openclaw 20k, hermes-agent 19k, CopilotKit 2.5k commits); 8 pinned detached; reference-only |
| manageesg-backend | origin | local `seabridge_development` 87 ahead / 467 behind origin | instruction files identical to origin | 32 (other sessions) | pre-commit: detect-secrets, bandit, backend harness, agent-runtime harness; pip-audit on pre-push |
| manageesg-frontend | origin | `development` 10 ahead / 44 behind | instruction files identical to origin | 19 (other sessions) | |

## 8. Initial recommendations

- **P0** Resolve the safety-block contradictions and the paid-call identity; fix the sync script so it cannot stamp into other sessions' `.claude/worktrees`; make Claude Code actually load the repo rules (`@AGENTS.md`); remove false model-routing and hook claims; scope autoresearch `program.md`.
- **P1** One compact canonical core (safety block + goal block, both still marker-synced); AGENTS.md = core + repo facts + traps; CLAUDE.md = `@AGENTS.md` + Claude-only deltas; AGENTS_SYSTEM.md = short human map (not loaded); lossless MEMORY.md index compaction.
- **P2** Drop ritual git/status/report requirements; one report shape; "fetch before integrating", not before everything; point to canonical test manifests.
- **P3** Instruction-stack checker in CI-able form; on-demand skill pointer table; stale model ids flagged; future-model upgrade checklist.
- **Not repo-managed (recommend only):** disable unused org-synced plugins (largest avoidable startup cost); `effortLevel`/`model_reasoning_effort` defaults; Codex `codex_hooks` → `hooks`.
