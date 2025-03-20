<template>
  <div class="facilities-page">
    <!-- 頁面頂部橫幅 -->
    <div class="facilities-banner">
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <h2>奢華設施與服務</h2>
        <p>
          SHIBA飯店為您提供一系列精心設計的頂級設施與專屬服務，從水療中心到米其林星級餐廳，每一處細節都彰顯奢華品質與卓越服務。我們的設施不僅滿足您的需求，更超越您的期待，為您的住宿體驗增添難忘回憶。
        </p>
      </div>
    </div>
    <!-- 核心設施與服務 -->
    <section class="core-services-section">
      <div class="container">
        <div class="section-header">
          <h2>主要設施與服務</h2>
          <p>體驗無與倫比的奢華享受</p>
        </div>
        <div class="services-grid">
          <div class="service-item">
            <div class="service-icon">
              <i class="fas fa-concierge-bell"></i>
            </div>
            <h3>24小時禮賓服務</h3>
            <p>我們的專業團隊隨時為您提供協助，確保您的住宿體驗無與倫比。</p>
          </div>
          <div class="service-item">
            <div class="service-icon"><i class="fas fa-utensils"></i></div>
            <h3>米其林星級餐廳</h3>
            <p>享受由知名主廚精心準備的美食，體驗頂級的餐飲服務。</p>
          </div>
          <div class="service-item">
            <div class="service-icon">
              <i class="fas fa-swimming-pool"></i>
            </div>
            <h3>無邊際泳池</h3>
            <p>在頂樓泳池欣賞壯麗的城市景觀，享受悠閒的游泳時光。</p>
          </div>
          <div class="service-item">
            <div class="service-icon"><i class="fas fa-spa"></i></div>
            <h3>豪華水療中心</h3>
            <p>放鬆身心，享受我們專業的水療服務，重煥活力。</p>
          </div>
          <div class="service-item">
            <div class="service-icon"><i class="fas fa-car"></i></div>
            <h3>專車接送服務</h3>
            <p>提供機場與市區的豪華轎車接送服務，讓您的旅程更加便捷舒適。</p>
          </div>
          <div class="service-item">
            <div class="service-icon"><i class="fas fa-dumbbell"></i></div>
            <h3>24小時健身中心</h3>
            <p>配備最新健身器材的現代化健身中心，隨時保持您的健康生活方式。</p>
          </div>
          <div class="service-item">
            <div class="service-icon"><i class="fas fa-glass-cheers"></i></div>
            <h3>屋頂酒吧</h3>
            <p>在頂樓酒吧欣賞城市夜景，品嚐精緻調酒，度過愉快的夜晚。</p>
          </div>
          <div class="service-item">
            <div class="service-icon"><i class="fas fa-child"></i></div>
            <h3>兒童遊戲室</h3>
            <p>專為兒童設計的娛樂空間，讓小客人們也能享受難忘的假期時光。</p>
          </div>
        </div>
      </div>
    </section>
    <!-- 主要設施展示 -->
    <section class="main-facilities">
      <div class="container">
        <!-- 設施導航列 -->
        <div class="facilities-nav">
          <div
            v-for="(facility, index) in allFacilities"
            :key="`nav-${index}`"
            class="facility-nav-item"
            :class="{ active: selectedFacilityIndex === index }"
            @click="selectFacility(index)"
          >
            <div class="nav-icon">
              <i :class="facility.icon"></i>
            </div>
            <span>{{ facility.title }}</span>
          </div>
        </div>

        <!-- 設施詳細內容 -->
        <div class="facility-showcase" v-show="isFacilityVisible">
          <div class="facility-hero">
            <div
              v-for="(facility, index) in allFacilities"
              :key="`hero-${index}`"
              class="facility-hero-image"
              :class="{ active: selectedFacilityIndex === index }"
              :style="{ backgroundImage: `url(${facility.image})` }"
            >
              <div class="facility-hero-overlay"></div>
              <div class="facility-hero-content">
                <div class="facility-hero-icon">
                  <i :class="facility.icon"></i>
                </div>
                <h3>{{ facility.title }}</h3>
                <div class="facility-hero-meta">
                  <span v-if="facility.hours"
                    ><i class="fas fa-clock"></i> {{ facility.hours }}</span
                  >
                  <span v-if="facility.location"
                    ><i class="fas fa-map-marker-alt"></i> {{ facility.location }}</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="facility-content-wrapper">
            <div class="facility-main-content">
              <div class="facility-description">
                <h4>設施概述</h4>
                <p>{{ selectedFacility.description }}</p>
                <p v-if="selectedFacility.extendedDescription">
                  {{ selectedFacility.extendedDescription }}
                </p>
              </div>

              <div
                class="facility-features-grid"
                v-if="selectedFacility.features && selectedFacility.features.length > 0"
              >
                <h4>特色服務</h4>
                <div class="features-grid">
                  <div
                    class="feature-card"
                    v-for="(feature, fIndex) in selectedFacility.features"
                    :key="`feature-${fIndex}`"
                  >
                    <div class="feature-icon">
                      <i :class="feature.icon"></i>
                    </div>
                    <div class="feature-content">
                      <h5>{{ feature.text }}</h5>
                      <p>
                        {{
                          feature.description ||
                          `享受我們的${feature.text}服務，為您的住宿體驗增添難忘回憶。`
                        }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="facility-details-section" v-if="selectedFacility.hours">
                <h4>開放時間</h4>
                <div class="time-table">
                  <div class="time-row">
                    <span class="day">週一至週五</span>
                    <span class="time">{{ selectedFacility.hours }}</span>
                  </div>
                  <div class="time-row">
                    <span class="day">週六至週日</span>
                    <span class="time">{{ selectedFacility.hours }}</span>
                  </div>
                  <div class="time-row">
                    <span class="day">特殊節日</span>
                    <span class="time">請提前諮詢</span>
                  </div>
                </div>
              </div>

              <div class="facility-details-section">
                <h4>預約信息</h4>
                <p>建議提前預約以確保服務可用性。您可以通過以下方式預約：</p>
                <ul class="booking-methods">
                  <li><i class="fas fa-phone"></i> 電話：+886 2 1234 5678</li>
                  <li><i class="fas fa-envelope"></i> 電子郵件：booking@shibahotel.com</li>
                  <li><i class="fas fa-concierge-bell"></i> 禮賓部：酒店大堂</li>
                </ul>
              </div>
            </div>

            <div class="facility-side-content">
              <div
                class="facility-gallery"
                v-if="selectedFacility.galleryImages && selectedFacility.galleryImages.length > 0"
              >
                <h4>設施圖庫</h4>
                <div class="gallery-grid">
                  <div
                    v-for="(image, imgIndex) in selectedFacility.galleryImages"
                    :key="`gallery-${imgIndex}`"
                    class="gallery-item"
                    :style="{ backgroundImage: `url(${image})` }"
                  ></div>
                </div>
              </div>

              <div class="related-facilities" v-if="relatedFacilities.length > 0">
                <h4>相關設施</h4>
                <div class="related-list">
                  <div
                    v-for="(related, rIndex) in relatedFacilities"
                    :key="`related-${rIndex}`"
                    class="related-item"
                    @click="
                      selectFacility(allFacilities.findIndex((f) => f.title === related.title))
                    "
                  >
                    <div class="related-icon">
                      <i :class="related.icon"></i>
                    </div>
                    <span>{{ related.title }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 預約服務 -->
    <section class="booking-services">
      <div class="container">
        <div class="booking-content">
          <h2>預約您的奢華體驗</h2>
          <p>立即聯繫我們，預約您所需的設施與服務，開啟難忘的奢華之旅。</p>
          <div class="booking-buttons">
            <a href="#" class="btn btn-primary">立即預約</a>
            <a href="#" class="btn btn-outline">聯絡我們</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, onUnmounted } from 'vue'
import pool_banner from '@/assets/images/homeview/fac_游泳池.jpg'
import spa_banner from '@/assets/images/homeview/fac_水療中心.jpg'
import restaurant_banner from '@/assets/images/homeview/fac_餐廳.jpg'
import gym_banner from '@/assets/images/homeview/fac_健身房.jpg'
import rooftop_banner from '@/assets/images/homeview/fac_屋頂酒吧.jpg'
import business_banner from '@/assets/images/homeview/fac_商務中心.jpg'
import children_banner from '@/assets/images/homeview/fac_兒童遊戲室.jpg'
import pool_1 from '@/assets/images/facilities/pool_1.jpg'
import pool_2 from '@/assets/images/facilities/pool_2.jpg'
import pool_3 from '@/assets/images/facilities/pool_3.jpg'
import pool_4 from '@/assets/images/facilities/pool_4.jpg'
import spa_1 from '@/assets/images/facilities/spa_1.jpg'
import spa_2 from '@/assets/images/facilities/spa_2.jpg'
import spa_3 from '@/assets/images/facilities/spa_3.jpg'
import spa_4 from '@/assets/images/facilities/spa_4.jpg'
import restaurant_1 from '@/assets/images/facilities/restaurant_1.jpg'
import restaurant_2 from '@/assets/images/facilities/restaurant_2.jpg'
import restaurant_3 from '@/assets/images/facilities/restaurant_3.jpg'
import restaurant_4 from '@/assets/images/facilities/restaurant_4.jpg'
import gym_1 from '@/assets/images/facilities/gym_1.jpg'
import gym_2 from '@/assets/images/facilities/gym_2.jpg'
import gym_3 from '@/assets/images/facilities/gym_3.jpg'
import gym_4 from '@/assets/images/facilities/gym_4.jpg'
import bar_1 from '@/assets/images/facilities/bar_1.jpg'
import bar_2 from '@/assets/images/facilities/bar_2.jpg'
import bar_3 from '@/assets/images/facilities/bar_3.jpg'
import bar_4 from '@/assets/images/facilities/bar_4.jpg'
import business_1 from '@/assets/images/facilities/business_1.jpg'
import business_2 from '@/assets/images/facilities/business_2.jpg'
import business_3 from '@/assets/images/facilities/business_3.jpg'
import business_4 from '@/assets/images/facilities/business_4.jpg'
import children_1 from '@/assets/images/facilities/children_1.jpg'
import children_2 from '@/assets/images/facilities/children_2.jpg'
import children_3 from '@/assets/images/facilities/children_3.jpg'
import children_4 from '@/assets/images/facilities/children_4.jpg'

// 主要設施數據
const mainFacilities = ref([
  {
    title: '無邊際泳池',
    image: pool_banner,
    icon: 'fas fa-swimming-pool',
    hours: '06:00 - 22:00',
    location: '頂樓',
    description:
      '俯瞰城市美景的頂樓無邊際泳池，提供獨特的游泳體驗。恆溫水質與舒適的躺椅，讓您在任何季節都能享受游泳的樂趣。',
    extendedDescription:
      '我們的無邊際泳池是酒店的標誌性設施，設計靈感來自自然流水的優雅曲線。泳池邊緣與地平線融為一體，創造出無限延伸的視覺效果，讓您在游泳時彷彿與天空相連。',
    features: [
      {
        icon: 'fas fa-temperature-high',
        text: '恆溫水質',
        description: '全年保持舒適的水溫，無論季節變化，都能享受愉快的游泳體驗。'
      },
      {
        icon: 'fas fa-umbrella-beach',
        text: '池畔服務',
        description: '專業服務人員隨時為您提供毛巾、飲品和小食，讓您的池畔時光更加愜意。'
      },
      {
        icon: 'fas fa-cocktail',
        text: '特色飲品',
        description: '提供多種特調雞尾酒和健康果汁，為您的游泳時光增添風味。'
      },
      {
        icon: 'fas fa-sun',
        text: '日光浴區',
        description: '寬敞的日光浴區配備豪華躺椅，讓您在享受陽光的同時欣賞城市美景。'
      }
    ],
    galleryImages: [pool_1, pool_2, pool_3, pool_4],
    related: ['水療中心', '屋頂酒吧']
  },
  {
    title: '水療中心',
    image: spa_banner,
    icon: 'fas fa-spa',
    hours: '10:00 - 22:00',
    location: '3樓',
    description:
      '我們的水療中心提供全方位的放鬆與恢復療程，由專業的水療師為您提供個性化的服務。使用頂級有機護膚品，讓您的身心靈得到全面的呵護。',
    extendedDescription:
      '水療中心採用東方與西方結合的理念，打造寧靜舒適的環境。每個療程都經過精心設計，旨在恢復身體平衡，釋放壓力，提升整體健康。',
    features: [
      {
        icon: 'fas fa-hot-tub',
        text: '熱石按摩',
        description: '使用火山岩石進行的傳統按摩療法，幫助緩解肌肉緊張和疼痛。'
      },
      {
        icon: 'fas fa-leaf',
        text: '有機護膚',
        description: '使用純天然有機成分的護膚產品，溫和而有效地改善肌膚狀態。'
      },
      {
        icon: 'fas fa-hands',
        text: '專業按摩',
        description: '由經驗豐富的按摩師提供多種按摩技術，包括瑞典式、泰式和深層組織按摩。'
      },
      {
        icon: 'fas fa-wind',
        text: '芳香療法',
        description: '使用精油進行的療法，通過香氣影響情緒和健康，促進身心平衡。'
      }
    ],
    galleryImages: [spa_1, spa_2, spa_3, spa_4],
    related: ['無邊際泳池', '健身中心']
  },
  {
    title: '米其林星級餐廳',
    image: restaurant_banner,
    icon: 'fas fa-utensils',
    hours: '11:30 - 14:30, 18:00 - 22:00',
    location: '2樓',
    description:
      '由國際知名主廚主理的米其林星級餐廳，提供融合東西方風味的創新料理。使用當季最新鮮的食材，為您帶來無與倫比的味覺享受。',
    extendedDescription:
      '我們的餐廳以創新的烹飪技術和對細節的極致追求而聞名，每道菜品都是藝術品。主廚堅持使用當地有機食材，並與小型農場合作，確保食材的新鮮和可持續性。',
    features: [
      {
        icon: 'fas fa-award',
        text: '米其林星級',
        description: '連續五年獲得米其林星級評價，是城市中備受推崇的頂級餐廳之一。'
      },
      {
        icon: 'fas fa-wine-glass-alt',
        text: '精選酒單',
        description: '由專業侍酒師精心挑選的葡萄酒單，包含來自世界各地的珍稀佳釀。'
      },
      {
        icon: 'fas fa-seedling',
        text: '有機食材',
        description: '使用當地有機農場提供的時令食材，確保每道菜品的新鮮和營養。'
      },
      {
        icon: 'fas fa-user-chef',
        text: '名廚主理',
        description: '由國際知名主廚領導的廚師團隊，將傳統技巧與現代創新完美結合。'
      }
    ],
    galleryImages: [restaurant_1, restaurant_2, restaurant_3, restaurant_4],
    related: ['屋頂酒吧', '商務中心']
  },
  {
    title: '健身中心',
    image: gym_banner,
    icon: 'fas fa-dumbbell',
    hours: '24小時開放',
    location: '4樓',
    description:
      '配備最新健身器材的現代化健身中心，提供全方位的健身體驗。無論您是希望保持日常鍛煉還是尋求專業指導，我們都能滿足您的需求。',
    extendedDescription:
      '我們的健身中心擁有寬敞明亮的空間和全景落地窗，讓您在鍛煉的同時欣賞城市美景。所有器材均來自國際頂級品牌，定期更新和維護，確保最佳使用體驗。',
    features: [
      {
        icon: 'fas fa-running',
        text: '有氧設備',
        description: '配備多種有氧器材，包括跑步機、橢圓機、單車和划船機等。'
      },
      {
        icon: 'fas fa-dumbbell',
        text: '重量訓練',
        description: '提供全套自由重量和固定重量訓練設備，滿足不同強度的鍛煉需求。'
      },
      {
        icon: 'fas fa-user-friends',
        text: '私人教練',
        description: '專業認證的私人教練可提供一對一指導，幫助您達成健身目標。'
      },
      {
        icon: 'fas fa-heartbeat',
        text: '健康評估',
        description: '提供全面的健康和體能評估，為您制定個性化的健身計劃。'
      }
    ],
    galleryImages: [gym_1, gym_2, gym_3, gym_4],
    related: ['水療中心', '無邊際泳池']
  },
  {
    title: '屋頂酒吧',
    image: rooftop_banner,
    icon: 'fas fa-glass-cheers',
    hours: '16:00 - 01:00',
    location: '頂樓',
    description:
      '享受精緻調酒與壯麗城市夜景的絕佳場所。我們的屋頂酒吧提供獨特的雞尾酒和精選葡萄酒，是放鬆社交的理想選擇。',
    extendedDescription:
      '屋頂酒吧是欣賞城市全景的最佳地點，特別是在日落和夜晚時分。酒吧設計融合了現代與復古元素，營造出既時尚又舒適的氛圍。',
    features: [
      {
        icon: 'fas fa-cocktail',
        text: '特色雞尾酒',
        description: '由專業調酒師創作的獨特雞尾酒，使用優質烈酒和新鮮食材調製。'
      },
      {
        icon: 'fas fa-wine-bottle',
        text: '精選葡萄酒',
        description: '來自世界各地的精選葡萄酒，滿足不同口味的需求。'
      },
      {
        icon: 'fas fa-cheese',
        text: '精緻小食',
        description: '提供多種精緻小食和開胃菜，完美搭配各類飲品。'
      },
      {
        icon: 'fas fa-music',
        text: '現場音樂',
        description: '定期舉辦現場音樂表演，為您的夜晚增添活力和樂趣。'
      }
    ],
    galleryImages: [bar_1, bar_2, bar_3, bar_4],
    related: ['米其林星級餐廳', '無邊際泳池']
  },
  {
    title: '商務中心',
    image: business_banner,
    icon: 'fas fa-briefcase',
    hours: '08:00 - 20:00',
    location: '1樓',
    description:
      '全方位商務服務與會議設施，為您的商務需求提供專業支持。無論是小型會議還是大型活動，我們都能提供完善的解決方案。',
    extendedDescription:
      '我們的商務中心配備最新的技術設備和舒適的會議空間，為各類商務活動提供理想環境。專業的商務團隊隨時為您提供協助，確保您的活動順利進行。',
    features: [
      {
        icon: 'fas fa-chalkboard',
        text: '會議室',
        description: '多種規格的會議室可供選擇，配備高清投影儀、視頻會議系統等設備。'
      },
      {
        icon: 'fas fa-print',
        text: '商務服務',
        description: '提供打印、複印、掃描、傳真等全方位商務服務。'
      },
      {
        icon: 'fas fa-wifi',
        text: '高速網絡',
        description: '全區域覆蓋高速WiFi，確保您的網絡連接穩定快速。'
      },
      {
        icon: 'fas fa-coffee',
        text: '茶點服務',
        description: '提供高品質的咖啡、茶和各類茶點，為您的會議增添舒適體驗。'
      }
    ],
    galleryImages: [business_1, business_2, business_3, business_4],
    related: ['米其林星級餐廳', '兒童遊戲室']
  },
  {
    title: '兒童遊戲室',
    image: children_banner,
    icon: 'fas fa-child',
    hours: '09:00 - 19:00',
    location: '3樓',
    description:
      '專為兒童設計的娛樂空間，提供安全、有趣的活動和遊戲。由專業的兒童照顧人員監督，讓父母安心享受自己的時光。',
    extendedDescription:
      '兒童遊戲室採用明亮的色彩和創意設計，激發孩子們的想像力和創造力。所有遊戲設施均符合國際安全標準，確保孩子們在玩樂中的安全。',
    features: [
      {
        icon: 'fas fa-gamepad',
        text: '互動遊戲',
        description: '各種適合不同年齡段兒童的互動遊戲，促進智力和社交發展。'
      },
      {
        icon: 'fas fa-paint-brush',
        text: '創意工作坊',
        description: '定期舉辦繪畫、手工等創意活動，培養孩子的藝術才能。'
      },
      {
        icon: 'fas fa-book-reader',
        text: '閱讀角落',
        description: '提供豐富的兒童讀物，營造安靜舒適的閱讀環境。'
      },
      {
        icon: 'fas fa-baby',
        text: '專業照顧',
        description: '經過專業培訓的兒童照顧人員，確保每個孩子都得到適當的關注和照顧。'
      }
    ],
    galleryImages: [children_1, children_2, children_3, children_4],
    related: ['商務中心', '水療中心']
  }
])

// 合併所有設施數據
const allFacilities = ref([...mainFacilities.value])

// 當前選中的設施索引
const selectedFacilityIndex = ref(0)

// 當前選中的設施
const selectedFacility = computed(() => {
  return allFacilities.value[selectedFacilityIndex.value] || null
})

// 相關設施
const relatedFacilities = computed(() => {
  if (!selectedFacility.value || !selectedFacility.value.related) return []

  return selectedFacility.value.related
    .map((title) => {
      return allFacilities.value.find((f) => f.title === title) || null
    })
    .filter((f) => f !== null)
})

// 選擇設施
const selectFacility = (index) => {
  if (index === selectedFacilityIndex.value) return // 避免重複選擇

  selectedFacilityIndex.value = index
  // 使用更簡單的滾動方式
  const showcase = document.querySelector('.facility-showcase')
  if (showcase) {
    showcase.scrollIntoView({ block: 'start' })
  }
}

// 使用 v-show
const isFacilityVisible = ref(true)

// 預加載圖片
const preloadImages = () => {
  allFacilities.value.forEach((facility) => {
    const img = new Image()
    img.src = facility.image
  })
}

onMounted(() => {
  window.scrollTo(0, 0)
  preloadImages()
})

// 組件卸載時清理
onUnmounted(() => {
  selectedFacilityIndex.value = 0
  isFacilityVisible.value = true
})
</script>

<style scoped></style>
