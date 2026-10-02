# Concurrent coding sessions

Applies to independent chats and delegated workers, regardless of model or IDE.
Ownership is explicit, not inferred from cwd, file authorship, memory, or the latest branch tip.
This protocol coordinates existing task authority; it never grants push, deployment, billing,
permission changes, or access to another session's work.

## 1. Register before controlled implementation

Use a task-owned isolated worktree. Pick a unique chat/task ID and exact file or directory
scopes (no globs). Record objective and finish criterion; do not silently downgrade a
requested deployed acceptance to local completion. Run from the worktree:

```text
ecc session register --session climate-ui-01 --scope app/climate --scope tests/climate --objective "Climate UI task" --done-when "Deployed authenticated UI acceptance" --ttl-minutes 120
ecc goal-runtime admit --runtime codex --mode controlled --session climate-ui-01
ecc session check-write --session climate-ui-01 --path app/climate/view.ts
ecc session check-changes --session climate-ui-01
```

Keep normal goal initialization/evidence requirements. Pass the same session ID to final
runtime checks. Native Claude/Cursor prompt/final hooks can resolve `session_id` or
`conversation_id`; register that exact ID or supply process-local `ECC_SESSION_ID`.
Never set one global ID for multiple chats. Renew during active work with
`ecc session renew --session ID`; expired reservations cannot justify writing.

The registry uses the Git common directory, so linked worktrees share it without
committing runtime state. Registration is atomic. Overlapping file/directory reservations
and multiple live owners of the same checkout are rejected. Disjoint scopes may proceed.
Read-only dependency inspection is allowed; another owner's write reservation is not a
reason to stop independent work. Reassignment needs an explicit owner handoff: old owner
closes the session, successor registers a new ID and re-verifies evidence.

## 2. Stay focused when CI fails

- Start with one bounded read of the failing run/job logs and candidate diff. Default
  diagnostic budget: 10 minutes or two attempts, whichever comes first.
- Classify as caused by this task, pre-existing, integration interaction, infrastructure,
  or unknown. A failure in another session's file is not proof it is unrelated; a local
  pass is not proof the hosted failure is theirs.
- Fix task-caused defects in owned scopes. Request a narrow handoff if the fix requires
  another owner's scope. Report unrelated/unknown failures with exact run, SHA, evidence,
  owner if known, and next action; do not run their entire suite or take over their feature.
- Continue all independent task work. Do not repeatedly poll the latest branch tip or
  keep expanding scope under "leave no gaps." Approval to work autonomously remains
  bounded to this task.

## 3. One release owner, not a coding freeze

Batch locally validated work. The release owner acquires one repository-wide lease for
the exact target branch and full candidate SHA, from a clean task worktree:

```powershell
ecc session release-acquire --session climate-ui-01 --branch development --candidate FULL_HEAD_SHA --ttl-minutes 120 `
  --actions-budget-status known --actions-budget-used 40.63 --actions-budget-limit 150 `
  --actions-budget-checked-at 2026-10-01T23:20:00Z --actions-budget-source github-org-budget-ui `
  --actions-stop-usage yes --expected-actions-usd 1.00 --expected-workflows "Frontend CI"
ecc session check-release --session climate-ui-01 --branch development --candidate FULL_HEAD_SHA
```

Only that owner may perform the separately approved push. Lease checks do not push or
authorize cost. Keep the lease through terminal CI/deployment for that candidate;
renew when needed. Other sessions keep coding/testing/committing locally when approved,
but do not push, rerun, dispatch, or cancel the owner's runs. CI evidence is bound to
run ID and SHA, never merely "latest green." A newer candidate is not automatically owned
by this chat. Required development deployment remains automatic after successful CI.

The release-acquire command requires an Actions budget observation no more than one
hour old, a source, hard-stop status, named expected workflows, and a positive USD
exposure estimate. It records projected usage in the lease; a missing or stale receipt
fails closed. If usage plus the estimated batch reaches 90%, the budget is unknown,
or stop-usage is not enabled, add `--owner-cost-approval` with Alejandro's
current-session approval for this named batch. This is a cooperative, self-attested
check, not a GitHub billing API verification or a substitute for approval to push.

After integrating the fetched normal target branch, pass
`--upstream refs/remotes/origin/development` (or the actual normal target) to
`check-changes` and `release-acquire`. The gate requires that upstream to be an ancestor
of HEAD and checks the remaining task delta; it does not demand ownership of already
published unrelated files. Inspect integration/conflict resolutions separately. Without
this option, the registration baseline is used. Neither mode proves historical authorship.

```text
ecc session release-end --session climate-ui-01 --outcome completed --evidence "Run URL, SHA, terminal result; deployment acceptance if required"
ecc session close --session climate-ui-01
```

Terminal outcomes also include `failed`, `superseded`, and `aborted-before-push`.
These are recorded observations, not independent verification. The existing outcome gate
still validates completion. Never release a lease just because its timer expired: CI or a
deployment may still be active. After a crash, inspect the bound candidate's runs, contact
the owner, and renew/end through its owning worktree only with an explicit handoff.
Never steal a mutex or another live session's identity. Report a stale lock rather than
deleting it. Multi-repository release owners acquire leases in a consistent repository-name
order and abandon unused leases before waiting, avoiding cyclic waits.

## 4. Honest finishing and cleanup

Report four independent milestones: implemented, locally verified, published (SHA/branch),
and deployed/accepted (environment and evidence). "My code is published; deployment is
pending on shared CI" is valid. "All done" is invalid if the agreed deployed acceptance is
missing. Record an external dependency only for the lane it blocks.

Check only registered task worktrees, commits and resources. Do not inventory every agent's
worktree, stop unknown servers, cancel others' schedules, or delete someone else's stash.
Hand off the exact session ID, scopes, worktree, base/candidate SHAs, CI run IDs, evidence,
remaining acceptance, next action, release lease and expiry. Stop this session's own
polling/schedules when its responsibility ends.

## Enforcement and limits

All 18 adapters receive the canonical rule. For local adoption, run
`node scripts/agent-adoption-doctor.js --adapter-root <clean-ECC-runtime> --project <repo> --installation --json`.
Its file readiness, installed wiring, and live activation are separate results. A packaged
Claude hook is not active merely because `hooks/hooks.json` exists: it must be registered
in project settings or an enabled plugin. Do not enable a prompt-blocking hook until its
first-prompt goal initialization flow has been verified; a rejected first prompt can strand
the agent before it can initialize the goal. Controlled runtime admission and final checks
require a live session bound to the current worktree. `check-write`, `check-changes` and
`check-release` reject scope/candidate violations; use them in every runtime's workflow.
This is cooperative enforcement, not an OS sandbox: direct editor/shell calls that bypass
the commands are not intercepted. Active native hooks enforce admission/final only;
do not advertise universal per-edit or per-push interception. Installed hook copies and
already-running chats need refresh/restart to adopt new code/instructions.

The registry covers linked worktrees of one clone on one machine, not separate clones or
computers. Use a designated human/release owner across those boundaries until a shared
server-side coordinator is deployed. Lease existence, receipt text and local locks are not
proof that every external chat participates. No extra Actions jobs or paid calls are needed.
