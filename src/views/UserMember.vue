<template>
  <div class="user-member">
    <div class="container">
      <div class="member-header">
        <h1 class="member-title">會員專區</h1>
        <p class="member-subtitle">尊貴的 SHIBA 會員，歡迎回來</p>
      </div>

      <div class="member-content">
        <div class="member-sidebar">
          <div class="member-profile">
            <div class="profile-avatar">
              <img
                src="@/assets/images/member/member_profile.jpg"
                alt="會員頭像"
                class="avatar-img"
              />
            </div>
            <div class="profile-info">
              <h3 class="profile-name">尊貴會員</h3>
              <p class="profile-level">金卡會員</p>
            </div>
          </div>

          <div class="member-nav">
            <router-link
              :to="{ name: 'UserMember', params: { tab: 'profile' } }"
              class="nav-item"
              :class="{ active: activeTab === 'profile' }"
            >
              <i class="fas fa-user"></i>
              <span>個人檔案</span>
            </router-link>
            <router-link
              :to="{ name: 'UserMember', params: { tab: 'orders' } }"
              class="nav-item"
              :class="{ active: activeTab === 'orders' }"
            >
              <i class="fas fa-list-alt"></i>
              <span>我的訂單</span>
            </router-link>
            <router-link
              :to="{ name: 'UserMember', params: { tab: 'favorites' } }"
              class="nav-item"
              :class="{ active: activeTab === 'favorites' }"
            >
              <i class="fas fa-heart"></i>
              <span>我的最愛</span>
            </router-link>
            <router-link
              :to="{ name: 'UserMember', params: { tab: 'coupons' } }"
              class="nav-item"
              :class="{ active: activeTab === 'coupons' }"
            >
              <i class="fas fa-ticket-alt"></i>
              <span>會員優惠</span>
            </router-link>
            <router-link
              :to="{ name: 'UserMember', params: { tab: 'points' } }"
              class="nav-item"
              :class="{ active: activeTab === 'points' }"
            >
              <i class="fas fa-coins"></i>
              <span>積分兌換</span>
            </router-link>
            <router-link
              :to="{ name: 'UserMember', params: { tab: 'history' } }"
              class="nav-item"
              :class="{ active: activeTab === 'history' }"
            >
              <i class="fas fa-history"></i>
              <span>消費紀錄</span>
            </router-link>
            <router-link
              :to="{ name: 'UserMember', params: { tab: 'privacy' } }"
              class="nav-item"
              :class="{ active: activeTab === 'privacy' }"
            >
              <i class="fas fa-shield-alt"></i>
              <span>隱私設定</span>
            </router-link>
          </div>

          <div class="member-stats">
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-calendar-check"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">5</span>
                <span class="stat-label">入住次數</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-star"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">2,500</span>
                <span class="stat-label">累積點數</span>
              </div>
            </div>
          </div>
        </div>

        <div class="member-main">
          <!-- 個人檔案 -->
          <div v-if="activeTab === 'profile'" class="tab-content profile-tab">
            <div class="content-header">
              <h2>個人檔案</h2>
              <button class="edit-btn">
                <i class="fas fa-edit"></i>
                <span>編輯資料</span>
              </button>
            </div>

            <div class="profile-section">
              <h3 class="section-title">基本資料</h3>
              <div class="profile-grid">
                <div class="profile-item">
                  <span class="item-label">姓名</span>
                  <span class="item-value">王小明</span>
                </div>
                <div class="profile-item">
                  <span class="item-label">電子郵件</span>
                  <span class="item-value">example@email.com</span>
                </div>
                <div class="profile-item">
                  <span class="item-label">手機號碼</span>
                  <span class="item-value">0912-345-678</span>
                </div>
                <div class="profile-item">
                  <span class="item-label">生日</span>
                  <span class="item-value">1990/01/01</span>
                </div>
                <div class="profile-item">
                  <span class="item-label">地址</span>
                  <span class="item-value">台北市信義區松高路123號</span>
                </div>
                <div class="profile-item">
                  <span class="item-label">會員等級</span>
                  <span class="item-value gold">金卡會員</span>
                </div>
              </div>
            </div>

            <div class="profile-section">
              <h3 class="section-title">偏好設定</h3>
              <div class="preferences">
                <div class="preference-item">
                  <span class="pref-label">語言偏好</span>
                  <span class="pref-value">繁體中文</span>
                </div>
                <div class="preference-item">
                  <span class="pref-label">通知設定</span>
                  <div class="toggle-switches">
                    <div class="toggle-item">
                      <span>電子郵件通知</span>
                      <label class="switch">
                        <input type="checkbox" checked />
                        <span class="slider"></span>
                      </label>
                    </div>
                    <div class="toggle-item">
                      <span>簡訊通知</span>
                      <label class="switch">
                        <input type="checkbox" checked />
                        <span class="slider"></span>
                      </label>
                    </div>
                    <div class="toggle-item">
                      <span>優惠資訊</span>
                      <label class="switch">
                        <input type="checkbox" checked />
                        <span class="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 我的訂單 -->
          <div v-if="activeTab === 'orders'" class="tab-content orders-tab">
            <div class="content-header">
              <h2>訂單列表</h2>
              <div class="filter-options">
                <select class="filter-select" v-model="filterStatus">
                  <option value="all">所有訂單</option>
                  <option value="paid">已付款</option>
                  <option value="unpaid">未付款</option>
                </select>
              </div>
            </div>

            <Loading :active="isLoading"></Loading>

            <div v-if="!isLoading" class="orders-list mb-4">
              <div
                v-for="order in filteredOrders"
                :key="order.id"
                class="order-card"
                :data-order-id="order.id"
              >
                <div class="order-header">
                  <div class="order-id">
                    <span class="label">訂單編號：</span>
                    <span class="value">{{ order.id }}</span>
                  </div>
                  <div
                    class="order-status"
                    :class="{ completed: order.is_paid, upcoming: !order.is_paid }"
                  >
                    {{ order.is_paid ? '已付款' : '待付款' }}
                  </div>
                </div>
                <div class="order-body">
                  <div class="order-image">
                    <img src="@/assets/images/member/order_thumbnail.jpg" alt="訂單圖片" />
                  </div>
                  <div class="order-details">
                    <h3 class="room-type">{{ getOrderTitle(order) }}</h3>
                    <div class="order-date">
                      <i class="fas fa-calendar-alt"></i>
                      <span>訂單日期：{{ formatDate(order.create_at) }}</span>
                    </div>
                    <div class="customer-info">
                      <i class="fas fa-user"></i>
                      <span>客戶：{{ order.user.name }}</span>
                    </div>
                    <div class="price">
                      <span class="label">總價：</span>
                      <span class="value">NT$ {{ $formatPrice(order.total) }}</span>
                    </div>
                  </div>
                </div>
                <div class="order-footer">
                  <button
                    class="detail-btn"
                    @click="openOrderModal(order.id)"
                    data-bs-toggle="modal"
                    data-bs-target="#orderModal"
                  >
                    查看詳情
                  </button>
                  <PaymentButton
                    v-if="!order.is_paid"
                    :order-id="order.id"
                    :highlight-selector="`[data-order-id='${order.id}']`"
                    @payment-success="handleOrderPaid"
                  />
                </div>
              </div>
            </div>

            <div v-if="!isLoading && filteredOrders.length === 0" class="no-orders">
              <i class="fas fa-shopping-bag"></i>
              <p>您目前沒有訂單</p>
              <router-link to="/user/products" class="browse-btn">
                <i class="fas fa-search"></i>
                <span>瀏覽客房</span>
              </router-link>
            </div>

            <Pagination
              v-if="pagination.total_pages > 1"
              :pages="pagination"
              @emit-pages="fetchOrders"
            />

            <UserOrderDetailModal
              :order="currentOrder"
              :is-loading="isLoadingOrder"
              @order-paid="handleOrderPaid"
            />
          </div>

          <!-- 我的最愛 -->
          <div v-if="activeTab === 'favorites'" class="tab-content favorites-tab">
            <div class="content-header">
              <h2>我的最愛</h2>
              <div class="sort-options">
                <select class="sort-select" v-model="favoriteSortOption">
                  <option value="newest">最新加入</option>
                  <option value="price-high">價格由高至低</option>
                  <option value="price-low">價格由低至高</option>
                </select>
              </div>
            </div>

            <div class="favorites-grid">
              <div v-for="favorite in sortedFavorites" :key="favorite.id" class="favorite-card">
                <div class="favorite-image">
                  <img
                    :src="
                      favorite.imageUrl ||
                      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
                    "
                    :alt="favorite.title"
                  />
                  <button class="remove-favorite" @click="removeFromFavorites(favorite.id)">
                    <i class="fas fa-heart"></i>
                  </button>
                </div>
                <div class="favorite-content">
                  <h3 class="room-type">{{ favorite.title }}</h3>
                  <div class="room-features">
                    <span class="feature"><i class="fas fa-user-friends"></i> 2-4 人</span>
                    <span class="feature"><i class="fas fa-vector-square"></i> 40-120 m²</span>
                    <span class="feature"><i class="fas fa-bed"></i> 豪華床型</span>
                  </div>
                  <div class="room-price">
                    <span class="price">NT$ {{ $formatPrice(favorite.price) }}</span>
                    <span class="per-night">/ 晚</span>
                  </div>
                  <div class="card-actions">
                    <button class="view-btn" @click="goToProductDetail(favorite.id)">
                      查看詳情
                    </button>
                    <button class="book-btn" @click="addToCart(favorite.id)">立即預訂</button>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="sortedFavorites.length === 0" class="no-favorites">
              <i class="fas fa-heart-broken"></i>
              <p>您目前沒有收藏的客房</p>
              <router-link to="/user/products" class="browse-btn">
                <i class="fas fa-search"></i>
                <span>瀏覽客房</span>
              </router-link>
            </div>
          </div>

          <!-- 會員優惠 -->
          <div v-if="activeTab === 'coupons'" class="tab-content coupons-tab">
            <div class="content-header">
              <h2>會員優惠</h2>
              <div class="filter-options">
                <select class="filter-select" v-model="couponFilterStatus">
                  <option value="all">所有優惠</option>
                  <option value="available">可使用</option>
                  <option value="used">已使用</option>
                  <option value="expired">已過期</option>
                </select>
              </div>
            </div>

            <div class="coupons-list">
              <div v-for="coupon in filteredCoupons" :key="coupon.id" class="coupon-card available">
                <div class="coupon-left">
                  <div class="discount-amount">{{ coupon.percent }}<span>折</span></div>
                </div>
                <div class="coupon-right">
                  <div class="coupon-info">
                    <h3 class="coupon-title">{{ coupon.title }}</h3>
                    <p class="coupon-desc">{{ coupon.description || '使用此優惠券可享折扣' }}</p>
                    <div class="coupon-validity">
                      <i class="fas fa-calendar-alt"></i>
                      <span>有效期限：{{ formatDate(coupon.due_date) }}</span>
                    </div>
                  </div>
                  <div class="coupon-actions">
                    <button class="use-coupon-btn" @click="usePromoCode(coupon.code)">
                      立即使用
                    </button>
                    <div class="coupon-code">
                      <span>優惠碼：</span>
                      <strong>{{ coupon.code }}</strong>
                    </div>
                  </div>
                </div>
                <div class="coupon-status">可使用</div>
              </div>

              <div class="coupon-card used">
                <div class="coupon-left">
                  <div class="discount-amount">9<span>折</span></div>
                </div>
                <div class="coupon-right">
                  <div class="coupon-info">
                    <h3 class="coupon-title">新會員優惠</h3>
                    <p class="coupon-desc">新會員首次預訂享 9 折優惠</p>
                    <div class="coupon-validity">
                      <i class="fas fa-calendar-alt"></i>
                      <span>有效期限：2023/10/31</span>
                    </div>
                  </div>
                  <div class="coupon-actions">
                    <button class="use-coupon-btn" disabled>已使用</button>
                    <div class="coupon-code">
                      <span>優惠碼：</span>
                      <strong>WELCOME10</strong>
                    </div>
                  </div>
                </div>
                <div class="coupon-status">已使用</div>
              </div>
            </div>
          </div>

          <!-- 積分兌換 -->
          <div v-if="activeTab === 'points'" class="tab-content points-tab">
            <div class="content-header">
              <h2>積分兌換</h2>
              <div class="points-balance">
                <i class="fas fa-coins"></i>
                <span>目前積分：<strong>2,500</strong> 點</span>
              </div>
            </div>

            <div class="points-info-card">
              <div class="points-info-header">
                <i class="fas fa-info-circle"></i>
                <h3>積分說明</h3>
              </div>
              <div class="points-info-content">
                <p>每消費 NT$ 100 可獲得 1 點積分</p>
                <p>積分可用於兌換免費住宿、餐飲優惠或升級房型</p>
                <p>積分有效期為獲取日起計算 2 年</p>
              </div>
            </div>

            <h3 class="section-title">可兌換項目</h3>
            <div class="rewards-grid">
              <div class="reward-card">
                <div class="reward-image">
                  <img src="@/assets/images/member/point_breakfast.jpg" alt="免費早餐" />
                </div>
                <div class="reward-content">
                  <h4>雙人豪華早餐</h4>
                  <p>兌換一次雙人豪華自助早餐</p>
                  <div class="reward-points">
                    <i class="fas fa-coins"></i>
                    <span>500 點</span>
                  </div>
                  <button class="redeem-btn">立即兌換</button>
                </div>
              </div>

              <div class="reward-card">
                <div class="reward-image">
                  <img src="@/assets/images/member/point_spa.jpg" alt="SPA 折扣" />
                </div>
                <div class="reward-content">
                  <h4>SPA 療程 8 折券</h4>
                  <p>兌換一次 SPA 療程 8 折優惠</p>
                  <div class="reward-points">
                    <i class="fas fa-coins"></i>
                    <span>800 點</span>
                  </div>
                  <button class="redeem-btn">立即兌換</button>
                </div>
              </div>

              <div class="reward-card">
                <div class="reward-image">
                  <img src="@/assets/images/member/point_room.jpg" alt="免費住宿" />
                </div>
                <div class="reward-content">
                  <h4>免費住宿一晚</h4>
                  <p>兌換豪華雙人房免費住宿一晚</p>
                  <div class="reward-points">
                    <i class="fas fa-coins"></i>
                    <span>2,000 點</span>
                  </div>
                  <button class="redeem-btn">立即兌換</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 消費紀錄 -->
          <div v-if="activeTab === 'history'" class="tab-content history-tab">
            <div class="content-header">
              <h2>消費紀錄</h2>
              <div class="filter-options">
                <select class="filter-select">
                  <option value="all">所有紀錄</option>
                  <option value="accommodation">住宿消費</option>
                  <option value="dining">餐飲消費</option>
                  <option value="spa">SPA 消費</option>
                </select>
              </div>
            </div>

            <div class="history-list">
              <div class="history-card">
                <div class="history-date">
                  <div class="date-day">15</div>
                  <div class="date-month">10月</div>
                  <div class="date-year">2023</div>
                </div>
                <div class="history-details">
                  <div class="history-title">
                    <h3>豪華套房住宿</h3>
                    <span class="history-category accommodation">住宿消費</span>
                  </div>
                  <div class="history-info">
                    <p>入住日期：2023/10/15 - 2023/10/17</p>
                    <p>房號：1205</p>
                  </div>
                </div>
                <div class="history-amount">
                  <div class="amount">NT$ 15,600</div>
                  <div class="points-earned">
                    <i class="fas fa-coins"></i>
                    <span>+156 點</span>
                  </div>
                </div>
              </div>

              <div class="history-card">
                <div class="history-date">
                  <div class="date-day">16</div>
                  <div class="date-month">10月</div>
                  <div class="date-year">2023</div>
                </div>
                <div class="history-details">
                  <div class="history-title">
                    <h3>頂級 SPA 療程</h3>
                    <span class="history-category spa">SPA 消費</span>
                  </div>
                  <div class="history-info">
                    <p>療程時間：90 分鐘</p>
                    <p>療程師：Sarah</p>
                  </div>
                </div>
                <div class="history-amount">
                  <div class="amount">NT$ 3,800</div>
                  <div class="points-earned">
                    <i class="fas fa-coins"></i>
                    <span>+38 點</span>
                  </div>
                </div>
              </div>

              <div class="history-card">
                <div class="history-date">
                  <div class="date-day">16</div>
                  <div class="date-month">10月</div>
                  <div class="date-year">2023</div>
                </div>
                <div class="history-details">
                  <div class="history-title">
                    <h3>頂級餐廳晚餐</h3>
                    <span class="history-category dining">餐飲消費</span>
                  </div>
                  <div class="history-info">
                    <p>用餐人數：2 人</p>
                    <p>餐廳：La Vue</p>
                  </div>
                </div>
                <div class="history-amount">
                  <div class="amount">NT$ 4,200</div>
                  <div class="points-earned">
                    <i class="fas fa-coins"></i>
                    <span>+42 點</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 隱私設定 -->
          <div v-if="activeTab === 'privacy'" class="tab-content privacy-tab">
            <div class="content-header">
              <h2>隱私設定</h2>
              <button class="save-btn">
                <i class="fas fa-save"></i>
                <span>儲存設定</span>
              </button>
            </div>

            <div class="privacy-section">
              <h3 class="section-title">帳戶安全</h3>
              <div class="privacy-options">
                <div class="privacy-option">
                  <div class="option-info">
                    <h4>變更密碼</h4>
                    <p>定期更改密碼可以提高帳戶安全性</p>
                  </div>
                  <button class="change-btn">變更</button>
                </div>
                <div class="privacy-option">
                  <div class="option-info">
                    <h4>雙重驗證</h4>
                    <p>啟用雙重驗證以增強帳戶安全</p>
                  </div>
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider"></span>
                  </label>
                </div>
                <div class="privacy-option">
                  <div class="option-info">
                    <h4>登入通知</h4>
                    <p>當有新裝置登入時接收通知</p>
                  </div>
                  <label class="switch">
                    <input type="checkbox" checked />
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div class="privacy-section">
              <h3 class="section-title">資料隱私</h3>
              <div class="privacy-options">
                <div class="privacy-option">
                  <div class="option-info">
                    <h4>個人資料可見性</h4>
                    <p>控制您的個人資料對其他用戶的可見性</p>
                  </div>
                  <select class="privacy-select">
                    <option value="private">僅限本人</option>
                    <option value="staff">僅限酒店員工</option>
                    <option value="public">公開</option>
                  </select>
                </div>
                <div class="privacy-option">
                  <div class="option-info">
                    <h4>行銷電子郵件</h4>
                    <p>接收有關促銷和特別優惠的電子郵件</p>
                  </div>
                  <label class="switch">
                    <input type="checkbox" checked />
                    <span class="slider"></span>
                  </label>
                </div>
                <div class="privacy-option">
                  <div class="option-info">
                    <h4>Cookie 設定</h4>
                    <p>管理網站使用的 Cookie 設定</p>
                  </div>
                  <button class="manage-btn">管理</button>
                </div>
              </div>
            </div>

            <div class="privacy-section">
              <h3 class="section-title">資料下載與刪除</h3>
              <div class="privacy-options">
                <div class="privacy-option">
                  <div class="option-info">
                    <h4>下載個人資料</h4>
                    <p>下載您在 SHIBA 酒店的所有個人資料</p>
                  </div>
                  <button class="download-btn">下載</button>
                </div>
                <div class="privacy-option danger">
                  <div class="option-info">
                    <h4>刪除帳戶</h4>
                    <p>永久刪除您的帳戶和所有相關資料</p>
                  </div>
                  <button class="delete-btn">刪除</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from '@/stores'
import { useRouter } from 'vue-router'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import Pagination from '@/components/Pagination.vue'
import UserOrderDetailModal from '@/components/UserOrderDetailModal.vue'
import PaymentButton from '@/components/PaymentButton.vue'


// 定義 props
const props = defineProps({
  tab: {
    type: String,
    default: 'profile'
  }
})

const store = useStore()
const activeTab = ref(props.tab || 'profile')
const router = useRouter()

// 訂單相關
const isLoading = ref(false)
const isLoadingOrder = ref(false)
const orders = computed(() => store.orders || [])
const pagination = computed(() => store.pagination || {})
const currentOrder = computed(() => store.currentOrder)
const filterStatus = ref('all')

// 優惠券相關
const couponFilterStatus = ref('all')

// 過濾優惠券
const filteredCoupons = computed(() => {
  if (couponFilterStatus.value === 'all') return store.coupons || []
  // 這裡假設優惠券數據有 status 屬性，實際可能需要根據API返回的數據結構調整
  return (store.coupons || []).filter(coupon => {
    if (couponFilterStatus.value === 'available') return !coupon.is_used && new Date(coupon.due_date) > new Date()
    if (couponFilterStatus.value === 'used') return coupon.is_used
    if (couponFilterStatus.value === 'expired') return new Date(coupon.due_date) <= new Date()
    return true
  })
})

// 優化後的過濾訂單邏輯
const filteredOrders = computed(() => {
  if (filterStatus.value === 'all') return orders.value
  return orders.value.filter((order) => 
    filterStatus.value === 'paid' ? order.is_paid : !order.is_paid
  )
})

// 我的最愛相關
const favoriteSortOption = ref('newest')
const favorites = computed(() => store.favorites || [])

// 根據排序選項對我的最愛進行排序
const sortedFavorites = computed(() => {
  if (favoriteSortOption.value === 'price-high') {
    return [...favorites.value].sort((a, b) => b.price - a.price)
  } else if (favoriteSortOption.value === 'price-low') {
    return [...favorites.value].sort((a, b) => a.price - b.price)
  }
  // 預設按最新加入排序（假設最新加入的在陣列末尾）
  return [...favorites.value].reverse()
})

// 從我的最愛中移除
const removeFromFavorites = (productId) => {
  store.removeFromFavorites(productId)
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

// 使用優惠碼功能
const usePromoCode = async (promoCode) => {
  isLoading.value = true
  try {
    // 先獲取購物車資料
    await store.getCart()

    // 檢查購物車是否為空
    if (store.cart && store.cart.length > 0) {
      // 購物車不為空，跳轉到購物車頁面
      router.push('/user/cart')
      // 使用 localStorage 暫存優惠碼，以便在購物車頁面使用
      localStorage.setItem('autoApplyPromoCode', promoCode)
    } else {
      // 購物車為空，跳轉到商品頁面
      router.push('/user/products')
      alert('您的購物車是空的，請先選擇商品')
    }
  } catch (error) {
    console.error('處理優惠碼失敗：', error)
  } finally {
    isLoading.value = false
  }
}

// 查看產品詳情
const goToProductDetail = (productId) => {
  router.push({ name: 'UserProductDetail', params: { id: productId } })
}

// 獲取訂單
const fetchOrders = async (page = 1) => {
  isLoading.value = true
  try {
    await store.getUserOrders(page)
  } catch (error) {
    console.error('取得訂單失敗：', error)
  } finally {
    isLoading.value = false
  }
}

// 打開訂單詳情模態框
const openOrderModal = async (orderId) => {
  try {
    isLoadingOrder.value = true
    await store.getUserOrderDetails(orderId)
  } catch (error) {
    console.error('載入訂單詳情失敗：', error)
  } finally {
    isLoadingOrder.value = false
  }
}

// 處理付款成功事件
const handleOrderPaid = (orderId) => {
  // 更新訂單列表中的訂單狀態
  const orderIndex = orders.value.findIndex((order) => order.id === orderId)
  if (orderIndex !== -1) {
    orders.value[orderIndex].is_paid = true
  }

  // 更新當前訂單狀態
  if (currentOrder.value && currentOrder.value.id === orderId) {
    currentOrder.value.is_paid = true
  }
}

// 取得優惠券資料
const fetchCoupons = async () => {
  try {
    await store.getCoupons()
  } catch (error) {
    console.error('取得優惠券失敗：', error)
  }
}

// 格式化日期
const formatDate = (timestamp) => {
  if (!timestamp) return '無日期資訊'

  // 處理不同格式的日期
  let date
  if (typeof timestamp === 'number') {
    // Unix 時間戳（秒）
    date = new Date(timestamp * 1000)
  } else if (typeof timestamp === 'string') {
    // ISO 格式的日期字符串
    date = new Date(timestamp)
  } else {
    // 已經是 Date 對象
    date = timestamp
  }

  // 檢查日期是否有效
  if (isNaN(date.getTime())) {
    return '無效日期'
  }

  return date.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
}

// 獲取訂單標題
const getOrderTitle = (order) => {
  if (order.products && Object.keys(order.products).length > 0) {
    const firstProduct = Object.values(order.products)[0]
    return firstProduct.product.title || '未知商品'
  }
  return '訂單詳情'
}

// 監聽標籤變化，當切換到訂單標籤時加載訂單數據
const watchActiveTab = (newTab) => {
  // 如果 newTab 為空或 undefined，預設為 'profile'
  const tab = newTab || 'profile'

  if (tab === 'orders' && orders.value.length === 0) {
    fetchOrders()
  }
  // 更新 URL 參數
  router.push({ name: 'UserMember', params: { tab } })
}

// 監聽 URL 參數變化
watch(
  () => props.tab,
  (newTab) => {
    const tab = newTab || 'profile'
    if (tab !== activeTab.value) {
      activeTab.value = tab
      watchActiveTab(tab)
    }
  }
)

// 監聽 activeTab 變化
watch(activeTab, (newTab) => {
  watchActiveTab(newTab)
})

onMounted(() => {
  // 如果沒有指定 tab 參數，預設導向到個人檔案頁面
  if (!props.tab || props.tab === '') {
    router.push({ name: 'UserMember', params: { tab: 'profile' } })
  }
  // 初始加載，如果當前標籤是訂單，則加載訂單數據
  if (activeTab.value === 'orders') {
    fetchOrders()
  }
  fetchCoupons()
})
</script>
