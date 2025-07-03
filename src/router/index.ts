import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'incomes',
      component: () => import('@pages/IncomesPage.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@pages/OrdersPage.vue')
    },
    {
      path: '/sales',
      name: 'sales',
      component: () => import('@pages/SalesPage.vue')
    },
    {
      path: '/stocks',
      name: 'stocks',
      component: () => import('@pages/StocksPage.vue')
    }
  ]
})

export default router
