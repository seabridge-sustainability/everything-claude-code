# /goal Default Protocol Short Form

`/goal` is the default SeaBridgeAI operating mode for coding-agent work. If slash commands are unavailable, apply this protocol automatically.

`/goal` and auto-loop are the same mode: `/goal` is the user-facing command, and auto-loop is the autonomous persistent execution behavior. The agent must not return early after code generation or claim completion until validation passes, the Definition of Done is satisfied, or a hard blocker is proven.

Before implementation, establish:

- Persistent execution goal.
- Definition of Done.
- Expected artifacts.
- Affected systems and integrations.
- Dependencies and approvals.
- Constraints and risks.
- Validation plan.
- Edge cases and regression checks.

Run the loop:

Analyze -> Plan -> Implement -> Test -> Verify -> Review -> Fix -> Re-test -> Re-verify -> Complete.

Do not claim completion from code edits, generated files, partial tests, or theoretical correctness. A task is complete only when the requested outcome works in the real workflow, validation passes, integrations and regressions are checked, edge cases are handled, and the DoD is satisfied.

For work likely to exceed 15 minutes, state the expected phases and validation steps before starting. If meaningful implementation, integration, multi-file changes, tests, or cross-repo updates appear to finish in under 10 minutes, include evidence explaining why the work was genuinely small or already validated.

If a command or approach fails twice, do not repeat it blindly. Inspect logs, change strategy, isolate the problem, reduce scope, use a different validation path, and document the blocker if unresolved. Stop hung processes safely and retry with a smaller command or alternate route.

Every final report must include files changed, commands run, tests run, validation results, errors encountered, fixes applied, unverified items, remaining risks, and whether the DoD is satisfied. If no tests were run, state why, what validation substituted for tests, and what risk remains.

SeaBridgeAI extensions:

- Respect tenant, company, property, user, and permission scope.
- Preserve audit trails, source traces, provenance, units, confidence, geography, scenario, and timeframe.
- Do not silently mutate approved records or production data.
- Do not fabricate sustainability, ESG, emissions, LCA, climate, nature, procurement, due-diligence, target, utility, or financial data.
- Reuse existing backend, frontend, agent, schema, prompt, skill, GSD, and Spec Kit patterns.
- Validate with tests and checks proportional to risk.
- Do not push, commit, install dependencies, run paid/live provider calls, run migrations, or launch long jobs without explicit approval.
- Do not delete repositories, source folders, databases, data volumes, vector stores, or infrastructure.
- Document skipped checks, unverified items, blockers, and residual risks.

Canonical source: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
