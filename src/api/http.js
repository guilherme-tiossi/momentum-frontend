import axios from "axios";
import { useAuthStore } from "../stores/auth";
import router from "../router";

const api = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

api.interceptors.request.use(async (config) => {
    if (['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
        await getCsrfToken();
    }
    return config;
});

async function getCsrfToken() {
    try {
        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
            withCredentials: true
        });
    } catch (error) {
        console.error("Failed to get CSRF token:", error);
        throw error;
    }
}

api.interceptors.response.use(
    response => response,
    error => {
        if (error.config && error.config.url.includes("/logout")) {
            return Promise.reject(error);
        }

        if (error.response && error.response.status === 401) {
            const authStore = useAuthStore();
            authStore.logout().catch(() => { });
            router.push("/");
        }
        return Promise.reject(error);
    }
);

export default api;