# /research - Context-Engineered Discovery Phase

> Based on Dex Horthy's Frequent Intentional Compaction methodology from HumanLayer

## Purpose
Conduct comprehensive codebase/domain research by spawning parallel sub-agents, then compress findings into a structured artifact that fits within 40% context budget.

## When to Use
- Before any non-trivial implementation task
- When entering an unfamiliar codebase area
- When the path forward is unclear
- Before creating an implementation plan

## Initial Response
When invoked, respond:
> "I'm ready to research. Please provide your research question or problem statement, and I'll analyze it by exploring relevant components and connections."

## Process

### Step 1: Read Mentioned Files First
If the user references specific files, read them completely (no limit/offset) in main context before spawning sub-tasks.

### Step 2: Decompose the Query
Break the research question into 3-5 composable investigation areas:
- What files/components are involved?
- How does the existing implementation work?
- What patterns exist that we should follow?
- What documentation/context exists?

Create a TodoWrite task list tracking all subtasks.

### Step 3: Spawn Parallel Research Agents
Use Task tool with subagent_type=Explore for each investigation area. Be specific:
- "Find all files related to [X] in [directory]"
- "Analyze how [component] handles [behavior]"
- "Locate existing patterns for [type of work]"

### Step 4: Synthesize Results
Wait for ALL sub-agents to complete. Compile findings into structured output:
- Specific file paths with line numbers
- Architecture overview
- Dependency relationships
- Relevant patterns to follow

### Step 5: Write Research Artifact
Create `~/.claude/worktrees/{task-id}/research.md`:

```markdown
---
date: YYYY-MM-DD
task_id: {from user or inferred}
topic: {research question}
status: complete
context_tokens_estimate: {rough estimate}
---

# Research: {Topic}

## Question
{Original research question}

## Summary
{2-3 sentence executive summary}

## Key Findings

### Files Involved
| File | Purpose | Lines |
|------|---------|-------|
| path/to/file.ts:45-120 | Description | 75 |

### Architecture
{How components connect}

### Existing Patterns
{Patterns to follow, with examples}

### Dependencies
{What this touches, what touches this}

## Open Questions
{Anything requiring human judgment}

## Recommended Next Steps
{What should happen in Plan phase}
```

### Step 6: Present Summary
Give user a concise summary. Ask: "Ready to proceed to planning phase?"

## Critical Constraints
- **Document WHAT IS, not WHAT SHOULD BE**
- Never suggest improvements unless asked
- Never critique implementation
- Stay within discovery scope
- Target: Research artifact under 150 lines

## Context Management
- Use sub-agents to prevent main context pollution
- Compress verbose tool outputs into structured findings
- If context exceeds 40%, pause and checkpoint
