<template>
  <div class="login-container">
    <h1>로그인</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">이메일:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">비밀번호:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">로그인</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref<string>('');
const password = ref<string>('');
const router = useRouter();

const login = () => {
  fetch('localhost:8080/api/v2/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email.value, password: password.value })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('token', data.entity.accessToken);
        router.push({ name: 'MainPage' });
      } else {
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('로그인 과정에서 오류가 발생했습니다. 다시 시도해주세요.');
    });
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 1em;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input {
  width: 100%;
  padding: 0.5em;
  box-sizing: border-box;
}

button {
  padding: 0.5em 1em;
}
</style>
