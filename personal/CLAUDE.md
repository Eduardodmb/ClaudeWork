# Personal Preferences — Eduardo Marquez

> Loaded by `~/.claude/CLAUDE.md` via `@personal/CLAUDE.md` on every session.
> Contains Eduardo-specific preferences that override or supplement the enterprise layer.

---

## Work Style & Communication

**Decision-Making:**
- Present 2–3 options with clear tradeoffs; let me choose
- Flag risks proactively — "here's what could go wrong" over optimistic estimates
- I prefer explicit uncertainty over false confidence

**Communication:**
- Start with brief summary, provide details on request
- Use tables for comparisons — easier to scan
- Technical depth is fine — I'm hands-on when needed
- No emojis unless explicitly requested

**Time & Focus:**
- Work in 1–2 hour focused blocks
- Context switches between priorities are normal
- End-of-day: prefer quick wins over starting large tasks

**What I Value:**
- Clear tradeoff explanations
- Proactive risk identification
- Documentation as you build (not after)
- Incremental progress over big-bang changes
- Learning from mistakes — always capture corrections

**What Frustrates Me:**
- Surprises (always confirm before irreversible actions)
- Documentation drift (update docs WITH code changes)
- Over-engineering when simple works
- Silent failures or skipped verification

---

## Role & Context

**Day job:** IT Manager, Safari Circuits
- BeFirst platform (Odoo-based), Azure migration, Claude Code team adoption
- Reports to Scott (IT Director); key stakeholders: Julien (Operations), Arturo (Manufacturing)

**Personal focus:** Learning, side projects, home lab, open source
- Work context is in ClaudeWork repo; this layer applies everywhere

---

## Technology Preferences

### Languages
- **Primary:** Python, TypeScript/JavaScript, SQL
- **Learning:** Go, Rust

### Stack
- **Backend:** FastAPI, Express, Flask
- **Frontend:** React, Next.js
- **Data:** Pandas, NumPy, SQL Server, PostgreSQL
- **Cloud:** Azure (primary), AWS (learning)
- **Containers:** Docker, Docker Compose

### Code Standards

**TypeScript/JavaScript:**
- `type` over `interface`
- `const` by default, `let` when needed, never `var`
- Avoid `any` — use `unknown` when type is truly unknown
- Prefer functional patterns where appropriate

**Python:**
- PEP 8
- Type hints on all functions (params + return)
- Dataclasses for data structures
- List comprehensions for simple transformations

**SQL:**
- Explicit JOINs (never implicit)
- Always use transactions for multi-statement operations
- Index columns used in WHERE/JOIN
- Flag query performance implications

**General:**
- Read existing code first, match patterns
- Minimal and focused changes
- Comments explain WHY, not WHAT
- No multi-paragraph docstrings

---

## Current Focus Areas

> Review monthly — update when priorities shift.

**Active (as of 2026-05-08):**
- [ ] Personal Claude Code environment (this repo)
- [ ] Advanced TypeScript patterns
- [ ] Docker orchestration basics
- [ ] System design patterns

**Backlog (future quarters):**
- [ ] Go for backend services
- [ ] GraphQL APIs
- [ ] Event-driven architecture
- [ ] Kubernetes basics

---

## Project Types I Work On

- REST APIs with auth
- Data processing pipelines
- Admin dashboards
- Database schemas and migrations
- Automation scripts
- Home lab / self-hosted services

---

## Notes for Claude

- This is personal use only — no team/work content in this layer
- When correcting me, auto-propose capturing the learning
- Suggest skills when I describe a repeated workflow
- Keep things simple and maintainable
- I'm building this system as I go — suggestions welcome
