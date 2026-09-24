# Social Launch Copy (X + LinkedIn)

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

Use these templates as launch-ready starting points. Review channel tone before posting.

## X Post: Release Announcement

```text
ECC v2.0.0-rc.1 preview pack is ready for final release review.

ECC 2.0 is the harness-native operator system for agentic work: skills, hooks,
rules, MCP conventions, release gates, and an optional Hermes operator shell.

What ships:
- Hermes setup guide
- release notes and launch collateral
- cross-harness architecture docs
- Hermes import guidance for turning local operator workflows into public ECC skills

Start here: https://github.com/affaan-m/ECC
Release notes: https://github.com/affaan-m/ECC/blob/main/docs/releases/2.0.0-rc.1/release-notes.md
```

## X Post: Proof + Metrics

```text
ECC v2.0.0-rc.1 keeps the public surface honest:
- reusable ECC substrate in repo
- Hermes documented as the operator shell
- private workspace state left out
- release metadata and docs covered by tests

This is the release-candidate line: public system shape now, deeper local integrations only after sanitization.
```

## X Quote Tweet: Eval Skills Article

```text
Strong point on eval discipline.

In ECC we turned this into production checks via:
- /harness-audit
- /quality-gate
- Stop-phase session summaries

In v2.0.0-rc.1, that discipline extends to the release surface: docs, manifests, launch copy, and public/private boundaries are test-backed.
```

## X Quote Tweet: Plankton / deslop workflow

```text
This workflow direction is right: optimize the harness, not just prompts.

ECC v2.0.0-rc.1 pushes that further: reusable skills, thin harness adapters, and Hermes as the operator shell on top.
```

## LinkedIn Post: Partner-Friendly Summary

```text
ECC v2.0.0-rc.1 preview pack is ready for final release review.

ECC 2.0 is the harness-native operator system for agentic work. The same reusable layer now reaches Claude Code, Codex, OpenCode, Cursor, Gemini, Zed, GitHub Copilot workflows, and terminal-only operator lanes.

This release-candidate surface includes:
- sanitized Hermes setup documentation
- release notes and launch collateral
- cross-harness architecture notes
- Hermes import guidance for turning local operator patterns into public ECC skills

It does not include private workspace state, credentials, raw local exports, or personal datasets.

Repo: https://github.com/affaan-m/ECC
Release notes: https://github.com/affaan-m/ECC/blob/main/docs/releases/2.0.0-rc.1/release-notes.md
```
