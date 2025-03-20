// 延遲加載指令
export const lazyLoad = {
  mounted(el) {
    function loadElement() {
      // 檢查元素是否在視窗中
      const rect = el.getBoundingClientRect()
      if (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      ) {
        // 標記為已加載
        el.classList.add('loaded')

        // 使用 requestAnimationFrame 優化渲染
        requestAnimationFrame(() => {
          // 添加動畫效果
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        })

        // 元素已加載，移除監聽器
        window.removeEventListener('scroll', loadElement)
      }
    }

    // 初始檢查
    loadElement()

    // 添加滾動事件監聽器
    window.addEventListener('scroll', loadElement, { passive: true })
  },
  // 組件卸載時清除事件監聽器
  unmounted(el) {
    window.removeEventListener('scroll', el.__lazyLoadHandler)
  }
}

// 導出所有指令的集合，方便在 main.js 中一次性註冊
export const directives = {
  lazyLoad
}
