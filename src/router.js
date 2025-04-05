import { createRouter, createWebHistory } from 'vue-router';
import { getAuthStore } from "./stores/auth";
import login from './views/login.vue';
import registration from './views/registration.vue';
import profile from './views/profile.vue';

const routes = [
    { path: '/', component: login, meta: { guestOnly: true } },
    { path: '/registration', component: registration, meta: { guestOnly: true } },
    { path: '/profile', component: profile, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    const authStore = getAuthStore();

    if (!authStore.user) {
        try {
            await authStore.fetchUser();
        } catch (e) {
            return next('/');
        }
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next('/');
    }

    if (to.meta.guestOnly && authStore.isAuthenticated) {
        return next('/profile');
    }

    next();
});

export default router;
