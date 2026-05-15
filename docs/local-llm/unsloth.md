# Unsloth Local LLM — SeaBridgeAI Setup Guide

Central reference for running local open LLMs via Unsloth Studio across all SeaBridgeAI repos.
Fine-tuning guidance: [sustainability-model-training-with-unsloth.md](sustainability-model-training-with-unsloth.md)

---

## Quick Reference

| Item | Value |
|------|-------|
| Central clone | `C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\unsloth` |
| Studio data dir | `C:\Users\adelm\.unsloth\studio\` |
| Studio venv | `C:\Users\adelm\.unsloth\studio\unsloth_studio\` |
| Default endpoint | `http://127.0.0.1:8888` |
| GPU | RTX 4090 Laptop, 16 GB VRAM, CUDA 12.6 |
| HF cache | `C:\Users\adelm\.cache\huggingface\hub\` |
| Frontend dist | `external\unsloth\studio\frontend\dist\` (built 2026-05-06) |

---

## Install Path

Unsloth is installed as Unsloth Studio — a local UI + OpenAI-compatible API server.

- **Install method:** `install.ps1 --local` from the unsloth repo
- **Binary:** `C:\Users\adelm\.unsloth\studio\unsloth_studio\Scripts\unsloth.exe` (on PATH)
- **Editable source:** `everything-claude-code\external\unsloth` (central, authoritative)

> **Note:** `autoresearch\unsloth` also exists as a duplicate git clone — it is **not** the
> authoritative install. The studio venv editable pointer was updated on 2026-05-06 to point
> to the central clone (`unsloth 2026.5.2`).

---

## Update Unsloth

```powershell
# Update central clone
git -C "C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\unsloth" pull --ff-only

# Update Studio runtime (rebuilds frontend, updates deps)
unsloth studio update

# Re-point studio venv editable install after a clone update
# (uv venvs have no pip.exe — use python -m pip)
$python = "C:\Users\adelm\.unsloth\studio\unsloth_studio\Scripts\python.exe"
& $python -m pip install -e "C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\unsloth" --no-deps
```

---

## Build the Frontend (One-Time)

The central clone ships frontend **source only** — a pre-built `dist` is not included.
Build it once, then it persists until you do a clean clone or `unsloth studio update`.

```powershell
cd "C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\unsloth\studio\frontend"
npm install --legacy-peer-deps
npm run build
# Output: frontend\dist\index.html  ← required for UI
```

> Already built as of 2026-05-06. Rebuild only after `unsloth studio update` wipes it.

---

## Start Studio

```powershell
$frontend = "C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\unsloth\studio\frontend\dist"

# Start UI + API on localhost (recommended — never bind 0.0.0.0 without approval)
unsloth studio -p 8888 --frontend $frontend

# Start and load a model in one step (prints API key to console)
unsloth studio run --model unsloth/Qwen3.5-4B-GGUF:Q4_K_M -p 8888 --frontend $frontend

# Stop
unsloth studio stop
```

Studio UI opens at: `http://127.0.0.1:8888`

> Without `--frontend`, the API works but `/` returns 404 — the React UI won't load.

---

## Launch a GGUF Model

Models are downloaded on first use and cached in `~\.cache\huggingface\hub\`.

```powershell
$fe = "C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\unsloth\studio\frontend\dist"

# Qwen3.5-4B — fits comfortably in 16 GB VRAM (already cached)
unsloth studio run --model unsloth/Qwen3.5-4B-GGUF:Q4_K_M -p 8888 --frontend $fe

# Qwen3-14B — Q4 fits in 16 GB
unsloth studio run --model unsloth/Qwen3-14B-GGUF:Q4_K_M -p 8888 --frontend $fe

# Gemma 4 27B — may require Q3 or Q2 for 16 GB VRAM
unsloth studio run --model unsloth/gemma-4-27b-it-GGUF:Q3_K_M -p 8888 --frontend $fe

# List available model IDs after Studio starts
Invoke-RestMethod http://127.0.0.1:8888/v1/models | ConvertTo-Json -Depth 3
```

### 16 GB VRAM model recommendations

| Model | Quant | VRAM est. | Notes |
|-------|-------|-----------|-------|
| Qwen3.5-4B | Q8_0 | ~5 GB | Fast, already cached |
| Qwen3-8B | Q6_K | ~7 GB | Good balance |
| Qwen3-14B | Q4_K_M | ~9 GB | Strong coding |
| Gemma-4-12B | Q5_K_M | ~9 GB | Google flagship |
| Gemma-4-27B | Q3_K_M | ~12 GB | May need offloading |
| Qwen3-30B-A3B (MoE) | Q4_K_M | ~4 GB active | MoE, efficient |

> **24 GB VRAM models** (not available on this machine):
> Qwen3-32B Q6_K, Gemma-4-26B Q8, Llama-4-Maverick Q5.

---

## Create an API Key

### Via browser (recommended for first use)

1. Start Studio: `unsloth studio -p 8888 --frontend $fe`
2. Open `http://127.0.0.1:8888` in a browser
3. Navigate to **Settings → API Keys → Create Key**
4. Copy the key (starts with `sk-unsloth-`)
5. Store it in user environment (never commit):

```powershell
[System.Environment]::SetEnvironmentVariable('UNSLOTH_API_KEY', 'sk-unsloth-XXXX', 'User')
```

### Programmatic (headless / scripted)

Studio uses username `unsloth` with a randomly generated bootstrap password on first start.
The bootstrap password is in `~\.unsloth\studio\auth\.bootstrap_password` until you change it.

```powershell
# 1. Get the bootstrap password (only valid before first password change)
$bp = Get-Content "C:\Users\adelm\.unsloth\studio\auth\.bootstrap_password" -ErrorAction SilentlyContinue

# 2. Login
$token = (Invoke-RestMethod -Uri http://127.0.0.1:8888/api/auth/login `
  -Method POST -ContentType "application/json" `
  -Body (@{username="unsloth";password=$bp} | ConvertTo-Json)).access_token

# 3. If must_change_password is true, change it first
$result = Invoke-RestMethod -Uri http://127.0.0.1:8888/api/auth/change-password `
  -Method POST -ContentType "application/json" -Headers @{Authorization="Bearer $token"} `
  -Body (@{current_password=$bp;new_password="YOUR-NEW-PASS"} | ConvertTo-Json)
$token = $result.access_token   # use new token

# 4. Create API key
$key = (Invoke-RestMethod -Uri http://127.0.0.1:8888/api/auth/api-keys `
  -Method POST -ContentType "application/json" -Headers @{Authorization="Bearer $token"} `
  -Body (@{name="seabridge-local"} | ConvertTo-Json)).key

# 5. Store it
[System.Environment]::SetEnvironmentVariable('UNSLOTH_API_KEY', $key, 'User')
```

> **Auth DB:** `~\.unsloth\studio\auth\auth.db` — contains users, tokens, and API key hashes.
> Never commit this file.

---

## Claude Code Setup

```powershell
# Dot-source the helper (sets env in current shell, then launch claude)
. C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\use-unsloth-claude-code.ps1
claude

# Revert to Anthropic API
. C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\use-unsloth-claude-code.ps1 -Reset
```

Manual env vars (if you prefer):
```powershell
$env:ANTHROPIC_BASE_URL   = "http://127.0.0.1:8888"
$env:ANTHROPIC_AUTH_TOKEN = "sk-unsloth-XXXX"
$env:ANTHROPIC_MODEL      = "<model-id-from-/v1/models>"
```

---

## Codex / OpenAI-Compatible Client Setup

```powershell
. C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\use-unsloth-openai-compatible.ps1
codex   # or opencode, cursor, etc.
```

Manual env vars:
```powershell
$env:OPENAI_BASE_URL = "http://127.0.0.1:8888/v1"
$env:OPENAI_API_KEY  = "sk-unsloth-XXXX"
$env:OPENAI_MODEL    = "<model-id>"
```

**Continue.dev** (`~\.continue\config.json`):
```json
{
  "models": [{
    "provider": "openai",
    "model": "<model-id>",
    "apiBase": "http://127.0.0.1:8888/v1",
    "apiKey": "sk-unsloth-XXXX"
  }]
}
```

**Cursor**: Settings → Models → Add Model → Base URL: `http://127.0.0.1:8888/v1`

---

## Backend .env Configuration

`manageesg-backend/.env` contains a `LOCAL_LLM_*` block (disabled by default):

```env
LOCAL_LLM_ENABLED=false
LOCAL_LLM_BASE_URL=http://127.0.0.1:8888
LOCAL_LLM_API_KEY=<your-key-from-UNSLOTH_API_KEY-env-var>
LOCAL_LLM_MODEL=unsloth/Qwen3.5-4B-GGUF
```

- `.env` is gitignored — real keys are safe there.
- `.env.example` contains placeholder values only — safe to commit.
- Flip `LOCAL_LLM_ENABLED=true` to route backend AI agents to the local endpoint.

---

## Local Fine-Tuning

For fine-tuning sustainability-domain models, see the full training guide:

**[sustainability-model-training-with-unsloth.md](sustainability-model-training-with-unsloth.md)**

Quick reference — fine-tuning requires the full Python package (not GGUF), activated from the
Studio venv or a separate training environment:

```python
from unsloth import FastLanguageModel
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/Qwen3.5-4B",   # non-GGUF for training
    max_seq_length=2048,
    load_in_4bit=True,
)
```

> Fine-tuning jobs must be **explicitly approved** before starting on this machine.
> A smoke test (≤ 10 steps) is enough to validate the pipeline without full training cost.

---

## NVIDIA + Unsloth Training Optimizations

Source: [unsloth.ai/blog/nvidia-collab](https://unsloth.ai/blog/nvidia-collab)

Unsloth partnered with NVIDIA to deliver ~25% combined speedup across all GPU architectures
(RTX laptops to DGX Spark). Three techniques were implemented:

### 1. Packed-Sequence Metadata Caching (+14.3% per batch)

**Problem:** Transformer layers reconstructed identical sequence boundary data (lengths,
cumulative offsets, attention masks) at every layer — redundant GPU-CPU sync work.

**Fix:** Build metadata once per batch; cache it and pass it through all L layers.

**Benchmark (Qwen3-14B QLoRA SFT):**
- Forward: +43.3%
- Backward: +5.8%
- Per-batch: **+14.3%**

**Relevance for SeaBridgeAI:** Any SFT run on sustainability QA datasets with packed sequences
(GRI, emissions factors, ESG benchmarks) benefits automatically — no code change needed.

### 2. Double-Buffered Checkpoint Reloads (+4.6% → +8.4%)

**Problem:** Activation checkpointing was fully serialized — copy activation CPU→GPU, wait,
compute backward, repeat. Each transfer blocked the next operation.

**Fix:** Two buffers in flight: backward pass on buffer A while buffer B is loading the next
activation via a separate CUDA stream, hiding transfer latency behind compute.

**Benchmark (Dense models, NVIDIA B200):**
- 8B model: +8.40%
- 14B model: +6.70%
- 32B model: +4.61%

**Memory overhead:** +0.23 to +0.47 GB — negligible on 16 GB VRAM.

**Relevance for SeaBridgeAI:** Applies to any model fine-tuning that uses activation
checkpointing (needed on 16 GB VRAM for anything >7B parameters).

### 3. MoE Routing Optimization (10–15% speedup, up to +23% forward)

**Problem:** GPT-OSS MoE routing issued per-expert dynamic queries, scaling poorly with
expert count.

**Fix:** Group all tokens in one stable sort + `bincount` pass, then reuse per-expert
offsets rather than re-computing per query.

**Benchmark (GPT-OSS routing path):**
- Forward: +23%
- Backward: +13%
- Overall: 10–15%

**Relevance for SeaBridgeAI:** Applies when using MoE models like Qwen3-30B-A3B.
Since MoE models run with ~4 GB active VRAM, this is the most memory-efficient path
for long sustainability research tasks on 16 GB VRAM.

### Common Pattern

All three optimizations follow the same principle: **eliminate repeated work, then
pipeline unavoidable work.** As core kernels improve, previously invisible overhead
becomes the bottleneck. These techniques are already merged into the Unsloth codebase.

---

## SeaBridgeAI Use Cases

| Agent / Skill | Recommended Model | Mode |
|---------------|-------------------|------|
| Sustainability Assistant | Qwen3.5-4B or Qwen3-8B | Inference (Studio) |
| LCA Assistant | Qwen3-14B | Inference or fine-tune |
| Emissions-Factor Extraction | Qwen3-8B fine-tuned on GHG data | Fine-tune then inference |
| Climate Risk Assistant | Qwen3-14B or Gemma-4-12B | Inference (Studio) |
| Due Diligence Assistant | Qwen3-14B | Inference (Studio) |
| ESG Metrics QA | Qwen3.5-4B fine-tuned | Fine-tune then inference |
| OpenSeaBridge consumer skills | Qwen3.5-4B (low latency) | Inference (Studio) |

---

## Tool Calling Policy

- **Enabled:** only when server is bound to `127.0.0.1` (localhost). This is the default.
- **Disabled:** if you ever bind to `0.0.0.0` or a LAN/public IP — never enable code execution over a non-loopback interface without explicit approval.
- Never log or commit API keys.
- Tool results containing shell output should not be forwarded to external APIs.

---

## Security Warnings

1. **Never bind to 0.0.0.0** in normal operation — only `127.0.0.1`.
2. **Never commit `UNSLOTH_API_KEY`** or any `sk-unsloth-*` key to any repo.
3. **Do not share the Studio URL** over any network interface without authentication.
4. HF model cache (`~\.cache\huggingface\`) should not be committed — add to `.gitignore`.
5. `.unsloth\studio\auth.db` contains credentials — never commit.
6. `LOCAL_LLM_API_KEY` in `.env` is safe (gitignored) — never copy into `.env.example`.

---

## Troubleshooting

### Studio fails to start — "Application Control policy blocked DLL" (WDAC)

WDAC blocks freshly downloaded `.pyd` files (they carry a Zone.Identifier "Mark of the Web").
`Unblock-File` removes the MoW and is sufficient for the default WDAC policy on this machine:

```powershell
$site = "C:\Users\adelm\.unsloth\studio\unsloth_studio\Lib\site-packages"
Get-ChildItem $site -Filter "*.pyd" -Recurse | Unblock-File
Get-ChildItem $site -Filter "*.dll" -Recurse | Unblock-File
```

Run this after any `pip install` that adds compiled extensions, then restart Studio.

### Standard installer wipes the venv (UV_VENV_CLEAR=1)

`unsloth studio update` (or re-running `install.ps1`) uses `UV_VENV_CLEAR=1` internally,
which deletes and recreates the venv. **The installer creates a timestamped rollback snapshot
before wiping** (`unsloth_studio.rollback.<timestamp>\`), but that rollback may be a
**different Python version** than the new venv — do not blindly copy `.pyd` files from it.

**Recovery steps (Python 3.12 venv):**

```powershell
$python = "C:\Users\adelm\.unsloth\studio\unsloth_studio\Scripts\python.exe"
$site   = "C:\Users\adelm\.unsloth\studio\unsloth_studio\Lib\site-packages"

# 1. Bootstrap pip (uv venvs ship without pip.exe)
& $python -m ensurepip

# 2. Re-install the editable unsloth package
& $python -m pip install -e "C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\unsloth" --no-deps

# 3. Remove the static 'studio' directory that shadows the editable install (if present)
Remove-Item "$site\studio" -Recurse -Force -ErrorAction SilentlyContinue

# 4. Install the missing runtime deps (these are not in pyproject.toml no-deps install)
& $python -m pip install structlog fastapi starlette uvicorn python-multipart aiofiles websockets

# 5. Unblock all compiled extensions (WDAC fix)
Get-ChildItem $site -Filter "*.pyd" -Recurse | Unblock-File
Get-ChildItem $site -Filter "*.dll" -Recurse | Unblock-File

# 6. Verify
& $python -c "from studio.backend.run import run_server; print('OK')"

# 7. Rebuild frontend (wipe removes the dist too)
cd "C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\unsloth\studio\frontend"
npm install --legacy-peer-deps && npm run build
```

> **Do not copy `.pyd` files from the rollback venv.** Check Python versions first:
> `& "$rollbackPath\Scripts\python.exe" --version` vs `& $python --version`.
> If they differ, cp312 and cp313 binaries are incompatible.

### `ModuleNotFoundError` for a specific package after venv wipe

pip-install it fresh, then unblock:

```powershell
$python = "C:\Users\adelm\.unsloth\studio\unsloth_studio\Scripts\python.exe"
$site   = "C:\Users\adelm\.unsloth\studio\unsloth_studio\Lib\site-packages"
& $python -m pip install <package-name>
Get-ChildItem "$site\<package-name>" -Filter "*.pyd" -Recurse | Unblock-File
```

### Port 8888 already in use

```powershell
$portLine = netstat -ano 2>$null | Select-String ":8888 .*LISTEN" | Select-Object -First 1
if ($portLine) {
    $portPid = ($portLine -split "\s+")[-1].Trim()
    Stop-Process -Id $portPid -Force -ErrorAction SilentlyContinue
}
Remove-Item "C:\Users\adelm\.unsloth\studio\studio.pid" -Force -ErrorAction SilentlyContinue
# or use an alternate port:
# unsloth studio -p 9888 --frontend $fe
```

### UI returns 404 at http://127.0.0.1:8888/

Frontend was not passed at startup. Restart with `--frontend` pointing at the built dist:

```powershell
$fe = "C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\unsloth\studio\frontend\dist"
unsloth studio run --model unsloth/Qwen3.5-4B-GGUF:Q4_K_M -p 8888 --frontend $fe
```

If `dist` doesn't exist, build it first (see **Build the Frontend** section above).

### Stale PID file

```powershell
Remove-Item "C:\Users\adelm\.unsloth\studio\studio.pid" -Force
unsloth studio -p 8888 --frontend $fe
```

### Out of VRAM

Use a smaller quant or a MoE model:

```powershell
unsloth studio run --model unsloth/Qwen3-30B-A3B-GGUF:Q4_K_M -p 8888 --frontend $fe
```

### Editable install points to wrong source

uv venvs have no `pip.exe` — use `python -m pip`:

```powershell
$python = "C:\Users\adelm\.unsloth\studio\unsloth_studio\Scripts\python.exe"
& $python -m pip show unsloth   # check Location:
& $python -m pip install -e "C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\unsloth" --no-deps
```

---

## Health Check Script

```powershell
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-unsloth.ps1
```

---

## Files Changed / Created

| Date | File | Action |
|------|------|--------|
| 2026-05-06 | `external\unsloth\` (central clone) | Cloned from github.com/unslothai/unsloth, commit `fac2dc09` |
| 2026-05-06 | `scripts\check-unsloth.ps1` | Created |
| 2026-05-06 | `scripts\use-unsloth-claude-code.ps1` | Created |
| 2026-05-06 | `scripts\use-unsloth-openai-compatible.ps1` | Created |
| 2026-05-06 | `docs\local-llm\unsloth.md` | Created, then updated with NVIDIA optimizations + frontend build |
| 2026-05-06 | `docs\local-llm\sustainability-model-training-with-unsloth.md` | Created |
| 2026-05-06 | `studio\frontend\dist\` | Built from source (npm run build) |
| 2026-05-06 | Studio venv editable install | Updated from `autoresearch\unsloth` → `external\unsloth` (v2026.5.2) |
| 2026-05-06 | `.claude\skills\sea-local-llm-training\SKILL.md` | Created |
