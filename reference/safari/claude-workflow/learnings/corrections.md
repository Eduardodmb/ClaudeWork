# Team Corrections Log

Mistakes made and corrected across all Claude sessions. Auto-aggregated from user sessions.

## Format

```markdown
### [Date] - [Brief Title]
**Context:** What was happening
**Mistake:** What went wrong
**Correction:** The right approach
**Source:** [user/session]
```

---

## 2026-01-19

### GSD Workflow Should Be Invisible
**Context:** Implementing context management workflow
**Mistake:** Created slash commands that users had to invoke manually
**Correction:** Made workflow fully automatic - users never invoke commands, Claude handles everything silently
**Source:** Dallas/session-01

---

## 2026-01-18

### CMMI Work Item State Flow
**Context:** Creating work items in Azure DevOps
**Mistake:** Attempted to create work items directly in Closed state
**Correction:** Must create as Proposed, then transition to Closed. Tasks require Custom.CompletionSummary field.
**Source:** Dallas/session-03

### Power BI MCP Installation
**Context:** Installing Power BI MCP server
**Mistake:** Looked for releases on GitHub Releases page
**Correction:** Releases are in a `Releases/` folder in the repo, not GitHub Releases. Use GitHub API to discover download URLs.
**Source:** Dallas/session-02

---

## Template for New Entries

```markdown
### [Title]
**Context:**
**Mistake:**
**Correction:**
**Source:**
```
