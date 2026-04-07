# SeaBridgeAI Coding Agent System — Verification & Test Protocol

> Last verified: 2026-04-04
> Canonical location: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\CODING_AGENTS.md`
> Referenced from: `manageesg-backend/CLAUDE.md` · `manageesg-frontend/CLAUDE.md`

This document is the **onboarding and verification protocol** for the SeaBridgeAI multi-agent coding system. Every check below must pass before any new feature work begins. All coding agents — Claude Code, Codex, Gemini CLI, Deep Agents sub-agents, and LangGraph nodes — must treat this as the system baseline, not vanilla AI tooling.

Run these checks at the start of any new session where agent configuration has changed, or before onboarding a new contributor.

---

## System Summary — What Is Actually Installed

| Component | Status | Version / Count |
|---|---|---|
| gstack (garrytan/gstack) | ✅ Installed | 35 skills at `~/.claude/skills/gstack/` |
| deepagents (langchain-ai/deepagents) | ✅ Installed | CLI 0.0.34 · SDK 0.4.11 |
| ECC Claude Code skills | ✅ Active | 35 gstack skills at `~/.claude/skills/gstack/` + 1 ECC-specific skill |
| ECC Codex/Gemini skills | ✅ Active | 38 skill directories in `ECC/.agents/skills/` |
| Claude Code agents | ✅ Active | 30 agents in `agents/` |
| Hooks | ✅ Active | 10 hooks (7 core + 3 supplementary) |
| Berry MCP | ✅ Registered | in `manageesg-backend/.mcp.json` |
| Boris Cherney settings | ✅ Active | `acceptEdits` + autocompact 50% + ECC plugin root |

---

## Architecture Overview

```
Tier 1 — Shared Intelligence (read-only to application repos)
├── everything-claude-code/   ← ECC: skills, agents, rules, hooks for Claude Code
└── autoresearch/             ← ML research sandbox (separate, self-contained)

Tier 2 — Application Repositories (consume Tier 1, never copy it)
├── manageesg-backend/        ← FastAPI + LangGraph agents + AI package
└── manageesg-frontend/       ← Next.js ESG dashboard

Tier 3 — Integration Adapter (thin bridge only, inside backend)
└── seabridge_ai/src/sustainability_ai/ai_agents/autoresearch/
    ├── handoff.py            ← receives research artifacts from autoresearch sandbox
    ├── runner.py             ← orchestrates autoresearch runs from backend pipeline
    ├── overnight_audit.py    ← production overnight audit using research findings
    └── regression_harness.py ← regression checks against autoresearch baselines
```

---

## CHECK 1 — Four-Repository Tier Structure

Confirm no files have crossed tier boundaries:

| Verification | Expected | Command |
|---|---|---|
| ECC exists as standalone repo | `everything-claude-code/.git` present | `ls C:/Users/adelm/SeaBridgeAI/everything-claude-code/.git` |
| autoresearch is standalone | `autoresearch/.git` present, not embedded | `ls C:/Users/adelm/SeaBridgeAI/autoresearch/.git` |
| Tier 3 adapter is thin | Only 4 files in `ai_agents/autoresearch/` | `ls seabridge_ai/src/sustainability_ai/ai_agents/autoresearch/*.py` |
| No ECC source in Tier 2 | No `everything-claude-code/` inside backend or frontend | `ls manageesg-backend/everything-claude-code 2>/dev/null` → error |
| `train.py` not in adapter | autoresearch's `train.py` not copied to backend | `ls seabridge_ai/.../autoresearch/train.py 2>/dev/null` → error |

**Rule:** Tier 2 repos reference Tier 1 via absolute paths in config files. They never embed or copy Tier 1 source code.

---

## CHECK 2 — Auto-Loading Files (Session Intelligence)

These files must exist and load automatically at session start — no manual prompt needed.

### Claude Code

| File | Purpose | Must Exist At |
|---|---|---|
| `~/.claude/CLAUDE.md` | Global config — loads for every project, every session | `C:/Users/adelm/.claude/CLAUDE.md` |
| `~/.claude/rules/common/*.md` | Always-injected rules: agents, code-review, security, git-workflow, coding-style, testing, hooks, performance, patterns | `C:/Users/adelm/.claude/rules/common/` |
| `project/CLAUDE.md` | Project-level: SeaBridgeAI stack, AI docs refs, gstack section | Both backend and frontend roots |
| `project/.claude/rules/berry.md` | Berry state machine — injected every session | `manageesg-backend/.claude/rules/berry.md` |
| `project/.claude/skills/berry-plan-verification.md` | Berry `/plan` workflow skill | `manageesg-backend/.claude/skills/` |

### Codex

| File | Purpose | Must Exist At |
|---|---|---|
| `~/.codex/AGENTS.md` | Global config for every Codex project | `C:/Users/adelm/.codex/AGENTS.md` |
| `project/AGENTS.md` | AI docs refs, gstack SKILL.md paths, skill table | Both backend and frontend roots |
| `project/.codex/config.toml` | Berry registered as MCP server | backend root |

### Gemini CLI

| File | Purpose | Must Exist At |
|---|---|---|
| `project/AGENTS.md` | Same file as Codex — tool-agnostic | Both backend and frontend roots |
| `project/.gemini/settings.json` | Berry registered as MCP server | backend root |

---

## CHECK 3 — Skills Libraries

Two skill registries — both active.

### Claude Code Global Skills (`~/.claude/skills/`) — 35 gstack + 1 ECC-specific

**35 gstack skills** (individually discoverable as `~/.claude/skills/<name>/SKILL.md`):
```
autoplan          benchmark         browse            canary
careful           checkpoint        codex             connect-chrome
cso               design-consultation  design-html    design-review
design-shotgun    devex-review      document-release  freeze
gstack-upgrade    guard             health            investigate
land-and-deploy   learn             office-hours      plan-ceo-review
plan-design-review  plan-devex-review  plan-eng-review  qa
qa-only           retro             review            setup-browser-cookies
setup-deploy      ship              unfreeze
```

**1 ECC-specific skill** (available as `~/.claude/skills/everything-claude-code/SKILL.md`):
```
everything-claude-code
```

### Codex / Gemini Skills (`ECC/.agents/skills/`) — 38 total

```
api-design         article-writing    backend-patterns   batch-workflow
btw                bun-runtime        claude-api         cli-flags
coding-standards   deepagents         deep-research      dmux-workflows
documentation-lookup  e2e-testing     eval-harness       everything-claude-code
exa-search         fal-ai-media       frontend-patterns  frontend-slides
mcp-server-patterns  nextjs-turbopack  security-review   session-forking
session-mobility   strategic-compact  tdd-workflow       verification-loop
(+ content-engine, crosspost, investor-materials, investor-outreach,
   market-research, video-editing, x-api)
```

**Skills are read-before-implement, not read-after-fail.** Any agent that starts implementing a pattern matching a skill without first reading the SKILL.md is non-compliant.

---

## CHECK 4 — gstack Skills (garrytan/gstack) ✅

**Install location (global):** `~/.claude/skills/gstack/` — 35 skills with SKILL.md on disk
**ECC reference copy:** `ECC/.claude/skills/gstack/` — no .git, version-tracked in ECC
**Individual skill links:** `~/.claude/skills/<name>/SKILL.md` — all 35 accessible

**Sprint order (enforce, do not skip steps):**
```
Think        → /office-hours     (forcing questions, design doc)
Plan         → /autoplan         (or /plan-ceo-review + /plan-eng-review + /plan-design-review)
Build        → implementation    (planner + tdd-guide + code-reviewer agents)
Review       → /review           (pre-PR: SQL injection, secrets, logic, architecture)
Test         → /qa               (browser QA against running endpoint)
Ship         → /ship             (tests → review → version bump → PR)
Reflect      → /retro            (git history retrospective)
```

**If skills need rebuilding:**
```bash
cd ~/.claude/skills/gstack && ./setup
```

**Browser skills** (`/browse`, `/qa`, `/benchmark`, `/canary`, `/devex-review`) require Bun v1.0+ for the browse daemon. Non-browser skills (29 of 35) work fully without Bun.

---

## CHECK 5 — Boris Cherney's Recommended Claude Code Features ✅

All verified active in `~/.claude/settings.json`:

| Feature | Setting | Current Value |
|---|---|---|
| Permission mode | `permissions.defaultMode` | `"acceptEdits"` ✅ |
| Auto-compact threshold | `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | `"50"` (compact at 50% context) ✅ |
| Hook profile | `ECC_HOOK_PROFILE` | `"standard"` ✅ |
| Plugin root | `CLAUDE_PLUGIN_ROOT` | `ECC` directory ✅ |

These settings are in `~/.claude/settings.json` and apply globally to all Claude Code sessions.

---

## CHECK 6 — Deep Agents Coding Harness (langchain-ai/deepagents) ✅

**Installed:** deepagents-cli 0.0.34 · deepagents SDK 0.4.11
**SKILL.md (Claude Code):** `~/.claude/skills/deepagents/SKILL.md`
**SKILL.md (Codex/Gemini):** `ECC/.agents/skills/deepagents/SKILL.md`

deepagents is a LangGraph-based coding agent CLI. Use it for parallel workstreams alongside Claude Code, or for spawning sub-agents inside your own LangGraph nodes via the Python SDK.

**Use cases:**
- Run a second agent on backend while Claude Code handles frontend
- Spawn sandboxed sub-agents from inside LangGraph agent nodes
- Test a task with a different LLM (GPT-4o, Gemini) in parallel

**Retrieval priority (all Deep Agent sub-agents must follow):**
1. Local project files (`CLAUDE.md`, `seabridge_ai/docs/`, component docs)
2. ECC governing instructions (`ECC/CLAUDE.md`)
3. ECC skills (`~/.claude/skills/<name>/SKILL.md`)
4. ECC Context Hub (`chub search ecc` / `chub get ecc/<topic>`)
5. Context7 (third-party libraries, frameworks, SDKs only)
6. Web search (last resort)

**Verify:**
```bash
deepagents --version        # → deepagents-cli 0.0.34
deepagents-cli --version    # → 0.0.34
```

---

## CHECK 7 — Berry Hallucination Detection ✅

Berry MCP is registered in `manageesg-backend/.mcp.json` (along with context7, sequential-thinking, voicemode).

**Binary:** `C:/Users/adelm/AppData/Roaming/Python/Python314/Scripts/berry.exe`
**Source:** `C:/Users/adelm/SeaBridgeAI/hallbayes/`

**State machine (all agents must enforce):**

| State | Action |
|---|---|
| `need_grant` | Show user what Berry is requesting (from `grant_scopes` + `grant_summary`). Ask "Approve? (yes/no)". Call `berry_approve(run_id, grant_token)` only if yes. Retry with same `run_id`. |
| `ask_user` | Ask the user the returned `questions` verbatim. Do NOT answer them yourself. Retry with same `run_id`, passing answers in `user_context`. |
| `done` | Proceed with the verified answer or plan. |
| `cannot` | Switch approach or surface the missing artifact to the user. |

**Mandatory Berry flow before any `/plan`:**
1. `berry_change("<task description>")` — submit the plan
2. Berry gathers evidence from git spans (actual file content)
3. Every plan step must cite evidence from the actual codebase
4. State must reach `done` before implementation begins

No plan proceeds to implementation if any step lacks file evidence.

---

## CHECK 8 — Automatic Hooks (Claude Code Only) ✅

10 hooks active in `~/.claude/settings.json`. All run without any manual prompt.

### Core Hooks (7) — defined in ECC/scripts/hooks/

| Hook script | Lifecycle | Trigger | Purpose |
|---|---|---|---|
| `pre-bash-git-push-reminder.js` | PreToolUse | Bash | Remind to review diff and check branch before git push |
| `pre-bash-commit-quality.js` | PreToolUse | Bash | Validate conventional commit format, flag staged issues |
| `suggest-compact.js` | PreToolUse | Edit\|Write | Suggest `/compact` as context fills |
| `config-protection.js` | PreToolUse | Write\|Edit\|MultiEdit | Warn before editing `.env`, secrets, or CI config files |
| `pre-compact.js` | PreCompact | * | Runs before context compaction |
| `quality-gate.js` | PostToolUse | Edit\|Write\|MultiEdit | Check for hardcoded secrets, anti-patterns after every file write (async, 30s timeout) |
| `session-end.js` | Stop | * | Run final evaluation, log session learnings |

### Supplementary Hooks (3)

| Hook script | Lifecycle | Trigger | Purpose |
|---|---|---|---|
| `post-bash-pr-created.js` | PostToolUse | Bash | Fire post-actions when a PR is created |
| `evaluate-session.js` | Stop | * | Quality assessment of all work done |
| `desktop-notify.js` | Stop | * | Desktop notification on session end |

**Hook runner:** All hooks use `run-with-flags.js` and respect `ECC_HOOK_PROFILE` (currently `"standard"`).

---

## CHECK 9 — Mandatory MD File Reference on Every Agent Call

Every agent invocation must read these files before taking any action in the backend repo:

| File | Purpose |
|---|---|
| `manageesg-backend/CLAUDE.md` | Coding standards, absolute rules, SeaBridgeAI agent patterns |
| `manageesg-backend/seabridge_ai/docs/README.md` | Full backend + AI architecture overview |
| `manageesg-backend/seabridge_ai/docs/AI_agents.md` | Exact folder layout, import conventions, dependency rules, full agent creation checklist |
| `manageesg-backend/seabridge_ai/docs/AI_manager.md` | When extending the AI Manager with new tools |
| `manageesg-backend/seabridge_ai/docs/AI_mcp.md` | When adding or modifying MCP servers |

**Reference agent structure** (use `nature_agent/` as the canonical pattern):
```
seabridge_ai/src/sustainability_ai/ai_agents/nature_agent/
├── __init__.py
├── state.py           ← LangGraph state schema
├── workflow.py        ← LangGraph graph definition
├── prompts/           ← prompt templates
├── cecil_client.py    ← external data client
└── streamlit_nature_risk.py
```

**No agent may assume folder structure, import paths, or dependency patterns without reading `AI_agents.md` first.**

---

## CHECK 10 — File Distribution Audit

Zero cross-contamination between tiers.

| Rule | Verify With |
|---|---|
| gstack lives at `~/.claude/skills/gstack/` and `ECC/.claude/skills/gstack/` only | `ls manageesg-backend/.claude/skills/ 2>/dev/null` → empty |
| Global rules at `~/.claude/rules/common/` only | `ls manageesg-backend/.claude/rules/` → only `berry.md` |
| No autoresearch source in adapter | `ls seabridge_ai/.../ai_agents/autoresearch/` → only 4 .py files + `__init__.py` |
| No frontend assets in backend | `ls manageesg-backend/src/ 2>/dev/null` → error |
| No backend AI agents in frontend | `ls manageesg-frontend/seabridge_ai/ 2>/dev/null` → error |
| No `.env` committed | `git -C manageesg-backend ls-files .env` → empty |

---

## WORKFLOW TEST — End-to-End Execution

**Test task:** "Add a new LangGraph agent for nature risk monitoring."
*(Note: `nature_agent/` already exists — use it as the reference. For a real test, substitute `water_stress_agent/`.)*

**Required execution sequence (no manual intervention between steps):**

```
1  Session opens
   → CLAUDE.md + rules/common/*.md auto-load
   → berry.md injected
   → Agent reads seabridge_ai/docs/AI_agents.md BEFORE writing any code

2  /plan invoked
   → berry_change("<task>") called
   → Berry gathers git spans as evidence
   → audit_trace_budget: all steps cite real files
   → state=done before implementation

3  planner agent triggered (mandatory: complex feature)
   → Phases defined, risks surfaced, user confirms

4  gstack /autoplan runs
   → CEO review: is this the right scope?
   → Eng review: data flow, test matrix, error paths, diagram

5  Code written (state.py, workflow.py, prompts/, __init__.py)
   → Follows nature_agent/ structure exactly
   → code-reviewer agent runs after each file

6  security-reviewer agent runs
   → Triggered: agent touches external data source (ENCORE/Axion MCP)
   → OWASP checks, secrets scan, API key handling verified

7  quality-gate hook fires (PostToolUse | Edit/Write/MultiEdit)
   → Runs after every file write
   → Blocks on CRITICAL issues, warns on HIGH

8  gstack /review runs (pre-PR)
   → SQL/injection checks, secrets scan, logic review

9  gstack /qa runs
   → Browser QA against FastAPI endpoint
   → Bugs found and fixed

10 commit-quality hook fires before git commit
   → Validates conventional commit format
   → Blocks malformed messages

11 gstack /ship runs
   → Tests verified, PR opened with coverage audit
   → session-end + evaluate-session hooks fire
   → Learnings logged
```

**Blockers to report:**
- Any step requires manual intervention that should be automatic
- Berry returns `cannot` with no alternative evidence
- A CRITICAL quality-gate block cannot be resolved
- A hook does not fire when its trigger condition is met

---

## Quick Reference — All Paths

| Resource | Absolute Path |
|---|---|
| ECC root | `C:\Users\adelm\SeaBridgeAI\everything-claude-code` |
| Backend repo | `C:\Users\adelm\SeaBridgeAI\manageesg-backend` |
| Frontend repo | `C:\Users\adelm\SeaBridgeAI\manageesg-frontend` |
| autoresearch | `C:\Users\adelm\SeaBridgeAI\autoresearch` |
| gstack (global) | `~/.claude/skills/gstack/` |
| gstack (ECC copy) | `ECC/.claude/skills/gstack/` |
| Claude Code skills | `~/.claude/skills/gstack/` (35 gstack) + `~/.claude/skills/everything-claude-code/` (1 ECC-specific) |
| Codex/Gemini skills | `ECC/.agents/skills/` (38 total) |
| Claude Code agents | `ECC/agents/` (30 total) |
| Hook scripts | `ECC/scripts/hooks/` |
| Berry binary | `C:/Users/adelm/AppData/Roaming/Python/Python314/Scripts/berry.exe` |
| AI docs | `manageesg-backend/seabridge_ai/docs/` |
| AI agents | `manageesg-backend/seabridge_ai/src/sustainability_ai/ai_agents/` |
| nature_agent reference | `...ai_agents/nature_agent/` |
| deepagents SKILL.md | `~/.claude/skills/deepagents/SKILL.md` |
| settings.json | `~/.claude/settings.json` |

---

## Links

- ECC governing instructions: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\CLAUDE.md`
- Backend project instructions: `C:\Users\adelm\SeaBridgeAI\manageesg-backend\CLAUDE.md`
- Frontend project instructions: `C:\Users\adelm\SeaBridgeAI\manageesg-frontend\CLAUDE.md`
- Codex global config: `C:\Users\adelm\.codex\AGENTS.md`
- Global Claude Code config: `C:\Users\adelm\.claude\CLAUDE.md`
