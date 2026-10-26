---
name: caveman-cloud-criteria
description: >
  Caveman Cloud criteria: read the library, rehearse a criterion before relying
  on it, check its judge's trust, and judge answers built on retrieved context.
  Read when an eval or monitor needs a criterion.
---

# Criteria that outlive one eval file

Use when an eval or monitor needs a check, the user asks whether a criterion or
judge can be trusted, or answers depend on retrieved context. A criterion in
the library has one version that serves Runs and Monitors alike.

## 1. Read what exists

```sh
cvm criteria list --limit 20 | jq '.data.data[] | {id, name, trust}'
cvm criteria get CRITERION_ID          # statement, definitions, judge, trust
cvm criteria trust CRITERION_ID        # catch rate, false alarms, consistency, drift
cvm criteria catalog                   # kinds, fixed checks, judge templates
```

A list's rows are `.data.data`, its next page `.data.next_cursor`. Reuse a
criterion that fits before writing a new one.

## 2. Rehearse before relying on it

```sh
cvm tools describe criteria.test
cvm criteria test --file test.json
```

`criteria.test` dry-runs a criterion (one to create, or
`{criterion_id, version}`) on up to 25 units of recent traffic, a Dataset or
one typed example, and keeps nothing. Read what it received beside what it
answered. Good output: verdicts you would give yourself on those units. A
judge that disagrees with you needs a sharper question, not a lower bar.

## 3. Write

- `cvm criteria create` adds one to the library (`kind` question,
  output_grader, assertion or code; `scope` span, trace, task or row).
- `cvm criteria propose` drafts one that stays proposed until a person turns
  it on.
- Editing, restoring a version, turning on and stopping are a person's
  console actions (`access: none`).
- `cvm criteria track` starts judging live traffic against a daily budget:
  that spends on the customer's keys. Stop and ask first.

A judge is unproven for a criterion until it has qualified; until then its
answers are reported and decide nothing.

## 4. Answers built on retrieved context (RAG)

`cvm criteria catalog` returns four judge templates under `templates`, each
with its rubric (`statement`, `pass_def`, `fail_def`, `na_def`), what the
judge must see (`inputs`) and a worked example:

| Template | Passes when | The judge must see |
| --- | --- | --- |
| `faithfulness` | every claim in the answer is supported by the retrieved context | output, context |
| `context_relevance` | the retrieved context holds what the question asks for | question, context |
| `answer_relevance` | the answer addresses the question that was asked | question, output |
| `cites_sources` | every claim cites a retrieved passage that supports it | output, context |

In a Run a judge sees the task's output and nothing else, so the task prints
what it retrieved beside its answer and repeats the question:

```json
{"question": "How long do I have to ask for a refund?", "context": ["Annual plans can be refunded within 30 days of purchase."], "answer": "Within 30 days of purchase."}
```

and the criterion is a judge question with the template's text:

```json
{"name": "Faithful to the context", "judge": {"question": "<statement>", "pass": "<pass_def>", "fail": "<fail_def>"}}
```

An output without its context cannot be judged on it: fix the task, not the
question. On live traffic a judge reads the retrieval steps a trace recorded,
so the same template as a library criterion (`cvm criteria create`, kind
`question`) needs nothing added. A template is wording, not trust.

Next: use the criterion in **caveman-cloud-evals**, or on live traffic as a
monitor in **caveman-cloud-project**.
