---
name: frontend-patterns
description: Frontend development patterns for React, Next.js, state management, performance optimization, and UI best practices.
---

# Ã¥â€°ÂÃ§Â«Â¯Ã©â€“â€¹Ã§â„¢Â¼Ã¦Â¨Â¡Ã¥Â¼Â

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


Ã§â€Â¨Ã¦â€“Â¼ ReactÃ£â‚¬ÂNext.js Ã¥â€™Å’Ã©Â«ËœÃ¦â€¢Ë†Ã¨Æ’Â½Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¤Â»â€¹Ã©ÂÂ¢Ã§Å¡â€žÃ§ÂÂ¾Ã¤Â»Â£Ã¥â€°ÂÃ§Â«Â¯Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š

## Ã¥â€¦Æ’Ã¤Â»Â¶Ã¦Â¨Â¡Ã¥Â¼Â

### Ã§Âµâ€žÃ¥ÂË†Ã¥â€žÂªÃ¦â€“Â¼Ã§Â¹Â¼Ã¦â€°Â¿

```typescript
// PASS: Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¥â€¦Æ’Ã¤Â»Â¶Ã§Âµâ€žÃ¥ÂË†
interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'outlined'
}

export function Card({ children, variant = 'default' }: CardProps) {
  return <div className={`card card-${variant}`}>{children}</div>
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="card-body">{children}</div>
}

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â
<Card>
  <CardHeader>Ã¦Â¨â„¢Ã©Â¡Å’</CardHeader>
  <CardBody>Ã¥â€¦Â§Ã¥Â®Â¹</CardBody>
</Card>
```

### Ã¨Â¤â€¡Ã¥ÂË†Ã¥â€¦Æ’Ã¤Â»Â¶

```typescript
interface TabsContextValue {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

export function Tabs({ children, defaultTab }: {
  children: React.ReactNode
  defaultTab: string
}) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

export function TabList({ children }: { children: React.ReactNode }) {
  return <div className="tab-list">{children}</div>
}

export function Tab({ id, children }: { id: string, children: React.ReactNode }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tab must be used within Tabs')

  return (
    <button
      className={context.activeTab === id ? 'active' : ''}
      onClick={() => context.setActiveTab(id)}
    >
      {children}
    </button>
  )
}

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â
<Tabs defaultTab="overview">
  <TabList>
    <Tab id="overview">Ã¦Â¦â€šÃ¨Â¦Â½</Tab>
    <Tab id="details">Ã¨Â©Â³Ã¦Æ’â€¦</Tab>
  </TabList>
</Tabs>
```

### Render Props Ã¦Â¨Â¡Ã¥Â¼Â

```typescript
interface DataLoaderProps<T> {
  url: string
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode
}

export function DataLoader<T>({ url, children }: DataLoaderProps<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])

  return <>{children(data, loading, error)}</>
}

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â
<DataLoader<Market[]> url="/api/markets">
  {(markets, loading, error) => {
    if (loading) return <Spinner />
    if (error) return <Error error={error} />
    return <MarketList markets={markets!} />
  }}
</DataLoader>
```

## Ã¨â€¡ÂªÃ¨Â¨â€š Hooks Ã¦Â¨Â¡Ã¥Â¼Â

### Ã§â€¹â‚¬Ã¦â€¦â€¹Ã§Â®Â¡Ã§Ââ€  Hook

```typescript
export function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(v => !v)
  }, [])

  return [value, toggle]
}

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â
const [isOpen, toggleOpen] = useToggle()
```

### Ã©ÂÅ¾Ã¥ÂÅ’Ã¦Â­Â¥Ã¨Â³â€¡Ã¦â€“â„¢Ã¥Ââ€“Ã¥Â¾â€” Hook

```typescript
interface UseQueryOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  enabled?: boolean
}

export function useQuery<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: UseQueryOptions<T>
) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetcher()
      setData(result)
      options?.onSuccess?.(result)
    } catch (err) {
      const error = err as Error
      setError(error)
      options?.onError?.(error)
    } finally {
      setLoading(false)
    }
  }, [fetcher, options])

  useEffect(() => {
    if (options?.enabled !== false) {
      refetch()
    }
  }, [key, refetch, options?.enabled])

  return { data, error, loading, refetch }
}

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â
const { data: markets, loading, error, refetch } = useQuery(
  'markets',
  () => fetch('/api/markets').then(r => r.json()),
  {
    onSuccess: data => console.log('Fetched', data.length, 'markets'),
    onError: err => console.error('Failed:', err)
  }
)
```

### Debounce Hook

```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â
const [searchQuery, setSearchQuery] = useState('')
const debouncedQuery = useDebounce(searchQuery, 500)

useEffect(() => {
  if (debouncedQuery) {
    performSearch(debouncedQuery)
  }
}, [debouncedQuery])
```

## Ã§â€¹â‚¬Ã¦â€¦â€¹Ã§Â®Â¡Ã§Ââ€ Ã¦Â¨Â¡Ã¥Â¼Â

### Context + Reducer Ã¦Â¨Â¡Ã¥Â¼Â

```typescript
interface State {
  markets: Market[]
  selectedMarket: Market | null
  loading: boolean
}

type Action =
  | { type: 'SET_MARKETS'; payload: Market[] }
  | { type: 'SELECT_MARKET'; payload: Market }
  | { type: 'SET_LOADING'; payload: boolean }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_MARKETS':
      return { ...state, markets: action.payload }
    case 'SELECT_MARKET':
      return { ...state, selectedMarket: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

const MarketContext = createContext<{
  state: State
  dispatch: Dispatch<Action>
} | undefined>(undefined)

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    markets: [],
    selectedMarket: null,
    loading: false
  })

  return (
    <MarketContext.Provider value={{ state, dispatch }}>
      {children}
    </MarketContext.Provider>
  )
}

export function useMarkets() {
  const context = useContext(MarketContext)
  if (!context) throw new Error('useMarkets must be used within MarketProvider')
  return context
}
```

## Ã¦â€¢Ë†Ã¨Æ’Â½Ã¥â€žÂªÃ¥Å’â€“

### Ã¨Â¨ËœÃ¦â€ Â¶Ã¥Å’â€“

```typescript
// PASS: useMemo Ã§â€Â¨Ã¦â€“Â¼Ã¦Ëœâ€šÃ¨Â²Â´Ã¨Â¨Ë†Ã§Â®â€”
const sortedMarkets = useMemo(() => {
  return markets.sort((a, b) => b.volume - a.volume)
}, [markets])

// PASS: useCallback Ã§â€Â¨Ã¦â€“Â¼Ã¥â€šÂ³Ã©ÂÅ¾Ã§ÂµÂ¦Ã¥Â­ÂÃ¥â€¦Æ’Ã¤Â»Â¶Ã§Å¡â€žÃ¥â€¡Â½Ã¥Â¼Â
const handleSearch = useCallback((query: string) => {
  setSearchQuery(query)
}, [])

// PASS: React.memo Ã§â€Â¨Ã¦â€“Â¼Ã§Â´â€Ã¥â€¦Æ’Ã¤Â»Â¶
export const MarketCard = React.memo<MarketCardProps>(({ market }) => {
  return (
    <div className="market-card">
      <h3>{market.name}</h3>
      <p>{market.description}</p>
    </div>
  )
})
```

### Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Ë†â€ Ã¥â€°Â²Ã¨Ë†â€¡Ã¥Â»Â¶Ã©ÂÂ²Ã¨Â¼â€°Ã¥â€¦Â¥

```typescript
import { lazy, Suspense } from 'react'

// PASS: Ã¥Â»Â¶Ã©ÂÂ²Ã¨Â¼â€°Ã¥â€¦Â¥Ã©â€¡ÂÃ¥Å¾â€¹Ã¥â€¦Æ’Ã¤Â»Â¶
const HeavyChart = lazy(() => import('./HeavyChart'))
const ThreeJsBackground = lazy(() => import('./ThreeJsBackground'))

export function Dashboard() {
  return (
    <div>
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart data={data} />
      </Suspense>

      <Suspense fallback={null}>
        <ThreeJsBackground />
      </Suspense>
    </div>
  )
}
```

### Ã©â€¢Â·Ã¥Ë†â€”Ã¨Â¡Â¨Ã¨â„¢â€ºÃ¦â€œÂ¬Ã¥Å’â€“

```typescript
import { useVirtualizer } from '@tanstack/react-virtual'

export function VirtualMarketList({ markets }: { markets: Market[] }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: markets.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,  // Ã©Â ÂÃ¤Â¼Â°Ã¨Â¡Å’Ã©Â«Ëœ
    overscan: 5  // Ã©Â¡ÂÃ¥Â¤â€“Ã¦Â¸Â²Ã¦Å¸â€œÃ§Å¡â€žÃ©Â â€¦Ã§â€ºÂ®Ã¦â€¢Â¸
  })

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative'
        }}
      >
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`
            }}
          >
            <MarketCard market={markets[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Ã¨Â¡Â¨Ã¥â€“Â®Ã¨â„¢â€¢Ã§Ââ€ Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¥Â¸Â¶Ã©Â©â€”Ã¨Â­â€°Ã§Å¡â€žÃ¥Ââ€”Ã¦Å½Â§Ã¨Â¡Â¨Ã¥â€“Â®

```typescript
interface FormData {
  name: string
  description: string
  endDate: string
}

interface FormErrors {
  name?: string
  description?: string
  endDate?: string
}

export function CreateMarketForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    endDate: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Ã¥ÂÂÃ§Â¨Â±Ã§â€šÂºÃ¥Â¿â€¦Ã¥Â¡Â«'
    } else if (formData.name.length > 200) {
      newErrors.name = 'Ã¥ÂÂÃ§Â¨Â±Ã¥Â¿â€¦Ã©Â Ë†Ã¥Â°â€˜Ã¦â€“Â¼ 200 Ã¥â‚¬â€¹Ã¥Â­â€”Ã¥â€¦Æ’'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Ã¦ÂÂÃ¨Â¿Â°Ã§â€šÂºÃ¥Â¿â€¦Ã¥Â¡Â«'
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Ã§ÂµÂÃ¦ÂÅ¸Ã¦â€”Â¥Ã¦Å“Å¸Ã§â€šÂºÃ¥Â¿â€¦Ã¥Â¡Â«'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    try {
      await createMarket(formData)
      // Ã¦Ë†ÂÃ¥Å Å¸Ã¨â„¢â€¢Ã§Ââ€ 
    } catch (error) {
      // Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨â„¢â€¢Ã§Ââ€ 
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
        placeholder="Ã¥Â¸â€šÃ¥Â Â´Ã¥ÂÂÃ§Â¨Â±"
      />
      {errors.name && <span className="error">{errors.name}</span>}

      {/* Ã¥â€¦Â¶Ã¤Â»â€“Ã¦Â¬â€žÃ¤Â½Â */}

      <button type="submit">Ã¥Â»ÂºÃ§Â«â€¹Ã¥Â¸â€šÃ¥Â Â´</button>
    </form>
  )
}
```

## Error Boundary Ã¦Â¨Â¡Ã¥Â¼Â

```typescript
interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Ã§â„¢Â¼Ã§â€Å¸Ã©Å’Â¯Ã¨ÂªÂ¤</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Ã©â€¡ÂÃ¨Â©Â¦
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

## Ã¥â€¹â€¢Ã§â€¢Â«Ã¦Â¨Â¡Ã¥Â¼Â

### Framer Motion Ã¥â€¹â€¢Ã§â€¢Â«

```typescript
import { motion, AnimatePresence } from 'framer-motion'

// PASS: Ã¥Ë†â€”Ã¨Â¡Â¨Ã¥â€¹â€¢Ã§â€¢Â«
export function AnimatedMarketList({ markets }: { markets: Market[] }) {
  return (
    <AnimatePresence>
      {markets.map(market => (
        <motion.div
          key={market.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <MarketCard market={market} />
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

// PASS: Modal Ã¥â€¹â€¢Ã§â€¢Â«
export function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

## Ã§â€žÂ¡Ã©Å¡Å“Ã§Â¤â„¢Ã¦Â¨Â¡Ã¥Â¼Â

### Ã©ÂÂµÃ§â€ºÂ¤Ã¥Â°Å½Ã¨Ë†Âª

```typescript
export function Dropdown({ options, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex(i => Math.min(i + 1, options.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex(i => Math.max(i - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        onSelect(options[activeIndex])
        setIsOpen(false)
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  return (
    <div
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      onKeyDown={handleKeyDown}
    >
      {/* Ã¤Â¸â€¹Ã¦â€¹â€°Ã©ÂÂ¸Ã¥â€“Â®Ã¥Â¯Â¦Ã¤Â½Å“ */}
    </div>
  )
}
```

### Ã§â€žÂ¦Ã©Â»Å¾Ã§Â®Â¡Ã§Ââ€ 

```typescript
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Ã¥â€žÂ²Ã¥Â­ËœÃ§â€ºÂ®Ã¥â€°ÂÃ¨ÂÅ¡Ã§â€žÂ¦Ã§Å¡â€žÃ¥â€¦Æ’Ã§Â´Â 
      previousFocusRef.current = document.activeElement as HTMLElement

      // Ã¨ÂÅ¡Ã§â€žÂ¦ modal
      modalRef.current?.focus()
    } else {
      // Ã©â€”Å“Ã©â€“â€°Ã¦â„¢â€šÃ¦ÂÂ¢Ã¥Â¾Â©Ã§â€žÂ¦Ã©Â»Å¾
      previousFocusRef.current?.focus()
    }
  }, [isOpen])

  return isOpen ? (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={e => e.key === 'Escape' && onClose()}
    >
      {children}
    </div>
  ) : null
}
```

**Ã¨Â¨ËœÃ¤Â½Â**Ã¯Â¼Å¡Ã§ÂÂ¾Ã¤Â»Â£Ã¥â€°ÂÃ§Â«Â¯Ã¦Â¨Â¡Ã¥Â¼ÂÃ¨Æ’Â½Ã¥Â¯Â¦Ã§ÂÂ¾Ã¥ÂÂ¯Ã§Â¶Â­Ã¨Â­Â·Ã£â‚¬ÂÃ©Â«ËœÃ¦â€¢Ë†Ã¨Æ’Â½Ã§Å¡â€žÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¤Â»â€¹Ã©ÂÂ¢Ã£â‚¬â€šÃ©ÂÂ¸Ã¦â€œâ€¡Ã§Â¬Â¦Ã¥ÂË†Ã¤Â½Â Ã¥Â°Ë†Ã¦Â¡Ë†Ã¨Â¤â€¡Ã©â€ºÅ“Ã¥ÂºÂ¦Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š
