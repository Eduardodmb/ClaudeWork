# Session Health Check Skill

Detects and reports on session health issues including orphaned sessions, long-running sessions, and context bloat.

## Purpose

**Prevents productivity loss** from:
- Orphaned sessions consuming context without closure
- Long-running sessions degrading LLM quality (>40% utilization)
- Context bloat from multi-day sessions without checkpoints
- Priority drift from sessions scoped too wide

## When to Use

| Trigger | Auto-Run |
|---------|----------|
| `/start-work` | Always (integrated) |
| `/pulse` | Always (integrated) |
| First message of day | Recommended |
| Manual: `/session-health` | On-demand |

## Session Health Metrics

### 1. Orphaned Sessions

Sessions not closed with `/end-work`:

```
DETECT_ORPHANED():
  1. Scan ~/.claude/projects/{project}/*.jsonl
  2. For each session file:
     - Parse last entry timestamp
     - Check for end-work marker
     - If no marker AND lastActivity > 4 hours ago → ORPHANED

  3. Return orphan list with:
     - Session ID
     - First prompt (summary)
     - Duration (start → last activity)
     - Message count
     - File size
```

**Severity Levels:**

| Condition | Severity | Action |
|-----------|----------|--------|
| < 24 hours old | 🟡 Warning | Suggest resume or close |
| 24-72 hours old | 🟠 Elevated | Recommend immediate closure |
| > 72 hours old | 🔴 Critical | Archive or close urgently |
| > 200 messages | 🔴 Critical | Context likely degraded |

### 2. Long-Running Sessions

Sessions exceeding healthy thresholds:

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Duration | < 2 hours | 2-4 hours | > 4 hours |
| Turns | < 50 | 50-100 | > 100 |
| File size | < 500KB | 500KB-1MB | > 1MB |
| Calendar days | Same day | 2 days | 3+ days |

### 3. Context Bloat Indicators

Signs the session is accumulating too much context:

- **Topic drift**: Multiple unrelated work items discussed
- **File sprawl**: > 40 unique files referenced
- **Tool spam**: Repeated tool calls without progress
- **Thinking bloat**: Extended reasoning chains

### 4. Priority Drift Detection

Compare session focus to DevOps priorities:

```
DETECT_PRIORITY_DRIFT():
  1. Read session focus from session.json
  2. Query ADO for user's active work items
  3. Compare:
     - Is session focus aligned with highest priority?
     - Are there blocked items that could be unblocked?
     - Are there urgent items being ignored?
  4. Return drift assessment
```

## Health Check Output

### Summary Dashboard

```
╔════════════════════════════════════════════════════════════════╗
║                    SESSION HEALTH DASHBOARD                     ║
╠════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  🔴 ORPHANED SESSIONS: 2 found                                  ║
║  ├─ 2f83586b (4d old, 655 msgs, 5.7MB) - HTML Audit            ║
║  │  └─ Recommendation: Archive or close                        ║
║  └─ 0ae3d0e2 (1d old, 89 msgs) - Data Architecture             ║
║     └─ Recommendation: Resume and close                        ║
║                                                                 ║
║  🟡 LONG-RUNNING: 1 active                                      ║
║  └─ Current session: 2h 15m, 45 turns                          ║
║     └─ Recommendation: Checkpoint at 50 turns                  ║
║                                                                 ║
║  ✅ PRIORITY ALIGNMENT: On track                                ║
║  └─ Focus matches #1234 (P1-Foundation)                        ║
║                                                                 ║
╚════════════════════════════════════════════════════════════════╝
```

### Detailed Orphan Report

```
## Orphaned Session Details

### Session: 2f83586b-1b33-47cb-b9fd-eab31ccfbe72

| Metric | Value | Status |
|--------|-------|--------|
| Duration | 4 days 5 hours | 🔴 Critical |
| Messages | 655 | 🔴 Context bloat |
| User turns | 153 | 🔴 High interaction |
| File size | 5.7 MB | 🔴 Large transcript |
| Last activity | Feb 10, 22:13 | 🟠 1 day ago |

**First prompt:** "can you load our safari documentation app"
**Work trajectory:**
- Safari documentation app loading
- HTML deliverables audit via screenshots
- DevOps work item creation

**Resume command:**
```bash
claude --resume 2f83586b-1b33-47cb-b9fd-eab31ccfbe72
```

**Options:**
1. **Resume** - Continue and close properly
2. **Archive** - Save summary, don't sync to DevOps
3. **Close remote** - Run /end-work sync without resuming
```

## Integration with /start-work

Add to Step 0 (Session Recovery Check):

```markdown
### 0. Session Health Check (REQUIRED)

**Before starting new work, assess session landscape:**

1. **Scan for orphaned sessions:**
   - Run DETECT_ORPHANED() on project session files
   - If orphans found, display health dashboard
   - Wait for user decision before proceeding

2. **Check for long-running active sessions:**
   - If resuming a session, check duration/turns
   - Warn if approaching critical thresholds

3. **Assess priority alignment:**
   - Load DevOps priorities
   - Compare to session focus
   - Flag drift if misaligned

**Display health summary in session start:**
```
**Session Health**: 🟡 2 orphaned sessions detected
└─ Run `/session-health` for details or choose: [Resume oldest] [Archive all] [Ignore]
```
```

## Commands

### /session-health

Full health audit:
```
/session-health [options]

Options:
  --scan        Scan all project sessions
  --orphans     Show only orphaned sessions
  --current     Analyze current session only
  --archive-all Archive all orphans without syncing
```

### Actions

| Command | Effect |
|---------|--------|
| `resume <id>` | Open session in new terminal |
| `archive <id>` | Save summary, clear from active |
| `close-remote <id>` | Run /end-work sync without resuming |
| `archive-all` | Archive all orphans |

## Automatic Behaviors

### Daily First Session

On first `/start-work` of the day:
1. Run full session health scan
2. Show orphan summary
3. Show priority re-evaluation
4. Require acknowledgment before proceeding

### Mid-Session Pulse

At checkpoint intervals (20 turns or 2 hours):
1. Quick health check
2. Scope drift detection
3. Priority alignment check
4. Surface if issues found

## Related

- `/start-work` - Integrates health check at step 0
- `/pulse` - Mid-day status check with health
- `/end-work` - Proper session closure
- `/checkpoint` - Context preservation
