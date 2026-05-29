# API Standards

Standards for API design and implementation in Safari Trace.

## Contents

- [REST Conventions](rest-conventions.md)
- [Error Handling](error-handling.md)
- [Versioning](versioning.md)

## Quick Reference

### HTTP Methods

| Method | Use Case | Idempotent |
|--------|----------|------------|
| GET | Retrieve resource(s) | Yes |
| POST | Create resource | No |
| PUT | Replace resource | Yes |
| PATCH | Partial update | No |
| DELETE | Remove resource | Yes |

### Status Codes

| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid auth |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected error |

### Response Format

```json
{
  "success": true,
  "data": { },
  "meta": {
    "page": 1,
    "total": 100
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

## Naming Conventions

- Use plural nouns for resources: `/api/users`, `/api/artifacts`
- Use kebab-case for multi-word resources: `/api/work-orders`
- Nest related resources: `/api/users/{id}/orders`
