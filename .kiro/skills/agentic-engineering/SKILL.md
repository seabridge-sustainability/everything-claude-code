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
