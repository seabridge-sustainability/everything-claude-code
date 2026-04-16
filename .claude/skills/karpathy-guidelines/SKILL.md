---
name: karpathy-guidelines
description: Four Karpathy-inspired principles for disciplined LLM-assisted coding — assumption surfacing, simplicity, surgical precision, and goal-driven execution. Use before any non-trivial implementation.
triggers:
  - "before implementing"
  - "about to write"
  - "start coding"
  - "new feature"
  - "karpathy"
---

# Karpathy-Inspired Coding Guidelines

Derived from Andrej Karpathy's observations on LLM coding pitfalls. Apply these four principles before and during any non-trivial change.

---

## Principle 1 — Think Before Coding

> "The models make wrong assumptions on your behalf and just run along with them without checking."

**Before writing a single line:**

- State assumptions explicitly — write them out, don't act on them silently
- If two interpretations exist, present both and ask which one is intended
- If a simpler approach exists than what was asked for, say so before building the complex one
- If something is unclear, name what's unclear and stop — don't guess and proceed
- Push back when warranted: "I could do X, but Y seems simpler — which do you want?"

**Checklist:**
- [ ] Do I understand what success looks like for this task?
- [ ] Are there ambiguities I'm glossing over?
- [ ] Am I about to pick an interpretation silently?
- [ ] Would a colleague ask a clarifying question here?

---

## Principle 2 — Simplicity First

> "They really like to overcomplicate code and APIs, bloat abstractions... implement a bloated construction over 1000 lines when 100 would do."

**The minimum code that solves the problem. Nothing speculative.**

- No features beyond what was explicitly asked
- No abstractions created for a single use case
- No "flexibility" or "configurability" that wasn't requested
- No error handling for scenarios that cannot actually occur
- No helper utilities created for one-time use
- If 200 lines could be 50, write 50

**Test:** Would a senior engineer reviewing this PR say "why is this so complicated?" If yes, simplify before submitting.

**Checklist:**
- [ ] Does every line of new code trace directly to a stated requirement?
- [ ] Am I adding a layer of abstraction for one use case?
- [ ] Am I handling error cases that can't happen in this system?
- [ ] Could I solve this with half as much code?

---

## Principle 3 — Surgical Changes

> "They still sometimes change/remove comments and code they don't sufficiently understand as side effects, even if orthogonal to the task."

**Touch only what the request requires.**

When editing existing code:
- Do NOT improve adjacent code, comments, or formatting that isn't broken
- Do NOT refactor things that weren't part of the request
- Match existing style even if you'd do it differently
- If you notice unrelated dead code or a bug, **mention it** — don't fix it unilaterally

When your changes create orphans:
- Remove imports, variables, and functions that **your changes** made unused
- Do NOT remove pre-existing dead code unless explicitly asked

**Test:** Every changed line should trace directly to the user's request. If a diff line can't be explained by the request, revert it.

**Checklist:**
- [ ] Does every changed line trace directly to the user's request?
- [ ] Am I touching formatting or style in code I didn't need to change?
- [ ] Am I "cleaning up" things that weren't part of the ask?
- [ ] Have I left a comment if I noticed something unrelated that should be fixed?

---

## Principle 4 — Goal-Driven Execution

> "LLMs are exceptionally good at looping until they meet specific goals... Don't tell it what to do, give it success criteria and watch it go."

**Transform imperative tasks into verifiable goals.**

| Instead of... | Transform to... |
|---|---|
| "Add validation" | "Write tests for invalid inputs, then make them pass" |
| "Fix the bug" | "Write a test that reproduces it, then make it pass" |
| "Refactor X" | "Ensure tests pass before and after; no behavior change" |
| "Add the endpoint" | "The endpoint returns 200 for valid input and 422 for invalid; verify with curl" |

For multi-step tasks, state a brief plan with a verify step per phase:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria enable autonomous looping. Weak criteria ("make it work") require constant clarification.

**Checklist:**
- [ ] Can I state what "done" looks like in a testable way?
- [ ] For each phase, do I know how I'll verify it worked?
- [ ] Is there a test, curl command, or observable output that proves success?

---

## Tradeoff Note

These principles bias toward caution over speed. For trivial tasks (obvious typo fixes, single-line changes with no ambiguity), use judgment — not every change needs the full rigor. The goal is reducing costly mistakes on non-trivial work, not slowing down simple tasks.
