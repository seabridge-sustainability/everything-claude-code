# ECC v1.8.0 Release Notes

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


## Positioning

ECC v1.8.0 positions the project as an agent harness performance system, not just a config bundle.

## Key Improvements

- Stabilized hooks and lifecycle behavior.
- Expanded eval and loop operations surface.
- Upgraded NanoClaw for operational use.
- Improved cross-harness parity (Claude Code, Cursor, OpenCode, Codex).

## Upgrade Focus

1. Validate hook profile defaults in your environment.
2. Run `/harness-audit` to baseline your project.
3. Use `/quality-gate` and updated eval workflows to enforce consistency.
4. Review attribution and licensing notes for referenced ecosystems: [reference-attribution.md](./reference-attribution.md).
5. For partner/sponsor optics, use live distribution metrics and talking points: [../business/metrics-and-sponsorship.md](../../business/metrics-and-sponsorship.md).
