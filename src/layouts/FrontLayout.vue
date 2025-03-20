<template>
  <div class="front-layout">
    <!-- 導航欄 -->
    <NavBar />

    <!-- 主要內容區域 -->
    <main>
      <RouterView />
    </main>

    <!-- 頁腳 -->
    <SiteFooter />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/Footer.vue'

export default {
  name: 'FrontLayout',
  components: {
    NavBar,
    SiteFooter
  }
}
</script>

<style scoped>
.front-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
