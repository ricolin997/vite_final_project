<template>
  <NavBar />
  <div class="container-fluid"><RouterView /></div>
  <Toast :autoDismissTime="6000" />
</template>

<script>
import NavBar from '../components/NavBar.vue'
import { useStore } from '@/stores/index'
import { useRouter } from 'vue-router' // 導入 useRouter
import { onMounted, provide } from 'vue'
import Toast from '../components/Toast.vue'
import emitter from '@/methods/emitter'

export default {
  components: {
    NavBar, // 註冊 NavBar 元件
    Toast // 註冊 Toast 元件
  },
  setup() {
    const store = useStore()
    const router = useRouter()

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
        this.$router.push('/login')
      }
    }

    onMounted(async () => {
      await store.initializeStore() // 確保從 Cookies 讀取 token
      verifyAuth()
    })

    return {}
  }
}
</script>
