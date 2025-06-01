<template>
  <div class="custom-select-wrapper" @click="toggleDropdown" ref="wrapper">
    <div class="custom-select-input">
      <span>{{ selectedLabel }}</span>
      <svg
        class="arrow"
        width="10"
        height="6"
        viewBox="0 0 10 6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1l4 4 4-4"
          stroke="#676767"
          stroke-width="1.5"
          fill="none"
          fill-rule="evenodd"
        />
      </svg>
    </div>
    <div v-if="isOpen" class="custom-select-dropdown">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="custom-select-option"
        @click.stop="selectOption(option.value)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const wrapper = ref(null);

const selectedLabel = computed(() => {
  const found = props.options.find((o) => o.value === props.modelValue);
  return found ? found.label : "Select...";
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (value) => {
  emit("update:modelValue", value);
  isOpen.value = false;
};

const clickOutside = (e) => {
  if (wrapper.value && !wrapper.value.contains(e.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("mousedown", clickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("mousedown", clickOutside);
});
</script>

<style scoped>
.custom-select-wrapper {
  position: relative;
  width: 100%;
}

.custom-select-input {
  background-color: #d0d0d0;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  font-family: "Inter", sans-serif;
  cursor: pointer;
  user-select: none;
}

.custom-select-input:hover {
  background-color: #c5c5c5;
}

.arrow {
  pointer-events: none;
}

.custom-select-dropdown {
  position: absolute;
  top: 55px;
  left: 0;
  width: 100%;
  background-color: #d0d0d0;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 100;
  max-height: 300px;
  overflow-y: auto;
}

.custom-select-option {
  padding: 12px 15px;
  font-family: "Inter", sans-serif;
  cursor: pointer;
}

.custom-select-option:hover {
  background-color: #bebebe;
}
</style>
