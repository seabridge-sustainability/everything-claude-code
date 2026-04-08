# Social Launch Copy (X + LinkedIn)

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Use these templates as launch-ready starting points. Replace placeholders before posting.

## X Post: Release Announcement

```text
ECC v1.8.0 is live.

We moved from Ã¢â‚¬Å“config packÃ¢â‚¬Â to an agent harness performance system:
- hook reliability fixes
- new harness commands
- cross-tool parity (Claude Code, Cursor, OpenCode, Codex)

Start here: <repo-link>
```

## X Post: Proof + Metrics

```text
If you evaluate agent tooling, use blended distribution metrics:
- npm installs (`ecc-universal`, `ecc-agentshield`)
- GitHub App installs
- repo adoption (stars/forks/contributors)

We now track this monthly in-repo for sponsor transparency.
```

## X Quote Tweet: Eval Skills Article

```text
Strong point on eval discipline.

In ECC we turned this into production checks via:
- /harness-audit
- /quality-gate
- Stop-phase session summaries

This is where harness performance compounds over time.
```

## X Quote Tweet: Plankton / deslop workflow

```text
This workflow direction is right: optimize the harness, not just prompts.

Our v1.8.0 focus was reliability + parity + measurable quality gates across toolchains.
```

## LinkedIn Post: Partner-Friendly Summary

```text
We shipped ECC v1.8.0 with one objective: improve agent harness performance in production.

Highlights:
- more reliable hook lifecycle behavior
- new harness-level quality commands
- parity across Claude Code, Cursor, OpenCode, and Codex
- stronger sponsor-facing metrics tracking

If your team runs AI coding agents daily, this is designed for operational use.
```
