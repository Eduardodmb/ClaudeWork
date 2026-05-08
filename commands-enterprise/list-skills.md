# List Skills

Display all available skills organized by category for discovery and reference.

## Instructions

When the user runs `/list-skills` (or says "list skills", "show skills", "what skills are available"), display skills organized by source and category.

### 1. Read Skill Index

Check `~/.claude/state/skill-index.json` for cached skill inventory. If missing or stale (>24h), regenerate.

### 2. Display Format

```
## Available Skills (119 total)

### Session Commands (~/.claude/commands/)
| Command | Purpose |
|---------|---------|
| /start-work | Begin session, show work items, suggest skills |
| /end-work | Close session, update ADO, log accomplishments |
| /status | Quick context without session changes |
| /validate-work | Run verification loop |
| /brain-dump | Capture ideas into backlog |
| /review-backlog | Review and prioritize idea backlog |
| /first-principles | Break down complex problems |
| /learn-video | Analyze video content for learnings |
| /reminder | Quick in-session thought capture |
| /groom | Refine backlog items with criteria |
| /list-skills | This command |

### Superpowers Skills (~/.claude/skills/superpowers/)
Development workflow skills from obra/superpowers.

| Skill | Purpose | Triggers |
|-------|---------|----------|
| brainstorming | Socratic design refinement | plan, design, think |
| writing-plans | Detailed implementation plans | plan, spec |
| executing-plans | Batch execution with checkpoints | execute, build |
| subagent-driven-development | Fast iteration with two-stage review | parallel, agents |
| systematic-debugging | 4-phase root cause process | debug, fix, error |
| test-driven-development | RED-GREEN-REFACTOR cycle | test, TDD |
| verification-before-completion | Ensure it's actually fixed | verify, done |
| code-reviewer | Pre-review checklist | review, PR |
| receiving-code-review | Responding to feedback | feedback |
| requesting-code-review | Request review | review |
| using-git-worktrees | Parallel development branches | branch, worktree |
| finishing-a-development-branch | Merge/PR decision workflow | merge, finish |
| dispatching-parallel-agents | Concurrent subagent workflows | parallel |
| writing-skills | Create new skills | skill, create |
| using-superpowers | Introduction to skills system | help |

### Anthropic Skills (~/.claude/skills/anthropic-skills/)
Official Anthropic document and creative skills.

| Skill | Purpose | Triggers |
|-------|---------|----------|
| pdf | Create PDF documents and forms | pdf, document |
| docx | Create Word documents | word, docx, document |
| xlsx | Create Excel spreadsheets | excel, xlsx, spreadsheet |
| pptx | Create PowerPoint presentations | powerpoint, pptx, slides |
| mcp-builder | Build MCP servers | mcp, server |
| frontend-design | UI/UX design patterns | design, ui, frontend |
| web-artifacts-builder | Build web components | web, artifact |
| canvas-design | Canvas-based design | canvas, design |
| brand-guidelines | Apply brand standards | brand, style |
| doc-coauthoring | Collaborative document editing | edit, coauthor |
| internal-comms | Internal communications | comms, announcement |
| skill-creator | Create new skills | skill, create |
| theme-factory | Generate UI themes | theme, style |
| webapp-testing | Test web applications | test, webapp |
| algorithmic-art | Generative art | art, generative |
| slack-gif-creator | Create Slack GIFs | gif, slack |

### Safari Organizational Skills (organizational-docs/agents/skills/)
Safari Circuits business domain skills.

| Skill | Purpose | Domain |
|-------|---------|--------|
| SKILL-001 | Documentation commit workflow | documentation |
| SKILL-002 | Code review | analysis |
| SKILL-003 | API endpoint generation | code-generation |
| SKILL-004 | React component generation | code-generation |
| SKILL-005 | UX design documentation | code-generation |
| SKILL-007 | GitHub repo analysis | research |
| SKILL-008 | Migration planning | research |
| SKILL-011 | Azure DevOps work items | operations |
| SKILL-012 | Skill development | research |
| SKILL-013 | Changelog generation | documentation |
| SKILL-014 | DDD area path assignment | operations |
| SKILL-015 | IT strategy prioritization | operations |
| SKILL-016 | Project management | operations |

### Domain-Specific Skills
| Domain | Skills |
|--------|--------|
| Engineering | engineering-eco, fullstack, api-design |
| Finance | finance-reporting |
| HR | hr-onboarding |
| Marketing | content-creator, demand-gen-specialist |
| Product | product-manager, ux-research |
| Leadership | ceo-advisor, cto-advisor |
| Compliance | iso-13485, mdr, fda |

---
**Tip:** Skills activate automatically based on context. You can also invoke directly with `/skill-name`.
```

## Filtering Options

### `/list-skills [category]`
Filter by category:
- `process` - Planning, debugging, TDD
- `output` - Documents, presentations
- `review` - Code review skills
- `domain` - Business domain skills
- `commands` - Session management

### `/list-skills [keyword]`
Search skills by keyword:
```
/list-skills debug -> Shows systematic-debugging, verification-before-completion
/list-skills document -> Shows pdf, docx, doc-coauthoring, SKILL-001
```

## Task-to-Skill Mappings

When suggesting skills, use these mappings:

| User Task | Suggested Skills |
|-----------|------------------|
| New feature | brainstorming, writing-plans, TDD, executing-plans |
| Bug fix | systematic-debugging, verification-before-completion |
| Documentation | docx, pdf, doc-coauthoring |
| Presentation | pptx, brand-guidelines, canvas-design |
| Data analysis | xlsx, data-pipeline |
| Code review | code-reviewer, receiving-code-review |
| Planning | writing-plans, brainstorming, first-principles |
| Research | learn-video, brain-dump |
| Refactoring | systematic-debugging, TDD |
| API development | mcp-builder, api-design, SKILL-003 |
| Frontend | frontend-design, web-artifacts-builder, webapp-testing |

## Skill Discovery

If a skill matches the user's current focus:
1. Mention it proactively: "This task could benefit from the **systematic-debugging** skill."
2. Offer to activate: "Would you like me to follow the TDD workflow?"

## Regenerating Index

If skills are added or modified:
```bash
# Scan all skill directories and update index
# Update ~/.claude/state/skill-index.json
```

## Related

- `/start-work` - Suggests skills based on focus
- `/status` - Shows active skills for session
- `~/.claude/state/skill-index.json` - Skill index cache

## Natural Language Triggers

| User Says | Execute |
|-----------|---------|
| "list skills", "show skills", "what skills", "available skills" | `/list-skills` |
| "skills for debugging", "help with testing" | `/list-skills [category]` |
| "what can you do", "what commands" | `/list-skills` |
