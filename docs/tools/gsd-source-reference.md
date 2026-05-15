# GSD Source Reference

Date checked: 2026-05-07

## Source

- Clone path: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\external\get-shit-done`
- GitHub URL: `https://github.com/gsd-build/get-shit-done`
- Current branch: `main`
- Current commit: `265e85ce9467a4d1bae9fa9f55a9d514716a8176`
- Commit summary: `265e85ce 2026-05-06 15:44:03 -0400 Merge pull request #3191 from gsd-build/fix/3164-gsd-tools-milestone-archive-layout`
- Git describe: `v1.41.0-rc3-13-g265e85ce`
- Package version detected in `package.json`: `1.39.0-rc.4`

## Install Commands Documented But Not Executed

The upstream README and workflow files document commands such as:

- `npx get-shit-done-cc@latest`
- `npm install -g get-shit-done-cc`
- runtime-specific slash command installation flows

These were not executed. SeaBridgeAI uses GSD as a controlled local reference plus an adapted skill and workflow layer.

## SeaBridgeAI Integration Mode

GSD is integrated as:

- controlled local reference source;
- adapted `sea-gsd-controlled-execution` skill;
- guarded workflow/checklist/template layer;
- no global install;
- no automatic commit, push, PR, yolo mode, dangerous permission skipping, or uncontrolled autonomous execution.

Use the canonical SeaBridgeAI skill:

`C:\Users\adelm\SeaBridgeAI\everything-claude-code\skills\sea-gsd-controlled-execution\SKILL.md`
