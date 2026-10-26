---
name: caveman-evidence-review
description: Review scoped Caveman Cloud costs, traces, workflows, headroom, and savings without changing configuration or starting experiments.
---

# Review Caveman evidence

Use current project data and bounded reads. A review request does not authorize
execution, promotion, payload capture, or policy changes.

## Establish scope

Run `cvm context show` and `cvm doctor`. For MCP, call
`caveman_context {}`. Confirm the project; never supply an organization ID.
Missing login or project is a blocker, not permission to select another tenant.

## Read the smallest useful evidence set

Discover exact inputs before calling an operation:

```sh
cvm tools describe reports.overview
cvm tools describe reports.costs
cvm tools describe reports.workflows
cvm tools describe reports.verified_savings
cvm tools describe traces.search
```

Use bounded time windows and the schema's filter shape: reports take
`--window 7d` (`14d`, `30d`, `60d`, `90d`) or `--from`/`--to` and read 30 days
without one. Supply nested filters through a JSON input file; do not invent
flat workflow or sorting flags.

```sh
cvm reports costs --file window.json
cvm traces search --file query.json
cvm traces show TRACE_UUID --spans
```

With MCP, use `caveman_search`, then `caveman_describe`, then `caveman_read`
with `operation` and the exact `input`. Capability group names are not callable
MCP tools. Follow paged output using its pointer, next offset, and hash; truncated
output is not the whole population.

When no report or trace search answers the question, use the caveman-sql
skill: run `cvm sql --schema` first, then one bounded query. Cite its
query digest and keep each money column's basis.

Default to metadata, spans, timing, models, token counts, errors, and optimizer
attribution. Read captured payloads only when the task explicitly requires them
and current grants allow them. Missing payloads cannot be reconstructed from
metadata. Do not enable capture to make a report look complete.

Compare suspect and control cohorts over compatible windows. Inspect a bounded
set of representative trace IDs before proposing causes. Empty results mean no
observed signal, not zero cost or zero risk.

## Report evidence and limits

Keep measured provider-complete cost, inferred daily headroom, verified ledger
savings, and evaluation cost separate. Never add or relabel them. A catalog
subtotal is not an invoice; experiment lift is not verified savings.

Return project/window, source IDs, cost basis, coverage/exclusions, findings,
unproven explanations, and one next check. Recommend changes as proposals.

Next: **caveman-cloud-traces** for representative traces, **caveman-sql** for
counts no report gives, **caveman-cloud-compare** for two windows,
**caveman-manage** for an explicitly requested lifecycle action.
