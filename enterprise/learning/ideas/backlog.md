# Idea Backlog

Central repository for captured ideas from brain dumps and ad-hoc inputs.

## Summary

| Status | Count |
|--------|-------|
| Captured | 23 |
| Needs Clarification | 2 |
| Groomed | 2 |
| Ready | 0 |
| In Progress | 1 |
| Parked | 1 |
| Promoted to ADO | 10 |
| Completed | 5 |

**New:** Safari Docs PRD completed (2026-01-26) - see `products/safari-docs/PRD.md`
**New:** Unified Agent Model documented - single agent with skill-based routing (2026-01-26)

## Active Items

### P0 - Urgent

*All P0 items completed*

### P1 - High Priority

| # | Item | Domain | Type | Effort | Status | ADO |
|---|------|--------|------|--------|--------|-----|
| 51 | **Session Memory Optimization:** DevOps for structured work, Neo4j graph for context gaps (decisions, dead ends, parking lot, cross-session links) | context-governance | architecture | L | captured | - |
| 48 | **FRONT-OF-MIND:** Execute Context Routing learning path (4 phases) | skills-strategy | learning | M | in-progress | #1052 |
| 2 | Auto-update skills from session learnings without invoking commands | infrastructure | feature | L | needs-clarification | - |
| 3 | Consolidate safari-docs-portal into safari-trace mono repo | safari-trace | feature | S | ✅ completed | - |
| 4 | Build domain-specific cockpits (Manufacturing, IT, Finance, etc.) | safari-trace | feature | XL | promoted to ADO | #1031 |
| 5 | Dynamic roadmap generation from GitHub + DevOps | safari-pm | feature | L | promoted to ADO | #1032 |
| 8 | Seamless start/end work without manual best practice loading | infrastructure | feature | M | promoted to ADO | #1033 |
| 15 | Install meeting MCP (Fireflies/Otter/MeetGeek) for transcript access | safari-trace | feature | S | ✅ completed | - |

### P2 - Medium Priority

| # | Item | Domain | Type | Effort | Status |
|---|------|--------|------|--------|--------|
| 50 | **BeFirst Rebuild:** Re-analyze BeFirst using HumanLayer agent patterns, rebuild per TI app architecture | befirst | implementation | XL | parked |
| 17 | Research public Claude Code skills for world-class Safari Trace interface | safari-trace | research | M | captured |
| 6 | Project summaries with drill-down (user → leadership → budget/timeline) | safari-pm | feature | L | captured |
| 7 | ERP/MES drill-down view for specific project tracking | safari-pm | feature | M | captured |
| 9 | Multi-session/multi-tab orchestration for scattered but related work | infrastructure | research | L | needs-clarification |
| 10 | Brand artifact system for consistent document generation | safari-trace | feature | M | captured |
| 49 | HTML skill in branding skills + doc skills for all doc types | skills-strategy | design-project | L | captured |
| 12 | Install Teams MCP Server (InditexTech or CData) | infrastructure | feature | S | ✅ completed |
| 13 | Connect to Outlook API for email analysis | infrastructure | feature | M | captured |
| 14 | Analyze chats/emails to extract IT strategy insights | safari-analyze | feature | L | captured |
| 16 | Meeting → Work item/document/skill auto-generation | safari-pm | feature | XL | captured |
| 41 | Safari Analyze MVP: AI-Generated DevOps Dashboard | safari-analyze | feature | L | groomed |

### P3 - Low Priority
*None*

---

## Strategic Initiative Work Items (2026-01-18)

*Items extracted from Claude Markdown Files analysis - see `~/.claude/learning/strategic-initiatives-summary.md`*

### Infrastructure / Integration (P1)

| # | Item | Initiative | Type | Effort | Status | ADO |
|---|------|------------|------|--------|--------|-----|
| 18 | Deploy Fourth Shift REST API wrapper (ASP.NET Core) | fourth-shift-api | implementation | XL | promoted to ADO | #1034 |
| 19 | Configure Cloudflare Tunnel HA for Planful SQL access | cloudflare-tunnel | implementation | L | promoted to ADO | #1035 |
| 20 | Setup Confluent Kafka POC via Cloudflare Tunnel | cloudflare-tunnel | implementation | M | promoted to ADO | #1036 |
| 21 | Complete Manufacturing site domain integration (Entra ID) | domain-integration | implementation | XL | promoted to ADO | #1037 |
| 22 | Deploy Data Architecture foundation (Kafka + Iceberg) | data-architecture | implementation | XL | promoted to ADO | #1038 |

### Safari Trace Platform (P1-P2)

| # | Item | Initiative | Type | Effort | Status |
|---|------|------------|------|--------|--------|
| 23 | Integrate Safari Trace with OpenMetadata for entity discovery | safari-trace | feature | L | captured |
| 24 | Complete Safari Studio Claude API integration | safari-trace | feature | M | captured |
| 25 | Implement Safari Trace SSO with Entra ID | safari-trace | feature | M | captured |

### Data Architecture (P1-P2)

| # | Item | Initiative | Type | Effort | Status | Blocked By |
|---|------|------------|------|--------|--------|------------|
| 26 | Design OpenMetadata governance catalog schema | data-architecture | documentation | M | captured | - |
| 27 | Implement Medallion architecture (Bronze/Silver/Gold) | data-architecture | implementation | XL | captured | - |
| 28 | Create Spark streaming jobs for Fourth Shift events | data-architecture | implementation | L | captured | - |
| 35 | Migrate AI productivity metadata from ADO to PostgreSQL | data-architecture | implementation | M | groomed | #22 (PostgreSQL) |
| 42 | Build `/safari:infer-metadata` agentic skill | data-architecture | feature | L | captured | - |
| 43 | Create SQL Server MCP for database connectivity | data-architecture | feature | M | captured | - |
| 44 | Define BI/AI-ready data mart inline comment standard | data-architecture | documentation | S | captured | - |
| 45 | Build first pipeline: BeFirst MES → Bronze → Silver → Gold | data-architecture | implementation | XL | captured | #22 |
| 46 | Implement Safari Analyze index sync with OpenMetadata | data-architecture | feature | L | captured | #26 |
| 47 | Create query routing logic (Trino/PostgreSQL/Kafka) | data-architecture | feature | M | captured | #22 |

**#35 Details:**
- **Description:** Once PostgreSQL is available, migrate AI productivity tracking from ADO to external DB for efficient dashboard queries.
- **Acceptance Criteria:**
  - [ ] Design PostgreSQL schema (ai_productivity_metrics table)
  - [ ] Create migration script for existing ADO metadata
  - [ ] Build sync pattern (Claude logs at task completion)
  - [ ] Validate dashboard queries
  - [ ] Clean up interim ADO metadata artifacts
- **Baseline Estimate:** L (3-5 days solo)
- **Unblocks:** AI productivity dashboards, year-end ROI reporting

**#41 Details:**
- **Description:** Build Safari Analyze MVP demonstrating AI-generated data visualizations from natural language questions. Dashboard pulls from Azure DevOps and renders with Plotly Dash.
- **User Story:** As a Safari IT leader, I can ask analytical questions like "Show me our IT roadmap" and receive an interactive dashboard.
- **Acceptance Criteria:**
  - [ ] Python service with Plotly Dash for visualization
  - [ ] Azure DevOps integration via MCP or REST API
  - [ ] 4 dashboard panels: IT Roadmap, Project Overview, Efficiency Metrics, Strategy Adherence
  - [ ] Embeddable in Safari Trace via iframe or API
  - [ ] Claude can generate/modify dashboard from natural language
- **Tech Stack:** Python 3.11+, Plotly Dash, Azure DevOps API, Docker
- **Baseline Estimate:** L (1 day with Claude assist)
- **Unblocks:** Safari Analyze platform, AI-powered analytics

### Skills / Claude Skills Strategy (P1)

| # | Item | Initiative | Type | Effort | Status | ADO |
|---|------|------------|------|--------|--------|-----|
| 29 | Build Claude skills for Spark/Scala expertise (encode in GitHub) | skills-strategy | feature | L | promoted to ADO | #1039 |
| 30 | Document Fourth Shift SDK patterns as Claude skill | fourth-shift-api | feature | M | promoted to ADO | #1040 |
| 31 | Create Cloudflare Tunnel service onboarding template | cloudflare-tunnel | documentation | S | captured |
| 32 | Design `/learn` or `/educate` skill for gradual personal education | skills-strategy | feature | M | captured |
| 33 | Integrate education ritual into `/start-work` and `/end-work` flows | skills-strategy | feature | S | captured |
| 34 | Update data architecture docs - remove Confluent references | data-architecture | documentation | S | needs-action |
| 36 | Build Safari agent library (planner, code-reviewer, tdd-guide) | skills-strategy | feature | L | captured |
| 37 | Create Safari rules (coding-style, testing, git-workflow) | skills-strategy | feature | M | captured |
| 38 | Implement hooks for TypeScript validation and formatting | skills-strategy | feature | S | captured |
| 39 | Build `/safari:tdd` command with Safari testing standards | skills-strategy | feature | M | captured |
| 40 | Build `/safari:plan` command with ADO work item integration | skills-strategy | feature | M | captured |

**Reference:** Patterns documented in `~/.claude/learning/best-practices/claude-code-skills-patterns.md`

---

## Promoted Item Details (P1 Batch - 2026-01-21)

**All items below have been promoted to Azure DevOps as work items #1031-#1040.**

**#4 Details:**
- **Description:** Create role-based dashboard cockpits in Safari Trace that surface relevant metrics, documents, and actions for each business domain. Each cockpit aggregates data from DevOps, GitHub, ERP, MES, and internal docs.
- **Acceptance Criteria:**
  - [ ] Manufacturing cockpit: MES metrics, production KPIs, quality dashboards
  - [ ] IT cockpit: DevOps work items, infrastructure status, project health
  - [ ] Finance cockpit: Budget tracking, resource allocation, cost centers
  - [ ] Common framework: Reusable cockpit components (widgets, layouts)
  - [ ] Data integration: Pull from ADO, GitHub, Fourth Shift, BeFirst MES
  - [ ] Role-based access: Users see only their domain(s)
- **Dependencies:** #22 (Data Architecture), #23 (OpenMetadata integration)
- **ADO Type:** Feature

**#5 Details:**
- **Description:** Auto-generate visual roadmaps from GitHub milestones and ADO work items. Roadmap updates in real-time as work progresses.
- **Acceptance Criteria:**
  - [ ] Pull milestones/epics from GitHub repos
  - [ ] Pull features/requirements from ADO
  - [ ] Generate timeline visualization (Gantt or swimlane)
  - [ ] Auto-refresh on data changes (webhook or polling)
  - [ ] Export to PNG/PDF for leadership presentations
  - [ ] Embed in Safari Trace dashboard
- **Dependencies:** ADO MCP, GitHub API access
- **ADO Type:** Feature

**#8 Details:**
- **Description:** Claude automatically loads context, skills, and state on session start without requiring explicit `/start-work` invocation. Session closure auto-checkpoints.
- **Acceptance Criteria:**
  - [ ] Auto-detect session start (first message trigger)
  - [ ] Load `~/.claude/state/phase.md` silently
  - [ ] Check MCP connections and report issues
  - [ ] Auto-run `/end-work` on session close signals ("bye", "done", etc.)
  - [ ] Checkpoint state every 50 turns or on topic shift
  - [ ] No manual command invocation required
- **Dependencies:** None (infrastructure only)
- **ADO Type:** Task

**#18 Details:**
- **Description:** Create ASP.NET Core REST API that wraps Fourth Shift COM/SDK, exposing inventory, orders, and production data as modern JSON endpoints.
- **Acceptance Criteria:**
  - [ ] ASP.NET Core 8 Web API project
  - [ ] Fourth Shift SDK integration (COM interop)
  - [ ] Endpoints: `/inventory`, `/orders`, `/production`, `/customers`
  - [ ] Authentication: Entra ID JWT validation
  - [ ] Swagger/OpenAPI documentation
  - [ ] Docker containerization for deployment
  - [ ] Cloudflare Tunnel exposure (internal only)
  - [ ] Rate limiting and error handling
- **Dependencies:** Fourth Shift SDK access, Cloudflare Tunnel (#19)
- **ADO Type:** Requirement

**#19 Details:**
- **Description:** Setup high-availability Cloudflare Tunnel to securely expose on-prem SQL Server for Planful integration without VPN.
- **Acceptance Criteria:**
  - [ ] Cloudflare Tunnel daemon on 2+ servers (HA)
  - [ ] TCP tunnel for SQL Server port 1433
  - [ ] Access policies: Planful IPs only
  - [ ] TLS encryption end-to-end
  - [ ] Monitoring and alerting on tunnel health
  - [ ] Documentation for ops team
- **Dependencies:** Cloudflare Zero Trust account, SQL Server access
- **ADO Type:** Task

**#20 Details:**
- **Description:** Prove out Confluent Cloud Kafka connectivity from on-prem systems through Cloudflare Tunnel for streaming architecture.
- **Acceptance Criteria:**
  - [ ] Confluent Cloud cluster provisioned (dev environment)
  - [ ] Cloudflare Tunnel configured for Kafka bootstrap servers
  - [ ] Producer test: Send messages from on-prem app
  - [ ] Consumer test: Read messages from cloud consumer
  - [ ] Latency and throughput benchmarks documented
  - [ ] Security review: mTLS, SASL configuration
- **Dependencies:** #19 (Cloudflare Tunnel HA), Confluent Cloud account
- **ADO Type:** Task

**#21 Details:**
- **Description:** Migrate manufacturing site users and computers to Entra ID hybrid join, enabling SSO and modern authentication.
- **Acceptance Criteria:**
  - [ ] Entra Connect sync configured for manufacturing OU
  - [ ] Hybrid Azure AD join for workstations
  - [ ] SSO enabled for Safari applications
  - [ ] MFA rollout plan for shop floor users
  - [ ] Legacy app compatibility testing (MES, barcode scanners)
  - [ ] User training materials
  - [ ] Rollback plan documented
- **Dependencies:** Entra ID P1 licenses, network connectivity
- **ADO Type:** Requirement

**#22 Details:**
- **Description:** Stand up core data platform: Confluent Kafka for streaming, Apache Iceberg for lakehouse storage, Trino for query federation.
- **Acceptance Criteria:**
  - [ ] Confluent Kafka cluster (3 brokers minimum)
  - [ ] Schema Registry configured
  - [ ] Apache Iceberg catalog (REST or Hive metastore)
  - [ ] Trino cluster with Iceberg connector
  - [ ] Object storage (MinIO or S3-compatible)
  - [ ] Medallion architecture: Bronze/Silver/Gold schemas
  - [ ] First test pipeline: ADO events → Kafka → Iceberg
  - [ ] Monitoring: Kafka lag, Trino queries, storage metrics
- **Dependencies:** Infrastructure resources, Confluent license
- **ADO Type:** Requirement

**#29 Details:**
- **Description:** Create Claude Code skills that encode Spark/Scala best practices, enabling AI-assisted data engineering work.
- **Acceptance Criteria:**
  - [ ] `spark-patterns` skill: Common transformations, UDFs, window functions
  - [ ] `iceberg-operations` skill: Table maintenance, snapshots, compaction
  - [ ] `scala-idioms` skill: Functional patterns, implicits, type classes
  - [ ] Example prompts for each skill
  - [ ] Integration with Safari data architecture docs
  - [ ] Published to `~/.claude/skills/`
- **Dependencies:** Data Architecture knowledge base
- **ADO Type:** Task

**#30 Details:**
- **Description:** Encode Fourth Shift ERP SDK knowledge as Claude skill for AI-assisted integration development.
- **Acceptance Criteria:**
  - [ ] SDK initialization and connection patterns
  - [ ] Common object queries (inventory, orders, BOM)
  - [ ] Transaction handling best practices
  - [ ] Error codes and troubleshooting guide
  - [ ] Example integrations (C#, Python via COM)
  - [ ] Published to `~/.claude/skills/fourth-shift/`
- **Dependencies:** Fourth Shift SDK documentation access
- **ADO Type:** Task

---

## In-Progress Learning Paths

### #48: Context Routing Framework (FRONT-OF-MIND)

**Description:** Self-study learning path to master context routing decisions. Determines what should be a skill vs command vs hook, where domain knowledge goes, and how context linkage works.

**ADO Feature:** #1052 - Context Routing Framework Implementation

**Learning Phases:**

| Phase | Task | ADO | Status | Output |
|-------|------|-----|--------|--------|
| 1 | Study Dex Horthy ACE-FCA + Anthropic guide | #1053 | pending | Notes in worktree |
| 2 | Review internal Safari docs | #1054 | pending | Gap analysis |
| 3 | Hands-on practice (create 2 skills, 2 commands) | #1055 | pending | Working artifacts |
| 4 | Measure + iterate | #1056 | pending | Quality metrics |

**Reference Materials:**
- Best Practice: `~/.claude/learning/best-practices/context-routing.md`
- Shareable Doc: `organizational-docs/deliverables/internal/context-routing-framework.html`
- HumanLayer ACE-FCA: https://github.com/humanlayer/advanced-context-engineering-for-coding-agents
- Anthropic Guide: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

**Key Decision Trees:**
1. Knowledge Routing: Universal → Project → Domain → Idea → Ephemeral
2. Action Routing: MCP → Hook → Skill → Command → CLAUDE.md rule

**Success Criteria:**
- [ ] Can route any new context to correct location on first try
- [ ] Skill vs Command distinction is automatic
- [ ] Context quality score > 85%

---

## Completed

| # | Item | Domain | Type | Completed | Output |
|---|------|--------|------|-----------|--------|
| 1 | Define coherent Safari IT strategy doc driven by Safari Trace as agentic OS | safari-trace | documentation | 2026-01-18 | `inputs/safari-it-strategy-draft.md` |
| 3 | Consolidate safari-docs-portal into safari-trace mono repo | safari-trace | feature | 2026-01-18 | Already done; marked deprecated |
| 11 | Write and send ERP/MES strategy doc to leadership | safari-docs | documentation | 2026-01-18 | `inputs/erp-mes-strategy-leadership.md` |
| 12 | Install Teams MCP Server | infrastructure | feature | 2026-01-18 | `@floriscornel/teams-mcp` configured |
| 15 | Install meeting MCP (Fireflies) | safari-trace | feature | 2026-01-18 | `@props-labs/mcp/fireflies` configured |

---

## Brain Dump History

### 2026-01-18 Brain Dump #1

**Theme:** Safari Trace as Agentic Operating System

**Items Captured:** 16
**Domains:** safari-trace (5), safari-pm (4), infrastructure (5), safari-docs (1), safari-analyze (1)

| # | Item | Domain | Type | Priority | Effort | Status |
|---|------|--------|------|----------|--------|--------|
| 1 | Define coherent Safari IT strategy doc driven by Safari Trace as agentic OS | safari-trace | documentation | P0 | M | ✅ completed |
| 2 | Auto-update skills from session learnings without invoking commands | infrastructure | feature | P1 | L | needs-clarification |
| 3 | Consolidate safari-docs-portal into safari-trace mono repo | safari-trace | feature | P1 | S | ✅ completed |
| 4 | Build domain-specific cockpits (Manufacturing, IT, Finance, etc.) | safari-trace | feature | P1 | XL | captured |
| 5 | Dynamic roadmap generation from GitHub + DevOps | safari-pm | feature | P1 | L | captured |
| 6 | Project summaries with drill-down (user → leadership → budget/timeline) | safari-pm | feature | P2 | L | captured |
| 7 | ERP/MES drill-down view for specific project tracking | safari-pm | feature | P2 | M | captured |
| 8 | Seamless start/end work without manual best practice loading | infrastructure | feature | P1 | M | captured |
| 9 | Multi-session/multi-tab orchestration for scattered but related work | infrastructure | research | P2 | L | needs-clarification |
| 10 | Brand artifact system for consistent document generation | safari-trace | feature | P2 | M | captured |
| 11 | Write and send ERP/MES strategy doc to leadership | safari-docs | documentation | P0 | S | ✅ completed |
| 12 | Install Teams MCP Server | infrastructure | feature | P2 | S | ✅ completed |
| 13 | Connect to Outlook API for email analysis | infrastructure | feature | P2 | M | captured |
| 14 | Analyze chats/emails to extract IT strategy insights | safari-analyze | feature | P2 | L | captured |
| 15 | Install meeting MCP (Fireflies) for transcript access | safari-trace | feature | P1 | S | ✅ completed |
| 16 | Meeting → Work item/document/skill auto-generation | safari-pm | feature | P2 | XL | captured |

**Raw Input:**
> i'm worried all of my work the past 3 days is too scattered and that I haven't landed on a coherent safari it strategy that is driven by an agentic operating system (safari trace). This is good in some ways because I want to stress test multiple users running multiple sessions and that all of our work is complimentary and doesn't conflict with an overall strategy. I want this to happen naturally as we work in the terminal without having to invoke slash commands or skills, i simply want the skills updated as we learn, develop and interact with you. I also want all of this work to be managed in github and devops and i want to build domain specific cockpits in safari trace that incorporate things i've talked about like agentic doc management and visualization, roadmap generation from github and devops that updates dynamically, project management summarizes, user summaries and leadership summaries around budget, timelines and resources. there also needs to be drill down capabilities to specific projects like things related to our ERP and MES needs. I want to start and end work easily without having to load best practices. I want to open many tabs and run many tasks that will be scattered in concept but related to overall needs. I want to consolidate safari docs and trace into the mono repo you mentioned. I want to create brand artifacts so that I can prompt for differnt document types and have consistent branding (safari studio was meant to solve this). I want to send an erp/mes strategy doc to my leadership based on our current stategy. I want to connect to teams and outlook and have you analyze some of my chats and emails to enhance our overall it strategy. I want to make a teams claude plugin that functions like read ai to listen to meetings and update project plans, edit work items and create documents/skills/edit md files with context that comes up in meetings.

---

### 2026-01-19 Headless Architecture Planning

**Theme:** Metadata-Driven Streaming Architecture

**Items Captured:** 6
**Domain:** data-architecture

| # | Item | Type | Effort | Status |
|---|------|------|--------|--------|
| 42 | Build `/safari:infer-metadata` agentic skill | feature | L | captured |
| 43 | Create SQL Server MCP for database connectivity | feature | M | captured |
| 44 | Define BI/AI-ready data mart inline comment standard | documentation | S | captured |
| 45 | Build first pipeline: BeFirst MES → Bronze → Silver → Gold | implementation | XL | captured |
| 46 | Implement Safari Analyze index sync with OpenMetadata | feature | L | captured |
| 47 | Create query routing logic (Trino/PostgreSQL/Kafka) | feature | M | captured |

**#42 Details:**
- **Description:** Claude Code skill that infers metadata from source system artifacts (SQL queries, information_schema, API specs, Power BI reports) and suggests OpenMetadata entries.
- **Acceptance Criteria:**
  - [ ] SQL parser extracts aliases, CTEs, JOINs → glossary/lineage
  - [ ] Information schema crawler connects to SQL Server
  - [ ] Power BI integration via existing MCP
  - [ ] OpenMetadata API client for entity creation
  - [ ] Human-in-the-loop approval workflow
- **Source Access:** BeFirst (PROD_MES, PROD_DWH), Plex API, Fourth Shift SQL Server, Power BI MCP

**#44 Details:**
- **Description:** Define standard for inline SQL comments that encode metadata for Safari Analyze (dimensions, metrics, synonyms, formulas).
- **Acceptance Criteria:**
  - [ ] `@glossary`, `@description`, `@lineage` annotations
  - [ ] `@safari_analyze: dimension|metric|searchable` annotations
  - [ ] `@synonyms` for natural language matching
  - [ ] Example gold table DDL with full annotations
- **Reference:** `data_management_architecture_reference.md` v2.0

---

---

## Research Spikes

Research spikes capture agentic exploration patterns for future skill development.

| Date | Topic | Status | Promoted To |
|------|-------|--------|-------------|
| 2026-01-21 | Context Routing Decision Framework | documented | `learning/best-practices/context-routing.md` |
| 2026-01-21 | Power BI Model Analysis via MCP | documented | `skills/powerbi-model-analysis` |

**Location:** `~/.claude/learning/research-spikes/`

**Spike Process:** Minimal prompt → Agentic exploration → Document patterns → Extract skill

---

*Last Updated: 2026-01-21 (P1 batch promoted to ADO #1031-#1040, research spike concept added)*
*Use `/brain-dump` to add new items*
*Use research spikes for agentic exploration capture*
