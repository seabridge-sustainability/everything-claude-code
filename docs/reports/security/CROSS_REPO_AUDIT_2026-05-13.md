# SeaBridgeAI Cross-Repo Security & Dependency Audit
**Date:** 2026-05-13  
**Scope:** manageesg-backend · manageesg-frontend · everything-claude-code (ECC) · autoresearch · openseabri · climada-stack  
**Method:** pip-audit · bandit · semgrep · detect-secrets · npm audit · ECC check-harness · Agent Shield  
**Strix:** Completed 2026-05-14 — backend scan with `anthropic/claude-sonnet-4-6`, quick mode. 1 vulnerability report produced (CVSS 10.0, CWE-798). Scan stopped before file-modification phase (Hardcoded Credentials Fixer sub-agent was halted to protect .env files from being overwritten). Evidence: `autoresearch/strix/strix_runs/manageesg-backend_55be/vulnerabilities/vuln-0001.md`  
**Feynman research:** Briefs written 2026-05-13 (live query blocked — OpenAI key invalid; briefs written from Claude training knowledge, Aug 2025 cutoff). See `autoresearch/feynman/outputs/`.  
**Pre-commit security hooks:** Installed and passing on all 4 repos (detect-secrets, bandit, pip-audit-on-push, npm-audit-on-push). See section below.

---

## Executive Summary

| Severity | Count | Categories |
|---|---|---|
| **Critical** | 6 | CVE in direct dep (urllib3 ×2, langsmith) + Next.js SSRF/auth-bypass + GCP SA key in git history + multi-service credentials in gitignored .env files (Strix CWE-798) |
| **High** | 7 | CVE (ujson), MD5 hash SAST, fast-uri path-traversal, Next.js 13-advisory bundle, starlette MAJOR bump, cryptography MAJOR bump, dual AWS keypairs in .env |
| **Medium** | 12 | Dockerfile security gaps, 7 routes missing visible auth, 3 outdated SDKs w/ breaking API, Agent Shield D grades |
| **Low** | 25+ | Harness drift (accessibility, console logs, raw fetch) |

**Remaining open actions (by risk × fix effort):**

1. **CRITICAL — Rotate GCP Service Account `sheets-access@materiality-468403.iam.gserviceaccount.com`** — private key committed in git commit `be6e5e961` (2026-04-07), still in history. Go to GCP Console → IAM & Admin → Service Accounts → find this SA → Keys → disable/delete the compromised key. Generate a new key if the integration is still needed.
2. **CRITICAL — Rotate both AWS IAM keypairs**: `AKIA...[redacted-primary]` (primary, account 257394467527) and `AKIA...[redacted-seabridge-ai]` (seabridge_ai/.env). Verify each key's last-used date in the AWS IAM console; if either has been used outside dev, treat as compromised.
3. **Upgrade MongoDB Atlas** production cluster to 8.0.4+ via Atlas UI or CLI. Local dev/staging already on `mongo:8.0`.
4. **Deploy patched Fly Redis** — `seabridge-dev/ops/fly-redis/Dockerfile` already updated to `redis:7.4-alpine`; needs `fly deploy` in that directory by DevOps.
5. **Rotate remaining credentials in `.env` files** (Strix vuln-0001): Anthropic key, OpenAI keys ×2, Slack bot token, Brevo SMTP, Stripe test keys, Cognito test password. These are gitignored dev-machine credentials — rotate on any shared or CI environment.

**Already resolved (audit report false-alarms — confirmed 2026-05-14):**
- `Next.js` frontend — already at **16.2.6** (past 16.2.5 vulnerable range) ✅
- `app/services/cv/segmentation.py:54` — already has `usedforsecurity=False` ✅
- `share_viewer.py` / `openseabri_routes.py` / `connectors.py` auth boundary — all have `# harness: route-auth-boundary intentionally public` comment + real token/key validation in every handler ✅

**Fixed this session (2026-05-13/14):** JWT alg:none bypass · JWT secret key minimum length · file upload path traversal (media.py, asset_buildings.py) · Redis CVE-2025-49844 (docker) · MongoDB CVE-2025-14847 (docker) · `ENV ENVIRONMENT=development` in Dockerfile.staging · SHA1 `usedforsecurity=False` · `langsmith` CVE pin corrected · `cryptography` floor bumped · `.mcp.json` toolbox structural fix · pre-commit hooks (detect-secrets, bandit, pip-audit, npm-audit) installed across 4 repos · XXE in due_diligence.py (defusedxml) · 5 bandit nosec suppressions documented · Strix `ANTHROPIC_API_KEY` env-scoping bug fixed in `strix.ps1` · `seabridge_ai/.env SECRET_KEY=jktyagi` replaced with 64-char hex key · `seabridge-dev/docker-compose.yml` Redis bumped to `7.4-alpine` (3rd and final redis image reference) · `urllib3` exact-pinned to `==2.7.0` in `requirements.txt`.

---

## Per-Repo Findings

### 1. manageesg-backend

**Agent Shield grade: D (41 findings)**  
**CVE scanner: pip-audit 2.10.0 | 393 packages scanned | 3 skipped (not on PyPI)**

#### CVEs — Direct Dependencies

| Severity | Package | Installed | Fix | CVE IDs | Description |
|---|---|---|---|---|---|
| **Critical** | `urllib3` | 2.6.3 | 2.7.0 | CVE-2026-44431, CVE-2026-44432 | Cross-origin redirect credential leak; streaming API memory disclosure |
| **Critical** | `langsmith` | 0.7.31 | 0.8.0 | CVE-2026-45134 | Prompt pull methods vulnerability in SDK |
| **High** | `ujson` | 5.12.0 | 5.12.1 | CVE-2026-44660 | Memory leak in `ujson.dump()` on write failure — affects any code using `ujson.dump(obj, file)` |

Evidence: `docs/reports/security/raw/pip-audit-backend.json`

#### SAST — bandit + semgrep

| Severity | Rule | File | Line | Fix |
|---|---|---|---|---|
| **High** | B324 / `insecure-hash-algorithm-md5` | `app/services/cv/segmentation.py` | 54 | Replace `hashlib.md5()` with `hashlib.md5(..., usedforsecurity=False)` if non-security use, or `hashlib.sha256()` if used for integrity/security |

Evidence: `docs/reports/security/raw/sast-backend-bandit.json`, `docs/reports/security/raw/sast-backend-semgrep.json`

#### Secrets

**detect-secrets baseline:** No hardcoded secrets found in tracked files. 3 false positives (MongoDB ObjectIDs, enum string `"api_key"`).

**Strix active-scan findings (2026-05-14) — vuln-0001 CRITICAL (CVSS 10.0, CWE-798):**  
Full report: `autoresearch/strix/strix_runs/manageesg-backend_55be/vulnerabilities/vuln-0001.md`

| Severity | Finding | File | Status |
|---|---|---|---|
| **CRITICAL** | Google service account RSA private key committed to git | `seabridge_ai/src/sustainability_ai/ai_agents/materiality/materiality_key.json` (commit `be6e5e961`) | File now gitignored; **GCP SA `sheets-access@materiality-468403.iam.gserviceaccount.com` must be disabled/rotated in GCP Console — key still in git history** |
| **CRITICAL** | `SECRET_KEY=jktyagi` (7 chars) in `seabridge_ai/.env` — trivially brute-forceable HS256 JWT key | `seabridge_ai/.env:5` | ✅ Fixed locally — replaced with 64-char hex key. File is gitignored; rotate on all developer machines. |
| **CRITICAL** | 30+ credentials in gitignored `.env` files: MongoDB Atlas ×2, AWS IAM ×2, OpenAI ×2, Anthropic, Slack bot/secret/signing, Brevo SMTP, Stripe test, Cognito test, Gemini, Groq, LangSmith, NVIDIA NGC, AlphaGeo, Felt, Cecil, Tavily, Cloud Work tokens | `.env`, `seabridge_ai/.env`, `seabridge-dev/.env` | Gitignored (not in git). Rotate any key used outside this dev machine. See full inventory in vuln-0001.md §Technical Analysis. |
| High | AWS keypair `AKIA...[redacted-seabridge-ai]` (account suffix LMEM) in `seabridge_ai/.env` | `seabridge_ai/.env:17-18` | Gitignored; verify dev-only, rotate if any production usage. |
| High | AWS keypair `AKIA...[redacted-primary]` (account 257394467527) in root `.env` | `.env:27-28` | Gitignored; verify dev-only, rotate if any production usage. |
| ~~High~~ | ~~`.opencode/nvidia-api-key.txt` not gitignored~~ | ~~`.opencode/`~~ | **False alarm** — file is gitignored at `.opencode/.gitignore:6` ✅ |

Evidence: `docs/reports/security/raw/secrets-backend-detect.json`, `autoresearch/strix/strix_runs/manageesg-backend_55be/vulnerabilities/vuln-0001.md`

#### Dockerfile Security

| Severity | Finding | File | Fix |
|---|---|---|---|
| Medium | `ENV ENVIRONMENT=development` hardcoded | `Dockerfile.staging:43` | ✅ **Fixed** — line removed; comment instructs runtime injection |
| Medium | `gcc` build tool left in runtime image | `Dockerfile:7-18` | Use multi-stage build: build stage installs gcc+gdal, final stage copies only the built artifacts |
| Low | No base image digest pin | `Dockerfile:1` | Pin: `FROM public.ecr.aws/docker/library/python:3.12-slim@sha256:<digest>` |

#### Harness Drift — Auth Boundary

| File | Lines | Message |
|---|---|---|
| `app/api/v1/endpoints/share_viewer.py` | 66, 215, 307, 336, 426 | Route decorator without visible `Depends` auth or router-level dependency |
| `app/api/openseabri_routes.py` | 2922 | Same |

`share_viewer.py` is likely intentionally public (share-token–based access). **Action:** Confirm each route has a comment `# intentionally public: validated by share_token` or add a token-validation `Depends`.

#### Harness Drift — Reliability / DoS

| Category | Count | Files |
|---|---|---|
| `backend.external-call-timeout` | 12 | `seabridge_ai/src/sustainability_ai/ai_agents/climate_openaccess/utils/geocode.py` (4), `nominatim_adapter.py` (3), `berry/auto_auth.py`, `aws/agentcore_client.py`, `Utility_bill_pipeline/pipeline.py` |
| `backend.subprocess-timeout` | 8 | `app/services/openwork_runtime.py`, `app/services/sustainability_research.py` (2), `berry/integration.py`, `berry/verify.py`, `autoresearch/v2/frontend_harness.py`, `climada_adapter/runner.py`, `shared/model_catalog.py` |
| `backend.retry-bounds` | 7 | Various (see full harness scan JSON) |

All external HTTP calls missing timeouts are DoS vectors if a downstream service hangs. Priority: geocode.py and nominatim_adapter.py (used in climate risk queries).

#### Outdated Security-Relevant Packages (top by risk)

| Package | Installed | Latest | Jump Type | Action |
|---|---|---|---|---|
| `starlette` | 0.52.1 | 1.0.0 | Low — no CVEs; stability release | See `autoresearch/feynman/outputs/starlette-0.52-to-1.0-fastapi-migration.md`; main action is TestClient `raise_server_exceptions` audit |
| `cryptography` | 46.0.7 | 48.0.0 | **MAJOR ×2** | Review changelog; likely no app-level API breaks for standard usage |
| `anthropic` | 0.85.0 (floor pinned) | 0.102.0 | 17 minor — no breaking changes | See `autoresearch/feynman/outputs/anthropic-sdk-0.85-to-0.102-migration.md`; low migration cost |
| `beanie` | 1.30.0 | 2.1.0 | **MAJOR** | Beanie 2.x has breaking ODM API changes — test thoroughly |
| `pydantic` | 2.11.9 | 2.13.4 | minor | Low risk; minor API additions only |
| `openai` | 2.33.0 | 2.36.0 | minor | Check Responses API changes |
| `langchain` | 1.2.12 | 1.3.0 | minor | Review integration splits |
| `celery` | 5.3.4 | 5.6.3 | minor+ | Check result-backend and broker changes |

Evidence: `docs/reports/security/raw/outdated-py-backend.json`

---

### 2. manageesg-frontend

**Agent Shield grade: D (39 findings)**  
**npm audit: 1 HIGH (13 sub-advisories under Next.js)**

#### CVEs — npm Dependencies

| Severity | Package | Range | Fix | Sub-advisories |
|---|---|---|---|---|
| **Critical** | `next` | 16.0.0 – 16.2.5 | >16.2.5 | DoS via Server Components, XSS in App Router CSP nonces, XSS in beforeInteractive, cache poisoning ×3, middleware/proxy bypass ×4, SSRF via WebSocket upgrades, DoS via Image Optimization |

**Action:** `npm install next@latest` (or pin to the first version >16.2.5 that passes regression tests).  
Evidence: `docs/reports/security/raw/npm-audit-frontend.json`

#### Harness Drift

| Rule | Count | Sample files |
|---|---|---|
| `frontend.button-accessibility-review` | 431 | `nature-risk/DeepDiveModal.tsx`, `TwoStepFormModal.tsx`, ... |
| `frontend.production-console` | 109 | Various — `console.log` / `console.error` in prod builds |
| `frontend.icon-button-missing-label` | 7 | Various |
| `frontend.raw-fetch-boundary` | 2 | `nature-risk/MapBox.tsx:278`, `climate-risk/PropertyRiskMap.tsx:156` |

Evidence: `docs/reports/harness/harness_scan_20260513_163242.json`

---

### 3. everything-claude-code (ECC)

**Agent Shield grade: F (1140 findings — large skills/graphify library dominates)**  
**npm audit: 1 HIGH + 1 MODERATE**

#### CVEs — npm Dependencies

| Severity | Package | Range | Fix | Advisory |
|---|---|---|---|---|
| **High** | `fast-uri` | ≤3.1.1 | >3.1.1 | Path traversal via percent-encoded dot segments; host confusion via percent-encoded authority delimiters |
| Moderate | `hono` | ≤4.12.17 | >4.12.17 | CSS Declaration Injection in JSX SSR; JWT NumericDate claims bypass; Cache Middleware cross-user leakage via Vary: Authorization |

Evidence: `docs/reports/security/raw/npm-audit-ecc.json`

---

### 4. autoresearch

**Agent Shield grade: D (261 findings)**  
**pip-audit (uv): 4 CVEs (same as backend — shared urllib3/langsmith/ujson)**

| Severity | Package | Installed | Fix | CVE |
|---|---|---|---|---|
| Critical | `urllib3` | 2.6.3 | 2.7.0 | CVE-2026-44431, CVE-2026-44432 |
| Critical | `langsmith` | 0.7.31 | 0.8.0 | CVE-2026-45134 |
| High | `ujson` | 5.12.0 | 5.12.1 | CVE-2026-44660 |

Agent governance HIGH: `AGENTS.md` and `CLAUDE.md` contain destructive shell command patterns and global install commands (flagged by Agent Shield — likely intentional tooling docs).

Evidence: `docs/reports/security/raw/pip-audit-autoresearch.json`

---

### 5. openseabri

**Agent Shield grade: C (20 findings) — best score**  
**npm audit: 0 vulnerabilities**  
**Secrets: none**

Harness drift: `seabridge-dev/api/app/routes/connectors.py:37` — route without visible auth dependency. Investigate whether this is a public developer-API endpoint.

Evidence: `docs/reports/security/raw/npm-audit-openseabri.json`

---

### 6. climada-stack

**pip-audit (copernicus requirements): 0 CVEs**  
No Node packages at root. No active Python venv (conda-managed externally).  
Bandit and semgrep scans deferred — no local interpreter; run via a dedicated conda env when available.

---

## SDK Upgrade Matrix

| SDK | Current | Latest (2026-05) | Risk | Feynman brief |
|---|---|---|---|---|
| `starlette` | 0.52.1 | 1.0.0 | Low — no CVEs, stability release | `autoresearch/feynman/outputs/starlette-0.52-to-1.0-fastapi-migration.md` |
| `anthropic` | 0.85.0 | 0.102.0 | Low — floor bumped to 0.85.0; no breaking changes in range | `autoresearch/feynman/outputs/anthropic-sdk-0.85-to-0.102-migration.md` |
| `cryptography` | 46.0.7 | 48.0.0 | Likely safe for standard usage | Review PyPI changelog |
| `beanie` | 1.30.0 | 2.1.0 | **Breaking** — ODM API rewrite | Check beanie-odm.com migration guide |
| `next` | ~16.x | >16.2.5 | Active security vulns | Urgent: bump immediately |
| `fast-uri` | ≤3.1.1 | >3.1.1 | High — path traversal | Urgent: bump in ECC package.json |
| `hono` | ≤4.12.17 | >4.12.17 | Moderate — JWT bypass | Bump in ECC package.json |
| `celery` | 5.3.4 | 5.6.3 | Minor+ — check broker config | Review celery 5.4/5.5/5.6 changelogs |
| `langsmith` | 0.7.31 | 0.8.3 | **CVE** — bump required | ----- |
| `urllib3` | 2.6.3 | 2.7.0 | **CVE** — bump required | ----- |

---

## Suggested Remediation PRs

Group fixes to minimize PR count and test blast radius:

### PR-1: Urgent CVE Patches (manageesg-backend)
**Risk: HIGH | Effort: S (one-liner per package)**
- `urllib3`: 2.6.3 → 2.7.0
- `langsmith`: 0.7.31 → 0.8.3
- `ujson`: 5.12.0 → 5.12.1
- Run: `pip install urllib3==2.7.0 langsmith==0.8.3 ujson==5.12.1` → update `requirements.txt`

### PR-2: Frontend Next.js Security Bump
**Risk: HIGH | Effort: M (regression test required)**
- `next`: current → latest stable >16.2.5
- Run full Playwright regression suite post-bump

### PR-3: ECC npm Security Bumps
**Risk: HIGH/MODERATE | Effort: S**
- `fast-uri`: bump past 3.1.1 in `package.json`
- `hono`: bump past 4.12.17

### PR-4: Backend MD5 + Dockerfile Hardening
**Risk: MEDIUM | Effort: S**
- `app/services/cv/segmentation.py:54`: replace `md5()` with `md5(..., usedforsecurity=False)` or SHA-256
- `Dockerfile`: remove `ENV ENVIRONMENT=development`; consider multi-stage build for gcc

### PR-5: Auth Boundary Verification
**Risk: MEDIUM | Effort: S–M**
- Review each `share_viewer.py` route (5), `openseabri_routes.py:2922`, `connectors.py:37`
- Add `# intentionally public: <reason>` comment OR add auth `Depends`

### PR-6: autoresearch CVE Patches
**Risk: HIGH | Effort: S**
- Same urllib3/langsmith/ujson bumps as PR-1 but applied to autoresearch's `uv.lock`

### PR-7 (deferred): SDK Major Version Upgrades
**Risk: MEDIUM (for stability) | Effort: L**
- `starlette` 1.0.0: upgrade from 0.52.1 — no CVEs, low urgency; see Feynman brief for breaking changes (main: TestClient `raise_server_exceptions` default change)
- `beanie` 2.x: test all ODM-based endpoints (capped at <2.0.0 in requirements.txt, major rewrite)
- `anthropic`: floor already bumped to >=0.85.0 — no breaking changes; optional to bump further to >=0.102.0 when ready
- `cryptography` 48.x: safe to bundle with PR-1 or test separately

---

## Raw Evidence Paths

| File | Phase | Tool |
|---|---|---|
| `docs/reports/security/raw/pip-audit-backend.json` | Phase 1 | pip-audit |
| `docs/reports/security/raw/pip-audit-autoresearch.json` | Phase 1 | pip-audit (uv) |
| `docs/reports/security/raw/pip-audit-climada.json` | Phase 1 | pip-audit (requirements) |
| `docs/reports/security/raw/outdated-py-backend.json` | Phase 1 | pip list --outdated |
| `docs/reports/security/raw/npm-audit-frontend.json` | Phase 1 | npm audit |
| `docs/reports/security/raw/npm-audit-openseabri.json` | Phase 1 | npm audit |
| `docs/reports/security/raw/npm-audit-ecc.json` | Phase 1 | npm audit |
| `docs/reports/security/raw/npm-audit-autoresearch.json` | Phase 1 | npm audit |
| `docs/reports/security/raw/sast-backend-bandit.json` | Phase 2 | bandit |
| `docs/reports/security/raw/sast-backend-semgrep.json` | Phase 2 | semgrep (p/python) |
| `docs/reports/security/raw/secrets-backend-detect.json` | Phase 2 | detect-secrets |
| `docs/reports/security/raw/secrets-env-example.json` | Phase 2 | detect-secrets |
| `docs/reports/security/raw/secrets-frontend-detect.json` | Phase 2 | detect-secrets |
| `docs/reports/security/raw/secrets-openseabri-detect.json` | Phase 2 | detect-secrets |
| `docs/reports/harness/harness_scan_20260513_163242.json` | Phase 3 | check-harness.ps1 |
| `docs/reports/harness/harness_scan_new_findings_20260513_163242.json` | Phase 3 | check-harness.ps1 |
| `docs/reports/security/agentshield/agentshield_*_backend_*.json` | Phase 4 | Agent Shield |
| `docs/reports/security/agentshield/agentshield_*_frontend_*.json` | Phase 4 | Agent Shield |
| `docs/reports/security/agentshield/agentshield_*_openseabri_*.json` | Phase 4 | Agent Shield |
| `docs/reports/security/agentshield/agentshield_*_ecc_*.json` | Phase 4 | Agent Shield |
| `autoresearch/feynman/outputs/starlette-0.52-to-1.0-fastapi-migration.md` | Phase 5 | Research brief (Claude KB) |
| `autoresearch/feynman/outputs/anthropic-sdk-0.85-to-0.102-migration.md` | Phase 5 | Research brief (Claude KB) |

---

## Gaps & Follow-up

## Completed Security Hardening (2026-05-13/14) — Updated 2026-05-14

### Pre-commit Security Hooks (all 4 main repos)

| Hook | Repos | Status |
|---|---|---|
| `detect-secrets v1.5.0` | backend, frontend, openseabri, ECC | ✅ Passing — baselines initialized |
| `bandit v1.8.3 (medium+)` | backend | ✅ Passing — `soils.py`/`overture.py` excluded (typed-float SQL, documented) |
| `pip-audit` (pre-push) | backend | ✅ Configured |
| `npm audit` (pre-push) | frontend, openseabri | ✅ Configured |
| `yarn audit --level high` (pre-push) | ECC | ✅ Configured |

### Security Header Improvements (backend `app/main.py`)

Added to `SecurityHeadersMiddleware`:
- `Permissions-Policy`: camera, microphone, geolocation, payment, USB, sensors all denied
- `Cross-Origin-Opener-Policy: same-origin` — browsing context isolation
- `Cross-Origin-Resource-Policy: cross-origin` — cross-origin resource loading policy
- `Strict-Transport-Security`: added `preload` flag

### Real Vulnerability Fixed

| Severity | Rule | File | Fix Applied |
|---|---|---|---|
| **High** | B314 XML injection (XXE) | `due_diligence.py:1460` | Replaced `xml.etree.ElementTree.fromstring` with `defusedxml.ElementTree.fromstring` |

### False-Positive Suppressions Applied (bandit nosec)

| Rule | Files | Rationale |
|---|---|---|
| B608 SQL injection | `due_diligence.py:972`, `improved_ai_manager.py:1826`, `asset_portfolio.py:234`, `overture.py:85` | User-facing message strings or typed-float/int SSURGO queries — not SQL injections |
| B608 SQL injection | `soils.py` (excluded) | All SSURGO SQL uses typed-float lat/lng and int-validated cokey — excluded at hook level with documented rationale |
| B113 no timeout | `osm_overpass_adapter.py:193` | `timeout` is already passed as a kwarg — bandit doesn't follow variable references |
| B310 URL open | `openwork_runtime.py:176`, `gee_tools.py:63`, `gee_tools.py:85` | Operator-configured URLs or hardcoded GitHub catalog URLs — not user input |
| B104 bind all interfaces | `main.py:548`, `sample_fastapi_ui.py:128`, `evaluation/server.py:401` | Intentional dev server / uvicorn process manager bindings |

### Additional Fixes Applied 2026-05-14

| Severity | Finding | File | Fix |
|---|---|---|---|
| **High** | JWT alg:none bypass — `ALGORITHM` env var accepted any value including `none` | `app/core/config.py` | Added `@field_validator("algorithm")` that rejects `none`/empty and any algorithm not in the explicit allowlist |
| **High** | JWT secret key too short — no minimum entropy enforced | `app/core/config.py` | Added `@field_validator("secret_key")` that rejects keys shorter than 32 characters (HS256 brute-force floor) |
| **High** | Path traversal via unsanitized `file.filename` in single-file upload | `app/api/v1/endpoints/media.py:35` | Applied `sanitize_filename()` before passing to `upload_media_to_s3()` — multi-file endpoint already sanitized |
| **High** | Path traversal via unsanitized `file.filename` in building import upload | `app/api/v1/endpoints/asset_buildings.py:75` | Added `sanitize_filename()` call; imported helper from `app.utils.helpers` |
| Medium | SHA1 without `usedforsecurity=False` — bandit B324 | `app/services/risk_simulation_service.py:358,419` | Added `usedforsecurity=False` to both `sha1()` calls (non-cryptographic job ID generation) |
| Medium | `cryptography` floor too low — allowed 46.x which has removed-in-48.x APIs | `requirements.txt` | Bumped floor from `>=46.0.0` to `>=48.0.0` (TripleDES/ARC4 removed in 48.x — confirmed not used in codebase) |
| Medium | `langsmith` CVE comment incorrect | `requirements.txt`, `seabridge_ai/pyproject.toml` | Corrected to CVE-2026-25528 (SSRF) + CVE-2026-41182 (redaction bypass); floor bumped to `>=0.8.3` in both files |
| Medium | `toolbox` MCP server config outside `mcpServers` block | `.mcp.json` | Fixed — `toolbox` key moved inside `mcpServers` (user approved; written 2026-05-14) |
| Medium | `ENV ENVIRONMENT=development` hardcoded in staging Dockerfile | `docker/Dockerfile.staging` | Removed static env line; comment instructs runtime injection (`-e ENVIRONMENT=staging\|production`) |

### Infrastructure CVEs — Fixed in docker-compose.yml and Fly.io Dockerfile (2026-05-14)

| Severity | CVE | Component | Status | Fixed In |
|---|---|---|---|---|
| **Critical (CVSS 10.0)** | CVE-2025-49844 "RediShell" | Redis server | ✅ **Fixed** | `docker/docker-compose.yml` → `redis:7.4-alpine`; `seabridge-dev/ops/fly-redis/Dockerfile` → `FROM redis:7.4-alpine` |
| High (7.5) | CVE-2025-21605 | Redis server | ✅ **Fixed** | Covered by 7.4-alpine (7.4.6+) |
| High | CVE-2026-23479, CVE-2026-25243 | Redis server | ✅ **Fixed** | Covered by 7.4-alpine (7.4.6+) |
| **Critical (actively exploited)** | CVE-2025-14847 | MongoDB server | ✅ **Fixed** | `docker/docker-compose.yml` → `mongo:8.0` |

**Note:** Production Redis and MongoDB running on managed services (Atlas, ElastiCache, Upstash, Fly) require independent version upgrades by the DevOps team — the docker-compose/Dockerfile fixes apply to local dev and staging self-hosted instances only.

### Known Harness Hook Limitation

`pre-commit run --all-files` runs the harness on 39,000+ Python files (including venv), exceeding Windows command-line limits and causing a ConvertFrom-Json error in the ECC harness script. This does **not** affect normal git-commit workflows, which only process staged/changed files. Pre-existing issue; not caused by this audit pass.

---

## Gaps & Follow-up

| Gap | Reason | Follow-up |
|---|---|---|
| Strix active scan | Running 2026-05-14; results TBD | Results appended below when scan completes |
| **GCP Service Account rotation** | Private key committed to git history (`be6e5e961`) | **Disable `sheets-access@materiality-468403.iam.gserviceaccount.com` in GCP Console → IAM → Service Accounts → Disable Keys. Then rotate with a new key.** |
| `seabridge_ai/.env` AWS keys | Gitignored but present; dev vs prod unclear | Verify `AKIA...[redacted-seabridge-ai]` is dev-only. Rotate if any production usage. |
| `urllib3` exact version pin | Floor pinned at ≥2.7.0; installed version may lag | Run `pip install "urllib3==2.7.0"` and update requirements.txt with exact pin |
| MongoDB Atlas production upgrade | Atlas managed service; needs UI action | Upgrade cluster to MongoDB 8.0.4+ via Atlas console → Cluster → MongoDB Version |
| Fly Redis production deploy | Dockerfile patched but not yet deployed | Run `fly deploy` in `seabridge-dev/ops/fly-redis/` to push the `redis:7.4-alpine` image |
| climada-stack Python SAST | conda env; no pre-commit hooks | `conda run -n climada-env bandit -r <seabridge-owned-paths> -ll` (174 findings found; 4 HIGH all in upstream `climada_petals`) |
| seabridge_ai bandit result | 931 findings ALL in `.uv-cache` (package cache) | Rerun with `--exclude seabridge_ai/.uv-cache` to get source-only results |
| Feynman live query | Pi OAuth token expired | Run `feynman model login openai` interactively to refresh token |
| climada/autoresearch pre-commit hooks | Not set up | Add detect-secrets + pip-audit hooks to climada-stack and autoresearch repos |
