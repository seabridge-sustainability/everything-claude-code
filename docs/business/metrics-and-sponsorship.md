# Metrics and Sponsorship Playbook

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
gh api repos/affaan-m/everything-claude-code \
  --jq '{stars:.stargazers_count,forks:.forks_count,contributors_url:.contributors_url,open_issues:.open_issues_count}'
```

### GitHub traffic (maintainer access required)

```bash
gh api repos/affaan-m/everything-claude-code/traffic/views
gh api repos/affaan-m/everything-claude-code/traffic/clones
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
