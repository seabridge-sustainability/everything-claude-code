<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
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
