---
name: work-item-sync
description: Multi-user work item synchronization with conflict detection. Auto-triggered at checkpoints and end-work to detect external changes and coordinate updates.
---

# Work Item Sync

## Overview

Coordinates Azure DevOps work item updates across multiple users/sessions. Detects external changes, notifies users, and provides conflict resolution guidance.

## When This Activates

| Trigger | Action |
|---------|--------|
| **Session Start** (`/start-work`) | Fetch baseline state for tracked items |
| **Checkpoint** (~50 turns) | Detect changes, notify if conflicts |
| **End Work** (`/end-work`) | Full sync with conflict resolution |
| **Manual** (`/sync-work-items`) | Force immediate sync check |

---

## Core Concepts

### Work Item States (from user perspective)

| State | Meaning |
|-------|---------|
| **Tracked** | User is working on this item locally |
| **Synced** | Local changes pushed to ADO |
| **Stale** | External changes detected since last sync |
| **Conflicted** | User changes + external changes = needs resolution |

### Change Detection Window

```
Last Sync ─────────────► Now
     │                    │
     ├── User changes ────┤
     │                    │
     └── External changes─┘ (other users, automation)
```

---

## Session Lifecycle Integration

### Phase 1: Session Start (Baseline Capture)

When `/start-work` runs:

```
BASELINE_CAPTURE():
  1. Read work-tracker.json for activeWork
  2. For each item with adoId:
     - Fetch current state from ADO
     - Store baseline snapshot:
       {
         adoId: 123,
         baseline: {
           rev: 42,
           state: "Active",
           assignedTo: "user@domain.com",
           changedDate: "2026-01-21T10:00:00Z",
           fields: { /* key fields */ }
         },
         capturedAt: "2026-01-21T10:30:00Z"
       }
  3. Store in work-tracker.json under `baselineSnapshots`
```

### Phase 2: Checkpoint (Change Detection)

When `/checkpoint` runs:

```
DETECT_CHANGES():
  1. For each tracked item with baseline:
     current = fetch_work_item(adoId)

     IF current.rev != baseline.rev:
       # External change detected
       change = {
         adoId: item.adoId,
         type: classify_change(baseline, current),
         changedBy: current.changedBy,
         changedDate: current.changedDate,
         fieldChanges: diff(baseline.fields, current.fields),
         severity: assess_severity(change)
       }
       ADD to externalChanges queue

  2. IF externalChanges.length > 0:
     SHOW notification to user
     STORE changes in work-tracker.json
```

### Phase 3: End Work (Conflict Resolution)

When `/end-work` runs:

```
RESOLVE_AND_SYNC():
  1. Run DETECT_CHANGES() for final check

  2. For each item with changes:
     resolution = determine_resolution(userWork, externalChanges)

     SHOW:
     ```
     ⚠️ Work Item #123 has external changes

     **Your changes:** [summary]
     **External changes:** [summary] (by @user)

     **Recommended action:** [Replace|Supplement|Rework]

     Choose: [r]eplace / [s]upplement / re[w]ork / [s]kip
     ```

     WAIT for user choice
     EXECUTE chosen action
```

---

## Change Classification

### Change Types

| Type | Detection | User Impact |
|------|-----------|-------------|
| **State Change** | State field different | May invalidate user's work |
| **Assignment Change** | AssignedTo different | Ownership conflict |
| **Content Update** | Description/fields changed | Supplement opportunity |
| **Comment Added** | New comments since baseline | Information only |
| **Linked Work** | New relations added | Context change |
| **Closed** | State = Closed/Resolved | User work may be void |

### Severity Assessment

```
FUNCTION assess_severity(change):

  # Critical - Blocks user's work
  IF change.newState IN ["Closed", "Removed"]:
    RETURN "critical"

  IF change.assignedTo != currentUser AND baseline.assignedTo == currentUser:
    RETURN "critical"  # Reassigned away from user

  # High - Requires attention
  IF change.type == "State Change":
    RETURN "high"

  IF change.fieldChanges.includes("Description", "Acceptance Criteria"):
    RETURN "high"  # Scope change

  # Medium - Should review
  IF change.type == "Content Update":
    RETURN "medium"

  # Low - Informational
  IF change.type == "Comment Added":
    RETURN "low"

  RETURN "low"
```

---

## Resolution Framework

### Decision Logic

```
FUNCTION determine_resolution(userWork, externalChanges):

  # Case 1: External closure
  IF externalChanges.newState == "Closed":
    IF userWork.type == "bug_fix" AND userWork.completed:
      RETURN {
        action: "supplement",
        reason: "Your fix complements the closure",
        guidance: "Add your fix details as closure comment"
      }
    ELSE:
      RETURN {
        action: "rework",
        reason: "Item closed by someone else",
        guidance: "Review closure reason, create new item if needed"
      }

  # Case 2: Reassignment
  IF externalChanges.assignedTo != currentUser:
    RETURN {
      action: "rework",
      reason: "Item reassigned to " + externalChanges.assignedTo,
      guidance: "Coordinate with new assignee before continuing"
    }

  # Case 3: Scope change (Description/Acceptance Criteria)
  IF externalChanges.fieldChanges.includes("Description"):
    RETURN {
      action: "review",
      reason: "Scope may have changed",
      guidance: "Review new description, adjust your work if needed"
    }

  # Case 4: Parallel work (comments/minor updates)
  IF externalChanges.severity == "low":
    RETURN {
      action: "supplement",
      reason: "Minor updates detected",
      guidance: "Your changes will add to existing updates"
    }

  # Default: Let user decide
  RETURN {
    action: "user_choice",
    reason: "Multiple factors - review needed",
    guidance: "Review changes and decide how to proceed"
  }
```

### Action Definitions

| Action | What Happens |
|--------|--------------|
| **Replace** | Overwrite external changes with user's version |
| **Supplement** | Add user's changes on top of external changes |
| **Rework** | Discard user's local changes, work from current ADO state |
| **Skip** | Don't sync this item now, keep local for later |

---

## Queue Management

### Multi-User Coordination Queue

Located in `~/.claude/state/work-item-queue.json`:

```json
{
  "version": "1.0",
  "pendingUpdates": [
    {
      "adoId": 123,
      "operation": "update",
      "fields": [...],
      "priority": 1,
      "createdAt": "timestamp",
      "sessionId": "session-id",
      "conflictsWith": null
    }
  ],
  "externalChanges": [
    {
      "adoId": 123,
      "detectedAt": "timestamp",
      "changedBy": "other-user@domain.com",
      "changeType": "state_change",
      "severity": "high",
      "acknowledged": false,
      "resolution": null
    }
  ],
  "lockState": {
    "lockedItems": [
      {
        "adoId": 123,
        "lockedBy": "session-id",
        "lockedAt": "timestamp",
        "expiresAt": "timestamp + 1hr"
      }
    ]
  }
}
```

### Optimistic Locking

```
FUNCTION acquire_soft_lock(adoId, sessionId):
  queue = read_queue()

  existing = queue.lockState.lockedItems.find(adoId)

  IF existing AND existing.expiresAt > now():
    IF existing.lockedBy != sessionId:
      RETURN {
        success: false,
        lockedBy: existing.lockedBy,
        message: "Item locked by another session"
      }

  # Acquire or renew lock
  queue.lockState.lockedItems.upsert({
    adoId: adoId,
    lockedBy: sessionId,
    lockedAt: now(),
    expiresAt: now() + 1hr
  })

  write_queue(queue)
  RETURN { success: true }
```

---

## Notification System

### In-Session Alerts

When external changes detected during work:

```
╔══════════════════════════════════════════════════════════════╗
║ ⚠️  WORK ITEM CHANGE DETECTED                                ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Work Item #1041 was updated externally                      ║
║                                                              ║
║  Changed by: sarah@safaricircuits.com                        ║
║  Changed: 5 minutes ago                                      ║
║  Type: State Change (Active → Resolved)                      ║
║  Severity: HIGH                                              ║
║                                                              ║
║  Your local changes may be affected.                         ║
║                                                              ║
║  Options:                                                    ║
║  • Continue working (review at end-work)                     ║
║  • Run /sync-work-items to review now                        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

### Checkpoint Summary (if changes exist)

```
## Checkpoint Summary

**External Changes Detected:**

| Item | Changed By | Type | Severity | Action Needed |
|------|------------|------|----------|---------------|
| #1041 | sarah@ | State → Resolved | High | Review at end-work |
| #1042 | bot | Comment added | Low | None |

Run `/sync-work-items` to resolve now, or continue working.
```

---

## Commands

### `/sync-work-items` - Manual Sync Check

Force check for external changes and show resolution options:

```
SYNC_WORK_ITEMS():
  1. Run DETECT_CHANGES()
  2. For each change:
     SHOW change details
     SHOW resolution options
     WAIT for user choice
  3. Execute resolutions
  4. Update work-tracker.json
```

### `/work-item-status` - Show Tracked Items

Display all tracked items with sync status:

```
WORK_ITEM_STATUS():
  SHOW:
  ```
  **Tracked Work Items**

  | ID | Title | Local Status | ADO Status | Sync |
  |----|-------|--------------|------------|------|
  | #1041 | Research spike | Completed | Active | ⚠️ Stale |
  | #1042 | Fix login bug | In progress | Active | ✓ Synced |

  Last sync: 15 minutes ago
  External changes: 1 pending review
  ```
```

---

## Integration Points

### work-tracker.json Schema Updates

Add to existing schema:

```json
{
  "baselineSnapshots": {
    "123": {
      "rev": 42,
      "state": "Active",
      "assignedTo": "user@domain.com",
      "changedDate": "2026-01-21T10:00:00Z",
      "description": "...",
      "capturedAt": "2026-01-21T10:30:00Z"
    }
  },
  "externalChanges": [
    {
      "adoId": 123,
      "detectedAt": "timestamp",
      "changeType": "state_change",
      "changedBy": "other@domain.com",
      "severity": "high",
      "baseline": { /* snapshot at detection */ },
      "current": { /* current state */ },
      "acknowledged": false,
      "resolution": null
    }
  ],
  "syncConfig": {
    "checkInterval": "checkpoint",
    "autoResolve": false,
    "notifyOnLow": false,
    "notifyOnMedium": true,
    "notifyOnHigh": true,
    "notifyOnCritical": true
  }
}
```

### /start-work Integration

Add after session initialization:

```markdown
### 1.5. Capture Work Item Baselines

For each item in activeWork with adoId:
1. Fetch current state from ADO
2. Store in baselineSnapshots
3. Clear any stale externalChanges from previous session
```

### /checkpoint Integration

Add after DevOps sync:

```markdown
### 2.7. Detect External Changes (AUTOMATIC)

Run change detection for all tracked items:
1. Compare current ADO state to baseline
2. If changes detected:
   - Add to externalChanges queue
   - Show notification if severity >= configured threshold
3. Update baselineSnapshots with current state
```

### /end-work Integration

Enhance step 9:

```markdown
### 9. Comprehensive DevOps Sync with Conflict Resolution

**Before pushing any changes:**
1. Run final DETECT_CHANGES()
2. For each item with conflicts:
   - Show conflict details
   - Show recommended resolution
   - Wait for user choice
3. Execute resolutions in order
4. Then proceed with normal sync
```

---

## Related

- `/devops-sync` - Base inference and sync logic
- `/checkpoint` - Triggers change detection
- `/end-work` - Full sync with resolution
- `/start-work` - Baseline capture
- `~/.claude/state/work-tracker.json` - State storage
- `~/.claude/state/work-item-queue.json` - Queue management
