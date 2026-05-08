# MCP Integration Catalog

Reference documentation for all configured MCP servers. Claude reads this when working with specific integrations.

---

## Power BI Desktop

Claude Code can interact with Power BI Desktop models via the powerbi-desktop MCP.

| Setting | Value |
|---------|-------|
| MCP Name | `powerbi-desktop` |
| Executable | `C:\Users\dkmcintyre\PowerBI-MCP\powerbi-desktop-mcp.exe` |
| Version | 2.0.10 (Full - 26 tools) |
| Scope | Local project |

**Usage:**
1. Open Power BI Desktop with a .pbix file
2. Ask Claude to "list available Power BI models" or "connect to model 1"
3. Claude can then explore schema, run DAX, modify measures, etc.

**Source:** [maxanatsko/pbi-desktop-mcp-public](https://github.com/maxanatsko/pbi-desktop-mcp-public)

---

## Microsoft 365 (Softeria)

Claude Code can interact with Microsoft 365 services via the Softeria ms-365-mcp-server. This unified MCP replaces separate Outlook and Teams MCPs.

| Setting | Value |
|---------|-------|
| MCP Name | `ms-365` |
| Package | `@softeria/ms-365-mcp-server` |
| Auth | OAuth 2.0 Device Code Flow |
| Mode | `--org-mode` (work accounts) |
| Trust Tier | 2 - Approved (well-established commercial entity) |
| Publisher | [Softeria](https://softeria.com) |

**Coverage:**

| Service | Capabilities |
|---------|-------------|
| **Outlook Email** | List/read/send/delete messages, folders, drafts, move messages |
| **Teams** | Chats, channels, team members, messaging |
| **Calendar** | List/create/update/delete events, calendar views |
| **OneDrive** | File operations |
| **Excel** | Workbook operations |
| **OneNote** | Notebooks and pages |
| **To Do** | Tasks and task lists |
| **Planner** | Plans and tasks |
| **Contacts** | Outlook contacts |
| **SharePoint** | Available in org-mode |

**First-Time Setup:**
1. On first use, Claude triggers device code authentication
2. Visit the URL shown and enter the code
3. Sign in with your Safari Circuits Microsoft 365 account
4. Grant the requested permissions

**Source:** [Softeria/ms-365-mcp-server](https://github.com/Softeria/ms-365-mcp-server) (439 ⭐, MIT license)

---

## Microsoft Entra ID (Official)

Claude Code can query Microsoft Entra ID directory data via Microsoft's official MCP Server for Enterprise.

| Setting | Value |
|---------|-------|
| MCP Name | `microsoft-entra` |
| Endpoint | `https://mcp.svc.cloud.microsoft/enterprise` |
| Transport | HTTP (remote) |
| Auth | OAuth 2.0 via Azure AD |
| Status | **Public Preview** |
| Publisher | Microsoft (trusted) |

**Available Tools:**

| Tool | Purpose |
|------|---------|
| `microsoft_graph_suggest_queries` | RAG-based Graph API query suggestions |
| `microsoft_graph_get` | Execute read-only Graph API calls |
| `microsoft_graph_list_properties` | Retrieve entity schemas |

**Queryable Data (Read-Only):**
- Users and user properties
- Groups and memberships
- Applications and service principals
- Devices
- Administrative reports
- PIM data (requires Entra ID P2)

**Setup - Step 1: Grant Permissions (PowerShell Admin)**

```powershell
# Install the module
Install-Module Microsoft.Entra.Beta -Force -AllowClobber

# Connect with required scopes
Connect-Entra -Scopes 'Application.ReadWrite.All', 'DelegatedPermissionGrant.ReadWrite.All'

# Grant permissions to Claude (predefined client)
Grant-EntraBetaMCPServerPermission -ApplicationName Claude
```

**Setup - Step 2: Add to Claude Code**

```bash
claude mcp add --transport http microsoft-entra https://mcp.svc.cloud.microsoft/enterprise
```

Or add to `~/.claude.json`:
```json
{
  "mcpServers": {
    "microsoft-entra": {
      "type": "http",
      "url": "https://mcp.svc.cloud.microsoft/enterprise"
    }
  }
}
```

**Setup - Step 3: Authenticate**

Run `/mcp` in Claude Code to trigger browser-based Azure AD login. Tokens are cached and auto-refreshed.

**Limits:**
- 100 calls/minute/user
- Subject to Graph API throttling
- Public cloud only (no GCC/sovereign)

**Activity Monitoring (Kusto):**
```kusto
MicrosoftGraphActivityLogs | where AppId == "e8c77dc2-69b3-43f4-bc51-3213c9d915b4"
```

**Sources:**
- [Microsoft MCP Server Overview](https://learn.microsoft.com/en-us/graph/mcp-server/overview)
- [Grant-EntraBetaMcpServerPermission](https://learn.microsoft.com/en-us/powershell/module/microsoft.entra.beta.applications/grant-entrabetamcpserverpermission)
- [Manage MCP Server Permissions](https://learn.microsoft.com/en-us/powershell/entra-powershell/how-to-manage-mcp-server-permissions)

---

## Fireflies Meeting Transcripts

Claude Code can access meeting transcripts via the Fireflies.ai MCP server.

| Setting | Value |
|---------|-------|
| MCP Name | `fireflies` |
| Package | `@props-labs/mcp/fireflies` |
| Auth | API key (from Fireflies Settings > API) |

**Available Tools:**

| Tool | Purpose |
|------|---------|
| `fireflies_get_transcripts` | List transcripts with date filtering |
| `fireflies_get_transcript_details` | Get full transcript with speakers/metadata |
| `fireflies_search_transcripts` | Search by keywords |
| `fireflies_generate_summary` | Create bullet or paragraph summaries |

**First-Time Setup:**
1. Log into [Fireflies.ai](https://fireflies.ai)
2. Go to Settings > API
3. Generate/copy your API key
4. Claude will prompt for the key on first use

**Alternative Meeting MCPs:**

| Service | MCP |
|---------|-----|
| MeetGeek | [meetgeekai/meetgeek-mcp-server](https://github.com/meetgeekai/meetgeek-mcp-server) |
| Fellow | [Fellow MCP](https://help.fellow.ai/en/articles/12622641-fellow-s-mcp-server) |
| Fathom | [druellan/Fathom-Simple-MCP](https://github.com/druellan/Fathom-Simple-MCP) |

**Source:** [Props-Labs/fireflies-mcp](https://github.com/Props-Labs/fireflies-mcp)

---

## Chrome Browser

Claude Code can control Chrome for browser automation, web scraping, and video transcript extraction.

### Two Integration Options

| Option | Use Case | How to Enable |
|--------|----------|---------------|
| **Built-in Chrome** | Full browser control with Claude in Chrome extension | Run `claude --chrome` |
| **Chrome DevTools MCP** | Headless automation, debugging, DevTools access | MCP server (always available) |

### Built-in Chrome Integration (Recommended for Interactive)

**Prerequisites:**
- Google Chrome browser
- Claude in Chrome extension v1.0.36+
- Claude Code CLI v2.0.73+

**Usage:**
```bash
claude --chrome
```

Or enable within session: `/chrome`

**Capabilities:**
- Navigate pages, click elements, type/fill forms
- Read console logs and network requests
- Manage tabs, resize windows
- Record GIFs of browser interactions
- Access authenticated sessions (Google Docs, Gmail, etc.)

### Chrome DevTools MCP (Always Available)

| Setting | Value |
|---------|-------|
| MCP Name | `chrome-devtools` |
| Package | `chrome-devtools-mcp@latest` |
| Transport | stdio |

**Use Cases:**
- Browser automation without extension
- DevTools inspection and debugging
- Performance analysis
- Headless browser control

### When to Use Chrome

**Important:** Browser automation is SLOW (multiple API round-trips per action). Use judgment.

| Task | Use Chrome | Why |
|------|------------|-----|
| YouTube transcript extraction | Yes | `/learn-video` skill, no alternative |
| Complex multi-step workflows | Yes | Automation value outweighs latency |
| Repetitive tasks (10+ iterations) | Yes | One-time setup, repeated benefit |
| Data extraction from many pages | Yes | Programmatic logic needed |
| UI testing and verification | Yes | Systematic verification |
| **One-off simple tasks** | **NO** | User does it 10x faster |
| Adding a user, clicking a few buttons | **NO** | Just tell user what to click |
| Simple page fetches | No | Use WebFetch |

**Rule of thumb:** If a human can do it in under 30 seconds, don't automate it - describe the steps instead.

**Sources:**
- [Claude Code Chrome Docs](https://code.claude.com/docs/en/chrome)
- [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp)

---

## Data Platform MCPs

Claude Code has access to the full Safari Circuits data platform via MCP servers.

### Streaming & Events

#### Confluent Kafka MCP

| Setting | Value |
|---------|-------|
| MCP Name | `confluent-kafka` |
| Package | `@confluentinc/mcp-confluent` |
| Auth | Confluent Cloud API Key/Secret |

**Capabilities:** 37 tools across Kafka, Flink SQL, Schema Registry, Kafka Connect, Tableflow.

**Environment Variables:** `CONFLUENT_CLOUD_API_KEY`, `CONFLUENT_CLOUD_API_SECRET`

**Source:** [confluentinc/mcp-confluent](https://github.com/confluentinc/mcp-confluent)

### Data Storage

#### Apache Iceberg MCP

| Setting | Value |
|---------|-------|
| MCP Name | `iceberg` |
| Package | `iceberg-mcp` (Python) |

**Capabilities:** Get namespaces, list tables, schema/properties/partitions.

**Environment Variables:** `ICEBERG_CATALOG_URI`, `ICEBERG_CATALOG_WAREHOUSE`

**Source:** [ryft-io/iceberg-mcp](https://github.com/ryft-io/iceberg-mcp)

### Query Engines

#### Trino MCP

| Setting | Value |
|---------|-------|
| MCP Name | `trino` |
| Package | `trino-mcp` (Python) |

**Capabilities:** Execute SQL, explore catalogs/schemas/tables.

**Environment Variables:** `TRINO_HOST`, `TRINO_PORT`, `TRINO_USER`, `TRINO_CATALOG`, `TRINO_SCHEMA`

**Source:** [stinkgen/trino_mcp](https://github.com/stinkgen/trino_mcp)

### Data Governance

#### OpenMetadata MCP

| Setting | Value |
|---------|-------|
| MCP Name | `openmetadata` |
| Package | `mcp-server-openmetadata` (Python) |

**Capabilities:** Query metadata, explore lineage, manage glossaries.

**Environment Variables:** `OPENMETADATA_HOST`, `OPENMETADATA_TOKEN`

**Source:** [OpenMetadata MCP](https://open-metadata.org/mcp)

### Databases

#### PostgreSQL MCP (Official)

| Setting | Value |
|---------|-------|
| MCP Name | `postgresql` |
| Package | `@modelcontextprotocol/server-postgres` |

**Capabilities:** Read-only access, schema inspection, query execution.

**Environment Variables:** `POSTGRES_CONNECTION_STRING`

**Source:** [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)

#### SQL Server MCP

| Setting | Value |
|---------|-------|
| MCP Name | `mssql` |
| Package | `mssql-mcp-server` (Python) |

**Capabilities:** List tables, read data, execute SQL queries.

**Environment Variables:** `MSSQL_HOST`, `MSSQL_USER`, `MSSQL_PASSWORD`, `MSSQL_DATABASE`

**Source:** [PyPI mssql-mcp-server](https://pypi.org/project/mssql-mcp-server/)

### Infrastructure

#### Kubernetes MCP

| Setting | Value |
|---------|-------|
| MCP Name | `kubernetes` |
| Package | `mcp-kubernetes-server` (Python) |

**Capabilities:** CRUD on K8s resources, natural language cluster queries.

**Environment Variables:** `KUBECONFIG` (default: `~/.kube/config`)

**Source:** [containers/kubernetes-mcp-server](https://github.com/containers/kubernetes-mcp-server)

#### Spark History Server MCP

| Setting | Value |
|---------|-------|
| MCP Name | `spark-history` |
| Package | `mcp-apache-spark-history-server` (Python) |

**Capabilities:** 18 analysis tools, job performance, AI-powered debugging.

**Environment Variables:** `SPARK_HISTORY_SERVER_URL`

**Source:** [kubeflow/mcp-apache-spark-history-server](https://github.com/kubeflow/mcp-apache-spark-history-server)

### Data Transformation

#### dbt MCP

| Setting | Value |
|---------|-------|
| MCP Name | `dbt` |
| Package | `dbt-mcp` (via uvx) |

**Capabilities:** Execute dbt CLI, explore models/tests/docs, query Semantic Layer.

**Environment Variables:** `DBT_PROJECT_DIR`, `DBT_PROFILES_DIR`

**Source:** [dbt-labs/dbt-mcp](https://github.com/dbt-labs/dbt-mcp)

---

## Observability & Monitoring

### Grafana MCP (Official)

| Setting | Value |
|---------|-------|
| MCP Name | `grafana` |
| Package | `mcp-grafana` (Go binary) |
| Auth | Service account token |
| Maintainer | Grafana Labs (official) |

**Prerequisites:** Grafana 9.0+

**Available Tools:**

| Category | Capabilities |
|----------|--------------|
| **Dashboards** | Search, get by UID, create/update, summary views, JSONPath extraction |
| **Prometheus** | PromQL queries (instant/range), metric metadata, label discovery |
| **Loki** | LogQL queries, log/metric queries, label/pattern discovery |
| **Alerting** | List/create/update/delete alert rules, view contact points |
| **OnCall** | Schedule and user management |
| **Incidents** | Create and manage incidents |
| **Sift** | Error pattern and slow request investigations |
| **Admin** | Teams, users, roles, permissions (disabled by default) |

**Configuration:**

```json
{
  "mcpServers": {
    "grafana": {
      "command": "mcp-grafana",
      "args": ["--transport", "stdio"],
      "env": {
        "GRAFANA_URL": "https://your-instance.grafana.net",
        "GRAFANA_API_KEY": "your-service-account-token"
      }
    }
  }
}
```

**Key Flags:**

| Flag | Purpose |
|------|---------|
| `--disable-write` | Read-only mode (safe for exploration) |
| `--enabled-tools` | Limit to specific tool categories |
| `--disable-<category>` | Exclude tools to save context window |
| `--transport` | stdio, SSE, or streamable-http |

**RBAC Requirements:**
- Built-in "Editor" role covers most use cases
- Granular: `datasources:*`, `dashboards:*`, `alert.rules:read/write`

**Source:** [grafana/mcp-grafana](https://github.com/grafana/mcp-grafana)
