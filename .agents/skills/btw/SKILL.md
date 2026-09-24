---
name: btw
description: Ask a quick side question with /btw without interrupting or derailing the main task. The question is answered inline and the main task context is fully preserved.
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

# /btw Ã¢â‚¬â€ Side Questions Without Context Derailment

`/btw` lets you ask a quick question mid-task without breaking Claude's focus on the main work. The question is answered immediately and the main task continues uninterrupted.

## When to Activate

- You want a quick fact-check or explanation without pausing the main task
- You notice something and want to ask about it without creating a side-branch
- You want to understand a piece of code Claude just wrote before it moves on
- You need a quick definition or reference lookup

---

## Usage

```
/btw <your question>
```

### Examples

```
/btw what does the `@lru_cache` decorator do here?

/btw is this endpoint idempotent?

/btw what's the difference between Motor and Beanie?

/btw why are we using PUT instead of PATCH for this update?
```

---

## How It Differs from a Regular Question

| Regular message | `/btw` |
|----------------|--------|
| May shift Claude's focus to the question | Explicitly scoped as a side question |
| Can derail the current task thread | Main task context is preserved |
| Claude may lose track of where it was | Claude returns to the task after answering |
| Good for complex follow-ups | Good for quick lookups or clarifications |

---

## Difference from `/aside`

Both `/btw` and `/aside` handle side questions. The distinction:

- **`/btw`** Ã¢â‚¬â€ lightweight inline question; Claude answers and immediately continues
- **`/aside`** Ã¢â‚¬â€ explicitly pauses the main task thread; heavier context switch; use when the side question might require multiple exchanges

For one-liners and quick clarifications, prefer `/btw`.

---

## Practical Patterns

### Check your understanding mid-implementation

```
Claude is implementing a new LangGraph agent...

/btw does this agent need a checkpointer if it's stateless?

Ã¢â€ â€™ Claude answers in one paragraph, then continues implementing
```

### Quick lookups without losing the thread

```
Claude is writing a MongoDB aggregation pipeline...

/btw what's the difference between $lookup and $graphLookup?

Ã¢â€ â€™ Answered inline, pipeline writing continues
```

### Validate an assumption before it's baked in

```
/btw is JWT HS256 sufficient here or should we use RS256 since there are multiple services?
```

---

## Notes

- `/btw` works even if Claude is mid-way through a complex multi-step task
- The question and answer appear inline in the conversation but don't reset task state
- If the answer reveals something that changes the task, say so explicitly: "Actually, based on that answer, let's change the approach Ã¢â‚¬â€ [explain]"
