---
name: caveman-onboard
description: >
  Complete Caveman Cloud onboarding from the user's local coding agent:
  confirm project access, connect application telemetry, identify workflows,
  build evals, record a baseline, and draft monitors. Use for "onboard me",
  "finish onboarding", or an end-to-end Cloud setup task. Resume verified
  steps and report missing prerequisites without fabricating progress.
---

# Onboard this repository onto Caveman Cloud

Use this skill as the running order; the named skills own each step's details.
Honor the user's task scope and existing approvals when composing them. A
specialist skill does not expand authority to activate policy or change unrelated
settings. A bold name is `references/<name>.md` in the installed `caveman-cloud`
skill (**caveman-cloud-connect** installs it). Read from the console instead,
the same steps are `/docs/<page>.md` on its origin, named below. If neither is
reachable, report the missing instructions rather than inventing commands or
claiming the step completed.

## 1. Confirm the intended project

Use **caveman-cloud-connect**. Check `cvm context show` and
`cvm auth status`, matching project ID and endpoint to the task. Reuse a
working connection. If sign-in is missing, run `cvm login` and wait while the
human approves in their browser; never approve your own connection or request
tokens in chat.

Keep management credentials in the CLI credential mechanism. A gateway key is
a separate application credential: when supplied through the gateway setup
flow, use only ignored server-side environment configuration or the existing
secret mechanism. Never print it, commit it, or copy it into an agent config.
The task's key-bearing prompt does not authorize reading the CLI credential store.

Inspect repository instructions and current changes. Identify whether this repo
ships LLM application code, runs a local coding agent, or does both. For a
local-agent-only repository, explain the wrapping/setup path using current CLI
help; do not invent application callsites. Cloud login is not a prerequisite for
accountless local use. Continue only the Cloud work requested.

## 2. Connect application telemetry

Use **caveman-setup** (`/docs/agent-setup.md`) when wiring is needed.
Reuse working configuration. For existing LiteLLM inference, keep the existing
provider path and use the Caveman OpenTelemetry integration. For direct SDK
calls, use the matching gateway recipe. Keep provider selection, request
semantics, payload capture, and optimization settings unchanged.

Run relevant checks and one small real request through the changed application
path. This onboarding task includes that verification request. Report request
success separately from project-visible telemetry and deployment. If blocked,
keep the integration unverified and give the exact next action. Continue
independent repository inventory; a failed network check need not block it.

## 3. Identify workflows and establish quality evidence

Use **caveman-cloud-project** (`/docs/project-setup.md`) for workflow
inventory, evals, baseline, and monitor drafts. It composes **caveman-discover**
and **caveman-cloud-evals** (`/docs/build-evals.md`). Preserve existing
labels; review proposed new mappings before changing attribution.

Complete one important workflow's baseline first, then cover the remaining
supported workflows. Build cases from authorized traces, repository fixtures,
or operator data. Label source and coverage accurately. No traffic does not
prevent fixture-based development, but fixtures do not establish production
coverage. Never invent cases to make onboarding appear finished.

Read persisted evaluation results and saved inactive monitor configurations.
Accepted jobs, saved drafts, and absent samples are not passing evidence.
Do not change capture or consent to remove an evidence gap.

## 4. Review optional next steps within scope

If an optimization review was requested, use **caveman-optimize**
(`/docs/optimize-plan.md`) to read current report-only observations.
Do not select or apply a candidate as a side effect of onboarding, invent savings,
or treat aggregate patterns as proof of a particular code defect.

If team setup was requested, inspect existing members and local git history to
suggest relevant contributors. Commits identify contributors, not entitlement to
access or an administrative role. Exclude bots, avoid duplicate suggestions, and
ask the human to choose roles in the dashboard. Do not send invitations or
messages. Skip this step when team setup was not requested.

## 5. Finish with evidence and next actions

Report each step as verified, configured but unverified, blocked, or not applicable:

- Connection: project ID/name, endpoint, and doctor result.
- Integration: actual inference path, changed files, covered/uncovered callsites.
- Verification: request status/model/usage and trace ID when returned; whether
  matching project telemetry was observed; deployment state.
- Workflows: exact names, labels changed, uncertain or unwired paths.
- Evals: resource IDs/versions and links, sources/counts, baseline run status,
  failures, and production-coverage limits.
- Monitors: saved draft IDs and checks, sampling, collection, and prerequisites.
- Still open: exact blockers and next actions, including any human-only action.

Stop before promotion, monitor activation, live policy changes, or deployment.
Do not turn a successful setup into a savings or quality-improvement claim.
