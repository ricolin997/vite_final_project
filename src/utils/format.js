export function formatPrice(value) {
  if (!value) return '0'
  return Number(value).toLocaleString() // 千分號格式化
}

/**
 * 將日期格式化為 YYYY-MM-DD 格式
 * @param {Date|string} date - 日期對象或日期字符串
 * @returns {string} 格式化後的日期字符串
 */
export function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * 將日期格式化為更友好的顯示格式（如：2023年3月15日）
 * @param {string} dateStr - 日期字符串
 * @returns {string} 格式化後的日期字符串
 */
export function formatDateDisplay(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return date.toLocaleDateString('zh-TW', options)
}
