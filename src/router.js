import { createRouter, createWebHistory } from 'vue-router';
import { getAuthStore } from "./stores/auth";
import login from './views/login.vue';
import registration from './views/registration.vue';
import profile from './views/profile.vue';

const routes = [
    { path: '/', component: login },
    { path: '/registration', component: registration },
    { path: '/profile', component: profile, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    const authStore = getAuthStore();

    if (to.meta.requiresAuth && !authStore.user) {
        await authStore.fetchUser();
        if (!authStore.user) return next("/");
    }

    next();
});

export default router;
