<template>
  <div class="children-list">
    <h3>Дети (макс. 5)</h3>


    <Button
        v-if="children?.length < 5"
        @click.stop="addChild"
    >
      + Добавить ребенка
    </Button>
  </div>
</template>

<script setup>
import Button from "@/components/Button/Button.vue";

const children = defineModel('children', {
  type: Array,
  required: true
});

const addChild = () => {
  children.value = [...children.value, {
    id: Date.now(),
    name: '',
    age: null
  }];
};

const removeChild = (id) => {
  children.value = children.value.filter(child => child.id !== id);
};
</script>