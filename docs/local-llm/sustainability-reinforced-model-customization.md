# Sustainability-Reinforced Model Customization — SeaBridgeAI Master Guide

> **Scope:** Creating sustainability-focused custom LLMs using Unsloth for all SeaBridgeAI
> agent surfaces. Covers instruction tuning, preference/RLHF data, evaluation, hallucination
> prevention, source grounding, and production integration.
> **Runtime:** RTX 4090 Laptop 16 GB VRAM, CUDA 12.6, Unsloth Studio 2026.5.2
> **Central training repo:** `ECC/local-llm/`
> **Related:** `ECC/docs/local-llm/unsloth.md` · `ECC/docs/local-llm/sustainability-model-training-with-unsloth.md`

---

## 1. Supported Use Cases

| Domain | Agent Surface | Key Output Contract |
|---|---|---|
| LCA assistant | `ai_agents/` structured RAG | GWP100 / CEd / water footprint values with source reference |
| Emissions-factor extraction | `app/services/esg_data/` | `{factor, unit, scope, source, year}` JSON |
| Climate risk | `ai_agents/climate_openaccess/` | Risk narrative + NGFS scenario label + confidence |
| Nature risk | `ai_agents/` TNFD/LEAP | Risk severity + ecosystem service affected + TNFD pillar |
| Due diligence | `ai_agents/` document intelligence | Policy gap list + certification status |
| Procurement sustainability | `app/services/esg_data/` | Scope 3 Cat. 1 spend-based estimate + improvement recs |
| ESG metrics QA | `ai_agents/` GRI/SASB/CSRD | Metric validation pass/fail + deviation note |
| Target setting / decarbonisation | Strategy generation | Pathway milestones + SBTi alignment flag |
| Regulatory research | Legal/regulatory analysis | Regulation name + jurisdiction + effective date + obligation |
| OpenSeaBridge skills | `openseabri` consumer UI | `{answer, confidence, sources[]}` structured JSON |
| Global sustainability assistant | Conversational / RAG | Concise answer + source attribution + "unknown" when absent |

---

## 2. Model Selection Criteria

| Criterion | Recommendation |
|---|---|
| VRAM ≤ 16 GB (RTX 4090 Laptop) | Use ≤ 8B GGUF Q4 for inference; ≤ 8B full-precision for LoRA fine-tune |
| Fine-tuning base model | `unsloth/Qwen2.5-3B` or `unsloth/Qwen2.5-7B` (full precision, loads in 4bit) |
| Fast consumer inference | `unsloth/gemma-4-E2B-it-GGUF:Q4_K_M` (~1.5 GB, OpenSeaBridge) |
| Sustainability reasoning | `unsloth/Qwen3.5-4B-GGUF:Q4_K_M` (default; best quality / VRAM ratio) |
| 14B+ GGUF | Inference only — will OOM during LoRA fine-tuning at 16 GB |
| Extended context (long reports) | Prefer models with rope_scaling support; set `max_seq_length=4096` |

**Rule:** Always check VRAM headroom with `nvidia-smi` before starting a fine-tune.
Expected VRAM: 4B LoRA ≈ 6 GB, 7B LoRA ≈ 12 GB, 8B LoRA ≈ 14 GB (tight).

---

## 3. Dataset Formats

### 3a. Instruction-Tuning Format (SFT — default)

```jsonl
{
  "instruction": "<task description>",
  "input": "<optional context — leave empty string if none>",
  "output": "<expected model response>"
}
```

**Source-grounded variant** (add `source` and `confidence` fields for traceability):

```jsonl
{
  "instruction": "Extract the Scope 1 emission factor for natural gas combustion.",
  "input": "IPCC 2006 Guidelines Vol.2 Ch.2 Table 2.2: Natural gas, default EF 56.1 kg CO2/GJ.",
  "output": "56.1 kg CO2/GJ",
  "source": "IPCC 2006 Guidelines, Volume 2, Chapter 2, Table 2.2",
  "confidence": "high"
}
```

The `source` and `confidence` fields are metadata — strip them before loading into SFTTrainer
or keep them if your training template injects them into the prompt.

### 3b. Chat Format (ChatML — for conversational agents)

```jsonl
{
  "conversations": [
    {"role": "system",  "content": "You are a sustainability expert. When source data is absent, say 'Source data not available.'"},
    {"role": "user",    "content": "What is the GWP100 of methane per IPCC AR6?"},
    {"role": "assistant","content": "Per IPCC AR6, methane (CH4) has a GWP100 of 27.9 (fossil) and 29.8 (biogenic). Source: IPCC AR6 WGI, Chapter 7, Table 7.SM.7."}
  ]
}
```

### 3c. Preference / DPO Format (for reinforcement / preference training)

Use when you have both a preferred and a rejected response — e.g., a well-cited answer vs.
a hallucinated one:

```jsonl
{
  "prompt": "What is Scope 3 Category 11?",
  "chosen": "Category 11 covers use of sold products: the direct use-phase emissions from goods and services sold by the company. Source: GHG Protocol Corporate Value Chain (Scope 3) Standard, Chapter 13.",
  "rejected": "Category 11 covers packaging materials and waste disposal from the company's operations."
}
```

Unsloth supports DPO training via `trl.DPOTrainer`. Use `task_type: DPO` in config.

---

## 4. Prompt Template

Default Alpaca-style template used across all SFT jobs:

```
### System:
{system_prompt}

### Instruction:
{instruction}

### Input:
{input}

### Response:
{output}
```

For ChatML jobs, Unsloth auto-selects the tokenizer's chat template.

**System prompt for sustainability grounding:**

```
You are a sustainability domain expert trained on peer-reviewed climate science,
GHG accounting standards (GHG Protocol, ISO 14064), life cycle assessment (ISO 14040/44),
TCFD/TNFD frameworks, CSRD/ESRS, SBTi methodology, and sector-specific ESG standards
(GRI, SASB, CDP).

Rules:
1. Always cite the source standard, publication, or dataset for any factual claim.
2. If source data is absent or unclear, respond with "Source data not available" or
   "Insufficient data to provide a reliable estimate" — never fabricate values.
3. State confidence level (high/medium/low) when providing quantitative estimates.
4. Use SI units and standard GHG scope categories (Scope 1, 2, 3 + category).
5. Distinguish between company-reported values (unverified) and third-party verified data.
```

---

## 5. Evaluation Rubric

See `ECC/local-llm/evals/sustainability/sustainability_eval_rubric.md` for the full rubric.

Quick checklist for any fine-tuned sustainability model output:

| Dimension | Weight | Pass Criteria |
|---|---|---|
| Factual correctness | 0.30 | Claim traceable to primary source |
| Source citation | 0.25 | Source named and plausible (year, standard, chapter) |
| Confidence labelling | 0.15 | Confidence stated or implied; not overstated |
| Domain specificity | 0.15 | Uses correct terminology (scope, category, unit, framework) |
| No hallucination | 0.15 | No fabricated citation, invented emission factor, or false regulatory claim |

Minimum passing composite: **0.75 / 1.0**

---

## 6. Hallucination Prevention

### Training-time rules

1. **Include "unknown" examples** — add training examples where the correct answer is
   "Source data not available" or "Insufficient information". Models learn to refuse
   when evidence is absent.
2. **Use source-grounded inputs** — the `input` field should contain the actual source
   text; the `output` should extract or summarise it rather than recall from training.
3. **Negative examples for DPO** — pair hallucinated responses as `rejected` so the model
   is explicitly pushed away from fabrication.

### Inference-time guardrails

1. Set `temperature=0.0` for factual extraction tasks (emissions factors, LCA values).
2. Use `max_tokens` limits appropriate to the task — factual extraction: 200 tokens;
   narrative generation: 1000 tokens.
3. Add a post-processing citation check: verify that any cited standard/year exists in
   your known-good source list.

---

## 7. Source-Grounding Requirements

Every fine-tuned sustainability model output surface must:

1. **Name the source** — standard, publication, database, or uploaded document.
2. **Specify version/year** — e.g. "IPCC AR6", "GHG Protocol 2023", "ecoinvent 3.10".
3. **State geography and time scope** when relevant — e.g. "UK grid, 2023".
4. **Flag company-reported vs. verified** — company self-reported data ≠ third-party verified.
5. **Use "unavailable" not "approximately"** — when source is absent, do not interpolate.

---

## 8. Confidence Metadata

Outputs should carry one of three confidence labels:

| Label | Meaning |
|---|---|
| `high` | Value directly read from cited primary source |
| `medium` | Derived from primary source with known assumptions; assumptions stated |
| `low` | Estimated using secondary proxy or interpolation; basis stated |
| `unavailable` | Source data absent; cannot provide reliable value |

Embed confidence in the output field of training data so the model learns the convention:

```
"56.1 kg CO2/GJ [confidence: high | source: IPCC 2006 Vol.2 Ch.2 Table 2.2]"
```

---

## 9. Expected Directory Structure

```
ECC/local-llm/
├── datasets/
│   └── sustainability/
│       ├── smoke-test-sustainability.jsonl          # 5-example quick test
│       └── templates/
│           ├── lca-instruction-template.jsonl
│           ├── emissions-factor-extraction-template.jsonl
│           ├── climate-risk-template.jsonl
│           ├── due-diligence-template.jsonl
│           ├── procurement-template.jsonl
│           ├── esg-metrics-qa-template.jsonl
│           └── open-seabridge-skills-template.jsonl
├── training/
│   └── unsloth/
│       ├── README.md
│       ├── train_sustainability_model.py            # Full LoRA fine-tune
│       ├── run_sustainability_smoke_test.py         # Lightweight inference check
│       └── evaluate_sustainability_model.py         # Score outputs on 5 dimensions
├── configs/
│   └── unsloth/
│       ├── local-llm-defaults.yaml                 # Global non-secret defaults
│       ├── model_variables.yaml                    # Training hyperparams + paths
│       ├── qwen-sustainability-smoke.yaml           # Qwen3.5-4B smoke config
│       └── gemma-sustainability-smoke.yaml          # Gemma-4-2B smoke config
└── evals/
    └── sustainability/
        ├── sustainability_eval_rubric.md
        ├── hallucination_checks.md
        └── source_grounding_checks.md
```

---

## 10. Training Command Template

```powershell
# Prerequisites: Studio NOT required for LoRA training (uses HF transformers directly)
# Activate Studio venv
$VENV = "$env:USERPROFILE\.unsloth\studio\unsloth_studio\Scripts\python.exe"

# Run fine-tune with a named config
& $VENV C:\Users\adelm\SeaBridgeAI\everything-claude-code\local-llm\training\unsloth\train_sustainability_model.py `
    --config C:\Users\adelm\SeaBridgeAI\everything-claude-code\local-llm\configs\unsloth\qwen-sustainability-smoke.yaml

# Or with inline overrides
& $VENV C:\...\train_sustainability_model.py `
    --model unsloth/Qwen2.5-3B `
    --dataset C:\...\local-llm\datasets\sustainability\smoke-test-sustainability.jsonl `
    --output-dir ./output/sustainability-qwen-smoke `
    --epochs 1 `
    --lora-rank 16
```

> **Approval gate:** Do not start a training run longer than 1 epoch / 100 steps without
> explicit written approval from adelmar@seabridgesustainability.com.

---

## 11. Inference Command Template

Studio must be running (see `unsloth.md`).

```powershell
$key  = [System.Environment]::GetEnvironmentVariable("UNSLOTH_API_KEY", "User")
$body = @{
    model    = "unsloth/Qwen3.5-4B-GGUF:Q4_K_M"
    messages = @(
        @{ role = "system"; content = "You are a sustainability expert. When source data is absent, say 'Source data not available.'"}
        @{ role = "user";   content = "What is Scope 3 Category 11?" }
    )
    max_tokens = 300
    stream     = $false
} | ConvertTo-Json -Depth 5

$resp  = Invoke-WebRequest -Uri "http://127.0.0.1:8888/v1/chat/completions" `
    -Method POST `
    -Headers @{ Authorization = "Bearer $key"; "Content-Type" = "application/json" } `
    -Body $body

$lines = $resp.Content -split "`n"
$text  = ($lines |
    Where-Object { $_ -match "^data: " -and $_ -notmatch "\[DONE\]" } |
    ForEach-Object { try { ($_ -replace "^data: " | ConvertFrom-Json).choices[0].delta.content } catch {} }
) -join ""
Write-Host $text
```

---

## 12. Smoke-Test Command

```powershell
# Lightweight — no training required, Studio must be running
$VENV = "$env:USERPROFILE\.unsloth\studio\unsloth_studio\Scripts\python.exe"
& $VENV C:\Users\adelm\SeaBridgeAI\everything-claude-code\local-llm\training\unsloth\run_sustainability_smoke_test.py

# Or via pytest (skips gracefully if LOCAL_LLM_ENABLED=false)
cd C:\Users\adelm\SeaBridgeAI\manageesg-backend
.\venv\Scripts\pytest tests\test_local_llm_autoresearch.py -v --no-cov
```

---

## 13. Validation Checklist

```
[ ] Studio running on port 8888 (check-unsloth.ps1 shows /v1/models OK)
[ ] Smoke test passes: response non-empty, no hallucinated citations
[ ] Training loss decreased over 1 epoch on smoke dataset (5 examples)
[ ] LoRA adapter saved (config.json + adapter_model.bin present)
[ ] Source-grounding metadata present in at least one output
[ ] Confidence label present in at least one output
[ ] "Source data not available" response verified for a missing-data prompt
[ ] LOCAL_LLM_ENABLED=false in .env (default; only enable for explicit local routing)
[ ] No API keys in training scripts, configs, or dataset files
[ ] smoke_test_output/ added to .gitignore
[ ] VRAM headroom verified: nvidia-smi shows < 14 GB used during fine-tune
```

---

## NVIDIA Optimization Notes

Based on the Unsloth/NVIDIA "How to Make LLM Training Faster" guidance:

| Technique | What It Does | Gain | When to Apply |
|---|---|---|---|
| Packed-sequence metadata caching | Cache `cu_seqlens`/`max_seqlen` across batches for variable-length inputs | +14.3% per batch (Qwen3-14B) | All transformer layers; enable via `packing=True` in SFTTrainer |
| Double-buffered checkpoint reloads | Overlap gradient checkpoint recomputation with weight loading | +4.6% to +8.4% (B200, 8B–32B) | Enabled by default in Unsloth's `use_gradient_checkpointing="unsloth"` |
| MoE routing optimization | Replace sort+gather with argsort+bincount for expert dispatch | 10–15% (validated), up to +23% forward | Applies to MoE models; transparent in Unsloth; no user action required |

These optimizations are applied automatically by Unsloth when using `FastLanguageModel`.
No additional flags needed beyond `use_gradient_checkpointing="unsloth"`.

---

*Last updated: 2026-05-06*
