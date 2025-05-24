<template>
  <form @submit.prevent="handleSubmit">
    <ParentForm v-model:parent="formData.parent" />
    <ChildrenList v-model="formData.children"/>

    <div v-if="errors.length" class="error-messages">
      <div v-for="(error, index) in errors" :key="index" class="error-message">
        {{ error }}
      </div>
    </div>

    <Button type="submit">Сохранить</Button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFormStore } from "@/stores/formStore";
import ParentForm from "@/components/FormComponents/ParentForm/ParentForm.vue";
import ChildrenList from "@/components/FormComponents/ChildrenList/ChildrenList.vue";
import Button from "@/components/Button/Button.vue";

const formStore = useFormStore();
const formData = ref({
  parent: { name: '', age: null },
  children: []
});

const errors = ref<string[]>([]);

const validateForm = () => {
  errors.value = [];

  if (!formData.value.parent.name.trim()) {
    errors.value.push('✖ Имя родителя обязательно для заполнения');
  }

  if (formData.value.parent.age === null || formData.value.parent.age === '') {
    errors.value.push('✖ Возраст родителя обязателен для заполнения');
  } else if (formData.value.parent.age < 18) {
    errors.value.push('✖ Возраст родителя должен быть не менее 18 лет');
  } else if (formData.value.parent.age > 120) {
    errors.value.push('✖ Возраст родителя должен быть не более 120 лет');
  }

  formData.value.children.forEach((child, index) => {
    if (!child.name?.trim()) {
      errors.value.push(`✖ Имя ребенка #${index + 1} обязательно для заполнения`);
    }

    if (child.age === null || child.age === '') {
      errors.value.push(`✖ Возраст ребенка #${index + 1} обязателен для заполнения`);
    } else if (child.age < 1) {
      errors.value.push(`✖ Возраст ребенка #${index + 1} должен быть не менее 1 года`);
    } else if (child.age > 18) {
      errors.value.push(`✖ Возраст ребенка #${index + 1} должен быть не более 18 лет`);
    }
  });

  return errors.value.length === 0;
};

const handleSubmit = () => {
  if (!validateForm()) {
    console.error('Ошибки валидации:', errors.value);
    return;
  }

  formStore.saveFormData({
    parent: { ...formData.value.parent },
    children: [...formData.value.children]
  });

  console.log('Данные сохранены в хранилище:', formStore.savedData);
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  max-width: 616px;
  width: 100%;
}

.error-messages {
  margin-top: -20px;
  margin-bottom: 20px;
  color: #ff4444;
  background: #ffeeee;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ffcccc;
}

.error-message {
  margin-bottom: 8px;
  font-size: 14px;
}

.error-message:last-child {
  margin-bottom: 0;
}
</style>