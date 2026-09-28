---
inclusion: auto
name: testing
description: Risk-scaled testing and runtime verification guidance.
---

# Testing Requirements

The canonical safety and goal contract is loaded natively from root `AGENTS.md`;
do not duplicate it here.

- Select unit, integration, E2E, and runtime checks according to the changed
  boundary and risk.
- Prefer a discriminating failing test for defects and stable behavior changes.
- Respect repository-owned coverage thresholds; do not invent a percentage.
- Verify observable behavior with the relevant browser, terminal, endpoint
  client, simulator, or equivalent surface when static checks are insufficient.
- Report checks run, results, skipped evidence, and remaining risk.
