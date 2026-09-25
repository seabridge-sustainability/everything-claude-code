# Agent Instruction System — Modernization (2026-09-24)

Baseline, inventory, instruction graph, and upstream state:
`2026-09-24-agent-system-baseline.md`. This file records what changed, why, and
the evidence. Nothing here is committed; see "Repository state".

## 1. What was wrong

1. **Claude Code never received most rules.** Claude loads `CLAUDE.md`, not
   `AGENTS.md` (when both exist). The backend CLAUDE.md told the agent to "load
   AGENTS_SYSTEM.md first, then AGENTS.md"; session logs show that happened in
   **1 of 21** sessions. Everything that lived only in AGENTS.md/AGENTS_SYSTEM.md
   (tenant/provenance rules, traps, worktree flow) was effectively absent for Claude.
2. **The safety block contradicted itself** ("never authorize deletion under any
   circumstances" vs. "never … without explicit written approval" plus an approval
   procedure; "restricted/read-only by default" vs. task-authorized work), and it
   gated paid calls on an e-mail address that differs from the session account.
3. **Prose asked for up to 25k tokens of mandatory pre-reading** per task (6–8
   files) that current vendor guidance calls excessive and agents skipped anyway.
4. **Duplication:** the goal protocol appeared 3–4 times per repo, the Coding-Agent
   Principles 3 times, the git discipline 5 times, four overlapping final-report
   checklists; frontend repeated ~14 KB across its three files.
5. **False or stale statements:** frontend claimed a global `~/.claude/CLAUDE.md`
   with "62 skills", seven auto-running hooks, and "Codex has no hooks"; model
   routing in prose (`opusplan`, "Sonnet 4.6", Nemotron); agents told to run `/compact`.
6. **Ritual work:** `git status` + `git fetch --prune` "before any work, before
   integration, and before the final report" (median 46 status / 25 fetch calls per
   session), "report model, effort and provider" in every report.
7. **Tooling hazards:** `sync-safety-rule.ps1` could stamp into other sessions'
   `.claude/worktrees`, never synced `_upstream`'s own files, and walked 100k+
   directories (`.qa-snapshots`) before filtering, so a check never finished.

## 2. What changed

**Layering (all harnesses):**

| Layer | Where | Loaded |
|---|---|---|
| 1. Safety invariants | ECC `protocols/SAFETY_AUTHORIZATION_RULE.md` → stamped marker block | via each repo's `AGENTS.md` |
| 1. Working standard (done / stuck / report) | block text in ECC `scripts/sync-goal-protocol.ps1` → stamped "Goal Protocol Default" | via `AGENTS.md` |
| 2. Repo facts, commands, traps, workflow table | repo `AGENTS.md` | Codex/OpenCode directly; Claude via `@AGENTS.md` |
| 2b. Claude-only notes | repo `CLAUDE.md` (4 bullets) | Claude |
| 3. Specialized workflows | ECC `skills/<name>/SKILL.md` | on demand, from the table |
| 4. Task | the prompt | — |
| 5. State | short handoff + git history; auto-memory index of pointers | on resume / index only |

**Safety block (revised, not relaxed):** deletion of repos/source/databases/
volumes/indexes/cloud storage is never performed by an agent (it prepares the
command; Alejandro runs it) — the strictest reading of the old text. One explicit
**ask-first** list: commit/push/merge/branch/PR, installs, migrations or shared/
prod data writes, paid/live-provider calls and billing, deploys/cloud changes,
secrets/auth/global agent config. Git rules (no force-push, no `reset --hard`/
`clean` on shared work, no `--no-verify`, never `main`), secrets, shared-checkout
rule, and "everything else inside the task needs no further approval".
Approval is by Alejandro in the current session. Propagated to 1,427 files.

**Goal block (revised):** four bullets — scope from evidence (no invented
functionality or data; memory and handoffs are leads to verify), what done means
(including "don't re-run checks nothing has changed since"), what to do when stuck
(change strategy after two failures; continue independent work; stop only at an
approval boundary or external dependency), and the report shape.

**Resolved conflicts** (see baseline §5): rebase → land via worktree +
cherry-pick, merge never rebase shared history; subagents → delegate when work is
independent or would flood context; "one skill" + mandatory skills + default skill
→ on-demand table, no default; caveman vs. mega-reports → one short report shape;
autoresearch "NEVER STOP / do NOT ask" → scoped to a user-started session on its
own `autoresearch/<tag>` branch (commits/resets only there; never push/merge/install/paid).

**Kept because they matter** (moved into AGENTS.md so both harnesses see them):
provenance and "missing is not zero" for AI/ESG outputs; tenant-aware thin routes;
Pydantic response_model drops keys; loguru `{}`; `.env` only in main checkout and
worktree import leakage; diverged local branch → worktree + cherry-pick +
`git commit -- <paths>` + `git show --stat HEAD`; hook-restored files; heredoc
backslash mangling; interactive push + `ls-remote`; mutation-style proof that a
safety gate is tested; Mongo test URI (throwaway loopback, one run at a time);
canonical test manifests; frontend `.bin` workaround and no `npm ci`, no junctioned
`node_modules`, disabled git hooks, Playwright reverse route order,
`useSearchParams` outside router, design tokens.

**Deleted** (not moved): historical anchors (2026-06-08 commits, "climate-pptx may
be mid-rewrite"), loop-library / Matt Pocock / critique-lens essays, GLM routing
JSON example (routing rules stay in the `provider-fallback-review` skill), the
frontend explainer/marketing sections, domain tables derivable from code,
per-skill tables that duplicated ECC, model/effort routing prose.

## 3. Files changed

- **manageesg-backend:** `AGENTS.md` (rewritten), `CLAUDE.md` (import + 4 bullets),
  `AGENTS_SYSTEM.md` (short source-of-truth map), `opencode.jsonc`,
  `.opencode/opencode.json` (instructions → `AGENTS.md` only), plus 37 docs, READMEs,
  and agent-config files whose safety marker block was re-stamped.
- **manageesg-frontend:** same trio + both OpenCode configs + 10 re-stamped files.
- **autoresearch:** `AGENTS.md`/`CLAUDE.md` merged (import pattern), `program.md`
  scope note + corrected `experiments/train.py` path, re-stamped files.
- **openseabri, climada-stack, _upstream:** goal + safety blocks re-stamped in
  `AGENTS.md`/`CLAUDE.md` (and openseabri `AGENTS_SYSTEM.md`).
- **everything-claude-code:** `protocols/SAFETY_AUTHORIZATION_RULE.md`;
  `scripts/sync-safety-rule.ps1` (pruned walk, worktree/run-checkout/snapshot
  exclusions, `_upstream` shallow scan); `scripts/sync-goal-protocol.ps1` (compact
  block, skips importing CLAUDE.md); `scripts/check-goal-protocol.ps1` (accepts
  `@AGENTS.md` import); `AGENTS_SYSTEM.md` (status header);
  `SEABRIDGE_CODING_AGENT_SYSTEM.md` (skill triggers are on-demand, no default);
  **new:** `scripts/check-instruction-stack.js`, `scripts/eval-instruction-scenarios.js`,
  `scripts/measure-instruction-stack.py`, `scripts/instruction-stacks*.json`,
  `tests/ci/instruction-stack.test.js`, `evals/agent-instructions/`, these two
  reports; ~1,360 skill/agent/command/doc files re-stamped with the new safety block.
- **Claude auto-memory (backend project):** `MEMORY.md` compacted 23.5 KB → 13.6 KB
  losslessly (51 long hooks moved into their topic files); stale "global
  CLAUDE.md" memory corrected; one new memory for this work.

## 4. Before / after (o200k_base tokens; Claude's tokenizer counts somewhat higher)

| Stack | Auto-loaded before | after | Incl. prose-mandated reads before | after |
|---|---:|---:|---:|---:|
| Claude Code — backend | 8,720 | **6,203** (−29%) | 34,341 | **6,203** (−82%) |
| Codex — backend | 4,353 | **1,850** (−57%) | 25,621 | **1,850** (−93%) |
| Claude Code — frontend | 4,728 | **2,860** (−40%) | 21,660 | **2,860** (−87%) |
| Codex — frontend | 4,558 | **1,729** (−62%) | 20,404 | **1,729** (−92%) |
| Claude Code — autoresearch | 4,744 | **2,640** (−44%) | — | — |
| Codex — autoresearch | 5,123 | **1,606** (−69%) | — | — |
| Claude / Codex — ECC | 3,141 / 3,730 | 2,954 / 3,543 | — | — |
| Claude / Codex — _upstream | 2,125 / 3,387 | 2,005 / 3,267 | — | — |
| **All ten stacks** | **44,609** | **28,657 (−36%)** | **124,276** | **28,657 (−77%)** |

The Claude backend number shrank least because it now *includes* AGENTS.md,
which it previously did not load at all; the largest remaining item there is the
auto-memory index (4.1k).

**Scenario coverage** (`node scripts/eval-instruction-scenarios.js`, 10 SeaBridge
tasks, concept-level patterns, effective stacks only): **24/52 before (`--ref HEAD`)
→ 52/52 after.** Before, backend Claude and Codex lacked the Mongo test trap, the
shared-checkout rule, the handoff-verification rule and the paid-blocker rule, and
every stack carried scaffolding that pushes a plan-only request toward
implementation. Caveat: the same author wrote the scenarios and the new text;
this proves delivery of guidance, not better model behaviour.

## 5. Verification

- `node scripts/check-instruction-stack.js` — PASS for all 6 effective stacks
  (it found 3 real broken references in the first draft, since fixed).
- `node tests/ci/instruction-stack.test.js` — 6/6, including tests that each
  failure class fires (budget, 32 KiB cap, stale phrase, broken path/import, duplication).
- ECC validators: `check-goal-protocol` (22 files), `check-coding-agent-system`,
  `check-agent-runtime-guardrails`, `check-canonical-skills`,
  `check-cross-agent-skills` — all PASS; `sync-safety-rule.ps1 -Check` — PASS
  (541 s; previously did not finish). MCP-security high-risk patterns — 0 hits in
  changed instruction files (the full script still walks every file; see §7).
- `git diff --check` clean for all changed instruction files.
- ECC `node tests/run-all.js`: 3,700 passed / 73 failed in 21 files; the new
  `instruction-stack` test passes inside the suite. The failures are unrelated to
  this change (none of their files are in the diff): bundled `frontend-design`,
  `agent-memory` frontmatter, Windows symlink `EPERM`, TypeScript missing for the
  OpenCode build, install/packaging tests.
- `check-harness.ps1` was stopped after 40+ minutes without output (it runs the
  code-level backend/frontend guardrail scans over whole trees); its instruction
  component, `check-agent-runtime-guardrails.ps1`, passed on its own. Not verified.
- **Fresh-session probes** (real new processes; Claude Haiku, one turn, no tools;
  Codex `exec`, read-only, low effort): backend Claude, frontend Claude, backend
  Codex all answered SYSTEM_ID, work/live branch, approver, deletion handling and
  stuck rule correctly from the new text, listed exactly the new sections, and
  reported no "load AGENTS_SYSTEM.md first" line.
- **Finding:** a subagent spawned from an already-running session received the
  *old* CLAUDE.md (session snapshot), so subagents are not valid fresh-session
  probes; recorded in `evals/agent-instructions/README.md`.

## 6. Harness- and model-specific deltas kept

- Claude: `@AGENTS.md` import; `/goal` is a UI command (never `Skill(goal)`);
  Explore/Plan subagents don't load CLAUDE.md, so they must stay read-only;
  backend commit hook requires three safety phrases in CLAUDE.md; frontend
  `/browse` preference; berry rule note.
- Codex: none needed; AGENTS.md is native. Budget stays far below the 32 KiB cap.
- Model-specific (Opus 5.5, GPT-5.6, GPT-6 Astra): **none**. Official guidance for
  all of them converges (lean prompts, MUST only for safety, explicit done/stop
  conditions, no mandated doc stacks). Astra's "may ask for clarification; bias to
  action" is covered by safety rule 6 and the goal block; add a delta only if a
  probe shows a difference.

## 7. Not done / recommended (outside repo-managed scope or needs a decision)

- **Largest remaining startup cost is not repo-controlled:** org-synced claude.ai
  plugins (sales, finance, HR, legal, bio-research, small-business, …) put hundreds
  of skill descriptions into every session (~77k-token first prompt). Disable the
  ones not used for engineering in claude.ai / `/plugin`.
- `~/.codex/config.toml`: `service_tier = "default"` makes the npm `codex` CLI fail
  to start ("unknown variant `default`, expected `fast` or `flex`"); the app's
  bundled CLI accepts it. Remove the line or pick a tier. Consider `gpt-6-sol`/
  `gpt-6-astra` when they appear in the local model cache (not there yet), and
  `model_reasoning_effort` medium as the default (OpenAI's starting point) with high
  per task. Repo configs use the deprecated `codex_hooks` alias; rename to
  `features.hooks` only after confirming the installed client accepts it.
- Claude `effortLevel: high` globally: consider leaving the harness default and
  raising per task.
- Frontend tracked `.claude/settings.local.json` has a wildcard Bash allow rule
  that Claude Code warns can approve inserted options; tighten it.
- `check-mcp-security.ps1` and `check-harness.ps1` still enumerate whole trees
  (tens of minutes); apply the same pruned walk.
- Stale model ids in code, not changed without verification: ECC
  `skills/seabridge-esg/SKILL.md:55`, autoresearch `scripts/skill_optimizer.py`
  (178, 347, 543) and `co-scientist-orchestrator.ps1` (35, 115) use
  `claude-sonnet-4-6`; ECC `.opencode/opencode.json` uses `claude-opus-4-5`/
  `claude-sonnet-4-5`. Changing a default model changes cost and behaviour — decide first.
- ECC's own `AGENTS.md`/`CLAUDE.md` are upstream-derived and still near-duplicates;
  apply the import pattern at the next upstream sync. ECC is 47 commits ahead of
  its last fetched upstream ref (2026-08-13); no upstream changes were adopted in
  this pass (review with a fresh fetch, selectively).
- `_upstream` mirrors are thousands of commits behind their fetched refs;
  reference-only, left untouched.
- Other harness files not rewritten: `.github/copilot-instructions.md`,
  `.windsurfrules`, `.openhands/microagents/*`, `.cursor/rules/*` (safety block
  re-stamped where present).
- Behavioural replay (old vs new stack on historical tasks) not run: needs model
  spend approval.

## 8. Future model-upgrade procedure

See `evals/agent-instructions/README.md` → "Future model upgrade checklist":
read vendor migration guidance → re-verify loading semantics → run the static
checks and scenario eval → fresh-session probes on the new model → delete lines
the model no longer needs → keep model/effort in harness config only → add a
model delta only when a probe or replay proves a difference.

## Repository state

Uncommitted in: manageesg-backend, manageesg-frontend, autoresearch, openseabri,
climada-stack, _upstream, everything-claude-code (branches unchanged). Backend
and frontend working trees also hold other sessions' uncommitted work; commit
only the paths listed in §3 (`git commit -- <paths>`), from a worktree on the
remote tip for the diverged backend branch.

## Follow-up 2026-09-24 (landing, upstream sync, open items)

**Landed (committed; pushed as listed in the session's final report).**

| Repo | Commits |
|---|---|
| everything-claude-code | `83761226e` modernization, `ef7ee6109` U+FEFF fix, `40178f60f` upstream merge (407 commits, `c9de8f5b2..e482e5794`) + Superpowers v6.4.1 (`b670180`), `cb82b5684` phase 3, `1d693d87d` skipped-item resolution + model ids + Windows test fixes, `388309de3` join with main |
| manageesg-backend | `32078e720`, `d7fa12943`, `d5740481e` (worktree C:/wtagent, rebased onto origin) |
| manageesg-frontend | `4e3312c7`, `58e95801` |
| autoresearch | `8715507`, `8096521`, `b78b2cd` |
| openseabri | `96e84cd`, `824aed1`, `c2bcd39` |
| climada-stack | `892f3e6`, `8cc3d44` |
| _upstream | `a554050`, `bf0ca83`, `0ff3dad` (six reference mirrors bumped; four hidden gitlink drifts recorded) |

**Upstream merge decisions.** Upstream's `ecc:` agent prefixes and Codex hook wording
adopted with SeaBridge policy kept; `.opencode/opencode.json` now follows upstream
(default agent `build`, no pinned models anywhere, NVIDIA NIM kept as a selectable
provider) — this removed the stale `claude-opus-4-5`/`claude-sonnet-4-5` pins rather
than renaming them, because `opencode-config.test.js` forbids agent model pins;
`orchestrate-codex-worker.sh` takes upstream's `--ask-for-approval` fix (the kept
side still ran `codex exec -p yolo`) with `gpt-5.6-sol`.

**Models.** Claude tooling paths on `claude-sonnet-5` (autoresearch skill optimizer
with text-block extraction, Strix default, ECC integration scanner, openseabri
improver/research loop with thinking disabled for small budgets); three smoke calls
returned text. Backend product defaults stay on `claude-sonnet-4-6` (supported to
≥ Feb 2027) pending a staged migration (centralise → thinking-safe parsing → env
switch in dev); only the retiring `claude-sonnet-4-5` fallback was moved. Codex
stays on `gpt-5.6-sol` (no GPT-6 model in the local cache yet).

**Verification.** Instruction stacks 14/14 PASS; scenario eval 52/52; checker tests
8/8; ECC ps1 validators, safety `-Check`, upstream-reference guardrails PASS.
ECC suite: pre-merge worktree 56 failures / 20 files → merged 112 / 31 → after
fixes 51 / 16 (4 files still failing that passed pre-merge, all classified:
upstream's own plan-canvas and control-pane code on Windows, npm packing, and a
NODE_PATH artefact). Validators: check-harness 166 s (previously never finished),
check-mcp-security 20 s (455 s with -FullScan), frontend guardrails 6 s (84 s
original), backend guardrails 159 s. Fresh-session probes (Claude Haiku, Codex
0.150) correct in every changed repo.

**Open items.** See `2026-09-24-recommendations.md` (plugins: 13 disabled via
`claude plugin disable <name>@synced` on 2026-09-24; effort defaults; npm codex CLI;
mirror pins) and `../harness/2026-09-24-triage.md` (746 unbaselined findings,
top 10 to fix). The ECC main checkout still has another session's dirty
`tests/ci/supply-chain-watch-workflow.test.js`; until it is resolved the checkout
stays on the pre-merge commit and `vendor/superpowers` there stays at v5.1.0.

### Follow-up 2 (2026-09-24, evening): remaining gaps closed and pushed

- **Pushed:** ECC main `67b82119f` (upstream merge, fixes, harness allowlist fix, strix description); backend `seabridge_development` `7044bdfe9` (subprocess timeouts, MCP read-route rate limiter, caveman default off the retiring 4-5, current Claude models priced and listed) on top of `eb3279614` (single Claude default + thinking-safe text extraction); frontend `development` `6ffed1c5` (proxy timeout + client-abort propagation, JWKS timeout, icon-button names); autoresearch, openseabri, climada-stack, _upstream as before.
- **ECC main checkout** fast-forwarded; the other session's `.gitmodules` + submodule test committed as its own commit (it passed and matched the 12 gitlinks); `vendor/superpowers` now at `b670180` (v6.4.1 + hook disabled). Worktree C:/wtecc removed.
- **Harness triage:** 8 of the top 10 fixed (the MapBox third-party geocoder and supplier-editable buyer fields need product decisions); allowlist regexes corrected; `docs\reports` excluded from the backend scan.
- **Plugins:** 13 org-synced plugins disabled for this user (`claude plugin disable <name>@synced`).
- **_upstream:** `ignore=dirty` removed for the four mirrors whose drift was recorded, so future drift shows in `git status`.
- **Still open:** stage 3 of the backend model migration (set `LLM_CLAUDE_MODEL=claude-sonnet-5` in the dev task definition, then smoke the flows listed in the backend migration notes); PageIndex re-evaluation against the bumped mirror (breaking import changes); GRESB `analyze_document` LLM call has no explicit timeout; backend guardrails `-FullScan` comparison did not finish (equivalence is proven on the frontend and MCP scanners).
