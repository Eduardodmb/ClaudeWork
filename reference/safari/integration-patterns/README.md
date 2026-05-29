# Integration Patterns

```yaml
id: STD-INT-001
title: Integration Patterns
domain: shared
tags: [integration, patterns, api, events, sync]
last_updated: 2026-01-18
```

## Overview

This document defines integration patterns for connecting systems across Safari Circuits. These patterns ensure consistent, reliable, and maintainable integrations between internal and external systems.

## Integration Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       INTEGRATION ARCHITECTURE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                       SAFARI TRACE PLATFORM                            │ │
│  │                                                                        │ │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐                  │ │
│  │  │ Studio  │  │ Assist  │  │ Analyze │  │   Hub   │                  │ │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘                  │ │
│  │       │            │            │            │                        │ │
│  │       └────────────┴────────────┴────────────┘                        │ │
│  │                          │                                             │ │
│  │                          ▼                                             │ │
│  │              ┌────────────────────────┐                               │ │
│  │              │    Integration Hub      │                               │ │
│  │              │  (API Gateway + Events) │                               │ │
│  │              └───────────┬────────────┘                               │ │
│  └──────────────────────────│─────────────────────────────────────────────┘ │
│                             │                                               │
│                             ▼                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                      INTEGRATION LAYER                                │  │
│  │                                                                       │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │    REST    │  │   Events   │  │    File    │  │   Direct   │    │  │
│  │  │    APIs    │  │  (SignalR) │  │   Sync     │  │    SQL     │    │  │
│  │  └──────┬─────┘  └──────┬─────┘  └──────┬─────┘  └──────┬─────┘    │  │
│  └─────────│───────────────│───────────────│───────────────│───────────┘  │
│            │               │               │               │               │
│            ▼               ▼               ▼               ▼               │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                      EXTERNAL SYSTEMS                                  │ │
│  │                                                                        │ │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │ │
│  │  │  Plex   │  │ BeFirst │  │ Planful │  │Paylocity│  │  Other  │    │ │
│  │  │   ERP   │  │   MES   │  │ Finance │  │    HR   │  │ Systems │    │ │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Integration Patterns

### 1. Request-Response (REST API)

**Use When:** Synchronous data retrieval, CRUD operations, simple queries.

```
┌─────────┐     HTTP Request     ┌─────────┐
│ Client  │─────────────────────▶│ Server  │
│         │◀─────────────────────│         │
└─────────┘     HTTP Response    └─────────┘
```

**Implementation:**

```typescript
// REST API call pattern
async function fetchFromPlex(endpoint: string): Promise<PlexResponse> {
  const response = await fetch(`${PLEX_API_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${await getPlexToken()}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new IntegrationError('Plex', response.status);
  }

  return response.json();
}
```

**Error Handling:**

| Error | Retry | Fallback |
|-------|-------|----------|
| 4xx | No | Return error |
| 5xx | Yes (3x) | Use cached data |
| Timeout | Yes (2x) | Use cached data |
| Network | Yes (3x) | Queue for later |

### 2. Event-Driven (Publish-Subscribe)

**Use When:** Real-time updates, decoupled systems, multi-subscriber notifications.

```
                    ┌─────────┐
                 ┌─▶│ Sub A   │
┌─────────┐     │  └─────────┘
│Publisher│────▶│  ┌─────────┐
└─────────┘     ├─▶│ Sub B   │
  (Events)      │  └─────────┘
                │  ┌─────────┐
                └─▶│ Sub C   │
                   └─────────┘
```

**Implementation:**

```typescript
// SignalR event hub
interface ProductionHub {
  // Publishing
  onOEEUpdate(lineId: string, oee: OEEData): void;
  onProductionCount(lineId: string, count: number): void;
  onStationStatus(stationId: string, status: StationStatus): void;

  // Subscribing
  subscribeToLine(lineId: string): void;
  unsubscribeFromLine(lineId: string): void;
}

// Client subscription
useEffect(() => {
  connection.on('OEEUpdate', (data) => {
    setOEE(data);
  });

  connection.invoke('subscribeToLine', lineId);

  return () => {
    connection.invoke('unsubscribeFromLine', lineId);
  };
}, [lineId]);
```

### 3. Batch Synchronization

**Use When:** Large data volumes, non-real-time requirements, scheduled updates.

```
┌─────────┐                         ┌─────────┐
│ Source  │                         │  Target │
│ System  │                         │  System │
└────┬────┘                         └────┬────┘
     │          ┌─────────┐              │
     │─────────▶│  ETL    │──────────────│
     │          │ Process │              │
     │          └─────────┘              │
     │              │                    │
     │   1. Extract │ 2. Transform       │
     │              │ 3. Load            │
     │              └────────────────────│
```

**Schedule:**

| Source | Frequency | Time | Data Types |
|--------|-----------|------|------------|
| Plex ERP | Daily | 6:00 AM | Orders, inventory |
| Planful | Weekly | Sunday 2:00 AM | Budget, forecast |
| Paylocity | Daily | 7:00 AM | Employee data |

### 4. Change Data Capture (CDC)

**Use When:** Near real-time sync, audit trails, incremental updates.

```
┌─────────┐     Changes     ┌─────────┐     Transform    ┌─────────┐
│ Source  │────────────────▶│  CDC    │─────────────────▶│ Target  │
│   DB    │   (Log-based)   │ Service │                  │ System  │
└─────────┘                 └─────────┘                  └─────────┘
```

**Implementation:**

```typescript
interface ChangeEvent {
  table: string;
  operation: 'INSERT' | 'UPDATE' | 'DELETE';
  timestamp: Date;
  before?: Record<string, any>;
  after?: Record<string, any>;
  transactionId: string;
}

async function processChange(event: ChangeEvent) {
  switch (event.table) {
    case 'work_orders':
      await syncWorkOrder(event);
      break;
    case 'inventory':
      await syncInventory(event);
      break;
  }
}
```

### 5. File-Based Integration

**Use When:** Legacy systems, batch data exchange, standard formats.

```
┌─────────┐     Write File    ┌─────────┐     Read File    ┌─────────┐
│ System  │──────────────────▶│  Share  │────────────────▶│ System  │
│    A    │                   │  Folder │                  │    B    │
└─────────┘                   └─────────┘                  └─────────┘
```

**Examples:**

| Integration | Format | Protocol | Frequency |
|-------------|--------|----------|-----------|
| Hanwha SMT | CSV | SMB | Per job |
| AOI Results | XML | SMB | Per panel |
| Zebra Labels | ZPL | TCP | On demand |

## Integration Connectors

### Plex ERP

| Aspect | Detail |
|--------|--------|
| Protocol | SOAP/WCF |
| Auth | Token-based |
| Data Types | Jobs, BOMs, parts, customers, inventory |
| Sync Mode | API calls + batch sync |

```typescript
interface PlexConnector {
  // Data Access
  getJobs(filter: JobFilter): Promise<Job[]>;
  getBOM(partNumber: string): Promise<BOM>;
  getInventory(location: string): Promise<InventoryItem[]>;

  // Transactions
  createWorkOrder(order: WorkOrder): Promise<string>;
  updateInventory(transaction: InventoryTransaction): Promise<void>;
}
```

### BeFirst MES

| Aspect | Detail |
|--------|--------|
| Protocol | REST API + SignalR |
| Auth | JWT |
| Data Types | Production, OEE, stations, work orders |
| Sync Mode | Real-time events |

```typescript
interface MESConnector {
  // Real-time
  subscribeToOEE(lineId: string, callback: (oee: OEE) => void): void;
  subscribeToProduction(callback: (count: ProductionCount) => void): void;

  // API
  getWorkOrderStatus(woId: string): Promise<WorkOrderStatus>;
  checkInAtStation(stationId: string, userId: string): Promise<void>;
}
```

### Planful

| Aspect | Detail |
|--------|--------|
| Protocol | REST API |
| Auth | OAuth 2.0 |
| Data Types | Budget, forecast, actuals |
| Sync Mode | Scheduled batch |

### Paylocity

| Aspect | Detail |
|--------|--------|
| Protocol | REST API |
| Auth | OAuth 2.0 |
| Data Types | Employees, payroll, benefits |
| Sync Mode | Scheduled batch |

## Data Transformation

### Mapping Patterns

```typescript
// Field mapping configuration
interface FieldMapping {
  source: string;
  target: string;
  transform?: TransformFunction;
  default?: any;
}

const plexToLocalMapping: FieldMapping[] = [
  { source: 'Part_No', target: 'partNumber' },
  { source: 'Part_Description', target: 'description' },
  {
    source: 'Unit_Price',
    target: 'price',
    transform: (v) => parseFloat(v) || 0,
  },
  {
    source: 'Status_Code',
    target: 'status',
    transform: mapPlexStatus,
  },
];
```

### Canonical Data Model

```typescript
// Common data structures across systems
interface CanonicalWorkOrder {
  id: string;
  externalIds: {
    plex?: string;
    mes?: string;
  };
  partNumber: string;
  quantity: number;
  status: WorkOrderStatus;
  dueDate: Date;
  lineId?: string;
  priority: Priority;
  timestamps: {
    created: Date;
    started?: Date;
    completed?: Date;
  };
}
```

## Error Handling

### Circuit Breaker

```typescript
interface CircuitBreaker {
  state: 'closed' | 'open' | 'half-open';
  failureCount: number;
  lastFailure?: Date;
  threshold: number;
  resetTimeout: number;
}

async function callWithCircuitBreaker<T>(
  fn: () => Promise<T>,
  breaker: CircuitBreaker
): Promise<T> {
  if (breaker.state === 'open') {
    if (Date.now() - breaker.lastFailure! > breaker.resetTimeout) {
      breaker.state = 'half-open';
    } else {
      throw new CircuitOpenError();
    }
  }

  try {
    const result = await fn();
    breaker.failureCount = 0;
    breaker.state = 'closed';
    return result;
  } catch (error) {
    breaker.failureCount++;
    breaker.lastFailure = new Date();
    if (breaker.failureCount >= breaker.threshold) {
      breaker.state = 'open';
    }
    throw error;
  }
}
```

### Retry Strategy

| Error Type | Retry | Delay | Max Attempts |
|------------|-------|-------|--------------|
| Network | Yes | Exponential | 3 |
| Timeout | Yes | Linear | 2 |
| 5xx | Yes | Exponential | 3 |
| 4xx | No | - | - |
| Auth | Refresh token | - | 1 |

### Dead Letter Queue

```typescript
interface DeadLetterMessage {
  id: string;
  originalMessage: any;
  error: string;
  timestamp: Date;
  attempts: number;
  source: string;
  destination: string;
}

async function handleFailedMessage(message: any, error: Error) {
  await deadLetterQueue.add({
    originalMessage: message,
    error: error.message,
    timestamp: new Date(),
    attempts: message.attempts || 1,
  });

  await alerting.notify('Integration failure', {
    message,
    error,
  });
}
```

## Monitoring

### Health Checks

```typescript
interface IntegrationHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  latency: number;
  lastCheck: Date;
  lastSuccess: Date;
  errorRate: number;
}

async function checkHealth(integration: string): Promise<IntegrationHealth> {
  const startTime = Date.now();

  try {
    await integrations[integration].ping();
    return {
      name: integration,
      status: 'healthy',
      latency: Date.now() - startTime,
      lastCheck: new Date(),
      lastSuccess: new Date(),
      errorRate: 0,
    };
  } catch (error) {
    return {
      name: integration,
      status: 'unhealthy',
      latency: Date.now() - startTime,
      lastCheck: new Date(),
      lastSuccess: getLastSuccess(integration),
      errorRate: calculateErrorRate(integration),
    };
  }
}
```

### Metrics

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| Request latency | API call duration | >1s |
| Error rate | Failed requests % | >5% |
| Queue depth | Pending messages | >1000 |
| Sync lag | Time since last sync | >1 hour |

## Related Documentation

- [API Standards](../api-standards/README.md)
- [Authentication](../security/authentication.md)
- [BeFirst Integrations](../../products/befirst/architecture/integrations.md)

---

*Standard Owner: Engineering*
