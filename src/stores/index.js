// store.js
import { defineStore } from 'pinia'
import axios from 'axios'
import Cookies from 'js-cookie'
import { setAuthToken, clearAuthToken } from '@/utils/utils' // 導入工具函数

export const useStore = defineStore('main', {
  state: () => ({
    token: null,
    expired: null,
    products: [], // 新增 products 陣列
    orders: [], // 儲存訂單列表
    userProducts: [],
    pagination: {}, // 新增 pagination 物件
    cart: [],
    coupons: [],
    couponPagination: {},
    currentOrder: null,
    favorites: [], // 新增我的最愛陣列
    cartTotal: 0, // 新增 cartTotal 變數
    couponCode: null // 新增 couponCode 變數
  }),
  actions: {
    // 初始化狀態
    async initializeStore() {
      this.readCookies()
      this.loadFavorites() // 載入我的最愛
      await this.getCart() // 初始化時加載購物車數據
    },
    // 從 Cookies 讀取 token 和過期時間
    readCookies() {
      const token = Cookies.get('token')
      const expired = Cookies.get('expired')
      if (token && expired) {
        this.setToken({ token, expired })
      }
    },
    // 從 localStorage 讀取我的最愛
    loadFavorites() {
      const favorites = localStorage.getItem('favorites')
      if (favorites) {
        this.favorites = JSON.parse(favorites)
      }
    },
    // 保存我的最愛到 localStorage
    saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    // 添加到我的最愛
    addToFavorites(product) {
      // 檢查是否已經在我的最愛中
      const existingIndex = this.favorites.findIndex((item) => item.id === product.id)
      if (existingIndex === -1) {
        this.favorites.push(product)
        this.saveFavorites()
      }
    },
    // 從我的最愛中移除
    removeFromFavorites(productId) {
      this.favorites = this.favorites.filter((item) => item.id !== productId)
      this.saveFavorites()
    },
    // 檢查產品是否在我的最愛中
    isInFavorites(productId) {
      return this.favorites.some((item) => item.id === productId)
    },
    // 設置 token 和過期時間
    setToken({ token, expired }) {
      this.token = token
      this.expired = expired
      setAuthToken(token, expired)
    },
    // 清除 token
    clearToken() {
      this.token = null
      this.expired = null
      clearAuthToken()
    },
    // 登錄
    async login(user) {
      const api = `${import.meta.env.VITE_API_URL}admin/signin`
      try {
        const response = await axios.post(api, user)
        const { token, expired } = response.data
        this.setToken({ token, expired })
        console.log(response)
        return response
      } catch (error) {
        console.error('Login failed:', error.response?.data?.message || error.message)
        throw error
      }
    },
    // 驗證用戶
    async checkAuth() {
      const api = `${import.meta.env.VITE_API_URL}api/user/check`
      try {
        const response = await axios.post(api)
        return response.data.success
      } catch (error) {
        console.error(
          'Error checking authentication:',
          error.response?.data?.message || error.message
        )
        return false
      }
    },
    //登出
    async logOut() {
      const api = `${import.meta.env.VITE_API_URL}logout`
      try {
        await axios.post(api) // 可選：如果後端需要登出請求
      } catch (error) {
        console.error('Logout failed:', error.response?.data?.message || error.message)
      } finally {
        this.clearToken() // 清除 token
      }
    },

    //後台取得產品資料
    async getProducts(page = 1) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/products/?page=${page}`
      try {
        const response = await axios.get(api)
        // console.log(response)
        this.products = response.data.products // 假設 API 返回的產品資料在 response.data.products
        this.pagination = response.data.pagination // 假設 API 返回的分頁資料在 response.data.pagination
      } catch (error) {
        console.error('Error fetching products:', error.response?.data?.message || error.message)
        // 在出現錯誤時重置 products 和 pagination
        this.products = []
        this.pagination = {}
      }
    },
    //後台新增產品資料
    async createProduct(product) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/product`
      try {
        const response = await axios.post(api, { data: product })
        console.log(response)
        // this.getProducts() // Refresh product list after creation
        return response // 返回成功訊息
      } catch (error) {
        throw new Error(error.response?.data?.message || '產品創建失敗')
      }
    },
    //後台編輯產品資料
    async updateProduct(product) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/product/${product.id}`
      try {
        const response = await axios.put(api, { data: product })
        console.log(response)
        // this.getProducts() // Refresh product list after update
        return response // 返回成功訊息
      } catch (error) {
        throw new Error(error.response?.data?.message || '產品更新失敗')
      }
    },
    // 後台刪除產品
    async deleteProduct(productId) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/product/${productId}`
      try {
        const response = await axios.delete(api)
        if (response.data.success) {
          this.getProducts() // 刪除成功後重新獲取產品列表
        }
        return response
      } catch (error) {
        throw new Error(error.response?.data?.message || '刪除產品失敗')
      }
    },
    //後台取得訂單
    async getOrders(page = 1) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/orders?page=${page}`
      try {
        const response = await axios.get(api)
        // 假設 API 回傳的訂單資料在 response.data.orders，分頁資訊在 response.data.pagination
        this.orders = response.data.orders || [] // 更新訂單資料
        this.pagination = response.data.pagination || {} // 更新分頁資訊
        return response // 回傳完整回應，供需要時使用
      } catch (error) {
        console.error('取得訂單失敗：', error.response?.data?.message || error.message)
        this.orders = [] // 清空訂單資料
        this.pagination = {} // 清空分頁資訊
        throw error // 將錯誤拋出給呼叫者處理
      }
    },
    //後台更新訂單
    async updateOrder(order) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/order/${order.id}`
      try {
        const response = await axios.put(api, { data: order })
        console.log(response)
        return response
      } catch (error) {
        throw new Error(error.response?.data?.message || '更新訂單失敗')
      }
    },
    //後台刪除單筆訂單
    async deleteOrder(api) {
      try {
        const response = await axios.delete(api)
        console.log(response)
        if (response.status !== 200) {
          throw new Error('刪除單筆訂單失敗')
        }
        return response.data // 可根據需要返回結果
      } catch (error) {
        console.error('刪除單筆訂單時發生錯誤:', error.message)
        throw error // 仍然拋出錯誤以便上層處理
      }
    },
    //後台刪除全部訂單
    async deleteAllOrders(api) {
      try {
        const response = await axios.delete(api)
        if (response.status !== 200) {
          throw new Error('刪除全部訂單失敗')
        }
        return response.data // 可根據需要返回結果
      } catch (error) {
        console.error('刪除全部訂單時發生錯誤:', error.message)
        throw error // 仍然拋出錯誤以便上層處理
      }
    },
    //取得優惠券
    async getCoupons(page = 1) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/coupons?page=${page}`
      try {
        const response = await axios.get(api)
        this.coupons = response.data.coupons
        this.couponPagination = response.data.pagination
        return response.data // 返回獲取的數據
      } catch (error) {
        console.error('Error fetching coupons:', error.response?.data?.message || error.message)
        throw error // 拋出錯誤以便上層處理
      }
    },

    //後台新增優惠券
    async createCoupon(coupon) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/coupon`
      try {
        const response = await axios.post(api, { data: coupon })
        return response
      } catch (error) {
        throw new Error(error.response?.data?.message || '新增優惠券失敗')
      }
    },

    //後台修改優惠券
    async updateCoupon(coupon) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/coupon/${coupon.id}`
      try {
        const response = await axios.put(api, { data: coupon })
        return response
      } catch (error) {
        throw new Error(error.response?.data?.message || '修改優惠券失敗')
      }
    },

    //後台刪除優惠券
    async deleteCoupon(couponId) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/coupon/${couponId}`
      try {
        const response = await axios.delete(api)
        return response
      } catch (error) {
        throw new Error(error.response?.data?.message || '刪除優惠券失敗')
      }
    },

    //前台取得產品
    async getUserProducts(page = 1) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/products?page=${page}`
      try {
        const response = await axios.get(api)
        this.userProducts = response.data.products // 存入分頁的產品資料
        this.pagination = response.data.pagination // 存入分頁資訊
      } catch (error) {
        console.error('getUserProduct failed:', error.response?.data?.message || error.message)
        this.userProducts = []
        this.pagination = {}
      }
    },
    //前台取得單一產品細節
    async getUserProductById(api) {
      try {
        const response = await axios.get(api)
        return response
      } catch (error) {
        console.error('Failed to fetch product:', error.response?.data?.message || error.message)
        throw error
      }
    },

    // 前台取得購物車資料
    async getCart() {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/cart`
      try {
        const response = await axios.get(api)
        this.cart = response.data.data.carts
        this.cartTotal = response.data.data.total // 保存購物車總金額

        // 保存優惠碼相關信息，以便在頁面重新載入時能夠恢復優惠碼狀態
        if (
          response.data.data.final_total !== undefined &&
          response.data.data.total !== undefined &&
          response.data.data.final_total < response.data.data.total
        ) {
          // 如果有優惠碼信息，保存到 store 中
          if (response.data.data.coupon) {
            this.couponCode = response.data.data.coupon.code
          } else if (response.data.data.coupon_code) {
            this.couponCode = response.data.data.coupon_code
          }
        }

        return response.data.data // 返回完整的購物車數據
      } catch (error) {
        console.error('Error fetching cart:', error.response?.data?.message || error.message)
        // 確保在發生錯誤時也能正確初始化這些屬性
        this.cart = []
        this.cartTotal = 0
        throw error // 拋出錯誤以便上層處理
      }
    },
    // 前台加入購物車
    async addToCart(productId, quantity = 1) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/cart`
      try {
        const response = await axios.post(api, {
          data: { product_id: productId, qty: quantity }
        })
        await this.getCart() // 更新購物車
        return response.data
      } catch (error) {
        console.error('Error adding to cart:', error.response?.data?.message || error.message)
        throw error
      }
    },

    // 前台更新購物車數量
    async updateCartItem(cartId, quantity) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/cart/${cartId}`
      try {
        const response = await axios.put(api, {
          data: { product_id: cartId, qty: quantity }
        })
        await this.getCart() // 更新購物車
        return response.data
      } catch (error) {
        console.error('Error updating cart:', error.response?.data?.message || error.message)
        throw error
      }
    },

    // 前台移除購物車商品
    async removeCartItem(cartId) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/cart/${cartId}`
      try {
        const response = await axios.delete(api)
        await this.getCart() // 更新購物車
        return response.data
      } catch (error) {
        console.error('Error removing cart item:', error.response?.data?.message || error.message)
        throw error
      }
    },

    //前台創建訂單
    async createOrder(orderData) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/order`
      try {
        const response = await axios.post(api, {
          data: {
            user: {
              name: orderData.name,
              email: orderData.email,
              tel: orderData.tel,
              address: orderData.address
            },
            message: orderData.message
          }
        })
        return response.data
      } catch (error) {
        throw new Error(error.response?.data?.message || '建立訂單失敗')
      }
    },

    //前台取得訂單列表
    async getUserOrders(page = 1) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/orders?page=${page}`
      try {
        const response = await axios.get(api)
        this.orders = response.data.orders || []
        this.pagination = response.data.pagination || {}
      } catch (error) {
        console.error('取得訂單失敗：', error.response?.data?.message || error.message)
        this.orders = []
        this.pagination = {}
      }
    },
    //前台取得單筆訂單詳細資訊
    async getUserOrderDetails(orderId) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/order/${orderId}`
      try {
        const response = await axios.get(api)
        console.log(response)
        this.currentOrder = response.data.order
        return response.data.order
      } catch (error) {
        console.error('取得訂單詳情失敗：', error.response?.data?.message || error.message)
        this.currentOrder = null
        throw error
      }
    },
    // 前台訂單付款
    async payOrder(orderId) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/pay/${orderId}`
      try {
        const response = await axios.post(api)
        console.log('付款成功：', response.data)

        // 更新當前訂單狀態（如果存在）
        if (this.currentOrder && this.currentOrder.id === orderId) {
          this.currentOrder.is_paid = true
        }

        // 更新訂單列表中的訂單狀態
        const orderIndex = this.orders?.findIndex((order) => order.id === orderId)
        if (orderIndex !== -1 && this.orders) {
          this.orders[orderIndex].is_paid = true
        }

        return response.data
      } catch (error) {
        const message = error.response?.data?.message || '付款處理失敗，請稍後再試'
        console.error('訂單付款失敗：', message)
        throw new Error(message) // 抛出錯誤以供前端捕捉
      }
    },
    // 前台套用優惠碼
    async applyCoupon(couponCode) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/coupon`
      try {
        // 如果優惠碼為空，可能是要移除優惠碼
        // 某些 API 可能不支持直接移除優惠碼，這時我們只更新購物車數據
        if (!couponCode) {
          // 清除 store 中的優惠碼信息
          this.couponCode = null
          await this.getCart()
          return { success: true, message: '優惠碼已移除' }
        }

        const response = await axios.post(api, {
          data: { code: couponCode }
        })

        // 如果優惠碼套用成功，更新購物車數據
        if (response.data.success) {
          // 保存優惠碼到 store 中
          this.couponCode = couponCode
          await this.getCart()
        }

        return response.data
      } catch (error) {
        console.error('優惠碼套用失敗：', error.response?.data?.message || error.message)
        throw error
      }
    }
  }
})
