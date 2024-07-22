<!-- src/views/EmailVerifyView.vue -->
<template>
  <div class="verify-container">
    <div class="spinner"></div>
    <p>Verifying your email...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStatusStore } from '@/state/store'

const route = useRoute()
const router = useRouter()
const statusStore = useStatusStore()


onMounted(async () => {
  const code = route.query.code as string
  fetch(`http://localhost:8080/api/v2/auth/verified/${code}`)
    .then(res => {
        if (res.status === 200) {
          statusStore.setSuccess(true)
        }
        router.push({ name: 'VerifiedCompleteView' })
      }
    )
})
</script>

<style scoped>
.verify-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
