# Flowify

## What This Is

Flowify is a UML diagram editor with AI-powered diagram generation. Users can create and edit Mermaid diagrams with an AI assistant that understands code context (via drag & drop or GitHub URLs) and generates accurate, renderer-compatible diagrams with in-chat rendering and ASCII fallbacks.

## Core Value

AI generates accurate, relevant diagrams by understanding the actual code structure - not just from text descriptions.

## Requirements

### Validated

<!-- Shipped and confirmed valuable -->

- ✓ Mermaid diagram editor with 10 diagram types — existing
- ✓ AI chat with OpenAI, Anthropic, LM Studio support — existing
- ✓ Real-time streaming AI responses — existing
- ✓ Multi-tab document editing with undo/redo — existing
- ✓ Diagram export as PNG with zoom/pan — existing
- ✓ Auto-save to localStorage — existing
- ✓ Light/dark theme support — existing
- ✓ Import/export .mmd and .json files — existing
- ✓ Drag & drop files into chat panel as context — v1.0
- ✓ Drag & drop folders to include multiple files — v1.0
- ✓ Paste GitHub repo URL to fetch and analyze public repos — v1.0
- ✓ AI auto-suggests appropriate diagram type based on code analysis — v1.0
- ✓ AI responds to follow-up questions about the code context — v1.0
- ✓ Display file context indicator in chat (what files are loaded) — v1.0
- ✓ AI follows Mermaid compatibility rules (prefer `graph` over `flowchart`, proper quoting) — v1.1
- ✓ AI generates ASCII sidecar alongside Mermaid blocks for human readability — v1.1
- ✓ Markdown properly rendered in AI chat responses (headers, lists, code blocks) — v1.1
- ✓ ASCII sidecar displayed alongside Mermaid diagrams with view toggle — v1.1
- ✓ Template library with 12 renderer-compatible diagram templates — v1.1
- ✓ Auto-detection and visual feedback for diagram type changes — v1.1
- ✓ Render fallback shows ASCII sidecar when Mermaid fails — v1.1
- ✓ UX polish: connecting state, tooltips, smooth streaming scroll — v1.1

### Active

<!-- Current scope - TBD for next milestone -->

(None - milestone complete, next version planning needed)

### Out of Scope

- Private GitHub repo authentication — complexity, security concerns
- Persistent context storage between sessions — keep it simple, context is per-conversation
- Binary file handling — focus on source code files only
- Real-time file watching — static snapshot, not live updates
- Full Mermaid syntax validation — rely on render errors and fallbacks

## Context

**Current State (v1.1):**
- 11,364 lines of Vue 3 + TypeScript
- 27 files modified in v1.1 milestone
- Complete AI diagram generation with in-chat rendering
- Template library with 12 compatible templates

**Existing Architecture:**
- Vue 3 SPA with Pinia state management
- AI services in `src/services/ai/` with streaming support
- Chat panel in `src/components/chat/ChatPanel.vue`
- Markdown rendering via `marked` and `highlight.js`
- Diagram rendering via `DiagramBlockRenderer.vue` with useMermaid composable
- Context store: `src/stores/context.ts`

**Codebase Map:** `.planning/codebase/` contains 7 analysis documents

**Mermaid Skill:** Injected into AI system prompt with:
- Compatibility rules (prefer `graph LR/TB`, quote labels, use `<br/>` not `\n`)
- ASCII/Unicode sidecar requirement for human-readable fallbacks
- Working templates for all diagram types
- Guidance on when to use which diagram type
- Fallback patterns for unsupported diagram types

**Browser APIs Available:**
- File API for drag & drop
- Fetch API for GitHub raw content

## Constraints

- **Offline-first**: Local file drag & drop must work without network
- **Client-side only**: No backend - all processing in browser
- **AI token limits**: Large codebases need smart file selection/truncation
- **Renderer compatibility**: Diagrams must work on VS Code, Git platforms, not just mermaid.live

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Drag & drop as primary interaction | Matches user expectation, familiar pattern | ✓ Good |
| GitHub public repos only | Avoids auth complexity for v1 | ✓ Good |
| AI picks diagram type | Reduces friction, leverages AI intelligence | ✓ Good |
| Mermaid skill in system prompt | AI learns rules without code changes | ✓ Good |
| ASCII sidecar for every diagram | Human readability + render fallback | ✓ Good |
| Three-view toggle (Diagram/ASCII/Code) | Flexible display options per user preference | ✓ Good |
| Auto-fallback to ASCII on render failure | Graceful degradation, no lost diagrams | ✓ Good |
| 100ms debounced scroll during streaming | Balance smoothness with responsiveness | ✓ Good |

---
*Last updated: 2026-01-11 after v1.1 milestone complete*
