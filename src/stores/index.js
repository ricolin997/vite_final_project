// store.js
import { defineStore } from 'pinia'
import axios from 'axios'
import Cookies from 'js-cookie'
import { setAuthToken, clearAuthToken } from '@/utils/utils' // 導入工具函数

export const useStore = defineStore('main', {
  state: () => ({
    token: null,
    expired: null
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
        return response.data
      } catch (error) {
        console.error(
          'Error checking authentication:',
          error.response?.data?.message || error.message
        )
        return false
      }
    }
  }
})
