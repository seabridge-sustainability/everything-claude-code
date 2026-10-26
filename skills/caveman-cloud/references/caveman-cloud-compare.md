---
name: caveman-cloud-compare
description: >
  Answer "did this change help or hurt?" in Caveman Cloud: read verdicts,
  compare two eval or scenario runs, and split a spend or traffic change
  between two windows, keeping cost basis and quality apart.
---

# Compare honestly

Use when the user asks whether a change, model swap or prompt edit made things
better, worse or cheaper, why spend moved, or what a CI check said. Prefer the
server's comparison over recomputing one from summaries.

## 1. A change that was tested: verdicts

```sh
cvm verdicts list --limit 10 | jq '.data.data[] | {ref, label, verdict, sentence, paired_cases}'
cvm verdicts get eval_run RUN_ID        # or experiment, scenario_run, factory_comparison
cvm verdicts cases eval_run RUN_ID --limit 10    # changed cases, regressions first
```

`verdicts list` covers every comparison and pull-request check: Ship, Pass,
Don't ship, Need more data or Skipped, with the server's `sentence`.
`verdicts get` adds intervals, judge trust and what it costs to settle. Quote
the sentence; do not restate it stronger. Deciding ship or don't ship is a
person's action in the console.

## 2. Two runs side by side

```sh
cvm evals compare WORKBENCH_ID BASELINE_RUN_ID CANDIDATE_RUN_ID --policy strict
cvm scenarios compare DATASET_ID VERSION BASELINE_RUN_ID CANDIDATE_RUN_ID
```

Exit 0 passed, 5 failed (a real answer), 6 no verdict: too little data, or
the runs are not comparable (a case, criterion or evaluator changed). Explain
the mismatch the server names; never invent a comparable score.

## 3. Spend or traffic between two windows

```sh
cvm usage compare \
  --baseline '{"from": "2026-09-29T00:00:00Z", "to": "2026-10-06T00:00:00Z"}' \
  --current  '{"from": "2026-10-06T00:00:00Z", "to": "2026-10-13T00:00:00Z"}' \
  --filters '{"workflow": ["support-reply"]}'
cvm traces compare --baseline '{...}' --current '{...}'
```

`usage compare` splits the change into volume, mix and unit-cost `effects`,
by `segments`. `traces compare` gives requests, errors, conversations and
catalog-priced cost per segment. Use windows of equal length and the same
filters; at most 90 days from the baseline's start to the current's end.
Filters: `agent`, `workflow`, `model`, `provider`, `session_id`, `trace_id`,
each an array.

Metadata supports a hypothesis. Before a causal claim, open a few traces from
each window (**caveman-cloud-traces**).

## 4. Report

Baseline and candidate ids or windows, coverage, regressions and improvements,
cost with its basis, and missing evidence. Keep separate: run completed,
quality assessed, cost basis, shipped or not.

- Catalog list price is not an invoice; null cost is unknown.
- A cheaper candidate is not verified savings; only the verified ledger is.
- A page of traces, sampled spans or missing labels is not the population.
- Do not merge, deploy, publish or message anyone because a comparison passed.

Next: **caveman-manage** for an experiment's lifecycle,
**caveman-cloud-evals** to add cases when the answer was "need more data".
