---
id: STD-BRAND-005
title: Visual Identity System Methodology
domain: governance
visualization: governance
sensitivity: internal
last_updated: 2026-02-10
---

# Visual Identity System Methodology

## Purpose

This document establishes a methodology for creating and maintaining consistent visual identity across Safari content, marketing materials, and product illustrations. It provides a framework for mapping content themes to visual approaches using AI-assisted design workflows.

## Core Philosophy Principles

| Principle | Description | Application |
|-----------|-------------|-------------|
| **Confident Minimalism** | Every line is intentional | Remove elements that don't serve the message |
| **Imperfect on Purpose** | Looseness signals human hand | Embrace natural variation, avoid sterile precision |
| **White Space is Content** | Empty areas are active participants | Use negative space deliberately, not as filler |
| **Warmth Through Restraint** | Remove everything that doesn't matter | Reveal what's important by eliminating distractions |

## Recurring Visual Elements (Constants)

Build brand recognition through consistent visual anchors across content:

| Element | Purpose | Safari Application |
|---------|---------|-------------------|
| **Circuit Traces** | Technical identity anchor | Background patterns, dividers |
| **Diamond/Node** | Connection and precision | Icons, bullets, decorative elements |
| **Component Silhouettes** | Industry context | Headers, illustrations |
| **Workspace Setting** | Relatability | Technical environment illustrations |
| **Dashboard Views** | Product connection | Interface mockups, feature highlights |

## Visual Style Options

| Style | Characteristics | Best For |
|-------|-----------------|----------|
| **Technical Clean** | Precise lines, minimal color, grid-based | Documentation, technical content |
| **Soft Technical** | Clean but approachable, subtle gradients | Marketing, product tours |
| **Diagram Flow** | Connected nodes, directional flow | Process explanations, architecture |
| **Data Visualization** | Charts, metrics, status indicators | Analytics, reporting content |
| **Blueprint Aesthetic** | Technical drawing style, annotations | Engineering, detailed specs |

## Illustration-to-Content Mapping Framework

Match illustration approach to content type:

| Approach | When to Use | Example |
|----------|-------------|---------|
| **Direct** | Content literally about the object | Article about PCB tracking → show PCB |
| **Metaphorical** | Abstract concept needs visual | Data integrity → locked shield icon |
| **Atmospheric** | Set mood/tone for content | Deep work on traceability → focused workspace |
| **Functional** | Show the system in action | Feature highlight → annotated screenshot |

## Content Theme to Visual Mapping

| Content Concept | Illustration Approach | Specific Elements |
|-----------------|----------------------|-------------------|
| Traceability | Direct | PCB with traced path, component journey |
| Data Integration | Metaphorical | Connected nodes, flowing data streams |
| Compliance/Quality | Functional | Checklist, verification badges |
| Real-time Monitoring | Atmospheric | Dashboard view, status indicators |
| Manufacturing Process | Direct | Production line, work order flow |
| AI Assistance | Metaphorical | Conversational interface, suggestion bubbles |

## AI-Assisted Design Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                 AI-ASSISTED DESIGN PROCESS                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. GATHER         Collect visual references from approved      │
│     INSPIRATION    sources (Dribbble, design systems, etc.)     │
│         ↓                                                        │
│  2. ANALYZE        Use Claude to describe styles in precise     │
│     WITH AI        language that translates to prompts          │
│         ↓                                                        │
│  3. ITERATE        Refine descriptions through conversation     │
│     DESCRIPTION    until style is well-articulated              │
│         ↓                                                        │
│  4. GENERATE       Use descriptions as prompts for image        │
│     IMAGES         generation tools (Gemini, DALL-E, etc.)      │
│         ↓                                                        │
│  5. REVIEW         Check against brand guidelines and           │
│     & REFINE       visual constants                             │
│         ↓                                                        │
│  6. DOCUMENT       Save successful prompts and parameters       │
│     PATTERNS       for consistency                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Workflow Steps

| Step | Action | Output |
|------|--------|--------|
| 1. Gather Inspiration | Collect 3-5 reference images | Mood board |
| 2. Analyze with AI | Paste into Claude, request style description | Written style brief |
| 3. Iterate Description | Refine through conversation | Finalized prompt language |
| 4. Generate Images | Use image generation tools | Draft illustrations |
| 5. Review & Refine | Compare to brand standards | Approved artwork |
| 6. Document Patterns | Record prompts and parameters | Reusable templates |

## Style Description Template

When documenting a visual style, capture:

```yaml
style_name: [Name]
characteristics:
  line_quality: [crisp/loose/varied]
  color_approach: [limited palette/full spectrum/monochrome]
  detail_level: [minimal/moderate/high]
  texture: [flat/subtle gradient/textured]
  mood: [professional/friendly/technical/warm]
prompt_keywords:
  - [keyword 1]
  - [keyword 2]
  - [keyword 3]
example_prompt: "[Full prompt that produces this style]"
use_cases:
  - [use case 1]
  - [use case 2]
```

## Safari-Specific Visual Constants

These elements should appear consistently across Safari brand content:

| Constant | Visual Treatment | Usage Frequency |
|----------|------------------|-----------------|
| Circuit trace pattern | Background texture, 10-20% opacity | Common |
| Diamond node icon | Bullets, connection points | Very common |
| Safari Red accent | Highlights, CTAs, emphasis | Selective |
| Dark background | #0F172A base | Standard for apps |
| Component silhouettes | Decorative, industry context | Occasional |

## Decision Tree: Selecting Visual Approach

```
START: What type of content?
│
├─► Technical Documentation
│   └─► Use: Technical Clean style + Direct approach
│
├─► Marketing/Sales
│   └─► Use: Soft Technical style + Metaphorical approach
│
├─► Product Feature
│   └─► Use: Functional approach + Dashboard elements
│
├─► Blog/Thought Leadership
│   └─► Use: Atmospheric approach + Workspace elements
│
└─► Process Explanation
    └─► Use: Diagram Flow style + Direct approach
```

## Related Documentation

- [STD-BRAND-001 Brand Guide](STD-BRAND-001-brand-guide.md)
- [STD-BRAND-002 Color Palette](STD-BRAND-002-color-palette.md)
- [STD-BRAND-003 Typography](STD-BRAND-003-typography.md)
- [STD-BRAND-004 Component Styling](STD-BRAND-004-component-styling.md)

---

*Standard Owner: Marketing / Design*
*Source: Brian Casel - "Replacing my n8n workflow with a Claude Code Skill" (Jan 2026)*
