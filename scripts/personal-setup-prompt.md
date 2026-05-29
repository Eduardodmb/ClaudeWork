# Personal Claude Environment - Initial Setup Prompt

Copy and paste this prompt to Claude on your home computer to set up your personal Claude environment.

---

## THE PROMPT (Copy everything below this line)

---

I want to set up a personal Claude Code environment similar to a team organizational structure, but for personal use only.

**What I want:**

1. **Folder structure** in my Obsidian vault at `C:\Users\emarquez\OneDrive\16 - Obsidian\00_Claude`:
   - `learning/` - For capturing knowledge and best practices
   - `skills/` - For reusable workflows and automations
   - `commands/` - For custom slash commands
   - `reference/` - For quick reference docs and cheat sheets
   - `agents/` - For specialized AI agent definitions

2. **Symlinks** from `~/.claude/` to the Obsidian folders so Claude Code can read them

3. **Starter files**:
   - `CLAUDE.md` - Personal instructions for Claude with my preferences
   - Template files for learnings, skills, and commands
   - README files explaining each folder's purpose

**The goal:** Knowledge accumulation and context persistence across Claude sessions, all editable in Obsidian.

**How this is different from the team setup:**
- Team setup uses `organizational-docs` git repo (for work)
- Personal setup uses Obsidian vault + OneDrive (for personal projects)
- Same organizational benefits, different content scope

**What I need you to do:**

Please create a PowerShell script that:
1. Creates the folder structure in my Obsidian vault
2. Creates starter template files (CLAUDE.md, READMEs, etc.)
3. Creates symlinks from `~/.claude/` to the Obsidian folders
4. Includes a `-Force` flag to recreate symlinks if needed

**CLAUDE.md should include:**
- Explanation of the folder structure
- Template for capturing learnings
- Template for creating skills
- Template for custom commands
- Section for my personal preferences (work style, technologies, goals)
- Maintenance schedule suggestions (weekly/monthly reviews)

**Starter templates should cover:**
- `learning/best-practices/` - How to document validated learnings
- `learning/ideas/backlog.md` - Quick idea capture format
- `skills/` - SKILL.md format for reusable workflows
- `commands/` - Command format for custom /commands

After creating the script, please:
1. Show me the script location
2. Explain how to run it
3. Explain what files were created
4. Give me a quick guide on how to use each folder

**Optional customization:**
- Allow specifying a different Obsidian vault path via parameter
- Backup existing CLAUDE.md if it exists
- Create a .gitignore in the Obsidian folder for state files

Let me know if you need any clarification!

---

## AFTER SETUP - Teaching Claude About Your System

Once setup is complete, paste this follow-up prompt to teach Claude about your personal environment:

---

I've set up a personal Claude Code environment with the following structure:

**Files live in:** `C:\Users\emarquez\OneDrive\16 - Obsidian\00_Claude`
**Claude reads from:** `~/.claude/` (symlinked to Obsidian)

**Folders:**
- `learning/` - My knowledge base (best practices, lessons learned, ideas backlog)
- `skills/` - My reusable workflows (each skill has a SKILL.md file)
- `commands/` - My custom /commands
- `reference/` - Quick lookup docs
- `agents/` - Specialized subagent definitions

**How I want to use this:**

1. **Capture learnings** - When I learn something useful, help me capture it in `learning/best-practices/` using the template in the README

2. **Build skills** - When I repeat a workflow 3+ times, suggest creating a skill in `skills/{name}/SKILL.md`

3. **Use custom commands** - When I create a `/command`, follow the instructions in `commands/{name}.md`

4. **Reference my preferences** - Read `CLAUDE.md` for my work style, tech stack, and preferences

5. **Maintain context** - Help me keep this organized with weekly/monthly reviews

**What to do automatically:**
- When I mention "I learned that...", ask if I want to capture it in learning/
- When I describe a repeated workflow, suggest making it a skill
- When I correct you, offer to add a learning to best-practices/
- Reference my CLAUDE.md preferences for how I like to work

**What NOT to do:**
- Don't suggest team/enterprise features (this is personal only)
- Don't reference organizational-docs (that's my work setup)
- Don't assume I have DevOps/GitHub integrations (unless I set them up)

Please confirm you understand this setup and are ready to help me build my personal knowledge base!

---

## Quick Reference: Common Tasks

Once setup is complete, use these prompts:

### Capture a Learning
```
I learned that [something]. Can you help me capture this in my learning/best-practices/?
```

### Create a Skill
```
I keep doing [workflow] repeatedly. Can you help me create a skill for this?
```

### Add a Command
```
I want a /command called /[name] that does [action]. Can you help me create it?
```

### Add Reference Doc
```
Can you create a quick reference for [technology/API] in my reference/ folder?
```

### Update Preferences
```
Add to my CLAUDE.md: I prefer [preference/style]
```

### Weekly Review
```
Let's do my weekly Claude environment review:
1. Review learning/ideas/backlog.md
2. Promote any validated learnings
3. Update any evolved skills
```

### Create Custom Agent
```
Can you help me create a specialized agent for [task] in my agents/ folder?
```
