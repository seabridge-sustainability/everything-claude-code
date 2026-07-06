# Design System Ã¢â‚¬â€ gstack

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->


## Product Context
- **What this is:** Community website for gstack Ã¢â‚¬â€ a CLI tool that turns Claude Code into a virtual engineering team
- **Who it's for:** Developers discovering gstack, existing community members
- **Space/industry:** Developer tools (peers: Linear, Raycast, Warp, Zed)
- **Project type:** Community dashboard + marketing site

## Aesthetic Direction
- **Direction:** Industrial/Utilitarian Ã¢â‚¬â€ function-first, data-dense, monospace as personality font
- **Decoration level:** Intentional Ã¢â‚¬â€ subtle noise/grain texture on surfaces for materiality
- **Mood:** Serious tool built by someone who cares about craft. Warm, not cold. The CLI heritage IS the brand.
- **Reference sites:** formulae.brew.sh (competitor, but ours is live and interactive), Linear (dark + restrained), Warp (warm accents)

## Typography
- **Display/Hero:** Satoshi (Black 900 / Bold 700) Ã¢â‚¬â€ geometric with warmth, distinctive letterforms (the lowercase 'a' and 'g'). Not Inter, not Geist. Loaded from Fontshare CDN.
- **Body:** DM Sans (Regular 400 / Medium 500 / Semibold 600) Ã¢â‚¬â€ clean, readable, slightly friendlier than geometric display. Loaded from Google Fonts.
- **UI/Labels:** DM Sans (same as body)
- **Data/Tables:** JetBrains Mono (Regular 400 / Medium 500) Ã¢â‚¬â€ the personality font. Supports tabular-nums. Monospace should be prominent, not hidden in code blocks. Loaded from Google Fonts.
- **Code:** JetBrains Mono
- **Loading:** Google Fonts for DM Sans + JetBrains Mono, Fontshare for Satoshi. Use `display=swap`.
- **Scale:**
  - Hero: 72px / clamp(40px, 6vw, 72px)
  - H1: 48px
  - H2: 32px
  - H3: 24px
  - H4: 18px
  - Body: 16px
  - Small: 14px
  - Caption: 13px
  - Micro: 12px
  - Nano: 11px (JetBrains Mono labels)

## Color
- **Approach:** Restrained Ã¢â‚¬â€ amber accent is rare and meaningful. Dashboard data gets the color; chrome stays neutral.
- **Primary (dark mode):** amber-500 #F59E0B Ã¢â‚¬â€ warm, energetic, reads as "terminal cursor"
- **Primary (light mode):** amber-600 #D97706 Ã¢â‚¬â€ darker for contrast against white backgrounds
- **Primary text accent (dark mode):** amber-400 #FBBF24
- **Primary text accent (light mode):** amber-700 #B45309
- **Neutrals:** Cool zinc grays
  - zinc-50: #FAFAFA (lightest)
  - zinc-400: #A1A1AA
  - zinc-600: #52525B
  - zinc-800: #27272A
  - Surface (dark): #141414
  - Base (dark): #0C0C0C
  - Surface (light): #FFFFFF
  - Base (light): #FAFAF9
- **Semantic:** success #22C55E, warning #F59E0B, error #EF4444, info #3B82F6
- **Dark mode:** Default. Near-black base (#0C0C0C), surface cards at #141414, borders at #262626.
- **Light mode:** Warm stone base (#FAFAF9), white surface cards, stone borders (#E7E5E4). Amber accent shifts to amber-600 for contrast.

## Spacing
- **Base unit:** 4px
- **Density:** Comfortable Ã¢â‚¬â€ not cramped (not Bloomberg Terminal), not spacious (not a marketing site)
- **Scale:** 2xs(2px) xs(4px) sm(8px) md(16px) lg(24px) xl(32px) 2xl(48px) 3xl(64px)

## Layout
- **Approach:** Grid-disciplined for dashboard, editorial hero for landing page
- **Grid:** 12 columns at lg+, 1 column at mobile
- **Max content width:** 1200px (6xl)
- **Border radius:** sm:4px, md:8px, lg:12px, full:9999px
  - Cards/panels: lg (12px)
  - Buttons/inputs: md (8px)
  - Badges/pills: full (9999px)
  - Skill bars: sm (4px)

## Motion
- **Approach:** Minimal-functional Ã¢â‚¬â€ only transitions that aid comprehension. The dashboard's live feed IS the motion.
- **Easing:** enter(ease-out / cubic-bezier(0.16,1,0.3,1)) exit(ease-in) move(ease-in-out)
- **Duration:** micro(50-100ms) short(150ms) medium(250ms) long(400ms)
- **Animated elements:** live feed dot pulse (2s infinite), skill bar fill (600ms ease-out), hover states (150ms)

## Grain Texture
Apply a subtle noise overlay to the entire page for materiality:
- Dark mode: opacity 0.03
- Light mode: opacity 0.02
- Use SVG feTurbulence filter as a CSS background-image on body::after
- pointer-events: none, position: fixed, z-index: 9999

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-21 | Initial design system | Created by /design-consultation. Industrial aesthetic, warm amber accent, Satoshi + DM Sans + JetBrains Mono. |
| 2026-03-21 | Light mode amber-600 | amber-500 too bright/washed against white; amber-700 too brown/umber. amber-600 is the sweet spot. |
| 2026-03-21 | Grain texture | Adds materiality to flat dark surfaces. Prevents the "generic SaaS template" sameness. |
