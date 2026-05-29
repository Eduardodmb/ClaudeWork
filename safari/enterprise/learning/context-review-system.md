# Context Review System - Graphical UI Guide

**Purpose:** Use Obsidian as a visual dashboard to review, improve, and maintain Claude context quality.

---

## Setup (One-Time)

### 1. Install Obsidian

Download from: https://obsidian.md/

### 2. Create Context Management Vault

**Two Options:**

#### Option A: Point Obsidian at Claude Directory (Direct Editing)
```
Vault location: C:\Users\emarquez\.claude\
```
**Pros:** Edit files in place, no sync needed
**Cons:** Shows all ~/.claude/ files (may be cluttered)

#### Option B: Dedicated Context Vault (Recommended)
```
Vault location: C:\Users\emarquez\OneDrive\Claude-Context-Management\
```

**Structure:**
```
Claude-Context-Management/
├── 00-Dashboard/
│   └── Context-Review-Weekly.md (template below)
├── 01-Personal-Context/
│   └── CLAUDE.md -> symlink to C:\Users\emarquez\.claude\CLAUDE.md
├── 02-Learnings/
│   └── [Mirror of ~/.claude/learning/]
├── 03-Skills/
│   └── [Mirror of ~/.claude/skills/]
├── 04-Commands/
│   └── [Mirror of ~/.claude/commands/]
└── 99-Archive/
    └── [Stale context moved here]
```

**Setup script (PowerShell):**
```powershell
# Create vault structure
$vault = "C:\Users\emarquez\OneDrive\Claude-Context-Management"
New-Item -ItemType Directory -Force -Path "$vault\00-Dashboard"
New-Item -ItemType Directory -Force -Path "$vault\01-Personal-Context"
New-Item -ItemType Directory -Force -Path "$vault\02-Learnings"
New-Item -ItemType Directory -Force -Path "$vault\03-Skills"
New-Item -ItemType Directory -Force -Path "$vault\04-Commands"
New-Item -ItemType Directory -Force -Path "$vault\99-Archive"

# Create symbolic links (run as Administrator)
New-Item -ItemType SymbolicLink -Path "$vault\01-Personal-Context\CLAUDE.md" -Target "C:\Users\emarquez\.claude\CLAUDE.md"
New-Item -ItemType SymbolicLink -Path "$vault\02-Learnings" -Target "C:\Users\emarquez\.claude\learning"
New-Item -ItemType SymbolicLink -Path "$vault\03-Skills" -Target "C:\Users\emarquez\.claude\skills"
New-Item -ItemType SymbolicLink -Path "$vault\04-Commands" -Target "C:\Users\emarquez\.claude\commands"
```

**If symlinks fail (non-admin):** Use Obsidian's "Open another vault" to switch between OneDrive vault and C:\Users\emarquez\.claude\

### 3. Install Obsidian Plugins

Open Obsidian Settings → Community Plugins → Browse:

| Plugin | Purpose |
|--------|---------|
| **Dataview** | Query context files (find stale, unused) |
| **Calendar** | Schedule reviews |
| **Templater** | Auto-fill review templates |
| **Tag Wrangler** | Manage context tags |
| **Kanban** | Visual task board for context improvements |

**Enable core plugins:**
- Graph view
- Tag pane
- File recovery
- Sync (if using Obsidian Sync, or use OneDrive)

---

## Weekly Review Process

### Schedule
**When:** Every Friday, 4:00 PM (30 minutes)
**Where:** Obsidian Context Management vault
**Tool:** Weekly review template (see below)

### Review Workflow

#### Phase 1: Discovery (10 min)
Use Dataview queries to find:
1. Stale content (>90 days since modified)
2. Unused skills (never invoked)
3. Duplicate learnings
4. Missing tags

#### Phase 2: Triage (10 min)
For each flagged item:
- **Keep + Update**: Still relevant, needs refresh
- **Archive**: Outdated, move to 99-Archive
- **Promote**: Learning → Skill, Skill → Standard
- **Consolidate**: Merge duplicates

#### Phase 3: Improvement (10 min)
- Update CLAUDE.md personal section
- Add new learnings from week
- Tag items for next review (#review-monthly)
- Create action items for major updates

---

## Obsidian Dashboard Configuration

### Create: `00-Dashboard/Context-Review-Weekly.md`

````markdown
---
tags: [context-review, weekly]
review-date: {{date:YYYY-MM-DD}}
---

# Context Review - {{date:YYYY-MM-DD}}

## 1. Stale Content (>90 days)

```dataview
TABLE file.mtime as "Last Modified"
FROM "02-Learnings" OR "03-Skills" OR "04-Commands"
WHERE file.mtime < date(today) - dur(90 days)
SORT file.mtime ASC
LIMIT 20
```

**Actions:**
- [ ] Item 1: [Keep/Archive/Update]
- [ ] Item 2: [Keep/Archive/Update]

---

## 2. Untagged Content (Needs Classification)

```dataview
TABLE file.tags as "Current Tags"
FROM "02-Learnings"
WHERE !contains(file.tags, "befirst")
  AND !contains(file.tags, "infrastructure")
  AND !contains(file.tags, "process")
SORT file.name ASC
```

**Actions:**
- [ ] Add domain tags (befirst, infrastructure, team, etc.)

---

## 3. Promotion Candidates

```dataview
TABLE file.mtime as "Created", file.tags as "Tags"
FROM "02-Learnings/best-practices"
WHERE contains(file.tags, "validated")
  AND file.mtime < date(today) - dur(30 days)
SORT file.mtime ASC
```

**Promote to Skills?**
- [ ] Item 1: Yes/No (reason)

---

## 4. Recent Additions (This Week)

```dataview
TABLE file.ctime as "Created"
FROM "02-Learnings" OR "03-Skills"
WHERE file.ctime > date(today) - dur(7 days)
SORT file.ctime DESC
```

**Quality Check:**
- [ ] All items have proper tags?
- [ ] Descriptions clear and actionable?

---

## 5. Personal Context Updates

**What changed this week?**
- New preferences discovered:
- Decision patterns noticed:
- Frustrations encountered:

**Updates needed in CLAUDE.md:**
- [ ] Update "Current Focus Areas"
- [ ] Add new technical preferences
- [ ] Document new stakeholder context

---

## 6. Context Quality Metrics

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Total learnings | [count] | Growth OK | ✓/✗ |
| Skills available | [count] | >10 active | ✓/✗ |
| Stale items (>90d) | [count] | <5 | ✓/✗ |
| Untagged items | [count] | 0 | ✓/✗ |
| Personal section age | [days] | <30 | ✓/✗ |

**Calculated via Dataview:**
```dataview
TABLE length(rows) as "Count"
FROM "02-Learnings"
GROUP BY file.folder
```

---

## 7. Action Items for Next Week

- [ ]
- [ ]
- [ ]

---

## 8. Claude Feedback

**What worked well this week?**
-

**What needs improvement?**
-

**New patterns to capture?**
-

---

## Review Complete

**Time spent:** [X] minutes
**Next review:** {{date+7d:YYYY-MM-DD}}

````

### Create: `00-Dashboard/Context-Quality-Dashboard.md`

````markdown
# Context Quality Dashboard

## Overview

```dataview
TABLE length(file.outlinks) as "Links Out", length(file.inlinks) as "Links In", file.tags as "Tags"
FROM "02-Learnings" OR "03-Skills"
SORT file.mtime DESC
LIMIT 50
```

---

## Graph Analysis

**Use Obsidian's Graph View:**
1. Open Graph View (Ctrl+G)
2. Filter: `path:02-Learnings OR path:03-Skills`
3. Color by: `tag:befirst`, `tag:infrastructure`, `tag:team`

**Look for:**
- Isolated nodes (no links) = needs integration
- Highly connected nodes = core concepts
- Clusters = related domains

---

## Tag Coverage

```dataview
TABLE length(rows) as "Count"
FROM "02-Learnings" OR "03-Skills"
WHERE file.tags
GROUP BY file.tags
SORT length(rows) DESC
```

**Expected tags:**
- Domain: befirst, infrastructure, devops, team
- Type: learning, skill, command, reference
- Status: validated, in-progress, archived
- Priority: high, medium, low

---

## Freshness Report

### Recently Updated (Good)
```dataview
TABLE file.mtime as "Last Modified"
FROM "02-Learnings" OR "03-Skills"
WHERE file.mtime > date(today) - dur(30 days)
SORT file.mtime DESC
```

### Stale (Needs Review)
```dataview
TABLE file.mtime as "Last Modified"
FROM "02-Learnings" OR "03-Skills"
WHERE file.mtime < date(today) - dur(90 days)
SORT file.mtime ASC
```

### Ancient (Archive?)
```dataview
TABLE file.mtime as "Last Modified"
FROM "02-Learnings" OR "03-Skills"
WHERE file.mtime < date(today) - dur(180 days)
SORT file.mtime ASC
```

---

## Skill Inventory

```dataview
TABLE file.ctime as "Created", file.mtime as "Updated", file.tags as "Tags"
FROM "03-Skills"
SORT file.mtime DESC
```

**Skill Health:**
- Total skills: [count]
- Recently used (<7 days): [count]
- Dormant (>90 days): [count]

---

## Learning Pipeline

### Ideas (Backlog)
```dataview
TABLE file.tags
FROM "02-Learnings/ideas"
WHERE !contains(file.tags, "archived")
```

### Best Practices (Validated)
```dataview
TABLE file.tags
FROM "02-Learnings/best-practices"
WHERE contains(file.tags, "validated")
```

### Promotion Candidates
```dataview
LIST
FROM "02-Learnings/best-practices"
WHERE contains(file.tags, "validated")
  AND file.mtime < date(today) - dur(60 days)
```

---

## Improvement Opportunities

**Run monthly:**
1. Archive items older than 6 months with no updates
2. Promote validated learnings (>60 days) to skills
3. Tag untagged content
4. Link related concepts
5. Update CLAUDE.md personal section

````

---

## Dataview Queries (Copy-Paste Reference)

### Find Stale Content
````markdown
```dataview
TABLE file.mtime as "Last Modified"
FROM "02-Learnings" OR "03-Skills"
WHERE file.mtime < date(today) - dur(90 days)
SORT file.mtime ASC
```
````

### Find Untagged Files
````markdown
```dataview
LIST
FROM "02-Learnings"
WHERE !file.tags OR length(file.tags) = 0
```
````

### Count by Domain
````markdown
```dataview
TABLE length(rows) as "Count"
FROM "02-Learnings"
WHERE contains(file.tags, "befirst")
   OR contains(file.tags, "infrastructure")
   OR contains(file.tags, "team")
GROUP BY file.tags
```
````

### Recent Activity
````markdown
```dataview
TABLE file.ctime as "Created", file.mtime as "Modified"
FROM "02-Learnings" OR "03-Skills"
WHERE file.mtime > date(today) - dur(7 days)
SORT file.mtime DESC
```
````

---

## Visual Context Management Features

### 1. Graph View
**Open:** Ctrl+G or click graph icon

**Filters:**
- `path:02-Learnings` - Show only learnings
- `tag:#befirst` - Show BeFirst-related content
- `tag:#validated` - Show production-ready learnings

**Use cases:**
- Find isolated concepts (no links)
- Identify core concepts (many links)
- Discover related learnings

### 2. Tag Pane
**Open:** Right sidebar → Tag icon

**Shows:** All tags with counts
**Click tag:** Filter files by that tag
**Right-click:** Rename/merge tags

### 3. Kanban Board (Plugin)
**Create:** `00-Dashboard/Context-Improvement-Board.md`

````markdown
---
kanban-plugin: basic
---

## To Review

- [ ] [[stale-learning-1]]
- [ ] [[untagged-skill-2]]

## In Progress

- [ ] [[updating-befirst-context]]

## Promoted

- [ ] [[learning-promoted-to-skill]]

## Archived

- [ ] [[obsolete-content]]

````

---

## Calendar Integration

### Setup Calendar Plugin

**Settings → Calendar:**
- Weekly start: Monday
- Show week numbers: Yes
- Dot colors: Use tags

**Create review entries:**
- `00-Dashboard/2026-W19-Context-Review.md` (weekly)
- `00-Dashboard/2026-05-Context-Deep-Dive.md` (monthly)

### Review Schedule Template

**Weekly Reviews:** Every Friday
```
2026-05-09, 2026-05-16, 2026-05-23, 2026-05-30...
```

**Monthly Deep Dives:** First Monday
```
2026-06-02, 2026-07-07, 2026-08-04...
```

---

## Benefits of Graphical UI

| Task | Command Line | Obsidian GUI |
|------|-------------|--------------|
| **Find stale content** | Grep + awk scripts | Dataview table, sortable |
| **See relationships** | Manual file reading | Graph view visualization |
| **Edit context** | Vim/nano | Rich markdown editor |
| **Tag management** | Grep frontmatter | Drag-drop tag pane |
| **Review workflow** | Custom scripts | Template + checklist |
| **Progress tracking** | Git history | Kanban board |

**Key advantage:** Lower friction = more frequent reviews = higher quality context

---

## Maintenance Automation

### Weekly Automation (Optional)

**PowerShell script:** `C:\Users\emarquez\.claude\scripts\weekly-context-report.ps1`

```powershell
# Generate context metrics for Obsidian dashboard
$claudeDir = "C:\Users\emarquez\.claude"
$reportDate = Get-Date -Format "yyyy-MM-dd"

# Count files by type
$learnings = (Get-ChildItem "$claudeDir\learning\best-practices" -Recurse -File).Count
$skills = (Get-ChildItem "$claudeDir\skills" -Directory).Count
$commands = (Get-ChildItem "$claudeDir\commands" -File -Filter "*.md").Count

# Find stale files (>90 days)
$staleFiles = Get-ChildItem "$claudeDir\learning" -Recurse -File |
    Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-90) } |
    Select-Object Name, LastWriteTime

# Output to markdown
$report = @"
# Context Metrics - $reportDate

## Summary
- Total learnings: $learnings
- Total skills: $skills
- Total commands: $commands
- Stale files (>90d): $($staleFiles.Count)

## Stale Files
$($staleFiles | ForEach-Object { "- $($_.Name) (last modified: $($_.LastWriteTime.ToString('yyyy-MM-dd')))" } | Out-String)
"@

$report | Out-File "C:\Users\emarquez\OneDrive\Claude-Context-Management\00-Dashboard\Auto-Metrics-$reportDate.md"
```

**Schedule:** Windows Task Scheduler, Friday 3:45 PM

---

## Quick Start Checklist

- [ ] Install Obsidian
- [ ] Create vault: `C:\Users\emarquez\OneDrive\Claude-Context-Management`
- [ ] Run setup script (create folders + symlinks)
- [ ] Install plugins: Dataview, Calendar, Templater, Tag Wrangler, Kanban
- [ ] Create `Context-Review-Weekly.md` template
- [ ] Create `Context-Quality-Dashboard.md`
- [ ] Schedule first review: Friday 4:00 PM (30 min)
- [ ] Open graph view, explore relationships
- [ ] Run first review using template

---

## Tips

1. **Start simple:** Use weekly review template, ignore advanced queries initially
2. **Build habit:** Block calendar time, treat it like a meeting
3. **Iterate:** Add Dataview queries as you identify needs
4. **Visual first:** Use graph view to spot issues, then drill into files
5. **Archive aggressively:** Stale context is worse than no context (confuses Claude)

---

## Example: First Review Session

**Time: Friday 4:00 PM, 30 minutes**

1. Open Obsidian vault: `Claude-Context-Management`
2. Create new note from template: `00-Dashboard/2026-05-08-Review.md`
3. Run Dataview query: Find stale content
4. Triage: 3 learnings archived, 1 promoted to skill, 2 updated
5. Check graph view: Notice BeFirst and infrastructure clusters well-connected
6. Update `CLAUDE.md`: Add new stakeholder note (Arturo's feedback this week)
7. Create action item: "Document SQL performance pattern from Tuesday's work"
8. Save and commit changes to Git

**Result:** Context 15% fresher, 1 new skill ready for next session

---

## Support

**Issues?**
- Obsidian help: https://help.obsidian.md/
- Dataview syntax: https://blacksmithgu.github.io/obsidian-dataview/
- Claude context questions: Update this guide as you learn!

**Feedback loop:**
When you find a better way, update this guide and propose CLAUDE.md learning.
