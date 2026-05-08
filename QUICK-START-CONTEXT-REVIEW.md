# Quick Start: Context Review System

**Your graphical UI for managing Claude context quality**

---

## What You Got

### 1. Personal Section in CLAUDE.md ✓
**Location:** `C:\Users\emarquez\.claude\CLAUDE.md`

Your preferences, work style, and BeFirst-specific context are now documented.
Claude will reference this in every session.

### 2. Obsidian-Based Context Review System ✓
**Purpose:** Visual dashboard to review and improve context quality

**Key files created:**
- `learning/context-review-system.md` - Complete guide
- `scripts/setup-context-vault.ps1` - One-click vault setup

---

## Setup (10 minutes)

### Step 1: Install Obsidian
Download from: https://obsidian.md/
Free, no account needed.

### Step 2: Run Setup Script
```powershell
# Open PowerShell as Administrator (for symbolic links)
# Right-click PowerShell → "Run as Administrator"

cd C:\Users\emarquez\.claude\scripts
.\setup-context-vault.ps1
```

**What it does:**
- Creates vault at `C:\Users\emarquez\OneDrive\Claude-Context-Management\`
- Links to your `~/.claude/` folders (edit files in place)
- Creates dashboard templates
- Configures Obsidian plugins

**Output location:** `C:\Users\emarquez\OneDrive\Claude-Context-Management\`
(OneDrive syncs to other computers automatically)

### Step 3: Open Vault in Obsidian
1. Launch Obsidian
2. Click "Open folder as vault"
3. Navigate to: `C:\Users\emarquez\OneDrive\Claude-Context-Management`
4. Click "Open"

### Step 4: Install Plugins
1. Settings (gear icon) → Community plugins
2. Turn off "Restricted mode"
3. Click "Browse" and install:
   - **Dataview** (required - powers queries)
   - Calendar (optional - schedule reviews)
   - Templater (optional - auto-fill templates)
   - Tag Wrangler (optional - manage tags)
4. Enable each plugin after installing

---

## First Review (30 minutes)

### Friday 4:00 PM - Weekly Review

1. **Open dashboard:**
   - Navigate to `00-Dashboard/Context-Quality-Dashboard.md`
   - This shows overview stats

2. **Create weekly review:**
   - Create new note: `00-Dashboard/2026-05-08-Review.md`
   - Copy content from `Context-Review-Weekly.md` template

3. **Run queries (Dataview does this automatically):**
   - Stale content (>90 days old)
   - Recent additions (this week)
   - Untagged items

4. **Triage flagged items:**
   For each item found:
   - **Keep + Update**: Still relevant, refresh it
   - **Archive**: Move to `99-Archive/`
   - **Promote**: Learning → Skill
   - **Consolidate**: Merge duplicates

5. **Update CLAUDE.md:**
   - Open `01-Personal-Context/CLAUDE.md`
   - Update "Current Focus Areas" section
   - Add new preferences discovered this week

6. **Check graph view:**
   - Press `Ctrl+G` to open graph
   - Look for isolated nodes (need links)
   - Explore clusters (related concepts)

7. **Done!**
   - Commit changes to Git if needed
   - Schedule next review (next Friday)

---

## Visual Features

### Graph View (Ctrl+G)
**Shows:** Visual map of all context files and their relationships

**Use to:**
- Find isolated concepts
- Identify core concepts (many links)
- Discover related content

**Filters:**
```
path:02-Learnings OR path:03-Skills
tag:#befirst
tag:#validated
```

### Dataview Queries
**Shows:** Tables of files matching criteria

**Examples:**
- Stale files (>90 days)
- Recently created (this week)
- Untagged files
- Files by domain

**How:** Automatically runs in dashboard files

### Tag Pane
**Shows:** All tags with counts
**Click:** Filter files by tag
**Right-click:** Rename/merge tags

---

## Weekly Routine

### Every Friday, 4:00 PM (30 min)

**Checklist:**
- [ ] Open Obsidian vault
- [ ] Create weekly review note
- [ ] Review stale content (archive or update)
- [ ] Check recent additions (proper tags?)
- [ ] Update CLAUDE.md personal section
- [ ] Check graph view for gaps
- [ ] Create action items for next week
- [ ] Commit changes to Git

**Tools used:**
- `Context-Quality-Dashboard.md` (overview)
- `Context-Review-Weekly.md` (checklist template)
- Graph view (visual exploration)
- Tag pane (organization)

---

## Monthly Deep Dive

### First Monday of Month (1 hour)

**Focus:**
- Archive items >6 months old
- Promote validated learnings to skills
- Update "Current Focus Areas" in CLAUDE.md
- Review context quality metrics
- Plan next month's priorities

**Use Dataview queries to find:**
- Promotion candidates (validated learnings >60 days old)
- Ancient content (>180 days)
- Unlinked files (isolated concepts)

---

## Benefits

| Task | Before (CLI) | After (Obsidian) |
|------|-------------|------------------|
| **Find stale files** | `find ~/.claude -mtime +90` | Dataview table, sortable |
| **See relationships** | Manual grep | Graph view visualization |
| **Edit context** | vim/nano | Rich markdown editor |
| **Tag files** | Edit frontmatter manually | Drag-drop tag pane |
| **Review workflow** | No process | Template + checklist |
| **Track progress** | Git log only | Kanban board |

**Result:** Lower friction = more frequent reviews = higher quality context

---

## Troubleshooting

### Symlinks Failed (Non-Admin)
**Symptom:** Script says "not running as Administrator"
**Solution:** Script falls back to junctions (works fine) or copy files
**Alternative:** Right-click PowerShell → "Run as Administrator" and re-run script

### Dataview Queries Don't Show Results
**Symptom:** Empty tables or "No results"
**Solution:**
1. Check plugin is enabled: Settings → Community plugins → Dataview
2. Verify files exist in linked folders: `02-Learnings/_claude-learning/`
3. Wait 5 seconds (Dataview indexes on load)

### Graph View Empty
**Symptom:** No nodes visible
**Solution:**
1. Check filters (remove all filters to see everything)
2. Verify linked folders have content
3. Click "Open local graph" on a specific file instead

### Changes Not Syncing
**Symptom:** Edit in Obsidian, doesn't show in `~/.claude/`
**Solution:** Symlinks edit files in-place (should work). Check if you're editing the right folder.

---

## Tips

1. **Start simple:** Use weekly template, ignore advanced features initially
2. **Build habit:** Block calendar time, treat it like a meeting
3. **Tag consistently:** Use domain tags (befirst, infrastructure, team)
4. **Link liberally:** Use `[[wikilinks]]` to connect related concepts
5. **Archive aggressively:** Stale context confuses Claude

---

## Files Reference

| File | Purpose |
|------|---------|
| `C:\Users\emarquez\.claude\CLAUDE.md` | Your personal context (edited in Obsidian) |
| `C:\Users\emarquez\.claude\learning\context-review-system.md` | Complete guide |
| `C:\Users\emarquez\.claude\scripts\setup-context-vault.ps1` | Vault setup script |
| `C:\Users\emarquez\OneDrive\Claude-Context-Management\` | Obsidian vault location |

---

## Next Steps

**Right now:**
1. Install Obsidian
2. Run setup script
3. Open vault in Obsidian
4. Install Dataview plugin
5. Open `00-Dashboard/Context-Quality-Dashboard.md`
6. Explore graph view (Ctrl+G)

**This Friday:**
1. Block 30 minutes at 4:00 PM
2. Do first weekly review
3. Update CLAUDE.md personal section

**Next month:**
1. Schedule 1-hour deep dive (first Monday)
2. Review promotion candidates
3. Archive old content

---

## Questions?

**Where's the guide?**
`C:\Users\emarquez\.claude\learning\context-review-system.md`

**How do I update this system?**
Edit files in Obsidian, changes save to `~/.claude/` automatically via symlinks.

**Can I use this on other computers?**
Yes! Vault is in OneDrive, syncs automatically. Install Obsidian on other PC and open same folder.

**What if I don't like Obsidian?**
You can use any markdown editor (VS Code, Typora). Obsidian just adds visualization.

---

## Success Metrics

**After 1 month:**
- [ ] 4 weekly reviews completed
- [ ] Stale content reduced by 50%
- [ ] All files have domain tags
- [ ] "Current Focus Areas" in CLAUDE.md is current
- [ ] At least 1 learning promoted to skill

**After 3 months:**
- [ ] Context review is a habit (no calendar reminders needed)
- [ ] Stale content <5 items
- [ ] Claude references your preferences consistently
- [ ] Knowledge base growing organically

---

**You're ready!** Start with the setup script and explore the vault.
