<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="card p-5 shadow-lg custom-card" style="max-width: 900px; width: 100%">
        <div class="row g-0">
          
          <div class="col-md-7 d-flex flex-column justify-content-center p-4">
            <div class="row">
                <div class="col-md-6">
                    <input type="text" class="form-control mb-3 custom-input" placeholder="Name" v-model="name" />
                </div>
                <div class="col-md-6">
                    <input type="text" class="form-control mb-3 custom-input" placeholder="Username" v-model="username" />
                </div>
            </div>
            
            <input type="email" class="form-control mb-3 custom-input" placeholder="E-mail" v-model="email" />
            
            <input type="password" class="form-control mb-3 custom-input" placeholder="Password" v-model="password" />
            <input type="password" class="form-control mb-3 custom-input" placeholder="Confirm Password" v-model="confirm_password" />
            <button class="btn w-100 mb-2 custom-button" @click="register">Register</button>
            <div class="custom-hr mb-3"></div>
            <button class="btn w-100 custom-button-clear" @click="$router.push('/')">Already have an account</button>
          </div>
          
          <div class="d-flex align-items-center custom-width">
            <div class="custom-divider"></div>
          </div>

          <div class="col-md-4 d-flex flex-column align-items-center text-center p-4" style="width:40%">
            <div class="custom-img rounded"></div>
            <p class="mt-3 custom-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, porta sed turpis. Duis vel leo vel est pretium tempus.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const email = ref("");
  const password = ref("");
  
  const register = () => {
    // link to api
  };
  </script>
  
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
  
  .custom-width {
    margin-left: 6.5px;
    width: 6.5px;
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