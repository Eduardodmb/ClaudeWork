# MCP Trust Policy (ENFORCED)

Referenced from CLAUDE.md. Full trust policy for MCP server installation and usage.

Only install and use MCPs from trusted sources. This policy protects against supply chain attacks and ensures enterprise security compliance.

## Trusted Sources (Tier 1 - Auto-Approved)

| Source Type | Verification | Examples |
|-------------|--------------|----------|
| **Anthropic** | npm scope `@anthropic/*` or `@modelcontextprotocol/*` | `@modelcontextprotocol/server-postgres` |
| **Microsoft** | Domain `mcp.svc.cloud.microsoft/*` or scope `@microsoft/*` | Microsoft Entra MCP |
| **First-Party Vendors** | Publisher org matches product owner | Grafana → `grafana/mcp-grafana`, Confluent → `@confluentinc/mcp-confluent`, Figma → `figma/figma-mcp` |

## Community Sources (Tier 2 - Require Approval)

MCPs from individual developers or unofficial sources require explicit user approval before first use.

| Indicator | Risk Level |
|-----------|------------|
| Publisher ≠ product owner | Medium |
| Low npm/PyPI downloads | Medium |
| No recent commits (>6 months) | Elevated |
| Known security issues | High |

**Verification Checklist (Tier 2):**
- [ ] Publisher identity verified (GitHub profile, company affiliation)
- [ ] Package has reasonable download count (>1,000/month)
- [ ] Repository actively maintained (commits within 6 months)
- [ ] No open security advisories
- [ ] Code reviewed or audited by community

## Claude Behavior

| Tier | Action |
|------|--------|
| **Tier 1** | Install/use without additional confirmation |
| **Tier 2** | WARN user: "This MCP is from [source]. Approve before first use?" |
| **Unknown** | REFUSE and suggest Tier 1 alternative if available |

## Current MCP Inventory

| MCP | Source | Tier | Status |
|-----|--------|------|--------|
| `azure-devops` | `@azure-devops/mcp` | 1 (Microsoft) | Approved |
| `microsoft-entra` | `mcp.svc.cloud.microsoft` | 1 (Microsoft) | Approved |
| `ms-365` | `@softeria/ms-365-mcp-server` | 2 (Commercial) | Approved (2026-02-02) |
| `powerbi-desktop` | `maxanatsko/pbi-desktop-mcp-public` | 2 (Community) | Approved (user-verified) |
| `chrome-devtools` | `chrome-devtools-mcp` | 2 (Community) | Approved (user-verified) |
| `confluent-kafka` | `@confluentinc/mcp-confluent` | 1 (Confluent) | Approved |
| `grafana` | `grafana/mcp-grafana` | 1 (Grafana) | Approved |
| `safari-context` | Safari Circuits internal | 1 (Internal) | Approved |

**Note:** `ms-365` replaces `teams-mcp` (2026-02-02). Provides Outlook email, Teams, Calendar, OneDrive, Excel, OneNote, To Do, Planner, SharePoint via single MCP.

## Adding New MCPs

When user requests a new MCP:
1. **Identify source** - Check npm/PyPI publisher, GitHub org
2. **Classify tier** - Apply trust criteria above
3. **Tier 1**: Proceed with installation
4. **Tier 2**: Present verification checklist, ask for approval
5. **Document** - Add to inventory table above after approval
