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
import { ref, onMounted } from "vue";
import { useFormStore } from "@/stores/formStore";
import type { FormData } from "@/types/form";
import ParentForm from "@/components/FormComponents/ParentForm/ParentForm.vue";
import ChildrenList from "@/components/FormComponents/ChildrenList/ChildrenList.vue";
import Button from "@/components/Button/Button.vue";

const formStore = useFormStore();
const formData = ref<FormData>({
  parent: { name: '', age: null },
  children: []
});

const errors = ref<string[]>([]);


onMounted(() => {
  if (formStore.savedData) {
    formData.value = {
      parent: {
        name: formStore.savedData.parent.name,
        age: formStore.savedData.parent.age !== null ?
            Number(formStore.savedData.parent.age) : null
      },
      children: formStore.savedData.children.map(child => ({
        id: child.id || Date.now(),
        name: child.name,
        age: child.age !== null ? Number(child.age) : null
      }))
    };
  }
});

const validateForm = (): boolean => {
  errors.value = [];

  const parentName = formData.value.parent.name.trim();
  const parentAge = formData.value.parent.age;

  if (!parentName) {
    errors.value.push('✖ Имя родителя обязательно для заполнения');
  }

  if (parentAge === null) {
    errors.value.push('✖ Возраст родителя обязателен для заполнения');
  } else if (typeof parentAge === 'number') {
    if (parentAge < 18) {
      errors.value.push('✖ Возраст родителя должен быть не менее 18 лет');
    } else if (parentAge > 120) {
      errors.value.push('✖ Возраст родителя должен быть не более 120 лет');
    }
  }

  formData.value.children.forEach((child, index) => {
    const childName = child.name?.trim();
    const childAge = child.age;

    if (!childName) {
      errors.value.push(`✖ Имя ребенка #${index + 1} обязательно для заполнения`);
    }

    if (childAge === null) {
      errors.value.push(`✖ Возраст ребенка #${index + 1} обязателен для заполнения`);
    } else if (typeof childAge === 'number') {
      if (childAge < 1) {
        errors.value.push(`✖ Возраст ребенка #${index + 1} должен быть не менее 1 года`);
      } else if (childAge > 18) {
        errors.value.push(`✖ Возраст ребенка #${index + 1} должен быть не более 18 лет`);
      }
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