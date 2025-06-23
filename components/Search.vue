<template>
  <div class="relative flex items-center space-x-2">
    <!-- Toggle Button -->
    <button
      @click="toggleSearch"
      class="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
      aria-label="Suche anzeigen/verbergen"
    >
      <svg xmlns="http://www.w3.org/2000/svg" 
        class="w-5 h-5 text-gray-600"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        viewBox="0 0 24 24" >
        <path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
    </button>

    <!-- Input Field -->
    <transition name="fade">
      <input
        v-if="showSearch"
        v-model="searchQuery"
        @input="filterList"
        type="text"
        placeholder="Filtern..."
        class="px-4 py-1 border rounded-full shadow-sm focus:outline-none focus:ring focus:border-blue-300 bg-white transition w-64"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const showSearch = ref(false)
const searchQuery = ref('')

const emit = defineEmits<{
  (e: 'filter', value: string): void
}>()

const filterList = () => {
  emit('filter', searchQuery.value)
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
