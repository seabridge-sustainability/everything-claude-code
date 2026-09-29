# Project

- Module: ECC model-agnostic outcome control
- Repository: everything-claude-code
- Worktree: `C:\wt-ecc-outcome-control`
- Scope: Make long, resumed, multi-agent, provider-dependent, and high-risk
  coding tasks use one executable definition of done across every runtime.
- Owner approval: Full plan execution, review, commit, and push approved in the
  current session on 2026-09-29.
- Product branches: ECC `main`; backend `seabridge_development`; frontend
  `development`; never backend or frontend `main`.
- Safety: No force push, reset, clean, hook bypass, paid provider call, secret
  exposure, shared-data write, or destructive cleanup.
- Current phase: Phase 1 - writable goal engine.
- Last delivered result: ECC `main` at `3c4ce1278` with a read-only outcome
  validator and adversarial all-null scenario.
- Next action: Implement atomic `init`, `resume`, `checkpoint`, `record`, and
  `handoff` commands and prove them through the real CLI.

## Product Outcome

All supported coding agents use the same executable admission, evidence,
handoff, forecast, and status-claim rules. Model identity is telemetry only and
cannot weaken acceptance.
