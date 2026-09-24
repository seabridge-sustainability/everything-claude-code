# Everything Claude Code for Trae

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


Bring Everything Claude Code (ECC) workflows to Trae IDE. This repository provides custom commands, agents, skills, and rules that can be installed into any Trae project with a single command.

## Quick Start

### Option 1: Local Installation (Current Project Only)

```bash
# Install to current project
cd /path/to/your/project
TRAE_ENV=cn .trae/install.sh
```

This creates `.trae-cn/` in your project directory.

### Option 2: Global Installation (All Projects)

```bash
# Install globally to ~/.trae-cn/
cd /path/to/your/project
TRAE_ENV=cn .trae/install.sh ~

# Or from the .trae folder directly
cd /path/to/your/project/.trae
TRAE_ENV=cn ./install.sh ~
```

This creates `~/.trae-cn/` which applies to all Trae projects.

### Option 3: Quick Install to Current Directory

```bash
# If already in project directory with .trae folder
cd .trae
./install.sh
```

The installer uses non-destructive copy - it will not overwrite your existing files.

## Installation Modes

### Local Installation

Install to the current project's `.trae-cn` directory:

```bash
cd /path/to/your/project
TRAE_ENV=cn .trae/install.sh
```

This creates `/path/to/your/project/.trae-cn/` with all ECC components.

### Global Installation

Install to your home directory's `.trae-cn` directory (applies to all Trae projects):

```bash
# From project directory
TRAE_ENV=cn .trae/install.sh ~

# Or directly from .trae folder
cd .trae
TRAE_ENV=cn ./install.sh ~
```

This creates `~/.trae-cn/` with all ECC components. All Trae projects will use these global installations.

**Note**: Global installation is useful when you want to maintain a single copy of ECC across all your projects.

## Environment Support

- **Default**: Uses `.trae` directory
- **CN Environment**: Uses `.trae-cn` directory (set via `TRAE_ENV=cn`)

### Force Environment

```bash
# From project root, force the CN environment
TRAE_ENV=cn .trae/install.sh

# From inside the .trae folder
cd .trae
TRAE_ENV=cn ./install.sh
```

**Note**: `TRAE_ENV` is a global environment variable that applies to the entire installation session.

## Uninstall

The uninstaller uses a manifest file (`.ecc-manifest`) to track installed files, ensuring safe removal:

```bash
# Uninstall from current directory (if already inside .trae or .trae-cn)
cd .trae-cn
./uninstall.sh

# Or uninstall from project root
cd /path/to/your/project
TRAE_ENV=cn .trae/uninstall.sh

# Uninstall globally from home directory
TRAE_ENV=cn .trae/uninstall.sh ~

# Will ask for confirmation before uninstalling
```

### Uninstall Behavior

- **Safe removal**: Only removes files tracked in the manifest (installed by ECC)
- **User files preserved**: Any files you added manually are kept
- **Non-empty directories**: Directories containing user-added files are skipped
- **Manifest-based**: Requires `.ecc-manifest` file (created during install)

### Environment Support

Uninstall respects the same `TRAE_ENV` environment variable as install:

```bash
# Uninstall from .trae-cn (CN environment)
TRAE_ENV=cn ./uninstall.sh

# Uninstall from .trae (default environment)
./uninstall.sh
```

**Note**: If no manifest file is found (old installation), the uninstaller will ask whether to remove the entire directory.

## What's Included

### Commands

Commands are on-demand workflows invocable via the `/` menu in Trae chat. All commands are reused directly from the project root's `commands/` folder.

### Agents

Agents are specialized AI assistants with specific tool configurations. All agents are reused directly from the project root's `agents/` folder.

### Skills

Skills are on-demand workflows invocable via the `/` menu in chat. All skills are reused directly from the project's `skills/` folder.

### Rules

Rules provide always-on rules and context that shape how the agent works with your code. All rules are reused directly from the project root's `rules/` folder.

## Usage

1. Type `/` in chat to open the commands menu
2. Select a command or skill
3. The agent will guide you through the workflow with specific instructions and checklists

## Project Structure

```
.trae/ (or .trae-cn/)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ commands/           # Command files (reused from project root)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ agents/             # Agent files (reused from project root)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ skills/             # Skill files (reused from skills/)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ rules/              # Rule files (reused from project root)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ install.sh          # Install script
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ uninstall.sh        # Uninstall script
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ README.md           # This file
```

## Customization

All files are yours to modify after installation. The installer never overwrites existing files, so your customizations are safe across re-installs.

**Note**: The `install.sh` and `uninstall.sh` scripts are automatically copied to the target directory during installation, so you can run these commands directly from your project.

## Recommended Workflow

1. **Start with planning**: Use `/plan` command to break down complex features
2. **Write tests first**: Invoke `/tdd` command before implementing
3. **Review your code**: Use `/code-review` after writing code
4. **Check security**: Use `/code-review` again for auth, API endpoints, or sensitive data handling
5. **Fix build errors**: Use `/build-fix` if there are build errors

## Next Steps

- Open your project in Trae
- Type `/` to see available commands
- Enjoy the ECC workflows!
