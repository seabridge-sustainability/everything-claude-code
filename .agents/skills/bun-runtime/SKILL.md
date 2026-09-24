---
name: bun-runtime
description: Bun as runtime, package manager, bundler, and test runner. When to choose Bun vs Node, migration notes, and Vercel support.
license: MIT
---

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

# Bun Runtime

Bun is a fast all-in-one JavaScript runtime and toolkit: runtime, package manager, bundler, and test runner.

## When to Use

- **Prefer Bun** for: new JS/TS projects, scripts where install/run speed matters, Vercel deployments with Bun runtime, and when you want a single toolchain (run + install + test + build).
- **Prefer Node** for: maximum ecosystem compatibility, legacy tooling that assumes Node, or when a dependency has known Bun issues.

Use when: adopting Bun, migrating from Node, writing or debugging Bun scripts/tests, or configuring Bun on Vercel or other platforms.

## How It Works

- **Runtime**: Drop-in Node-compatible runtime (built on JavaScriptCore, implemented in Zig).
- **Package manager**: `bun install` is significantly faster than npm/yarn. Lockfile is `bun.lock` (text) by default in current Bun; older versions used `bun.lockb` (binary).
- **Bundler**: Built-in bundler and transpiler for apps and libraries.
- **Test runner**: Built-in `bun test` with Jest-like API.

**Migration from Node**: Replace `node script.js` with `bun run script.js` or `bun script.js`. Run `bun install` in place of `npm install`; most packages work. Use `bun run` for npm scripts; `bun x` for npx-style one-off runs. Node built-ins are supported; prefer Bun APIs where they exist for better performance.

**Vercel**: Set runtime to Bun in project settings. Build: `bun run build` or `bun build ./src/index.ts --outdir=dist`. Install: `bun install --frozen-lockfile` for reproducible deploys.

## Examples

### Run and install

```bash
# Install dependencies (creates/updates bun.lock or bun.lockb)
bun install

# Run a script or file
bun run dev
bun run src/index.ts
bun src/index.ts
```

### Scripts and env

```bash
bun run --env-file=.env dev
FOO=bar bun run script.ts
```

### Testing

```bash
bun test
bun test --watch
```

```typescript
// test/example.test.ts
import { expect, test } from "bun:test";

test("add", () => {
  expect(1 + 2).toBe(3);
});
```

### Runtime API

```typescript
const file = Bun.file("package.json");
const json = await file.json();

Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response("Hello");
  },
});
```

## Best Practices

- Commit the lockfile (`bun.lock` or `bun.lockb`) for reproducible installs.
- Prefer `bun run` for scripts. For TypeScript, Bun runs `.ts` natively.
- Keep dependencies up to date; Bun and the ecosystem evolve quickly.
