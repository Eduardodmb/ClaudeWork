# /reminder - In-Session Action Capture

## Purpose

Capture and analyze a single thought or prompt during a work session, routing it to the appropriate action queue without disrupting flow.

## When User Says

- "reminder: [something]"
- "note to self: [something]"
- "we should [something]"
- "don't forget to [something]"
- "add a reminder"
- "/reminder"

## Argument

Takes an optional prompt argument: `/reminder $ARGUMENTS`

## Action Categories

| Category | Description | Destination |
|----------|-------------|-------------|
| **groom** | Work item needs refinement, acceptance criteria, estimation | ADO work item comment or update |
| **strategy** | Strategic consideration, roadmap item, long-term thinking | `~/.claude/learning/ideas/strategy.md` |
| **research** | Needs investigation, spike, proof of concept | ADO Task (Research type) or backlog |
| **decision** | Pending decision that blocks or affects work | `~/.claude/learning/ideas/decisions.md` |
| **followup** | General follow-up needed, no specific category | Session notes or backlog |
| **document** | Something that should be documented | Documentation task or inline note |
| **blocker** | Something blocking current work | Flag immediately, may need escalation |

## Execution Steps

### Step 1: Capture Input

If `$ARGUMENTS` provided, use it directly.

If no arguments, prompt:
> "What's on your mind? I'll figure out what to do with it."

### Step 2: Analyze the Prompt

Parse the input to determine:

1. **Category** - Which action type from table above
2. **Urgency** - Now (blocks current work) vs Later (queue for after session)
3. **Context** - Related to current work item? General?
4. **Specificity** - Clear action vs needs clarification

Look for signals:
| Signal | Indicates |
|--------|-----------|
| "we need to define", "what about", "acceptance criteria" | groom |
| "long term", "roadmap", "eventually", "vision" | strategy |
| "look into", "investigate", "how does X work", "spike" | research |
| "should we", "need to decide", "which approach" | decision |
| "remember to", "later", "at some point" | followup |
| "should document", "write up", "note that" | document |
| "blocked", "waiting on", "can't proceed" | blocker |

### Step 3: Confirm Category

Display quick confirmation:
```
[Captured]: "[summary of item]"
   Category: [category] | Urgency: [now/later]

   Is this correct? (y/n/change to: groom|strategy|research|decision|followup|document|blocker)
```

If user confirms or doesn't respond within context, proceed.

### Step 4: Route to Destination

Based on category:

#### groom
- If current work item context exists -> Add comment to ADO work item
- Else -> Add to `~/.claude/learning/ideas/backlog.md` with `needs-grooming` tag

#### strategy
- Append to `~/.claude/learning/ideas/strategy.md`:
```markdown
### [Date] - [Brief Title]
**Context:** [Current work if relevant]
**Note:** [The captured item]
**Status:** Captured
```

#### research
- If urgent -> Create ADO Task with type "Research" under current feature
- Else -> Add to backlog with `research` tag

#### decision
- Append to `~/.claude/learning/ideas/decisions.md`:
```markdown
### [Date] - [Decision Topic]
**Context:** [What prompted this]
**Options:** [If mentioned]
**Deadline:** [If mentioned, else "None set"]
**Status:** Open
```

#### followup
- Add to session notes (in-memory for `/end-work` summary)
- Optionally add to backlog

#### document
- If specific file mentioned -> Create TODO comment or note
- Else -> Add to backlog with `documentation` tag

#### blocker
- **Immediately flag in output**
- Add to ADO work item if context exists
- Prompt: "Do you want to pause current work to address this?"

### Step 5: Acknowledge & Continue

Brief acknowledgment (don't disrupt flow):
```
[Category]: "[item]" -> [destination]
```

Then continue with whatever work was in progress.

## Quick Mode

For rapid capture without confirmation, prefix with `!`:
```
/reminder ! need to add error handling for edge case
```

This auto-categorizes and routes without prompting.

## Session Integration

All reminders captured during a session are summarized in `/end-work`:

```markdown
## Session Reminders

| Time | Category | Item | Routed To |
|------|----------|------|-----------|
| 10:32 | research | Look into caching options | Backlog |
| 11:15 | groom | Add acceptance criteria for #978 | ADO Comment |
| 11:45 | decision | Choose between REST vs GraphQL | decisions.md |
```

## File Locations

| File | Purpose |
|------|---------|
| `~/.claude/learning/ideas/backlog.md` | General backlog items |
| `~/.claude/learning/ideas/strategy.md` | Strategic considerations |
| `~/.claude/learning/ideas/decisions.md` | Pending decisions log |
| `~/.claude/learning/ideas/session-reminders.md` | Current session log |

## Examples

**Input:** `/reminder we should add rate limiting to the API`
```
Captured: "Add rate limiting to API"
   Category: groom | Urgency: later

groom: "Add rate limiting to API" -> backlog.md (needs-grooming)
```

**Input:** `/reminder ! blocked on database credentials`
```
BLOCKER: "Blocked on database credentials"
   -> Flagged for immediate attention

   Do you want to pause current work to address this?
```

**Input:** `/reminder should we use Kafka Connect or custom Spark consumer for this integration?`
```
Captured: "Kafka Connect vs Spark consumer decision"
   Category: decision | Urgency: later

decision: "Kafka Connect vs Spark consumer" -> decisions.md (Open)
```
