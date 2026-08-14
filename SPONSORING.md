# Sponsoring ECC

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
