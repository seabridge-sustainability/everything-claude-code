# Frontend UX Standard

## Rule: Production UI Must Not Leak Debug Logs

Required behavior: use structured telemetry or guarded dev-only logging.

Prohibited behavior: `console.log`, `console.debug`, or raw response dumps in
production paths.

Automated enforcement: `scripts/check-frontend-guardrails.ps1`. Default scope
is `production-ui`, which scans UI source paths and skips CLI/scripts/design
handoff artifacts. Use `-Scope all` for broader advisory sweeps.

Fallback reviewer: `sea-frontend-ux-reviewer`.

## Rule: Async Views Need Loading, Empty, And Error States

Required behavior: route-level and panel-level data fetches expose visible
loading/error/empty states that match the current design system.

Prohibited behavior: dead buttons, silent failures, indefinite spinners, or fake
success states.

Automated enforcement: partial advisory scan; reviewer skill for judgment.

## Rule: API Boundaries Must Be Typed

Required behavior: API client functions should normalize response types and
error handling in one place.

Prohibited behavior: duplicated fetch/axios logic across components.

Automated enforcement: advisory scan for raw `fetch`/`axios` usage in component
trees.
