---
id: STD-API-003
title: API Versioning
domain: engineering
visualization: technical
sensitivity: internal
last_updated: 2026-02-10
---

# API Versioning

## Purpose

This document defines API versioning standards for Safari Trace to manage API evolution while maintaining backward compatibility and providing clear migration paths.

## Versioning Strategy

### URL Path Versioning

Safari Trace uses URL path versioning as the primary method:

```
/api/v1/users
/api/v2/users
```

### Version Format

| Format | Example | Description |
|--------|---------|-------------|
| Major only | `v1`, `v2` | Recommended for most APIs |
| Major.minor | `v1.1`, `v2.0` | For fine-grained control |

### Current Versions

| Version | Status | Support Until |
|---------|--------|---------------|
| v1 | Active | Ongoing |
| v2 | Beta | N/A |

## Versioning Rules

### When to Create New Version

| Change Type | New Version | Example |
|-------------|-------------|---------|
| Breaking change | Yes | Removing field |
| New endpoint | No | Adding `/api/v1/reports` |
| New optional field | No | Adding `metadata` field |
| New required field | Yes | Requiring `tenant_id` |
| Rename field | Yes | `userName` → `user_name` |
| Change field type | Yes | `id: number` → `id: string` |
| Remove endpoint | Yes | Removing `/users/legacy` |
| Change behavior | Yes | Different validation rules |

### Non-Breaking Changes

These changes can be made without version increment:

```yaml
Allowed without new version:
  - Add new endpoint
  - Add optional request field
  - Add response field
  - Add new enum value
  - Relax validation (wider input accepted)
  - Add new query parameter
  - Performance improvements
```

### Breaking Changes

These require a new major version:

```yaml
Requires new version:
  - Remove endpoint
  - Remove response field
  - Remove request field
  - Change field type
  - Rename field
  - Change error codes
  - Add required field
  - Stricter validation
  - Change resource identifiers
```

## Version Lifecycle

### Version States

```
┌─────────┐     ┌─────────┐     ┌────────────┐     ┌─────────┐
│  Beta   │ ──▶ │ Active  │ ──▶ │ Deprecated │ ──▶ │ Retired │
└─────────┘     └─────────┘     └────────────┘     └─────────┘
```

| State | Description | Support |
|-------|-------------|---------|
| Beta | Preview version | Limited |
| Active | Production ready | Full |
| Deprecated | Superseded | Maintenance |
| Retired | No longer available | None |

### Deprecation Timeline

| Phase | Duration | Actions |
|-------|----------|---------|
| Announcement | Day 0 | Notify users, document |
| Deprecation | 6 months | Add warnings, migration guide |
| Sunset | 3 months | Reduced support |
| Retirement | End | Remove version |

## Implementation

### Route Structure

```
app/
├── api/
│   ├── v1/
│   │   ├── users/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── work-orders/
│   │       └── route.ts
│   └── v2/
│       ├── users/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       └── work-orders/
│           └── route.ts
```

### Version Middleware

```typescript
// middleware/version.ts
import { NextResponse } from 'next/server';

export function versionMiddleware(request: Request) {
  const url = new URL(request.url);
  const version = url.pathname.split('/')[2]; // /api/v1/...

  // Validate version
  const supportedVersions = ['v1', 'v2'];
  if (!supportedVersions.includes(version)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNSUPPORTED_VERSION',
          message: `API version '${version}' is not supported`,
          supported_versions: supportedVersions,
        },
      },
      { status: 400 }
    );
  }

  // Add deprecation warning for old versions
  const response = NextResponse.next();
  if (version === 'v1') {
    response.headers.set('Deprecation', 'true');
    response.headers.set('Sunset', 'Sat, 01 Jul 2026 00:00:00 GMT');
    response.headers.set(
      'Link',
      '</api/v2>; rel="successor-version"'
    );
  }

  return response;
}
```

### Deprecation Headers

| Header | Value | Description |
|--------|-------|-------------|
| `Deprecation` | `true` | Version is deprecated |
| `Sunset` | ISO 8601 date | When version will be removed |
| `Link` | URL with rel | Link to successor version |

```http
HTTP/1.1 200 OK
Deprecation: true
Sunset: Sat, 01 Jul 2026 00:00:00 GMT
Link: </api/v2/users>; rel="successor-version"
```

## Migration Guide

### Client Migration Pattern

```typescript
// api-client.ts
const API_VERSION = process.env.API_VERSION || 'v1';

export function getApiUrl(endpoint: string): string {
  return `/api/${API_VERSION}${endpoint}`;
}

// Usage
const users = await fetch(getApiUrl('/users'));
```

### Gradual Migration

```typescript
// Support both versions during transition
export async function getUser(id: string) {
  try {
    // Try v2 first
    return await fetchV2User(id);
  } catch (error) {
    if (error.code === 'UNSUPPORTED_VERSION') {
      // Fall back to v1
      return await fetchV1User(id);
    }
    throw error;
  }
}
```

### Version Adapter

```typescript
// adapters/user-adapter.ts

// Transform v1 response to v2 format
export function adaptV1UserToV2(v1User: V1User): V2User {
  return {
    id: v1User.id,
    name: v1User.full_name, // renamed field
    email: v1User.email,
    created_at: v1User.created, // renamed field
    metadata: {}, // new field with default
  };
}
```

## Documentation

### Version Documentation

Each version should have:

```markdown
## API v2 Changes

### Breaking Changes
- `full_name` renamed to `name`
- `created` renamed to `created_at`

### New Features
- Added `metadata` field to all resources
- Added `/api/v2/reports` endpoint

### Migration Guide
1. Update field references
2. Handle new metadata field
3. Update API base URL

### Deprecation Notice
v1 deprecated on 2026-01-01
v1 sunset on 2026-07-01
```

### Changelog

```markdown
## [v2.0.0] - 2026-01-18

### Breaking Changes
- Renamed `full_name` to `name` across all user endpoints
- Changed user ID format from integer to prefixed string

### Added
- Metadata support for all resources
- Bulk operations endpoint `/api/v2/bulk`

### Deprecated
- v1 API (sunset: 2026-07-01)
```

## API Discovery

### Version Endpoint

```
GET /api
```

Response:
```json
{
  "versions": [
    {
      "version": "v1",
      "status": "deprecated",
      "sunset": "2026-07-01",
      "base_url": "/api/v1"
    },
    {
      "version": "v2",
      "status": "active",
      "base_url": "/api/v2"
    }
  ],
  "current_version": "v2",
  "documentation": "/docs/api"
}
```

## Testing

### Version Testing Strategy

```typescript
// Test both versions during migration
describe('User API', () => {
  const versions = ['v1', 'v2'];

  versions.forEach((version) => {
    describe(`${version}`, () => {
      it('should list users', async () => {
        const response = await fetch(`/api/${version}/users`);
        expect(response.ok).toBe(true);
      });
    });
  });
});
```

## Related Documentation

- [REST Conventions](STD-API-001-rest-conventions.md)
- [Error Handling](STD-API-002-error-handling.md)
- [Authentication](../security/STD-SEC-001-authentication.md)

---

*Standard Owner: Engineering*
