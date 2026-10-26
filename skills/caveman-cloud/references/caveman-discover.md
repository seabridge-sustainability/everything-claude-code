---
name: caveman-discover
description: >
  Find every LLM workflow in the current repository and label it, so Caveman
  Cloud groups spend by what the code does (support-reply, nightly-digest)
  instead of one anonymous bucket. Use for the Caveman discovery prompt,
  "discover workflows", or breaking LLM spend down by workflow. Needs gateway
  routing or a telemetry integration first (caveman-setup).
---

You are labeling this repository's LLM workflows for Caveman Cloud. A
*workflow* is a job the code performs ("answer a support ticket", "build the
nightly digest"), not a technology. Every request can carry a workflow label;
unlabeled traffic lands in one `unlabeled-workflow` bucket. Find the
workflows, name them, wire the labels, verify nothing broke.

The user invokes this. A review-only `unlabeled-traffic` observation creates no
file, proposal or draft pull request, and telemetry never selects a callsite or
authorizes an edit. Present the mapping table and apply it after the user
approves; an approval of the same mapping still holds, so do not ask again.
Re-running on a correctly labeled repo changes nothing.

## Preflight

Read repository instructions and current changes. Confirm the project with
`cvm context show` and `cvm auth status` (MCP: `caveman_context`), and see
what is already labeled: `cvm reports workflows --window 7d`. With neither
`cvm` nor MCP, inventory the repository anyway and report attribution as
unverified; never guess the project. Keep existing labels, framework workflow
names and trace correlation. Request-shape clusters are not job names.

## 1. Inventory

Walk from entry points, not imports: HTTP and RPC handlers that reach an LLM;
scheduled jobs (cron, queue consumers, workers, CI jobs that run LLM code); CLI
commands and scripts; eval harnesses that spend real tokens; each distinct
agent or chain in a framework (each LangGraph graph, each crew). One workflow
is one job a person would name: ten callsites in one handler are one workflow;
one shared `llm.ts` used by three jobs is three (label at the callers, never in
the shared helper). Account for labeled and unwired paths too.

## 2. Name

Slug grammar (the gateway enforces it): lowercase `[a-z0-9_-]`, 1 to 96
characters. Name the job: `support-reply`, `nightly-digest`, `pr-review`,
`eval-suite`. Not `openai-calls` (tech), `main` (says nothing), `SupportReply`
(invalid) or `johns-test-3` (won't age). A rename later splits spend history.
When the purpose is unclear, derive the slug from the file name and mark it
`review` rather than inventing one.

## 3. Propose, then apply

Show current labels beside the proposal:

```
| workflow | job | where | how it gets labeled |
|---|---|---|---|
| support-reply | answers inbound tickets | src/bot/reply.ts:41 | defaultHeaders on the reply client |
| eval-suite (review) | purpose inferred from filename | scripts/eval.ts:8 | env at invocation |
```

Then wire each label with the lightest mechanism at that callsite:

- **@caveman-ai/sdk or the `caveman_cloud` SDK**: the per-trace `workflow`
  option, or `defaultWorkflow` on a single-job service's client.
- **Existing LiteLLM or OpenTelemetry path**: that integration's workflow
  attribution in the existing span or request context. Keep its exporter and
  inference path; never add gateway routing just for a label. If it cannot
  carry a workflow name, report the gap.
- **SDKs routed through the gateway** (OpenAI, Anthropic, LangChain, Vercel):
  `"x-cave-workflow": "<slug>"` in the same `defaultHeaders`,
  `default_headers` or `extra_headers` block that carries `x-cave-api-key`. A
  client shared by several jobs passes the header per call with the installed
  SDK's supported option; never mutate shared default headers during a
  request.
- **Raw HTTP**: the `x-cave-workflow` header.

Match the repo's style. A callsite with no supported path goes under "not
wired": wiring is **caveman-setup**'s job.

## 4. Verify

Run the relevant checks and exercise a safe labeled path within the user's
scope; check label isolation when jobs share a client. Never trigger scheduled
or externally consequential jobs to make telemetry. A 400
`cave_invalid_request_header` means a bad slug. Look for the label with
`cvm reports workflows --window 7d` when reads are allowed; request success
alone does not prove labeled spend is visible.

## 5. Report

```
## Workflows labeled
| workflow | job | where |
Checks: <commands and results, including concurrent-label isolation>
Verified: <path exercised and request or trace evidence, or unverified and why>
Deployment: <local changes only, or deployment evidence>
Observed: <labels seen in the intended project>
Lands at: <DASHBOARD>/activity?tab=workflows; the rest shows as unlabeled-workflow
Not wired: <list or "none">
Marked review: <slugs or "none">
```

No LLM entry points at all: say exactly that and point to **caveman-setup**
instead of making a table.
