# Architectural Objectives for Context

Referenced from CLAUDE.md. Full specification for context management architecture.

Two driving principles govern context enhancement:

## 1. Context Management (Operations & Governance)

How context is accessed, validated, and controlled:

| Layer | Purpose | Components |
|-------|---------|------------|
| **CPI** | Packaging | Versioned contracts, exports, compatibility |
| **SCL** | Operations | SELECT, RESOLVE, OPTIMIZE, ALLOCATE, LINK |
| **Governance** | Enforcement | Ownership, Classification, Lineage, Quality, Discovery, Access |

## 2. Context Evolution (Lifecycle Progression)

How context matures from idea to governed standard:

```
Capture → Structure → Validate → Promote → Enforce
   ↓          ↓          ↓          ↓         ↓
 Ideas    Learnings   Skills   Standards   Policy
```

| Dimension | Measures |
|-----------|----------|
| **Quality** | Freshness, completeness, consistency, token efficiency |
| **Lineage** | Upstream dependencies, downstream impacts |
| **Discovery** | Tags, domains, full-text search |

## 3. Context Storage (Neo4j Graph Database)

The context backend is a **headless, LLM-agnostic graph database** — Neo4j Community Edition via Docker Compose.

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Database** | Neo4j Community Edition | Native graph; Cypher queries; free |
| **Deployment** | Docker Compose (on-prem) | Persistent volumes, backup/restore, env configs |
| **Architecture** | Headless store + adapters | Graph DB is the platform; MCP is one adapter |
| **Multi-LLM** | Adapter pattern | Claude (MCP), Gemini (future), REST (generic) |
| **Migration** | JSON → Neo4j | `context-registry.json` migrated to graph nodes/edges |

**Why graph over relational/document:**
- Context is inherently relational (skills depend on learnings, domains contain skills, users access domains)
- Graph traversal answers "what context is relevant?" naturally via relationship hops
- LLM-agnostic tags (`llm:claude`, `llm:gemini`, `llm:universal`) filter at query time
- 4-tier resolution (Personal > Domain > Project > Enterprise) maps to graph depth

**Epic tracking:** #1128 → Feature #1130 (Neo4j Context Graph Database)

## Reference Architecture

**Definitive specification:** `organizational-docs/deliverables/internal/context-governance-whitepaper.html`

The whitepaper defines:
- Three-layer architecture (CPI → SCL → Governance)
- Industry statistics on context management ROI
- Safari MCP integration patterns
- Implementation roadmap phases
