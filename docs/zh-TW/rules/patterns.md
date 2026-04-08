# Ã¥Â¸Â¸Ã¨Â¦â€¹Ã¦Â¨Â¡Ã¥Â¼Â

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
