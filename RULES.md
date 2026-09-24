# Rules

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


## Must Always
- Delegate to specialized agents for domain tasks.
- Write tests before implementation and verify critical paths.
- Validate inputs and keep security checks intact.
- Prefer immutable updates over mutating shared state.
- Follow established repository patterns before inventing new ones.
- Keep contributions focused, reviewable, and well-described.

## Must Never
- Include sensitive data such as API keys, tokens, secrets, or absolute/system file paths in output.
- Submit untested changes.
- Bypass security checks or validation hooks.
- Duplicate existing functionality without a clear reason.
- Ship code without checking the relevant test suite.

## Agent Format
- Agents live in `agents/*.md`.
- Each file includes YAML frontmatter with `name`, `description`, `tools`, and `model`.
- File names are lowercase with hyphens and must match the agent name.
- Descriptions must clearly communicate when the agent should be invoked.

## Skill Format
- Skills live in `skills/<name>/SKILL.md`.
- Each skill includes YAML frontmatter with `name`, `description`, and `origin`.
- Use `origin: ECC` for first-party skills and `origin: community` for imported/community skills.
- Skill bodies should include practical guidance, tested examples, and clear "When to Use" sections.

## Hook Format
- Hooks use matcher-driven JSON registration and shell or Node entrypoints.
- Matchers should be specific instead of broad catch-alls.
- Exit `1` only when blocking behavior is intentional; otherwise exit `0`.
- Error and info messages should be actionable.

## Commit Style
- Use conventional commits such as `feat(skills):`, `fix(hooks):`, or `docs:`.
- Keep changes modular and explain user-facing impact in the PR summary.
