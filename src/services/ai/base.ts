import type { AIRequest, AIResponse, StreamChunk, DiagramSuggestion, DiagramContext } from '@/types'

export abstract class AIServiceBase {
  // Abstract methods that each provider must implement
  abstract generateResponse(request: AIRequest, signal?: AbortSignal): Promise<AIResponse>
  abstract streamResponse(
    request: AIRequest,
    onChunk: (chunk: StreamChunk) => void,
    signal?: AbortSignal
  ): Promise<AIResponse>

  // Helper to extract diagram suggestions from AI response
  protected extractSuggestion(content: string): DiagramSuggestion | undefined {
    // Look for mermaid code blocks
    const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/
    const match = content.match(mermaidRegex)

    if (match && match[1]) {
      return {
        type: 'replace',
        content: match[1].trim(),
        description: 'AI-generated diagram suggestion',
      }
    }

    return undefined
  }

  // Build system prompt with diagram context and Mermaid skill rules
  protected buildSystemPrompt(context?: DiagramContext): string {
    let prompt = `You are a Mermaid diagram assistant. You create diagrams that render correctly across all platforms (VS Code, GitHub, GitLab, markdown previewers).

## Compatibility Rules (MUST FOLLOW)

1. **Use graph, not flowchart**: Prefer \`graph LR\` or \`graph TB\` over \`flowchart\` keyword - some renderers fail on flowchart.
2. **Quote labels**: Labels with spaces or special characters MUST be quoted: \`A["My Label"]\`, \`B["Text (x|y)"]\`
3. **Line breaks**: Use \`<br/>\` for line breaks in labels, NEVER literal \\n
4. **Fallbacks**: Advanced types like quadrantChart, sankey-beta, requirementDiagram, gitGraph may not render. Use graph-based fallbacks when compatibility matters.

## ASCII Sidecar Requirement

ALWAYS include a text-only ASCII diagram immediately after each Mermaid block. This provides human-readable fallback and raw markdown scanning.

Format:
- Use fenced code with language \`text\`
- Keep width under 80 columns
- Use ASCII primitives: \`[Box]\`, \`-->\`, \`{Decision?}\`

**Example:**
\`\`\`mermaid
graph LR
  A["Start"] --> B{Auth?}
  B -->|Yes| C["Dashboard"]
  B -->|No|  D["Login"]
\`\`\`
\`\`\`text
Diagram: Auth flow (flowchart)
  [Start] --> {Auth?}
      {Auth?} -- Yes --> [Dashboard]
      {Auth?} -- No  --> [Login]
\`\`\`

## Diagram Type Selection

- **Flowchart (graph)**: General flows, decisions, data movement
- **Sequence (sequenceDiagram)**: Actor/service interactions over time, API calls
- **Class (classDiagram)**: Domain models, OOP structures, entity attributes
- **State (stateDiagram-v2)**: Lifecycle, state machines, nested states
- **ER (erDiagram)**: Database models with cardinalities
- **Journey (journey)**: User experience across steps/sections
- **Gantt (gantt)**: Scheduling, timelines, project plans
- **Pie (pie)**: Simple ratios and composition (prefer tables for precision)
- **Mind Map (mindmap)**: Hierarchical idea organization
- **Timeline (timeline)**: Chronological events

## Response Format

When suggesting diagrams:
1. Wrap Mermaid code in \`\`\`mermaid code blocks
2. Immediately follow with ASCII sidecar in \`\`\`text block
3. Keep diagrams focused and readable
4. Preserve existing structure when modifying unless asked to change

Be concise and helpful. Focus on creating valid, renderer-compatible Mermaid syntax.`

    if (context?.codebaseContext) {
      prompt += `

---

## Codebase Context

The user has provided code files. Analyze them to generate appropriate diagrams.

When analyzing code:
1. Identify structure (classes, functions, data flow, state machines)
2. Recommend the most appropriate diagram type
3. Generate a complete Mermaid diagram with ASCII sidecar

${context.codebaseContext}`
    }

    if (context?.content) {
      prompt += `

---

## Current Diagram (${context.type})

\`\`\`mermaid
${context.content}
\`\`\``
    }

    if (context?.lastError) {
      prompt += `

---

## Validation Error

${context.lastError}

Please help fix this error. Check for:
- Unquoted labels with special characters
- Using flowchart instead of graph
- Literal \\n in labels (use <br/> instead)`
    }

    return prompt
  }
}
