# Development Workflow

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


> This file extends [common/git-workflow.md](./git-workflow.md) with the full feature development process that happens before git operations.

The Feature Implementation Workflow is risk-scaled. Use only the steps that
help prove the requested outcome; a small, established edit needs less ceremony
than a novel or high-risk feature.

## Feature Implementation Workflow

0. **Research & Reuse**
   - Start with the repository's own patterns, history, and tests.
   - For unfamiliar or version-sensitive dependencies, consult primary vendor
     documentation. Broader code or registry search is optional and should have
     a concrete question; it is not required for routine edits.
   - Prefer an established local or well-supported library pattern when it
     meets the requirement without adding unnecessary dependencies.

1. **Plan Proportionally**
   - For complex or high-risk work, define dependencies, risks, phases,
     Definition of Done, and proof before editing.
   - Use a planner agent or durable planning document only when the work needs
     one. Do not create planning artifacts for a small, obvious change.

2. **Focused Test Approach**
   - For defects and stable behavior changes, prefer a discriminating failing
     test (RED), the smallest passing change (GREEN), then refactor if useful.
   - Select unit, integration, E2E, eval, or runtime checks from the changed
     boundary and risk. Respect the repository's coverage policy; do not impose
     a universal percentage or manufacture tests for documentation-only edits.

3. **Code Review**
   - Review non-trivial or high-risk diffs, using a reviewer agent when an
     independent pass materially improves confidence.
   - Address material findings, then rerun only the affected checks.

4. **Commit & Push**
   - Commit and push only when the current approval covers them.
   - Batch completed task-owned work into one push per repository when practical.
   - Run focused local checks first; never push merely to use CI as a test runner.
   - Follow conventional commits and [git-workflow.md](./git-workflow.md).

5. **Pre-Review Checks**
   - Verify the checks and runtime evidence appropriate to the change.
   - Confirm the branch relationship and resolve any in-scope conflicts safely.
   - Report unrelated or unavailable checks instead of repeatedly rerunning
     unchanged work.
