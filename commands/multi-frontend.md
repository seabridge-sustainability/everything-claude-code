---
description: Run a frontend-focused multi-model workflow for components, layouts, animation, and UI polish.
---

# Frontend - Frontend-Focused Development

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
