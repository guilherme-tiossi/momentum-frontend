import { createRouter, createWebHistory } from 'vue-router';
import login from './views/login.vue';
import registration from './views/registration.vue';

const routes = [
    { path: '/', component: login },
    { path: '/registration', component: registration }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
