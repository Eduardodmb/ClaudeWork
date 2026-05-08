# Unified DevOps Workflow (GitHub + Azure DevOps + Claude Code)

Maintain consistency across all three systems for seamless work tracking.

---

## Single Source of Truth Hierarchy

```
Azure DevOps Work Items (WHY & WHAT)
    ↓
GitHub Branches & PRs (HOW)
    ↓
Claude Code Sessions (EXECUTION)
```

---

## Naming Conventions

| System | Pattern | Example |
|--------|---------|---------|
| Azure DevOps Task | `[Action]: [Description]` | `Implement: GSD context checkpoints` |
| GitHub Branch | `[type]/[work-item-id]-[slug]` | `feature/1001-gsd-checkpoints` |
| Git Commit | `[type]: [description] (#[work-item])` | `feat: add checkpoint command (#1001)` |
| Claude Session | `[work-item-id] - [focus]` | `#1001 - Implementing GSD checkpoints` |

---

## Branch Types

| Type | Use Case |
|------|----------|
| `feature/` | New functionality |
| `fix/` | Bug fixes |
| `refactor/` | Code improvements |
| `docs/` | Documentation only |
| `config/` | Configuration changes |

---

## Workflow Sync Points

| Event | Azure DevOps | GitHub | Claude Code |
|-------|--------------|--------|-------------|
| Start work | Task → Active | Create branch | `/start-work` links work item |
| Checkpoint | Add comment | N/A | `/checkpoint` documents progress |
| Code complete | N/A | Create PR | PR linked to work item |
| PR merged | Task → Closed | Branch deleted | `/end-work` closes task |

---

## Auto-Linking Protocol

**On `/start-work`:**
1. Query active Azure DevOps work items
2. User selects or creates work item
3. Create GitHub branch using naming convention
4. Store work item ID in session state

**On commit:**
1. Include work item ID in commit message: `feat: description (#1001)`
2. Azure DevOps auto-links commit via hashtag

**On PR creation:**
1. Link PR to work item via `AB#1001` in description
2. PR title follows: `[Type]: Description (#1001)`

**On `/end-work`:**
1. Update work item state (Active → Closed)
2. Add completion summary with AI metrics
3. Link commits to work item

---

## Phase Tracking Integration

| Claude Phase | Azure DevOps | GitHub |
|--------------|--------------|--------|
| Phase start | Add work item comment | N/A |
| Phase checkpoint | Update task progress | Push commits |
| Phase complete | Close sub-task | Squash merge ready |

---

## Consistency Checks

Run periodically or on `/status`:

```
- Work item linked: [yes/no]
- Branch naming: [valid/invalid]
- Commits linked: [N commits]
- PR status: [none/draft/ready/merged]
```

---

## Tag Taxonomy

Standardized tags enable consistent search, filtering, and reporting across all work items.

### Tag Categories

| Category | Convention | Examples | Purpose |
|----------|------------|----------|---------|
| **Product** | `lowercase-hyphen` | `safari-trace`, `safari-assist`, `safari-analyze`, `safari-studio` | Link work to Safari product suite |
| **Phase** | `phase-N` | `phase-1`, `phase-2`, `phase-6` | Track implementation phases |
| **Domain** | `lowercase` | `manufacturing`, `finance`, `security`, `infrastructure` | Business domain classification |
| **System** | `PascalCase` | `PLEX`, `BeFirst`, `Planful`, `Salesforce`, `FortiGate` | External system integration |
| **Technology** | `lowercase-hyphen` | `nextjs`, `kafka`, `azure-ad`, `power-bi`, `spark` | Technology stack |
| **Work Type** | `lowercase-hyphen` | `integration`, `etl`, `cdc`, `dashboard`, `sso`, `api` | Type of technical work |
| **Status** | `lowercase` | `urgent`, `blocked` | Priority/status flags |
| **Strategic** | `lowercase-hyphen` | `it-roadmap`, `ai-operations` | Strategic initiative alignment |
| **Site** | `UPPERCASE` | `GRA1`, `OTS`, `JUA` | Physical site location |

### Tag Examples by Work Type

| Work Item Type | Typical Tags |
|----------------|--------------|
| Data integration | `etl`, `kafka`, `PLEX`, `manufacturing` |
| Security project | `security`, `FortiGate`, `azure-ad`, `phase-1` |
| Dashboard work | `dashboard`, `power-bi`, `finance`, `Planful` |
| Product feature | `safari-trace`, `nextjs`, `api`, `phase-2` |

### Tag Governance Rules

1. **Always use existing tags** - Check for existing tags before creating new ones
2. **No spaces** - Use hyphens for multi-word tags: `azure-ad` not `azure ad`
3. **Lowercase default** - Except for System (PascalCase) and Site (UPPERCASE)
4. **Minimum tags** - Every work item should have at least: domain + work-type
5. **No duplicates** - Avoid synonyms: use `dashboard` not `report` and `dashboard`

### Archive Area Path

Items moved to `Information Technology\Archive` are excluded from active queries. Use for:
- Consolidated/superseded work items
- Mass-uploaded items that won't be actioned
- Completed work older than 90 days

Run periodic cleanup script to purge archived items per retention policy.
