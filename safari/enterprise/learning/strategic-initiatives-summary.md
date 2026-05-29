# Safari Circuits Strategic Initiatives Summary

**Generated:** 2026-01-18
**Source:** Claude Markdown Files directory analysis

---

## Executive Summary

Safari Circuits IT has seven major strategic initiatives in various stages of planning and execution. This document consolidates context from project documentation to provide a unified view for planning and grooming.

---

## Initiative Portfolio

| # | Initiative | Status | Priority | Complexity |
|---|-----------|--------|----------|------------|
| 1 | Safari Trace Platform | Active Development | P1 | High |
| 2 | Data Management Architecture | Foundation Phase | P1 | Very High |
| 3 | Manufacturing Sites Integration | Execution | P0 | High |
| 4 | Fourth Shift REST API Wrapper | Implementation Ready | P1 | Medium |
| 5 | ERP Async Quote Integration | Architecture Defined | P2 | Medium |
| 6 | Cloudflare Tunnel Infrastructure | In Progress | P1 | Medium |
| 7 | Fourth Shift 8.0E Upgrade | Active Testing | P0 | Medium |

---

## 1. Safari Trace Platform

### Overview
AI-powered platform for creating intelligent artifacts and managing operational tools. The name "Trace" references PCB circuit traces that connect components.

### Current State
- **Safari Theme** - Complete branding system (#9B1C1C Safari Red, circuit patterns, dark theme)
- **Architecture Diagrams** - Interactive React/SVG diagrams (JSX-based)
- **Safari Studio** - Artifact creation module with template selector
- **Diagram Template System** - AI prompt builder, reusable components

### Technology Stack
| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Next.js, Vite, Tailwind CSS |
| Diagrams | JSX/SVG with SafariTheme |
| AI | Claude API (Sonnet) for artifact generation |
| Deployment | Docker, Kubernetes (multi-site federated) |

### Planned Modules
- Safari Studio (current focus)
- Safari Assist - General AI chat
- Safari Search - Knowledge base
- Embedded Apps - Host internal tools

### Integration Points
- OpenMetadata for business entities/lineage
- Read.ai/Fireflies for meeting transcripts
- Entra ID for SSO
- Grafana for data visualization
- Internal apps (Quoting/Purchasing, Manufacturing Stream, ERP/CRM)

### Key Files
- `safari-trace-project-brief.md`
- `claude-code-project-update.md`
- `FILE-PLACEMENT-GUIDE.md`

---

## 2. Data Management Architecture

### Overview
Modern streaming data platform with governance-first architecture supporting real-time manufacturing data processing, AI-powered analytics, and post-acquisition IT integration.

### Philosophy
> Build parsimoniously and rigorously. Objects created should be repurposed for multiple needs without remapping or moving data.

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Storage | Apache Iceberg | Single table format for all data |
| Streaming | Apache Kafka (Confluent) | Event streaming + Schema Registry |
| Processing | Apache Spark (Scala) | Unified batch + streaming |
| Query | Trino | Federated SQL queries |
| Governance | OpenMetadata | Business catalog, lineage, quality |
| Operational DB | PostgreSQL | Job orchestration, metadata only |

### Data Architecture Pattern
**Medallion Architecture:**
```
Bronze (Raw) → Silver (Cleaned) → Gold (Business-Ready)
```

### Recommended Domains
- Manufacturing - Production, equipment, work orders, MES
- Supply Chain - Shipments, inventory, suppliers, OTD
- Quality - Inspections, defects, FPY, compliance
- Sales & Customers - Orders, customers, revenue
- Finance - GL data, invoices, payments
- Human Resources - Employee data, time tracking
- IT & Systems - Logs, application metadata

### Priority Business Metrics
- First Pass Yield (FPY)
- Overall Equipment Effectiveness (OEE)
- On-Time Delivery Rate (OTD)
- Inventory Turnover

### Key File
- `data_management_architecture_reference.md`

---

## 3. Manufacturing Sites Integration

### Overview
Unified identity management across manufacturing sites using Entra ID hybrid with standardized UPN.

### User Experience Goal
- **Primary Login:** `username@safaricircuits.com`
- **Alternate Login:** `SAFARI\username`
- **Single Sign-On:** One password for all applications

### Epic Structure

| Epic | Focus |
|------|-------|
| 1 | Infrastructure Foundation (Network, Azure VDC) |
| 2 | Identity Management Platform (Entra ID, Entra Connect) |
| 3 | Active Directory Integration (DNS, Trusts, GPO) |
| 4 | Security & Compliance (Zero Trust, Conditional Access, PIM) |
| 5 | Application Integration (SSO, App Proxy) |
| 6 | Migration & Cutover (Pilot, Production waves) |
| 7 | Operations & Optimization (Monitoring, DR) |

### Timeline
- Phase 1: Foundation (Weeks 1-4)
- Phase 2: Integration (Weeks 5-8)
- Phase 3: Migration (Weeks 9-12)
- Phase 4: Optimization (Weeks 13-16)

### Key Files
- `Manufacturing_Integration_Backlog_Restructured.md`
- `Domain_Integration_Plan.md`

---

## 4. Fourth Shift REST API Wrapper

### Overview
Modern REST API wrapper around Fourth Shift Transactional Interface (FSTM) to enable integration with modern tools without .NET SDK requirements.

### Business Value
1. Partner Integration - Easy API access for Planful FP&A
2. Data Pipeline - Enable real-time replication to PostgreSQL/Fabric
3. Scalability - Horizontal scaling of API instances
4. Future-Proof - Positions for Fourth Shift → Modern ERP migration
5. CMMC Compliance - Centralized audit trails

### Technology Stack
| Component | Technology |
|-----------|------------|
| Runtime | .NET 8.0 (LTS) |
| Framework | ASP.NET Core 8.0 |
| Language | C# 12 |
| API Style | RESTful JSON |
| Auth | JWT Bearer Tokens + API Keys |
| Messaging | Confluent.Kafka (optional) |
| Observability | OpenTelemetry + Application Insights |

### Key Components
- `FSTIClientPool` - Connection pooling, lifecycle management
- `TransactionService` - Business logic, transaction orchestration
- `TransactionsController` - REST endpoints

### Implementation Phases
1. Core API (Weeks 1-2)
2. Testing & Refinement (Week 3)
3. Security (Week 4)
4. Kafka Integration (Weeks 5-6)
5. Deployment (Weeks 7-8)

### Key File
- `FourthShift-REST-API-Implementation-Guide.md`

---

## 5. ERP Async Quote Integration

### Overview
Event-driven architecture for supplier quote-to-purchase workflow with 24-hour response delays.

### Core Pattern
**State Machine + Event-Driven Architecture**

```
DRAFT → QUOTE_PENDING → QUOTE_RECEIVED → ORDER_SUBMITTED → COMPLETED
                     ↘ QUOTE_FAILED
```

### Architecture Pattern
**Correlation ID Bridge** - Bridges ERP (synchronous) with Supplier API (eventual consistency)

### Response Patterns
- **Webhook** - Supplier pushes to your endpoint
- **Polling** - Scheduled job checks supplier API with exponential backoff

### Failure Modes Handled
- Supplier never responds (timeout)
- Webhook arrives but ERP is down
- Duplicate webhooks
- Quote expires before user acts
- User cancels PO while quote pending

### Key File
- `erp-async-quote-integration-briefing.md`

---

## 6. Cloudflare Tunnel Infrastructure

### Overview
Scalable, template-driven Cloudflare Tunnel infrastructure to securely expose internal services to external partners without opening firewall ports.

### Key Objectives
- Eliminate direct internet exposure of database ports
- Create reusable infrastructure for future partner integrations
- Maintain CMMC compliance
- Enable rapid partner onboarding (days vs weeks)
- Implement high availability with zero downtime

### Current Partners

| Partner | Service | Port | Authentication |
|---------|---------|------|----------------|
| Planful | SQL Server | 1433 | Service Token + IP |
| Confluent | Kafka Broker | 9092 | mTLS + Token |

### Interim Solution (Active)
Microsoft Fabric SQL Analytics endpoint with:
- Separate workspace with limited tables via shortcuts
- Service principal authentication

### Features

| Feature | Status |
|---------|--------|
| Tunnel Architecture & Design | ✅ |
| Core Tunnel Infrastructure | 🔄 |
| Service Onboarding Framework | 📋 |
| Security & Access Control | 🔒 |
| Partner Integration - Planful | ✅ |
| Partner Integration - Confluent | 📋 |
| Operations & Maintenance | 🔧 |

### Key File
- `Cloudflare_Tunnel_Project_Plan.md`

---

## 7. Fourth Shift 8.0E Upgrade Testing

### Overview
Comprehensive testing tracker for Fourth Shift ERP upgrade across all modules.

### Testing Areas

| Area | Focus |
|------|-------|
| Inventory | Item master, BOM, lot tracing, cycle counts |
| Order Processing | CO entry, COAN, pricing, pick/pack/ship |
| Purchasing | PO creation, vendor maintenance, receipts, WIP |
| Manufacturing | MO processing, pick lists, receipts, WIP reporting |
| Financial | AP/AR processing, GL batch, month-end, cost rolling |
| Add-Ons | Visibar/Visiwatch, EDI, shipping integrations |

### Owner Assignments
- Customer Service/Sales
- Engineering
- Finance
- Inventory
- Purchasing
- Manufacturing
- Shipping
- IT/Add-Ons

### Key File
- `Testing_Tracker_Instructions.md`

---

## Skills Requirements Matrix

### Platform Development

| Skill | Initiatives | Priority |
|-------|-------------|----------|
| React 18 / TypeScript | Safari Trace | High |
| Next.js App Router | Safari Trace | High |
| Vite / Tailwind CSS | Safari Trace | Medium |
| JSX/SVG rendering | Safari Trace | High |
| Claude API integration | Safari Trace | High |

### Data Engineering

| Skill | Initiatives | Priority |
|-------|-------------|----------|
| Apache Kafka / Confluent | Data Architecture, 4th Shift API | High |
| Apache Spark (Scala) | Data Architecture | High |
| Apache Iceberg | Data Architecture | High |
| Trino SQL | Data Architecture | Medium |
| OpenMetadata | Data Architecture, Safari Trace | High |
| Data modeling (Medallion) | Data Architecture | High |

### .NET Development

| Skill | Initiatives | Priority |
|-------|-------------|----------|
| ASP.NET Core 8.0 | Fourth Shift API | High |
| C# 12 | Fourth Shift API | High |
| Connection pooling | Fourth Shift API | Medium |
| REST API design | Fourth Shift API | High |
| Confluent.Kafka (.NET) | Fourth Shift API | Medium |

### Infrastructure / Identity

| Skill | Initiatives | Priority |
|-------|-------------|----------|
| Microsoft Entra ID | Manufacturing Integration | High |
| Entra Connect | Manufacturing Integration | High |
| Azure Virtual WAN | Manufacturing Integration | Medium |
| FortiGate VPN | Manufacturing Integration | Medium |
| Cloudflare Tunnel | Cloudflare Infrastructure | High |
| Terraform / IaC | Cloudflare, Data Architecture | High |
| Docker / Kubernetes | All | High |

### Integration / Architecture

| Skill | Initiatives | Priority |
|-------|-------------|----------|
| Fourth Shift SDK | Fourth Shift API | High |
| Plex ERP integration | Data Architecture | Medium |
| BeFirst MES integration | Data Architecture | Medium |
| Event-driven architecture | Quote Integration, Data Arch | High |
| State machine patterns | Quote Integration | Medium |
| Webhook/polling patterns | Quote Integration | Medium |

### Security

| Skill | Initiatives | Priority |
|-------|-------------|----------|
| Zero Trust architecture | Manufacturing Integration | High |
| Conditional Access | Manufacturing Integration | High |
| PIM | Manufacturing Integration | Medium |
| CMMC compliance | All | High |
| mTLS | Cloudflare Infrastructure | Medium |
| JWT authentication | Fourth Shift API | High |

---

## Cross-Initiative Dependencies

```
Safari Trace Platform
    ├── needs → Data Management Architecture (OpenMetadata, metrics)
    ├── needs → Entra ID (SSO integration)
    └── needs → Fourth Shift API (ERP data access)

Data Management Architecture
    ├── needs → Fourth Shift API (event streaming source)
    ├── needs → Cloudflare Tunnel (Confluent POC access)
    └── feeds → Safari Trace (business metrics, lineage)

Manufacturing Integration
    ├── enables → Safari Trace (SSO)
    ├── enables → Fourth Shift API (centralized auth)
    └── enables → All applications (unified identity)

Fourth Shift REST API
    ├── needs → Cloudflare Tunnel (partner access)
    ├── feeds → Data Management Architecture (events)
    └── supports → Quote Integration (ERP operations)
```

---

## Recommended Grooming Priority

### Sprint 1 Focus
1. **Manufacturing Integration** - Time-sensitive (TSA deadline)
2. **Fourth Shift 8.0E Testing** - Active testing in progress
3. **Cloudflare Tunnel** - Unblocks Planful/Confluent

### Sprint 2 Focus
1. **Fourth Shift REST API** - Enables data pipeline
2. **Data Management Architecture** - Foundation for analytics
3. **Safari Trace** - Continue Studio development

### Future Sprints
1. **Quote Integration** - After Fourth Shift API stable
2. **Safari Trace Modules** - Safari Assist, Safari Search

---

## Document Sources

| File | Initiative |
|------|------------|
| `safari-trace-project-brief.md` | Safari Trace |
| `data_management_architecture_reference.md` | Data Management |
| `Manufacturing_Integration_Backlog_Restructured.md` | Manufacturing Integration |
| `Domain_Integration_Plan.md` | Manufacturing Integration |
| `FourthShift-REST-API-Implementation-Guide.md` | Fourth Shift API |
| `erp-async-quote-integration-briefing.md` | Quote Integration |
| `Cloudflare_Tunnel_Project_Plan.md` | Cloudflare Tunnel |
| `Testing_Tracker_Instructions.md` | Fourth Shift Upgrade |
| `claude-code-project-update.md` | Safari Trace |
| `FILE-PLACEMENT-GUIDE.md` | Safari Trace |

---

*Last Updated: 2026-01-18*
*Source: `C:\Users\dkmcintyre\OneDrive - Safari Circuits, LLC\Desktop\Code\Claude\Claude Markdown Files`*
