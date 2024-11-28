import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashBoard.vue'),
      children: [
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/Products.vue')
        },
        {
          path: 'coupons',
          name: 'coupons',
          component: () => import('../views/Coupons.vue')
        }
      ]
    },
    {
      path: '/user',
      component: () => import('../views/Userboard.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/UserProducts.vue')
        },
        {
          path: 'product/:productId',
          component: () => import('../views/UserProductDetail.vue')
        },
        {
          path: 'cart',
          component: () => import('../views/UserCart.vue')
        }
      ]
    }
  ]
})

export default router
