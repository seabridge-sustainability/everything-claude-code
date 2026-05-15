---
name: sea-sustainability-domain-review
description: SeaBridgeAI sustainability-domain review for ESG, GHG accounting, LCA, climate and nature risk, procurement, targets, due diligence, reporting, disclosure, and utility workflows.
---

# sea-sustainability-domain-review

## Purpose

Review domain correctness before demo, beta, production, investor, or export claims.

## When To Call

Use for ESG, GHG, LCA, physical risk, nature risk, procurement, targets, reporting, due diligence, utility, and disclosure workflows.

## Required Inputs

Module or workflow; data sources; calculation assumptions; framework; UI/API/export destination.

## Expected Outputs

Blockers; domain risks; accepted items; required fixes, disclaimers, or source gaps.

## Mandatory Verification

Check units, boundaries, factor sources, scenarios, time horizons, locations, confidence, source documents, reviewer status, and export labels.

## Failure Conditions

Fail if values lack provenance, boundaries are ambiguous, framework mapping is unsupported, AI interpretation appears factual, or missing data is filled with plausible values.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

If source data is absent, the result is incomplete, unavailable, or provisional. Never fabricate sustainability values.

## Cross-Agent Compatibility Notes

All coding agents should run this review before completion claims on sustainability modules, even if they cannot run product tests.

## Local LLM Notes

When the sustainability module uses LOCAL_LLM_ENABLED=true, apply the same domain review gates. Local fine-tuned outputs count as AI interpretation — not verified calculations — unless traced to a primary source. See `sea-local-llm-training` for model selection and output labelling.

## Superpowers Adaptation

Fully embeds Superpowers receiving-code-review rigor and verification-before-completion for domain review.
