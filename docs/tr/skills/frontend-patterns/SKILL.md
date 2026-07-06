---
name: frontend-patterns
description: React, Next.js, state yÃƒÂ¶netimi, performans optimizasyonu ve UI en iyi uygulamalarÃ„Â± iÃƒÂ§in frontend geliÃ…Å¸tirme kalÃ„Â±plarÃ„Â±.
origin: ECC
---

# Frontend GeliÃ…Å¸tirme KalÃ„Â±plarÃ„Â±

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


React, Next.js ve performanslÃ„Â± kullanÃ„Â±cÃ„Â± arayÃƒÂ¼zleri iÃƒÂ§in modern frontend kalÃ„Â±plarÃ„Â±.

## Ne Zaman AktifleÃ…Å¸tirmelisiniz

- React bileÃ…Å¸enleri oluÃ…Å¸tururken (composition, props, rendering)
- State yÃƒÂ¶netirken (useState, useReducer, Zustand, Context)
- Veri ÃƒÂ§ekme implementasyonu (SWR, React Query, server components)
- Performans optimize ederken (memoization, virtualization, code splitting)
- Formlarla ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±rken (validation, controlled inputs, Zod schemas)
- Client-side routing ve navigasyon iÃ…Å¸lerken
- EriÃ…Å¸ilebilir, responsive UI kalÃ„Â±plarÃ„Â± oluÃ…Å¸tururken

## BileÃ…Å¸en KalÃ„Â±plarÃ„Â±

### KalÃ„Â±tÃ„Â±m Yerine Composition

```typescript
// PASS: Ã„Â°YÃ„Â°: BileÃ…Å¸en composition
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

// KullanÃ„Â±m
<Card>
  <CardHeader>BaÃ…Å¸lÃ„Â±k</CardHeader>
  <CardBody>Ã„Â°ÃƒÂ§erik</CardBody>
</Card>
```

### Compound Components

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

// KullanÃ„Â±m
<Tabs defaultTab="overview">
  <TabList>
    <Tab id="overview">Genel BakÃ„Â±Ã…Å¸</Tab>
    <Tab id="details">Detaylar</Tab>
  </TabList>
</Tabs>
```

### Render Props KalÃ„Â±bÃ„Â±

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

// KullanÃ„Â±m
<DataLoader<Market[]> url="/api/markets">
  {(markets, loading, error) => {
    if (loading) return <Spinner />
    if (error) return <Error error={error} />
    return <MarketList markets={markets!} />
  }}
</DataLoader>
```

## Ãƒâ€“zel Hook KalÃ„Â±plarÃ„Â±

### State YÃƒÂ¶netimi Hook'u

```typescript
export function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(v => !v)
  }, [])

  return [value, toggle]
}

// KullanÃ„Â±m
const [isOpen, toggleOpen] = useToggle()
```

### Async Veri Ãƒâ€¡ekme Hook'u

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

// KullanÃ„Â±m
const { data: markets, loading, error, refetch } = useQuery(
  'markets',
  () => fetch('/api/markets').then(r => r.json()),
  {
    onSuccess: data => console.log('Getirilen', data.length, 'market'),
    onError: err => console.error('BaÃ…Å¸arÃ„Â±sÃ„Â±z:', err)
  }
)
```

### Debounce Hook'u

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

// KullanÃ„Â±m
const [searchQuery, setSearchQuery] = useState('')
const debouncedQuery = useDebounce(searchQuery, 500)

useEffect(() => {
  if (debouncedQuery) {
    performSearch(debouncedQuery)
  }
}, [debouncedQuery])
```

## State YÃƒÂ¶netimi KalÃ„Â±plarÃ„Â±

### Context + Reducer KalÃ„Â±bÃ„Â±

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

## Performans Optimizasyonu

### Memoization

```typescript
// PASS: PahalÃ„Â± hesaplamalar iÃƒÂ§in useMemo
const sortedMarkets = useMemo(() => {
  return markets.sort((a, b) => b.volume - a.volume)
}, [markets])

// PASS: Alt bileÃ…Å¸enlere geÃƒÂ§irilen fonksiyonlar iÃƒÂ§in useCallback
const handleSearch = useCallback((query: string) => {
  setSearchQuery(query)
}, [])

// PASS: Pure bileÃ…Å¸enler iÃƒÂ§in React.memo
export const MarketCard = React.memo<MarketCardProps>(({ market }) => {
  return (
    <div className="market-card">
      <h3>{market.name}</h3>
      <p>{market.description}</p>
    </div>
  )
})
```

### Code Splitting ve Lazy Loading

```typescript
import { lazy, Suspense } from 'react'

// PASS: AÃ„Å¸Ã„Â±r bileÃ…Å¸enleri lazy yÃƒÂ¼kle
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

### Uzun Listeler iÃƒÂ§in Virtualization

```typescript
import { useVirtualizer } from '@tanstack/react-virtual'

export function VirtualMarketList({ markets }: { markets: Market[] }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: markets.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,  // Tahmini satÃ„Â±r yÃƒÂ¼ksekliÃ„Å¸i
    overscan: 5  // Ekstra render edilecek ÃƒÂ¶Ã„Å¸eler
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

## Form Ã„Â°Ã…Å¸leme KalÃ„Â±plarÃ„Â±

### DoÃ„Å¸rulamalÃ„Â± Controlled Form

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
      newErrors.name = 'Ã„Â°sim gereklidir'
    } else if (formData.name.length > 200) {
      newErrors.name = 'Ã„Â°sim 200 karakterden az olmalÃ„Â±dÃ„Â±r'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'AÃƒÂ§Ã„Â±klama gereklidir'
    }

    if (!formData.endDate) {
      newErrors.endDate = 'BitiÃ…Å¸ tarihi gereklidir'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    try {
      await createMarket(formData)
      // BaÃ…Å¸arÃ„Â± iÃ…Å¸leme
    } catch (error) {
      // Hata iÃ…Å¸leme
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
        placeholder="Market ismi"
      />
      {errors.name && <span className="error">{errors.name}</span>}

      {/* DiÃ„Å¸er alanlar */}

      <button type="submit">Market OluÃ…Å¸tur</button>
    </form>
  )
}
```

## Error Boundary KalÃ„Â±bÃ„Â±

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
          <h2>Bir Ã…Å¸eyler yanlÃ„Â±Ã…Å¸ gitti</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Tekrar dene
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// KullanÃ„Â±m
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

## Animasyon KalÃ„Â±plarÃ„Â±

### Framer Motion AnimasyonlarÃ„Â±

```typescript
import { motion, AnimatePresence } from 'framer-motion'

// PASS: Liste animasyonlarÃ„Â±
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

// PASS: Modal animasyonlarÃ„Â±
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

## EriÃ…Å¸ilebilirlik KalÃ„Â±plarÃ„Â±

### Klavye Navigasyonu

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
      {/* Dropdown implementasyonu */}
    </div>
  )
}
```

### Focus YÃƒÂ¶netimi

```typescript
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Ã…Å¾u anki focus'lanmÃ„Â±Ã…Å¸ elementi kaydet
      previousFocusRef.current = document.activeElement as HTMLElement

      // Modal'a focus yap
      modalRef.current?.focus()
    } else {
      // KapatÃ„Â±rken focus'u geri yÃƒÂ¼kle
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

**UnutmayÃ„Â±n**: Modern frontend kalÃ„Â±plarÃ„Â± sÃƒÂ¼rdÃƒÂ¼rÃƒÂ¼lebilir, performanslÃ„Â± kullanÃ„Â±cÃ„Â± arayÃƒÂ¼zleri saÃ„Å¸lar. Proje karmaÃ…Å¸Ã„Â±klÃ„Â±Ã„Å¸Ã„Â±nÃ„Â±za uyan kalÃ„Â±plarÃ„Â± seÃƒÂ§in.
