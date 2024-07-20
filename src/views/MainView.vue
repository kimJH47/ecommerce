<template>
  <div class="main-container">
    <header>
      <h1>쇼핑몰</h1>
      <NavBar />
    </header>
    <main>
      <p>여기에 메인 콘텐츠가 들어갑니다.</p>
    </main>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue'
</script>

<style scoped>
.main-container {
  width: 100%;
  margin: 0 auto;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 1em;
  margin-bottom: 1em;
}

h1 {
  margin: 0;
  padding: 0.5em 0;
}
</style>