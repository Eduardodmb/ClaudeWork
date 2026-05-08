# Promoted Practices Queue

This folder tracks practices that have been **validated** and are ready for promotion to CLAUDE.md enforcement.

## Promotion Workflow

1. Practice validated in `best-practices/`
2. Create promotion file here: `YYYY-MM-DD-practice-name.md`
3. Review and approve
4. Add to appropriate CLAUDE.md
5. Move to `promoted/archive/` with promotion date

## Pending Promotions

| File | Practice | Target CLAUDE.md | Status |
|------|----------|------------------|--------|
| - | - | - | - |

## Recently Promoted

| Date | Practice | Promoted To |
|------|----------|-------------|
| 2026-01-18 | TypeScript conventions | ~/.claude/CLAUDE.md |
| 2026-01-18 | Git workflow | ~/.claude/CLAUDE.md |
| 2026-01-18 | Parsimony principle | ~/.claude/CLAUDE.md |
| 2026-01-18 | Safari branding | ~/.claude/CLAUDE.md |

## Promotion File Template

```markdown
---
practice: [Practice Name]
source: [path to best-practices file]
validated_date: YYYY-MM-DD
target: [global|safari-trace|specific-project]
enforcement_level: [MUST|SHOULD|MAY]
---

# [Practice Name] Promotion

## Summary
[Brief description of the practice]

## Enforcement Rule

**Rule:** [MUST|SHOULD|MAY] [action]

**Do:**
- Item 1
- Item 2

**Don't:**
- Item 1
- Item 2

**Why:** [Reasoning]

## Approval

- [ ] Validated in real work
- [ ] Enforcement rules clear
- [ ] No conflicts with existing rules
- [ ] Ready for CLAUDE.md
```

---

*Create files here when practices are ready for enforcement*
