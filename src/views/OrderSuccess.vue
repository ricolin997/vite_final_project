<template>
  <div class="order-success">
    <div class="container">
      <div class="success-content">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="confetti-container">
          <div class="confetti" v-for="n in 20" :key="n"></div>
        </div>
        <h2>訂單成立</h2>
        <p class="success-message">感謝您選擇 SHIBA 奢華酒店！您的預訂已成功確認。</p>

        <div class="order-details">
          <div class="order-number">
            <span class="label">訂單編號：</span>
            <span class="value">{{ orderId }}</span>
          </div>
          <p class="confirmation-note">我們已將訂單確認信發送至您的電子郵件，請查收。</p>
        </div>

        <div class="order-summary">
          <h3>訂單摘要</h3>
          <div class="summary-item">
            <div class="summary-icon">
              <i class="fas fa-calendar-alt"></i>
            </div>
            <div class="summary-text">
              <p class="summary-label">預計入住日期</p>
              <p class="summary-value">{{ formatDate(new Date()) }}</p>
            </div>
          </div>
          <div class="summary-item">
            <div class="summary-icon">
              <i class="fas fa-bed"></i>
            </div>
            <div class="summary-text">
              <p class="summary-label">客房類型</p>
              <p class="summary-value">豪華雙人房</p>
            </div>
          </div>
          <div class="summary-item">
            <div class="summary-icon">
              <i class="fas fa-user-friends"></i>
            </div>
            <div class="summary-text">
              <p class="summary-label">入住人數</p>
              <p class="summary-value">2 位成人</p>
            </div>
          </div>
        </div>

        <div class="payment-status">
          <div class="status-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="status-text">
            <h4>付款狀態：待付款</h4>
            <p>請在 24 小時內完成付款，以確保您的預訂。</p>
          </div>
        </div>

        <div class="action-buttons">
          <router-link to="/" class="home-btn">
            <i class="fas fa-home"></i>
            <span>返回首頁</span>
          </router-link>
          <router-link to="/user/products" class="browse-more-btn">
            <i class="fas fa-search"></i>
            <span>瀏覽更多客房</span>
          </router-link>
          <router-link to="/user/orders" class="payment-btn">
            <i class="fas fa-credit-card"></i>
            <span>前往付款</span>
          </router-link>
        </div>

        <div class="next-steps">
          <h3>接下來的步驟</h3>
          <div class="steps-container">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>完成付款</h4>
                <p>請在 24 小時內完成訂單付款</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>確認郵件</h4>
                <p>查收您的電子郵件確認函</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>準備入住</h4>
                <p>期待您的光臨</p>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-info">
          <p>如有任何問題，請聯絡我們：</p>
          <div class="contact-methods">
            <div class="contact-method">
              <i class="fas fa-phone"></i>
              <span>+886 2 1234 5678</span>
            </div>
            <div class="contact-method">
              <i class="fas fa-envelope"></i>
              <span>service@shibahotel.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/stores'

const route = useRoute()
const store = useStore()
const orderId = ref(route.query.orderId || 'SHIBA-' + Math.floor(Math.random() * 1000000))

// 格式化日期函數
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('zh-TW', options)
}

// 在頁面加載時清空購物車數據
onMounted(async () => {
  try {
    // 只有在購物車有商品時才執行清空操作
    if (store.cart?.length > 0) {
      // 使用 Promise.all 並行處理所有刪除操作
      await Promise.all(store.cart.map(item => store.removeCartItem(item.id)))
      
      // 重新獲取購物車數據，更新 NavBar 中的購物車圖標數量
      await store.getCart()
    }
  } catch (error) {
    console.error('清空購物車失敗：', error)
  }
})
</script>
