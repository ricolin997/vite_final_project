<!-- UserOrderDetailModal.vue -->
<template>
  <div
    class="modal fade order-modal"
    id="orderModal"
    tabindex="-1"
    aria-labelledby="orderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="orderModalLabel">訂單詳細資訊</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body loading" v-if="isLoading">
          <p>正在載入資料...</p>
        </div>
        <div class="modal-body" v-else-if="order">
          <!-- 訂單基本資訊 -->
          <div class="order-section">
            <div class="order-info">
              <div class="info-item">
                <span class="label">訂單編號：</span>
                <span class="value">{{ order.id }}</span>
              </div>
              <div class="info-item">
                <span class="label">訂單日期：</span>
                <span class="value">{{ formatDate(order.create_at) }}</span>
              </div>
            </div>
          </div>

          <!-- 顧客資訊 -->
          <div class="order-section">
            <h3 class="section-title">顧客資訊</h3>
            <div class="customer-info">
              <ul class="info-list">
                <li>
                  <span class="label">姓名：</span>
                  <span class="value">{{ order.user.name }}</span>
                </li>
                <li>
                  <span class="label">電話：</span>
                  <span class="value">{{ order.user.tel }}</span>
                </li>
                <li>
                  <span class="label">地址：</span>
                  <span class="value">{{ order.user.address }}</span>
                </li>
              </ul>
              <div class="message" v-if="order.message">
                <span class="label">留言：</span>
                <div class="value">{{ order.message }}</div>
              </div>
            </div>
          </div>

          <!-- 商品列表 -->
          <div class="order-section">
            <h3 class="section-title">預訂商品</h3>
            <div class="products-list">
              <table class="product-table">
                <thead>
                  <tr>
                    <th>商品名稱</th>
                    <th>數量</th>
                    <th>價格</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in order.products" :key="product.id">
                    <td class="product-name">{{ product.product.title }}</td>
                    <td class="product-qty">{{ product.qty }}</td>
                    <td class="product-price">NT$ {{ $formatPrice(product.final_total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 付款資訊 -->
          <div class="order-section">
            <div class="payment-info">
              <div class="payment-status">
                <span class="status-label">付款狀態:</span>
                <span class="status-value" :class="order.is_paid ? 'paid' : 'unpaid'">
                  {{ order.is_paid ? '已付款' : '未付款' }}
                </span>
                <span class="payment-method" v-if="order.is_paid">
                  ({{ order.payment_method }})
                </span>
              </div>
              <div class="total-amount">
                <span class="label">總金額：</span>
                <span class="value">NT$ {{ $formatPrice(order.total) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <PaymentButton
            v-if="order && !order.is_paid"
            :order-id="order.id"
            button-class="btn btn-primary"
            :close-modal-id="'orderModal'"
            :highlight-selector="order ? `[data-order-id='${order.id}']` : ''"
            @payment-success="handlePaymentSuccess"
          />
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import PaymentButton from '@/components/PaymentButton.vue'

// 組件名稱
defineOptions({
  name: 'UserOrderDetailModal'
})

// 定義 props
defineProps({
  order: {
    type: Object,
    default: () => null
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

// 定義事件
const emit = defineEmits(['order-paid'])

/**
 * 格式化時間戳為本地日期字符串
 * @param {Number} timestamp - Unix 時間戳 (秒)
 * @returns {String} - 格式化後的日期字符串
 */
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
}

/**
 * 清理模態框相關 DOM 元素和樣式
 */
const cleanupModalEffects = () => {
  const backdrop = document.querySelector('.modal-backdrop')
  if (backdrop) {
    backdrop.remove()
  }
  document.body.classList.remove('modal-open')
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

/**
 * 手動關閉模態框
 */
const closeModalManually = () => {
  const modalElement = document.getElementById('orderModal')
  if (!modalElement) return

  // 嘗試使用 Bootstrap API
  try {
    if (window.bootstrap) {
      const modalInstance = window.bootstrap.Modal.getInstance(modalElement)
      if (modalInstance) {
        modalInstance.hide()
        return
      }
    }
  } catch (error) {
    console.error('使用 Bootstrap API 關閉模態框失敗:', error)
  }

  // 手動清理
  modalElement.classList.remove('show')
  modalElement.style.display = 'none'
  modalElement.setAttribute('aria-hidden', 'true')
  modalElement.removeAttribute('aria-modal')

  cleanupModalEffects()
}

/**
 * 處理付款成功事件
 * @param {String} orderId - 訂單 ID
 */
const handlePaymentSuccess = (orderId) => {
  emit('order-paid', orderId)

  // 確保模態框背景被正確移除
  setTimeout(() => {
    closeModalManually()
  }, 600)
}

// 在組件掛載時，添加事件監聽
onMounted(() => {
  const modalElement = document.getElementById('orderModal')
  if (modalElement) {
    modalElement.addEventListener('hidden.bs.modal', cleanupModalEffects)
  }
})

// 在組件卸載時，移除事件監聽
onUnmounted(() => {
  const modalElement = document.getElementById('orderModal')
  if (modalElement) {
    modalElement.removeEventListener('hidden.bs.modal', cleanupModalEffects)
  }
})
</script>
