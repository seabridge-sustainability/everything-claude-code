# Metrics and Sponsorship Playbook

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


This file is a practical script for sponsor calls and ecosystem partner reviews.

## What to Track

Use four categories in every update:

1. **Distribution** Ã¢â‚¬â€ npm packages and GitHub App installs
2. **Adoption** Ã¢â‚¬â€ stars, forks, contributors, release cadence
3. **Product surface** Ã¢â‚¬â€ commands/skills/agents and cross-platform support
4. **Reliability** Ã¢â‚¬â€ test pass counts and production bug turnaround

## Pull Live Metrics

### npm downloads

```bash
# Weekly downloads
curl -s https://api.npmjs.org/downloads/point/last-week/ecc-universal
curl -s https://api.npmjs.org/downloads/point/last-week/ecc-agentshield

# Last 30 days
curl -s https://api.npmjs.org/downloads/point/last-month/ecc-universal
curl -s https://api.npmjs.org/downloads/point/last-month/ecc-agentshield
```

### GitHub repository adoption

```bash
gh api repos/affaan-m/ECC \
  --jq '{stars:.stargazers_count,forks:.forks_count,contributors_url:.contributors_url,open_issues:.open_issues_count}'
```

### GitHub traffic (maintainer access required)

```bash
gh api repos/affaan-m/ECC/traffic/views
gh api repos/affaan-m/ECC/traffic/clones
```

### GitHub App installs

GitHub App install count is currently most reliable in the Marketplace/App dashboard.
Use the latest value from:

- [ECC Tools Marketplace](https://github.com/marketplace/ecc-tools)

## What Cannot Be Measured Publicly (Yet)

- Claude plugin install/download counts are not currently exposed via a public API.
- For partner conversations, use npm metrics + GitHub App installs + repo traffic as the proxy bundle.

## Suggested Sponsor Packaging

Use these as starting points in negotiation:

- **Pilot Partner:** `$200/month`
  - Best for first partnership validation and simple monthly sponsor updates.
- **Growth Partner:** `$500/month`
  - Includes roadmap check-ins and implementation feedback loop.
- **Strategic Partner:** `$1,000+/month`
  - Multi-touch collaboration, launch support, and deeper operational alignment.

## 60-Second Talking Track

Use this on calls:

> ECC is now positioned as an agent harness performance system, not a config repo.
> We track adoption through npm distribution, GitHub App installs, and repository growth.
> Claude plugin installs are structurally undercounted publicly, so we use a blended metrics model.
> The project supports Claude Code, Cursor, OpenCode, and Codex app/CLI with production-grade hook reliability and a large passing test suite.

For launch-ready social copy snippets, see [`social-launch-copy.md`](./social-launch-copy.md).
