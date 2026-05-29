# Claude Learning Catalog

**Purpose:** Persistent knowledge management for insights gathered across Claude sessions.

## Structure

```
learning/
├── youtube-analyses/       # Video content analysis and key takeaways
│   ├── index.md           # Master catalog of all analyzed videos
│   └── YYYY-MM-DD-*.md    # Individual video analyses
├── best-practices/         # Documented best practices by domain
│   ├── index.md           # Quick reference to all practices
│   └── {domain}.md        # Domain-specific practices
├── implementation-tracking/
│   ├── status.md          # What's implemented vs pending
│   └── checklist.md       # Active implementation checklist
└── README.md              # This file
```

## Workflow

### Adding New Learning Content

1. **YouTube Video:** Use `/learn-video` command (when created) or manually add to `youtube-analyses/`
2. **Best Practice:** Add to appropriate domain file in `best-practices/`
3. **Track Implementation:** Update `implementation-tracking/status.md`

### File Naming Conventions

- YouTube analyses: `YYYY-MM-DD-short-title.md`
- Best practices: `domain-name.md` (lowercase, hyphenated)

### Metadata Header (Required)

Every learning file should include:

```yaml
---
source: [URL or reference]
date_analyzed: YYYY-MM-DD
tags: [tag1, tag2]
implementation_status: [not-started|in-progress|implemented|validated]
safari_relevance: [high|medium|low]
---
```

## Integration Points

- **Safari Trace:** Best practices inform platform development
- **Safari Analyze:** Data architecture learnings feed strategy
- **Safari Studio:** UI/UX learnings improve design
- **Documentation:** Standards and patterns documented here

---

*Last Updated: 2026-01-18*
