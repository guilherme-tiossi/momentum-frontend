<template>
  <div class="container-fluid g-0 d-flex vh-100">
    <div class="d-flex flex-row w-100">
      <SidebarLeft
        :id="authStore.user.id"
        :name="authStore.user.name"
        :username="authStore.user.username"
        :pfp="authStore.user.pfp"
      />

      <div class="flex-grow-1 overflow-auto main-content">
        <CreateRecTaskModal
          :show="isCreatingRecTask"
          @close="isCreatingRecTask = false"
        />
        <CreateTaskModal
          :show="isCreatingTask"
          @close="isCreatingTask = false"
        />

        <div class="d-flex align-items-center justify-content-center gap-2">
          <div class="position-relative px-4 pb-4">teste</div>
        </div>
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
import api from "../api/http";
import { ref, onMounted } from "vue";
import { getAuthStore } from "../stores/auth";
import JSONAPISerializer from "json-api-serializer";
import SidebarLeft from "../components/SidebarLeft.vue";
import SidebarRight from "../components/SidebarRight.vue";
import CreateTaskModal from "../components/CreateTaskModal.vue";
import CreateRecTaskModal from "../components/CreateRecTaskModal.vue";

const tasks = ref([]);
const authStore = getAuthStore();

const isCreatingTask = ref(false);
const isCreatingRecTask = ref(false);

const Serializer = new JSONAPISerializer();

Serializer.register("tasks", {
  relationships: {
    user: {
      type: "users",
    },
  },
});

Serializer.register("users");

const loadTasks = async () => {
  try {
    const results = await api.get("/api/tasks");

    tasks.value = Serializer.deserialize("task", results.data);
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
};

onMounted(loadTasks);
</script>
