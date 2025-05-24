<template>
  <div class="child-form">
    <Input
        v-model="form.name"
        label="Имя"
        placeholder="Введите имя ребенка"
        @input="validateName"
    />
    <Input
        v-model.number="form.age"
        label="Возраст"
        type="number"
        placeholder="Введите возраст"
        @input="validateAge"
    />
    <span class="child-delete" @click="$emit('remove')">
      Удалить
    </span>
  </div>
</template>

<script setup>
import { watch, reactive } from 'vue';
import Input from "@/components/Input/Input.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    validator: (value) => {
      return 'name' in value && 'age' in value;
    }
  }
});

const emit = defineEmits(['update:modelValue', 'remove']);

const form = reactive({ ...props.modelValue });

const validateName = (event) => {
  form.name = event.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
};

const validateAge = (event) => {
  let age = event.target.value.replace(/\D/g, '');
  age = age === '' ? null : Math.min(99, parseInt(age, 10));
  form.age = age;
};

watch(form, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });
</script>

<style scoped>
.child-form {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.child-delete {
  color: #01A7FD;
  cursor: pointer;
  white-space: nowrap;
}
</style>