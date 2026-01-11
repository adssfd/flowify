---
phase: 15-sidecar-detection
plan: 01
subsystem: core
tags: [typescript, parsing, utilities]

# Dependency graph
requires:
  - phase: 14-markdown-rendering
    provides: Markdown rendering in chat messages
provides:
  - DiagramBlock and SidecarBlock types
  - parseDiagramBlocks() and hasDiagramBlocks() utilities
affects: [16-sidecar-display, 19-render-fallback]

# Tech tracking
tech-stack:
  added: []
  patterns: [regex-parsing]

key-files:
  created: [src/utils/diagramParser.ts, src/utils/index.ts]
  modified: [src/types/chat.ts]

key-decisions:
  - "Mermaid regex expects newline after opening fence and before closing fence"
  - "Sidecar must immediately follow mermaid block (whitespace allowed)"
  - "Parser returns start/end indices for potential content manipulation"

patterns-established:
  - "Utils barrel export via src/utils/index.ts"

issues-created: []

# Metrics
duration: 3min
completed: 2026-01-11
---

# Phase 15 Plan 01: Sidecar Detection Summary

**DiagramBlock types and parser utility for extracting mermaid+sidecar pairs from AI responses**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-11
- **Completed:** 2026-01-11
- **Tasks:** 3
- **Files created:** 2
- **Files modified:** 1

## Accomplishments

- Added DiagramBlock and SidecarBlock types to src/types/chat.ts
- Created parseDiagramBlocks() utility to extract mermaid blocks with optional sidecars
- Created hasDiagramBlocks() utility to detect presence of mermaid diagrams
- Created src/utils/index.ts barrel export
- Type check and build pass successfully

## Task Commits

Each task was committed atomically:

1. **Task 1: Add DiagramBlock types** - Types added
2. **Task 2: Create diagram block parser** - Parser created with TypeScript fixes
3. **Task 3: Export and verify** - Barrel export created, build verified

## Files Created/Modified

- `src/types/chat.ts` - Added DiagramBlock and SidecarBlock interfaces
- `src/utils/diagramParser.ts` - Parser utility with parseDiagramBlocks() and hasDiagramBlocks()
- `src/utils/index.ts` - Barrel export for utils

## Decisions Made

- **Regex pattern**: `mermaid` block followed optionally by `text` block with whitespace between
- **Sidecar header format**: "Diagram: <name> (<type>)" on first line
- **Index tracking**: Start/end indices preserved for potential content manipulation in Phase 16

## Deviations from Plan

### TypeScript Strict Mode Fixes

**Issue:** RegExpExecArray elements can be undefined, causing TS2532 errors
**Resolution:** Added optional chaining with nullish coalescing (`?.trim() ?? ''`)
**Impact:** Minor syntax adjustment, no logic change

---

**Total deviations:** 1 (TypeScript strictness)
**Impact on plan:** No scope creep. Minor syntax fix.

## Issues Encountered

None - straightforward implementation.

## Next Phase Readiness

- Phase 15 (Sidecar Detection) complete
- Parser ready for use in Phase 16 (Sidecar Display)
- Types exported and available via @/types
- Utilities exported via @/utils
- No blockers

---
*Phase: 15-sidecar-detection*
*Completed: 2026-01-11*
