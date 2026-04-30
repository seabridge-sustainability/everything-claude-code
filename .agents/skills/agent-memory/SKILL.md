---
name: agent-memory
description: Route session memory, project memory, and runtime agent memory without duplicating facts across Codex memories, ECC skills, and backend persistence.
origin: ECC
version: 1.0.0
---

# Agent Memory

## Purpose

Use this skill when work touches memory, recall, session continuity, or durable agent state.

This skill exists to keep SeaBridgeAI's memory layers from overlapping:

- Codex memories and agent-local history handle personal coding-session recall
- `ck` and `continuous-learning-v2` handle ECC-native project memory and reusable operator patterns
- `manageesg-backend` `sustainability_ai.memory` handles product/runtime memory for deployed agents

Do not treat these as interchangeable.

## Trigger Phrases

- `memory`
- `remember this`
- `session memory`
- `project memory`
- `retrieve prior context`
- `agent memory`
- `memory ops`

## Memory Routing

Choose the smallest memory system that matches the job:

| Need | Preferred system | Why |
|------|------------------|-----|
| Resume personal coding context across IDE sessions | Agent-local memory | Session continuity without repo/runtime coupling |
| Save or resume project-specific working context | `ck` | Deterministic per-project context snapshots |
| Learn reusable habits and conventions | `continuous-learning-v2` | Converts repeated behavior into reusable instincts |
| Store tenant-scoped facts for deployed agents | `sustainability_ai.memory` | Runtime application memory with backend ownership |

## Decision Rules

### 1. Session continuity

Use agent-local memory only when the user wants prior coding-session context and
the repo's own docs are not the correct source of truth. Keep this layer
separate from project memory and deployed runtime memory.

### 2. Project working memory

Use ECC-native memory first for project continuity:

- `/ck:*` for deterministic project snapshots and resume flows
- `continuous-learning-v2` for learned behaviors, conventions, and instincts

Prefer this layer for:

- active implementation context
- recurring repo conventions
- operator notes that should stay project-scoped

### 3. Runtime agent memory

Use backend memory only for deployed or application-level agents:

- `sustainability_ai.memory`
- `MemoryService`
- `MongoDBMemoryStore`

Do not route coding-session notes into backend runtime memory.

## Retrieval Order

When answering a memory-related request, prefer this order:

1. Repo-local docs, `AGENTS.md`, `CLAUDE.md`, runbooks, and code comments
2. ECC project memory via `ck` and `continuous-learning-v2`
3. Agent-local session memory when available
4. Backend durable memory only for product/runtime agent data flows

## Commands And Usage

### ECC-native project memory

Use `ck` for save/resume flows:

```bash
/ck:init
/ck:save
/ck:resume
/ck:info
```

Use `continuous-learning-v2` when the goal is to evolve reusable instincts rather than save one session.

## Outputs

Expected outputs from this skill:

- retrieved context block with source attribution
- saved session summary or project snapshot
- clear indication of which memory layer was used
- explicit note when a memory request should stay out of backend runtime persistence

## Hook Compatibility

Avoid double-injection and duplicate summaries.

- Do not add memory hooks that can block prompt submission, tool execution, or session shutdown.
- Observation hooks, if any, must be timeout-protected and fail open.
- Retrieval and context injection should prefer one summary surface.

Recommended precedence:

1. repo docs and instructions
2. ECC-native project memory
3. agent-local session memory when available
4. backend runtime memory only when the task is about application agents

## Safety Notes

- Do not duplicate the same fact into all memory systems unless the user explicitly asks.
- Do not store secrets, approval passwords, or sensitive credentials in memory tools.
- Do not present session memory as team source of truth for architecture or policy.
- Do not wire coding-session memory directly into backend runtime memory in this phase.

## SeaBridge Matrix

| Layer | Primary use | Source of truth |
|------|-------------|-----------------|
| `agent-local memory` | Personal/session continuity | Current coding agent environment |
| `ck` | Per-project working context | ECC-native project memory files |
| `continuous-learning-v2` | Reusable learned behaviors | ECC instinct storage |
| `backend memory` | Tenant-scoped deployed agent memory | `manageesg-backend` runtime persistence |
