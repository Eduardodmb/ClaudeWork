---
domain: ui-design
last_updated: 2026-01-19
sources:
  - type: youtube
    title: "Replacing my n8n workflow with a Claude Code Skill"
    creator: Brian Casel
    url: https://www.youtube.com/watch?v=Jo168H2m5lw
    date: 2026-01-12
implementation_status: partial
---

# UI/UX Design Best Practices

## Safari Brand Guidelines

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Safari Red | #9B1C1C | Primary brand color |
| Dark Background | #0F172A | App backgrounds |
| Blue | #60a5fa | Internal systems |
| Green | #34d399 | Integration/success |
| Pink | #f472b6 | External APIs |
| Amber | #fbbf24 | Data/databases |
| Purple | #a78bfa | User applications |

### Typography
- **Headings:** Inter
- **Code:** IBM Plex Mono
- **Body:** Inter

### Visual Patterns
- Circuit board traces as background element
- Diamond connection nodes
- Dark theme default

---

## Visual Identity System Methodology

*Source: Brian Casel - "Replacing my n8n workflow with a Claude Code Skill" (Jan 2026)*

### Core Philosophy Principles

| Principle | Description |
|-----------|-------------|
| **Confident Minimalism** | Every line is intentional - remove everything that doesn't serve the message |
| **Imperfect on Purpose** | Looseness signals human hand, not machine; embrace natural variation |
| **White Space is Content** | Empty areas are active participants, not dead zones |
| **Warmth Through Restraint** | Remove everything that doesn't matter to reveal what does |

### Recurring Visual Elements (Constants)

Build brand recognition through consistent visual anchors that appear across content:

| Element | Purpose | Example |
|---------|---------|---------|
| **The Dog** | Emotional anchor, represents companionship | Black Lab appearing in illustrations |
| **The Mug** | Well-worn, simple ceramic in brand color | Signals comfort, routine |
| **The Notebook** | Moleskine-style, represents analog thinking | Captures the planning/reflection mode |
| **Home Studio** | Primary workspace "headquarters" | The main setting for builder content |
| **Coffee Shop** | "The usual spot" | Secondary location, change of scene |

### Visual Style Options

| Style | Characteristics |
|-------|-----------------|
| **Ink & Wash** | Fluid, organic, watercolor-like edges |
| **Risograph Minimal** | Limited colors, halftone textures, print aesthetic |
| **Pencil & Digital Tone** | Sketch quality with digital polish |
| **Single Line + Spot Color** | Continuous line art with one accent color |
| **Soft Technical** | Clean but not sterile, approachable precision |
| **Woodcut Modern** | Bold, high-contrast, craft aesthetic |

### Illustration-to-Content Mapping Framework

Match illustration approach to content type:

| Approach | When to Use | Example |
|----------|-------------|---------|
| **Direct** | Content literally about the object | Article about notebooks → show notebook |
| **Metaphorical** | Abstract concept needs visual | Content about iteration → woodworking plane |
| **Atmospheric** | Set mood/tone for content | Deep work → late-night desk with lamp |
| **Emotional** | Convey feeling | Frustration → crumpled paper or concerned dog |

### Content Theme to Visual Mapping

| Content Concept | Illustration Approach | Specific Objects |
|-----------------|----------------------|------------------|
| AI coding assistants | Builder's World | Laptop with terminal, cursor blinking |
| AI as collaborator | Metaphor | Two chairs at desk, or two mugs |
| Prompt engineering | Digital Artifact | Chat interface with message bubbles |
| Design phase | Builder's World | Notebook, pen, blank page |
| Shipping/launching | Action | Package, rocket, door opening |
| Debugging | Problem-solving | Magnifying glass, tangled cord |

### AI-Assisted Design Workflow

**Process for creating brand illustrations:**

1. **Gather Inspiration** - Collect visual references (Dribbble, Pinterest, design sites)
2. **Analyze with Claude** - Paste images into Claude, ask for detailed style descriptions
3. **Iterate on Description** - Refine the style description with Claude as thought partner
4. **Generate with AI** - Use descriptions as prompts for image generation (Gemini, DALL-E, etc.)
5. **Iterate on Output** - Adjust colors, detail levels, composition
6. **Build Style Guide** - Document successful prompts and parameters

**Key Insight:** Claude excels at analyzing and describing visual styles in precise language that translates well to image generation prompts.

---

## General Principles

### 1. Zero-Runtime CSS-in-JS
Modern libraries extract styles at build time rather than injecting at runtime. This enables React Server Components (RSC) compatibility.

**Do:** Use Tailwind CSS or build-time CSS extraction
**Don't:** Use runtime CSS-in-JS that blocks server rendering

### 2. Headless/Unstyled Primitives
Use headless UI libraries for accessibility and interaction, then apply custom styling.

**Recommended:**
- **Radix UI** - Foundation for shadcn/ui, excellent accessibility
- **React Aria** - Adobe's accessibility-first primitives

### 3. Code Ownership Model
Copy components into your codebase rather than importing from packages. This gives full control and customization.

**Example:** shadcn/ui approach - copy, don't install

### 4. Design-to-Code Parity
Use libraries with matching Figma UI kits to reduce designer-developer friction.

### 5. Tree-Shakable Bundles
Only include components you use in the final bundle.

## Component Patterns

### Buttons
<!-- Document standard button patterns -->

### Cards
<!-- Document standard card patterns -->

### Navigation
<!-- Document navigation patterns -->

## Anti-Patterns to Avoid

1. TBD

## Recommended Stack for Safari

Based on current state (Next.js 16, React 19, Tailwind):

| Layer | Choice | Reasoning |
|-------|--------|-----------|
| **Styling** | Tailwind CSS v4 | Already in use, utility-first, RSC compatible |
| **Primitives** | Radix UI | Headless, accessible, foundation for shadcn |
| **Components** | shadcn/ui pattern | Copy into codebase, full control |
| **Icons** | Lucide React | Already in use, consistent |

## Resources

**2026 Research:**
- [Builder.io - 15 Best React UI Libraries](https://www.builder.io/blog/react-component-libraries-2026)
- [Untitled UI - React Component Libraries](https://www.untitledui.com/blog/react-component-libraries)
- [Carmatec - React Design Patterns](https://www.carmatec.com/blog/the-best-react-design-patterns-to-know-about/)
- [Telerik - React Best Practices 2025](https://www.telerik.com/blogs/react-design-patterns-best-practices)

---

*Last Updated: 2026-01-18*
*Status: Documented from web research*
