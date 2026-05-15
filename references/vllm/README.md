# vLLM Reference — SeaBridgeAI Integration

Self-hosted OpenAI-compatible inference engine. **Inactive by default across all
SeaBridgeAI repos.** No GPU or server is needed until you explicitly activate it.

---

## What vLLM Is

vLLM is a high-throughput LLM inference server built around **PagedAttention**
(non-contiguous KV cache blocks, <4 % waste vs 60–80 % in naive serving) and
**continuous batching** (scheduler re-evaluates after every forward pass, no
head-of-line blocking). It exposes a drop-in OpenAI `/v1/chat/completions`
interface, so any existing OpenAI SDK or LangChain client can point to it with
one env var change.

Key numbers: Llama 3.1 8B on H100 → ~12,500 tok/s; TTFT ~72 ms at low
concurrency. Break-even vs managed APIs (with engineering overhead) is roughly
50–100 M tokens/month for premium-tier models.

---

## Where It's Wired In

| Repo | Hook | Status |
|------|------|--------|
| `manageesg-backend` | `LLM_OPENAI_API_BASE` env var → `llm_selector.py:100` | Inactive (`VLLM_ENABLED=false`) |
| `openseabri` | `OPENAI_API_BASE` env var → openai npm client | Inactive (`VLLM_ENABLED=false`) |
| `everything-claude-code` | This reference doc; no runtime hook | Documentation only |

---

## Backend Activation (`manageesg-backend`)

The entire routing hook already exists in
`seabridge_ai/src/sustainability_ai/shared/llm_selector.py`:

```python
# line 100
OPENAI_API_BASE = os.getenv("LLM_OPENAI_API_BASE", "")

# line 186-187 — applied automatically in create_llm()
if OPENAI_API_BASE and provider == "openai":
    kwargs.setdefault("base_url", OPENAI_API_BASE)
```

**Steps to activate:**

1. Start the vLLM server on a GPU host:
   ```bash
   docker run --runtime nvidia --gpus all -p 8000:8000 \
     vllm/vllm-openai:latest \
     --model meta-llama/Llama-3.1-8B-Instruct \
     --dtype auto \
     --max-model-len 32768
   ```

2. Set env vars in `.env`:
   ```bash
   VLLM_ENABLED=true
   LLM_OPENAI_API_BASE=http://<gpu-host>:8000/v1
   NVIDIA_API_KEY=token-placeholder   # vLLM accepts any non-empty string

   # Route GPT-4o task types to the local model:
   LLM_GPT4O_MODEL=meta-llama/Llama-3.1-8B-Instruct

   # Or route ALL agents through vLLM:
   # LLM_DEFAULT_MODEL=meta-llama/Llama-3.1-8B-Instruct
   ```

3. Verify: `curl http://localhost:8000/v1/models` should list the loaded model.

---

## openseabri Activation

openseabri uses the Anthropic SDK for primary agent calls (Claude models cannot
be served by vLLM). The `OPENAI_API_BASE` hook applies only to supplementary
tasks that use the `openai` npm package (not Whisper — that requires OpenAI
servers).

```bash
# .env
VLLM_ENABLED=true
OPENAI_API_BASE=http://<gpu-host>:8000/v1
```

---

## GPU Requirements

| Model size | Min VRAM | Example hardware |
|-----------|----------|-----------------|
| 7–8 B (BF16) | 24 GB | RTX 3090/4090, A10G |
| 13 B (BF16) | 40 GB | A100 40 GB |
| 70 B (BF16) | 80 GB | A100 80 GB, H100 |
| 70 B (FP8) | 40 GB | H100 with FP8 quant |

Multi-node (>70 B): requires InfiniBand or RoCE ≥100 Gbps.

---

## Recommended Open-Weight Models for ESG

| Model | Size | Strengths |
|-------|------|-----------|
| `meta-llama/Llama-3.1-8B-Instruct` | 8 B | Fast, fits 24 GB, good for RESEARCH/CONVERSATIONAL tasks |
| `meta-llama/Llama-3.3-70B-Instruct` | 70 B | Near-GPT-4o quality, strong structured reasoning |
| `Qwen/Qwen2.5-72B-Instruct` | 72 B | Top open-weight for structured data, ESG tables |
| `deepseek-ai/DeepSeek-R1-Distill-Llama-70B` | 70 B | Reasoning-focused, good for FINANCIAL_MODELING |

---

## Cost Break-Even Signal

No cost tracking is active yet (see the cost-tracking gap in the vLLM evaluation
doc). The decision rule:

- Monthly API spend < $3K → stay on managed APIs (Anthropic/OpenAI)
- Monthly API spend $3K–5K → evaluate with a 2-week A/B test on a spot GPU
- Monthly API spend > $5K → vLLM likely justified; run full TCO calculation

To get that signal, add LangChain `UsageMetadataCallbackHandler` to
`create_llm()` in `llm_selector.py` and aggregate token counts by provider.

---

## References

- [vLLM GitHub](https://github.com/vllm-project/vllm)
- [Supported models](https://docs.vllm.ai/en/latest/models/supported_models/)
- [OpenAI-compatible server docs](https://docs.vllm.ai/en/stable/serving/openai_compatible_server/)
- [Production K8s stack](https://github.com/vllm-project/production-stack)
- SeaBridgeAI eval: `manageesg-backend/seabridge_ai/docs/` (vLLM evaluation conducted 2026-05-04)
