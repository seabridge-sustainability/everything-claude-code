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

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
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
