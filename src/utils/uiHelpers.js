/**
 * UI 工具函數庫
 * 提供通用的 UI 交互功能，如確認對話框、提示訊息等
 */

/**
 * 顯示確認對話框
 * @param {string} title - 對話框標題
 * @param {string} message - 對話框內容
 * @returns {Promise<boolean>} - 用戶確認結果
 */
export const showConfirmDialog = (title, message) => {
  return new Promise((resolve) => {
    const dialogOverlay = document.createElement('div')
    dialogOverlay.className = 'dialog-overlay'

    const dialogBox = document.createElement('div')
    dialogBox.className = 'dialog-box'

    dialogBox.innerHTML = `
      <div class="dialog-header">
        <h3>${title}</h3>
      </div>
      <div class="dialog-content">
        <p>${message}</p>
      </div>
      <div class="dialog-actions">
        <button class="btn-cancel">取消</button>
        <button class="btn-confirm">確認</button>
      </div>
    `

    dialogOverlay.appendChild(dialogBox)
    document.body.appendChild(dialogOverlay)

    // 顯示動畫
    setTimeout(() => {
      dialogOverlay.classList.add('show')
      dialogBox.classList.add('show')
    }, 10)

    // 綁定按鈕事件
    const cancelBtn = dialogBox.querySelector('.btn-cancel')
    const confirmBtn = dialogBox.querySelector('.btn-confirm')

    const closeDialog = (result) => {
      dialogOverlay.classList.remove('show')
      dialogBox.classList.remove('show')

      setTimeout(() => {
        document.body.removeChild(dialogOverlay)
        resolve(result)
      }, 300)
    }

    cancelBtn.addEventListener('click', () => closeDialog(false))
    confirmBtn.addEventListener('click', () => closeDialog(true))
  })
}

/**
 * 顯示提示訊息
 * @param {string} message - 提示訊息內容
 * @param {string} type - 提示類型 (success, danger, warning, info)
 */
export const showToast = (message, type = 'success') => {
  const toastContainer = document.getElementById('toast-container') || createToastContainer()
  const toast = document.createElement('div')
  toast.className = `toast-notification ${type}`
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'danger' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
    </div>
    <div class="toast-message">${message}</div>
  `
  toastContainer.appendChild(toast)

  // 顯示動畫
  setTimeout(() => {
    toast.classList.add('show')
  }, 10)

  // 自動關閉
  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => {
      toast.remove()
    }, 300)
  }, 3000)
}

/**
 * 創建提示容器
 * @returns {HTMLElement} - 提示容器元素
 */
const createToastContainer = () => {
  const container = document.createElement('div')
  container.id = 'toast-container'
  document.body.appendChild(container)
  return container
}

/**
 * 關閉 Bootstrap 模態框
 * @param {string} modalId - 模態框 ID
 */
export const closeModal = (modalId) => {
  try {
    const modalElement = document.getElementById(modalId)
    if (modalElement) {
      // 方法 1: 使用 Bootstrap 的 API (如果可用)
      if (window.bootstrap) {
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement)
        if (modalInstance) {
          modalInstance.hide()
          return
        }
      }

      // 方法 2: 使用 jQuery 的 API (如果可用)
      if (window.jQuery) {
        window.jQuery(`#${modalId}`).modal('hide')
        return
      }

      // 方法 3: 使用 data-bs-dismiss 屬性觸發關閉
      const closeButton = modalElement.querySelector('[data-bs-dismiss="modal"]')
      if (closeButton) {
        closeButton.click()
        return
      }

      // 方法 4: 手動移除相關的 DOM 元素和類
      modalElement.classList.remove('show')
      modalElement.setAttribute('aria-hidden', 'true')
      modalElement.removeAttribute('aria-modal')
      modalElement.style.display = 'none'

      // 移除背景遮罩
      const backdrop = document.querySelector('.modal-backdrop')
      if (backdrop) {
        backdrop.remove()
      }

      // 移除 body 上的相關類
      document.body.classList.remove('modal-open')
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  } catch (error) {
    console.error('關閉模態框失敗：', error)
  }
}
