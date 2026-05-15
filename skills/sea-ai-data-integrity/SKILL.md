---
name: sea-ai-data-integrity
description: SeaBridgeAI AI data-integrity and hallucination-prevention skill for sustainability agents, RAG, prompts, reports, calculations, exports, and assistant UI outputs.
---

# sea-ai-data-integrity

## Purpose

Prevent AI outputs from fabricating, overstating, or laundering sustainability facts.

## When To Call

Use for AI agents, assistants, prompts, RAG, generated reports, calculations, advisor outputs, exports, and AI UI text.

## Required Inputs

AI output surface; allowed sources; retrieval/tool path; schema; destination; missing-data rules.

## Expected Outputs

Grounding assessment; source/citation/confidence requirements; missing-data behavior; hallucination-risk fixes or tests.

## Mandatory Verification

Trace every factual claim to user input, database records, uploaded docs, deterministic calculations, or verified external sources. Check citations, confidence, units, scenario, geography, and timeframe.

## Failure Conditions

Fail if data is invented, citation is absent for a factual claim, assumptions are hidden, drafts look verified, or AI interpretation is mixed with facts.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Never invent emissions factors, LCA impacts, climate/nature scores, utility data, supplier values, target trajectories, financial values, or due-diligence findings.

## Cross-Agent Compatibility Notes

All agents must prefer unavailable/source missing over plausible filler. Runtime-specific prompt tools do not relax grounding.

## Local LLM Notes

Local models (Unsloth Studio, Qwen3.5-4B, Gemma-4-2B) are subject to identical grounding rules. Label outputs from fine-tuned local models as provisional until reviewed against primary sustainability sources. See `sea-local-llm-training` for setup and inference verification.

## Superpowers Adaptation

Fully embeds Superpowers evidence-over-claims and verification-before-completion for AI output surfaces.
