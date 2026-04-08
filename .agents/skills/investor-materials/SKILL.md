## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.
---
name: investor-materials
description: Create and update pitch decks, one-pagers, investor memos, accelerator applications, financial models, and fundraising materials. Use when the user needs investor-facing documents, projections, use-of-funds tables, milestone plans, or materials that must stay internally consistent across multiple fundraising assets.
origin: ECC
---

# Investor Materials

Build investor-facing materials that are consistent, credible, and easy to defend.

## When to Activate

- creating or revising a pitch deck
- writing an investor memo or one-pager
- building a financial model, milestone plan, or use-of-funds table
- answering accelerator or incubator application questions
- aligning multiple fundraising docs around one source of truth

## Golden Rule

All investor materials must agree with each other.

Create or confirm a single source of truth before writing:
- traction metrics
- pricing and revenue assumptions
- raise size and instrument
- use of funds
- team bios and titles
- milestones and timelines

If conflicting numbers appear, stop and resolve them before drafting.

## Core Workflow

1. inventory the canonical facts
2. identify missing assumptions
3. choose the asset type
4. draft the asset with explicit logic
5. cross-check every number against the source of truth

## Asset Guidance

### Pitch Deck
Recommended flow:
1. company + wedge
2. problem
3. solution
4. product / demo
5. market
6. business model
7. traction
8. team
9. competition / differentiation
10. ask
11. use of funds / milestones
12. appendix

If the user wants a web-native deck, pair this skill with `frontend-slides`.

### One-Pager / Memo
- state what the company does in one clean sentence
- show why now
- include traction and proof points early
- make the ask precise
- keep claims easy to verify

### Financial Model
Include:
- explicit assumptions
- bear / base / bull cases when useful
- clean layer-by-layer revenue logic
- milestone-linked spending
- sensitivity analysis where the decision hinges on assumptions

### Accelerator Applications
- answer the exact question asked
- prioritize traction, insight, and team advantage
- avoid puffery
- keep internal metrics consistent with the deck and model

## Red Flags to Avoid

- unverifiable claims
- fuzzy market sizing without assumptions
- inconsistent team roles or titles
- revenue math that does not sum cleanly
- inflated certainty where assumptions are fragile

## Quality Gate

Before delivering:
- every number matches the current source of truth
- use of funds and revenue layers sum correctly
- assumptions are visible, not buried
- the story is clear without hype language
- the final asset is defensible in a partner meeting
