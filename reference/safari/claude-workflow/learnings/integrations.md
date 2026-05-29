# Integration Learnings

Tool, MCP, and system integration insights. Auto-aggregated from team sessions.

---

## MCP Servers

### Azure DevOps MCP
- Work item creation requires CMMI state flow (Proposed → Active → Closed)
- Tasks need `Custom.CompletionSummary` when closing
- Use `wit_my_work_items` to query assigned items
- Link commits with `wit_add_artifact_link`

### Power BI Desktop MCP
- Install to user directory when lacking admin access
- Releases in `Releases/` folder, not GitHub Releases
- Use `manage_model_connection` to connect before other operations

### Teams MCP
- Requires Microsoft OAuth authentication
- Use `search_messages` for cross-team search
- `get_my_mentions` for catching up on mentions

### Chrome DevTools MCP
- Use for YouTube transcript extraction
- WebFetch can't access YouTube directly
- Good for authenticated web automation

---

## GitHub Integration

### Auto-Linking to Azure DevOps
- Include `#[work-item-id]` in commit messages
- Use `AB#[id]` in PR descriptions for automatic linking
- Branch naming: `[type]/[work-item-id]-[slug]`

### Context Sync
- Local state: `~/.claude/state/`
- Team state: `organizational-docs/shared/claude-workflow/`
- Sync on session end if learnings exist

---

## Infrastructure

### PostgreSQL
- Use for operational metadata only, not analytics
- Team standard - don't propose MySQL alternatives

### Kafka (Confluent)
- Schema Registry for technical validation
- Event streaming for real-time data

### OpenMetadata
- Business catalog and lineage
- AI agent context source

---

## Template for New Entries

```markdown
### [Integration Name]
**Setup:**
**Key Learnings:**
- Point 1
- Point 2
**Gotchas:**
- Gotcha 1
**Source:** [user/session]
```
