---
name: karpathy-guidelines
description: Full playbook for the SeaBridgeAI Coding-Agent Principles — four Karpathy-inspired principles (assumption surfacing, simplicity, surgical precision, goal-driven execution) plus the five-gate execution discipline (scope, evidence, adversarial reasoning, verification, reporting). Use before any non-trivial implementation.
triggers:
  - "before implementing"
  - "about to write"
  - "start coding"
  - "new feature"
  - "karpathy"
  - "five-gate"
  - "coding-agent principles"
---

# Coding-Agent Principles Playbook

Principles 1-4 are derived from Andrej Karpathy's observations on LLM coding
pitfalls. Principles 5-8 are the model-agnostic five-gate execution discipline
(scope, evidence, adversarial reasoning, verification, reporting) that every
SeaBridgeAI agent's `AGENTS_SYSTEM.md`/`AGENTS.md` names as "Coding-Agent
Principles (Always Applied)". This file is the detailed reference; the short
numbered statements in each repo's instruction file are the canonical summary
— if they conflict, the repo's `AGENTS_SYSTEM.md` wins. Apply all eight before
and during any non-trivial change.

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

## Principle 5 — Evidence Before Reasoning

**Read available files, reports, tests, logs, git history, source docs, and
runtime state before relying on memory or plausible assumptions.**

- Remembered facts — from prior sessions, training data, or a user's prompt —
  are hypotheses until verified against the current repo state
- A prompt implying that a file, function, or endpoint exists is not evidence
  that it exists — check first
- Prefer `git log`/`git blame` over recalling "what changed recently"
- Prefer reading the current test/lint/build output over assuming prior
  results still hold

**Checklist:**
- [ ] Did I read the file/test/log instead of assuming its contents?
- [ ] Am I about to act on a claim (mine or the user's) that I haven't verified?
- [ ] Is there a cheap check (grep, `git log`, running the test) that would
  confirm or refute this before I act?

---

## Principle 6 — Adversarial Reasoning

**Before implementing or recommending a plan, look for ways it can fail.**
Mandatory for cross-repo, security, tenant-isolation, data, AI, architecture,
or cleanup work.

- Stale assumptions: does the plan depend on something that may have changed?
- Dirty worktrees: is there uncommitted work this plan could clobber?
- Duplicate recent work: has this already been done in a recent commit?
- Contract drift: does this change a shape another repo/service depends on?
- Generated artifacts: is a "source" file actually build output?
- Hidden dependencies, branch safety, and cost/quota risk

**Test:** finding a problem before implementation beats producing a confident
but brittle plan.

**Checklist:**
- [ ] What is the most likely way this plan is wrong?
- [ ] Have I checked git history/status for conflicting recent work?
- [ ] Does this cross a tenant, auth, or contract boundary that needs a
  closer look?

---

## Principle 7 — Verification Before Completion

**Specify targeted checks before claiming success. Never claim completion
from code changes, summaries, or confidence alone.**

- Run the smallest meaningful validation that proves the specific claim first
- Broaden checks when shared contracts, auth, tenant isolation, AI/data,
  persistence, or user-facing behavior are touched
- Document skipped checks and why, rather than omitting them silently

**Checklist:**
- [ ] What is the cheapest check that would prove this claim true or false?
- [ ] Did I run it, or am I inferring the result?
- [ ] Does the blast radius of this change call for a broader check too?

---

## Principle 8 — Calibrated Reporting

**Final reports must connect the work to the request and separate facts from
inference.**

- Name files reviewed and changed, commands run, and evidence gathered
- State validation performed, skipped checks and why, and residual risks
- Name approval gates crossed or still pending
- End with the next useful action, not a vague "let me know if you need
  anything else"

**Checklist:**
- [ ] Could someone else reconstruct what I actually did from this report?
- [ ] Have I flagged what I did *not* verify, instead of staying silent on it?
- [ ] Is every "done"/"fixed"/"working" claim backed by evidence in this report?

---

## Tradeoff Note

These principles bias toward caution over speed. For trivial tasks (obvious typo fixes, single-line changes with no ambiguity), use judgment — not every change needs the full rigor. The goal is reducing costly mistakes on non-trivial work, not slowing down simple tasks.
