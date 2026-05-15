# Unsloth Local LLM Validation — 2026-05-06

**Date:** 2026-05-06
**Operator:** Alejandro Delmar (adelmar@seabridgesustainability.com)
**Machine:** RTX 4090 Laptop, 16 GB VRAM, CUDA 12.6, Windows 11 Home
**Unsloth version:** 2026.5.2 (editable, central clone)
**Model tested:** unsloth/Qwen3.5-4B-GGUF:Q4_K_M

---

## 1. Binary and Install Checks

| Check | Result | Notes |
|---|---|---|
| `unsloth` command on PATH | PASS | `C:\Users\adelm\.unsloth\studio\unsloth_studio\Scripts\unsloth.exe` |
| Studio venv Python version | PASS | Python 3.12.10 |
| Unsloth package version | PASS | 2026.5.2 |
| Central clone commit | PASS | fac2dc09, branch main, 2026-05-06 |
| WDAC `.pyd` block resolved | PASS | `Get-ChildItem $site -Filter "*.pyd" -Recurse \| Unblock-File` applied 2026-05-06 |
| `studio\` shadowing package removed | PASS | Stale `studio/` dir in site-packages deleted |

---

## 2. Frontend Build

| Check | Result | Notes |
|---|---|---|
| Frontend source present | PASS | `ECC/external/unsloth/studio/frontend/` |
| npm install completed | PASS | `npm install --legacy-peer-deps` succeeded |
| npm run build completed | PASS | Output: `dist/index.html 1.49 kB`, `dist/assets/` populated |
| `dist/index.html` exists | PASS | Confirmed |

---

## 3. Studio Startup and UI

| Check | Result | Notes |
|---|---|---|
| Studio started on port 8888 | PASS | `unsloth studio run --model ... -p 8888 --frontend <dist>` |
| PID file written | PASS | `~\.unsloth\studio\studio.pid` |
| Port 8888 LISTEN state | PASS | Confirmed via `netstat -an` |
| `GET http://127.0.0.1:8888/` returns HTML | PASS | React app loads with --frontend flag |
| Without --frontend → 404 | KNOWN | `{"detail":"Not Found"}` — expected; always use --frontend |
| `/v1/models` returns loaded model | PASS | Qwen3.5-4B-GGUF confirmed |

---

## 4. Authentication

| Check | Result | Notes |
|---|---|---|
| UNSLOTH_API_KEY in user env | PASS | Prefix `sk-unsloth-684b`, stored as Windows user environment variable |
| API key accepted by `/v1/models` | PASS | 200 OK with Bearer token |
| Username/password auth | PASS | `unsloth` / `SeaBridge@Local2026!` (changed from bootstrap) |
| Bootstrap password file cleared | PASS | |
| Auth DB location | PASS | `~\.unsloth\studio\auth\auth.db` |

---

## 5. Backend .env Integration

| Check | Result | Notes |
|---|---|---|
| `.env` contains LOCAL_LLM_* block | PASS | 4 vars: ENABLED, BASE_URL, API_KEY, MODEL |
| `LOCAL_LLM_ENABLED=false` (default) | PASS | Not routed to local by default |
| `.env` is gitignored | PASS | Confirmed — not staged, not tracked |
| `.env.example` has placeholder block | PASS | Empty API_KEY, ENABLED=false |
| No `sk-unsloth-*` in tracked files | PASS | `git grep sk-unsloth` returned empty |

---

## 6. Inference Smoke Test

**Test question:** "What is Scope 3 Category 11 in GHG accounting?"

| Metric | Value |
|---|---|
| Model | unsloth/Qwen3.5-4B-GGUF:Q4_K_M |
| Prompt tokens | 622 |
| Completion tokens | 73 |
| SSE chunks received | 72 |
| Latency | ~0.8s to first token |
| Speed | ~95 tok/s |
| Response accuracy | PASS — correct definition of Scope 3 Category 11 (use of sold products) |
| Hallucinated citations | NONE detected |

**Notes:**
- Studio always returns SSE (Server-Sent Events) even when `stream=false`
- Must aggregate `.delta.content` fields across all `data:` lines to reconstruct full response
- PowerShell: use `@($array)[0]` not `$array[0]` for single-item pipeline safety

---

## 7. Security Scan

| Check | Result | Notes |
|---|---|---|
| `git grep sk-unsloth` in backend | PASS — empty | No Unsloth API keys in tracked files |
| `git grep sk-unsloth` in ECC | PASS — empty | |
| `git grep LOCAL_LLM_API_KEY=sk` in backend | PASS — empty | |
| `.env` not staged | PASS | `git status` confirms unstaged |
| `.env.example` API_KEY is blank | PASS | `LOCAL_LLM_API_KEY=` (no value) |
| Training scripts contain no secrets | PASS | Smoke test script uses env vars only |

---

## 8. Documentation Deliverables

| File | Status |
|---|---|
| `ECC/docs/local-llm/unsloth.md` | UPDATED — frontend build, --frontend flag, NVIDIA optimizations, use cases |
| `ECC/docs/local-llm/sustainability-model-training-with-unsloth.md` | CREATED — 8 use cases, dataset format, training command, inference command, checklist |
| `ECC/docs/local-llm/smoke-test-sustainability.jsonl` | CREATED — 5 sustainability QA examples |
| `ECC/skills/sea-local-llm-training/SKILL.md` | CREATED |
| `ECC/.agents/skills/sea-local-llm-training/SKILL.md` | CREATED (mirror) |
| `ECC/skills/sea-ai-data-integrity/SKILL.md` | UPDATED — Local LLM Notes section added |
| `ECC/skills/sea-sustainability-domain-review/SKILL.md` | UPDATED — Local LLM Notes section added |
| `ECC/skills/sea-context-hygiene/SKILL.md` | UPDATED — Local LLM Notes section added |
| `ECC/skills/sea-senior-dev-workflow/SKILL.md` | UPDATED — Local LLM Notes section added |
| `openseabri/docs/local-llm/unsloth-local.md` | UPDATED — --frontend flag, training guide pointer |
| `manageesg-backend/docs/local-llm/unsloth-local.md` | UPDATED — --frontend flag, backend integration block, training guide pointer |
| `memory/project_unsloth_setup.md` | UPDATED — frontend build requirement, correct startup command |
| `ECC/docs/UNSLOTH_LOCAL_LLM_VALIDATION_2026-05-06.md` | THIS FILE |

---

## 9. Known Issues / Limitations

| Issue | Status |
|---|---|
| 14B+ models OOM during LoRA fine-tuning (16 GB VRAM limit) | KNOWN — use 4B/8B only for training |
| Studio always streams SSE regardless of `stream=false` | KNOWN — aggregate delta.content in client |
| ANTHROPIC_BASE_URL is session-scoped (not persistent user env) | KNOWN — dot-source use-unsloth-claude-code.ps1 each terminal |
| Without --frontend flag, `/` returns 404 | KNOWN — always pass --frontend to startup command |
| Rollback venv at `unsloth_studio.rollback.*` is Python 3.13 — ABI incompatible | KNOWN — do NOT copy .pyd from rollback; current venv is cp312 |

---

## 10. Validation Conclusion

All critical checks passed as of 2026-05-06. Local LLM inference via Unsloth Studio is operational for SeaBridgeAI sustainability agents. The setup is documented, secured, and integrated into the backend configuration with safe defaults (disabled by default).

**Next steps (optional):**
- Run LoRA smoke-test fine-tune on Qwen2.5-3B with `smoke-test-sustainability.jsonl` when a training session is explicitly approved
- Update remaining 3 pointer repos (_upstream, autoresearch, manageesg-frontend) if they need local LLM access
