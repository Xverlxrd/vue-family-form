<template>
  <header class="app-header">
    <img src="@/assets/Logo.svg" alt="Logo"/>
    <nav class="app-nav">
      <RouterLink class="nav-link" to="/">Форма</RouterLink>
      <RouterLink class="nav-link" to="/preview">Превью</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 22px 51px;
  box-shadow: 0 1px 0 0 #1111111A;
}

.app-nav {
  display: flex;
  column-gap: 24px;
  margin: 0 auto;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  vertical-align: bottom;
  color: #1111117A;
}

.nav-link {
  cursor: pointer;
  transition: color 0.5s;
}
.nav-link:hover {
  color: black
}
</style>