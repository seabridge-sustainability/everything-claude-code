---
name: sea-integration-health-review
description: Review SeaBridgeAI integration-hub/sync-engine changes for tenant scoping, credential safety, and sync-history visibility.
---

# sea-integration-health-review

## Purpose

Keep third-party integration sync behavior (`app/services/integration/sync_engine.py`,
`app/api/v1/endpoints/integration_hub.py`, `IntegrationConnection`,
`IntegrationSyncRun`) tenant-safe and observable as new providers are
added.

## When To Call

Before adding a new integration provider, changing sync-trigger logic, or
touching credential resolution for an integration connection.

## Required Inputs

The provider/connection type being added or changed.

## Expected Outputs

A pass/fail check against the invariants below, with `file:line`.

## Mandatory Verification

1. Every sync run is tenant-scoped (`tenant_id`/`company_id` on both the
   connection and the resulting `IntegrationSyncRun`) and every run
   produces a retrievable history entry -- not just a `last_sync_at`
   timestamp with no per-run record.
2. Failure paths surface a safe, non-leaking error string (e.g.
   `"Sync failed for provider {code}"`), never the raw upstream
   exception text, which can carry credentials or internal URLs.
3. Credential values are never logged, returned in an API response, or
   embedded in a sync-history error message.

## Failure Conditions

Fail if a new sync path skips tenant scoping, skips history logging, or
lets a raw exception message reach a response body or log line.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Synced sustainability data must carry its source connection/provider so
downstream consumers can trace provenance back to the integration.

## Cross-Agent Compatibility Notes

Applies to any coding agent adding or modifying an integration provider.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
