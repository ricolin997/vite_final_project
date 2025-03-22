<template>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div
      v-for="(toast, index) in toasts"
      :key="index"
      class="toast show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      :class="[
        'toast align-items-center',
        'border-0',
        toast.style === 'success' ? 'bg-success text-white' : 'bg-danger text-white'
      ]"
      style="opacity: 1"
    >
      <div class="d-flex">
        <div class="toast-body">
          <!-- 標題部分，字體較大且加粗 -->
          <h5 class="mb-1">{{ toast.title }}</h5>
          <!-- 內容部分，字體較小 -->
          <p class="mb-0">{{ toast.content }}</p>
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          @click="removeToast(index)"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, onUnmounted } from 'vue'

// 修復命名規範：組件名稱應該是多詞組合
defineOptions({
  name: 'ToastNotification'
})

// 定義 props
const props = defineProps({
  autoDismissTime: {
    type: Number,
    default: 5000 // 5秒自動消失
  }
})

const toasts = ref([])
const emitter = inject('emitter')

/**
 * 添加新的 toast 訊息
 * @param {Object} toast - 訊息對象
 */
const addToast = (toast) => {
  const { style = 'success', title, content } = toast
  toasts.value.push({ style, title, content })

  // 自動移除吐司訊息
  setTimeout(() => {
    if (toasts.value.length > 0) {
      removeToast(0) // 移除第一個吐司
    }
  }, props.autoDismissTime)
}

/**
 * 移除指定索引的 toast 訊息
 * @param {Number} index - 要移除的訊息索引
 */
const removeToast = (index) => {
  toasts.value.splice(index, 1)
}

// 監聽 show-toast 事件
onMounted(() => {
  emitter.on('show-toast', addToast)
})

// 清理事件監聽器
onUnmounted(() => {
  emitter.off('show-toast', addToast)
})
</script>

<style>
.toast-container {
  z-index: 1050;
}
</style>
