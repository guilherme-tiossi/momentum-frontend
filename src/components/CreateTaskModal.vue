<template>
  <transition name="fade-zoom">
    <div v-show="show" class="modal-overlay">
      <div class="card-edit" v-click-outside="handleClickOutside">
        <div class="close-button-wrapper">
          <button class="close-button" @click="$emit('close')">x</button>
        </div>
        <h4>New Task</h4>
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
                <input
                  type="text"
                  class="form-control mb-3 custom-input"
                  placeholder="MM/DD/YYYY"
                  v-model="date"
                  @input="onDateInput"
                  @keydown="onDateKeyDown"
                  maxlength="10"
                />
              </div>
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
import { nextTick } from "vue";
import { getAuthStore } from "../stores/auth";
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({ show: Boolean });
const emit = defineEmits(["close"]);

const task = ref("");
const description = ref("");
const date = ref("");

let _prevValue = "";
let _prevCursor = 0;

const handleClickOutside = () => {
  emit("close");
};

const isValidDate = (mm, dd, yyyy) => {
  const month = parseInt(mm);
  const day = parseInt(dd);
  const year = parseInt(yyyy);

  if (isNaN(month) || isNaN(day) || isNaN(year)) return false;
  if (month < 1 || month > 12) return false;

  const daysInMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= daysInMonth;
};

const create = async () => {
  const parts = date.value.split("/");

  if (parts.length !== 3) {
    alert("Please enter the date in MM/DD/YYYY format.");
    return;
  }

  const [mm, dd, yyyy] = parts;

  if (!isValidDate(mm, dd, yyyy)) {
    alert("Invalid date. Please check the values.");
    return;
  }

  const formattedDate = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;

  const attributes = {
    title: task.value,
    description: description.value,
    date: formattedDate,
  };

  const userData = {
    data: {
      type: "tasks",
      attributes,
    },
  };

  try {
    const response = await api.post("/api/tasks", userData);
    emit("close");
  } catch (error) {
    console.error("Edit failed:", error);
    emit("close");
  }
};

const onDateKeyDown = (e) => {
  _prevValue = date.value;
  _prevCursor = e.target.selectionStart;
};

const onDateInput = (e) => {
  const input = e.target;
  const raw = input.value;
  const cursor = input.selectionStart;
  const type = e.inputType;

  let val = raw.replace(/\D/g, "").slice(0, 8);

  let formatted = "";
  if (val.length >= 1) formatted += val.substring(0, 2);
  if (val.length >= 3) formatted += "/" + val.substring(2, 4);
  if (val.length >= 5) formatted += "/" + val.substring(4, 8);

  date.value = formatted;

  let newPos = cursor;
  if (type === "deleteContentBackward") {
    newPos = _prevCursor - 1;
  } else {
    const before = (_prevValue.slice(0, _prevCursor).match(/\//g) || []).length;
    const after = (formatted.slice(0, newPos).match(/\//g) || []).length;
    newPos = newPos + (after - before);
  }

  nextTick(() => {
    newPos = Math.max(0, Math.min(formatted.length, newPos));
    input.setSelectionRange(newPos, newPos);
  });
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
