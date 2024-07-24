<template>
  <header>
    <h1>쇼핑몰</h1>
    <NavBar />
  </header>
  <div class="category-container">
    <SearchBar @search="searchProducts" />
    <main class="content">
      <div class="product-list">
        <!-- 실제 상품 카드 -->
        <div v-for="product in products" :key="product.id" class="product-card">
          <img :src="product.thumbnail" :alt="product.name" />
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p>{{ product.brandName }}</p>
            <p class="price">{{ product.price }}원</p>
          </div>
        </div>
        <!-- 빈 카드로 공간 유지 -->
        <div v-for="i in emptyCardCount" :key="'empty-' + i" class="product-card empty-card"></div>
      </div>
      <PaginationBar
        :currentPage="currentPage"
        :totalPages="totalPages"
        @update:currentPage="handlePageChange"
      />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import NavBar from '@/components/NavBar.vue'
import PaginationBar from '@/components/PaginationBar.vue'
import type { Product } from '@/services/interfaces/Product'
import { searchFirstPage, searchWithCondition } from '@/services/productService'
import { useSearchConditionStore } from '@/state/store'

const currentPage = ref<number>(1)
const products = ref<Product[]>([])
const itemsPerPage = 12 // 한 페이지에 최대 12개 상품
const totalPages = ref<number>(100) // 항상 100페이지
const route = useRoute()
const store = useSearchConditionStore()

const emptyCardCount = computed(() => {
  return Math.max(0, itemsPerPage - products.value.length)
})

const handlePageChange = (page: number) => {
  currentPage.value = page
  // 데이터 새로 고침 로직 추가
  store.page = page
  searchWithCondition(store.condition)
    .then(data => {
      products.value = data
    }).catch(err => {
    console.log(err)
  })
}

const fetchProducts = (category: string) => {
  searchFirstPage(category)
    .then(data => {
      products.value = data
    })
}

const searchProducts = () => {
  searchWithCondition(store.condition)
    .then(data => {
      currentPage.value = 1 // 검색 시 페이지를 첫 페이지로 초기화
      products.value = data
    }).catch(err => {
    console.log(err)
  })
}

onMounted(() => {
  store.$reset()
  store.category = route.params.category as string
  fetchProducts(route.params.category as string)
})

onBeforeRouteUpdate((to, from, next) => {
  store.$reset()
  currentPage.value = 1 // 카테고리 이동 시 페이지를 첫 페이지로 초기화
  store.category = to.params.category as string
  fetchProducts(to.params.category as string)
  next()
})
</script>

<style scoped>
.category-container {
  display: flex;
}

.content {
  flex: 1;
  padding: 1em;
  display: flex;
  flex-direction: column;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열 */
  gap: 1em;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1em;
  background-color: #fff;
  position: relative;
}

.product-card {
  width: 100%;
  height: 350px; /* 카드 높이 */
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1em;
  box-sizing: border-box;
}

.product-card img {
  width: 100%;
  height: 200px; /* 이미지 높이 조정 */
  object-fit: cover; /* 이미지 비율 유지 */
  margin-bottom: 1em;
}

.product-info {
  flex: 1;
}

.product-card h3 {
  margin: 0.5em 0;
  font-size: 1.2em;
  overflow: hidden; /* 텍스트 넘침 방지 */
  text-overflow: ellipsis; /* 넘침 시 생략 부호 */
  white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
}

.product-card p {
  margin: 0.3em 0;
  color: #888;
}

.price {
  font-weight: bold;
}

.empty-card {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  height: 350px; /* 카드 높이 맞춤 */
}

</style>
