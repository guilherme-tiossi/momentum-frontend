<template>
    <div class="container">
      <Card>
        <h2>Login</h2>
        <input type="email" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Senha" v-model="password" />
        <button @click="login">Entrar</button>
      </Card>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import Card from "../components/Card.vue";
  
  const email = ref("");
  const password = ref("");
  
  const login = () => {
    console.log("Logando com:", email.value, password.value);
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* padding: 2rem; */
  }
  </style>
  