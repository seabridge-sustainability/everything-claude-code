---
name: multimodal-agent-design
description: Use when designing or reviewing image input, image generation, generated artifacts, visual explainers, media previews, or multimodal provider routing for SeaBridgeAI/OpenSeaBri agents.
---

# multimodal-agent-design

## Purpose

Keep multimodal agent features safe, artifact-backed, provider-gated, and clear about what is generated versus observed evidence.

## When To Use

- Adding image uploads, image generation, generated asset tracking, or WebUI previews.
- Designing visual climate risk explainers, homeowner guidance, procurement/spec visualization, or sustainability education assets.

## Required Pattern

Use the `_upstream` reference:

`C:\Users\adelm\SeaBridgeAI\_upstream\agent-patterns\multimodal-generation\README.md`

## Design Checklist

- Feature is disabled or test-gated by default.
- Provider readiness and approval gates are explicit.
- Prompt, provider, model, source artifacts, safety labels, and timestamp are stored.
- Generated images are labeled as generated and not observed evidence.
- Reference image paths are restricted to approved artifact roots.
- Base64 payloads are not persisted in chat logs unless required for transport.
- Fallback behavior preserves the original request trace.

## Verification

- Test missing credentials.
- Test unsupported provider.
- Test unsafe reference paths.
- Test artifact sidecar creation.
- Test WebUI preview metadata and safety label display.
