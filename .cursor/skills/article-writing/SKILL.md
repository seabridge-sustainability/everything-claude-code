---
name: article-writing
description: Write articles, guides, blog posts, tutorials, newsletter issues, and other long-form content in a distinctive voice derived from supplied examples or brand guidance. Use when the user wants polished written content longer than a paragraph, especially when voice consistency, structure, and credibility matter.
origin: ECC
---

# Article Writing

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


Write long-form content that sounds like a real person or brand, not generic AI output.

## When to Activate

- drafting blog posts, essays, launch posts, guides, tutorials, or newsletter issues
- turning notes, transcripts, or research into polished articles
- matching an existing founder, operator, or brand voice from examples
- tightening structure, pacing, and evidence in already-written long-form copy

## Core Rules

1. Lead with the concrete thing: example, output, anecdote, number, screenshot description, or code block.
2. Explain after the example, not before.
3. Prefer short, direct sentences over padded ones.
4. Use specific numbers when available and sourced.
5. Never invent biographical facts, company metrics, or customer evidence.

## Voice Capture Workflow

If the user wants a specific voice, collect one or more of:
- published articles
- newsletters
- X / LinkedIn posts
- docs or memos
- a short style guide

Then extract:
- sentence length and rhythm
- whether the voice is formal, conversational, or sharp
- favored rhetorical devices such as parentheses, lists, fragments, or questions
- tolerance for humor, opinion, and contrarian framing
- formatting habits such as headers, bullets, code blocks, and pull quotes

If no voice references are given, default to a direct, operator-style voice: concrete, practical, and low on hype.

## Banned Patterns

Delete and rewrite any of these:
- generic openings like "In today's rapidly evolving landscape"
- filler transitions such as "Moreover" and "Furthermore"
- hype phrases like "game-changer", "cutting-edge", or "revolutionary"
- vague claims without evidence
- biography or credibility claims not backed by provided context

## Writing Process

1. Clarify the audience and purpose.
2. Build a skeletal outline with one purpose per section.
3. Start each section with evidence, example, or scene.
4. Expand only where the next sentence earns its place.
5. Remove anything that sounds templated or self-congratulatory.

## Structure Guidance

### Technical Guides
- open with what the reader gets
- use code or terminal examples in every major section
- end with concrete takeaways, not a soft summary

### Essays / Opinion Pieces
- start with tension, contradiction, or a sharp observation
- keep one argument thread per section
- use examples that earn the opinion

### Newsletters
- keep the first screen strong
- mix insight with updates, not diary filler
- use clear section labels and easy skim structure

## Quality Gate

Before delivering:
- verify factual claims against provided sources
- remove filler and corporate language
- confirm the voice matches the supplied examples
- ensure every section adds new information
- check formatting for the intended platform
