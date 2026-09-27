---
description: Update documentation for recent changes
agent: doc-updater
subtask: true
---

# Update Docs Command

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


Update documentation to reflect recent changes: $ARGUMENTS

## Your Task

1. **Identify changed code** - `git diff --name-only`
2. **Find related docs** - README, API docs, guides
3. **Update documentation** - Keep in sync with code
4. **Verify accuracy** - Docs match implementation

## Documentation Types

### README.md
- Installation instructions
- Quick start guide
- Feature overview
- Configuration options

### API Documentation
- Endpoint descriptions
- Request/response formats
- Authentication details
- Error codes

### Code Comments
- JSDoc for public APIs
- Complex logic explanations
- TODO/FIXME cleanup

### Guides
- How-to tutorials
- Architecture decisions (ADRs)
- Troubleshooting guides

## Update Checklist

- [ ] README reflects current features
- [ ] API docs match endpoints
- [ ] JSDoc updated for changed functions
- [ ] Examples are working
- [ ] Links are valid
- [ ] Version numbers updated

## Documentation Quality

### Good Documentation
- Accurate and up-to-date
- Clear and concise
- Has working examples
- Covers edge cases

### Avoid
- Outdated information
- Missing parameters
- Broken examples
- Ambiguous language

---

**IMPORTANT**: Documentation should be updated alongside code changes, not as an afterthought.
