<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { DiagramBlock } from '@/types'
import { useMermaid } from '@/composables/useMermaid'

const props = defineProps<{
  block: DiagramBlock
}>()

type ViewMode = 'diagram' | 'ascii' | 'code'

const viewMode = ref<ViewMode>('diagram')
const diagramId = ref(`diagram-${props.block.id}-${Date.now()}`)
const { render, error, isRendering } = useMermaid()

// Track if we're showing ASCII due to render failure (not user choice)
const isFallbackMode = ref(false)

async function renderDiagram() {
  if (viewMode.value === 'diagram') {
    const success = await render(diagramId.value, props.block.mermaidContent)
    // Auto-switch to ASCII if render fails and sidecar exists
    if (!success && props.block.sidecar) {
      isFallbackMode.value = true
      viewMode.value = 'ascii'
    }
  }
}

// Reset fallback mode when user manually switches views
function setViewMode(mode: ViewMode) {
  isFallbackMode.value = false
  viewMode.value = mode
}

onMounted(renderDiagram)
watch(viewMode, renderDiagram)
</script>

<template>
  <div class="diagram-block">
    <div class="diagram-tabs">
      <button
        class="tab-btn"
        :class="{ active: viewMode === 'diagram' }"
        @click="setViewMode('diagram')"
      >
        Diagram
      </button>
      <button
        v-if="block.sidecar"
        class="tab-btn"
        :class="{ active: viewMode === 'ascii' }"
        @click="setViewMode('ascii')"
      >
        ASCII
      </button>
      <button
        class="tab-btn"
        :class="{ active: viewMode === 'code' }"
        @click="setViewMode('code')"
      >
        Code
      </button>
    </div>

    <div class="diagram-content">
      <!-- Rendered diagram -->
      <div
        v-show="viewMode === 'diagram'"
        :id="diagramId"
        class="mermaid-container"
      ></div>

      <!-- Loading state -->
      <div v-if="viewMode === 'diagram' && isRendering" class="diagram-loading">
        Rendering...
      </div>

      <!-- Error state (only shown when no sidecar to fall back to) -->
      <div v-if="viewMode === 'diagram' && error && !block.sidecar" class="diagram-error">
        <div class="error-header">
          <span class="error-icon">⚠</span>
          <span class="error-title">Diagram rendering failed</span>
        </div>
        <div class="error-message">{{ error.message }}</div>
        <div class="error-action">
          View the <button class="link-btn" @click="setViewMode('code')">Code</button> tab to see the raw Mermaid syntax
        </div>
      </div>

      <!-- ASCII sidecar -->
      <div v-show="viewMode === 'ascii'" class="ascii-view">
        <div v-if="isFallbackMode" class="fallback-notice">
          Showing ASCII fallback (diagram rendering failed)
        </div>
        <pre class="ascii-content">{{ block.sidecar?.content }}</pre>
      </div>

      <!-- Raw mermaid code -->
      <pre v-show="viewMode === 'code'" class="code-content">{{ block.mermaidContent }}</pre>
    </div>
  </div>
</template>

<style scoped>
.diagram-block {
  margin: var(--spacing-sm) 0;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

.diagram-tabs {
  display: flex;
  gap: 1px;
  background: var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.tab-btn {
  flex: 1;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-surface);
  border: none;
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tab-btn:hover {
  background: var(--color-surface-elevated);
  color: var(--color-text-primary);
}

.tab-btn.active {
  background: var(--color-surface-elevated);
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.diagram-content {
  padding: var(--spacing-sm);
  background: var(--color-surface-elevated);
  min-height: 60px;
}

.mermaid-container {
  display: flex;
  justify-content: center;
  overflow-x: auto;
}

.mermaid-container :deep(svg) {
  max-width: 100%;
  height: auto;
}

.diagram-loading {
  text-align: center;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  padding: var(--spacing-md);
}

.diagram-error {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: color-mix(in srgb, var(--color-error) 8%, var(--color-surface-elevated));
  border-radius: var(--border-radius-sm);
  border: 1px solid color-mix(in srgb, var(--color-error) 30%, transparent);
}

.error-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.error-icon {
  font-size: var(--font-size-md);
}

.error-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-error);
}

.error-message {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  font-family: var(--font-mono, 'Fira Code', 'Consolas', monospace);
  background: var(--color-surface);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  overflow-x: auto;
}

.error-action {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.link-btn {
  background: none;
  border: none;
  color: var(--color-primary);
  text-decoration: underline;
  cursor: pointer;
  font-size: inherit;
  padding: 0;
}

.link-btn:hover {
  color: var(--color-primary-hover, var(--color-primary));
}

.ascii-fallback,
.ascii-content,
.code-content {
  margin: 0;
  font-family: var(--font-mono, 'Fira Code', 'Consolas', monospace);
  font-size: 0.8em;
  line-height: 1.4;
  white-space: pre;
  overflow-x: auto;
  color: var(--color-text-primary);
}

.ascii-view {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.fallback-notice {
  font-size: var(--font-size-xs);
  color: var(--color-warning);
  background: color-mix(in srgb, var(--color-warning) 10%, transparent);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  border-left: 2px solid var(--color-warning);
}
</style>
