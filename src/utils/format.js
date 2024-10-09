export function formatPrice(value) {
  if (!value) return '0'
  return Number(value).toLocaleString() // 千分號格式化
}
