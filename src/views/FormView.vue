<template>
  <form @submit.prevent="handleSubmit">
    <ParentForm v-model:parent="formData.parent"/>
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
import {ref, onMounted} from "vue";
import {useFormStore} from "@/stores/formStore";
import type {FormData} from "@/types/form";
import ParentForm from "@/components/FormComponents/ParentForm/ParentForm.vue";
import Button from "@/components/Button/Button.vue";
import ChildrenList from "@/components/FormComponents/ChildrenList/ChildrenList.vue";
import {validateForm} from "@/utils/validateForm.ts";

const formStore = useFormStore()
const formData = ref<FormData>({
  parent: {name: '', age: null},
  children: []
})

const errors = ref<string[]>([])


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
    }
  }
})


const handleSubmit = () => {
  const validationErrors = validateForm(formData.value)
  errors.value = validationErrors

  if (validationErrors.length > 0) {
    console.error("Ошибки валидации:", validationErrors)
    return;
  }

  formStore.saveFormData({
    parent: {...formData.value.parent},
    children: [...formData.value.children]
  })
}

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