<template>
  <div class="order-details-modal">
    <!-- 背景遮罩 -->
    <div class="modal-backdrop fade show"></div>

    <!-- 訂單詳細資料彈窗 -->
    <div class="modal show" tabindex="-1" style="display: block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">訂單詳細資料</h5>
            <button type="button" class="btn-close" @click="emitClose"></button>
          </div>
          <div class="modal-body">
            <!-- 訂單標頭資訊 -->
            <div class="order-header">
              <div class="order-info">
                <div class="order-id">訂單編號: {{ order.id }}</div>
                <div class="order-date">訂單日期: {{ formatDate(order.create_at) }}</div>
              </div>
              <div class="order-status">
                <span class="status-badge" :class="order.is_paid ? 'paid' : 'unpaid'">
                  {{ order.is_paid ? '已付款' : '未付款' }}
                </span>
              </div>
            </div>

            <!-- 顧客資訊 -->
            <h6 class="section-title">顧客資訊</h6>
            <div class="customer-info">
              <div class="info-grid">
                <div class="info-item">
                  <div class="label">姓名</div>
                  <div class="value">{{ order.user.name }}</div>
                </div>
                <div class="info-item">
                  <div class="label">電話</div>
                  <div class="value">{{ order.user.tel }}</div>
                </div>
                <div class="info-item">
                  <div class="label">地址</div>
                  <div class="value">{{ order.user.address }}</div>
                </div>
                <div class="info-item" v-if="order.payment_method">
                  <div class="label">付款方式</div>
                  <div class="value">{{ order.payment_method }}</div>
                </div>
              </div>
              <div class="message" v-if="order.message">
                <div class="label">留言</div>
                <div class="value">{{ order.message }}</div>
              </div>
            </div>

            <!-- 產品列表 -->
            <h6 class="section-title">產品列表</h6>
            <div class="products-list">
              <div class="product-item" v-for="product in order.products" :key="product.id">
                <div class="product-info">
                  <div class="product-title">{{ product.product.title }}</div>
                  <div class="product-qty">x {{ product.qty }}</div>
                </div>
                <div class="product-price">${{ $formatPrice(product.total) }}</div>
              </div>
            </div>

            <!-- 訂單摘要 -->
            <h6 class="section-title">訂單摘要</h6>
            <div class="order-summary">
              <div class="summary-item">
                <div class="label">總計</div>
                <div class="value total">${{ $formatPrice(order.total) }}</div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="emitClose">關閉</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 定義 props 和 emits
defineProps({
  order: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

// 格式化日期的函數
const formatDate = (timestamp) => {
  if (!timestamp) return '無日期資料'
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 統一關閉模態框的方法
const emitClose = () => {
  emit('close')
}
</script>
