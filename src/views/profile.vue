<template>
  <div class="container-fluid g-0 d-flex vh-100">
    <div class="d-none d-md-flex flex-column align-items-center p-3 bg-light sidebar">
      <div class="mb-auto">
        <p>left sidebar</p>
      </div>
    </div>

    <div class="flex-grow-1 overflow-auto main-content">
      <div class="profile-cover w-100"></div>

      <div class="profile-info-container position-relative px-4 pb-4">
        <div class="profile-avatar"></div>
        <div class="profile-buttons d-flex flex-row gap-2 justify-content-end">
          <button class="">Edit profile</button>
          <button class="" @click="logout">logout</button>
        </div>
        <div class="user-data">
          <h4 class="mb-1">{{ authStore.user.name ?? 'Name' }}</h4>
          <div class="row">
            <p class="col-md-9 text-muted">@{{ authStore.user.username ?? 'username' }}</p>
            <div class="col-md-3 d-flex flex-row gap-2 justify-content-end">
              <p class="text-muted">{{ authStore.user.following ?? 0 }} following</p>
              <p class="text-muted">{{ authStore.user.followers ?? 0 }} followers</p>
            </div>
          </div>
          <!-- <div class="d-flex gap-3">
          </div> -->
        </div>
      </div>
    </div>

    <div class="d-none d-md-flex flex-column p-3 bg-light sidebar">
      <p>right sidebar</p>
    </div>
  </div>
</template>


<style scoped>
.sidebar {
  width: 220px;
  min-width: 220px;
}

.main-content {
  background-color: #f8f9fa;
}

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
  height:30px;
  padding-right:35px;
}

.user-data {
  padding-top:35px;
  padding-left:35px;
  padding-right:35px;
}

</style>

<script setup>
import { getAuthStore } from "../stores/auth";

const authStore = getAuthStore();

const logout = async () => {
  try {
    await authStore.logout();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>
