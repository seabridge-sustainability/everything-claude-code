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
