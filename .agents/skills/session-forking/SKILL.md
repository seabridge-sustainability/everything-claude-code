---
name: session-forking
description: Fork Claude Code sessions to explore risky changes or parallel approaches without losing context. Covers /branch (in-session), --fork-session (CLI), and when to use each.
origin: ECC
---

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

# Session Forking

Create a copy of an active session Ã¢â‚¬â€ preserving full context Ã¢â‚¬â€ so you can explore a risky idea, test an alternative approach, or run parallel workstreams without losing your current progress.

## When to Activate

- You're about to try a significant refactor or destructive change and want a safe fallback
- You want to explore two different implementation approaches and compare results
- You need to hand off a task to a parallel agent while keeping the main session clean
- You want to checkpoint before a long multi-step operation

---

## Method 1: `/branch` (from inside a session)

Forks the current session without leaving it. The fork starts with the same full context.

```
/branch <optional-name>
```

Examples:
```
/branch try-new-auth          # fork to explore a new auth approach
/branch risky-migration       # fork before running a data migration
/branch                       # anonymous fork
```

After `/branch`, you'll have two sessions with identical context. Work independently in each.

---

## Method 2: `claude --resume <id> --fork-session` (CLI)

Fork a specific session by ID from the command line. Useful for:
- Spawning a parallel workstream from a known checkpoint
- Creating named forks with a custom session ID

```bash
# Find the session ID
claude --sessions

# Fork it
claude --resume <session-id> --fork-session

# Fork with a custom ID
claude --resume <session-id> --fork-session --session-id my-fork-name
```

### With `--continue` instead of `--resume`

```bash
# Fork from the most recent session
claude --continue --fork-session
```

---

## Practical Patterns

### Safe exploration

```
# Before a risky change:
/branch risky-attempt
# Work in the fork Ã¢â‚¬â€ if it fails, the original session is intact
# If it succeeds, note what you did and apply to the original
```

### A/B implementation

```
Session A (original):  implement approach A
/branch approach-b
Session B (fork):      implement approach B
Compare results Ã¢â€ â€™ commit the winner
```

### Parallel sub-tasks

```
Main session: orchestrating a multi-file refactor
/branch update-models
/branch update-endpoints
/branch update-tests
Each fork tackles one area independently
```

---

## Notes

- Forks are full copies Ã¢â‚¬â€ they do not share state after the fork point
- There is no automatic merge; you apply changes manually or via git
- Session IDs are shown by `claude --sessions` and in the session header
- Use `/checkpoint` (gstack) before a fork if you want a restore point too
