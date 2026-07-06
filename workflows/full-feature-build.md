# Full Feature Build Workflow

1. Load repo integration file and `sea-senior-dev-workflow`.
2. Only if the feature genuinely spans multiple lanes or repos, additionally
   decompose with `sea-task-orchestration`; otherwise stay within the one-skill
   default and decompose inside `sea-senior-dev-workflow`.
3. Verify backend endpoint/data contracts before frontend claims.
4. Implement backend, frontend, AI/data, docs, and tests in scoped lanes.
5. Run focused tests, then risk-based broader checks.
6. Run self-review and domain/security review.
7. Produce the cross-repo handoff by invoking `sea-cross-repo-handoff`
   (mandatory trigger for cross-repo changes).

Completion requires behavior, contracts, data provenance, visible UI, and tests
to be honestly reported.
