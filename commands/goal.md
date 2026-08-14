---
description: Run the SeaBridgeAI goal protocol - persistent objective, Definition of Done, validation plan, and execution loop until validated or blocked.
---

# Goal Command

Establish a persistent execution goal before implementation, then keep working
until the Definition of Done is validated or a hard blocker is documented.

Canonical protocol: `protocols/GOAL_PROTOCOL.md`
Compact form: `protocols/GOAL_PROTOCOL_SHORT.md`
ECC skill: `goal-default`

## Before Implementation

State, in the session:

1. **Objective** - what changes and why, in one sentence.
2. **Definition of Done** - the observable conditions that end the task.
3. **Validation plan** - the commands, tests, and checks that prove the DoD.
4. **Affected systems** - repos, services, schemas, and contracts touched.
5. **Dependencies and approval gates** - anything needing user authorization.
6. **Risks and likely edge cases** - what could silently break.
7. **Expected artifacts** - files, migrations, reports.

If the task touches more than 2 files, adds a dependency, changes a schema or
migration, or spans more than one repo, list the expected phases first.

## Execution Loop

Continue the loop until the DoD is validated or a blocker is proven:

1. Implement the smallest coherent increment.
2. Run the validation plan for that increment.
3. Compare results against the DoD, not against the code you just wrote.
4. Fix gaps and re-verify.

Do not return early after code generation. Do not claim completion from edits,
generated files, or partial tests.

## Anti-Stuck Rule

If a command or approach fails twice, stop repeating it. Inspect logs, change
strategy, isolate the failure, reduce scope, or take a different validation
path. Document the blocker if it stays unresolved.

## Completion Evidence

Every final report states: files changed, commands run, tests run, validation
results, errors encountered, fixes applied, unverified items, remaining risks,
and whether the Definition of Done is satisfied. If no tests ran, say why, what
validation replaced them, and what risk remains.
