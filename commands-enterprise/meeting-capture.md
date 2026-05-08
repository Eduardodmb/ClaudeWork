# /meeting-capture

Transform meeting transcripts into structured knowledge artifacts.

## Trigger
User invokes `/meeting-capture` with optional file path or project context.

## Instructions

### Step 1: Gather Input

**If file path provided:**
- Read the transcript file (`.txt`, `.vtt`, `.docx`)
- Parse speaker timestamps if present

**If no file path:**
- Ask user to paste transcript inline OR
- Check if MS-365 MCP is authenticated to fetch from recent meetings

**If `--project <name>` provided:**
- Set output context to `projects/active/<name>/`
- Otherwise use default `~/.claude/meeting-capture/`

### Step 2: Extract Structure

Parse the transcript and identify:

1. **Metadata**
   - Meeting subject (from context or first topic)
   - Date (from timestamps or ask user)
   - Attendees (from speaker labels)
   - Duration (from timestamp range)

2. **Decisions** - Look for patterns:
   - "we decided...", "agreed to...", "the decision is..."
   - "going forward...", "the approach will be..."
   - Consensus language, voting outcomes

3. **Action Items** - Look for patterns:
   - "[Name] will...", "[Name] to...", "[Name] is going to..."
   - "action item:", "TODO:", "follow up on..."
   - "by [date]", "due [date]", "before [milestone]"
   - Extract: task, owner, due date (if mentioned)

4. **Topics Discussed** - Segment by:
   - Major subject changes
   - Speaker transitions on new subjects
   - Explicit topic markers ("next item", "moving on to")

5. **Documentation Triggers** - Identify content that should become docs:

| Pattern | Doc Type | Priority |
|---------|----------|----------|
| "the workflow is...", "the process should be...", "steps are..." | Workflow | High |
| "the architecture...", "system design...", "data flows..." | Architecture | High |
| "we should standardize...", "the standard is...", "always do..." | Standard | Medium |
| "the policy is...", "the rule...", "compliance requires..." | Policy | Medium |
| "how to...", "the procedure for...", "instructions for..." | Procedure | Medium |

### Step 3: Generate Artifacts

**A. Meeting Notes** (`meetings/YYYY-MM-DD-<slug>.md`)

Create structured markdown with:
- YAML-style metadata header
- Executive summary (2-3 sentences)
- Key decisions (bulleted)
- Action items (table: Item | Owner | Due | Priority)
- Discussion topics (H3 sections with summaries)
- Documentation triggers (what docs should be created)
- Follow-up items (checklist)

**B. Documentation Drafts** (`knowledge/drafts/`)

For each documentation trigger identified:
1. Create appropriately typed draft
2. Use Safari HTML styling for technical docs
3. Use markdown for text-heavy docs
4. Include `[DRAFT]` watermark and review metadata

Draft naming convention:
- `DRAFT-WF-<topic>-YYYY-MM-DD.md` - Workflow
- `DRAFT-ARCH-<topic>-YYYY-MM-DD.md` - Architecture
- `DRAFT-STD-<topic>-YYYY-MM-DD.md` - Standard
- `DRAFT-POL-<topic>-YYYY-MM-DD.md` - Policy
- `DRAFT-PROC-<topic>-YYYY-MM-DD.md` - Procedure

**C. Work Item Suggestions** (if DevOps active)

For each action item with clear owner:
- Suggest creating ADO Requirement or Task
- Include link to meeting notes
- Set appropriate area path based on context

### Step 4: Present Results

Show user:
1. **Summary of what was captured**
   - Meeting notes location
   - Number of decisions, action items
   - Documentation drafts generated

2. **Draft review queue**
   - List each draft with 1-line description
   - Indicate doc type and priority

3. **Next steps prompt**
   - Review drafts? (`/meeting-capture review`)
   - Create work items? (if action items found)
   - Process another meeting?

### Step 5: Handle Review Commands

**`/meeting-capture review`**
- List all pending drafts in `knowledge/drafts/`
- Show preview of each
- Offer approve/revise/delete options

**`/meeting-capture approve <file>`**
- Move from `drafts/` to appropriate final location
- Remove `[DRAFT]` markers
- Update any cross-references
- Commit to git if in organizational-docs

**`/meeting-capture revise <file>`**
- Open file for editing
- User makes changes
- Re-validate structure
- Return to review queue

## Output Locations

| Context | Meeting Notes | Drafts | Final Docs |
|---------|---------------|--------|------------|
| Project specified | `projects/active/<project>/meetings/` | `projects/active/<project>/knowledge/drafts/` | `projects/active/<project>/knowledge/` |
| No project | `~/.claude/meeting-capture/meetings/` | `~/.claude/meeting-capture/drafts/` | Prompt for destination |

## Example Session

```
User: /meeting-capture --project manufacturing-convergence

Claude: Ready to process meeting content for Manufacturing Convergence Initiative.

Please provide the transcript by:
1. Pasting the text below
2. Providing a file path (e.g., C:\Downloads\transcript.vtt)
3. Or I can check your recent Teams meetings (requires MS-365 auth)

User: [pastes transcript]

Claude: Processing transcript...

## Meeting Captured: PCB Serialization Requirements

**Extracted:**
- 📅 Date: 2026-02-05
- 👥 Attendees: 4 identified
- ⏱️ Duration: ~45 minutes

**Decisions:** 3 captured
**Action Items:** 5 captured (2 with due dates)
**Documentation Triggers:** 2 identified

### Generated Artifacts

| Type | File | Status |
|------|------|--------|
| Meeting Notes | `meetings/2026-02-05-pcb-serialization.md` | ✅ Created |
| Workflow Draft | `knowledge/drafts/DRAFT-WF-container-uid-registration.md` | 📝 Pending Review |
| Architecture Draft | `knowledge/drafts/DRAFT-ARCH-material-control-integration.md` | 📝 Pending Review |

### Action Items for DevOps

| Task | Owner | Create in ADO? |
|------|-------|----------------|
| Evaluate Material Control platforms | John | [Yes/No] |
| Define UID format standard | Sarah | [Yes/No] |

Would you like to:
1. Review the drafts now?
2. Create DevOps work items?
3. Process another meeting?
```

## Error Handling

| Issue | Response |
|-------|----------|
| No transcript provided | Prompt for input or check MS-365 |
| Unrecognized format | Ask user to paste plain text |
| No speakers identified | Proceed with generic "Speaker" labels |
| No action items found | Note in output, still create meeting notes |
| Project folder doesn't exist | Create it or prompt for alternative |
