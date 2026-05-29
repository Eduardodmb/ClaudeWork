---
id: BP-DATA-001
title: Data Architecture Best Practices
domain: data
visualization: technical
sensitivity: internal
last_updated: 2026-02-10
---

# Data Architecture Best Practices

## Safari Circuits Headless Data Architecture

### Core Philosophy
> "Build parsimoniously and rigorously. Objects created should be repurposed for multiple needs without remapping or moving data. **Metadata drives the pipeline**, not just documents it."

### Vision
A **metadata-driven streaming architecture** that unifies all enterprise data sources into queryable data marts, with Safari Analyze providing natural language access powered by OpenMetadata's semantic layer.

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Storage | Apache Iceberg | Single table format for all data |
| Streaming | Apache Kafka (Confluent) | Event streaming + Schema Registry |
| Processing | Apache Spark (Scala) | Unified batch + streaming |
| Query | Trino | Federated SQL queries |
| Low-Latency | PostgreSQL | Sub-second operational dashboards |
| Governance | OpenMetadata | Business catalog, lineage, quality, glossary |
| Interface | Safari Analyze | Natural language → data discovery → query |

### Data Source Categories

| Category | Systems |
|----------|---------|
| Enterprise | Plex ERP, Fourth Shift |
| Home Grown | BeFirst MES, internal apps |
| Machine/IoT | Equipment sensors, PLCs |

## Medallion Architecture

### Bronze Layer (Raw)
- Immutable, append-only
- Minimal transformation
- Partitioned by ingestion timestamp

### Silver Layer (Cleaned)
- Validated and deduplicated
- Standardized formats
- Business keys mapped

### Gold Layer (Business-Ready)
- Pre-aggregated for analytics
- Business metrics calculated
- Documented in OpenMetadata
- **BI/AI-ready with inline comments**

## Query Routing (Latency-Based)

| Query Type | SLA | Route To |
|------------|-----|----------|
| Ad-hoc analytics | < 30s | Trino → Iceberg |
| Dashboard refresh | < 5s | Trino → Iceberg (cached) |
| Operational KPI | < 1s | PostgreSQL (materialized) |
| Live streaming | Real-time | Kafka (direct) |

## BI/AI-Ready Data Mart Standard

### Column Comment Annotations

```sql
-- DIMENSION: Work Cell
-- @glossary: work_cell
-- @description: Manufacturing work cell identifier
-- @lineage: silver.production_events.work_cell_id
-- @quality: not_null, foreign_key(dim_work_cell.id)
-- @safari_analyze: dimension, filterable, searchable
-- @synonyms: production_line, cell, station
work_cell_id STRING NOT NULL,
```

### Safari Analyze Annotations

| Annotation | Purpose |
|------------|---------|
| `@safari_analyze: dimension` | Filterable/groupable field |
| `@safari_analyze: metric` | Measurable value |
| `@safari_analyze: searchable` | Indexed for NL search |
| `@safari_analyze: aggregation` | Default aggregation (sum, avg, count) |
| `@synonyms` | Alternative names for NL matching |

## Agentic Metadata Inference

### Skill: `/safari:infer-metadata`

Automates OpenMetadata population by parsing source artifacts:

| Source | What We Extract |
|--------|-----------------|
| information_schema | Tables, columns, types, constraints |
| SQL Queries | Aliases → glossary, CTEs → fact/dim structure |
| API Definitions | Endpoints → domains, payloads → fields |
| Power BI Reports | Measures, relationships, hierarchies |

### Inference Workflow

```
1. CRAWL: Connect to source, extract artifacts
2. PARSE: Run inference on SQL/schema/APIs
3. SUGGEST: Generate OpenMetadata entities (draft)
4. REVIEW: Human approves/edits suggestions
5. PUBLISH: Finalize in OpenMetadata
```

## Source System Access

| System | Access Method |
|--------|---------------|
| BeFirst MES | SQL Server: PROD_MES, PROD_DWH |
| BeFirst | API + Talend/BI repos |
| Plex ERP | API key |
| Fourth Shift | On-prem SQL Server |
| Power BI | powerbi-desktop MCP |

## OpenMetadata Domains

1. Manufacturing
2. Supply Chain
3. Quality
4. Sales & Customers
5. Finance
6. Human Resources
7. IT & Systems

## Metadata Requirements

### Table-Level (Every Table)
1. Business purpose
2. Business owner
3. Technical owner
4. Domain
5. Tier (Bronze/Silver/Gold)
6. Refresh schedule
7. SLA
8. `@safari_analyze` hints

### Column-Level
1. Business meaning (`@description`)
2. Glossary term (`@glossary`)
3. Lineage (`@lineage`)
4. Quality rules (`@quality`)
5. Safari Analyze hints (`@safari_analyze`)
6. Synonyms (`@synonyms`)

## Key Principles

1. **Metadata Drives Pipelines**
   - OpenMetadata configs drive Spark transforms
   - Not just documentation after the fact

2. **Schema Registry vs OpenMetadata**
   - Schema Registry = Technical validation (at event time)
   - OpenMetadata = Business semantics (at catalog time)

3. **Immutable Bronze**
   - Never update Bronze layer
   - Can always reprocess from source

4. **Latency-Aware Routing**
   - Standard analytics → Trino → Iceberg
   - Operational dashboards → PostgreSQL materialized views

5. **Agentic Metadata Population**
   - Claude Code infers metadata from source artifacts
   - Human-in-the-loop approval

---

*Source: data_management_architecture_reference.md v2.0*
