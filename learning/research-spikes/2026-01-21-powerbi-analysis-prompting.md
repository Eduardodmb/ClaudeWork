---
title: Power BI Model Analysis via MCP - Agentic Prompting Research
date: 2026-01-21
type: research-spike
status: documented
safari_relevance: high
promotion_candidate: true
tags: [powerbi, fabric, data-mart, mcp, agentic-workflow]
---

# Research Spike: Power BI Model Analysis via MCP

## Objective

Understand what agentic Power BI analysis produces when given minimal prompting, and capture patterns for reuse.

## Trigger

User request: "launch power bi mcp and analyse this file for the goal of improving our data mart in fabric"

## Agentic Discovery Process

### Phase 1: Connection Establishment
1. Check MCP connection status (`manage_model_connection` → `list`)
2. Wait for user to open PBIX in Desktop
3. Re-check and select model (`manage_model_connection` → `select`)

### Phase 2: Model Discovery (Parallel)
Executed in parallel for efficiency:
- `get_model_info` → schema (tables, columns, expressions)
- `get_model_info` → data_sources (connection strings, M queries)
- `list_objects` → tables (visible/hidden, column counts)
- `list_objects` → relationships (active/inactive, cardinality)
- `list_objects` → measures (DAX expressions, formatting)

### Phase 3: Deep Inspection
- `list_objects` → partitions with expressions (reveals M/Power Query code)
- `get_vertipaq_stats` → storage efficiency analysis
- Targeted table analysis for specific concerns

## Key Findings from This Session

### Model: Leadership Team Dashboard
- **Source**: Fabric Lakehouse `LH_RAW` via SQL endpoint
- **Connection**: `smhx5zrdbenedcb56xjutexrna-dcyc22f57jwujojmga643ysmie.datawarehouse.fabric.microsoft.com`

### Critical Issues Identified

| Issue | Severity | Impact |
|-------|----------|--------|
| ~100 auto-generated LocalDateTables | Critical | Massive model bloat |
| Tables with 150-182 columns | High | Storage waste, slow refresh |
| Only 3 DAX measures | Medium | Implicit measure reliance |
| Power Query transformations in PBIX | Medium | Should be in Lakehouse |
| Multiple inactive relationships | Low | Potential modeling confusion |

### Recommended Architecture
```
Bronze (LH_RAW) → Gold Views (slim, star schema) → Semantic Model
                       ↓
              Single DIM_DATE table
```

## Reusable Analysis Checklist

When analyzing any Power BI model for data mart improvement:

1. **Identify Data Source**
   - Is it Fabric (Lakehouse/Warehouse)?
   - What's the connection pattern?
   - Is it Import or DirectQuery?

2. **Detect Date Table Explosion**
   - Count hidden `LocalDateTable_*` tables
   - Recommend shared DIM_DATE if >5 auto-tables

3. **Assess Table Width**
   - Flag dimensions >50 columns
   - Flag facts >30 columns
   - Recommend slim views

4. **Review Measure Library**
   - Count explicit measures
   - Identify implicit measure reliance
   - Recommend measure consolidation

5. **Check Transformations Location**
   - Are there Power Query transformations?
   - Should they move upstream to Lakehouse?

6. **Relationship Health**
   - Count active vs inactive relationships
   - Identify modeling confusion patterns

## MCP Tools Used

| Tool | Purpose |
|------|---------|
| `manage_model_connection` | Connect to Power BI Desktop |
| `get_model_info` | Schema and data sources |
| `list_objects` | Tables, relationships, measures, partitions |
| `get_vertipaq_stats` | Storage efficiency |
| `analyze_table` | Specific table deep-dive |

## Session Learnings

1. **Large output handling**: VertiPaq stats and schema can exceed token limits; use saved files + grep/jq
2. **Parallel discovery**: Run independent MCP calls in parallel for speed
3. **M query inspection**: Partition expressions reveal the real data flow
4. **Auto Date/Time**: This setting causes more problems than it solves in enterprise models

## Promotion Path

This spike should evolve into:
- **Skill**: `powerbi-model-analysis` - Systematic model assessment
- **Best Practice**: Add to `data-architecture.md` - Fabric data mart patterns

## Related Context

- Learning: `best-practices/data-architecture.md`
- MCP Reference: `~/.claude/reference/mcp-catalog.md` (Power BI section)
- Fabric Documentation: organizational-docs data services content
