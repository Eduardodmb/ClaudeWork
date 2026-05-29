# Idea Backlog

Central repository for captured ideas from brain dumps and ad-hoc inputs.

## Summary

| Status | Count |
|--------|-------|
| Captured | 31 |
| Needs Clarification | 2 |
| Groomed | 2 |
| Ready | 0 |
| In Progress | 0 |
| Promoted to ADO | 0 |
| Completed | 5 |

**New:** 6 items added from headless data architecture planning (2026-01-19)

## Active Items

### P0 - Urgent

*All P0 items completed*

### P1 - High Priority

| # | Item | Domain | Type | Effort | Status |
|---|------|--------|------|--------|--------|
| 2 | Auto-update skills from session learnings without invoking commands | infrastructure | feature | L | needs-clarification |
| 3 | Consolidate safari-docs-portal into safari-trace mono repo | safari-trace | feature | S | ✅ completed |
| 4 | Build domain-specific cockpits (Manufacturing, IT, Finance, etc.) | safari-trace | feature | XL | captured |
| 5 | Dynamic roadmap generation from GitHub + DevOps | safari-pm | feature | L | captured |
| 8 | Seamless start/end work without manual best practice loading | infrastructure | feature | M | captured |
| 15 | Install meeting MCP (Fireflies/Otter/MeetGeek) for transcript access | safari-trace | feature | S | ✅ completed |

### P2 - Medium Priority

| # | Item | Domain | Type | Effort | Status |
|---|------|--------|------|--------|--------|
| 17 | Research public Claude Code skills for world-class Safari Trace interface | safari-trace | research | M | captured |
| 6 | Project summaries with drill-down (user → leadership → budget/timeline) | safari-pm | feature | L | captured |
| 7 | ERP/MES drill-down view for specific project tracking | safari-pm | feature | M | captured |
| 9 | Multi-session/multi-tab orchestration for scattered but related work | infrastructure | research | L | needs-clarification |
| 10 | Brand artifact system for consistent document generation | safari-trace | feature | M | captured |
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

| # | Item | Initiative | Type | Effort | Status |
|---|------|------------|------|--------|--------|
| 18 | Deploy Fourth Shift REST API wrapper (ASP.NET Core) | fourth-shift-api | implementation | XL | captured |
| 19 | Configure Cloudflare Tunnel HA for Planful SQL access | cloudflare-tunnel | implementation | L | captured |
| 20 | Setup Confluent Kafka POC via Cloudflare Tunnel | cloudflare-tunnel | implementation | M | captured |
| 21 | Complete Manufacturing site domain integration (Entra ID) | domain-integration | implementation | XL | captured |
| 22 | Deploy Data Architecture foundation (Kafka + Iceberg) | data-architecture | implementation | XL | captured |

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

| # | Item | Initiative | Type | Effort | Status |
|---|------|------------|------|--------|--------|
| 29 | Build Claude skills for Spark/Scala expertise (encode in GitHub) | skills-strategy | feature | L | captured |
| 30 | Document Fourth Shift SDK patterns as Claude skill | fourth-shift-api | feature | M | captured |
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

*Last Updated: 2026-01-19 (headless architecture planning)*
*Use `/brain-dump` to add new items*
