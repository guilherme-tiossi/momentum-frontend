<template>
  <div class="d-none d-md-flex pt-4 flex-column p-4 bg-light sidebar">
    <div class="custom-img rounded mb-5"></div>
    <div class="mt-1 sidebar-link d-flex align-items-center">
      <i class="bi bi-house-door me-2"></i>
      <p class="mb-0">Home</p>
    </div>
    <div class="mt-2 sidebar-link d-flex align-items-center">
      <i class="bi bi-bell me-2"></i>
      <p class="mb-0">Notifications</p>
    </div>
    <div class="mt-2 sidebar-link d-flex align-items-center">
      <i class="bi bi-chat-dots me-2"></i>
      <p class="mb-0">Messages</p>
    </div>
    <div class="mt-2 sidebar-link d-flex align-items-center">
      <i class="bi bi-person-fill me-2"></i>
      <p class="mb-0">Profile</p>
    </div>
    <div class="mt-2 sidebar-link d-flex align-items-center">
      <i class="bi bi-gear me-2"></i>
      <p class="mb-0">Settings</p>
    </div>
    <div style="height: 175px"></div>
    <div class="sidebar-card rounded overflow-hidden d-flex align-items-center">
      <div class="custom-img-2 rounded me-2 flex-shrink-0"></div>
      <div class="d-flex flex-column justify-content-center overflow-hidden">
        <div class="sidebar-name text-truncate">{{ name }}</div>
        <div class="sidebar-username text-muted text-truncate">
          @{{ username }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  z-index: 2;
  width: 280px;
  min-width: 220px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  background: linear-gradient(to right, #eaeaea 0%, #f5f5f5 35%, #ededed 100%);
}

.sidebar-link {
  font-family: "Inter", sans-serif;
  font-size: 1.5rem;
  text-align: left;
}

.custom-img {
  width: 75px;
  height: 75px;
  background: #d0d0d0;
}

.custom-img-2 {
  width: 55px;
  height: 55px;
  background: #c9c9c9;
}

.sidebar-card {
  padding: 10px;
  width: 225px;
  height: 105px;
  border: 1px solid #b3b3b3;
  background: linear-gradient(to top, #dbdbdb, #f0f0f0);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.sidebar-name {
  font-family: "Inter", sans-serif;
  font-size: 1.15rem;
}

.sidebar-username {
  font-family: "Inter", sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
}
</style>

<script>
export default {
  name: "SidebarLeft",
  props: {
    id: {
      type: String,
      default: "0",
    },
    name: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      default: "",
    },
  },
};
</script>
