<template>
  <div class="attractions-page" :class="{ 'no-scroll': selectedAttraction }">
    <!-- 頁面頂部橫幅 -->
    <div class="attractions-banner">
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <h2>探索周邊精彩</h2>
        <p>
          SHIBA飯店位於台北市信義區松高路123號，周邊擁有豐富的觀光資源與文化體驗。從繁華的購物中心到歷史人文景點，我們為您精選了最值得一遊的地方，讓您的台北之旅更加豐富多彩。
        </p>
      </div>
    </div>

    <!-- 景點分類導航 -->
    <section class="attractions-category">
      <div class="container">
        <h3 class="category-title">選擇景點類型</h3>
        <div class="category-nav">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="category-item"
            :class="{ active: selectedCategory === category.id }"
            @click="selectCategory(category.id)"
          >
            <div class="category-icon">
              <i :class="category.icon"></i>
            </div>
            <span>{{ category.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 景點列表 -->
    <section class="attractions-list">
      <div class="container">
        <div class="section-header">
          <h2>{{ getCategoryName(selectedCategory) }}</h2>
          <p>距離飯店的步行或車程時間</p>
        </div>

        <div class="attractions-grid">
          <div
            v-for="(attraction, index) in filteredAttractions"
            :key="index"
            class="attraction-card-wrapper"
          >
            <div class="attraction-card" @click="showAttractionDetail(attraction)">
              <div
                class="attraction-image"
                :style="{ backgroundImage: `url(${attraction.image})` }"
              >
                <div class="attraction-distance">
                  <i :class="attraction.transportIcon"></i>
                  <span>{{ attraction.distance }}</span>
                </div>
              </div>
              <div class="attraction-content">
                <h3>{{ attraction.name }}</h3>
                <p class="attraction-description">{{ attraction.shortDescription }}</p>
                <div class="attraction-meta">
                  <span class="attraction-type">
                    <i :class="getCategoryIcon(attraction.categoryId)"></i>
                    {{ getCategoryName(attraction.categoryId) }}
                  </span>
                  <span class="attraction-more">了解更多 <i class="fas fa-arrow-right"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 景點詳情彈窗 -->
    <div class="attraction-modal" v-if="selectedAttraction" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-modal" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        <div class="modal-image" :style="{ backgroundImage: `url(${selectedAttraction.image})` }">
          <div class="modal-image-overlay"></div>
          <h2 class="modal-title">{{ selectedAttraction.name }}</h2>
        </div>
        <div class="modal-body">
          <div class="modal-info">
            <div class="info-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ selectedAttraction.address }}</span>
            </div>
            <div class="info-item">
              <i class="fas fa-clock"></i>
              <span>{{ selectedAttraction.openingHours }}</span>
            </div>
            <div class="info-item">
              <i :class="selectedAttraction.transportIcon"></i>
              <span>{{ selectedAttraction.distance }}</span>
            </div>
          </div>
          <div class="modal-description">
            <p v-html="selectedAttraction.description"></p>
          </div>
          <div class="modal-actions">
            <a :href="selectedAttraction.mapUrl" target="_blank" class="btn btn-primary">
              <i class="fas fa-map-marked-alt"></i> 在地圖上查看
            </a>
            <a :href="selectedAttraction.website" target="_blank" class="btn btn-outline">
              <i class="fas fa-globe"></i> 官方網站
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 飯店位置地圖 -->
    <section class="hotel-location">
      <div class="container">
        <div class="section-header">
          <h2>飯店位置</h2>
          <p>台北市信義區松高路123號</p>
        </div>
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7032465648313!2d121.56377931500844!3d25.036888983972193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6da80a7ad%3A0xacc4d11dc963103c!2z5Y-w5YyX5biC5L-h576p5Y2A5p2-6auY6LevMTIz6Jmf!5e0!3m2!1szh-TW!2stw!4v1646209523930!5m2!1szh-TW!2stw"
            width="100%"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          >
          </iframe>
        </div>
      </div>
    </section>

    <!-- 交通指南 -->
    <section class="transportation-guide">
      <div class="container">
        <div class="section-header">
          <h2>交通指南</h2>
          <p>多種便捷方式抵達SHIBA飯店</p>
        </div>
        <div class="transport-options">
          <div class="transport-item">
            <div class="transport-icon">
              <i class="fas fa-subway"></i>
            </div>
            <h3>捷運</h3>
            <p>搭乘捷運板南線至「台北101/世貿站」下車，自2號出口步行約5分鐘即可抵達。</p>
          </div>
          <div class="transport-item">
            <div class="transport-icon">
              <i class="fas fa-bus"></i>
            </div>
            <h3>公車</h3>
            <p>
              搭乘公車信義線、藍22、藍26、1、33、37、270、284至「台北101/世貿站」下車，步行約3分鐘即可抵達。
            </p>
          </div>
          <div class="transport-item">
            <div class="transport-icon">
              <i class="fas fa-car"></i>
            </div>
            <h3>自行開車</h3>
            <p>導航至「台北市信義區松高路123號」，飯店提供地下停車場服務（需額外付費）。</p>
          </div>
          <div class="transport-item">
            <div class="transport-icon">
              <i class="fas fa-plane"></i>
            </div>
            <h3>機場接送</h3>
            <p>
              從桃園國際機場出發，車程約45分鐘；從松山機場出發，車程約15分鐘。飯店提供專車接送服務，請提前預約。
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import attraction_1 from '@/assets/images/attractions/attraction_1.jpg'
import attraction_2 from '@/assets/images/attractions/attraction_2.jpg'
import attraction_3 from '@/assets/images/attractions/attraction_3.jpg'
import attraction_4 from '@/assets/images/attractions/attraction_4.jpg'
import attraction_5 from '@/assets/images/attractions/attraction_5.jpg'
import attraction_6 from '@/assets/images/attractions/attraction_6.jpg'
import attraction_7 from '@/assets/images/attractions/attraction_7.jpg'
import attraction_8 from '@/assets/images/attractions/attraction_8.jpg'

// 狀態定義
const selectedCategory = ref('all')
const selectedAttraction = ref(null)

// 分類資料
const categories = [
  { id: 'all', name: '全部景點', icon: 'fas fa-globe-asia' },
  { id: 'shopping', name: '購物中心', icon: 'fas fa-shopping-bag' },
  { id: 'culture', name: '文化景點', icon: 'fas fa-landmark' },
  { id: 'nature', name: '自然風光', icon: 'fas fa-mountain' },
  { id: 'entertainment', name: '休閒娛樂', icon: 'fas fa-ticket-alt' },
  { id: 'food', name: '美食推薦', icon: 'fas fa-utensils' }
]

// 景點資料
const attractions = [
  {
    id: 1,
    name: '台北101',
    categoryId: 'shopping',
    image: attraction_1,
    shortDescription: '台灣地標性建築，擁有世界級購物中心與觀景台',
    description:
      '台北101是台灣的地標性建築，曾是世界最高建築。這座摩天大樓擁有世界級的購物中心，匯集國際精品與本地特色商店。86樓的室內觀景台和91樓的戶外觀景台提供了台北市的壯麗全景。每年的跨年煙火秀更是台北最受矚目的活動之一。',
    address: '台北市信義區信義路五段7號',
    openingHours: '購物中心：11:00-21:30，觀景台：09:00-22:00',
    distance: '步行5分鐘',
    transportIcon: 'fas fa-walking',
    mapUrl: 'https://goo.gl/maps/JQUfHZL8oHgKZnJH6',
    website: 'https://www.taipei-101.com.tw/'
  },
  {
    id: 2,
    name: '松山文創園區',
    categoryId: 'culture',
    image: attraction_2,
    shortDescription: '前身為松山菸廠，現為文創展演空間',
    description:
      '松山文創園區前身為台灣日治時期的松山菸廠，現已轉型為文化創意產業園區。園區內保留了許多歷史建築，並結合現代設計元素，成為展覽、表演、市集等多元活動的場所。這裡也有許多特色商店、咖啡廳和餐廳，是文青必訪的地方。',
    address: '台北市信義區光復南路133號',
    openingHours: '09:00-18:00（特展依活動而定）',
    distance: '步行10分鐘',
    transportIcon: 'fas fa-walking',
    mapUrl: 'https://goo.gl/maps/8ZZV5zLQJQXJGvSS6',
    website: 'https://www.songshanculturalpark.org/'
  },
  {
    id: 3,
    name: '象山步道',
    categoryId: 'nature',
    image: attraction_3,
    shortDescription: '俯瞰台北市區的熱門登山步道',
    description:
      '象山步道是台北市區最受歡迎的登山路線之一，以其壯觀的台北市區景觀而聞名。從山頂可以欣賞到台北101和整個信義區的全景，特別是在黃昏和夜晚時分，景色更是迷人。步道難度適中，適合各年齡層的遊客，是拍攝台北夜景的最佳地點之一。',
    address: '台北市信義區信義路五段150巷',
    openingHours: '全天開放（建議日出或黃昏前往）',
    distance: '步行15分鐘',
    transportIcon: 'fas fa-walking',
    mapUrl: 'https://goo.gl/maps/YZ8jKo2RZeQtVBtC7',
    website: 'https://travel.taipei/zh-tw/attraction/details/1443'
  },
  {
    id: 4,
    name: '誠品信義店',
    categoryId: 'shopping',
    image: attraction_4,
    shortDescription: '24小時營業的文化地標與購物中心',
    description:
      '誠品信義店是台北最具代表性的書店與文化地標，24小時營業的書店樓層成為許多文青的深夜天堂。除了豐富的書籍收藏外，這裡還有精品店、生活雜貨、餐廳和咖啡廳，是集閱讀、購物和休閒於一體的複合式空間。',
    address: '台北市信義區松高路11號',
    openingHours: '書店：24小時營業，商場：11:00-22:00',
    distance: '步行3分鐘',
    transportIcon: 'fas fa-walking',
    mapUrl: 'https://goo.gl/maps/5Z5Z5Z5Z5Z5Z5Z5Z5',
    website: 'https://www.eslite.com/'
  },
  {
    id: 5,
    name: '國立故宮博物院',
    categoryId: 'culture',
    image: attraction_5,
    shortDescription: '收藏中華文化瑰寶的世界級博物館',
    description:
      '國立故宮博物院擁有全球最豐富的中華藝術寶藏，收藏近70萬件文物，包括書法、繪畫、玉器、陶瓷等，其中最著名的展品包括翠玉白菜和肉形石。博物館建築本身也是中國宮殿式的壯觀建築，是了解中華文化藝術的重要場所。',
    address: '台北市士林區至善路二段221號',
    openingHours: '08:30-18:30（週五、週六延長至21:00）',
    distance: '車程20分鐘',
    transportIcon: 'fas fa-car',
    mapUrl: 'https://goo.gl/maps/QqJJZZ2Z2Z2Z2Z2Z2',
    website: 'https://www.npm.gov.tw/'
  },
  {
    id: 6,
    name: '饒河街觀光夜市',
    categoryId: 'food',
    image: attraction_6,
    shortDescription: '台北最具規模的觀光夜市之一',
    description:
      '饒河街觀光夜市是台北最具規模的觀光夜市之一，擁有超過500個攤位，提供各式各樣的台灣小吃、服飾、飾品和遊戲攤位。這裡可以品嚐到臭豆腐、蚵仔煎、胡椒餅等台灣傳統美食，體驗最道地的台灣夜市文化。',
    address: '台北市松山區饒河街',
    openingHours: '16:00-24:00',
    distance: '車程10分鐘',
    transportIcon: 'fas fa-car',
    mapUrl: 'https://goo.gl/maps/3Z3Z3Z3Z3Z3Z3Z3Z3',
    website: 'https://travel.taipei/zh-tw/attraction/details/1485'
  },
  {
    id: 7,
    name: '華山1914文創園區',
    categoryId: 'entertainment',
    image: attraction_7,
    shortDescription: '舊酒廠改建的多元藝文空間',
    description:
      '華山1914文創園區前身為台灣日治時期的酒廠，現已轉型為藝文展演空間。園區內有各種展覽、表演、市集和工作坊，還有特色餐廳、咖啡廳和創意商店。這裡經常舉辦音樂會、藝術展和文創市集，是台北文化創意產業的重要基地。',
    address: '台北市中正區八德路一段1號',
    openingHours: '09:00-22:00（依活動而定）',
    distance: '車程15分鐘',
    transportIcon: 'fas fa-car',
    mapUrl: 'https://goo.gl/maps/4Z4Z4Z4Z4Z4Z4Z4Z4',
    website: 'https://www.huashan1914.com/'
  },
  {
    id: 8,
    name: '四四南村',
    categoryId: 'culture',
    image: attraction_8,
    shortDescription: '保存完好的眷村文化園區',
    description:
      '四四南村是台北少數保存完好的眷村，原為台灣省政府退除役官兵及其眷屬的居住地。現在這裡成為文化園區，保留了眷村的建築風格和生活痕跡，讓遊客了解台灣特殊的眷村文化。園區內還有「好丘」等特色咖啡店和文創商店，是拍照打卡的熱門地點。',
    address: '台北市信義區松勤街50號',
    openingHours: '09:00-17:00',
    distance: '步行8分鐘',
    transportIcon: 'fas fa-walking',
    mapUrl: 'https://goo.gl/maps/6Z6Z6Z6Z6Z6Z6Z6Z6',
    website: 'https://travel.taipei/zh-tw/attraction/details/1551'
  }
]

// 計算屬性
const filteredAttractions = computed(() => {
  if (selectedCategory.value === 'all') {
    return attractions
  } else {
    return attractions.filter((attraction) => attraction.categoryId === selectedCategory.value)
  }
})

// 方法
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
}

const getCategoryName = (categoryId) => {
  const category = categories.find((cat) => cat.id === categoryId)
  return category ? category.name : ''
}

const getCategoryIcon = (categoryId) => {
  const category = categories.find((cat) => cat.id === categoryId)
  return category ? category.icon : ''
}

const showAttractionDetail = (attraction) => {
  selectedAttraction.value = attraction
}

const closeModal = () => {
  selectedAttraction.value = null
}
</script>
