# Coding Agent Open Issues Closure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the remaining coding-agent system review issues with a clean default validation path and explicit optional-path handling.

**Architecture:** Keep active workspace validation strict and fast, while treating absent future repos as opt-in informational checks. Preserve all safety gates and avoid broad recursive scans.

**Tech Stack:** PowerShell validation script, Markdown guidance, SeaBridgeAI ECC docs.

---

### Task 1: Make Optional Repo Checks Opt-In

**Files:**
- Modify: `scripts/check-coding-agent-system.ps1`
- Modify: `docs/SKILL_ROUTING_REFERENCE.md`
- Modify: `docs/onboarding/CODING_AGENT_ONBOARDING_GUIDE.md`
- Modify: `docs/CODING_AGENT_SYSTEM_STRATEGY_REVIEW_2026-05-10.md`

- [x] **Step 1: Add `-IncludeOptionalRepos` switch**

Add the switch to the script parameters and wrap optional repo findings behind it.

- [x] **Step 2: Update docs**

Document that default mode validates active repos only and optional mode shows `file-code`, `app-streaming`, and `SeaBridgeAI_upstream` information.

- [x] **Step 3: Verify default mode**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-coding-agent-system.ps1
```

Observed: exit code 0 and `PASS: no findings`.

- [x] **Step 4: Verify optional mode**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-coding-agent-system.ps1 -IncludeOptionalRepos
```

Observed: exit code 0 and three informational `optional-repo-not-present` rows.

### Task 2: Re-Run System Consistency Checks

**Files:**
- Read: `skills/`
- Read: `.agents/skills/`
- Read: `docs/agent-compatibility/`

- [x] **Step 1: Verify skill parity**

Run a PowerShell count comparing canonical `skills/sea-*` and `.agents/skills/sea-*`.

Observed: both counts are `27`, with no missing canonical or wrapper entries.

- [x] **Step 2: Verify compatibility guide coverage**

Check all six compatibility docs for load-first, repo-specific, skill, logs/reports, approval-gate, unsupported-command, and self-verification guidance.

Observed: no missing fields.

### Task 3: Final Review

**Files:**
- Read: `git status --short` scoped to touched files
- Read: `docs/CODING_AGENT_SYSTEM_STRATEGY_REVIEW_2026-05-10.md`

- [x] **Step 1: Inspect changed file scope**

Confirmed changes are limited to ECC docs, skill wrappers/canonical reviewer skills, checklist, validation script, plus moving report artifacts from repo roots into approved report folders.

- [x] **Step 2: Final report**

Report central system status, repo consistency, skill conflict status, validation commands, deferred repo decision, and no commit/push/install status.

### Task 4: Close Deferred Repo Decision

**Files:**
- Modify: `docs/SKILL_ROUTING_REFERENCE.md`
- Modify: `docs/onboarding/CODING_AGENT_ONBOARDING_GUIDE.md`
- Modify: `docs/CODING_AGENT_SYSTEM_STRATEGY_REVIEW_2026-05-10.md`

- [x] **Step 1: Record decision**

Recorded that `file-code` and `app-streaming` are deferred/inactive, should not be scanned recursively, and should not be cloned or added unless Alejandro provides source paths.

- [ ] **Step 2: Re-run validation**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-coding-agent-system.ps1
```

Expected: `PASS: no findings`.
