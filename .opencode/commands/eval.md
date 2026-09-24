---
description: Run evaluation against acceptance criteria
agent: build
---

# Eval Command

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


Evaluate implementation against acceptance criteria: $ARGUMENTS

## Your Task

Run structured evaluation to verify the implementation meets requirements.

## Evaluation Framework

### Grader Types

1. **Binary Grader** - Pass/Fail
   - Does it work? Yes/No
   - Good for: feature completion, bug fixes

2. **Scalar Grader** - Score 0-100
   - How well does it work?
   - Good for: performance, quality metrics

3. **Rubric Grader** - Category scores
   - Multiple dimensions evaluated
   - Good for: comprehensive review

## Evaluation Process

### Step 1: Define Criteria

```
Acceptance Criteria:
1. [Criterion 1] - [weight]
2. [Criterion 2] - [weight]
3. [Criterion 3] - [weight]
```

### Step 2: Run Tests

For each criterion:
- Execute relevant test
- Collect evidence
- Score result

### Step 3: Calculate Score

```
Final Score = ÃŽÂ£ (criterion_score Ãƒâ€” weight) / total_weight
```

### Step 4: Report

## Evaluation Report

### Overall: [PASS/FAIL] (Score: X/100)

### Criterion Breakdown

| Criterion | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| [Criterion 1] | X/10 | 30% | X |
| [Criterion 2] | X/10 | 40% | X |
| [Criterion 3] | X/10 | 30% | X |

### Evidence

**Criterion 1: [Name]**
- Test: [what was tested]
- Result: [outcome]
- Evidence: [screenshot, log, output]

### Recommendations

[If not passing, what needs to change]

## Pass@K Metrics

For non-deterministic evaluations:
- Run K times
- Calculate pass rate
- Report: "Pass@K = X/K"

---

**TIP**: Use eval for acceptance testing before marking features complete.
