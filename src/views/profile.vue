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
          <button class="btn custom-button">Edit profile</button>
          <div style="width:20px;"></div>
          <button class="btn custom-button" @click="logout">Logout</button>
        </div>
        <div class="user-data">
          <h4 class="mb-1 custom-text">{{ authStore.user.name ?? 'Name' }}</h4>
          <div class="row">
            <p class="col-md-7 text-muted custom-username">@{{ authStore.user.username ?? 'username' }}</p>
            <div class="col-md-5 d-flex flex-row gap-2 justify-content-end">
              <p class="mb-1 custom-description">{{ authStore.user.following ?? 0 }} Following</p>
              <div class="col-md-2"></div>
              <p class="mb-1 custom-description">{{ authStore.user.followers ?? 0 }} Followers</p>
            </div>
          </div>
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
  z-index: 2;
  width: 220px;
  min-width: 220px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
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

.custom-text {
  font-family: 'Inter', sans-serif;
}

.custom-description {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
}

.custom-username {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 20px;
}

.custom-button {
  background-color: #d9d9d9 !important;
  border: none !important;
  border-radius: 10px !important;
  height: 40px;
  width: 150px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: black;
}

.custom-button:hover {
  background-color: #c2c2c2 !important;
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
