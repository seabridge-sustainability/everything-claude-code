# Pre-Merge Checklist

- [ ] `/review` or equivalent local diff review completed after meaningful changes.
- [ ] `/ultra-review` completed or explicitly recommended before auth, database migration, billing, production data, AI output, file upload, reporting, LCA, emissions, climate-risk, due-diligence, shared-utility, or major cross-repo changes.
- [ ] Primary coding agent covered logic, architecture, tests, integration fixes, and final verification.
- [ ] Secondary review agent or equivalent review pass checked style, edge cases, consistency, security smells, and regression risks.
- [ ] CodeRabbit or similar external review, if used, was treated as secondary and did not replace local tests.
- [ ] Tests, lint, typecheck, and browser/API checks run according to risk.
- [ ] Migration/rollback plan exists if schema or data changes are involved.
- [ ] Secrets and environment files reviewed.
- [ ] User explicitly requested commit/push if those actions are taken.
