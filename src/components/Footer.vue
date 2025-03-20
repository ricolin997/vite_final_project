<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>關於我們</h3>
          <p>
            SHIBA飯店提供豪華的住宿體驗，結合了現代設計與傳統風格。
            我們致力於為每位客人提供難忘的住宿體驗。
          </p>
        </div>
        <div class="footer-section">
          <h3>聯絡資訊</h3>
          <ul class="contact-info">
            <li><i class="fas fa-map-marker-alt"></i> 台北市信義區松高路123號</li>
            <li><i class="fas fa-phone"></i> (02) 2345-6789</li>
            <li><i class="fas fa-envelope"></i> info@shibahotel.com</li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>快速連結</h3>
          <ul>
            <li><router-link to="/user/products">客房預訂</router-link></li>
            <li><router-link to="/facilities">設施服務</router-link></li>
            <li><router-link to="/faq">常見問題</router-link></li>
            <li><router-link to="/contact">聯絡我們</router-link></li>
            <li><router-link to="/privacy">隱私政策</router-link></li>
            <li><router-link to="/login">後台登入</router-link></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} SHIBA Hotel & Resort. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped></style>
