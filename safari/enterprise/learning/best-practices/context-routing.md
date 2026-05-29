---
title: Context Routing Decision Framework
type: best-practice
domain: ai-operations
status: active
version: 1.0
created: 2026-01-21
author: Safari Circuits IT
tags: [context-engineering, routing, skills, commands, hooks, decision-tree]
sources:
  - https://github.com/humanlayer/advanced-context-engineering-for-coding-agents
  - https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
related:
  - ../PIPELINE.md
  - ../../reference/mcp-catalog.md
  - C:/Users/dkmcintyre/organizational-docs/domains/information-technology/architecture/context-governance-architecture.md
---

# Context Routing Decision Framework

> **Purpose:** Define WHERE context goes based on WHAT it is. This is the missing decision logic for Safari's Context Governance System.

## Core Principle

Every piece of context has exactly one canonical home. Routing decisions are based on:

1. **Type** - Knowledge vs Action
2. **Scope** - Universal vs Domain vs Project vs Session
3. **Maturity** - Idea vs Validated vs Enforced
4. **Invocation** - Automatic vs User-triggered vs External

---

## Master Decision Tree

### Part 1: Knowledge Routing

```
INPUT: New knowledge, pattern, rule, or insight

┌─────────────────────────────────────────────────────────────────┐
│ Q1: Does this apply to ALL projects and ALL sessions?           │
├─────────────────────────────────────────────────────────────────┤
│ YES → ~/.claude/CLAUDE.md (Enterprise Policy Layer)             │
│       Format: MUST/SHOULD/MAY rules                             │
│       Example: "NEVER use `any` in TypeScript"                  │
│                                                                 │
│ NO ↓                                                            │
├─────────────────────────────────────────────────────────────────┤
│ Q2: Does this apply to ONE specific project?                    │
├─────────────────────────────────────────────────────────────────┤
│ YES → {repo}/.claude/CLAUDE.md (Project Memory Layer)           │
│       Format: Project-specific conventions                      │
│       Example: "This repo uses Prisma for ORM"                  │
│                                                                 │
│ NO ↓                                                            │
├─────────────────────────────────────────────────────────────────┤
│ Q3: Is this validated (used successfully 3+ times)?             │
├─────────────────────────────────────────────────────────────────┤
│ YES → ~/.claude/learning/best-practices/{domain}.md             │
│       Format: Documented pattern with examples                  │
│       Example: "Power BI incremental refresh patterns"          │
│                                                                 │
│ NO ↓                                                            │
├─────────────────────────────────────────────────────────────────┤
│ Q4: Is this a raw idea or signal worth capturing?               │
├─────────────────────────────────────────────────────────────────┤
│ YES → ~/.claude/learning/ideas/backlog.md                       │
│       Format: Tagged idea for future grooming                   │
│       Example: "Consider using dbt for transformations"         │
│                                                                 │
│ NO → Don't persist (ephemeral session context)                  │
└─────────────────────────────────────────────────────────────────┘
```

### Part 2: Action Routing

```
INPUT: New executable behavior, workflow, or automation

┌─────────────────────────────────────────────────────────────────┐
│ Q1: Does this require an EXTERNAL system (API, database, etc.)? │
├─────────────────────────────────────────────────────────────────┤
│ YES → MCP Server                                                │
│       Location: Dedicated MCP package                           │
│       Format: Tools expose capabilities via MCP protocol        │
│       Example: Power BI MCP, Azure DevOps MCP                   │
│                                                                 │
│ NO ↓                                                            │
├─────────────────────────────────────────────────────────────────┤
│ Q2: Should this trigger AUTOMATICALLY (no user invocation)?     │
├─────────────────────────────────────────────────────────────────┤
│ YES → Hook                                                      │
│       Location: ~/.claude/settings.json or claude.json hooks    │
│       Format: Event → Shell command                             │
│       Example: "PreToolUse: lint before commit"                 │
│                                                                 │
│ NO ↓                                                            │
├─────────────────────────────────────────────────────────────────┤
│ Q3: Is this a MULTI-STEP workflow with state/context?           │
├─────────────────────────────────────────────────────────────────┤
│ YES → Skill                                                     │
│       Location: ~/.claude/skills/{name}/SKILL.md                │
│       Format: Full workflow with phases, state, instructions    │
│       Example: /research, /implement, /end-work                 │
│                                                                 │
│ NO ↓                                                            │
├─────────────────────────────────────────────────────────────────┤
│ Q4: Is this a SINGLE-PURPOSE instruction set?                   │
├─────────────────────────────────────────────────────────────────┤
│ YES → Command                                                   │
│       Location: ~/.claude/commands/{name}.md                    │
│       Format: Focused instructions for one action               │
│       Example: /quick-commit, /status                           │
│                                                                 │
│ NO → Inline in CLAUDE.md as behavioral rule                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Quick Reference Matrix

### Knowledge Types

| Type | Scope | Location | Format | Promotion Trigger |
|------|-------|----------|--------|-------------------|
| **Policy** | Universal | `~/.claude/CLAUDE.md` | MUST/SHOULD/MAY | Team adoption |
| **Project Memory** | Single repo | `{repo}/.claude/CLAUDE.md` | Conventions | Project maturity |
| **Best Practice** | Domain | `learning/best-practices/{domain}.md` | Patterns + examples | Used 3+ times |
| **Learning** | Validated | `learning/best-practices/` | Documented insight | Validation |
| **Idea** | Unvalidated | `learning/ideas/backlog.md` | Tagged thought | Capture signal |
| **Session State** | Current | `~/.claude/state/` | Runtime data | Auto-checkpoint |

### Action Types

| Type | Invocation | Location | Complexity | Example |
|------|------------|----------|------------|---------|
| **MCP Tool** | Tool call | MCP server | External integration | `mcp__powerbi__run_dax` |
| **Hook** | Automatic | settings.json | Event-driven | Pre-commit lint |
| **Skill** | `/skill-name` | `skills/{name}/SKILL.md` | Multi-step workflow | `/research` |
| **Command** | `/command-name` | `commands/{name}.md` | Single action | `/quick-commit` |
| **CLAUDE.md Rule** | Always-on | CLAUDE.md | Behavioral constraint | "Never use any" |

---

## Distinguishing Skills from Commands

This is the most common confusion point.

### Command Characteristics
- **Single purpose** - Does one thing
- **Stateless** - No memory between invocations
- **Simple instructions** - < 100 lines typically
- **No phases** - Execute and done
- **Example:** `/quick-commit` - stage, commit, push

### Skill Characteristics
- **Multi-step workflow** - Has phases or stages
- **Stateful** - Tracks progress, may checkpoint
- **Rich context** - Needs background knowledge
- **Human gates** - Review points between phases
- **Example:** `/research` → `/plan` → `/implement` cycle

### Decision Heuristic

```
If you can describe it as "do X" → Command
If you need to describe it as "first X, then Y, checkpoint, then Z" → Skill
```

---

## Domain Mapping

Where does domain-specific context go?

| Domain | Best Practice File | Associated Skills | MCP Servers |
|--------|-------------------|-------------------|-------------|
| **Data Services** | `data-architecture.md` | `/infer-metadata` | Kafka, SQL Server |
| **Power BI** | `powerbi-prompting.md` | `/powerbi-model-analysis` | Power BI Desktop |
| **Infrastructure** | (create) | - | - |
| **Security** | (create) | - | - |
| **DevOps** | `claude-code.md` | `/devops-sync`, `/git-sync` | Azure DevOps |
| **UI/UX** | `ui-design.md` | - | Chrome DevTools |

---

## Linkage Model

How context assets connect:

```
┌─────────────────┐
│     Idea        │ ─── matures_to ───┐
│  (backlog.md)   │                   │
└─────────────────┘                   ▼
                              ┌─────────────────┐
                              │    Learning     │
                              │ (best-practice) │
                              └────────┬────────┘
                                       │
                          ┌────────────┼────────────┐
                          │ promotes_to│            │ informs
                          ▼            ▼            ▼
                   ┌──────────┐ ┌──────────┐ ┌──────────┐
                   │  Skill   │ │ Command  │ │ CLAUDE.md│
                   │          │ │          │ │  Policy  │
                   └────┬─────┘ └──────────┘ └────┬─────┘
                        │                         │
                        │ implements              │ enforces
                        └─────────┬───────────────┘
                                  ▼
                          ┌─────────────────┐
                          │   MCP Server    │
                          │   (external)    │
                          └─────────────────┘
```

### Link Types in Registry

| Link Type | Meaning | Example |
|-----------|---------|---------|
| `matures_to` | Idea → Learning | Backlog item validated |
| `promotes_to` | Learning → Skill/Policy | Pattern formalized |
| `informs` | Learning → Multiple targets | Knowledge spreads |
| `implements` | Skill → Policy | Skill enforces a rule |
| `enforces` | Policy → Behavior | CLAUDE.md drives Claude |
| `references` | Any → Any | Citation or dependency |
| `deprecates` | New → Old | Version replacement |

---

## Routing Examples

### Example 1: New Pattern Discovered

**Scenario:** You discover that Power BI incremental refresh requires specific partition naming.

**Routing:**
1. Q1: All projects? NO (only Power BI work)
2. Q2: One project? NO (all Power BI projects)
3. Q3: Validated? YES (used it 3 times)
4. → `~/.claude/learning/best-practices/powerbi-prompting.md`

### Example 2: New Automation Need

**Scenario:** You want Claude to automatically sync work items at checkpoints.

**Routing:**
1. Q1: External system? YES (Azure DevOps)
2. → But wait - we have Azure DevOps MCP already
3. Q2: Automatic? YES (on checkpoint event)
4. → Hook + existing MCP tool

**Result:** Hook that calls MCP tool on checkpoint event.

### Example 3: New Workflow Need

**Scenario:** You want a repeatable process for analyzing Power BI models.

**Routing:**
1. Q1: External? YES (Power BI) - but MCP exists
2. Q2: Automatic? NO (user invokes)
3. Q3: Multi-step? YES (connect, analyze, report, recommend)
4. → Skill: `~/.claude/skills/powerbi-model-analysis/SKILL.md`

### Example 4: Simple Action

**Scenario:** You want a quick way to stage and commit all changes.

**Routing:**
1. Q1: External? NO (git is local)
2. Q2: Automatic? NO (user invokes)
3. Q3: Multi-step? NO (just stage + commit + push)
4. → Command: `~/.claude/commands/quick-commit.md`

---

## Anti-Patterns

| Anti-Pattern | Why It's Wrong | Correct Routing |
|--------------|----------------|-----------------|
| Putting project-specific rules in global CLAUDE.md | Pollutes universal policy | Project CLAUDE.md |
| Creating a skill for a single action | Over-engineering | Command |
| Documenting unvalidated ideas as best practices | Premature formalization | Ideas backlog |
| Hardcoding MCP logic in skills | Tight coupling | Skill calls MCP tool |
| Creating hooks for user-triggered actions | Wrong invocation model | Command or Skill |

---

## Checklist: Before Creating New Context

- [ ] Have I checked if this already exists?
- [ ] Have I validated this pattern (3+ uses)?
- [ ] Does this belong in a higher layer (CLAUDE.md)?
- [ ] Does this belong in a lower layer (ideas)?
- [ ] Am I creating a skill when a command would suffice?
- [ ] Am I creating a command when CLAUDE.md rule would work?
- [ ] Have I identified the correct domain?
- [ ] Have I added appropriate links/references?

---

## Maintenance

### Weekly Review
- Check `learning/ideas/backlog.md` for items ready to promote
- Review skills for consolidation opportunities
- Audit commands for overlap

### Monthly Audit
- Run `/context-quality` on all assets
- Check freshness scores
- Identify stale content for archival

---

## Sources

- [HumanLayer ACE-FCA Framework](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents)
- [Anthropic: Effective Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [12-Factor Agents](https://github.com/humanlayer/12-factor-agents)
- Safari Context Governance Architecture

---

*Document Location:* `~/.claude/learning/best-practices/context-routing.md`
