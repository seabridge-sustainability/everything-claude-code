---
name: sea-frontend-ux-reviewer
description: Review SeaBridgeAI frontend changes for UX and implementation guardrails: loading/error/empty states, route visibility, API typing, accessibility basics, responsive layout, and production console leakage.
---

# SeaBridgeAI Frontend UX Reviewer

Load:

- `docs/harness/standards/frontend-ux.md`
- `sea-frontend-design`
- `sea-verification-before-completion`

Review changed files for:

- Missing loading, error, or empty states.
- Dead buttons or hidden unreachable workflows.
- Raw component-level `fetch`/`axios` duplication.
- Production `console.log` or response dumps.
- Text overlap, inaccessible controls, missing labels, and poor keyboard flow.
- Route regressions and broken navigation.

Prefer concrete screenshots, route checks, or Playwright evidence when available.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
