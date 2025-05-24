<template>
  <div class="input-wrapper">
    <span class="label">{{ label }}</span>
    <input
        :placeholder="placeholder"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @change="$emit('change', $event)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @keydown="$emit('keydown', $event)"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
}>(), {
  label: '',
  placeholder: '',
  modelValue: ''
});

defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', event: Event): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'keydown', event: KeyboardEvent): void;
}>();
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  padding: 8px 16px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #F1F1F1;
}

.label {
  font-size: 13px;
  color: #1111117A;
}

input {
  border: none;
  padding: 5px 0;
  font-size: 14px;
  line-height: 24px;
}

input:focus {
  outline: none;
}
</style>