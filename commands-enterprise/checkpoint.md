# Checkpoint (GSD Phase Transition)

Create a context checkpoint to prevent context rot. Based on "Get Shit Done" methodology.

## Purpose

**Prevents context rot** by:
- Documenting current phase progress
- Creating clean handoff for next phase
- Allowing fresh context starts with organized files

## When to Use

| Trigger | Action |
|---------|--------|
| Natural breakpoint in work | Checkpoint |
| Context feeling bloated | Checkpoint |
| Before significant direction change | Checkpoint |
| After completing major milestone | Checkpoint |
| Conversation > 50 turns | Consider checkpoint |

## Instructions

### 1. Document Current Phase State

Create/update phase file at `~/.claude/state/phase.md`:

```markdown
# Current Phase

**Phase:** [Phase Name/Number]
**Started:** [Date]
**Status:** [in-progress|completed|blocked]

## Completed in This Phase
- [x] Item 1
- [x] Item 2

## In Progress
- [ ] Current item (where we stopped)

## Context Snapshot
- **Key Files:** [list of important files for this work]
- **Key Decisions:** [important decisions made]
- **Blockers:** [if any]

## Next Phase Preview
- [ ] First item for next phase
- [ ] Second item

---
*Checkpoint: [timestamp]*
```

### 2. Update Session State

Add phase tracking to `~/.claude/state/session.json`:

```json
{
  "phase": {
    "name": "Phase Name",
    "number": 1,
    "checkpointCount": 3,
    "lastCheckpoint": "2026-01-19T12:00:00Z",
    "contextTurns": 45
  }
}
```

### 3. Context Health Assessment

Calculate and report context health:

| Metric | Green | Yellow | Red |
|--------|-------|--------|-----|
| Conversation turns | < 30 | 30-60 | > 60 |
| Files mentioned | < 20 | 20-40 | > 40 |
| Topics discussed | < 5 | 5-10 | > 10 |
| Time since checkpoint | < 2hr | 2-4hr | > 4hr |

### 4. Display Checkpoint Summary

```
## Checkpoint Created

**Phase:** [Name] (Phase [N] of [Total])
**Context Health:** [Green|Yellow|Red]
**Turns This Phase:** [N]
**Time Since Start:** [duration]

**What's Done:**
- Item 1
- Item 2

**What's Next:**
- Next item 1
- Next item 2

**Key Context for Next Phase:**
- [File 1] - [why it matters]
- [File 2] - [why it matters]

**Checkpoint saved to:** ~/.claude/state/phase.md

---
Fresh start? Say "start fresh" to begin new phase with clean context.
Continue? Just keep working - context is documented.
```

## Fresh Start Protocol

If user says "start fresh" after checkpoint:

1. Read `~/.claude/state/phase.md` for context
2. Increment phase number
3. Summarize: "Starting Phase [N]. Key context loaded from checkpoint."
4. Continue with documented next items

## Integration with Workflow

| Command | Checkpoint Integration |
|---------|----------------------|
| `/start-work` | Load last checkpoint if exists, show context health |
| `/status` | Include context health indicator |
| `/end-work` | Auto-checkpoint before closing |

## Context Health in Status

Add to `/status` output:

```
**Context Health:** [Green|Yellow|Red]
- Turns: [N] | Since checkpoint: [duration]
- Tip: Run /checkpoint to refresh context
```

## Anti-Patterns

| Don't | Do Instead |
|-------|------------|
| Let conversations run 100+ turns | Checkpoint at 40-50 turns |
| Jump between unrelated topics | Checkpoint before topic shifts |
| Forget what files matter | Document key files at checkpoint |
| Lose track of decisions | Record decisions in checkpoint |

## Related

- `/start-work` - Begin session (loads checkpoints)
- `/end-work` - Close session (auto-checkpoints)
- `/status` - Quick check with context health
- `~/.claude/state/phase.md` - Phase documentation
