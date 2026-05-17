# Goal Protocol Default

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

Legacy compatibility path:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\docs\GOAL_PROTOCOL_DEFAULT.md`

Canonical source:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`

Compact embed:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL_SHORT.md`

## Purpose

`/goal` is the default operating contract for non-trivial SeaBridgeAI agent work.
It turns a user request into a durable, verifiable goal before implementation,
then keeps the agent working until the Definition of Done is validated or a hard
blocker is recorded.

This protocol does not replace repo instructions, Spec Kit, GSD, safety gates,
or human approvals. It frames the work those systems execute.

## When To Use

Use a `/goal` frame for:

- multi-step coding or documentation work
- cross-repo changes
- agent/tooling changes
- GSD or Spec Kit work
- tasks that need validation evidence
- tasks that may continue across sessions
- any request where "done" is not obvious from one command

For trivial requests, a one-line goal and validation note is enough.

## Required Goal Frame

Every non-trivial goal should capture:

- `user_request`: the user's original intent in plain language.
- `normalized_goal`: the concrete outcome the agent will pursue.
- `definition_of_done`: observable conditions that must be true before completion.
- `validation_plan`: commands, inspections, tests, reviews, or evidence required.
- `risks`: safety, architecture, product, data, auth, tenant, provider, or UX risks.
- `dependencies`: repos, docs, approvals, tools, data, or services needed.
- `scope`: files, modules, repos, and behaviors that may be touched.
- `out_of_scope`: tempting but deferred work.
- `status`: current state of the goal.
- `artifacts`: docs, reports, logs, screenshots, diffs, checkpoints, or handoffs.
- `blockers`: unresolved approval, data, environment, or design blockers.

Recommended status values:

- `created`
- `clarifying`
- `planned`
- `executing`
- `waiting_on_tool`
- `blocked`
- `validating`
- `completed`
- `failed`
- `archived`

## Default Loop

Run goals through this loop:

1. Analyze the request, repo state, safety gates, and existing architecture.
2. Plan the smallest scoped path to the Definition of Done.
3. Execute locally within approval limits.
4. Validate with fresh evidence.
5. Self-correct failures that are in scope and safe.
6. Continue until all required validation passes.
7. Complete only when the Definition of Done is satisfied, or block with a safe next action.

Do not stop after generating code, docs, or a plan if the Definition of Done
requires validation.

## Relationship To Spec Kit And GSD

Goal Protocol owns the default operating contract:
what is being attempted, why, what done means, what evidence is needed, and when
to stop.

Spec Kit owns formal specification artifacts:
constitution, specs, plans, tasks, analysis, and requirements checklists.

GSD owns long-running execution state:
phase plans, `.planning` state, checkpoints, verification, UAT, forensics, and
handoffs.

Use them together:

1. Start with `/goal`.
2. Escalate to Spec Kit when requirements need formal specification discipline.
3. Escalate to GSD when execution needs phase state, persistence, or UAT.
4. Close the goal only after validation evidence satisfies the Definition of Done.

## Safety Gates

`/goal` never authorizes:

- commits
- pushes
- dependency installs
- paid or live provider calls
- migrations
- production data changes
- destructive file, database, vector-store, cloud, or infrastructure operations
- yolo, autonomous, dangerous, or permission-skipping modes

If the Definition of Done needs any gated action, record the blocker and ask for
approval through the approved channel.

## Persistence

For cross-session work, store or reference:

- the current goal frame
- completed subtasks with evidence
- open subtasks
- validation logs
- skipped checks and reasons
- artifacts and report paths
- unresolved blockers
- the safest next action

Use `persistent-goal-execution`, `cross-session-resume`, and
`long-horizon-task-validation` when the work needs durable state beyond the
current chat.

## Minimal Template

```markdown
/goal

User request:

Normalized goal:

Definition of Done:

Validation plan:

Risks:

Dependencies:

Scope:

Out of scope:

Status:

Artifacts:

Blockers:
```

## Completion Rule

A goal is complete only when:

- the Definition of Done is satisfied
- the validation plan has fresh evidence
- skipped checks are named with reasons
- blockers are either resolved or explicitly deferred
- affected files and artifacts are reported
- safety and approval limits were preserved
