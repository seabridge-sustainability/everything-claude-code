---
name: cli-flags
description: Reference for high-impact Claude Code CLI flags and settings.json options: --bare (10x faster startup), --add-dir (multi-repo), additionalDirectories, --agent, and --fork-session. Covers when and how to use each.
origin: ECC
---

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

# Claude Code CLI Productivity Flags

High-impact CLI flags and `settings.json` options that most users don't know about.

## `--bare` Ã¢â‚¬â€ Skip Configs for Fast Scripted Calls

By default, `claude` loads hooks, MCPs, CLAUDE.md files, and skill directory walks on startup. `--bare` skips all of that Ã¢â‚¬â€ up to 10x faster for scripted or `-p` (non-interactive) calls.

```bash
# Standard (slow) Ã¢â‚¬â€ full config load
claude -p "summarize this file" < myfile.txt

# Bare (fast) Ã¢â‚¬â€ skip hooks, MCPs, CLAUDE.md, skill walks
claude --bare -p "summarize this file" < myfile.txt
```

### When to use `--bare`

| Use case | Recommendation |
|----------|---------------|
| Interactive development sessions | Do NOT use `--bare` Ã¢â‚¬â€ you want hooks, MCPs, context |
| CI/CD pipeline checks | Use `--bare` Ã¢â‚¬â€ deterministic, fast |
| Scripted batch processing | Use `--bare` Ã¢â‚¬â€ no side effects |
| Quick one-off queries | Use `--bare` |
| MCP tools required | Do NOT use `--bare` |

### Selectively load what you need

```bash
# Skip everything except a specific MCP
claude --bare --mcp-config my-mcp.json -p "query the database"

# Skip everything except one CLAUDE.md
claude --bare --system-prompt "$(cat CLAUDE.md)" -p "task here"
```

---

## `--add-dir` Ã¢â‚¬â€ Multi-Repo Sessions

Adds an additional working directory to the session. Claude can read and edit files in both repos without switching contexts.

```bash
# Work across backend and frontend simultaneously
claude --add-dir ../manageesg-frontend

# Add multiple directories
claude --add-dir ../manageesg-frontend --add-dir ../shared-types
```

### When to use

- API contract changes that span backend + frontend
- Shared type/schema updates across multiple repos
- Cross-repo refactors
- Comparing implementations across repos

### Persist it in `settings.json`

To always add a directory for a specific project, add to the project's `settings.json`:

```json
{
  "additionalDirectories": [
    "../manageesg-frontend",
    "../autoresearch"
  ]
}
```

Or set it for your team in the repo-level `settings.json`:

```json
{
  "additionalDirectories": ["../shared-types"]
}
```

---

## `additionalDirectories` Ã¢â‚¬â€ Team-Wide Multi-Repo Config

The `settings.json` equivalent of `--add-dir`. Set it once, never type it again.

```json
// .claude/settings.json (project-level, committed to repo)
{
  "additionalDirectories": [
    "../manageesg-frontend"
  ]
}
```

```json
// ~/.claude/settings.json (user-level, all projects)
{
  "additionalDirectories": []  // leave empty at user level unless always needed
}
```

---

## `--agent=<name>` Ã¢â‚¬â€ Launch a Named Agent Directly

Bypasses the normal interactive session and runs a specific agent from `.claude/agents/`.

```bash
# Run the security-reviewer agent on the current repo
claude --agent=security-reviewer

# Run the planner agent with a specific task
claude --agent=planner -p "plan the new payment integration"
```

### Useful for

- CI/CD: Run security reviews or code reviews automatically on PRs
- Hooks: Trigger specific agents as PostToolUse hooks
- Scripting: Chain agents together in shell scripts

### Agent definition location

```
.claude/agents/<name>.md       # project-level agents
~/.claude/agents/<name>.md     # user-level agents (available everywhere)
```

---

## `--resume` + `--fork-session` Ã¢â‚¬â€ Fork from CLI

See the `session-forking` skill for full details. Quick reference:

```bash
# Fork the most recent session
claude --continue --fork-session

# Fork a specific session by ID
claude --resume <session-id> --fork-session

# Fork with a custom name
claude --resume <session-id> --fork-session --session-id my-fork
```

---

## Quick Reference

| Flag | Effect | Use When |
|------|--------|----------|
| `--bare` | Skip hooks, MCPs, CLAUDE.md, skills | CI, scripts, batch `-p` calls |
| `--add-dir <path>` | Add another repo to session | Cross-repo work |
| `--agent=<name>` | Run a named agent directly | CI, automation, scripting |
| `--resume <id> --fork-session` | Fork a session | Parallel exploration |
| `--continue --fork-session` | Fork most recent session | Quick parallel branch |
| `--teleport` | Move cloud session local | See `session-mobility` skill |
