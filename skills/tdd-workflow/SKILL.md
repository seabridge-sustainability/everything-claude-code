---
name: tdd-workflow
description: Generic TDD workflow for explicit test-first requests outside SeaBridge-specific routing. In SeaBridge repositories use sea-test-driven-development; do not load this skill for every code change.
metadata:
  origin: ECC
---

# Test-Driven Development

Use this workflow only when the user or repository explicitly asks for TDD.
SeaBridge product work routes to `sea-test-driven-development`, which adds
tenant, provenance, domain, and cross-repository checks.

## Focused RED/GREEN loop

1. State the behavior and the smallest test that can disprove it.
2. Run that test before implementation and confirm it fails for the intended
   reason when practical. A setup or dependency failure is not RED evidence.
3. Implement the smallest coherent behavior change.
4. Re-run the focused test, then refactor only when it improves real clarity or
   correctness.
5. Broaden verification according to the changed boundary and repository rules.

Do not impose a universal coverage percentage: use repository-owned coverage
requirements. Select unit, integration, E2E, eval, or runtime checks by boundary and risk;
do not require every layer for every change. Documentation and
reversible configuration prose do not need manufactured tests.

## Evidence

Report the test command, intended RED failure, GREEN result, broader checks, and
any unavailable dependency. Commit and push only when the active authorization
covers them; prefer one completed, locally verified batch.

## Load details only when needed

Read [references/detailed-guide.md](references/detailed-guide.md) only for a
complex test plan, mocking strategy, framework-specific example, coverage setup,
or CI integration. Treat its examples as patterns and use the repository's
existing commands, pinned actions, fixtures, and conventions.
