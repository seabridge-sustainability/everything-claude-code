---
name: mcp-server-patterns
description: Build MCP servers with Node/TypeScript SDK — tools, resources, prompts, Zod validation, stdio vs Streamable HTTP. Use Context7 or official MCP docs for latest API. Use when building or debugging an MCP server — tools, resources, prompts, validation, or transport choice.
license: MIT
---

# MCP Server Patterns

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

The Model Context Protocol (MCP) lets AI assistants call tools, read resources, and use prompts from your server. Use this skill when building or maintaining MCP servers. The SDK API evolves; check Context7 (query-docs for "MCP") or the official MCP documentation for current method names and signatures.

## When to Use

Use when: implementing a new MCP server, adding tools or resources, choosing stdio vs HTTP, upgrading the SDK, or debugging MCP registration and transport issues.

## How It Works

### Core concepts

- **Tools**: Actions the model can invoke (e.g. search, run a command). Register with `registerTool()` or `tool()` depending on SDK version.
- **Resources**: Read-only data the model can fetch (e.g. file contents, API responses). Register with `registerResource()` or `resource()`. Handlers typically receive a `uri` argument.
- **Prompts**: Reusable, parameterised prompt templates the client can surface (e.g. in Claude Desktop). Register with `registerPrompt()` or equivalent.
- **Transport**: stdio for local clients (e.g. Claude Desktop); Streamable HTTP is preferred for remote (Cursor, cloud). Legacy HTTP/SSE is for backward compatibility.

The Node/TypeScript SDK may expose `tool()` / `resource()` or `registerTool()` / `registerResource()`; the official SDK has changed over time. Always verify against the current [MCP docs](https://modelcontextprotocol.io) or Context7.

### Connecting with stdio

For local clients, create a stdio transport and pass it to your server’s connect method. The exact API varies by SDK version (e.g. constructor vs factory). See the official MCP documentation or query Context7 for "MCP stdio server" for the current pattern.

Keep server logic (tools + resources) independent of transport so you can plug in stdio or HTTP in the entrypoint.

### Remote (Streamable HTTP)

For Cursor, cloud, or other remote clients, use **Streamable HTTP** (single MCP HTTP endpoint per current spec). Support legacy HTTP/SSE only when backward compatibility is required.

## Examples

### Install and server setup

```bash
npm install @modelcontextprotocol/sdk zod
```

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({ name: "my-server", version: "1.0.0" });
```

Register tools and resources using the API your SDK version provides: some versions use `server.tool(name, description, schema, handler)` (positional args), others use `server.tool({ name, description, inputSchema }, handler)` or `registerTool()`. Same for resources — include a `uri` in the handler when the API provides it. Check the official MCP docs or Context7 for the current `@modelcontextprotocol/sdk` signatures to avoid copy-paste errors.

Use **Zod** (or the SDK’s preferred schema format) for input validation.

## Best Practices

- **Schema first**: Define input schemas for every tool; document parameters and return shape.
- **Errors**: Return structured errors or messages the model can interpret; avoid raw stack traces.
- **Idempotency**: Prefer idempotent tools where possible so retries are safe.
- **Rate and cost**: For tools that call external APIs, consider rate limits and cost; document in the tool description.
- **Versioning**: Pin SDK version in package.json; check release notes when upgrading.

## Official SDKs and Docs

- **JavaScript/TypeScript**: `@modelcontextprotocol/sdk` (npm). Use Context7 with library name "MCP" for current registration and transport patterns.
- **Go**: Official Go SDK on GitHub (`modelcontextprotocol/go-sdk`).
- **C#**: Official C# SDK for .NET.
