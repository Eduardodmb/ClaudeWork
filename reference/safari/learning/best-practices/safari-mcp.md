---
id: BP-MCP-001
title: Safari MCP - Internal Context Server
domain: engineering
visualization: technical
sensitivity: internal
last_updated: 2026-02-10
---

# Safari MCP - Internal Context Server

Safari's internal MCP server that bridges Context Governance with the Model Context Protocol, enabling Claude and other LLMs to interact with organizational context through a standardized interface.

## Overview

Safari MCP transforms context governance operations into MCP resources and tools, providing:
- **Unified access** to context assets across all LLM interfaces
- **Governance enforcement** through MCP tool validation
- **SCL operations** exposed as MCP tools
- **CPI contracts** materialized as typed resources

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         LLM Interface                           │
│            (Claude Code, API, Other MCP Clients)                │
├─────────────────────────────────────────────────────────────────┤
│                        Safari MCP Server                        │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   Resources     │     Tools       │        Prompts              │
│   (Read)        │    (Execute)    │      (Templates)            │
├─────────────────┴─────────────────┴─────────────────────────────┤
│                      Context Registry                           │
│                  context-registry.json                          │
├─────────────────────────────────────────────────────────────────┤
│  CLAUDE.md  │  Skills  │  Commands  │  Learning  │  State      │
└─────────────────────────────────────────────────────────────────┘
```

## MCP Resources

Resources expose context assets as read-only content.

### Resource Types

| URI Pattern | Content | MIME Type |
|-------------|---------|-----------|
| `safari://context/enterprise-policy` | `~/.claude/CLAUDE.md` | text/markdown |
| `safari://context/project/{repo}` | `{repo}/.claude/CLAUDE.md` | text/markdown |
| `safari://context/skill/{name}` | `~/.claude/skills/{name}/SKILL.md` | text/markdown |
| `safari://context/command/{name}` | `~/.claude/commands/{name}.md` | text/markdown |
| `safari://context/learning/{path}` | `~/.claude/learning/{path}` | text/markdown |
| `safari://context/registry` | `~/.claude/state/context-registry.json` | application/json |
| `safari://context/state/phase` | `~/.claude/state/phase.md` | text/markdown |
| `safari://context/state/session` | `~/.claude/state/session.json` | application/json |

### Resource Templates

| Template | Parameters | Description |
|----------|------------|-------------|
| `safari://context/{type}/{name}` | type, name | Access any context asset by type |
| `safari://query?scl={query}` | query (URL encoded) | Execute SCL query as resource |

## MCP Tools

Tools provide operations aligned with the Context Compiler pipeline.

### Core SCL Operations

#### `safari:context_select`

Query context assets using SCL-like syntax.

```typescript
{
  name: "safari:context_select",
  description: "Query context assets by domain, type, tags, or freshness",
  inputSchema: {
    type: "object",
    properties: {
      domain: { type: "string", description: "Filter by domain (governance, technical, integration)" },
      type: { type: "string", enum: ["policy", "skill", "command", "learning", "state"] },
      tags: { type: "array", items: { type: "string" } },
      freshness: { type: "string", enum: ["fresh", "stale", "any"] },
      search: { type: "string", description: "Full-text search" },
      limit: { type: "number", default: 10 }
    }
  }
}
```

#### `safari:context_resolve`

Resolve references and check for conflicts.

```typescript
{
  name: "safari:context_resolve",
  description: "Resolve context references and detect conflicts",
  inputSchema: {
    type: "object",
    properties: {
      assetId: { type: "string", description: "Context asset ID to resolve" },
      includeLineage: { type: "boolean", default: false },
      checkConflicts: { type: "boolean", default: true }
    },
    required: ["assetId"]
  }
}
```

#### `safari:context_optimize`

Optimize context for token budget.

```typescript
{
  name: "safari:context_optimize",
  description: "Summarize and optimize context to fit token budget",
  inputSchema: {
    type: "object",
    properties: {
      content: { type: "string", description: "Context content to optimize" },
      targetTokens: { type: "number", description: "Target token count" },
      preserveStructure: { type: "boolean", default: true }
    },
    required: ["content", "targetTokens"]
  }
}
```

#### `safari:context_allocate`

Route context to appropriate storage.

```typescript
{
  name: "safari:context_allocate",
  description: "Determine where to store new context",
  inputSchema: {
    type: "object",
    properties: {
      content: { type: "string", description: "Context content" },
      domain: { type: "string" },
      confidence: { type: "number", minimum: 0, maximum: 1 },
      suggestedType: { type: "string" }
    },
    required: ["content"]
  }
}
```

#### `safari:context_link`

Connect context assets and update lineage.

```typescript
{
  name: "safari:context_link",
  description: "Link context asset to related assets and update lineage",
  inputSchema: {
    type: "object",
    properties: {
      sourceId: { type: "string" },
      targetId: { type: "string" },
      relationship: { type: "string", enum: ["extends", "imports", "triggers", "generates", "depends"] }
    },
    required: ["sourceId", "targetId", "relationship"]
  }
}
```

### Governance Tools

#### `safari:context_capture`

Capture new context from conversation.

```typescript
{
  name: "safari:context_capture",
  description: "Capture and store new context",
  inputSchema: {
    type: "object",
    properties: {
      content: { type: "string", description: "Context to capture" },
      source: { type: "string", enum: ["conversation", "correction", "explicit"] },
      confidence: { type: "number" },
      domain: { type: "string" },
      tags: { type: "array", items: { type: "string" } }
    },
    required: ["content", "source"]
  }
}
```

#### `safari:context_quality`

Check context quality and freshness.

```typescript
{
  name: "safari:context_quality",
  description: "Audit context quality metrics",
  inputSchema: {
    type: "object",
    properties: {
      assetId: { type: "string", description: "Asset to audit, or 'all'" },
      dimensions: {
        type: "array",
        items: { type: "string", enum: ["freshness", "completeness", "consistency", "efficiency"] }
      }
    }
  }
}
```

#### `safari:context_lineage`

Query context lineage graph.

```typescript
{
  name: "safari:context_lineage",
  description: "Get upstream/downstream dependencies",
  inputSchema: {
    type: "object",
    properties: {
      assetId: { type: "string" },
      direction: { type: "string", enum: ["upstream", "downstream", "both"], default: "both" },
      depth: { type: "number", default: 2 }
    },
    required: ["assetId"]
  }
}
```

#### `safari:context_promote`

Promote context through lifecycle stages.

```typescript
{
  name: "safari:context_promote",
  description: "Promote context from learning to best-practice to standard",
  inputSchema: {
    type: "object",
    properties: {
      assetId: { type: "string" },
      targetStage: { type: "string", enum: ["learning", "best-practice", "standard", "policy"] },
      justification: { type: "string" }
    },
    required: ["assetId", "targetStage"]
  }
}
```

### Session Tools

#### `safari:session_checkpoint`

Create session checkpoint.

```typescript
{
  name: "safari:session_checkpoint",
  description: "Create checkpoint of current session state",
  inputSchema: {
    type: "object",
    properties: {
      focus: { type: "string", description: "Current work focus" },
      progress: { type: "string", description: "Progress summary" },
      pendingItems: { type: "array", items: { type: "string" } }
    }
  }
}
```

#### `safari:session_load`

Load session context.

```typescript
{
  name: "safari:session_load",
  description: "Load context for new or resuming session",
  inputSchema: {
    type: "object",
    properties: {
      sessionId: { type: "string", description: "Session to resume, or 'new'" },
      loadState: { type: "boolean", default: true },
      loadPhase: { type: "boolean", default: true }
    }
  }
}
```

## MCP Prompts

Pre-built prompts for common context operations.

| Prompt Name | Arguments | Description |
|-------------|-----------|-------------|
| `safari:discover-context` | `{topic}` | Find relevant context for a topic |
| `safari:explain-decision` | `{decision}` | Explain why a standard exists |
| `safari:suggest-learning` | `{pattern}` | Suggest capturing a pattern |
| `safari:audit-context` | `{scope}` | Generate quality audit report |
| `safari:resolve-conflict` | `{asset1, asset2}` | Help resolve conflicting context |

## Implementation

### Server Configuration

```json
{
  "mcpServers": {
    "safari-context": {
      "command": "node",
      "args": ["~/.claude/mcp-servers/safari-mcp/index.js"],
      "env": {
        "CONTEXT_ROOT": "~/.claude",
        "REGISTRY_PATH": "~/.claude/state/context-registry.json",
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

### File Structure

```
~/.claude/mcp-servers/safari-mcp/
├── index.js              # MCP server entry
├── resources/
│   ├── context.js        # Resource handlers
│   └── registry.js       # Registry access
├── tools/
│   ├── scl.js           # SCL operations
│   ├── governance.js    # Governance tools
│   └── session.js       # Session tools
├── prompts/
│   └── templates.js     # Prompt templates
└── lib/
    ├── compiler.js      # Context compiler
    ├── quality.js       # Quality scoring
    └── lineage.js       # Lineage graph
```

### State Management

| File | Purpose | MCP Access |
|------|---------|------------|
| `context-registry.json` | Asset catalog | Read/Write |
| `phase.md` | Current phase | Read/Write |
| `session.json` | Session state | Read/Write |
| `work-tracker.json` | DevOps sync | Read |

## Integration Points

### With Claude Code Commands

| Command | Safari MCP Tool |
|---------|-----------------|
| `/context` | `safari:context_select` |
| `/context-add` | `safari:context_capture` |
| `/context-lineage` | `safari:context_lineage` |
| `/context-quality` | `safari:context_quality` |
| `/checkpoint` | `safari:session_checkpoint` |

### With OpenMetadata

Future integration to sync context assets:

```
Safari MCP → OpenMetadata MCP
    ↓              ↓
Context        Metadata
Assets         Catalog
```

### With DevOps Sync

```
Safari MCP context changes → DevOps work item updates
Safari MCP session events → ADO task tracking
```

## Security Considerations

### Access Control

| Scope | Access Level |
|-------|--------------|
| Enterprise Policy | Read-only |
| Project Rules | Read-only |
| Skills/Commands | Read-only |
| Learning | Read/Write |
| Session State | Read/Write |

### Validation

- All writes validated against schema
- Conflict detection before updates
- Quality gates enforced on capture
- Audit trail in registry

## Evolution Roadmap

### Phase 1: Foundation (Current)
- [ ] Basic resource access
- [ ] Core SCL tools
- [ ] Session checkpoint/load

### Phase 2: Governance
- [ ] Quality scoring tools
- [ ] Lineage tracking
- [ ] Promotion workflow

### Phase 3: Integration
- [ ] OpenMetadata sync
- [ ] DevOps integration
- [ ] Multi-client support

### Phase 4: Intelligence
- [ ] Auto-capture engine
- [ ] Context recommendations
- [ ] Conflict resolution

## Benefits

| Benefit | Description |
|---------|-------------|
| **Standardized Access** | Any MCP client can access Safari context |
| **Governance Enforcement** | Tools validate all context operations |
| **Multi-LLM Support** | Same context available to Claude, GPT, etc. |
| **Auditability** | All operations logged in registry |
| **Composability** | Safari MCP can compose with other MCPs |

## Related

- [Context Governance Strategy](../../organizational-docs/shared/strategy/context-governance-strategy.md)
- [Context Governance Skill](~/.claude/skills/context-governance/SKILL.md)
- [MCP Specification](https://modelcontextprotocol.io/)
