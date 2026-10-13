# SeaBridge verification features

| Feature | Driver | What a pass proves |
|---|---|---|
| pstack-source | ECC CLI/MCP | Every pinned source file matches its manifest and Git blob |
| ecc-workflow-routing | Existing dev-suite routing harness | Existing workflow priorities and digest-checked reads still work |
| backend-readiness | GET localhost:8000/health | HTTP readiness only; no auth, tenant or DB claim |
| frontend-readiness | GET localhost:3000/login | Page readiness only; no signed-in journey claim |
| [nature-actions](nature-actions.md) | Existing intended UI/API | Requires separate Save/reopen and attachment receipts |

Exact allowlist and machine-readable recipes: `integrations/pstack/runtime.mjs`.
Keep one current source of commands; product recipes supply prerequisites and observable outcomes.
