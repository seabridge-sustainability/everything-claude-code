---
name: provider-fallback-review
description: Use when designing, reviewing, or testing provider/model fallback, timeout, retry, degraded mode, or multi-provider routing for SeaBridgeAI and OpenSeaBri agents.
---

# provider-fallback-review

## Purpose

Ensure provider fallback is resilient, observable, cost-aware, and safe around non-idempotent actions.

## When To Use

- Adding or reviewing fallback providers.
- Changing model routing, retry policy, timeout behavior, or degraded mode.
- Handling OpenRouter, local models, hosted models, Anthropic/OpenAI-compatible APIs, vision, or image generation providers.

## Required Pattern

Use the `_upstream` reference:

`C:\Users\adelm\SeaBridgeAI\_upstream\agent-patterns\provider-fallback\README.md`

## Review Checklist

- Primary provider timeout is enforced.
- Retryable and non-retryable errors are classified.
- Auth, permission, content filter, context length, and invalid request errors do not fallback blindly.
- Fallback is skipped after streamed content or side effects.
- Non-idempotent actions require approval or no retry.
- Trace logs preserve provider, model, error class, elapsed time, and fallback decision.
- Cost tier and capability tags are explicit.
- No provider keys are logged or committed.

## Verification

- Mock timeout, 429, 5xx, auth, context length, and streamed-error cases.
- Verify no live provider call unless explicitly approved.
- Verify degraded-mode user copy is accurate.
