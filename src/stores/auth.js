import { defineStore } from "pinia";
import api from "../api/http";
import router from "../router";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        isAuthenticated: false
    }),
    actions: {
        async login(credentials) {
            try {
                const response = await api.post("/login", credentials);
                this.user = response.data;
                this.isAuthenticated = true;
                await this.fetchUser();
                router.push('/profile');
                return response;
            } catch (error) {
                this.user = null;
                this.isAuthenticated = false;
                throw error;
            }
        },
        async logout() {
            try {
                await api.post("/logout");
                this.user = null;
                this.isAuthenticated = false;
                router.push('/');
            } catch (error) {
                console.error("Logout failed:", error);
                throw error;
            }
        },
        async fetchUser() {
            try {
                const response = await api.get("/api/user");
                this.user = response.data;
                this.isAuthenticated = true;
                return response;
            } catch (error) {
                this.user = null;
                this.isAuthenticated = false;
                throw error;
            }
        },
        async register(userData) {
            try {
                console.log(userData);
                const response = await api.post("/api/create-user", userData);
                await this.login({
                    email: userData.data.attributes.email,
                    password: userData.data.attributes.password
                });
                return response;
            } catch (error) {
                console.error("Registration failed:", error);
                throw error;
            }
        }
    }
});

export const getAuthStore = () => {
    if (!window.pinia) {
        throw new Error("Pinia não foi inicializado. Certifique-se de que o Pinia está instalado e configurado corretamente.");
    }
    return useAuthStore(window.pinia);
};