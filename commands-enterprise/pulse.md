# Pulse Check (Daily Work Rhythm)

Quick status check with priority re-evaluation and scope management. Use throughout the day to stay on track.

## Purpose

**Maintains focus** by:
- Detecting scope creep before it derails sessions
- Re-evaluating priorities as the day progresses
- Providing clear pivot points for research/grooming interrupts
- Keeping the "big picture" visible while executing

## When to Use

| Trigger | Frequency |
|---------|-----------|
| Natural language: "pulse", "check in", "where am I?" | On-demand |
| After completing a significant chunk of work | Recommended |
| Before context feels heavy (~20 turns) | Recommended |
| When unsure what to work on next | Always |
| Feeling scattered or context-switching anxiety | Always |

## Pulse Types

### 1. Morning Pulse (first /start-work of day)

**Integrated into `/start-work`** - comprehensive status:

```
## ☀️ Morning Pulse - [Day, Date]

**Session Landscape:**
- 🔴 2 orphaned sessions from yesterday
- ✅ DevOps: 5 active items, 2 blocked

**Yesterday's Unfinished:**
- HTML Audit (session 2f83...) - 90% complete
- Data Architecture rebrand - diagrams pending

**Today's Priorities (from DevOps):**
1. #1234 P1-Foundation: Neo4j setup (blocked → unblock today?)
2. #1235 P2-Enabler: Safari MCP scaffold
3. #1240 P3-Value: Team onboarding docs

**Recommended Focus:**
→ Close orphaned HTML audit session first (15 min)
→ Then tackle #1234 blocker

**What would you like to focus on?**
```

### 2. Mid-Session Pulse (on-demand)

Quick check without disrupting flow:

```
## ⚡ Quick Pulse

**Current Session:** 45 min, 18 turns
**Focus:** "Implementing session health skill"
**Scope:** ✅ On track (single skill, single goal)

**Context Health:** 🟢 Fresh (18 turns, 12 files)

**Priority Check:**
- ✅ Aligned with P2-Enabler: Context governance
- No urgent items waiting

**Continue or pivot?**
→ Continue current work (on track)
→ Say "pivot" to re-evaluate priorities
→ Say "research" to interrupt for investigation
→ Say "groom" to switch to backlog refinement
```

### 3. Deep Pulse (explicit request or after 2+ hours)

Full re-evaluation:

```
## 🔍 Deep Pulse - Priority Re-Evaluation

**Session Status:**
- Duration: 2h 15m
- Turns: 52 (checkpoint recommended)
- Files touched: 8
- Scope drift: 🟡 Slight (started with 1 skill, now 3)

**Work Item Alignment:**
| Session Work | ADO Item | Status |
|--------------|----------|--------|
| session-health skill | #1250 | ✅ Aligned |
| pulse command | #1251 | ✅ Aligned |
| start-work enhancement | #1252 | 🟡 Scope expansion |

**All Active Initiatives (big picture):**
| Initiative | Status | Next Action |
|------------|--------|-------------|
| Context Governance | 🟢 Active | Finish session-health |
| Data Architecture | 🟡 Paused | Resume after governance |
| FortiClient EMS | 🟡 Waiting | Eduardo to test |
| BeFirst MES | ⚪ Not started | Grooming needed |

**Recommendations:**
1. **Checkpoint now** - 52 turns, context getting warm
2. **Narrow scope** - Finish session-health, defer others
3. **Consider closing** - 2h is a good stopping point

**Actions:**
→ "checkpoint" - Save progress, continue
→ "narrow" - Refocus on single deliverable
→ "wrap up" - Move toward /end-work
→ "show priorities" - Full DevOps priority view
```

## Session Scope Management

### Scope Indicators

| Signal | Meaning | Action |
|--------|---------|--------|
| Single work item focus | ✅ Narrow (good) | Continue |
| 2-3 related items | 🟡 Moderate | Monitor |
| 4+ items or unrelated | 🔴 Wide (risky) | Split session |
| "While we're here..." | 🔴 Scope creep | Capture as reminder |
| Topic drift from focus | 🟡 Drifting | Re-anchor or checkpoint |

### When to Split a Session

**Split when:**
- Working on unrelated initiatives
- Context health turns 🟡 or 🔴
- Duration > 2 hours without clear end in sight
- Switching between execution and planning modes

**How to split:**
1. Checkpoint current work
2. Run `/end-work` to close cleanly
3. Run `/start-work` with new focus
4. Reference previous session if needed

### Scope Anchoring

At session start, anchor scope with:
```
**Session Scope Anchor:**
- Focus: [single deliverable or outcome]
- Timebox: [target duration, e.g., 1-2 hours]
- Exit criteria: [what "done" looks like]
- Out of scope: [things to capture but not do]
```

When scope creep detected:
```
⚠️ **Scope Alert**

You mentioned "[new topic]" which is outside current focus.

Options:
1. **Capture as reminder** - Log for later, stay focused
2. **Pivot** - Checkpoint current, switch to new topic
3. **Expand** - Add to session (increases context load)

Choose: [1] Capture / [2] Pivot / [3] Expand
```

## Integration with Workflow

### /start-work Enhancement

Add Morning Pulse when first session of day:

```markdown
### 0.1 Daily Pulse (if first session of day)

**Detect first session of day:**
1. Read ~/.claude/state/session.json
2. If lastSessionDate != today:
   - Run Morning Pulse
   - Show orphaned sessions
   - Show priority re-evaluation
   - Set lastSessionDate = today

**Morning Pulse output:**
- Session landscape (orphans, long-running)
- Priority stack from DevOps
- Recommended focus
- Acknowledge before proceeding
```

### Mid-Session Triggers

Auto-suggest pulse at:
- 20 turns
- 1 hour elapsed
- Topic change detected
- "What should I do?" type questions

### Pivot Protocol

When user says "pivot", "research", or "groom":

```markdown
## Pivot Protocol

1. **Quick checkpoint** of current work
2. **Capture current progress** in session.json
3. **Acknowledge pivot:**

```
**Pivot acknowledged**

Current work saved:
- Focus: "Session health skill"
- Progress: 60% (SKILL.md created, integration pending)
- Resume hint: "Complete /start-work integration"

**New mode:** [Research / Grooming / Execution]

What would you like to investigate/groom/execute?
```
```

## Commands

### /pulse

Quick pulse check:
```
/pulse [type]

Types:
  (default)   Mid-session quick check
  --morning   Full morning pulse
  --deep      Deep re-evaluation
  --scope     Scope analysis only
  --priority  Priority alignment only
```

### Natural Language Triggers

| User Says | Execute |
|-----------|---------|
| "pulse", "check in", "where am I" | /pulse |
| "what should I focus on" | /pulse --priority |
| "am I on track" | /pulse --scope |
| "show me the big picture" | /pulse --deep |
| "morning check", "start my day" | /pulse --morning |

## Daily Work Rhythm

### Recommended Flow

```
Morning (first session)
├── /start-work → Morning Pulse
├── Address orphaned sessions
├── Select focus from priorities
└── Narrow scope, set timebox

Mid-Morning
├── Execute on focus
├── /pulse at 20 turns or 1 hour
└── Checkpoint if needed

Lunch Break
├── /checkpoint or /end-work
└── Context preserved

Afternoon
├── /start-work → Resume or new focus
├── /pulse as needed
└── Address any priority changes

End of Day
├── /pulse --deep (review accomplishments)
├── /end-work (proper closure)
└── All sessions closed cleanly
```

### Interrupt Handling

When interrupts occur (meetings, urgent requests):

```
## Interrupt Protocol

1. **Quick capture:** "reminder: [interrupt topic]"
2. **Checkpoint:** Auto-save progress
3. **Handle interrupt**
4. **Resume:** /pulse to re-orient

**After interrupt:**
"Welcome back! Last working on: [focus]
Time away: [duration]
Recommendation: [continue / checkpoint / re-evaluate]"
```

## Related

- `/start-work` - Morning pulse integration
- `/checkpoint` - Context preservation
- `/reminder` - Capture tangential thoughts
- `/groom` - Backlog refinement mode
- `/end-work` - Proper session closure
- `/session-health` - Detailed health analysis
