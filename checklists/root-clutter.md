# Root Clutter And Report Organization Checklist

Use this checklist when a task creates or reviews reports, logs, smoke-test output, QA notes, handoffs, or agent-run artifacts.

## Required Placement

- Audit reports: `docs/reports/audits/`
- Readiness reports: `docs/reports/readiness/`
- QA reports and results: `docs/reports/qa/`
- Smoke-test reports: `docs/reports/smoke-tests/`
- Deployment reports: `docs/reports/deployments/`
- Benchmark reports: `docs/reports/benchmarks/`
- Fix/issue reports: `docs/reports/fixes/`
- Handoffs: `docs/reports/handoffs/`
- Conflict logs: `docs/reports/conflicts/`
- Review reports: `docs/reports/reviews/`
- Build logs: `logs/build/`
- Integration logs: `logs/integration/`
- Playwright logs: `logs/playwright/`
- Agent logs: `logs/agent/`
- Runtime logs: `logs/runtime/`
- Agent-run artifacts: `artifacts/agent-runs/`

## Before Creating Files

- Confirm the file is an artifact, not reusable source guidance.
- Prefer an existing report/log/artifact directory.
- Do not create new top-level markdown files for transient task output.
- Keep reusable guidance in ECC and repo-specific overrides in the relevant repo docs.

## Before Completion

- Run `scripts/check-coding-agent-system.ps1` from ECC for a fast advisory scan.
- Review any `root-artifact-candidate` findings.
- Move only files that are clearly generated artifacts and only when the task authorizes cleanup.
- Never delete root files as part of clutter cleanup unless a separate explicit deletion approval is given.
