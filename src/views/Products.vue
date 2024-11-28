<template>
  <Loading :active="isLoading"></Loading>
  <div>
    <button class="btn btn-outline-success" @click="openModal(null)">新增產品</button>

    <table class="table mt-4">
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
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-right">${{ $formatPrice(product.origin_price) }}</td>
          <td class="text-right">${{ $formatPrice(product.price) }}</td>
          <td>
            <span class="text-success">{{ product.is_enabled ? '啟用' : '未啟用' }}</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(product)">
                編輯
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal(product)">
                刪除
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

<script>
import { ref, onMounted, inject } from 'vue'
import { useStore } from '@/stores/index'
import ProductModal from '../components/ProductModal.vue'
import DelModal from '../components/DelModal.vue'
import Pagination from '../components/Pagination.vue'

export default {
  components: { ProductModal, DelModal, Pagination },
  emits: ['show-toast'],
  setup() {
    const store = useStore()
    const showModal = ref(false)
    const showDeleteModal = ref(false)
    const selectedProduct = ref(null)
    const isLoading = ref(false) // 定義讀取狀態
    const emitter = inject('emitter')

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
      emitter.emit('show-toast', { style: 'error', title: '產品刪除成功' })
    }

    const handleDeleteError = (message) => {
      closeDeleteModal()
      emitter.emit('show-toast', { style: 'error', title: '刪除失敗', content: message })
    }

    const saveProduct = async (product) => {
      isLoading.value = true // 開始讀取
      try {
        if (product.id) {
          const response = await store.updateProduct(product) // 使用 store 的方法更新產品
          if (response.data.success) {
            await store.getProducts()
            emitter.emit('show-toast', { style: 'success', title: '產品更新成功' }) // 成功訊息
          } else {
            emitter.emit('show-toast', {
              style: 'error',
              title: '產品更新失敗',
              content: response.data.message.join('、')
            }) // 失敗訊息
          }
        } else {
          const response = await store.createProduct(product) // 使用 store 的方法新增產品
          if (response.data.success) {
            await store.getProducts()
            emitter.emit('show-toast', { style: 'success', title: '產品建立成功' }) // 成功訊息
          } else {
            emitter.emit('show-toast', {
              style: 'error',
              title: '產品建立失敗',
              content: response.data.message.join('、')
            }) // 失敗訊息
          }
        }
      } catch (error) {
        emitter.emit('show-toast', error.response?.data?.message || '操作失敗', 'error') // 錯誤訊息
      } finally {
        isLoading.value = false // 結束讀取
        closeModal()
      }
    }

    const fetchProducts = async (page = 1) => {
      isLoading.value = true
      try {
        await store.getProducts(page)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        isLoading.value = false
      }
    }

    onMounted(async () => {
      isLoading.value = true // 開始讀取
      try {
        await store.getProducts()
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        isLoading.value = false // 結束讀取
      }
    })

    return {
      store,
      showModal,
      showDeleteModal,
      selectedProduct,
      openModal,
      closeModal,
      saveProduct,
      isLoading,
      openDeleteModal,
      closeDeleteModal,
      handleDeleteSuccess,
      handleDeleteError,
      fetchProducts
    }
  }
}
</script>
