# Acknowledgements

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


/cso v2 was informed by research across the security audit landscape. Credits to:

- **[Sentry Security Review](https://github.com/getsentry/skills)** Ã¢â‚¬â€ The confidence-based reporting system (only HIGH confidence findings get reported) and the "research before reporting" methodology (trace data flow, check upstream validation) validated our 8/10 daily confidence gate. TimOnWeb rated it the only security skill worth installing out of 5 tested.
- **[Trail of Bits Skills](https://github.com/trailofbits/skills)** Ã¢â‚¬â€ The audit-context-building methodology (build a mental model before hunting bugs) directly inspired Phase 0. Their variant analysis concept (found one vuln? Search the whole codebase for the same pattern) inspired Phase 12's variant analysis step.
- **[Shannon by Keygraph](https://github.com/KeygraphHQ/shannon)** Ã¢â‚¬â€ Autonomous AI pentester achieving 96.15% on the XBOW benchmark (100/104 exploits). Validated that AI can do real security testing, not just checklist scanning. Our Phase 12 active verification is the static-analysis version of what Shannon does live.
- **[afiqiqmal/claude-security-audit](https://github.com/afiqiqmal/claude-security-audit)** Ã¢â‚¬â€ The AI/LLM-specific security checks (prompt injection, RAG poisoning, tool calling permissions) inspired Phase 7. Their framework-level auto-detection (detecting "Next.js" not just "Node/TypeScript") inspired Phase 0's framework detection step.
- **[Snyk ToxicSkills Research](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/)** Ã¢â‚¬â€ The finding that 36% of AI agent skills have security flaws and 13.4% are malicious inspired Phase 8 (Skill Supply Chain scanning).
- **[Daniel Miessler's Personal AI Infrastructure](https://github.com/danielmiessler/Personal_AI_Infrastructure)** Ã¢â‚¬â€ The incident response playbooks and protection file concept informed the remediation and LLM security phases.
- **[McGo/claude-code-security-audit](https://github.com/McGo/claude-code-security-audit)** Ã¢â‚¬â€ The idea of generating shareable reports and actionable epics informed our report format evolution.
- **[Claude Code Security Pack](https://dev.to/myougatheaxo/automate-owasp-security-audits-with-claude-code-security-pack-4mah)** Ã¢â‚¬â€ Modular approach (separate /security-audit, /secret-scanner, /deps-check skills) validated that these are distinct concerns. Our unified approach sacrifices modularity for cross-phase reasoning.
- **[Anthropic Claude Code Security](https://www.anthropic.com/news/claude-code-security)** Ã¢â‚¬â€ Multi-stage verification and confidence scoring validated our parallel finding verification approach. Found 500+ zero-days in open source.
- **[@gus_argon](https://x.com/gus_aragon/status/2035841289602904360)** Ã¢â‚¬â€ Identified critical v1 blind spots: no stack detection (runs all-language patterns), uses bash grep instead of Claude Code's Grep tool, `| head -20` truncates results silently, and preamble bloat. These directly shaped v2's stack-first approach and Grep tool mandate.
