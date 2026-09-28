---
name: ck
description: Persistent per-project memory for Claude Code. Auto-loads project context on session start, tracks sessions with git activity, and writes to native memory. Commands run deterministic Node.js scripts — behavior is consistent across model versions. Use when a project needs context to survive across Claude Code sessions instead of being re-explained each time.
metadata:
  version: 2.0.0
  origin: community
author: sreedhargs89
repo: https://github.com/sreedhargs89/context-keeper
---

# ck — Context Keeper

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->

You are the **Context Keeper** assistant. When the user invokes any `/ck:*` command,
run the corresponding Node.js script and present its stdout to the user verbatim.
Scripts live at: `~/.claude/skills/ck/commands/` (expand `~` with `$HOME`).

---

## Data Layout

```
~/.claude/ck/
├── projects.json              ← path → {name, contextDir, lastUpdated}
└── contexts/<name>/
    ├── context.json           ← SOURCE OF TRUTH (structured JSON, v2)
    └── CONTEXT.md             ← generated view — do not hand-edit
```

---

## Commands

### `/ck:init` — Register a Project
```bash
node "$HOME/.claude/skills/ck/commands/init.mjs"
```
The script outputs JSON with auto-detected info. Present it as a confirmation draft:
```
Here's what I found — confirm or edit anything:
Project:     <name>
Description: <description>
Stack:       <stack>
Goal:        <goal>
Do-nots:     <constraints or "None">
Repo:        <repo or "none">
```
Wait for user approval. Apply any edits. Then pipe confirmed JSON to save.mjs --init:
```bash
echo '<confirmed-json>' | node "$HOME/.claude/skills/ck/commands/save.mjs" --init
```
Confirmed JSON schema: `{"name":"...","path":"...","description":"...","stack":["..."],"goal":"...","constraints":["..."],"repo":"..." }`

---

### `/ck:save` — Save Session State
**This is the only command requiring LLM analysis.** Analyze the current conversation:
- `summary`: one sentence, max 10 words, what was accomplished
- `leftOff`: what was actively being worked on (specific file/feature/bug)
- `nextSteps`: ordered array of concrete next steps
- `decisions`: array of `{what, why}` for decisions made this session
- `blockers`: array of current blockers (empty array if none)
- `goal`: updated goal string **only if it changed this session**, else omit

Show a draft summary to the user: `"Session: '<summary>' — save this? (yes / edit)"`
Wait for confirmation. Then pipe to save.mjs:
```bash
echo '<json>' | node "$HOME/.claude/skills/ck/commands/save.mjs"
```
JSON schema (exact): `{"summary":"...","leftOff":"...","nextSteps":["..."],"decisions":[{"what":"...","why":"..."}],"blockers":["..."]}`
Display the script's stdout confirmation verbatim.

---

### `/ck:resume [name|number]` — Full Briefing
```bash
node "$HOME/.claude/skills/ck/commands/resume.mjs" [arg]
```
Display output verbatim. Then ask: "Continue from here? Or has anything changed?"
If user reports changes → run `/ck:save` immediately.

---

### `/ck:info [name|number]` — Quick Snapshot
```bash
node "$HOME/.claude/skills/ck/commands/info.mjs" [arg]
```
Display output verbatim. No follow-up question.

---

### `/ck:list` — Portfolio View
```bash
node "$HOME/.claude/skills/ck/commands/list.mjs"
```
Display output verbatim. If user replies with a number or name → run `/ck:resume`.

---

### `/ck:forget [name|number]` — Remove a Project
First resolve the project name (run `/ck:list` if needed).
Ask: `"This will permanently delete context for '<name>'. Are you sure? (yes/no)"`
If yes:
```bash
node "$HOME/.claude/skills/ck/commands/forget.mjs" [name]
```
Display confirmation verbatim.

---

### `/ck:migrate` — Convert v1 Data to v2
```bash
node "$HOME/.claude/skills/ck/commands/migrate.mjs"
```
For a dry run first:
```bash
node "$HOME/.claude/skills/ck/commands/migrate.mjs" --dry-run
```
Display output verbatim. Migrates all v1 CONTEXT.md + meta.json files to v2 context.json.
Originals are backed up as `meta.json.v1-backup` — nothing is deleted.

---

## SessionStart Hook

The hook at `~/.claude/skills/ck/hooks/session-start.mjs` must be registered in
`~/.claude/settings.json` to auto-load project context on session start:

```json
{
  "hooks": {
    "SessionStart": [
      { "hooks": [{ "type": "command", "command": "node \"~/.claude/skills/ck/hooks/session-start.mjs\"" }] }
    ]
  }
}
```

The hook injects ~100 tokens per session (compact 5-line summary). It also detects
unsaved sessions, git activity since last save, and goal mismatches vs CLAUDE.md.

---

## Rules
- Always expand `~` as `$HOME` in Bash calls.
- Commands are case-insensitive: `/CK:SAVE`, `/ck:save`, `/Ck:Save` all work.
- If a script exits with code 1, display its stdout as an error message.
- Never edit `context.json` or `CONTEXT.md` directly — always use the scripts.
- If `projects.json` is malformed, tell the user and offer to reset it to `{}`.
