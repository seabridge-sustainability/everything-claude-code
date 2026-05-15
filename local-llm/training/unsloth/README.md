# Unsloth Training Scripts — SeaBridgeAI Sustainability Models

## Scripts

| Script | Purpose | Approval required? |
|---|---|---|
| `run_sustainability_smoke_test.py` | Lightweight inference check against running Studio | No |
| `train_sustainability_model.py` | LoRA fine-tune from YAML config | Yes — for jobs > 1 epoch / 100 steps |
| `evaluate_sustainability_model.py` | Score model outputs on 5 sustainability dimensions | No |

## Quick Start

### 1. Smoke test (no training, Studio must be running)

```powershell
$VENV = "$env:USERPROFILE\.unsloth\studio\unsloth_studio\Scripts\python.exe"
& $VENV run_sustainability_smoke_test.py
```

### 2. Fine-tune (Qwen2.5-3B, 1 epoch, ~2 min)

```powershell
& $VENV train_sustainability_model.py `
    --config ../../configs/unsloth/qwen-sustainability-smoke.yaml
```

### 3. Evaluate fine-tuned adapter

```powershell
& $VENV evaluate_sustainability_model.py `
    --adapter ./output/qwen-sustainability-smoke `
    --dataset ../../datasets/sustainability/smoke-test-sustainability.jsonl
```

## VRAM Budget

| Model | LoRA VRAM | Inference VRAM |
|---|---|---|
| Qwen2.5-3B (Q4 4bit) | ~5 GB | ~2 GB |
| Qwen2.5-7B (Q4 4bit) | ~10 GB | ~4 GB |
| Gemma-2-2B (Q4 4bit) | ~4 GB | ~1.5 GB |
| Qwen3.5-4B GGUF (inference only) | N/A | ~2.5 GB |

RTX 4090 Laptop = 16 GB VRAM. Leave 2 GB headroom for OS overhead.

## Configs

Configs are in `../../configs/unsloth/`. Override defaults by passing `--config <file>`.
Non-secret variables only — API keys come from `UNSLOTH_API_KEY` env var.
