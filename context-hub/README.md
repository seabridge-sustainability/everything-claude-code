# ECC Context Hub

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
