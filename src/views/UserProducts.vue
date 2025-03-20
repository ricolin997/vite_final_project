<template>
  <div class="user-products">
    <!-- 頁面頂部橫幅 -->
    <div class="products-banner">
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <h2>豪華客房與套房</h2>
        <p>為您的旅程提供無與倫比的奢華體驗</p>
      </div>
    </div>

    <!-- 篩選區域 -->
    <div class="filter-section">
      <div class="container">
        <div class="filter-container" @click.stop>
          <div class="filter-header">
            <h3><i class="fas fa-filter"></i> 客房篩選</h3>
            <div class="filter-actions">
              <span v-if="activeFilterCount > 0" class="filter-count"
                >{{ activeFilterCount }} 個篩選條件</span
              >
              <button class="btn-reset" @click.prevent="resetFilters">
                <i class="fas fa-undo"></i> 重置篩選
              </button>
            </div>
          </div>

          <!-- 篩選模式切換 -->
          <div class="filter-mode-switch">
            <button
              class="filter-mode-btn"
              :class="{ active: filterMode === 'quick' }"
              @click="filterMode = 'quick'"
            >
              <i class="fas fa-bolt"></i> 快速篩選
            </button>
            <button
              class="filter-mode-btn"
              :class="{ active: filterMode === 'advanced' }"
              @click="filterMode = 'advanced'"
            >
              <i class="fas fa-sliders-h"></i> 進階篩選
            </button>
          </div>

          <!-- 已選擇的篩選條件標籤 -->
          <div class="active-filters" v-if="hasActiveFilters">
            <div class="filter-tag" v-if="filters.checkInDate && filters.checkOutDate">
              <i class="fas fa-calendar"></i>
              {{ formatDateDisplay(filters.checkInDate) }} -
              {{ formatDateDisplay(filters.checkOutDate) }}
              <button @click="clearDateFilter" class="btn-remove-tag">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="filter-tag" v-if="filters.capacity">
              <i class="fas fa-users"></i>
              {{ getCapacityLabel(filters.capacity) }}
              <button @click="filters.capacity = ''" class="btn-remove-tag">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="filter-tag" v-if="filters.priceRange">
              <i class="fas fa-tag"></i>
              {{ getPriceRangeLabel(filters.priceRange) }}
              <button @click="filters.priceRange = ''" class="btn-remove-tag">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="filter-tag" v-if="filters.roomType">
              <i class="fas fa-bed"></i>
              {{ getRoomTypeLabel(filters.roomType) }}
              <button @click="filters.roomType = ''" class="btn-remove-tag">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="filter-tag" v-if="hasFeatureFilters">
              <i class="fas fa-concierge-bell"></i>
              特色服務
              <button @click="clearFeatureFilters" class="btn-remove-tag">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <!-- 快速篩選區域 -->
          <div v-if="filterMode === 'quick'" class="quick-filter-area">
            <div class="quick-filter-row">
              <div class="quick-filter-item">
                <label><i class="fas fa-calendar"></i> 入住日期</label>
                <div class="date-input-wrapper">
                  <input
                    type="date"
                    v-model="filters.checkInDate"
                    :min="today"
                    class="date-input"
                  />
                </div>
              </div>
              <div class="quick-filter-item">
                <label><i class="fas fa-calendar-minus"></i> 退房日期</label>
                <div class="date-input-wrapper">
                  <input
                    type="date"
                    v-model="filters.checkOutDate"
                    :min="minCheckOutDate"
                    class="date-input"
                  />
                </div>
              </div>
              <div class="quick-filter-item">
                <label><i class="fas fa-users"></i> 客人數量</label>
                <select v-model="filters.capacity" class="select-input">
                  <option value="">所有人數</option>
                  <option value="2">最多2人</option>
                  <option value="4">最多4人</option>
                  <option value="6">5人以上</option>
                </select>
              </div>
              <div class="quick-filter-item">
                <label><i class="fas fa-tag"></i> 價格範圍</label>
                <select v-model="filters.priceRange" class="select-input">
                  <option value="">全部價格</option>
                  <option value="low">NT$ 5,000 以下</option>
                  <option value="medium">NT$ 5,000 - 8,000</option>
                  <option value="high">NT$ 8,000 以上</option>
                </select>
              </div>
            </div>
          </div>

          <!-- 進階篩選區域 -->
          <div v-if="filterMode === 'advanced'">
            <!-- 篩選標籤頁 -->
            <div class="filter-tabs">
              <div
                class="filter-tab"
                :class="{ active: activeTab === 'dates' }"
                @click="activeTab = 'dates'"
              >
                <i class="fas fa-calendar"></i> 日期
              </div>
              <div
                class="filter-tab"
                :class="{ active: activeTab === 'guests' }"
                @click="activeTab = 'guests'"
              >
                <i class="fas fa-users"></i> 客人
              </div>
              <div
                class="filter-tab"
                :class="{ active: activeTab === 'price' }"
                @click="activeTab = 'price'"
              >
                <i class="fas fa-tag"></i> 價格
              </div>
              <div
                class="filter-tab"
                :class="{ active: activeTab === 'roomType' }"
                @click="activeTab = 'roomType'"
              >
                <i class="fas fa-bed"></i> 房型
              </div>
              <div
                class="filter-tab"
                :class="{ active: activeTab === 'features' }"
                @click="activeTab = 'features'"
              >
                <i class="fas fa-concierge-bell"></i> 設施
              </div>
            </div>

            <!-- 篩選內容 -->
            <div class="filter-content">
              <!-- 日期篩選 -->
              <div v-show="activeTab === 'dates'" class="tab-content">
                <div class="date-selection">
                  <div class="date-range-inputs">
                    <div class="filter-item">
                      <label for="checkInDate"
                        ><i class="fas fa-calendar-check"></i> 入住日期</label
                      >
                      <div class="date-input-wrapper">
                        <input
                          id="checkInDate"
                          type="date"
                          v-model="filters.checkInDate"
                          :min="today"
                          class="date-input"
                        />
                      </div>
                    </div>
                    <div class="filter-item">
                      <label for="checkOutDate"
                        ><i class="fas fa-calendar-minus"></i> 退房日期</label
                      >
                      <div class="date-input-wrapper">
                        <input
                          id="checkOutDate"
                          type="date"
                          v-model="filters.checkOutDate"
                          :min="minCheckOutDate"
                          class="date-input"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="quick-date-selection">
                    <h4>快速選擇</h4>
                    <div class="quick-date-buttons">
                      <button @click="setDateRange('weekend')" class="quick-date-btn">
                        <i class="fas fa-moon"></i> 本週末
                      </button>
                      <button @click="setDateRange('nextWeek')" class="quick-date-btn">
                        <i class="fas fa-calendar-week"></i> 下週
                      </button>
                      <button @click="setDateRange('nextMonth')" class="quick-date-btn">
                        <i class="fas fa-calendar-alt"></i> 下個月
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 客人數量篩選 -->
              <div v-show="activeTab === 'guests'" class="tab-content">
                <div class="guest-selector">
                  <div class="guest-type">
                    <div class="guest-info">
                      <span class="guest-label">成人</span>
                      <span class="guest-desc">13歲以上</span>
                    </div>
                    <div class="guest-controls">
                      <button @click="decreaseAdults" :disabled="adults <= 1" class="btn-circle">
                        -
                      </button>
                      <span class="guest-count">{{ adults }}</span>
                      <button @click="increaseAdults" class="btn-circle">+</button>
                    </div>
                  </div>
                  <div class="guest-type">
                    <div class="guest-info">
                      <span class="guest-label">兒童</span>
                      <span class="guest-desc">2-12歲</span>
                    </div>
                    <div class="guest-controls">
                      <button
                        @click="decreaseChildren"
                        :disabled="children <= 0"
                        class="btn-circle"
                      >
                        -
                      </button>
                      <span class="guest-count">{{ children }}</span>
                      <button @click="increaseChildren" class="btn-circle">+</button>
                    </div>
                  </div>
                  <div class="guest-type">
                    <div class="guest-info">
                      <span class="guest-label">嬰兒</span>
                      <span class="guest-desc">2歲以下</span>
                    </div>
                    <div class="guest-controls">
                      <button @click="decreaseInfants" :disabled="infants <= 0" class="btn-circle">
                        -
                      </button>
                      <span class="guest-count">{{ infants }}</span>
                      <button @click="increaseInfants" class="btn-circle">+</button>
                    </div>
                  </div>
                  <div class="guest-summary">
                    <button @click="applyGuestSelection" class="btn-apply">套用</button>
                  </div>
                </div>
              </div>

              <!-- 價格範圍篩選 -->
              <div v-show="activeTab === 'price'" class="tab-content">
                <div class="price-range-filter">
                  <div class="price-range-header">
                    <h4>價格範圍</h4>
                    <span class="price-range-value"
                      >NT$ {{ priceRange.min }} - NT$ {{ priceRange.max }}</span
                    >
                  </div>
                  <div class="price-range-slider">
                    <input
                      type="range"
                      v-model.number="priceRange.min"
                      :min="priceMinLimit"
                      :max="priceMaxLimit"
                      :step="500"
                      @input="validatePriceRange"
                      class="price-slider min-slider"
                    />
                    <input
                      type="range"
                      v-model.number="priceRange.max"
                      :min="priceMinLimit"
                      :max="priceMaxLimit"
                      :step="500"
                      @input="validatePriceRange"
                      class="price-slider max-slider"
                    />
                    <div class="price-slider-track"></div>
                  </div>
                  <div class="price-range-labels">
                    <span>NT$ {{ priceMinLimit }}</span>
                    <span>NT$ {{ priceMaxLimit }}</span>
                  </div>
                  <div class="price-quick-filters">
                    <button
                      @click="setPriceRange('low')"
                      class="price-quick-btn"
                      :class="{ active: filters.priceRange === 'low' }"
                    >
                      經濟型 (NT$ 5,000 以下)
                    </button>
                    <button
                      @click="setPriceRange('medium')"
                      class="price-quick-btn"
                      :class="{ active: filters.priceRange === 'medium' }"
                    >
                      中價位 (NT$ 5,000 - 8,000)
                    </button>
                    <button
                      @click="setPriceRange('high')"
                      class="price-quick-btn"
                      :class="{ active: filters.priceRange === 'high' }"
                    >
                      高級型 (NT$ 8,000 以上)
                    </button>
                  </div>
                </div>
              </div>

              <!-- 房型篩選 -->
              <div v-show="activeTab === 'roomType'" class="tab-content">
                <div class="room-type-filter">
                  <div class="room-type-grid">
                    <div
                      v-for="type in roomTypes"
                      :key="type.value"
                      class="room-type-card"
                      :class="{ active: filters.roomType === type.value }"
                      @click="filters.roomType = filters.roomType === type.value ? '' : type.value"
                    >
                      <div class="room-type-icon">
                        <i :class="type.icon"></i>
                      </div>
                      <div class="room-type-info">
                        <h4>{{ type.label }}</h4>
                        <p>{{ type.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 特色服務篩選 -->
              <div v-show="activeTab === 'features'" class="tab-content">
                <div class="amenities-filter">
                  <h4>熱門設施</h4>
                  <div class="amenities-grid">
                    <div
                      v-for="amenity in amenities"
                      :key="amenity.id"
                      class="amenity-item"
                      :class="{ active: isAmenitySelected(amenity.id) }"
                      @click="toggleAmenity(amenity.id)"
                    >
                      <i :class="amenity.icon"></i>
                      <span>{{ amenity.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="filter-footer">
            <div class="filter-results-preview" v-if="filteredRooms.length > 0">
              <span>找到 {{ filteredRooms.length }} 間符合條件的客房</span>
            </div>
            <button class="btn-search" @click.prevent="applyFilters">
              <i class="fas fa-search"></i> 搜尋
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 客房展示區域 -->
    <div class="rooms-section">
      <div class="container">
        <div class="section-header">
          <h2>精選客房</h2>
          <p>為您提供舒適豪華的住宿選擇</p>
        </div>

        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>正在載入客房資訊...</p>
        </div>

        <div v-else-if="filteredRooms.length === 0" class="no-results">
          <i class="fas fa-search"></i>
          <h3>沒有找到符合條件的客房</h3>
          <p>請嘗試調整篩選條件或重置篩選</p>
          <button class="btn-reset-search" @click="resetFilters">重置篩選</button>
        </div>

        <div v-else class="room-grid">
          <!-- 使用 v-for 循環顯示所有客房 -->
          <div
            v-for="(room, index) in filteredRooms"
            :key="index"
            class="room-card"
            :class="{ featured: room.featured }"
          >
            <div class="room-tag" v-if="room.tag">{{ room.tag }}</div>
            <div class="room-image" :style="{ backgroundImage: `url(${room.image})` }">
              <div class="room-overlay"></div>
            </div>
            <div class="room-info">
              <div class="room-capacity">
                <span>{{ room.capacity }}</span>
                <span>{{ room.size }}</span>
              </div>
              <h3>{{ room.title }}</h3>
              <p>{{ room.description }}</p>
              <div class="room-amenities">
                <span v-for="(amenity, i) in room.amenities" :key="i">
                  <i :class="amenity.icon"></i> {{ amenity.text }}
                </span>
              </div>
              <div class="price">
                NT$ {{ room.price.toLocaleString() }} <span class="per-night">/ 晚</span>
              </div>
              <div class="room-actions">
                <button class="btn-details" @click="goToProductDetail(room.id)">查看詳情</button>
                <button class="btn-book" @click="addToCart(room.id)">立即預訂</button>
                <button
                  class="btn-favorite"
                  @click="toggleFavorite(room)"
                  :class="{ active: isInFavorites(room.id) }"
                >
                  <i :class="isInFavorites(room.id) ? 'fas fa-heart' : 'far fa-heart'"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 分頁 -->
        <div class="pagination-container" v-if="pagination.total_pages > 1 && !hasActiveFilters">
          <Pagination :pages="pagination" @emit-pages="fetchUserProducts" />
        </div>
      </div>
    </div>

    <!-- 入住體驗亮點 -->
    <div class="stay-experience-section">
      <div class="container">
        <div class="section-header">
          <h2>尊享入住體驗</h2>
          <p>為您的每一晚創造難忘回憶</p>
        </div>
        <div class="experience-grid">
          <div class="experience-item">
            <div class="experience-icon">
              <i class="fas fa-bed"></i>
            </div>
            <h3>頂級寢具</h3>
            <p>精選埃及棉床單與羽絨枕，為您帶來極致舒適的睡眠體驗。</p>
          </div>
          <div class="experience-item">
            <div class="experience-icon"><i class="fas fa-coffee"></i></div>
            <h3>客房餐飲</h3>
            <p>24小時客房服務，隨時享用精緻美食與飲品。</p>
          </div>
          <div class="experience-item">
            <div class="experience-icon">
              <i class="fas fa-wifi"></i>
            </div>
            <h3>高速網絡</h3>
            <p>全房高速WiFi覆蓋，輕鬆保持連接。</p>
          </div>
          <div class="experience-item">
            <div class="experience-icon"><i class="fas fa-concierge-bell"></i></div>
            <h3>專屬管家</h3>
            <p>尊貴套房專享的個人管家服務，滿足您的各種需求。</p>
          </div>
        </div>
        <div class="experience-cta">
          <router-link to="/facilities" class="btn-view-more">探索更多設施服務</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router'
import Pagination from '@/components/Pagination.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()
const isLoading = ref(true)

// 從 store 獲取產品資料
const backendProducts = computed(() => store.userProducts)
const pagination = computed(() => store.pagination)

// 篩選標籤頁
const activeTab = ref('dates')
// 篩選模式（快速/進階）
const filterMode = ref('quick')

// 日期格式化輔助函數
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 顯示友好的日期格式
const formatDateDisplay = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return date.toLocaleDateString('zh-TW', options)
}

// 篩選相關
const today = computed(() => {
  return formatDate(new Date())
})

const filters = ref({
  checkInDate: '',
  checkOutDate: '',
  capacity: '',
  priceRange: '',
  roomType: '',
  features: {
    wifi: false,
    pool: false,
    butler: false
  }
})

// 價格範圍滑塊
const priceMinLimit = 1000
const priceMaxLimit = 20000
const priceRange = ref({
  min: priceMinLimit,
  max: priceMaxLimit
})

// 客人數量選擇器
const adults = ref(2)
const children = ref(0)
const infants = ref(0)

// 房型數據
const roomTypes = [
  {
    value: 'standard',
    label: '標準客房',
    icon: 'fas fa-bed',
    description: '舒適實用的標準房型，適合商務旅客或短期停留。'
  },
  {
    value: 'deluxe',
    label: '豪華客房',
    icon: 'fas fa-star',
    description: '更寬敞的空間與高級設施，提供舒適奢華的住宿體驗。'
  },
  {
    value: 'suite',
    label: '套房',
    icon: 'fas fa-gem',
    description: '獨立的起居空間與臥室，享受尊貴私密的住宿環境。'
  },
  {
    value: 'family',
    label: '家庭房',
    icon: 'fas fa-users',
    description: '專為家庭設計的寬敞房型，配備適合兒童的設施。'
  },
  {
    value: 'view',
    label: '景觀房',
    icon: 'fas fa-mountain',
    description: '擁有絕佳視野的房型，欣賞美麗的自然或城市景觀。'
  }
]

// 設施數據
const amenities = [
  { id: 'wifi', name: '高速WiFi', icon: 'fas fa-wifi' },
  { id: 'pool', name: '私人泳池', icon: 'fas fa-swimming-pool' },
  { id: 'butler', name: '管家服務', icon: 'fas fa-concierge-bell' },
  { id: 'spa', name: 'SPA服務', icon: 'fas fa-spa' },
  { id: 'gym', name: '健身中心', icon: 'fas fa-dumbbell' },
  { id: 'breakfast', name: '免費早餐', icon: 'fas fa-coffee' },
  { id: 'parking', name: '免費停車', icon: 'fas fa-parking' },
  { id: 'bar', name: '迷你吧', icon: 'fas fa-glass-martini-alt' }
]

// 監聽入住日期變化，確保退房日期不早於入住日期
watch(
  () => filters.value.checkInDate,
  (newVal) => {
    if (
      newVal &&
      filters.value.checkOutDate &&
      new Date(filters.value.checkOutDate) <= new Date(newVal)
    ) {
      // 如果退房日期早於或等於入住日期，則將退房日期設為入住日期的下一天
      const nextDay = new Date(newVal)
      nextDay.setDate(nextDay.getDate() + 1)
      filters.value.checkOutDate = formatDate(nextDay)
    }
  }
)

// 監聽價格範圍變化，更新篩選條件
watch(
  () => priceRange.value,
  (newVal) => {
    if (newVal.min === priceMinLimit && newVal.max === priceMaxLimit) {
      filters.value.priceRange = ''
    } else if (newVal.max <= 5000) {
      filters.value.priceRange = 'low'
    } else if (newVal.min >= 8000) {
      filters.value.priceRange = 'high'
    } else if (newVal.min >= 5000 && newVal.max <= 8000) {
      filters.value.priceRange = 'medium'
    } else {
      filters.value.priceRange = 'custom'
    }
  },
  { deep: true }
)

// 監聽價格範圍篩選條件變化，更新滑塊
watch(
  () => filters.value.priceRange,
  (newVal) => {
    if (newVal === 'low') {
      priceRange.value.min = priceMinLimit
      priceRange.value.max = 5000
    } else if (newVal === 'medium') {
      priceRange.value.min = 5000
      priceRange.value.max = 8000
    } else if (newVal === 'high') {
      priceRange.value.min = 8000
      priceRange.value.max = priceMaxLimit
    } else if (newVal === '') {
      priceRange.value.min = priceMinLimit
      priceRange.value.max = priceMaxLimit
    }
  }
)

const minCheckOutDate = computed(() => {
  if (!filters.value.checkInDate) return today.value

  const nextDay = new Date(filters.value.checkInDate)
  nextDay.setDate(nextDay.getDate() + 1)
  return formatDate(nextDay)
})

const hasActiveFilters = computed(() => {
  return (
    filters.value.checkInDate ||
    filters.value.checkOutDate ||
    filters.value.capacity ||
    filters.value.priceRange ||
    filters.value.roomType ||
    hasFeatureFilters.value
  )
})

const hasFeatureFilters = computed(() => {
  return filters.value.features.wifi || filters.value.features.pool || filters.value.features.butler
})

const activeFilterCount = computed(() => {
  let count = 0
  if (filters.value.checkInDate && filters.value.checkOutDate) count++
  if (filters.value.capacity) count++
  if (filters.value.priceRange) count++
  if (filters.value.roomType) count++
  if (hasFeatureFilters.value) count++
  return count
})

// 獲取容量標籤
const getCapacityLabel = (capacity) => {
  switch (capacity) {
    case '2':
      return '最多2人'
    case '4':
      return '最多4人'
    case '6':
      return '5人以上'
    default:
      return '所有人數'
  }
}

// 獲取價格範圍標籤
const getPriceRangeLabel = (range) => {
  switch (range) {
    case 'low':
      return 'NT$ 5,000 以下'
    case 'medium':
      return 'NT$ 5,000 - 8,000'
    case 'high':
      return 'NT$ 8,000 以上'
    case 'custom':
      return `NT$ ${priceRange.value.min} - NT$ ${priceRange.value.max}`
    default:
      return '全部價格'
  }
}

// 獲取房型標籤
const getRoomTypeLabel = (type) => {
  const roomType = roomTypes.find((t) => t.value === type)
  return roomType ? roomType.label : '所有房型'
}

// 重置篩選條件
const resetFilters = () => {
  filters.value = {
    checkInDate: '',
    checkOutDate: '',
    capacity: '',
    priceRange: '',
    roomType: '',
    features: {
      wifi: false,
      pool: false,
      butler: false
    }
  }

  // 重置價格範圍滑塊
  priceRange.value.min = priceMinLimit
  priceRange.value.max = priceMaxLimit

  // 重置客人數量
  adults.value = 2
  children.value = 0
  infants.value = 0

  // 重新獲取所有產品
  fetchUserProducts()
}

// 清除日期篩選
const clearDateFilter = () => {
  filters.value.checkInDate = ''
  filters.value.checkOutDate = ''
}

// 清除特色服務篩選
const clearFeatureFilters = () => {
  filters.value.features.wifi = false
  filters.value.features.pool = false
  filters.value.features.butler = false
}

// 設置日期範圍
const setDateRange = (type) => {
  const today = new Date()
  let checkIn, checkOut

  switch (type) {
    case 'weekend':
      // 找到下一個週末（週五到週日）
      checkIn = new Date(today)
      checkIn.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7)) // 下一個週五
      checkOut = new Date(checkIn)
      checkOut.setDate(checkIn.getDate() + 2) // 週日
      break
    case 'nextWeek':
      // 下週一到週五
      checkIn = new Date(today)
      checkIn.setDate(today.getDate() + ((8 - today.getDay()) % 7)) // 下週一
      checkOut = new Date(checkIn)
      checkOut.setDate(checkIn.getDate() + 4) // 週五
      break
    case 'nextMonth':
      // 下個月的第一天開始，住一週
      checkIn = new Date(today.getFullYear(), today.getMonth() + 1, 1)
      checkOut = new Date(checkIn)
      checkOut.setDate(checkIn.getDate() + 6)
      break
  }

  filters.value.checkInDate = formatDate(checkIn)
  filters.value.checkOutDate = formatDate(checkOut)
}

// 驗證價格範圍
const validatePriceRange = () => {
  if (priceRange.value.min > priceRange.value.max) {
    priceRange.value.min = priceRange.value.max
  }
}

// 設置價格範圍
const setPriceRange = (range) => {
  filters.value.priceRange = filters.value.priceRange === range ? '' : range
}

// 客人數量控制
const increaseAdults = () => {
  adults.value++
  updateCapacityFilter()
}

const decreaseAdults = () => {
  if (adults.value > 1) {
    adults.value--
    updateCapacityFilter()
  }
}

const increaseChildren = () => {
  children.value++
  updateCapacityFilter()
}

const decreaseChildren = () => {
  if (children.value > 0) {
    children.value--
    updateCapacityFilter()
  }
}

const increaseInfants = () => {
  infants.value++
}

const decreaseInfants = () => {
  if (infants.value > 0) {
    infants.value--
  }
}

// 更新容量篩選
const updateCapacityFilter = () => {
  const totalGuests = adults.value + children.value
  if (totalGuests <= 2) {
    filters.value.capacity = '2'
  } else if (totalGuests <= 4) {
    filters.value.capacity = '4'
  } else {
    filters.value.capacity = '6'
  }
}

// 應用客人選擇
const applyGuestSelection = () => {
  updateCapacityFilter()
  activeTab.value = 'dates' // 切換回日期標籤
}

// 設施選擇
const isAmenitySelected = (id) => {
  return filters.value.features[id] === true
}

const toggleAmenity = (id) => {
  if (id in filters.value.features) {
    filters.value.features[id] = !filters.value.features[id]
  }
}

// 應用篩選條件
const applyFilters = () => {
  // 這裡可以添加篩選邏輯，例如向後端發送篩選請求
  // 目前我們在前端進行篩選
  console.log('應用篩選條件:', filters.value)

  // 強制重新計算篩選結果
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 300)
}

// 客房基本資料模板（用於保留原有的 capacity、size、amenities、featured、tag 資料）
const roomTemplates = [
  {
    capacity: '最多2人',
    size: '35平方米',
    amenities: [
      { icon: 'fas fa-wifi', text: '高速WiFi' },
      { icon: 'fas fa-tv', text: '智能電視' },
      { icon: 'fas fa-coffee', text: '迷你吧' }
    ],
    featured: false,
    tag: '',
    roomType: 'standard'
  },
  {
    capacity: '最多2人',
    size: '45平方米',
    amenities: [
      { icon: 'fas fa-wifi', text: '高速WiFi' },
      { icon: 'fas fa-glass-martini-alt', text: '行政酒廊' },
      { icon: 'fas fa-concierge-bell', text: '管家服務' }
    ],
    featured: true,
    tag: '熱門選擇',
    roomType: 'deluxe'
  },
  {
    capacity: '最多4人',
    size: '60平方米',
    amenities: [
      { icon: 'fas fa-wifi', text: '高速WiFi' },
      { icon: 'fas fa-child', text: '兒童設施' },
      { icon: 'fas fa-couch', text: '獨立起居室' }
    ],
    featured: false,
    tag: '',
    roomType: 'family'
  },
  {
    capacity: '最多4人',
    size: '120平方米',
    amenities: [
      { icon: 'fas fa-wifi', text: '高速WiFi' },
      { icon: 'fas fa-swimming-pool', text: '私人泳池' },
      { icon: 'fas fa-concierge-bell', text: '24小時管家' }
    ],
    featured: false,
    tag: '尊貴體驗',
    roomType: 'suite'
  },
  {
    capacity: '最多2人',
    size: '50平方米',
    amenities: [
      { icon: 'fas fa-wifi', text: '高速WiFi' },
      { icon: 'fas fa-umbrella-beach', text: '海景陽台' },
      { icon: 'fas fa-bath', text: '豪華浴缸' }
    ],
    featured: false,
    tag: '絕美景觀',
    roomType: 'view'
  },
  {
    capacity: '2人',
    size: '55平方米',
    amenities: [
      { icon: 'fas fa-wifi', text: '高速WiFi' },
      { icon: 'fas fa-glass-cheers', text: '迎賓香檳' },
      { icon: 'fas fa-hot-tub', text: '私人按摩浴缸' }
    ],
    featured: false,
    tag: '浪漫之選',
    roomType: 'deluxe'
  }
]

// 合併後端資料與客房模板資料
const rooms = computed(() => {
  if (!backendProducts.value || Object.keys(backendProducts.value).length === 0) {
    return []
  }

  return Object.values(backendProducts.value).map((product, index) => {
    // 獲取對應的模板資料，如果索引超出範圍則使用第一個模板
    const templateIndex = index % roomTemplates.length
    const template = roomTemplates[templateIndex]

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      image: product.imageUrl || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304', // 使用後端圖片或預設圖片
      price: product.price,
      // 保留模板中的其他資料
      capacity: template.capacity,
      size: template.size,
      amenities: template.amenities,
      featured: template.featured,
      tag: template.tag,
      roomType: template.roomType
    }
  })
})

// 篩選後的客房列表
const filteredRooms = computed(() => {
  if (!hasActiveFilters.value) return rooms.value

  return rooms.value.filter((room) => {
    // 篩選房型
    if (filters.value.roomType && room.roomType !== filters.value.roomType) {
      return false
    }

    // 篩選價格範圍
    if (filters.value.priceRange) {
      if (filters.value.priceRange === 'low' && room.price >= 5000) {
        return false
      } else if (
        filters.value.priceRange === 'medium' &&
        (room.price < 5000 || room.price > 8000)
      ) {
        return false
      } else if (filters.value.priceRange === 'high' && room.price <= 8000) {
        return false
      } else if (filters.value.priceRange === 'custom') {
        if (room.price < priceRange.value.min || room.price > priceRange.value.max) {
          return false
        }
      }
    }

    // 篩選客人數量
    if (filters.value.capacity) {
      const capacityNumber = parseInt(filters.value.capacity)
      const roomCapacityMatch = room.capacity.match(/\d+/)
      const roomCapacity = roomCapacityMatch ? parseInt(roomCapacityMatch[0]) : 0

      if (capacityNumber === 6) {
        // 5人以上
        if (roomCapacity < 5) return false
      } else if (roomCapacity !== capacityNumber) {
        return false
      }
    }

    // 篩選特色服務
    if (filters.value.features.wifi && !room.amenities.some((a) => a.text.includes('WiFi'))) {
      return false
    }
    if (filters.value.features.pool && !room.amenities.some((a) => a.text.includes('泳池'))) {
      return false
    }
    if (filters.value.features.butler && !room.amenities.some((a) => a.text.includes('管家'))) {
      return false
    }

    return true
  })
})

// 從 URL 查詢參數中獲取篩選條件
const getFiltersFromQuery = () => {
  const query = route.query

  if (query.checkInDate) filters.value.checkInDate = query.checkInDate.toString()
  if (query.checkOutDate) filters.value.checkOutDate = query.checkOutDate.toString()
  if (query.capacity) filters.value.capacity = query.capacity.toString()
  if (query.roomType) filters.value.roomType = query.roomType.toString()

  // 如果有價格範圍參數，也可以處理
  if (query.priceRange) filters.value.priceRange = query.priceRange.toString()

  // 如果有特定的篩選條件，自動切換到進階篩選模式
  if (query.roomType || (query.checkInDate && query.checkOutDate)) {
    filterMode.value = 'advanced'
  }

  // 如果有查詢參數，自動應用篩選
  if (Object.keys(query).length > 0) {
    setTimeout(() => {
      applyFilters()
    }, 500)
  }
}

// 在組件加載時調用 getUserProducts
onMounted(async () => {
  await fetchUserProducts()

  // 從 URL 查詢參數中獲取篩選條件
  getFiltersFromQuery()
})

const fetchUserProducts = async (page = 1) => {
  isLoading.value = true
  try {
    await store.getUserProducts(page)
  } catch (error) {
    console.error('Failed to fetch user products:', error)
  } finally {
    isLoading.value = false
  }
}

// 加入購物車
const addToCart = async (productId) => {
  try {
    await store.addToCart(productId, 1)
    alert('成功加入購物車')
  } catch (error) {
    alert('加入購物車失敗')
  }
}

// 查看單一商品細節
const goToProductDetail = (productId) => {
  router.push({ name: 'UserProductDetail', params: { id: productId } })
}

// 加入我的最愛
const toggleFavorite = (room) => {
  if (isInFavorites(room.id)) {
    // 如果已經在收藏列表中，則移除
    store.removeFromFavorites(room.id)
  } else {
    // 否則添加到收藏列表
    const favoriteProduct = {
      ...room,
      imageUrl: room.image // 將 image 賦值給 imageUrl
    }
    store.addToFavorites(favoriteProduct)
  }
}

// 檢查是否已經在收藏列表中
const isInFavorites = (productId) => {
  return store.isInFavorites(productId)
}
</script>
