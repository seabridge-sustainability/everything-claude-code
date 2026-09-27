---
name: executing-plans
description: Local wrapper for upstream Superpowers executing-plans. Use when the Superpowers executing-plans methodology is requested directly in SeaBridgeAI; load the canonical local reference at vendor\superpowers\skills\executing-plans\SKILL.md and preserve SeaBridgeAI approval gates.
---

# executing-plans

Canonical upstream Superpowers skill:
[vendor/superpowers/skills/executing-plans/SKILL.md](../../vendor/superpowers/skills/executing-plans/SKILL.md)

This is a local wrapper only. Follow the upstream skill body at the relative path above. If the submodule file is unavailable, do not install or fetch it; use the closest maintained SeaBridgeAI/ECC workflow and report that the optional upstream methodology was unavailable. Apply these SeaBridgeAI overrides:

- No GitHub push unless explicitly approved.
- No commit unless explicitly requested.
- No global install or marketplace install unless explicitly approved.
- No paid/live provider call unless explicitly approved.
- No destructive cleanup, branch deletion, repository deletion, database deletion, vector-store deletion, or worktree removal without explicit approval and proof there is no unique unmerged work.
- No fabricated sustainability data. Verify endpoint, database, source, auth, tenant isolation, provenance, units, scenario, timeframe, and missing-data behavior before product claims.

SeaBridgeAI-adapted companion skill, when domain-specific gates matter:
[skills/sea-senior-dev-workflow/SKILL.md](../sea-senior-dev-workflow/SKILL.md)
