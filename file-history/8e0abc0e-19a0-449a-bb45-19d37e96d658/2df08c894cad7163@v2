# Personal Claude Environment Setup Guide

This guide shows you how to replicate the organizational-docs structure for personal use, with files stored in your Obsidian vault.

---

## Overview

**The Strategy:**
- Files live in Obsidian vault (easy to view/edit)
- Symlinks from `.claude` to Obsidian (Claude Code reads them)
- Same folder structure as team setup (learning, skills, commands, reference, agents)
- Personal use only (no team/work content)

**File Flow:**
```
Obsidian Vault                  Claude Code
───────────────                 ───────────
00_Claude/                      ~/.claude/
├── CLAUDE.md       ←symlink─   ├── CLAUDE.md
├── learning/       ←symlink─   ├── learning/
├── skills/         ←symlink─   ├── skills/
├── commands/       ←symlink─   ├── commands/
├── reference/      ←symlink─   ├── reference/
└── agents/         ←symlink─   └── agents/
```

---

## Setup Steps

### For Your Home Computer

1. **Run the bootstrap script** (in PowerShell as Administrator):

```powershell
cd C:\Users\emarquez\.claude\scripts
.\setup-personal-claude-environment.ps1
```

This will:
- Create folders in `C:\Users\emarquez\OneDrive\16 - Obsidian\00_Claude`
- Create starter files (CLAUDE.md, READMEs, templates)
- Symlink from `.claude` to Obsidian
- Give you the same structure as organizational-docs

2. **Open Obsidian** and navigate to the `00_Claude` folder

3. **Customize CLAUDE.md** with your personal preferences

---

## What You Get

### Folder Structure

| Folder | Purpose | What to Put There |
|--------|---------|-------------------|
| **learning/best-practices/** | Validated knowledge | Things you've learned that work |
| **learning/ideas/** | Quick captures | Ideas backlog, things to explore |
| **skills/** | Reusable workflows | Task automations you use repeatedly |
| **commands/** | Custom /commands | Personal slash commands for Claude |
| **reference/** | Quick lookup | Cheat sheets, API docs, snippets |
| **agents/** | AI subagents | Specialized agents for complex tasks |

### Starter Files

- `CLAUDE.md` - Your personal instructions for Claude
- `learning/ideas/backlog.md` - Idea capture template
- `learning/best-practices/README.md` - Learning template
- READMEs in each folder explaining usage

---

## How to Use

### Capture a Learning

When you discover something useful:

1. Create a file in `learning/best-practices/{topic}.md`
2. Use this template:

```markdown
---
topic: typescript-generics
created: 2026-05-08
tags: [typescript, patterns]
---

# TypeScript Generics Best Practices

## What I Learned
Generics help make reusable type-safe functions...

## When to Use
Use generics when...

## Example
```typescript
function identity<T>(arg: T): T {
  return arg;
}
```
```

### Create a Skill

When you have a workflow you repeat:

1. Create folder: `skills/my-skill-name/`
2. Create `SKILL.md`:

```markdown
# Skill: my-skill-name

## Purpose
What this skill does

## When to Use
Scenarios where this applies

## Instructions for Claude
1. Step one
2. Step two
3. Step three

## Examples
Show usage examples
```

3. Tell Claude: "Use my-skill-name skill" and it will follow the instructions

### Add a Command

Create `commands/mycommand.md`:

```markdown
# Command: /mycommand

## Purpose
What this command does

## Usage
/mycommand [optional-args]

## Instructions for Claude
When user invokes /mycommand:
1. Do this
2. Then do that
3. Finally do this
```

Then in Claude Code: `/mycommand` and Claude will follow the instructions

---

## Differences from Team Setup

| Aspect | Team (organizational-docs) | Personal (Obsidian) |
|--------|---------------------------|---------------------|
| **Source location** | `organizational-docs` repo | Your Obsidian vault |
| **Sync method** | Git pull from team repo | OneDrive sync |
| **Content** | Team standards, enterprise skills | Your personal learnings, skills |
| **Collaboration** | Shared with team | Just you |
| **Update frequency** | Weekly team sync | As you work |

---

## Maintenance

### Weekly
- Review `learning/ideas/backlog.md`
- Capture any new learnings from the week
- Update skills that evolved

### Monthly
- Review CLAUDE.md and update preferences
- Archive obsolete content
- Organize reference docs

### As Needed
- Create new skills when patterns repeat 3+ times
- Add commands for workflows you use often
- Update learnings when you discover better approaches

---

## Customization Ideas

Add sections to your CLAUDE.md for:

### Personal Work Style
```markdown
## My Work Style

- I prefer brevity over detail (give me summaries first)
- I work in 90-minute focused blocks
- I like to see tradeoffs when making decisions
- I hate surprises in production
```

### Technology Stack
```markdown
## Technologies I Use Most

- **Languages:** Python, TypeScript, SQL
- **Frameworks:** React, FastAPI
- **Databases:** PostgreSQL, MongoDB
- **Cloud:** Azure
```

### Learning Goals
```markdown
## Current Learning Focus

- [ ] Advanced TypeScript patterns
- [ ] Docker orchestration
- [ ] API design best practices
```

### Common Tasks
```markdown
## Things I Build Often

- REST APIs with authentication
- Data processing pipelines
- Admin dashboards
- Database migrations
```

---

## Advanced: Share Between Computers

Since your Obsidian vault is in OneDrive, your Claude setup syncs automatically!

**Work computer:** Uses `organizational-docs` (team content)
**Home computer:** Uses `OneDrive\Obsidian\00_Claude` (personal content)

Both computers get the same organizational benefits, but with different content scopes.

---

## Troubleshooting

### Symlinks not working
Run PowerShell as Administrator when creating symlinks.

### Claude not seeing the folders
Restart Claude Code after running setup script.

### Want to start over
```powershell
.\setup-personal-claude-environment.ps1 -Force
```

### Want different Obsidian path
```powershell
.\setup-personal-claude-environment.ps1 -ObsidianVaultPath "D:\MyVault\Claude"
```

---

## Example Workflow

1. **Morning:** Review yesterday's learnings, update CLAUDE.md if needed
2. **During work:** Capture ideas in `learning/ideas/backlog.md` as they come
3. **End of day:** Write up any learnings in `learning/best-practices/`
4. **Weekly:** Review backlog, promote validated ideas, create skills for repeated patterns
5. **Monthly:** Cleanup, archive obsolete content, review goals

---

## Benefits You'll Get

**For you:**
- Knowledge persists across sessions
- Claude gets smarter about your preferences over time
- Less repeating yourself
- Everything searchable in Obsidian

**For Claude:**
- Understands your work style and preferences
- Can reference your past learnings
- Follows your personal conventions
- Provides consistent help across sessions

---

## Next Steps

1. ✅ Run the setup script
2. ⬜ Open Obsidian and explore the 00_Claude folder
3. ⬜ Customize CLAUDE.md with your preferences
4. ⬜ Capture your first learning in best-practices/
5. ⬜ Create your first skill for a repeated task
6. ⬜ Try a custom /command

**Happy building!** 🚀
