<!-- src/views/VerifiedCompleteView.vue -->
<template>
  <div class="complete-container">
    <p v-if="statusStore.isSuccess">인증이 성공적으로 완료 되었습니다.</p>
    <p v-else>유효하지 않는 코드입니다.</p>
  </div>
</template>

<script setup lang="ts">
import { useStatusStore } from '@/state/store'

const statusStore = useStatusStore()
</script>

<style scoped>
.complete-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

p {
  font-size: 1.5em;
  color: #333;
}
</style>
