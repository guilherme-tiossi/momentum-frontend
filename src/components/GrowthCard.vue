<template>
  <div class="card">
    <div class="card-tab">
      <span class="card-tab-text">{{ title }}</span>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "GrowthCard",
  props: {
    title: {
      type: String,
      default: "Title",
    },
  },
};
</script>

<style scoped>
.card {
  background: #eeeeee;
  width: 350px;
  height: 160px;
  border-radius: 8px 8px 25px 25px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to top, #e5e5e5, #eeeeee);
}

.card-tab {
  height: 2.25rem;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 2px solid #b3b3b3;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: linear-gradient(to top, #c9c9c9, #dedede);
}

.card-tab-text {
  font-family: "Inter", sans-serif;
  color: #232323;
  font-weight: 500;
  font-size: 20px;
}

.card-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
}
</style>
