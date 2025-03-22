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

<script setup>
import NavBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/Footer.vue'
</script>

