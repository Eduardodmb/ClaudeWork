---
id: STD-SEC-002
title: Authorization Standards
domain: security
visualization: governance
sensitivity: internal
last_updated: 2026-02-10
---

# Authorization Standards

## Purpose

This document defines authorization standards for Safari Trace applications, ensuring consistent and secure access control based on user roles and permissions.

## Authorization Model

### Role-Based Access Control (RBAC)

Safari Trace uses a hierarchical RBAC model with:

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTHORIZATION MODEL                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User ─────▶ Roles ─────▶ Permissions ─────▶ Resources      │
│                                                             │
│  John Doe    Operator     wo:read           Work Orders     │
│              Quality      wo:update         Inspections     │
│                          insp:create        Reports         │
│                          insp:read                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Components

| Component | Description |
|-----------|-------------|
| User | Individual with system access |
| Role | Collection of permissions |
| Permission | Specific action on resource |
| Resource | Protected entity/endpoint |

## Role Hierarchy

### System Roles

```
┌─────────────────────────────────────────────────────────────┐
│                      ROLE HIERARCHY                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                      Administrator                          │
│                           │                                 │
│              ┌────────────┼────────────┐                    │
│              ▼            ▼            ▼                    │
│         Manager      Supervisor     Analyst                 │
│              │            │            │                    │
│              └────────────┼────────────┘                    │
│                           ▼                                 │
│                       Operator                              │
│                           │                                 │
│                           ▼                                 │
│                        Viewer                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Role Definitions

| Role | Description | Access Level |
|------|-------------|--------------|
| Administrator | Full system access | All resources, all actions |
| Manager | Department management | Team resources, reports |
| Supervisor | Shift oversight | Production operations |
| Analyst | Data analysis | Read access, reporting |
| Operator | Production tasks | Assigned operations |
| Viewer | Read-only access | View dashboards only |

## Permissions

### Permission Format

```
{resource}:{action}

Examples:
- work-orders:read
- work-orders:create
- work-orders:update
- work-orders:delete
- inspections:approve
```

### Standard Actions

| Action | Description |
|--------|-------------|
| `read` | View resource |
| `create` | Create new resource |
| `update` | Modify existing resource |
| `delete` | Remove resource |
| `approve` | Approve/sign-off |
| `export` | Export data |
| `admin` | Administrative functions |

### Permission Matrix

| Resource | Viewer | Operator | Supervisor | Manager | Admin |
|----------|--------|----------|------------|---------|-------|
| Dashboard | read | read | read | read | * |
| Work Orders | read | read,update | read,update,create | * | * |
| Inspections | read | read,create | read,create,approve | * | * |
| Reports | read | read | read,export | * | * |
| Users | - | - | read | read,create | * |
| Settings | - | - | - | read | * |

`*` = All permissions

## Implementation

### Permission Check Function

```typescript
// lib/auth/permissions.ts
export type Permission =
  | 'work-orders:read'
  | 'work-orders:create'
  | 'work-orders:update'
  | 'work-orders:delete'
  | 'inspections:read'
  | 'inspections:create'
  | 'inspections:approve'
  | 'reports:read'
  | 'reports:export'
  | 'users:read'
  | 'users:create'
  | 'users:update'
  | 'settings:read'
  | 'settings:update';

const rolePermissions: Record<string, Permission[]> = {
  admin: ['*'], // All permissions
  manager: [
    'work-orders:read', 'work-orders:create', 'work-orders:update', 'work-orders:delete',
    'inspections:read', 'inspections:create', 'inspections:approve',
    'reports:read', 'reports:export',
    'users:read', 'users:create',
  ],
  supervisor: [
    'work-orders:read', 'work-orders:create', 'work-orders:update',
    'inspections:read', 'inspections:create', 'inspections:approve',
    'reports:read', 'reports:export',
  ],
  operator: [
    'work-orders:read', 'work-orders:update',
    'inspections:read', 'inspections:create',
    'reports:read',
  ],
  viewer: [
    'work-orders:read',
    'inspections:read',
    'reports:read',
  ],
};

export function hasPermission(
  user: { roles: string[] },
  permission: Permission
): boolean {
  for (const role of user.roles) {
    const permissions = rolePermissions[role] || [];
    if (permissions.includes('*') || permissions.includes(permission)) {
      return true;
    }
  }
  return false;
}
```

### API Route Protection

```typescript
// app/api/v1/work-orders/route.ts
import { getServerSession } from 'next-auth';
import { hasPermission } from '@/lib/auth/permissions';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
      { status: 401 }
    );
  }

  if (!hasPermission(session.user, 'work-orders:create')) {
    return NextResponse.json(
      { error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } },
      { status: 403 }
    );
  }

  // Process authorized request
  const workOrder = await createWorkOrder(request.body);
  return NextResponse.json({ success: true, data: workOrder }, { status: 201 });
}
```

### Component-Level Authorization

```tsx
// components/AuthorizedAction.tsx
import { useSession } from 'next-auth/react';
import { hasPermission, Permission } from '@/lib/auth/permissions';

interface AuthorizedActionProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthorizedAction({
  permission,
  children,
  fallback = null,
}: AuthorizedActionProps) {
  const { data: session } = useSession();

  if (!session || !hasPermission(session.user, permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Usage
<AuthorizedAction permission="work-orders:create">
  <Button onClick={createWorkOrder}>Create Work Order</Button>
</AuthorizedAction>
```

## Resource-Level Authorization

### Ownership-Based Access

```typescript
// Check if user owns resource or is supervisor
export async function canAccessWorkOrder(
  user: User,
  workOrderId: string
): Promise<boolean> {
  // Admins and managers can access all
  if (user.roles.includes('admin') || user.roles.includes('manager')) {
    return true;
  }

  const workOrder = await db.workOrder.findUnique({
    where: { id: workOrderId },
    include: { line: true },
  });

  if (!workOrder) return false;

  // Supervisors can access their lines
  if (user.roles.includes('supervisor')) {
    return user.supervisedLines.includes(workOrder.line.id);
  }

  // Operators can access assigned work orders
  if (user.roles.includes('operator')) {
    return workOrder.assignedOperators.includes(user.id);
  }

  return false;
}
```

### Team-Based Access

```typescript
// Restrict access to team resources
export function canAccessTeamResource(
  user: User,
  resourceTeamId: string
): boolean {
  // Admins can access all
  if (user.roles.includes('admin')) return true;

  // Check team membership
  return user.teamIds.includes(resourceTeamId);
}
```

## Authorization Patterns

### Deny by Default

```typescript
// Always start with denial, explicitly grant access
export async function authorize(
  user: User,
  action: string,
  resource: Resource
): Promise<AuthResult> {
  // Default deny
  let allowed = false;
  let reason = 'Access denied by default';

  // Check explicit permissions
  if (hasPermission(user, `${resource.type}:${action}`)) {
    allowed = true;
    reason = 'Permission granted by role';
  }

  // Check resource-specific rules
  if (allowed && resource.teamId) {
    if (!canAccessTeamResource(user, resource.teamId)) {
      allowed = false;
      reason = 'Not a member of resource team';
    }
  }

  return { allowed, reason };
}
```

### Audit Trail

```typescript
// Log all authorization decisions
async function authorizeWithAudit(
  user: User,
  action: string,
  resource: Resource
): Promise<AuthResult> {
  const result = await authorize(user, action, resource);

  await auditLog.create({
    event: 'authorization.check',
    userId: user.id,
    action,
    resourceType: resource.type,
    resourceId: resource.id,
    allowed: result.allowed,
    reason: result.reason,
    timestamp: new Date(),
  });

  return result;
}
```

## Role Management

### Role Assignment

```typescript
// Roles assigned via Azure AD groups
const roleGroupMapping = {
  'Safari-Trace-Admins': 'admin',
  'Safari-Trace-Managers': 'manager',
  'Safari-Trace-Supervisors': 'supervisor',
  'Safari-Trace-Operators': 'operator',
  'Safari-Trace-Viewers': 'viewer',
};

// Map Azure AD groups to application roles
export function mapGroupsToRoles(groups: string[]): string[] {
  return groups
    .map(group => roleGroupMapping[group])
    .filter(Boolean);
}
```

### Role Hierarchy Inheritance

```typescript
const roleHierarchy: Record<string, string[]> = {
  admin: ['manager', 'supervisor', 'analyst', 'operator', 'viewer'],
  manager: ['supervisor', 'operator', 'viewer'],
  supervisor: ['operator', 'viewer'],
  analyst: ['viewer'],
  operator: ['viewer'],
  viewer: [],
};

// Get all effective roles including inherited
export function getEffectiveRoles(assignedRoles: string[]): string[] {
  const effectiveRoles = new Set<string>();

  for (const role of assignedRoles) {
    effectiveRoles.add(role);
    const inherited = roleHierarchy[role] || [];
    inherited.forEach(r => effectiveRoles.add(r));
  }

  return Array.from(effectiveRoles);
}
```

## Error Responses

### Authorization Errors

```typescript
// Consistent error format
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You don't have permission to perform this action",
    "required_permission": "work-orders:delete",
    "request_id": "req_abc123"
  }
}
```

### User-Friendly Messages

| Error | User Message |
|-------|--------------|
| No permission | "You don't have permission to perform this action" |
| Not owner | "You can only modify your own resources" |
| Wrong team | "This resource belongs to a different team" |
| Role required | "This action requires supervisor approval" |

## Related Documentation

- [Authentication](STD-SEC-001-authentication.md)
- [Data Classification](STD-SEC-003-data-classification.md)
- [API Security](../api-standards/STD-API-001-rest-conventions.md)

---

*Standard Owner: IT Security*
