---
inclusion: auto
name: development-workflow
description: Outcome-first implementation and verification workflow.
---

# Development Workflow

The canonical safety and goal contract is loaded natively from root `AGENTS.md`;
do not duplicate it here.

1. Frame the requested outcome, risks, dependencies, and proof for non-trivial
   work.
2. Implement the smallest coherent change using existing architecture.
3. Run focused checks and observe changed behavior through its real runtime
   surface when available.
4. Review non-trivial or high-risk diffs; use a specialist only when its trigger
   fits.
5. Commit or push only when the current session's bounded approval covers it,
   batching ready work to avoid unnecessary GitHub Actions runs.
