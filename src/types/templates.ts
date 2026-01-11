export interface DiagramTemplate {
  id: string
  name: string
  description: string
  category: 'basic' | 'advanced' | 'fallback'
  diagramType: string
  code: string
  icon?: string
}
