## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: request approval before any write, destructive, or cost-incurring action.
2. Restricted mode by default when approval is missing: read-only exploration and planning only.
3. Never run paid LLM calls, PageIndex Cloud calls, or background watch jobs without explicit written approval.
4. Never store API keys in code, docs, logs, wiki pages, or commits.
---
name: openkb-knowledge-base
description: Use OpenKB to create, update, query, or lint compiled wiki-style knowledge bases backed by PageIndex vectorless retrieval. Trigger for OpenKB, compiled wiki, PageIndex, long PDF knowledge base, Obsidian-compatible markdown wiki, contradiction or gap linting, or document knowledge that should accumulate over time instead of one-off RAG.
origin: ECC
---

# OpenKB Knowledge Base

Use this skill when the user wants a persistent document knowledge base that compiles sources into an interlinked Markdown wiki instead of re-retrieving chunks on every query.

## Fit

Use OpenKB for:
- Long PDFs or mixed document folders where knowledge should accumulate.
- Wiki-style outputs: summaries, concept pages, cross-links, lint reports, and Obsidian browsing.
- Questions over an existing compiled knowledge base.
- Contradiction, gap, orphan, or stale-content checks.

Do not use OpenKB for:
- One-off web research where no local document corpus exists.
- Product runtime memory for deployed SeaBridgeAI agents.
- Background ingestion unless the user explicitly approved watch mode and its cost.

## Safe Defaults

- Use the repo or project configured KB root, usually `OPENKB_ROOT`; otherwise use a clearly named runtime folder that is ignored by git.
- Keep raw documents and generated wiki state out of source control unless the user explicitly asks to commit a small, non-sensitive fixture.
- Treat `LLM_API_KEY` as required for live compile/query operations.
- Treat `PAGEINDEX_API_KEY` as optional and cost-sensitive; local PageIndex is preferred unless cloud OCR/indexing is explicitly approved.
- Prefer explicit `openkb add`, `openkb query`, `openkb status`, and `openkb lint` calls. Avoid `openkb watch` in agent workflows.

## Workflow

1. Confirm the KB root and whether the requested operation can write or call an LLM.
2. For status or lint, inspect the existing KB before making changes.
3. For add, validate source paths and stay inside the requested corpus.
4. For query, ask against the compiled wiki and report if the KB is missing or uninitialized.
5. Include the source/wikifile locations in the handoff so another agent can continue.

## Commands

```bash
openkb status
openkb add <file_or_dir>
openkb query "question"
openkb lint
```

OpenKB also supports `openkb init`, `openkb chat`, `openkb watch`, and `openkb list`, but these should be used only when they match the user's request and cost/safety gates are clear.
