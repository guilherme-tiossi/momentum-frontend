import axios from "axios";
import router from "../router";

const api = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.interceptors.request.use(async (config) => {
  if (
    ["post", "put", "patch", "delete"].includes(config.method.toLowerCase())
  ) {
    await getCsrfToken();
  }
  return config;
});

async function getCsrfToken() {
  try {
    await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Failed to get CSRF token:", error);
    throw error;
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest?.url?.includes("/logout")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      this.user = null;
      this.isAuthenticated = false;
      router.push("/");
    }

    return Promise.reject(error);
  }
);

export default api;
