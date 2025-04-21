<template>
  <CreateTaskModal :show="isCreatingTask" @close="isCreatingTask = false" />

  <div class="fab-container" v-click-outside="closeIfOpen">
    <transition-group name="fade-up" tag="div" class="fab-items">
      <div v-if="isOpen" class="fab-item" key="item1">
        <div class="fab-inner">
          <div class="label">New Task</div>
          <button class="button small-button" @click="isCreatingTask = true">
            >:)
          </button>
        </div>
      </div>
      <div v-if="isOpen" class="fab-item" key="item2">
        <div class="fab-inner">
          <div class="label">New Recurrent Task</div>
          <button class="button small-button">:o</button>
        </div>
      </div>
      <div v-if="isOpen" class="fab-item" key="item3">
        <div class="fab-inner">
          <div class="label">New Post</div>
          <button class="button small-button">:3</button>
        </div>
      </div>
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
import CreateTaskModal from "./CreateTaskModal.vue";

const isOpen = ref(false);
const isCreatingTask = ref(false);
// const isCreatingRecurrentTask = ref(false);
// const isCreatingPost = ref(false);
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

.fab-items {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  bottom: 64px;
  right: 5px;
}

.fab-item {
  display: flex;
  align-items: center;
}

.fab-inner {
  display: flex;
  align-items: center;
  position: relative;
}

.label {
  font-family: "Inter", sans-serif;
  background-color: rgba(0, 0, 0, 1);
  color: white;
  padding: 10px 15px;
  margin-right: 10px;
  border-radius: 15px;
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
  display: inline-block;
  position: relative;
  opacity: 0;
  transition: background-color 0.2s ease, opacity 0.2s ease;
}

.label::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid rgba(0, 0, 0, 1);
  opacity: 1;
  pointer-events: none;
  transition: border-left-color 0.2s ease;
}

.fab-item:hover .label::after {
  border-left-color: rgba(0, 0, 0, 0.5);
}

.fab-item:hover .label {
  overflow: visible;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.5);
}

.button {
  width: 65px;
  height: 65px;
  border: 0px;
  border-radius: 45%;
  font-size: 50px;
  color: white;
  z-index: 1;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
}

.button:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.35);
}

.main-button {
  background-color: #c0c0c0;
  z-index: 2;
  position: relative;
}

.main-button:hover {
  background-color: #aeaeae;
  color: #e6e6e6;
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
  background-color: #b7b7b7 !important;
  width: 55px;
  height: 55px;
  font-size: 26px;
  color: #fff;
  transition: transform 0.4s ease, opacity 0.4s ease;
  margin-bottom: 10px;
  margin-left: 5px;
}

.small-button:hover {
  color: #fff;
  background-color: #a8a8a8 !important;
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
