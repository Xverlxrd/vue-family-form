<template>
  <button
      :class="[buttonClass, { 'full-width': fullWidth }]"
      :disabled="disabled"
      @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  theme?: 'primary' | 'secondary';
  disabled?: boolean;
  fullWidth?: boolean;
}>(), {
  theme: 'primary',
  disabled: false,
  fullWidth: false
});

const buttonClass = computed(() => {
  return {
    primary: 'button-primary',
    secondary: 'button-secondary'
  }[props.theme];
});
</script>

<style scoped>
button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 5px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
  border-radius: 100px;
  padding: 10px 20px;
  width: fit-content;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button.full-width {
  width: 100%;
}

.button-primary {
  background: #01A7FD;
  color: white;
}

.button-primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.button-secondary {
  background-color: white;
  color: #01A7FD;
  border: 1px solid #01A7FD;
}

.button-secondary:hover:not(:disabled) {
  background-color: #f0f7ff;
}
</style>