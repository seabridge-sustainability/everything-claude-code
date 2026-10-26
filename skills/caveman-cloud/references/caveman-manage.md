---
name: caveman-manage
description: Inspect Caveman experiment evidence and perform explicitly requested, granted create/start/cancel operations. Keep rollout approval human-only and verify persisted post-state.
---

# Manage eval-gated experiments

A review request authorizes reads. A requested lifecycle action must name or
unambiguously identify the experiment and intended effect. Existing task
authorization persists; do not invent additional confirmation ceremonies.

## Inspect current state

```sh
cvm context show
cvm tools describe experiments.get
cvm experiments show EXPERIMENT_UUID
cvm experiments results EXPERIMENT_UUID
```

MCP begins with `caveman_context {}`. Use `caveman_search`, `caveman_describe`,
and `caveman_read` for discovery and evidence. Scope comes from authenticated
context; never supply an organization ID.

Check lifecycle state, safety class, sample sizes, graders, quality, guardrail
breaches, evidence cost, and policy delivery when present. Missing evidence is
incomplete. Unknown states and server errors fail closed; retain exact error codes.

## Apply only the requested operation

Current shared Cloud operations include experiment create, start, and cancel.
Discover the operation's current permissions, input, effects, and retry behavior:

```sh
cvm tools describe experiments.create
cvm tools describe experiments.start
cvm tools describe experiments.cancel
```

For an authorized action, invoke that exact operation through CLI or
`caveman_write`. Inspect state before retrying a write without a durable receipt.
A queued response is not completed execution. Cancellation is not rollback of
an already published policy.

S3 approval and production policy publication remain human authority boundaries;
shared MCP does not expose them. Do not route around exclusions with raw HTTP,
another credential, or an agent-generated approval string. Report the specific
operator step and evidence needed when the requested action reaches that boundary.

## Verify the result

Re-read experiment detail and results. Report before/after state, request or
receipt identifiers if returned, delivery status, and failures. Do not infer
success from acceptance alone. Compare compatible frozen populations; report
missing cells and sample floors. Never promote a candidate with pending evidence
or breached required guardrails.

Keep experiment lift and fixture/simulation results separate from verified
savings. Only the independently qualified ledger can establish that claim.
