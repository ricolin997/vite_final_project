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
            您確定要刪除<strong>{{ itemTitle }}</strong
            >的{{ entityName }}嗎？此操作無法恢復。
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

export default {
  props: {
    show: Boolean,
    item: {
      type: Object,
      required: true
    },
    entityName: {
      type: String,
      default: '項目' // 默認名稱
    },
    onDelete: {
      type: Function,
      required: true // 刪除行為作為回調傳入
    }
  },
  emits: ['close', 'deleted', 'error'],
  setup(props, { emit }) {
    const isDeleting = ref(false)

    const closeModal = () => {
      emit('close')
    }

    const confirmDelete = async () => {
      isDeleting.value = true
      try {
        await props.onDelete(props.item.id)
        emit('deleted') // 通知父層刪除成功
      } catch (error) {
        emit('error', error.message || '刪除失敗')
      } finally {
        isDeleting.value = false
      }
    }

    return { closeModal, confirmDelete, isDeleting, itemTitle: props.item.title }
  }
}
</script>
