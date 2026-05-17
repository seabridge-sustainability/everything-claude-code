---
name: ubiquitous-language
description: SeaBridgeAI wrapper for Matt Pocock's ubiquitous-language skill. Use to build or update DDD-style domain glossaries, detect terminology drift, and align backend, frontend, APIs, schemas, prompts, analytics, reports, and documentation.
---

# Ubiquitous Language

Use this as a focused supplement to `sea-sustainability-domain-review`,
`sea-ai-data-integrity`, and `sea-cross-repo-handoff`.

ECC vendored reference:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\matt-pocock-skills\skills\deprecated\ubiquitous-language\SKILL.md`

Note: the upstream skill is currently under `deprecated`. SeaBridgeAI keeps it
as an adapted terminology workflow, not as an upstream command dependency.

## Output Location

Prefer the repo-local docs folder:

- `docs/domain-language.md` for domain terminology.
- `docs/ubiquitous-language.md` when a repo already uses that name.

If a repo has an existing terminology or architecture glossary, update that
file instead of creating a duplicate.

## Process

1. Inspect existing repo docs, prompts, schemas, models, routes, UI labels, and
   reports before writing.
2. Identify canonical terms, aliases, forbidden terms, and ambiguous terms.
3. Map terms across backend models, frontend labels, API names, database fields,
   AI prompts, analytics, reports, and docs.
4. Add relationships and domain boundaries when useful.
5. Keep glossary entries concise and evidence-backed.
6. Preserve SeaBridgeAI sustainability terminology and do not invent unverified
   product claims.

## Guardrails

- Do not create another source of truth if a glossary already exists.
- Do not rename code or APIs unless explicitly requested.
- For terminology changes that affect behavior, pair with tests and migration or
  compatibility notes.
