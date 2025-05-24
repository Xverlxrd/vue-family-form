<template>
  <div class="data-card">

    <div class="parent-data" v-if="savedData?.parent">
      <h2 class="data-title">Персональные данные</h2>

      <div class="parent-data-item">
        <span class="data-name">{{ savedData.parent.name }}</span>,
        <span class="data-age">{{ savedData.parent.age }} лет</span>
      </div>
    </div>
    <p v-else class="no-children">Родитель не указан</p>


    <div class="children-list">
      <h2 class="data-title" v-if="savedData?.children?.length">Дети</h2>
      <p v-else class="no-children">Дети не указаны</p>

      <div
          class="data-item"
          v-for="(child, index) in savedData?.children"
          :key="index"
      >
        <span class="data-name">{{ child.name }}</span>,
        <span class="data-age">{{ child.age }} лет</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useFormStore} from '@/stores/formStore';

const formStore = useFormStore();
const savedData = computed(() => formStore.savedData);
</script>

<style scoped>
.data-card {
  display: flex;
  flex-direction: column;
  row-gap: 60px;
  max-width: 616px;
  width: 100%;
}

.parent-data {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.data-title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}

.data-name, .data-age {

  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
}

.children-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.data-item {
  background: #F1F1F1;
  gap: 10px;
  border-radius: 5px;
  padding: 10px 20px;
  width: fit-content;
}
</style>