# Everything Claude Code (ECC) Ã¢â‚¬â€ Agent Instructions

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


This is a **production-ready AI coding plugin** providing 30 specialized agents, ~74 skills, 60 commands, and automated hook workflows for software development.

**Version:** 1.9.0

## Core Principles

1. **Agent-First** Ã¢â‚¬â€ Delegate to specialized agents for domain tasks
2. **Test-Driven** Ã¢â‚¬â€ Write tests before implementation, 80%+ coverage required
3. **Security-First** Ã¢â‚¬â€ Never compromise on security; validate all inputs
4. **Immutability** Ã¢â‚¬â€ Always create new objects, never mutate existing ones
5. **Plan Before Execute** Ã¢â‚¬â€ Plan complex features before writing code

## Documentation Retrieval Order

When documentation is needed, follow this order:

1. Local repo file if the answer is already in the checked-out workspace.
2. ECC's local Context Hub bundle via `chub` for ECC-specific guides, commands, playbooks, and policies.
3. Public Context Hub entries for non-ECC skills or shared playbooks.
4. Context7 only for third-party libraries, frameworks, SDKs, and APIs.
5. `llms.txt` or web browsing only as fallback paths.

## Available Agents

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| planner | Implementation planning | Complex features, refactoring |
| architect | System design and scalability | Architectural decisions |
| tdd-guide | Test-driven development | New features, bug fixes |
| code-reviewer | Code quality and maintainability | After writing/modifying code |
| security-reviewer | Vulnerability detection | Before commits, sensitive code |
| build-error-resolver | Fix build/type errors | When build fails |
| e2e-runner | End-to-end Playwright testing | Critical user flows |
| refactor-cleaner | Dead code cleanup | Code maintenance |
| doc-updater | Documentation and codemaps | Updating docs |
| docs-lookup | Source-aware documentation routing | ECC workflow docs and library/API documentation questions |
| cpp-reviewer | C++ code review | C++ projects |
| cpp-build-resolver | C++ build errors | C++ build failures |
| go-reviewer | Go code review | Go projects |
| go-build-resolver | Go build errors | Go build failures |
| kotlin-reviewer | Kotlin code review | Kotlin/Android/KMP projects |
| kotlin-build-resolver | Kotlin/Gradle build errors | Kotlin build failures |
| database-reviewer | PostgreSQL/Supabase specialist | Schema design, query optimization |
| python-reviewer | Python code review | Python projects |
| java-reviewer | Java and Spring Boot code review | Java/Spring Boot projects |
| java-build-resolver | Java/Maven/Gradle build errors | Java build failures |
| chief-of-staff | Communication triage and drafts | Multi-channel email, Slack, LINE, Messenger |
| loop-operator | Autonomous loop execution | Run loops safely, monitor stalls, intervene |
| harness-optimizer | Harness config tuning | Reliability, cost, throughput |
| rust-reviewer | Rust code review | Rust projects |
| rust-build-resolver | Rust build errors | Rust build failures |
| pytorch-build-resolver | PyTorch runtime/CUDA/training errors | PyTorch build/training failures |
| typescript-reviewer | TypeScript/JavaScript code review | TypeScript/JavaScript projects |

## Agent Orchestration

Use agents proactively without user prompt:
- Complex feature requests Ã¢â€ â€™ **planner**
- Code just written/modified Ã¢â€ â€™ **code-reviewer**
- Bug fix or new feature Ã¢â€ â€™ **tdd-guide**
- Architectural decision Ã¢â€ â€™ **architect**
- Security-sensitive code Ã¢â€ â€™ **security-reviewer**
- Multi-channel communication triage Ã¢â€ â€™ **chief-of-staff**
- Autonomous loops / loop monitoring Ã¢â€ â€™ **loop-operator**
- Harness config reliability and cost Ã¢â€ â€™ **harness-optimizer**

Use parallel execution for independent operations Ã¢â‚¬â€ launch multiple agents simultaneously.

## Security Guidelines

**Before ANY commit:**
- No hardcoded secrets (API keys, passwords, tokens)
- All user inputs validated
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitized HTML)
- CSRF protection enabled
- Authentication/authorization verified
- Rate limiting on all endpoints
- Error messages don't leak sensitive data

**Secret management:** NEVER hardcode secrets. Use environment variables or a secret manager. Validate required secrets at startup. Rotate any exposed secrets immediately.

**If security issue found:** STOP Ã¢â€ â€™ use security-reviewer agent Ã¢â€ â€™ fix CRITICAL issues Ã¢â€ â€™ rotate exposed secrets Ã¢â€ â€™ review codebase for similar issues.

## Coding Style

**Immutability (CRITICAL):** Always create new objects, never mutate. Return new copies with changes applied.

**File organization:** Many small files over few large ones. 200-400 lines typical, 800 max. Organize by feature/domain, not by type. High cohesion, low coupling.

**Error handling:** Handle errors at every level. Provide user-friendly messages in UI code. Log detailed context server-side. Never silently swallow errors.

**Input validation:** Validate all user input at system boundaries. Use schema-based validation. Fail fast with clear messages. Never trust external data.

**Code quality checklist:**
- Functions small (<50 lines), files focused (<800 lines)
- No deep nesting (>4 levels)
- Proper error handling, no hardcoded values
- Readable, well-named identifiers

## Testing Requirements

**Minimum coverage: 80%**

Test types (all required):
1. **Unit tests** Ã¢â‚¬â€ Individual functions, utilities, components
2. **Integration tests** Ã¢â‚¬â€ API endpoints, database operations
3. **E2E tests** Ã¢â‚¬â€ Critical user flows

**TDD workflow (mandatory):**
1. Write test first (RED) Ã¢â‚¬â€ test should FAIL
2. Write minimal implementation (GREEN) Ã¢â‚¬â€ test should PASS
3. Refactor (IMPROVE) Ã¢â‚¬â€ verify coverage 80%+

Troubleshoot failures: check test isolation Ã¢â€ â€™ verify mocks Ã¢â€ â€™ fix implementation (not tests, unless tests are wrong).

## Development Workflow

1. **Plan** Ã¢â‚¬â€ Use planner agent, identify dependencies and risks, break into phases
2. **TDD** Ã¢â‚¬â€ Use tdd-guide agent, write tests first, implement, refactor
3. **Review** Ã¢â‚¬â€ Use code-reviewer agent immediately, address CRITICAL/HIGH issues
4. **Capture knowledge in the right place**
   - Personal debugging notes, preferences, and temporary context Ã¢â€ â€™ auto memory
   - Team/project knowledge (architecture decisions, API changes, runbooks) Ã¢â€ â€™ the project's existing docs structure
   - If the current task already produces the relevant docs or code comments, do not duplicate the same information elsewhere
   - If there is no obvious project doc location, ask before creating a new top-level file
5. **Commit** Ã¢â‚¬â€ Conventional commits format, comprehensive PR summaries

## Git Workflow

**Commit format:** `<type>: <description>` Ã¢â‚¬â€ Types: feat, fix, refactor, docs, test, chore, perf, ci

**PR workflow:** Analyze full commit history Ã¢â€ â€™ draft comprehensive summary Ã¢â€ â€™ include test plan Ã¢â€ â€™ push with `-u` flag.

## Architecture Patterns

**API response format:** Consistent envelope with success indicator, data payload, error message, and pagination metadata.

**Repository pattern:** Encapsulate data access behind standard interface (findAll, findById, create, update, delete). Business logic depends on abstract interface, not storage mechanism.

**Skeleton projects:** Search for battle-tested templates, evaluate with parallel agents (security, extensibility, relevance), clone best match, iterate within proven structure.

## Performance

**Context management:** Avoid last 20% of context window for large refactoring and multi-file features. Lower-sensitivity tasks (single edits, docs, simple fixes) tolerate higher utilization.

**Build troubleshooting:** Use build-error-resolver agent Ã¢â€ â€™ analyze errors Ã¢â€ â€™ fix incrementally Ã¢â€ â€™ verify after each fix.

## Project Structure

```
agents/          Ã¢â‚¬â€ 30 specialized subagents
skills/          Ã¢â‚¬â€ ~74 workflow skills and domain knowledge
commands/        Ã¢â‚¬â€ 60 slash commands
hooks/           Ã¢â‚¬â€ Trigger-based automations
rules/           Ã¢â‚¬â€ Always-follow guidelines (common + per-language)
scripts/         Ã¢â‚¬â€ Cross-platform Node.js utilities
mcp-configs/     Ã¢â‚¬â€ 14 MCP server configurations
tests/           Ã¢â‚¬â€ Test suite
```

## Success Metrics

- All tests pass with 80%+ coverage
- No security vulnerabilities
- Code is readable and maintainable
- Performance is acceptable
- User requirements are met
