import type { DiagramBlock, SidecarBlock } from '@/types'

/**
 * Parse markdown content to extract mermaid blocks with their sidecars.
 *
 * Pattern: ```mermaid ... ``` immediately followed by ```text ... ```
 * The text block should start with "Diagram: <name> (<type>)"
 */
export function parseDiagramBlocks(content: string): DiagramBlock[] {
  const blocks: DiagramBlock[] = []

  // Regex to match mermaid block followed optionally by text sidecar
  // Group 1: mermaid content
  // Group 2: optional sidecar content (text block immediately after)
  const mermaidRegex = /```mermaid\n([\s\S]*?)\n```(?:\s*```text\n([\s\S]*?)\n```)?/g

  let match: RegExpExecArray | null
  let id = 0

  while ((match = mermaidRegex.exec(content)) !== null) {
    const mermaidContent = match[1]?.trim() ?? ''
    const sidecarContent = match[2]?.trim()

    const block: DiagramBlock = {
      id: `diagram-${id++}`,
      mermaidContent,
      startIndex: match.index,
      endIndex: match.index + match[0].length,
    }

    if (sidecarContent) {
      block.sidecar = parseSidecar(sidecarContent)
    }

    blocks.push(block)
  }

  return blocks
}

/**
 * Parse sidecar content to extract name and type.
 * Format: "Diagram: <name> (<type>)\n<content>"
 */
function parseSidecar(content: string): SidecarBlock {
  const sidecar: SidecarBlock = { content }

  // Try to extract "Diagram: <name> (<type>)" from first line
  const headerMatch = content.match(/^Diagram:\s*([^(]+?)(?:\s*\(([^)]+)\))?\s*$/m)

  if (headerMatch) {
    sidecar.name = headerMatch[1]?.trim()
    sidecar.type = headerMatch[2]?.trim()
  }

  return sidecar
}

/**
 * Check if content contains any mermaid blocks with sidecars.
 */
export function hasDiagramBlocks(content: string): boolean {
  return /```mermaid\n[\s\S]*?\n```/.test(content)
}
