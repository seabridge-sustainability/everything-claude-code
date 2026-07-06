---
title: ECC Skill Placement Policy
type: wiki-page
status: draft
source_refs:
  - ../raw/repo-docs/skill-placement-policy.source.md
  - ../../docs/SKILL-PLACEMENT-POLICY.md
created: 2026-07-06
updated: 2026-07-06
confidence: medium
tags:
  - ecc
  - skills
  - provenance
---

ECC separates shipped curated skills from local generated skills. Curated skills
belong under `skills/` and are validated by `scripts/ci/validate-skills.js`.
Learned, imported, and evolved skills belong under user-home runtime paths and
should not be shipped in the repository.

## Key Rules

- Curated skills use `skills/<skill-name>/SKILL.md` and may appear in install
  manifests.
- Learned and imported skills require provenance metadata beside `SKILL.md`.
- Generated roots are treated as local-only and outside install-manifest scope.
- Missing generated-skill folders are treated as empty by health and hook
  scripts.

## Links

- Source record: [[skill-placement-policy.source]]

## Caveats

This page is a concise synthesis for navigation. The authoritative policy
remains `docs/SKILL-PLACEMENT-POLICY.md`.
