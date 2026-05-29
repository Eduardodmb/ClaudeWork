# Learn - Capture Knowledge

Quickly capture a learning, correction, or insight into the appropriate location in your knowledge system.

## Purpose

**Accelerates knowledge capture** by:
- Providing a fast path to record learnings without disrupting flow
- Routing knowledge to the correct location (memory, CLAUDE.md, learning/, etc.)
- Ensuring insights don't get lost in conversation history
- Building a self-improving system over time

## When to Use

| Trigger | Action |
|---------|--------|
| "I learned that..." | Capture the learning |
| Correction given to Claude | Offer to capture |
| Pattern noticed 3+ times | Suggest formalizing |
| Mistake made | Learn from it |
| Successful approach validated | Document what worked |

## Usage

```
/learn [content]

Examples:
  /learn Use integration tests with real DB, not mocks
  /learn Odoo 18 uses <list> not <tree> in views
  /learn User prefers terse responses with no summaries
```

## Learning Types & Routing

| Type | When | Where | Format |
|------|------|-------|--------|
| **Feedback** | Correction or validated approach | memory/feedback_*.md | Rule + Why + How to apply |
| **Project** | Current work, goals, deadlines | memory/project_*.md | Fact + Why + How to apply |
| **User** | Preferences, role, expertise | memory/user_*.md | Profile information |
| **Reference** | External system pointers | memory/reference_*.md | Where to find things |
| **CLAUDE.md** | Codebase-specific patterns | project CLAUDE.md | Learnings section |
| **Ideas Backlog** | Future improvements | learning/ideas/backlog.md | Dated entry |
| **Best Practice** | Proven patterns (3+ uses) | learning/best-practices/ | Documented pattern |

## Workflow

1. **Capture** - Record the learning
2. **Route** - Determine correct location
3. **Format** - Structure appropriately
4. **Index** - Update MEMORY.md if needed
5. **Confirm** - Show what was captured

## Examples

### Feedback Memory
```markdown
User: "Don't create README files unless I ask"

/learn → Creates memory/feedback_no_auto_documentation.md:

---
name: No automatic documentation
description: Don't create README/guides unless explicitly requested
type: feedback
---

Never create documentation files (*.md, README) unless explicitly requested by the user.

**Why:** User wants documentation only when specifically asked for it, not proactively.

**How to apply:** Before creating any .md file, verify the user explicitly requested it. This applies to README.md, guides, tutorials, etc.
```

### Project Memory
```markdown
User: "We're freezing merges after Thursday for the mobile release"

/learn → Creates memory/project_merge_freeze.md:

---
name: Merge freeze for mobile release
description: Merge freeze begins 2026-05-12 for mobile release cut
type: project
---

Merge freeze begins 2026-05-12 (Thursday) for mobile team release branch cut.

**Why:** Mobile team is cutting a release branch and needs stability.

**How to apply:** Flag any non-critical PR work scheduled after 2026-05-12. Only critical fixes should be merged during freeze period.
```

### CLAUDE.md Learning
```markdown
User: "You should have read the existing code before making that change"

/learn → Adds to project CLAUDE.md Learnings section:

[2026-05-08] Always read existing files before modifying. Making changes without reading leads to breaking existing patterns and introducing bugs.
```

### Ideas Backlog
```markdown
User: "I wonder if we could auto-generate API docs from the code"

/learn → Adds to learning/ideas/backlog.md:

- [2026-05-08] Auto-generate API documentation from code annotations
  - Would reduce documentation drift
  - Need to research: JSDoc → Markdown tools
  - Complexity: Medium
  - Value: High (keeps docs in sync)
```

## Integration with Memory System

When creating memories:
1. Check if similar memory exists (update instead of duplicate)
2. Use semantic filenames (feedback_testing.md not feedback_1.md)
3. Keep MEMORY.md index under 200 lines
4. Verify memory after creation (show user what was saved)

## Natural Language Triggers

| User Says | Claude Does |
|-----------|-------------|
| "I learned that..." | Offer `/learn` or auto-capture |
| "Next time..." | Capture in ideas backlog |
| "Don't do X" | Create feedback memory |
| "Remember to..." | Create reference or project memory |
| Corrects Claude | Offer to capture correction |

## Related Commands

- `/reminder` - In-session action capture (different from learning)
- `/brain-dump` - Unstructured thought capture
- `/checkpoint` - Save session state
- `/memory` - View/edit memory system

## Quick Reference

```
Correction → memory/feedback_*.md
Project info → memory/project_*.md
Codebase pattern → CLAUDE.md learnings
Future idea → learning/ideas/backlog.md
Proven pattern (3+ uses) → learning/best-practices/
```
