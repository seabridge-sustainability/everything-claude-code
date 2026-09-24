---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
---
# TypeScript/JavaScript Kodlama Stili

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


> Bu dosya [common/coding-style.md](../common/coding-style.md) dosyasÃ„Â±nÃ„Â± TypeScript/JavaScript'e ÃƒÂ¶zgÃƒÂ¼ iÃƒÂ§erikle geniÃ…Å¸letir.

## Tipler ve Interface'ler

Public API'larÃ„Â±, paylaÃ…Å¸Ã„Â±lan modelleri ve component prop'larÃ„Â±nÃ„Â± aÃƒÂ§Ã„Â±k, okunabilir ve yeniden kullanÃ„Â±labilir yapmak iÃƒÂ§in tipleri kullan.

### Public API'lar

- DÃ„Â±Ã…Å¸a aktarÃ„Â±lan fonksiyonlara, paylaÃ…Å¸Ã„Â±lan utility'lere ve public sÃ„Â±nÃ„Â±f metotlarÃ„Â±na parametre ve dÃƒÂ¶nÃƒÂ¼Ã…Å¸ tipleri ekle
- TypeScript'in aÃƒÂ§Ã„Â±k local deÃ„Å¸iÃ…Å¸ken tiplerini ÃƒÂ§Ã„Â±karmasÃ„Â±na izin ver
- Tekrarlanan inline object Ã…Å¸ekillerini adlandÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ tipler veya interface'lere ÃƒÂ§Ã„Â±kar

```typescript
// YANLIÃ…Å¾: AÃƒÂ§Ã„Â±k tipler olmadan dÃ„Â±Ã…Å¸a aktarÃ„Â±lan fonksiyon
export function formatUser(user) {
  return `${user.firstName} ${user.lastName}`
}

// DOÃ„Å¾RU: Public API'larda aÃƒÂ§Ã„Â±k tipler
interface User {
  firstName: string
  lastName: string
}

export function formatUser(user: User): string {
  return `${user.firstName} ${user.lastName}`
}
```

### Interface vs. Type Alias'larÃ„Â±

- Extend edilebilir veya implement edilebilir object Ã…Å¸ekilleri iÃƒÂ§in `interface` kullan
- Union'lar, intersection'lar, tuple'lar, mapped tipler ve utility tipler iÃƒÂ§in `type` kullan
- Interoperability iÃƒÂ§in `enum` gerekli olmadÃ„Â±kÃƒÂ§a string literal union'larÃ„Â± tercih et

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

### `any`'den KaÃƒÂ§Ã„Â±n

- Uygulama kodunda `any`'den kaÃƒÂ§Ã„Â±n
- Harici veya gÃƒÂ¼venilmeyen girdi iÃƒÂ§in `unknown` kullan, ardÃ„Â±ndan gÃƒÂ¼venli bir Ã…Å¸ekilde daralt
- Bir deÃ„Å¸erin tipi ÃƒÂ§aÃ„Å¸Ã„Â±rana baÃ„Å¸lÃ„Â± olduÃ„Å¸unda generic'ler kullan

```typescript
// YANLIÃ…Å¾: any tip gÃƒÂ¼venliÃ„Å¸ini kaldÃ„Â±rÃ„Â±r
function getErrorMessage(error: any) {
  return error.message
}

// DOÃ„Å¾RU: unknown gÃƒÂ¼venli daraltmayÃ„Â± zorlar
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  return 'Unexpected error'
}
```

### React Props

- Component prop'larÃ„Â±nÃ„Â± adlandÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ `interface` veya `type` ile tanÃ„Â±mla
- Callback prop'larÃ„Â±nÃ„Â± aÃƒÂ§Ã„Â±kÃƒÂ§a tiplendir
- Belirli bir nedeni olmadÃ„Â±kÃƒÂ§a `React.FC` kullanma

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

### JavaScript DosyalarÃ„Â±

- `.js` ve `.jsx` dosyalarÃ„Â±nda, tipler netliÃ„Å¸i artÃ„Â±rdÃ„Â±Ã„Å¸Ã„Â±nda ve TypeScript migration pratik olmadÃ„Â±Ã„Å¸Ã„Â±nda JSDoc kullan
- JSDoc'u runtime davranÃ„Â±Ã…Å¸Ã„Â±yla hizalÃ„Â± tut

```javascript
/**
 * @param {{ firstName: string, lastName: string }} user
 * @returns {string}
 */
export function formatUser(user) {
  return `${user.firstName} ${user.lastName}`
}
```

## Immutability

Immutable gÃƒÂ¼ncellemeler iÃƒÂ§in spread operator kullan:

```typescript
interface User {
  id: string
  name: string
}

// YANLIÃ…Å¾: Mutation
function updateUser(user: User, name: string): User {
  user.name = name // MUTASYON!
  return user
}

// DOÃ„Å¾RU: Immutability
function updateUser(user: Readonly<User>, name: string): User {
  return {
    ...user,
    name
  }
}
```

## Hata YÃƒÂ¶netimi

Try-catch ile async/await kullan ve unknown hatalarÃ„Â± gÃƒÂ¼venli bir Ã…Å¸ekilde daralt:

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
    // Production logger'Ã„Â±nÃ„Â±zla deÃ„Å¸iÃ…Å¸tirin (ÃƒÂ¶rneÃ„Å¸in, pino veya winston).
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

## Input Validasyonu

Schema tabanlÃ„Â± validasyon iÃƒÂ§in Zod kullan ve schema'dan tipleri ÃƒÂ§Ã„Â±kar:

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

- Production kodunda `console.log` ifadeleri yok
- Bunun yerine uygun logging kÃƒÂ¼tÃƒÂ¼phaneleri kullan
- Otomatik tespit iÃƒÂ§in hook'lara bakÃ„Â±n
