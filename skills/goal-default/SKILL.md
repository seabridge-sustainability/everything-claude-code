---
name: goal-default
description: Defines the SeaBridgeAI goal protocol as the default execution wrapper for coding-agent tasks. Invoke this skill only by the exact name goal-default. Do not invoke Skill(goal); /goal is a user-facing Claude Code slash command, not a callable skill.
---

# goal-default

## Purpose

Apply the canonical SeaBridgeAI `/goal` protocol to every task by default.

`/goal` is the default user-facing command for continuous execution. Auto-loop is not a separate mode; it is the behavior triggered by `/goal`.

Source of truth:

`C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`

Short embed:

`C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL_SHORT.md`

## Invocation Patterns

- Claude Code: the user may type `/goal <task>` as a UI slash command. The agent
  must not invoke `Skill(goal)`. If slash-command execution is unavailable or the
  user typed `/goal` in plain text, apply this protocol manually or load this
  skill by its exact name: `goal-default`.
- Codex: `$goal <task>` or use this skill when slash commands are unavailable.
- Gemini, OpenCode, Cursor, Copilot, Hermes Agent, Cline, and other agents: treat `goal:`, `/goal`, or any coding-agent task as wrapped by this protocol.

If the runtime cannot invoke slash commands or skills, read the canonical protocol and apply it automatically.

## Required Behavior

Before implementation:

1. State the persistent execution goal and objective.
2. Define the Definition of Done.
3. Define the validation plan.
4. Identify expected work phases.
5. Identify affected systems, dependencies, constraints, risks, expected artifacts, validation requirements, and likely edge cases.
6. Define the stuck-task strategy for likely failure modes.
7. Confirm approval gates for commits, pushes, installs, paid calls, migrations, production data, destructive actions, and protected branches.

During execution:

1. Run Analyze -> Plan -> Implement -> Test -> Verify -> Review -> Fix -> Re-test -> Re-verify -> Complete.
2. Keep changes aligned with existing architecture and local repo conventions.
3. Reuse existing SeaBridgeAI backend, frontend, AI-agent, schema, service, prompt, GSD, Spec Kit, skill, and workflow patterns.
4. Run validation proportional to risk.
5. Fix failures within scope and rerun validation.
6. Detect premature completion risk, especially when a non-trivial task appears finished in under 10 minutes.
7. If the same command or approach fails twice, inspect logs and change strategy instead of retrying blindly.

Before completion:

1. Verify the DoD against fresh evidence.
2. Report changed files, checks run, validation results, skipped checks with reasons, blockers, and residual risks.
3. Do not claim complete, fixed, production-ready, safe, passing, or wired without validation evidence.
4. Do not summarize "done" unless validation passed or a hard blocker is documented.

## Completion Evidence

Every final report must include:

- Files changed.
- Commands run.
- Tests run.
- Validation results.
- Errors encountered.
- Fixes applied.
- Unverified items.
- Remaining risks.
- Whether the Definition of Done is satisfied.

If no tests were run, state why tests were not run, what validation was substituted, and what risk remains.

## Stuck-Task Strategy

When stuck:

1. Stop the failing loop.
2. Summarize the blocker.
3. Identify root cause candidates.
4. Try an alternate method.
5. Reduce scope to isolate failure.
6. Inspect logs/files manually.
7. Use a different command or smaller test.
8. Document what remains blocked if unresolved.

No more than 2 identical retries are allowed without changing something meaningful.

## Planning-Only Tasks

For planning-only work:

- Frame the goal and expected artifact.
- Define a validation checklist for the plan.
- Include pass/fail criteria.
- Do not implement unless explicitly instructed.
- Document assumptions and open decisions.

## Review And QA Tasks

For review, QA, and judge workflows:

- Define pass/fail criteria before reviewing.
- Lead with evidence-based findings.
- Identify missing validation and regression risks.
- If fixes are made, rerun validation.
- Do not upgrade unverified claims to verified status.

## Examples

- `/goal fix backend failing tests and validate`
- `/goal implement Sustainability Procurement module phase 1`
- `/goal review frontend data-input flow and create a validated fix plan`
- `/goal map codebase and produce implementation plan`
- `/goal run full QA pass for Initiatives & Investment`
- Good: `/goal implement procurement request API, frontend intake form, tests, and validation`
  - Agent should respond with goal established, DoD, plan, execution phases, and validation plan, then work until tested or blocked with evidence.
- Bad: "Implemented the feature" after editing one file without running tests or providing validation evidence.

## SeaBridgeAI Safety

This skill never authorizes commits, pushes, dependency installs, paid or live provider calls, migrations, production data changes, destructive operations, protected-branch work, or long-running training jobs. Preserve tenant isolation, permissions, audit trails, source traces, and missing-data behavior.
