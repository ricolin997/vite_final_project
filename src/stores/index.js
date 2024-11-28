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
    userProducts: [],
    pagination: {}, // 新增 pagination 物件
    cart: [],
    coupons: [],
    couponPagination: {}
  }),
  actions: {
    // 初始化狀態
    async initializeStore() {
      this.readCookies()
    },
    // 從 Cookies 讀取 token 和過期時間
    readCookies() {
      const token = Cookies.get('token')
      const expired = Cookies.get('expired')
      if (token && expired) {
        this.setToken({ token, expired })
      }
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

    // 新增 getProducts 方法
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
    //新增產品資料
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
    //編輯產品資料
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
    // 刪除產品
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
    //取得產品
    async getUserProducts() {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/products/all`
      try {
        const response = await axios.get(api)
        this.userProducts = response.data.products
      } catch (error) {
        console.error('getUserProduct failed:', error.response?.data?.message || error.message)
      }
    }, // 取得購物車資料
    async getCart() {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/cart`
      try {
        const response = await axios.get(api)
        console.log(response)
        this.cart = response.data.data.carts
      } catch (error) {
        console.error('Error fetching cart:', error.response?.data?.message || error.message)
      }
    },
    // 加入購物車
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

    // 更新購物車數量
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

    // 移除購物車商品
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

    //取得優惠券
    async getCoupons(page = 1) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/coupons?page=${page}`
      try {
        const response = await axios.get(api)
        console.log(response)
        this.coupons = response.data.coupons
        this.couponPagination = response.data.pagination
      } catch (error) {
        console.error('Error fetching coupons:', error.response?.data?.message || error.message)
      }
    },

    //新增優惠券
    async createCoupon(coupon) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/coupon`
      try {
        const response = await axios.post(api, { data: coupon })
        console.log(response)
        return response
      } catch (error) {
        throw new Error(error.response?.data?.message || '新增優惠券失敗')
      }
    },

    //修改優惠券
    async updateCoupon(coupon) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/coupon/${coupon.id}`
      try {
        const response = await axios.put(api, { data: coupon })
        console.log(response)
        return response
      } catch (error) {
        throw new Error(error.response?.data?.message || '修改優惠券失敗')
      }
    },

    //刪除優惠券
    async deleteCoupon(couponId) {
      const api = `${import.meta.env.VITE_API_URL}api/${import.meta.env.VITE_APP_PATH}/admin/coupon/${couponId}`
      try {
        const response = await axios.delete(api)
        console.log(response)
        return response
      } catch (error) {
        throw new Error(error.response?.data?.message || '刪除優惠券失敗')
      }
    }
  }
})
