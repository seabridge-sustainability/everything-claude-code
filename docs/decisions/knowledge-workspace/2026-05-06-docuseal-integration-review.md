---
title: DocuSeal Integration Review
date: 2026-05-06
tags:
  - seabridge/integrations
  - docuseal
  - document-execution
recommendation: partial-integration
---

<!-- markdownlint-disable MD025 -->

> Moved 2026-09-28 from the SeaBridgeAI Obsidian knowledge workspace (`Knowledge Management/DocuSeal Integration Review.md`), which is not version-controlled. Content is unchanged; `[[wikilinks]]` name notes in that workspace. Dated record: do not rewrite; supersede it with a newer decision.

# DocuSeal Integration Review

Recommendation: partial integration. Use DocuSeal as a separately deployed,
self-hosted document execution and e-signature service. SeaBridgeAI should
integrate through backend service abstractions and OpenSeaBri should consume
only the backend proxy/helpers. Do not vendor DocuSeal code into backend or
OpenSeaBri runtime.

## Reviewed Source

- Upstream clone: `C:\Users\adelm\SeaBridgeAI\_upstream\docuseal`
- Commit reviewed: `744d45d2c588d3d610c284190cb6a8a5f158ee0b`
- License: AGPL-3.0 with Section 7(b) additional attribution terms.
- Stack: Ruby on Rails, Vue, Hotwire/Turbo, ActiveStorage, Sidekiq-style jobs,
  Docker, Postgres/MySQL/SQLite support.

## Fit

DocuSeal is useful for:

- ESG engagement letters and consulting agreements.
- Supplier onboarding and sustainability attestations.
- Due diligence, LCA, carbon project, and compliance acknowledgements.
- OpenSeaBri contractor approvals, emergency authorization forms, homeowner
  acknowledgements, property inspection signoffs, and insurance/FEMA support
  documents.

Use it to supplement or replace DocuSign/PandaDoc only after legal review of
AGPL obligations, e-signature enforceability requirements, and production
retention policy.

## Implementation Boundary

- Backend owns provider integration, feature flags, webhook validation, status
  synchronization, and storage references.
- OpenSeaBri builds simple mobile-first recovery signing requests and calls the
  backend proxy.
- Signed PDFs must not be committed. Store provider IDs and immutable storage
  references such as `docuseal://submissions/{id}`.

## Security Notes

- API auth uses `X-Auth-Token`.
- Webhooks can include configured secret headers; SeaBridgeAI requires a
  shared secret header before accepting events.
- Public signing links should be treated as sensitive PII-bearing URLs.
- Keep DocuSeal behind HTTPS, with backups for Postgres and object storage.
- Live OpenSeaBri send requires an approval token; helpers default to dry-run.

## Production Recommendation

Run one centralized DocuSeal instance for SeaBridgeAI and OpenSeaBri with
separate folders/templates/external IDs per product and tenant. Prefer upstream
Docker image or pinned upstream checkout. Fork only if branding or compliance
changes require code modifications, because AGPL source-offer obligations apply
to modified network deployments.
