<template>
  <div class="delete-modal">
    <!-- 背景遮罩 -->
    <div class="modal-backdrop fade show"></div>

    <div
      class="modal show fade d-block"
      tabindex="-1"
      v-show="show"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">確認刪除</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="warning-icon">
              <i class="bi bi-exclamation-triangle-fill"></i>
            </div>
            <p>
              您確定要刪除<strong>{{ itemTitle }}</strong
              >的{{ entityName }}嗎？此操作無法恢復。
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="closeModal">取消</button>
            <button type="button" class="btn-danger" @click="confirmDelete" :disabled="isDeleting">
              {{ isDeleting ? '刪除中...' : '確認刪除' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props 定義
const props = defineProps({
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
})

// 定義事件
const emit = defineEmits(['close', 'deleted', 'error'])

// 狀態
const isDeleting = ref(false)

// 計算項目標題
const itemTitle = computed(() => {
  if (props.item.title) return props.item.title
  if (props.item.user && props.item.user.name) return props.item.user.name
  return '此'
})

// 關閉模態框
const closeModal = () => {
  emit('close')
}

// 確認刪除
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
</script>

