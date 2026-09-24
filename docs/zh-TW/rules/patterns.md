# Ã¥Â¸Â¸Ã¨Â¦â€¹Ã¦Â¨Â¡Ã¥Â¼Â

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


## API Ã¥â€ºÅ¾Ã¦â€¡â€°Ã¦Â Â¼Ã¥Â¼Â

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  meta?: {
    total: number
    page: number
    limit: number
  }
}
```

## Ã¨â€¡ÂªÃ¨Â¨â€š Hooks Ã¦Â¨Â¡Ã¥Â¼Â

```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
```

## Repository Ã¦Â¨Â¡Ã¥Â¼Â

```typescript
interface Repository<T> {
  findAll(filters?: Filters): Promise<T[]>
  findById(id: string): Promise<T | null>
  create(data: CreateDto): Promise<T>
  update(id: string, data: UpdateDto): Promise<T>
  delete(id: string): Promise<void>
}
```

## Ã©ÂªÂ¨Ã¦Å¾Â¶Ã¥Â°Ë†Ã¦Â¡Ë†

Ã¥Â¯Â¦Ã¤Â½Å“Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¦â„¢â€šÃ¯Â¼Å¡
1. Ã¦ÂÅ“Ã¥Â°â€¹Ã§Â¶â€œÃ©ÂÅ½Ã¥Â¯Â¦Ã¦Ë†Â°Ã©Â©â€”Ã¨Â­â€°Ã§Å¡â€žÃ©ÂªÂ¨Ã¦Å¾Â¶Ã¥Â°Ë†Ã¦Â¡Ë†
2. Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¹Â³Ã¨Â¡Å’ agents Ã¨Â©â€¢Ã¤Â¼Â°Ã©ÂÂ¸Ã©Â â€¦Ã¯Â¼Å¡
   - Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¨Â©â€¢Ã¤Â¼Â°
   - Ã¦â€œÂ´Ã¥Â±â€¢Ã¦â‚¬Â§Ã¥Ë†â€ Ã¦Å¾Â
   - Ã§â€ºÂ¸Ã©â€”Å“Ã¦â‚¬Â§Ã¨Â©â€¢Ã¥Ë†â€ 
   - Ã¥Â¯Â¦Ã¤Â½Å“Ã¨Â¦ÂÃ¥Å Æ’
3. Ã¨Â¤â€¡Ã¨Â£Â½Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Å’Â¹Ã©â€¦ÂÃ¤Â½Å“Ã§â€šÂºÃ¥Å¸ÂºÃ§Â¤Å½
4. Ã¥Å“Â¨Ã§Â¶â€œÃ©ÂÅ½Ã©Â©â€”Ã¨Â­â€°Ã§Å¡â€žÃ§ÂµÂÃ¦Â§â€¹Ã¤Â¸Â­Ã¨Â¿Â­Ã¤Â»Â£
