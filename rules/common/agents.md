# Agent Orchestration

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
or tightly coupled tasks.

```markdown
# GOOD: Parallel execution
Launch 3 agents in parallel:
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
