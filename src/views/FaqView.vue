<template>
  <div class="faq-page">
    <!-- 頁面標題區域 -->
    <section class="page-header">
      <div class="container">
        <h1>常見問題</h1>
        <div class="breadcrumb">
          <router-link to="/">首頁</router-link>
          <span class="separator">/</span>
          <span class="current">常見問題</span>
        </div>
      </div>
    </section>

    <!-- 主要內容區域 -->
    <section class="faq-content">
      <div class="container">
        <!-- 搜尋區域 -->
        <div class="search-container">
          <div class="search-box">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="搜尋常見問題..."
              @input="filterQuestions"
            />
            <button class="search-btn">
              <i class="fas fa-search"></i>
            </button>
          </div>
          <p class="search-hint">您可以輸入關鍵字來搜尋相關問題</p>
        </div>

        <!-- 分類標籤 -->
        <div class="category-tabs">
          <button
            v-for="(category, index) in categories"
            :key="index"
            class="category-tab"
            :class="{ active: activeCategory === category.id }"
            @click="setActiveCategory(category.id)"
          >
            <i :class="category.icon"></i>
            {{ category.name }}
          </button>
        </div>

        <!-- 問題列表 -->
        <div class="faq-list">
          <div v-if="filteredQuestions.length === 0" class="no-results">
            <i class="fas fa-search"></i>
            <p>沒有找到符合「{{ searchQuery }}」的問題</p>
            <button @click="clearSearch" class="clear-search">清除搜尋</button>
          </div>

          <div
            v-for="(question, index) in filteredQuestions"
            :key="index"
            class="faq-item"
            :class="{ 'is-open': openQuestions.includes(question.id) }"
          >
            <div class="faq-question" @click="toggleQuestion(question.id)">
              <h3>{{ question.question }}</h3>
              <div class="toggle-icon">
                <i
                  class="fas"
                  :class="openQuestions.includes(question.id) ? 'fa-minus' : 'fa-plus'"
                ></i>
              </div>
            </div>
            <div class="faq-answer" v-show="openQuestions.includes(question.id)">
              <p v-html="question.answer"></p>
            </div>
          </div>
        </div>

        <!-- 聯絡我們區塊 -->
        <div class="contact-block">
          <div class="contact-content">
            <h2>沒有找到您的問題？</h2>
            <p>
              如果您有其他問題或需要更多協助，請隨時與我們聯繫。我們的客戶服務團隊將很樂意為您提供幫助。
            </p>
            <router-link to="/contact" class="contact-btn">聯絡我們</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 分類數據
const categories = ref([
  { id: 'all', name: '全部問題', icon: 'fas fa-list-ul' },
  { id: 'reservation', name: '預訂與取消', icon: 'fas fa-calendar-alt' },
  { id: 'rooms', name: '客房設施', icon: 'fas fa-bed' },
  { id: 'services', name: '飯店服務', icon: 'fas fa-concierge-bell' },
  { id: 'payment', name: '付款與發票', icon: 'fas fa-credit-card' },
  { id: 'others', name: '其他問題', icon: 'fas fa-question-circle' }
])

// 常見問題數據
const faqData = ref([
  {
    id: 1,
    category: 'reservation',
    question: '如何預訂房間？',
    answer:
      '您可以透過我們的官方網站、電話或電子郵件預訂房間。在官網上，只需選擇入住日期、退房日期和房型，然後按照指示完成預訂流程。建議提前預訂以確保您理想的入住日期和房型可用。'
  },
  {
    id: 2,
    category: 'reservation',
    question: '入住和退房時間是幾點？',
    answer:
      '標準入住時間為下午3點，退房時間為上午12點。如需提前入住或延遲退房，請提前與我們聯繫，我們將盡力配合您的需求（視房間供應情況而定，可能需要額外費用）。'
  },
  {
    id: 3,
    category: 'reservation',
    question: '如何取消或修改我的預訂？',
    answer:
      '您可以透過我們的官方網站或直接聯繫我們的客戶服務團隊取消或修改預訂。請注意，根據您選擇的費率計劃，可能適用不同的取消政策。一般而言，提前7天取消可獲得全額退款，提前3-7天取消將收取一晚房費，少於3天取消則不予退款。'
  },
  {
    id: 4,
    category: 'reservation',
    question: '我可以為特殊場合（如生日、週年紀念）安排驚喜嗎？',
    answer:
      '是的，我們很樂意協助您安排特殊場合的驚喜。請在預訂時或至少提前48小時告知我們您的需求，我們的團隊將為您準備特別的安排，如房間裝飾、香檳、蛋糕等。部分服務可能需要額外費用。'
  },
  {
    id: 5,
    category: 'rooms',
    question: '客房是否提供免費Wi-Fi？',
    answer: '是的，我們所有客房和公共區域均提供高速免費Wi-Fi服務。連接方式將在您辦理入住時提供。'
  },
  {
    id: 6,
    category: 'rooms',
    question: '客房是否配備迷你吧和咖啡機？',
    answer:
      '是的，所有客房均配備迷你吧、Nespresso咖啡機和精選茶品。迷你吧內的飲料和零食需額外付費，而咖啡和茶則是免費提供的。'
  },
  {
    id: 7,
    category: 'rooms',
    question: '客房是否有保險箱？',
    answer:
      '是的，每間客房都配備了電子保險箱，可供您存放貴重物品。使用說明在保險箱旁邊提供，如有任何問題，請聯繫前台。'
  },
  {
    id: 8,
    category: 'services',
    question: '飯店是否提供機場接送服務？',
    answer:
      '是的，我們提供機場接送服務。請在預訂時告知您的航班詳情，或至少提前24小時與我們聯繫安排接送服務。此服務需額外付費，費用將根據距離和車型而定。'
  },
  {
    id: 9,
    category: 'services',
    question: '飯店有健身中心和游泳池嗎？',
    answer:
      '是的，我們的飯店設有24小時開放的現代化健身中心和室內恆溫游泳池。健身中心配備最新的有氧和重量訓練設備，游泳池則提供毛巾服務。這些設施對所有住客免費開放。'
  },
  {
    id: 10,
    category: 'services',
    question: '飯店是否提供洗衣服務？',
    answer:
      '是的，我們提供洗衣和乾洗服務。您可以在客房內找到洗衣袋和價目表，填寫表格後交給客房服務人員或前台。一般洗衣服務24小時內完成，加急服務可在6小時內完成（需額外付費）。'
  },
  {
    id: 11,
    category: 'payment',
    question: '飯店接受哪些付款方式？',
    answer:
      '我們接受主要信用卡（Visa、MasterCard、American Express、JCB）、現金和銀行轉賬。某些預付費率可能僅限於特定付款方式，詳情請參閱預訂條款。'
  },
  {
    id: 12,
    category: 'payment',
    question: '入住時需要支付押金嗎？',
    answer:
      '是的，辦理入住手續時，我們會要求您提供信用卡授權或現金押金，以支付可能的額外費用（如迷你吧消費、餐廳用餐等）。押金金額通常為每晚房費的50%，退房時如無額外消費將全額退還。'
  },
  {
    id: 13,
    category: 'payment',
    question: '如何獲取住宿發票？',
    answer:
      '發票將在您退房時自動提供。如需特殊發票（如公司抬頭或統一編號），請在入住時或退房前告知前台。如需電子發票或在退房後獲取發票副本，請聯繫我們的會計部門。'
  },
  {
    id: 14,
    category: 'others',
    question: '飯店附近有哪些景點？',
    answer:
      '我們的飯店位於市中心，周邊有許多著名景點，包括博物館、購物中心、公園等。前台可為您提供詳細的旅遊資訊、地圖和建議。我們也提供導覽服務和票務協助。'
  },
  {
    id: 15,
    category: 'others',
    question: '飯店是否允許攜帶寵物？',
    answer:
      '是的，我們是寵物友善的飯店，允許客人攜帶寵物入住特定的寵物友善客房。每間客房最多允許兩隻寵物，每隻寵物需支付額外費用。請在預訂時告知您將攜帶寵物，以便我們安排合適的客房。我們也提供寵物床、食碗和其他寵物用品。'
  },
  {
    id: 16,
    category: 'others',
    question: '飯店是否有無障礙設施？',
    answer:
      '是的，我們的飯店設有無障礙客房和設施，包括輪椅通道、無障礙浴室和電梯。如需無障礙客房或有特殊需求，請在預訂時告知我們，我們將盡力滿足您的需求。'
  }
])

// 狀態變數
const activeCategory = ref('all')
const searchQuery = ref('')
const openQuestions = ref([])

// 根據分類和搜索過濾問題
const filteredQuestions = computed(() => {
  let result = faqData.value

  // 按分類過濾
  if (activeCategory.value !== 'all') {
    result = result.filter((q) => q.category === activeCategory.value)
  }

  // 按搜索詞過濾
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(
      (q) => q.question.toLowerCase().includes(query) || q.answer.toLowerCase().includes(query)
    )
  }

  return result
})

// 設置活動分類
const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
}

// 切換問題的開關狀態
const toggleQuestion = (questionId) => {
  if (openQuestions.value.includes(questionId)) {
    openQuestions.value = openQuestions.value.filter((id) => id !== questionId)
  } else {
    openQuestions.value.push(questionId)
  }
}

// 過濾問題的方法
const filterQuestions = () => {
  // 如果搜索詞不為空，自動顯示所有分類
  if (searchQuery.value.trim()) {
    activeCategory.value = 'all'
  }
}

// 清除搜索
const clearSearch = () => {
  searchQuery.value = ''
}

// 頁面載入時自動打開第一個問題
onMounted(() => {
  if (faqData.value.length > 0) {
    openQuestions.value = [faqData.value[0].id]
  }
})
</script>
