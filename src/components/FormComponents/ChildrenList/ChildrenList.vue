<template>
  <div class="children-list">
    <div class="children-list-header">
      <h3 class="title">Дети (макс. 5)</h3>
      <Button
          theme="secondary"
          v-if="modelValue.length < 5"
          @click="addChild"
      >
        + Добавить ребенка
      </Button>
    </div>
    <ChildForm
        v-for="(child, index) in modelValue"
        :key="index"
        v-model="modelValue[index]"
        @remove="removeChild(index)"
    />


  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import ChildForm from "@/components/FormComponents/ChildForm/ChildForm.vue";
import Button from "@/components/Button/Button.vue";


const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);

const addChild = () => {
  const newChildren = [...props.modelValue];
  newChildren.push({ name: '', age: null });
  emit('update:modelValue', newChildren);
};

const removeChild = (index) => {
  const newChildren = props.modelValue.filter((_, i) => i !== index);
  emit('update:modelValue', newChildren);
};
</script>

<style scoped>
.children-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.children-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}
</style>