// 房型數據
export const roomTypes = [
  {
    value: 'standard',
    label: '標準客房',
    icon: 'fas fa-bed',
    description: '舒適實用的標準房型，適合商務旅客或短期停留。'
  },
  {
    value: 'deluxe',
    label: '豪華客房',
    icon: 'fas fa-star',
    description: '更寬敞的空間與高級設施，提供舒適奢華的住宿體驗。'
  },
  {
    value: 'suite',
    label: '套房',
    icon: 'fas fa-gem',
    description: '獨立的起居空間與臥室，享受尊貴私密的住宿環境。'
  },
  {
    value: 'family',
    label: '家庭房',
    icon: 'fas fa-users',
    description: '專為家庭設計的寬敞房型，配備適合兒童的設施。'
  },
  {
    value: 'view',
    label: '景觀房',
    icon: 'fas fa-mountain',
    description: '擁有絕佳視野的房型，欣賞美麗的自然或城市景觀。'
  }
]

// 容量範圍常量
export const capacityRanges = {
  ranges: {
    2: { value: '2', label: '最多2人', exact: 2 },
    4: { value: '4', label: '最多4人', exact: 4 },
    6: { value: '6', label: '5人以上', min: 5 }
  },
  // 根據字串格式的容量獲取實際數字
  parseRoomCapacity: (capacity) => {
    const match = capacity.match(/\d+/)
    return match ? parseInt(match[0]) : 0
  },
  // 檢查房間容量是否符合選擇的容量範圍
  isCapacityInRange: (roomCapacity, capacityFilter) => {
    if (!capacityFilter) return true

    const range = capacityRanges.ranges[capacityFilter]
    if (!range) return true

    const parsedCapacity =
      typeof roomCapacity === 'string'
        ? capacityRanges.parseRoomCapacity(roomCapacity)
        : roomCapacity

    if (range.min) {
      return parsedCapacity >= range.min
    }

    return parsedCapacity === range.exact
  },
  // 獲取容量標籤
  getCapacityLabel: (capacity) => {
    return capacityRanges.ranges[capacity]?.label || '所有人數'
  }
}

// 價格範圍常量
export const priceRanges = {
  min: 1000,
  max: 20000,
  ranges: {
    low: {
      value: 'low',
      label: '經濟型 (NT$ 5,000 以下)',
      min: 1000,
      max: 5000
    },
    medium: {
      value: 'medium',
      label: '中價位 (NT$ 5,000 - 8,000)',
      min: 5000,
      max: 8000
    },
    high: {
      value: 'high',
      label: '高級型 (NT$ 8,000 以上)',
      min: 8000,
      max: 20000
    }
  },
  // 檢查價格是否符合指定價格範圍
  isPriceInRange: (price, rangeType) => {
    if (!rangeType) return true

    const range = priceRanges.ranges[rangeType]
    if (!range) return true

    return price >= range.min && price <= range.max
  }
}

// 客房基本資料模板（用於保留原有的 capacity、size、amenities、featured、tag 資料）
export const roomTemplates = [
  {
    capacity: '最多2人',
    size: '35平方米',
    amenities: [
      { icon: 'fas fa-wifi', text: '高速WiFi' },
      { icon: 'fas fa-tv', text: '智能電視' },
      { icon: 'fas fa-coffee', text: '迷你吧' }
    ],
    featured: false,
    tag: '',
    roomType: 'standard'
  },
  {
    capacity: '最多2人',
    size: '45平方米',
    amenities: [
      { icon: 'fas fa-wifi', text: '高速WiFi' },
      { icon: 'fas fa-glass-martini-alt', text: '行政酒廊' },
      { icon: 'fas fa-concierge-bell', text: '管家服務' }
    ],
    featured: true,
    tag: '熱門選擇',
    roomType: 'deluxe'
  },
  {
    capacity: '最多4人',
    size: '60平方米',
    amenities: [
      { icon: 'fas fa-wifi', text: '高速WiFi' },
      { icon: 'fas fa-child', text: '兒童設施' },
      { icon: 'fas fa-couch', text: '獨立起居室' }
    ],
    featured: false,
    tag: '',
    roomType: 'family'
  },
  {
    capacity: '最多4人',
    size: '120平方米',
    amenities: [
      { icon: 'fas fa-wifi', text: '高速WiFi' },
      { icon: 'fas fa-swimming-pool', text: '私人泳池' },
      { icon: 'fas fa-concierge-bell', text: '24小時管家' }
    ],
    featured: false,
    tag: '尊貴體驗',
    roomType: 'suite'
  },
  {
    capacity: '最多2人',
    size: '50平方米',
    amenities: [
      { icon: 'fas fa-wifi', text: '高速WiFi' },
      { icon: 'fas fa-umbrella-beach', text: '海景陽台' },
      { icon: 'fas fa-bath', text: '豪華浴缸' }
    ],
    featured: false,
    tag: '絕美景觀',
    roomType: 'view'
  },
  {
    capacity: '2人',
    size: '55平方米',
    amenities: [
      { icon: 'fas fa-wifi', text: '高速WiFi' },
      { icon: 'fas fa-glass-cheers', text: '迎賓香檳' },
      { icon: 'fas fa-hot-tub', text: '私人按摩浴缸' }
    ],
    featured: false,
    tag: '浪漫之選',
    roomType: 'deluxe'
  }
]

// 設施數據
export const amenities = [
  { id: 'wifi', name: '高速WiFi', icon: 'fas fa-wifi' },
  { id: 'pool', name: '私人泳池', icon: 'fas fa-swimming-pool' },
  { id: 'butler', name: '管家服務', icon: 'fas fa-concierge-bell' },
  { id: 'spa', name: 'SPA服務', icon: 'fas fa-spa' },
  { id: 'gym', name: '健身中心', icon: 'fas fa-dumbbell' },
  { id: 'breakfast', name: '免費早餐', icon: 'fas fa-coffee' },
  { id: 'parking', name: '免費停車', icon: 'fas fa-parking' },
  { id: 'bar', name: '迷你吧', icon: 'fas fa-glass-martini-alt' }
]

// 檢查房間是否具有特定設施
export const hasAmenity = (roomAmenities, amenityId) => {
  if (!roomAmenities || !amenityId) return false

  // 找到對應的設施項目
  const amenity = amenities.find((a) => a.id === amenityId)
  if (!amenity) return false

  // 檢查房間設施列表中是否包含該設施（去掉"高速"等前綴進行匹配）
  const simplifiedName = amenity.name.replace('高速', '')
  return roomAmenities.some((a) => a.text.includes(simplifiedName))
}
