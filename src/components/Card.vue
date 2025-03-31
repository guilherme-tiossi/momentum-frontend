<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  background: #EDEDED;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 1000px;
  height: 70%;
  text-align: center;
}
</style>