import type { DiagramTemplate } from '@/types'

export const diagramTemplates: DiagramTemplate[] = [
  // Basic templates
  {
    id: 'flowchart-basic',
    name: 'Flowchart with Decision',
    description: 'Process flow with conditional branching',
    category: 'basic',
    diagramType: 'flowchart',
    icon: '🔀',
    code: `flowchart LR
  A[Start] --> B{Auth?}
  B -->|Yes| C[Dashboard]
  B -->|No| D[Login]
  C --> E[Settings]`,
  },
  {
    id: 'sequence-basic',
    name: 'Sequence Diagram',
    description: 'Message flow between participants',
    category: 'basic',
    diagramType: 'sequence',
    icon: '🔄',
    code: `sequenceDiagram
  autonumber
  participant U as User
  participant W as WebApp
  participant API
  U->>W: Open
  W->>API: GET /status
  API-->>W: 200
  W-->>U: OK`,
  },
  {
    id: 'class-basic',
    name: 'Class Diagram',
    description: 'Classes with methods and relationships',
    category: 'basic',
    diagramType: 'class',
    icon: '📦',
    code: `classDiagram
  class User {
    +String id
    +String name
    +login(): bool
  }
  class Order {
    +String id
    +Decimal total
    +submit()
  }
  User "1" o-- "*" Order`,
  },
  {
    id: 'state-basic',
    name: 'State Diagram',
    description: 'State machine with nested states',
    category: 'basic',
    diagramType: 'state',
    icon: '🔲',
    code: `stateDiagram-v2
  [*] --> Idle
  Idle --> Loading : fetch
  Loading --> Ready : ok
  Loading --> Error : fail
  state Ready {
    [*] --> Viewing
    Viewing --> Editing : edit
    Editing --> Viewing : save
  }
  Error --> Idle : retry`,
  },
  {
    id: 'er-basic',
    name: 'ER Diagram',
    description: 'Entity relationships with attributes',
    category: 'basic',
    diagramType: 'er',
    icon: '🗄️',
    code: `erDiagram
  USER ||--o{ ORDER : places
  ORDER ||--|{ ORDER_LINE : contains
  PRODUCT ||--o{ ORDER_LINE : referenced
  USER {
    string id
    string email
  }
  PRODUCT {
    string id
    string name
    float price
  }`,
  },

  // Advanced templates
  {
    id: 'journey-advanced',
    name: 'User Journey',
    description: 'UX flow with satisfaction scores',
    category: 'advanced',
    diagramType: 'journey',
    icon: '🚶',
    code: `journey
  title Checkout UX
  section Browse
    See product: 5: User
    Add to cart: 4: User
  section Payment
    Enter card: 2: User
    Confirm payment: 2: User
  section Result
    Success page: 5: User`,
  },
  {
    id: 'gantt-advanced',
    name: 'Gantt Chart',
    description: 'Project schedule with milestones',
    category: 'advanced',
    diagramType: 'gantt',
    icon: '📅',
    code: `gantt
  title Release Plan
  dateFormat YYYY-MM-DD
  section Dev
    Spec :done, des1, 2025-10-01, 5d
    Impl :active, des2, after des1, 14d
    Tests :des3, after des2, 7d
  section Release
    Deploy :crit, des4, after des3, 1d`,
  },
  {
    id: 'pie-advanced',
    name: 'Pie Chart',
    description: 'Simple data distribution',
    category: 'advanced',
    diagramType: 'pie',
    icon: '🥧',
    code: `pie
  title Traffic by Source
  "Direct"  : 35
  "Organic" : 45
  "Ads"     : 20`,
  },

  // Fallback templates (for unsupported diagram types)
  {
    id: 'quadrant-fallback',
    name: 'Quadrant Chart',
    description: 'Impact/Effort prioritization matrix',
    category: 'fallback',
    diagramType: 'flowchart',
    icon: '📊',
    code: `flowchart TB
  Q1[Quick Wins - High Impact Low Effort]
  Q2[Major Projects - High Impact High Effort]
  Q3[Fill-ins - Low Impact Low Effort]
  Q4[Thankless - Low Impact High Effort]

  Q1 --> Q2
  Q1 --> Q3
  Q2 --> Q4
  Q3 --> Q4`,
  },
  {
    id: 'requirement-fallback',
    name: 'Requirement Traceability',
    description: 'Requirements, tests, and services',
    category: 'fallback',
    diagramType: 'flowchart',
    icon: '✅',
    code: `flowchart LR
  R1[Requirement: PCI-DSS compliant]
  T1[Test: PCI checklist]
  SVC[Service]

  SVC -- satisfies --> R1
  T1 -- verifies --> R1`,
  },
  {
    id: 'sankey-fallback',
    name: 'Sankey Flow',
    description: 'Flow volumes with weights',
    category: 'fallback',
    diagramType: 'flowchart',
    icon: '📈',
    code: `flowchart LR
  Checkout[Checkout] -->|100| PSP[PSP]
  PSP -->|60| Settled[Settled]
  PSP -->|40| Declined[Declined]`,
  },
  {
    id: 'gitgraph-fallback',
    name: 'Git Graph',
    description: 'Branch and merge DAG',
    category: 'fallback',
    diagramType: 'flowchart',
    icon: '🌳',
    code: `flowchart LR
  A[init] --> B[feat-A]
  A --> C[fix-1]
  B --> D[merge]
  C --> D`,
  },
]
