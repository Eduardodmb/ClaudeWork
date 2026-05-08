# Learn from Video

Analyze video content and automatically document learnings. Minimal interaction required.

## Arguments

$ARGUMENTS - Video URL (YouTube, TikTok, Vimeo, or other video platforms)

## Workflow

### 1. Fetch & Analyze (automatic)

Fetch video page with WebFetch:
- Extract title, channel, description, duration
- Get transcript/captions if available
- Analyze content for Safari Circuits relevance

### 2. Generate Document (automatic)

Infer from content:
- TL;DR summary
- 3 key takeaways
- Safari relevance (high/medium/low)
- Actionable items for Safari Trace/Assist/Analyze
- Tags for categorization

### 3. Save & Report

Save to: `~/.claude/learning/youtube-analyses/YYYY-MM-DD-[slug].md`

Display summary:
```
## Learned: [Title]

**TL;DR:** [1-2 sentences]

**Key Takeaways:**
1. [Takeaway 1]
2. [Takeaway 2]
3. [Takeaway 3]

**Safari Relevance:** [high/medium/low]
**Saved:** ~/.claude/learning/youtube-analyses/[filename].md
```

## Template

Use `~/.claude/learning/youtube-analyses/_template.md` structure with YAML frontmatter.

## Fallbacks

| Condition | Action |
|-----------|--------|
| No transcript | Analyze from title + description |
| Fetch fails | Ask user to paste transcript |
| Low relevance | Still save, mark as `safari_relevance: low` |

## Example

```
User: /learn-video https://youtube.com/watch?v=xyz

Claude: [Fetches, analyzes, saves]

## Learned: Building AI Agents with Claude

**TL;DR:** Guide to building production AI agents using Claude's tool use and structured outputs.

**Key Takeaways:**
1. Use tool_choice to force specific tool calls
2. Implement retry logic with exponential backoff
3. Structure agent loops with clear exit conditions

**Safari Relevance:** high
**Saved:** ~/.claude/learning/youtube-analyses/2026-01-18-building-ai-agents-claude.md
```

## Related
- `~/.claude/learning/PIPELINE.md` - Promotion workflow
- `/review-backlog` - Review pending learnings
