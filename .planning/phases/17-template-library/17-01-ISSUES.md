# UAT Issues: Phase 17 Plan 01

**Tested:** 2026-01-11
**Source:** .planning/phases/17-template-library/17-01-SUMMARY.md
**Tester:** User via /gsd:verify-work

## Open Issues

[None - all issues resolved]

## Resolved Issues

### UAT-001: Several templates don't render correctly

**Discovered:** 2026-01-11
**Phase/Plan:** 17-01
**Severity:** Major
**Feature:** Template insertion and rendering
**Description:** Some templates don't render properly when inserted. Affected templates: Flowchart with Decision, User Journey, Gantt, Sankey Flow, Git Graph.
**Expected:** All 12 templates should render correctly
**Actual:** ~7 templates render fine, ~5 templates have rendering issues
**Resolved:** 2026-01-11 - Fixed in 17-01-FIX.md
**Fix:** Simplified Journey template syntax (removed quotes), updated Gantt template to use relative dates

### UAT-002: Template modal partially hidden by diagram panel

**Discovered:** 2026-01-11
**Phase/Plan:** 17-01
**Severity:** Major
**Feature:** TemplateLibrary modal visibility
**Description:** The template selection modal is partially hidden/cut off by the diagram panel
**Expected:** Modal should appear fully visible, overlaying other panels
**Actual:** Modal is partially obscured by the diagram panel
**Resolved:** 2026-01-11 - Fixed in 17-01-FIX.md
**Fix:** Changed modal from position:absolute to position:fixed, increased z-index to 1000

---

*Phase: 17-template-library*
*Plan: 01*
*Tested: 2026-01-11*
*Fixed: 2026-01-11*
