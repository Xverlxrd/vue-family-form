<template>
  <div class="child-form">
    <Input
        v-model="child.name"
        label="Имя"
        placeholder="Введите имя ребенка"
    />
    <Input
        v-model.number="child.age"
        label="Возраст"
        type="number"
        placeholder="Введите возраст"
    />
    <span class="delete-button" @click="$emit('remove')">Удалить</span>
  </div>
</template>

<script setup>
import Input from "@/components/Input/Input.vue";

const child = defineModel('child', {
  type: Object,
  required: true
});
</script>

<style scoped>
.child-form {
  display: flex;
  align-items: center;
  column-gap: 18px;
}

.delete-button {
  color: #01A7FD;
  cursor: pointer;
}
</style>