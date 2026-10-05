---
description: "Agent delegation and orchestration; load when coordinating subagents."
alwaysApply: false
---
# Agent Orchestration

## Available Agents

ECC agents ship with the `ecc@ecc` plugin, not in `~/.claude/agents/`.
They are invoked through the Agent tool with a plugin-scoped `subagent_type`:

```text
Agent(subagent_type: "ecc:planner", prompt: "...")
```

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| ecc:planner | Implementation planning | Complex features, refactoring |
| ecc:architect | System design | Architectural decisions |
| ecc:tdd-guide | Test-driven development | New features, bug fixes |
| ecc:code-reviewer | Code review | After writing code |
| ecc:security-reviewer | Security analysis | Before commits |
| ecc:build-error-resolver | Fix build errors | When build fails |
| ecc:e2e-runner | E2E testing | Critical user flows |
| ecc:refactor-cleaner | Dead code cleanup | Code maintenance |
| ecc:doc-updater | Documentation | Updating docs |
| ecc:rust-reviewer | Rust code review | Rust projects |
| ecc:harmonyos-app-resolver | HarmonyOS app development | HarmonyOS/ArkTS projects |

For the full roster of 68 agents, see `/ecc:ecc-guide`.

## Selective Agent Usage

- Use **ecc:planner** for complex, multi-phase work whose dependencies or
  Definition of Done are not already clear.
- Use **ecc:architect** for material architectural decisions or cross-system
  tradeoffs.
- Use **ecc:tdd-guide** when the user or repository requires TDD, or when a
  defect or stable behavior change benefits from a RED/GREEN proof.
- Use **ecc:code-reviewer** for non-trivial or high-risk diffs. Small, obvious,
  low-risk edits can be reviewed directly by the implementing agent.

## Parallel Task Execution

Use parallel tasks only for genuinely independent, non-overlapping work when
the runtime and user instructions permit it. Keep one integration owner who
collects the results and verifies the combined change. Work directly for small
or tightly coupled tasks. The three lanes below are examples, not a maximum;
the active runtime sets capacity, and the task's cost budget determines whether
more lanes are worthwhile.

```markdown
# GOOD: Parallel execution
Launch independent agents concurrently:
1. Agent 1: Security analysis of auth module
2. Agent 2: Performance review of cache system
3. Agent 3: Type checking of utilities

# BAD: Sequential when unnecessary
First agent 1, then agent 2, then agent 3
```

## Delegation Completion Contract

Applies to every agent at every depth (parent, child, grandchild):

1. **Your final message IS the deliverable.** Never end your turn with "waiting for background agents" — a spawned task is not a completed task. Ending your turn while children are running orphans their results (completed children cannot notify a parent whose turn has ended).
2. **If you delegate, you own collection.** Wait for results, integrate them, then return. Fire-and-forget delegation is forbidden.
3. **Delegate when it materially helps.** Use bounded independent lanes for latency, isolation, or independent judgment. Do not re-delegate a task already sized for one agent; keep one integration owner.

> Rationale: observed failure mode — research agents followed "Parallel Task Execution" above, spawned children, and returned "waiting" as their final answer. All children completed successfully but their results were orphaned. The parallel rule without a completion contract produces zombie tasks.

## Multi-Perspective Analysis

For complex problems, use split role sub-agents:
- Factual reviewer
- Senior engineer
- Security expert
- Consistency reviewer
- Redundancy checker
