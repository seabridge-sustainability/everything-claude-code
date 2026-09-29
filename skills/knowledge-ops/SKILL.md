---
name: knowledge-ops
description: Decide where a piece of SeaBridgeAI knowledge lives before saving, searching, syncing, or deduplicating it. Routes through the knowledge-source registry (config/knowledge-sources.json) to the ECC Memory Vault, governed repo docs, GBrain, the issue tracker, or the platform. Use when asked to save, remember, ingest, sync, or look up knowledge.
metadata:
  origin: ECC
---

# Knowledge Operations

A router, not a store. `config/knowledge-sources.json` names one owner for each
information type, and `docs/design/seabridge-knowledge-architecture.md` explains
the rules. Before using a store, read its registry entry: its `agentAccess`,
`writers`, and `state.gaps` apply.

## Route first

```bash
node -e "const k=require('./scripts/lib/knowledge-sources');const s=k.routeInformationType(k.loadRegistry(),process.argv[1]);console.log(s.id+' -> '+s.canonicalStore.location)" agent-handoffs
```

Pass `{ containsTenantData: true }` as the third argument when the content could
hold customer data; the router then refuses every store outside the platform.

| Information | Goes to | How |
| --- | --- | --- |
| Handoff, discovery, pending decision, resumable task context | ECC Memory Vault | `node scripts/memory.js handoff` or `save` (below) |
| Working preference for coding agents | ECC Memory Vault, `--kind preference` | Same |
| Coding standard, rule, ADR, API contract, runbook | Governed repo docs | Edit the owning repo's `AGENTS.md` or `docs/` and commit under that repo's rules |
| What someone is working on now | GitHub issue or PR | `gh` |
| Company, person, relationship, meeting, research | GBrain | Propose it to the operator; agents do not write GBrain |
| Who calls what in the code | Graphify, then FalkorDB | Read-only; rebuild with the owning repo's graph scripts |
| Anything that may contain customer or tenant data | The platform only | Never any store above; the router refuses |

## ECC Memory Vault

Sessions on this machine run in many worktrees, and the project scope resolves
to each checkout separately. Cross-session memory therefore goes to the **user**
scope (`~/.ecc/memory`), tagged with the repo it concerns.

```bash
node scripts/memory.js handoff --scope user --from claude --target all \
  --title "<short title>" --tag repo-manageesg-backend --stdin < body.md
node scripts/memory.js search "<query>" --scope user
node scripts/memory.js read <memory-id> --scope user
```

Every vault entry is unreviewed context. Check it against code and git before
acting on it. Once it is accepted, promote it into governed docs and mark the
vault entry superseded.

## Rules

- Search before writing. Update or supersede; never duplicate.
- Never store raw transcripts, credentials, `.env` content, or customer data.
- Harness memory (Claude auto-memory and similar) is a private cache. Anything
  another agent needs goes to the vault.
- Do not write to retired stores: the ECC `knowledge-vault/` folder and the MCP
  memory server.
- Obsidian is an interface over Markdown and owns nothing.
