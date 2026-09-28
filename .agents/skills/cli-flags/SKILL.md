---
name: cli-flags
description: Reference for high-impact Claude Code CLI flags and settings.json options: --bare (10x faster startup), --add-dir (multi-repo), additionalDirectories, --agent, and --fork-session. Covers when and how to use each.
origin: ECC
---

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
