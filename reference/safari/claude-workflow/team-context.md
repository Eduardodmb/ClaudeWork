# Team Context (Auto-Updated)

Current state of team-wide Claude workflow context.

## Active Initiatives

| Initiative | Status | Owner |
|------------|--------|-------|
| Automatic Workflow (GSD) | Implemented | Dallas |
| Azure DevOps Integration | Active | Team |
| Safari MCP Server | In Progress | Dallas |
| Context Layer Scaling | In Progress | Dallas |

## Recent Team Learnings

### 2026-01-20
- **Safari MCP Strategy:** Added Safari MCP as integration layer bridging Context Governance with Model Context Protocol
- Safari MCP provides: Resources (read context), Tools (SCL operations), Prompts (governance queries)
- Updated all context-related documentation (whitepaper, SVGs, HTML deliverable)
- Implementation roadmap now 4 phases with Safari MCP in Phase 2

### 2026-01-19
- Implemented GSD (Get Shit Done) context management
- Workflow is now fully automatic - no commands required
- Context checkpoints happen silently
- Self-improving loop captures learnings automatically

### 2026-01-18
- CMMI process requires Proposed → Closed (can't create as Closed)
- Tasks need `Custom.CompletionSummary` when closing
- Power BI MCP releases in `Releases/` folder, not GitHub Releases

## Current Focus Areas

1. **Safari MCP Implementation** - Build MCP server exposing context as standard resources/tools
2. **Workflow Automation** - Make Claude workflow invisible to users
3. **DevOps Integration** - Seamless GitHub + Azure DevOps + Claude
4. **Context Scaling** - Share learnings across all org users

## Team Workflow Version

**v2.1** - Automatic workflow with Safari MCP context server

Changes from v2.0:
- Safari MCP layer for standardized context access
- Multi-LLM support via MCP protocol
- Updated 4-phase implementation roadmap
- Enhanced documentation with MCP architecture

Changes from v1.0:
- Session management automatic (no /start-work required)
- Silent checkpoints every ~50 turns
- Learnings auto-captured and promoted
- Context health monitoring invisible

---
*Last updated: 2026-01-20*
*Updated by: Claude (automatic)*
