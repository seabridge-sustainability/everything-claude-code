# Cross-Repo Change Workflow

1. List every repo touched and the ownership of each change.
2. Update shared guidance in ECC first when behavior is reusable.
3. Add only lightweight pointers or repo-specific overrides in product repos.
4. Verify contracts across repo boundaries.
5. Run targeted tests in each repo touched.
6. Use primary/secondary review collaboration for meaningful cross-repo changes: primary owns logic/tests/integration, secondary checks consistency/security/regression risks.
7. Run Claude Code `/review` where supported, or equivalent local diff review elsewhere.
8. Recommend `/ultra-review` for auth, tenant isolation, migrations, AI output, LCA/emissions/risk scoring, uploads, billing, shared utilities, and production-readiness changes.
9. Treat CodeRabbit or similar tools as secondary only; they do not replace local tests.
10. Produce a handoff with changed files, commands run, and manual follow-up.
