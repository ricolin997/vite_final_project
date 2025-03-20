<template>
  <button class="pay-btn" @click="handlePayment" :disabled="isProcessing" :class="buttonClass">
    <span v-if="isProcessing"> <i class="fas fa-spinner fa-spin"></i> 處理中... </span>
    <span v-else>{{ buttonText }}</span>
  </button>
</template>

<script>
import { ref } from 'vue'
import { useStore } from '@/stores'
import { showConfirmDialog, showToast } from '@/utils/uiHelpers'

export default {
  name: 'PaymentButton',
  props: {
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
  },
  emits: ['payment-success', 'payment-error'],
  setup(props, { emit }) {
    const store = useStore()
    const isProcessing = ref(false)

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

        // 高亮訂單卡片 - 如果提供了選擇器
        if (props.highlightSelector) {
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

        // 如果需要關閉模態框，則在付款成功後關閉
        if (props.closeModalId) {
          setTimeout(() => {
            // 查找模態框元素
            const modalElement = document.getElementById(props.closeModalId)
            if (modalElement) {
              // 方法 1: 使用 Bootstrap API
              if (window.bootstrap) {
                try {
                  const modalInstance = window.bootstrap.Modal.getInstance(modalElement)
                  if (modalInstance) {
                    modalInstance.hide()
                    return
                  }
                } catch (e) {
                  console.error('使用 Bootstrap API 關閉模態框失敗', e)
                }
              }

              // 方法 2: 使用關閉按鈕
              const closeButton = modalElement.querySelector('[data-bs-dismiss="modal"]')
              if (closeButton) {
                closeButton.click()
                return
              }

              // 方法 3: 手動關閉
              modalElement.classList.remove('show')
              modalElement.style.display = 'none'
              modalElement.setAttribute('aria-hidden', 'true')
              modalElement.removeAttribute('aria-modal')

              const backdrop = document.querySelector('.modal-backdrop')
              if (backdrop) {
                backdrop.remove()
              }

              document.body.classList.remove('modal-open')
              document.body.style.overflow = ''
              document.body.style.paddingRight = ''
            }
          }, 500)
        }
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

    return {
      isProcessing,
      handlePayment
    }
  }
}
</script>

<style scoped></style>
