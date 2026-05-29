---
source: https://www.tiktok.com/t/ZP8f5JmXh/
title: Claude Code Context Management with "Get Shit Done" Tool
channel: Charles J Dove (@ccstrategic.io)
date_analyzed: 2026-01-19
duration: ~1:00
tags: [claude-code, context-engineering, ai-automation, productivity, project-management]
implementation_status: not-started
safari_relevance: high
---

# Claude Code Context Management with "Get Shit Done" Tool

## TL;DR

Extended Claude Code sessions suffer from "context rot" where bloated conversation histories cause the AI to lose focus and drift. The solution is structuring projects into discrete phases with checkpoints and markdown documentation, allowing Claude to start each phase fresh while pulling organized context from files rather than messy chat histories.

## Key Takeaways

### 1. Context Degradation is a Real Problem
- Long development sessions cause "context window bloat"
- AI model performance degrades as conversations accumulate
- Focus and coherence diminish over extended builds
- This is called "context rot" or "model drift"

### 2. Structure Projects into Discrete Phases
- Break work into clear phases with defined checkpoints
- Use roadmaps to guide multi-phase development
- Each phase should have clear entry/exit criteria
- Document progress at checkpoints in markdown files

### 3. Pull Context from Files, Not Chat History
- Start each phase with fresh context
- Store project state in organized markdown documentation
- Let Claude read structured files rather than scrolling back through conversation
- This keeps context clean and relevant

## Actionable Items for Safari

| Item | Priority | Target App | Status |
|------|----------|------------|--------|
| Evaluate "Get Shit Done" tool for Claude Code workflow | Medium | Claude Code | not-started |
| Document phase checkpoint structure for complex builds | Medium | All Projects | not-started |
| Add context reset protocol to `/end-work` flow | Low | Workflow | not-started |
| Create phase documentation template | Low | Templates | not-started |

## Patterns to Consider

```markdown
# Project Roadmap

## Phase 1: [Name]
- [ ] Task 1
- [ ] Task 2
**Checkpoint:** [What should be true when done]

## Phase 2: [Name]
- [ ] Task 1
- [ ] Task 2
**Checkpoint:** [What should be true when done]

---
**Current Phase:** 1
**Last Updated:** YYYY-MM-DD
```

## Quotes Worth Remembering

> "Context rot, window bloat, and AI model drift during extended builds"

> "Cleaner context management enabling sustained AI performance"

## Related Content
- Our existing `/start-work` and `/end-work` workflow already addresses some of this
- The learning catalog (`~/.claude/learning/`) serves as persistent context storage
- Boris Cherny workflow emphasizes similar incremental checkpoint approach

## Implementation Notes

### Current State
We already have elements of this approach:
- Session lifecycle with `/start-work` and `/end-work`
- Learning catalog for persistent documentation
- Project CLAUDE.md files for context loading

### Potential Enhancements
- Add explicit "phase" tracking to complex projects
- Create checkpoint documentation protocol
- Consider the "Get Shit Done" tool for projects > 1 day effort
- Add context health check to `/status` command

### What We Learned
- Our workflow is aligned with these best practices
- May benefit from more explicit phase boundaries on large efforts
- Worth investigating the specific tool mentioned for adoption

---

*Analyzed by: Claude + Dallas*
*Session Date: 2026-01-19*
*Platform: TikTok*
*Engagement: 837 likes, 150 shares, 16.7K plays*
