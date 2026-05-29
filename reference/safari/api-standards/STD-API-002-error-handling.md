---
id: STD-API-002
title: API Error Handling
domain: engineering
visualization: technical
sensitivity: internal
last_updated: 2026-02-10
---

# API Error Handling

## Purpose

This document defines error handling standards for Safari Trace APIs to ensure consistent, informative, and secure error responses.

## Error Response Format

### Standard Error Structure

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": [],
    "request_id": "req_abc123xyz"
  }
}
```

### Error Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | String | Yes | Machine-readable error code |
| `message` | String | Yes | User-friendly message |
| `details` | Array | No | Additional error details |
| `request_id` | String | Yes | Request tracking ID |
| `field` | String | No | Field causing error |
| `path` | String | No | JSON path to error |

## Error Codes

### Validation Errors (400)

| Code | Message | Use Case |
|------|---------|----------|
| `VALIDATION_ERROR` | Validation failed | General validation |
| `INVALID_FORMAT` | Invalid format | Wrong data format |
| `MISSING_FIELD` | Required field missing | Missing required field |
| `INVALID_VALUE` | Invalid value | Value out of range |
| `INVALID_TYPE` | Invalid type | Wrong data type |

### Authentication Errors (401)

| Code | Message | Use Case |
|------|---------|----------|
| `UNAUTHORIZED` | Authentication required | No auth token |
| `INVALID_TOKEN` | Invalid authentication token | Bad token |
| `TOKEN_EXPIRED` | Token has expired | Expired token |
| `INVALID_CREDENTIALS` | Invalid credentials | Wrong credentials |

### Authorization Errors (403)

| Code | Message | Use Case |
|------|---------|----------|
| `FORBIDDEN` | Access denied | No permission |
| `INSUFFICIENT_PERMISSIONS` | Insufficient permissions | Missing role |
| `RESOURCE_ACCESS_DENIED` | Access to resource denied | Specific resource |

### Not Found Errors (404)

| Code | Message | Use Case |
|------|---------|----------|
| `NOT_FOUND` | Resource not found | Generic not found |
| `USER_NOT_FOUND` | User not found | User lookup failed |
| `RECORD_NOT_FOUND` | Record not found | DB record missing |

### Conflict Errors (409)

| Code | Message | Use Case |
|------|---------|----------|
| `CONFLICT` | Resource conflict | General conflict |
| `DUPLICATE_ENTRY` | Duplicate entry | Unique constraint |
| `CONCURRENT_MODIFICATION` | Resource was modified | Optimistic lock |

### Rate Limit Errors (429)

| Code | Message | Use Case |
|------|---------|----------|
| `RATE_LIMITED` | Too many requests | Rate limit hit |
| `QUOTA_EXCEEDED` | Quota exceeded | API quota hit |

### Server Errors (500)

| Code | Message | Use Case |
|------|---------|----------|
| `INTERNAL_ERROR` | An unexpected error occurred | Unhandled exception |
| `SERVICE_UNAVAILABLE` | Service temporarily unavailable | Service down |
| `EXTERNAL_SERVICE_ERROR` | External service error | Third-party failure |

## Validation Errors

### Field Validation

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "code": "INVALID_FORMAT",
        "message": "Invalid email format"
      },
      {
        "field": "quantity",
        "code": "INVALID_VALUE",
        "message": "Quantity must be greater than 0"
      }
    ],
    "request_id": "req_abc123"
  }
}
```

### Nested Field Errors

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "path": "items[0].quantity",
        "code": "INVALID_VALUE",
        "message": "Quantity must be positive"
      },
      {
        "path": "address.postal_code",
        "code": "INVALID_FORMAT",
        "message": "Invalid postal code format"
      }
    ],
    "request_id": "req_def456"
  }
}
```

## Error Implementation

### Error Class Definition

```typescript
// lib/errors.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: ErrorDetail[]
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(details: ErrorDetail[]) {
    super(400, 'VALIDATION_ERROR', 'Validation failed', details);
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string) {
    super(404, 'NOT_FOUND', `${resource} not found`);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Authentication required') {
    super(401, 'UNAUTHORIZED', message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Access denied') {
    super(403, 'FORBIDDEN', message);
  }
}
```

### Error Handler

```typescript
// lib/error-handler.ts
import { NextResponse } from 'next/server';
import { ApiError } from './errors';

export function handleApiError(
  error: unknown,
  requestId: string
): NextResponse {
  // Log the error
  console.error(`[${requestId}] Error:`, error);

  // Handle known errors
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
          request_id: requestId,
        },
      },
      { status: error.statusCode }
    );
  }

  // Handle unknown errors (don't expose details)
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
        request_id: requestId,
      },
    },
    { status: 500 }
  );
}
```

### API Route Usage

```typescript
// app/api/v1/users/route.ts
import { handleApiError } from '@/lib/error-handler';
import { ValidationError, NotFoundError } from '@/lib/errors';
import { nanoid } from 'nanoid';

export async function POST(request: Request) {
  const requestId = `req_${nanoid(10)}`;

  try {
    const body = await request.json();

    // Validate input
    const errors = validateUser(body);
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    // Create user
    const user = await createUser(body);

    return NextResponse.json({
      success: true,
      data: user,
    }, { status: 201 });

  } catch (error) {
    return handleApiError(error, requestId);
  }
}
```

## Security Considerations

### Information Disclosure

| Do | Don't |
|----|-------|
| Return generic messages for auth errors | Reveal which field failed (user vs password) |
| Log detailed errors server-side | Expose stack traces to clients |
| Use error codes for debugging | Include internal system names |
| Sanitize error messages | Leak database column names |

### Secure Error Examples

```json
// Bad - reveals too much
{
  "error": {
    "message": "User 'john@example.com' not found in users table"
  }
}

// Good - generic message
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

## Error Logging

### Log Levels

| Level | Use Case | Example |
|-------|----------|---------|
| ERROR | Unexpected errors | Unhandled exceptions |
| WARN | Expected failures | Validation errors |
| INFO | Business events | User login failed |
| DEBUG | Development info | Request details |

### Log Format

```typescript
// Structured logging
logger.error('API Error', {
  request_id: requestId,
  error_code: error.code,
  error_message: error.message,
  status_code: error.statusCode,
  user_id: session?.user?.id,
  path: request.url,
  method: request.method,
  duration_ms: Date.now() - startTime,
});
```

## Client Error Handling

### TypeScript Client

```typescript
// lib/api-client.ts
export async function apiRequest<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!data.success) {
    throw new ApiClientError(
      data.error.code,
      data.error.message,
      data.error.details,
      response.status
    );
  }

  return data.data;
}
```

### React Error Display

```tsx
function ErrorMessage({ error }: { error: ApiClientError }) {
  if (error.code === 'VALIDATION_ERROR' && error.details) {
    return (
      <ul className="error-list">
        {error.details.map((detail, i) => (
          <li key={i}>{detail.field}: {detail.message}</li>
        ))}
      </ul>
    );
  }

  return <p className="error-message">{error.message}</p>;
}
```

## Related Documentation

- [REST Conventions](STD-API-001-rest-conventions.md)
- [Versioning](STD-API-003-versioning.md)
- [Authentication](../security/STD-SEC-001-authentication.md)

---

*Standard Owner: Engineering*
