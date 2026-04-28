---
name: sustainable-cad
description: Generate and iterate sustainable CAD models from text using the local text-to-cad harness, with ESG material, lifecycle, manufacturability, and review constraints.
origin: SeaBridgeAI + earthtojake/text-to-cad
---

# Sustainable CAD Models

Use this skill when a SeaBridgeAI backend or agent workflow needs to create,
revise, inspect, or hand off CAD models with sustainability constraints.

This is a routing skill for SeaBridgeAI work. The underlying CAD mechanics come
from the installed `cad` and `urdf` skills, vendored from
`earthtojake/text-to-cad`.

## Installed Locations

- ECC skill: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\.agents\skills\sustainable-cad`
- Codex-compatible mirror: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\skills\sustainable-cad`
- Harness checkout: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\text-to-cad`
- Upstream mirror: `C:\Users\adelm\SeaBridgeAI\_upstream\text-to-cad`

## When To Activate

- Text-to-CAD generation for sustainable products, fixtures, assemblies, or
  equipment.
- CAD revisions that cite material reduction, modular repair, reuse,
  recyclability, embodied-carbon reduction, or manufacturing constraints.
- Exporting STEP, STL, DXF, GLB/topology, snapshots, or URDF robot descriptions.
- Backend agent prompts that need CAD artifacts without adding CAD runtime code
  to the FastAPI app.

## Core Rules

1. Read the installed `cad` skill before changing CAD source files:
   `C:\Users\adelm\SeaBridgeAI\everything-claude-code\.agents\skills\cad\SKILL.md`.
2. Read the installed `urdf` skill before changing robot descriptions:
   `C:\Users\adelm\SeaBridgeAI\everything-claude-code\.agents\skills\urdf\SKILL.md`.
3. Edit source files first, then regenerate explicit targets. Do not hand-edit
   generated STEP, STL, DXF, GLB, topology, snapshot, or URDF artifacts.
4. Keep CAD work in a dedicated model workspace, normally `models/` in the CAD
   harness or a feature-specific CAD directory in the calling project.
5. Do not make live vendor, LCA database, or paid API calls unless the user
   explicitly authorizes them. Use stated assumptions for material and carbon
   notes when live data is unavailable.
6. Treat generated CAD as design support, not certified engineering output.
   Flag unverified loads, tolerances, standards, safety factors, and material
   claims.

## Sustainable Design Checklist

For every generated or revised model, capture the relevant assumptions:

- Intended use, load case, expected environment, and target lifetime.
- Preferred material family and rationale, such as recycled aluminum,
  bio-based polymer, FSC wood, low-carbon steel, or repairable fasteners.
- Material efficiency choices, including hollowing, ribbing, lattice strategy,
  part consolidation, or fastener reduction.
- Manufacturing process constraints, such as CNC, sheet metal, additive
  manufacturing, injection molding, laser cutting, or standard stock sizes.
- Repair, disassembly, replacement, and end-of-life pathway.
- Known caveats: missing FEA, missing tolerance stackup, missing certification,
  or assumed embodied-carbon factors.

## Backend Invocation Pattern

From `manageesg-backend`, backend agents can call this as an ECC skill by name:
`$sustainable-cad`.

Use the backend only as the orchestration context. Place generated model source
and derived artifacts in an explicit CAD workspace, then return paths and viewer
links in the final handoff. Do not add FastAPI endpoints, models, or background
workers unless the user separately asks for product integration.

## Common Commands

Run from the text-to-cad harness checkout unless using a project-local CAD
workspace with the same skill layout.

```powershell
cd C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\text-to-cad

# Create or refresh the CAD Python environment.
# Python 3.13 is verified on this machine; use 3.11 when available.
py -3.13 -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\pip.exe install -r requirements-cad.txt

# Regenerate a CAD source.
.\.venv\Scripts\python.exe skills\cad\scripts\gen_step_part models\path\to\source.py

# Regenerate an assembly source.
.\.venv\Scripts\python.exe skills\cad\scripts\gen_step_assembly models\path\to\assembly.py

# Regenerate a URDF sidecar.
.\.venv\Scripts\python.exe skills\urdf\scripts\gen_urdf models\path\to\source.py

# Inspect a CAD prompt reference.
.\.venv\Scripts\python.exe skills\cad\scripts\cadref inspect '@cad[models/path/to/entry]' --json

# Render a quick review image.
.\.venv\Scripts\python.exe skills\cad\scripts\snapshot models\path\to\source.py --view isometric --out $env:TEMP\cad-review.png
```

## Viewer

The CAD Explorer viewer lives in the harness checkout:

```powershell
cd C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\text-to-cad\viewer
npm install
npm run dev
```

Default URL: `http://127.0.0.1:4178`.

For viewer-displayable outputs, include a link with `dir=` and `file=` in the
handoff, following the `cad` skill viewer rules.

## Handoff Format

Report:

- Source file changed.
- Generated artifacts, with exact paths.
- Sustainability assumptions and caveats.
- Validation commands run.
- Viewer URL or reason viewer was not started.
