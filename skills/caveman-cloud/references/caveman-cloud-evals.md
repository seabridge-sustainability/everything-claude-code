---
name: caveman-cloud-evals
description: >
  Write a Caveman Cloud eval as one file, check it, run it, and gate a change
  on it in CI. Use for eval setup, regression tests, baselines, comparing two
  runs, or an eval that must run on every pull request.
---

# An eval is one file: write it, check it, run it

A **Dataset** holds the cases. A **Criterion** is one thing the output must do
or avoid. A **Run** is the task's outputs on those cases, graded. A
**Judgment** is one Criterion on one case. A **Verdict** is what comparing two
Runs says: passed, failed, or need more data. An **Experiment** is the named
series of Runs; the file's `name` is the Experiment. A saved file is not a
result: the work is done when a Run has a Verdict, or an honest reason it has
none.

## 1. Write the file

```sh
cvm evals init evals/support.eval.json
```

This writes three cases, a task, two criteria, a strict gate and a budget.
Replace each part from the workload's own contract, tests and entry point:

- **`name`**: keep it stable; the same name is the same Experiment and
  Dataset every time, so Runs line up.
- **`dataset`**: `cases` in the file (`id`, `input`, and `expected` when a
  right answer is known), or `{"name": "...", "version": N}` for a project
  Dataset. Take cases from fixtures, operator data or authorized traces and
  keep their source ids. A made-up edge case is fine when marked; it is not
  production coverage. An output seen in a trace is an observation, not a
  right answer.
- **`task`**: `{"command": [...]}` runs the customer's code once per case and
  trial (input as JSON on stdin, output from stdout). This is the default: it
  exercises the real code. `{"recorded": "column"}` grades outputs already in
  the Dataset.
- **`criteria`**, best first: a library criterion by name
  (`cvm criteria list`), so evals and monitors ask the same question; a fixed
  check (`{"type": "contains", ...}`, types and options from
  `cvm criteria catalog`); a judge question
  (`{"judge": {"question", "pass", "fail"}}`) when no check can decide.
  Judges, trust and RAG templates: **caveman-cloud-criteria**.
- **`gate`**: a full Run is compared with the Experiment's saved baseline.
  `{"policy": "strict"}` fails when any criterion got worse on any case and
  decides on a handful of cases. `statistical` reads a pass only on about 30
  cases or more, else need more data (exit 6, which fails CI). Use strict
  until the Dataset is that large. A Run stores the policy on the
  Experiment, and a gate that names none is read by the stored one
  (`statistical` until one is stored): name it. No gate: reported, never
  compared.
- **`trials`** when outputs vary; the case, not the trial, is what counts.
- **`budget_usd`**: the most the Run may spend. Required over one trial and
  whenever a project key runs the file, as in CI.

Keep secrets and captured content out of the file: it is committed.

## 2. Check it

```sh
cvm evals validate evals/support.eval.json      # exit 2 names each error by JSON path
cvm evals run evals/support.eval.json --dry-run # runs the task, sends nothing
```

`--offline` checks the shape alone without sign-in. Fix a task that errors
before paying for grading.

## 3. Run it

```sh
cvm evals run evals/support.eval.json --set-baseline-on-pass
```

The first Run has nothing to compare with: it exits 0 and becomes the
baseline. Later Runs are compared with it on the server, as the console shows.

- **0**: passed, or nothing to gate (no gate, no baseline, partial or dry
  run). Say which.
- **5**: the gate failed. Report the regressed cases and the judge's reason.
- **6**: no Verdict: more data needed (the sentence says how much), the Runs
  are not comparable (a case or criterion changed; the sentence prints the
  `cvm evals set_baseline` command), or an output could not be graded. Not a
  pass, not a failure. Save a new baseline only when the change was meant.
- **2** an invalid file, **1** the Run crashed.

`--first N` or `--sample N --seed S` grade a few cases for a quick look; such
a Run is never compared or saved as a baseline. Quote a judge's reason, never
write one; an unproven judge's answer decides nothing.

## 4. Gate changes in CI

```sh
cvm evals ci evals/*.eval.json --junit-out caveman-evals.xml
```

The same Run, with commit, branch and pull request, and one JUnit case per
case and criterion. No GitHub needed. `CAVE_TOKEN` is a project key made for
this (console: New key, "Runs evals from CI", a daily spend limit) and
`CAVE_PROJECT_ID` its project. `--advisory` reports without failing. On GitHub
Actions the Caveman action's `files:` input runs this command. That key reads
no captured content, so:

- the file names `budget_usd`, held against the key's daily limit;
- cases are written in the file, or the task is one Caveman runs (a command
  task on a named Dataset needs rows the key cannot read);
- its Run holds no judge reasons or error text: report the failing cases and
  point to the Run in the console.

Do not create the key, raise its limit or change what gates a merge unless
asked for exactly that.

## 5. Report

The file path, Experiment and Run ids, the Verdict with the server's sentence
and its baseline, passed, failed and errored Judgments per criterion, failing
case ids with the judge's reason (or that it was withheld), known cost, and
what remains. Keep apart: a valid file, a dry run, a graded Run, a compared
Run, a CI gate. Unknown cost stays unknown.

MCP: the same ids (`evals.create`, `evals.run`, `evals.compare`,
`datasets.create`) through `caveman_describe`, `caveman_read`, `caveman_write`.
Next: **caveman-cloud-compare** to read two Runs side by side.
