<template>
  <div class="product-detail-page">
    <!-- 頁面標題區域 -->
    <section class="page-header">
      <div class="container">
        <h1>客房詳情</h1>
        <div class="breadcrumb">
          <router-link to="/">首頁</router-link>
          <span class="separator">/</span>
          <router-link to="/user/products">客房</router-link>
          <span class="separator">/</span>
          <span class="current">{{ productTitle || '客房詳情' }}</span>
        </div>
      </div>
    </section>

    <!-- 載入中狀態 -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>載入中，請稍候...</p>
    </div>

    <!-- 主要內容區域 -->
    <section v-else-if="product" class="product-content">
      <div class="container">
        <div class="product-main">
          <!-- 左側圖片區域 -->
          <div class="product-gallery">
            <div class="main-image">
              <img :src="currentMainImage" :alt="productTitle" />
            </div>
            <div class="thumbnail-gallery">
              <div
                v-for="(image, index) in imageGallery"
                :key="index"
                class="thumbnail"
                :class="{ active: image === currentMainImage }"
                @click="changeMainImage(image)"
              >
                <img :src="image" :alt="`${productTitle} - 圖片 ${index + 1}`" />
              </div>
            </div>
          </div>

          <!-- 右側商品資訊 -->
          <div class="product-info">
            <div class="product-header">
              <h2>{{ productTitle }}</h2>
              <div class="product-rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
                <span>(4.5/5)</span>
              </div>
            </div>

            <div class="product-description">
              <p>{{ productDescription }}</p>
            </div>

            <div class="product-features">
              <div class="feature">
                <i class="fas fa-user-friends"></i>
                <span>最多2人</span>
              </div>
              <div class="feature">
                <i class="fas fa-expand-arrows-alt"></i>
                <span>45平方米</span>
              </div>
              <div class="feature">
                <i class="fas fa-bed"></i>
                <span>特大床</span>
              </div>
              <div class="feature">
                <i class="fas fa-mountain"></i>
                <span>城市景觀</span>
              </div>
            </div>

            <div class="product-amenities">
              <h3>客房設施</h3>
              <ul>
                <li><i class="fas fa-wifi"></i> 高速WiFi</li>
                <li><i class="fas fa-tv"></i> 55吋智能電視</li>
                <li><i class="fas fa-coffee"></i> Nespresso咖啡機</li>
                <li><i class="fas fa-bath"></i> 豪華浴缸</li>
                <li><i class="fas fa-snowflake"></i> 獨立空調</li>
                <li><i class="fas fa-concierge-bell"></i> 24小時客房服務</li>
              </ul>
            </div>

            <div class="product-price">
              <div class="price-info">
                <div class="original-price" v-if="productOriginPrice > productPrice">
                  原價 NT$ {{ formatPrice(productOriginPrice) }}
                </div>
                <div class="current-price">
                  NT$ {{ formatPrice(productPrice) }}
                  <span class="per-night">/ 晚</span>
                </div>
              </div>
              <div class="price-note">* 價格已包含稅金和服務費</div>
            </div>

            <div class="product-booking">
              <div class="quantity-selector">
                <label>數量</label>
                <div class="quantity-controls">
                  <button @click="decreaseQuantity" :disabled="quantity <= 1">
                    <i class="fas fa-minus"></i>
                  </button>
                  <input type="number" v-model.number="quantity" min="1" max="10" />
                  <button @click="increaseQuantity" :disabled="quantity >= 10">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div class="booking-actions">
                <button class="btn-add-cart" @click="addToCart">
                  <i class="fas fa-shopping-cart"></i> 加入購物車
                </button>
                <button class="btn-favorite" @click="toggleFavorite">
                  <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 詳細說明區域 -->
        <div class="product-details">
          <div class="details-tabs">
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'description' }"
              @click="activeTab = 'description'"
            >
              詳細說明
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'policy' }"
              @click="activeTab = 'policy'"
            >
              預訂政策
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'reviews' }"
              @click="activeTab = 'reviews'"
            >
              客戶評價
            </button>
          </div>

          <div class="tab-content">
            <!-- 詳細說明內容 -->
            <div v-show="activeTab === 'description'" class="tab-pane">
              <div
                class="product-description-content"
                v-html="productContent || defaultDescription"
              ></div>
            </div>

            <!-- 預訂政策內容 -->
            <div v-show="activeTab === 'policy'" class="tab-pane">
              <h3>預訂政策</h3>
              <div class="policy-section">
                <h4>入住與退房</h4>
                <ul>
                  <li>入住時間：下午 3:00 後</li>
                  <li>退房時間：上午 12:00 前</li>
                  <li>提前入住或延遲退房需視客房供應情況而定，可能需額外費用</li>
                </ul>
              </div>
              <div class="policy-section">
                <h4>取消政策</h4>
                <ul>
                  <li>入住日期前 7 天取消：全額退款</li>
                  <li>入住日期前 3-7 天取消：收取一晚房費</li>
                  <li>入住日期前 3 天內取消：不予退款</li>
                </ul>
              </div>
              <div class="policy-section">
                <h4>付款方式</h4>
                <ul>
                  <li>接受主要信用卡（Visa、MasterCard、JCB、American Express）</li>
                  <li>入住時需提供信用卡授權或現金押金</li>
                  <li>押金金額為每晚房費的 50%，退房時如無額外消費將全額退還</li>
                </ul>
              </div>
            </div>

            <!-- 客戶評價內容 -->
            <div v-show="activeTab === 'reviews'" class="tab-pane">
              <div class="reviews-summary">
                <div class="rating-summary">
                  <div class="average-rating">4.5</div>
                  <div class="rating-stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                  </div>
                  <div class="rating-count">基於 24 則評價</div>
                </div>
                <div class="rating-breakdown">
                  <div class="rating-item">
                    <span class="rating-label">舒適度</span>
                    <div class="rating-bar">
                      <div class="rating-fill" style="width: 90%"></div>
                    </div>
                    <span class="rating-value">4.5</span>
                  </div>
                  <div class="rating-item">
                    <span class="rating-label">清潔度</span>
                    <div class="rating-bar">
                      <div class="rating-fill" style="width: 96%"></div>
                    </div>
                    <span class="rating-value">4.8</span>
                  </div>
                  <div class="rating-item">
                    <span class="rating-label">位置</span>
                    <div class="rating-bar">
                      <div class="rating-fill" style="width: 88%"></div>
                    </div>
                    <span class="rating-value">4.4</span>
                  </div>
                  <div class="rating-item">
                    <span class="rating-label">服務</span>
                    <div class="rating-bar">
                      <div class="rating-fill" style="width: 94%"></div>
                    </div>
                    <span class="rating-value">4.7</span>
                  </div>
                  <div class="rating-item">
                    <span class="rating-label">性價比</span>
                    <div class="rating-bar">
                      <div class="rating-fill" style="width: 86%"></div>
                    </div>
                    <span class="rating-value">4.3</span>
                  </div>
                </div>
              </div>

              <div class="reviews-list">
                <div class="review-item">
                  <div class="review-header">
                    <div class="reviewer-info">
                      <div class="reviewer-avatar">
                        <img
                          src="https://randomuser.me/api/portraits/women/44.jpg"
                          alt="顧客頭像"
                        />
                      </div>
                      <div class="reviewer-details">
                        <h4>林小姐</h4>
                        <div class="review-date">2023年10月15日</div>
                      </div>
                    </div>
                    <div class="review-rating">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <span>5.0</span>
                    </div>
                  </div>
                  <div class="review-content">
                    <p>
                      房間非常舒適，設施齊全，服務人員親切專業。窗外的城市景觀令人驚艷，尤其是夜景更是美不勝收。早餐種類豐富，品質極佳。絕對會再次入住！
                    </p>
                  </div>
                </div>

                <div class="review-item">
                  <div class="review-header">
                    <div class="reviewer-info">
                      <div class="reviewer-avatar">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="顧客頭像" />
                      </div>
                      <div class="reviewer-details">
                        <h4>王先生</h4>
                        <div class="review-date">2023年9月28日</div>
                      </div>
                    </div>
                    <div class="review-rating">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="far fa-star"></i>
                      <span>4.0</span>
                    </div>
                  </div>
                  <div class="review-content">
                    <p>
                      整體來說是很好的住宿體驗，房間寬敞明亮，床鋪舒適。唯一的小缺點是浴室的水壓有點不穩定。飯店位置很好，周邊有許多餐廳和購物選擇。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 推薦客房 -->
        <div class="recommended-products">
          <h2>您可能也會喜歡</h2>
          <div class="recommended-grid">
            <div
              v-for="recProduct in recommendProducts"
              :key="recProduct.id"
              class="recommended-item"
              @click="goToProductDetail(recProduct.id)"
            >
              <div class="recommended-image">
                <img :src="recProduct.imageUrl" :alt="recProduct.title" />
              </div>
              <div class="recommended-info">
                <h3>{{ recProduct.title }}</h3>
                <div class="recommended-price">
                  NT$ {{ formatPrice(recProduct.price) }} <span>/ 晚</span>
                </div>
                <button class="btn-view">查看詳情</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/stores'
import { formatPrice } from '@/utils/format'

const route = useRoute()
const router = useRouter()
const store = useStore()

// 狀態變數
const product = ref(null)
const isLoading = ref(true)
const quantity = ref(1)
const isFavorite = ref(false)
const currentMainImage = ref(null)
const activeTab = ref('description')

// 使用計算屬性簡化產品屬性引用
const productTitle = computed(() => product.value?.title || '')
const productDescription = computed(() => product.value?.description || '')
const productContent = computed(() => product.value?.content || '')
const productPrice = computed(() => product.value?.price || 0)
const productOriginPrice = computed(() => product.value?.origin_price || 0)
const productId = computed(() => product.value?.id || '')

// 預設照片
const DEFAULT_ADDITIONAL_IMAGES = [
  'https://images.unsplash.com/photo-1590490360182-c33d57733427',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
  'https://images.unsplash.com/photo-1584132905271-512c958d674a'
]

// 默認描述內容（當產品沒有內容時使用）
const defaultDescription = `
<div class="default-description">
  <p>這間豪華客房提供舒適的住宿環境，為您的旅程增添難忘的體驗。</p>
  
  <h4>客房特色</h4>
  <ul>
    <li>寬敞的起居空間，配備舒適的座椅和工作區</li>
    <li>特大床，配有高級床上用品</li>
    <li>大型窗戶，提供充足的自然光和城市美景</li>
    <li>精心設計的浴室，配備雨淋式淋浴和豪華浴缸</li>
    <li>高品質的洗浴用品</li>
  </ul>
  
  <h4>客房設施</h4>
  <ul>
    <li>高速WiFi</li>
    <li>55吋智能電視</li>
    <li>Nespresso咖啡機和精選茶品</li>
    <li>迷你吧</li>
    <li>保險箱</li>
    <li>獨立控制的空調系統</li>
  </ul>
  
  <h4>客房服務</h4>
  <ul>
    <li>24小時客房服務</li>
    <li>每日客房清潔</li>
    <li>洗衣和乾洗服務</li>
    <li>枕頭選單</li>
    <li>喚醒服務</li>
  </ul>
</div>
`

// 計算屬性
const imageGallery = computed(() => {
  if (!product.value) return []
  // 確保所有圖片都是有效的URL
  const mainImage = product.value.imageUrl
  const additionalImages = Array.isArray(product.value.imagesUrl)
    ? product.value.imagesUrl.filter(Boolean)
    : []

  // 如果沒有額外圖片，則套用預設圖片
  if (additionalImages.length === 0) {
    return [mainImage, ...DEFAULT_ADDITIONAL_IMAGES]
  }

  return [mainImage, ...additionalImages]
})

const recommendProducts = computed(() => {
  // 從 store 中選取最多 4 個推薦商品
  const allProducts = Object.values(store.userProducts || {})
  if (allProducts.length === 0) return []

  // 排除當前產品
  const filteredProducts = allProducts.filter((p) => p.id !== productId.value)

  // 隨機排序並取前 4 個
  return filteredProducts.sort(() => 0.5 - Math.random()).slice(0, 4)
})

// 方法
const fetchProductDetails = async () => {
  isLoading.value = true
  try {
    const productId = route.params.id
    const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/product/${productId}`
    const response = await store.getUserProductById(api)
    product.value = response.data.product
    currentMainImage.value = product.value.imageUrl
    // 檢查產品是否在我的最愛中
    checkIfFavorite()
  } catch (error) {
    console.error('Error fetching product details:', error)
  } finally {
    isLoading.value = false
  }
}

const changeMainImage = (image) => {
  currentMainImage.value = image
}

const increaseQuantity = () => {
  if (quantity.value < 10) {
    quantity.value += 1
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1
  }
}

const addToCart = async () => {
  try {
    await store.addToCart(productId.value, quantity.value)
    alert('成功加入購物車')
  } catch (error) {
    alert('加入購物車失敗')
  }
}

// 檢查產品是否在我的最愛中
const checkIfFavorite = () => {
  if (productId.value) {
    isFavorite.value = store.isInFavorites(productId.value)
  }
}

const toggleFavorite = () => {
  if (!product.value) return

  if (isFavorite.value) {
    // 從我的最愛中移除
    store.removeFromFavorites(productId.value)
  } else {
    // 添加到我的最愛
    store.addToFavorites(product.value)
  }

  // 更新狀態
  isFavorite.value = !isFavorite.value
}

const goToProductDetail = (productId) => {
  router.push({ name: 'UserProductDetail', params: { id: productId } })
}

// 監聽路由參數變化
watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      await fetchProductDetails()
    }
  },
  { immediate: true }
)

// 生命週期鉤子
onMounted(async () => {
  // 確保有推薦商品
  if (Object.keys(store.userProducts || {}).length === 0) {
    await store.getUserProducts()
  }
})
</script>
