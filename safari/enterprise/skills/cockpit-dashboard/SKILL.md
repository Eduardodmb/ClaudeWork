# Cockpit Dashboard Skill

Personal HTML dashboard for workday management, session tracking, and DevOps visibility.

## Purpose

Provides a **visual command center** for daily work:
- Session tracking (DAG view of Claude sessions)
- DevOps work items (current sprint, my items)
- Deadlines and reminders
- Quick actions with copy-to-clipboard
- Team rollout ready (per-user dashboards)

## Stopgap Role

This dashboard serves as interim solution until **Safari Trace** is fully functional:
- File-based (no infrastructure needed)
- Self-contained HTML (works offline)
- Regenerated on demand by Claude
- Can evolve into Safari Trace data source

## Usage

```
/cockpit              # Regenerate and open dashboard
/cockpit --refresh    # Refresh data without opening
/cockpit --team       # Generate team summary view
```

## Data Sources

| Source | Location | Refresh |
|--------|----------|---------|
| Sessions | `~/.claude/state/session-graph.json` | Every /cockpit call |
| Phase | `~/.claude/state/phase.md` | Every /cockpit call |
| Reminders | `~/.claude/state/session-graph.json` | Every /cockpit call |
| DevOps Items | Azure DevOps MCP | When DevOps active |
| Git Status | Local repos | On demand |

## Dashboard Sections

### 1. Header & Summary
- Current date/time
- Session counts by status
- Context health indicator

### 2. Deadline Banner
- Urgent deadlines (< 7 days)
- Warning deadlines (7-14 days)
- Upcoming deadlines (14-30 days)

### 3. My Work Items (DevOps)
- Items assigned to me
- Current sprint items
- Items I'm watching
- Grouped by state (Active > Proposed > Resolved)

### 4. Sessions by Initiative
- Visual DAG of sessions
- Status indicators (active/paused/critical/archived)
- One-click resume commands
- Health warnings

### 5. Quick Actions
- Copy commands to clipboard
- Start new sessions
- Common workflows

### 6. Team View (Future)
- Aggregated from team member dashboards
- Sprint burndown
- Blocked items
- Collaboration opportunities

## File Locations

| File | Purpose |
|------|---------|
| `~/.claude/state/cockpit.html` | Personal dashboard |
| `~/.claude/state/cockpit-data.json` | Cached dashboard data |
| `~/.claude/state/session-graph.json` | Session DAG |
| `organizational-docs/dashboards/team-cockpit.html` | Team view (future) |

## Regeneration Process

```
REGENERATE_COCKPIT():
  1. Load session-graph.json
  2. Load phase.md for current focus
  3. IF DevOps active:
       - Fetch my work items
       - Fetch sprint items
       - Fetch watched items
  4. Calculate deadlines and urgency
  5. Generate HTML from template
  6. Write to cockpit.html
  7. IF --open: Launch in browser
```

## Safari Branding

Dashboard follows Safari brand guidelines:
- Safari Red (#9B1C1C) for primary accents
- Dark Background (#0F172A) for main bg
- Card Background (#1E293B) for sections
- Status colors: Green (#34d399), Yellow (#fbbf24), Red (#ef4444)

## Team Rollout Plan

### Phase 1: Personal (Current)
- Individual cockpit per user
- Manual regeneration via /cockpit
- File-based, no sync

### Phase 2: Shared Visibility
- Team cockpit aggregates individual dashboards
- Stored in organizational-docs repo
- Git-synced updates

### Phase 3: Safari Trace Integration
- Cockpit becomes read-only view of Trace data
- Real-time updates via MCP
- Cross-team visibility

## Integration Points

| System | Integration |
|--------|-------------|
| `/start-work` | Regenerate cockpit at session start |
| `/end-work` | Update cockpit with session closure |
| `/checkpoint` | Refresh session data |
| `/pulse` | Quick cockpit summary |
| DevOps MCP | Pull work items when active |

## Example Output

```
╔═══════════════════════════════════════════════════════════════════╗
║                        SESSION COCKPIT                             ║
║                     Feb 13, 2026 | 8:30 AM                         ║
╠═══════════════════════════════════════════════════════════════════╣
║  SUMMARY: 1 Active | 3 Paused | 1 Critical | 1 Archived           ║
║                                                                    ║
║  ⚠️ DEADLINE: Iserv Transition - Feb 28 (15 days)                 ║
║                                                                    ║
║  MY WORK ITEMS (DevOps)                                            ║
║  ├─ Active: #1250 Session Health Skill                             ║
║  ├─ Proposed: #1251 Cockpit Dashboard, #1252 Team Rollout          ║
║  └─ Watching: #1128 Context Governance Epic                        ║
║                                                                    ║
║  SESSIONS BY INITIATIVE                                            ║
║  [Context Governance] [HTML Deliverables] [Infrastructure]         ║
║                                                                    ║
║  QUICK ACTIONS                                                     ║
║  [Resume HTML] [Resume Iserv] [New Session] [Sync DevOps]          ║
╚═══════════════════════════════════════════════════════════════════╝
```

## Future Enhancements

- [ ] Auto-refresh via file watcher
- [ ] Dark/light theme toggle
- [ ] Print-friendly view
- [ ] Mobile responsive
- [ ] Calendar integration
- [ ] Notification badges
- [ ] Export to PDF
- [ ] Team activity feed
