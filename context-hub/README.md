# ECC Context Hub

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


This directory holds ECC's local Context Hub content bundle.

ECC keeps the canonical English docs in the repo root and derives the Context Hub content from those files. Do not hand-edit the generated `ecc/` entries directly. Instead:

```bash
npm run context-hub:sync
```

That command refreshes:

- `context-hub/ecc/docs/*/DOC.md`
- `context-hub/ecc/skills/*/SKILL.md`
- the repo root `llms.txt`

## Commands

```bash
npm run context-hub:sync
npm run context-hub:validate
npm run context-hub:build
```

`context-hub:validate` and `context-hub:build` use `npx -y @aisuite/chub ...`, so a global `chub` install is optional.

CI runs `context-hub:sync`, checks that `context-hub/ecc/...` plus `llms.txt` are committed, and then runs `context-hub:validate`.

## Local chub config

To use ECC's local Context Hub bundle alongside the public registry, add a local source to `~/.chub/config.yaml` after building:

```yaml
sources:
  - name: community
    url: https://cdn.aichub.org/v1
  - name: ecc-local
    path: /absolute/path/to/everything-claude-code/context-hub/dist
```

Then:

```bash
chub search ecc
chub get ecc/core-overview
chub get ecc/documentation-lookup
```
