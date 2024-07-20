<template>
  <div class="category-container">
    <SearchBar
      v-model:searchQuery="searchQuery"
      v-model:searchType="searchType"
      v-model:sortOrder="sortOrder"
      v-model:minPrice="minPrice"
      v-model:maxPrice="maxPrice"
      @search="searchProducts"
    />

    <main>
      <div class="product-list">
        <div v-for="product in displayedProducts" :key="product.id" class="product-card">
          <img :src="product.thumbnail" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.brand }}</p>
          <p>{{ product.price }}원</p>
        </div>
      </div>

      <Pagination
        :currentPage="currentPage"
        :pageSet="pageSet"
        @change-page="changePage"
      />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import Pagination from '../components/Pagination.vue';

interface Product {
  id: number;
  thumbnail: string;
  name: string;
  brand: string;
  price: number;
  date: string;
}

const searchQuery = ref<string>('');
const searchType = ref<string>('name');
const sortOrder = ref<string>('name');
const currentPage = ref<number>(1);
const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);
const products = ref<Product[]>([]);
const itemsPerPage = 20;
const totalPages = 100; // 항상 100페이지

const fetchProducts = () => {
  // 실제 데이터를 가져오는 로직은 여기에 구현합니다.
  products.value = [
    {
      id: 1,
      thumbnail: 'https://via.placeholder.com/150',
      name: '상품 1',
      brand: '브랜드 A',
      price: 10000,
      date: '2024-01-01'
    },
    // ... 추가 상품 데이터
  ];
};

const filteredProducts = computed(() => {
  return products.value
    .filter(product => {
      const query = searchQuery.value.toLowerCase();
      if (searchType.value === 'name') {
        return product.name.toLowerCase().includes(query);
      } else if (searchType.value === 'brand') {
        return product.brand.toLowerCase().includes(query);
      }
      return true;
    })
    .filter(product => {
      if (minPrice.value !== null && product.price < minPrice.value) {
        return false;
      }
      return !(maxPrice.value !== null && product.price > maxPrice.value);

    })
    .sort((a, b) => {
      if (sortOrder.value === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder.value === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortOrder.value === 'lowPrice') {
        return a.price - b.price;
      } else if (sortOrder.value === 'highPrice') {
        return b.price - a.price;
      }
      return 0;
    });
});

const displayedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

const pageSet = computed(() => {
  const start = Math.floor((currentPage.value - 1) / 10) * 10 + 1;
  const end = Math.min(start + 9, totalPages);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
});

const changePage = (page: number) => {
  currentPage.value = page;
};

const searchProducts = () => {
  currentPage.value = 1; // 검색 시 페이지를 첫 페이지로 초기화
  // 검색 로직 구현
};

onMounted(fetchProducts);

</script>

<style scoped>
.category-container {
  display: flex;
}

.main {
  flex: 1;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}

.product-card {
  width: 200px;
  border: 1px solid #ccc;
  padding: 1em;
  border-radius: 4px;
}

.product-card img {
  width: 100%;
  height: auto;
}

.product-card h3 {
  margin: 0.5em 0;
  font-size: 1.1em;
}

.product-card p {
  margin: 0.3em 0;
  color: #888;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1em;
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