<template>
  <button class="pay-btn" @click="handlePayment" :disabled="isProcessing" :class="buttonClass">
    <span v-if="isProcessing"> <i class="fas fa-spinner fa-spin"></i> 處理中... </span>
    <span v-else>{{ buttonText }}</span>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores'
import { showConfirmDialog, showToast, closeModal as closeModalHelper } from '@/utils/uiHelpers'

// 組件選項
defineOptions({
  name: 'PaymentButton'
})

// 定義 props
const props = defineProps({
  orderId: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    default: '付款'
  },
  buttonClass: {
    type: String,
    default: ''
  },
  closeModalId: {
    type: String,
    default: ''
  },
  highlightSelector: {
    type: String,
    default: ''
  }
})

// 定義事件
const emit = defineEmits(['payment-success', 'payment-error'])

// 狀態
const store = useStore()
const isProcessing = ref(false)

/**
 * 高亮訂單元素
 */
const highlightElement = () => {
  if (!props.highlightSelector) return

  setTimeout(() => {
    const element = document.querySelector(props.highlightSelector)
    if (element) {
      element.classList.add('highlight-success')
      setTimeout(() => {
        element.classList.remove('highlight-success')
      }, 3000)
    }
  }, 300)
}

/**
 * 關閉模態框
 */
const closeModal = () => {
  if (props.closeModalId) {
    setTimeout(() => {
      closeModalHelper(props.closeModalId)
    }, 500)
  }
}

/**
 * 處理付款流程
 */
const handlePayment = async () => {
  // 顯示確認付款對話框
  if (!(await showConfirmDialog('付款確認', '確定要進行付款嗎？'))) {
    return
  }

  isProcessing.value = true
  try {
    await store.payOrder(props.orderId)

    // 付款成功提示
    showToast('付款成功！', 'success')

    // 通知父組件付款成功
    emit('payment-success', props.orderId)

    // 高亮訂單卡片
    highlightElement()

    // 關閉模態框
    closeModal()
  } catch (error) {
    console.error('付款失敗：', error)
    // 付款失敗提示
    showToast('付款失敗：' + (error.message || '請稍後再試'), 'danger')
    // 通知父組件付款失敗
    emit('payment-error', error)
  } finally {
    isProcessing.value = false
  }
}
</script>
