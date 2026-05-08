# Sync Strategy

Updates local strategy cache from Azure DevOps for change detection.

## Purpose

Maintain a local cache of strategic priorities to:
1. Detect when new work items are assigned
2. Identify priority shifts between sessions
3. Ensure work aligns to active Epics/Features
4. Enable smart resume with context awareness

## Steps

### 1. Query Active Epics

```
Query ADO for Epics in Software Engineering area
Filter: State = Active
```

### 2. Query Features Under Active Epics

```
For each active Epic:
  Query child Features
  Capture: id, title, state, priority
```

### 3. Query My Assigned Work Items

```
wit_my_work_items(project: "Information Technology", type: "assignedtome", includeCompleted: false)
```

### 4. Calculate Priority Scores

| Factor | Weight | Scoring |
|--------|--------|---------|
| Epic priority | 3x | Lower number = higher priority |
| Feature state | 2x | Active > Proposed > Resolved |
| Work item state | 1x | Active > Proposed |
| Direct assignment | +1 | Assigned to me |

### 5. Categorize by Priority

```
P0: Critical/blocking work
P1: High priority, current sprint
P2: Normal priority
P3: Low priority/backlog
```

### 6. Update strategy.json

```json
{
  "lastSync": "[timestamp]",
  "activeEpics": [epic_ids],
  "activeFeatures": [
    {"id": X, "title": "...", "state": "Active", "parentEpic": Y}
  ],
  "myWorkItems": {
    "hash": "[md5 of items for change detection]",
    "items": [
      {"id": X, "title": "...", "state": "Active", "priority": "P1"}
    ]
  },
  "priorities": {
    "P0": [item_ids],
    "P1": [item_ids],
    "P2": [item_ids]
  }
}
```

### 7. Display Strategy Summary

```
## Strategy Synced

**Last Sync**: [timestamp]

**Active Epics**:
- #[id] [title]

**Active Features**:
- #[id] [title] ([state]) under Epic #[parent]

**My Work Items by Priority**:

**P0 (Critical)**:
[none or list]

**P1 (High)**:
- #[id] [title] ([state])

**P2 (Normal)**:
- #[id] [title] ([state])

**Strategy Cache Updated**: ~/.claude/state/strategy.json
```

## Change Detection

On next /resume-session or /start-work:
1. Read cached strategy.json
2. Query fresh ADO state
3. Compare hashes
4. If different, identify specific changes:
   - New items
   - State changes
   - Priority shifts
   - Completed items

## Output Format

```
## Strategy Synced

**Timestamp**: [now]
**Epics**: [count] active
**Features**: [count] tracked
**My Items**: [count] assigned

[Priority breakdown]

Cache location: ~/.claude/state/strategy.json
```

## When to Run

- Manually: `/sync-strategy`
- Automatically: On /start-work if cache > 4 hours old
- Automatically: On /resume-session if idle > 4 hours

## Fallbacks

| Condition | Action |
|-----------|--------|
| ADO MCP not connected | Error: "Cannot sync - ADO not connected" |
| No active Epics | Warn: "No active Epics found" |
| No assigned items | Note: "No work items assigned" |

## Related
- `/start-work` - Uses strategy for context
- `/resume-session` - Uses strategy for change detection
- `/status` - Shows current strategy alignment
