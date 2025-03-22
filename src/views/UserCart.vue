<template>
  <Loading :active="isLoading" />
  <div class="user-cart">
    <div class="container">
      <div class="cart-header">
        <h2>您的精選購物車</h2>
        <p class="subtitle">為您的奢華住宿體驗提供尊貴服務</p>
      </div>

      <div class="cart-content" v-if="cart && cart.length > 0">
        <div class="cart-items-container">
          <div class="cart-items-header">
            <h3>已選擇的客房</h3>
            <div class="cart-items-count">{{ cart.length }} 間客房</div>
          </div>

          <div class="cart-items">
            <div class="cart-item" v-for="item in cart" :key="item.id">
              <div class="item-image">
                <img :src="item.product.imageUrl" :alt="item.product.title" />
                <div class="image-overlay"></div>
              </div>
              <div class="item-details">
                <h3 class="item-title">{{ item.product.title }}</h3>
                <p class="item-description" v-if="item.product.description">
                  {{ item.product.description }}
                </p>
                <div class="item-features" v-if="item.product.features">
                  <span
                    v-for="(feature, index) in item.product.features"
                    :key="index"
                    class="feature-tag"
                  >
                    {{ feature }}
                  </span>
                </div>
              </div>
              <div class="item-quantity">
                <button
                  class="quantity-btn"
                  @click="decreaseQuantity(item)"
                  :disabled="item.qty <= 1"
                >
                  <i class="fas fa-minus"></i>
                </button>
                <input
                  type="number"
                  v-model.number="item.qty"
                  min="1"
                  @change="updateCartQuantity(item.id, item.qty)"
                />
                <button class="quantity-btn" @click="increaseQuantity(item)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <div class="item-price">
                <p class="price">
                  {{ formatPrice(item.product.price) }} 元<span class="price-unit">/晚</span>
                </p>
                <p class="subtotal">小計: {{ formatPrice(item.qty * item.product.price) }} 元</p>
              </div>
              <div class="item-remove">
                <button class="remove-btn" @click="removeItem(item.id)">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <div class="summary-content">
            <h3>訂單摘要</h3>

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

            <div class="coupon-section">
              <h4>優惠碼</h4>
              <div class="coupon-input">
                <input
                  type="text"
                  v-model="couponCode"
                  :placeholder="appliedCoupon ? '已套用優惠碼' : '請輸入優惠碼'"
                  :disabled="appliedCoupon || isApplyingCoupon"
                  :class="{ applied: appliedCoupon }"
                />
                <button
                  class="apply-coupon"
                  @click="applyCoupon"
                  :disabled="!couponCode || appliedCoupon || isApplyingCoupon"
                  :class="{ applied: appliedCoupon }"
                >
                  <span v-if="!isApplyingCoupon">{{ appliedCoupon ? '已套用' : '套用' }}</span>
                  <i v-else class="fas fa-spinner fa-spin"></i>
                </button>
              </div>
              <div
                class="coupon-message"
                :class="{ success: couponSuccess, error: couponError }"
                v-if="couponMessage"
              >
                <i :class="couponSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
                {{ couponMessage }}
              </div>
              <button class="remove-coupon" v-if="appliedCoupon" @click="removeCoupon">
                移除優惠碼
              </button>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-row total">
              <span>總計金額</span>
              <div class="price-display">
                <span class="original-price" v-if="discount > 0"
                  >{{ formatPrice(store.cartTotal) }} 元</span
                >
                <span class="final-price">{{ formatPrice(finalTotal) }} 元</span>
              </div>
            </div>

            <div class="checkout-actions">
              <router-link to="/user/checkout" class="checkout-btn">
                <span>前往結帳</span>
                <i class="fas fa-arrow-right"></i>
              </router-link>
              <router-link to="/user/products" class="continue-shopping">
                <i class="fas fa-chevron-left"></i>
                <span>繼續購物</span>
              </router-link>
            </div>

            <div class="secure-checkout">
              <i class="fas fa-lock"></i>
              <span>安全結帳</span>
            </div>

            <div class="payment-methods">
              <i class="fab fa-cc-visa"></i>
              <i class="fab fa-cc-mastercard"></i>
              <i class="fab fa-cc-amex"></i>
              <i class="fab fa-cc-jcb"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="empty-cart" v-else-if="!cart || cart.length === 0">
        <div class="empty-cart-content">
          <i class="fas fa-shopping-cart"></i>
          <h3>您的購物車是空的</h3>
          <p>瀏覽我們的客房選擇，為您的旅程找到完美的住宿</p>
          <router-link to="/user/products" class="browse-rooms-btn">
            <span>瀏覽客房</span>
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from '@/stores'

// 組件名稱
defineOptions({
  name: 'UserCartView'
})

const store = useStore()
const isLoading = ref(true)
const cart = computed(() => store.cart)

// 計算商品小計（不含稅）
const subtotal = computed(() => {
  // 使用 store.cartTotal 作為含稅總價，稅率為 5%
  return Math.round((store.cartTotal || 0) / 1.05)
})

// 計算稅金
const tax = computed(() => {
  return (store.cartTotal || 0) - subtotal.value
})

// 優惠碼相關
const couponCode = ref('')
const discount = ref(0)
const couponMessage = ref('')
const appliedCoupon = ref(false)
const isApplyingCoupon = ref(false)
const couponSuccess = ref(false)
const couponError = ref(false)
const originalTotal = ref(0)

const finalTotal = computed(() => {
  return (store.cartTotal || 0) - discount.value
})

/**
 * 執行通用購物車操作，處理載入狀態和錯誤情況
 * @param {Function} action - 要執行的異步操作
 * @param {String} errorMessage - 操作失敗時顯示的錯誤訊息
 */
const executeCartAction = async (action, errorMessage) => {
  try {
    isLoading.value = true
    await action()
  } catch (error) {
    alert(errorMessage)
    console.error(`${errorMessage}:`, error)
  } finally {
    isLoading.value = false
  }
}

/**
 * 更新購物車商品數量
 * @param {String} cartId - 購物車項目ID
 * @param {Number} qty - 新數量
 */
const updateCartQuantity = async (cartId, qty) => {
  if (qty <= 0) return
  await executeCartAction(
    () => store.updateCartItem(cartId, qty),
    '更新數量失敗'
  )
}

/**
 * 增加商品數量
 * @param {Object} item - 購物車項目
 */
const increaseQuantity = (item) => {
  updateCartQuantity(item.id, item.qty + 1)
}

/**
 * 減少商品數量
 * @param {Object} item - 購物車項目
 */
const decreaseQuantity = (item) => {
  if (item.qty > 1) {
    updateCartQuantity(item.id, item.qty - 1)
  }
}

/**
 * 從購物車移除商品
 * @param {String} cartId - 購物車項目ID
 */
const removeItem = async (cartId) => {
  await executeCartAction(
    () => store.removeCartItem(cartId),
    '移除商品失敗'
  )
}

/**
 * 設定優惠碼狀態和訊息
 * @param {Boolean} isSuccess - 是否成功
 * @param {String} message - 顯示訊息
 */
const setCouponStatus = (isSuccess, message) => {
  couponMessage.value = message
  couponSuccess.value = isSuccess
  couponError.value = !isSuccess
  
  if (!isSuccess) {
    discount.value = 0
    appliedCoupon.value = false
  }
}

/**
 * 套用優惠碼
 */
const applyCoupon = async () => {
  if (!couponCode.value) return

  isApplyingCoupon.value = true
  couponMessage.value = ''
  couponSuccess.value = false
  couponError.value = false

  try {
    const response = await store.applyCoupon(couponCode.value)

    if (response.success) {
      // 保存原始總金額以便顯示對比
      originalTotal.value = store.cartTotal || 0

      // 優惠碼套用成功，更新購物車數據
      const cartResponse = await store.getCart()

      // 使用後端返回的優惠後總金額
      const finalTotalFromAPI =
        response.data?.final_total || cartResponse?.final_total || store.cartTotal

      // 計算折扣金額 (原價 - 折扣後價格)
      const discountAmount = originalTotal.value - finalTotalFromAPI
      discount.value = discountAmount > 0 ? discountAmount : 0

      // 顯示優惠信息
      const discountPercentage = Math.round((discountAmount / originalTotal.value) * 100)
      setCouponStatus(true, `優惠碼套用成功！您已獲得 ${discountPercentage}% 的折扣`)
      appliedCoupon.value = true
    } else {
      setCouponStatus(false, response.message || '優惠碼無效或已過期')
    }
  } catch (error) {
    setCouponStatus(false, error.response?.data?.message || '優惠碼套用失敗，請稍後再試')
  } finally {
    isApplyingCoupon.value = false
  }
}

/**
 * 移除優惠碼
 */
const removeCoupon = async () => {
  isApplyingCoupon.value = true

  try {
    // 使用與套用優惠碼相同的 API，但傳入空的優惠碼
    await store.applyCoupon('')
    // 重新獲取購物車數據
    await store.getCart()

    // 重置所有優惠碼相關狀態
    couponCode.value = ''
    discount.value = 0
    originalTotal.value = 0
    appliedCoupon.value = false

    // 顯示成功訊息
    setCouponStatus(true, '優惠碼已成功移除')

    // 2秒後清除訊息
    setTimeout(() => {
      couponMessage.value = ''
      couponSuccess.value = false
    }, 2000)
  } catch (error) {
    console.error('移除優惠碼失敗：', error)
    setCouponStatus(false, '移除優惠碼失敗，請稍後再試')
  } finally {
    isApplyingCoupon.value = false
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
 * 處理購物車已存在優惠碼的情況
 * @param {Object} cartData - 購物車數據
 */
const handleExistingCoupon = (cartData) => {
  if (cartData && 
      cartData.final_total !== undefined && 
      cartData.total !== undefined && 
      cartData.final_total < cartData.total) {
    
    // 保存原始總金額
    originalTotal.value = cartData.total

    // 計算折扣金額
    const discountAmount = cartData.total - cartData.final_total
    discount.value = discountAmount > 0 ? discountAmount : 0

    // 設置優惠碼狀態
    appliedCoupon.value = true
    couponSuccess.value = true
    couponError.value = false

    // 計算折扣百分比，用於顯示訊息
    const discountPercentage = Math.round((discountAmount / cartData.total) * 100)
    
    // 獲取優惠碼信息
    if (store.couponCode) {
      couponCode.value = store.couponCode
      couponMessage.value = `優惠碼套用成功！您已獲得 ${discountPercentage}% 的折扣`
    } else if (cartData.coupon && cartData.coupon.code) {
      couponCode.value = cartData.coupon.code
      couponMessage.value = `優惠碼套用成功！您已獲得 ${discountPercentage}% 的折扣`
    } else if (cartData.coupon_code) {
      couponCode.value = cartData.coupon_code
      couponMessage.value = `優惠碼套用成功！您已獲得 ${discountPercentage}% 的折扣`
    } else {
      couponMessage.value = `優惠已套用！您已獲得 ${discountPercentage}% 的折扣`
    }
  }
}

onMounted(async () => {
  try {
    // 獲取購物車數據
    const cartData = await store.getCart()

    // 檢查是否有需要自動套用的優惠碼
    const autoApplyPromoCode = localStorage.getItem('autoApplyPromoCode')
    if (autoApplyPromoCode && cart.value && cart.value.length > 0) {
      // 設置優惠碼並自動套用
      couponCode.value = autoApplyPromoCode
      await applyCoupon()
      localStorage.removeItem('autoApplyPromoCode')
    }
    // 檢查購物車是否已經套用了優惠碼
    else {
      handleExistingCoupon(cartData)
    }
  } catch (error) {
    console.error('載入購物車失敗：', error)
  } finally {
    isLoading.value = false
  }
})
</script>
