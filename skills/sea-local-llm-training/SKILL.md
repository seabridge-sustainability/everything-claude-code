---
name: sea-local-llm-training
description: SeaBridgeAI local LLM fine-tuning and inference skill for Unsloth Studio on RTX 4090 Laptop â€” covers dataset prep, LoRA training, smoke tests, and routing AI agents to the local endpoint.
---

# sea-local-llm-training

## Purpose

Set up, validate, and use local open LLM fine-tuning and inference for SeaBridgeAI sustainability agents without cloud API costs.

## When To Call

Use when fine-tuning an open-access model for a sustainability use case, adding a new local-inference route to an AI agent, running a smoke test, or troubleshooting Unsloth Studio.

## Required Inputs

Target use case (sustainability assistant, LCA, emissions extraction, climate risk, due diligence, procurement, ESG QA, or OpenSeaBridge); base model selection; dataset path (JSONL); VRAM budget check; LOCAL_LLM_ENABLED flag status.

## Expected Outputs

Validated Studio running on port 8888; smoke-test JSONL dataset; LoRA adapter (optional); confirmed inference response from local endpoint; LOCAL_LLM_* vars set in .env (not .env.example).

## Mandatory Verification

Confirm Studio is running and /v1/models returns the target model. Run smoke-test inference and verify non-empty domain-accurate response. Confirm LOCAL_LLM_ENABLED=false in .env unless local routing is intentionally enabled for this session.

## Failure Conditions

Fail if Studio is not running before inference; if LOCAL_LLM_API_KEY is in a committed file; if VRAM budget is exceeded (16 GB limit on RTX 4090 Laptop â€” 14B+ models will OOM during fine-tuning); if training loss is not decreasing; if inference response is empty or contains hallucinated citations.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Local LLMs must meet the same grounding standards as cloud models. Do not use a fine-tuned local model for authoritative sustainability outputs without domain review. Label any local-model outputs as provisional until verified against primary sources.

## Mandatory Pre-Work (read before any training or evaluation task)

Load ALL of the following before writing code or running commands:

1. **Master customization guide**: `ECC/docs/local-llm/sustainability-reinforced-model-customization.md`
   - Covers all 11 sustainability domains, model selection, dataset formats, eval rubric, hallucination prevention.
2. **Training guide**: `ECC/docs/local-llm/sustainability-model-training-with-unsloth.md`
   - Use-case-specific commands, VRAM budget per model, SFT training script template.
3. **Model variables defaults**: `ECC/local-llm/configs/unsloth/model_variables.yaml`
   - Non-secret defaults for all training runs. Override only in the task-specific config file.
4. **Domain dataset template**: `ECC/local-llm/datasets/sustainability/templates/<domain>-template.jsonl`
   - Use the template matching the target sustainability domain as the foundation for training data.
5. **Eval rubric**: `ECC/local-llm/evals/sustainability/sustainability_eval_rubric.md`
   - Scoring criteria. Pass threshold: 0.70 weighted score.

## Smoke Test Gate (mandatory before claiming completion)

Run the smoke test against the running endpoint before marking any training or inference task complete:

```powershell
$VENV = "$env:USERPROFILE\.unsloth\studio\unsloth_studio\Scripts\python.exe"
& $VENV "ECC/local-llm/training/unsloth/run_sustainability_smoke_test.py" --base-url http://127.0.0.1:8888
```

Do not claim completion if any smoke test probe returns `FAIL` or `ERROR`.

## Source Grounding Validation (mandatory before deploying outputs)

Verify outputs meet source grounding requirements per `ECC/local-llm/evals/sustainability/source_grounding_checks.md`:
- Every output field includes `Source: [document] ([publisher, year]). Confidence: [level].`
- Target grounding rate â‰¥ 90% across evaluation set.
- Zero fabricated citations.

## Runtime Reference

- Central guide: `ECC/docs/local-llm/unsloth.md`
- Master customization guide: `ECC/docs/local-llm/sustainability-reinforced-model-customization.md`
- Training guide: `ECC/docs/local-llm/sustainability-model-training-with-unsloth.md`
- Smoke-test dataset: `ECC/local-llm/datasets/sustainability/smoke-test-sustainability.jsonl`
- Dataset templates: `ECC/local-llm/datasets/sustainability/templates/`
- Training scripts: `ECC/local-llm/training/unsloth/`
- Configs: `ECC/local-llm/configs/unsloth/`
- Eval docs: `ECC/local-llm/evals/sustainability/`
- Health check script: `ECC/scripts/check-unsloth.ps1`
- Backend .env keys: LOCAL_LLM_ENABLED, LOCAL_LLM_BASE_URL, LOCAL_LLM_API_KEY, LOCAL_LLM_MODEL

## Startup (Quick Reference)

```powershell
$fe = "C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\unsloth\studio\frontend\dist"
unsloth studio run --model unsloth/Qwen3.5-4B-GGUF:Q4_K_M -p 8888 --frontend $fe
```

## Cross-Agent Compatibility Notes

All coding agents should check LOCAL_LLM_ENABLED before routing to local endpoint. Claude Code dot-sources use-unsloth-claude-code.ps1 for session-scoped ANTHROPIC_BASE_URL. Codex and Gemini use use-unsloth-openai-compatible.ps1.

## Superpowers Adaptation

Adapts Superpowers verification-before-completion and sea-ai-data-integrity for local LLM outputs. Adds VRAM budget and API-key hygiene gates specific to Unsloth Studio on Windows.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
