# Claude Slash Commands

This directory contains slash command definitions for common workflows. Commands provide quick shortcuts for frequent operations.

## Available Commands

### Session Management

| Command | Description |
|---------|-------------|
| `/start-work` | Begin session with context, show ADO work items, warm greeting |
| `/end-work` | Close session with fun sign-off, update ADO, log accomplishments |
| `/resume-session` | Smart resume with change detection |
| `/status` | Quick context check - session, git, projects |
| `/validate-work` | Multi-domain validation across docs, strategy, and operations |
| `/sync-strategy` | Update local strategy cache from Azure DevOps |

### Git Workflow

| Command | Description |
|---------|-------------|
| `/commit-push-pr` | Full workflow: commit, push, create PR |
| `/quick-commit` | Stage all changes and commit |
| `/review-changes` | Review uncommitted changes |

### Quality & Testing

| Command | Description |
|---------|-------------|
| `/test-and-fix` | Run tests and fix failures |
| `/validate-docs` | Validate documentation files |

### Documentation

| Command | Description |
|---------|-------------|
| `/update-docs` | Update documentation after changes |
| `/sync-index` | Synchronize index.yaml with files |

### Problem Solving

| Command | Description |
|---------|-------------|
| `/first-principles` | Deconstruct problems to fundamentals |

### Idea Management (ADHD Guardrails)

| Command | Description |
|---------|-------------|
| `/brain-dump` | Transform stream-of-consciousness into organized backlog |
| `/reminder` | Quick in-session thought capture without derailing |
| `/groom` | Refine backlog items with acceptance criteria |
| `/list-skills` | Display all available skills by category |

## Session Workflow

The recommended workflow using these commands:

```
┌─────────────────────────────────────────┐
│           SESSION WORKFLOW               │
├─────────────────────────────────────────┤
│                                         │
│  /start-work                            │
│       │                                 │
│       ▼                                 │
│  ┌─────────────────────────────────┐   │
│  │  • Check last session           │   │
│  │  • Show project status          │   │
│  │  • Remind Boris principles      │   │
│  │  • Create session log           │   │
│  └─────────────────────────────────┘   │
│       │                                 │
│       ▼                                 │
│      WORK                               │
│       │                                 │
│       ▼                                 │
│  /validate-work (optional)              │
│       │                                 │
│       ▼                                 │
│  /end-work                              │
│       │                                 │
│       ▼                                 │
│  ┌─────────────────────────────────┐   │
│  │  • Summarize accomplishments    │   │
│  │  • Commit all changes           │   │
│  │  • Update project docs          │   │
│  │  • Log next steps               │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

## How to Use

In Claude Code, type `/` followed by the command name:

```
/start-work
/end-work
/status
/validate-work
/commit-push-pr
```

Or reference them in conversation:

```
"Run the start-work command"
"Use /validate-work to check everything"
```

## Validation Domains

The `/validate-work` command checks:

| Domain | What It Validates |
|--------|-------------------|
| Documentation | STD-001 compliance, index sync, cross-references |
| Skills | Completeness, coverage, status |
| Project Management | Active projects, session continuity, task status |
| Data Strategy | Data models, schemas, integrations |
| Application Strategy | Product docs, module coherence, modernization |
| Infrastructure | Systems inventory, deployment, integrations |
| IT Strategy | Strategic alignment, domain coverage, gaps |

## Creating New Commands

1. Create a new `.md` file in this directory
2. Name it `command-name.md` (use hyphens)
3. Include:
   - Purpose/description
   - Steps to execute
   - Expected output
   - Notes/caveats
4. Add to `settings.json` commands.available list
5. Update this README

## Related

- `.claude/boris-workflow.md` - Core workflow principles
- `.claude/agents/` - Specialized agents for tasks
- `projects/sessions/` - Session logs
- `SKILL-015` - IT Strategy Prioritization

## Source

Adapted from [Boris Cherny's Claude Code workflow](https://github.com/0xquinto/bcherny-claude) with Safari Circuits-specific commands added.
