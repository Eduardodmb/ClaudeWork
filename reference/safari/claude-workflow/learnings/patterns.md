# Effective Patterns

Patterns that work well, discovered across team sessions. Auto-aggregated.

## Format

```markdown
### [Pattern Name]
**When:** When to use this pattern
**How:** How to implement it
**Why:** Why it works
**Source:** [user/session]
```

---

## Workflow Patterns

### Automatic Session Management
**When:** Every Claude session
**How:** Claude silently loads checkpoint on first message, checkpoints throughout, saves on session end
**Why:** Users focus on work, not workflow. Reduces cognitive load.
**Source:** Dallas/2026-01-19

### Silent Checkpointing
**When:** ~50 turns, task completion, topic shift
**How:** Update `~/.claude/state/phase.md` without announcing
**Why:** Prevents context rot without interrupting user flow
**Source:** Dallas/2026-01-19

### Self-Improving Learnings Loop
**When:** Mistake corrected, pattern discovered, friction encountered
**How:** Auto-capture to learnings, promote to team repo
**Why:** Every session makes future sessions better
**Source:** Dallas/2026-01-19

---

## DevOps Patterns

### Unified Naming Convention
**When:** Creating branches, commits, work items
**How:**
- Branch: `[type]/[work-item-id]-[slug]`
- Commit: `[type]: [description] (#[work-item])`
- Work item: `[Action]: [Description]`
**Why:** Traceability across GitHub, Azure DevOps, Claude sessions
**Source:** Dallas/2026-01-19

---

## Code Patterns

### TypeScript Type Over Interface
**When:** Defining types in TypeScript
**How:** Use `type` keyword, string literal unions instead of enum
**Why:** Team standard, better tree-shaking, simpler mental model
**Source:** Org standard

---

## Template for New Entries

```markdown
### [Pattern Name]
**When:**
**How:**
**Why:**
**Source:**
```
