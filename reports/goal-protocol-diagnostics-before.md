# Goal Protocol Diagnostics

Generated: 2026-05-17 11:49:48 -04:00

Root: C:\Users\adelm\SeaBridgeAI

## Repository Summary

| Repo | Files scanned | /goal | auto-loop | unified | DoD | validation | stuck recovery | anti-false-completion | timeout/stagnation | completion evidence | duplicate blocks | empty files | missing protocol | potential conflicts |
|---|---:|---|---|---|---|---|---|---|---|---|---:|---:|---|---|
| everything-claude-code | 10 | True | True | False | True | True | True | True | True | False | 0 | 0 | GoalAutoUnified, CompletionEvidence | auto-push, yolo |
| legacy-external-skills-repo | 6 | True | True | False | True | True | True | True | False | False | 0 | 0 | GoalAutoUnified, TimeoutStagnation, CompletionEvidence |  |
| manageesg-backend | 12 | True | True | False | True | True | True | True | False | False | 0 | 0 | GoalAutoUnified, TimeoutStagnation, CompletionEvidence | yolo |
| manageesg-frontend | 10 | True | True | False | True | True | True | True | False | False | 0 | 0 | GoalAutoUnified, TimeoutStagnation, CompletionEvidence | yolo |
| openseabri | 10 | True | True | False | True | True | True | True | False | False | 0 | 0 | GoalAutoUnified, TimeoutStagnation, CompletionEvidence | yolo |
| _upstream | 7 | True | False | False | False | True | False | False | False | False | 0 | 0 | AutoLoop, GoalAutoUnified, DoD, StuckRecovery, AntiFalseCompletion, TimeoutStagnation, CompletionEvidence | yolo |
| autoresearch | 10 | True | True | False | True | True | True | True | False | False | 0 | 0 | GoalAutoUnified, TimeoutStagnation, CompletionEvidence | yolo |
| climada-stack | 10 | True | True | False | True | True | True | True | False | False | 0 | 0 | GoalAutoUnified, TimeoutStagnation, CompletionEvidence |  |
| get-shit-done-temp | 2 | False | False | False | False | True | False | False | False | False | 0 | 0 | Goal, AutoLoop, GoalAutoUnified, DoD, StuckRecovery, AntiFalseCompletion, TimeoutStagnation, CompletionEvidence |  |
| nanobot-temp | 1 | True | False | False | False | False | False | False | False | False | 0 | 0 | AutoLoop, GoalAutoUnified, DoD, Validation, StuckRecovery, AntiFalseCompletion, TimeoutStagnation, CompletionEvidence |  |
| spec-kit-temp | 1 | False | False | False | False | True | False | False | False | False | 0 | 0 | Goal, AutoLoop, GoalAutoUnified, DoD, StuckRecovery, AntiFalseCompletion, TimeoutStagnation, CompletionEvidence |  |

## Protocol-Bearing Files

| Repo | File | /goal | auto-loop | DoD | validation | stuck recovery | completion evidence |
|---|---|---|---|---|---|---|---|
| everything-claude-code | AGENT.md | True | True | True | True | True | False |
| everything-claude-code | AGENTS.md | True | True | True | True | True | False |
| everything-claude-code | CLAUDE.md | True | True | True | True | True | False |
| everything-claude-code | CODEX.md | True | True | True | True | True | False |
| everything-claude-code | GEMINI.md | True | True | True | True | True | False |
| everything-claude-code | OPENCODE.md | True | True | True | True | True | False |
| legacy-external-skills-repo | AGENT.md | True | True | True | True | True | False |
| legacy-external-skills-repo | AGENTS.md | True | True | True | True | True | False |
| legacy-external-skills-repo | CLAUDE.md | True | True | True | True | True | False |
| legacy-external-skills-repo | CODEX.md | True | True | True | True | True | False |
| legacy-external-skills-repo | GEMINI.md | True | True | True | True | True | False |
| legacy-external-skills-repo | OPENCODE.md | True | True | True | True | True | False |
| manageesg-backend | AGENT.md | True | True | True | True | True | False |
| manageesg-backend | AGENTS.md | True | True | True | True | True | False |
| manageesg-backend | CLAUDE.md | True | True | True | True | True | False |
| manageesg-backend | CODEX.md | True | True | True | True | True | False |
| manageesg-backend | GEMINI.md | True | True | True | True | True | False |
| manageesg-backend | OPENCODE.md | True | True | True | True | True | False |
| manageesg-frontend | AGENT.md | True | True | True | True | True | False |
| manageesg-frontend | AGENTS.md | True | True | True | True | True | False |
| manageesg-frontend | CLAUDE.md | True | True | True | True | True | False |
| manageesg-frontend | CODEX.md | True | True | True | True | True | False |
| manageesg-frontend | GEMINI.md | True | True | True | True | True | False |
| manageesg-frontend | OPENCODE.md | True | True | True | True | True | False |
| openseabri | AGENT.md | True | True | True | True | True | False |
| openseabri | AGENTS.md | True | True | True | True | True | False |
| openseabri | CLAUDE.md | True | True | True | True | True | False |
| openseabri | CODEX.md | True | True | True | True | True | False |
| openseabri | GEMINI.md | True | True | True | True | True | False |
| openseabri | OPENCODE.md | True | True | True | True | True | False |
| _upstream | AGENTS.md | True | False | False | True | False | False |
| _upstream | CLAUDE.md | False | False | False | True | False | False |
| autoresearch | AGENT.md | True | True | True | True | True | False |
| autoresearch | AGENTS.md | True | True | True | True | True | False |
| autoresearch | CLAUDE.md | True | True | True | True | True | False |
| autoresearch | CODEX.md | True | True | True | True | True | False |
| autoresearch | GEMINI.md | True | True | True | True | True | False |
| autoresearch | OPENCODE.md | True | True | True | True | True | False |
| climada-stack | AGENT.md | True | True | True | True | True | False |
| climada-stack | AGENTS.md | True | True | True | True | True | False |
| climada-stack | CLAUDE.md | True | True | True | True | True | False |
| climada-stack | CODEX.md | True | True | True | True | True | False |
| climada-stack | GEMINI.md | True | True | True | True | True | False |
| climada-stack | OPENCODE.md | True | True | True | True | True | False |
| get-shit-done-temp | .clinerules | False | False | False | True | False | False |
| nanobot-temp | CLAUDE.md | True | False | False | False | False | False |
| spec-kit-temp | AGENTS.md | False | False | False | True | False | False |

## Duplicate Protocol Blocks

No duplicate SEABRIDGE_GOAL_PROTOCOL marker blocks detected.

## Empty Agent Files

No empty scanned files detected.

## Notes

- This scanner audits instruction and protocol coverage; it does not prove behavioral compliance by itself.
- endor, external, dependency, build, and runtime output folders are skipped to avoid treating imported references as active policy.
- JSON/TOML files are read only; this script does not modify them.
