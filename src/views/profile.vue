<template>
  <div class="container-fluid g-0 d-flex vh-100">
    <div class="d-flex flex-row w-100">
      <SidebarLeft
        :id="authStore.user.id"
        :name="authStore.user.name"
        :username="authStore.user.username"
      />

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

        <div class="d-flex align-items-center justify-content-center gap-2">
          <div class="position-relative px-4 pb-4">
            <PostCard
              v-for="post in posts"
              :key="post.id"
              :id="post.id"
              :text="post.text"
              :likes_counter="post.likes_counter"
              :reposts_counter="post.reposts_counter"
              :comments_counter="post.comments_counter"
              :created_at="formatDate(post.created_at)"
              :name="post.user.name"
              :username="post.user.username"
              :pfp="post.user.pfp"
              :reposted="post.reposted"
              :liked_by_user="post.liked_by_user"
              :reposted_by_user="post.reposted_by_user"
              :comments="post.comments"
            />
          </div>
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
import JSONAPISerializer from "json-api-serializer";
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

const Serializer = new JSONAPISerializer();

Serializer.register("posts", {
  relationships: {
    comments: {
      type: "comments",
    },
    author: {
      type: "users",
    },
  },
});

Serializer.register("comments", {
  relationships: {
    author: {
      type: "users",
    },
  },
});

Serializer.register("users");
Serializer.register("attachment");
Serializer.register("post");

const loadPosts = async () => {
  try {
    const results = await api.get(
      "/api/users/" + authStore.user.id + "/profile_posts"
    );

    posts.value = Serializer.deserialize("post", results.data);
  } catch (error) {
    console.error("Error loading posts:", error);
  }
};

onMounted(loadPosts);
</script>
