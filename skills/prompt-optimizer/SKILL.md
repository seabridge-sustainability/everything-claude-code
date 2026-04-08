---
name: prompt-optimizer
description: >-
  Analyze raw prompts, identify intent and gaps, match ECC components
  (skills/commands/agents/hooks), and output a ready-to-paste optimized
  prompt. Advisory role only Ã¢â‚¬â€ never executes the task itself.
  TRIGGER when: user says "optimize prompt", "improve my prompt",
  "how to write a prompt for", "help me prompt", "rewrite this prompt",
  or explicitly asks to enhance prompt quality. Also triggers on Chinese
  equivalents: "Ã¤Â¼ËœÃ¥Å’â€“prompt", "Ã¦â€Â¹Ã¨Â¿â€ºprompt", "Ã¦â‚¬Å½Ã¤Â¹Ë†Ã¥â€ â„¢prompt", "Ã¥Â¸Â®Ã¦Ë†â€˜Ã¤Â¼ËœÃ¥Å’â€“Ã¨Â¿â„¢Ã¤Â¸ÂªÃ¦Å’â€¡Ã¤Â»Â¤".
  DO NOT TRIGGER when: user wants the task executed directly, or says
  "just do it" / "Ã§â€ºÂ´Ã¦Å½Â¥Ã¥ÂÅ¡". DO NOT TRIGGER when user says "Ã¤Â¼ËœÃ¥Å’â€“Ã¤Â»Â£Ã§Â Â",
  "Ã¤Â¼ËœÃ¥Å’â€“Ã¦â‚¬Â§Ã¨Æ’Â½", "optimize performance", "optimize this code" Ã¢â‚¬â€ those are
  refactoring/performance tasks, not prompt optimization.
origin: community
metadata:
  author: YannJY02
  version: "1.0.0"
---

# Prompt Optimizer

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Analyze a draft prompt, critique it, match it to ECC ecosystem components,
and output a complete optimized prompt the user can paste and run.

## When to Use

- User says "optimize this prompt", "improve my prompt", "rewrite this prompt"
- User says "help me write a better prompt for..."
- User says "what's the best way to ask Claude Code to..."
- User says "Ã¤Â¼ËœÃ¥Å’â€“prompt", "Ã¦â€Â¹Ã¨Â¿â€ºprompt", "Ã¦â‚¬Å½Ã¤Â¹Ë†Ã¥â€ â„¢prompt", "Ã¥Â¸Â®Ã¦Ë†â€˜Ã¤Â¼ËœÃ¥Å’â€“Ã¨Â¿â„¢Ã¤Â¸ÂªÃ¦Å’â€¡Ã¤Â»Â¤"
- User pastes a draft prompt and asks for feedback or enhancement
- User says "I don't know how to prompt for this"
- User says "how should I use ECC for..."
- User explicitly invokes `/prompt-optimize`

### Do Not Use When

- User wants the task done directly (just execute it)
- User says "Ã¤Â¼ËœÃ¥Å’â€“Ã¤Â»Â£Ã§Â Â", "Ã¤Â¼ËœÃ¥Å’â€“Ã¦â‚¬Â§Ã¨Æ’Â½", "optimize this code", "optimize performance" Ã¢â‚¬â€ these are refactoring tasks, not prompt optimization
- User is asking about ECC configuration (use `configure-ecc` instead)
- User wants a skill inventory (use `skill-stocktake` instead)
- User says "just do it" or "Ã§â€ºÂ´Ã¦Å½Â¥Ã¥ÂÅ¡"

## How It Works

**Advisory only Ã¢â‚¬â€ do not execute the user's task.**

Do NOT write code, create files, run commands, or take any implementation
action. Your ONLY output is an analysis plus an optimized prompt.

If the user says "just do it", "Ã§â€ºÂ´Ã¦Å½Â¥Ã¥ÂÅ¡", or "don't optimize, just execute",
do not switch into implementation mode inside this skill. Tell the user this
skill only produces optimized prompts, and instruct them to make a normal
task request if they want execution instead.

Run this 6-phase pipeline sequentially. Present results using the Output Format below.

### Analysis Pipeline

### Phase 0: Project Detection

Before analyzing the prompt, detect the current project context:

1. Check if a `CLAUDE.md` exists in the working directory Ã¢â‚¬â€ read it for project conventions
2. Detect tech stack from project files:
   - `package.json` Ã¢â€ â€™ Node.js / TypeScript / React / Next.js
   - `go.mod` Ã¢â€ â€™ Go
   - `pyproject.toml` / `requirements.txt` Ã¢â€ â€™ Python
   - `Cargo.toml` Ã¢â€ â€™ Rust
   - `build.gradle` / `pom.xml` Ã¢â€ â€™ Java / Kotlin / Spring Boot
   - `Package.swift` Ã¢â€ â€™ Swift
   - `Gemfile` Ã¢â€ â€™ Ruby
   - `composer.json` Ã¢â€ â€™ PHP
   - `*.csproj` / `*.sln` Ã¢â€ â€™ .NET
   - `Makefile` / `CMakeLists.txt` Ã¢â€ â€™ C / C++
   - `cpanfile` / `Makefile.PL` Ã¢â€ â€™ Perl
3. Note detected tech stack for use in Phase 3 and Phase 4

If no project files are found (e.g., the prompt is abstract or for a new project),
skip detection and flag "tech stack unknown" in Phase 4.

### Phase 1: Intent Detection

Classify the user's task into one or more categories:

| Category | Signal Words | Example |
|----------|-------------|---------|
| New Feature | build, create, add, implement, Ã¥Ë†â€ºÃ¥Â»Âº, Ã¥Â®Å¾Ã§Å½Â°, Ã¦Â·Â»Ã¥Å Â  | "Build a login page" |
| Bug Fix | fix, broken, not working, error, Ã¤Â¿Â®Ã¥Â¤Â, Ã¦Å Â¥Ã©â€â„¢ | "Fix the auth flow" |
| Refactor | refactor, clean up, restructure, Ã©â€¡ÂÃ¦Å¾â€ž, Ã¦â€¢Â´Ã§Ââ€  | "Refactor the API layer" |
| Research | how to, what is, explore, investigate, Ã¦â‚¬Å½Ã¤Â¹Ë†, Ã¥Â¦â€šÃ¤Â½â€¢ | "How to add SSO" |
| Testing | test, coverage, verify, Ã¦Âµâ€¹Ã¨Â¯â€¢, Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡ | "Add tests for the cart" |
| Review | review, audit, check, Ã¥Â®Â¡Ã¦Å¸Â¥, Ã¦Â£â‚¬Ã¦Å¸Â¥ | "Review my PR" |
| Documentation | document, update docs, Ã¦â€“â€¡Ã¦Â¡Â£ | "Update the API docs" |
| Infrastructure | deploy, CI, docker, database, Ã©Æ’Â¨Ã§Â½Â², Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œ | "Set up CI/CD pipeline" |
| Design | design, architecture, plan, Ã¨Â®Â¾Ã¨Â®Â¡, Ã¦Å¾Â¶Ã¦Å¾â€ž | "Design the data model" |

### Phase 2: Scope Assessment

If Phase 0 detected a project, use codebase size as a signal. Otherwise, estimate
from the prompt description alone and mark the estimate as uncertain.

| Scope | Heuristic | Orchestration |
|-------|-----------|---------------|
| TRIVIAL | Single file, < 50 lines | Direct execution |
| LOW | Single component or module | Single command or skill |
| MEDIUM | Multiple components, same domain | Command chain + /verify |
| HIGH | Cross-domain, 5+ files | /plan first, then phased execution |
| EPIC | Multi-session, multi-PR, architectural shift | Use blueprint skill for multi-session plan |

### Phase 3: ECC Component Matching

Map intent + scope + tech stack (from Phase 0) to specific ECC components.

#### By Intent Type

| Intent | Commands | Skills | Agents |
|--------|----------|--------|--------|
| New Feature | /plan, /tdd, /code-review, /verify | tdd-workflow, verification-loop | planner, tdd-guide, code-reviewer |
| Bug Fix | /tdd, /build-fix, /verify | tdd-workflow | tdd-guide, build-error-resolver |
| Refactor | /refactor-clean, /code-review, /verify | verification-loop | refactor-cleaner, code-reviewer |
| Research | /plan | search-first, iterative-retrieval | Ã¢â‚¬â€ |
| Testing | /tdd, /e2e, /test-coverage | tdd-workflow, e2e-testing | tdd-guide, e2e-runner |
| Review | /code-review | security-review | code-reviewer, security-reviewer |
| Documentation | /update-docs, /update-codemaps | Ã¢â‚¬â€ | doc-updater |
| Infrastructure | /plan, /verify | docker-patterns, deployment-patterns, database-migrations | architect |
| Design (MEDIUM-HIGH) | /plan | Ã¢â‚¬â€ | planner, architect |
| Design (EPIC) | Ã¢â‚¬â€ | blueprint (invoke as skill) | planner, architect |

#### By Tech Stack

| Tech Stack | Skills to Add | Agent |
|------------|--------------|-------|
| Python / Django | django-patterns, django-tdd, django-security, django-verification, python-patterns, python-testing | python-reviewer |
| Go | golang-patterns, golang-testing | go-reviewer, go-build-resolver |
| Spring Boot / Java | springboot-patterns, springboot-tdd, springboot-security, springboot-verification, java-coding-standards, jpa-patterns | code-reviewer |
| Kotlin / Android | kotlin-coroutines-flows, compose-multiplatform-patterns, android-clean-architecture | kotlin-reviewer |
| TypeScript / React | frontend-patterns, backend-patterns, coding-standards | code-reviewer |
| Swift / iOS | swiftui-patterns, swift-concurrency-6-2, swift-actor-persistence, swift-protocol-di-testing | code-reviewer |
| PostgreSQL | postgres-patterns, database-migrations | database-reviewer |
| Perl | perl-patterns, perl-testing, perl-security | code-reviewer |
| C++ | cpp-coding-standards, cpp-testing | code-reviewer |
| Other / Unlisted | coding-standards (universal) | code-reviewer |

### Phase 4: Missing Context Detection

Scan the prompt for missing critical information. Check each item and mark
whether Phase 0 auto-detected it or the user must supply it:

- [ ] **Tech stack** Ã¢â‚¬â€ Detected in Phase 0, or must user specify?
- [ ] **Target scope** Ã¢â‚¬â€ Files, directories, or modules mentioned?
- [ ] **Acceptance criteria** Ã¢â‚¬â€ How to know the task is done?
- [ ] **Error handling** Ã¢â‚¬â€ Edge cases and failure modes addressed?
- [ ] **Security requirements** Ã¢â‚¬â€ Auth, input validation, secrets?
- [ ] **Testing expectations** Ã¢â‚¬â€ Unit, integration, E2E?
- [ ] **Performance constraints** Ã¢â‚¬â€ Load, latency, resource limits?
- [ ] **UI/UX requirements** Ã¢â‚¬â€ Design specs, responsive, a11y? (if frontend)
- [ ] **Database changes** Ã¢â‚¬â€ Schema, migrations, indexes? (if data layer)
- [ ] **Existing patterns** Ã¢â‚¬â€ Reference files or conventions to follow?
- [ ] **Scope boundaries** Ã¢â‚¬â€ What NOT to do?

**If 3+ critical items are missing**, ask the user up to 3 clarification
questions before generating the optimized prompt. Then incorporate the
answers into the optimized prompt.

### Phase 5: Workflow & Model Recommendation

Determine where this prompt sits in the development lifecycle:

```
Research Ã¢â€ â€™ Plan Ã¢â€ â€™ Implement (TDD) Ã¢â€ â€™ Review Ã¢â€ â€™ Verify Ã¢â€ â€™ Commit
```

For MEDIUM+ tasks, always start with /plan. For EPIC tasks, use blueprint skill.

**Model recommendation** (include in output):

| Scope | Recommended Model | Rationale |
|-------|------------------|-----------|
| TRIVIAL-LOW | Sonnet 4.6 | Fast, cost-efficient for simple tasks |
| MEDIUM | Sonnet 4.6 | Best coding model for standard work |
| HIGH | Sonnet 4.6 (main) + Opus 4.6 (planning) | Opus for architecture, Sonnet for implementation |
| EPIC | Opus 4.6 (blueprint) + Sonnet 4.6 (execution) | Deep reasoning for multi-session planning |

**Multi-prompt splitting** (for HIGH/EPIC scope):

For tasks that exceed a single session, split into sequential prompts:
- Prompt 1: Research + Plan (use search-first skill, then /plan)
- Prompt 2-N: Implement one phase per prompt (each ends with /verify)
- Final Prompt: Integration test + /code-review across all phases
- Use /save-session and /resume-session to preserve context between sessions

---

## Output Format

Present your analysis in this exact structure. Respond in the same language
as the user's input.

### Section 1: Prompt Diagnosis

**Strengths:** List what the original prompt does well.

**Issues:**

| Issue | Impact | Suggested Fix |
|-------|--------|---------------|
| (problem) | (consequence) | (how to fix) |

**Needs Clarification:** Numbered list of questions the user should answer.
If Phase 0 auto-detected the answer, state it instead of asking.

### Section 2: Recommended ECC Components

| Type | Component | Purpose |
|------|-----------|---------|
| Command | /plan | Plan architecture before coding |
| Skill | tdd-workflow | TDD methodology guidance |
| Agent | code-reviewer | Post-implementation review |
| Model | Sonnet 4.6 | Recommended for this scope |

### Section 3: Optimized Prompt Ã¢â‚¬â€ Full Version

Present the complete optimized prompt inside a single fenced code block.
The prompt must be self-contained and ready to copy-paste. Include:
- Clear task description with context
- Tech stack (detected or specified)
- /command invocations at the right workflow stages
- Acceptance criteria
- Verification steps
- Scope boundaries (what NOT to do)

For items that reference blueprint, write: "Use the blueprint skill to..."
(not `/blueprint`, since blueprint is a skill, not a command).

### Section 4: Optimized Prompt Ã¢â‚¬â€ Quick Version

A compact version for experienced ECC users. Vary by intent type:

| Intent | Quick Pattern |
|--------|--------------|
| New Feature | `/plan [feature]. /tdd to implement. /code-review. /verify.` |
| Bug Fix | `/tdd Ã¢â‚¬â€ write failing test for [bug]. Fix to green. /verify.` |
| Refactor | `/refactor-clean [scope]. /code-review. /verify.` |
| Research | `Use search-first skill for [topic]. /plan based on findings.` |
| Testing | `/tdd [module]. /e2e for critical flows. /test-coverage.` |
| Review | `/code-review. Then use security-reviewer agent.` |
| Docs | `/update-docs. /update-codemaps.` |
| EPIC | `Use blueprint skill for "[objective]". Execute phases with /verify gates.` |

### Section 5: Enhancement Rationale

| Enhancement | Reason |
|-------------|--------|
| (what was added) | (why it matters) |

### Footer

> Not what you need? Tell me what to adjust, or make a normal task request
> if you want execution instead of prompt optimization.

---

## Examples

### Trigger Examples

- "Optimize this prompt for ECC"
- "Rewrite this prompt so Claude Code uses the right commands"
- "Ã¥Â¸Â®Ã¦Ë†â€˜Ã¤Â¼ËœÃ¥Å’â€“Ã¨Â¿â„¢Ã¤Â¸ÂªÃ¦Å’â€¡Ã¤Â»Â¤"
- "How should I prompt ECC for this task?"

### Example 1: Vague Chinese Prompt (Project Detected)

**User input:**
```
Ã¥Â¸Â®Ã¦Ë†â€˜Ã¥â€ â„¢Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ§â€Â¨Ã¦Ë†Â·Ã§â„¢Â»Ã¥Â½â€¢Ã©Â¡ÂµÃ©ÂÂ¢
```

**Phase 0 detects:** `package.json` with Next.js 15, TypeScript, Tailwind CSS

**Optimized Prompt (Full):**
```
Ã¤Â½Â¿Ã§â€Â¨Ã©Â¡Â¹Ã§â€ºÂ®Ã§Å½Â°Ã¦Å“â€°Ã¦Å â‚¬Ã¦Å“Â¯Ã¦Â Ë†Ã¯Â¼Ë†Next.js 15 + TypeScript + Tailwind CSSÃ¯Â¼â€°Ã¥Â®Å¾Ã§Å½Â°Ã§â€Â¨Ã¦Ë†Â·Ã§â„¢Â»Ã¥Â½â€¢Ã©Â¡ÂµÃ©ÂÂ¢Ã£â‚¬â€š

Ã¦Å â‚¬Ã¦Å“Â¯Ã¨Â¦ÂÃ¦Â±â€šÃ¯Â¼Å¡
- Ã¦Â²Â¿Ã§â€Â¨Ã©Â¡Â¹Ã§â€ºÂ®Ã§Å½Â°Ã¦Å“â€°Ã§Å¡â€žÃ§Â»â€žÃ¤Â»Â¶Ã§Â»â€œÃ¦Å¾â€žÃ¥â€™Å’Ã¨Â·Â¯Ã§â€Â±Ã§ÂºÂ¦Ã¥Â®Å¡
- Ã¨Â¡Â¨Ã¥Ââ€¢Ã©ÂªÅ’Ã¨Â¯ÂÃ¤Â½Â¿Ã§â€Â¨Ã©Â¡Â¹Ã§â€ºÂ®Ã¤Â¸Â­Ã¥Â·Â²Ã¦Å“â€°Ã§Å¡â€žÃ©ÂªÅ’Ã¨Â¯ÂÃ¦â€“Â¹Ã¦Â¡Ë†Ã¯Â¼Ë†Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¥Â·Â²Ã§â€Â¨ Zod/Yup/Ã¥â€¦Â¶Ã¤Â»â€“Ã¯Â¼â€°
- Ã¨Â®Â¤Ã¨Â¯ÂÃ¦â€“Â¹Ã¥Â¼ÂÃ¯Â¼Å¡Ã¦Â²Â¿Ã§â€Â¨Ã©Â¡Â¹Ã§â€ºÂ®Ã§Å½Â°Ã¦Å“â€°Ã¨Â®Â¤Ã¨Â¯ÂÃ¦â€“Â¹Ã¦Â¡Ë†Ã¯Â¼Ë†Ã¥Â¦â€šÃ¦â€”Â Ã¯Â¼Å’Ã©Â»ËœÃ¨Â®Â¤ JWTÃ¯Â¼â€°
- Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡Ã©â€šÂ®Ã§Â®Â±/Ã¥Â¯â€ Ã§Â ÂÃ§â„¢Â»Ã¥Â½â€¢Ã¨Â¡Â¨Ã¥Ââ€¢Ã£â‚¬ÂÃ¨Â¡Â¨Ã¥Ââ€¢Ã©ÂªÅ’Ã¨Â¯ÂÃ£â‚¬ÂÃ©â€â„¢Ã¨Â¯Â¯Ã¦ÂÂÃ§Â¤ÂºÃ£â‚¬ÂÃ¥Å Â Ã¨Â½Â½Ã§Å Â¶Ã¦â‚¬ÂÃ£â‚¬ÂÃ¥â€œÂÃ¥Âºâ€Ã¥Â¼ÂÃ¥Â¸Æ’Ã¥Â±â‚¬

Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ¯Â¼Å¡
1. /plan Ã¥â€¦Ë†Ã¨Â§â€žÃ¥Ë†â€™Ã§Â»â€žÃ¤Â»Â¶Ã§Â»â€œÃ¦Å¾â€žÃ¥â€™Å’Ã¨Â®Â¤Ã¨Â¯ÂÃ¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å’Ã¥Ââ€šÃ¨â‚¬Æ’Ã§Å½Â°Ã¦Å“â€°Ã©Â¡ÂµÃ©ÂÂ¢Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼Â
2. /tdd Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€¦Ë†Ã¨Â¡Å’Ã¯Â¼Å¡Ã§Â¼â€“Ã¥â€ â„¢Ã§â„¢Â»Ã¥Â½â€¢Ã¨Â¡Â¨Ã¥Ââ€¢Ã§Å¡â€žÃ¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€™Å’Ã¨Â®Â¤Ã¨Â¯ÂÃ¦ÂµÂÃ§Â¨â€¹Ã§Å¡â€žÃ©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢
3. Ã¥Â®Å¾Ã§Å½Â°Ã§â„¢Â»Ã¥Â½â€¢Ã©Â¡ÂµÃ©ÂÂ¢Ã¥â€™Å’Ã¨Â®Â¤Ã¨Â¯ÂÃ©â‚¬Â»Ã¨Â¾â€˜
4. /code-review Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥Â®Å¾Ã§Å½Â°
5. /verify Ã©ÂªÅ’Ã¨Â¯ÂÃ¦â€°â‚¬Ã¦Å“â€°Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¤Â¸â€Ã©Â¡ÂµÃ©ÂÂ¢Ã¦Â­Â£Ã¥Â¸Â¸Ã¦Â¸Â²Ã¦Å¸â€œ

Ã¥Â®â€°Ã¥â€¦Â¨Ã¨Â¦ÂÃ¦Â±â€šÃ¯Â¼Å¡
- Ã¥Â¯â€ Ã§Â ÂÃ¤Â¸ÂÃ¦ËœÅ½Ã¦â€“â€¡Ã¤Â¼Â Ã¨Â¾â€œ
- Ã©ËœÂ²Ã¦Â­Â¢Ã¦Å¡Â´Ã¥Å â€ºÃ§Â Â´Ã¨Â§Â£Ã¯Â¼Ë†rate limitingÃ¯Â¼â€°
- XSS Ã©ËœÂ²Ã¦Å Â¤
- CSRF token

Ã©ÂªÅ’Ã¦â€Â¶Ã¦Â â€¡Ã¥â€¡â€ Ã¯Â¼Å¡
- Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¯Â¼Å’Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡ 80%+
- Ã©Â¡ÂµÃ©ÂÂ¢Ã¥Å“Â¨Ã§Â§Â»Ã¥Å Â¨Ã§Â«Â¯Ã¥â€™Å’Ã¦Â¡Å’Ã©ÂÂ¢Ã§Â«Â¯Ã¦Â­Â£Ã¥Â¸Â¸Ã¦Â¸Â²Ã¦Å¸â€œ
- Ã§â„¢Â»Ã¥Â½â€¢Ã¦Ë†ÂÃ¥Å Å¸Ã¨Â·Â³Ã¨Â½Â¬Ã¥Ë†Â° dashboardÃ¯Â¼Å’Ã¥Â¤Â±Ã¨Â´Â¥Ã¦ËœÂ¾Ã§Â¤ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â¡Ã¦ÂÂ¯

Ã¤Â¸ÂÃ¨Â¦ÂÃ¥ÂÅ¡Ã¯Â¼Å¡
- Ã¤Â¸ÂÃ¨Â¦ÂÃ¥Â®Å¾Ã§Å½Â°Ã¦Â³Â¨Ã¥â€ Å’Ã©Â¡ÂµÃ©ÂÂ¢
- Ã¤Â¸ÂÃ¨Â¦ÂÃ¥Â®Å¾Ã§Å½Â°Ã¥Â¿ËœÃ¨Â®Â°Ã¥Â¯â€ Ã§Â ÂÃ¥Å Å¸Ã¨Æ’Â½
- Ã¤Â¸ÂÃ¨Â¦ÂÃ¤Â¿Â®Ã¦â€Â¹Ã§Å½Â°Ã¦Å“â€°Ã§Å¡â€žÃ¨Â·Â¯Ã§â€Â±Ã§Â»â€œÃ¦Å¾â€ž
```

### Example 2: Moderate English Prompt

**User input:**
```
Add a REST API endpoint for user profile updates with validation
```

**Phase 0 detects:** `go.mod` with Go 1.22, Chi router

**Optimized Prompt (Full):**
```
Add a REST API endpoint for user profile updates (PATCH /api/users/:id).

Tech stack: Go 1.22 + Chi router (detected from project)

Requirements:
- PATCH /api/users/:id Ã¢â‚¬â€ partial update of user profile
- Input validation for fields: name, email, avatar_url, bio
- Auth: require valid token, users can only update own profile
- Return 200 with updated user on success
- Return 400 with validation errors on invalid input
- Return 401/403 for auth failures
- Follow existing API patterns in the codebase

Workflow:
1. /plan the endpoint structure, middleware chain, and validation logic
2. /tdd Ã¢â‚¬â€ write table-driven tests for success, validation failure, auth failure, not-found
3. Implement following existing handler patterns
4. /go-review
5. /verify Ã¢â‚¬â€ run full test suite, confirm no regressions

Do not:
- Modify existing endpoints
- Change the database schema (use existing user table)
- Add new dependencies without checking existing ones first (use search-first skill)
```

### Example 3: EPIC Project

**User input:**
```
Migrate our monolith to microservices
```

**Optimized Prompt (Full):**
```
Use the blueprint skill to plan: "Migrate monolith to microservices architecture"

Before executing, answer these questions in the blueprint:
1. Which domain boundaries exist in the current monolith?
2. Which service should be extracted first (lowest coupling)?
3. Communication pattern: REST APIs, gRPC, or event-driven (Kafka/RabbitMQ)?
4. Database strategy: shared DB initially or database-per-service from start?
5. Deployment target: Kubernetes, Docker Compose, or serverless?

The blueprint should produce phases like:
- Phase 1: Identify service boundaries and create domain map
- Phase 2: Set up infrastructure (API gateway, service mesh, CI/CD per service)
- Phase 3: Extract first service (strangler fig pattern)
- Phase 4: Verify with integration tests, then extract next service
- Phase N: Decommission monolith

Each phase = 1 PR, with /verify gates between phases.
Use /save-session between phases. Use /resume-session to continue.
Use git worktrees for parallel service extraction when dependencies allow.

Recommended: Opus 4.6 for blueprint planning, Sonnet 4.6 for phase execution.
```

---

## Related Components

| Component | When to Reference |
|-----------|------------------|
| `configure-ecc` | User hasn't set up ECC yet |
| `skill-stocktake` | Audit which components are installed (use instead of hardcoded catalog) |
| `search-first` | Research phase in optimized prompts |
| `blueprint` | EPIC-scope optimized prompts (invoke as skill, not command) |
| `strategic-compact` | Long session context management |
| `cost-aware-llm-pipeline` | Token optimization recommendations |
