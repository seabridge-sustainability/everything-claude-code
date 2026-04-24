# Plan: design-extract Integration (designlang)

**Date:** 2026-04-24
**Branch:** `feature/design-extract-integration` (create in each target repo as needed)
**Design doc:** n/a (tool integration, no separate spec)

## Overview

Integrate `designlang` (design-extract) into three SeaBridgeAI repos — everything-claude-code, manageesg-frontend, and openseabri — so that agents can extract and consume a live design language from each app's running dev server. The tool is already cloned into `everything-claude-code/references/design-extract/`. This plan installs the Claude Code skill, runs the extractor against each app's dev server, copies generated token files into the right locations, and adds agent instructions to the relevant CLAUDE.md and AGENTS.md files.

## Acceptance Criteria

- [ ] `npx skills add Manavarya09/design-extract` installs the `extract-design` skill globally
- [ ] `/extract-design` is recognized as a skill in Claude Code
- [ ] `designlang` is available via `npx designlang --version` without install
- [ ] Design tokens generated from manageesg-frontend dev server and committed to `manageesg-frontend/design/`
- [ ] Design tokens generated from openseabri dev server and committed to `openseabri/design/`
- [ ] `everything-claude-code`, `manageesg-frontend`, and `openseabri` CLAUDE.md and AGENTS.md contain designlang usage instructions
- [ ] MCP server config written for manageesg-frontend and openseabri (optional, wired only if MCP mode verified working)

---

## Tasks

### Task 1: Install designlang CLI and extract-design Claude Code skill
**File(s):** None (global install + Claude Code plugin registry)
**Time:** ~2 min

Run both installs so the CLI is available for later tasks and the `/extract-design` skill appears in Claude Code:

```bash
# Install CLI globally
npm install -g designlang

# Install Claude Code skill (adds /extract-design to skill registry)
npx skills add Manavarya09/design-extract
```

Verify:
```bash
designlang --version
npx designlang --version
```

**Test:** `designlang --version` exits 0 and prints a version string; `/extract-design` appears in `claude skills list`.

---

### Task 2: Add designlang instructions to everything-claude-code CLAUDE.md and AGENTS.md
**File(s):** `everything-claude-code/CLAUDE.md`, `everything-claude-code/AGENTS.md`
**Time:** ~3 min

Append a `## designlang — Design Language Extraction` section to both files.

Section content to append to **CLAUDE.md**:

```markdown
## designlang — Design Language Extraction

designlang crawls any live URL with a headless browser and generates 17+ output files (Tailwind config, CSS vars, shadcn theme, Figma variables, motion tokens, brand voice, component anatomy stubs, and an AI-optimized markdown file).

**Reference:** `C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\design-extract\`

Skill: `/extract-design <url>` (install: `npx skills add Manavarya09/design-extract`)
CLI: `npx designlang <url>` (no install required)

Key flags:
- `--full` — multi-page crawl (auto-discovers nav pages)
- `--out <dir>` — output directory (default: `./design-extract-output`)
- `--dark` — also extract dark mode
- `--screenshots` — capture component screenshots
- `--emit-agent-rules` — writes `.claude/` and `CLAUDE.md.fragment` rule files
- `--smart` — LLM-assisted classifier (uses `ANTHROPIC_API_KEY`)

SeaBridgeAI design token locations:
- manageesg-frontend: `manageesg-frontend/design/`
- openseabri: `openseabri/design/`

MCP server (continuous sync):
```bash
# Start MCP server to serve live design tokens over MCP
npx designlang mcp --out ./design-extract-output
```
```

Append equivalent section to **AGENTS.md** (same content, compatible with Codex/Gemini).

**Test:** `grep -n "designlang" everything-claude-code/CLAUDE.md everything-claude-code/AGENTS.md` returns matches in both files.

---

### Task 3: Add designlang instructions to manageesg-frontend CLAUDE.md and AGENTS.md
**File(s):** `manageesg-frontend/CLAUDE.md`, `manageesg-frontend/AGENTS.md`
**Time:** ~2 min

Append the same `## designlang` section (from Task 2) to both files, with a note about where the generated tokens live (`manageesg-frontend/design/`) and the dev server URL (`http://localhost:3000`).

Additional line to include in the frontend-specific section:
```
Dev server for extraction: `npm run dev` → http://localhost:3000
Generated tokens location: `manageesg-frontend/design/`
```

**Test:** `grep -n "designlang" manageesg-frontend/CLAUDE.md manageesg-frontend/AGENTS.md` returns matches in both files.

---

### Task 4: Add designlang instructions to openseabri CLAUDE.md and AGENTS.md
**File(s):** `openseabri/CLAUDE.md`, `openseabri/AGENTS.md`
**Time:** ~2 min

Same as Task 3 but for openseabri. Note: openseabri runs Vite on port 5173.

Additional line to include:
```
Dev server for extraction: `npm run dev` → http://localhost:5173
Generated tokens location: `openseabri/design/`
```

**Test:** `grep -n "designlang" openseabri/CLAUDE.md openseabri/AGENTS.md` returns matches in both files.

---

### Task 5: Start manageesg-frontend dev server and run designlang against it
**File(s):** `manageesg-frontend/design/` (new directory, populated by designlang)
**Time:** ~5 min

Start the dev server in the background, wait for it to be ready, then run designlang:

```bash
# Terminal 1 — start dev server (run in background)
cd manageesg-frontend && npm run dev &

# Wait for server to be ready
sleep 5

# Run designlang with full multi-page crawl and agent rules
npx designlang http://localhost:3000 --full --out ./design --screenshots --emit-agent-rules

# Stop dev server
kill %1
```

This generates into `manageesg-frontend/design/`:
- `*-design-language.md` — feed to LLMs for UI work
- `*-tailwind.config.js` — drop-in Tailwind theme
- `*-variables.css` — CSS custom properties
- `*-shadcn-theme.css` — shadcn/ui globals.css vars
- `*-design-tokens.json` — W3C format
- `*-figma-variables.json` — Figma import
- `*-theme.js` — React theme object
- `*-motion-tokens.json` — motion tokens
- `*-anatomy.tsx` — typed React component stubs
- `*-voice.json` — brand voice fingerprint
- `*-mcp.json` — MCP server manifest
- `CLAUDE.md.fragment` — agent rules fragment (from `--emit-agent-rules`)

**Test:** `ls manageesg-frontend/design/` lists at least 8 files; `*-design-language.md` exists and is non-empty.

---

### Task 6: Integrate CLAUDE.md.fragment into manageesg-frontend CLAUDE.md
**File(s):** `manageesg-frontend/CLAUDE.md`
**Time:** ~2 min

designlang's `--emit-agent-rules` writes a `CLAUDE.md.fragment` containing auto-detected design rules (color tokens, typography, component patterns) formatted for Claude Code. Append this fragment to the frontend's CLAUDE.md so agents automatically know the live design system:

```bash
cat manageesg-frontend/design/CLAUDE.md.fragment >> manageesg-frontend/CLAUDE.md
```

If `CLAUDE.md.fragment` does not exist (older designlang version), skip this task and note it.

**Test:** `tail -30 manageesg-frontend/CLAUDE.md` contains color palette or typography entries from the designlang output.

---

### Task 7: Start openseabri dev server and run designlang against it
**File(s):** `openseabri/design/` (new directory)
**Time:** ~5 min

Same pattern as Task 5 but for openseabri (Vite on port 5173):

```bash
# Start Vite dev server in background
cd openseabri && npm run dev &

# Wait for Vite to be ready
sleep 5

# Run designlang
npx designlang http://localhost:5173 --full --out ./design --screenshots --emit-agent-rules

# Stop dev server
kill %1
```

**Test:** `ls openseabri/design/` lists at least 8 files; `*-design-language.md` exists and is non-empty.

---

### Task 8: Integrate CLAUDE.md.fragment into openseabri CLAUDE.md
**File(s):** `openseabri/CLAUDE.md`
**Time:** ~2 min

Same as Task 6 but for openseabri:

```bash
cat openseabri/design/CLAUDE.md.fragment >> openseabri/CLAUDE.md
```

**Test:** `tail -30 openseabri/CLAUDE.md` contains color palette or typography entries.

---

### Task 9: Write MCP server config for manageesg-frontend
**File(s):** `manageesg-frontend/.mcp.json` (add new server entry)
**Time:** ~3 min

designlang generates a `*-mcp.json` manifest. Wire it as an MCP server so agents in manageesg-frontend can query live design tokens via MCP:

Read `manageesg-frontend/design/*-mcp.json` to get the manifest path, then add an entry to `manageesg-frontend/.mcp.json`:

```json
{
  "mcpServers": {
    "designlang": {
      "command": "npx",
      "args": ["designlang", "mcp", "--out", "./design"],
      "description": "Live design token server — colors, typography, spacing, components"
    }
  }
}
```

If `.mcp.json` already exists, merge the `designlang` entry into the existing `mcpServers` object rather than overwriting.

**Test:** `cat manageesg-frontend/.mcp.json | grep designlang` returns a match; `npx designlang mcp --out ./manageesg-frontend/design` starts without error (Ctrl-C after 3s is fine).

---

### Task 10: Write MCP server config for openseabri
**File(s):** `openseabri/.mcp.json`
**Time:** ~2 min

Same as Task 9 but for openseabri:

```json
{
  "mcpServers": {
    "designlang": {
      "command": "npx",
      "args": ["designlang", "mcp", "--out", "./design"],
      "description": "Live design token server — colors, typography, spacing, components"
    }
  }
}
```

**Test:** `cat openseabri/.mcp.json | grep designlang` returns a match.

---

### Task 11: Commit design tokens and updated .md files in all three repos
**File(s):** All modified files across `everything-claude-code`, `manageesg-frontend`, `openseabri`
**Time:** ~3 min

Stage and commit each repo separately with a descriptive commit message:

```bash
# everything-claude-code
cd /c/Users/adelm/SeaBridgeAI/everything-claude-code
rtk git add CLAUDE.md AGENTS.md references/design-extract/ docs/plans/
rtk git commit -m "feat(tools): add designlang design-extract reference + agent instructions"

# manageesg-frontend
cd /c/Users/adelm/SeaBridgeAI/manageesg-frontend
rtk git add CLAUDE.md AGENTS.md design/ .mcp.json
rtk git commit -m "feat(design): add designlang design tokens and MCP server config"

# openseabri
cd /c/Users/adelm/SeaBridgeAI/openseabri
rtk git add CLAUDE.md AGENTS.md design/ .mcp.json
rtk git commit -m "feat(design): add designlang design tokens and MCP server config"
```

**Test:** `rtk git log --oneline -3` in each repo shows the new commit; `rtk git status` shows clean working tree.

---

## Notes

- **Dev server prerequisite**: Tasks 5 and 7 require the respective app's dev server to be running. If authentication is required to reach interior pages, use the homepage or a public-facing route only.
- **`--emit-agent-rules` availability**: Requires designlang v8+. If the flag is not recognized, skip Tasks 6 and 8 and manually reference the `*-design-language.md` from CLAUDE.md instead.
- **MCP server mode**: Tasks 9 and 10 are optional but recommended — they let Claude Code query live design tokens without re-running the extractor.
- **`--smart` flag**: Requires `ANTHROPIC_API_KEY`. Do not pass it unless the user explicitly opts in (it incurs API cost).
- **Updating tokens**: Re-run `npx designlang <url> --full --out ./design` any time the live site's design changes. The MCP server reads from the `--out` directory on disk, so no restart needed after re-extraction.
