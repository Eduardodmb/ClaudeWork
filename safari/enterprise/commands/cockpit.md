# Session Cockpit

Personal HTML dashboard for workday management, session tracking, and DevOps visibility.

## Purpose

**Provides a visual command center** for daily work:
- Session tracking (DAG view of Claude sessions)
- DevOps work items (my items, sprint, watched)
- Deadlines and reminders
- Quick actions with copy-to-clipboard
- Team rollout ready (per-user dashboards)

**Stopgap for Safari Trace** - File-based, no infrastructure needed, evolves into Trace data source.

## When to Use

| Trigger | Action |
|---------|--------|
| "cockpit", "dashboard", "show sessions" | Generate and open HTML dashboard |
| "where should I work?", "what's active?" | Generate and open HTML dashboard |
| Morning pulse (integrated) | Summary in terminal + HTML link |
| Feeling lost across contexts | Full cockpit |

## Syntax

```
/cockpit              # Regenerate HTML dashboard and open in browser
/cockpit --terminal   # Terminal-only view (no HTML)
/cockpit --refresh    # Refresh data without opening
/cockpit --devops     # Include DevOps work items (activates MCP)
```

## Output Modes

| Mode | Output | When |
|------|--------|------|
| **HTML** (default) | `~/.claude/state/cockpit.html` | Full dashboard with interactivity |
| **Terminal** | ASCII box in conversation | Quick view, no file |
| **Both** | Terminal summary + open HTML | Morning pulse |

## Instructions

### 1. Load Session Graph

```
LOAD_SESSION_GRAPH():
  1. Read ~/.claude/state/session-graph.json
  2. If not exists, scan for sessions and build graph:
     - Scan ~/.claude/projects/{project}/*.jsonl
     - Parse session metadata
     - Infer initiatives from work items
     - Build initial graph structure
  3. Return sessions and initiatives
```

### 2. Scan for Orphans

```
DETECT_ORPHANS():
  FOR each session in graph:
    IF session.status == "active" AND last_activity > 4_hours:
      session.status = "orphan"
      session.orphanSeverity = calculate_severity()

  FOR each .jsonl file not in graph:
    IF no_end_work_marker AND last_activity > 4_hours:
      ADD to graph as orphan
```

### 3. Calculate Session Health

```
CALCULATE_HEALTH(session):
  health = {
    turns: session.turns,
    duration: now - session.createdAt,
    daySpan: calendar_days(session.createdAt, session.lastActivity),
    hasChildren: session.children.length > 0,
    hasParent: session.parent != null
  }

  IF health.turns > 60 OR health.duration > 4h OR health.daySpan > 1:
    RETURN "critical"
  ELIF health.turns > 40 OR health.duration > 2h:
    RETURN "warning"
  ELSE:
    RETURN "healthy"
```

### 4. Build Initiative Tree

```
BUILD_INITIATIVE_TREE():
  initiatives = {}

  FOR each session in graph:
    initiative = session.initiative OR "Uncategorized"

    IF initiative not in initiatives:
      initiatives[initiative] = {
        priority: lookup_priority(initiative),
        sessions: [],
        workItems: []
      }

    initiatives[initiative].sessions.push(session)

  # Sort by priority (P1 > P2 > P3 > P4)
  RETURN sorted(initiatives, by: priority)
```

### 5. Display Full Cockpit

```
╔═══════════════════════════════════════════════════════════════════╗
║                        SESSION COCKPIT                             ║
║                     {date} | {time}                                ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  CONTEXT GOVERNANCE [P1-Foundation] ──────────────────────────────║
║  │ Work Items: #1128, #1129, #1130                                 ║
║  │                                                                 ║
║  ├─ 🟢 abc123: Session health skill                                ║
║  │     Status: CURRENT | 32 turns | 1.2hr                          ║
║  │     └─ 🔵 def456: Neo4j research (BRANCH)                       ║
║  │           Status: Active | 8 turns | 15min                      ║
║  │                                                                 ║
║  └─ 🟡 ghi789: Safari MCP scaffold                                 ║
║        Status: PAUSED | 15 turns | Last: 2hr ago                   ║
║                                                                    ║
║  DATA ARCHITECTURE [P2-Enabler] ──────────────────────────────────║
║  │ Work Items: #1200, #1201                                        ║
║  │                                                                 ║
║  ├─ 🔴 jkl012: Unified data arch                                   ║
║  │     Status: ORPHAN | 89 turns | 4 days old                      ║
║  │     ⚠️  Recommendation: Close or archive                        ║
║  │                                                                 ║
║  └─ 🟡 mno345: Headless mart planning                              ║
║        Status: PAUSED | 22 turns | Last: 1d ago                    ║
║                                                                    ║
║  FORTICLIENT EMS [P2-Enabler] ────────────────────────────────────║
║  │ Work Items: #1100                                               ║
║  │                                                                 ║
║  └─ ⚪ No active sessions                                          ║
║        Status: BLOCKED - Waiting on Eduardo testing                ║
║                                                                    ║
║  UNCATEGORIZED ───────────────────────────────────────────────────║
║  │                                                                 ║
║  └─ 🟡 pqr678: HTML deliverables audit                             ║
║        Status: ORPHAN | 153 turns | 4 days old                     ║
║        ⚠️  Critical: Context likely degraded                       ║
║                                                                    ║
╠═══════════════════════════════════════════════════════════════════╣
║  SUMMARY                                                           ║
║                                                                    ║
║  Sessions: 6 total | 2 active | 2 paused | 2 orphan | 1 blocked   ║
║  Branches: 1 active (def456 → abc123)                              ║
║  Health: 🟡 2 sessions need attention                              ║
║                                                                    ║
╠═══════════════════════════════════════════════════════════════════╣
║  QUICK ACTIONS                                                     ║
║                                                                    ║
║  Resume:   claude --resume {session_id}                            ║
║  Branch:   /branch "focus"                                         ║
║  Merge:    /merge (in branch session)                              ║
║  Archive:  /archive {session_id}                                   ║
║                                                                    ║
║  [1] Switch to def456    [3] Archive jkl012                        ║
║  [2] Resume mno345       [4] Archive pqr678                        ║
║                                                                    ║
╚═══════════════════════════════════════════════════════════════════╝
```

### 6. Display Summary View (--summary)

```
╔═══════════════════════════════════════════════════════════════════╗
║  SESSION COCKPIT (Summary)                                         ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  🟢 CURRENT: Session health skill (32 turns)                       ║
║     └─ Branch: Neo4j research (8 turns)                            ║
║                                                                    ║
║  🟡 PAUSED: 2 sessions                                             ║
║  🔴 ORPHAN: 2 sessions (need attention)                            ║
║  ⚪ BLOCKED: 1 initiative                                          ║
║                                                                    ║
║  Run /cockpit for full view                                        ║
╚═══════════════════════════════════════════════════════════════════╝
```

### 7. Interactive Actions

When user selects a quick action number:

| Selection | Action |
|-----------|--------|
| [1], [2], etc. | Generate resume command for that session |
| "archive N" | Archive the specified session |
| "branch" | Invoke /branch flow |
| "details N" | Show full session details |

### 8. Update Graph on Changes

**Events that update session-graph.json:**

| Event | Update |
|-------|--------|
| `/start-work` | Add/update session entry |
| `/branch` | Create child, update parent.children |
| `/merge` | Mark branch as merged, update parent |
| `/end-work` | Set status to closed |
| `/checkpoint` | Update lastActivity, turns |
| Session orphan detected | Set status to orphan |

## Integration Points

| Command | Cockpit Integration |
|---------|---------------------|
| `/start-work` | Morning pulse shows summary cockpit |
| `/pulse` | Shows current position in DAG |
| `/branch` | Updates cockpit on creation |
| `/merge` | Updates cockpit on completion |
| `/end-work` | Removes from active, shows updated cockpit |

## Status Icons

| Icon | Status | Meaning |
|------|--------|---------|
| 🟢 | CURRENT | This terminal's active session |
| 🔵 | BRANCH | Active branch of another session |
| 🟡 | PAUSED | Has activity but not current |
| 🔴 | ORPHAN | No proper closure, needs attention |
| ⚪ | BLOCKED | Waiting on external dependency |
| ✅ | CLOSED | Properly completed |
| 🔀 | MERGED | Branch merged back to parent |

## Session Graph Schema

**`~/.claude/state/session-graph.json`:**

```json
{
  "version": 1,
  "lastUpdated": "ISO-8601",
  "currentSession": "abc123",
  "sessions": {
    "abc123": {
      "id": "abc123",
      "parent": null,
      "children": ["def456"],
      "focus": "Session health skill implementation",
      "workItems": ["#1250", "#1251"],
      "initiative": "Context Governance",
      "status": "active",
      "turns": 32,
      "fileSize": 245000,
      "createdAt": "2026-02-13T08:00:00Z",
      "lastActivity": "2026-02-13T09:15:00Z",
      "branchContext": null
    }
  },
  "initiatives": {
    "Context Governance": {
      "priority": "P1-Foundation",
      "workItems": ["#1128", "#1129", "#1130"],
      "description": "Context management and governance system"
    },
    "Data Architecture": {
      "priority": "P2-Enabler",
      "workItems": ["#1200", "#1201"],
      "description": "Headless data mart and unified architecture"
    }
  }
}
```

## HTML Dashboard Generation

### 9. Generate HTML Dashboard

```
GENERATE_HTML_COCKPIT():
  1. Load all data sources:
     - session-graph.json (sessions, initiatives, reminders)
     - phase.md (current focus)
     - IF --devops: Fetch DevOps work items via MCP

  2. Calculate metrics:
     - Session counts by status
     - Deadline urgency (days remaining)
     - Health indicators

  3. Generate HTML sections:
     - Header with timestamp
     - Deadline banner (if any urgent)
     - Summary stats cards
     - My Work Items (if DevOps active)
     - Sessions by Initiative
     - Quick Actions with clipboard copy

  4. Write to ~/.claude/state/cockpit.html

  5. Open in default browser:
     - Windows: start "" "path/to/cockpit.html"
     - Mac: open "path/to/cockpit.html"
```

### 10. HTML Structure

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Safari branding CSS -->
  <!-- Clipboard JS for copy buttons -->
</head>
<body>
  <header>SESSION COCKPIT | {timestamp}</header>

  <!-- Deadline Banner (if urgent deadlines exist) -->
  <div class="deadline-banner">...</div>

  <!-- Summary Stats -->
  <div class="summary">
    <div class="stat active">{n} Active</div>
    <div class="stat paused">{n} Paused</div>
    <div class="stat critical">{n} Critical</div>
  </div>

  <!-- My Work Items (DevOps) -->
  <section class="work-items">
    <h2>My Work Items</h2>
    <!-- Grouped by state: Active > Proposed > Resolved -->
  </section>

  <!-- Sessions by Initiative -->
  <section class="initiatives">
    <!-- For each initiative, sorted by priority -->
    <div class="initiative">
      <h3>{name} [{priority}]</h3>
      <!-- Session cards with status, actions -->
    </div>
  </section>

  <!-- Quick Actions -->
  <section class="quick-actions">
    <!-- Copy-to-clipboard commands -->
  </section>

  <script>
    // Clipboard copy functionality
    // Toast notifications
  </script>
</body>
</html>
```

### 11. DevOps Integration

When `--devops` flag or DevOps MCP is active:

```
FETCH_DEVOPS_ITEMS():
  1. Get current user identity
  2. Query work items:
     - Assigned to me (all states)
     - Current iteration items
     - Items I created
     - Items with @mention
  3. Group by state (Active, Proposed, Resolved)
  4. Sort by priority within groups
  5. Return for HTML generation
```

**Work Item Card in HTML:**
```html
<div class="work-item" data-id="{id}" data-state="{state}">
  <span class="type-icon">{type}</span>
  <span class="id">#{id}</span>
  <span class="title">{title}</span>
  <span class="state-badge">{state}</span>
  <button onclick="copyCommand('work on #{id}')">Work</button>
</div>
```

### 12. Team Rollout (Future)

```
GENERATE_TEAM_COCKPIT():
  1. Scan team member cockpit files (if accessible)
  2. Aggregate:
     - Total active sessions
     - Blocked items across team
     - Shared deadlines
     - Sprint burndown
  3. Generate team-cockpit.html
  4. Store in organizational-docs/dashboards/
```

## File Locations

| File | Purpose |
|------|---------|
| `~/.claude/state/cockpit.html` | Personal dashboard (regenerated) |
| `~/.claude/state/session-graph.json` | Session DAG data |
| `~/.claude/skills/cockpit-dashboard/SKILL.md` | Full skill documentation |
| `organizational-docs/dashboards/` | Team dashboards (future) |

## Safari Branding

| Element | Color | Hex |
|---------|-------|-----|
| Primary accent | Safari Red | #9B1C1C |
| Background | Dark | #0F172A |
| Cards | Slate | #1E293B |
| Active | Green | #34d399 |
| Warning | Yellow | #fbbf24 |
| Critical | Red | #ef4444 |
| Info | Blue | #60a5fa |

## Related

- `/branch` - Create child session
- `/merge` - Return branch to parent
- `/pulse` - Quick status check
- `/start-work` - Shows cockpit in morning pulse
- `/session-health` - Detailed health analysis
- `~/.claude/skills/cockpit-dashboard/SKILL.md` - Full skill docs
