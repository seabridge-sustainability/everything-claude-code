# Claude auto-mode Git-hook fix

The shared Claude Git hook could ask unnecessarily when a variable assignment preceded a literal directory change and a Git mutation. The hook now resolves literal directory changes in command order. Conditional/subshell directory changes, location-stack restoration, variable targets, and protected mutations retain their existing safeguards. Normal host permissions remain authoritative.

Alejandro authorized completing this fix in the current Codex session. The implementation adapts the existing Claude session's reviewed round4 proposal and adds a regression check for conditional directory changes. The user hook loader still verifies one exact source checksum; its path, configured permissions, model, and other hooks were preserved. No running session or service was restarted.

Verification: 11 unit tests passed; seven fresh-process checks through the installed loader passed; all 11 distinct previously prompting commands replayed without an additional ECC prompt. Replay calls only the guard evaluator and does not execute the commands. Force pushes, hook bypass, shared product reset/clean, and unresolved targets retain their deny/ask decisions. No live model call was made.

Retained installation identities, original files, unit output and installed-loader receipts: artifacts/agent-runs/ponytail/claude-auto-fix/. These local receipts are deliberately excluded from Git. Auto mode can still prompt or deny through Claude's own classifier or explicit protected-action rules; these were not disabled.
