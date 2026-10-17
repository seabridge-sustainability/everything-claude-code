---
name: sea-frontend-ux-reviewer
description: "Review SeaBridgeAI frontend changes for UX and implementation guardrails: loading/error/empty states, route visibility, API typing, accessibility basics, responsive layout, and production console leakage."
---

# SeaBridgeAI Frontend UX Reviewer

Mandatory for every user-facing component/copy/layout/route change, including
small presentation, science, peer-review, security and API-driven UI fixes.
Keep the task's primary workflow; this review is a required acceptance gate.
One named page owner per route integrates the full page, not isolated snippets.
Before done/tick/land: inspect every affected view/state before and after at
1280x900 and390x844 on D:, against the exact final source/candidate; record PASS
with reviewer, image hashes, route/state/viewport, remaining issues and owner-
visible preview or signed-in render. Validate the preview's actual API target,
tenant/auth/data mode and retained-data visibility; ready/login/401 is not proof.
New visible text invalidates the affected page review. Missing/blocked evidence
is BLOCKED; notify the owner within the hour, with the precise remedy and any
extra-port purpose/owner/retirement. Never defer until landing or bypass guards.
Default page copy: headings, values, controls and accessible i/popover context.
Place caveats, sources, licences and limitations in keyboard/touch-accessible
popovers, preserving content and truthful missing states. Record exact binding
visible-attribution conflicts for owner resolution; no blanket disclaimer blocks.
Science/peer-review patches must name text placement. Inspect information density,
primary-action visibility and each REA UX disposition against the final page.

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
- One human-readable metric state, preserved true zeros, units and meaningful precision.
- Source observations and provisional screens clearly separated from calculated property risk.
- Truthful values/units/states; qualifications and provenance in accessible i/popovers under the central copy budget.
- Current brand/semantic tokens and justified severity colors with text labels.

For frontend briefs mentioning API contracts or error states, select the frontend
presentation workflow as primary; those words alone do not change a design task
into backend verification or debugging. Explicit debugging/API/verification tasks
and exact catalog IDs retain their own workflow. Requested Scroll Craft reference
review uses `ecc-scroll-craft/ecc/scroll-craft-dashboard-review` via the shared
suite, underneath this workflow; its upstream scripts and marketing engine stay inactive.
Optional asset requests use `ecc-higgsfield/ecc/higgsfield-frontend-assets` under
this same primary workflow. Provider access and cost need separate authorization;
generated assets never establish risk data or authenticated UI correctness.

For UI component/layout changes, require the source-bound specification and D-only before/after desktop/mobile screenshot, video and trace bundle described in [the existing browser workflow](../../agent-tooling/skills/seabridge-browser-autonomy/SKILL.md). Inspect playback and protected layout/copy/tokens. Missing or stale evidence fails the affected UI acceptance; anonymous captures do not prove authenticated behavior. Keep the review scoped to the requested change.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
