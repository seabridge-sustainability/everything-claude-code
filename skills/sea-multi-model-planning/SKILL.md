---
name: sea-multi-model-planning
description: Compare independent plans and a bounded judge critique for a substantial SeaBridge design, then present one concrete plan for owner approval before implementation.
---

# SeaBridge multi-model planning

Use for competing plans or a requested multi-model design decision. Small obvious changes use the existing task workflow directly.

1. Read the current project instructions and active ECC goal. Resolve the current source and acceptance scenarios. Do not start a competing GSD plan.
2. Find `multi-model planning` through `pstack_find_workflow` or the existing `suite_find_workflow`; read `cursor-pstack/ecc/arena` with `pstack_read_skill` or `suite_read_skill`. Both use the same ECC catalog. Ground interfaces with the `architect` adapter only when needed.
3. Call `pstack_prepare_plan` with a specification, or use `node integrations/pstack/cli.mjs plan spec.json` from ECC. The tool returns task data and a judge rubric; it makes no model calls.
4. Use the calling agent's native delegation or approved model CLI to obtain two plan-only candidates. Use actual configured model/provider identities and the same packet digest. Store outputs under ECC `artifacts/agent-runs/pstack`. Candidates do not edit product files or create worktrees. Provider execution needs its current-session authorization and budget.
5. After candidates finish, obtain an independent judge critique. Preserve concrete disagreement and exact candidate digests. Label same-model or same-provider reviews honestly. Missing roles remain absent; do not invent fallback proof.
6. Call `pstack_validate_review` or CLI `review` with completed candidates and judgment. A stale source, policy or candidate invalidates the review. Present the recommendation and blockers to the owner; the result never authorizes implementation.
7. After owner approval, the existing ECC execution workflow assigns one implementation writer per repository and runs the matching verification. No automatic merge, push or cloud dispatch.

Examples and JSON shapes: [Pstack ECC guide](../../docs/tools/PSTACK_ECC_GUIDE.md).
