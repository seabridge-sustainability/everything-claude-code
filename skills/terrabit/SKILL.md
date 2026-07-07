---
name: terrabit
description: Terrabit — binary earth embedding similarity search wired into the SeaBridgeAI nature-risk frontend/backend (Sentinel-2 satellite patch matching via Clay v1.5 embeddings). Use for nature-risk GIS extension work, not for the standalone autoresearch clone directly.
triggers:
  - "terrabit"
  - "satellite similarity"
  - "nature risk map"
  - "sentinel-2 embedding"
---

# Skill: terrabit — Binary Earth Embedding Similarity Search

## What this skill covers

Working with [terrabit](https://github.com/isaaccorley/terrabit) in the SeaBridgeAI
nature GIS tool. Terrabit finds globally similar Sentinel-2 satellite patches using
compact binary embeddings (Clay v1.5, 256-bit) and in-browser DuckDB-WASM.

Reference implementation: `C:\Users\adelm\SeaBridgeAI\autoresearch\terrabit\`

**Two distinct things, don't conflate them:**
- The **cloned source** at `autoresearch/terrabit/` is a read-only reference copy of
  the upstream project. It has no `co-scientist-orchestrator.ps1` action and is not
  meant to be run directly — `autoresearch/README.md` correctly calls it
  "reference only — not wired into the co-scientist stack or any orchestrator."
- The **feature itself** is separately ported into and genuinely wired into the
  product frontend/backend (files below). Extend the product files, not the clone.

---

## Integration Architecture

```
Frontend (Next.js)                     Backend (FastAPI / nature_agent)
─────────────────────────────────      ────────────────────────────────────
TerrabitMap.tsx                        terrabit_client.py
  ├─ MapLibre GL JS (globe)              ├─ enrich_similarity_patches()
  ├─ DuckDB-WASM (Parquet shards)        └─ ENCORE materiality cross-ref
  ├─ terrabit-scoring.worker.ts
  │    └─ Hamming distance (XOR+popcount)
  └─ AssessmentMap.tsx (tab host)
```

---

## Key Files

| File | Purpose |
|------|---------|
| `manageesg-frontend/src/components/views/nature-risk/TerrabitMap.tsx` | Main UI component |
| `manageesg-frontend/src/components/views/nature-risk/AssessmentMap.tsx` | Host — tab switcher |
| `manageesg-frontend/src/workers/terrabit-scoring.worker.ts` | Hamming distance worker |
| `seabridge_ai/src/sustainability_ai/ai_agents/nature_agent/terrabit_client.py` | Backend enrichment |
| `autoresearch/terrabit/` | Reference implementation (read-only, no orchestrator action) |

---

## npm packages added

```json
"maplibre-gl": "^5.22.0",
"@duckdb/duckdb-wasm": "^1.29.0"
```

## next.config.mjs change required

```js
webpack: (config) => {
  config.experiments = { ...config.experiments, asyncWebAssembly: true };
  config.module.rules.push({ test: /\.wasm$/, type: "webassembly/async" });
  return config;
}
```

---

## Data source

Parquet shards: Source Cooperative (`data.source.coop/isaaccorley/terrabit/`)
~5 M Sentinel-2 chips, each with a 256-bit Clay v1.5 binary embedding + bbox.
No API key required — public HTTP range requests.

---

## How Hamming distance works

Each chip is a 32-byte (256-bit) binary vector. Similarity = 1 - (popcount(XOR(a,b)) / 256).
Score of 1.0 = identical patch. Score of 0.0 = most dissimilar.
The scoring worker uses the `popcount8` trick (bit manipulation, no SIMD needed in JS).

---

## Extending

### Add negative exemplars
The worker already supports `queryNegative` — pass a second clicked point to repulse
visually dissimilar patches:
```ts
w.postMessage({ type: 'SCORE', embeddings, queryPositive, queryNegative, invert: false });
```

### Add Clay embedding generation (new AOIs)
Install `clay-foundation-model` in `autoresearch/` (not production — GPU required).
Use `terrabit_client.py` pattern for GeoPandas ingest of the resulting embeddings.

### Backend API endpoint
Add to `app/api/v1/endpoints/nature.py`:
```python
@router.post("/similarity-ingest")
async def similarity_ingest(file: UploadFile, sector: str = ""):
    from sustainability_ai.ai_agents.nature_agent.terrabit_client import enrich_similarity_patches
    result = enrich_similarity_patches(await file.read(), company_sector=sector)
    return result
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| DuckDB WASM fails to load | Ensure `asyncWebAssembly: true` in next.config.mjs |
| MapLibre CSS conflicts with Mapbox GL | The TerrabitMap scopes its own container; no global CSS needed |
| Web Worker 404 in Next.js | Use `new URL('../workers/terrabit-scoring.worker.ts', import.meta.url)` pattern |
| Source Cooperative CORS | Source Cooperative supports browser-direct range requests — no proxy needed |
| Large bundle size | TerrabitMap is lazy-loaded (`next/dynamic` + `ssr: false`); only loads when tab is opened |
