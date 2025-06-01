<template>
  <div class="day-selector-wrapper">
    <div
      v-for="(day, index) in days"
      :key="index"
      :class="['day-button', isSelected(index) ? 'selected' : '']"
      @click="toggleDay(index)"
    >
      {{ day }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toggleDay = (dayIndex) => {
  const selected = [...props.modelValue];
  const idx = selected.indexOf(dayIndex);

  if (idx > -1) {
    selected.splice(idx, 1);
  } else {
    selected.push(dayIndex);
  }

  emit("update:modelValue", selected);
};

const isSelected = (dayIndex) => {
  return props.modelValue.includes(dayIndex);
};
</script>

<style scoped>
.day-selector-wrapper {
  background: linear-gradient(to top, #c1c1c1, #d9d9d9);
  border-radius: 999px;
  padding: 6px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 6px;
}

.day-button {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  border-radius: 500px;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  user-select: none;
  background-color: #d0d0d0;
  transition: background-color 0.15s ease, box-shadow 0.15s ease;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.2);
}

.day-button:hover {
  background-color: #bebebe;
}

.day-button.selected {
  background-color: #b0b0b0;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.4);
}
</style>
