# SKILL: Whitepaper Citation Standards

## Purpose

Maintain source transparency in corporate whitepapers and awareness documents without creating an overly academic tone. The goal is trust and verifiability, not peer review.

## Citation Approach

When writing or editing whitepaper content:

### For Statistics, Metrics, and Quantitative Claims

- Add a bracketed number reference inline: `[1]`, `[2]`, etc.
- Example: "Organizations using centralized documentation report 40% faster onboarding [1]."

### For Industry Trends or Attributed Insights

- Use a lighter inline attribution when the source adds credibility
- Example: "Gartner projects AI-assisted documentation will become standard by 2027."
- Reserve bracketed citations for specific data points

### For General Knowledge or Widely Accepted Facts

- No citation needed for common industry knowledge
- Example: "Digital transformation requires alignment between IT and business objectives."

## Reference List Format

At the document's end, include a "Sources" or "References" section:

```
## Sources

[1] Gartner, "State of IT Documentation," 2024. https://example.com/report
[2] McKinsey & Company, "The Value of Enterprise Knowledge Management," 2023.
[3] Internal metrics, Safari Circuits Q3 2024 analysis.
```

## Instructions for Claude

When drafting or revising whitepaper content:

1. **Verify claims before citing**: If you reference a statistic or study, confirm it exists and is accurately represented. If you cannot verify a claim, flag it for the author: `[VERIFY: source needed]`

2. **Prefer authoritative sources**: Prioritize industry analysts (Gartner, Forrester, McKinsey), peer-reviewed research, official vendor documentation, and reputable trade publications.

3. **Track sources as you write**: Maintain a running reference list at the document's end. Number sources in the order they first appear.

4. **Flag AI-generated estimates**: If providing a reasonable estimate or synthesis rather than a cited fact, be transparent: "Based on industry patterns..." or "Estimates suggest..." without a citation number.

5. **Keep it scannable**: The document should read smoothly. Citations are reference markers, not interruptions. Avoid cluttering sentences with multiple citations.

6. **Internal data is valid**: Company metrics, internal studies, and proprietary data are legitimate sources. Cite as: `[3] Internal analysis, [Department/Project], [Date]`

## Tone Guidance

- This is a corporate awareness document, not an academic paper
- Prioritize clarity and actionable insights over exhaustive sourcing
- One well-placed citation per major claim is sufficient
- The reference list exists for verification, not to impress

## Quality Check

Before finalizing, confirm:

- [ ] Every statistic has a source or is flagged for verification
- [ ] Reference list is complete and numbered correctly
- [ ] No broken or placeholder citations remain
- [ ] Sources are credible and appropriate for the audience

## Integration with Other Skills

This skill works alongside:
- `production-code-standards/reference/html-deliverable-styling.md` - For HTML whitepaper formatting
- Brand governance standards - For visual consistency

## Example Application

**Before:**
```
65% of AI implementations fail due to context drift.
```

**After (with verified source):**
```
65% of AI implementations fail due to context drift [1].

## Sources
[1] Gartner, "AI Implementation Success Factors," 2024.
```

**After (unverified):**
```
Industry estimates suggest a majority of AI implementations struggle with context drift [VERIFY: source needed].
```
