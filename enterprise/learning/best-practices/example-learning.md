---
topic: example-learning
created: 2026-05-08
updated: 2026-05-08
tags: [example, template]
validated: true
---

# Example Learning Template

This is a template showing how to capture a learning.

## Context

Delete this example and replace with your own learnings.

Use this template when you discover something useful that you want to remember for future sessions.

## The Practice

**Do this:**
- Be specific about what works
- Explain the context where it applies
- Document tradeoffs

**Not this:**
- Vague generalities
- Copy-paste from docs without understanding
- No context about when to use

## Why It Works

Structured learnings help Claude understand your preferences and provide better assistance over time.

Each learning becomes part of your persistent knowledge base.

## Example

**Real learning (replace this example):**

```markdown
---
topic: typescript-type-vs-interface
created: 2026-05-08
tags: [typescript, patterns]
validated: true
---

# TypeScript: Use `type` Over `interface`

## Context
When defining shapes in TypeScript, especially for unions and intersections.

## The Practice
Use `type` instead of `interface`:

```typescript
// Good
type User = {
  id: string;
  name: string;
}

// Instead of
interface User {
  id: string;
  name: string;
}
```

## Why It Works
- `type` works with unions: `type ID = string | number`
- `interface` cannot represent unions
- `type` is more flexible for complex types
- Consistency: one approach for all type definitions

## Examples

### Union Types
```typescript
type Status = 'pending' | 'active' | 'completed';
// interface cannot do this
```

### Mapped Types
```typescript
type Readonly<T> = { readonly [P in keyof T]: T[P] };
// cleaner with type
```

## Related
- See: skills/typescript-setup/ for TypeScript project scaffolding
- See: reference/typescript-patterns.md for more patterns
```

## Related

- `learning/best-practices/README.md` - Template details
- `skills/` - Learnings can reference skills
- `commands/` - Commands can use learnings
