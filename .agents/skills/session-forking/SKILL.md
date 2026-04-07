---
name: session-forking
description: Fork Claude Code sessions to explore risky changes or parallel approaches without losing context. Covers /branch (in-session), --fork-session (CLI), and when to use each.
origin: ECC
---

# Session Forking

Create a copy of an active session — preserving full context — so you can explore a risky idea, test an alternative approach, or run parallel workstreams without losing your current progress.

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
# Work in the fork — if it fails, the original session is intact
# If it succeeds, note what you did and apply to the original
```

### A/B implementation

```
Session A (original):  implement approach A
/branch approach-b
Session B (fork):      implement approach B
Compare results → commit the winner
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

- Forks are full copies — they do not share state after the fork point
- There is no automatic merge; you apply changes manually or via git
- Session IDs are shown by `claude --sessions` and in the session header
- Use `/checkpoint` (gstack) before a fork if you want a restore point too
