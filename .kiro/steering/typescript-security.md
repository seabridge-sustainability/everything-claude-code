---
inclusion: fileMatch
fileMatchPattern: "*.ts,*.tsx,*.js,*.jsx"
description: TypeScript/JavaScript security best practices extending common security rules with language-specific concerns
---

# TypeScript/JavaScript Security

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


> This file extends the common security rule with TypeScript/JavaScript specific content.

## Secret Management

```typescript
// NEVER: Hardcoded secrets
const apiKey = "sk-proj-xxxxx"
const dbPassword = "mypassword123"

// ALWAYS: Environment variables
const apiKey = process.env.OPENAI_API_KEY
const dbPassword = process.env.DATABASE_PASSWORD

if (!apiKey) {
  throw new Error('OPENAI_API_KEY not configured')
}
```

## XSS Prevention

```typescript
// NEVER: Direct HTML injection
element.innerHTML = userInput

// ALWAYS: Sanitize or use textContent
import DOMPurify from 'dompurify'
element.innerHTML = DOMPurify.sanitize(userInput)
// OR
element.textContent = userInput
```

## Prototype Pollution

```typescript
// NEVER: Unsafe object merging
function merge(target: any, source: any) {
  for (const key in source) {
    target[key] = source[key]  // Dangerous!
  }
}

// ALWAYS: Validate keys
function merge(target: any, source: any) {
  for (const key in source) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue
    }
    target[key] = source[key]
  }
}
```

## SQL Injection (Node.js)

```typescript
// NEVER: String concatenation
const query = `SELECT * FROM users WHERE id = ${userId}`

// ALWAYS: Parameterized queries
const query = 'SELECT * FROM users WHERE id = ?'
db.query(query, [userId])
```

## Path Traversal

```typescript
// NEVER: Direct path construction
const filePath = `./uploads/${req.params.filename}`

// ALWAYS: Validate and sanitize
import path from 'path'
const filename = path.basename(req.params.filename)
const filePath = path.join('./uploads', filename)
```

## Dependency Security

```bash
# Regular security audits
npm audit
npm audit fix

# Use lock files
npm ci  # Instead of npm install in CI/CD
```

## Agent Support

- Use **security-reviewer** agent for comprehensive security audits
- Invoke via `/agent swap security-reviewer` or use the security-review skill
