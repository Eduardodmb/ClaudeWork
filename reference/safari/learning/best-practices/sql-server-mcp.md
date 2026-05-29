---
domain: infrastructure
last_updated: 2026-01-19
status: planned
backlog_item: 43
---

# SQL Server MCP for Claude Code

## Purpose

Enable Claude Code to connect to SQL Server databases (BeFirst, Fourth Shift) for metadata inference and data architecture work.

## Options

### Option A: Existing MCP Packages

| Package | Maintainer | Features |
|---------|------------|----------|
| `@nicholasareed/mssql-mcp-server` | Community | Query execution, basic schema |
| `@modelcontextprotocol/server-mssql` | Official examples | Reference implementation |

### Option B: Custom MCP (Recommended)

Build a lightweight MCP tailored to Safari Circuits needs:

```
safari-sqlserver-mcp/
├── src/
│   ├── index.ts          # MCP entry point
│   ├── connection.ts     # Connection pool management
│   ├── tools/
│   │   ├── listTables.ts
│   │   ├── describeTable.ts
│   │   ├── runQuery.ts
│   │   ├── getStoredProcs.ts
│   │   └── getProcDefinition.ts
│   └── resources/
│       └── schema.ts     # Expose schema as MCP resource
├── package.json
├── tsconfig.json
└── README.md
```

## Proposed Tools

| Tool | Purpose | Parameters |
|------|---------|------------|
| `list_databases` | List accessible databases | - |
| `list_tables` | List tables in database | database, schema? |
| `describe_table` | Get columns, types, constraints | database, schema, table |
| `run_query` | Execute read-only SQL | database, query, max_rows? |
| `get_stored_procs` | List stored procedures | database, schema? |
| `get_proc_definition` | Get procedure SQL text | database, schema, proc_name |
| `get_views` | List views | database, schema? |
| `get_view_definition` | Get view SQL text | database, schema, view_name |

## Configuration

```json
// settings.local.json
{
  "mcpServers": {
    "sqlserver": {
      "command": "node",
      "args": ["C:/Users/dkmcintyre/safari-sqlserver-mcp/dist/index.js"],
      "env": {
        "MSSQL_BEFIRST_SERVER": "server-name",
        "MSSQL_BEFIRST_DATABASE": "PROD_MES",
        "MSSQL_BEFIRST_AUTH": "windows",
        "MSSQL_FOURTHSHIFT_SERVER": "on-prem-server",
        "MSSQL_FOURTHSHIFT_DATABASE": "FS_PROD",
        "MSSQL_FOURTHSHIFT_AUTH": "sql"
      }
    }
  }
}
```

## Security Considerations

1. **Read-only access** - MCP should only have SELECT permissions
2. **Connection pooling** - Reuse connections, limit pool size
3. **Query timeout** - Enforce 30-second timeout
4. **Row limits** - Default max 1000 rows, configurable
5. **No DDL** - Block CREATE, ALTER, DROP statements
6. **Audit logging** - Log all queries for compliance

## Implementation Notes

### Connection String Templates

```typescript
// Windows Auth (BeFirst)
const windowsAuth = `
  Server=${server};
  Database=${database};
  Trusted_Connection=Yes;
  TrustServerCertificate=True;
`;

// SQL Auth (Fourth Shift)
const sqlAuth = `
  Server=${server};
  Database=${database};
  User Id=${username};
  Password=${password};
  TrustServerCertificate=True;
`;
```

### Information Schema Queries

```sql
-- List tables with row counts
SELECT
  t.TABLE_SCHEMA,
  t.TABLE_NAME,
  t.TABLE_TYPE,
  p.rows as ROW_COUNT
FROM INFORMATION_SCHEMA.TABLES t
LEFT JOIN sys.partitions p
  ON OBJECT_ID(t.TABLE_SCHEMA + '.' + t.TABLE_NAME) = p.object_id
  AND p.index_id IN (0, 1)
WHERE t.TABLE_CATALOG = @database
ORDER BY t.TABLE_SCHEMA, t.TABLE_NAME;

-- Describe table with extended properties
SELECT
  c.COLUMN_NAME,
  c.DATA_TYPE,
  c.CHARACTER_MAXIMUM_LENGTH,
  c.NUMERIC_PRECISION,
  c.NUMERIC_SCALE,
  c.IS_NULLABLE,
  c.COLUMN_DEFAULT,
  ep.value as DESCRIPTION
FROM INFORMATION_SCHEMA.COLUMNS c
LEFT JOIN sys.extended_properties ep
  ON ep.major_id = OBJECT_ID(@schema + '.' + @table)
  AND ep.minor_id = COLUMNPROPERTY(OBJECT_ID(@schema + '.' + @table), c.COLUMN_NAME, 'ColumnId')
  AND ep.name = 'MS_Description'
WHERE c.TABLE_SCHEMA = @schema
  AND c.TABLE_NAME = @table
ORDER BY c.ORDINAL_POSITION;

-- Get foreign key relationships
SELECT
  fk.name as FK_NAME,
  tp.name as PARENT_TABLE,
  cp.name as PARENT_COLUMN,
  tr.name as REFERENCED_TABLE,
  cr.name as REFERENCED_COLUMN
FROM sys.foreign_keys fk
INNER JOIN sys.foreign_key_columns fkc
  ON fk.object_id = fkc.constraint_object_id
INNER JOIN sys.tables tp ON fkc.parent_object_id = tp.object_id
INNER JOIN sys.columns cp
  ON fkc.parent_object_id = cp.object_id
  AND fkc.parent_column_id = cp.column_id
INNER JOIN sys.tables tr ON fkc.referenced_object_id = tr.object_id
INNER JOIN sys.columns cr
  ON fkc.referenced_object_id = cr.object_id
  AND fkc.referenced_column_id = cr.column_id
WHERE tp.name = @table;
```

## Integration with /safari:infer-metadata

```
/safari:infer-metadata --source=befirst
    │
    ├─→ mcp_sqlserver.list_tables(database='PROD_MES')
    │   └─→ Returns list of tables
    │
    ├─→ For each table of interest:
    │   └─→ mcp_sqlserver.describe_table(table=name)
    │       └─→ Returns columns, types, constraints
    │
    ├─→ mcp_sqlserver.get_views(database='PROD_MES')
    │   └─→ Returns list of views
    │
    ├─→ For key views:
    │   └─→ mcp_sqlserver.get_view_definition(view=name)
    │       └─→ Returns SQL text for alias/join analysis
    │
    └─→ Claude analyzes results, suggests OpenMetadata entries
```

## Databases to Configure

| Database | Server | Purpose |
|----------|--------|---------|
| PROD_MES | BeFirst server | MES production data |
| PROD_DWH | BeFirst server | MES data warehouse |
| FS_PROD | Fourth Shift on-prem | Legacy ERP |

## Next Steps

1. [ ] Choose implementation approach (existing package vs custom)
2. [ ] Get server names and credentials from IT
3. [ ] Build/configure MCP
4. [ ] Test with `/safari:infer-metadata`
5. [ ] Document in CLAUDE.md

---

*Backlog Item: #43 - Create SQL Server MCP for database connectivity*
