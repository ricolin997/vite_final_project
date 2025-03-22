<template>
  <div class="privacy-page">
    <!-- 頁面標題區域 -->
    <section class="page-header">
      <div class="container">
        <h1>隱私政策</h1>
        <div class="breadcrumb">
          <router-link to="/">首頁</router-link>
          <span class="separator">/</span>
          <span class="current">隱私政策</span>
        </div>
      </div>
    </section>

    <!-- 主要內容區域 -->
    <section class="privacy-content">
      <div class="container">
        <div class="content-wrapper">
          <!-- 導覽目錄 -->
          <div class="privacy-nav">
            <div class="nav-container">
              <h3>目錄</h3>
              <ul>
                <li v-for="(section, index) in sections" :key="index">
                  <a
                    :href="`#section-${index}`"
                    @click.prevent="scrollToSection(`section-${index}`)"
                  >
                    {{ section.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 隱私政策內容 -->
          <div class="privacy-text">
            <div class="intro-text">
              <p>
                SHIBA飯店（以下簡稱「我們」）非常重視您的隱私。本隱私政策旨在說明我們如何收集、使用、披露和保護您的個人資料。請您在使用我們的服務前，詳細閱讀本隱私政策。
              </p>
              <p>
                本隱私政策適用於我們的網站、行動應用程式、實體飯店及所有相關服務。當您使用我們的服務時，即表示您同意本隱私政策中描述的做法。
              </p>
              <p>最後更新日期：2023年12月15日</p>
            </div>

            <div
              v-for="(section, index) in sections"
              :key="index"
              :id="`section-${index}`"
              :ref="el => { if(el) sectionRefs[index] = el }"
              class="policy-section"
            >
              <h2>{{ section.title }}</h2>
              <div v-html="section.content"></div>
            </div>

            <div class="contact-info">
              <h2>聯絡我們</h2>
              <p>如果您對本隱私政策有任何疑問或需要行使您的權利，請透過以下方式聯絡我們：</p>
              <ul>
                <li><strong>電子郵件：</strong> privacy@shibahotel.com</li>
                <li><strong>電話：</strong> (02) 2345-6789</li>
                <li><strong>地址：</strong> 台北市信義區松高路123號</li>
              </ul>
              <p>
                我們承諾在收到您的請求後30天內回覆。如果您對我們處理您請求的方式不滿意，您有權向當地資料保護機構提出投訴。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 儲存各章節的參考
const sectionRefs = ref([])

// 隱私政策各章節內容
const sections = ref([
  {
    title: '我們收集的資料',
    content: `
      <p>我們可能會收集以下類型的個人資料：</p>
      <h3>您直接提供給我們的資料</h3>
      <ul>
        <li><strong>身份資料：</strong> 姓名、出生日期、國籍、身份證或護照號碼等。</li>
        <li><strong>聯絡資料：</strong> 電子郵件地址、電話號碼、郵寄地址等。</li>
        <li><strong>帳戶資料：</strong> 用戶名稱、密碼、會員號碼等。</li>
        <li><strong>財務資料：</strong> 信用卡資訊、銀行帳戶資訊等（我們不會儲存完整的信用卡資訊）。</li>
        <li><strong>住宿偏好：</strong> 房型偏好、特殊需求、飲食限制等。</li>
        <li><strong>反饋資料：</strong> 您提供的評價、意見和調查回覆等。</li>
      </ul>
      
      <h3>當您使用我們的服務時自動收集的資料</h3>
      <ul>
        <li><strong>使用資料：</strong> 您如何使用我們的網站、應用程式和服務的資料。</li>
        <li><strong>位置資料：</strong> 您的設備位置（如果您已授權）。</li>
        <li><strong>設備資料：</strong> 設備類型、操作系統、瀏覽器類型、IP地址等。</li>
        <li><strong>Cookie和類似技術：</strong> 我們使用Cookie和類似技術收集和儲存資料。</li>
      </ul>
      
      <h3>從第三方獲取的資料</h3>
      <ul>
        <li><strong>合作夥伴：</strong> 旅行社、線上訂房平台等。</li>
        <li><strong>社交媒體：</strong> 當您使用社交媒體帳戶登入我們的服務時。</li>
        <li><strong>公開來源：</strong> 公開可用的資料庫和資料來源。</li>
      </ul>
    `
  },
  {
    title: '我們如何使用您的資料',
    content: `
      <p>我們使用您的個人資料的主要目的包括：</p>
      <ul>
        <li><strong>提供服務：</strong> 處理您的預訂、提供住宿和相關服務、處理付款等。</li>
        <li><strong>客戶服務：</strong> 回應您的詢問、請求和投訴，提供客戶支援。</li>
        <li><strong>個人化體驗：</strong> 根據您的偏好和過去的互動定制您的體驗。</li>
        <li><strong>營銷：</strong> 向您發送有關我們產品、服務和促銷的資訊（如果您已同意）。</li>
        <li><strong>改進服務：</strong> 分析使用模式，進行市場研究，改進我們的服務。</li>
        <li><strong>安全：</strong> 保護我們的系統、資產和客人的安全。</li>
        <li><strong>法律義務：</strong> 遵守適用的法律、法規和政府要求。</li>
      </ul>
      
      <p>我們僅在有合法基礎的情況下處理您的個人資料，包括：</p>
      <ul>
        <li>履行與您的合約（例如，處理您的預訂）</li>
        <li>我們的合法利益（例如，改進我們的服務）</li>
        <li>您的同意（例如，營銷通訊）</li>
        <li>遵守法律義務</li>
      </ul>
    `
  },
  {
    title: '資料共享與披露',
    content: `
      <p>我們可能會在以下情況下共享您的個人資料：</p>
      <ul>
        <li><strong>服務提供商：</strong> 我們使用第三方服務提供商協助我們提供服務，如支付處理、IT服務、客戶服務等。</li>
        <li><strong>集團公司：</strong> 我們可能會與我們的母公司、子公司和關聯公司共享資料。</li>
        <li><strong>業務合作夥伴：</strong> 我們可能會與業務合作夥伴共享資料，以提供您請求的服務（例如，安排機場接送）。</li>
        <li><strong>法律要求：</strong> 我們可能會在法律要求的情況下披露您的資料，例如回應法院命令或政府要求。</li>
        <li><strong>業務轉讓：</strong> 如果我們參與合併、收購或資產出售，您的資料可能會被轉讓。</li>
        <li><strong>您的同意：</strong> 我們可能會在獲得您的同意後共享您的資料。</li>
      </ul>
      
      <p>我們不會出售您的個人資料給第三方。當我們與第三方共享您的資料時，我們會確保他們遵守適當的保密和安全措施。</p>
    `
  },
  {
    title: '資料安全',
    content: `
      <p>我們實施了適當的技術和組織措施，以保護您的個人資料免受未經授權的訪問、使用、披露、修改或破壞。這些措施包括：</p>
      <ul>
        <li>使用加密技術保護資料傳輸和儲存</li>
        <li>實施訪問控制機制</li>
        <li>定期安全評估和審計</li>
        <li>員工培訓和保密協議</li>
      </ul>
      
      <p>然而，請注意，沒有任何網絡傳輸或電子儲存方法是100%安全的。因此，雖然我們努力使用商業上可接受的方式保護您的個人資料，但我們不能保證其絕對安全。</p>
    `
  },
  {
    title: '資料保留',
    content: `
      <p>我們會在實現收集目的所需的時間內保留您的個人資料，除非法律要求或允許更長的保留期。確定適當的保留期時，我們會考慮：</p>
      <ul>
        <li>我們需要資料的時間長度</li>
        <li>資料的敏感性</li>
        <li>適用的法律要求</li>
        <li>潛在的爭議風險</li>
      </ul>
      
      <p>當不再需要您的個人資料時，我們會安全地刪除或匿名化這些資料。</p>
    `
  },
  {
    title: '您的權利',
    content: `
      <p>根據適用的資料保護法律，您可能擁有以下權利：</p>
      <ul>
        <li><strong>訪問權：</strong> 您有權獲取我們持有的關於您的個人資料的副本。</li>
        <li><strong>更正權：</strong> 您有權要求更正不準確或不完整的個人資料。</li>
        <li><strong>刪除權：</strong> 在某些情況下，您有權要求刪除您的個人資料。</li>
        <li><strong>限制處理權：</strong> 在某些情況下，您有權限制我們處理您的個人資料。</li>
        <li><strong>資料可攜權：</strong> 您有權以結構化、常用和機器可讀的格式接收您的個人資料，並有權將這些資料傳輸給另一個控制者。</li>
        <li><strong>反對權：</strong> 您有權反對我們基於合法利益處理您的個人資料，以及用於直接營銷目的的處理。</li>
        <li><strong>撤回同意權：</strong> 如果我們基於您的同意處理您的個人資料，您有權隨時撤回您的同意。</li>
      </ul>
      
      <p>要行使這些權利，請使用本政策末尾提供的聯絡資訊與我們聯繫。請注意，這些權利可能受到某些例外和限制。</p>
    `
  },
  {
    title: 'Cookie政策',
    content: `
      <p>我們使用Cookie和類似技術（如網絡信標、像素和本地存儲）來收集和儲存資訊。Cookie是放置在您的設備上的小型文本文件，用於記住您的偏好、改善您的體驗和幫助我們了解您如何使用我們的服務。</p>
      
      <h3>我們使用的Cookie類型</h3>
      <ul>
        <li><strong>必要Cookie：</strong> 這些Cookie對於網站的運行是必不可少的，不能在我們的系統中關閉。</li>
        <li><strong>性能Cookie：</strong> 這些Cookie收集有關您如何使用我們網站的資訊，幫助我們改進網站性能。</li>
        <li><strong>功能Cookie：</strong> 這些Cookie使網站能夠記住您的選擇（如語言偏好），並提供更個人化的功能。</li>
        <li><strong>廣告Cookie：</strong> 這些Cookie用於向您展示相關廣告，並幫助我們衡量廣告活動的效果。</li>
      </ul>
      
      <h3>管理Cookie</h3>
      <p>大多數網絡瀏覽器允許您控制Cookie。您可以設置瀏覽器拒絕所有Cookie，或在發送Cookie時通知您。然而，如果您拒絕Cookie，我們網站的某些功能可能無法正常工作。</p>
    `
  },
  {
    title: '兒童隱私',
    content: `
      <p>我們的服務不針對16歲以下的兒童。我們不會故意收集16歲以下兒童的個人資料。如果您是父母或監護人，並且您認為您的孩子向我們提供了個人資料，請聯繫我們，我們將採取措施從我們的系統中刪除這些資料。</p>
    `
  },
  {
    title: '國際資料傳輸',
    content: `
      <p>我們可能會將您的個人資料傳輸到台灣以外的國家或地區，包括我們的服務提供商所在的國家或地區。這些國家或地區的資料保護法律可能與您所在國家或地區的法律不同。</p>
      
      <p>當我們傳輸您的個人資料到其他國家或地區時，我們會採取適當的措施確保您的資料得到充分的保護，例如使用標準合同條款或確保接收方遵守認可的資料保護框架。</p>
    `
  },
  {
    title: '政策更新',
    content: `
      <p>我們可能會不時更新本隱私政策，以反映我們做法的變化或法律要求的變更。更新後的政策將在我們的網站上發布，並在顯著位置註明最後更新日期。</p>
      
      <p>對於重大變更，我們可能會通過電子郵件或網站通知等方式直接通知您。我們鼓勵您定期查看本政策，以了解我們如何保護您的資料。</p>
    `
  }
])

// 滾動到指定章節
const scrollToSection = (sectionId) => {
  const index = parseInt(sectionId.split('-')[1])
  if (sectionRefs.value[index]) {
    const yOffset = -100 // 調整滾動位置的偏移量
    const element = sectionRefs.value[index]
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

// 初始化章節參考陣列
onMounted(() => {
  sectionRefs.value = new Array(sections.value.length).fill(null)
})
</script>
