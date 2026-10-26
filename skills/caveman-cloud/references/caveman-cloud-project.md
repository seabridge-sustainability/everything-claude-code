---
name: caveman-cloud-project
description: >
  Set up a connected repository on Caveman Cloud: identify workflows, build
  grounded evals, record a baseline, and draft quality monitors. Use for
  "set up my project" or a dashboard project-setup task. For monitor-only
  requests, run preflight and the monitor steps without expanding the task.
---

# Make this project's workflows observable and testable

Complete one important workflow from evidence to baseline, then cover the
remaining supported workflows. Completion is saved, inspected evidence with
explicit gaps; it is not a populated dashboard or an activated optimizer.

## 1. Confirm context and inventory

Run `cvm context show` and `cvm auth status` (through the Caveman Cloud MCP,
`caveman_context`). Confirm the task's project ID and endpoint before querying
project evidence or writing resources. Use **caveman-cloud-connect** for a
missing connection. Never select an arbitrary project, request credentials in
chat, or bypass a refusal.

Find operations with `cvm tools list` and read input schemas with
`cvm tools describe` (`caveman_search` and `caveman_describe`). Read repository
instructions, current changes, application entrypoints, and existing Cloud
workflows, prompts, datasets, evaluators, evals, and monitors. Reuse compatible
resources and preserve unrelated settings and others' edits. Continue independent
repository inspection when a Cloud prerequisite blocks dependent work.

## 2. Identify workflows and their contracts

For each business job, record its purpose, entrypoint, input/output contract,
existing label, and material failure modes. Preserve framework workflow names.
Use **caveman-discover** for missing labels: present the proposed mapping before
editing attribution, and honor prior approval of that same mapping. Automatic
request-shape clusters are not business workflow names.

If traffic is not connected, report the missing integration. Use **caveman-setup**
only when wiring is part of the requested task and its prerequisites are present.
Do not install another inference proxy into an existing LiteLLM path.

## 3. Build evals and record a baseline

Use **caveman-cloud-evals** for versioned datasets, graders, targets, mappings,
and execution. Group cases by compatible workflow contract. Prioritize important
normal cases and known failures from authorized traces, repository tests/fixtures,
or operator data. Preserve source IDs and distinguish production samples from
fixtures. Never fabricate rows to make coverage appear complete.

Expected answers come from the task contract or independent review, not the
candidate's recorded answer. Missing payload capture limits which cases can be
built; do not reconstruct payloads from metadata or change consent. Prefer
checkable invariants; use model judges only with explicit rubrics and cost basis.

Validate, freeze the setup, and run a bounded baseline within existing budgets.
Read persisted results, including failed and incomplete cells. Reconnect to an
existing run after an interrupted wait. Do not call an accepted job a passed eval.
Use **caveman-cloud-scenarios** only when the task needs real tool sequences or
state transitions; use **caveman-cloud-compare** for compatible paired runs.

## 4. Draft monitors for the same failures

```sh
cvm monitors list | jq '.data.data[] | {id, name, status, sample_rate}'
cvm quality_setup proposals              # criteria, judge and budget drafted per workload
cvm monitors estimate --file draft.json  # last 7 days: matching units, judge cost
cvm monitors results MONITOR_ID --window 7d
```

A new check is `cvm criteria propose` (proposed until a person turns it on).
Approving a workload's criteria and budget, and setting a monitor `active`,
are a person's. For each requested monitor, choose the workflow/filter, grader, threshold,
required metadata or payload, sampling rate, and collection destination. Explain
why the check detects a real failure and estimate judge cost from known traffic
volume; label missing volume or prices unknown. Use the discovered schema's
sampling units, not a percentage copied into a fraction field.

Use metadata checks when content is unavailable. Mark payload-dependent checks
blocked if capture or consent is missing; never enable capture or change consent.
Reuse compatible regression datasets for collected failures when supported,
preserving source references and collection limits. Existing monitors may already
satisfy the task; avoid duplicates and never silently retune an active monitor.

Create drafts only. Validate and read back every saved draft, including its
inactive state and collection target. If the operation cannot save an inactive
draft, return a proposed configuration instead. No samples means no evidence,
not healthy. A monitor definition is not proof monitoring has run.

## 5. Deliver reviewable results

Return a per-workflow table: resource IDs, versions and dashboard links, source
counts, grader rationale, baseline/run status, representative failures, monitor
draft settings, and missing prerequisites with specific next steps. Separate
configuration saved, execution completed, and production evidence observed.

Use supported idempotency keys and revision checks for writes. Inspect partial
failures and reconcile conflicts instead of overwriting newer resources. Keep
local manifests and locks free of secrets and sensitive captured payloads unless
explicitly authorized for that storage.

Stop before promotion, monitor activation, live policy changes, or deployment.
Do not create a first experiment, invite teammates, or change budgets merely to
finish setup. Strict rollout evidence and independent holdout authority remain
separate from ordinary self-authored evals. Continue work already authorized;
ask only for a missing decision that blocks the next dependent step. Criteria
and judges: **caveman-cloud-criteria**.
