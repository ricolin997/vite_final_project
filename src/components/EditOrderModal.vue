<!-- EditOrderModal.vue -->
<template>
  <div class="edit-order-modal">
    <!-- 背景遮罩 -->
    <div class="modal-backdrop fade show"></div>
    <div class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">編輯訂單</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitOrder">
              <!-- 訂單基本資訊 -->
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">訂單編號</label>
                  <input type="text" class="form-control" :value="order.id" disabled />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">付款狀態</label>
                  <select class="form-select" v-model="editedOrder.is_paid">
                    <option :value="true">已付款</option>
                    <option :value="false">未付款</option>
                  </select>
                </div>
              </div>

              <!-- 用戶資訊 -->
              <h6 class="section-title">用戶資訊</h6>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">用戶姓名</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="editedOrder.user.name"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">用戶電話</label>
                  <input type="tel" class="form-control" v-model="editedOrder.user.tel" required />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">用戶信箱</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="editedOrder.user.email"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">用戶地址</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="editedOrder.user.address"
                  required
                />
              </div>

              <!-- 訂單詳情 -->
              <h6 class="section-title">訂單詳情</h6>
              <div class="mb-3">
                <label class="form-label">總金額</label>
                <div class="input-group">
                  <span class="input-group-text">$</span>
                  <input
                    type="number"
                    class="form-control"
                    v-model.number="editedOrder.total"
                    required
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">備註</label>
                <textarea class="form-control" v-model="editedOrder.message" rows="3"></textarea>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn-secondary" @click="$emit('close')">取消</button>
                <button type="submit" class="btn-primary">更新訂單</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from 'vue'

export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'update'],
  setup(props, { emit }) {
    // 注入 emitter
    const emitter = inject('emitter')

    // 創建訂單副本，避免直接修改原始資料
    const editedOrder = ref({
      id: props.order.id,
      is_paid: props.order.is_paid,
      total: props.order.total,
      create_at: props.order.create_at,
      message: props.order.message || '',
      payment_method: props.order.payment_method || '',
      user: { ...props.order.user },
      products: props.order.products || []
    })

    const submitOrder = () => {
      // 驗證表單
      if (!editedOrder.value.total || editedOrder.value.total <= 0) {
        emitter.emit('show-toast', {
          style: 'danger',
          title: '驗證錯誤',
          content: '請輸入有效的總金額'
        })
        return
      }
      // 驗證用戶姓名和信箱
      if (!editedOrder.value.user.name || !editedOrder.value.user.email) {
        emitter.emit('show-toast', {
          style: 'danger',
          title: '驗證錯誤',
          content: '請填寫用戶姓名和信箱'
        })
        return
      }

      // 提交更新
      emit('update', editedOrder.value)
    }

    return {
      editedOrder,
      submitOrder
    }
  }
}
</script>

<style scoped></style>
