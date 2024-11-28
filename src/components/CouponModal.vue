<template>
  <div>
    <!-- 背景遮罩 -->
    <div v-if="showBackdrop" class="modal-backdrop fade show"></div>

    <!-- Modal -->
    <div class="modal fade show d-block" tabindex="-1" role="dialog" style="z-index: 1050">
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
              <label class="form-label">標題</label>
              <input type="text" class="form-control" v-model="tempCoupon.title" />
            </div>
            <div class="mb-3">
              <label class="form-label">折扣碼</label>
              <input type="text" class="form-control" v-model="tempCoupon.code" />
            </div>
            <div class="mb-3">
              <label class="form-label">折扣百分比</label>
              <input type="number" class="form-control" v-model="tempCoupon.percent" />
            </div>
            <div class="mb-3">
              <label class="form-label">到期日</label>
              <input
                type="date"
                class="form-control"
                v-model="readableDueDate"
                @change="updateDueDate"
              />
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                :true-value="1"
                :false-value="0"
                v-model="tempCoupon.is_enabled"
              />
              <label class="form-check-label">是否啟用</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="emitClose">取消</button>
            <button type="button" class="btn btn-primary" @click="emitSave">儲存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'

export default {
  props: {
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
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
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

    const updateDueDate = (event) => {
      const value = event.target.value
      if (value) {
        tempCoupon.value.due_date = Math.floor(new Date(value).getTime() / 1000)
      } else {
        tempCoupon.value.due_date = null
      }
    }

    // 當父層的 coupon 改變時，更新 tempCoupon
    watch(
      () => props.coupon,
      (newCoupon) => {
        tempCoupon.value = { ...newCoupon } // 直接複製父層 coupon 的值
      },
      { immediate: true }
    )

    const emitClose = () => {
      emit('close')
    }

    const emitSave = () => {
      // 確保 due_date 是 Unix Timestamp 並且 is_enabled 是數字
      if (tempCoupon.value.due_date) {
        tempCoupon.value.due_date = Math.floor(tempCoupon.value.due_date)
      }
      // 將 is_enabled 保證為數字 0 或 1
      tempCoupon.value.is_enabled = tempCoupon.value.is_enabled ? 1 : 0

      emit('save', tempCoupon.value)
    }

    return {
      tempCoupon,
      readableDueDate,
      updateDueDate,
      emitClose,
      emitSave
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  z-index: 1040; /* 層級比 modal 的 z-index 低 */
}
</style>
