# Sponsoring ECC

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

ECC is maintained as an open-source agent harness operating system across Claude Code, Cursor, OpenCode, Codex, Gemini, Zed, and other agent workflows.

## Why Sponsor

Sponsorship directly funds:

- Faster bug-fix and release cycles
- Cross-platform parity work across harnesses
- Public docs, skills, and reliability tooling that remain free for the community

## Sponsorship Tiers

These are practical public starting points. Sponsorship funds the public OSS layer and sponsor visibility, not private implementation work.

| Tier | Price | Best For | Includes |
|------|-------|----------|----------|
| Team Sponsor | $200/mo | Teams that want visible OSS support without README placement | Company name/logo/link in SPONSORS.md |
| Business Sponsor | $800/mo | Companies that want README sponsor visibility | Featured README sponsor area + SPONSORS.md listing + one sponsor-placement review |
| Strategic Sponsor | $3,700/mo | Ecosystem partners that want top placement and tighter coordination | Top README sponsor placement + SPONSORS.md listing + one 30-minute placement call + optional launch mention if the integration is genuinely useful |

No public tier includes seats, support SLA, custom development, a dedicated channel, or guaranteed case study unless separately agreed in writing.

## Sponsor Reporting

Metrics shared monthly can include:

- npm downloads (`ecc-universal`, `ecc-agentshield`)
- Repository adoption (stars, forks, contributors)
- GitHub App install trend
- Release cadence and reliability milestones

For exact command snippets and a repeatable pull process, see [`docs/business/metrics-and-sponsorship.md`](docs/business/metrics-and-sponsorship.md).

## Expectations and Scope

- Sponsorship supports maintenance and acceleration; it does not transfer project ownership.
- Feature requests are prioritized based on sponsor tier, ecosystem impact, and maintenance risk.
- Security and reliability fixes take precedence over net-new features.

## Sponsor Here

- GitHub Sponsors: [https://github.com/sponsors/affaan-m](https://github.com/sponsors/affaan-m)
- Project site: [https://ecc.tools](https://ecc.tools)
