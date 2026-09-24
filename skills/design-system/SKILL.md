---
name: design-system
description: Use this skill to generate or audit design systems, check visual consistency, and review PRs that touch styling. Use when generating or auditing a design system, checking visual consistency, or reviewing a PR that touches styling.
metadata:
  origin: ECC
---

# Design System Ã¢â‚¬â€ Generate & Audit Visual Systems

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


## When to Use

- Starting a new project that needs a design system
- Auditing an existing codebase for visual consistency
- Before a redesign Ã¢â‚¬â€ understand what you have
- When the UI looks "off" but you can't pinpoint why
- Reviewing PRs that touch styling

## How It Works

### Mode 1: Generate Design System

Analyzes your codebase and generates a cohesive design system:

```
1. Scan CSS/Tailwind/styled-components for existing patterns
2. Extract: colors, typography, spacing, border-radius, shadows, breakpoints
3. Research 3 competitor sites for inspiration (via browser MCP)
4. Propose a design token set (JSON + CSS custom properties)
5. Generate DESIGN.md with rationale for each decision
6. Create an interactive HTML preview page (self-contained, no deps)
```

Output: `DESIGN.md` + `design-tokens.json` + `design-preview.html`

### Mode 2: Visual Audit

Scores your UI across 10 dimensions (0-10 each):

```
1. Color consistency Ã¢â‚¬â€ are you using your palette or random hex values?
2. Typography hierarchy Ã¢â‚¬â€ clear h1 > h2 > h3 > body > caption?
3. Spacing rhythm Ã¢â‚¬â€ consistent scale (4px/8px/16px) or arbitrary?
4. Component consistency Ã¢â‚¬â€ do similar elements look similar?
5. Responsive behavior Ã¢â‚¬â€ fluid or broken at breakpoints?
6. Dark mode Ã¢â‚¬â€ complete or half-done?
7. Animation Ã¢â‚¬â€ purposeful or gratuitous?
8. Accessibility Ã¢â‚¬â€ contrast ratios, focus states, touch targets
9. Information density Ã¢â‚¬â€ cluttered or clean?
10. Polish Ã¢â‚¬â€ hover states, transitions, loading states, empty states
```

Each dimension gets a score, specific examples, and a fix with exact file:line.

### Mode 3: AI Slop Detection

Identifies generic AI-generated design patterns:

```
- Gratuitous gradients on everything
- Purple-to-blue defaults
- "Glass morphism" cards with no purpose
- Rounded corners on things that shouldn't be rounded
- Excessive animations on scroll
- Generic hero with centered text over stock gradient
- Sans-serif font stack with no personality
```

## Examples

**Generate for a SaaS app:**
```
/design-system generate --style minimal --palette earth-tones
```

**Audit existing UI:**
```
/design-system audit --url http://localhost:3000 --pages / /pricing /docs
```

**Check for AI slop:**
```
/design-system slop-check
```
