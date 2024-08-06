<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            v-model.trim="user.username"
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            v-model.trim="user.password"
          />
        </div>
        <div v-if="errorMessage" class="text-danger">{{ errorMessage }}</div>
        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from '@/stores/index'
import { useRouter } from 'vue-router' // 導入 useRouter
import { ref } from 'vue'

export default {
  setup() {
    const store = useStore()
    const user = ref({ username: '', password: '' })
    const router = useRouter()
    const errorMessage = ref('')

    const signIn = async () => {
      try {
        const response = await store.login(user.value)
        console.log(response.data)
        if (response.data.success) {
          console.log('登入成功')
          router.push('/dashboard/products')
        } else {
          console.error(response.data.message) // 如果登入失敗，顯示錯誤信息
        }
      } catch (error) {
        errorMessage.value = '登入失敗：' + (error.response?.data?.message || error.message)
        console.error('登入失敗：', error)
      }
    }

    return { user, signIn, errorMessage }
  }
}
</script>
