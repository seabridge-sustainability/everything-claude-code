# Sustainability Model Training with Unsloth — SeaBridgeAI Guide

> **Scope:** Fine-tuning, evaluation, and local inference of open-access LLMs for
> SeaBridgeAI sustainability use cases.
> **Runtime:** Unsloth Studio (local, RTX 4090 Laptop 16 GB VRAM, CUDA 12.6)
> **Canonical reference:** `ECC/docs/local-llm/unsloth.md`

---

## Use Cases

| # | Agent / Use Case | Recommended Base Model | LoRA Task Type | Key Data |
|---|---|---|---|---|
| 1 | Sustainability QA assistant | Qwen3.5-4B (or 8B) | CAUSAL_LM | ESG report snippets → Q&A pairs |
| 2 | LCA assistant | Qwen3.5-4B | CAUSAL_LM | ecoinvent / SimaPro summaries, impact categories, functional units |
| 3 | Emissions-factor extraction | Qwen3.5-4B | CAUSAL_LM | IPCC AR5/AR6 tables, EPA factors, GHG Protocol appendices |
| 4 | Climate-risk assistant | Qwen3.5-4B or Gemma-4-2B | CAUSAL_LM | TCFD disclosures, NGFS scenario summaries, physical risk reports |
| 5 | Due-diligence assistant | Qwen3.5-4B | CAUSAL_LM | Sustainability policy docs, supplier questionnaires, certifications |
| 6 | Procurement sustainability | Qwen3.5-4B | CAUSAL_LM | Category-level scope 3 emission factors, supplier scorecards |
| 7 | ESG metrics QA | Qwen3.5-4B | CAUSAL_LM | GRI/SASB/CSRD metric definitions, validation rules |
| 8 | OpenSeaBridge skill agent | Gemma-4-2B (fast) | CAUSAL_LM | Consumer-facing sustainability question → structured JSON output |

> **VRAM budget (RTX 4090 Laptop 16 GB):**
> 4B GGUF Q4 ≈ 2.5 GB inference / ~6 GB full fine-tune with LoRA
> 8B GGUF Q4 ≈ 5 GB inference / ~12 GB fine-tune — fits but tight
> 14B+ does NOT fit for fine-tuning; GGUF Q4 inference only

---

## Dataset Format

All Unsloth fine-tuning jobs consume **JSONL** (one JSON object per line).

### Instruction-following format (recommended for all use cases)

```jsonl
{"instruction": "What is the GHG Protocol scope 3 Category 11?", "input": "", "output": "Category 11 covers the use of sold products. It includes the direct use-phase emissions from goods and services sold by the reporting company, such as energy consumed by products during their lifetime."}
{"instruction": "Extract the Scope 1 emission factor for natural gas combustion (stationary).", "input": "IPCC 2006 Guidelines, Volume 2, Chapter 2, Table 2.2: Natural gas — Default EF 56.1 kg CO2/GJ, NCV 48 GJ/tonne.", "output": "56.1 kg CO2/GJ (natural gas, stationary combustion, IPCC 2006 Vol.2 Ch.2 Table 2.2)"}
{"instruction": "Summarize the physical climate risk for a coastal logistics asset under NGFS Current Policies.", "input": "Asset: Port terminal, latitude 51.9°N, elevation 2m. Scenario: NGFS Current Policies 2050. Projected sea-level rise: +0.45m P50, +0.78m P95.", "output": "Under NGFS Current Policies by 2050, this coastal terminal faces a P50 sea-level rise of 0.45 m and P95 of 0.78 m. At 2 m elevation, P95 surge events would periodically inundate the site. Recommended: flood barrier assessment and business continuity planning."}
```

### Chat format (alternative — matches Unsloth ChatML template)

```jsonl
{"conversations": [{"role": "user", "content": "What GHG scope covers employee commuting?"}, {"role": "assistant", "content": "Employee commuting falls under Scope 3 Category 7 (Employee Commuting). It includes emissions from the transportation of employees between their homes and their worksites, using any mode of transport not owned or controlled by the company."}]}
```

Choose **instruction format** if your agent uses system-prompt + user-message injection.
Choose **chat format** if your agent passes a full messages array.

---

## Minimal Smoke-Test Dataset

Save as `ECC/docs/local-llm/smoke-test-sustainability.jsonl`:

```jsonl
{"instruction": "What GHG scope covers electricity purchased for office use?", "input": "", "output": "Purchased electricity for office use is Scope 2 — indirect emissions from the generation of purchased or acquired electricity, steam, heat, or cooling consumed by the reporting company."}
{"instruction": "Name three common Scope 3 categories for a manufacturing company.", "input": "", "output": "1. Category 1 — Purchased goods and services (upstream extraction and production of materials). 2. Category 11 — Use of sold products (energy consumed by the product during its lifetime). 3. Category 12 — End-of-life treatment of sold products (landfill, recycling, incineration)."}
{"instruction": "What is a science-based target?", "input": "", "output": "A science-based target is a greenhouse gas reduction target aligned with the level of decarbonisation required to keep global temperature increase below 1.5°C or well-below 2°C above pre-industrial levels, as defined by the Science Based Targets initiative (SBTi)."}
{"instruction": "Convert 1 tonne of natural gas (methane) to CO2-equivalent using GWP100 AR6.", "input": "", "output": "Methane (CH4) has a GWP100 of 27.9 (IPCC AR6). 1 tonne CH4 × 27.9 = 27.9 tonnes CO2e. Note: if the source is fossil, add the oxidation CO2 component separately (44/16 × fossil carbon fraction × mass)."}
{"instruction": "What is the difference between physical and transition climate risk?", "input": "", "output": "Physical risk arises from the direct impacts of climate change: acute events (floods, storms, wildfires) and chronic shifts (rising temperatures, sea-level rise). Transition risk arises from the shift to a low-carbon economy: policy changes (carbon pricing, regulations), technology shifts (renewables displacing fossil assets), and market/reputational changes."}
```

---

## Sample Fine-Tuning Command

> **Do not run a long training job without explicit approval.** The smoke test below uses 5 examples × 1 epoch — takes ~2 minutes on RTX 4090.

```powershell
# 1. Activate Studio venv
$STUDIO_DIR = "$env:USERPROFILE\.unsloth\studio"
& "$STUDIO_DIR\unsloth_studio\Scripts\python.exe" -c "import unsloth; print(unsloth.__version__)"

# 2. Create minimal fine-tune script (save as train_smoke_test.py)
$trainScript = @'
from unsloth import FastLanguageModel
from datasets import load_dataset
import torch

MODEL = "unsloth/Qwen3.5-4B-GGUF"          # base model (GGUF, quantized)
# For actual LoRA fine-tuning use the full-precision variant:
# MODEL = "unsloth/Qwen2.5-3B"             # smaller, fits easily
MAX_SEQ_LEN = 512
LORA_RANK = 16

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name=MODEL,
    max_seq_length=MAX_SEQ_LEN,
    load_in_4bit=True,
)

model = FastLanguageModel.get_peft_model(
    model,
    r=LORA_RANK,
    target_modules=["q_proj", "v_proj"],
    lora_alpha=16,
    lora_dropout=0,
    bias="none",
    use_gradient_checkpointing="unsloth",
    random_state=42,
)

from trl import SFTTrainer
from transformers import TrainingArguments

dataset = load_dataset("json", data_files="smoke-test-sustainability.jsonl", split="train")

def format_prompt(row):
    return {"text": f"### Instruction:\n{row['instruction']}\n\n### Input:\n{row['input']}\n\n### Response:\n{row['output']}"}

dataset = dataset.map(format_prompt)

trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=MAX_SEQ_LEN,
    args=TrainingArguments(
        output_dir="./smoke_test_output",
        num_train_epochs=1,
        per_device_train_batch_size=1,
        gradient_accumulation_steps=4,
        learning_rate=2e-4,
        fp16=not torch.cuda.is_bf16_supported(),
        bf16=torch.cuda.is_bf16_supported(),
        logging_steps=1,
        save_strategy="no",
        report_to="none",
    ),
)

trainer.train()
model.save_pretrained("./smoke_test_lora")
tokenizer.save_pretrained("./smoke_test_lora")
print("Smoke test training complete — adapter saved to ./smoke_test_lora")
'@
$trainScript | Out-File -Encoding utf8 "train_smoke_test.py"

# 3. Run the smoke test
& "$STUDIO_DIR\unsloth_studio\Scripts\python.exe" train_smoke_test.py
```

> **Note:** GGUF models load for inference only; for LoRA fine-tuning substitute
> `unsloth/Qwen2.5-3B` (full-precision, loads in 4-bit via bitsandbytes).
> The adapter output is ~64 MB; serves via Studio with `--lora` flag.

---

## Sample Inference Command (against running Studio)

Studio must be running first — see `unsloth.md` for startup.

```powershell
$key = [System.Environment]::GetEnvironmentVariable("UNSLOTH_API_KEY", "User")
$body = @{
    model  = "unsloth/Qwen3.5-4B-GGUF:Q4_K_M"
    messages = @(
        @{ role = "system"; content = "You are a sustainability expert. Answer concisely and accurately." }
        @{ role = "user";   content = "What is Scope 3 Category 11?" }
    )
    max_tokens = 200
    stream     = $false
} | ConvertTo-Json -Depth 5

$resp = Invoke-WebRequest `
    -Uri    "http://127.0.0.1:8888/v1/chat/completions" `
    -Method POST `
    -Headers @{ "Authorization" = "Bearer $key"; "Content-Type" = "application/json" } `
    -Body   $body

# Studio always returns SSE — aggregate delta chunks
$lines = $resp.Content -split "`n"
$content = ($lines |
    Where-Object { $_ -match "^data: " -and $_ -notmatch "\[DONE\]" } |
    ForEach-Object {
        try { ($_ -replace "^data: ", "" | ConvertFrom-Json).choices[0].delta.content } catch {}
    }
) -join ""
Write-Host $content
```

### Expected output (example)

```
Category 11 covers the use of sold products. It includes the direct use-phase
emissions from goods and services sold by the reporting company, such as energy
consumed by the product during its lifetime under normal operating conditions.
```

---

## Use-Case Implementation Notes

### 1. Sustainability QA Assistant (`seabridge_ai/ai_agents/`)

- **Data source:** Public ESG reports (GRI index PDFs), CSRD pilot disclosures
- **Prompt template:** System: "You are a sustainability reporting expert..." + User question
- **Integration point:** `seabridge_ai/ai_agents/structured_rag/` — swap LLM client to `LOCAL_LLM_BASE_URL` when `LOCAL_LLM_ENABLED=true`

### 2. LCA Assistant

- **Data source:** SimaPro/OpenLCA exports (CSV), ecoinvent impact summaries
- **Key metrics:** GWP100, cumulative energy demand, water footprint
- **Note:** Fine-tune on unit-process descriptions + impact characterisation summaries

### 3. Emissions-Factor Extraction

- **Data source:** IPCC AR6 Annex II, EPA AP-42, DEFRA conversion factors
- **Output format:** Structured JSON `{factor, unit, source, year, scope}`
- **Integration:** Feed into `app/services/esg_data/` emission calculation pipelines

### 4. Climate Risk Assistant (`seabridge_ai/ai_agents/climate_openaccess/`)

- **Data source:** NGFS scenario narratives, TCFD disclosures, physical risk platform outputs
- **Note:** AlphaGeo is source-of-truth for physical risk scores; use local model for narrative interpretation only

### 5. Due Diligence Assistant

- **Data source:** Supplier sustainability questionnaires, ISO 14001/ISO 26000 texts
- **Integration:** `seabridge_ai/ai_agents/` due diligence pipeline (document intelligence)

### 6. Procurement Sustainability

- **Data source:** Spend category emission factor tables (CEDA/EXIOBASE), supplier scorecards
- **Output:** Scope 3 Category 1 spend-based estimate + improvement recommendations

### 7. ESG Metrics QA

- **Data source:** GRI Standards 2021, SASB industry standards, CSRD ESRS tables
- **Use case:** Validate that a reported figure matches the stated metric definition and unit

### 8. OpenSeaBridge Skill Agent (Gemma-4-2B)

- **Model:** `unsloth/gemma-4-E2B-it-GGUF` (already in HF cache)
- **Output contract:** Structured JSON consumed by `openseabri` frontend — must include `{answer, confidence, sources[]}`
- **Why Gemma-4-2B:** Faster latency for consumer-facing queries; 2B fits in ~1.5 GB VRAM

---

## Validation Checklist (Post Training)

```
[ ] Smoke test dataset loaded without JSONL parse errors
[ ] Training loss decreasing over 5 examples / 1 epoch
[ ] LoRA adapter saved to ./smoke_test_lora/ (config.json + adapter_model.bin)
[ ] Inference against running Studio returns non-empty text
[ ] Response contains domain-accurate sustainability terminology
[ ] No hallucinated citations (verify any source references exist)
[ ] LOCAL_LLM_ENABLED=false in .env (default — only enable for explicit local routing)
[ ] No secrets in training scripts or output artifacts
[ ] smoke_test_output/ not committed (add to .gitignore if needed)
```

---

## Useful Commands

```powershell
# Check available GGUF models in HF cache
ls $env:USERPROFILE\.cache\huggingface\hub | Select-Object Name

# Start Studio with Gemma-4-2B for OpenSeaBridge
$fe = "C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\unsloth\studio\frontend\dist"
unsloth studio run --model unsloth/gemma-4-E2B-it-GGUF:Q4_K_M -p 8888 --frontend $fe

# Start Studio with Qwen3.5-4B (default sustainability agents)
unsloth studio run --model unsloth/Qwen3.5-4B-GGUF:Q4_K_M -p 8888 --frontend $fe

# Check Studio health + loaded models
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-unsloth.ps1
```

---

## Related Files

| File | Purpose |
|------|---------|
| `ECC/docs/local-llm/unsloth.md` | Central Unsloth setup, startup, troubleshooting |
| `ECC/docs/local-llm/smoke-test-sustainability.jsonl` | Minimal 5-example dataset |
| `ECC/.claude/skills/sea-local-llm-training/SKILL.md` | Sea-skill for local LLM training |
| `manageesg-backend/.env` | Real `LOCAL_LLM_*` credentials (gitignored) |
| `manageesg-backend/.env.example` | Safe placeholder template |
| `manageesg-backend/app/core/config.py` | `LOCAL_LLM_*` Pydantic settings |

---

*Last updated: 2026-05-06 — Smoke test confirmed on RTX 4090 Laptop (Qwen3.5-4B-GGUF, 95 tok/s)*
