---
name: knowledge-ops
description: Decide where a piece of SeaBridgeAI knowledge lives before saving, searching, syncing, or deduplicating it. Routes through the knowledge-source registry (config/knowledge-sources.json) to the ECC Memory Vault, governed repo docs, the private operator wiki, the issue tracker, or the platform. Use when asked to save, remember, ingest, sync, or look up knowledge.
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
| Company, person, relationship, meeting, research, internal decision | Operator wiki (private workspace repo) | Follow the workspace `AGENTS.md` (Wiki): cite sources, update `index.md`, append `log.md` |
| Who calls what in the code | Graphify, then FalkorDB | Read-only; rebuild with `graphify update .` |
| Anything that may contain customer or tenant data | The platform only | Never any store above; the router refuses |

## Read order

Measured on 2026-09-29 (`docs/reports/knowledge/2026-09-29-knowledge-cost-efficiency.md`):

- **Targeted code lookup** (where is X, what calls Y): grep and read the source
  first. It was the cheapest and most accurate option.
- **Relationships or impact** (what depends on X, what breaks if X changes):
  `graphify query "<question>" --budget 2000` or `graphify affected "<symbol>"`,
  then confirm in the source.
- **Orientation in an unfamiliar repo:** skim the top of
  `graphify-out/GRAPH_REPORT.md`; do not read it whole (18k to 27k tokens).
- **Business knowledge and decisions:** the operator wiki's `index.md`, then the
  one page it points to.

Check privacy boundary and freshness before trusting a graph or a wiki page:
`node scripts/knowledge-freshness.js graphs <repo>` or `wiki <workspace>`. A
result of `unsafe` means repair `.graphifyignore` before any build or query. A
stale result means rebuild (`node scripts/knowledge-freshness.js build <repo>`,
local AST, no LLM) or read the raw source; never use it silently.

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
- Do not write to retired stores: GBrain, the ECC `knowledge-vault/` folder, and
  the MCP memory server.
- This repository is public. Confidential knowledge goes to the operator wiki,
  never here.
- Obsidian is an interface over Markdown and owns nothing.
