<template>
  <div class="coupon-modal">
    <!-- 背景遮罩 -->
    <div v-if="showBackdrop" class="modal-backdrop fade show"></div>

    <!-- Modal -->
    <div class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ tempCoupon.id ? '編輯優惠券' : '新增優惠券' }}
            </h5>
            <button type="button" class="btn-close" @click="emitClose"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">優惠券名稱</label>
              <input
                type="text"
                class="form-control"
                v-model="tempCoupon.title"
                placeholder="請輸入優惠券名稱"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">折扣碼</label>
              <input
                type="text"
                class="form-control"
                v-model="tempCoupon.code"
                placeholder="例如：SUMMER2023"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                v-model="tempCoupon.percent"
                min="1"
                max="100"
                placeholder="請輸入1-100之間的數字"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">到期日</label>
              <input
                type="date"
                class="form-control"
                v-model="readableDueDate"
              />
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="couponEnabled"
                :true-value="1"
                :false-value="0"
                v-model="tempCoupon.is_enabled"
              />
              <label class="form-check-label" for="couponEnabled">啟用此優惠券</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="emitClose">取消</button>
            <button type="button" class="btn-primary" @click="emitSave">儲存優惠券</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

// Props 定義
const props = defineProps({
  coupon: {
    type: Object,
    default: () => ({
      title: '',
      code: '',
      percent: 0,
      due_date: null, // 使用 Unix Timestamp 儲存
      is_enabled: 0 // 默認為 0，代表未啟用
    })
  },
  showBackdrop: {
    type: Boolean,
    default: false
  }
})

// 定義事件
const emit = defineEmits(['close', 'save'])

// 優惠券臨時數據
const tempCoupon = ref({ ...props.coupon })

// 可讀日期（YYYY-MM-DD 格式）
const readableDueDate = computed({
  get() {
    return tempCoupon.value.due_date
      ? new Date(tempCoupon.value.due_date * 1000).toISOString().split('T')[0]
      : ''
  },
  set(value) {
    if (value) {
      tempCoupon.value.due_date = Math.floor(new Date(value).getTime() / 1000)
    } else {
      tempCoupon.value.due_date = null
    }
  }
})

// 當父層的 coupon 改變時，更新 tempCoupon
watch(
  () => props.coupon,
  (newCoupon) => {
    tempCoupon.value = { ...newCoupon } // 直接複製父層 coupon 的值
  },
  { immediate: true }
)

// 關閉模態框
const emitClose = () => {
  emit('close')
}

// 儲存優惠券
const emitSave = () => {
  // 確保 due_date 是 Unix Timestamp 並且 is_enabled 是數字
  if (tempCoupon.value.due_date) {
    tempCoupon.value.due_date = Math.floor(tempCoupon.value.due_date)
  }
  // 將 is_enabled 保證為數字 0 或 1
  tempCoupon.value.is_enabled = tempCoupon.value.is_enabled ? 1 : 0

  emit('save', tempCoupon.value)
}
</script>

