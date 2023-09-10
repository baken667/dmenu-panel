<template>
  <ElContainer class="container">
    <ElMain class="main">
      <slot />
    </ElMain>
  </ElContainer>
</template>
<style scoped>
.container {
  min-height: 100vh;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
