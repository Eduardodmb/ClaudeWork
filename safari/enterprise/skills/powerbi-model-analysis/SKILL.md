---
name: powerbi-model-analysis
description: Use when analyzing Power BI models for data mart improvement, identifying optimization opportunities, or assessing model health before Fabric migration
---

# Power BI Model Analysis

## Overview

Systematic assessment of Power BI semantic models using MCP tooling. Identifies architectural issues, storage inefficiencies, and improvement opportunities for Fabric data mart design.

## When to Use

- Analyzing existing PBIX files for optimization
- Planning Fabric Lakehouse/Warehouse migration
- Assessing model health (bloat, wide tables, missing measures)
- Reviewing data source patterns and transformations
- Pre-migration audit for enterprise models

**Not for:** Report design, visual optimization, or DAX performance tuning (separate concerns).

## Quick Reference

| Analysis Phase | MCP Tools | Output |
|----------------|-----------|--------|
| Connect | `manage_model_connection` (list, select) | Active connection |
| Discover | `get_model_info`, `list_objects` | Schema overview |
| Assess | `get_vertipaq_stats`, `analyze_table` | Size/efficiency metrics |
| Inspect | `list_objects` (partitions w/ expressions) | M query patterns |

## Analysis Protocol

### 1. Connection
```
manage_model_connection(operation: "list")  → Find available models
manage_model_connection(operation: "select", model_id: "...")  → Connect
```

### 2. Parallel Discovery
Execute simultaneously:
- `get_model_info(info_type: "schema")` → Tables, columns, measures
- `get_model_info(info_type: "data_sources")` → Connection strings
- `list_objects(type: "tables")` → Table inventory
- `list_objects(type: "relationships")` → Model structure
- `list_objects(type: "measures")` → DAX library

### 3. Issue Detection Checklist

| Check | Red Flag | Threshold |
|-------|----------|-----------|
| Auto Date Tables | `LocalDateTable_*` hidden tables | >5 = needs DIM_DATE |
| Wide Dimensions | Column count | >50 columns |
| Wide Facts | Column count | >30 columns |
| Measure Library | Explicit measure count | <10 for dashboard = sparse |
| Inactive Relationships | `is_active: false` | >3 = modeling confusion |
| PQ Transformations | Non-passthrough M queries | Any = candidate for upstream |

### 4. Data Source Inspection
```
list_objects(type: "partitions", table: "TableName", include_expression: true)
```
Look for:
- Fabric Lakehouse: `Sql.Database("...fabric.microsoft.com", "LH_*")`
- SQL Server: `Sql.Database("server", "database")`
- Inline transformations: `Table.AddColumn`, `Table.DuplicateColumn`

## Common Issues & Recommendations

### Auto Date/Time Explosion
**Symptom:** 50-100+ hidden `LocalDateTable_*` tables
**Impact:** Model bloat, relationship complexity
**Fix:**
1. Disable Auto Date/Time in Power BI options
2. Create single `DIM_DATE` in Lakehouse
3. Relate all date columns to shared dimension

### Wide Table Syndrome
**Symptom:** DIM/FACT tables with 100+ columns
**Impact:** Slow refresh, wasted storage, poor UX
**Fix:** Create slim views in Lakehouse:
```sql
CREATE VIEW gold.DIM_CUSTOMER_SLIM AS
SELECT Customer_Key, Customer_ID, Customer_Name,
       Region, Segment, Credit_Limit
FROM bronze.DIM_CUSTOMER
```

### Implicit Measure Reliance
**Symptom:** Few explicit measures, calculations in visuals
**Impact:** Inconsistent metrics, no governance
**Fix:** Create measures table with explicit DAX

### Transformation in Wrong Layer
**Symptom:** Power Query with `Table.AddColumn`, date parsing
**Impact:** Refresh bottlenecks, duplicated logic
**Fix:** Push transformations to Lakehouse/Warehouse

## Output Template

```markdown
## Model Analysis: [Name]

### Source
- Type: [Fabric Lakehouse | SQL Server | etc.]
- Connection: [endpoint]
- Mode: [Import | DirectQuery | Dual]

### Health Metrics
| Metric | Value | Status |
|--------|-------|--------|
| Visible Tables | X | |
| Hidden Date Tables | X | [OK|WARN|CRITICAL] |
| Total Columns | X | |
| Explicit Measures | X | |
| Relationships | X active, Y inactive | |

### Critical Issues
1. [Issue description + recommendation]

### Recommendations
1. [Prioritized action items]
```

## Related Skills

- `fabric-lakehouse-design` - Upstream data architecture
- `dax-measure-library` - Measure organization patterns

## Source

Research spike: `~/.claude/learning/research-spikes/2026-01-21-powerbi-analysis-prompting.md`
