# Security Standards

Security policies and implementation guidelines.

## Contents

- [Authentication](STD-SEC-001-authentication.md)
- [Authorization](STD-SEC-002-authorization.md)
- [Data Classification](STD-SEC-003-data-classification.md)

## Security Principles

1. **Defense in Depth** - Multiple layers of security
2. **Least Privilege** - Minimal necessary access
3. **Secure by Default** - Safe defaults, explicit opt-in for risks
4. **Fail Securely** - Errors should not expose information

## Quick Reference

### Authentication

- Use SSO where available
- Enforce MFA for administrative access
- Token expiration: 1 hour (access), 7 days (refresh)
- Never store passwords in plain text

### Authorization

- Role-based access control (RBAC)
- Check permissions at API layer
- Audit sensitive operations
- Deny by default

### Data Classification

| Level | Description | Examples |
|-------|-------------|----------|
| Public | No restrictions | Marketing materials |
| Internal | Employees only | Internal docs, procedures |
| Confidential | Need-to-know | Financial data, HR records |
| Restricted | Strictly controlled | API keys, passwords |

### Secure Coding

- Validate all inputs
- Encode outputs (prevent XSS)
- Use parameterized queries (prevent SQL injection)
- Don't expose stack traces
- Log security events

### API Security

```typescript
// Always validate authentication
if (!session?.user) {
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  );
}

// Check authorization
if (!hasPermission(session.user, 'resource:action')) {
  return NextResponse.json(
    { error: 'Forbidden' },
    { status: 403 }
  );
}
```

## Incident Response

For security incidents, see [Incident Response Runbook](../../runbooks/incidents/incident-response.md).
