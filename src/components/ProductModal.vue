<template>
  <div class="product-modal">
    <div class="modal-backdrop fade show"></div>

    <div class="modal show d-block" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :class="{ 'edit-mode': productCopy.id }">
              {{ productCopy.id ? '編輯產品' : '新增產品' }}
            </h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="row" v-if="productCopy">
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="image" class="form-label">輸入首圖網址</label>
                  <input
                    v-model="productCopy.imageUrl"
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="image-preview-container">
                  <img
                    v-if="productCopy.imageUrl"
                    :src="productCopy.imageUrl"
                    class="img-fluid"
                    alt="產品首圖"
                  />
                  <div v-else class="no-image">
                    <span>尚未設定圖片</span>
                  </div>
                </div>

                <!-- 多圖上傳區域 -->
                <div class="multi-image-container">
                  <h6 class="section-title">內容圖片</h6>
                  <div
                    v-for="(image, index) in productCopy.imagesUrl"
                    :key="index"
                    class="image-item"
                  >
                    <div class="d-flex">
                      <input
                        v-model="productCopy.imagesUrl[index]"
                        type="url"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                      />
                      <button type="button" class="btn-remove" @click="removeImage(index)">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>

                    <div class="preview-image" v-if="productCopy.imagesUrl[index]">
                      <img :src="productCopy.imagesUrl[index]" class="img-fluid" alt="圖片預覽" />
                    </div>
                  </div>
                  <button class="btn-add-image" @click="addImage">
                    <i class="bi bi-plus-circle"></i> 新增內容圖片
                  </button>

                  <div class="file-upload-container">
                    <label for="customFile" class="form-label">
                      上傳圖片
                      <i class="bi bi-cloud-upload" v-if="!isUploading"></i>
                      <i class="bi bi-arrow-repeat spin" v-else></i>
                    </label>
                    <input
                      type="file"
                      id="customFile"
                      class="form-control"
                      ref="fileInput"
                      @change="uploadFile"
                    />
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input
                    v-model="productCopy.title"
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="row gx-2">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input
                      v-model="productCopy.category"
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="unit" class="form-label">單位</label>
                    <input
                      v-model="productCopy.unit"
                      type="text"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="row gx-2">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input
                      v-model="productCopy.origin_price"
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input
                      v-model="productCopy.price"
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea
                    v-model="productCopy.description"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea
                    v-model="productCopy.content"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>

                <div class="form-check">
                  <input
                    v-model="productCopy.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-cancel" @click="closeModal">取消</button>
            <button type="button" class="btn btn-save" @click="saveProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        category: '',
        origin_price: 0,
        price: 0,
        unit: '',
        description: '',
        content: '',
        is_enabled: 1,
        imageUrl: '',
        imagesUrl: []
      })
    }
  },
  data() {
    return {
      productCopy: {
        ...this.product,
        imagesUrl: this.product.imagesUrl.length
          ? [...this.product.imagesUrl]
          : ['', '', '', '', ''] // 如果沒有圖片網址，初始化為五個空欄位
      },
      isUploading: false
    }
  },
  watch: {
    product: {
      handler(newValue) {
        this.productCopy = {
          ...newValue,
          imagesUrl: newValue.imagesUrl.length ? [...newValue.imagesUrl] : ['', '', '', '', ''] // 確保有五個欄位
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    saveProduct() {
      this.$emit('save', this.productCopy) // 傳遞修改後的 productCopy 給父組件
    },
    addImage() {
      if (this.productCopy.imagesUrl.length < 5) {
        this.productCopy.imagesUrl.push('') // 修改本地的 productCopy
      }
    },
    removeImage(index) {
      this.productCopy.imagesUrl.splice(index, 1) // 修改本地的 productCopy
    },
    async uploadFile(event) {
      const file = event.target.files[0] // 獲取選中的檔案
      if (!file) return // 如果沒有選擇檔案，則返回

      this.isUploading = true // 開始上傳
      const formData = new FormData()
      formData.append('file-to-upload', file) // 將檔案添加到 FormData

      try {
        const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/upload`
        const response = await axios.post(api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // 設定正確的標頭
          }
        })
        // 假設返回的 response.data 包含圖片的 URL
        this.productCopy.imageUrl = response.data.imageUrl || response.data.url // 更新圖片網址
        console.log('上傳成功:', response.data)
      } catch (error) {
        console.error('圖片上傳失敗:', error)
      } finally {
        this.isUploading = false // 結束上傳
        // 清空檔案輸入框，以便可以再次選擇同一個檔案
        if (this.$refs.fileInput) {
          this.$refs.fileInput.value = ''
        }
      }
    }
  }
}
</script>

<style scoped>
.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
