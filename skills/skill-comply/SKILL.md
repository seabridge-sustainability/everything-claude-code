---
name: skill-comply
description: Visualize whether skills, rules, and agent definitions are actually followed Ã¢â‚¬â€ auto-generates scenarios at 3 prompt strictness levels, runs agents, classifies behavioral sequences, and reports compliance rates with full tool call timelines
origin: ECC
tools: Read, Bash
---

# skill-comply: Automated Compliance Measurement

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Measures whether coding agents actually follow skills, rules, or agent definitions by:
1. Auto-generating expected behavioral sequences (specs) from any .md file
2. Auto-generating scenarios with decreasing prompt strictness (supportive Ã¢â€ â€™ neutral Ã¢â€ â€™ competing)
3. Running `claude -p` and capturing tool call traces via stream-json
4. Classifying tool calls against spec steps using LLM (not regex)
5. Checking temporal ordering deterministically
6. Generating self-contained reports with spec, prompts, and timelines

## Supported Targets

- **Skills** (`skills/*/SKILL.md`): Workflow skills like search-first, TDD guides
- **Rules** (`rules/common/*.md`): Mandatory rules like testing.md, security.md, git-workflow.md
- **Agent definitions** (`agents/*.md`): Whether an agent gets invoked when expected (internal workflow verification not yet supported)

## When to Activate

- User runs `/skill-comply <path>`
- User asks "is this rule actually being followed?"
- After adding new rules/skills, to verify agent compliance
- Periodically as part of quality maintenance

## Usage

```bash
# Full run
uv run python -m scripts.run ~/.claude/rules/common/testing.md

# Dry run (no cost, spec + scenarios only)
uv run python -m scripts.run --dry-run ~/.claude/skills/search-first/SKILL.md

# Custom models
uv run python -m scripts.run --gen-model haiku --model sonnet <path>
```

## Key Concept: Prompt Independence

Measures whether a skill/rule is followed even when the prompt doesn't explicitly support it.

## Report Contents

Reports are self-contained and include:
1. Expected behavioral sequence (auto-generated spec)
2. Scenario prompts (what was asked at each strictness level)
3. Compliance scores per scenario
4. Tool call timelines with LLM classification labels

### Advanced (optional)

For users familiar with hooks, reports also include hook promotion recommendations for steps with low compliance. This is informational Ã¢â‚¬â€ the main value is the compliance visibility itself.
