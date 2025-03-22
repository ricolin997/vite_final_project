<!-- OrdersView.vue -->
<template>
  <Loading :active="isLoading"></Loading>
  <div class="orders-management">
    <h2>訂單管理</h2>

    <div class="action-buttons">
      <button class="btn-refresh" @click="fetchOrders">
        <i class="bi bi-arrow-clockwise"></i> 重新整理
      </button>
      <button
        class="btn-delete-all"
        @click="openDeleteAllModal"
        :disabled="isLoading || !store.orders.length"
      >
        <i class="bi bi-trash"></i> 刪除全部訂單
      </button>
    </div>

    <div v-if="store.orders.length === 0 && !isLoading" class="empty-state">
      <div class="empty-icon">
        <i class="bi bi-inbox"></i>
      </div>
      <div class="empty-text">目前沒有訂單資料</div>
    </div>

    <table v-else class="table orders-table">
      <thead>
        <tr>
          <th>訂單編號</th>
          <th>用戶姓名</th>
          <th>電話</th>
          <th>總金額</th>
          <th>狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in store.orders" :key="order.id">
          <td class="order-id">{{ order.id }}</td>
          <td class="customer-name">{{ order.user.name }}</td>
          <td class="customer-tel">{{ order.user.tel }}</td>
          <td class="order-total">${{ $formatPrice(order.total) }}</td>
          <td class="order-status">
            <span class="status-badge" :class="order.is_paid ? 'paid' : 'unpaid'">
              {{ order.is_paid ? '已付款' : '未付款' }}
            </span>
          </td>
          <td>
            <div class="action-buttons">
              <button class="btn btn-view" @click="viewOrderDetails(order)">
                <i class="bi bi-eye"></i> 檢視
              </button>
              <button class="btn btn-edit" @click="openEditModal(order)" :disabled="isLoading">
                <i class="bi bi-pencil-square"></i> 編輯
              </button>
              <button class="btn btn-delete" @click="openDeleteModal(order)" :disabled="isLoading">
                <i class="bi bi-trash"></i> 刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁元件 -->
    <Pagination
      v-if="store.pagination.total_pages > 1"
      :pages="store.pagination"
      @emit-pages="fetchOrders"
    />

    <!-- 訂單詳細資料彈窗 -->
    <OrderDetailsModal v-if="showDetailsModal" :order="selectedOrder" @close="closeDetailsModal" />

    <!-- 編輯訂單彈窗 -->
    <EditOrderModal
      v-if="showEditModal"
      :order="currentOrder"
      @close="closeEditModal"
      @update="updateOrder"
    />

    <!-- 刪除單筆訂單彈窗 -->
    <DelModal
      v-if="showDeleteModal"
      :show="showDeleteModal"
      :item="currentOrder"
      entityName="訂單"
      :onDelete="deleteOrder"
      @close="closeDeleteModal"
      @deleted="handleDeleted"
      @error="handleDeleteError"
    />

    <!-- 刪除全部訂單彈窗 -->
    <DelModal
      v-if="showDeleteAllModal"
      :show="showDeleteAllModal"
      :item="{ title: '全部' }"
      entityName="訂單"
      :onDelete="deleteAllOrders"
      @close="closeDeleteAllModal"
      @deleted="handleDeleted"
      @error="handleDeleteError"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useStore } from '@/stores/index'
import Pagination from '../components/Pagination.vue'
import OrderDetailsModal from '../components/OrderDetailsModal.vue'
import DelModal from '../components/DelModal.vue'
import EditOrderModal from '../components/EditOrderModal.vue'

const store = useStore()
const showDetailsModal = ref(false)
const selectedOrder = ref(null)
const isLoading = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const showDeleteAllModal = ref(false)
const currentOrder = ref(null)
const emitter = inject('emitter')

// 顯示 toast 訊息的通用函數
const showToast = (style, title, content) => {
  emitter.emit('show-toast', { style, title, content })
}

// 獲取訂單資料
const fetchOrders = async (page = 1) => {
  isLoading.value = true
  try {
    await store.getOrders(page)
  } catch (error) {
    console.error('取得訂單失敗:', error)
    showToast('error', '取得訂單失敗', error.message || '請稍後再試')
  } finally {
    isLoading.value = false
  }
}

// 訂單詳情相關函數
const viewOrderDetails = (order) => {
  selectedOrder.value = order
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  selectedOrder.value = null
  showDetailsModal.value = false
}

// 編輯訂單相關函數
const openEditModal = (order) => {
  currentOrder.value = { ...order } // 創建訂單副本以避免直接修改原始資料
  showEditModal.value = true
}

const closeEditModal = () => {
  currentOrder.value = null
  showEditModal.value = false
}

const updateOrder = async (updatedOrder) => {
  isLoading.value = true
  try {
    await store.updateOrder(updatedOrder)
    await fetchOrders() // 重新獲取訂單列表
    showToast('success', '訂單更新成功', '訂單資料已成功更新')
    closeEditModal()
  } catch (error) {
    showToast('error', '更新失敗', error.message || '訂單更新出現錯誤')
  } finally {
    isLoading.value = false
  }
}

// 刪除訂單相關函數
const openDeleteModal = (order) => {
  currentOrder.value = { ...order } // 創建訂單副本以避免直接修改原始資料
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  currentOrder.value = null
  showDeleteModal.value = false
}

const openDeleteAllModal = () => {
  showDeleteAllModal.value = true
}

const closeDeleteAllModal = () => {
  showDeleteAllModal.value = false
}

const deleteOrder = async (orderId) => {
  const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/order/${orderId}`
  await store.deleteOrder(api)
  await fetchOrders()
}

const deleteAllOrders = async () => {
  const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/orders/all`
  await store.deleteAllOrders(api)
  await fetchOrders()
}

// 處理刪除結果
const handleDeleted = () => {
  showToast('success', '刪除成功', '訂單已成功刪除')
  closeDeleteModal()
  closeDeleteAllModal()
}

const handleDeleteError = (errorMessage) => {
  showToast('error', '刪除失敗', errorMessage || '刪除訂單時發生錯誤')
}

// 頁面載入時獲取訂單資料
onMounted(() => {
  fetchOrders()
})
</script>
