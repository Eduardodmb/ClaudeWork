# Safari TypeScript Patterns

Detailed patterns for TypeScript development at Safari Circuits.

## Module Organization

### File Naming
- Use kebab-case for files: `user-service.ts`, `context-registry.ts`
- Use `.ts` for TypeScript files, `.tsx` for React components
- Index files export public API: `index.ts`

### Import Order
```typescript
// 1. Node built-ins
import { readFile } from 'fs/promises';
import path from 'path';

// 2. External packages
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

// 3. Internal absolute imports
import { loadRegistry } from '@/lib/registry';
import type { ContextAsset } from '@/types';

// 4. Relative imports
import { validateInput } from './utils';
```

## Type Patterns

### Discriminated Unions
```typescript
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

function processResult<T>(result: Result<T>): T {
  if (result.success) {
    return result.data;
  }
  throw result.error;
}
```

### Branded Types
```typescript
type UserId = string & { readonly brand: unique symbol };
type OrderId = string & { readonly brand: unique symbol };

function createUserId(id: string): UserId {
  return id as UserId;
}

// Prevents mixing IDs
function getUser(id: UserId): User { /* ... */ }
function getOrder(id: OrderId): Order { /* ... */ }
```

### Utility Types
```typescript
// Pick specific fields
type UserSummary = Pick<User, 'id' | 'name' | 'email'>;

// Omit sensitive fields
type PublicUser = Omit<User, 'password' | 'apiKey'>;

// Make all fields optional for updates
type UserUpdate = Partial<User>;

// Make all fields required
type RequiredConfig = Required<Config>;

// Record for key-value maps
type FeatureFlags = Record<string, boolean>;
```

## Zod Schema Patterns

### Basic Schemas
```typescript
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'viewer']),
  createdAt: z.coerce.date(),
  metadata: z.record(z.string()).optional(),
});

type User = z.infer<typeof UserSchema>;
```

### Refinements
```typescript
const PasswordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain uppercase letter')
  .regex(/[a-z]/, 'Password must contain lowercase letter')
  .regex(/[0-9]/, 'Password must contain number');

const DateRangeSchema = z.object({
  start: z.coerce.date(),
  end: z.coerce.date(),
}).refine(
  (data) => data.end > data.start,
  { message: 'End date must be after start date' }
);
```

### Transforms
```typescript
const StringToNumberSchema = z.string().transform((val) => parseInt(val, 10));

const TrimmedStringSchema = z.string().transform((val) => val.trim());

const SlugSchema = z.string().transform((val) =>
  val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
);
```

## Error Handling

### Custom Error Classes
```typescript
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, string[]>) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(`${resource} not found: ${id}`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}
```

### Error Handling Pattern
```typescript
async function handleRequest<T>(
  fn: () => Promise<T>
): Promise<Result<T, AppError>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    if (error instanceof AppError) {
      return { success: false, error };
    }
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: new ValidationError('Invalid input', formatZodErrors(error))
      };
    }
    return {
      success: false,
      error: new AppError('Internal error', 'INTERNAL_ERROR', 500)
    };
  }
}
```

## Async Patterns

### Parallel Execution
```typescript
// Run in parallel when independent
const [users, orders, products] = await Promise.all([
  userService.getAll(),
  orderService.getAll(),
  productService.getAll(),
]);

// With error handling
const results = await Promise.allSettled([
  fetchUser(id),
  fetchOrders(id),
  fetchPreferences(id),
]);

const [userResult, ordersResult, prefsResult] = results;
```

### Sequential with Early Exit
```typescript
async function validateAndProcess(input: unknown): Promise<Result> {
  // Step 1: Validate
  const validation = InputSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }

  // Step 2: Check permissions
  const hasPermission = await checkPermission(validation.data.userId);
  if (!hasPermission) {
    return { success: false, error: new UnauthorizedError() };
  }

  // Step 3: Process
  const result = await processData(validation.data);
  return { success: true, data: result };
}
```

### Retry Pattern
```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  options: { maxAttempts: number; delayMs: number }
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < options.maxAttempts) {
        await sleep(options.delayMs * attempt); // Exponential backoff
      }
    }
  }

  throw lastError;
}
```

## React Patterns (Safari UI)

### Component Structure
```tsx
// types at top
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
  onClick?: () => void;
};

// constants
const variantStyles = {
  primary: 'bg-primary-500 hover:bg-primary-400 text-white',
  secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-100',
  ghost: 'bg-transparent hover:bg-slate-800 text-slate-300',
} as const;

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
} as const;

// component
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        rounded-md font-medium
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
```

### Custom Hooks
```typescript
function useAsync<T>(asyncFn: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: Error | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    setState(s => ({ ...s, loading: true }));

    asyncFn()
      .then(data => {
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch(error => {
        if (!cancelled) {
          setState({ data: null, loading: false, error });
        }
      });

    return () => {
      cancelled = true;
    };
  }, deps);

  return state;
}
```

## Testing Patterns

### Unit Test Structure
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('UserService', () => {
  let service: UserService;
  let mockDb: MockDatabase;

  beforeEach(() => {
    mockDb = createMockDatabase();
    service = new UserService(mockDb);
  });

  describe('getById', () => {
    it('returns user when found', async () => {
      const user = { id: '1', name: 'Test User' };
      mockDb.users.findOne.mockResolvedValue(user);

      const result = await service.getById('1');

      expect(result).toEqual(user);
      expect(mockDb.users.findOne).toHaveBeenCalledWith({ id: '1' });
    });

    it('returns null when not found', async () => {
      mockDb.users.findOne.mockResolvedValue(null);

      const result = await service.getById('nonexistent');

      expect(result).toBeNull();
    });
  });
});
```

### Integration Test Pattern
```typescript
describe('API Integration', () => {
  let app: Express;
  let db: TestDatabase;

  beforeAll(async () => {
    db = await createTestDatabase();
    app = createApp({ database: db });
  });

  afterAll(async () => {
    await db.close();
  });

  beforeEach(async () => {
    await db.reset();
  });

  it('creates and retrieves user', async () => {
    // Create
    const createResponse = await request(app)
      .post('/users')
      .send({ name: 'Test', email: 'test@example.com' })
      .expect(201);

    const userId = createResponse.body.data.id;

    // Retrieve
    const getResponse = await request(app)
      .get(`/users/${userId}`)
      .expect(200);

    expect(getResponse.body.data.name).toBe('Test');
  });
});
```
