# Safari MCP - Internal Context Server

Referenced from CLAUDE.md. Full specification for Safari MCP integration.

Safari MCP bridges the Context Governance system with the Model Context Protocol, enabling standardized access to context assets across all LLM interfaces.

| Component | Purpose |
|-----------|---------|
| **Resources** | Read context assets (`safari://context/*`) |
| **Tools** | SCL operations (SELECT, RESOLVE, OPTIMIZE, ALLOCATE, LINK) |
| **Prompts** | Pre-built context queries |

## MCP Resource URIs

| URI Pattern | Content |
|-------------|---------|
| `safari://context/enterprise-policy` | `~/.claude/CLAUDE.md` |
| `safari://context/project/{repo}` | `{repo}/.claude/CLAUDE.md` |
| `safari://context/skill/{name}` | `~/.claude/skills/{name}/SKILL.md` |
| `safari://context/command/{name}` | `~/.claude/commands/{name}.md` |
| `safari://context/learning/{path}` | `~/.claude/learning/{path}` |
| `safari://context/registry` | `~/.claude/state/context-registry.json` |

## MCP Tools

| Tool | Description |
|------|-------------|
| `safari:context_select` | Query context by domain, type, tags, freshness |
| `safari:context_resolve` | Resolve references, detect conflicts |
| `safari:context_optimize` | Fit context to token budget |
| `safari:context_capture` | Store new context with governance |
| `safari:context_quality` | Audit quality metrics |
| `safari:context_lineage` | Query upstream/downstream dependencies |
| `safari:context_promote` | Move through lifecycle stages |

## Benefits

- Unified access to context across Claude Code, API, other LLMs
- Governance enforcement through MCP tool validation
- Multi-client support with standardized interface
- Auditability via context registry

**Full details:** See `~/.claude/learning/best-practices/safari-mcp.md`
