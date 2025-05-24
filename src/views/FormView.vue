<template>
  <form @submit.prevent="handleSubmit">
    <ParentForm v-model:parent="formData.parent" />
    <ChildrenList v-model:children="formData.children"/>
    <Button type="submit">Сохранить</Button>
  </form>
</template>

<script setup lang="ts">
import ParentForm from "@/components/FormComponents/ParentForm/ParentForm.vue";
import {ref} from "vue";
import Button from "@/components/Button/Button.vue";
import ChildrenList from "@/components/FormComponents/ChildrenList/ChildrenList.vue";

const formData = ref({
  parent: { name: '', age: null },
  children: []
});

const handleSubmit = () => {
  console.log(formData.value.parent)
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
</style>