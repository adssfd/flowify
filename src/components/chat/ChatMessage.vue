<script setup lang="ts">
import type { ChatMessage as ChatMessageType } from '@/types'
import MessageContent from './MessageContent.vue'

interface Props {
  message: ChatMessageType
}

interface Emits {
  (e: 'apply-suggestion', content: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function applySuggestion() {
  if (props.message.suggestion) {
    emit('apply-suggestion', props.message.suggestion.content)
  }
}
</script>

<template>
  <div class="chat-message" :class="`message-${message.role}`">
    <div class="message-header">
      <span class="message-role">{{ message.role === 'user' ? 'You' : 'AI Assistant' }}</span>
      <span class="message-time">{{ message.timestamp.toLocaleTimeString() }}</span>
    </div>

    <div class="message-content">
      <MessageContent v-if="message.role === 'assistant'" :content="message.content" />
      <template v-else>{{ message.content }}</template>
    </div>

    <div v-if="message.tokenStats" class="token-stats">
      <span class="stat-item" title="Tokens per second - measures AI response speed">
        ⚡ {{ message.tokenStats.tokensPerSecond }} tok/s
      </span>
      <span class="stat-item" title="Estimated token count (actual may vary by model)">
        📊 {{ message.tokenStats.totalTokens }} tokens
      </span>
      <span class="stat-item" title="Total time to generate response">
        ⏱️ {{ (message.tokenStats.durationMs / 1000).toFixed(1) }}s
      </span>
    </div>

    <div v-if="message.suggestion" class="message-suggestion">
      <div class="suggestion-description">{{ message.suggestion.description }}</div>
      <button class="suggestion-button" @click="applySuggestion">
        Apply Suggestion
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-message {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  max-width: 85%;
}

.message-user {
  align-self: flex-end;
  background-color: var(--color-primary);
  color: white;
}

.message-assistant {
  align-self: flex-start;
  background-color: var(--color-surface);
  color: var(--color-text-primary);
}

.message-system {
  align-self: center;
  background-color: var(--color-surface-elevated);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-style: italic;
  max-width: 90%;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
  gap: var(--spacing-sm);
}

.message-role {
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-xs);
  opacity: 0.9;
}

.message-time {
  font-size: var(--font-size-xs);
  opacity: 0.7;
}

.message-content {
  line-height: 1.5;
  font-size: var(--font-size-sm);
}

/* User messages need pre-wrap for whitespace preservation */
.message-user .message-content {
  white-space: pre-wrap;
}

.token-stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-xs);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item {
  font-size: var(--font-size-xs);
  opacity: 0.7;
  display: flex;
  align-items: center;
  gap: 2px;
}

.message-assistant .token-stats {
  border-top-color: var(--color-border);
}

.message-suggestion {
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.suggestion-description {
  font-size: var(--font-size-xs);
  opacity: 0.8;
  margin-bottom: var(--spacing-xs);
}

.suggestion-button {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(255, 255, 255, 0.2);
  color: inherit;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: var(--font-size-xs);
  transition: all var(--transition-fast);
}

.suggestion-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
