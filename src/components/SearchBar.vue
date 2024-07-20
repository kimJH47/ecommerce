<template>
  <aside class="filter-bar">
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="검색" />
      <select v-model="searchType">
        <option value="name">상품명</option>
        <option value="brand">브랜드명</option>
      </select>
      <button @click="searchProducts">검색</button>
    </div>
    <div class="filter-options">
      <div>
        <label>
          <input type="radio" v-model="selectedSortOrder" value="name" />
          이름순
        </label>
        <label>
          <input type="radio" v-model="selectedSortOrder" value="date" />
          최근 등록순
        </label>
        <label>
          <input type="radio" v-model="selectedSortOrder" value="lowPrice" />
          낮은 가격순
        </label>
        <label>
          <input type="radio" v-model="selectedSortOrder" value="highPrice" />
          높은 가격순
        </label>
      </div>
      <div class="price-range">
        <label>가격 범위:</label>
        <input v-model.number="minPrice" placeholder="최소 가격" type="number" />
        <input v-model.number="maxPrice" placeholder="최대 가격" type="number" />
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SearchBar',
  setup() {
    const searchQuery = ref<string>('');
    const searchType = ref<string>('name');
    const selectedSortOrder = ref<string>('name');
    const minPrice = ref<number | null>(null);
    const maxPrice = ref<number | null>(null);

    const searchProducts = () => {
      // 이벤트를 발생시켜 부모 컴포넌트에 검색을 알리도록 구현할 수 있습니다.
      console.log('검색 실행:', searchQuery.value, searchType.value);
    };

    return {
      searchQuery,
      searchType,
      selectedSortOrder,
      minPrice,
      maxPrice,
      searchProducts
    };
  }
});
</script>

<style scoped>
.filter-bar {
  width: 220px;
  border-right: 1px solid #ccc;
  padding: 1em;
  background-color: #f9f9f9;
}

.search-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1em;
}

.search-bar input {
  padding: 0.5em;
  margin-bottom: 0.5em;
}

.search-bar select {
  padding: 0.5em;
  margin-bottom: 0.5em;
}

.search-bar button {
  padding: 0.5em 1em;
}

.filter-options {
  margin-top: 1em;
}

.filter-options label {
  display: block;
  margin: 0.5em 0;
}

.price-range {
  margin-top: 1em;
}

.price-range input {
  width: calc(100% - 2em);
  margin: 0.5em 0;
  padding: 0.5em;
}
</style>