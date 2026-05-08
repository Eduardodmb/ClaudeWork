# Work Item Conflict Resolution Decision Framework

Quick reference for resolving multi-user work item conflicts.

## Decision Matrix

| External Change | Your Work | Recommended Action | Rationale |
|-----------------|-----------|-------------------|-----------|
| **Closed/Removed** | Completed | Supplement | Add your completion details as comment |
| **Closed/Removed** | In progress | Rework | Review closure, create new item if needed |
| **Reassigned** | Any | Rework | Coordinate with new assignee first |
| **Scope changed** | Any | Review | Read new requirements, adjust if needed |
| **State changed** (not closed) | Completed | Replace | Your completion supersedes |
| **State changed** (not closed) | In progress | Supplement | Both progress, combine |
| **Comments only** | Any | Supplement | Safe to add your changes |
| **Minor metadata** | Any | Replace | Your update is fresher |

## Action Definitions

### Replace
**Use when:** Your work supersedes or is more current than external changes.

**What happens:**
- Your changes overwrite the current ADO state
- External user's changes are preserved in ADO history
- You own the current state

**Risk level:** Medium - confirm the external changes aren't critical

### Supplement
**Use when:** Both changes are valuable and complementary.

**What happens:**
- Your changes are added on top of current ADO state
- Results in merged state (your changes + theirs)
- Both contributions preserved

**Risk level:** Low - additive only

### Rework
**Use when:** External changes invalidate or significantly impact your work.

**What happens:**
- Discard your local tracking of this item
- Accept current ADO state as truth
- May need to create new item or restart work

**Risk level:** Low for ADO, high for your time investment

### Skip
**Use when:** Need more time to review or coordinate.

**What happens:**
- No sync for this item
- Local changes preserved
- Review at next checkpoint or manual sync

**Risk level:** Low - defers decision

## Severity-Based Guidance

### Critical Severity
- Item closed or reassigned away from you
- **Default:** Show full conflict UI, require explicit choice
- **Never auto-resolve**

### High Severity
- State change or scope change (description/acceptance criteria)
- **Default:** Show conflict notification, recommend review
- **May suggest:** Replace if your work is completion

### Medium Severity
- Content updates to tracked fields
- **Default:** Show brief notification
- **May suggest:** Supplement or Replace based on change type

### Low Severity
- Comments or minor metadata only
- **Default:** Silent (unless configured otherwise)
- **Auto-action:** Supplement

## Scenario Examples

### Scenario 1: Parallel Bug Fixes
```
Your work: Fixed authentication timeout bug
External: Sarah added logging to the same module

Severity: Medium
Recommended: Supplement
Reason: Both changes are complementary
```

### Scenario 2: Item Closed
```
Your work: 80% complete on feature implementation
External: PM closed item as "Won't Fix"

Severity: Critical
Recommended: Rework
Reason: Need to understand why it was closed, may need new item
```

### Scenario 3: Reassignment
```
Your work: Started investigation on bug
External: Item reassigned to Alex for specialized expertise

Severity: Critical
Recommended: Rework (coordinate)
Reason: Alex now owns this, share your findings with them
```

### Scenario 4: Scope Change
```
Your work: Implemented based on original requirements
External: Acceptance criteria updated with new requirements

Severity: High
Recommended: Review
Reason: Your implementation may not match new requirements
```

## Configuration

In `~/.claude/state/work-tracker.json`:

```json
{
  "syncConfig": {
    "autoResolve": false,      // Never auto-resolve
    "notifyOnLow": false,      // Skip low-severity notifications
    "notifyOnMedium": true,    // Show medium-severity
    "notifyOnHigh": true,      // Always show high
    "notifyOnCritical": true   // Always show critical
  }
}
```

## Quick Commands

| Command | Purpose |
|---------|---------|
| `/sync-work-items` | Force check for conflicts now |
| `/work-item-status` | Show all tracked items with sync state |
| `"skip"` during conflict | Defer this item, continue with others |

## Related

- `~/.claude/skills/work-item-sync/SKILL.md` - Full sync logic
- `~/.claude/commands/end-work.md` - Conflict resolution at session end
- `~/.claude/commands/checkpoint.md` - Change detection at checkpoints
