---
id: STD-SEC-003
title: Data Classification Standards
domain: security
visualization: governance
sensitivity: internal
last_updated: 2026-02-10
---

# Data Classification Standards

## Purpose

This document defines data classification standards for Safari Circuits, establishing guidelines for categorizing, handling, and protecting data based on its sensitivity level.

## Classification Levels

### Overview

```
┌─────────────────────────────────────────────────────────────┐
│                 DATA CLASSIFICATION LEVELS                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Level 4: RESTRICTED         ████████████  Highest Risk     │
│           API keys, passwords, secrets                      │
│                                                             │
│  Level 3: CONFIDENTIAL       ██████████    High Risk        │
│           Financial data, HR records, PII                   │
│                                                             │
│  Level 2: INTERNAL           ████████      Medium Risk      │
│           Business data, procedures                         │
│                                                             │
│  Level 1: PUBLIC             ████          Low Risk         │
│           Marketing, public docs                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Classification Definitions

| Level | Name | Description | Impact of Disclosure |
|-------|------|-------------|---------------------|
| 4 | Restricted | Highest sensitivity | Critical business damage |
| 3 | Confidential | Sensitive business data | Significant harm |
| 2 | Internal | Internal use only | Minor impact |
| 1 | Public | No restrictions | No impact |

## Data Categories

### Level 4: Restricted

| Data Type | Examples | Handling |
|-----------|----------|----------|
| Credentials | Passwords, API keys, tokens | Encrypted vault only |
| Secrets | Encryption keys, certificates | Hardware security module |
| Auth data | Session tokens, refresh tokens | Encrypted, short-lived |

### Level 3: Confidential

| Data Type | Examples | Handling |
|-----------|----------|----------|
| Personal (PII) | SSN, DOB, address, salary | Encrypted, access logged |
| Financial | Bank accounts, credit info | Encrypted, restricted access |
| Health | Medical records, benefits | HIPAA compliant |
| HR Records | Performance reviews, discipline | HR access only |
| Customer data | Contracts, pricing | Need-to-know |
| Trade secrets | Proprietary processes | NDA required |

### Level 2: Internal

| Data Type | Examples | Handling |
|-----------|----------|----------|
| Business data | Reports, metrics, analytics | Internal network only |
| Procedures | SOPs, work instructions | Employee access |
| Communications | Emails, meeting notes | Internal sharing OK |
| Project data | Plans, timelines | Team access |

### Level 1: Public

| Data Type | Examples | Handling |
|-----------|----------|----------|
| Marketing | Brochures, website content | No restrictions |
| Public docs | Published reports | Open access |
| General info | Company address, phone | Public knowledge |

## Handling Requirements

### Access Controls

| Level | Access Model | Authentication |
|-------|--------------|----------------|
| Restricted | Named individuals only | MFA + privileged access |
| Confidential | Role-based, need-to-know | MFA required |
| Internal | All employees | Standard auth |
| Public | Anyone | None required |

### Storage Requirements

| Level | At Rest | In Transit | Backup |
|-------|---------|------------|--------|
| Restricted | AES-256, HSM | TLS 1.3, mTLS | Encrypted, limited |
| Confidential | AES-256 | TLS 1.2+ | Encrypted |
| Internal | Encrypted recommended | TLS 1.2+ | Standard |
| Public | No requirement | HTTPS preferred | Standard |

### Retention & Disposal

| Level | Retention | Disposal |
|-------|-----------|----------|
| Restricted | Per policy, logged | Cryptographic erasure |
| Confidential | Per retention schedule | Secure deletion |
| Internal | Business need | Standard deletion |
| Public | Indefinite | Standard deletion |

## Data Handling Matrix

### Sharing Permissions

| Level | Email | Cloud Share | Print | External |
|-------|-------|-------------|-------|----------|
| Restricted | Encrypted only | No | No | NDA + approval |
| Confidential | Internal encrypted | Approved services | Secure | NDA required |
| Internal | Internal OK | Internal OK | OK | Case-by-case |
| Public | OK | OK | OK | OK |

### Labeling Requirements

| Level | Label Required | Format |
|-------|---------------|--------|
| Restricted | Yes | "RESTRICTED - [Owner]" |
| Confidential | Yes | "CONFIDENTIAL" |
| Internal | Recommended | "Internal Use Only" |
| Public | Optional | None required |

## Implementation

### Database Field Classification

```typescript
// schema.prisma with classification annotations
model Employee {
  id           String   @id  // Internal
  email        String   @unique  // Confidential
  name         String   // Internal
  ssn          String   // Confidential - PII
  salary       Decimal  // Confidential
  bankAccount  String?  // Confidential
  department   String   // Internal

  @@map("employees")
}

// Classification metadata
const fieldClassifications = {
  'Employee.ssn': 'confidential',
  'Employee.salary': 'confidential',
  'Employee.bankAccount': 'confidential',
  'Employee.email': 'confidential',
  'Employee.name': 'internal',
  'Employee.department': 'internal',
};
```

### Encryption Implementation

```typescript
// lib/encryption.ts
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';

// Encrypt confidential data
export function encryptConfidential(
  data: string,
  key: Buffer
): EncryptedData {
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return {
    data: encrypted,
    iv: iv.toString('base64'),
    tag: cipher.getAuthTag().toString('base64'),
  };
}

// Decrypt confidential data
export function decryptConfidential(
  encrypted: EncryptedData,
  key: Buffer
): string {
  const decipher = createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(encrypted.iv, 'base64')
  );

  decipher.setAuthTag(Buffer.from(encrypted.tag, 'base64'));

  let decrypted = decipher.update(encrypted.data, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
```

### Access Logging

```typescript
// Log access to confidential/restricted data
async function logDataAccess(
  userId: string,
  dataType: string,
  dataId: string,
  action: 'read' | 'write' | 'delete',
  classification: 'confidential' | 'restricted'
): Promise<void> {
  await auditLog.create({
    event: 'data.access',
    userId,
    dataType,
    dataId,
    action,
    classification,
    timestamp: new Date(),
    ipAddress: getClientIP(),
    userAgent: getUserAgent(),
  });
}

// Usage
const employee = await getEmployee(id);
await logDataAccess(session.user.id, 'Employee', id, 'read', 'confidential');
```

### Data Masking

```typescript
// Mask sensitive data for display/logs
export const dataMasks = {
  ssn: (value: string) => `***-**-${value.slice(-4)}`,
  email: (value: string) => {
    const [local, domain] = value.split('@');
    return `${local[0]}***@${domain}`;
  },
  phone: (value: string) => `***-***-${value.slice(-4)}`,
  bankAccount: (value: string) => `****${value.slice(-4)}`,
  creditCard: (value: string) => `****-****-****-${value.slice(-4)}`,
};

// Usage
console.log(`Processing employee: ${dataMasks.ssn(employee.ssn)}`);
// Output: Processing employee: ***-**-1234
```

## API Data Protection

### Response Filtering

```typescript
// Filter confidential fields from API responses
const confidentialFields = ['ssn', 'bankAccount', 'salary'];

function filterResponse<T extends Record<string, any>>(
  data: T,
  userRole: string
): Partial<T> {
  if (userRole === 'admin' || userRole === 'hr') {
    return data;
  }

  const filtered = { ...data };
  for (const field of confidentialFields) {
    if (field in filtered) {
      delete filtered[field];
    }
  }

  return filtered;
}
```

### Audit Requirements

| Data Level | Audit Read | Audit Write | Audit Delete | Retention |
|------------|------------|-------------|--------------|-----------|
| Restricted | Yes | Yes | Yes | 7 years |
| Confidential | Yes | Yes | Yes | 3 years |
| Internal | No | Yes | Yes | 1 year |
| Public | No | No | No | N/A |

## Compliance Mapping

### Regulatory Requirements

| Regulation | Applies To | Requirements |
|------------|------------|--------------|
| SOC 2 | All systems | Access controls, encryption |
| ITAR | Defense products | Export controls, logging |
| GDPR | EU personal data | Consent, deletion rights |
| CCPA | CA personal data | Disclosure, opt-out |
| HIPAA | Health info | Encryption, access controls |

### Data Types by Regulation

```
┌─────────────────────────────────────────────────────────────┐
│                    COMPLIANCE MATRIX                         │
├─────────────┬───────┬───────┬───────┬───────┬──────────────┤
│ Data Type   │ SOC 2 │ ITAR  │ GDPR  │ CCPA  │ Classification│
├─────────────┼───────┼───────┼───────┼───────┼──────────────┤
│ Employee PII│   ✓   │       │   ✓   │   ✓   │ Confidential │
│ Customer PI │   ✓   │       │   ✓   │   ✓   │ Confidential │
│ Defense data│   ✓   │   ✓   │       │       │ Restricted   │
│ API keys    │   ✓   │       │       │       │ Restricted   │
│ Production  │   ✓   │   ?   │       │       │ Internal     │
│ Marketing   │       │       │       │       │ Public       │
└─────────────┴───────┴───────┴───────┴───────┴──────────────┘
```

## Training Requirements

| Role | Training | Frequency |
|------|----------|-----------|
| All employees | Data handling basics | Annual |
| Data handlers | Classification & handling | Annual |
| IT/Security | Technical controls | Quarterly |
| Management | Policy & compliance | Annual |

## Incident Response

### Data Breach Classification

| Severity | Criteria | Response Time |
|----------|----------|---------------|
| Critical | Restricted data exposed | Immediate |
| High | Confidential data exposed | 4 hours |
| Medium | Internal data exposed | 24 hours |
| Low | Public data affected | 72 hours |

### Notification Requirements

| Data Level | Internal | Customer | Regulatory |
|------------|----------|----------|------------|
| Restricted | Immediate | If affected | Per regulation |
| Confidential | 24 hours | If affected | Per regulation |
| Internal | 72 hours | N/A | N/A |
| Public | N/A | N/A | N/A |

## Related Documentation

- [Authentication](STD-SEC-001-authentication.md)
- [Authorization](STD-SEC-002-authorization.md)
- [Incident Response](../../runbooks/incidents/incident-response.md)

---

*Standard Owner: IT Security / Compliance*
