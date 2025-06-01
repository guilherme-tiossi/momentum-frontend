<template>
  <transition name="fade-zoom">
    <div v-show="show" class="modal-overlay">
      <div class="card-edit" v-click-outside="handleClickOutside">
        <div class="close-button-wrapper">
          <button class="close-button" @click="$emit('close')">x</button>
        </div>
        <h4>New Recurrent Task</h4>
        <div class="row g-0">
          <div class="col-md-12 d-flex flex-column justify-content-center p-4">
            <div class="row">
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control mb-3 custom-input"
                  placeholder="Task"
                  v-model="task"
                />
              </div>
              <div class="col-md-6">
                <CustomSelect
                  class="mb-3"
                  v-model="recurrencyType"
                  :options="[
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'custom', label: 'Custom' },
                  ]"
                />
              </div>
            </div>

            <div v-if="recurrencyType === 'custom'" class="mb-3">
              <DaySelector v-model="selectedDays" />
            </div>

            <input
              type="text"
              class="form-control mb-3 custom-input"
              placeholder="Description"
              v-model="description"
            />

            <button class="btn w-100 mb-2 custom-button" @click="create">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import api from "../api/http";
import DaySelector from "./DaySelector.vue";
import CustomSelect from "./CustomSelect.vue";
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({ show: Boolean });
const emit = defineEmits(["close"]);

const task = ref("");
const description = ref("");
const recurrencyType = ref("daily");
const selectedDays = ref([]);

const daysOfWeekOptions = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const handleClickOutside = () => {
  emit("close");
};

const create = async () => {
  const attributes = {
    title: task.value,
    description: description.value,
    recurrency_type: recurrencyType.value,
  };

  if (recurrencyType.value === "custom") {
    if (selectedDays.value.length === 0) {
      alert("Please select at least one day for custom recurrency.");
      return;
    }
    attributes.days_of_week = selectedDays.value.map(Number);
  }

  const taskData = {
    data: {
      type: "recurrent_tasks",
      attributes,
    },
  };

  try {
    await api.post("/api/recurrent_tasks", taskData);

    selectedDays.value = [];
    emit("created_rectask");
    emit("close");
    task.value = "";
    description.value = "";
    recurrencyType.value = "daily";
  } catch (error) {
    console.error("Task creation failed:", error);
    emit("close");
  }
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
