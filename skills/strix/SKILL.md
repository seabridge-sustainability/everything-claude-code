---
name: strix
description: Strix — autonomous AI security pentesting agents. Use to run OWASP Top 10 / vulnerability scans against the SeaBridgeAI backend (FastAPI) and frontend (Next.js) using real exploit validation via Docker sandbox. Recommended model: anthropic/claude-sonnet-4-6.
triggers:
  - "security scan"
  - "pentest"
  - "vulnerability scan"
  - "strix"
  - "security audit"
  - "owasp"
  - "security assessment"
  - "run strix"
  - "run-strix"
---

# Strix — AI Security Pentesting Skill

Strix deploys autonomous AI hacker agents that find and validate real vulnerabilities with proof-of-concepts. Unlike static analysis, Strix executes code dynamically inside a Docker sandbox.

**Repo cloned at:** `C:\Users\adelm\SeaBridgeAI\autoresearch\strix\`
**Wrapper script:** `C:\Users\adelm\SeaBridgeAI\autoresearch\strix\strix.ps1`

Also see the top-level `co-scientist-orchestrator` skill for the full action list
across all autoresearch tools.

---

## Prerequisites

- Docker Desktop **running** (required — Strix uses a sandbox container)
- `uv` available in PATH
- `ANTHROPIC_API_KEY` set in the current shell or a secret manager

---

## SeaBridgeAI Scan Targets

| Target | Path | Notes |
|--------|------|-------|
| Backend | `C:\Users\adelm\SeaBridgeAI\manageesg-backend` | FastAPI + MongoDB + AWS |
| Frontend | `C:\Users\adelm\SeaBridgeAI\manageesg-frontend` | Next.js |

---

## Quick Usage

Run from `C:\Users\adelm\SeaBridgeAI\autoresearch\strix\`, or use the full path:

```powershell
# Scan the backend
.\strix\strix.ps1 -Target backend

# Scan the frontend
.\strix\strix.ps1 -Target frontend

# Scan a custom path
.\strix\strix.ps1 -Target custom -Path "C:\path\to\app"

# Quick scan (CI/CD speed)
.\strix\strix.ps1 -Target backend -Mode quick

# Standard scan
.\strix\strix.ps1 -Target backend -Mode standard

# Headless (non-interactive, for CI)
.\strix\strix.ps1 -Target backend -Headless

# Use a different LLM model
.\strix\strix.ps1 -Target backend -Model "anthropic/claude-opus-4-6"
```

(paths above assume the current directory is `autoresearch\`; adjust if running from elsewhere)

---

## Environment Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `STRIX_LLM` | `anthropic/claude-sonnet-4-6` | LLM provider (default) |
| `LLM_API_KEY` | `$ANTHROPIC_API_KEY` | API key passed to LiteLLM |
| `STRIX_SCAN_MODE` | `quick`, `standard`, or `deep` | Scan depth (default: `deep`) |

---

## Manual Setup (first time)

```powershell
cd C:\Users\adelm\SeaBridgeAI\autoresearch\strix
uv sync --no-dev
```

---

## Manual Run (direct CLI)

```powershell
$env:STRIX_LLM = "anthropic/claude-sonnet-4-6"
$env:LLM_API_KEY = $env:ANTHROPIC_API_KEY
cd C:\Users\adelm\SeaBridgeAI\autoresearch\strix
uv run strix --target "C:\Users\adelm\SeaBridgeAI\manageesg-backend"
```

---

## What Strix Checks

- **Authentication & Authorization** — JWT bypass, privilege escalation, Cognito misconfig
- **Injection** — SQL/NoSQL injection (MongoDB), command injection, SSTI
- **XSS** — reflected, stored, DOM-based
- **SSRF / CSRF** — server-side request forgery, missing CSRF tokens
- **Sensitive Data Exposure** — hardcoded secrets, API key leakage in responses
- **Security Misconfiguration** — CORS, headers, debug endpoints
- **Broken Access Control** — IDOR, insecure direct object references
- **API Security** — rate limiting, input validation, error message leakage

---

## Output

Results saved to: `C:\Users\adelm\SeaBridgeAI\autoresearch\strix\strix_runs\<run-name>\`

- `report.html` — full HTML report
- `findings.json` — structured vulnerability list with CVSS scores
- `poc/` — proof-of-concept scripts for confirmed vulnerabilities

---

## Integration with co-scientist-orchestrator

```powershell
.\co-scientist-orchestrator.ps1 -Action run-strix -StrixTarget backend
.\co-scientist-orchestrator.ps1 -Action run-strix -StrixTarget frontend
.\co-scientist-orchestrator.ps1 -Action run-strix -StrixTarget backend -StrixMode quick
```

---

## Safety Policy

- Strix runs **only against local codebases** — never against live production endpoints without explicit written approval from adelmar@seabridgesustainability.com
- Do not run against shared/cloud infrastructure without authorization
- Manual opt-in only — do not auto-invoke from hooks
