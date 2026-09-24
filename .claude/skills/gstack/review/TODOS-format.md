# TODOS.md Format Reference

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


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
