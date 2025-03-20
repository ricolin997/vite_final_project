<template>
  <div class="dashboard-container">
    <!-- 側邊導航欄 -->
    <div class="dashboard-sidebar">
      <div class="sidebar-header">
        <h3>後台管理</h3>
      </div>
      <div class="sidebar-menu">
        <router-link to="/dashboard/products" class="menu-item">
          <i class="bi bi-box-seam"></i>
          <span>商品管理</span>
        </router-link>
        <router-link to="/dashboard/orders" class="menu-item">
          <i class="bi bi-receipt"></i>
          <span>訂單管理</span>
        </router-link>
        <router-link to="/dashboard/coupons" class="menu-item">
          <i class="bi bi-ticket-perforated"></i>
          <span>優惠券管理</span>
        </router-link>
      </div>
      <div class="sidebar-footer">
        <button class="logout-btn" @click="handleLogout">
          <i class="bi bi-box-arrow-right"></i>
          <span>登出</span>
        </button>
      </div>
    </div>

    <!-- 主要內容區域 -->
    <div class="dashboard-content">
      <div class="content-header">
        <button class="sidebar-toggle" @click="toggleSidebar">
          <i class="bi bi-list"></i>
        </button>
        <div class="user-info">
          <span>管理員</span>
        </div>
      </div>
      <div class="content-body">
        <RouterView />
      </div>
    </div>
  </div>
  <Toast :autoDismissTime="5000" />
</template>

<script>
import { useStore } from '@/stores/index'
import { useRouter } from 'vue-router'
import { onMounted, provide, ref } from 'vue'
import Toast from '../components/Toast.vue'
import emitter from '@/methods/emitter'

export default {
  components: {
    Toast // 註冊 Toast 元件
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const sidebarCollapsed = ref(false)

    // 提供 emitter
    provide('emitter', emitter)

    const verifyAuth = async () => {
      try {
        const isAuthenticated = await store.checkAuth()
        if (!isAuthenticated) {
          router.push('/login')
        } else {
          console.log('User is authenticated')
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        router.push('/login')
      }
    }

    const handleLogout = async () => {
      try {
        await store.logOut()
        emitter.emit('show-toast', { style: 'success', title: '已成功登出' })
        router.push('/login')
      } catch (error) {
        console.error('Logout error:', error)
        emitter.emit('show-toast', { style: 'error', title: '登出失敗', content: error.message })
      }
    }

    const toggleSidebar = () => {
      sidebarCollapsed.value = !sidebarCollapsed.value
      document.querySelector('.dashboard-container').classList.toggle('sidebar-collapsed')
    }

    onMounted(async () => {
      await store.initializeStore() // 確保從 Cookies 讀取 token
      verifyAuth()
    })

    return {
      handleLogout,
      toggleSidebar
    }
  }
}
</script>
