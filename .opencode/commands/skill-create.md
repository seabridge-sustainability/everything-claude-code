---
description: Generate skills from git history analysis
agent: build
---

# Skill Create Command

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


Analyze git history to generate Claude Code skills: $ARGUMENTS

## Your Task

1. **Analyze commits** - Pattern recognition from history
2. **Extract patterns** - Common practices and conventions
3. **Generate SKILL.md** - Structured skill documentation
4. **Create instincts** - For continuous-learning-v2

## Analysis Process

### Step 1: Gather Commit Data
```bash
# Recent commits
git log --oneline -100

# Commits by file type
git log --name-only --pretty=format: | sort | uniq -c | sort -rn

# Most changed files
git log --pretty=format: --name-only | sort | uniq -c | sort -rn | head -20
```

### Step 2: Identify Patterns

**Commit Message Patterns**:
- Common prefixes (feat, fix, refactor)
- Naming conventions
- Co-author patterns

**Code Patterns**:
- File structure conventions
- Import organization
- Error handling approaches

**Review Patterns**:
- Common review feedback
- Recurring fix types
- Quality gates

### Step 3: Generate SKILL.md

```markdown
# [Skill Name]

## Overview
[What this skill teaches]

## Patterns

### Pattern 1: [Name]
- When to use
- Implementation
- Example

### Pattern 2: [Name]
- When to use
- Implementation
- Example

## Best Practices

1. [Practice 1]
2. [Practice 2]
3. [Practice 3]

## Common Mistakes

1. [Mistake 1] - How to avoid
2. [Mistake 2] - How to avoid

## Examples

### Good Example
```[language]
// Code example
```

### Anti-pattern
```[language]
// What not to do
```
```

### Step 4: Generate Instincts

For continuous-learning-v2:

```json
{
  "instincts": [
    {
      "trigger": "[situation]",
      "action": "[response]",
      "confidence": 0.8,
      "source": "git-history-analysis"
    }
  ]
}
```

## Output

Creates:
- `skills/[name]/SKILL.md` - Skill documentation
- `skills/[name]/instincts.json` - Instinct collection

---

**TIP**: Run `/skill-create --instincts` to also generate instincts for continuous learning.
