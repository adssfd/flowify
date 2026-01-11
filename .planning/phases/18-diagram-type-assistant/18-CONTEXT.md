# Phase 18: Diagram Type Assistant - Context

**Gathered:** 2026-01-11
**Status:** Ready for planning

<vision>
## How This Should Work

When a user describes what they want to diagram in the chat, the AI automatically detects the most appropriate diagram type and switches to it. No prompts, no confirmations — just seamless detection and action.

User says "I need to show how my API endpoints handle authentication" → AI recognizes this is a Sequence Diagram → Tab automatically switches to sequenceDiagram type → AI generates the diagram.

The experience should feel like the AI truly understands what you're trying to visualize and takes care of the setup for you.

</vision>

<essential>
## What Must Be Nailed

- **Accurate detection** - AI correctly identifies the right diagram type from natural language descriptions
- **Seamless experience** - The type switch happens naturally without disrupting the user's flow or requiring confirmation

Both are equally essential. Wrong detection frustrates users; clunky switching breaks the magic.

</essential>

<boundaries>
## What's Out of Scope

- Manual type selection UI - don't add new UI for picking types, just enhance AI detection
- User preferences/history - don't learn from past choices, fresh detection each time
- Multiple suggestions ("you could use A or B") - just pick the best one

</boundaries>

<specifics>
## Specific Ideas

- Auto-switch should update the diagram type selector in the toolbar
- Detection happens when AI generates a diagram block, not before
- Should work with all 11 supported diagram types

</specifics>

<notes>
## Additional Context

This builds on Phase 17's template library — now the AI doesn't just know the templates, it picks the right one automatically.

The key is making detection feel invisible. Users shouldn't notice the "assistant" — they should just get the right diagram type every time.

</notes>

---

*Phase: 18-diagram-type-assistant*
*Context gathered: 2026-01-11*
