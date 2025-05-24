<template>
  <div class="parent-form">
    <h2 class="title">Персональные данные</h2>
    <div class="input-group">
      <Input
          v-model="parent.name"
          label="Имя"
          placeholder="Введите имя"
          @input="validateName"
      />
      <Input
          v-model="parent.age"
          label="Возраст"
          type="text"
          placeholder="Введите возраст"
          @input="validateAge"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import Input from "@/components/Input/Input.vue";

const parent = defineModel('parent', {
  type: Object,
  required: true,
  default: () => ({ name: '', age: null })
});

const validateName = (event: Event) => {
  const target = event.target as HTMLInputElement;
  parent.value.name = target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
};

const validateAge = (event) => {
  let age = event.target.value.replace(/\D/g, '');
  age = age === '' ? null : Math.min(99, parseInt(age, 10));
  parent.value.age = age;
};

watch(() => parent.value, (newVal) => {
  if (!newVal.name) newVal.name = '';
  if (!newVal.age) newVal.age = null;
}, { immediate: true });
</script>

<style scoped>
.parent-form {
  width: 100%;
}

.title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 16px;
}
</style>