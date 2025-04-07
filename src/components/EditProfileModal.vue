<template>
  <transition name="fade-zoom">
    <div v-show="show" class="modal-overlay">
      <div class="card-edit" v-click-outside="handleClickOutside">
        <div class="close-button-wrapper">
          <button class="close-button" @click="$emit('close')">x</button>
        </div>
        <div class="row g-0">
          <div class="col-md-12 d-flex flex-column justify-content-center p-4">
            <div class="row">
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control mb-3 custom-input"
                  placeholder="Name"
                  v-model="name"
                />
              </div>
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control mb-3 custom-input"
                  placeholder="Username"
                  v-model="username"
                />
              </div>
            </div>

            <input
              type="email"
              class="form-control mb-3 custom-input"
              placeholder="E-mail"
              v-model="email"
            />

            <textarea
              class="form-control mb-3 custom-textarea"
              placeholder="Bio"
              v-model="password"
            ></textarea>

            <button class="btn w-100 mb-2 custom-button" @click="register">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({ show: Boolean });
const emit = defineEmits(["close"]);

const name = ref("");
const username = ref("");
const email = ref("");
const password = ref("");

const register = () => {
  console.log({
    name: name.value,
    username: username.value,
    email: email.value,
    password: password.value,
  });
};

const handleClickOutside = () => {
  emit("close");
};

const vClickOutside = {
  mounted(el, binding) {
    el.__ClickOutsideHandler__ = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener("mousedown", el.__ClickOutsideHandler__);
  },
  unmounted(el) {
    document.removeEventListener("mousedown", el.__ClickOutsideHandler__);
  },
};

defineExpose({});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
  z-index: 999;
}

.card-edit {
  display: flex;
  flex-direction: column;
  background: #dadada;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  width: 90vw;
  max-width: 600px;
  height: auto;
  text-align: center;
  position: relative;
}

.close-button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2px;
}

.close-button {
  background-color: #c4c4c4 !important;
  border: none !important;
  border-radius: 10px !important;
  height: 40px;
  width: 40px;
  font-family: "Inter", sans-serif;
  font-weight: 450;
  color: black;
  font-size: 20px;
}

.close-button:hover {
  background-color: #b3b3b3 !important;
}

.custom-input {
  background-color: #d0d0d0 !important;
  border: none !important;
  border-radius: 10px !important;
  height: 50px;
  font-family: "Inter", sans-serif;
}

.custom-input::placeholder {
  color: #676767;
}

.custom-textarea {
  background-color: #d0d0d0 !important;
  border: none !important;
  border-radius: 10px !important;
  height: 80px;
  font-family: "Inter", sans-serif;
  resize: none;
  padding-top: 10px;
}

.custom-textarea::placeholder {
  color: #676767;
}

.custom-button {
  background-color: #bebebe !important;
  border: none !important;
  border-radius: 10px !important;
  height: 50px;
  font-family: "Inter", sans-serif;
  font-weight: bold;
  color: black;
}

.custom-button:hover {
  background-color: rgb(170, 170, 170) !important;
}

.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: opacity 0.1s ease, transform 0.1s ease;
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-zoom-enter-to,
.fade-zoom-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
