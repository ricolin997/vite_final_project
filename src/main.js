// import './assets/main.css'
import './assets/styles/all.scss' // 引入  SCSS
import 'bootstrap/dist/js/bootstrap.js'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
// 引入 Font Awesome
import '@fortawesome/fontawesome-free/css/all.css'
// 引入 Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

import { formatPrice } from './utils/format'
// 引入自定義指令
import { directives } from './utils/directives'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('Loading', Loading)

// 註冊自定義指令
app.directive('lazy-load', directives.lazyLoad)

// 將 Axios 添加到 Vue 的原型中
app.config.globalProperties.$axios = axios
//千分號全域註冊
app.config.globalProperties.$formatPrice = formatPrice

app.mount('#app')
