---
id: STD-SEC-001
title: Authentication Standards
domain: security
visualization: governance
sensitivity: internal
last_updated: 2026-02-10
---

# Authentication Standards

## Purpose

This document defines authentication standards for Safari Trace applications, ensuring secure and consistent user identity verification across all systems.

## Authentication Methods

### Primary: Azure AD SSO

Safari Trace uses Azure Active Directory (Azure AD) as the primary identity provider.

| Property | Value |
|----------|-------|
| Provider | Microsoft Azure AD |
| Protocol | OpenID Connect (OIDC) |
| Grant Type | Authorization Code with PKCE |
| Token Type | JWT |

### Authentication Flow

```
┌──────────┐     ┌──────────────┐     ┌──────────┐
│  User    │     │ Safari Trace │     │ Azure AD │
└────┬─────┘     └──────┬───────┘     └────┬─────┘
     │                  │                   │
     │ 1. Access app    │                   │
     │─────────────────▶│                   │
     │                  │                   │
     │ 2. Redirect to Azure AD              │
     │◀─────────────────│                   │
     │                  │                   │
     │ 3. Login at Azure AD                 │
     │─────────────────────────────────────▶│
     │                  │                   │
     │ 4. Auth code     │                   │
     │◀─────────────────────────────────────│
     │                  │                   │
     │ 5. Send auth code│                   │
     │─────────────────▶│                   │
     │                  │                   │
     │                  │ 6. Exchange code  │
     │                  │  for tokens       │
     │                  │──────────────────▶│
     │                  │                   │
     │                  │ 7. ID + Access    │
     │                  │    tokens         │
     │                  │◀──────────────────│
     │                  │                   │
     │ 8. Session       │                   │
     │    created       │                   │
     │◀─────────────────│                   │
     │                  │                   │
```

## Token Management

### Token Types

| Token | Purpose | Lifetime | Storage |
|-------|---------|----------|---------|
| ID Token | User identity | 1 hour | Server session |
| Access Token | API access | 1 hour | Server session |
| Refresh Token | Token renewal | 7 days | Server session (encrypted) |

### Token Claims

```json
{
  "sub": "user-uuid",
  "name": "John Doe",
  "email": "john.doe@safaricircuits.com",
  "roles": ["operator", "quality"],
  "groups": ["manufacturing", "shift-1"],
  "aud": "safari-trace-app-id",
  "iss": "https://login.microsoftonline.com/tenant-id",
  "iat": 1705590000,
  "exp": 1705593600
}
```

## Session Management

### Session Configuration

| Setting | Value | Rationale |
|---------|-------|-----------|
| Session Duration | 8 hours | Matches typical shift length |
| Idle Timeout | 30 minutes | Security for shared workstations |
| Secure Cookie | Yes | HTTPS only |
| HttpOnly | Yes | Prevent XSS access |
| SameSite | Strict | CSRF protection |

### Session Storage

```typescript
// Session configuration (NextAuth.js)
export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours
  },
  jwt: {
    maxAge: 8 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: '__Secure-next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: true,
      },
    },
  },
};
```

## Implementation

### NextAuth.js Configuration

```typescript
// auth.config.ts
import AzureADProvider from 'next-auth/providers/azure-ad';

export const authOptions: AuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          scope: 'openid email profile User.Read',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }

      // Include user roles from Azure AD groups
      if (profile?.roles) {
        token.roles = profile.roles;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.roles = token.roles;
      return session;
    },
  },
};
```

### Protected Route Middleware

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Additional middleware logic
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
  ],
};
```

### API Route Protection

```typescript
// app/api/v1/work-orders/route.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth.config';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
      { status: 401 }
    );
  }

  // Process authenticated request
  const workOrders = await getWorkOrders(session.user);
  return NextResponse.json({ success: true, data: workOrders });
}
```

## Multi-Factor Authentication

### MFA Requirements

| User Type | MFA Required | Method |
|-----------|--------------|--------|
| Administrators | Always | Authenticator app |
| Remote users | Always | Authenticator app |
| On-site users | Conditional | Risk-based |

### Conditional Access Policies

```yaml
Policies:
  - name: Require MFA for admins
    conditions:
      users: Admin role
    controls:
      grant: Require MFA

  - name: Require MFA outside network
    conditions:
      locations: Not corporate network
    controls:
      grant: Require MFA

  - name: Block legacy authentication
    conditions:
      client_apps: Legacy
    controls:
      access: Block
```

## Service Accounts

### Service Authentication

For service-to-service authentication, use client credentials flow:

```typescript
// Service authentication
async function getServiceToken(): Promise<string> {
  const response = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.SERVICE_CLIENT_ID!,
        client_secret: process.env.SERVICE_CLIENT_SECRET!,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }),
    }
  );

  const data = await response.json();
  return data.access_token;
}
```

### API Key Authentication

For internal services and integrations:

| Aspect | Requirement |
|--------|-------------|
| Format | 32-character random string |
| Storage | Encrypted at rest |
| Rotation | Every 90 days |
| Scope | Limited to specific APIs |

## Security Best Practices

### Credential Storage

| Item | Storage | Encryption |
|------|---------|------------|
| Client secrets | Azure Key Vault | Yes |
| API keys | Azure Key Vault | Yes |
| Refresh tokens | Database | AES-256 |
| Session data | Redis | TLS in transit |

### Security Headers

```typescript
// Security headers middleware
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
};
```

### Audit Logging

```typescript
// Log authentication events
await auditLog.create({
  event: 'user.login',
  userId: session.user.id,
  ipAddress: request.ip,
  userAgent: request.headers.get('user-agent'),
  timestamp: new Date(),
  success: true,
});
```

## Error Handling

### Authentication Errors

| Error | Status | User Message |
|-------|--------|--------------|
| No token | 401 | "Please sign in to continue" |
| Expired token | 401 | "Your session has expired" |
| Invalid token | 401 | "Authentication failed" |
| MFA required | 401 | "Additional verification required" |

### Secure Error Responses

```typescript
// Never reveal specific auth failure reasons
if (!user || !validPassword) {
  // Don't say which one failed
  return { error: 'Invalid credentials' };
}
```

## Logout

### Logout Flow

```typescript
// Proper logout implementation
async function logout() {
  // 1. Clear local session
  await signOut({ redirect: false });

  // 2. Revoke refresh token
  await revokeToken(session.refreshToken);

  // 3. Clear any cached data
  queryClient.clear();

  // 4. Redirect to Azure AD logout
  window.location.href =
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/logout?` +
    `post_logout_redirect_uri=${encodeURIComponent(logoutRedirectUri)}`;
}
```

## Related Documentation

- [Authorization](STD-SEC-002-authorization.md)
- [Data Classification](STD-SEC-003-data-classification.md)
- [API Security](../api-standards/STD-API-001-rest-conventions.md)

---

*Standard Owner: IT Security*
