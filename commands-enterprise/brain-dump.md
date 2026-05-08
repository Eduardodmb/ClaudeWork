# /brain-dump - ADHD Brain Processor

## Purpose

Transform stream-of-consciousness input into an organized, prioritized action list.

## When User Says

- "brain dump"
- "dump my thoughts"
- "I have a bunch of ideas"
- "let me get this out of my head"
- "/brain-dump"

## Execution Steps

### Step 1: Capture Input

If user hasn't provided input yet, prompt:
> "Go ahead - dump everything on your mind. Don't worry about organization, I'll sort it out."

### Step 2: Parse into Discrete Items

Read the input and identify distinct actionable items. Look for:
- Separate sentences or thoughts
- "and also", "oh and", "another thing"
- Topic shifts
- Implicit tasks hidden in descriptions

### Step 3: Categorize Each Item

For each item, determine:

| Field | Options |
|-------|---------|
| **Domain** | safari-trace, safari-analyze, safari-pm, safari-docs, infrastructure, learning, personal |
| **Type** | feature, bug, research, documentation, decision, idea |
| **Priority** | P0 (urgent), P1 (high), P2 (medium), P3 (low) |
| **Effort** | XS (< 1hr), S (1-4hr), M (1-2 days), L (3-5 days), XL (> 1 week) |
| **Status** | captured, needs-clarification, ready, in-progress |

### Step 4: Generate Output

Display as markdown table:

```markdown
## Brain Dump Results - [Date]

| # | Item | Domain | Type | Priority | Effort | Status |
|---|------|--------|------|----------|--------|--------|
| 1 | [item] | [domain] | [type] | [P#] | [size] | captured |
```

### Step 5: Save to Idea Backlog

Append to `~/.claude/learning/ideas/backlog.md`:

```markdown
## [Date] Brain Dump

### Items Captured
[table from above]

### Raw Input
> [original input preserved]
```

### Step 6: Offer Next Actions

Ask user:
> Which of these would you like to:
> 1. **Promote to ADO** - Create work items in Azure DevOps
> 2. **Plan now** - Start working on one immediately
> 3. **Clarify** - Get more details on unclear items
> 4. **Defer** - Leave in backlog for later review

### Step 7: If Promote to ADO Selected

For selected items, use Azure DevOps MCP tools:
- `wit_create_work_item` - Create PBI/Task/Bug
- Set area path based on domain
- Set priority and effort as tags

## Output Format

Always output:
1. Summary count: "Captured X items across Y domains"
2. The categorized table
3. Top 3 highest priority items highlighted
4. Next action prompt

## Example

**Input:**
> "I need to fix that bug in the docs search, also we should add a project management module to safari trace, and I want to research better UI patterns, oh and don't forget to set up the learning catalog thing we talked about, and maybe look into how OpenMetadata works"

**Output:**
```
## Brain Dump Results - 2026-01-18

Captured 5 items across 3 domains

| # | Item | Domain | Type | Priority | Effort | Status |
|---|------|--------|------|----------|--------|--------|
| 1 | Fix docs search bug | safari-docs | bug | P1 | S | ready |
| 2 | Add project management module | safari-trace | feature | P2 | L | captured |
| 3 | Research UI patterns | learning | research | P2 | M | captured |
| 4 | Set up learning catalog | infrastructure | feature | P1 | S | ready |
| 5 | Research OpenMetadata | safari-analyze | research | P2 | M | captured |

### Top Priority
1. **Fix docs search bug** (P1, ready to work)
2. **Set up learning catalog** (P1, ready to work)

### Next Actions?
1. Promote to ADO
2. Plan now
3. Clarify items
4. Defer to backlog
```

## File Locations

- Backlog: `~/.claude/learning/ideas/backlog.md`
- Archive: `~/.claude/learning/ideas/archive/`
- ADO sync log: `~/.claude/learning/ideas/ado-sync.md`
