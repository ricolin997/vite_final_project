import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'facilities',
        name: 'facilities',
        component: () => import('../views/FacilitiesView.vue')
      },
      {
        path: 'attractions',
        name: 'attractions',
        component: () => import('../views/AttractionsView.vue')
      },
      {
        path: 'gallery',
        name: 'gallery',
        component: () => import('../views/GalleryView.vue')
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('../views/ContactView.vue')
      },
      {
        path: 'faq',
        name: 'faq',
        component: () => import('../views/FaqView.vue')
      },
      {
        path: 'privacy',
        name: 'privacy',
        component: () => import('../views/PrivacyView.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: 'user/products',
        component: () => import('../views/UserProducts.vue')
      },
      {
        path: 'user/product/:id',
        name: 'UserProductDetail',
        component: () => import('../views/UserProductDetail.vue'),
        props: true
      },
      {
        path: 'user/cart',
        name: 'UserCart',
        component: () => import('../views/UserCart.vue')
      },
      {
        path: 'user/checkout',
        component: () => import('../views/UserCheckout.vue')
      },
      {
        path: 'user/order-success',
        component: () => import('../views/OrderSuccess.vue')
      },
      {
        path: 'user/orders',
        redirect: '/user/member/orders'
      },
      {
        path: 'user/member/:tab?',
        name: 'UserMember',
        component: () => import('../views/UserMember.vue'),
        props: true
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../views/OrdersView.vue')
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: () => import('../views/CouponsView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from) {
    if (to.path === from.path) {
      return
    }
    return { top: 0, left: 0, behavior: 'auto' }
  }
})

router.afterEach((to, from) => {
  if (to.path === from.path) {
    return
  }

  setTimeout(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, 0)
})

export default router
