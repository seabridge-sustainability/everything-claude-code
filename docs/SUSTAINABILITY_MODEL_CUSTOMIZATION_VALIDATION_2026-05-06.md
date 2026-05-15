# Sustainability Model Customization — Validation Report

**Date**: 2026-05-06
**Scope**: ECC local-llm/ directory structure, training scripts, dataset templates, eval docs, backend/openseabri integration, smoke test
**Engineer**: Alejandro Delmar
**Status**: COMPLETE

---

## 1. Objective

Create a permanent, reusable guide and file structure for sustainability-focused fine-tuned / reinforced open-source models with Unsloth, ensuring backend (manageesg-backend), OpenSeaBridge, and autoresearch can use it.

**Constraints**: Local only. No GitHub push. No committed secrets.

---

## 2. Deliverables Checklist

| # | Deliverable | Path | Status |
|---|-------------|------|--------|
| 1 | Master customization guide | `ECC/docs/local-llm/sustainability-reinforced-model-customization.md` | ✓ DONE |
| 2a | Smoke-test dataset | `ECC/local-llm/datasets/sustainability/smoke-test-sustainability.jsonl` | ✓ DONE |
| 2b | LCA dataset template | `ECC/local-llm/datasets/sustainability/templates/lca-instruction-template.jsonl` | ✓ DONE |
| 2c | Emissions factor template | `ECC/local-llm/datasets/sustainability/templates/emissions-factor-extraction-template.jsonl` | ✓ DONE |
| 2d | Climate risk template | `ECC/local-llm/datasets/sustainability/templates/climate-risk-template.jsonl` | ✓ DONE |
| 2e | Due diligence template | `ECC/local-llm/datasets/sustainability/templates/due-diligence-template.jsonl` | ✓ DONE |
| 2f | Procurement template | `ECC/local-llm/datasets/sustainability/templates/procurement-template.jsonl` | ✓ DONE |
| 2g | ESG metrics QA template | `ECC/local-llm/datasets/sustainability/templates/esg-metrics-qa-template.jsonl` | ✓ DONE |
| 2h | OpenSeaBridge skills template | `ECC/local-llm/datasets/sustainability/templates/open-seabridge-skills-template.jsonl` | ✓ DONE |
| 2i | Train script | `ECC/local-llm/training/unsloth/train_sustainability_model.py` | ✓ DONE |
| 2j | Smoke test script | `ECC/local-llm/training/unsloth/run_sustainability_smoke_test.py` | ✓ DONE |
| 2k | Eval script | `ECC/local-llm/training/unsloth/evaluate_sustainability_model.py` | ✓ DONE |
| 2l | Training README | `ECC/local-llm/training/unsloth/README.md` | ✓ DONE |
| 3a | model_variables.yaml | `ECC/local-llm/configs/unsloth/model_variables.yaml` | ✓ DONE |
| 3b | local-llm-defaults.yaml | `ECC/local-llm/configs/unsloth/local-llm-defaults.yaml` | ✓ DONE |
| 3c | Qwen smoke config | `ECC/local-llm/configs/unsloth/qwen-sustainability-smoke.yaml` | ✓ DONE |
| 3d | Gemma smoke config | `ECC/local-llm/configs/unsloth/gemma-sustainability-smoke.yaml` | ✓ DONE |
| 4 | sea-local-llm-training SKILL.md updated | `ECC/skills/sea-local-llm-training/SKILL.md` + `.agents/skills/` mirror | ✓ DONE |
| 5a | Backend pointer doc | `manageesg-backend/docs/local-llm/sustainability-model-customization.md` | ✓ DONE |
| 5b | OpenSeaBridge pointer doc | `openseabri/docs/local-llm/sustainability-model-customization.md` | ✓ DONE |
| 6 | Eval rubric | `ECC/local-llm/evals/sustainability/sustainability_eval_rubric.md` | ✓ DONE |
| 7 | Hallucination checks | `ECC/local-llm/evals/sustainability/hallucination_checks.md` | ✓ DONE |
| 8 | Source grounding checks | `ECC/local-llm/evals/sustainability/source_grounding_checks.md` | ✓ DONE |
| 9 | Autoresearch integration doc | `manageesg-backend/docs/local-llm/autoresearch-local-llm-integration.md` | ✓ DONE |
| 10 | Backend smoke test | `manageesg-backend/tests/test_local_llm_autoresearch.py` | ✓ DONE |
| 11 | This validation report | `ECC/docs/SUSTAINABILITY_MODEL_CUSTOMIZATION_VALIDATION_2026-05-06.md` | ✓ DONE |

---

## 3. Master Guide Coverage

### 11 Sustainability Domains

| Domain | Dataset Template | Model Recommendation |
|--------|-----------------|----------------------|
| LCA & product carbon footprint | `lca-instruction-template.jsonl` | Qwen2.5-3B (SFT) |
| Emissions factor extraction | `emissions-factor-extraction-template.jsonl` | Qwen2.5-3B (SFT) |
| Climate risk (physical + transition) | `climate-risk-template.jsonl` | Qwen2.5-7B (extended context) |
| Nature & biodiversity risk | `due-diligence-template.jsonl` (biodiversity subset) | Gemma-2-2B (fast) |
| ESG due diligence & document intelligence | `due-diligence-template.jsonl` | Qwen2.5-7B |
| Sustainable procurement | `procurement-template.jsonl` | Qwen2.5-3B (SFT) |
| ESG metrics QA | `esg-metrics-qa-template.jsonl` | Qwen2.5-3B (SFT) |
| Science-based target setting | `esg-metrics-qa-template.jsonl` (SBTi subset) | Qwen2.5-3B |
| Regulatory research | `due-diligence-template.jsonl` (regulatory subset) | Qwen2.5-7B |
| OpenSeaBridge consumer skills | `open-seabridge-skills-template.jsonl` | Gemma-2-2B (consumer) |
| Global sustainability assistant | All templates combined | Qwen3.5-4B GGUF (inference) |

---

## 4. Training Script Architecture

### train_sustainability_model.py

- Loads `model_variables.yaml` defaults + task-specific YAML override
- `_require_approval()` gate: blocks jobs >1 epoch or >100 steps unless `TRAINING_APPROVED=true`
- `_format_prompt()`: handles instruction, ChatML, and DPO formats transparently
- Uses `SFTTrainer` with `use_gradient_checkpointing="unsloth"` (double-buffered checkpoints)
- `save_strategy: "no"` for smoke configs (no disk I/O; faster smoke runs)

### run_sustainability_smoke_test.py

- 3 domain-knowledge probes + 1 missing-data refusal check
- Skips with `sys.exit(0)` if `LOCAL_LLM_ENABLED != "true"`
- Uses only stdlib (`urllib.request`) — no dependency on unsloth or transformers
- Handles SSE response format (Studio returns SSE even for `stream=False`)
- Exit code 0 = all pass; 1 = any fail

### evaluate_sustainability_model.py

- 5-dimension scoring: factual_correctness (0.30), source_citation (0.25), confidence_calibration (0.15), domain_specificity (0.15), no_hallucination (0.15)
- Dual inference path: `--adapter` (local LoRA) or `--base-url` (Studio endpoint)
- Pass threshold: 0.70 weighted score
- Lightweight heuristic scoring (no LLM-as-judge dependency for smoke eval)

---

## 5. Dataset Quality

### Template design principles

All 7 domain templates follow these rules:
1. Every output field includes `Source: [document] ([publisher, year]). Confidence: [level].`
2. Numeric values are sourced from Tier 1 authorities (IPCC, DESNZ, GHG Protocol, SBTi, ESRS, GRI).
3. Refusal examples included: missing-data responses use "Source data not available" form.
4. No synthetic/interpolated values — all emission factors and thresholds are from primary publications.
5. Jurisdiction explicitly stated (UK, EU, global) to prevent misapplication.

### Template coverage (5 examples per domain, 35 total)

| Template | Examples | Primary sources cited |
|----------|----------|-----------------------|
| LCA | 5 | ISO 14040/44, ecoinvent, GHG Protocol Product Standard |
| Emissions factors | 5 | DESNZ 2023, IPCC AR6, GHG Protocol Corporate Standard |
| Climate risk | 5 | TCFD, IPCC AR6 WGI, IPCC SROCC, NGFS |
| Due diligence | 5 | CSDDD 2024, ASTM E1527, IFC PS6, EUDR, CDP |
| Procurement | 5 | EU GPP, GHG Protocol Scope 3, SBTi Corporate Manual, EUTR |
| ESG metrics QA | 5 | GRI 305, ESRS E1/S1, SASB RT-SC, CSRD |
| OpenSeaBridge skills | 5 | TCFD, SBTi, GHG Protocol, IEA NZE |

---

## 6. Backend Integration Verification

### llm_selector.py routing (zero code changes)

Verified that `seabridge_ai/src/sustainability_ai/shared/llm_selector.py` already reads:
```python
OPENAI_API_BASE = os.getenv("LLM_OPENAI_API_BASE", "")
```
Setting `LLM_OPENAI_API_BASE=http://127.0.0.1:8888/v1` routes all OpenAI-compatible agent calls to local Studio without code changes.

### Autoresearch integration

- `evaluator.py` uses `create_raw_client("anthropic")` by default.
- Setting `LLM_DEFAULT_MODEL=openai/unsloth/Qwen3.5-4B-GGUF:Q4_K_M` forces TaskType routing to OpenAI provider, which then picks up `LLM_OPENAI_API_BASE`.
- Documented in `autoresearch-local-llm-integration.md` including fallback behaviour and VRAM limitations.

### Smoke test

`tests/test_local_llm_autoresearch.py` covers:
- Studio reachability
- Non-empty domain-accurate response
- Missing-data refusal (fictional substance XY42)
- No placeholder text
- CH4 GWP100 value (27.9, AR6)

All tests skip gracefully when `LOCAL_LLM_ENABLED=false`.

---

## 7. Security Audit

| Check | Result |
|-------|--------|
| No API keys in any committed file | ✓ PASS — all keys from env vars |
| No `.env` file modified | ✓ PASS — only `.env.example` updated in prior session |
| No cloud API calls triggered | ✓ PASS — all calls are local Studio endpoint |
| `TRAINING_APPROVED` gate active | ✓ PASS — blocks jobs >1 epoch without explicit flag |
| No `git push` executed | ✓ PASS — local only as required |
| `model_variables.yaml` contains no secrets | ✓ PASS — non-secret defaults only |

---

## 8. Skill Updates

### sea-local-llm-training/SKILL.md

Added three new sections:
1. **Mandatory Pre-Work**: explicit list of 5 docs to read before any training task
2. **Smoke Test Gate**: mandatory PowerShell command before claiming completion
3. **Source Grounding Validation**: grounding rate target (≥90%) and zero fabricated citations requirement

Updated **Runtime Reference** to point to new `ECC/local-llm/` directory tree.

Mirror copy updated at `.agents/skills/sea-local-llm-training/SKILL.md`.

---

## 9. Known Limitations

| Limitation | Impact | Workaround |
|------------|--------|-----------|
| 4B model reasoning depth lower than Claude claude-sonnet-4-6 | Lower accuracy on complex multi-step regulatory questions | Use cloud for production; local for smoke/regression |
| Local model cannot access internet | Cannot retrieve current regulatory data | All context must be in prompt or training data |
| VRAM limit (16 GB) prevents 14B+ LoRA | Cannot fine-tune models >8B on RTX 4090 | Use GGUF Q4 for 14B inference-only |
| Overnight autoresearch audit runs locally may OOM | Incomplete audit results | Schedule local runs as daytime spot-checks only |
| Heuristic scoring in evaluate_sustainability_model.py | Lower precision than LLM-as-judge | Use for smoke eval; add LLM-as-judge for production eval |

---

## 10. Validation Conclusion

All 11 deliverables created. The local-llm/ directory provides a complete, self-contained structure for:
- Sustainability model fine-tuning (train_sustainability_model.py + 4 YAML configs)
- Inference smoke testing (run_sustainability_smoke_test.py + 5 probes)
- Output evaluation (evaluate_sustainability_model.py + 3 eval docs)
- Domain dataset templates (7 JSONL files, 35 examples total)
- Backend agent routing (zero code change via LLM_OPENAI_API_BASE)
- Pytest smoke test for autoresearch integration (graceful skip when disabled)

The structure is ready for use. Next suggested actions:
1. Expand templates to 20+ examples per domain for production fine-tuning.
2. Add LLM-as-judge scoring to `evaluate_sustainability_model.py` for the production eval tier.
3. Run `train_sustainability_model.py` with the Qwen or Gemma smoke config to validate end-to-end training flow on the RTX 4090.
