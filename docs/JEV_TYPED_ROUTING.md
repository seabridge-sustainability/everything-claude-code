# Jev Typed Routing Pilot

ECC uses TypeSafe Jev only for bounded classification decisions. Jev does not
generate code, review a diff, invoke tools, or authorize actions.

## Configuration

```dotenv
AI_GATEWAY_API_KEY=
JEV_ENABLED=false
JEV_SHADOW_MODE=true
JEV_TIMEOUT_MS=800
JEV_MIN_CONFIDENCE=0.85
JEV_REQUIRE_ZDR=true
JEV_ALLOW_NON_ZDR=false
JEV_MODEL=typesafe-ai/jev
```

Keep the key in ignored local configuration or the process environment. Never
pass it in command arguments, prompts, logs, fixtures, or committed files.

`JEV_ENABLED=false` preserves the current workflow. With shadow mode enabled,
the request runs but its answer cannot change routing. Set shadow mode to false
only after labeled replay evaluation establishes per-route thresholds.

## CLI

Send one JSON object on stdin:

```json
{"kind":"error","state":"pytest failed with AssertionError","sensitive":true}
```

```powershell
Get-Content request.json | node scripts/jev-route.js
```

Available decisions:

- `task`: `fast`, `standard`, `deep`, `security`, or `manual`.
- `error`: `test`, `type`, `lint`, `dependency`, `environment`, `security`, or `unknown`.
- `reviewers`: optional security, database, accessibility, and documentation dimensions.

Quality and language reviewers remain deterministic defaults. Jev may add a
review dimension but must never remove a security reviewer selected by static
rules.

## Privacy and failure policy

- Sensitive input always requests Vercel Zero Data Retention.
- Non-ZDR calls require both `JEV_REQUIRE_ZDR=false` and
  `JEV_ALLOW_NON_ZDR=true`; use that combination only for synthetic/public data.
- Timeout, HTTP error, invalid output, missing key, or low confidence preserves
  the current deterministic workflow.
- Raw state and credentials are never logged.
- This is a CLI adapter, not an MCP server, so it adds no tool schemas to the
  coding agent's context window.

## Evaluation gate

Run the bounded promotional benchmark only with synthetic inputs:

```powershell
npm run jev:benchmark -- --allow-non-zdr-synthetic --repeats=3
```

The script contains its entire fixed test set, accepts no external state, and
reports accuracy, confidence-gated coverage, p50/p95 latency, fallbacks, and
gateway-reported cost.

On 2026-09-25, 30 of 36 promotional requests completed before gateway errors;
all 30 classifications matched their labels, 28 exceeded the 0.85 threshold,
and latency was 190 ms p50 / 386 ms p95 with USD 0 reported cost. A cooldown
pass then completed 12/12, all correct, with 11 above threshold and latency of
275 ms p50 / 555 ms p95. Keep the fallback active because burst throughput was
not sufficient for the full first run.

Before autonomous routing, replay at least 300 labeled examples per decision
family and report precision/recall by class, unsafe false-negative rate,
calibration, disagreement with current routing, p50/p95 latency, fallback rate,
and downstream model cost. Tune confidence independently for each family.
