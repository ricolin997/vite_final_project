<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Vite 專案</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/dashboard/products">產品</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/dashboard/coupons">優惠券</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
          </li>
        </ul>
        <span class="navbar-text"> Navbar text with an inline element </span>
      </div>
    </div>
  </nav>
</template>

<script>
import { useStore } from '@/stores/index'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore() // 使用 store
    const router = useRouter() // 導入 useRouter

    const logout = async () => {
      try {
        await store.logOut() // 調用 store 的 logout 方法
        router.push('/login')
      } catch (error) {
        console.error('登出失敗:', error)
      }
    }

    return {
      logout
    }
  }
}
</script>
