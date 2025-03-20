<template>
  <div class="gallery-page">
    <!-- 頁面頂部橫幅 -->
    <div class="gallery-banner">
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <h2>精選相簿</h2>
        <p>探索 SHIBA 飯店的奢華空間與精緻細節，感受我們對卓越品質的不懈追求</p>
      </div>
    </div>

    <!-- 相簿分類導航 -->
    <section class="gallery-category">
      <div class="container">
        <h3 class="category-title">瀏覽分類</h3>
        <div class="gallery-filter">
          <div class="filter-line"></div>
          <div class="filter-items">
            <div
              v-for="(category, index) in categories"
              :key="index"
              class="filter-item"
              :class="{ active: selectedCategory === category.id }"
              @click="selectCategory(category.id)"
            >
              <div class="filter-icon">
                <i :class="category.icon"></i>
              </div>
              <span>{{ category.name }}</span>
              <div class="filter-indicator"></div>
            </div>
          </div>
          <div class="filter-line"></div>
        </div>
      </div>
    </section>

    <!-- 相簿內容 -->
    <section class="gallery-content">
      <div class="container">
        <div class="section-header">
          <h2>{{ getCategoryName(selectedCategory) }}</h2>
          <p>{{ getCategoryDescription(selectedCategory) }}</p>
        </div>

        <div class="gallery-masonry">
          <transition-group name="gallery-fade" tag="div" class="gallery-grid">
            <div
              v-for="(photo, index) in filteredPhotos"
              :key="photo.id"
              class="gallery-item"
              :class="{ 'gallery-item-large': photo.featured }"
              @click="openLightbox(index)"
            >
              <div class="gallery-image-wrapper">
                <img :src="photo.image" :alt="photo.title" class="gallery-image" />
                <div class="gallery-category-tag">{{ getCategoryName(photo.categoryId) }}</div>
                <div class="gallery-overlay">
                  <div class="gallery-info">
                    <h3>{{ photo.title }}</h3>
                    <p>{{ photo.description }}</p>
                    <div class="gallery-meta">
                      <span><i class="fas fa-map-marker-alt"></i> {{ photo.location }}</span>
                      <span><i class="fas fa-calendar"></i> {{ photo.date }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </section>

    <!-- 照片查看器 -->
    <div class="gallery-lightbox" v-if="lightboxOpen" @click="closeLightbox">
      <transition name="lightbox-fade">
        <div class="lightbox-content" @click.stop v-if="lightboxOpen">
          <button class="close-lightbox" @click="closeLightbox">
            <i class="fas fa-times"></i>
          </button>
          <div class="lightbox-image-container">
            <transition name="lightbox-slide" mode="out-in">
              <img
                :key="currentPhotoIndex"
                :src="currentPhoto.image"
                :alt="currentPhoto.title"
                class="lightbox-image"
              />
            </transition>
          </div>
          <div class="lightbox-info">
            <div class="lightbox-header">
              <h3>{{ currentPhoto.title }}</h3>
              <div class="lightbox-category">{{ getCategoryName(currentPhoto.categoryId) }}</div>
            </div>
            <p>{{ currentPhoto.description }}</p>
            <div class="lightbox-meta">
              <span><i class="fas fa-map-marker-alt"></i> {{ currentPhoto.location }}</span>
              <span><i class="fas fa-calendar"></i> {{ currentPhoto.date }}</span>
            </div>
          </div>
          <div class="lightbox-nav">
            <button class="lightbox-prev" @click.stop="prevPhoto">
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="lightbox-counter">
              <span class="current">{{ currentPhotoIndex + 1 }}</span>
              <span class="divider">/</span>
              <span class="total">{{ filteredPhotos.length }}</span>
            </div>
            <button class="lightbox-next" @click.stop="nextPhoto">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <div class="lightbox-thumbnails">
            <div
              v-for="(photo, index) in filteredPhotos.slice(0, 7)"
              :key="'thumb-' + photo.id"
              class="lightbox-thumbnail"
              :class="{ active: currentPhotoIndex === index }"
              @click.stop="currentPhotoIndex = index"
            >
              <img :src="photo.image" :alt="photo.title" />
            </div>
            <div v-if="filteredPhotos.length > 7" class="lightbox-more">
              +{{ filteredPhotos.length - 7 }}
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- 預約體驗 -->
    <section class="gallery-booking">
      <div class="container">
        <div class="booking-content">
          <h2>親身體驗奢華住宿</h2>
          <p>立即預訂您的客房，感受 SHIBA 飯店的頂級服務與設施</p>
          <div class="booking-buttons">
            <router-link to="/user/products" class="btn btn-primary">立即預訂</router-link>
            <router-link to="/contact" class="btn btn-outline">聯絡我們</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import gallery_room_1 from '@/assets/images/gallery/gallery_room_1.jpg'
import gallery_room_2 from '@/assets/images/gallery/gallery_room_2.jpg'
import gallery_room_3 from '@/assets/images/gallery/gallery_room_3.jpg'
import gallery_room_4 from '@/assets/images/gallery/gallery_room_4.jpg'
import gallery_restaurant_1 from '@/assets/images/gallery/gallery_restaurant_1.jpg'
import gallery_restaurant_2 from '@/assets/images/gallery/gallery_restaurant_2.jpg'
import gallery_restaurant_3 from '@/assets/images/gallery/gallery_restaurant_3.jpg'
import gallery_restaurant_4 from '@/assets/images/gallery/gallery_restaurant_4.jpg'
import gallery_facilities_1 from '@/assets/images/gallery/gallery_facilities_1.jpg'
import gallery_facilities_2 from '@/assets/images/gallery/gallery_facilities_2.jpg'
import gallery_facilities_3 from '@/assets/images/gallery/gallery_facilities_3.jpg'
import gallery_facilities_4 from '@/assets/images/gallery/gallery_facilities_4.jpg'
import gallery_events_1 from '@/assets/images/gallery/gallery_events_1.jpg'
import gallery_events_2 from '@/assets/images/gallery/gallery_events_2.jpg'
import gallery_events_3 from '@/assets/images/gallery/gallery_events_3.jpg'
import gallery_events_4 from '@/assets/images/gallery/gallery_events_4.jpg'

// 相簿分類
const categories = ref([
  { id: 'all', name: '全部照片', icon: 'fas fa-images', description: '探索 SHIBA 飯店的各個角落' },
  { id: 'rooms', name: '客房套房', icon: 'fas fa-bed', description: '奢華舒適的住宿空間' },
  { id: 'dining', name: '餐飲美食', icon: 'fas fa-utensils', description: '精緻料理與用餐環境' },
  {
    id: 'facilities',
    name: '設施服務',
    icon: 'fas fa-swimming-pool',
    description: '頂級設施與休閒空間'
  },
  { id: 'events', name: '活動宴會', icon: 'fas fa-glass-cheers', description: '難忘的慶典與活動' }
])

// 照片資料
const photos = ref([
  // 客房套房
  {
    id: 1,
    categoryId: 'rooms',
    title: '豪華客房',
    description: '寬敞舒適的豪華客房，提供城市美景與現代化設施',
    image: gallery_room_1,
    location: '6樓',
    date: '2023-05',
    featured: true
  },
  {
    id: 2,
    categoryId: 'rooms',
    title: '行政套房',
    description: '優雅的行政套房，配備獨立起居區與豪華浴室',
    image: gallery_room_2,
    location: '8樓',
    date: '2023-06',
    featured: false
  },
  {
    id: 3,
    categoryId: 'rooms',
    title: '總統套房',
    description: '極致奢華的總統套房，提供無與倫比的住宿體驗',
    image: gallery_room_3,
    location: '12樓',
    date: '2023-07',
    featured: true
  },
  {
    id: 4,
    categoryId: 'rooms',
    title: '家庭套房',
    description: '溫馨寬敞的家庭套房，適合全家人的度假選擇',
    image: gallery_room_4,
    location: '7樓',
    date: '2023-08',
    featured: false
  },

  // 餐飲美食
  {
    id: 5,
    categoryId: 'dining',
    title: '米其林星級餐廳',
    description: '由國際知名主廚主理的頂級餐飲體驗',
    image: gallery_restaurant_1,
    location: '2樓',
    date: '2023-05',
    featured: true
  },
  {
    id: 6,
    categoryId: 'dining',
    title: '精緻下午茶',
    description: '在優雅環境中享用精緻可口的下午茶',
    image: gallery_restaurant_2,
    location: '大廳酒廊',
    date: '2023-06',
    featured: false
  },
  {
    id: 7,
    categoryId: 'dining',
    title: '屋頂酒吧',
    description: '在頂樓酒吧欣賞城市夜景，品嚐精緻調酒',
    image: gallery_restaurant_3,
    location: '頂樓',
    date: '2023-07',
    featured: false
  },
  {
    id: 8,
    categoryId: 'dining',
    title: '私人用餐體驗',
    description: '專屬定制的私人用餐體驗，滿足您的特殊需求',
    image: gallery_restaurant_4,
    location: '餐廳包廂',
    date: '2023-08',
    featured: true
  },

  // 設施服務
  {
    id: 9,
    categoryId: 'facilities',
    title: '無邊際泳池',
    description: '俯瞰城市美景的頂樓無邊際泳池',
    image: gallery_facilities_1,
    location: '頂樓',
    date: '2023-05',
    featured: true
  },
  {
    id: 10,
    categoryId: 'facilities',
    title: '豪華水療中心',
    description: '提供全方位的放鬆與恢復療程',
    image: gallery_facilities_2,
    location: '3樓',
    date: '2023-06',
    featured: false
  },
  {
    id: 11,
    categoryId: 'facilities',
    title: '健身中心',
    description: '配備最新健身器材的現代化健身中心',
    image: gallery_facilities_3,
    location: '4樓',
    date: '2023-07',
    featured: false
  },
  {
    id: 12,
    categoryId: 'facilities',
    title: '商務中心',
    description: '全方位商務服務與會議設施',
    image: gallery_facilities_4,
    location: '1樓',
    date: '2023-08',
    featured: false
  },

  // 活動宴會
  {
    id: 13,
    categoryId: 'events',
    title: '豪華婚宴',
    description: '夢幻般的婚禮場地與專業策劃服務',
    image: gallery_events_1,
    location: '宴會廳',
    date: '2023-05',
    featured: true
  },
  {
    id: 14,
    categoryId: 'events',
    title: '商務會議',
    description: '專業的商務會議場地與設備',
    image: gallery_events_2,
    location: '會議中心',
    date: '2023-06',
    featured: false
  },
  {
    id: 15,
    categoryId: 'events',
    title: '生日派對',
    description: '難忘的生日慶祝活動與專屬服務',
    image: gallery_events_3,
    location: '私人宴會廳',
    date: '2023-07',
    featured: false
  },
  {
    id: 16,
    categoryId: 'events',
    title: '雞尾酒會',
    description: '精緻的雞尾酒會與社交活動',
    image: gallery_events_4,
    location: '屋頂花園',
    date: '2023-08',
    featured: true
  }
])

// 當前選中的分類
const selectedCategory = ref('all')

// 照片查看器相關狀態
const lightboxOpen = ref(false)
const currentPhotoIndex = ref(0)

// 根據選中的分類過濾照片
const filteredPhotos = computed(() => {
  if (selectedCategory.value === 'all') {
    return photos.value
  } else {
    return photos.value.filter((photo) => photo.categoryId === selectedCategory.value)
  }
})

// 當前顯示的照片
const currentPhoto = computed(() => {
  return filteredPhotos.value[currentPhotoIndex.value] || {}
})

// 選擇分類
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  // 重置照片索引
  currentPhotoIndex.value = 0
}

// 獲取分類名稱
const getCategoryName = (categoryId) => {
  const category = categories.value.find((cat) => cat.id === categoryId)
  return category ? category.name : ''
}

// 獲取分類描述
const getCategoryDescription = (categoryId) => {
  const category = categories.value.find((cat) => cat.id === categoryId)
  return category ? category.description : ''
}

// 打開照片查看器
const openLightbox = (index) => {
  currentPhotoIndex.value = index
  lightboxOpen.value = true
  // 防止背景滾動
  document.body.style.overflow = 'hidden'
}

// 關閉照片查看器
const closeLightbox = () => {
  lightboxOpen.value = false
  // 恢復背景滾動
  document.body.style.overflow = ''
}

// 上一張照片
const prevPhoto = () => {
  currentPhotoIndex.value =
    (currentPhotoIndex.value - 1 + filteredPhotos.value.length) % filteredPhotos.value.length
}

// 下一張照片
const nextPhoto = () => {
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % filteredPhotos.value.length
}

// 鍵盤事件處理
const handleKeyDown = (e) => {
  if (!lightboxOpen.value) return

  if (e.key === 'Escape') {
    closeLightbox()
  } else if (e.key === 'ArrowLeft') {
    prevPhoto()
  } else if (e.key === 'ArrowRight') {
    nextPhoto()
  }
}

// 生命週期鉤子
onMounted(() => {
  // 確保頁面加載時滾動到頂部
  window.scrollTo(0, 0)

  // 添加鍵盤事件監聽器
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  // 移除鍵盤事件監聽器
  window.removeEventListener('keydown', handleKeyDown)
})
</script>
