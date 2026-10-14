---
name: higgsfield-frontend-assets
description: Prepare optional SeaBridgeAI brand assets through the installed Higgsfield CLI while preserving provider, data, cost, and D-only evidence boundaries.
---

# Higgsfield frontend assets

Use this as supporting guidance under `sea-frontend-ux-reviewer`, the current
SeaBridge brand handoff, and the active task goal. Shared catalog ID:
`ecc-higgsfield/ecc/higgsfield-frontend-assets`. Compatible agents can read it
through `suite_read_skill` or `node integrations/dev-suite/cli.mjs read <request.json>`.

The relevant upstream CLI is https://github.com/higgsfield-ai/cli. The separate
`higgsfield-ai/higgsfield` repository is a distributed GPU training framework;
do not install it for frontend asset work. The CLI is an optional local executable,
not an ECC dependency or an MCP server. First run `higgsfield --version` to check
availability. A version result does not prove login, credits, API access, or a
successful generation. Do not run `higgsfield auth token` or print credentials.
An account-status request is a live provider call and needs the current owner's
named authorization. Login changes user-level auth configuration and needs its
own authorization. No credential or account state belongs in Git.

## Asset brief and review

1. Name the target route, placement, audience, dimensions, accessibility text,
   accepted source/brand assets, and the visual problem. Prefer existing brand
   images and CSS/component changes for dashboards. Generated media must not
   replace risk evidence, maps, charts, numerical claims, or provenance.
2. Prepare a prompt that follows SeaBridge's approved palette, IBM Plex Sans and
   Recoleta usage, and the actual product context. Remove tenant/client records,
   personal information, credentials, private screenshots, and unpublished data
   before any external upload. Obtain the required data/provider grant if a real
   reference must leave the local machine.
3. Before generation, check the specific model, request count, expected cost,
   account/workspace and the owner's live-provider approval. No generation,
   upload, subscription, purchase or retry is authorized by this skill. If cost
   or authorization is unknown, prepare the brief and stop the provider lane.
4. Keep generated originals, prompt receipts, browser media and bulk candidates
   under `D:/SeaBridgeAI-data/agent-evidence/`; do not fall back to C: or E:.
   Select only reviewed, licensed, optimized deliverables for the frontend repo.
   Record model, date, source/reference rights, prompt revision and human approval
   beside the task evidence without storing tokens or tenant content.
5. Verify the selected asset in the actual frontend at desktop/tablet/mobile,
   200% zoom, dark/light if applicable, reduced motion, and loading/empty states.
   Check alt text, contrast, layout shift and meaningful image fallback with the
   existing D-only Playwright workflow. A provider success URL is not product UI
   proof. Keep all existing auth, data, risk/science and navigation behavior.

CLI availability, local credential presence, live account status, generation,
accepted asset, authenticated browser proof and GitHub publication are separate
claims. Report each honestly. This workflow grants no installation, provider,
payment, data-export, global-config, commit, push or deployment permission.
