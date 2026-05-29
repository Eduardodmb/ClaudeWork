# Safari Circuits IT Skills Assessment

**Generated:** 2026-01-18
**Purpose:** Identify skills needed to execute strategic initiatives

---

## Executive Summary

Based on analysis of 7 strategic initiatives, Safari Circuits IT needs capabilities across 5 primary skill domains.

**Strategic Direction (Updated 2026-01-18):**
> Build **Claude Code skills in GitHub** that encode domain expertise rather than training every team member on every technology. The AI becomes the expert; team members guide, verify, and improve.

This shifts investment from certifications → skill development in the Claude ecosystem.

---

## Skills Strategy: Claude Skills First

| Traditional Approach | Safari Approach |
|---------------------|-----------------|
| Train 3 people on Spark/Scala | Build Claude skill encoding Spark/Scala patterns |
| Certifications for each domain | Skills that make AI expert, humans verify |
| High per-person training cost | One-time skill investment, team-wide benefit |
| Knowledge silos | Shared AI-accessible expertise |

### Priority Claude Skills to Build

| Skill Name | Domain | Encodes |
|------------|--------|---------|
| `spark-scala-patterns` | data-engineering | Spark job templates, Scala idioms, Iceberg integration |
| `fourth-shift-sdk` | erp-integration | FSTM transaction patterns, connection pooling |
| `openmetadata-catalog` | data-governance | Catalog design, lineage modeling, connector setup |
| `cloudflare-tunnel-ops` | infrastructure | Tunnel setup, service onboarding, troubleshooting |
| `entra-id-hybrid` | identity | Entra Connect, conditional access, PIM patterns |

---

## Personal Education Integration

**Concept:** Gradual, ritual-based learning integrated into workflow

| Element | Description |
|---------|-------------|
| `/learn` skill | Surfaces relevant learning during idle moments |
| Session integration | Brief knowledge check during `/start-work` or `/end-work` |
| Spaced repetition | Revisit concepts at increasing intervals |
| Non-intrusive | Never blocks production work |
| Metrics | Track personal growth without pressure |

**Goal:** Education happens naturally as part of AI-assisted workflow, not as separate burden.

---

## Skills Matrix by Initiative

### High Priority Skills (Needed Within 3 Months)

| Skill | Initiative(s) | Current Gap | Action |
|-------|---------------|-------------|--------|
| **Microsoft Entra ID** | Domain Integration | Low | Team has AD experience, need Entra hybrid training |
| **ASP.NET Core 8.0** | Fourth Shift API | Low | Strong .NET foundation exists |
| **Cloudflare Tunnel** | External Integration | Medium | New technology, good documentation |
| **Apache Kafka** | Data Architecture, 4S API | Medium | Confluent offers training paths |
| **React 18 / TypeScript** | Safari Trace | Low | Team familiar, need advanced patterns |

### Medium Priority Skills (3-6 Months)

| Skill | Initiative(s) | Current Gap | Action |
|-------|---------------|-------------|--------|
| **Apache Spark (Scala)** | Data Architecture | High | Training or contractor needed |
| **Apache Iceberg** | Data Architecture | High | Specialized, partner with Confluent |
| **OpenMetadata** | Data Architecture, Safari Trace | High | Governance specialist needed |
| **Trino SQL** | Data Architecture | Medium | SQL knowledge transfers |
| **Event-Driven Architecture** | Quote Integration, Data Arch | Medium | Pattern documentation + practice |

### Lower Priority Skills (6-12 Months)

| Skill | Initiative(s) | Current Gap | Action |
|-------|---------------|-------------|--------|
| **Fourth Shift SDK** | Fourth Shift API | Medium | Legacy .NET COM experience |
| **Terraform IaC** | Cloudflare, Data Arch | Low | Infrastructure team familiar |
| **mTLS / Zero Trust** | External Integration, Security | Medium | Security team training |
| **Kubernetes Advanced** | All | Medium | Production operations experience |

---

## Skill Domain Details

### 1. Platform Development

**Current Team Strength:** Medium-High

| Skill | Level | Notes |
|-------|-------|-------|
| React 18 | Medium | Safari Trace work building experience |
| TypeScript | Medium | Adopting, prefer `type` over `interface` |
| Next.js App Router | Low | Learning curve from Pages Router |
| Vite | Low | New tooling, straightforward |
| Tailwind CSS | Medium | Used in Safari Trace |
| JSX/SVG rendering | Medium | Safari Studio diagram work |
| Claude API | Low | New integration point |

**Gap Action:** Continue Safari Trace development for hands-on learning. Claude API integration is critical path.

---

### 2. Data Engineering

**Current Team Strength:** Low-Medium

| Skill | Level | Notes |
|-------|-------|-------|
| Apache Kafka | Low | Confluent POC will help |
| Apache Spark | Very Low | Major gap - Scala required |
| Apache Iceberg | Very Low | Table format expertise needed |
| Trino | Low | SQL skills transfer |
| OpenMetadata | None | Governance platform new to team |
| Data Modeling (Medallion) | Low | Pattern knowledge, not practice |
| Schema Registry | Low | Confluent ecosystem |

**Gap Action:**
1. Partner with Confluent for Kafka/Schema Registry training
2. Evaluate contractor for Spark/Scala implementation
3. OpenMetadata requires dedicated learning path

**Recommended Training:**
- Confluent Developer certification
- Databricks/Spark fundamentals (Scala track)
- Apache Iceberg deep dive (Tabular.io resources)

---

### 3. .NET Development

**Current Team Strength:** High

| Skill | Level | Notes |
|-------|-------|-------|
| ASP.NET Core | High | Strong foundation |
| C# 12 | Medium | Need latest features |
| Connection pooling | Medium | Fourth Shift API will develop |
| REST API design | High | Existing experience |
| Confluent.Kafka (.NET) | Low | New library |
| Fourth Shift SDK | Low | Legacy COM, documentation exists |

**Gap Action:** Fourth Shift REST API project will close remaining gaps. Focus on connection pooling patterns and Kafka producer integration.

---

### 4. Infrastructure / Identity

**Current Team Strength:** Medium

| Skill | Level | Notes |
|-------|-------|-------|
| Microsoft Entra ID | Low | AD experience helps |
| Entra Connect | Low | Hybrid sync new |
| Azure Virtual WAN | Low | Network team capability |
| FortiGate VPN | Medium | Current infrastructure |
| Cloudflare Tunnel | None | New technology |
| Terraform/IaC | Medium | Used for some deployments |
| Docker | High | Team standard |
| Kubernetes | Medium | Production operations growing |

**Gap Action:**
1. Entra ID training for identity team (Microsoft Learn)
2. Cloudflare certification path for infrastructure
3. Kubernetes production operations (CKA path)

**Recommended Training:**
- Microsoft Entra ID fundamentals (SC-300)
- Cloudflare Certified Fundamentals
- CKA (Certified Kubernetes Administrator)

---

### 5. Security

**Current Team Strength:** Medium

| Skill | Level | Notes |
|-------|-------|-------|
| Zero Trust architecture | Low | Conceptual, not implemented |
| Conditional Access | Low | Entra ID feature |
| PIM | None | Privileged Identity Management new |
| CMMC compliance | Medium | Documentation exists |
| mTLS | Low | Cloudflare Tunnel requirement |
| JWT authentication | Medium | Used in APIs |

**Gap Action:**
1. Zero Trust implementation during Domain Integration
2. CMMC documentation maintenance
3. mTLS configuration for external integrations

---

## Training Path Recommendations

### Immediate (Next 30 Days)

| Person/Role | Training | Platform |
|-------------|----------|----------|
| Identity Lead | SC-300: Entra ID Administrator | Microsoft Learn |
| Infrastructure | Cloudflare Fundamentals | Cloudflare Academy |
| Data Team | Confluent Developer | Confluent Training |

### Near-Term (30-90 Days)

| Person/Role | Training | Platform |
|-------------|----------|----------|
| Data Team | Spark + Scala Fundamentals | Databricks Academy |
| Platform Dev | Advanced React Patterns | Pluralsight/Frontend Masters |
| Infrastructure | CKA Preparation | Linux Foundation |

### Long-Term (90+ Days)

| Person/Role | Training | Platform |
|-------------|----------|----------|
| Data Team | Apache Iceberg Deep Dive | Tabular.io |
| Data Team | OpenMetadata Administration | OpenMetadata Docs |
| Security | SC-400: Information Protection | Microsoft Learn |

---

## Contractor/Partner Needs

### Recommended External Support

| Skill Area | Type | Duration | Notes |
|------------|------|----------|-------|
| **Spark/Scala** | Contractor | 6 months | Build initial pipelines, knowledge transfer |
| **OpenMetadata** | Consultant | 3 months | Catalog design, best practices |
| **Confluent** | Partner | Ongoing | Training credits, architecture review |

### Build vs. Buy Analysis

| Capability | Recommendation | Rationale |
|------------|----------------|-----------|
| Kafka streaming | Build (with training) | Core competency |
| Spark processing | Contract + Transfer | Complex, time-sensitive |
| OpenMetadata | Contract + Transfer | Specialized, one-time setup |
| Safari Trace UI | Build | Differentiator, core platform |
| Fourth Shift API | Build | Domain expertise required |
| Cloudflare Tunnel | Build | Infrastructure standard |

---

## Budget Estimates

### Training Investment

| Category | Estimated Cost |
|----------|----------------|
| Microsoft certifications (3 people) | $3,000 |
| Confluent training (2 people) | $4,000 |
| Databricks/Spark (2 people) | $4,000 |
| Kubernetes certifications (2 people) | $2,400 |
| **Total Training** | **$13,400** |

### Contractor Support

| Role | Duration | Estimated Cost |
|------|----------|----------------|
| Spark/Scala Developer | 6 months | $90,000 |
| OpenMetadata Consultant | 3 months | $30,000 |
| **Total Contractors** | **$120,000** |

### Platform Costs (Already Budgeted)

| Platform | Annual Cost |
|----------|-------------|
| Confluent Cloud | TBD (POC) |
| OpenMetadata | Open Source |
| Cloudflare (Teams) | $18,000 |

---

## Skills Development Timeline

```
Month 1-2: Foundation
├── Entra ID training (Identity team)
├── Cloudflare Tunnel setup (Infrastructure)
└── Confluent Developer (Data team)

Month 3-4: Building
├── Spark/Scala contractor engagement
├── OpenMetadata consultant engagement
├── Fourth Shift API development (internal)
└── Safari Trace Claude API integration (internal)

Month 5-6: Scaling
├── Spark pipeline development (w/ contractor)
├── Knowledge transfer sessions
├── CKA certification (Infrastructure)
└── Production deployments

Month 7-12: Optimization
├── Independent Spark operations
├── OpenMetadata self-service
├── Advanced patterns documentation
└── Team certifications complete
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Team certifications | 8 | Track completions |
| Contractor knowledge transfer | 90% | Exit interviews |
| Self-service capability | Yes | No external help for operations |
| Time to deploy new service | < 1 day | Measure from template |
| Data pipeline autonomy | 100% | Internal-only maintenance |

---

## Next Steps

1. **Week 1:** Review and approve training budget
2. **Week 2:** Enroll in Microsoft/Confluent training
3. **Week 3:** Draft contractor SOW for Spark/OpenMetadata
4. **Week 4:** Begin Cloudflare Tunnel implementation (hands-on learning)
5. **Month 2:** Engage contractors, start Spark ramp-up

---

*Last Updated: 2026-01-18*
*Source: Strategic Initiatives Analysis*
