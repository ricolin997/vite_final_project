<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h1>管理後台登入</h1>
        <p class="subtitle">歡迎回來，請輸入您的帳號密碼</p>
      </div>

      <form class="login-form" @submit.prevent="signIn">
        <div class="form-group">
          <label for="inputEmail">電子郵件</label>
          <div class="input-group">
            <i class="fas fa-envelope"></i>
            <input
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="請輸入電子郵件"
              required
              autofocus
              v-model.trim="user.username"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="inputPassword">密碼</label>
          <div class="input-group">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="請輸入密碼"
              required
              v-model.trim="user.password"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ errorMessage }}
        </div>

        <button class="btn-login" type="submit">
          <span>登入系統</span>
          <i class="fas fa-arrow-right"></i>
        </button>
      </form>

      <div class="login-footer">
        <p>© 2025 SHIBA HOTEL 飯店管理系統</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/stores/index'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const store = useStore()
const user = ref({ username: '', password: '' })
const router = useRouter()
const errorMessage = ref('')

const signIn = async () => {
  try {
    const response = await store.login(user.value)
    if (response.data.success) {
      router.push('/dashboard/products')
    } else {
      errorMessage.value = response.data.message
    }
  } catch (error) {
    errorMessage.value = '登入失敗：' + (error.response?.data?.message || error.message)
    console.error('登入失敗：', error)
  }
}
</script>
