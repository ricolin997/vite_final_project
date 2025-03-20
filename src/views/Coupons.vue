<template>
  <Loading :active="isLoading"></Loading>
  <div class="coupons-management">
    <div class="page-header">
      <h2>優惠券管理</h2>
      <div class="action-buttons">
        <button class="btn-add-coupon" @click="openModal(null)">
          <i class="bi bi-plus-circle"></i> 新增優惠券
        </button>
      </div>
    </div>

    <div v-if="store.coupons.length === 0 && !isLoading" class="empty-state">
      <div class="empty-icon">
        <i class="bi bi-ticket-perforated"></i>
      </div>
      <div class="empty-text">目前沒有優惠券資料</div>
      <button class="btn-add-first" @click="openModal(null)">
        <i class="bi bi-plus-circle"></i> 新增第一張優惠券
      </button>
    </div>

    <table v-else class="coupons-table">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>啟用狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in store.coupons" :key="coupon.id">
          <td class="coupon-title">{{ coupon.title }}</td>
          <td class="coupon-percent">{{ coupon.percent }}%</td>
          <td class="coupon-date">
            {{
              coupon.due_date
                ? new Date(coupon.due_date * 1000).toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : '未設定'
            }}
          </td>
          <td>
            <span class="coupon-status" :class="coupon.is_enabled ? 'enabled' : 'disabled'">
              {{ coupon.is_enabled ? '啟用' : '未啟用' }}
            </span>
          </td>
          <td>
            <div class="action-buttons">
              <button class="btn-edit" @click="openModal(coupon)">
                <i class="bi bi-pencil-square"></i> 編輯
              </button>
              <button class="btn-delete" @click="openDeleteModal(coupon)">
                <i class="bi bi-trash"></i> 刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination
      v-if="store.couponPagination.total_pages > 1"
      :pages="store.couponPagination"
      @emit-pages="fetchCoupons"
    />

    <!-- Coupon Modal -->
    <CouponModal
      v-if="showModal"
      :coupon="selectedCoupon"
      :showBackdrop="showModal"
      @close="closeModal"
      @save="saveCoupon"
    />

    <!-- Delete Modal -->
    <DelModal
      v-if="showDeleteModal"
      :item="selectedCoupon"
      entityName="優惠券"
      :onDelete="store.deleteCoupon"
      @close="closeDeleteModal"
      @deleted="handleDeleteSuccess"
    />
  </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue'
import { useStore } from '@/stores/index'
import Pagination from '../components/Pagination.vue'
import CouponModal from '../components/CouponModal.vue'
import DelModal from '../components/DelModal.vue'

export default {
  name: 'CouponsView',
  components: { Pagination, CouponModal, DelModal },
  setup() {
    const store = useStore()
    const showModal = ref(false)
    const showDeleteModal = ref(false)
    const selectedCoupon = ref(null)
    const emitter = inject('emitter')
    const isLoading = ref(false) // 定義讀取狀態

    const fetchCoupons = async (page = 1) => {
      isLoading.value = true
      try {
        await store.getCoupons(page)
      } catch (error) {
        console.error('Failed to fetch coupons:', error)
        emitter.emit('show-toast', {
          style: 'error',
          title: '無法載入優惠券',
          content: error.message
        })
      } finally {
        isLoading.value = false
      }
    }

    const openModal = (coupon) => {
      selectedCoupon.value = coupon
        ? { ...coupon }
        : { title: '', code: '', percent: 0, due_date: '', is_enabled: 0 }
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
      selectedCoupon.value = null
    }

    const saveCoupon = async (coupon) => {
      try {
        if (coupon.id) {
          await store.updateCoupon(coupon)
        } else {
          await store.createCoupon(coupon)
        }
        await fetchCoupons()
        closeModal()
        emitter.emit('show-toast', { style: 'success', title: '更新優惠券成功' })
      } catch (error) {
        emitter.emit('show-toast', { style: 'error', title: '操作失敗', content: error.message })
      }
    }

    const openDeleteModal = (coupon) => {
      selectedCoupon.value = { ...coupon }
      showDeleteModal.value = true
    }

    const closeDeleteModal = () => {
      showDeleteModal.value = false
      selectedCoupon.value = null
    }

    const handleDeleteSuccess = async () => {
      try {
        await fetchCoupons()
        closeDeleteModal()
        emitter.emit('show-toast', { style: 'success', title: '優惠券刪除成功' })
      } catch (error) {
        emitter.emit('show-toast', { style: 'error', title: '操作失敗', content: error.message })
      }
    }

    onMounted(() => {
      fetchCoupons()
    })

    return {
      store,
      showModal,
      showDeleteModal,
      selectedCoupon,
      fetchCoupons,
      openModal,
      closeModal,
      saveCoupon,
      openDeleteModal,
      closeDeleteModal,
      handleDeleteSuccess,
      isLoading
    }
  }
}
</script>
