# DevOps Auto-Sync

Automatic work tracking and Azure DevOps synchronization. **Always-on for IT profile** - runs silently throughout every session.

## Purpose

Makes DevOps tracking invisible - Claude automatically infers, tracks, and syncs work to Azure DevOps without users thinking about it.

**Key Principle:** Users should NEVER have to say "track this in DevOps" or manually create work items. Work is captured automatically.

## Operating Mode (ENFORCED)

| Profile | Mode | Behavior |
|---------|------|----------|
| **IT** | **Always-On** | Inference runs every checkpoint; work items auto-created |
| **Business** | Off | DevOps tracking disabled |

## When This Runs

| Trigger | Action |
|---------|--------|
| **Session start** | Initialize work-tracker.json, detect orphaned sessions |
| **Every 10 turns** | Light inference scan (high-confidence signals only) |
| **Checkpoint** (~40 turns) | Full inference + sync to ADO |
| **Task completion detected** | Update work items, add summaries |
| **Topic shift detected** | Infer and queue new work item |
| **`/sync-devops`** | Force immediate sync |
| **`/end-work`** | Full sync with work item creation/closure |

## Always-On Tracking Flow

```
SESSION_START:
  1. Initialize work-tracker.json with new session
  2. Set sessionStartTime, activeWork = []
  3. Load DevOps MCP tools (IT profile only)

EVERY_10_TURNS:
  1. Scan last 10 turns for work signals
  2. If high-confidence signal (>= 0.85):
     - Add to activeWork queue
     - Show brief acknowledgment: "📋 Tracking: [inferred title]"
  3. Update work-tracker.json

CHECKPOINT (40 turns):
  1. Full inference on session so far
  2. Create ADO items for >= 0.90 confidence
  3. Queue 0.70-0.89 for end-work review
  4. Add progress comments to active items

END_WORK:
  1. Final inference pass
  2. Create all queued items >= 0.70 (with brief confirm)
  3. Close completed items
  4. Link commits to work items
```

## Inline Acknowledgments

When work is detected during a session, show a brief inline acknowledgment:

```
📋 Tracking: "Fix authentication timeout bug" (Bug, 0.92)
```

This confirms tracking is happening without interrupting flow. Users can say "don't track [topic]" to exclude.

---

## Work Inference Engine

### Signal Detection

Scan recent conversation (last 20 turns) for these patterns:

| Signal | Patterns | Work Type | Base Confidence |
|--------|----------|-----------|-----------------|
| **Bug** | "bug", "error", "fix", "broken", stack traces, error messages | Bug | 0.80 |
| **Feature** | "implement", "add", "new feature", "create" | Task/Requirement | 0.70 |
| **Research** | "investigate", "spike", "POC", "research", "explore" | Research Task | 0.70 |
| **Documentation** | .md file edits, "document", "README", "docs" | Documentation Task | 0.70 |
| **Refactor** | "refactor", "cleanup", "improve", "optimize" | Task (refactor) | 0.60 |
| **Config** | MCP setup, .json edits, "configure" | Task (config) | 0.60 |

### Confidence Scoring

```
confidence = base_score + signal_strength + context_bonus

base_score: From signal detection table above

signal_strength:
  +0.10 per additional matching signal
  +0.20 if stack trace or error message present (for bugs)

context_bonus:
  +0.20 if matches active Feature under Epic #974
  +0.10 if matches current iteration work
  +0.30 if user explicitly confirms ("yes track this")
```

### Confidence Thresholds

| Confidence | Action |
|------------|--------|
| >= 0.90 | **Auto-sync** - Create/update ADO silently |
| 0.70 - 0.89 | **Suggest** - "Shall I track this as [Type]?" |
| 0.50 - 0.69 | **Queue** - Add to checkpoint summary for review |
| < 0.50 | **Ignore** - Not enough signal |

### Work Type Mapping

```
FUNCTION infer_work_type(signals, context):

  # Bug detection (highest priority)
  IF signals.has("bug", "error", "fix", "broken") OR signals.has_stack_trace:
    IF signals.has_code_change:
      RETURN Bug (confidence: 0.90)
    ELSE:
      RETURN Bug (confidence: 0.70)

  # Feature work
  IF signals.has("implement", "add", "new feature", "create"):
    IF context.matches_active_feature:
      RETURN Task under matched Feature (confidence: 0.85)
    ELSE:
      RETURN Requirement (confidence: 0.70)

  # Research
  IF signals.has("investigate", "spike", "research", "POC", "explore"):
    RETURN Task (activity: Research) (confidence: 0.75)

  # Documentation
  IF signals.file_types.only_markdown OR signals.has("document", "docs"):
    RETURN Task (activity: Documentation) (confidence: 0.75)

  # Refactoring
  IF signals.has("refactor", "cleanup", "improve", "optimize"):
    RETURN Task (activity: Development) (confidence: 0.70)

  # Code changes without explicit type
  IF signals.has_code_change AND context.has_active_work_item:
    RETURN link_to_active_work_item (confidence: 0.85)

  # Insufficient signals
  RETURN null
```

---

## State Management

### work-tracker.json Structure

Located at `~/.claude/state/work-tracker.json`:

```json
{
  "version": "1.0",
  "currentSession": {
    "id": "2026-01-19-03",
    "parentSession": "2026-01-19-02",
    "startTime": "2026-01-19T15:00:00Z",
    "lastSync": "2026-01-19T16:30:00Z",
    "completed": false,
    "checkpointCount": 2
  },
  "activeWork": [
    {
      "inferenceId": "inf-001",
      "title": "Fix authentication timeout bug",
      "type": "Bug",
      "confidence": 0.92,
      "signals": ["error discussed", "code change", "stack trace"],
      "firstDetected": "2026-01-19T15:15:00Z",
      "adoId": null,
      "synced": false,
      "status": "pending-create",
      "parentFeature": 977,
      "files": ["src/auth/session.ts"]
    }
  ],
  "rejectedInferences": [
    {
      "inferenceId": "inf-003",
      "title": "General architecture discussion",
      "reason": "user-rejected",
      "rejectedAt": "2026-01-19T16:00:00Z",
      "cooldownUntil": "2026-01-20T16:00:00Z"
    }
  ],
  "syncHistory": [
    {
      "timestamp": "2026-01-19T16:30:00Z",
      "type": "checkpoint",
      "itemsSynced": 1,
      "itemsCreated": 0,
      "commentsAdded": 1
    }
  ],
  "sessionHistory": []
}
```

---

## Checkpoint Sync Flow

### When Checkpoint Triggers

Run this sync as part of `/checkpoint` (silently):

### Steps

```
CHECKPOINT_SYNC():
  1. Read work-tracker.json
  2. Read session.json for activeWorkItems
  3. Get git diff/status if in repo

  4. For each item in activeWork:

     IF item.confidence >= 0.90 AND item.adoId == null:
       # Auto-create in ADO
       result = wit_create_work_item(
         project: "Information Technology",
         workItemType: item.type,
         fields: [
           {name: "System.Title", value: item.title},
           {name: "System.AreaPath", value: "Information Technology\\Software Engineering"},
           {name: "System.State", value: "Active"}
         ]
       )
       item.adoId = result.id
       item.synced = true
       item.status = "linked"

     ELIF item.adoId != null AND NOT recently_synced(item):
       # Add progress comment
       wit_add_work_item_comment(
         workItemId: item.adoId,
         project: "Information Technology",
         comment: generate_progress_comment(item),
         format: "markdown"
       )
       item.lastSyncedComment = now()

  5. Update work-tracker.json

  6. Add to syncHistory:
     {timestamp, type: "checkpoint", itemsSynced, itemsCreated, commentsAdded}
```

### Progress Comment Format

```markdown
**[CHECKPOINT-SYNC]**
Session: {sessionId}
Checkpoint: #{checkpointNumber}

**Progress:**
- {accomplishments since last sync}

**Files Modified:**
- {file list}

**Context Health:** {Fresh|Warm|Hot}
```

---

## Session Recovery

### Orphan Detection (runs on /start-work)

An orphaned session is detected when:
- `session.json` has `completed: false`
- AND `lastActivity` is > 4 hours ago
- AND `work-tracker.json` has unsynced items

### Recovery Flow

```
SESSION_RECOVERY():
  1. Read session.json
  2. Read work-tracker.json

  3. IF session.completed == false:
     idle_hours = hours_since(session.lastActivity)

     IF idle_hours >= 4:
       unsynced = work-tracker.activeWork.filter(synced == false)

       SHOW:
       ```
       ⚠️ **Previous session not properly closed**

       **Session**: {session.sessionId}
       **Focus**: {session.focus}
       **Last Active**: {session.lastActivity} ({idle_hours}h ago)
       **Unsynced Work**: {unsynced.length} items

       **Options:**
       1. **Close previous** - Sync work items to ADO, then start fresh
       2. **Continue previous** - Resume where you left off
       3. **Discard** - Archive without syncing, start fresh
       ```

       WAIT for user choice

       IF choice == "1" (Close):
         RUN full end-work sync for orphaned session
         ARCHIVE session to ~/.claude/state/archived-sessions/
         START fresh session

       IF choice == "2" (Continue):
         RESUME session
         UPDATE lastActivity

       IF choice == "3" (Discard):
         ARCHIVE session without sync
         START fresh session
```

### Archive Format

Archive orphaned sessions to `~/.claude/state/archived-sessions/{sessionId}.json`:

```json
{
  "sessionId": "2026-01-19-02",
  "archived": "2026-01-19T18:00:00Z",
  "reason": "orphan-recovered",
  "syncedBeforeArchive": true,
  "workItems": [...],
  "originalSession": {...}
}
```

---

## Enforcement Rules

### MUST Track (Mandatory - Auto-create)

| Work Type | Trigger | Confidence Required |
|-----------|---------|---------------------|
| Bug fixes | Error + code change | >= 0.90 (auto) |
| Feature completion | "done", "finished", "shipped" | >= 0.90 (auto) |

### SHOULD Track (Recommended - Suggest)

| Work Type | Trigger | Confidence Required |
|-----------|---------|---------------------|
| Research spikes | Investigation keywords | >= 0.70 (suggest) |
| Documentation | .md file changes | >= 0.70 (suggest) |
| Refactoring | Refactor keywords + code | >= 0.70 (suggest) |

### OPTIONAL Track (User Discretion)

| Work Type | Trigger | Action |
|-----------|---------|--------|
| Minor fixes | Small tweaks | Show in checkpoint summary |
| Exploration | Questions, learning | Do not track |
| Conversation | Discussion only | Do not track |

---

## False Positive Prevention

To minimize unwanted work item creation:

1. **Context Window**: Only analyze last 20 turns (not entire session)
2. **Confirmation Required**: Below 0.90 confidence, always ask
3. **Explicit Opt-Out**: "don't track this" prevents inference for topic
4. **Domain Filtering**: Only infer work related to active Epic/Features
5. **Cooldown**: Rejected items won't be re-suggested for 24 hours
6. **No Duplicates**: Check existing ADO items before suggesting new

### Opt-Out Handling

When user says "don't track this":

```
1. Add to rejectedInferences:
   {
     inferenceId: generate_id(),
     title: inferred_title,
     reason: "user-rejected",
     rejectedAt: now(),
     cooldownUntil: now() + 24hr
   }

2. Remove from activeWork if present

3. Confirm: "Got it - won't track this topic"
```

---

## Commands

### `/sync-devops` - Force Sync

Force immediate sync to Azure DevOps:

```
SYNC_DEVOPS():
  1. Run full checkpoint sync
  2. Show sync summary:
     ```
     **DevOps Sync Complete**
     - Items synced: {count}
     - Items created: {count}
     - Comments added: {count}

     **Active Work Items:**
     - #{id}: {title} (confidence: {conf})
     ```
```

### `/inferred-work` - Show Inferred Items

Display what Claude thinks you're working on:

```
INFERRED_WORK():
  Read work-tracker.json

  SHOW:
  ```
  **Inferred Work Items**

  | # | Title | Type | Confidence | ADO ID | Status |
  |---|-------|------|------------|--------|--------|
  | inf-001 | Fix auth timeout | Bug | 0.92 | #1001 | synced |
  | inf-002 | Add checkpoint sync | Task | 0.85 | - | pending |

  **Commands:**
  - "track this as #123" - Link to existing work item
  - "don't track [item]" - Remove from tracking
  - `/sync-devops` - Force sync now
  ```
```

### `/reject-inference [id]` - Reject Inference

Reject a specific inferred item:

```
REJECT_INFERENCE(inference_id):
  1. Find item in activeWork
  2. Move to rejectedInferences with 24hr cooldown
  3. Confirm: "Removed {title} from tracking"
```

---

## Integration Points

### With /checkpoint

Add to checkpoint.md after step 2 (Update Session State):

```markdown
### 2.5. Sync to DevOps (SILENT)

Run the DevOps sync flow:
1. Read work-tracker.json
2. For high-confidence items: auto-create or update
3. For medium-confidence items: queue for checkpoint summary
4. Update work-tracker.json with sync status

This runs silently unless there are items needing user confirmation.
```

### With /start-work

Add to start-work.md before step 1:

```markdown
### 0. Session Recovery Check

Check for orphaned previous sessions:
1. Read session.json and work-tracker.json
2. If previous session not completed AND idle > 4 hours:
   - Show orphan warning with options
   - Wait for user choice
   - Execute recovery action
```

### With /end-work

Enhanced sync in step 9 (Update Azure DevOps):

```markdown
### 9. Comprehensive DevOps Sync

Use work-tracker.json for complete sync:
1. Close all completed inferred items
2. Add final summaries to all active items
3. Link commits to relevant work items
4. Archive session to sessionHistory
5. Reset activeWork for next session
```

---

## Related

- `/checkpoint` - Triggers checkpoint sync
- `/start-work` - Includes session recovery
- `/end-work` - Full sync with all items
- `/reminder` - Items feed into inference engine
- `/status` - Shows inferred work count
