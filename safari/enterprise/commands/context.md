# Context Management

View, manage, and govern context assets in the Safari Circuits AI context ecosystem.

## Purpose

**Context Governance for AI** - Managing context like data governance manages data:
- Catalog all context assets (CLAUDE.md, skills, hooks, state files)
- Track lineage and dependencies between context sources
- Enforce quality standards
- Enable discovery and reuse

## Philosophy: CPI and SCL

**Context Program Interface (CPI)** - Versioned contracts for context:
- Typed context modules with clear boundaries
- Import/export declarations
- Backward compatibility guarantees

**Structured Context Language (SCL)** - Declarative context queries:
- Query context assets by type, tag, domain
- Resolve context for specific tasks
- Optimize context window allocation

## When to Use

| Say | Action |
|-----|--------|
| "show context", "context status" | Display context asset summary |
| "context for [topic]" | Find relevant context for a topic |
| "context health" | Check context quality metrics |
| "context lineage" | Show dependency graph |

---

## Context Asset Types

| Type | Location | Purpose | Governance |
|------|----------|---------|------------|
| **Enterprise Policy** | `~/.claude/CLAUDE.md` | Team-wide standards | Centrally managed |
| **Project Rules** | `{repo}/.claude/CLAUDE.md` | Project-specific | Project owners |
| **Skills** | `~/.claude/skills/`, `{repo}/.claude/skills/` | Reusable capabilities | Skill authors |
| **Commands** | `~/.claude/commands/` | Invocable actions | Workflow owners |
| **State** | `~/.claude/state/` | Runtime context | Auto-managed |
| **Learning** | `~/.claude/learning/` | Best practices | Auto-captured |

---

## Instructions

### 1. Display Context Summary

Show current context health and assets:

```
**Context Dashboard**

**Registry Health:** Green|Yellow|Red
**Total Assets:** {count}
**Last Sync:** {timestamp}

**By Type:**
| Type | Count | Quality | Coverage |
|------|-------|---------|----------|
| Enterprise Policy | 1 | 95% | Complete |
| Project Rules | 3 | 88% | Partial |
| Skills | 47 | 92% | Good |
| Commands | 18 | 100% | Complete |
| Learning Assets | 24 | 78% | Growing |

**Context Window Budget:**
- Current Usage: ~12k tokens (estimated)
- Available: ~180k tokens
- Utilization: 7%

**Recent Changes:**
- [2026-01-19] Added: context-governance-system skill
- [2026-01-19] Updated: CLAUDE.md infrastructure section
```

### 2. Context Discovery

Find context relevant to a topic:

```
CONTEXT_DISCOVER(topic):
  1. Search context registry for matching assets
  2. Rank by relevance score:
     - Exact match in title: +0.50
     - Match in tags: +0.30
     - Match in content: +0.20
     - Recent usage: +0.10

  3. Return top 5 matches with:
     - Asset path
     - Relevance score
     - Summary
     - Last updated
```

### 3. Context Health Check

Evaluate context quality:

```
CONTEXT_HEALTH():
  For each context asset:
    - Freshness: days since last update
    - Completeness: required fields present
    - Consistency: no conflicts with other assets
    - Coverage: topics/domains addressed

  Aggregate into health score (0-100)
  Flag issues requiring attention
```

### 4. Update Context Registry

Maintain `~/.claude/state/context-registry.json`:

```json
{
  "version": "1.0",
  "lastUpdated": "2026-01-19T17:00:00Z",
  "assets": [
    {
      "id": "ctx-001",
      "type": "enterprise-policy",
      "path": "~/.claude/CLAUDE.md",
      "title": "Safari Circuits Team Standards",
      "domain": "governance",
      "tags": ["workflow", "standards", "boris"],
      "tokenEstimate": 8500,
      "quality": {
        "score": 95,
        "lastAudit": "2026-01-19",
        "issues": []
      },
      "lineage": {
        "imports": [],
        "dependents": ["ctx-002", "ctx-003"]
      },
      "metadata": {
        "owner": "team",
        "classification": "internal",
        "lifecycle": "active"
      }
    }
  ],
  "relationships": [
    {
      "from": "ctx-001",
      "to": "ctx-002",
      "type": "extends"
    }
  ]
}
```

---

## SCL Query Examples

Natural language queries that map to context resolution:

| Query | SCL-like Expression | Result |
|-------|---------------------|--------|
| "context for Power BI" | `SELECT * FROM context WHERE tags CONTAINS 'power-bi'` | Power BI MCP section |
| "all active skills" | `SELECT * FROM skills WHERE lifecycle = 'active'` | Skill list |
| "who owns context X" | `SELECT owner FROM context WHERE id = 'X'` | Owner info |
| "context updated this week" | `SELECT * FROM context WHERE updated > NOW() - 7d` | Recent assets |

---

## Governance Principles

Drawing from **OpenMetadata** patterns:

### 1. Ownership
Every context asset has an owner responsible for:
- Quality maintenance
- Currency (keeping up-to-date)
- Access control

### 2. Classification
Context assets are classified by:
- **Domain:** governance, technical, integration, etc.
- **Sensitivity:** public, internal, confidential
- **Lifecycle:** active, deprecated, archived

### 3. Lineage
Track dependencies between context:
- What does this context depend on?
- What depends on this context?
- Impact of changes

### 4. Quality
Automated quality checks:
- Schema validation (required fields)
- Freshness thresholds
- Conflict detection
- Coverage gaps

### 5. Discovery
Enable finding relevant context:
- Full-text search
- Tag-based filtering
- Domain browsing
- Usage-based recommendations

---

## Output Format

```
## Context Status

**Registry Health:** [Green|Yellow|Red]

**Asset Summary:**
| Type | Count | Quality | Issues |
|------|-------|---------|--------|
| ... | ... | ... | ... |

**Top Context for Current Work:**
1. [Asset Name] - [relevance %] - [path]
2. ...

**Quality Alerts:**
- ⚠️ [Asset] needs update (stale > 30d)
- ⚠️ [Asset] missing owner

**Actions:**
- `/context-add` - Add new context asset
- `/context-lineage [asset]` - View dependencies
- `/context-quality` - Full quality report
```

---

## Integration

| Command | Context Integration |
|---------|---------------------|
| `/start-work` | Load relevant context for current task |
| `/checkpoint` | Update context usage metrics |
| `/end-work` | Capture new context learnings |
| `/status` | Include context health indicator |

---

## Related

- `/context-add` - Add context to governance system
- `/context-lineage` - View context dependencies
- `/context-quality` - Full quality audit
- `~/.claude/state/context-registry.json` - Context catalog
