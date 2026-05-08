# Resume Session

Smart session resumption with change detection.

## Automatic Triggers
- Called by session-resume hook on Claude Code resume
- Can be manually invoked with `/resume-session`

## Steps

### 1. Read Previous Session State
```
Read ~/.claude/state/session.json
Extract: sessionId, lastActivity, focus, activeWorkItems
```

### 2. Calculate Idle Duration
```
idleDuration = now - lastActivity
```

### 3. Check for Uncommitted Changes (if in git repo)
```bash
git status --short
```

### 4. Query ADO for Work Item Updates
```
wit_my_work_items(project: "Information Technology", includeCompleted: false)
Compare against cached items in strategy.json
```

### 5. Detect Changes

| Change Type | Detection | Response |
|-------------|-----------|----------|
| New item assigned | Item in ADO not in cache | Alert: "New work item assigned" |
| State changed | Item state differs from cache | Note: "Work item state changed" |
| Item completed by others | Item now Closed | Note: "Work item completed" |
| Priority shift | New P0/P1 item | Alert: "Priority shift detected" |

### 6. Determine Workflow Based on Context

**Short Break (< 30 minutes, no changes):**
```
Welcome back. Continuing: [focus]
Work item: #[id] - [title] ([state])
```

**Medium Break (30 min - 4 hours, no changes):**
```
Session pause detected.

**Previous Focus**: [focus]
**Work Item**: #[id] - [title] ([state])
**Idle Duration**: [duration]

Continue previous work or start fresh?
```

**Long Break (> 4 hours) OR Changes Detected:**
```
Extended break or changes detected.

**Previous Focus**: [focus]
**Idle Duration**: [duration]

**Changes Detected**:
- [list of changes]

**Recommended Action**: [continue/pivot/new session]

Options:
1. Continue previous focus
2. Switch to [new priority item]
3. Start fresh session
4. Review what changed in detail
```

**New High-Priority Item:**
```
Priority Shift Detected

**New Item**: #[id] - [title] (P[priority])
**Current Focus**: [focus]

Switch to new priority or continue current work?
```

### 7. Update Session State

After user responds:
- Update session.json with new lastActivity
- Update focus if changed
- Add new work items to activeWorkItems

### 8. Suggest Relevant Skills

Based on chosen focus, suggest top 3-5 skills:
```
**Relevant Skills** for this work:
- /[skill1] - [description]
- /[skill2] - [description]
```

## Output Format

```
## Session Resumed

**Idle Duration**: [duration]
**Previous Focus**: [focus]
**Changes**: [none | list]

[Context-appropriate message based on idle duration and changes]

**Relevant Skills**: [skill suggestions based on focus]

[Question or confirmation based on context]
```

## Fallbacks

| Condition | Action |
|-----------|--------|
| No session.json | Treat as fresh session, run /start-work |
| ADO MCP not connected | Skip change detection, show cached state |
| strategy.json missing | Skip comparison, show current ADO state |
| No previous focus | Ask for new focus |

## Related
- `/start-work` - Full session start
- `/end-work` - Close session
- `/sync-strategy` - Update strategy cache
- `/status` - Quick check without session changes
