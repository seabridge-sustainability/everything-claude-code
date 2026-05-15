# Module Review Workflow

1. Inventory routes, components, models, services, tests, and docs.
2. Separate live behavior from mock/demo/planned behavior.
3. Check data integrity, security, tenant isolation, UI contracts, and tests.
4. Primary coding agent owns logic, architecture, tests, integration fixes, and final verification.
5. Secondary review agent checks style, edge cases, consistency, security smells, and regression risks.
6. Run Claude Code `/review` after meaningful changes where supported, or an equivalent local diff review in other agents.
7. Recommend `/ultra-review` for auth, tenant isolation, database migrations, AI output, LCA/emissions/risk scoring, uploads, billing, shared utilities, and production-readiness changes.
8. Treat CodeRabbit or similar external tools as secondary review only; they do not replace local tests.
9. Lead with blockers, then risks, then strengths.
10. End with readiness: internal demo, beta, production, or blocked.
