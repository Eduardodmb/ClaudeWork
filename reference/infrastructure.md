# Infrastructure Standards

Safari Circuits established technology standards. Do not propose alternatives without explicit discussion.

---

## Core Tooling Strategy

| Layer | Technology | Notes |
|-------|------------|-------|
| Container Orchestration | Kubernetes | Standard for all deployments |
| Containerization | Docker | All services containerized |
| Operational Database | PostgreSQL | ONLY for operational metadata, not analytics |
| Streaming Platform | Apache Kafka (Confluent) | Event streaming + Schema Registry |
| Processing Engine | Apache Spark (Scala) | Unified batch + streaming |
| Table Format | Apache Iceberg | Single format for all data |
| Query Layer | Trino | Federated SQL queries |
| Governance | OpenMetadata | Business catalog, lineage, quality |

---

## Data Architecture Reference

Full architecture documented in:
`C:\Users\dkmcintyre\organizational-docs\domains\information-technology\architecture\data_management_architecture_reference.md`

**Key Patterns:**
- **Medallion Architecture:** Bronze (raw) → Silver (cleaned) → Gold (business-ready)
- **Governance-First:** Metadata definitions before pipeline code
- **Schema Registry:** Technical validation at event time
- **OpenMetadata:** Business semantics, lineage, AI agent context

---

## Infrastructure Decision Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Database | PostgreSQL (not MySQL) | Team standard, Kubernetes ecosystem |
| Streaming | Kafka (not Pulsar) | Confluent ecosystem, Schema Registry |
| Processing | Spark (not Flink) | Unified batch+stream, Iceberg integration |
| Language | Scala (for data) | Type safety, functional transformations |

---

## On-Premises Resources

Safari Circuits has on-prem hardware and VM infrastructure available for:
- **Claude Scaling:** Running local models, agents, or batch processing
- **Safari Trace:** Application hosting, data processing, development environments
- **Caching:** Redis, in-memory caching as needed
- **Databases:** PostgreSQL instances for operational data
- **Development/Test:** Non-production workloads

Infrastructure can spin up caching and database resources on demand. Contact Infrastructure team when cloud costs or latency make on-prem preferable.

---

## When Infrastructure Is Required

If work requires database, caching, or streaming:
1. Check if existing infrastructure covers the need
2. Discuss GitHub + Azure DevOps + Infrastructure integration
3. Follow Kubernetes deployment patterns (on-prem or cloud)
4. Document in architecture reference
