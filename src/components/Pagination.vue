<template>
  <div class="pagination">
    <button @click="prevPageSet" :disabled="currentPage <= 10">이전</button>
    <button @click="changePage(page)" v-for="page in pageSet" :key="page" :class="{ active: page === currentPage }">{{ page }}</button>
    <button @click="nextPageSet" :disabled="currentPage > 90">다음</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pageSet: {
      type: Array,
      required: true
    }
  },
  emits: ['change-page'],
  setup(props, { emit }) {
    const { currentPage, pageSet } = props;

    const changePage = (page: number) => {
      emit('change-page', page);
    };

    const prevPageSet = () => {
      if (currentPage > 10) {
        emit('change-page', Math.floor((currentPage - 1) / 10) * 10);
      }
    };

    const nextPageSet = () => {
      if (currentPage <= 90) {
        emit('change-page', Math.floor((currentPage - 1) / 10) * 10 + 11);
      }
    };

    return {
      currentPage,
      pageSet,
      changePage,
      prevPageSet,
      nextPageSet
    };
  }
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  padding: 1em 0;
}

.pagination button {
  padding: 0.5em 1em;
  margin: 0 0.25em;
}

.pagination button.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
