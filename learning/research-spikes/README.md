# Research Spikes

Research spikes are **time-boxed explorations** that capture what agentic workflows produce when given minimal prompting. They serve as:

1. **Learning artifacts** - Document what worked and what didn't
2. **Skill seeds** - Patterns that can be promoted to reusable skills
3. **Process evidence** - Show how Claude approaches novel problems

## Structure

Each spike follows this pattern:

```
research-spikes/
  YYYY-MM-DD-{topic}.md    # Dated spike document
  README.md                # This file
```

## Spike Lifecycle

```
Spike → Learning → Skill → Standard
  ↓         ↓        ↓         ↓
Document  Extract  Codify   Enforce
```

| Stage | Location | Promotion Trigger |
|-------|----------|-------------------|
| Spike | `research-spikes/` | Spike completed |
| Learning | `best-practices/` | Pattern validated |
| Skill | `~/.claude/skills/` | Used 3+ times successfully |
| Standard | `CLAUDE.md` | Team adoption |

## When to Create a Spike

- Exploring a new MCP or tool capability
- Testing agentic workflow patterns
- Investigating how Claude approaches a domain
- Capturing a complex multi-step analysis

## Template

```markdown
---
title: [Descriptive title]
date: YYYY-MM-DD
type: research-spike
status: documented|validated|promoted
safari_relevance: high|medium|low
promotion_candidate: true|false
tags: [relevant, tags]
---

# Research Spike: [Title]

## Objective
What were we trying to learn?

## Trigger
What prompt/request initiated this?

## Agentic Discovery Process
What steps did Claude take?

## Key Findings
What did we discover?

## Reusable Patterns
What can be extracted for future use?

## Session Learnings
What worked? What didn't?

## Promotion Path
Where should this knowledge live long-term?
```

## Index

| Date | Topic | Status | Promoted To |
|------|-------|--------|-------------|
| 2026-01-21 | Power BI Analysis Prompting | documented | `skills/powerbi-model-analysis` |
