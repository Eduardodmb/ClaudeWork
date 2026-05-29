# /groom - Backlog Grooming

## Purpose

Transform ungroomed backlog items into ADO-ready work items with acceptance criteria, estimates, and clear scope.

## When User Says

- "groom the backlog"
- "let's groom"
- "groom item #X"
- "refine the backlog"
- "/groom"

## Argument

Optional item number: `/groom [#]` or `/groom` for batch grooming

## Grooming Checklist

Each item must have:

| Field | Required | Example |
|-------|----------|---------|
| Title | Yes | "Implement user authentication with Entra ID" |
| Description | Yes | Why this matters, context |
| Acceptance Criteria | Yes | Bullet list of "done" conditions |
| Effort | Yes | XS / S / M / L / XL |
| Priority | Yes | P0 / P1 / P2 / P3 |
| Domain | Yes | safari-trace, infrastructure, etc. |
| Dependencies | If any | "Requires #21 (domain integration)" |
| ADO Type | Yes | Task, Requirement, Bug, Feature |

## Execution Steps

### Single Item: `/groom #17`

1. Read the item from backlog.md
2. Display current state:
   ```
   ## Grooming Item #17

   **Current:** Research public Claude Code skills for world-class Safari Trace interface
   **Status:** captured (ungroomed)
   **Domain:** safari-trace
   **Effort:** M
   ```

3. Prompt for missing fields:
   ```
   Let's groom this item:

   1. **Title** - Is this clear? [keep/refine]
   2. **Description** - Why does this matter?
   3. **Acceptance Criteria** - What defines "done"?
   4. **Dependencies** - Blocked by anything?
   5. **ADO Type** - Task, Requirement, or Feature?
   ```

4. Update backlog.md with groomed details
5. Change status from `captured` to `groomed`
6. Confirm:
   ```
   Item #17 groomed -> ready for validation
   ```

### Batch Grooming: `/groom`

1. List all ungroomed items:
   ```
   ## Ungroomed Items (12 total)

   | # | Item | Domain | Priority | Effort |
   |---|------|--------|----------|--------|
   | 17 | Research public Claude Code skills... | safari-trace | P2 | M |
   | 18 | Deploy Fourth Shift REST API wrapper | fourth-shift-api | P1 | XL |
   ...

   Which items to groom? (all / #s / skip)
   ```

2. For each selected item, run single-item flow
3. Summarize at end:
   ```
   ## Grooming Complete

   - Groomed: 5 items
   - Skipped: 2 items
   - Ready for validation: #17, #18, #19, #20, #21
   ```

## Groomed Item Format

Update backlog.md entry to include:

```markdown
| # | Item | Domain | Type | Effort | Status |
|---|------|--------|------|--------|--------|
| 17 | Research public Claude Code skills for Safari Trace interface | safari-trace | research | M | groomed |

**#17 Details:**
- **Description:** Analyze public Claude Code skill repositories to identify patterns for building an inspiring, world-class interface for Safari employees.
- **Acceptance Criteria:**
  - [ ] Survey 10+ public Claude Code skill repos
  - [ ] Document 5+ UI/UX patterns applicable to Safari Trace
  - [ ] Create recommendation doc for implementation
- **Dependencies:** None
- **ADO Type:** Task
```

## Promoting to ADO

After grooming, items can be validated and promoted:

```
/validate-idea #17  ->  Checks against IT strategy
/promote-to-ado #17 ->  Creates ADO work item
```

Or batch promote:
```
/promote-to-ado groomed  ->  Promotes all groomed+validated items
```

## Status Flow

```
captured -> groomed -> validated -> promoted (in ADO)
   |          |          |
deferred   rejected   deferred
```

## Integration with /reminder

When `/reminder` captures items with `groom` category:
- Item added to backlog with `needs-grooming` status
- Flagged for next grooming session
- Shows in `/groom` batch list

## Natural Language Triggers

| User Says | Action |
|-----------|--------|
| "this needs grooming" | Mark current item for grooming |
| "let's refine #17" | Groom specific item |
| "what needs grooming?" | List ungroomed items |
| "groom and promote" | Groom then create ADO work items |
