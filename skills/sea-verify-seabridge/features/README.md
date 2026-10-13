# SeaBridge verification features

| Feature | Driver | What a pass proves |
|---|---|---|
| pstack-source | ECC CLI/MCP | Every pinned source file matches its manifest and Git blob |
| ecc-workflow-routing | Existing dev-suite routing harness | Existing workflow priorities and digest-checked reads still work |
| backend-readiness | GET localhost:8000/health | HTTP readiness only; no auth, tenant or DB claim |
| frontend-readiness | GET localhost:3000/login | Page readiness only; no signed-in journey claim |
| backend-auth-contract | Existing pytest/TestClient fixture | Validate-user route regression; no real authentication proof |
| backend-openseabri-contract | Existing pytest fixture | Routes and API-key failure contract; no connected product proof |
| frontend-auth-return-path | Existing Vitest | Property return-path preservation and unsafe URL rejection |
| factory contract | Existing schema AST parsers | Selected Energy Findings enums, required fields and nullability match |
| factory verify/fuzz | OS-restricted production-helper snapshot | Seeded URL invariants and actual filesystem/egress denial; no authenticated UI claim |
| factory intake/claim/propose/release | Admitted GitHub metadata and local queue | Bounded connection, idempotence and version/token-bound local claim; no auto implementation grant |
| authenticated-property-journey | Governed existing UI/API | Requires real login, property and tenant-boundary receipts |
| openaccess-property-result | Governed Model API/UI/CSV | Requires explicit Climate resumption and eligible public-data results |
| [nature-actions](nature-actions.md) | Existing intended UI/API | Requires separate Save/reopen and attachment receipts |

Exact allowlist and machine-readable recipes: `integrations/pstack/runtime.mjs`.
Keep one current source of commands; product recipes supply prerequisites and observable outcomes.

Run `node integrations/pstack/cli.mjs verify FEATURE` from ECC or call the existing
`pstack_verify_feature` MCP tool. Contract commands use the existing venv/Vitest,
bounded time/output and source hashes before/after; they install nothing and start
no application. PASS applies only to the named contract. Product recipes stay
BLOCKED until the authorized real journey supplies its evidence. Climate remains
paused. Parallel evaluators may inspect completed receipts; serialize shared
browser/data journeys and any Mongo suite.

Factory operations use `suite_factory`/`pstack_factory` or the existing-guide CLI
at `integrations/software-factory/cli.mjs`. They are not Pstack feature IDs.
Prerequisites and retained proof limits live in `docs/tools/PSTACK_ECC_GUIDE.md`.
