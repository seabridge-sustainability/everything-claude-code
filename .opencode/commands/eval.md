---
description: Run evaluation against acceptance criteria
agent: build
---

# Eval Command

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
