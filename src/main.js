// import './assets/main.css'
import './assets/all.scss' // 引入  SCSS
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

import { formatPrice } from './utils/format'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('Loading', Loading)

// 將 Axios 添加到 Vue 的原型中
app.config.globalProperties.$axios = axios
//千分號全域註冊
app.config.globalProperties.$formatPrice = formatPrice

app.mount('#app')
