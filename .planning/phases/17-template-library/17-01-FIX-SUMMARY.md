---
phase: 17-template-library
plan: 17-01-FIX
subsystem: ui
tags: [vue, templates, mermaid, fixes]

# Dependency graph
requires:
  - phase: 17-template-library
    provides: Original template library implementation
provides:
  - Fixed modal positioning (full viewport overlay)
  - Fixed Journey and Gantt template syntax
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns: [fixed-positioning-modal]

key-files:
  created: []
  modified: [src/components/chat/TemplateLibrary.vue, src/data/diagramTemplates.ts, src/utils/mermaid/validator.ts, src/types/diagram.ts, src/utils/constants.ts, src/utils/mermaid/templates.ts]

key-decisions:
  - "Changed modal from position:absolute to position:fixed for full viewport overlay"
  - "Increased z-index to 1000 to ensure modal overlays all panels"
  - "Added journey to validDiagramTypes in validator.ts (root cause of journey rendering failure)"
  - "Changed all fallback templates from graph to flowchart keyword for proper validation"
  - "Removed quoted node labels from flowchart templates for compatibility"

patterns-established: []

issues-created: []

# Metrics
duration: 3min
completed: 2026-01-11
---

# Phase 17 Plan 01 FIX: Template Library Fixes Summary

**Fixed modal visibility and template rendering issues**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-11
- **Completed:** 2026-01-11
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Fixed modal positioning: changed from absolute to fixed position
- Increased z-index to 1000 for proper layering over all panels
- **Root cause fix:** Added `journey` to validDiagramTypes array in validator.ts
- Added JOURNEY enum to DiagramType and all related constants
- Changed all fallback templates from `graph LR/TB` to `flowchart LR/TB`
- Removed quoted node labels from flowchart-based templates
- Fixed 6 templates: Flowchart with Decision, Sankey Flow, Git Graph, Quadrant Chart, Requirement Traceability, User Journey

## Task Commits

1. **Fix UAT-002: Modal z-index and positioning** - Changed to position:fixed, z-index:1000
2. **Fix UAT-001: Template rendering issues** - Updated Journey and Gantt syntax

## Files Modified

- `src/components/chat/TemplateLibrary.vue` - Modal positioning and z-index
- `src/data/diagramTemplates.ts` - All template syntax fixes (graph→flowchart, removed quotes)
- `src/utils/mermaid/validator.ts` - Added journey to validDiagramTypes
- `src/types/diagram.ts` - Added JOURNEY to DiagramType enum
- `src/utils/constants.ts` - Added JOURNEY to BLANK_DIAGRAM_CONTENT, DEFAULT_DIAGRAM_CONTENT, DIAGRAM_TYPE_LABELS
- `src/utils/mermaid/templates.ts` - Added JOURNEY template

## Issues Fixed

### UAT-002: Template modal partially hidden by diagram panel
- **Fix:** Changed `.template-library-backdrop` from `position: absolute` to `position: fixed`
- **Fix:** Increased z-index from 100 to 1000
- **Fix:** Changed alignment from `flex-end` to `center` for better centering

### UAT-001: Several templates don't render correctly
**Root Cause:** Two issues:
1. `journey` was missing from validDiagramTypes in validator.ts
2. Fallback templates used `graph` keyword instead of `flowchart`

**Fixes Applied:**
- Added `journey` to validDiagramTypes array
- Added JOURNEY to DiagramType enum and all related constants
- Changed Flowchart with Decision: `graph LR` → `flowchart LR`
- Changed Sankey Flow: `graph LR` → `flowchart LR`
- Changed Git Graph fallback: `graph LR` → `flowchart LR`
- Changed Quadrant Chart: `graph TB` → `flowchart TB`
- Changed Requirement Traceability: `graph LR` → `flowchart LR`
- Removed quoted node labels (e.g., `A["text"]` → `A[text]`) for better compatibility

## Deviations from Plan

None - fixes applied as planned.

## Next Steps

- Re-run /gsd:verify-work 17-01 to validate fixes
- If all tests pass, continue to Phase 18

---
*Phase: 17-template-library*
*Plan: 17-01-FIX*
*Completed: 2026-01-11*
