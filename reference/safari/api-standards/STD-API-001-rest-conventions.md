---
id: STD-API-001
title: REST API Conventions
domain: engineering
visualization: technical
sensitivity: internal
last_updated: 2026-02-10
---

# REST API Conventions

## Purpose

This document defines REST API design conventions for Safari Trace to ensure consistency, predictability, and ease of use across all API endpoints.

## Resource Naming

### URL Structure

```
/api/{version}/{resource}/{id}/{sub-resource}/{sub-id}
```

### Naming Rules

| Rule | Example | Description |
|------|---------|-------------|
| Use plural nouns | `/api/v1/users` | Resources are collections |
| Use kebab-case | `/api/v1/work-orders` | Multi-word resources |
| Use lowercase | `/api/v1/artifacts` | Consistent casing |
| Avoid verbs | `/api/v1/users` not `/api/v1/getUsers` | HTTP methods indicate action |
| Nest relationships | `/api/v1/users/{id}/orders` | Related resources |

### Resource Examples

| Resource | Endpoint | Description |
|----------|----------|-------------|
| Users | `/api/v1/users` | User accounts |
| Work Orders | `/api/v1/work-orders` | Production orders |
| Artifacts | `/api/v1/artifacts` | Traceability artifacts |
| Inspections | `/api/v1/inspections` | Quality inspections |

## HTTP Methods

### Method Usage

| Method | Purpose | Idempotent | Safe | Request Body |
|--------|---------|------------|------|--------------|
| GET | Retrieve | Yes | Yes | No |
| POST | Create | No | No | Yes |
| PUT | Replace | Yes | No | Yes |
| PATCH | Update | No | No | Yes |
| DELETE | Remove | Yes | No | No |

### Method Mapping

```
GET    /api/v1/users          → List users
GET    /api/v1/users/{id}     → Get specific user
POST   /api/v1/users          → Create user
PUT    /api/v1/users/{id}     → Replace user
PATCH  /api/v1/users/{id}     → Update user fields
DELETE /api/v1/users/{id}     → Delete user
```

## Query Parameters

### Pagination

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | Integer | 1 | Page number (1-based) |
| `limit` | Integer | 20 | Items per page (max 100) |
| `offset` | Integer | 0 | Alternative to page |

```
GET /api/v1/users?page=2&limit=50
GET /api/v1/users?offset=50&limit=50
```

### Sorting

| Parameter | Format | Description |
|-----------|--------|-------------|
| `sort` | field:direction | Sort by field |
| `direction` | asc, desc | Sort direction |

```
GET /api/v1/users?sort=created_at:desc
GET /api/v1/work-orders?sort=due_date:asc,priority:desc
```

### Filtering

| Pattern | Example | Description |
|---------|---------|-------------|
| Equality | `status=active` | Exact match |
| Multiple | `status=active,pending` | OR condition |
| Range | `created_after=2026-01-01` | Date/number range |
| Search | `q=search term` | Full-text search |

```
GET /api/v1/work-orders?status=active&line_id=LINE-001
GET /api/v1/artifacts?created_after=2026-01-01&created_before=2026-01-31
```

### Field Selection

```
GET /api/v1/users?fields=id,name,email
GET /api/v1/work-orders?include=line,operations
```

## Request Format

### Headers

| Header | Value | Required |
|--------|-------|----------|
| `Content-Type` | `application/json` | For POST/PUT/PATCH |
| `Accept` | `application/json` | Recommended |
| `Authorization` | `Bearer {token}` | For authenticated endpoints |

### Request Body

```json
{
  "name": "John Doe",
  "email": "john.doe@safaricircuits.com",
  "role": "operator"
}
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "usr_123",
    "name": "John Doe",
    "email": "john.doe@safaricircuits.com",
    "created_at": "2026-01-18T10:00:00Z"
  }
}
```

### List Response

```json
{
  "success": true,
  "data": [
    { "id": "usr_123", "name": "John Doe" },
    { "id": "usr_124", "name": "Jane Smith" }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

### Empty Response

```json
{
  "success": true,
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 0,
    "total_pages": 0
  }
}
```

## Status Codes

### Success Codes

| Code | Name | Use Case |
|------|------|----------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |

### Client Error Codes

| Code | Name | Use Case |
|------|------|----------|
| 400 | Bad Request | Invalid request format |
| 401 | Unauthorized | Missing/invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource state conflict |
| 422 | Unprocessable Entity | Validation failed |
| 429 | Too Many Requests | Rate limit exceeded |

### Server Error Codes

| Code | Name | Use Case |
|------|------|----------|
| 500 | Internal Server Error | Unexpected server error |
| 502 | Bad Gateway | Upstream service error |
| 503 | Service Unavailable | Service temporarily down |
| 504 | Gateway Timeout | Upstream timeout |

## Resource Identifiers

### ID Formats

| Type | Format | Example |
|------|--------|---------|
| UUID | Standard UUID v4 | `550e8400-e29b-41d4-a716-446655440000` |
| Prefixed | `{prefix}_{id}` | `usr_abc123`, `wo_xyz789` |
| Sequential | Integer | `1`, `2`, `3` |

### Recommended Prefixes

| Resource | Prefix |
|----------|--------|
| User | `usr_` |
| Work Order | `wo_` |
| Artifact | `art_` |
| Inspection | `insp_` |
| Line | `line_` |

## Dates and Times

### Format

All dates and times use ISO 8601 format in UTC:

```json
{
  "created_at": "2026-01-18T10:30:00Z",
  "due_date": "2026-01-25",
  "shift_start": "06:00:00"
}
```

### Field Naming

| Convention | Example | Description |
|------------|---------|-------------|
| `*_at` | `created_at` | Timestamp |
| `*_date` | `due_date` | Date only |
| `*_time` | `shift_start` | Time only |

## API Implementation Example

```typescript
// GET /api/v1/work-orders
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Parse query parameters
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
  const status = searchParams.get('status');
  const sort = searchParams.get('sort') || 'created_at:desc';

  // Build query
  const where = status ? { status } : {};
  const [field, direction] = sort.split(':');

  // Execute query
  const [data, total] = await Promise.all([
    db.workOrder.findMany({
      where,
      orderBy: { [field]: direction },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.workOrder.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data,
    meta: {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit),
    },
  });
}
```

## Related Documentation

- [Error Handling](STD-API-002-error-handling.md)
- [Versioning](STD-API-003-versioning.md)
- [Authentication](../security/STD-SEC-001-authentication.md)

---

*Standard Owner: Engineering*
