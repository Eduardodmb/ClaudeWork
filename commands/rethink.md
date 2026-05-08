# Rethink / Pivot

Pivot approach within the current session while preserving learnings. Use when you realize the current direction isn't working.

## Purpose

**Enables in-session pivots** by:
- Acknowledging the current approach isn't working
- Documenting what was learned (preventing repeated mistakes)
- Creating a clean pivot point in the session
- Proposing alternative approaches
- Continuing with preserved context chain

## The Problem This Solves

```
WITHOUT /rethink:
┌─────────────────────────────────────────────────────────────────┐
│  Session A: "Create HTML with mermaid diagrams"                 │
│  ├── Work, work, work...                                        │
│  ├── Discover: Mermaid doesn't render well in HTML              │
│  ├── Frustrated, end session                                    │
│  └── Start Session B from scratch                               │
│      └── Lost context: Why mermaid failed, what was tried       │
└─────────────────────────────────────────────────────────────────┘

WITH /rethink:
┌─────────────────────────────────────────────────────────────────┐
│  Session A: "Create HTML with mermaid diagrams"                 │
│  ├── Work, work, work...                                        │
│  ├── Discover: Mermaid doesn't render well in HTML              │
│  ├── /rethink "mermaid doesn't work, use inline SVG instead"    │
│  │   ├── Document learning → CLAUDE.md                          │
│  │   ├── Pivot point marked                                     │
│  │   └── New approach: inline SVG diagrams                      │
│  └── Continue with full context + new direction                 │
└─────────────────────────────────────────────────────────────────┘
```

## When to Use

| Situation | Use /rethink | Don't Use |
|-----------|--------------|-----------|
| Approach isn't working | ✅ | |
| Discovered better way | ✅ | |
| Technology doesn't fit | ✅ | |
| Requirements misunderstood | ✅ | |
| Want to explore tangent | | Use `/branch` |
| Context too bloated | | Use `/checkpoint` + restart |
| Work is done | | Use `/end-work` |

## Syntax

```
/rethink                                    # Interactive pivot
/rethink "mermaid doesn't work in HTML"     # With reason
/rethink --learning "always use inline SVG" # With explicit learning
```

## Instructions

### 1. Acknowledge Current State

```
CAPTURE_CURRENT_STATE():
  1. Summarize current approach:
     - What we were trying to do
     - What we tried
     - What's not working
     - Why it's not working

  2. Display current state:

  ╔═══════════════════════════════════════════════════════════════╗
  ║  🔄 RETHINK: Pivot Point                                       ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                                ║
  ║  CURRENT APPROACH                                              ║
  ║  ─────────────────────────────────────────────────────────────║
  ║  Goal: {original_goal}                                         ║
  ║  Approach: {current_approach}                                  ║
  ║  Status: {not_working_because}                                 ║
  ║                                                                ║
  ║  WHAT WE LEARNED                                               ║
  ║  ─────────────────────────────────────────────────────────────║
  ║  • {learning_1}                                                ║
  ║  • {learning_2}                                                ║
  ║                                                                ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### 2. Document Learning (Automatic)

```
DOCUMENT_LEARNING():
  learning = {
    date: today,
    context: session_focus,
    issue: what_didnt_work,
    insight: why_it_didnt_work,
    recommendation: better_approach
  }

  # Prompt for confirmation
  "Should I add this learning to CLAUDE.md?"

  IF confirmed:
    APPEND to Learnings section:
    "- [{date}] {context}: {insight}. {recommendation}."
```

### 3. Create Pivot Point

```
CREATE_PIVOT_POINT():
  1. Update session state with pivot marker
  2. Write to ~/.claude/state/session.json:
     {
       "pivots": [
         {
           "turn": current_turn,
           "timestamp": now,
           "fromApproach": current_approach,
           "toApproach": new_approach,
           "reason": why_pivoting,
           "learningCaptured": true
         }
       ]
     }

  3. Update phase.md with pivot record
```

### 4. Propose Alternative Approaches

```
PROPOSE_ALTERNATIVES():
  Based on what didn't work, suggest:

  ╔═══════════════════════════════════════════════════════════════╗
  ║  ALTERNATIVE APPROACHES                                        ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                                ║
  ║  Given that {original_approach} doesn't work because          ║
  ║  {reason}, here are alternatives:                              ║
  ║                                                                ║
  ║  [1] {alternative_1}                                           ║
  ║      Pro: {benefit}                                            ║
  ║      Con: {tradeoff}                                           ║
  ║                                                                ║
  ║  [2] {alternative_2}                                           ║
  ║      Pro: {benefit}                                            ║
  ║      Con: {tradeoff}                                           ║
  ║                                                                ║
  ║  [3] Suggest your own approach                                 ║
  ║                                                                ║
  ║  Which direction? [1/2/3]                                      ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### 5. Confirm New Direction

```
CONFIRM_NEW_DIRECTION():
  After user selects:

  ╔═══════════════════════════════════════════════════════════════╗
  ║  ✅ PIVOT CONFIRMED                                            ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                                ║
  ║  FROM: {old_approach}                                          ║
  ║  TO:   {new_approach}                                          ║
  ║                                                                ║
  ║  Learning captured: ✓ Added to CLAUDE.md                       ║
  ║  Pivot point: Turn {turn_number}                               ║
  ║                                                                ║
  ║  Context preserved:                                            ║
  ║  • Original goal still valid                                   ║
  ║  • Files referenced: {files}                                   ║
  ║  • Work items: {work_items}                                    ║
  ║                                                                ║
  ║  Continuing with new approach...                               ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### 6. Continue Session

```
CONTINUE_WITH_NEW_APPROACH():
  1. Update session focus to reflect pivot
  2. Maintain full context from before pivot
  3. Apply new approach to original goal
  4. Reference learning if encountering similar patterns
```

## Example: HTML + Mermaid Pivot

```
User: /rethink "mermaid diagrams aren't rendering in the HTML file"

╔═══════════════════════════════════════════════════════════════╗
║  🔄 RETHINK: Pivot Point                                       ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                ║
║  CURRENT APPROACH                                              ║
║  ─────────────────────────────────────────────────────────────║
║  Goal: Create branded HTML document with architecture diagrams ║
║  Approach: Embed mermaid.js diagrams in HTML                   ║
║  Status: Not working - mermaid requires JS runtime,            ║
║          file:// protocol blocks scripts, diagrams don't render║
║                                                                ║
║  WHAT WE LEARNED                                               ║
║  ─────────────────────────────────────────────────────────────║
║  • Mermaid requires JavaScript execution                       ║
║  • Local HTML files block external scripts (security)          ║
║  • Self-contained HTML needs inline content                    ║
║                                                                ║
╠═══════════════════════════════════════════════════════════════╣
║  ALTERNATIVE APPROACHES                                        ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                ║
║  [1] Inline SVG diagrams (Recommended)                         ║
║      Pro: Works offline, full styling control, self-contained  ║
║      Con: More verbose, manual creation                        ║
║                                                                ║
║  [2] Pre-rendered PNG/JPG images                               ║
║      Pro: Simple, universal support                            ║
║      Con: Not scalable, separate files needed                  ║
║                                                                ║
║  [3] CSS-only diagrams (flexbox/grid)                          ║
║      Pro: Pure HTML/CSS, no images                             ║
║      Con: Limited to simple layouts                            ║
║                                                                ║
║  Which direction? [1/2/3]                                      ║
╚═══════════════════════════════════════════════════════════════╝

User: 1

╔═══════════════════════════════════════════════════════════════╗
║  ✅ PIVOT CONFIRMED                                            ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                ║
║  FROM: Mermaid.js diagrams                                     ║
║  TO:   Inline SVG diagrams                                     ║
║                                                                ║
║  Learning captured: ✓ Added to CLAUDE.md                       ║
║  "HTML deliverables: Use inline SVG, not mermaid. Mermaid      ║
║   requires JS runtime which is blocked on file:// protocol."   ║
║                                                                ║
║  Continuing with inline SVG approach...                        ║
╚═══════════════════════════════════════════════════════════════╝
```

## Pivot vs Branch vs Restart

| Action | Context | Learnings | Best For |
|--------|---------|-----------|----------|
| `/rethink` | Preserved | Captured | Approach change, same goal |
| `/branch` | Forked | Returned via merge | Tangent exploration |
| `/end-work` + restart | Lost | Manual | Completely different work |

## Integration with Session Graph

```
UPDATE_SESSION_ON_PIVOT():
  session.pivots.push({
    turn: current_turn,
    from: old_approach,
    to: new_approach,
    reason: reason,
    learningId: learning_ref
  })

  session.currentApproach = new_approach
```

## Auto-Suggestion

Claude may suggest `/rethink` when detecting:
- Repeated failures with same approach
- User frustration signals
- Technology mismatch discovered
- "This isn't working" language

```
💡 It seems like {approach} isn't working well for {reason}.
   Would you like to /rethink the approach?
```

## Related

- `/branch` - Explore tangent without disrupting
- `/checkpoint` - Save progress without pivoting
- `/cockpit` - View all sessions and pivots
- `/end-work` - Close session entirely
- CLAUDE.md Learnings - Where pivot insights are captured
