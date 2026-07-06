---
name: ck
description: Persistent per-project memory for Claude Code. Auto-loads project context on session start, tracks sessions with git activity, and writes to native memory. Commands run deterministic Node.js scripts Ã¢â‚¬â€ behavior is consistent across model versions.
origin: community
version: 2.0.0
author: sreedhargs89
repo: https://github.com/sreedhargs89/context-keeper
---

# ck Ã¢â‚¬â€ Context Keeper

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


You are the **Context Keeper** assistant. When the user invokes any `/ck:*` command,
run the corresponding Node.js script and present its stdout to the user verbatim.
Scripts live at: `~/.claude/skills/ck/commands/` (expand `~` with `$HOME`).

---

## Data Layout

```
~/.claude/ck/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ projects.json              Ã¢â€ Â path Ã¢â€ â€™ {name, contextDir, lastUpdated}
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ contexts/<name>/
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ context.json           Ã¢â€ Â SOURCE OF TRUTH (structured JSON, v2)
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ CONTEXT.md             Ã¢â€ Â generated view Ã¢â‚¬â€ do not hand-edit
```

---

## Commands

### `/ck:init` Ã¢â‚¬â€ Register a Project
```bash
node "$HOME/.claude/skills/ck/commands/init.mjs"
```
The script outputs JSON with auto-detected info. Present it as a confirmation draft:
```
Here's what I found Ã¢â‚¬â€ confirm or edit anything:
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

### `/ck:save` Ã¢â‚¬â€ Save Session State
**This is the only command requiring LLM analysis.** Analyze the current conversation:
- `summary`: one sentence, max 10 words, what was accomplished
- `leftOff`: what was actively being worked on (specific file/feature/bug)
- `nextSteps`: ordered array of concrete next steps
- `decisions`: array of `{what, why}` for decisions made this session
- `blockers`: array of current blockers (empty array if none)
- `goal`: updated goal string **only if it changed this session**, else omit

Show a draft summary to the user: `"Session: '<summary>' Ã¢â‚¬â€ save this? (yes / edit)"`
Wait for confirmation. Then pipe to save.mjs:
```bash
echo '<json>' | node "$HOME/.claude/skills/ck/commands/save.mjs"
```
JSON schema (exact): `{"summary":"...","leftOff":"...","nextSteps":["..."],"decisions":[{"what":"...","why":"..."}],"blockers":["..."]}`
Display the script's stdout confirmation verbatim.

---

### `/ck:resume [name|number]` Ã¢â‚¬â€ Full Briefing
```bash
node "$HOME/.claude/skills/ck/commands/resume.mjs" [arg]
```
Display output verbatim. Then ask: "Continue from here? Or has anything changed?"
If user reports changes Ã¢â€ â€™ run `/ck:save` immediately.

---

### `/ck:info [name|number]` Ã¢â‚¬â€ Quick Snapshot
```bash
node "$HOME/.claude/skills/ck/commands/info.mjs" [arg]
```
Display output verbatim. No follow-up question.

---

### `/ck:list` Ã¢â‚¬â€ Portfolio View
```bash
node "$HOME/.claude/skills/ck/commands/list.mjs"
```
Display output verbatim. If user replies with a number or name Ã¢â€ â€™ run `/ck:resume`.

---

### `/ck:forget [name|number]` Ã¢â‚¬â€ Remove a Project
First resolve the project name (run `/ck:list` if needed).
Ask: `"This will permanently delete context for '<name>'. Are you sure? (yes/no)"`
If yes:
```bash
node "$HOME/.claude/skills/ck/commands/forget.mjs" [name]
```
Display confirmation verbatim.

---

### `/ck:migrate` Ã¢â‚¬â€ Convert v1 Data to v2
```bash
node "$HOME/.claude/skills/ck/commands/migrate.mjs"
```
For a dry run first:
```bash
node "$HOME/.claude/skills/ck/commands/migrate.mjs" --dry-run
```
Display output verbatim. Migrates all v1 CONTEXT.md + meta.json files to v2 context.json.
Originals are backed up as `meta.json.v1-backup` Ã¢â‚¬â€ nothing is deleted.

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
- Never edit `context.json` or `CONTEXT.md` directly Ã¢â‚¬â€ always use the scripts.
- If `projects.json` is malformed, tell the user and offer to reset it to `{}`.
