---
command: infer-metadata
aliases: [safari:infer-metadata, infer]
description: Infer OpenMetadata entries from source system artifacts
category: data-architecture
user_invocable: true
---

# /safari:infer-metadata

Agentic skill that analyzes source system artifacts and suggests OpenMetadata entries for glossary terms, lineage, quality rules, and data mart structures.

## Trigger Phrases

- "infer metadata from..."
- "analyze this SQL for metadata"
- "extract glossary terms"
- "build lineage from..."
- "suggest data mart structure"

## Usage

```
/safari:infer-metadata [--source=SOURCE] [--type=TYPE]

Sources:
  befirst    - Connect to PROD_MES or PROD_DWH SQL Server
  plex       - Use Plex API (requires API key)
  fourthshift - Connect to Fourth Shift SQL Server
  powerbi    - Extract from open Power BI model (via MCP)
  sql        - Analyze provided SQL text
  file       - Analyze SQL file at path

Types:
  schema     - Crawl information_schema
  sql        - Parse SQL queries/views/procs
  api        - Analyze API definitions
  pbi        - Extract Power BI measures/relationships
  all        - Run all applicable analysis
```

## Workflow

```
1. IDENTIFY SOURCE
   │
   ├─→ User specifies source or provides SQL directly
   │
   ▼
2. EXTRACT ARTIFACTS
   │
   ├─→ Schema: Connect to DB, query information_schema
   ├─→ SQL: Parse provided queries for aliases, CTEs, JOINs
   ├─→ API: Read OpenAPI specs or sample payloads
   ├─→ Power BI: Use MCP to read model schema
   │
   ▼
3. ANALYZE & INFER
   │
   ├─→ Alias Extraction
   │   "o.order_date AS 'Order Date'" → Glossary: "Order Date"
   │
   ├─→ CTE Structure Analysis
   │   "WITH customer_dim AS (...)" → Dimension table candidate
   │
   ├─→ JOIN Pattern Analysis
   │   "orders JOIN customers" → Lineage relationship
   │
   ├─→ Aggregation Detection
   │   "SUM(amount)" → Metric with formula
   │
   ├─→ Constraint Inference
   │   "NOT NULL, CHECK" → Quality rules
   │
   ▼
4. GENERATE SUGGESTIONS
   │
   ├─→ Format as OpenMetadata entities (YAML or API calls)
   │
   ▼
5. PRESENT FOR REVIEW
   │
   ├─→ Show user inferred glossary terms
   ├─→ Show suggested table/column descriptions
   ├─→ Show lineage relationships
   ├─→ Show quality rules
   │
   ▼
6. HUMAN APPROVAL
   │
   ├─→ User approves, edits, or rejects each suggestion
   │
   ▼
7. PUBLISH (when OpenMetadata is available)
   │
   └─→ Create/update entities via OpenMetadata API
```

## SQL Analysis Examples

### Alias Extraction

**Input:**
```sql
SELECT
  o.order_date AS "Order Date",
  c.customer_name AS "Customer",
  SUM(oi.quantity * oi.unit_price) AS "Total Revenue"
FROM orders o
JOIN customers c ON o.customer_id = c.id
```

**Output:**
```yaml
glossary_terms:
  - name: Order Date
    description: Date when order was placed
    source_column: orders.order_date

  - name: Customer
    description: Customer name
    source_column: customers.customer_name

  - name: Total Revenue
    description: Sum of order line item values
    formula: SUM(quantity * unit_price)
    type: metric

lineage:
  - from: orders
    to: revenue_report
    relationship: aggregation

  - from: customers
    to: revenue_report
    relationship: join
```

### CTE Structure Analysis

**Input:**
```sql
WITH customer_dim AS (
  SELECT id, name, region, segment FROM customers
),
order_facts AS (
  SELECT
    order_date,
    customer_id,
    SUM(amount) as total_amount,
    COUNT(*) as order_count
  FROM orders
  GROUP BY order_date, customer_id
)
SELECT ...
```

**Output:**
```yaml
data_mart_candidates:
  - name: dim_customer
    type: dimension
    columns: [id, name, region, segment]
    grain: customer_id

  - name: fact_orders
    type: fact
    columns: [order_date, customer_id, total_amount, order_count]
    grain: order_date + customer_id
    measures:
      - name: total_amount
        aggregation: SUM
      - name: order_count
        aggregation: COUNT
```

## Information Schema Crawl

When connected to a database, extract:

```sql
-- Tables
SELECT TABLE_NAME, TABLE_TYPE
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = @schema;

-- Columns
SELECT
  TABLE_NAME,
  COLUMN_NAME,
  DATA_TYPE,
  IS_NULLABLE,
  COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = @schema;

-- Constraints
SELECT
  tc.TABLE_NAME,
  tc.CONSTRAINT_TYPE,
  kcu.COLUMN_NAME,
  ccu.TABLE_NAME AS REFERENCES_TABLE
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
  ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
LEFT JOIN INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE ccu
  ON tc.CONSTRAINT_NAME = ccu.CONSTRAINT_NAME
WHERE tc.TABLE_SCHEMA = @schema;
```

## Power BI Integration

Uses existing `powerbi-desktop MCP` to extract:

| Element | Metadata Value |
|---------|----------------|
| Measures | Metric formulas, business names |
| Calculated columns | Derived field logic |
| Relationships | Table lineage, cardinality |
| Column aliases | Business-friendly names |
| Hierarchies | Drill-down structures |

## Output Formats

### YAML (for version control)

```yaml
# gold_production_daily_metrics.yaml
table:
  name: gold.production_daily_metrics
  domain: manufacturing
  tier: gold
  description: Daily production KPIs by work cell

columns:
  - name: production_date
    glossary: production_date
    description: Calendar date of production
    safari_analyze: dimension, filterable, date_hierarchy

  - name: first_pass_yield
    glossary: first_pass_yield
    description: Percentage passing QC first time
    formula: (good_units / total_units) * 100
    safari_analyze: metric, aggregation=avg, format=percentage

lineage:
  upstream:
    - silver.production_events
  downstream:
    - Safari Analyze
    - Production Dashboard
```

### Inline SQL Comments (for BI/AI readiness)

```sql
-- @domain: manufacturing
-- @tier: gold
-- @owner: dallas.mcintyre@safaricircuits.com
-- @safari_analyze: indexed, primary_table=true

CREATE TABLE gold.production_daily_metrics (
    -- @glossary: production_date
    -- @safari_analyze: dimension, filterable
    production_date DATE NOT NULL,

    -- @glossary: first_pass_yield
    -- @formula: (good_units / total_units) * 100
    -- @safari_analyze: metric, aggregation=avg
    first_pass_yield DECIMAL(5,2) NOT NULL
);
```

## Connection Requirements

### BeFirst SQL Server
- Server: (to be provided)
- Databases: PROD_MES, PROD_DWH
- Auth: Windows or SQL auth
- Permissions: SELECT on INFORMATION_SCHEMA

### Plex API
- API Key: (to be provided by user)
- Endpoints: Orders, Inventory, Shipments

### Fourth Shift SQL Server
- Server: On-prem (to be configured)
- Auth: Windows or SQL auth
- Permissions: SELECT on INFORMATION_SCHEMA

### Power BI
- Already configured via powerbi-desktop MCP
- Requires .pbix open in Power BI Desktop

## Integration with Workflow

This skill integrates with the standard work session:

```
/start-work
    │
    ├─→ "Let's build the production metrics mart"
    │
    ├─→ /safari:infer-metadata --source=befirst --type=schema
    │   └─→ Crawl PROD_MES information_schema
    │   └─→ Present table/column suggestions
    │
    ├─→ /safari:infer-metadata --source=sql
    │   └─→ Paste existing report SQL
    │   └─→ Extract aliases, formulas, lineage
    │
    ├─→ Review and approve suggestions
    │
    ├─→ Generate Spark job skeleton using approved metadata
    │
    └─→ Continue implementation
```

## Related

- `/groom` - Groom backlog items for data architecture work
- `/validate-work` - Validate metadata completeness before committing
- `/end-work` - Document metadata changes in session summary

---

*Reference: data_management_architecture_reference.md v2.0*
*Backlog: #42 - Build `/safari:infer-metadata` agentic skill*
