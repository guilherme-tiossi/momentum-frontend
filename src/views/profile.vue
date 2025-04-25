<template>
  <div class="container-fluid g-0 d-flex vh-100">
    <div class="d-flex flex-row w-100">
      <SidebarLeft />

      <div class="flex-grow-1 overflow-auto main-content">
        <CreateButton />
        <ProfileData />
        <!-- load posts -->
        <div class="position-relative px-4 pb-4">
          <PostCard
            v-for="post in posts"
            :key="post.id"
            :text="post.attributes.text"
            :likes="post.attributes.likes"
            :reposts="post.attributes.reposts"
            :created_at="formatDate(post.attributes.created_at)"
            :name="authStore.user.name"
            :username="authStore.user.username"
            :pfp="userPfp"
          />
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
import PostCard from "../components/PostCard.vue";
import ProfileData from "../components/ProfileData.vue";
import SidebarLeft from "../components/SidebarLeft.vue";
import CreateButton from "../components/CreateButton.vue";
import SidebarRight from "../components/SidebarRight.vue";

const posts = ref([]);
const authStore = getAuthStore();
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

onMounted(async () => {
  try {
    const { data } = await api.get(
      "/api/users/" + authStore.user.id + "/profile_posts"
    );
    posts.value = data.data;
  } catch (error) {
    console.error("Error loading posts:", error);
  }
});
</script>
