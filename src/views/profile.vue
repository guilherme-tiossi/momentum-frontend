<template>
  <div class="container-fluid g-0 d-flex vh-100">
    <div class="d-flex flex-row w-100">
      <SidebarLeft />

      <div class="flex-grow-1 overflow-auto main-content">
        <CreateButton />
        <ProfileData />
      </div>

      <SidebarRight />
    </div>
  </div>
</template>

<style scoped>
.main-content {
  background-color: #f8f9fa;
}
</style>

<script setup>
import CreateButton from "../components/CreateButton.vue";
import ProfileData from "../components/ProfileData.vue";
import SidebarLeft from "../components/SidebarLeft.vue";
import SidebarRight from "../components/SidebarRight.vue";
</script>
