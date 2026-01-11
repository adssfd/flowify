<script setup lang="ts">
import { computed } from 'vue'
import type { DiagramBlock } from '@/types'
import { parseDiagramBlocks } from '@/utils/diagramParser'
import MarkdownRenderer from './MarkdownRenderer.vue'
import DiagramBlockRenderer from './DiagramBlockRenderer.vue'

const props = defineProps<{
  content: string
}>()

interface ContentSegment {
  type: 'text' | 'diagram'
  content?: string
  block?: DiagramBlock
}

const segments = computed<ContentSegment[]>(() => {
  const blocks = parseDiagramBlocks(props.content)

  if (blocks.length === 0) {
    return [{ type: 'text', content: props.content }]
  }

  const result: ContentSegment[] = []
  let lastIndex = 0

  for (const block of blocks) {
    // Text before this diagram block
    if (block.startIndex > lastIndex) {
      const textContent = props.content.slice(lastIndex, block.startIndex).trim()
      if (textContent) {
        result.push({ type: 'text', content: textContent })
      }
    }

    // The diagram block itself
    result.push({ type: 'diagram', block })
    lastIndex = block.endIndex
  }

  // Text after last diagram block
  if (lastIndex < props.content.length) {
    const textContent = props.content.slice(lastIndex).trim()
    if (textContent) {
      result.push({ type: 'text', content: textContent })
    }
  }

  return result
})
</script>

<template>
  <div class="message-content-parsed">
    <template v-for="(segment, index) in segments" :key="index">
      <MarkdownRenderer
        v-if="segment.type === 'text'"
        :content="segment.content!"
      />
      <DiagramBlockRenderer
        v-else-if="segment.type === 'diagram'"
        :block="segment.block!"
      />
    </template>
  </div>
</template>

<style scoped>
.message-content-parsed {
  line-height: 1.6;
}
</style>
