// import './assets/main.css'
import './assets/all.scss' // 引入  SCSS

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 將 Axios 添加到 Vue 的原型中
app.config.globalProperties.$axios = axios

app.mount('#app')
