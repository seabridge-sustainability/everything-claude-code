---
name: docuseal
description: Use when adding or reviewing SeaBridgeAI document execution, e-signature, DocuSeal templates, signing requests, webhook handling, or signed-document storage references.
origin: SeaBridgeAI
---

# DocuSeal Integration Skill

Use DocuSeal as an external self-hosted service, not as vendored app logic.

## Rules

- Keep all reusable integration logic in `manageesg-backend` service wrappers.
- Keep OpenSeaBri helpers thin and mobile-first; they should call the backend
  proxy and default to dry-run.
- Never commit API tokens, signed PDFs, signing links, or private document
  contents.
- Store provider IDs and storage references, not signed binary payloads.
- Require webhook secret validation before accepting status updates.
- Live send workflows require explicit approval because emails/SMS can be sent.

## Backend Entry Points

```powershell
# Dry-run a signing request through the backend API.
POST /api/v1/document-execution/requests

# Status sync by provider submission id.
GET /api/v1/document-execution/requests/{provider_submission_id}

# DocuSeal webhook ingestion.
POST /api/v1/document-execution/webhooks/docuseal
```

## OpenSeaBri Entry Points

```typescript
buildRecoveryDocumentRequest(...)
createDocumentExecutionRequest(...)
summarizeDocumentStatus(...)
```

## Environment

```dotenv
DOCUMENT_EXECUTION_ENABLED=false
DOCUSEAL_BASE_URL=
DOCUSEAL_API_TOKEN=
DOCUSEAL_WEBHOOK_SECRET=
DOCUSEAL_TIMEOUT_SECONDS=20
```

## Production Shape

Prefer one centralized DocuSeal instance with separate template folders,
external IDs, and metadata per product/tenant. Use upstream Docker/pinned
checkout. Fork only after legal review of AGPL obligations.
