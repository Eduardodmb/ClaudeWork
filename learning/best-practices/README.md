# Best Practices

Validated learnings that have proven useful multiple times.

## Organization

Create one file per topic:
- `{technology}.md` - Technology-specific practices
- `{pattern}.md` - Design patterns or approaches
- `{workflow}.md` - Process improvements
- `{domain}.md` - Domain-specific knowledge

## Template

Create new files using this structure:

```markdown
---
topic: topic-name
created: yyyy-mm-dd
updated: yyyy-mm-dd
tags: [tag1, tag2, tag3]
validated: true
---

# Topic Name

## Context
When does this apply? What problem does it solve?

## The Practice
What to do (or not do). Be specific and actionable.

## Why It Works
Explanation of the reasoning and tradeoffs.

## Examples
Real-world usage examples.

## Related
- Link to related learnings
- Link to skills that use this
- External references
```

## Categories

Organize learnings by category:

- **Languages:** `typescript-*.md`, `python-*.md`, `sql-*.md`
- **Patterns:** `repository-pattern.md`, `dependency-injection.md`
- **Tools:** `git-*.md`, `docker-*.md`, `vscode-*.md`
- **Architecture:** `api-design.md`, `database-design.md`
- **Performance:** `query-optimization.md`, `caching-strategies.md`

## Promotion Criteria

Move from `ideas/backlog.md` to `best-practices/` when:
- ✅ Used successfully 3+ times
- ✅ Benefits are clear and measurable
- ✅ Tradeoffs are understood
- ✅ Can be explained to others

## Maintenance

- Update files when practices evolve
- Add `updated:` date in frontmatter
- Archive practices that are superseded
- Link related learnings together
