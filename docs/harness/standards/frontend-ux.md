# Frontend UX Standard

## Application-wide consistency

This reference applies to frontend presentation work and backend response/display
contracts used by that presentation. Existing backend AGENTS.md, AGENTS_SYSTEM.md
and CLAUDE.md remain the shared authority; project entry files load them. Use one
primary frontend workflow, with Scroll Craft as a supporting review reference.

For the approved modernization, use the frontend brand handoff README v3, actual
semantic tokens and reusable components. IBM Plex Sans is body/UI type; Recoleta
is display type at 18px or above. Do not apply display typography to smaller card
titles through a global selector. Reference HTML is illustrative; conflicting old
comments and invalid reference CSS are not production defaults. Retain existing
supported themes, route visibility, role checks, control semantics and navigation.

Implement bounded component/module batches with a source-bound UI contract, named
protected behavior, current ownership and authenticated baseline. Shared primitives
need representative dashboard, list/form, risk, assistant and report coverage before
wide adoption. Keep a route adoption ledger in existing ECC task artifacts; route
existence and configured recipes do not establish functional or visual acceptance.
Keep hidden/beta/disabled modules behind their existing gates.

Backend work preserves typed state, provenance, units, identity and errors rather
than replacing missing values with display placeholders or changing calculations.
Frontend formatting must retain true zero, missing/withheld/pending/failed/ND and
not-applicable distinctions. Brand styling never authorizes API/data/auth changes.

Reuse page headers, cards, inputs, buttons, tables and disclosures before creating
another abstraction. Use existing semantic colors, navy shadows and product radii;
flag unresolved contrast/token gaps. Preserve caller overrides, refs, accessible
names, keyboard focus, form submission and loading/disabled behavior. Motion is
restrained and optional, with reduced-motion support. No dashboard pinned scroll,
WebGL, pointer effects or new marketing engine is required.

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

## Risk dashboards: decision clarity and truthful presentation

Use the approved SeaBridge brand handoff and existing semantic tokens/components.
Keep selected company/property, provider, scenario/year, calculations, units,
thresholds, actions, API contracts and persistence intact. Never convert source
context/indexes to validated property risk, percentages or financial impact.

Show one clear state per metric: true zero remains zero; missing/withheld/pending/
failed/not-applicable remain distinct and neutral. A rounded small nonzero value
must not look like zero. Severity colors require an existing justified category
and a text label; absence is not safe. Keep material scientific limitations near
results, and put repeated provenance/raw diagnostic enums in accessible disclosures.

Verify changed states and expanded panels at 1440x900, 1024x768 and 390x844, plus
200% zoom and keyboard/focus/overflow checks. Reuse existing source-bound UI
contracts and feature recipes. Before/after screenshots and video/trace playback,
including profiles/temp/reports, use the existing D-only browser workflow; no
`lab/shots`, C:/E: fallback or upstream Scroll Craft capture script. Actual signed-in
runtime proof is separate from anonymous/fixture screenshots and component tests.

Scroll Craft is an opt-in supporting reference through exact shared workflow
`ecc-scroll-craft/ecc/scroll-craft-dashboard-review`. Dashboard use selects brand
fidelity, spacing, typography and responsive scroll-position review; it does not
activate mandatory marketing variety, heroes, video, pointer effects or a new engine.

Optional branded imagery may use exact shared workflow
`ecc-higgsfield/ecc/higgsfield-frontend-assets`. Prefer existing assets and
product components for risk dashboards. The installed Higgsfield CLI is separate
from the similarly named GPU-training GitHub repository; CLI installation is not
proof of account/API access. Generated originals stay on D:, and model calls,
uploads and spending need their own current authorization.

For read-only presentation QA, inspect the actual server handlers: GET alone
does not establish a cost-free or mutation-free operation. The managed shared
pilot blocks Cecil dataset synchronization and `/api/v1/targets/insights`, whose
cache-miss path can invoke an LLM. Retain real primary data reads, label a blocked
AI panel as controlled error-state coverage, and prove normal provider-backed
functionality separately under its named grant/budget. Preserve existing sessions
and backend configuration. Historical indirect provider usage without telemetry
is unverified, never zero.
