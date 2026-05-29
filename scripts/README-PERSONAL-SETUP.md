# Personal Claude Environment - Complete Setup Package

This package gives you the same organizational structure as the team's `organizational-docs` setup, but for personal use with your Obsidian vault.

---

## What's Included

| File | Purpose |
|------|---------|
| `setup-personal-claude-environment.ps1` | Bootstrap script - creates folders, templates, symlinks |
| `PERSONAL-SETUP-GUIDE.md` | Complete guide explaining the strategy and usage |
| `personal-setup-prompt.md` | "Big prompt" to paste into Claude on home computer |
| `README-PERSONAL-SETUP.md` | This file - quick reference |

---

## Quick Start (3 Steps)

### 1. Run the Bootstrap Script

On your **home computer**, in PowerShell as Administrator:

```powershell
cd C:\Users\emarquez\.claude\scripts
.\setup-personal-claude-environment.ps1
```

This creates:
- Folders in your Obsidian vault: `C:\Users\emarquez\OneDrive\16 - Obsidian\00_Claude`
- Symlinks from `~/.claude/` to Obsidian
- Starter files (CLAUDE.md, READMEs, templates)

### 2. Open Obsidian

Navigate to the `00_Claude` folder and explore:
- Read `CLAUDE.md` - your personal instructions for Claude
- Check out the folder structure
- Review the template files in each folder

### 3. Customize CLAUDE.md

Add your personal preferences:
- Work style and communication preferences
- Technologies you use most
- Common tasks you build
- Learning goals
- Pet peeves and "don't do this" rules

**Done!** Claude now has persistent context about you and your work.

---

## What You Get

### The Structure

```
C:\Users\emarquez\OneDrive\16 - Obsidian\00_Claude\
│
├── CLAUDE.md                      (Your personal instructions for Claude)
│
├── learning/
│   ├── best-practices/            (Validated knowledge)
│   │   └── README.md             (Learning template)
│   └── ideas/
│       └── backlog.md            (Quick captures)
│
├── skills/                        (Reusable workflows)
│   └── README.md                 (Skill template)
│
├── commands/                      (Custom /commands)
│   └── README.md                 (Command template)
│
├── reference/                     (Quick lookup docs)
│   └── README.md
│
└── agents/                        (Specialized AI agents)
    └── README.md

        ↓ All symlinked to ↓

C:\Users\emarquez\.claude\
├── CLAUDE.md → Obsidian
├── learning/ → Obsidian
├── skills/ → Obsidian
├── commands/ → Obsidian
├── reference/ → Obsidian
└── agents/ → Obsidian
```

### The Benefits

**For You:**
- Edit in Obsidian (nice UI, search, linking)
- Syncs via OneDrive to other computers
- Knowledge persists across Claude sessions
- Same organizational power as team setup

**For Claude:**
- Reads your preferences from CLAUDE.md
- Can reference your past learnings
- Follows your personal conventions
- Gets smarter about you over time

---

## Usage Examples

### Capture a Learning

You discover something useful while coding:

**You:** "I learned that TypeScript generics work better with constraints. Can you help me capture this?"

**Claude:** Creates `learning/best-practices/typescript-generics.md` with proper template

### Create a Skill

You realize you keep doing the same workflow:

**You:** "I keep setting up Express APIs with the same middleware stack. Can we make this a skill?"

**Claude:** Creates `skills/express-api-setup/SKILL.md` with the workflow documented

### Use a Custom Command

You create a personal command:

**You:** "/review" (your custom command)

**Claude:** Reads `commands/review.md` and follows your instructions

### Reference Your Preferences

**Claude:** (automatically) "Based on your CLAUDE.md, I'll keep this brief and show you tradeoffs..."

---

## Comparison: Work vs Personal

| Aspect | Work Computer | Home Computer |
|--------|--------------|---------------|
| **Source** | `organizational-docs` repo | Obsidian vault |
| **Content** | Team standards, enterprise skills | Personal learnings, your skills |
| **Sync** | Git pull | OneDrive |
| **Collaboration** | Shared with team | Just you |
| **Claude behavior** | Follows team standards | Follows your preferences |

**Both computers get the same organizational benefits!**

---

## Advanced: Teaching Claude on New Computer

When you start Claude on your home computer for the first time, use the "big prompt" from `personal-setup-prompt.md` to teach Claude about your setup.

It explains:
- The folder structure
- How you want to use it
- What to do automatically
- What not to do

---

## Maintenance Workflow

### Daily
- Capture ideas in `learning/ideas/backlog.md` as they come

### Weekly (Friday afternoon)
- Review `learning/ideas/backlog.md`
- Write up validated learnings in `learning/best-practices/`
- Update any evolved skills

### Monthly (first Monday)
- Review and update CLAUDE.md preferences
- Archive obsolete content
- Check learning goals and adjust

---

## Customization Options

### Different Obsidian Path

```powershell
.\setup-personal-claude-environment.ps1 -ObsidianVaultPath "D:\MyVault\Claude"
```

### Recreate Symlinks

```powershell
.\setup-personal-claude-environment.ps1 -Force
```

### Add to CLAUDE.md

Edit `C:\Users\emarquez\OneDrive\16 - Obsidian\00_Claude\CLAUDE.md` in Obsidian:
- Work style preferences
- Technology stack
- Common patterns
- Personal rules

---

## Troubleshooting

### "Access denied" when creating symlinks
→ Run PowerShell as Administrator

### Claude doesn't see the folders
→ Restart Claude Code after setup

### Obsidian shows broken links
→ Check that symlinks were created correctly: `ls ~/.claude/ -l`

### Want to start fresh
→ Run with `-Force` flag to recreate everything

---

## Next Steps

1. ✅ You've reviewed this README
2. ⬜ Run the setup script on your home computer
3. ⬜ Open Obsidian and explore `00_Claude` folder
4. ⬜ Customize `CLAUDE.md` with your preferences
5. ⬜ Capture your first learning
6. ⬜ Create your first skill
7. ⬜ Build your first custom command

---

## Questions?

- **Script details:** See `PERSONAL-SETUP-GUIDE.md`
- **Usage examples:** See `PERSONAL-SETUP-GUIDE.md` → "Example Workflow"
- **Teaching Claude:** See `personal-setup-prompt.md`

**Happy building!** 🚀

---

## Files in This Package

```
.claude/scripts/
├── setup-personal-claude-environment.ps1  (The bootstrap script)
├── PERSONAL-SETUP-GUIDE.md               (Complete guide)
├── personal-setup-prompt.md              (Big prompt for Claude)
└── README-PERSONAL-SETUP.md              (This file)
```

All files are saved in `~/.claude/scripts/` for easy access.
