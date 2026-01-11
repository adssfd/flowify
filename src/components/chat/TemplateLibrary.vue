<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DiagramTemplate } from '@/types'
import { diagramTemplates } from '@/data/diagramTemplates'

const emit = defineEmits<{
  select: [template: DiagramTemplate]
  close: []
}>()

const selectedCategory = ref<'all' | 'basic' | 'advanced' | 'fallback'>('all')

const categories = [
  { id: 'all', label: 'All' },
  { id: 'basic', label: 'Basic' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'fallback', label: 'Fallbacks' },
] as const

const filteredTemplates = computed(() => {
  if (selectedCategory.value === 'all') return diagramTemplates
  return diagramTemplates.filter((t) => t.category === selectedCategory.value)
})

function selectTemplate(template: DiagramTemplate) {
  emit('select', template)
  emit('close')
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <div class="template-library-backdrop" @click="handleBackdropClick">
    <div class="template-library">
      <div class="template-header">
        <h3 class="template-title">Diagram Templates</h3>
        <button class="close-button" title="Close" @click="emit('close')">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </div>

      <div class="category-tabs">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="category-tab"
          :class="{ 'category-tab--active': selectedCategory === cat.id }"
          @click="selectedCategory = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>

      <div class="template-grid">
        <button
          v-for="template in filteredTemplates"
          :key="template.id"
          class="template-card"
          @click="selectTemplate(template)"
        >
          <span class="template-icon">{{ template.icon }}</span>
          <div class="template-info">
            <span class="template-name">{{ template.name }}</span>
            <span class="template-description">{{ template.description }}</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.template-library-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-md);
}

.template-library {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 500px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.template-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.template-title {
  margin: 0;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.close-button {
  background: none;
  border: none;
  padding: var(--spacing-xs);
  cursor: pointer;
  color: var(--color-text-secondary);
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.close-button:hover {
  background-color: var(--color-surface-elevated);
  color: var(--color-text-primary);
}

.category-tabs {
  display: flex;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.category-tab {
  padding: 4px var(--spacing-sm);
  background-color: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  font-size: var(--font-size-xs);
  transition: all var(--transition-fast);
}

.category-tab:hover {
  background-color: var(--color-surface-elevated);
  color: var(--color-text-primary);
}

.category-tab--active {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.template-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  overflow-y: auto;
}

.template-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);
}

.template-card:hover {
  border-color: var(--color-primary);
  background-color: color-mix(in srgb, var(--color-primary) 10%, var(--color-surface-elevated));
}

.template-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  width: 2rem;
  text-align: center;
}

.template-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.template-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.template-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
