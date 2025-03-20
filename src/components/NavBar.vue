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

<script>
import { useStore } from '@/stores'

export default {
  name: 'NavBar',
  setup() {
    const store = useStore()

    return {
      store
    }
  },
  data() {
    return {
      isScrolled: false,
      isMenuOpen: false
    }
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/'
    },
    isProductsPage() {
      return this.$route.path.includes('/user/products')
    },
    isFacilitiesPage() {
      return this.$route.path === '/facilities'
    },
    isAttractionsPage() {
      return this.$route.path === '/attractions'
    },
    isGalleryPage() {
      return this.$route.path === '/gallery'
    },
    isMemberPage() {
      return this.$route.path.includes('/user/member')
    },
    cartItemCount() {
      // 從 store 獲取購物車數量
      return this.store?.cart?.length || 0
    }
  },
  watch: {
    // 監聽路由變化
    $route() {
      // 路由變化時重新檢查滾動狀態
      this.handleScroll()
      // 路由變化時關閉選單
      if (this.isMenuOpen) {
        this.closeMenu()
      }
    },
    // 監聽購物車數據變化
    'store.cart': {
      handler() {
        // 購物車數據變化時，強制更新 cartItemCount
        this.$forceUpdate()
      },
      deep: true
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    // 初始化時立即檢查滾動狀態
    this.handleScroll()

    // 添加ESC鍵關閉選單
    document.addEventListener('keydown', this.handleKeyDown)

    // 確保購物車數據已加載
    this.loadCartData()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    document.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    // 加載購物車數據
    async loadCartData() {
      try {
        await this.store.getCart()
      } catch (error) {
        console.error('獲取購物車數據失敗：', error)
      }
    },
    handleScroll() {
      // 當滾動超過100px時，添加scrolled類
      this.isScrolled = window.scrollY > 100
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      // 當選單打開時，禁止背景滾動
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    closeMenu() {
      this.isMenuOpen = false
      document.body.style.overflow = ''
    },
    handleKeyDown(e) {
      // 按ESC鍵關閉選單
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu()
      }
    },
    goToHome() {
      // 如果不在首頁，則導航到首頁
      if (!this.isHomePage) {
        this.$router.push('/')
      } else {
        // 如果已經在首頁，則手動滾動到頂部
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }
      // 如果選單是打開的，則關閉選單
      if (this.isMenuOpen) {
        this.closeMenu()
      }
    }
  }
}
</script>
