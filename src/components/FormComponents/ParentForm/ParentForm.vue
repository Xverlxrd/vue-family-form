<template>
  <div class="parent-form">
    <h2 class="title">Персональные данные</h2>
    <div class="input-group">
      <Input
          v-model="parent.name"
          label="Имя"
          placeholder="Введите имя"
      />
      <Input
          v-model.number="parent.age"
          label="Возраст"
          type="number"
          placeholder="Введите возраст"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from "@/components/Input/Input.vue";

const parent = defineModel('parent', {
  type: Object,
  required: true
});
</script>

<style scoped>

.parent-form {
  width: 100%;
}
.title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 10px;
}
</style>