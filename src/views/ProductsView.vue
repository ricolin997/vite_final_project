<!-- ProductsView.vue -->
<template>
  <Loading :active="isLoading"></Loading>
  <div class="products-management">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>商品管理</h2>
      <button class="btn btn-add-product" @click="openModal(null)">
        <i class="bi bi-plus-circle"></i> 新增產品
      </button>
    </div>

    <div v-if="store.products.length === 0 && !isLoading" class="empty-state">
      <div class="empty-icon">
        <i class="bi bi-inbox"></i>
      </div>
      <div class="empty-text">目前沒有商品，請點擊「新增產品」按鈕來添加</div>
    </div>

    <table v-else class="table products-table">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in store.products" :key="product.id">
          <td class="product-category">{{ product.category }}</td>
          <td class="product-title">{{ product.title }}</td>
          <td class="product-price original text-right">
            ${{ $formatPrice(product.origin_price) }}
          </td>
          <td class="product-price current text-right">${{ $formatPrice(product.price) }}</td>
          <td class="product-status">
            <span class="status-badge" :class="product.is_enabled ? 'enabled' : 'disabled'">
              {{ product.is_enabled ? '啟用' : '未啟用' }}
            </span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-edit" @click="openModal(product)">
                <i class="bi bi-pencil-square"></i> 編輯
              </button>
              <button class="btn btn-delete" @click="openDeleteModal(product)">
                <i class="bi bi-trash"></i> 刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁元件 -->
    <Pagination
      v-if="store.pagination.total_pages > 1"
      :pages="store.pagination"
      @emit-pages="fetchProducts"
    />

    <!-- ProductModal component -->
    <ProductModal
      v-if="showModal"
      :product="selectedProduct"
      @close="closeModal"
      @save="saveProduct"
    />

    <!-- DelModal component -->
    <DelModal
      v-if="showDeleteModal"
      :item="selectedProduct"
      entityName="產品"
      :onDelete="store.deleteProduct"
      @close="closeDeleteModal"
      @deleted="handleDeleteSuccess"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useStore } from '@/stores/index'
import ProductModal from '../components/ProductModal.vue'
import DelModal from '../components/DelModal.vue'
import Pagination from '../components/Pagination.vue'

// 引入必要的依賴
const store = useStore()
const emitter = inject('emitter')

// 定義狀態
const showModal = ref(false)
const showDeleteModal = ref(false)
const selectedProduct = ref(null)
const isLoading = ref(false)

// 顯示訊息的輔助函數
const showToast = (options) => {
  emitter.emit('show-toast', options)
}

// 產品相關操作函數
const openModal = (product) => {
  selectedProduct.value = product
    ? {
        ...product,
        imagesUrl:
          Array.isArray(product.imagesUrl) && product.imagesUrl.length
            ? [...product.imagesUrl]
            : ['', '', '', '', ''] // 確保有五個欄位
      }
    : {
        title: '',
        category: '',
        origin_price: 0,
        price: 0,
        unit: '',
        description: '',
        content: '',
        is_enabled: 1,
        imageUrl: '',
        imagesUrl: ['', '', '', '', ''] // 預設五個空的圖片網址
      }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedProduct.value = null
}

// 刪除相關操作函數
const openDeleteModal = (product) => {
  selectedProduct.value = product
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedProduct.value = null
}

const handleDeleteSuccess = async () => {
  closeDeleteModal()
  await store.getProducts()
  showToast({ style: 'error', title: '產品刪除成功' })
}

// 儲存產品函數
const saveProduct = async (product) => {
  isLoading.value = true
  try {
    let response
    if (product.id) {
      // 更新產品
      response = await store.updateProduct(product)
      if (response.data.success) {
        await store.getProducts()
        showToast({ style: 'success', title: '產品更新成功' })
      } else {
        showToast({
          style: 'error',
          title: '產品更新失敗',
          content: response.data.message.join('、')
        })
      }
    } else {
      // 新增產品
      response = await store.createProduct(product)
      if (response.data.success) {
        await store.getProducts()
        showToast({ style: 'success', title: '產品建立成功' })
      } else {
        showToast({
          style: 'error',
          title: '產品建立失敗',
          content: response.data.message.join('、')
        })
      }
    }
  } catch (error) {
    showToast({ 
      style: 'error', 
      title: '操作失敗', 
      content: error.response?.data?.message || '發生未知錯誤' 
    })
  } finally {
    isLoading.value = false
    closeModal()
  }
}

// 取得產品列表
const fetchProducts = async (page = 1) => {
  isLoading.value = true
  try {
    await store.getProducts(page)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    showToast({ 
      style: 'error', 
      title: '取得產品失敗', 
      content: error.message 
    })
  } finally {
    isLoading.value = false
  }
}

// 頁面載入時取得產品列表
onMounted(() => {
  fetchProducts()
})
</script>
