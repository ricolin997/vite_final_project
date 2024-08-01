<template>
  <div>DashBoard</div>
</template>

<script>
import { useStore } from '@/stores/index'
import { useRouter } from 'vue-router' // 導入 useRouter
import { onMounted } from 'vue'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

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

    onMounted(verifyAuth)

    return {}
  }
}
</script>
