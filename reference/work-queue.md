# Work Queue Management

Queue-based model replaces traditional priority (P0/P1/P2/P3) for AI-assisted work velocity.

---

## Queue Flow

```
CAPTURED → GROOMED → QUEUED (ready/blocked) → DONE
```

---

## Work Item States

| State | Meaning | Can Work? |
|-------|---------|-----------|
| `captured` | Raw idea, needs grooming | No |
| `groomed` | Has criteria + estimate | Queue it |
| `ready` | In queue, no blockers | Yes |
| `blocked` | Waiting on dependency | No |
| `in-progress` | Currently being worked | Active |
| `done` | Completed and verified | N/A |

---

## Queue Attributes (Replaces Priority)

| Attribute | Purpose |
|-----------|---------|
| **Effort** | XS/S/M/L/XL time estimate |
| **Blocked By** | What's stopping this |
| **Unblocks** | What's waiting on this |
| **Initiative** | Parent strategic goal |
| **Sequence** | Queue position (dynamic) |

---

## Effort with AI Assist

| Size | Human + Claude |
|------|----------------|
| XS | 15 min |
| S | 1 hour |
| M | 2-4 hours |
| L | 1 day |
| XL | 2-3 days |

---

## Initiative Forecasting

Dashboard rolls up work items to strategic initiatives with delivery estimates based on:
- Ready work hours
- Blocked items + unblock ETAs
- Team capacity (hours/day)

---

## File Locations

| Location | Purpose |
|----------|---------|
| `~/.claude/learning/ideas/backlog.md` | Work queue |
| `~/.claude/learning/ideas/lifecycle.md` | Queue model details |
| `~/.claude/learning/ideas/strategy.md` | Strategic considerations |
| `~/.claude/learning/ideas/decisions.md` | Pending decisions |
| `~/.claude/commands/groom.md` | Grooming command |
| `~/.claude/commands/reminder.md` | In-session capture |
