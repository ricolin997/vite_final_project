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
    pagination: {} // 新增 pagination 物件
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
    }
  }
})
