// utils.js
import Cookies from 'js-cookie'
import axios from 'axios'

export function setAuthToken(token, expired) {
  Cookies.set('token', token, { expires: 1 })
  Cookies.set('expired', expired, { expires: 1 })
  axios.defaults.headers.common['Authorization'] = `${token}`
}

export function clearAuthToken() {
  Cookies.remove('token')
  Cookies.remove('expired')
  delete axios.defaults.headers.common['Authorization']
}
