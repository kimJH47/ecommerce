<template>
  <nav class="navbar">
    <div class="navbar-left">
      <RouterLink to="/">쇼핑몰</RouterLink>
      <RouterLink to="/category/top">상의</RouterLink>
      <RouterLink to="/category/outer">아우터</RouterLink>
      <RouterLink to="/category/shoes">신발</RouterLink>
      <RouterLink to="/category/accessory">악세사리</RouterLink>
      <RouterLink to="/category/pants">바지</RouterLink>
      <RouterLink to="/category/dress">원피스</RouterLink>
    </div>
    <div class="navbar-right">
      <RouterLink v-if="!isLoggedIn" to="/login">로그인</RouterLink>
      <span v-if="isLoggedIn" @click="logout" class="logout-link">로그아웃</span>
      <RouterLink to="/signup">회원가입</RouterLink>
      <RouterLink to="/cart">장바구니</RouterLink>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const isLoggedIn = ref(false)

const checkAuth = () => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
}

const logout = () => {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  // 페이지 새로고침을 통해 상태 초기화
  window.location.reload()
}

onMounted(() => {
  checkAuth()
})

</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background-color: #333;
  color: white;
}

.navbar-left, .navbar-right {
  display: flex;
  align-items: center;
}

.navbar-left a, .navbar-right a, .navbar-right .logout-link {
  margin-left: 1em;
  color: white;
  text-decoration: none;
  cursor: pointer;
}

.navbar-right .logout-link {
  cursor: pointer;
}

.navbar a:hover, .navbar .logout-link:hover {
  text-decoration: underline;
}
</style>