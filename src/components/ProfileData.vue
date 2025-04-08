<template>
  <EditProfileModal :show="isEditing" @close="isEditing = false" />

  <div class="profile-cover w-100"></div>
  <div class="profile-info-container position-relative px-4 pb-4">
    <div class="profile-avatar"></div>
    <div class="profile-buttons d-flex flex-row gap-2 justify-content-end">
      <button class="custom-button" @click="isEditing = true">
        Edit profile
      </button>
      <div style="width: 20px"></div>
      <button class="custom-button" @click="logout">Logout</button>
    </div>
    <div class="user-data">
      <h4 class="mb-1 custom-text">{{ authStore.user.name ?? "Name" }}</h4>
      <div class="row">
        <p class="mb-1 col-md-7 text-muted custom-minor-text">
          @{{ authStore.user.username ?? "username" }}
        </p>
        <div class="col-md-5 d-flex flex-row gap-2 justify-content-end">
          <p class="mb-1 custom-description">
            {{ authStore.user.following ?? 0 }} Following
          </p>
          <div class="col-md-2"></div>
          <p class="mb-1 custom-description">
            {{ authStore.user.followers ?? 0 }} Followers
          </p>
        </div>
      </div>
      <div class="col-md-5 d-flex flex-row gap-2">
        <p v-if="authStore.user.bio" class="mb-1 custom-description">
          {{ authStore.user.bio }}
        </p>
      </div>
      <div class="row">
        <div class="col-md-5 d-flex flex-row gap-2">
          <p
            v-if="authStore.user.location"
            class="text-muted custom-minor-text"
          >
            <i class="bi bi-geo-alt"></i> {{ authStore.user.location }}
          </p>
          <div v-if="authStore.user.location" class="col-md-1"></div>
          <p class="text-muted custom-minor-text">
            <i class="bi bi-calendar-event" style="padding-right: 6px"></i>
            Joined {{ authStore.user.created_at ?? 0 }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-cover {
  height: 200px;
  background: #dbdbdb;
}

.profile-avatar {
  position: absolute;
  top: -100px;
  left: 60px;
  width: 150px;
  height: 150px;
  background: #c7c7c7;
  border-radius: 20px;
}

.profile-buttons {
  margin-top: 20px;
  width: 100%;
  height: 30px;
  padding-right: 35px;
}

.user-data {
  padding-top: 35px;
  padding-left: 35px;
  padding-right: 35px;
}

.custom-text {
  font-family: "Inter", sans-serif;
}

.custom-description {
  font-family: "Inter", sans-serif;
  font-size: 20px;
}

.custom-minor-text {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 20px;
}

.custom-button {
  background-color: #d9d9d9 !important;
  border: none !important;
  border-radius: 10px !important;
  height: 40px;
  width: 150px;
  font-family: "Inter", sans-serif;
  font-weight: 450;
  color: black;
  font-size: 20px;
}

.custom-button:hover {
  background-color: #c2c2c2 !important;
}

.btn-close {
  background: red;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
  cursor: pointer;
}
</style>

<script setup>
import { ref } from "vue";
import { getAuthStore } from "../stores/auth";
import EditProfileModal from "./EditProfileModal.vue";

const authStore = getAuthStore();
const isEditing = ref(false);

const logout = async () => {
  try {
    await authStore.logout();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>
