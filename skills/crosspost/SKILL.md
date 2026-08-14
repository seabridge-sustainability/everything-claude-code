---
name: crosspost
description: Multi-platform content distribution across X, LinkedIn, Threads, and Bluesky. Adapts content per platform using content-engine patterns. Never posts identical content cross-platform. Use when the user wants to distribute content across social platforms.
metadata:
  origin: ECC
---

# Crosspost

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->

Distribute content across platforms without turning it into the same fake post in four costumes.

## When to Activate

- the user wants to publish the same underlying idea across multiple platforms
- a launch, update, release, or essay needs platform-specific versions
- the user says "crosspost", "post this everywhere", or "adapt this for X and LinkedIn"

## Core Rules

1. Do not publish identical copy across platforms.
2. Preserve the author's voice across platforms.
3. Adapt for constraints, not stereotypes.
4. One post should still be about one thing.
5. Do not invent a CTA, question, or moral if the source did not earn one.

## Workflow

### Step 1: Start with the Primary Version

Pick the strongest source version first:
- the original X post
- the original article
- the launch note
- the thread
- the memo or changelog

Use `content-engine` first if the source still needs voice shaping.

### Step 2: Capture the Voice Fingerprint

Run `brand-voice` first if the source voice is not already captured in the current session.

Reuse the resulting `VOICE PROFILE` directly.
Do not build a second ad hoc voice checklist here unless the user explicitly wants a fresh override for this campaign.

### Step 3: Adapt by Platform Constraint

### X

- keep it compressed
- lead with the sharpest claim or artifact
- use a thread only when a single post would collapse the argument
- avoid hashtags and generic filler

### LinkedIn

- add only the context needed for people outside the niche
- do not turn it into a fake founder-reflection post
- do not add a closing question just because it is LinkedIn
- do not force a polished "professional tone" if the author is naturally sharper

### Threads

- keep it readable and direct
- do not write fake hyper-casual creator copy
- do not paste the LinkedIn version and shorten it

### Bluesky

- keep it concise
- preserve the author's cadence
- do not rely on hashtags or feed-gaming language

## Posting Order

Default:
1. post the strongest native version first
2. adapt for the secondary platforms
3. stagger timing only if the user wants sequencing help

Do not add cross-platform references unless useful. Most of the time, the post should stand on its own.

## Banned Patterns

Delete and rewrite any of these:
- "Excited to share"
- "Here's what I learned"
- "What do you think?"
- "link in bio" unless that is literally true
- generic "professional takeaway" paragraphs that were not in the source

## Output Format

Return:
- the primary platform version
- adapted variants for each requested platform
- a short note on what changed and why
- any publishing constraint the user still needs to resolve

## Quality Gate

Before delivering:
- each version reads like the same author under different constraints
- no platform version feels padded or sanitized
- no copy is duplicated verbatim across platforms
- any extra context added for LinkedIn or newsletter use is actually necessary

## Related Skills

- `brand-voice` for reusable source-derived voice capture
- `content-engine` for voice capture and source shaping
- `x-api` for X publishing workflows
