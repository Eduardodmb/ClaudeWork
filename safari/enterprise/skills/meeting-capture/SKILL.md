# Meeting Capture Skill

> Transform meeting recordings and transcripts into structured knowledge artifacts.

## Purpose

Process meeting content (transcripts, recordings, notes) and extract:
1. **Structured meeting notes** - Summary, decisions, action items
2. **Documentation drafts** - Workflows, architecture, standards, policies
3. **Work items** - Action items ready for DevOps tracking

## Invocation

```
/meeting-capture [transcript-file-path]
/meeting-capture [paste transcript inline]
/meeting-capture --project <project-folder>
```

## Input Types

| Input | Description |
|-------|-------------|
| **Transcript file** | `.txt`, `.vtt`, `.docx` from Teams/Zoom |
| **Inline text** | Pasted transcript content |
| **Audio file** | `.mp3`, `.m4a`, `.wav` (requires transcription) |
| **Meeting URL** | Teams meeting link (requires MS-365 MCP auth) |

## Output Artifacts

### 1. Meeting Notes (`meetings/YYYY-MM-DD-<slug>.md`)

```markdown
# Meeting: [Subject]

**Date:** YYYY-MM-DD
**Duration:** X minutes
**Attendees:** [Extracted from transcript]
**Project:** [Inferred or specified]

## Summary
[2-3 sentence executive summary]

## Key Decisions
- [Decision 1]
- [Decision 2]

## Action Items
| Item | Owner | Due | Priority |
|------|-------|-----|----------|
| | | | |

## Discussion Topics
### Topic 1: [Name]
[Summary of discussion]

### Topic 2: [Name]
[Summary of discussion]

## Documentation Triggers
[List of docs that should be created from this meeting]

## Follow-Up Required
- [ ] Item 1
- [ ] Item 2
```

### 2. Documentation Drafts (`knowledge/drafts/`)

The skill identifies documentation needs and generates drafts:

| Trigger Phrase | Document Type | Output |
|----------------|---------------|--------|
| "the workflow is...", "the process should be..." | Workflow Doc | `WF-*.md` |
| "the architecture...", "the system design..." | Architecture Doc | `ARCH-*.md` |
| "we should standardize...", "the standard is..." | Standard | `STD-*.md` |
| "the policy is...", "the rule should be..." | Policy | `POL-*.md` |
| "how to...", "the procedure for..." | Procedure | `PROC-*.md` |

### 3. Work Items (Optional DevOps Sync)

Action items can be synced to Azure DevOps:
- Creates Requirements or Tasks
- Links to meeting notes
- Assigns owners if mentioned

## Processing Pipeline

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐     ┌─────────────┐
│   INPUT     │────▶│  EXTRACTION  │────▶│  GENERATION   │────▶│   OUTPUT    │
│ Transcript  │     │  • Speakers  │     │  • Notes      │     │  • Files    │
│ Recording   │     │  • Topics    │     │  • Docs       │     │  • DevOps   │
│ Notes       │     │  • Decisions │     │  • Work Items │     │  • Review   │
└─────────────┘     │  • Actions   │     └───────────────┘     └─────────────┘
                    └──────────────┘
```

## Extraction Patterns

### Speaker Identification
- Teams format: `[Speaker Name] HH:MM:SS`
- Zoom format: `Speaker Name: `
- Generic: Infer from context

### Decision Detection
- "we decided...", "the decision is...", "agreed to..."
- "going forward we will...", "the approach is..."
- Voting/consensus indicators

### Action Item Detection
- "action item:", "TODO:", "follow up:"
- "[Name] will...", "[Name] to..."
- "by [date]", "due [date]", "before [event]"

### Documentation Triggers
- Architecture: "the system...", "integration...", "data flow..."
- Workflow: "the process...", "steps are...", "first... then..."
- Standard: "should always...", "must...", "the rule is..."
- Policy: "the policy...", "compliance...", "governance..."

## Post-Processing Workflow

After skill generates artifacts:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  GENERATED  │────▶│   REVIEW    │────▶│  APPROVED   │────▶│  PROMOTED   │
│   Drafts    │     │   by User   │     │   Content   │     │  to Repo    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                          │
                          ▼
                    ┌─────────────┐
                    │   REVISED   │
                    │  with Edits │
                    └─────────────┘
```

### Review Commands
- `/meeting-capture review` - Show pending drafts
- `/meeting-capture approve <file>` - Approve and promote
- `/meeting-capture revise <file>` - Open for editing

## Configuration

### Project Context
When `--project` is specified, outputs go to:
```
projects/active/<project>/
├── meetings/          # Meeting notes
├── knowledge/         # Promoted documentation
│   └── drafts/        # Pending review
└── planning/          # If planning-related
```

### Default Context
Without project, outputs go to:
```
~/.claude/meeting-capture/
├── inbox/             # Unprocessed
├── drafts/            # Generated, pending review
└── archive/           # Processed and promoted
```

## Example Usage

### Process a Teams Transcript
```
/meeting-capture C:\Users\dkmcintyre\Downloads\meeting-transcript.vtt
```

### Process with Project Context
```
/meeting-capture --project manufacturing-convergence

[Paste transcript here]
```

### Process Inline
```
/meeting-capture

Meeting transcript:
[Speaker 1] 10:00:00
Today we're discussing the serialization workflow...
```

## Integration Points

| System | Integration |
|--------|-------------|
| **Azure DevOps** | Create work items from action items |
| **MS-365 MCP** | Fetch transcripts from Teams meetings |
| **Git** | Commit approved docs to organizational-docs |
| **Safari Context** | Register docs in context registry |

## Future: Teams Plugin Architecture

For real-time capture during meetings:

```
┌─────────────────────────────────────────────────────────────────┐
│                    TEAMS MEETING                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Safari Meeting Assistant Bot                │   │
│  │  • Listens to transcript stream                         │   │
│  │  • Identifies documentation triggers in real-time       │   │
│  │  • Surfaces draft cards for review                      │   │
│  │  • Captures action items as they're spoken              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  POST-MEETING WORKFLOW                          │
│  1. Bot posts summary to meeting chat                          │
│  2. Drafts queued in organizational-docs                       │
│  3. User reviews via /meeting-capture review                   │
│  4. Approved content promoted to proper locations              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Integration with Doc-Coauthoring Skill

The `/meeting-capture` skill generates **draft** documentation. For refinement, use the `doc-coauthoring` skill:

```
/meeting-capture → Generates drafts → /doc-coauthoring → Refines to final
```

**Workflow:**
1. Process meeting with `/meeting-capture`
2. Review generated drafts in `knowledge/drafts/`
3. For complex docs needing refinement, invoke doc-coauthoring:
   - "I want to refine this draft workflow document"
   - Claude guides through Context → Refinement → Reader Testing
4. Approved docs promoted to final location

**Key touchpoints:**
- Meeting-capture outputs raw structure from transcript
- Doc-coauthoring adds polish, fills gaps, validates with reader testing
- Both skills write to same project structure

See: `~/.claude/skills/anthropic-skills/skills/doc-coauthoring/SKILL.md`

---

## Changelog

| Date | Change |
|------|--------|
| 2026-02-05 | Initial skill design |
| 2026-02-05 | Added doc-coauthoring integration |
