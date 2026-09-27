---
description: "Risk-scaled implementation workflow; load for non-trivial code changes."
alwaysApply: false
---
# Development Workflow

> This file extends [common/git-workflow.md](./git-workflow.md) with the full feature development process that happens before git operations.

The Feature Implementation Workflow is risk-scaled. Use only the steps that
help prove the requested outcome; a small, established edit needs less ceremony
than a novel or high-risk feature.

## Feature Implementation Workflow

0. **Research & Reuse**
   - Start with the repository's own patterns, history, and tests.
   - For unfamiliar or version-sensitive dependencies, consult primary vendor
     documentation. Broader code or registry search is optional and should have
     a concrete question; it is not required for routine edits.
   - Prefer an established local or well-supported library pattern when it
     meets the requirement without adding unnecessary dependencies.

1. **Plan Proportionally**
   - For complex or high-risk work, define dependencies, risks, phases,
     Definition of Done, and proof before editing.
   - Use a planner agent or durable planning document only when the work needs
     one. Do not create planning artifacts for a small, obvious change.

2. **Focused Test Approach**
   - For defects and stable behavior changes, prefer a discriminating failing
     test (RED), the smallest passing change (GREEN), then refactor if useful.
   - Select unit, integration, E2E, eval, or runtime checks from the changed
     boundary and risk. Respect the repository's coverage policy; do not impose
     a universal percentage or manufacture tests for documentation-only edits.

3. **Code Review**
   - Review non-trivial or high-risk diffs, using a reviewer agent when an
     independent pass materially improves confidence.
   - Address material findings, then rerun only the affected checks.

4. **Commit & Push**
   - Commit and push only when the current approval covers them.
   - Batch completed task-owned work into one push per repository when practical.
   - Run focused local checks first; never push merely to use CI as a test runner.
   - Follow conventional commits and [git-workflow.md](./git-workflow.md).

5. **Pre-Review Checks**
   - Verify the checks and runtime evidence appropriate to the change.
   - Confirm the branch relationship and resolve any in-scope conflicts safely.
   - Report unrelated or unavailable checks instead of repeatedly rerunning
     unchanged work.
