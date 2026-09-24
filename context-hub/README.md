# ECC Context Hub

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
