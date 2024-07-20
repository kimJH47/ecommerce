<template>
  <div class="signup-container">
    <h2>회원가입</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">이메일</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
        />
      </div>
      <div class="form-group">
        <label for="nickname">닉네임</label>
        <input
          type="text"
          id="nickname"
          v-model="nickname"
          required
        />
      </div>
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import router from '@/router'

const email = ref<string>('')
const password = ref<string>('')
const nickname = ref<string>('')

const handleSubmit = async () => {
  await fetch('http://localhost:8080/api/v2/auth/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  }).then(async res => {
    if (res.status === 200) {
      alert('이메일 인증 후 회원가입을 완료해 주세요!')
      await router.push('/')
      return
    }
    let data = await res.json()
    alert(`${data.message}`)
    window.location.reload()

  }).catch(error => {
    console.log(error)
    alert(error.message)
    window.location.reload()
  })
}
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  width: 100%;
  padding: 0.7em;
  border: none;
  border-radius: 3px;
  background-color: #5cb85c;
  color: white;
  font-size: 1em;
}

button:hover {
  background-color: #4cae4c;
}
</style>
