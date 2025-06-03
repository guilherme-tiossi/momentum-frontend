import { createRouter, createWebHistory } from "vue-router";
import registration from "./views/registration.vue";
import { getAuthStore } from "./stores/auth";
import profile from "./views/profile.vue";
import login from "./views/login.vue";
import tasks from "./views/tasks.vue";

const routes = [
  { path: "/", component: login, meta: { guestOnly: true } },
  { path: "/registration", component: registration, meta: { guestOnly: true } },
  { path: "/profile", component: profile, meta: { requiresAuth: true } },
  { path: "/tasks", component: tasks, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = getAuthStore();

  if (!authStore.user && to.path !== "/") {
    try {
      await authStore.fetchUser();
    } catch (e) {
      return next("/");
    }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next("/");
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return next("/profile");
  }

  next();
});

export default router;
