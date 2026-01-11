export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}

export interface TokenStats {
  totalTokens: number
  tokensPerSecond: number
  durationMs: number
}

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  suggestion?: DiagramSuggestion
  tokenStats?: TokenStats
}

export interface DiagramSuggestion {
  type: 'insert' | 'replace' | 'modify'
  content: string
  description: string
}

export interface ChatContext {
  currentDiagramType?: string
  currentContent?: string
  lastError?: string
}

export interface MockAIResponse {
  content: string
  suggestion?: DiagramSuggestion
}

export interface SidecarBlock {
  content: string // The ASCII diagram content
  name?: string // Extracted from "Diagram: <name>"
  type?: string // Extracted from "(<type>)"
}

export interface DiagramBlock {
  id: string // Unique ID for this block
  mermaidContent: string // The mermaid diagram code
  sidecar?: SidecarBlock // Optional ASCII sidecar
  startIndex: number // Position in original content (for replacement)
  endIndex: number // End position in original content
}
