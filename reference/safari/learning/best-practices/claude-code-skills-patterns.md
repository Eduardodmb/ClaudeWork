# Claude Code Skills Patterns

**Source:** [everything-claude-code](https://github.com/affaan-m/everything-claude-code) by affaan-m (Anthropic hackathon winner)
**Analyzed:** 2026-01-18

---

## Directory Structure Pattern

```
.claude/
├── agents/              # Specialized subagents for task delegation
├── skills/              # Workflow definitions and domain knowledge
├── commands/            # Slash commands for quick execution
├── rules/               # Always-follow guidelines
├── hooks/               # Trigger-based automations
└── mcp-configs/         # MCP server configurations
```

---

## Agent Pattern

Agents are specialized subagents invoked via the Task tool. Each has a focused purpose.

### Standard Agents

| Agent | Purpose | Trigger |
|-------|---------|---------|
| `planner` | Implementation planning | Complex feature requests |
| `architect` | System design decisions | Architectural changes |
| `tdd-guide` | Test-driven development | Bug fixes, new features |
| `code-reviewer` | Quality and security review | After code modification |
| `security-reviewer` | Vulnerability analysis | Security-sensitive code |
| `build-error-resolver` | Build failure diagnosis | Build failures |
| `e2e-runner` | End-to-end testing | Integration testing |
| `refactor-cleaner` | Dead code removal | Cleanup tasks |
| `doc-updater` | Documentation sync | After code changes |

### Agent File Structure

```markdown
# Agent Name

## Purpose
Brief description of what this agent does.

## Activation Triggers
When to invoke this agent.

## Tools Available
- Read, Grep, Glob (research agents)
- Edit, Write (modification agents)

## Model Selection
- Opus: Complex reasoning
- Sonnet: Standard development
- Haiku: Lightweight, frequent tasks

## Output Format
Structured deliverable format.
```

### Key Insight: Parallel Execution

> "ALWAYS use parallel Task execution for independent operations"

Deploy multiple agents simultaneously when tasks don't depend on each other.

---

## Skill Pattern

Skills encode domain knowledge and workflow definitions.

### Skill Categories

| Category | Examples |
|----------|----------|
| Coding Standards | TypeScript patterns, React best practices |
| Backend Patterns | API design, database, caching |
| Frontend Patterns | React, Next.js conventions |
| Domain Knowledge | ClickHouse, specific tech stacks |
| Workflows | TDD methodology, security review |

### Coding Standards Key Points

**TypeScript:**
- Descriptive identifiers, verb-noun function names
- **Immutability**: Always use spread operator, never mutate directly
- Avoid `any`, use proper interfaces
- Parallel async with `Promise.all()`

**React:**
- Functional components with typed props
- `useHook` naming pattern for custom hooks
- `useMemo`/`useCallback` for performance
- Functional state updates: `setState(prev => ...)`

**Organization:**
- Functions < 50 lines
- Nesting < 5 levels
- No magic numbers

---

## Command Pattern

Slash commands are user-invoked workflows stored as markdown files.

### Command Examples

| Command | Purpose |
|---------|---------|
| `/tdd` | Test-driven development workflow |
| `/plan` | Implementation planning |
| `/e2e` | E2E test generation |
| `/code-review` | Quality review process |
| `/build-fix` | Build error resolution |
| `/refactor-clean` | Dead code removal |
| `/test-coverage` | Coverage analysis |

### Command File Structure

```markdown
# Command Name

## Purpose
What this command accomplishes.

## Workflow Steps
1. Step one
2. Step two
3. Step three

## Integration
Works with: /other-command, /another-command

## Output
What the user receives.
```

### TDD Command Cycle

```
RED → GREEN → REFACTOR → REPEAT

RED:      Write failing test
GREEN:    Minimal code to pass
REFACTOR: Improve without breaking tests
REPEAT:   Next feature
```

**Coverage Standards:**
- 80% minimum general
- 100% for: financial, auth, security, core business logic

---

## Rules Pattern

Rules are always-follow guidelines loaded into context.

### Rule Categories

| Rule | Purpose |
|------|---------|
| `security.md` | Mandatory security checks |
| `coding-style.md` | Code organization, immutability |
| `testing.md` | TDD and coverage requirements |
| `git-workflow.md` | Commit format, PR procedures |
| `agents.md` | Subagent delegation criteria |
| `performance.md` | Model selection, context optimization |
| `patterns.md` | API response formats, hook standards |

### Model Selection Rule

| Model | Use Case |
|-------|----------|
| **Haiku** | Lightweight agents, pair programming, frequent invocation |
| **Sonnet** | Main development, complex coding, workflow orchestration |
| **Opus** | Complex architecture, deepest reasoning |

### Context Window Rule

> Avoid using final 20% of context during resource-intensive operations (large refactoring, multi-file debugging)

---

## Hooks Pattern

Hooks automate responses to tool events.

### Hook Types

| Type | Trigger | Purpose |
|------|---------|---------|
| PreToolUse | Before tool executes | Prevention, blocking, reminders |
| PostToolUse | After tool executes | Automation, validation |
| Stop | Session exit | Final checks |

### Example Hooks

**PreToolUse:**
- Block `npm run dev` outside tmux
- Pause before git push for review
- Block arbitrary markdown file creation

**PostToolUse:**
- Auto-format JS/TS with Prettier
- Run TypeScript validation after edits
- Detect console.log statements

**Stop:**
- Final audit for debugging statements

### hooks.json Structure

```json
{
  "hooks": [
    {
      "type": "PreToolUse",
      "matcher": "Bash",
      "pattern": "npm run dev",
      "command": "echo 'Use tmux for dev servers'"
    }
  ]
}
```

---

## Critical Performance Insight

### MCP Tool Limits

> Maintaining 20-30 configured MCPs while keeping **fewer than 10 enabled per project** and staying **below 80 active tools** prevents context window reduction from 200k to 70k tokens.

**Action:** Disable unused MCPs per project to preserve context.

---

## Safari Adaptation Opportunities

### Immediate Value

| Pattern | Safari Use |
|---------|------------|
| Agent delegation | Domain-specific agents (ERP, MES, Data) |
| TDD command | Enforce testing standards |
| Model selection rules | Cost optimization |
| Hooks for validation | TypeScript checks, formatting |

### Build These Skills

| Skill | Domain |
|-------|--------|
| `fourth-shift-patterns` | ERP integration expertise |
| `safari-data-architecture` | Medallion, Iceberg, streaming |
| `entra-id-hybrid` | Identity management patterns |
| `cloudflare-tunnel-ops` | External integration |

### Adapt These Commands

| Command | Safari Version |
|---------|----------------|
| `/tdd` | `/safari:tdd` with Safari testing standards |
| `/plan` | `/safari:plan` with ADO work item creation |
| `/code-review` | `/safari:review` with Safari coding standards |

---

## References

- [everything-claude-code](https://github.com/affaan-m/everything-claude-code)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [SkillsMP.com](https://skillsmp.com/) - 71,000+ skills marketplace

---

*Last Updated: 2026-01-18*
