# TODOS.md Format Reference

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Shared reference for the canonical TODOS.md format. Referenced by `/ship` (Step 5.5) and `/plan-ceo-review` (TODOS.md updates section) to ensure consistent TODO item structure.

---

## File Structure

```markdown
# TODOS

## <Skill/Component>     Ã¢â€ Â e.g., ## Browse, ## Ship, ## Review, ## Infrastructure
<items sorted P0 first, then P1, P2, P3, P4>

## Completed
<finished items with completion annotation>
```

**Sections:** Organize by skill or component (`## Browse`, `## Ship`, `## Review`, `## QA`, `## Retro`, `## Infrastructure`). Within each section, sort items by priority (P0 at top).

---

## TODO Item Format

Each item is an H3 under its section:

```markdown
### <Title>

**What:** One-line description of the work.

**Why:** The concrete problem it solves or value it unlocks.

**Context:** Enough detail that someone picking this up in 3 months understands the motivation, the current state, and where to start.

**Effort:** S / M / L / XL
**Priority:** P0 / P1 / P2 / P3 / P4
**Depends on:** <prerequisites, or "None">
```

**Required fields:** What, Why, Context, Effort, Priority
**Optional fields:** Depends on, Blocked by

---

## Priority Definitions

- **P0** Ã¢â‚¬â€ Blocking: must be done before next release
- **P1** Ã¢â‚¬â€ Critical: should be done this cycle
- **P2** Ã¢â‚¬â€ Important: do when P0/P1 are clear
- **P3** Ã¢â‚¬â€ Nice-to-have: revisit after adoption/usage data
- **P4** Ã¢â‚¬â€ Someday: good idea, no urgency

---

## Completed Item Format

When an item is completed, move it to the `## Completed` section preserving its original content and appending:

```markdown
**Completed:** vX.Y.Z (YYYY-MM-DD)
```
