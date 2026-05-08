# Claude Subagents

This directory contains subagent definitions for specialized tasks. Subagents are invoked by asking Claude to use them for specific purposes.

## Available Agents

### Code & Development

| Agent | Purpose | Usage |
|-------|---------|-------|
| `code-simplifier` | Simplify code without changing functionality | "Use the code-simplifier agent to clean up this code" |
| `code-architect` | Design reviews and architectural decisions | "Use code-architect to review this design" |
| `verify-app` | Thorough application testing | "Run the verify-app agent to test everything" |
| `build-validator` | Ensure project builds correctly | "Use build-validator before deployment" |
| `oncall-guide` | Production incident response | "Use oncall-guide to help diagnose this issue" |

### Documentation & Knowledge

| Agent | Purpose | Usage |
|-------|---------|-------|
| `doc-reviewer` | Review documentation quality | "Use doc-reviewer to check this document" |
| `domain-validator` | Validate domain-driven structure | "Validate this document with domain-validator" |
| `index-updater` | Sync index.yaml with files | "Use index-updater to sync the catalog" |
| `knowledge-curator` | Identify gaps and improvements | "Run knowledge-curator for a health report" |
| `skill-developer` | Create and improve skills | "Use skill-developer to create a new skill" |

## How to Use

Simply ask Claude to use an agent:

```
"Use the doc-reviewer agent to review domains/engineering/entities/bom.md"

"Run the knowledge-curator agent to analyze documentation gaps in the finance domain"

"Use code-architect to evaluate this proposed feature"
```

## Creating New Agents

1. Create a new `.md` file in this directory
2. Include:
   - Clear purpose statement
   - Specific responsibilities
   - Step-by-step process
   - Guidelines and constraints
   - Example invocations
3. Add to `settings.json` agents.available list
4. Update this README

## Agent vs Skill vs Command

| Type | Purpose | Location | Invocation |
|------|---------|----------|------------|
| **Agent** | Complex, multi-step reasoning | `.claude/agents/` | "Use the X agent" |
| **Skill** | Reusable task definitions | `agents/skills/` | Trigger phrases |
| **Command** | Quick workflow shortcuts | `.claude/commands/` | `/command-name` |

## Source

Base agents adapted from [Boris Cherny's Claude Code workflow](https://github.com/0xquinto/bcherny-claude), with Safari Circuits-specific agents added for documentation management.
