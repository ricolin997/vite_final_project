<template>
  <Loading :active="isLoading" />
  <div class="user-checkout">
    <div class="container">
      <div class="checkout-header">
        <h2>完成您的預訂</h2>
        <p class="subtitle">請填寫以下資訊以確認您的奢華住宿體驗</p>
      </div>

      <div class="checkout-content">
        <div class="checkout-form-container">
          <div class="form-header">
            <h3>訂購資訊</h3>
            <div class="secure-info">
              <i class="fas fa-lock"></i>
              <span>安全加密</span>
            </div>
          </div>

          <form @submit.prevent="submitOrder" class="checkout-form">
            <div class="form-group">
              <label for="name">姓名</label>
              <input
                type="text"
                id="name"
                v-model="orderData.name"
                placeholder="請輸入您的姓名"
                required
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">電子郵件</label>
                <input
                  type="email"
                  id="email"
                  v-model="orderData.email"
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div class="form-group">
                <label for="tel">聯絡電話</label>
                <input
                  type="tel"
                  id="tel"
                  v-model="orderData.tel"
                  placeholder="請輸入您的聯絡電話"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="address">地址</label>
              <input
                type="text"
                id="address"
                v-model="orderData.address"
                placeholder="請輸入您的詳細地址"
                required
              />
            </div>

            <div class="form-group">
              <label for="message">特殊需求或備註</label>
              <textarea
                id="message"
                v-model="orderData.message"
                placeholder="若您有任何特殊需求或備註，請在此說明"
                rows="4"
              ></textarea>
            </div>

            <div class="form-divider"></div>

            <div class="payment-section">
              <h4>付款方式</h4>

              <div class="payment-methods">
                <div
                  class="payment-method"
                  :class="{ active: paymentMethod === 'credit' }"
                  @click="paymentMethod = 'credit'"
                >
                  <div class="method-radio">
                    <div class="radio-inner" v-if="paymentMethod === 'credit'"></div>
                  </div>
                  <div class="method-info">
                    <span>信用卡付款</span>
                    <div class="card-icons">
                      <i class="fab fa-cc-visa"></i>
                      <i class="fab fa-cc-mastercard"></i>
                      <i class="fab fa-cc-amex"></i>
                      <i class="fab fa-cc-jcb"></i>
                    </div>
                  </div>
                </div>

                <div
                  class="payment-method"
                  :class="{ active: paymentMethod === 'transfer' }"
                  @click="paymentMethod = 'transfer'"
                >
                  <div class="method-radio">
                    <div class="radio-inner" v-if="paymentMethod === 'transfer'"></div>
                  </div>
                  <div class="method-info">
                    <span>銀行轉帳</span>
                  </div>
                </div>
              </div>

              <div class="credit-card-form" v-if="paymentMethod === 'credit'">
                <div class="form-row">
                  <div class="form-group full-width">
                    <label for="card-number">卡號</label>
                    <input
                      type="text"
                      id="card-number"
                      v-model="cardInfo.number"
                      placeholder="1234 5678 9012 3456"
                      maxlength="19"
                      @input="formatCardNumber"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="card-name">持卡人姓名</label>
                    <input
                      type="text"
                      id="card-name"
                      v-model="cardInfo.name"
                      placeholder="請輸入持卡人姓名"
                    />
                  </div>

                  <div class="form-group card-expiry">
                    <label for="card-expiry">有效期限</label>
                    <input
                      type="text"
                      id="card-expiry"
                      v-model="cardInfo.expiry"
                      placeholder="MM/YY"
                      maxlength="5"
                      @input="formatCardExpiry"
                    />
                  </div>

                  <div class="form-group card-cvv">
                    <label for="card-cvv">CVV</label>
                    <input
                      type="text"
                      id="card-cvv"
                      v-model="cardInfo.cvv"
                      placeholder="123"
                      maxlength="3"
                    />
                  </div>
                </div>
              </div>

              <div class="bank-transfer-info" v-if="paymentMethod === 'transfer'">
                <p>請在完成訂單後，將款項轉帳至以下帳戶：</p>
                <div class="bank-details">
                  <div class="bank-detail-item">
                    <span class="label">銀行名稱：</span>
                    <span class="value">SHIBA國際銀行</span>
                  </div>
                  <div class="bank-detail-item">
                    <span class="label">帳戶名稱：</span>
                    <span class="value">SHIBA奢華酒店</span>
                  </div>
                  <div class="bank-detail-item">
                    <span class="label">帳號：</span>
                    <span class="value">1234-5678-9012-3456</span>
                  </div>
                </div>
                <p class="note">
                  * 請在轉帳備註中填寫您的訂單號碼，我們將在確認款項後處理您的訂單。
                </p>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="submit-btn">
                <span>確認訂單</span>
                <i class="fas fa-check-circle"></i>
              </button>
              <router-link to="/user/cart" class="back-to-cart">
                <i class="fas fa-arrow-left"></i>
                <span>返回購物車</span>
              </router-link>
            </div>

            <div class="error-message" v-if="errorMessage">
              <i class="fas fa-exclamation-circle"></i>
              {{ errorMessage }}
            </div>
          </form>
        </div>

        <div class="order-summary">
          <div class="summary-content">
            <h3>訂單摘要</h3>

            <div class="order-items">
              <div class="order-item" v-for="item in cart" :key="item.id">
                <div class="item-image">
                  <img :src="item.product.imageUrl" :alt="item.product.title" />
                </div>
                <div class="item-info">
                  <h4>{{ item.product.title }}</h4>
                  <div class="item-details">
                    <span class="quantity">{{ item.qty }} 晚</span>
                    <span class="price">{{ formatPrice(item.qty * item.product.price) }} 元</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-rows">
              <div class="summary-row">
                <span>商品總計</span>
                <span>{{ formatPrice(subtotal) }} 元</span>
              </div>
              <div class="summary-row">
                <span>稅金 (5%)</span>
                <span>{{ formatPrice(tax) }} 元</span>
              </div>
              <div class="summary-row discount" v-if="discount > 0">
                <span>優惠折扣</span>
                <span>-{{ formatPrice(discount) }} 元</span>
              </div>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-row total">
              <span>總計金額</span>
              <div class="price-display">
                <span class="original-price" v-if="discount > 0"
                  >{{ formatPrice(originalTotal) }} 元</span
                >
                <span class="final-price">{{ formatPrice(finalTotal) }} 元</span>
              </div>
            </div>

            <div class="terms-agreement">
              <p>
                完成訂單即表示您同意我們的<router-link to="/privacy">隱私政策</router-link
                >和<router-link to="/terms">使用條款</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from '@/stores'
import { useRouter } from 'vue-router'


const store = useStore()
const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')
const paymentMethod = ref('credit')

// 訂單基本資料
const orderData = ref({
  name: '',
  email: '',
  tel: '',
  address: '',
  message: ''
})

// 信用卡資料
const cardInfo = ref({
  number: '',
  name: '',
  expiry: '',
  cvv: ''
})

// 購物車數據
const cart = computed(() => store.cart || [])
const cartTotal = computed(() => store.cartTotal || 0)

// 計算商品小計（不含稅）
const subtotal = computed(() => {
  return Math.round(cartTotal.value / 1.05)
})

// 計算稅金
const tax = computed(() => {
  return cartTotal.value - subtotal.value
})

// 優惠碼相關
const discount = ref(0)
const originalTotal = ref(0)

const finalTotal = computed(() => {
  return cartTotal.value - discount.value
})

/**
 * 格式化信用卡卡號
 * 每4位數字後添加空格
 */
const formatCardNumber = () => {
  // 移除所有非數字字符
  let value = cardInfo.value.number.replace(/\D/g, '')
  // 每4位數字後添加空格
  let formattedValue = ''
  for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedValue += ' '
    }
    formattedValue += value[i]
  }
  cardInfo.value.number = formattedValue
}

/**
 * 格式化信用卡有效期限
 * 格式化為 MM/YY
 */
const formatCardExpiry = () => {
  // 移除所有非數字字符
  let value = cardInfo.value.expiry.replace(/\D/g, '')
  // 格式化為 MM/YY
  if (value.length > 2) {
    cardInfo.value.expiry = value.substring(0, 2) + '/' + value.substring(2)
  } else {
    cardInfo.value.expiry = value
  }
}

/**
 * 格式化價格顯示，加上千分位逗號
 * @param {Number} price - 價格
 * @returns {String} - 格式化後的價格字串
 */
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 驗證訂單輸入是否完整
 * @returns {Object} - 包含驗證結果和錯誤訊息
 */
const validateOrderInput = () => {
  // 驗證購物車是否為空
  if (!cart.value || cart.value.length === 0) {
    return { valid: false, errorMsg: '購物車是空的，請先添加商品' }
  }

  // 驗證基本訂單資料
  if (
    !orderData.value.name ||
    !orderData.value.email ||
    !orderData.value.tel ||
    !orderData.value.address
  ) {
    return { valid: false, errorMsg: '請填寫所有必填欄位' }
  }

  // 信用卡付款方式驗證
  if (paymentMethod.value === 'credit') {
    if (
      !cardInfo.value.number ||
      !cardInfo.value.name ||
      !cardInfo.value.expiry ||
      !cardInfo.value.cvv
    ) {
      return { valid: false, errorMsg: '請填寫完整的信用卡資訊' }
    }
  }

  return { valid: true, errorMsg: '' }
}

/**
 * 提交訂單
 */
const submitOrder = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    // 驗證輸入
    const { valid, errorMsg } = validateOrderInput()
    if (!valid) {
      throw new Error(errorMsg)
    }

    // 添加付款方式到訂單資料
    const orderDataWithPayment = {
      ...orderData.value,
      paymentMethod: paymentMethod.value
    }

    // 呼叫結帳 API
    const response = await store.createOrder(orderDataWithPayment)

    if (!response || !response.orderId) {
      throw new Error('訂單建立失敗，請重試')
    }

    // 跳轉到訂單成功頁面
    router.push({
      path: '/user/order-success',
      query: { orderId: response.orderId }
    })
  } catch (error) {
    console.error('訂單建立失敗：', error)
    errorMessage.value = error.message || '訂單建立失敗，請重試'
  } finally {
    isLoading.value = false
  }
}

/**
 * 處理優惠碼折扣
 * @param {Object} cartData - 購物車數據
 */
const handleDiscount = (cartData) => {
  if (cartData && cartData.final_total !== undefined && cartData.total !== undefined) {
    // 如果 final_total 小於 total，表示有優惠碼套用
    if (cartData.final_total < cartData.total) {
      originalTotal.value = cartData.total
      discount.value = cartData.total - cartData.final_total
    }
  }
}

onMounted(async () => {
  isLoading.value = true
  try {
    // 獲取購物車資料
    const cartData = await store.getCart()

    // 檢查購物車是否為空
    if (!cart.value || cart.value.length === 0) {
      router.push('/user/products')
      return
    }

    // 檢查是否有優惠碼套用
    handleDiscount(cartData)
  } catch (error) {
    console.error('獲取購物車資料失敗：', error)
    errorMessage.value = '獲取購物車資料失敗'
    // 導航到產品頁面
    router.push('/user/products')
  } finally {
    isLoading.value = false
  }
})
</script>
