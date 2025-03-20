<template>
  <div class="contact-page">
    <!-- 頁面標題區域 -->
    <section class="page-header">
      <div class="contact-container">
        <h1>聯絡我們</h1>
        <div class="breadcrumb">
          <router-link to="/">首頁</router-link>
          <span class="separator">/</span>
          <span class="current">聯絡我們</span>
        </div>
      </div>
    </section>

    <!-- 主要內容區域 -->
    <section class="contact-content">
      <div class="contact-container">
        <div class="row">
          <!-- 左側聯絡訊息 -->
          <div class="col-lg-5 mb-5 mb-lg-0">
            <div class="contact-info">
              <h2>聯絡資訊</h2>
              <p class="intro-text">
                無論您有任何疑問或需求，我們的團隊隨時準備為您提供協助。請透過以下方式與我們聯繫，或填寫右側表單，我們將盡快回覆您。
              </p>

              <div class="contact-item">
                <div class="icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="content">
                  <h3>地址</h3>
                  <p>台北市信義區松高路123號</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="icon">
                  <i class="fas fa-phone-alt"></i>
                </div>
                <div class="content">
                  <h3>電話</h3>
                  <p>+886 2 1234 5678</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="content">
                  <h3>電子郵件</h3>
                  <p>info@luxuryhotel.com</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div class="content">
                  <h3>營業時間</h3>
                  <p>24小時全天候服務</p>
                </div>
              </div>

              <div class="social-links">
                <h3>社群媒體</h3>
                <div class="social-icons">
                  <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                  <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                  <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                  <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </div>

          <!-- 右側聯絡表單 -->
          <div class="col-lg-7">
            <div class="contact-form-container">
              <h2>發送訊息</h2>
              <p class="intro-text">請填寫以下表單，我們的客戶服務團隊將在24小時內回覆您的訊息。</p>

              <form @submit.prevent="submitForm" class="contact-form">
                <div class="row">
                  <div class="col-md-6 form-group">
                    <label for="name">姓名 <span class="required">*</span></label>
                    <input
                      type="text"
                      id="name"
                      v-model="formData.name"
                      class="form-control"
                      required
                      placeholder="請輸入您的姓名"
                    />
                  </div>

                  <div class="col-md-6 form-group">
                    <label for="email">電子郵件 <span class="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      v-model="formData.email"
                      class="form-control"
                      required
                      placeholder="請輸入您的電子郵件"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 form-group">
                    <label for="phone">電話</label>
                    <input
                      type="tel"
                      id="phone"
                      v-model="formData.phone"
                      class="form-control"
                      placeholder="請輸入您的電話號碼"
                    />
                  </div>

                  <div class="col-md-6 form-group">
                    <label for="subject">主旨 <span class="required">*</span></label>
                    <input
                      type="text"
                      id="subject"
                      v-model="formData.subject"
                      class="form-control"
                      required
                      placeholder="請輸入訊息主旨"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="message">訊息內容 <span class="required">*</span></label>
                  <textarea
                    id="message"
                    v-model="formData.message"
                    class="form-control"
                    rows="6"
                    required
                    placeholder="請詳細描述您的需求或問題..."
                  ></textarea>
                </div>

                <div class="form-group privacy-policy">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      id="privacy"
                      v-model="formData.privacy"
                      class="form-check-input"
                      required
                    />
                    <label for="privacy" class="form-check-label">
                      我已閱讀並同意 <router-link to="/privacy">隱私權政策</router-link>
                    </label>
                  </div>
                </div>

                <div class="form-group text-end">
                  <button type="submit" class="btn btn-primary submit-btn">發送訊息</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 地圖區域 -->
    <section class="map-section">
      <div class="contact-container">
        <h2>我們的位置</h2>
        <div class="map-container">
          <!-- 嵌入 Google Maps  -->
          <div class="map-placeholder">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7032465181087!2d121.56377931500844!3d25.033401983972198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6da80a7ad%3A0xacc4d11dc963103c!2z5Y-w5YyX5LiD5YWt5pm65p6E!5e0!3m2!1szh-TW!2stw!4v1646209523052!5m2!1szh-TW!2stw"
              width="100%"
              height="450"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- 常見問題區域 -->
    <section class="faq-section">
      <div class="contact-container">
        <h2>常見問題</h2>
        <div class="row">
          <div class="col-lg-6">
            <div class="faq-item">
              <h3>如何預訂房間？</h3>
              <p>
                您可以透過我們的官方網站、電話或電子郵件預訂房間。建議提前預訂以確保您理想的入住日期和房型可用。
              </p>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="faq-item">
              <h3>入住和退房時間是幾點？</h3>
              <p>
                標準入住時間為下午3點，退房時間為上午12點。如需提前入住或延遲退房，請提前與我們聯繫，我們將盡力配合您的需求。
              </p>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="faq-item">
              <h3>飯店是否提供機場接送服務？</h3>
              <p>
                是的，我們提供機場接送服務。請在預訂時告知您的航班詳情，或至少提前24小時與我們聯繫安排接送服務。
              </p>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="faq-item">
              <h3>飯店附近有哪些景點？</h3>
              <p>
                我們的飯店位於市中心，周邊有許多著名景點，包括博物館、購物中心、公園等。前台可為您提供詳細的旅遊資訊和建議。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 表單數據
const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  privacy: false
})

// 提交表單方法
const submitForm = () => {
  // 可以添加表單提交邏輯

  // 模擬提交成功
  alert('感謝您的訊息！我們將盡快回覆您。')

  // 重置表單
  formData.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
  }
}
</script>
