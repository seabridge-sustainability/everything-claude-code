---
name: caveman-cloud-strict-evals
description: Author strict evaluation suites and grounded cases, run fixture baselines, and inspect persisted outcomes before attaching a suite to an optimizer experiment.
---

# Build a strict evaluation baseline

Start with `cvm context show` and `cvm doctor`. Read the
workflow contract and authorized fixtures or traces. Preserve source IDs and
label synthetic fixtures; never invent production examples or independent
holdout labels to obtain a passing result.

Discover the current schemas:

```sh
cvm tools describe evals.create_suite
cvm tools describe evals.add_case
cvm tools describe evals.replace_cases
cvm tools describe evals.run_baseline
```

Create a named suite, then add cases with stable names, inline `fixture` objects,
and supported graders. Each fixture needs `candidate` and `reference`; provide
expectations from the workflow contract or independent review. Use deterministic
checks for exact constraints and specific rubrics for judges. Preserve supplied
provenance. Never copy a candidate into its expected answer to fabricate a pass.

```sh
cvm evals create_suite --file suite.json
cvm evals add_case --file case.json
cvm evals list_cases SUITE_UUID
cvm evals run_baseline SUITE_UUID
```

`replace_cases` replaces the full suite population: use it only when the task
requests that replacement and the file contains every intended case. Read back
cases and suite version. Suite changes invalidate compatibility with old baselines.

Baseline submission returns an experiment ID and durable delivery state. Read
`experiments.get` and `experiments.results` until the experiment reaches a known
terminal state within the task's budget. Pending, failed, missing or cancelled
results do not pass. Do not repeatedly submit paid baselines while waiting.

This baseline grades recorded fixture output. It does not execute the current
agent code, prove a live adapter, qualify an evaluator, or authorize rollout.
Use a workbench for dataset/target comparisons and scenarios for live multi-turn
or ordered-tool behavior. Keep independent holdout evaluation separate.

Return suite ID/version, case provenance/count, grader rationale, baseline
experiment ID, persisted verdicts, cost basis, and exact blockers. Attaching the
suite to a requested optimizer experiment is a separate operation; S3 approval
and policy publication remain human-only.
