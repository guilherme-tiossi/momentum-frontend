<template>
  <div class="container-fluid g-0 d-flex vh-100">
    <div class="d-flex flex-row w-100">
      <SidebarLeft />

      <div class="flex-grow-1 overflow-auto main-content">
        <CreatePostModal
          :show="isCreatingPost"
          @close="isCreatingPost = false"
          @created_post="loadPosts"
        />
        <CreateTaskModal
          :show="isCreatingTask"
          @close="isCreatingTask = false"
        />

        <CreateButton
          @open-post="isCreatingPost = true"
          @open-task="isCreatingTask = true"
        />
        <ProfileData />

        <div class="position-relative px-4 pb-4">
          <PostCard
            v-for="post in posts"
            :key="post.id"
            :text="post.attributes.text"
            :likes="post.attributes.likes"
            :reposts="post.attributes.reposts"
            :created_at="formatDate(post.attributes.created_at)"
            :name="post.user.name"
            :username="post.user.username"
            :pfp="post.user.pfp"
            :reposted="post.attributes.reposted"
            :liked_by_user="post.attributes.liked_by_user"
            :reposted_by_user="post.attributes.reposted_by_user"
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
import CreatePostModal from "../components/CreatePostModal.vue";
import CreateTaskModal from "../components/CreateTaskModal.vue";

const posts = ref([]);
const authStore = getAuthStore();
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

const isCreatingPost = ref(false);
const isCreatingTask = ref(false);
// const isCreatingRecurrentTask = ref(false);

const loadPosts = async () => {
  try {
    const { data } = await api.get(
      "/api/users/" + authStore.user.id + "/profile_posts"
    );

    const postsData = data.data;
    const included = data.included;

    const usersMap = {};
    const pfpPath = (user) =>
      user.attributes.uses_default_pfp
        ? "/default/pfp.png"
        : "/storage/avatars/" + user.attributes.pfp;

    included.forEach((item) => {
      if (item.type === "users") {
        usersMap[item.id] = {
          name: item.attributes.name,
          username: item.attributes.username,
          pfp: pfpPath(item),
        };
      }
    });

    posts.value = postsData.map((post) => {
      const userId = post.relationships.user.data.id;
      const userInfo = usersMap[userId] || {};

      return {
        ...post,
        user: userInfo,
      };
    });
  } catch (error) {
    console.error("Error loading posts:", error);
  }
};

onMounted(loadPosts);
</script>
