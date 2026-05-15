---
name: sea-backend-api-verification
description: SeaBridgeAI backend and API verification for FastAPI routes, schemas, services, database sources, auth, tenant isolation, provider gates, and frontend contract truth.
---

# sea-backend-api-verification

## Purpose

Prove backend behavior before product or frontend claims.

## When To Call

Use for endpoints, schemas, services, data persistence, integrations, frontend API contracts, and backend reviews.

## Required Inputs

Endpoint path and method; payload; expected response; data source; auth and tenant requirements; frontend caller if any.

## Expected Outputs

Verified route/schema/source/auth status; mismatches; focused tests or curl/pytest commands; blocker list.

## Mandatory Verification

Check router registration, schema compatibility, database writer/reader, auth dependency, tenant scoping, error states, external-call feature gates, and frontend parser shape.

## Failure Conditions

Fail if route is unregistered, schema differs, tenant isolation is absent, data source is unknown, external calls are ungated, or frontend uses hidden mocks as truth.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

LCA, emissions, utilities, targets, physical risk, procurement, due diligence, and reporting responses must include source/provenance/confidence or honest missing/provisional states.

## Cross-Agent Compatibility Notes

All agents should inspect local code and run local tests. Browser agents must still verify network calls and UI state against real routes.

## Superpowers Adaptation

Fully embeds Superpowers verification-before-completion and systematic-debugging for backend truth checks.
