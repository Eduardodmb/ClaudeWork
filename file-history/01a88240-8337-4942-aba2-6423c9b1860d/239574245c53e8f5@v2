---
topic: befirst-multi-repo-development
created: 2026-05-12
updated: 2026-05-12
tags: [befirst, safari-circuits, architecture, multi-repo, development-workflow]
validated: true
---

# BeFirst Platform: Multi-Repository Development Workflow

## Context

BeFirst Manufacturing Intelligence Platform spans 13 interconnected repositories at Safari Circuits. When developing in one repository, you often need to check other repositories to ensure correct functionality and understand the full data flow.

This is critical because changes in one repo (especially databases) can break functionality in multiple consuming repos.

## Repository Structure

All repositories located in: `S:\01_Repos\`

```
BeFirst Platform (13 repositories)
├── Presentation Layer (3)
│   ├── BeFirst_Portal              # ASP.NET MVC 5 - Main web UI (18 areas)
│   ├── BeFirst_Production          # WinForms - Floor monitoring
│   └── BeFirst_Planning_Tool       # WinForms - Production planning
├── Application Layer (4)
│   ├── BeFirst_APIs                # ASP.NET Core 7.0 - REST API (15 controllers)
│   ├── BeFirst_Services            # VB.NET - Windows Services (40+)
│   ├── BeFirst_ICTInline           # Python - Keysight ICT integration
│   └── BeFirst_SSRS                # SSRS - Reporting (54+ dashboards)
├── Integration Layer (1)
│   └── BeFirst_ETL                 # Talend - ETL jobs (40+ modules)
├── Data Layer (4)
│   ├── BeFirst_Database_DWH        # SQL - Data Warehouse (49 tables)
│   ├── BeFirst_Database_MES_Database # SQL - MES hub (824 tables)
│   ├── BeFirst_Database_MACHINES_RESULTS # SQL - Equipment (22 tables)
│   └── BeFirst_Database_TESTERS_RESULTS  # SQL - Test results (4 tables)
└── Documentation (1)
    └── BeFirst_Docs                # This documentation repo
```

## Data Flow Architecture

```
PLEX ERP (Source System)
  ↓
ETL (Talend) + Services (VB.NET)
  ↓
Databases (DWH, MES, MACHINES_RESULTS, TESTERS_RESULTS)
  ↓
APIs (REST) + Services (Background) + SSRS (Reports)
  ↓
Portal (Web) + Production (Desktop) + Planning (Desktop)
```

## Cross-Repository Dependencies

### When Developing In → Must Check

| Developing In | Must Check | Why |
|---------------|-----------|-----|
| **Portal** | APIs, Databases | Portal consumes APIs; validate endpoints exist and schemas match |
| **Portal** | Services | Some Portal features trigger background services; verify contracts |
| **Portal** | Docs (CLAUDE.md) | Architecture overview, patterns, database schemas |
| **APIs** | Databases | APIs query databases directly; verify table schemas, SPs, views |
| **APIs** | Services | Some endpoints trigger Windows Services; verify interfaces |
| **Services** | Databases | Services read/write MES and DWH; verify schemas and permissions |
| **Services** | ETL | Services may depend on ETL-populated tables; verify data |
| **ETL** | Databases | ETL populates DWH and MES; verify target schemas |
| **Databases** | **ALL CONSUMERS** | Schema changes impact Portal, APIs, Services, ETL, SSRS |
| **Production/Planning** | MES Database | Desktop apps connect directly to MES; verify schemas |

## Common Development Scenarios

### 1. Adding a New Portal Report

**Repos to check:**
1. `BeFirst_Database_*` - Available tables/views
2. `BeFirst_APIs` - If report needs API endpoint
3. `BeFirst_Docs` - Existing report patterns (CLAUDE.md)
4. `BeFirst_SSRS` - Similar SSRS reports (reuse queries)

**Pattern:** See BeFirst_Docs CLAUDE.md → "Report Organization (Portal)"

### 2. Adding a New API Endpoint

**Repos to check:**
1. `BeFirst_Database_*` - Schema definitions
2. `BeFirst_Portal` - How Portal will consume it
3. `BeFirst_Services` - If endpoint triggers background processing

**Steps:**
1. Define API contract (models, DTOs)
2. Verify database schemas match
3. Check if Portal UI needs updates
4. Update Swagger documentation

### 3. Modifying a Database Schema

**CRITICAL:** Check ALL consumers before making changes:

**Repos to check:**
1. `BeFirst_Portal` - Views, controllers, LINQ queries
2. `BeFirst_APIs` - API models, query methods
3. `BeFirst_Services` - Service queries, data access
4. `BeFirst_ETL` - Talend jobs that populate tables
5. `BeFirst_SSRS` - Reports querying tables
6. `BeFirst_Production` - Desktop app queries
7. `BeFirst_Planning_Tool` - Desktop app queries

**Never modify tables directly in production.** Use migration scripts.

### 4. Adding a New Windows Service

**Repos to check:**
1. `BeFirst_Database_*` - Data access needs
2. `BeFirst_Portal` - If Portal triggers the service
3. `BeFirst_APIs` - If API endpoints invoke the service

**Document service contracts** and coordinate with Portal/API teams.

### 5. Creating a New ETL Job

**Repos to check:**
1. `BeFirst_Database_DWH` - Target schema
2. PLEX source schema (read-only connection)
3. `BeFirst_Services` - Services that depend on this data

## Key Interdependencies

| Component | Depends On | Depended On By |
|-----------|-----------|----------------|
| **Portal** | APIs, MES Database | Users (primary UI) |
| **APIs** | All 4 Databases | Portal, external integrations |
| **MES Database** | ETL, Services | Portal, APIs, Production, Planning, Services |
| **DWH Database** | ETL | APIs, SSRS, Services |
| **Services** | MES, DWH, PLEX | Portal (triggered), ETL (scheduled) |
| **ETL** | PLEX, DWH, MES | All data consumers |

## Best Practices

### Before Making Changes

1. **Read architecture first:** `BeFirst_Docs/docs/02_ARCHITECTURE.md`
2. **Check database schemas:** `BeFirst_Docs/docs/04_DATABASE.md`
3. **Review API endpoints:** `BeFirst_Docs/docs/05_API.md`
4. **Read target repo's CLAUDE.md** (if exists)

### Schema Changes

- Use database migration scripts
- Never modify tables directly in production
- Coordinate with ALL consuming teams
- Test in DEV environment first

### API Changes

- Update Swagger documentation
- Notify Portal team of breaking changes
- Version APIs if breaking compatibility
- Test with Portal integration

### Service Changes

- Document service contracts
- Coordinate with Portal/API teams
- Update service configuration docs
- Test service triggers end-to-end

## Quick Reference Commands

```bash
# Check which repos exist
ls S:\01_Repos | grep BeFirst

# Check recent changes in a repo
cd S:\01_Repos\BeFirst_Portal
git log --oneline -20

# Search across all BeFirst repos
cd S:\01_Repos
grep -r "SearchTerm" BeFirst_*/
```

## When in Doubt

**Start here:**
1. `BeFirst_Docs/docs/02_ARCHITECTURE.md` - System overview
2. `BeFirst_Docs/docs/04_DATABASE.md` - All database schemas
3. `BeFirst_Docs/docs/05_API.md` - API endpoints
4. Target repository's `CLAUDE.md` - Patterns and gotchas

## Related

- See: `BeFirst_Docs/CLAUDE.md` - Project-specific patterns
- See: `BeFirst_Docs/docs/02_ARCHITECTURE.md` - Complete architecture
- Location: All repos at `S:\01_Repos\BeFirst_*`
