<template>
  <div class="pagination-bar">
    <button
      v-if="currentPage > 1"
      @click="goToPage(startPage - 1)"
    >
      &laquo; 이전
    </button>

    <button
      v-for="page in pagesToShow"
      :key="page"
      :class="{ active: page === currentPage }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <button
      v-if="currentPage < totalPages"
      @click="goToPage(endPage + 1)"
    >
      다음 &raquo;
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (event: 'update:currentPage', page: number): void;
}>();

const itemsPerPage = 10;

const startPage = computed(() => {
  return Math.floor((props.currentPage - 1) / itemsPerPage) * itemsPerPage + 1;
});

const endPage = computed(() => {
  return Math.min(startPage.value + itemsPerPage - 1, props.totalPages);
});

const pagesToShow = computed(() => {
  const pages: number[] = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i);
  }
  return pages;
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page);
  }
};
</script>

<style scoped>
.pagination-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em 0;
}

button {
  padding: 0.5em 1em;
  margin: 0 0.2em;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button.active {
  background-color: #555;
}

button:hover {
  background-color: #555;
}
</style>
