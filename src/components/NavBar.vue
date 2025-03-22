<template>
  <nav
    class="navbar"
    :class="{
      scrolled: isScrolled || !isHomePage,
      transparent: isHomePage && !isScrolled
    }"
  >
    <div class="logo" @click="goToHome">
      <h2>SHIBA</h2>
    </div>

    <!-- 導航連結 -->
    <div class="nav-container" :class="{ 'menu-open': isMenuOpen }">
      <!-- 關閉按鈕 -->
      <div class="close-menu" @click="toggleMenu"></div>

      <div class="nav-links">
        <router-link to="/" class="nav-link" :class="{ active: isHomePage }">首頁</router-link>
        <router-link to="/user/products" class="nav-link" :class="{ active: isProductsPage }"
          >客房</router-link
        >
        <router-link to="/facilities" class="nav-link" :class="{ active: isFacilitiesPage }"
          >設施</router-link
        >
        <router-link to="/attractions" class="nav-link" :class="{ active: isAttractionsPage }"
          >景點</router-link
        >
        <router-link to="/gallery" class="nav-link" :class="{ active: isGalleryPage }"
          >相簿</router-link
        >
      </div>
      <div class="user-actions">
        <router-link to="/user/member" class="member-btn" :class="{ active: isMemberPage }">
          <i class="fas fa-user"></i>
          <span class="member-text">會員專區</span>
        </router-link>
        <router-link to="/user/cart" class="cart-btn">
          <i class="fas fa-shopping-cart"></i>
          <span class="cart-count" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
        </router-link>
      </div>
    </div>

    <!-- 遮罩層 -->
    <div class="menu-overlay" :class="{ active: isMenuOpen }" @click="toggleMenu"></div>

    <!-- 漢堡選單按鈕 -->
    <div class="hamburger-menu" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/stores'

// 引入必要的依賴
const store = useStore()
const route = useRoute()
const router = useRouter()

// 狀態
const isScrolled = ref(false)
const isMenuOpen = ref(false)

// 計算屬性
const isHomePage = computed(() => route.path === '/')
const isProductsPage = computed(() => route.path.includes('/user/products'))
const isFacilitiesPage = computed(() => route.path === '/facilities')
const isAttractionsPage = computed(() => route.path === '/attractions')
const isGalleryPage = computed(() => route.path === '/gallery')
const isMemberPage = computed(() => route.path.includes('/user/member'))
const cartItemCount = computed(() => store?.cart?.length || 0)

// 加載購物車數據
const loadCartData = async () => {
  try {
    await store.getCart()
  } catch (error) {
    console.error('獲取購物車數據失敗：', error)
  }
}

// 處理滾動事件
const handleScroll = () => {
  // 當滾動超過100px時，添加scrolled類
  isScrolled.value = window.scrollY > 100
}

// 切換菜單
const toggleMenu = (forceClose = false) => {
  if (forceClose) {
    isMenuOpen.value = false
  } else {
    isMenuOpen.value = !isMenuOpen.value
  }
  
  // 控制背景滾動
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

// 處理ESC鍵關閉選單
const handleKeyDown = (e) => {
  // 按ESC鍵關閉選單
  if (e.key === 'Escape' && isMenuOpen.value) {
    toggleMenu(true)
  }
}

// 前往首頁
const goToHome = () => {
  // 如果不在首頁，則導航到首頁
  if (!isHomePage.value) {
    router.push('/')
  } else {
    // 如果已經在首頁，則手動滾動到頂部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  // 如果選單是打開的，則關閉選單
  if (isMenuOpen.value) {
    toggleMenu(true)
  }
}

// 監聽路由變化
watch(route, () => {
  // 路由變化時重新檢查滾動狀態
  handleScroll()
  // 路由變化時關閉選單
  if (isMenuOpen.value) {
    toggleMenu(true)
  }
})

// 掛載時的設置
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始化時立即檢查滾動狀態
  handleScroll()

  // 添加ESC鍵關閉選單
  document.addEventListener('keydown', handleKeyDown)

  // 確保購物車數據已加載
  loadCartData()
})

// 卸載前的清理
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>
