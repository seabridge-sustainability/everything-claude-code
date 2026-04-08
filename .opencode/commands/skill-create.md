---
description: Generate skills from git history analysis
agent: build
---

# Skill Create Command

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
