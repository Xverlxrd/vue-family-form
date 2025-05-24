<template>
  <div class="grid">
    <Header/>
    <section class="content">
      <slot/>
    </section>
    <Footer/>
  </div>
</template>

<script setup lang="ts">

import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-rows: 1fr 10fr 1fr;
  min-height: 100vh;
  width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 30px 0;
}
</style>