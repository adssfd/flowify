# AGENTS.md

This document provides guidelines for agentic coding agents operating in the Flowify repository. Flowify is a UML diagram editor with AI-powered assistance built with Vue 3, Vite, and Mermaid.js.

## Build/Lint/Test Commands

### Development

```bash
npm run dev          # Start development server with HMR
```

### Production Build

```bash
npm run build       # Type-check and build for production
npm run build-only  # Build without type checking
npm run preview     # Preview production build locally
```

### Code Quality & Formatting

```bash
npm run format        # Format code with Prettier
npm run type-check  # Run TypeScript type checking
```

### Testing

No specific test commands found. The project uses Vue 3 with TypeScript and follows standard conventions for component testing.

## Code Style Guidelines

### Imports

- Use `@/` alias for imports from `src/`
- Follow Vue 3 Composition API with `<script setup>` syntax
- Import types using `import type { ... } from '@/types'`

### Formatting

- Prettier with single quotes, no semicolons, print width 100
- Use consistent spacing and indentation (2 spaces)
- Prefer arrow functions for short functions

### Types

- Use TypeScript interfaces and types for all components and stores
- Define interfaces in `src/types/`
- Use Composition API style Pinia stores
- All Vue components must use `<script setup>` syntax

### Naming Conventions

- Component names: PascalCase (e.g., `MyComponent.vue`)
- File names: kebab-case (e.g., `my-component.vue`)
- Variables and functions: camelCase
- Constants: UPPER_CASE
- Component props: camelCase with `prop:` prefix in types

### Error Handling

- Use try/catch blocks for asynchronous operations
- Handle errors gracefully with user-friendly messages
- Implement custom error classes when needed

### Vue 3 Composition API

- Always use `<script setup>` syntax with Composition API
- Pinia stores should be used for state management
- Follow Vue 3 component structure:

  ```vue
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useMyStore } from '@/stores/myStore'

  const store = useMyStore()
  const count = ref(0)
  const doubled = computed(() => count.value * 2)

  function increment() {
    count.value++
  }
  </script>

  <template>
    <div>{{ count }} × 2 = {{ doubled }}</div>
  </template>
  ```

### Component Structure

- All components should be in `src/components/`
- Use single file components with `.vue` extension
- Follow Vue 3 Composition API patterns
- Components should be self-contained and reusable

### State Management (Pinia)

- Pinia stores should be used for state management
- Stores should follow Composition API style:

  ```ts
  import { defineStore } from 'pinia'
  import { ref, computed } from 'vue'

  export const useMyStore = defineStore('myStore', () => {
    const count = ref(0)
    const doubled = computed(() => count.value * 2)

    function increment() {
      count.value++
    }

    return { count, doubled, increment }
  })
  ```

### Component Communication

- Parent-child communication via props and emits
- Use provide/inject for deeply nested components
- Pinia stores for global state sharing

### Vue SFC Structure

- `<script setup>` with Composition API
- `<style>` with scoped or module styles
- Follow the pattern of template -> script -> style

### TypeScript Usage

- Use strict typing throughout
- Define interfaces in `src/types/`
- Use type inference where appropriate
- Avoid any types unless necessary

### Code Organization

- Components: `src/components/`
- Stores: `src/stores/`
- Types: `src/types/`
- Composables: `src/composables/`
- Services: `src/services/`
- Utilities: `src/utils/`

### AI Integration

- Follow the existing pattern for AI service classes
- All AI services extend AIServiceBase
- Implement both streaming and non-streaming response methods
- Handle rate limiting and network errors gracefully

### Code Patterns

- Use Vue 3 Composition API with `<script setup>`
- Pinia for state management
- TypeScript for type safety
- Mermaid.js for diagram rendering
- CodeMirror 6 for code editing
- Splitpanes for resizable panels
- Vite for build tooling

## Cursor/Copilot Rules

No specific Cursor or Copilot rules found in this repository.
