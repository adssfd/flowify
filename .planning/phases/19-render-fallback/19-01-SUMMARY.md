---
phase: 19-render-fallback
plan: 01
subsystem: ui
tags: [vue, mermaid, error-handling, ux]

# Dependency graph
requires:
  - phase: 16-sidecar-display
    provides: DiagramBlockRenderer with view toggle, useMermaid composable
provides:
  - Auto-fallback to ASCII when Mermaid rendering fails
  - Improved error UX with actionable guidance
affects: [20-polish]

# Tech tracking
tech-stack:
  added: []
  patterns: [auto-fallback-on-error, actionable-error-messages]

key-files:
  created: []
  modified: [src/components/chat/DiagramBlockRenderer.vue]

key-decisions:
  - "Auto-switch to ASCII immediately on render failure (no user confirmation)"
  - "Show fallback notice in ASCII view so users know why they see ASCII"
  - "Error display includes clickable 'Code' link for debugging"

patterns-established:
  - "Auto-fallback pattern: watch for error, switch to fallback view if available"
  - "Actionable error pattern: provide next steps in error messages"

issues-created: []

# Metrics
duration: 4min
completed: 2026-01-11
---

# Phase 19 Plan 01: Render Fallback Summary

**Auto-fallback to ASCII on Mermaid render failure with improved error UX**

## Performance

- **Duration:** 4 min
- **Started:** 2026-01-11
- **Completed:** 2026-01-11
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Auto-switch to ASCII view when Mermaid rendering fails (if sidecar exists)
- Added `isFallbackMode` ref to track when showing fallback vs user choice
- Show subtle warning notice in ASCII view when auto-switched
- Improved error display for no-sidecar case with styled error card
- Added clickable "Code" link in error message for debugging

## Task Commits

1. **Task 1 & 2: Auto-fallback and improved error UX** - `9fe25a0` (feat)

**Plan metadata:** (pending)

## Files Modified

- `src/components/chat/DiagramBlockRenderer.vue` - Added auto-fallback logic and improved error styling

## Decisions Made

- **Auto-switch immediately**: When render fails with sidecar available, switch to ASCII without prompting. This follows the phase vision of "seamless fallback."
- **Fallback notice**: Show a subtle warning so users understand why they see ASCII instead of rendered diagram.
- **Code tab link**: In no-sidecar error state, provide direct link to Code tab for debugging syntax.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

- Render fallback complete
- Ready for Phase 20: Polish (final UX refinements)

---
*Phase: 19-render-fallback*
*Plan: 01*
*Completed: 2026-01-11*
