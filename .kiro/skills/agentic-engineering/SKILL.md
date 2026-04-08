---
name: agentic-engineering
description: >
  Operate as an agentic engineer using eval-first execution, decomposition,
  and cost-aware model routing. Use when AI agents perform most implementation
  work and humans enforce quality and risk controls.
metadata:
  origin: ECC
---

# Agentic Engineering

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Use this skill for engineering workflows where AI agents perform most implementation work and humans enforce quality and risk controls.

## Operating Principles

1. Define completion criteria before execution.
2. Decompose work into agent-sized units.
3. Route model tiers by task complexity.
4. Measure with evals and regression checks.

## Eval-First Loop

1. Define capability eval and regression eval.
2. Run baseline and capture failure signatures.
3. Execute implementation.
4. Re-run evals and compare deltas.

**Example workflow:**
```
1. Write test that captures desired behavior (eval)
2. Run test Ã¢â€ â€™ capture baseline failures
3. Implement feature
4. Re-run test Ã¢â€ â€™ verify improvements
5. Check for regressions in other tests
```

## Task Decomposition

Apply the 15-minute unit rule:
- Each unit should be independently verifiable
- Each unit should have a single dominant risk
- Each unit should expose a clear done condition

**Good decomposition:**
```
Task: Add user authentication
Ã¢â€Å“Ã¢â€â‚¬ Unit 1: Add password hashing (15 min, security risk)
Ã¢â€Å“Ã¢â€â‚¬ Unit 2: Create login endpoint (15 min, API contract risk)
Ã¢â€Å“Ã¢â€â‚¬ Unit 3: Add session management (15 min, state risk)
Ã¢â€â€Ã¢â€â‚¬ Unit 4: Protect routes with middleware (15 min, auth logic risk)
```

**Bad decomposition:**
```
Task: Add user authentication (2 hours, multiple risks)
```

## Model Routing

Choose model tier based on task complexity:

- **Haiku**: Classification, boilerplate transforms, narrow edits
  - Example: Rename variable, add type annotation, format code

- **Sonnet**: Implementation and refactors
  - Example: Implement feature, refactor module, write tests

- **Opus**: Architecture, root-cause analysis, multi-file invariants
  - Example: Design system, debug complex issue, review architecture

**Cost discipline:** Escalate model tier only when lower tier fails with a clear reasoning gap.

## Session Strategy

- **Continue session** for closely-coupled units
  - Example: Implementing related functions in same module

- **Start fresh session** after major phase transitions
  - Example: Moving from implementation to testing

- **Compact after milestone completion**, not during active debugging
  - Example: After feature complete, before starting next feature

## Review Focus for AI-Generated Code

Prioritize:
- Invariants and edge cases
- Error boundaries
- Security and auth assumptions
- Hidden coupling and rollout risk

Do not waste review cycles on style-only disagreements when automated format/lint already enforce style.

**Review checklist:**
- [ ] Edge cases handled (null, empty, boundary values)
- [ ] Error handling comprehensive
- [ ] Security assumptions validated
- [ ] No hidden coupling between modules
- [ ] Rollout risk assessed (breaking changes, migrations)

## Cost Discipline

Track per task:
- Model tier used
- Token estimate
- Retries needed
- Wall-clock time
- Success/failure outcome

**Example tracking:**
```
Task: Implement user login
Model: Sonnet
Tokens: ~5k input, ~2k output
Retries: 1 (initial implementation had auth bug)
Time: 8 minutes
Outcome: Success
```

## When to Use This Skill

- Managing AI-driven development workflows
- Planning agent task decomposition
- Optimizing model tier selection
- Implementing eval-first development
- Reviewing AI-generated code
- Tracking development costs

## Integration with Other Skills

- **tdd-workflow**: Combine with eval-first loop for test-driven development
- **verification-loop**: Use for continuous validation during implementation
- **search-first**: Apply before implementation to find existing solutions
- **coding-standards**: Reference during code review phase
