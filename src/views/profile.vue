<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="card p-5 shadow-lg custom-card" style="max-width: 900px; width: 100%">
        <div class="row g-0">
          <div class="col-md-6 d-flex flex-column align-items-center text-center p-4">
            <div class="custom-img rounded"></div>
            <p class="mt-3 custom-paragraph">{{authStore.user.name ?? null}}'s profile.</p>
          </div>
          
          <div class="col-md-1 d-flex align-items-center">
            <div class="custom-divider"></div>
          </div>
          
          <div class="col-md-5 d-flex flex-column justify-content-center p-4">
            <button class="btn btn-link custom-button-clear mb-2" @click="logout">logout</button>
          </div>
        </div>
      </div>
    </div>
</template>
  
<style scoped>
  .custom-card {
    background-color: #e6e6e6;
    border: none;
    border-radius: 10px;
  }
  
  .custom-img {
    width: 150px;
    height: 150px;
    background: #d0d0d0;
  }
  
  .custom-paragraph {
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    text-align: left;
  }
  
  .custom-divider {
    width: 1.3px;
    background: #676767;
    height: 100%;
  }
  
  .custom-hr {
    height: 1.3px;
    background: #676767;
    width: 100%;
    opacity: 1; /* Sobrescreve o estilo do Bootstrap */
  }
  
  .custom-input {
    background-color: #d0d0d0 !important;
    border: none !important;
    border-radius: 10px !important;
    height: 50px;
    font-family: 'Inter', sans-serif;
  }
  
  .custom-input::placeholder {
    color: #676767;
  }
  
  .custom-button {
    background-color: #d0d0d0 !important;
    border: none !important;
    border-radius: 10px !important;
    height: 50px;
    font-family: 'Inter', sans-serif;
    font-weight: bold;
    color: black;
  }
  
  .custom-button:hover {
    background-color: #b7b7b7 !important;
  }
  
  .custom-button-clear {
    background-color: transparent !important;
    color: #676767 !important;
    text-decoration: none !important;
    font-family: 'Inter', sans-serif;
    font-weight: bold;
    padding: 0;
  }
  
  /* Sobrescreve o hover do Bootstrap */
  .custom-button-clear:hover {
    color: #676767 !important;
    text-decoration: underline !important;
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