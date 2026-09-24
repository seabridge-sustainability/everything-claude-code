# QA Issue Taxonomy

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


## Severity Levels

| Severity | Definition | Examples |
|----------|------------|----------|
| **critical** | Blocks a core workflow, causes data loss, or crashes the app | Form submit causes error page, checkout flow broken, data deleted without confirmation |
| **high** | Major feature broken or unusable, no workaround | Search returns wrong results, file upload silently fails, auth redirect loop |
| **medium** | Feature works but with noticeable problems, workaround exists | Slow page load (>5s), form validation missing but submit still works, layout broken on mobile only |
| **low** | Minor cosmetic or polish issue | Typo in footer, 1px alignment issue, hover state inconsistent |

## Categories

### 1. Visual/UI
- Layout breaks (overlapping elements, clipped text, horizontal scrollbar)
- Broken or missing images
- Incorrect z-index (elements appearing behind others)
- Font/color inconsistencies
- Animation glitches (jank, incomplete transitions)
- Alignment issues (off-grid, uneven spacing)
- Dark mode / theme issues

### 2. Functional
- Broken links (404, wrong destination)
- Dead buttons (click does nothing)
- Form validation (missing, wrong, bypassed)
- Incorrect redirects
- State not persisting (data lost on refresh, back button)
- Race conditions (double-submit, stale data)
- Search returning wrong or no results

### 3. UX
- Confusing navigation (no breadcrumbs, dead ends)
- Missing loading indicators (user doesn't know something is happening)
- Slow interactions (>500ms with no feedback)
- Unclear error messages ("Something went wrong" with no detail)
- No confirmation before destructive actions
- Inconsistent interaction patterns across pages
- Dead ends (no way back, no next action)

### 4. Content
- Typos and grammar errors
- Outdated or incorrect text
- Placeholder / lorem ipsum text left in
- Truncated text (cut off without ellipsis or "more")
- Wrong labels on buttons or form fields
- Missing or unhelpful empty states

### 5. Performance
- Slow page loads (>3 seconds)
- Janky scrolling (dropped frames)
- Layout shifts (content jumping after load)
- Excessive network requests (>50 on a single page)
- Large unoptimized images
- Blocking JavaScript (page unresponsive during load)

### 6. Console/Errors
- JavaScript exceptions (uncaught errors)
- Failed network requests (4xx, 5xx)
- Deprecation warnings (upcoming breakage)
- CORS errors
- Mixed content warnings (HTTP resources on HTTPS)
- CSP violations

### 7. Accessibility
- Missing alt text on images
- Unlabeled form inputs
- Keyboard navigation broken (can't tab to elements)
- Focus traps (can't escape a modal or dropdown)
- Missing or incorrect ARIA attributes
- Insufficient color contrast
- Content not reachable by screen reader

## Per-Page Exploration Checklist

For each page visited during a QA session:

1. **Visual scan** Ã¢â‚¬â€ Take annotated screenshot (`snapshot -i -a -o`). Look for layout issues, broken images, alignment.
2. **Interactive elements** Ã¢â‚¬â€ Click every button, link, and control. Does each do what it says?
3. **Forms** Ã¢â‚¬â€ Fill and submit. Test empty submission, invalid data, edge cases (long text, special characters).
4. **Navigation** Ã¢â‚¬â€ Check all paths in/out. Breadcrumbs, back button, deep links, mobile menu.
5. **States** Ã¢â‚¬â€ Check empty state, loading state, error state, full/overflow state.
6. **Console** Ã¢â‚¬â€ Run `console --errors` after interactions. Any new JS errors or failed requests?
7. **Responsiveness** Ã¢â‚¬â€ If relevant, check mobile and tablet viewports.
8. **Auth boundaries** Ã¢â‚¬â€ What happens when logged out? Different user roles?
