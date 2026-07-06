# Acknowledgements

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
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
