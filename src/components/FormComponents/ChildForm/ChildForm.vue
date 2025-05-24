<template>
  <div class="child-form">
    <Input
        v-model="child.name"
        label="Имя"
        placeholder="Введите имя ребенка"
        @input="validateName"
    />
    <Input
        v-model.number="child.age"
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

<script setup lang="ts">
import Input from "@/components/Input/Input.vue";
import {ChildData} from '@/types/form.ts'

const child = defineModel<ChildData>({required: true});

const validateName = (event: Event) => {
  const input = event.target as HTMLInputElement;
  child.value.name = input.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
};

const validateAge = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const digitsOnly = input.value.replace(/\D/g, '');
  child.value.age = digitsOnly === '' ? null : Math.min(99, parseInt(digitsOnly, 10));
};
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
