<template>
  <div class="fab-container" v-click-outside="closeIfOpen">
    <transition-group name="fade-up" tag="div">
      <button
        v-if="isOpen"
        key="btn1"
        class="button small-button"
        style="bottom: 110px; background-color: #d9d9d9"
      >
        >:)
      </button>
      <button
        v-if="isOpen"
        key="btn2"
        class="button small-button"
        style="bottom: 180px; background-color: #d9d9d9"
      >
        :o
      </button>
    </transition-group>

    <button class="main-button button" @click="toggle">
      <div class="plus-icon" :class="{ rotated: isOpen }">
        <span class="bar horizontal"></span>
        <span class="bar vertical"></span>
      </div>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isOpen = ref(false);
const toggle = () => (isOpen.value = !isOpen.value);

const closeIfOpen = () => {
  if (isOpen.value) {
    isOpen.value = false;
  }
};

const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};
</script>

<style scoped>
.fab-container {
  z-index: 3;
  position: fixed;
  right: 260px;
  bottom: 35px;
}

.button {
  width: 65px;
  height: 65px;
  background: #b9b9b9;
  border: 0px;
  border-radius: 45%;
  font-size: 50px;
  color: white;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s;
}

.button:hover {
  background-color: #a7a7a7 !important;
  color: #e6e6e6;
}

.main-button {
  z-index: 2;
  position: relative;
}

.plus-icon {
  position: relative;
  width: 30px;
  height: 30px;
  transition: transform 0.3s ease;
}

.bar {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 30px;
  background-color: white;
  border-radius: 2px;
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease;
}

.horizontal {
  transform: translate(-50%, -50%) rotate(0deg);
}

.vertical {
  transform: translate(-50%, -50%) rotate(90deg);
}

.rotated .horizontal {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.rotated .vertical {
  transform: translate(-50%, -50%) rotate(45deg);
}

.small-button {
  width: 55px;
  height: 55px;
  font-size: 26px;
  color: #fff;
  opacity: 0.9;
  transition: transform 0.4s ease, opacity 0.4s ease;
  margin-bottom: 10px;
  margin-left: 2.5px;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.4s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
