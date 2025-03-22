<template>
  <!-- 照片查看器 -->
  <div class="lightbox" v-if="lightboxOpen" @click="closeLightbox">
    <div class="lightbox-content" @click.stop>
      <span class="close-lightbox" @click="closeLightbox">&times;</span>
      <img :src="lightboxImage" alt="放大照片" class="lightbox-image" />
      <div class="lightbox-nav">
        <button class="lightbox-prev" @click.stop="prevImage">&lt;</button>
        <button class="lightbox-next" @click.stop="nextImage">&gt;</button>
      </div>
    </div>
  </div>

  <div class="home" :class="{ 'no-scroll': lightboxOpen }">
    <!-- 首頁 Banner 輪播 -->
    <div class="banner-container">
      <div
        class="banner-slide"
        v-for="(slide, index) in bannerSlides"
        :key="index"
        :style="{ backgroundImage: `url(${slide.image})` }"
        :class="{ active: currentSlide === index }"
      >
        <div class="banner-overlay"></div>
        <div class="banner-content">
          <h1>{{ slide.title }}</h1>
          <p>{{ slide.description }}</p>
          <router-link to="/user/products" class="btn btn-primary">立即預訂</router-link>
        </div>
      </div>
      <div class="banner-indicators">
        <div
          v-for="(slide, index) in bannerSlides"
          :key="index"
          class="banner-indicator"
          :class="{ active: currentSlide === index }"
          @click="setCurrentSlide(index)"
        ></div>
      </div>

      <!-- 向下滾動指示器 -->
      <a @click.prevent="scrollToBooking" class="scroll-down">
        <i class="scroll-arrow"></i>
      </a>
    </div>

    <!-- 預訂區塊 -->
    <section id="booking" class="booking-section">
      <div class="container">
        <div class="booking-container">
          <div class="booking-header">
            <h2>快速預訂</h2>
            <p>立即預訂您的奢華住宿體驗</p>
          </div>
          <div class="booking-form">
            <div class="form-group">
              <label for="check-in"><i class="fas fa-calendar-alt"></i> 入住日期</label>
              <input
                type="date"
                id="check-in"
                class="form-control"
                :min="today"
                v-model="checkInDate"
              />
            </div>
            <div class="form-group">
              <label for="check-out"><i class="fas fa-calendar-alt"></i> 退房日期</label>
              <input
                type="date"
                id="check-out"
                class="form-control"
                :min="tomorrow"
                v-model="checkOutDate"
              />
            </div>
            <div class="form-group">
              <label for="guests"><i class="fas fa-user"></i> 住客人數</label>
              <select id="guests" class="form-control" v-model="guestCount">
                <option value="1">1 位住客</option>
                <option value="2" selected>2 位住客</option>
                <option value="3">3 位住客</option>
                <option value="4">4 位住客</option>
                <option value="5">5 位住客</option>
                <option value="6">6 位住客</option>
              </select>
            </div>
            <div class="form-group">
              <label for="room-type"><i class="fas fa-bed"></i> 房型</label>
              <select id="room-type" class="form-control" v-model="roomType">
                <option value="any" selected>任何房型</option>
                <option value="standard">標準客房</option>
                <option value="deluxe">豪華客房</option>
                <option value="suite">套房</option>
                <option value="family">家庭房</option>
                <option value="view">景觀房</option>
              </select>
            </div>
            <div class="form-group form-action">
              <button class="btn btn-primary btn-book" @click="handleBookingSearch">
                <i class="fas fa-search"></i> 查詢空房
              </button>
            </div>
          </div>
          <div class="booking-features">
            <div class="booking-feature">
              <i class="fas fa-percent"></i>
              <span>官網預訂最優惠</span>
            </div>
            <div class="booking-feature">
              <i class="fas fa-coffee"></i>
              <span>免費早餐</span>
            </div>
            <div class="booking-feature">
              <i class="fas fa-wifi"></i>
              <span>免費高速WiFi</span>
            </div>
            <div class="booking-feature">
              <i class="fas fa-ban"></i>
              <span>免費取消</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 飯店介紹 -->
    <section class="intro">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-image-showcase">
            <div class="showcase-main" @click="openLightbox(0)">
              <div class="image-overlay">
                <span>SHIBA LUXURY</span>
              </div>
              <img src="@/assets/images/homeview/about_大廳.jpg" alt="豪華酒店" />
            </div>
            <div class="showcase-side">
              <div class="side-image" @click="openLightbox(1)">
                <img src="@/assets/images/homeview/about_泳池.jpg" alt="豪華酒店泳池" />
              </div>
              <div class="side-image" @click="openLightbox(2)">
                <img src="@/assets/images/homeview/about_餐廳.jpg" alt="豪華酒店餐廳" />
              </div>
            </div>
          </div>
          <div class="intro-content">
            <h2>關於我們</h2>
            <div class="intro-tagline">奢華體驗，難忘回憶</div>
            <p>
              位於城市中心的絕佳位置，SHIBA飯店提供豪華的住宿體驗，結合了現代設計與傳統風格。
              每一個細節都經過精心設計，為您帶來舒適與優雅的住宿環境。
            </p>
            <p>
              無論是商務旅行還是休閒度假，我們都能滿足您的所有需求，讓您在繁忙的都市中找到寧靜的綠洲。
              我們的專業團隊將為您提供無微不至的服務，確保您的每一刻都充滿難忘的回憶。
            </p>
            <div class="intro-features">
              <div class="feature">
                <div class="feature-icon">
                  <i class="fas fa-concierge-bell"></i>
                </div>
                <div class="feature-text">24小時禮賓服務</div>
              </div>
              <div class="feature">
                <div class="feature-icon">
                  <i class="fas fa-wifi"></i>
                </div>
                <div class="feature-text">全館高速WiFi</div>
              </div>
              <div class="feature">
                <div class="feature-icon">
                  <i class="fas fa-utensils"></i>
                </div>
                <div class="feature-text">米其林星級餐廳</div>
              </div>
              <div class="feature">
                <div class="feature-icon">
                  <i class="fas fa-glass-martini-alt"></i>
                </div>
                <div class="feature-text">每日歡樂時光</div>
              </div>
            </div>
            <router-link to="/about" class="btn btn-outline">探索更多</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 客房展示 -->
    <section id="rooms" class="rooms">
      <div class="container">
        <div class="section-header">
          <h2>精選客房</h2>
          <p>為您提供舒適豪華的住宿選擇</p>
        </div>

        <!-- 加載指示器 -->
        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>載入中，請稍候...</p>
        </div>

        <!-- 無產品資料時顯示 -->
        <div v-else-if="featuredRooms.length === 0" class="no-rooms">
          <p>目前沒有可用的客房資訊，請稍後再試。</p>
        </div>

        <!-- 產品資料 -->
        <div v-else class="room-grid">
          <div v-for="(room, index) in featuredRooms" :key="index" class="room-card">
            <div class="room-image" :style="{ backgroundImage: `url(${room.image})` }"></div>
            <div class="room-info">
              <div class="room-capacity">
                <span>{{ room.capacity }}</span>
                <span>{{ room.size }}</span>
              </div>
              <h3>{{ room.title }}</h3>
              <p>{{ room.description }}</p>
              <div class="price">
                NT$ {{ formatPrice(room.price) }} <span class="per-night">/ 晚</span>
              </div>
              <router-link
                :to="{ name: 'UserProductDetail', params: { id: room.id } }"
                class="btn-view"
                title="查看詳情"
              ></router-link>
            </div>
          </div>
        </div>

        <div class="view-all">
          <router-link to="/user/products" class="btn">查看所有客房</router-link>
        </div>
      </div>
    </section>

    <!-- 設施展示 -->
    <section id="facilities" class="facilities">
      <div class="container">
        <div class="section-header">
          <h2>奢華設施</h2>
          <p>體驗無與倫比的頂級服務與設施</p>
        </div>

        <div class="facilities-showcase">
          <div class="facilities-intro">
            <h3>尊享奢華體驗</h3>
            <p>
              SHIBA飯店為您提供一系列精心設計的頂級設施，從水療中心到米其林星級餐廳，每一處細節都彰顯奢華品質與卓越服務。我們的設施不僅滿足您的需求，更超越您的期待，為您的住宿體驗增添難忘回憶。
            </p>
            <div class="facilities-highlight">
              <span>24小時服務</span>
              <span>專業團隊</span>
              <span>頂級設備</span>
            </div>
            <router-link to="/facilities" class="btn-facilities">探索更多</router-link>
          </div>

          <div class="facilities-grid">
            <div
              v-for="(facility, index) in facilities"
              :key="index"
              class="facility-card"
              :class="{ featured: index === 0 }"
              v-lazy-load
            >
              <div
                class="facility-image"
                :style="{ backgroundImage: `url(${facility.image})` }"
              ></div>
              <div class="facility-content">
                <div class="facility-icon"><i :class="facility.icon"></i></div>
                <h3>{{ facility.title }}</h3>
                <p>{{ facility.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 評價區塊 -->
    <section class="testimonial">
      <div class="testimonial-container">
        <div class="section-header testimonial-header">
          <h2>賓客評價</h2>
          <p>聽聽我們的客人怎麼說</p>
        </div>

        <div class="testimonial-slider">
          <div
            v-for="(review, index) in reviews"
            :key="index"
            class="testimonial-slide"
            :class="{ active: currentReview === index }"
          >
            <div class="testimonial-content">
              <div class="quote">"</div>
              <p>{{ review.content }}</p>
              <div class="reviewer-info">
                <div
                  class="reviewer-avatar"
                  :style="{ backgroundImage: `url(${review.avatar})` }"
                ></div>
                <div class="reviewer-details">
                  <h4>{{ review.name }}</h4>
                  <div class="rating">
                    <i
                      class="fas fa-star"
                      v-for="star in 5"
                      :key="star"
                      :class="{ active: star <= review.rating }"
                    ></i>
                  </div>
                  <span class="review-date">{{ review.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="testimonial-controls">
          <button class="testimonial-prev" @click="prevReview">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="testimonial-indicators">
            <span
              v-for="(review, index) in reviews"
              :key="index"
              class="testimonial-indicator"
              :class="{ active: currentReview === index }"
              @click="setCurrentReview(index)"
            ></span>
          </div>
          <button class="testimonial-next" @click="nextReview">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores'
import banner1 from '@/assets/images/homeview/banner_優雅.jpg'
import banner2 from '@/assets/images/homeview/banner_奢華.jpg'
import banner3 from '@/assets/images/homeview/banner_難忘.jpg'
import about1 from '@/assets/images/homeview/about_大廳.jpg'
import about2 from '@/assets/images/homeview/about_泳池.jpg'
import about3 from '@/assets/images/homeview/about_餐廳.jpg'
import facility1 from '@/assets/images/homeview/fac_游泳池.jpg'
import facility2 from '@/assets/images/homeview/fac_健身房.jpg'
import facility3 from '@/assets/images/homeview/fac_水療中心.jpg'
import facility4 from '@/assets/images/homeview/fac_餐廳.jpg'
import facility5 from '@/assets/images/homeview/fac_屋頂酒吧.jpg'
import facility6 from '@/assets/images/homeview/fac_商務中心.jpg'
import review1 from '@/assets/images/homeview/reviews_custom1.jpg'
import review2 from '@/assets/images/homeview/reviews_custom2.jpg'
import review3 from '@/assets/images/homeview/reviews_custom3.jpg'

const router = useRouter()
const store = useStore()

// 客房模板資料
const roomTemplates = [
  {
    capacity: '最多2人',
    size: '35平方米',
    amenities: [
      { icon: 'fas fa-wifi', text: '高速WiFi' },
      { icon: 'fas fa-tv', text: '智能電視' },
      { icon: 'fas fa-coffee', text: '迷你吧' }
    ]
  },
  {
    capacity: '最多2人',
    size: '45平方米',
    amenities: [
      { icon: 'fas fa-wifi', text: '高速WiFi' },
      { icon: 'fas fa-glass-martini-alt', text: '行政酒廊' },
      { icon: 'fas fa-concierge-bell', text: '管家服務' }
    ]
  },
  {
    capacity: '最多4人',
    size: '60平方米',
    amenities: [
      { icon: 'fas fa-wifi', text: '高速WiFi' },
      { icon: 'fas fa-child', text: '兒童設施' },
      { icon: 'fas fa-couch', text: '獨立起居室' }
    ]
  }
]

// 從後端獲取產品資料
const isLoading = ref(true)

// 精選客房
const featuredRooms = computed(() => {
  if (!store.userProducts || Object.keys(store.userProducts).length === 0) {
    return []
  }

  // 從所有產品中選取最多3個作為精選客房
  return Object.values(store.userProducts)
    .slice(0, 3)
    .map((product, index) => {
      // 獲取對應的模板資料
      const template = roomTemplates[index % roomTemplates.length]

      return {
        id: product.id,
        title: product.title,
        description: product.description || '豪華舒適的客房，提供您難忘的住宿體驗。',
        image:
          product.imageUrl || `https://images.unsplash.com/photo-163104930726${index}-da0ec9d70304`,
        price: product.price,
        capacity: template.capacity,
        size: template.size,
        amenities: template.amenities
      }
    })
})

// 格式化價格
const formatPrice = (price) => {
  return price.toLocaleString()
}

// 獲取產品資料
const fetchProducts = async () => {
  isLoading.value = true
  try {
    await store.getUserProducts(1)
  } catch (error) {
    console.error('獲取產品資料失敗:', error)
  } finally {
    isLoading.value = false
  }
}

// 輪播相關狀態
const currentSlide = ref(0)
const bannerSlides = ref([
  {
    image: banner1,
    title: '優雅的住宿體驗',
    description: '探索我們精心設計的客房與頂級設施，享受無與倫比的服務'
  },
  {
    image: banner2,
    title: '奢華的度假勝地',
    description: '在城市中心的綠洲，享受寧靜與舒適'
  },
  {
    image: banner3,
    title: '難忘的假期',
    description: '創造美好回憶，體驗頂級服務'
  }
])

// 預訂表單相關狀態
const today = ref(new Date().toISOString().split('T')[0])
const tomorrow = ref(new Date(Date.now() + 86400000).toISOString().split('T')[0])
const checkInDate = ref(today.value)
const checkOutDate = ref(tomorrow.value)
const guestCount = ref('2')
const roomType = ref('any')

// 照片查看器相關狀態
const lightboxOpen = ref(false)
const lightboxImage = ref('')
const currentImageIndex = ref(0)
const galleryImages = ref([about1, about2, about3])

// 計時器引用
let slideshowInterval = null
let reviewInterval = null

// 評價相關狀態
const currentReview = ref(0)
const reviews = ref([
  {
    avatar: review1,
    name: '保羅',
    content:
      '這是我住過的最好的飯店之一，從服務到設施都無可挑剔。房間寬敞舒適，員工親切專業，位置便利。強烈推薦給所有來訪的旅客！',
    rating: 5,
    date: '2023-05-15'
  },
  {
    avatar: review2,
    name: '艾莉絲',
    content:
      '非常棒的住宿體驗，服務人員非常友善，設施也非常完善。我一定會再來訪問。特別喜歡飯店的無邊際泳池，景色令人難忘。',
    rating: 4,
    date: '2023-05-10'
  },
  {
    avatar: review3,
    name: '陳先生',
    content:
      '這次住宿非常愉快，飯店位置便利，服務人員非常專業，設施也非常完善。我會推薦給我的朋友們。餐廳的食物也非常美味。',
    rating: 4,
    date: '2023-05-05'
  }
])

// 設施相關狀態
const facilities = ref([
  {
    image: facility1,
    icon: 'fas fa-swimming-pool',
    title: '無邊際泳池',
    description: '俯瞰城市美景的頂樓無邊際泳池，提供獨特的游泳體驗'
  },
  {
    image: facility2,
    icon: 'fas fa-dumbbell',
    title: '健身中心',
    description: '配備最新健身器材的現代化健身中心'
  },
  {
    image: facility3,
    icon: 'fas fa-spa',
    title: '水療中心',
    description: '提供全方位的放鬆與恢復療程'
  },
  {
    image: facility4,
    icon: 'fas fa-utensils',
    title: '星級餐廳',
    description: '由知名主廚主理的米其林星級餐飲體驗'
  },
  {
    image: facility5,
    icon: 'fas fa-glass-cheers',
    title: '屋頂酒吧',
    description: '享受精緻調酒與壯麗城市夜景'
  },
  {
    image: facility6,
    icon: 'fas fa-briefcase',
    title: '商務中心',
    description: '全方位商務服務與會議設施'
  }
])

// 輪播相關方法
const startSlideshow = () => {
  // 儲存計時器引用以便清除
  slideshowInterval = setInterval(() => {
    setCurrentSlide((currentSlide.value + 1) % bannerSlides.value.length)
  }, 5000)
}

const setCurrentSlide = (index) => {
  currentSlide.value = index
}

// 照片查看器相關方法
const openLightbox = (index) => {
  currentImageIndex.value = index
  lightboxImage.value = galleryImages.value[index]
  // 使用 nextTick 確保 DOM 更新後再顯示 lightbox
  nextTick(() => {
    lightboxOpen.value = true
  })
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const prevImage = () => {
  updateCurrentImage(-1)
}

const nextImage = () => {
  updateCurrentImage(1)
}

const updateCurrentImage = (step) => {
  currentImageIndex.value = 
    (currentImageIndex.value + step + galleryImages.value.length) % galleryImages.value.length
  lightboxImage.value = galleryImages.value[currentImageIndex.value]
}

// 滾動到預訂區塊的方法
const scrollToBooking = () => {
  const bookingSection = document.getElementById('booking')
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// 評價輪播相關方法
const prevReview = () => {
  setCurrentReview((currentReview.value - 1 + reviews.value.length) % reviews.value.length)
}

const nextReview = () => {
  setCurrentReview((currentReview.value + 1) % reviews.value.length)
}

const setCurrentReview = (index) => {
  currentReview.value = index
}

const startReviewSlideshow = () => {
  // 每7秒切換一次評價
  reviewInterval = setInterval(() => {
    setCurrentReview((currentReview.value + 1) % reviews.value.length)
  }, 7000)
}

// 預訂表單處理方法
const handleBookingSearch = () => {
  // 使用 router 導航到 UserProducts 頁面並傳遞查詢參數
  router.push({
    path: '/user/products',
    query: {
      checkInDate: checkInDate.value,
      checkOutDate: checkOutDate.value,
      capacity: guestCount.value,
      roomType: roomType.value !== 'any' ? roomType.value : ''
    }
  })
}

onMounted(() => {
  startSlideshow()
  startReviewSlideshow()

  // 獲取產品資料
  fetchProducts()
})

onBeforeUnmount(() => {
  // 清除輪播計時器
  if (slideshowInterval) {
    clearInterval(slideshowInterval)
  }

  // 清除評價輪播計時器
  if (reviewInterval) {
    clearInterval(reviewInterval)
  }
})
</script>

<style scoped>
/* 不需要重複定義樣式，已在 _homeview.scss 中定義 */
</style>
