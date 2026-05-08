---
name: safari-production-code-standards
description: Safari Circuits production code standards for generating near production-ready code. Evoke this skill when writing TypeScript/React frontends, C#/.NET backends, MCP servers, or any Safari product code. Applies consistent patterns, Safari brand styling, architecture conventions, and streamlines code review.
---

# Safari Production Code Standards

Generate near production-ready code that follows Safari Circuits engineering patterns, brand guidelines, and quality standards. This skill reduces review cycles by ensuring code consistency from first generation.

## When to Use This Skill

Evoke this skill when:
- Writing new TypeScript/React frontend components
- Building C#/.NET backend APIs
- Creating MCP server tools
- Implementing Safari Trace or Safari product features
- Generating code that needs to pass senior engineer review
- **Creating HTML deliverables** (whitepapers, guides, reports) with Safari branding

## Quick Reference

| Stack | Key Patterns | Reference |
|-------|--------------|-----------|
| **Next.js/React** | ApiClient singleton, useApiClient hook, CVA variants, type hierarchy | [Next.js Frontend](#nextjs-frontend-standards) |
| **FastAPI/Python** | TokenManager, Pydantic validators, async SQLAlchemy, Celery | [FastAPI Backend](#fastapi-backend-standards) |
| **TypeScript/React** | Strict types, Zod validation, async/await | [TypeScript Standards](#typescript-standards) |
| **C#/.NET** | Clean architecture, DI, EF Core | [C# Standards](#c-net-standards) |
| **UI Components** | Safari Theme, dark-first, 8px grid | [Safari Brand UI](#safari-brand-ui) |
| **API Design** | RESTful, proper HTTP codes, DTOs | [API Patterns](#api-design-patterns) |
| **HTML Deliverables** | Full 7-path logo, print-ready pages, branded styling | [HTML Styling Guide](reference/html-deliverable-styling.md) |
| **SVG Diagrams** | Architecture boxes, arrows, layer colors | [SVG Styling Guide](reference/svg-styling.md) |
| **PDF Documents** | Print-safe colors, font embedding, export settings | [PDF Styling Guide](reference/pdf-styling.md) |
| **Word Documents** | Template styles, table formatting, headers | [DOCX Styling Guide](reference/docx-styling.md) |
| **PowerPoint** | Slide layouts, theme colors, animation rules | [PPTX Styling Guide](reference/pptx-styling.md) |
| **Excel Workbooks** | Table styles, conditional formatting, charts | [XLSX Styling Guide](reference/xlsx-styling.md) |
| **React/JSX** | CSS variables, component library, theme system | [JSX Styling Guide](reference/jsx-styling.md) |

---

## Next.js Frontend Standards

*Patterns from `ti_quote_order_manager` - Next.js 14.2.7 + React 18 + TypeScript 5 + Tailwind CSS + Radix UI*

### Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 14.2.7 |
| UI | React + Radix UI | 18.x |
| Styling | Tailwind CSS + CVA | 3.4.1 |
| Auth | Azure AD (MSAL) | @azure/msal-react |
| State | React hooks (no external state lib) | - |
| Forms | Manual state (no react-hook-form) | - |

### Type Hierarchy Pattern (REQUIRED)

Centralize all API types with consistent suffixes:

```typescript
// lib/api-types.ts - Single source of truth for all API types

// Base types - shared fields
export type UserBase = {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
};

// Create types - for POST requests (omit auto-generated fields)
export type UserCreate = UserBase & {
  user_id: string;
};

// Read types - for GET responses (includes computed/server fields)
export type UserRead = UserBase & {
  user_id: string;
  total_orders: number;
  created_at: string;
  updated_at: string;
};

// Response wrappers - for API envelope
export type UserResponse = {
  data: UserRead;
  meta?: { cached: boolean };
};

export type UsersListResponse = {
  data: UserRead[];
  meta: { total: number; page: number };
};
```

**Suffix Conventions:**
| Suffix | Purpose | Example |
|--------|---------|---------|
| `*Base` | Shared fields between create/read | `QuoteBase` |
| `*Create` | POST request payload | `QuoteCreate` |
| `*Read` | GET response data | `QuoteRead` |
| `*Response` | Full API envelope | `QuoteResponse` |
| `*Summary` | Lightweight list view | `QuoteSummary` |

### Custom API Client Pattern (REQUIRED)

Use a singleton API client class, NOT axios or tanstack-query:

```typescript
// lib/api-client.ts
export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new ApiClientError(
        error.message || `Request failed: ${response.status}`,
        response.status
      );
    }

    return response.json();
  }

  async authenticatedRequest<T>(
    endpoint: string,
    accessToken: string,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  // Typed methods for each endpoint
  async getQuotes(
    filters: QuoteFilters,
    token: string
  ): Promise<QuotesListResponse> {
    const params = new URLSearchParams();
    if (filters.status) params.set('status', filters.status);
    if (filters.customerId) params.set('customer_id', filters.customerId);

    return this.authenticatedRequest<QuotesListResponse>(
      `/quotes?${params.toString()}`,
      token
    );
  }

  async createQuote(
    data: QuoteCreate,
    token: string
  ): Promise<QuoteResponse> {
    return this.authenticatedRequest<QuoteResponse>('/quotes', token, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Singleton export
export const apiClient = new ApiClient();

// Custom error class
export class ApiClientError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'ApiClientError';
  }
}
```

### useApiClient Hook Pattern (REQUIRED)

Wrap API client with authentication context:

```typescript
// hooks/use-api-client.ts
import { useAuth } from '@/contexts/auth-context';
import { apiClient, ApiClientError } from '@/lib/api-client';

export function useApiClient() {
  const { getAccessToken } = useAuth();

  const authenticatedRequest = async <T>(
    requestFn: (token: string) => Promise<T>
  ): Promise<T> => {
    const token = await getAccessToken();
    if (!token) {
      throw new ApiClientError('No access token available', 401);
    }
    return requestFn(token);
  };

  return {
    // Expose typed methods
    getQuotes: (filters: QuoteFilters) =>
      authenticatedRequest((token) => apiClient.getQuotes(filters, token)),

    createQuote: (data: QuoteCreate) =>
      authenticatedRequest((token) => apiClient.createQuote(data, token)),

    getQuote: (id: string) =>
      authenticatedRequest((token) => apiClient.getQuote(id, token)),
  };
}
```

**Usage in components:**
```typescript
function QuoteList() {
  const { getQuotes } = useApiClient();
  const [quotes, setQuotes] = useState<QuoteRead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuotes({ status: 'active' })
      .then((response) => setQuotes(response.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ...
}
```

### CVA Component Variants (REQUIRED)

Use Class Variance Authority for component styling:

```typescript
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base classes (always applied)
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 text-white hover:bg-primary-400',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border border-slate-600 bg-transparent hover:bg-slate-800',
        secondary: 'bg-slate-700 text-slate-100 hover:bg-slate-600',
        ghost: 'hover:bg-slate-800 hover:text-slate-100',
        link: 'text-primary-400 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-11 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
```

### Filter Stability with useRef (RECOMMENDED)

Prevent unnecessary re-renders with ref-based filter tracking:

```typescript
function QuoteFilters({ onFilterChange }: { onFilterChange: (filters: QuoteFilters) => void }) {
  // Use refs to track filter values without causing re-renders
  const filtersRef = useRef<QuoteFilters>({
    status: undefined,
    customerId: undefined,
    dateFrom: undefined,
  });

  const handleStatusChange = (status: string | undefined) => {
    filtersRef.current.status = status;
    onFilterChange({ ...filtersRef.current });
  };

  const handleCustomerChange = (customerId: string | undefined) => {
    filtersRef.current.customerId = customerId;
    onFilterChange({ ...filtersRef.current });
  };

  // Only re-render when explicitly needed
  return (
    <div className="flex gap-4">
      <Select onValueChange={handleStatusChange}>
        {/* ... */}
      </Select>
      <CustomerSelector onSelect={handleCustomerChange} />
    </div>
  );
}
```

### Resilient Auth with Fallbacks (REQUIRED)

Handle authentication failures gracefully:

```typescript
// contexts/auth-context.tsx
export function AuthProvider({ children }: { children: ReactNode }) {
  const { instance, accounts } = useMsal();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getAccessToken = async (): Promise<string | null> => {
    const account = accounts[0];
    if (!account) return null;

    try {
      // Try silent token acquisition first
      const response = await instance.acquireTokenSilent({
        scopes: ['api://your-api/.default'],
        account,
      });
      return response.accessToken;
    } catch (error) {
      // Fallback: try interactive if silent fails
      if (error instanceof InteractionRequiredAuthError) {
        try {
          const response = await instance.acquireTokenPopup({
            scopes: ['api://your-api/.default'],
          });
          return response.accessToken;
        } catch (popupError) {
          console.error('Interactive auth failed:', popupError);
          return null;
        }
      }
      console.error('Token acquisition failed:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Deprecation Annotations (RECOMMENDED)

Mark deprecated code clearly for gradual migration:

```typescript
// When migrating APIs or components

/**
 * @deprecated Use `QuoteRead` instead. Will be removed in v2.0.
 */
export type Quote = QuoteRead;

/**
 * @deprecated Use `useApiClient().getQuotes()` instead.
 */
export async function fetchQuotes(token: string): Promise<QuotesListResponse> {
  console.warn('fetchQuotes is deprecated. Use useApiClient().getQuotes()');
  return apiClient.getQuotes({}, token);
}
```

### File Structure (Next.js App Router)

```
app/
├── (auth)/                   # Auth-required routes (grouped)
│   ├── quotes/
│   │   ├── page.tsx          # /quotes
│   │   └── [id]/page.tsx     # /quotes/:id
│   └── orders/
│       └── page.tsx
├── api/                      # API routes (if needed)
├── layout.tsx                # Root layout
└── page.tsx                  # Home page

components/
├── ui/                       # Base UI components (CVA-styled)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── select.tsx
├── quotes/                   # Feature-specific components
│   ├── quote-list.tsx
│   ├── quote-card.tsx
│   └── quote-filters.tsx
└── layout/                   # Layout components
    ├── header.tsx
    └── sidebar.tsx

lib/
├── api-client.ts             # Singleton API client
├── api-types.ts              # All API type definitions
├── utils.ts                  # cn() and utilities
└── constants.ts              # App constants

hooks/
├── use-api-client.ts         # Auth-wrapped API access
├── use-debounce.ts           # Debounce hook
└── use-local-storage.ts      # LocalStorage hook

contexts/
├── auth-context.tsx          # MSAL auth provider
└── theme-context.tsx         # Theme provider
```

---

## FastAPI Backend Standards

*Patterns from `ti_backend_api` - FastAPI 0.115 + SQLAlchemy 2.0 async + Pydantic 2.11 + Celery*

### Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | FastAPI | 0.115.12 |
| ORM | SQLAlchemy (async) | 2.0.36 |
| Validation | Pydantic | 2.11.4 |
| Database | PostgreSQL (asyncpg) | - |
| Tasks | Celery + Redis | 5.5.3 |
| Auth | TokenManager (custom) | - |

### TokenManager Pattern (REQUIRED)

Centralized token management with proactive background refresh:

```python
# services/token_manager.py
import asyncio
import time
import aiohttp
from typing import Optional

class TokenManager:
    """
    Manages OAuth tokens with proactive background refresh.
    Thread-safe with asyncio.Lock.
    """

    def __init__(
        self,
        service: str,
        token_url: str,
        client_id: str,
        client_secret: str,
        scope: Optional[str] = None
    ):
        self.service = service
        self.token_url = token_url
        self.client_id = client_id
        self.client_secret = client_secret
        self.scope = scope

        self._token_cache = {
            'access_token': None,
            'expires_in': 0,
            'issued_at': 0
        }
        self._token_lock = asyncio.Lock()
        self._refresh_task: Optional[asyncio.Task] = None

    async def get_access_token(self) -> str:
        """Get valid token, refreshing if needed."""
        async with self._token_lock:
            now = time.time()
            expires_at = self._token_cache['issued_at'] + self._token_cache['expires_in']

            # Return cached token if valid (with 60s buffer)
            if self._token_cache['access_token'] and (expires_at - now > 60):
                return self._token_cache['access_token']

            # Refresh needed
            await self._refresh_token_locked()
            return self._token_cache['access_token']

    async def _refresh_token_locked(self) -> None:
        """Refresh token (must hold lock)."""
        async with aiohttp.ClientSession() as session:
            data = {
                'grant_type': 'client_credentials',
                'client_id': self.client_id,
                'client_secret': self.client_secret,
            }
            if self.scope:
                data['scope'] = self.scope

            async with session.post(self.token_url, data=data) as response:
                response.raise_for_status()
                token_data = await response.json()

                self._token_cache = {
                    'access_token': token_data['access_token'],
                    'expires_in': token_data.get('expires_in', 3600),
                    'issued_at': time.time()
                }

    def start_background_refresh(self) -> None:
        """Start proactive token refresh loop."""
        self._refresh_task = asyncio.create_task(self._background_refresh_loop())

    async def _background_refresh_loop(self) -> None:
        """Proactively refresh tokens before expiry."""
        while True:
            try:
                expires_at = self._token_cache['issued_at'] + self._token_cache['expires_in']
                sleep_time = max(0, expires_at - time.time() - 300)  # Refresh 5min before expiry
                await asyncio.sleep(sleep_time)

                async with self._token_lock:
                    await self._refresh_token_locked()

            except Exception as e:
                logger.error(f"Background token refresh failed: {e}")
                await asyncio.sleep(60)  # Retry after 1min on error

    async def close(self) -> None:
        """Cancel background refresh task."""
        if self._refresh_task:
            self._refresh_task.cancel()
            try:
                await self._refresh_task
            except asyncio.CancelledError:
                pass
```

### Lifespan Context Manager (REQUIRED)

Use FastAPI's lifespan for startup/shutdown:

```python
# main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifecycle management."""
    # Startup
    logger.info("Starting application...")

    # Initialize database
    await init_database()

    # Start token managers
    app.state.erp_token_manager = TokenManager(
        service="erp",
        token_url=settings.ERP_TOKEN_URL,
        client_id=settings.ERP_CLIENT_ID,
        client_secret=settings.ERP_CLIENT_SECRET,
    )
    app.state.erp_token_manager.start_background_refresh()

    logger.info("Application started")

    yield  # Application runs here

    # Shutdown
    logger.info("Shutting down...")
    await app.state.erp_token_manager.close()
    await close_database()
    logger.info("Shutdown complete")

app = FastAPI(
    title="TI Backend API",
    lifespan=lifespan
)
```

### Pydantic Computed Fields (REQUIRED)

Use `@model_validator` for computed properties:

```python
# models/quote.py
from pydantic import BaseModel, model_validator
from typing import Optional
from decimal import Decimal

class LineItem(BaseModel):
    sku: str
    quantity: int
    unit_price: Optional[Decimal] = None
    description: Optional[str] = None

class QuoteSummary(BaseModel):
    quote_id: str
    customer_id: str
    line_items: list[LineItem] = []

    # Computed fields
    total_amount: Optional[Decimal] = None
    line_count: int = 0
    overall_status: Optional[str] = None

    @model_validator(mode='after')
    def compute_totals(self) -> 'QuoteSummary':
        """Compute derived fields from line items."""
        if self.line_items:
            self.total_amount = sum(
                (item.unit_price or Decimal(0)) * item.quantity
                for item in self.line_items
            )
            self.line_count = len(self.line_items)
        return self

    @model_validator(mode='after')
    def compute_status(self) -> 'QuoteSummary':
        """Derive overall status from line items."""
        if not self.line_items:
            self.overall_status = 'empty'
        elif all(item.unit_price for item in self.line_items):
            self.overall_status = 'priced'
        else:
            self.overall_status = 'pending_pricing'
        return self
```

### Transactional Logging with Flush (REQUIRED)

Log operations within database transactions:

```python
# services/order_service.py
from sqlalchemy.ext.asyncio import AsyncSession
from models.database import OrderPushLog, Order

async def push_orders_to_erp(
    db: AsyncSession,
    orders: list[dict]
) -> dict:
    """
    Push orders to ERP with transactional logging.
    Uses flush pattern for log ID assignment before commit.
    """
    results = {'success': [], 'failed': []}
    order_log_pairs = []

    # Phase 1: Create log entries and pair with orders
    for order in orders:
        log = OrderPushLog(
            order_id=order.get('orderNumber'),
            payload=order,
            status='RECEIVED',
            created_at=datetime.utcnow()
        )
        db.add(log)
        order_log_pairs.append((order, log))

    # Flush to assign IDs (but don't commit yet)
    await db.flush()

    # Phase 2: Process each order
    for order, log in order_log_pairs:
        try:
            response = await erp_client.create_order(order)
            log.status = 'SUCCESS'
            log.response = response
            results['success'].append(order['orderNumber'])
        except Exception as e:
            log.status = 'FAILED'
            log.error_message = str(e)
            results['failed'].append({
                'order_number': order['orderNumber'],
                'error': str(e)
            })

    # Commit all logs (success and failure)
    await db.commit()

    return results
```

### Upsert with Dual Key Matching (RECOMMENDED)

Handle records that may exist by different keys:

```python
# services/customer_service.py
async def upsert_customer(
    db: AsyncSession,
    customer_data: dict
) -> Customer:
    """
    Upsert customer with dual-key matching strategy.
    First tries ERP ID, then falls back to email.
    """
    erp_id = customer_data.get('erp_customer_id')
    email = customer_data.get('email')

    # Try to find by ERP ID first (preferred)
    existing = None
    if erp_id:
        existing = await db.execute(
            select(Customer).where(Customer.erp_id == erp_id)
        )
        existing = existing.scalar_one_or_none()

    # Fallback: try email
    if not existing and email:
        existing = await db.execute(
            select(Customer).where(Customer.email == email)
        )
        existing = existing.scalar_one_or_none()

    if existing:
        # Update existing
        for key, value in customer_data.items():
            if hasattr(existing, key) and value is not None:
                setattr(existing, key, value)
        existing.updated_at = datetime.utcnow()
    else:
        # Create new
        existing = Customer(**customer_data)
        db.add(existing)

    await db.flush()
    return existing
```

### Error Deduplication (RECOMMENDED)

Aggregate repeated errors for cleaner logging:

```python
# services/sync_service.py
from collections import Counter

async def sync_products(products: list[dict]) -> dict:
    """Sync products with error deduplication."""
    results = {'synced': 0, 'failed': 0, 'errors': {}}
    error_counter = Counter()

    for product in products:
        try:
            await sync_single_product(product)
            results['synced'] += 1
        except Exception as e:
            results['failed'] += 1
            # Count error types instead of logging each
            error_key = f"{type(e).__name__}: {str(e)[:100]}"
            error_counter[error_key] += 1

    # Convert to error summary
    results['errors'] = dict(error_counter.most_common(10))

    # Log summary instead of individual errors
    if results['failed'] > 0:
        logger.warning(
            f"Product sync: {results['synced']} success, {results['failed']} failed. "
            f"Top errors: {results['errors']}"
        )

    return results
```

### Celery Task Patterns (REQUIRED)

Background tasks with Celery Beat:

```python
# tasks/sync_tasks.py
from celery import shared_task
from celery.schedules import crontab

@shared_task(
    bind=True,
    autoretry_for=(Exception,),
    retry_backoff=True,
    retry_kwargs={'max_retries': 3}
)
def sync_quotes_from_erp(self):
    """
    Sync quotes from ERP system.
    Runs every 15 minutes via Celery Beat.
    """
    try:
        # Use sync database session in Celery tasks
        with get_sync_session() as db:
            quotes = erp_client.get_updated_quotes(since=get_last_sync_time())

            for quote in quotes:
                upsert_quote_sync(db, quote)

            db.commit()
            update_last_sync_time()

        return {'synced': len(quotes)}
    except Exception as e:
        logger.error(f"Quote sync failed: {e}")
        raise

# celery_config.py
beat_schedule = {
    'sync-quotes-every-15-min': {
        'task': 'tasks.sync_tasks.sync_quotes_from_erp',
        'schedule': crontab(minute='*/15'),
    },
    'sync-customers-hourly': {
        'task': 'tasks.sync_tasks.sync_customers_from_erp',
        'schedule': crontab(minute=0),  # Every hour
    },
}
```

### File Structure (FastAPI)

```
app/
├── main.py                   # FastAPI app with lifespan
├── config.py                 # Settings (pydantic-settings)
├── database.py               # Async engine, session factory
│
├── models/
│   ├── database/             # SQLAlchemy models
│   │   ├── customer.py
│   │   ├── quote.py
│   │   └── order.py
│   └── schemas/              # Pydantic schemas
│       ├── customer.py
│       ├── quote.py
│       └── order.py
│
├── routers/
│   ├── customers.py          # /customers endpoints
│   ├── quotes.py             # /quotes endpoints
│   └── orders.py             # /orders endpoints
│
├── services/
│   ├── token_manager.py      # OAuth token management
│   ├── customer_service.py   # Customer business logic
│   ├── quote_service.py      # Quote business logic
│   └── erp_client.py         # External ERP integration
│
├── tasks/
│   ├── __init__.py           # Celery app
│   ├── celery_config.py      # Beat schedule
│   └── sync_tasks.py         # Background sync tasks
│
└── utils/
    ├── logging.py            # Structured logging
    └── exceptions.py         # Custom exceptions
```

---

## TypeScript Standards

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Modules/Functions | camelCase | `handleSelect`, `loadRegistry` |
| Types/Interfaces | PascalCase | `ContextAsset`, `ContextRegistry` |
| Type unions | String literals | `type Status = 'active' \| 'pending' \| 'closed'` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_BASE_URL` |
| Tool names (MCP) | kebab-case with namespace | `safari:context_select` |

### Type Enforcement

**ALWAYS use `type` over `interface`:**
```typescript
// CORRECT
type UserProfile = {
  id: string;
  name: string;
  email: string;
};

// AVOID
interface UserProfile {
  id: string;
  name: string;
  email: string;
}
```

**Use string literal unions, NEVER enums:**
```typescript
// CORRECT
type Status = 'pending' | 'active' | 'completed' | 'failed';

// AVOID
enum Status {
  Pending = 'pending',
  Active = 'active'
}
```

**NEVER use `any` without explicit approval:**
```typescript
// CORRECT - use unknown and type guards
function processData(input: unknown): ProcessedData {
  if (isValidInput(input)) {
    return transform(input);
  }
  throw new Error('Invalid input');
}

// AVOID
function processData(input: any): any {
  return input.transform();
}
```

### Zod Validation (Required for Runtime)

All external inputs must be validated with Zod schemas:

```typescript
import { z } from 'zod';

// Define schema
const UserInputSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'viewer']),
  metadata: z.record(z.string()).optional(),
});

// Infer type from schema
type UserInput = z.infer<typeof UserInputSchema>;

// Validate at boundaries
function createUser(rawInput: unknown): User {
  const input = UserInputSchema.parse(rawInput);
  // input is now type-safe
  return userService.create(input);
}
```

### Async Patterns

```typescript
// CORRECT - async/await with proper error handling
async function fetchUserData(userId: string): Promise<UserData> {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return UserDataSchema.parse(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Invalid response format', error);
    }
    throw new ApiError(`Failed to fetch user ${userId}`, error);
  }
}

// AVOID - unhandled promises, any types
function fetchUserData(userId) {
  return apiClient.get(`/users/${userId}`).then(r => r.data);
}
```

### File Structure (MCP Server)

```
src/
├── index.ts              # Entry point
├── server.ts             # MCP server setup
├── resources/            # Resource handlers
├── tools/                # Tool implementations
│   ├── select.ts
│   ├── quality.ts
│   └── lineage.ts
├── lib/                  # Utility library
│   ├── registry.ts       # Data access
│   └── paths.ts          # Path constants
└── types/                # Type definitions
    └── index.ts          # Exported types
```

---

## C# .NET Standards

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Classes | PascalCase | `AccountController`, `UserService` |
| Interfaces | I + PascalCase | `IUserService`, `ITokenService` |
| Methods | PascalCase + Async suffix | `FindByNameAsync`, `CheckPasswordAsync` |
| Private fields | _camelCase | `_userService`, `_tokenService` |
| Parameters | camelCase | `userId`, `accountName` |
| Request/Response | Name + Suffix | `UserRequest`, `UserResponse` |

### Layered Architecture

```
Controllers/          # REST endpoints, route handling
├── AccountController.cs
├── StationController.cs

Service/              # Business logic layer (interfaces + implementations)
├── Account/
│   ├── IUserService.cs
│   └── UserService.cs
├── Parts/
└── Material/

Models/               # Data models (THREE tiers)
├── DataBase/         # EF Core DbContext models
├── Request/          # API request DTOs
└── Response/         # API response DTOs

Framework/            # Infrastructure utilities
├── APIs/             # External API integration
├── Entities/         # Base classes
├── Queries/          # Query execution layer
└── Functions/        # Utilities
```

### Controller Pattern

```csharp
[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ITokenService _tokenService;

    public AccountController(IUserService userService, ITokenService tokenService)
    {
        _userService = userService;
        _tokenService = tokenService;
    }

    [HttpPost("GetTokenAsync")]
    public async Task<ActionResult<TokenResponse>> GetTokenAsync([FromBody] TokenRequest request)
    {
        try
        {
            var user = await _userService.FindByNameAsync(request.Username);
            if (user == null)
                return Unauthorized("Invalid credentials");

            var isValid = await _userService.CheckPasswordAsync(user, request.Password);
            if (!isValid)
                return Unauthorized("Invalid credentials");

            var token = await _tokenService.GenerateTokenAsync(user);
            return Ok(new TokenResponse { Token = token, ExpiresIn = 3600 });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal error: {ex.Message}");
        }
    }
}
```

### Service Pattern

```csharp
// Interface
public interface IUserService
{
    Task<User?> FindByNameAsync(string username);
    Task<bool> CheckPasswordAsync(User user, string password);
    Task<User> CreateAsync(UserRequest request);
}

// Implementation
public class UserService : IUserService
{
    private readonly ProdMesDbContext _context;
    private readonly ILogger<UserService> _logger;

    public UserService(ProdMesDbContext context, ILogger<UserService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<User?> FindByNameAsync(string username)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Username == username);
    }
}
```

### Configuration Pattern

```csharp
// Program.cs - DI Registration
var builder = WebApplication.CreateBuilder(args);

// Configuration from environment variables (takes precedence)
builder.Configuration.AddEnvironmentVariables(prefix: "Safari:");

// Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITokenService, TokenService>();

// DbContext
builder.Services.AddDbContext<ProdMesDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });
```

---

## Safari Brand UI

### Color Palette (Source: SafariTheme.js)

**Brand Colors:**
| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Safari Red | `#9B1C1C` | `--color-primary-500` | Primary brand, accents |
| Safari Red Light | `#DC2626` | `--color-primary-400` | Hover states |
| Safari Red Dark | `#7F1D1D` | `--color-primary-600` | Active states |

**Background System (Dark Theme - Elevation):**
| Level | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Base | `#0F172A` | `--color-bg-base` | Page background |
| Surface | `#1E293B` | `--color-bg-surface` | Cards, panels |
| Elevated | `#243044` | `--color-bg-elevated` | Modals, dropdowns |
| Dialog | `#2E3A54` | `--color-bg-dialog` | Dialogs, menus |

**Text Colors:**
| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Primary | `#F8FAFC` | `--color-text-primary` | Main text |
| Secondary | `#94A3B8` | `--color-text-secondary` | Supporting |
| Muted | `#64748B` | `--color-text-muted` | Disabled, hints |

**Technical Accents:**
| Color | Hex | Usage |
|-------|-----|-------|
| Blue | `#60A5FA` | Links, data, info |
| Green | `#34D399` | Success, positive |
| Pink | `#F472B6` | Highlights |
| Purple | `#A78BFA` | Special features |
| Amber | `#FBBF24` | Warnings |

### Typography

```css
/* Font Stack */
--font-primary: 'Inter', -apple-system, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;

/* Type Scale */
--text-h1: 2.25rem;  /* 36px, weight 700, line-height 1.2 */
--text-h2: 1.875rem; /* 30px, weight 700, line-height 1.25 */
--text-h3: 1.5rem;   /* 24px, weight 600, line-height 1.3 */
--text-h4: 1.25rem;  /* 20px, weight 600, line-height 1.4 */
--text-body: 1rem;   /* 16px, weight 400, line-height 1.5 */
--text-small: 0.875rem; /* 14px */
--text-caption: 0.75rem; /* 12px */
```

### Spacing System (8px Grid)

```css
--space-1: 0.5rem;   /* 8px */
--space-2: 1rem;     /* 16px */
--space-3: 1.5rem;   /* 24px */
--space-4: 2rem;     /* 32px */
--space-5: 2.5rem;   /* 40px */
--space-6: 3rem;     /* 48px */
```

### Component Patterns

**Button (Primary):**
```tsx
<button className="
  bg-primary-500 hover:bg-primary-400 active:bg-primary-600
  text-white font-medium
  px-4 py-2 rounded-md
  transition-colors duration-200
">
  Action
</button>
```

**Card:**
```tsx
<div className="
  bg-slate-800 border border-slate-700
  p-6 rounded-lg shadow-md
">
  {children}
</div>
```

**Input:**
```tsx
<input className="
  bg-slate-900 border border-slate-600
  px-4 py-2 rounded-md
  text-slate-100 placeholder-slate-500
  focus:border-primary-500 focus:ring-1 focus:ring-primary-500
  transition-colors duration-200
" />
```

**Status Badge:**
```tsx
type BadgeVariant = 'success' | 'warning' | 'error' | 'info';

const badgeStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-500/20 text-green-400 border-green-500/50',
  warning: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
  error: 'bg-red-500/20 text-red-400 border-red-500/50',
  info: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
};
```

### Assets Location

**Source of truth:** `organizational-docs/shared/branding/assets/`

| Asset | Path |
|-------|------|
| Theme JS | `theme/SafariTheme.js` |
| Color palette | `colors/safari-palette.json` |
| Logos | `logos/svg/safari-logo.svg` |
| Circuit patterns | `patterns/safari-circuit-board-pattern.svg` |

**NEVER fabricate inline SVGs.** Reference existing assets.

---

## API Design Patterns

### RESTful Conventions

| Operation | HTTP Method | Route Pattern | Response Code |
|-----------|-------------|---------------|---------------|
| List | GET | `/resources` | 200 |
| Get | GET | `/resources/{id}` | 200, 404 |
| Create | POST | `/resources` | 201, 400 |
| Update | PUT | `/resources/{id}` | 200, 404 |
| Delete | DELETE | `/resources/{id}` | 204, 404 |

### Response Format

```typescript
// Success response
type ApiResponse<T> = {
  data: T;
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
  };
};

// Error response
type ApiError = {
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
};
```

### Error Handling

```csharp
// Consistent error responses
[HttpGet("{id}")]
public async Task<ActionResult<UserResponse>> GetUser(int id)
{
    var user = await _userService.GetByIdAsync(id);

    if (user == null)
        return NotFound(new { error = new { code = "USER_NOT_FOUND", message = $"User {id} not found" }});

    return Ok(new { data = user });
}
```

---

## Code Review Checklist

Before submitting code for review, verify:

### Type Safety
- [ ] No `any` types without explicit approval
- [ ] Zod schemas for all external inputs (TypeScript)
- [ ] Pydantic models for all inputs/outputs (Python)
- [ ] String literal unions instead of enums
- [ ] `type` instead of `interface`

### Next.js Frontend (ti_quote_order_manager patterns)
- [ ] Types in `lib/api-types.ts` with proper suffixes (*Base, *Create, *Read, *Response)
- [ ] API calls via `useApiClient()` hook, not direct fetch
- [ ] CVA variants for component styling
- [ ] Manual form state (no unnecessary libraries)
- [ ] Resilient auth with silent → interactive fallback
- [ ] `@deprecated` annotations for legacy code

### FastAPI Backend (ti_backend_api patterns)
- [ ] TokenManager for external API auth (not inline token handling)
- [ ] Lifespan context manager for startup/shutdown
- [ ] `@model_validator` for computed Pydantic fields
- [ ] Transactional logging with flush pattern
- [ ] Error deduplication for batch operations
- [ ] Celery tasks with autoretry and backoff

### Safari Brand Compliance
- [ ] Uses Safari color palette from SafariTheme.js
- [ ] Dark-first design (backgrounds: #0F172A base)
- [ ] 8px spacing grid
- [ ] Inter font for UI, JetBrains Mono for code
- [ ] No inline fabricated SVGs

### Architecture
- [ ] Clear layer separation (Router → Service → Repository)
- [ ] Dependency injection for all services
- [ ] Async/await for I/O operations
- [ ] DTOs/schemas for API boundaries

### Security
- [ ] Input validation at boundaries
- [ ] No sensitive data in logs
- [ ] Proper authentication checks
- [ ] Parameterized queries (no SQL injection)
- [ ] Token refresh with lock (asyncio.Lock for Python)

### Quality
- [ ] Meaningful error messages
- [ ] Consistent naming conventions
- [ ] No dead code
- [ ] No TODO comments in production code
- [ ] Error summaries for batch operations (not individual logs)

---

## Design Tools Integration

### Recommended MCP Servers

**Figma MCP (Official):**
```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@anthropic/figma-mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "${FIGMA_ACCESS_TOKEN}"
      }
    }
  }
}
```

**Benefits:**
- Extract design tokens directly from Figma files
- Code Connect maps Figma components to code components
- Automated design system rule generation

**Material UI MCP:**
```json
{
  "mcpServers": {
    "mui": {
      "command": "npx",
      "args": ["-y", "@mui/mcp-server"]
    }
  }
}
```

### Safari Theme Export

When integrating with Figma:
1. Export `SafariTheme.js` tokens to Figma variables
2. Use Code Connect to map Safari components
3. Design tokens flow: Figma → SafariTheme.js → Components

**References:**
- [Figma MCP Guide](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- [Design Systems + AI](https://www.figma.com/blog/design-systems-ai-mcp/)
- [MCP Apps Extension](https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/)

---

## Quick Start Examples

### TypeScript MCP Tool

```typescript
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const QuerySchema = z.object({
  domain: z.string().optional(),
  type: z.enum(['enterprise-policy', 'skill', 'command', 'learning']).optional(),
  tags: z.array(z.string()).optional(),
});

type Query = z.infer<typeof QuerySchema>;

server.tool(
  'safari:context_select',
  'Query context assets by domain, type, tags, or freshness',
  QuerySchema,
  async (args: Query) => {
    const registry = await loadRegistry();
    let assets = Object.values(registry.assets);

    if (args.domain) {
      assets = assets.filter(a => a.domain === args.domain);
    }
    if (args.type) {
      assets = assets.filter(a => a.type === args.type);
    }

    return {
      content: [{ type: 'text', text: JSON.stringify(assets, null, 2) }]
    };
  }
);
```

### React Component (Safari Styled)

```tsx
import type { ReactNode } from 'react';

type CardProps = {
  title: string;
  children: ReactNode;
  variant?: 'default' | 'elevated';
};

export function Card({ title, children, variant = 'default' }: CardProps) {
  const bgClass = variant === 'elevated'
    ? 'bg-slate-700'
    : 'bg-slate-800';

  return (
    <div className={`
      ${bgClass} border border-slate-700
      rounded-lg shadow-md
      p-6 space-y-4
    `}>
      <h3 className="text-lg font-semibold text-slate-100">
        {title}
      </h3>
      <div className="text-slate-300">
        {children}
      </div>
    </div>
  );
}
```

### C# Service with DI

```csharp
public interface IPartService
{
    Task<IEnumerable<Part>> GetAllAsync();
    Task<Part?> GetByIdAsync(int id);
    Task<Part> CreateAsync(PartRequest request);
}

public class PartService : IPartService
{
    private readonly ProdMesDbContext _context;
    private readonly ILogger<PartService> _logger;

    public PartService(ProdMesDbContext context, ILogger<PartService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<IEnumerable<Part>> GetAllAsync()
    {
        return await _context.Parts
            .AsNoTracking()
            .OrderBy(p => p.Name)
            .ToListAsync();
    }

    public async Task<Part?> GetByIdAsync(int id)
    {
        return await _context.Parts
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Part> CreateAsync(PartRequest request)
    {
        var part = new Part
        {
            Name = request.Name,
            Description = request.Description,
            CreatedAt = DateTime.UtcNow
        };

        _context.Parts.Add(part);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Created part {PartId}: {PartName}", part.Id, part.Name);
        return part;
    }
}
```

---

## Additional Resources

### Reference Implementations
- **Next.js Frontend:** `C:\Users\dkmcintyre\ti_quote_order_manager` (SafariCircuitsLLC/ti_quote_order_manager)
- **FastAPI Backend:** `C:\Users\dkmcintyre\ti_backend_api` (SafariCircuitsLLC/ti_backend_api)

### Safari Branding
- **Safari Theme:** `organizational-docs/shared/branding/assets/theme/SafariTheme.js`
- **Brand Guide:** `organizational-docs/shared/branding/STD-BRAND-001-brand-guide.md`
- **Color Palette:** `organizational-docs/shared/branding/STD-BRAND-002-color-palette.md`
- **Component Styling:** `organizational-docs/shared/branding/STD-BRAND-004-component-styling.md`

### Detailed Reference Files
- **TypeScript Patterns:** `reference/typescript-patterns.md`
- **Design System Integration:** `reference/design-system-integration.md`

### Document Styling Guides
| Format | Guide | Use Case |
|--------|-------|----------|
| HTML | `reference/html-deliverable-styling.md` | Whitepapers, guides, reports |
| SVG | `reference/svg-styling.md` | Architecture diagrams, flowcharts |
| PDF | `reference/pdf-styling.md` | Print documents, exports |
| DOCX | `reference/docx-styling.md` | Word documents, templates |
| PPTX | `reference/pptx-styling.md` | Presentations, slides |
| XLSX | `reference/xlsx-styling.md` | Spreadsheets, data reports |
| JSX | `reference/jsx-styling.md` | React components, Safari apps |
