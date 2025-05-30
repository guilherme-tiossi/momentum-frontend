import { createApp } from 'vue';
import { createPinia } from "pinia";
import './style.css';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);
const pinia = createPinia();

window.pinia = pinia;

app.use(pinia);
app.use(router);
app.mount('#app');
