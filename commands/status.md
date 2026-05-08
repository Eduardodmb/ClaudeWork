# Status Check

Quick context check without starting/ending a session.

## Instructions

When the user runs `/status`, provide a concise overview:

### 1. Current Session Status
Check if there's an active session log for today in `projects/sessions/`:
- If yes: Show session start time and focus area
- If no: Note "No active session - run /start-work to begin"

### 2. Git Status
```bash
git status --short
git log -1 --oneline
```

Show:
- Uncommitted changes (if any)
- Last commit

### 3. Active Projects Summary
For each project in `projects/active/`:
- Project name and current phase
- Brief status (1 line)
- Next task

### 4. Recent Work
If session logs exist, show last 3 sessions:
- Date and focus
- Key accomplishment

### 5. Context Health (GSD)

Check for context rot indicators:

```
# Assess context health based on:
# - Conversation length (turns in current session)
# - Time since last checkpoint
# - Topic drift (are we still on original focus?)
```

**Health Indicators:**

| Status | Criteria | Display |
|--------|----------|---------|
| Green | < 30 turns, < 2hr since checkpoint, on focus | `Context: Fresh` |
| Yellow | 30-60 turns, 2-4hr, minor drift | `Context: Warm - consider /checkpoint` |
| Red | > 60 turns, > 4hr, significant drift | `Context: Hot - recommend /checkpoint` |

Read `~/.claude/state/phase.md` if exists for last checkpoint info.

### 6. Strategic Context
One-liner on current strategic priority from SKILL-015.

## Output Format

```
## Status

**Session**: Active since 14:30 - Focus: Documentation updates
**Context**: Fresh (12 turns, 45min) | Last checkpoint: 14:45
**Git**: 2 uncommitted files | Last: `abc1234` feat: add commands

**Active Projects**
- Agentic DevOps Management: Phase 1 - MCP server auth in progress
- Safari Trace v2: Planning - Requirements gathering

**Azure DevOps**: #123 Task (Active), #124 Task (Active)
**Phase**: 2/4 - Implementation

**Recent Sessions**
- Jan 18: Documentation updates (in progress)
- Jan 17: Safari Trace README rewrites
- Jan 16: BeFirst MES documentation

**Priority**: Developer Experience & Documentation

---
Commands: /start-work | /checkpoint | /end-work
```

## Quick Variants

### `/status git`
Just show git status and recent commits.

### `/status projects`
Just show active projects and their status.

### `/status sessions`
Show last 5 session summaries.

## Related
- `/start-work` - Begin a session
- `/end-work` - Close a session
- `.claude/boris-workflow.md` - Workflow principles
