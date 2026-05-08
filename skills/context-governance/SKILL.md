# Context Governance Skill

Auto-capture, manage, and govern context assets across the Safari Circuits AI ecosystem.

## Metadata

```yaml
id: skill-context-governance
name: Context Governance
version: 1.0.0
domain: governance
tags: [context, governance, cpi, scl, auto-capture]
author: Safari Circuits
created: 2026-01-19
```

## Purpose

This skill enables **self-evolving context governance**:
- Automatically captures valuable context from conversations
- Maintains context quality and lineage
- Enables CPI (Context Program Interface) and SCL (Structured Context Language)
- Integrates with OpenMetadata governance patterns

## Activation

This skill is **always active** in the background. It provides:
- Silent auto-capture of learnings and patterns
- Context health monitoring
- Integration with workflow commands

### Explicit Invocation

| Say | Action |
|-----|--------|
| "manage context", "context governance" | Show governance dashboard |
| "capture this as context" | Explicit context capture |
| "context for [topic]" | Context discovery |

---

## Core Capabilities

### 1. Auto-Capture Engine

Monitors conversation for high-value context:

```
AUTO_CAPTURE_ENGINE():
  While conversation active:
    1. Analyze last N turns for signals

    Capture Signals:
    ─────────────────
    | Signal | Confidence | Action |
    |--------|------------|--------|
    | User correction | 0.95 | Capture learning |
    | "Remember that..." | 0.90 | Capture explicitly |
    | Repeated pattern (3x) | 0.85 | Suggest skill |
    | Tool/MCP setup | 0.90 | Capture integration |
    | Error + resolution | 0.88 | Capture learning |
    | Best practice stated | 0.80 | Capture learning |
    | Domain expertise | 0.70 | Suggest capture |

    2. If signal confidence >= threshold (0.75):
       - Generate structured context
       - Validate quality gates
       - Route to appropriate storage
       - Update registry

    3. If confidence 0.50-0.74:
       - Queue for end-session review
```

### 2. Context Compiler

Transform natural language into structured context:

```
CONTEXT_COMPILER(input):
  PARSE:
    - Extract key assertions
    - Identify domain/topic
    - Detect relationships to existing context

  RESOLVE:
    - Check for conflicts with existing context
    - Resolve references to other assets
    - Validate against schema

  OPTIMIZE:
    - Summarize if too verbose
    - Remove redundancy
    - Structure for token efficiency

  ALLOCATE:
    - Assign to appropriate storage location
    - Estimate token cost
    - Check budget constraints

  LINK:
    - Connect to related context
    - Update lineage graph
    - Register in catalog
```

### 3. CPI (Context Program Interface)

Versioned contracts for context assets:

```yaml
# CPI Contract Example
contract:
  name: infrastructure-standard
  version: "1.0.0"
  domain: infrastructure
  exports:
    - database: PostgreSQL
    - streaming: Kafka
    - container: Kubernetes
  compatibility:
    minVersion: "1.0.0"
    deprecated: []
  usage:
    import: "from infrastructure-standard import database"
```

### 4. SCL (Structured Context Language)

Query context assets:

```sql
-- SCL Examples

-- Find all context about Power BI
SELECT * FROM context
WHERE tags CONTAINS 'power-bi'
   OR domain = 'integration'
ORDER BY quality DESC;

-- Get active commands
SELECT path, title, tokenEstimate
FROM context
WHERE type = 'command'
  AND lifecycle = 'active';

-- Find stale context
SELECT * FROM context
WHERE lastUpdated < NOW() - INTERVAL '30 days'
  AND stable = false;

-- Impact analysis
SELECT dependents.*
FROM context c
JOIN relationships r ON c.id = r.from
JOIN context dependents ON r.to = dependents.id
WHERE c.id = 'ctx-enterprise-001';
```

### 5. Quality Enforcement

Continuous quality monitoring:

```
QUALITY_ENFORCER():
  On context change:
    1. Validate schema
    2. Check for conflicts
    3. Verify token budget
    4. Update quality score

  Periodically:
    1. Scan for stale assets
    2. Detect unused context
    3. Find optimization opportunities
    4. Generate health report
```

---

## Integration Points

### With Workflow Commands

| Command | Context Governance Integration |
|---------|-------------------------------|
| `/start-work` | Load relevant context, check health |
| `/checkpoint` | Auto-capture pending context |
| `/end-work` | Review captured context, update registry |
| `/status` | Include context health indicator |
| `/reminder` | Context-aware categorization |

### With OpenMetadata

Future integration to register context assets in OpenMetadata:

```yaml
# Context as OpenMetadata Entity
entity:
  type: ContextAsset
  name: enterprise-policy
  description: Team-wide standards
  owner: team
  tags:
    - governance
    - workflow
  lineage:
    upstream: []
    downstream:
      - project-rules
  quality:
    tests:
      - freshness < 30d
      - completeness = 100%
```

---

## State Management

### Context Registry

Located at `~/.claude/state/context-registry.json`:
- Asset catalog with metadata
- Relationship graph
- Quality metrics
- Audit history

### Capture Queue

Temporary storage for pending captures:
- High-confidence: Auto-saved
- Medium-confidence: Queued for review
- Low-confidence: Discarded

---

## Governance Principles

Based on **OpenMetadata** patterns:

### 1. Ownership
Every context asset has an owner accountable for:
- Accuracy and currency
- Quality maintenance
- Access control decisions

### 2. Classification
Assets classified by:
- **Domain:** governance, technical, integration, etc.
- **Sensitivity:** public, internal, confidential
- **Lifecycle:** active, deprecated, archived
- **Stability:** stable (no auto-update) or evolving

### 3. Lineage
Track context flow:
- Where did this context originate?
- What depends on this context?
- What would break if this changes?

### 4. Quality
Automated quality dimensions:
- Freshness (last updated)
- Completeness (required fields)
- Consistency (no conflicts)
- Efficiency (tokens per value)

### 5. Discovery
Enable finding relevant context:
- Full-text search
- Tag-based filtering
- Domain browsing
- Usage-based recommendations

---

## Evolution Roadmap

### Phase 1: Foundation (Current)
- [x] Context registry structure
- [x] Basic commands (/context, /context-add, etc.)
- [x] Manual capture workflow
- [x] Quality scoring
- [x] Safari MCP specification

### Phase 2: Safari MCP Implementation
- [ ] Safari MCP server scaffolding (Node.js)
- [ ] Resource handlers for context assets
- [ ] Core SCL tools (SELECT, RESOLVE, OPTIMIZE)
- [ ] Session tools (checkpoint, load)
- [ ] Signal detection engine
- [ ] Pattern recognition for skills

### Phase 3: CPI/SCL
- [ ] CPI contract schema
- [ ] SCL query parser
- [ ] Cross-context imports
- [ ] Version management
- [ ] Governance tools via MCP

### Phase 4: Integration
- [ ] OpenMetadata sync
- [ ] Context as metadata entities
- [ ] Lineage visualization
- [ ] Quality dashboards
- [ ] Multi-LLM support

---

## Related

- `/context` - Context dashboard command
- `/context-add` - Add context command
- `/context-lineage` - Lineage visualization
- `/context-quality` - Quality audit
- `~/.claude/state/context-registry.json` - Context catalog
- `~/.claude/learning/best-practices/safari-mcp.md` - Safari MCP specification
- `organizational-docs/shared/assets/diagrams/safari-mcp-architecture.svg` - Architecture diagram
