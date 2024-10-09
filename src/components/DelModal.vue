<template>
  <div class="modal show fade d-block" tabindex="-1" v-show="show" aria-modal="true" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">確認刪除</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>
            您確定要刪除這個產品：<strong>{{ product.title }}</strong> 嗎？此操作無法恢復。
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">取消</button>
          <button
            type="button"
            class="btn btn-danger"
            @click="confirmDelete"
            :disabled="isDeleting"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from '@/stores/index'

export default {
  props: {
    show: Boolean, // 將模態框顯示狀態作為 prop 傳入
    product: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'deleted', 'error'],
  setup(props, { emit }) {
    const store = useStore()
    const isDeleting = ref(false)

    const closeModal = () => {
      emit('close')
    }

    const confirmDelete = async () => {
      isDeleting.value = true
      try {
        const response = await store.deleteProduct(props.product.id)
        if (response.data.success) {
          emit('deleted')
        } else {
          emit('error', response.data.message || '刪除失敗')
        }
      } catch (error) {
        emit('error', error.response?.data?.message || '刪除失敗')
      } finally {
        isDeleting.value = false
      }
    }

    return { closeModal, confirmDelete, isDeleting }
  }
}
</script>

<style scoped>
.modal.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
