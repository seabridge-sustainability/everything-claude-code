## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.
---
name: btw
description: Ask a quick side question with /btw without interrupting or derailing the main task. The question is answered inline and the main task context is fully preserved.
origin: ECC
---

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
