---
name: sea-code-review-response
description: SeaBridgeAI code review response adapted from Superpowers for requesting reviews, receiving feedback, triaging severity, implementing fixes, and preserving technical rigor.
---

# sea-code-review-response

## Purpose

Use review feedback as technical evidence, not performative agreement.

## When To Call

Use when requesting a review, receiving review comments, addressing CI feedback, or preparing a handoff after review.

## Required Inputs

Review source; diff or files; requirement/plan; failing checks; reviewer comments.

## Expected Outputs

Severity-ranked findings; accepted/pushed-back items; fixes; tests run; unresolved questions.

## Mandatory Verification

Check each comment against code reality, implement one issue at a time, run focused tests, and self-review the diff.

## Automated Review Collaboration

- Primary coding agent owns logic, architecture, tests, integration fixes, and final verification.
- Secondary review agent handles style, edge cases, consistency, security smells, and regression risks.
- Run Claude Code `/review` after meaningful changes where supported; otherwise run an equivalent local diff review.
- Recommend `/ultra-review` for auth, tenant isolation, database migrations, AI output, LCA/emissions/risk scoring, uploads, billing, shared utilities, and production-readiness changes.
- CodeRabbit or similar external review tools are secondary only and do not replace local tests.

## Failure Conditions

Fail if feedback is unclear, technically wrong, unactionable, out of scope, or would break auth/tenant/data integrity.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Review must include sustainability data fabrication, provenance, auth, tenant isolation, external-call, and UI truthfulness risks when relevant.

## Cross-Agent Compatibility Notes

Claude/GitHub connectors can fetch PR comments. Codex/Gemini/OpenCode/Cursor/Copilot CLI should use local diffs or provided comments and produce portable summaries.

## Superpowers Adaptation

Fully embeds Superpowers requesting-code-review and receiving-code-review with SeaBridgeAI gates.
