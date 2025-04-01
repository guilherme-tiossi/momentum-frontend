<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  display: grid;
  grid-template-columns: 1fr 2px 1fr;
  background: #e6e6e6;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 160vh;
  height: 60vh;
  text-align: center;
  padding: 10vh;
}
</style>