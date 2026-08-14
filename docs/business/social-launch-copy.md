# Social Launch Copy (X + LinkedIn)

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
