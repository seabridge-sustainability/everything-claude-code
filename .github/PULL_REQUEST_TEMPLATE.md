<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->
## What Changed
<!-- Describe the specific changes made in this PR -->

## Why This Change
<!-- Explain the motivation and context for this change -->

## Testing Done
<!-- Describe the testing you performed to validate your changes -->
- [ ] Manual testing completed
- [ ] Automated tests pass locally (`node tests/run-all.js`)
- [ ] Edge cases considered and tested

## Type of Change
- [ ] `fix:` Bug fix
- [ ] `feat:` New feature
- [ ] `refactor:` Code refactoring
- [ ] `docs:` Documentation
- [ ] `test:` Tests
- [ ] `chore:` Maintenance/tooling
- [ ] `ci:` CI/CD changes

## Security & Quality Checklist
- [ ] No secrets or API keys committed (ghp_, sk-, AKIA, xoxb, xoxp patterns checked)
- [ ] JSON files validate cleanly
- [ ] Shell scripts pass shellcheck (if applicable)
- [ ] Pre-commit hooks pass locally (if configured)
- [ ] No sensitive data exposed in logs or output
- [ ] Follows conventional commits format

## If you changed dependencies or `package.json` (`bin` / `files` / deps)
- [ ] Ran `yarn install --mode=update-lockfile` and committed the `yarn.lock` change. CI runs Yarn in hardened mode on public PRs and fails if the lockfile would be modified, so an out of date `yarn.lock` breaks the build even when nothing else is wrong.

## If you added a skill, command, agent, hook, or CLI tool
- [ ] Registered in `package.json` (`bin` and `files`), `manifests/install-components.json`, `manifests/install-modules.json`, and `agent.yaml`
- [ ] Regenerated the catalog (`npm run catalog:sync`) and command registry (`npm run command-registry:write`)
- [ ] Updated the docs tables it belongs in (`README.md`, `COMMANDS-QUICK-REF.md`, `docs/COMMAND-AGENT-MAP.md`)
- [ ] If it ships a new script path, added it to the publish surface allowlist (`tests/scripts/npm-publish-surface.test.js`)
- [ ] Cross-harness surfaces updated if applicable (for Codex, `.agents/skills/<name>/` plus `agents/openai.yaml`; the Codex frontmatter validator allows only `name`, `description`, `metadata`, `license`, `allowed-tools`, so drop keys like `version` from that copy)
- [ ] Full gauntlet passes locally (`npm test`)

## Documentation
- [ ] Updated relevant documentation
- [ ] Added comments for complex logic
- [ ] README updated (if needed)
