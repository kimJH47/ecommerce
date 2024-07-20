<!-- src/views/VerifiedCompleteView.vue -->
<template>
  <div class="complete-container">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
    <div v-else>
      <p v-if="isSuccess">인증이 성공적으로 완료 되었습니다.</p>
      <p v-else>인증에 실패 하였습니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loading = ref(true)
const isSuccess = ref(false)

onMounted(() => {
  loading.value = false
  isSuccess.value = route.query.isSucess === 'true'
})
</script>

<style scoped>
.complete-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spinner {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

p {
  font-size: 1.5em;
  color: #333;
}
</style>
