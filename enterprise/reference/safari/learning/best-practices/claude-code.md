---
id: BP-CC-001
title: Claude Code Best Practices
domain: engineering
visualization: technical
sensitivity: internal
last_updated: 2026-02-10
---

# Claude Code Best Practices

## CLAUDE.md Structure

### Purpose
Project-specific instructions that persist across sessions.

### Required Sections
1. **Project Overview** - What the project does
2. **Technology Stack** - Languages, frameworks, tools
3. **Key Directories** - Important folder structure
4. **Coding Conventions** - Style and patterns
5. **Commands Reference** - Common CLI commands
6. **Anti-Patterns** - Things Claude should NOT do

### Example Structure
```markdown
# Project Name - Claude Code Instructions

## Project Overview
[Brief description]

## Technology Stack
- Frontend: [tech]
- Backend: [tech]
- Database: [tech]

## Key Directories
[Directory tree]

## Coding Conventions
[Style guide]

## Commands Reference
[CLI commands]

## Things Claude Should NOT Do
[Anti-patterns list]
```

## Skills Best Practices

### From Anthropic Docs

1. **Concise is key** - Context window is shared resource
2. **Progressive disclosure** - SKILL.md as table of contents, details in separate files
3. **One level deep** - Don't nest references
4. **Test with all models** - Haiku, Sonnet, Opus behave differently

### Skill Naming
- Use gerund form: "Processing PDFs", "Analyzing Data"
- Avoid vague names: "Helper", "Utils"

### Description Field
- Write in third person
- Include WHAT it does and WHEN to use it
- Max 1024 characters

## Workflow Patterns

### Verification Loops
1. Make changes
2. Run typecheck
3. Run tests
4. Lint before committing

### Plan-Execute Pattern
1. `/write-plan` - Create detailed plan
2. Review and approve
3. `/execute-plan` - Implement

## Anti-Patterns

1. Don't use `any` type without approval
2. Don't skip error handling
3. Don't commit without tests
4. Don't make breaking changes without discussion
5. Don't over-explain to Claude (it's smart)

## Installed Skills Reference

### Superpowers Package
| Skill | Trigger |
|-------|---------|
| brainstorming | /brainstorm |
| writing-plans | /write-plan |
| executing-plans | /execute-plan |
| test-driven-development | TDD keywords |
| systematic-debugging | debugging keywords |

### Alirezarezvani Skills
- 48 skills across marketing, product, engineering, PM, C-level, RA/QM

---

*Source: Anthropic docs + superpowers skill package*
