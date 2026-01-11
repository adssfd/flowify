<script setup lang="ts">
import { computed } from 'vue'
import { marked, Renderer } from 'marked'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import plaintext from 'highlight.js/lib/languages/plaintext'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import python from 'highlight.js/lib/languages/python'

// Register languages for syntax highlighting
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('plaintext', plaintext)
hljs.registerLanguage('text', plaintext)
hljs.registerLanguage('mermaid', plaintext) // Mermaid as plaintext
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('json', json)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('shell', bash)
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('python', python)
hljs.registerLanguage('py', python)

const props = defineProps<{
  content: string
}>()

// Create custom renderer with syntax highlighting
const renderer = new Renderer()

renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
  const highlighted = hljs.highlight(text, { language }).value
  const langClass = lang ? ` language-${lang}` : ''
  return `<pre><code class="hljs${langClass}">${highlighted}</code></pre>`
}

// Configure marked instance
marked.use({
  gfm: true,
  breaks: true,
  renderer,
})

const renderedHtml = computed(() => {
  try {
    const result = marked.parse(props.content)
    // marked.parse can return string | Promise<string>, but with our config it's synchronous
    return typeof result === 'string' ? result : ''
  } catch {
    return props.content
  }
})
</script>

<template>
  <div class="markdown-content" v-html="renderedHtml"></div>
</template>

<style scoped>
.markdown-content {
  line-height: 1.6;
  word-wrap: break-word;
}

/* Headers */
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  margin-top: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
  font-weight: var(--font-weight-semibold);
  line-height: 1.3;
}

.markdown-content :deep(h1) {
  font-size: 1.5em;
}

.markdown-content :deep(h2) {
  font-size: 1.3em;
}

.markdown-content :deep(h3) {
  font-size: 1.1em;
}

/* Paragraphs */
.markdown-content :deep(p) {
  margin-bottom: var(--spacing-sm);
}

.markdown-content :deep(p:last-child) {
  margin-bottom: 0;
}

/* Lists */
.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: var(--spacing-sm);
  padding-left: var(--spacing-lg);
}

.markdown-content :deep(li) {
  margin-bottom: var(--spacing-xs);
}

.markdown-content :deep(li:last-child) {
  margin-bottom: 0;
}

/* Code blocks */
.markdown-content :deep(pre) {
  background: var(--color-surface-elevated);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  overflow-x: auto;
  margin-bottom: var(--spacing-sm);
}

.markdown-content :deep(pre code) {
  font-family: var(--font-mono, 'Fira Code', 'Consolas', monospace);
  font-size: 0.85em;
  line-height: 1.5;
  background: transparent;
  padding: 0;
}

/* Inline code */
.markdown-content :deep(:not(pre) > code) {
  background: var(--color-surface-elevated);
  padding: 0.15em 0.4em;
  border-radius: var(--border-radius-xs);
  font-family: var(--font-mono, 'Fira Code', 'Consolas', monospace);
  font-size: 0.85em;
}

/* Blockquotes */
.markdown-content :deep(blockquote) {
  border-left: 3px solid var(--color-primary);
  margin: var(--spacing-sm) 0;
  padding-left: var(--spacing-md);
  color: var(--color-text-secondary);
  font-style: italic;
}

/* Links */
.markdown-content :deep(a) {
  color: var(--color-primary);
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

/* Tables */
.markdown-content :deep(table) {
  border-collapse: collapse;
  margin-bottom: var(--spacing-sm);
  width: 100%;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  border: 1px solid var(--color-border);
  padding: var(--spacing-xs) var(--spacing-sm);
  text-align: left;
}

.markdown-content :deep(th) {
  background: var(--color-surface-elevated);
  font-weight: var(--font-weight-medium);
}

/* Horizontal rule */
.markdown-content :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: var(--spacing-md) 0;
}

/* Strong and emphasis */
.markdown-content :deep(strong) {
  font-weight: var(--font-weight-semibold);
}

.markdown-content :deep(em) {
  font-style: italic;
}

/* Highlight.js theme - works with both light and dark themes */
.markdown-content :deep(.hljs) {
  color: var(--color-text-primary);
}

.markdown-content :deep(.hljs-keyword),
.markdown-content :deep(.hljs-selector-tag),
.markdown-content :deep(.hljs-built_in) {
  color: var(--color-primary);
}

.markdown-content :deep(.hljs-string),
.markdown-content :deep(.hljs-attribute) {
  color: var(--color-success);
}

.markdown-content :deep(.hljs-comment),
.markdown-content :deep(.hljs-quote) {
  color: var(--color-text-secondary);
  font-style: italic;
}

.markdown-content :deep(.hljs-number),
.markdown-content :deep(.hljs-literal) {
  color: var(--color-warning);
}

.markdown-content :deep(.hljs-title),
.markdown-content :deep(.hljs-section) {
  color: var(--color-info);
}

.markdown-content :deep(.hljs-type),
.markdown-content :deep(.hljs-class) {
  color: var(--color-primary);
}

.markdown-content :deep(.hljs-variable),
.markdown-content :deep(.hljs-template-variable) {
  color: var(--color-text-primary);
}

.markdown-content :deep(.hljs-name),
.markdown-content :deep(.hljs-tag) {
  color: var(--color-error);
}
</style>
