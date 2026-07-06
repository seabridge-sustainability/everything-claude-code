# SeaBridgeAI Coding Agent System Ã¢â‚¬â€ Verification & Test Protocol

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


> Last verified: 2026-04-04
> Canonical location: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\CODING_AGENTS.md`
> Referenced from: `manageesg-backend/CLAUDE.md` Ã‚Â· `manageesg-frontend/CLAUDE.md`

This document is the **onboarding and verification protocol** for the SeaBridgeAI multi-agent coding system. Every check below must pass before any new feature work begins. All coding agents Ã¢â‚¬â€ Claude Code, Codex, Gemini CLI, Deep Agents sub-agents, and LangGraph nodes Ã¢â‚¬â€ must treat this as the system baseline, not vanilla AI tooling.

Run these checks at the start of any new session where agent configuration has changed, or before onboarding a new contributor.

---

## System Summary Ã¢â‚¬â€ What Is Actually Installed

| Component | Status | Version / Count |
|---|---|---|
| gstack (garrytan/gstack) | Ã¢Å“â€¦ Installed | 35 skills at `~/.claude/skills/gstack/` |
| deepagents (langchain-ai/deepagents) | Ã¢Å“â€¦ Installed | CLI 0.0.34 Ã‚Â· SDK 0.4.11 |
| ECC Claude Code skills | Ã¢Å“â€¦ Active | 35 gstack skills at `~/.claude/skills/gstack/` + 1 ECC-specific skill |
| ECC Codex/Gemini skills | Ã¢Å“â€¦ Active | 38 skill directories in `ECC/.agents/skills/` |
| Claude Code agents | Ã¢Å“â€¦ Active | 30 agents in `agents/` |
| Hooks | Ã¢Å“â€¦ Active | 10 hooks (7 core + 3 supplementary) |
| Berry MCP | Ã¢Å“â€¦ Registered | in `manageesg-backend/.mcp.json` |
| Boris Cherney settings | Ã¢Å“â€¦ Active | `acceptEdits` + autocompact 50% + ECC plugin root |

---

## Architecture Overview

```
Tier 1 Ã¢â‚¬â€ Shared Intelligence (read-only to application repos)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ everything-claude-code/   Ã¢â€ Â ECC: skills, agents, rules, hooks for Claude Code
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ autoresearch/             Ã¢â€ Â ML research sandbox (separate, self-contained)

Tier 2 Ã¢â‚¬â€ Application Repositories (consume Tier 1, never copy it)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ manageesg-backend/        Ã¢â€ Â FastAPI + LangGraph agents + AI package
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ manageesg-frontend/       Ã¢â€ Â Next.js ESG dashboard

Tier 3 Ã¢â‚¬â€ Integration Adapter (thin bridge only, inside backend)
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ seabridge_ai/src/sustainability_ai/ai_agents/autoresearch/
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ handoff.py            Ã¢â€ Â receives research artifacts from autoresearch sandbox
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ runner.py             Ã¢â€ Â orchestrates autoresearch runs from backend pipeline
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ overnight_audit.py    Ã¢â€ Â production overnight audit using research findings
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ regression_harness.py Ã¢â€ Â regression checks against autoresearch baselines
```

---

## CHECK 1 Ã¢â‚¬â€ Four-Repository Tier Structure

Confirm no files have crossed tier boundaries:

| Verification | Expected | Command |
|---|---|---|
| ECC exists as standalone repo | `everything-claude-code/.git` present | `ls C:/Users/adelm/SeaBridgeAI/everything-claude-code/.git` |
| autoresearch is standalone | `autoresearch/.git` present, not embedded | `ls C:/Users/adelm/SeaBridgeAI/autoresearch/.git` |
| Tier 3 adapter is thin | Only 4 files in `ai_agents/autoresearch/` | `ls seabridge_ai/src/sustainability_ai/ai_agents/autoresearch/*.py` |
| No ECC source in Tier 2 | No `everything-claude-code/` inside backend or frontend | `ls manageesg-backend/everything-claude-code 2>/dev/null` Ã¢â€ â€™ error |
| `train.py` not in adapter | autoresearch's `train.py` not copied to backend | `ls seabridge_ai/.../autoresearch/train.py 2>/dev/null` Ã¢â€ â€™ error |

**Rule:** Tier 2 repos reference Tier 1 via absolute paths in config files. They never embed or copy Tier 1 source code.

---

## CHECK 2 Ã¢â‚¬â€ Auto-Loading Files (Session Intelligence)

These files must exist and load automatically at session start Ã¢â‚¬â€ no manual prompt needed.

### Claude Code

| File | Purpose | Must Exist At |
|---|---|---|
| `~/.claude/CLAUDE.md` | Global config Ã¢â‚¬â€ loads for every project, every session | `C:/Users/adelm/.claude/CLAUDE.md` |
| `~/.claude/rules/common/*.md` | Always-injected rules: agents, code-review, security, git-workflow, coding-style, testing, hooks, performance, patterns | `C:/Users/adelm/.claude/rules/common/` |
| `project/CLAUDE.md` | Project-level: SeaBridgeAI stack, AI docs refs, gstack section | Both backend and frontend roots |
| `project/.claude/rules/berry.md` | Berry state machine Ã¢â‚¬â€ injected every session | `manageesg-backend/.claude/rules/berry.md` |
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
| `project/AGENTS.md` | Same file as Codex Ã¢â‚¬â€ tool-agnostic | Both backend and frontend roots |
| `project/.gemini/settings.json` | Berry registered as MCP server | backend root |

---

## CHECK 3 Ã¢â‚¬â€ Skills Libraries

Two skill registries Ã¢â‚¬â€ both active.

### Claude Code Global Skills (`~/.claude/skills/`) Ã¢â‚¬â€ 35 gstack + 1 ECC-specific

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

### Codex / Gemini Skills (`ECC/.agents/skills/`) Ã¢â‚¬â€ 38 total

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

## CHECK 4 Ã¢â‚¬â€ gstack Skills (garrytan/gstack) Ã¢Å“â€¦

**Install location (global):** `~/.claude/skills/gstack/` Ã¢â‚¬â€ 35 skills with SKILL.md on disk
**ECC reference copy:** `ECC/.claude/skills/gstack/` Ã¢â‚¬â€ no .git, version-tracked in ECC
**Individual skill links:** `~/.claude/skills/<name>/SKILL.md` Ã¢â‚¬â€ all 35 accessible

**Sprint order (enforce, do not skip steps):**
```
Think        Ã¢â€ â€™ /office-hours     (forcing questions, design doc)
Plan         Ã¢â€ â€™ /autoplan         (or /plan-ceo-review + /plan-eng-review + /plan-design-review)
Build        Ã¢â€ â€™ implementation    (planner + tdd-guide + code-reviewer agents)
Review       Ã¢â€ â€™ /review           (pre-PR: SQL injection, secrets, logic, architecture)
Test         Ã¢â€ â€™ /qa               (browser QA against running endpoint)
Ship         Ã¢â€ â€™ /ship             (tests Ã¢â€ â€™ review Ã¢â€ â€™ version bump Ã¢â€ â€™ PR)
Reflect      Ã¢â€ â€™ /retro            (git history retrospective)
```

**If skills need rebuilding:**
```bash
cd ~/.claude/skills/gstack && ./setup
```

**Browser skills** (`/browse`, `/qa`, `/benchmark`, `/canary`, `/devex-review`) require Bun v1.0+ for the browse daemon. Non-browser skills (29 of 35) work fully without Bun.

---

## CHECK 5 Ã¢â‚¬â€ Boris Cherney's Recommended Claude Code Features Ã¢Å“â€¦

All verified active in `~/.claude/settings.json`:

| Feature | Setting | Current Value |
|---|---|---|
| Permission mode | `permissions.defaultMode` | `"acceptEdits"` Ã¢Å“â€¦ |
| Auto-compact threshold | `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | `"50"` (compact at 50% context) Ã¢Å“â€¦ |
| Hook profile | `ECC_HOOK_PROFILE` | `"standard"` Ã¢Å“â€¦ |
| Plugin root | `CLAUDE_PLUGIN_ROOT` | `ECC` directory Ã¢Å“â€¦ |

These settings are in `~/.claude/settings.json` and apply globally to all Claude Code sessions.

---

## CHECK 6 Ã¢â‚¬â€ Deep Agents Coding Harness (langchain-ai/deepagents) Ã¢Å“â€¦

**Installed:** deepagents-cli 0.0.34 Ã‚Â· deepagents SDK 0.4.11
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
deepagents --version        # Ã¢â€ â€™ deepagents-cli 0.0.34
deepagents-cli --version    # Ã¢â€ â€™ 0.0.34
```

---

## CHECK 7 Ã¢â‚¬â€ Berry Hallucination Detection Ã¢Å“â€¦

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
1. `berry_change("<task description>")` Ã¢â‚¬â€ submit the plan
2. Berry gathers evidence from git spans (actual file content)
3. Every plan step must cite evidence from the actual codebase
4. State must reach `done` before implementation begins

No plan proceeds to implementation if any step lacks file evidence.

---

## CHECK 8 Ã¢â‚¬â€ Automatic Hooks (Claude Code Only) Ã¢Å“â€¦

10 hooks active in `~/.claude/settings.json`. All run without any manual prompt.

### Core Hooks (7) Ã¢â‚¬â€ defined in ECC/scripts/hooks/

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

## CHECK 9 Ã¢â‚¬â€ Mandatory MD File Reference on Every Agent Call

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
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ state.py           Ã¢â€ Â LangGraph state schema
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ workflow.py        Ã¢â€ Â LangGraph graph definition
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ prompts/           Ã¢â€ Â prompt templates
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ cecil_client.py    Ã¢â€ Â external data client
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ streamlit_nature_risk.py
```

**No agent may assume folder structure, import paths, or dependency patterns without reading `AI_agents.md` first.**

---

## CHECK 10 Ã¢â‚¬â€ File Distribution Audit

Zero cross-contamination between tiers.

| Rule | Verify With |
|---|---|
| gstack lives at `~/.claude/skills/gstack/` and `ECC/.claude/skills/gstack/` only | `ls manageesg-backend/.claude/skills/ 2>/dev/null` Ã¢â€ â€™ empty |
| Global rules at `~/.claude/rules/common/` only | `ls manageesg-backend/.claude/rules/` Ã¢â€ â€™ only `berry.md` |
| No autoresearch source in adapter | `ls seabridge_ai/.../ai_agents/autoresearch/` Ã¢â€ â€™ only 4 .py files + `__init__.py` |
| No frontend assets in backend | `ls manageesg-backend/src/ 2>/dev/null` Ã¢â€ â€™ error |
| No backend AI agents in frontend | `ls manageesg-frontend/seabridge_ai/ 2>/dev/null` Ã¢â€ â€™ error |
| No `.env` committed | `git -C manageesg-backend ls-files .env` Ã¢â€ â€™ empty |

---

## WORKFLOW TEST Ã¢â‚¬â€ End-to-End Execution

**Test task:** "Add a new LangGraph agent for nature risk monitoring."
*(Note: `nature_agent/` already exists Ã¢â‚¬â€ use it as the reference. For a real test, substitute `water_stress_agent/`.)*

**Required execution sequence (no manual intervention between steps):**

```
1  Session opens
   Ã¢â€ â€™ CLAUDE.md + rules/common/*.md auto-load
   Ã¢â€ â€™ berry.md injected
   Ã¢â€ â€™ Agent reads seabridge_ai/docs/AI_agents.md BEFORE writing any code

2  /plan invoked
   Ã¢â€ â€™ berry_change("<task>") called
   Ã¢â€ â€™ Berry gathers git spans as evidence
   Ã¢â€ â€™ audit_trace_budget: all steps cite real files
   Ã¢â€ â€™ state=done before implementation

3  planner agent triggered (mandatory: complex feature)
   Ã¢â€ â€™ Phases defined, risks surfaced, user confirms

4  gstack /autoplan runs
   Ã¢â€ â€™ CEO review: is this the right scope?
   Ã¢â€ â€™ Eng review: data flow, test matrix, error paths, diagram

5  Code written (state.py, workflow.py, prompts/, __init__.py)
   Ã¢â€ â€™ Follows nature_agent/ structure exactly
   Ã¢â€ â€™ code-reviewer agent runs after each file

6  security-reviewer agent runs
   Ã¢â€ â€™ Triggered: agent touches external data source (ENCORE/Axion MCP)
   Ã¢â€ â€™ OWASP checks, secrets scan, API key handling verified

7  quality-gate hook fires (PostToolUse | Edit/Write/MultiEdit)
   Ã¢â€ â€™ Runs after every file write
   Ã¢â€ â€™ Blocks on CRITICAL issues, warns on HIGH

8  gstack /review runs (pre-PR)
   Ã¢â€ â€™ SQL/injection checks, secrets scan, logic review

9  gstack /qa runs
   Ã¢â€ â€™ Browser QA against FastAPI endpoint
   Ã¢â€ â€™ Bugs found and fixed

10 commit-quality hook fires before git commit
   Ã¢â€ â€™ Validates conventional commit format
   Ã¢â€ â€™ Blocks malformed messages

11 gstack /ship runs
   Ã¢â€ â€™ Tests verified, PR opened with coverage audit
   Ã¢â€ â€™ session-end + evaluate-session hooks fire
   Ã¢â€ â€™ Learnings logged
```

**Blockers to report:**
- Any step requires manual intervention that should be automatic
- Berry returns `cannot` with no alternative evidence
- A CRITICAL quality-gate block cannot be resolved
- A hook does not fire when its trigger condition is met

---

## Quick Reference Ã¢â‚¬â€ All Paths

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
