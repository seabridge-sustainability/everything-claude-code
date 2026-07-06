---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
---

# TypeScript/JavaScript Ã§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Å¸ÂºÃ¤ÂºÅ½ [common/coding-style.md](../common/coding-style.md) Ã¦â€°Â©Ã¥Â±â€¢Ã¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ« TypeScript/JavaScript Ã§â€°Â¹Ã¥Â®Å¡Ã¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã§Â±Â»Ã¥Å¾â€¹Ã¤Â¸Å½Ã¦Å½Â¥Ã¥ÂÂ£

Ã¤Â½Â¿Ã§â€Â¨Ã§Â±Â»Ã¥Å¾â€¹Ã¤Â½Â¿Ã¥â€¦Â¬Ã¥â€¦Â± APIÃ£â‚¬ÂÃ¥â€¦Â±Ã¤ÂºÂ«Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥â€™Å’Ã§Â»â€žÃ¤Â»Â¶Ã¥Â±Å¾Ã¦â‚¬Â§Ã¦ËœÂ¾Ã¥Â¼ÂÃ¥Å’â€“Ã£â‚¬ÂÃ¥ÂÂ¯Ã¨Â¯Â»Ã¤Â¸â€Ã¥ÂÂ¯Ã¥Â¤ÂÃ§â€Â¨Ã£â‚¬â€š

### Ã¥â€¦Â¬Ã¥â€¦Â± API

* Ã¤Â¸ÂºÃ¥Â¯Â¼Ã¥â€¡ÂºÃ§Å¡â€žÃ¥â€¡Â½Ã¦â€¢Â°Ã£â‚¬ÂÃ¥â€¦Â±Ã¤ÂºÂ«Ã¥Â·Â¥Ã¥â€¦Â·Ã¥â€¡Â½Ã¦â€¢Â°Ã¥â€™Å’Ã¥â€¦Â¬Ã¥â€¦Â±Ã§Â±Â»Ã¦â€“Â¹Ã¦Â³â€¢Ã¦Â·Â»Ã¥Å Â Ã¥Ââ€šÃ¦â€¢Â°Ã§Â±Â»Ã¥Å¾â€¹Ã¥â€™Å’Ã¨Â¿â€Ã¥â€ºÅ¾Ã§Â±Â»Ã¥Å¾â€¹
* Ã¨Â®Â© TypeScript Ã¦Å½Â¨Ã¦â€“Â­Ã¦ËœÅ½Ã¦ËœÂ¾Ã§Å¡â€žÃ¥Â±â‚¬Ã©Æ’Â¨Ã¥ÂËœÃ©â€¡ÂÃ§Â±Â»Ã¥Å¾â€¹
* Ã¥Â°â€ Ã©â€¡ÂÃ¥Â¤ÂÃ§Å¡â€žÃ¥â€ â€¦Ã¨Ââ€Ã¥Â¯Â¹Ã¨Â±Â¡Ã§Â»â€œÃ¦Å¾â€žÃ¦ÂÂÃ¥Ââ€“Ã¤Â¸ÂºÃ¥â€˜Â½Ã¥ÂÂÃ§Â±Â»Ã¥Å¾â€¹Ã¦Ë†â€“Ã¦Å½Â¥Ã¥ÂÂ£

```typescript
// WRONG: Exported function without explicit types
export function formatUser(user) {
  return `${user.firstName} ${user.lastName}`
}

// CORRECT: Explicit types on public APIs
interface User {
  firstName: string
  lastName: string
}

export function formatUser(user: User): string {
  return `${user.firstName} ${user.lastName}`
}
```

### Ã¦Å½Â¥Ã¥ÂÂ£Ã¤Â¸Å½Ã§Â±Â»Ã¥Å¾â€¹Ã¥Ë†Â«Ã¥ÂÂ

* Ã¤Â½Â¿Ã§â€Â¨ `interface` Ã¥Â®Å¡Ã¤Â¹â€°Ã¥ÂÂ¯Ã¨Æ’Â½Ã¨Â¢Â«Ã¦â€°Â©Ã¥Â±â€¢Ã¦Ë†â€“Ã¥Â®Å¾Ã§Å½Â°Ã§Å¡â€žÃ¥Â¯Â¹Ã¨Â±Â¡Ã§Â»â€œÃ¦Å¾â€ž
* Ã¤Â½Â¿Ã§â€Â¨ `type` Ã¥Â®Å¡Ã¤Â¹â€°Ã¨Ââ€Ã¥ÂË†Ã§Â±Â»Ã¥Å¾â€¹Ã£â‚¬ÂÃ¤ÂºÂ¤Ã¥Ââ€°Ã§Â±Â»Ã¥Å¾â€¹Ã£â‚¬ÂÃ¥â€¦Æ’Ã§Â»â€žÃ£â‚¬ÂÃ¦ËœÂ Ã¥Â°â€žÃ§Â±Â»Ã¥Å¾â€¹Ã¥â€™Å’Ã¥Â·Â¥Ã¥â€¦Â·Ã§Â±Â»Ã¥Å¾â€¹
* Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¥Â­â€”Ã©ÂÂ¢Ã©â€¡ÂÃ¨Ââ€Ã¥ÂË†Ã§Â±Â»Ã¥Å¾â€¹Ã¨â‚¬Å’Ã©ÂÅ¾ `enum`Ã¯Â¼Å’Ã©â„¢Â¤Ã©ÂÅ¾Ã©Å“â‚¬Ã¨Â¦Â `enum` Ã¤Â»Â¥Ã¥Â®Å¾Ã§Å½Â°Ã¤Âºâ€™Ã¦â€œÂÃ¤Â½Å“Ã¦â‚¬Â§

```typescript
interface User {
  id: string
  email: string
}

type UserRole = 'admin' | 'member'
type UserWithRole = User & {
  role: UserRole
}
```

### Ã©ÂÂ¿Ã¥â€¦ÂÃ¤Â½Â¿Ã§â€Â¨ `any`

* Ã¥Å“Â¨Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂÃ¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã©ÂÂ¿Ã¥â€¦ÂÃ¤Â½Â¿Ã§â€Â¨ `any`
* Ã¥Â¯Â¹Ã¥Â¤â€“Ã©Æ’Â¨Ã¦Ë†â€“Ã¤Â¸ÂÃ¥Ââ€”Ã¤Â¿Â¡Ã¤Â»Â»Ã§Å¡â€žÃ¨Â¾â€œÃ¥â€¦Â¥Ã¤Â½Â¿Ã§â€Â¨ `unknown`Ã¯Â¼Å’Ã§â€žÂ¶Ã¥ÂÅ½Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Å“Â°Ã§Â¼Â©Ã¥Â°ÂÃ¥â€¦Â¶Ã§Â±Â»Ã¥Å¾â€¹Ã¨Å’Æ’Ã¥â€ºÂ´
* Ã¥Â½â€œÃ¥â‚¬Â¼Ã§Å¡â€žÃ§Â±Â»Ã¥Å¾â€¹Ã¤Â¾ÂÃ¨Âµâ€“Ã¤ÂºÅ½Ã¨Â°Æ’Ã§â€Â¨Ã¨â‚¬â€¦Ã¦â€”Â¶Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã¦Â³â€ºÃ¥Å¾â€¹

```typescript
// WRONG: any removes type safety
function getErrorMessage(error: any) {
  return error.message
}

// CORRECT: unknown forces safe narrowing
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  return 'Unexpected error'
}
```

### React Ã¥Â±Å¾Ã¦â‚¬Â§

* Ã¤Â½Â¿Ã§â€Â¨Ã¥â€˜Â½Ã¥ÂÂÃ§Å¡â€ž `interface` Ã¦Ë†â€“ `type` Ã¥Â®Å¡Ã¤Â¹â€°Ã§Â»â€žÃ¤Â»Â¶Ã¥Â±Å¾Ã¦â‚¬Â§
* Ã¦ËœÂ¾Ã¥Â¼ÂÃ¥Å“Â°Ã¥Â®Å¡Ã¤Â¹â€°Ã¥â€ºÅ¾Ã¨Â°Æ’Ã¥Â±Å¾Ã¦â‚¬Â§Ã§Â±Â»Ã¥Å¾â€¹
* Ã©â„¢Â¤Ã©ÂÅ¾Ã¦Å“â€°Ã§â€°Â¹Ã¥Â®Å¡Ã¥Å½Å¸Ã¥â€ºÂ Ã¯Â¼Å’Ã¥ÂÂ¦Ã¥Ë†â„¢Ã¤Â¸ÂÃ¨Â¦ÂÃ¤Â½Â¿Ã§â€Â¨ `React.FC`

```typescript
interface User {
  id: string
  email: string
}

interface UserCardProps {
  user: User
  onSelect: (id: string) => void
}

function UserCard({ user, onSelect }: UserCardProps) {
  return <button onClick={() => onSelect(user.id)}>{user.email}</button>
}
```

### JavaScript Ã¦â€“â€¡Ã¤Â»Â¶

* Ã¥Å“Â¨ `.js` Ã¥â€™Å’ `.jsx` Ã¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸Â­Ã¯Â¼Å’Ã¥Â½â€œÃ§Â±Â»Ã¥Å¾â€¹Ã¨Æ’Â½Ã¦ÂÂÃ©Â«ËœÃ¦Â¸â€¦Ã¦â„¢Â°Ã¥ÂºÂ¦Ã¤Â¸â€Ã¨Â¿ÂÃ§Â§Â»Ã¥Ë†Â° TypeScript Ã¤Â¸ÂÃ¥ÂÂ¯Ã¨Â¡Å’Ã¦â€”Â¶Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ JSDoc
* Ã¤Â¿ÂÃ¦Å’Â JSDoc Ã¤Â¸Å½Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã¨Â¡Å’Ã¤Â¸ÂºÃ¤Â¸â‚¬Ã¨â€¡Â´

```javascript
/**
 * @param {{ firstName: string, lastName: string }} user
 * @returns {string}
 */
export function formatUser(user) {
  return `${user.firstName} ${user.lastName}`
}
```

## Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â‚¬Â§

Ã¤Â½Â¿Ã§â€Â¨Ã¥Â±â€¢Ã¥Â¼â‚¬Ã¨Â¿ÂÃ§Â®â€”Ã§Â¬Â¦Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â€ºÂ´Ã¦â€“Â°Ã¯Â¼Å¡

```typescript
interface User {
  id: string
  name: string
}

// WRONG: Mutation
function updateUser(user: User, name: string): User {
  user.name = name // MUTATION!
  return user
}

// CORRECT: Immutability
function updateUser(user: Readonly<User>, name: string): User {
  return {
    ...user,
    name
  }
}
```

## Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

Ã¤Â½Â¿Ã§â€Â¨ async/await Ã©â€¦ÂÃ¥ÂË† try-catch Ã¥Â¹Â¶Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Å“Â°Ã§Â¼Â©Ã¥Â°ÂÃ¦Å“ÂªÃ§Å¸Â¥Ã©â€â„¢Ã¨Â¯Â¯Ã§Â±Â»Ã¥Å¾â€¹Ã¨Å’Æ’Ã¥â€ºÂ´Ã¯Â¼Å¡

```typescript
interface User {
  id: string
  email: string
}

declare function riskyOperation(userId: string): Promise<User>

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  return 'Unexpected error'
}

const logger = {
  error: (message: string, error: unknown) => {
    // Replace with your production logger (for example, pino or winston).
  }
}

async function loadUser(userId: string): Promise<User> {
  try {
    const result = await riskyOperation(userId)
    return result
  } catch (error: unknown) {
    logger.error('Operation failed', error)
    throw new Error(getErrorMessage(error))
  }
}
```

## Ã¨Â¾â€œÃ¥â€¦Â¥Ã©ÂªÅ’Ã¨Â¯Â

Ã¤Â½Â¿Ã§â€Â¨ Zod Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¦Â¨Â¡Ã¥Â¼ÂÃ§Å¡â€žÃ©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Å’Ã¥Â¹Â¶Ã¤Â»Å½Ã¦Â¨Â¡Ã¥Â¼ÂÃ¦Å½Â¨Ã¦â€“Â­Ã§Â±Â»Ã¥Å¾â€¹Ã¯Â¼Å¡

```typescript
import { z } from 'zod'

const userSchema = z.object({
  email: z.string().email(),
  age: z.number().int().min(0).max(150)
})

type UserInput = z.infer<typeof userSchema>

const validated: UserInput = userSchema.parse(input)
```

## Console.log

* Ã§â€Å¸Ã¤ÂºÂ§Ã¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¤Â¸ÂÃ¥â€¦ÂÃ¨Â®Â¸Ã¥â€¡ÂºÃ§Å½Â° `console.log` Ã¨Â¯Â­Ã¥ÂÂ¥
* Ã¨Â¯Â·Ã¤Â½Â¿Ã§â€Â¨Ã©â‚¬â€šÃ¥Â½â€œÃ§Å¡â€žÃ¦â€”Â¥Ã¥Â¿â€”Ã¥Âºâ€œÃ¦â€ºÂ¿Ã¤Â»Â£
* Ã¦Å¸Â¥Ã§Å“â€¹Ã©â€™Â©Ã¥Â­ÂÃ¤Â»Â¥Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨â€¡ÂªÃ¥Å Â¨Ã¦Â£â‚¬Ã¦Âµâ€¹
