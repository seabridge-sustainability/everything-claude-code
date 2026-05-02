---
name: open-design
description: Open Design — open-source alternative to Claude Design. Local-first, BYOK design tool with 31 skills, 129 design systems, 11 coding-agent CLIs.
triggers:
  - /open-design
---

# Open Design

Open-source alternative to Claude Design (Apache-2.0). Local-first, web-deployable,
BYOK at every layer. Auto-detects 11 coding-agent CLIs on PATH (Claude Code, Codex,
Cursor Agent, Gemini CLI, OpenCode, Qwen, Copilot CLI, Hermes, Kimi, Pi, Kiro) and
drives them through a skill-based design workflow.

## When to Use

- Generating design artifacts: landings, dashboards, mobile prototypes, decks, posters
- Producing brand-consistent HTML/CSS from a brief + design system
- Rapid prototyping with curated visual directions (Editorial, Minimal, Warm, Tech, Brutalist)
- Importing and continuing Claude Design export ZIPs locally
- Creating slide decks (magazine-style PPT, product walkthroughs, weekly updates)
- Office/operations documents: PM specs, OKRs, meeting notes, runbooks, invoices

## Architecture

```
Browser (Next.js 16) → Local daemon (Express + SQLite) → Agent CLI spawn
                     → BYOK proxy (OpenAI-compatible, SSRF-blocked)
```

- **Frontend:** Next.js 16 App Router + React 18, Vercel-deployable
- **Daemon:** Express + better-sqlite3, SSE streaming, spawns agent CLIs
- **Storage:** `.od/` directory (SQLite DB + per-project artifact folders)
- **Preview:** Sandboxed iframe via srcdoc + per-skill artifact parser
- **Export:** HTML, PDF, PPTX, ZIP, Markdown

## Quickstart

```bash
cd C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\open-design
corepack enable
corepack pnpm --version   # 10.33.x
pnpm install
pnpm tools-dev run web
```

Requires Node ~24, pnpm 10.33.x. First load auto-creates `.od/` runtime folder.

## Skills (31 built-in)

Two modes: **prototype** (27 — single-page artifacts) and **deck** (4 — swipe presentations).

### Design & Marketing (prototype)
web-prototype, saas-landing, dashboard, pricing-page, docs-page, blog-post,
mobile-app, mobile-onboarding, gamified-app, email-marketing, social-carousel,
magazine-poster, motion-frames, sprite-animation, dating-web, digital-eguide,
wireframe-sketch, critique, tweaks

### Deck
guizang-ppt (default), simple-deck, replit-deck, weekly-update

### Office & Operations (prototype)
pm-spec, team-okrs, meeting-notes, kanban-board, eng-runbook, finance-report,
invoice, hr-onboarding

## Design Systems (129 built-in)

2 hand-authored starters + 70 product systems (Linear, Stripe, Vercel, Airbnb, Tesla,
Notion, Apple, Anthropic, Cursor, Supabase, Figma, etc.) + 57 design skills from
awesome-design-skills. Each uses a 9-section DESIGN.md schema (color, typography,
spacing, layout, components, motion, voice, brand, anti-patterns).

## Visual Directions (5)

When no brand is provided, the agent offers 5 curated directions — each with a
deterministic OKLch palette + font stack:

1. Editorial Monocle
2. Modern Minimal
3. Warm Soft
4. Tech Utility
5. Brutalist Experimental

## Media Generation

- **gpt-image-2** (Azure/OpenAI) for posters, avatars, infographics
- **Seedance 2.0** (ByteDance) for 15s text-to-video / image-to-video
- **HyperFrames** for HTML→MP4 motion graphics
- 93 prompt templates under `prompt-templates/`

## Key Concepts

1. **Agent-agnostic:** doesn't ship an agent — uses yours via PATH detection
2. **Skills are files:** SKILL.md + assets/ + references/ per skill folder
3. **Design Systems are Markdown:** 9-section DESIGN.md, not theme JSON
4. **Discovery-first:** turn-1 question form prevents 80% of redirects
5. **Real filesystem:** agent spawns with cwd in project folder, reads/writes real files
6. **Prompt stack is the product:** composable layers (discovery + identity + design system + skill + metadata)

## Relationship to Other ECC Design Tools

| Tool | Purpose | When to use |
|------|---------|-------------|
| **designlang** | Extract design tokens from live URLs | Reverse-engineering existing sites |
| **Open Design** | Generate design artifacts from briefs | Creating new designs from scratch |
| **gstack `/design-review`** | Visual QA audit | Reviewing implemented UI |
| **gstack `/design-html`** | Production HTML/CSS generation | Polished HTML from design specs |
| **gstack `/design-consultation`** | Product + landscape research | Early-stage design direction |

## Reference

Source: `github.com/nexu-io/open-design` (Apache-2.0)
Local clone: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\open-design\`
Full README: `references/open-design/README.md`
Skills protocol: `references/open-design/docs/skills-protocol.md`
