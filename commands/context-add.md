# Context Add

Add new context assets to the governance system. Captures context from conversations, documents, or explicit input.

## Purpose

**Self-evolving context** - The system automatically captures valuable context as you work:
- Natural language input becomes structured context
- Learnings are cataloged for reuse
- Quality gates ensure context meets standards

## When to Use

| Trigger | Action |
|---------|--------|
| "add this to context" | Capture current discussion as context |
| "this is important context" | Elevate to permanent context |
| "remember this pattern" | Add to learning catalog |
| "create context for [topic]" | New context asset |
| **Auto-detected** | High-value patterns captured silently |

---

## Context Types

| Type | When to Use | Auto-Create? |
|------|-------------|--------------|
| **Learning** | Patterns, corrections, insights | Yes (auto-capture) |
| **Standard** | Team-wide rules, conventions | Manual only |
| **Integration** | MCP configs, tool setups | Suggest on setup |
| **Skill** | Reusable capability | Suggest on pattern detection |
| **Domain** | Subject matter expertise | Manual only |

---

## Instructions

### 1. Capture Context from Conversation

When user says "add this to context" or similar:

```
CONTEXT_CAPTURE(topic):
  1. Analyze recent conversation (last 10 turns)
  2. Extract:
     - Key facts and patterns
     - Decisions made
     - Important configurations
     - Best practices discovered

  3. Determine context type:
     - Correction/learning → Learning asset
     - Tool/integration setup → Integration asset
     - Repeated pattern → Skill candidate
     - Domain knowledge → Domain asset

  4. Generate structured context:
     ```yaml
     id: ctx-{generated}
     type: {detected_type}
     title: {extracted_title}
     domain: {inferred_domain}
     tags: [{auto_tags}]
     summary: {one_line_summary}
     content: |
       {structured_content}
     metadata:
       source: conversation
       capturedAt: {timestamp}
       confidence: {0.0-1.0}
       autoCapture: {true|false}
     ```

  5. Ask for confirmation:
     ```
     **Captured Context**

     **Title:** {title}
     **Type:** {type}
     **Tags:** {tags}

     **Summary:**
     {summary}

     **Content Preview:**
     {first 200 chars...}

     Save this context? [yes/edit/discard]
     ```
```

### 2. Auto-Capture Rules

Claude silently captures context when detecting:

| Signal | Confidence | Auto-Action |
|--------|------------|-------------|
| User correction | 0.95 | Add to Learnings |
| Repeated pattern (3x) | 0.85 | Suggest as skill |
| MCP/tool setup | 0.90 | Add to Integrations |
| Domain expertise shared | 0.70 | Suggest for capture |
| Stack trace + fix | 0.90 | Add to Learnings |

**Auto-capture is silent but logged.** User can review via `/context` command.

### 3. Context Quality Gates

Before saving, validate:

```
QUALITY_GATES(context):
  Required fields:
    ✓ id (unique)
    ✓ type (valid enum)
    ✓ title (3-100 chars)
    ✓ domain (valid domain)
    ✓ content (non-empty)

  Quality checks:
    ✓ No duplicate content
    ✓ No conflicting rules
    ✓ Actionable (not just observation)
    ✓ Scoped appropriately

  Token budget:
    ✓ Estimate tokens: {count}
    ✓ Within budget: {yes|no}
    ⚠️ If large: suggest summarization
```

### 4. Storage Locations

Route context to appropriate storage:

| Type | Location | Format |
|------|----------|--------|
| Learning | `~/.claude/learning/best-practices/{domain}.md` | Markdown |
| Standard | Team CLAUDE.md (propose PR) | Markdown |
| Integration | `~/.claude/CLAUDE.md` MCP section | Markdown |
| Skill | `~/.claude/skills/{name}/SKILL.md` | Markdown |
| Domain | `~/.claude/learning/domains/{domain}.md` | Markdown |

### 5. Update Registry

After saving, update context registry:

```
UPDATE_REGISTRY(new_context):
  1. Read ~/.claude/state/context-registry.json
  2. Add new asset entry
  3. Update relationships (if dependencies detected)
  4. Recalculate metrics
  5. Save registry
```

---

## Natural Language Input

The system understands natural language context input:

| Input | Interpretation |
|-------|----------------|
| "remember that we use PostgreSQL not MySQL" | Learning → Infrastructure decisions |
| "always check git status before committing" | Learning → Workflow patterns |
| "Power BI MCP is at C:\..." | Integration → Tool configuration |
| "when user says X, do Y" | Skill → Trigger pattern |
| "Safari red is #9B1C1C" | Standard → Branding |

---

## Self-Evolution Mechanism

The context system evolves automatically:

### 1. Pattern Detection
```
PATTERN_DETECTOR():
  Monitor conversation for:
  - Repeated corrections (same mistake 2x)
  - Frequently accessed context
  - Unused context (> 30 days)
  - Conflicting context

  On detection:
  - Corrections → Auto-add learning
  - Frequent access → Elevate priority
  - Unused → Suggest archival
  - Conflicts → Flag for resolution
```

### 2. Quality Improvement
```
QUALITY_IMPROVER():
  Analyze context usage:
  - Was context helpful? (user feedback)
  - Did context prevent errors?
  - Was context ignored?

  Auto-adjust:
  - Helpful → Increase quality score
  - Prevented errors → Elevate to standard
  - Ignored → Flag for review
```

### 3. Promotion Pipeline
```
PROMOTION_PIPELINE():
  Learning → [Validate 3x usage] → Best Practice
  Best Practice → [Team review] → Standard
  Standard → [Enforce in CI] → Policy
```

---

## Output Format

### Successful Capture
```
## Context Captured

**Asset ID:** ctx-{id}
**Type:** {type}
**Location:** {path}

**Summary:**
{summary}

**Quality Score:** {score}%
**Token Estimate:** ~{tokens}

**Tags:** {tag1}, {tag2}, ...

---
Context added to registry. View with `/context`.
```

### Auto-Captured
```
✓ Learning captured: "{title}" → {location}
```
(Single line, non-disruptive)

---

## Integration

| Event | Context-Add Integration |
|-------|------------------------|
| User correction | Auto-capture learning |
| Tool setup | Suggest integration context |
| Pattern detected | Prompt for skill creation |
| `/end-work` | Review auto-captured context |

---

## Related

- `/context` - View context dashboard
- `/context-lineage` - View dependencies
- `/context-quality` - Quality audit
- `~/.claude/learning/PIPELINE.md` - Promotion workflow
