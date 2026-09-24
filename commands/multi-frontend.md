---
description: Run a frontend-focused multi-model workflow for components, layouts, animation, and UI polish.
---

# Frontend - Frontend-Focused Development

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
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->

Frontend-focused workflow (Research → Ideation → Plan → Execute → Optimize → Review), Antigravity-led.

> **Prerequisite:** Requires the external `ccg-workflow` runtime, which is **not** part of the base ECC install. Initialize it with `npx ccg-workflow` to provision `~/.claude/bin/codeagent-wrapper` and the `~/.claude/.ccg/prompts/*` role files this command depends on. Without that runtime, this command will not run correctly.

## Usage

```bash
/frontend <UI task description>
```

## Context

- Frontend task: $ARGUMENTS
- Antigravity-led, Codex for auxiliary reference
- Applicable: Component design, responsive layout, UI animations, style optimization

## Your Role

You are the **Frontend Orchestrator**, coordinating multi-model collaboration for UI/UX tasks (Research → Ideation → Plan → Execute → Optimize → Review).

**Collaborative Models**:
- **Antigravity** – Frontend UI/UX (**Frontend authority, trustworthy**)
- **Codex** – Backend perspective (**Frontend opinions for reference only**)
- **Claude (self)** – Orchestration, planning, execution, delivery

---

## Multi-Model Call Specification

**Call Syntax**:

```
# New session call
Bash({
  command: "~/.claude/bin/codeagent-wrapper {{LITE_MODE_FLAG}}--backend antigravity - \"$PWD\" <<'EOF'
ROLE_FILE: <role prompt path>
<TASK>
Requirement: <enhanced requirement (or $ARGUMENTS if not enhanced)>
Context: <project context and analysis from previous phases>
</TASK>
OUTPUT: Expected output format
EOF",
  run_in_background: false,
  timeout: 3600000,
  description: "Brief description"
})

# Resume session call
Bash({
  command: "~/.claude/bin/codeagent-wrapper {{LITE_MODE_FLAG}}--backend antigravity resume <SESSION_ID> - \"$PWD\" <<'EOF'
ROLE_FILE: <role prompt path>
<TASK>
Requirement: <enhanced requirement (or $ARGUMENTS if not enhanced)>
Context: <project context and analysis from previous phases>
</TASK>
OUTPUT: Expected output format
EOF",
  run_in_background: false,
  timeout: 3600000,
  description: "Brief description"
})
```

**Role Prompts**:

| Phase | Antigravity |
|-------|--------|
| Analysis | `~/.claude/.ccg/prompts/antigravity/analyzer.md` |
| Planning | `~/.claude/.ccg/prompts/antigravity/architect.md` |
| Review | `~/.claude/.ccg/prompts/antigravity/reviewer.md` |

**Session Reuse**: Each call returns `SESSION_ID: xxx`, use `resume xxx` for subsequent phases. Save `ANTIGRAVITY_SESSION` in Phase 2, use `resume` in Phases 3 and 5.

---

## Communication Guidelines

1. Start responses with mode label `[Mode: X]`, initial is `[Mode: Research]`
2. Follow strict sequence: `Research → Ideation → Plan → Execute → Optimize → Review`
3. Use `AskUserQuestion` tool for user interaction when needed (e.g., confirmation/selection/approval)

---

## Core Workflow

### Phase 0: Prompt Enhancement (Optional)

`[Mode: Prepare]` - If ace-tool MCP available, call `mcp__ace-tool__enhance_prompt`, **replace original $ARGUMENTS with enhanced result for subsequent Antigravity calls**. If unavailable, use `$ARGUMENTS` as-is.

### Phase 1: Research

`[Mode: Research]` - Understand requirements and gather context

1. **Code Retrieval** (if ace-tool MCP available): Call `mcp__ace-tool__search_context` to retrieve existing components, styles, design system. If unavailable, use built-in tools: `Glob` for file discovery, `Grep` for component/style search, `Read` for context gathering, `Task` (Explore agent) for deeper exploration.
2. Requirement completeness score (0-10): >=7 continue, <7 stop and supplement

### Phase 2: Ideation

`[Mode: Ideation]` - Antigravity-led analysis

**MUST call Antigravity** (follow call specification above):
- ROLE_FILE: `~/.claude/.ccg/prompts/antigravity/analyzer.md`
- Requirement: Enhanced requirement (or $ARGUMENTS if not enhanced)
- Context: Project context from Phase 1
- OUTPUT: UI feasibility analysis, recommended solutions (at least 2), UX evaluation

**Save SESSION_ID** (`ANTIGRAVITY_SESSION`) for subsequent phase reuse.

Output solutions (at least 2), wait for user selection.

### Phase 3: Planning

`[Mode: Plan]` - Antigravity-led planning

**MUST call Antigravity** (use `resume <ANTIGRAVITY_SESSION>` to reuse session):
- ROLE_FILE: `~/.claude/.ccg/prompts/antigravity/architect.md`
- Requirement: User's selected solution
- Context: Analysis results from Phase 2
- OUTPUT: Component structure, UI flow, styling approach

Claude synthesizes plan, save to `.claude/plan/task-name.md` after user approval.

### Phase 4: Implementation

`[Mode: Execute]` - Code development

- Strictly follow approved plan
- Follow existing project design system and code standards
- Ensure responsiveness, accessibility

### Phase 5: Optimization

`[Mode: Optimize]` - Antigravity-led review

**MUST call Antigravity** (follow call specification above):
- ROLE_FILE: `~/.claude/.ccg/prompts/antigravity/reviewer.md`
- Requirement: Review the following frontend code changes
- Context: git diff or code content
- OUTPUT: Accessibility, responsiveness, performance, design consistency issues list

Integrate review feedback, execute optimization after user confirmation.

### Phase 6: Quality Review

`[Mode: Review]` - Final evaluation

- Check completion against plan
- Verify responsiveness and accessibility
- Report issues and recommendations

---

## Key Rules

1. **Antigravity frontend opinions are trustworthy**
2. **Codex frontend opinions for reference only**
3. External models have **zero filesystem write access**
4. Claude handles all code writes and file operations
