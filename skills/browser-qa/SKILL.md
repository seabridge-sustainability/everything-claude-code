---
name: browser-qa
description: Use this skill to automate visual testing and UI interaction verification using browser automation after deploying features.
origin: ECC
---

# Browser QA Ã¢â‚¬â€ Automated Visual Testing & Interaction

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## When to Use

- After deploying a feature to staging/preview
- When you need to verify UI behavior across pages
- Before shipping Ã¢â‚¬â€ confirm layouts, forms, interactions actually work
- When reviewing PRs that touch frontend code
- Accessibility audits and responsive testing

## How It Works

Uses the browser automation MCP (claude-in-chrome, Playwright, or Puppeteer) to interact with live pages like a real user.

### Phase 1: Smoke Test
```
1. Navigate to target URL
2. Check for console errors (filter noise: analytics, third-party)
3. Verify no 4xx/5xx in network requests
4. Screenshot above-the-fold on desktop + mobile viewport
5. Check Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
```

### Phase 2: Interaction Test
```
1. Click every nav link Ã¢â‚¬â€ verify no dead links
2. Submit forms with valid data Ã¢â‚¬â€ verify success state
3. Submit forms with invalid data Ã¢â‚¬â€ verify error state
4. Test auth flow: login Ã¢â€ â€™ protected page Ã¢â€ â€™ logout
5. Test critical user journeys (checkout, onboarding, search)
```

### Phase 3: Visual Regression
```
1. Screenshot key pages at 3 breakpoints (375px, 768px, 1440px)
2. Compare against baseline screenshots (if stored)
3. Flag layout shifts > 5px, missing elements, overflow
4. Check dark mode if applicable
```

### Phase 4: Accessibility
```
1. Run axe-core or equivalent on each page
2. Flag WCAG AA violations (contrast, labels, focus order)
3. Verify keyboard navigation works end-to-end
4. Check screen reader landmarks
```

## Output Format

```markdown
## QA Report Ã¢â‚¬â€ [URL] Ã¢â‚¬â€ [timestamp]

### Smoke Test
- Console errors: 0 critical, 2 warnings (analytics noise)
- Network: all 200/304, no failures
- Core Web Vitals: LCP 1.2s Ã¢Å“â€œ, CLS 0.02 Ã¢Å“â€œ, INP 89ms Ã¢Å“â€œ

### Interactions
- [Ã¢Å“â€œ] Nav links: 12/12 working
- [Ã¢Å“â€”] Contact form: missing error state for invalid email
- [Ã¢Å“â€œ] Auth flow: login/logout working

### Visual
- [Ã¢Å“â€”] Hero section overflows on 375px viewport
- [Ã¢Å“â€œ] Dark mode: all pages consistent

### Accessibility
- 2 AA violations: missing alt text on hero image, low contrast on footer links

### Verdict: SHIP WITH FIXES (2 issues, 0 blockers)
```

## Integration

Works with any browser MCP:
- `mChild__claude-in-chrome__*` tools (preferred Ã¢â‚¬â€ uses your actual Chrome)
- Playwright via `mcp__browserbase__*`
- Direct Puppeteer scripts

Pair with `/canary-watch` for post-deploy monitoring.
